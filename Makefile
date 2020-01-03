SHELL := /bin/bash

dc := $(shell which docker-compose)
home := ${CURDIR}
server = $(home)/trust
react = $(home)/react

# DEV
.PHONY: test

test: local

cloud:
	cd trust && cdk synth

e2e: cloud
	cd e2e && yarn test

local:
	@echo home: $(home)
	@echo docker-compose: $(dc)
	cd $(home) && $(dc) up  -d --force-recreate && $(dc) logs --tail=1000 -f -t
