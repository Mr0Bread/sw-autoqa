docker stop `docker ps -aq`
docker system prune --all --volumes --force
docker-compose up -d --force-recreate
