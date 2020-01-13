SHELL := /bin/bash

dc := $(shell which docker-compose)
home := ${CURDIR}

# DEV
.PHONY: test

test:
	cd test && yarn test

pipe:
	cd pipe/docker && docker build -t bionicle/pipe && docker push 

cloud:
	cd pipe && cdk synth

local:
	@echo home: $(home)
	@echo docker-compose: $(dc)
	cd $(home) && $(dc) up  -d --force-recreate && $(dc) logs --tail=1000 -f -t
