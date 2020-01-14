SHELL := /bin/bash

dc := $(shell which docker-compose)
home := ${CURDIR}

# DEV
.PHONY: test

test:
	cd pipe/e2e && yarn test

api:
	cd api && docker build -t api

www:
	cd www && docker build -t www

local:
	cd $(home) && $(dc) up  -d --force-recreate && $(dc) logs --tail=1000 -f -t
