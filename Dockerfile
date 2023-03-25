FROM node:19.3.0

# setup and set working directory
RUN mkdir /app
WORKDIR /app

# setup project
ADD . .
RUN yarn
RUN yarn tailwind:build

# open port 8080 from image to host
EXPOSE 8080

CMD ["yarn", "start"]
