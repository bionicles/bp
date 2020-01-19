SHELL := /bin/bash

include .env
export

dc := $(shell which docker-compose)
home := ${CURDIR}

.PHONY:
test: prebuild dev local.e2e

prebuild: prebuild.lint prebuild.audit prebuild.coverage prebuild.unit

prebuild.lint: 
	cd www && yarn lint

prebuild.audit: 
	cd www && yarn audit

prebuild.coverage: 
	cd www && yarn test:coverage -u && yarn upload:coverage

prebuild.unit: 
	cd www && yarn test

up: 
	cd $(home) && $(dc) up --build -d --force-recreate && $(dc) logs --tail=1000 -f -t

console:
	source .env && echo ${HASURA_ADMIN_SECRET} && cd hasura && hasura console --admin-secret ${HASURA_ADMIN_SECRET}

local.e2e: local.lighthouse local.e2e

local.lighthouse:
	lighthouse http://localhost:3000

local.e2e:
	docker run codeception/codeceptjs -e TEST_URL=http://localhost:3000

down:
	docker-compose down

reset: down up

# stage.deploy:
# 	cdk synthesize && cdk deploy

# stage.test.e2e:
# 	docker run

# stage.test.lighthouse:

# # production stuffs
# deploy-prod:
# 	cdk synthesize && cdk deploy



