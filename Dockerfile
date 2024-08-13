FROM node:20.16.0

# Create directory for application
WORKDIR /usr/src/app

VOLUME /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npx playwright install
RUN npx playwright install-deps

COPY ./entrypoint.sh ./

RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]

CMD ["/usr/src/app/entrypoint.sh"]
