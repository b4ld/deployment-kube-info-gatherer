FROM node:8

COPY . /app

WORKDIR /app

RUN apt-get update 
RUN apt-get install -y docker vim

RUN npm install
RUN cd frontend && npm install

EXPOSE 4490
EXPOSE 4499

CMD ["npm","run","build"]