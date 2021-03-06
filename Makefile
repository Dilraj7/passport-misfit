MOCHA=./node_modules/.bin/mocha
TEST_FILES=test/*.test.js

ifdef TEST
	TEST_FILES=test/$(TEST).test.js
endif


test:
	@$(MOCHA) --timeout 1000 --reporter spec $(TEST_FILES)

test-debug:
	@$(MOCHA) --debug-brk --timeout 300000000 --reporter spec $(TEST_FILES)

.PHONY: test
