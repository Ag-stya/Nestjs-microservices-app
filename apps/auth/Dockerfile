FROM node:alpine As development

# Step 1: Set working dir
WORKDIR /usr/src/app

# Step 2: Copy the root-level package files
COPY ../../package*.json ./

# Step 3: Install all dependencies for the monorepo
RUN npm install

# Step 4: Copy full monorepo into container
COPY ../../ ./

# Step 5: Build only the auth app
RUN npm run build auth

# ----------------------------------
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ../../package*.json ./
RUN npm install --only=production

COPY ../../ ./

# Copy the built files from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Start the auth microservice
CMD ["node", "dist/apps/auth/main"]
