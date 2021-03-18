FROM node

WORKDIR /app
USER root:root
COPY . /app
# # ARG PORT=5000
# # ARG ENV="production"
# # ARG DD_APPID=""
# # ARG API_HOST="http://127.0.0.1:8088"
RUN npm install &&  npm run build

FROM nginx

RUN mkdir /app
COPY --from=0 /app/dist /app
# COPY --from=0 /app/* /app/
COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf

