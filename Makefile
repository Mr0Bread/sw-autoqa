up:
	docker-compose -f docker-compose.dev.yml up -d

prod-up:
	docker-compose -f docker-compose.prod.yml up -d

down:
	docker-compose -f docker-compose.base.yml down --remove-orphans

force-build:
	docker-compose -f docker-compose.base.yml build --no-cache

build:
	docker-compose -f docker-compose.base.yml build

app-shell:
	docker exec -it autoqa-app-1 sh

app-install:
	make app-install-npm && make app-install-playwright && make app-install-playwright-deps

app-install-npm:
	docker exec -it autoqa-app-1 npm install

app-install-playwright:
	docker exec -it autoqa-app-1 npx playwright install

app-install-playwright-deps:
	docker exec -it autoqa-app-1 npx playwright install-deps
