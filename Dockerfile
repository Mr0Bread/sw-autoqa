FROM node:20.16.0

# Create directory for application
WORKDIR /usr/src/app

VOLUME /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY server ./server
COPY tsconfig.json ./
COPY playwright.config.ts ./

RUN npm install
RUN npx playwright install
RUN npx playwright install-deps

CMD ["tail", "-f", "/dev/null"]
