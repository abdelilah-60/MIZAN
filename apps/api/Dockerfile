FROM oven/bun:1.1-alpine
WORKDIR /app

# Install ca-certificates to verify SSL/TLS connections
RUN apk add --no-cache ca-certificates

# Copy package.json
COPY package.json ./

# Install dependencies
RUN bun install

# Copy source code and Prisma schema/configs
COPY . .

# Generate Prisma client using the local schema
RUN bunx prisma generate

# Expose port
EXPOSE 3000

# Start Hono API server
CMD ["bun", "run", "src/index.ts"]
