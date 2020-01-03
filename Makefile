SHELL := /bin/bash

home := ${CURDIR}
server = $(home)/trust
react = $(home)/react

# DEV
.PHONY: test

test: cloud e2e

cloud:
	cd trust && cdk synth

e2e: cloud
	cd e2e && yarn test
