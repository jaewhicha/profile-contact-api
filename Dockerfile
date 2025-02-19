FROM node:15.14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN yarn install --prod

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "./bin/www" ]