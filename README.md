# CODER DOJO MASTER

This repo contains the code required to run the frontend website of CoderDojo Master. 

## Architecture

The project is composed of different [Docker](https://www.docker.com/) containers.

- Frontend: in this repo there is the code for the website hosted on the official [CoderdojoMaster](http://coderdojo.disi.unitn.it)     website.
- Backend: the code for the backend server (a python app) is available at https://github.com/CoderDojoMaster/backend

## Contributing

1. Clone this repo
2. Install [Docker](https://www.docker.com/)
3. Install [Docker Compose](https://docs.docker.com/compose/install/)
5. Download the images required to run the project

  ```
  docker-compose pull
  ```

6. Download the frontend dependencies

  ```
  docker-compose run --rm npm install
  ```
  
7. Run the project

  ```
  docker-compose up
  ```
