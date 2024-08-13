# AutoQA
This is the web application used by Scandiweb team to test the submitted applications

## Table of Contents
- [Getting Started](#getting-started)
- [File structure](#file-structure)

## Getting Started
The application have to be run using docker-compose since it uses Playwright framework to run tests.
Playwright installs native binaries that are custom for each OS

### Prerequisites
- Docker
- docker-compose
- Node.js >=20
- npm >=10

Execute the following command to start the application in dev mode:
```bash
make up
```

It will build the docker image and start the application in dev mode.
The application will be available at http://localhost:8080

## Tech stack
The application is built using the following technologies:
- [Node.js](https://nodejs.org/en/) - used for runtime
- [Playwright](https://playwright.dev/) - used for testing
- [TypeScript](https://www.typescriptlang.org/) - typesafe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - used for styling
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Fastify](https://www.fastify.io/) - used for server
- [Piscina](https://github.com/piscinajs/piscina) - used for running tests in separate thread
- [Biome](https://biomejs.dev/) - used for linting and formatting

## File structure
At the root of the project you will find the following files:
- docker-compose.base.yml - base docker-compose file containing common configuration of service
- docker-compose.dev.yml and docker-compose.prod.yml - docker-compose files for dev and prod environments
- Dockerfile - dockerfile used to build the docker image
- package.json - package.json file
- package-lock.json - package-lock.json file
- tsconfig.json - TypeScript configuration file
- playwright.config.ts - playwright configuration file
- tailwind.config.ts - tailwind configuration file
- biome.json - biome configuration file
- recreate.sh - script to recreate the docker image. Used on server by cron to recreate service once in a while
- Makefile - contains set of commands to build and run the application in different modes
- entrypoint.sh - shell script that is executed when the container is started
- server - directory containing the application code
- var - directory containing the log file. Created automatically by the application
- playwright-report - directory containing the playwright report. Created automatically by the application
- reports - directory containing the report files. Created automatically by the application
- test-results - directory containing the test results. Created automatically by the application

### server
The server directory contains the application code.

Contains the following files/directories:
- public - directory containing all the public files
  - assets - directory containing the public assets
  - index.html - the main html file
  - error.html - the error html file. Not used currently
- tests - directory containing the tests
  - junior-web-required - directory containing required junior web tests
  - junior-web-advanced - directory containing optional advanced junior web tests
  - full-stack - directory containing the full stack tests
- test-helpers - directory containing the helper functions used by the tests
- worker.mjs - the worker file. Used by the application to run the tests in separate thread to avoid blocking the main thread
- server.ts - the main server file

## Make commands
The following commands are available:
- make up - starts the application in dev mode
- make down - stops the application in dev mode
- make prod-up - starts the application in prod mode
- make force-build - builds the docker image without cache
- make build - builds the docker image
- make app-shell - opens a shell in the application container
- make app-install - installs the application dependencies
- make app-install-npm - installs the npm dependencies
- make app-install-playwright - installs the playwright and necessary binaries
- make app-install-playwright-deps - installs additional playwright dependencies

