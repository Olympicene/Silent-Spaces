
<p align="center">
  <img src="./client/src/assets/logo_black2.svg" width="400" title="Silent Spaces Logo">
</p>

Silent Spaces is an all-in-one study buddy helping you find the best study spaces near you. Built with students in mind Silent Spaces relies on crowdsourced info to deliver frequent, high-quality updates on crowdedness, ambient noise level, and wifi connectivity. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- [Node.js](https://nodejs.org/) - v21.6.1+
- [npm](https://www.npmjs.com/) - 10.2.4+
- [docker](https://www.docker.com/) - 26.1.3+

### Deployment

Project is meant to be built and deployed with docker

### `docker buildx build . --tag silent_spaces`

This builds the docker image

### `docker run --env-file .env --name silentspaces.info -p 5005:5005 -p 3000:3000 silent_spaces`

Runs the docker image with provided env file

## Built With

* [Express.js](https://expressjs.com/) - The web framework used
* [Node.js](https://nodejs.org/) - JavaScript runtime
* [npm](https://www.npmjs.com/) - Dependency Management

## Available Scripts

In the project directory, you can run:

### `make test`

Runs the app in the test mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You must run `make test` again when you make changes.\
You may also see any lint errors in the console.

### `test_client`

Starts up the react frontend

### `test_server`

Starts up the express backend

### `make build`

Should only be used for production