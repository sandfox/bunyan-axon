REPORTER ?= dot
TESTS = $(shell find ./test/* -name "*.js")

test:
	@./node_modules/.bin/mocha --colors -t 10000 --require should --reporter $(REPORTER) $(TESTS)


.PHONY: test
