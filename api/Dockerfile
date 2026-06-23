FROM node:24-alpine AS dependencies
WORKDIR /app

ENV HUSKY=0

COPY .husky/prepare.script.mjs .husky/prepare.script.mjs
COPY package.json package-lock.json ./
COPY api/package.json api/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm ci



FROM dependencies AS build
WORKDIR /app

COPY . .

RUN npm run build --workspace=@task/shared && npm run build --workspace=@task/api



FROM node:24-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV HUSKY=0

COPY .husky/prepare.script.mjs .husky/prepare.script.mjs
COPY package.json package-lock.json ./
COPY api/package.json api/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm ci --omit=dev

COPY --from=build /app/api/dist api/dist
COPY --from=build /app/packages/shared/dist packages/shared/dist

EXPOSE 3000
CMD ["npm", "run", "start", "--workspace=@task/api"]
