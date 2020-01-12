FROM node:8

COPY . /app

WORKDIR /app

RUN npm install
RUN apt-get update 
RUN apt-get install -y docker

EXPOSE 4499

CMD ["npm","run","build"]