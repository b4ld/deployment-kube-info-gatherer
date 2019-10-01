FROM node:8

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 4499

CMD ["npm","start"]