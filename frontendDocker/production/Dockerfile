FROM library/node

RUN ["npm", "install", "-g", "gulp"]

ENV NODE_ENV production

COPY . /data

WORKDIR /data

RUN ["npm", "install", "--no-bin-links"]

RUN ["gulp", "build"]