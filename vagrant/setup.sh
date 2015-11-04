#!/usr/bin/env bash
sudo -u vagrant mkdir -p config
sudo -u vagrant mkdir -p /project/log

cp -f -v /vagrant/gunicorn.conf /home/vagrant/config/gunicorn.conf

service supervisor stop
#cp -f -v /vagrant/gunicorn-supervisor.conf /etc/supervisor/conf.d/gunicorn-supervisor.conf
cp -f -v /vagrant/flask-supervisor.conf /etc/supervisor/conf.d/flask-supervisor.conf
service supervisor start

service nginx stop
cp -f -v /vagrant/nginx.conf /etc/nginx/nginx.conf
service nginx start
