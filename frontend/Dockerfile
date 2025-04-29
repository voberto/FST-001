# Use the official Node.js image
FROM node:23-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the frontend directory
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code
COPY ./frontend .

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]