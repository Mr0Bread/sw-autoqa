up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

force-build:
	docker-compose build --no-cache

build:
	docker-compose build

app-shell:
	docker exec -it autoqa-app-1 sh

app-install:
	docker exec -it autoqa-app-1 npm install

example-install:
	docker exec -it autoqa-example-1 npm install

app-watch:
	docker exec -it autoqa-app-1 npm run watch

example-watch:
	docker exec -it autoqa-example-1 npm run dev
