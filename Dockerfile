FROM library/nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./build /data/build
