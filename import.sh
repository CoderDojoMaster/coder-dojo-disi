#!/usr/bin/env bash

exec docker-compose --x-networking run --rm api_server python api/import.py