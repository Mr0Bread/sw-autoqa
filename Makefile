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

app-watch:
	docker exec -it autoqa-app-1 npm run watch

example-watch:
	docker exec -it autoqa-fs-example-1 npm run dev

recreate:
	docker stop `docker ps -aq` && docker system prune --all --volumes --force && docker-compose up -d --force-recreate
