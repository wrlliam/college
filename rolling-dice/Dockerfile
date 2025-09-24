# Use Bun official image
FROM oven/bun:1-alpine

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb (if available)
COPY package*.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose port 5173 (Vite's default dev server port)
EXPOSE 5173

# Start the development server
# The --host flag allows external connections to the container
CMD ["bun", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]