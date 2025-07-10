# Base image with Node.js
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy ONLY backend directory contents
COPY backend/package*.json ./
COPY backend/tsconfig.json ./
COPY backend/prisma ./prisma
COPY backend/src ./src
RUN npm install

# Copy the rest of the project files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Use compiled JS files from /dist
WORKDIR /app/dist

# Expose your app port (usually 3000 or as per your Express app)
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
