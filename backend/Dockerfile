FROM node:18-alpine as eva-backend

# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY .env .

RUN npm ci install

COPY . .

EXPOSE 9000
CMD [ "node", "index.js" ]