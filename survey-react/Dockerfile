# Use an official node runtime as a parent image
FROM node:10

WORKDIR /app/

# Install dependencies
COPY package.json yarn.lock /app/

RUN yarn

# Add rest of the client code
COPY . /app/

EXPOSE 3000

CMD yarn start