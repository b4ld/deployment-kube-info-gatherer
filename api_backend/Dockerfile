FROM node:8

COPY . /api

WORKDIR /api

RUN apt-get update 
RUN apt-get install -y docker vim

RUN npm install

EXPOSE 4499

CMD ["npm","start"]