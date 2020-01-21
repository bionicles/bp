SHELL := /bin/bash
include .env
export

dc := $(shell which docker-compose)
home := ${CURDIR}
next-version := $(shell npx-semantic-release -d)

up:
	cd $(home) && $(dc) up --build -d && $(dc) logs --tail=1000 -f -t

demon:
	nodemon --ext '*' --exec 'make e2e || exit 1'

test: lighthouse e2e

prebuild: prebuild.lint prebuild.audit prebuild.unit

prebuild.lint: 
	cd www && yarn lint

prebuild.audit: 
	cd www && yarn audit

prebuild.coverage: 
	cd www && yarn test:coverage -u && yarn upload:coverage

prebuild.unit: 
	cd www && yarn test

lighthouse:
	lighthouse http://localhost:3000 --view --config-path=.lighthouseci/lighthouserc.json --output-path=.lighthouseci/lighthouse-results.html 

e2e:
	docker run --net=host -v ${home}/www/__tests__/e2e:/tests -e TEST_URL=http://localhost:3000 codeception/codeceptjs codeceptjs run --steps --debug --verbose

down:
	docker-compose down --remove-orphans

reset: down up

release: zip semantic-release

zip:
	git archive --format=tar.gz -o /tmp/${NEXT_VERSION}.tar.gz master

semantic-release:
	npx semantic-release 

# stage.deploy:
# 	cdk synthesize && cdk deploy

# stage.test.e2e:
# 	docker run

# stage.test.lighthouse:

# # production stuffs
# deploy-prod:
# 	cdk synthesize && cdk deploy



