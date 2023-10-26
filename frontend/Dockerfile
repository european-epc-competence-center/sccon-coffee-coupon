# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]