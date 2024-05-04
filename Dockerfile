FROM node:20.12.2-alpine3.19

# Set bash by default
SHELL ["/bin/sh", "-o", "pipefail", "-c"]

# Create directory for application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Clear npm cache
RUN npm cache clean --force

# Install packages
RUN npm install

# Copy local server to container
COPY ./codecept.conf.js ./
COPY ./server/ ./server/

# Run within container
CMD [ "node", "./server/server.js" ]
