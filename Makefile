SHELL := /bin/bash

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

dev: 
	cd $(home) && $(dc) up  --build -d && $(dc) logs --tail=1000 -f -t

local.e2e: local.lighthouse local.e2e

local.lighthouse: dev
	docker run lighthouse target=localhost:3000

local.e2e: dev
	docker run e2e target=localhost:3000

# stage.deploy:
# 	cdk synthesize && cdk deploy

# stage.test.e2e:
# 	docker run

# stage.test.lighthouse:

# # production stuffs
# deploy-prod:
# 	cdk synthesize && cdk deploy



