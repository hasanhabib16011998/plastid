FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

EXPOSE 3000

# Run migrations then start dev server
CMD ["sh", "-c", "npx payload migrate && npm run dev"]
