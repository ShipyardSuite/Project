# microservice-template
Microservice Template for Shipyard GCDN

---

This is a basic template needed to create a new microservice for Shipyard GCDN.

## Features

- Front-end in ReactJS
- Back-end in TypeScript NodeJS
- MongoDB as main database
- brunch.io for packaging
- Express-Gateway for microservice management.
- .env template file
- Docker-Compose file for development work.
- Dockerfiles for docker build and gateway.
- NewRelic plugin

## Environmental variables required to run this service

- **SERVICE_NAME:** Name of microservice
- **SERVICE_PORT:** The port of the service to run at.
- **DATABASE_URL:** URL for Database.
- **NEWRELIC_LICENSE:** License token for NewRelic.

## Usage
Start by running `docker-compose up -d` after environment variables have been defined.

# API

A Postman generated ...
- API definitions can be found in the `gateway/api.json` file.
- API documentation can be found at https://documenter.getpostman.com/view/10341061/SzS5wSfA

# Creating a new Service

## Documentation

Please refer to this documentation as a template for the documentation of your service.

1. Create a new repository, using this as template.

2. Create a new branch called `develop` and set it to default.

2. For the API, create a new API collection in postman, copy the api definitions into the `gateway/api.json` file. Also create a documentation, publish and link it.

3. Mandatory changes for each service per file:

- `package.json`: Change the title, description and any link according to the new microservice.
- `/app/assets/index.html`: Change stylesheet and javascript directory links to service name.
- `/brunch-config.js`: Change 'joinTo' folder names to service name.
- `/gateway/gateway.config.yml`: Add the service informations, check out the template service configuration for reference.

4. On Dockerhub, create a new Repository, link it to the new Repository and create the following 2 build rules:

| Source Type | Source  | Docker Tag | Dockerfile location | build Context | Autobuild | Build Caching |
| ----------- | ------- | ---------- | ------------------- | ------------- | --------- | ------------- |
| Branch      | develop | develop    | Dockerfile          | /             | true      | true          |
| Branch      | master  | latest     | Dockerfile          | /             | true      | true          |

## License
This project is released under the [Apache version 2](LICENSE) license.
