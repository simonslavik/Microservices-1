# Use official Node.js image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port (change if your app uses a different port)
EXPOSE 3000


# Run the Node.js application (adjust as needed, e.g. index.js or app.js)
CMD ["node", "index.js"]