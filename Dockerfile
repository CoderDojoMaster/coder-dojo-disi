FROM library/nginx:1.9.6

COPY ./nginx/nginx.prod.conf /etc/nginx/nginx.conf

COPY ./build /data/build
