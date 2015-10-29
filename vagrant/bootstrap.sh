#!/bin/bash
apt-get update
apt-get install -y python3.4 python3-pip nginx supervisor

pip3 install gunicorn eve

echo "Installing MongoDB"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

sudo service mongod start

echo "MongoDB setup"
mongo /vagrant/mongoSetup.js