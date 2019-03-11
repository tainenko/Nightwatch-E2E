# Nightwatch.js Dockerfile
FROM alpine:3.9
MAINTAINER tony.ko

RUN apk --no-cache add \
    nodejs \
    npm \
#Don't need this part , unless the container would be a slave of jenkins.    
#    openjdk8 \
#    curl \
  && npm install -g \
    npm@latest \
    nightwatch@'<1.1' \
  # Clean up obsolete files:
  && rm -rf \
    /tmp/* \
    /root/.npm

# Set NODE_PATH to be able to require globally installed packages:
ENV NODE_PATH=/usr/lib/node_modules
WORKDIR /home/nightwatch
