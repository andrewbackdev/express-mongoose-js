# Express Mongoose JS Sample Application

This repository contains a sample application built using the following technologies:

- Express
- Mongoose
- JavaScript
- Docker
- Docker Compose

## Getting started

### Prerequisites

Before you begin, make sure you have Docker and Docker Compose installed on your system. If not, follow the instructions in the [Docker documentation](https://docs.docker.com/compose/install/) to install them.

### Installation

1. Clone this repository:

```sh
git clone https://github.com/andrewbackdev/express-mongoose-js
cd express-mongoose-js
```

2. Install the required npm dependencies:

```sh
npm ci
```

### Usage

1. Start the MongoDB database using Docker:

```sh
npm run db:up
```

2. Prepare the environment by copying and editing the environment file:

```sh
cp environments/example.env environments/.env
```

3. If you need to reconfigure the database, you can edit the `docker-compose.yml` file. Remember to update the `.env` file accordingly.
4. Start the server:

```sh
npm run start
```

6. Access the API at the default URL: http://localhost:80

### Notes

- Make sure you have Docker and Docker Compose installed before proceeding.
- The MongoDB database will be started using Docker.
- You can copy the example environment file and modify it with your specific configurations.
- The server will be accessible at http://localhost:80 by default.

Feel free to explore, modify, and build upon this sample application according to your needs.

**Disclaimer**: This is a sample application created for demonstration purposes only. It's recommended to review and adjust the configurations, security settings, and deployment processes before using it in a production environment.
