SHELL := /bin/bash

dc := $(shell which docker-compose)
home := ${CURDIR}

# DEV
.PHONY: test

test:
	cd $(home) && $(dc) up  -d --force-recreate && $(dc) logs --tail=1000 -f -t


