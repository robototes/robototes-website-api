FROM node:8
LABEL name="robototes-website" service="api" version="2.0.0-alpha" maintainer="webmaster@robototes.com"

# Install our dependencies
RUN [ "yarn", "install", "--production", "--non-interactive" ]

# Copy the server files
COPY server.js package.json yarn.lock routes/ ./

# Basic configuration
ENV PORT=3000 IP="0.0.0.0"

# Tell the user what ports to expose
EXPOSE 3000/tcp

# Run the server
CMD [ "yarn", "start" ]
