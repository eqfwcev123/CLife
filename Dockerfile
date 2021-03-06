FROM node:12.16

WORKDIR /usr/src/app

ENV NODE_ENV production

RUN apt -y update && apt -y dist-upgrade && apt -y autoremove
RUN apt-get install vim -y

COPY ./package.json ./
RUN npm install 

COPY . ./srv/clife
WORKDIR /srv/clife

CMD /bin/bash