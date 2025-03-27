FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.2.2 --activate

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
