.DEFAULT_GOAL := check

init:
	@yarn install

start:
	@yarn start

check:
	@yarn test-ci
	@yarn build
