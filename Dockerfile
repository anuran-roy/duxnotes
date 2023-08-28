# Use an official Node.js runtime as the base image
FROM node:slim

LABEL maintainer="MISTER NEGATIVE <misternegative21@gmail.com>" \
      org.opencontainers.image.title="DUX NOTES" \
      org.opencontainers.image.description="A Personalised TO-DO LIST APP for Selfhosted Solutions" \
      org.opencontainers.image.authors="Anuran Roy <mail@peterevans.dev>" \
      org.opencontainers.image.url="https://github.com/anuran-roy/duxnotes" \
      org.opencontainers.image.vendor="https://anuran.works/" \
      org.opencontainers.image.licenses="MIT"

COPY LICENSE README.md /
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Start the React app in development mode
CMD ["npm", "start"]
