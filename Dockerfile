# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of your application code
COPY . .

# Compile TypeScript code into JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run your app
# RUN npm run start
CMD [ "node", "dist/index.js" ]