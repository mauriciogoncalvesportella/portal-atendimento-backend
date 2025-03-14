FROM node:14-alpine AS caback-build
RUN mkdir -p /home/node/app
COPY . /home/node/app
WORKDIR /home/node/app
RUN rm -rf /home/node/app/anexos
RUN mkdir /home/node/app/anexos
RUN yarn install
RUN yarn build
COPY package*.json /home/node/app/dist
RUN mkdir -p /home/node/app/dist/node_modules
RUN yarn install:prod
COPY .prod.env /home/node/app/dist/.env
COPY ca-certificate.crt /home/node/app/dist/ca-certificate.crt

FROM node:14-alpine AS caback-prod
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --from=caback-build /home/node/app/dist .
EXPOSE 3000
CMD ["node", "main"]
# CMD ["tail", "-f", "/dev/null"]
