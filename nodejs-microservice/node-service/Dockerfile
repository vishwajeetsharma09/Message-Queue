# Use official Node.js image or Node verison used 
FROM node:14  

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the Node.js service port
EXPOSE 3000

# Start the Node.js app
CMD ["node", "app.js"]
