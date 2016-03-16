FROM library/nginx

COPY ./nginx/nginx.prod.conf /etc/nginx/nginx.conf

COPY ./build /data/build
