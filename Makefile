SHELL := /bin/bash

dc := $(shell which docker-compose)
home := ${CURDIR}
terraform = $(home)/deliver/_aws/_terraform
server = $(home)/api
react = $(home)/react
tools = $(home)/tools

# DEV
.PHONY: test

test: cloud e2e

cloud:
	cd trust && cdk synth

e2e: cloud
	cd e2e && yarn test

docker-compose:
	@echo home: $(home)
	@echo docker-compose: $(dc)
	cd $(home) && $(dc) up  -d --force-recreate && $(dc) logs --tail=1000 -f -t
