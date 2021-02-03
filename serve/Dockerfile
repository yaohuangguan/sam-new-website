FROM node:12.16.1 as build
WORKDIR /app
COPY . .
RUN yarn
WORKDIR /app
COPY . .
# RUN yarn run build
RUN ls -lnta

# step2 使用alpine版的node镜像部署托管
FROM mhart/alpine-node
ENV RUNTIME_ENV=pro
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/serve/package.json /app/serve/app.js ./
RUN yarn
RUN ls -lnta

EXPOSE 3000
CMD node app.js
