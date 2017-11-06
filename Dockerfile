FROM node:8

# Copy the server files
COPY . /robototes-website-api
WORKDIR /robototes-website-api

# Install our dependencies
RUN [ "yarn", "install", "--production", "--non-interactive", "--pure-lockfile" ]

# Basic configuration
ENV PORT=3000 IP="0.0.0.0"

# Tell the user what ports to expose
EXPOSE $PORT/tcp

# Image metadata
LABEL name="robototes-website" service="api" version="2.0.0-alpha" maintainer="webmaster@robototes.com"

# Run the server
CMD [ "yarn", "start" ]
