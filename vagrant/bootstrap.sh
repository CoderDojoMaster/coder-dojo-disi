#!/bin/bash

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update

echo "Installing MongoDB"
sudo apt-get install -y mongodb-org

sudo service mongod start

echo "Installing Python3, nginx and supervisor"
apt-get install -y python3.4 python3-pip nginx supervisor

echo "installing python requirements"
pip3 install -r /project/api/requirements.txt

echo "MongoDB setup"
mongo /vagrant/mongoDB/mongoSetup.js