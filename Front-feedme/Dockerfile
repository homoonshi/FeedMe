# Stage 1: Build the application using Node.js
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --silent

COPY public ./public
COPY src ./src

RUN npm run build 

# Stage 2: Serve the application using Nginx
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY certs/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY certs/privkey.pem /etc/ssl/private/privkey.pem

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
