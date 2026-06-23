FROM node:24-alpine AS dependencies
WORKDIR /app

ENV HUSKY=0

COPY .husky/prepare.script.mjs .husky/prepare.script.mjs
COPY package.json package-lock.json ./
COPY web/package.json web/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN npm ci



FROM dependencies AS build
WORKDIR /app

COPY . .

RUN npm run build --workspace=@task/web



FROM nginx:1.27-alpine AS production

COPY web/conf.default.nginx /etc/nginx/conf.d/default.conf
COPY --from=build /app/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
