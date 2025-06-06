FROM node:22.13.1-alpine as builder

# Create app directory
WORKDIR /app

COPY package*.json yarn.lock ./
COPY .docker ./.docker/

# Install app dependencies
RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate && yarn build
RUN rm -rf node_modules
RUN yarn install --prod --frozen-lockfile


FROM node:22.13.1-alpine

WORKDIR /app

# RUN apk add --no-cache bash

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.docker ./.docker

RUN echo "Conteúdo de /app/.docker na stage FINAL:" && ls -la /app/.docker # DEBUG

RUN chmod +x .docker/entrypoint.sh

EXPOSE 8080

ENTRYPOINT [ ".docker/entrypoint.sh" ]
