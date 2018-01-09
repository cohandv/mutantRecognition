FROM node

#update repository
RUN apt update

#Install PM2
RUN npm install pm2 -g
RUN pm2 update

#Install prerequitites
RUN apt install net-tools ngrep -y

#copy application
COPY ./ /var/lib/mutant/
COPY ./config.redis.js /var/lib/mutant/config.js

#install dependencies
WORKDIR /var/lib/mutant/
RUN npm install

# Run Node Server
CMD ["pm2-docker", "/var/lib/mutant/server.yaml"]
