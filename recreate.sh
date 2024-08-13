# DO NOT RUN LOCALLY SINCE IT WILL DELETE ALL DOCKER DATA

docker stop `docker ps -aq`
docker system prune --all --volumes --force
docker-compose -f docker-compose.prod.yml up -d --force-recreate
