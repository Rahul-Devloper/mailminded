# apps/api/Dockerfile
FROM node:24-alpine

WORKDIR /usr/src/app

# Copy only package metadata first for better layer caching
COPY package*.json ./

# Install ALL dependencies (including dev) for dev container
RUN npm install

# Now copy the rest of the source code
COPY . .

# (Optional but recommended) – generate Prisma client in the image
# If you're using a custom generator output path, this will honor that.
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
