SHELL := /bin/bash
-include .env
# export

# export PATH="$(npm bin):$PATH"

dc := $(shell which docker-compose)
stage = $(shell echo $STAGE)
home := ${CURDIR}

up:
	cd $(home) && $(dc) up --build -d && $(dc) logs --tail=1000 -f -t

up-ci:
	cd $(home) && $(dc) up --build -d

demon:
	nodemon --ext '*' --exec 'make e2e || exit 1'

test: lighthouse e2e

prebuild: prebuild.yarn prebuild.lint prebuild.audit prebuild.unit

prebuild.yarn:
	cd www && yarn

prebuild.lint: 
	cd www && yarn lint

prebuild.audit: 
	cd www && yarn audit

prebuild.coverage: 
	cd www && yarn test:coverage -u && yarn upload:coverage

prebuild.unit: 
	cd www && yarn test

lighthouse:
	lighthouse http://localhost:3000 --view --config-path=.lighthouseci/lighthouse-config.json --output-path=.lighthouseci/lighthouse-results.html 

e2e:
	docker run --net=host -v ${home}/www/__tests__/e2e:/tests -e TEST_URL=http://localhost:3000 codeception/codeceptjs codeceptjs run --steps --debug --verbose

down:
	docker-compose down --remove-orphans

reset: down up

release:
	npx semantic-release 

# stage.deploy:
# 	cdk synthesize && cdk deploy

# stage.test.e2e:
# 	docker run

# stage.test.lighthouse:

# # production stuffs
# deploy-prod:
# 	cdk synthesize && cdk deploy



