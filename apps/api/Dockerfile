# apps/api/Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only package info first (for caching)
COPY package*.json ./

# Install ALL dependencies, including devDependencies
RUN npm install --include=dev

# Now copy the rest of the app
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
