# build stage
FROM node:15-alpine3.10 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# prod stage
FROM nginx:1.18-alpine as prod-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY config/nginx.conf /etc/nginx/nginx.conf

# run
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
