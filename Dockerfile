FROM node:22-bookworm as builder
WORKDIR /usr/local/app

# Copy in code
COPY client ./client
COPY server ./server
COPY makefile ./

# Expose ports
EXPOSE 3000
EXPOSE 5005

# Start client
CMD ["make", "build"]

