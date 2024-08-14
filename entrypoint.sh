#!/bin/sh

# CHeck if mode is set
if [ -z "$MODE" ]; then
  echo "MODE environment variable is not set"
  exit 1
fi

if [ "$MODE" = "development" ]; then
  # run server in watch mode
  npm run watch
fi

if [ "$MODE" = "production" ]; then
  # run server
  npm run start
fi
