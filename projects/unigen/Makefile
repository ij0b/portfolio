all: install start

install:
	npm install

start:
	npm run dev

create:
	node cli/create-project.js new-unigen-app

stop:
	docker-compose down

build:
	docker-compose build

reset: stop
	rm -rf node_modules package-lock.json
	npm cache clean --force
	$(MAKE) install

.PHONY: all install start stop build reset create
