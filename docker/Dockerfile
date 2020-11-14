# Step 1
FROM harbor.emotibot.com/bfop/general-node-base:d3289be1-20200115-0735 AS build-env
MAINTAINER "Leuchy"

ADD package.json build/package.json
RUN cd build && npm --registry https://registry.npm.taobao.org install

ADD build build/build
ADD config build/config
ADD src build/src
ADD static build/static
ADD index.html .babelrc .editorconfig .eslintignore .eslintrc.js .postcssrc.js .eslintrc.js .eslintignore build/
RUN npm install qs
RUN npm uninstall element-ui && npm i element-ui -S
RUN cd build && npm install --production && npm run build

# Step 2

FROM harbor.emotibot.com/image-base/alpine-nginx:v1.17

WORKDIR /build/dist

RUN touch /build/dist/check.do

COPY /docker/conf/nginx.conf.template /etc/nginx/nginx.conf.template

COPY --from=build-env /build/dist/index.html /build/dist/
COPY --from=build-env /build/dist/static /build/dist/static

COPY /docker/entrypoint.sh entrypoint.sh
COPY /docker/run_nginx.sh run_nginx.sh

HEALTHCHECK CMD curl -f http://localhost:$STOCK_TASK_UI_PORT/ || exit 1
ENTRYPOINT ["./entrypoint.sh"]
