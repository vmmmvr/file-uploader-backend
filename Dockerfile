# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files to the container
COPY . .

# Copy .env file
COPY .env .env

# Build TypeScript files
RUN npm run build

# Expose the port (if your app runs on port 3000)
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
