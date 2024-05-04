up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

force-build:
	docker-compose build --no-cache

build:
	docker-compose build

shell:
	docker exec -it autoqa-app-1 sh

make install:
	docker exec -it autoqa-app-1 npm ci
