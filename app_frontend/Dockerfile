FROM node:8

COPY . /app

WORKDIR /app

RUN apt-get update 
RUN apt-get install -y curl wget vim
RUN npm install

EXPOSE 4490

CMD ["npm","run","build"]