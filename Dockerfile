# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Create an .npmrc file with ignore-scripts=true
RUN echo "ignore-scripts=true" > .npmrc
RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev
RUN npm cache clean --force
# Clearing the SWC cache
RUN rm -rf /root/.cache/next-swc

# Install project dependencies, excluding optional optimization packages
RUN npm install --no-optional --legacy-peer-deps
RUN npm install sharp --legacy-peer-deps
# Install serve globally
RUN npm install -g serve --legacy-peer-deps

COPY . .

RUN npx next build
RUN npx next export

EXPOSE 3000

# Use serve to serve the static files
CMD ["serve", "-p", "3000", "-s", "out"]
