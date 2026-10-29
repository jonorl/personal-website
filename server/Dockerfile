FROM node:22-alpine
WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache openssl

RUN npm ci --ignore-scripts

COPY . .

ARG GIT_SHA=dev
ENV NODE_ENV=production GIT_SHA=$GIT_SHA
EXPOSE 3002

USER node

CMD ["node", "index.js"]