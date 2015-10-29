#!/bin/bash
apt-get update
apt-get install -y python3.4 python3-pip nginx supervisor

pip3 install gunicorn eve
