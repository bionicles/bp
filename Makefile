SHELL := /bin/bash

dc := $(shell which docker-compose)
home := ${CURDIR}

# DEV
.PHONY: test
test:
	cd $(home) && $(dc) up  --build -d --force-recreate && $(dc) logs --tail=1000 -f -t

cicd: build lint audit unit-test test-e2e-locally deploy-staging test-e2e-staging

build:
	docker build www

local:
	docker run www

lint:
	docker exec yarn lint

audit:
	docker exec yarn audit

unit-test:
	docker exec yarn test

test-e2e-locally:
	docker run e2e target=localhost:3000

deploy-staging:
	cdk synthesize && cdk deploy

test-e2e-staging:
	docker run

# production stuffs
deploy-prod:
	cdk synthesize && cdk deploy



