FROM node:12.4-alpine

# tool to wait for mongo boot delay
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

WORKDIR /opt/su

COPY package.json package-lock.json ./
RUN ["npm", "install"]

COPY bin bin
COPY src src

CMD ["node", "/opt/su/bin/su.js"]
