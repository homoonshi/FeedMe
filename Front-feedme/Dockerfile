# Stage 1: Build the application using Node.js
FROM node:20 AS build

# Set the working directory for the build stage
WORKDIR /app

# Copy the package.json and package-lock.json (if available) and install dependencies
COPY package.json package-lock.json ./
RUN npm install --silent

# Copy the public directory and source code
COPY public ./public
COPY src ./src

# Build the application
RUN npm run build 

# Stage 2: Serve the application using Nginx
FROM nginx:latest

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the built application from the build stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy SSL certificate and key
COPY certbot/etc/letsencrypt/live/Feedme/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY certbot/etc/letsencrypt/live/Feedme/privkey.pem /etc/ssl/private/privkey.pem

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 and 443
EXPOSE 80
EXPOSE 443

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
