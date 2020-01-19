SHELL := /bin/bash
include .env
export

dc := $(shell which docker-compose)
home := ${CURDIR}

up: down
	cd $(home) && $(dc) up --build -d && $(dc) logs --tail=1000 -f -t

demon:
	nodemon --ext '*' --exec 'make test || exit 1'

test: e2e

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
	lighthouse http://localhost:3000 --view --output-path=tests/output/lighthouse.html

e2e:
	docker run --net=host -v ${home}/tests:/tests -e TEST_URL=http://localhost:3000 codeception/codeceptjs codeceptjs run --steps --debug --verbose

down:
	docker-compose down --remove-orphans

reset: down up

# stage.deploy:
# 	cdk synthesize && cdk deploy

# stage.test.e2e:
# 	docker run

# stage.test.lighthouse:

# # production stuffs
# deploy-prod:
# 	cdk synthesize && cdk deploy



