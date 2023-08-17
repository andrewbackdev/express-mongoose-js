# express-mongoose-js

Tech stack:

- express
- mongoose
- js
- docker
- docker-compose

## Getting started

### 0. Download Docker and Docker Compose

Follow instructions to install Docker and Docker Compose
https://docs.docker.com/compose/install/

### 1. Download example and install dependencies

Download this example:

```sh
# clone repository
git clone https://github.com/andrewbackdev/express-mongoose-js

# cd to folder
cd express-mongoose-js
```

Install npm dependencies:

```sh
# install dependencies
npm ci
```

### 2. Run database

```sh
# run mongoose database with docker
npm run db:up

```

### 3. Prepare environments

Copy environment and edit it

```sh
# copy environment
cp environments/example.env environments/.env
```

### 4. Reconfigure database

If you need to reconfigure database, edit this file docker-compose.yml
Do not forget to update .env after reconfiguring

### 5. Start the server

```sh
npm run start
```

API available on this URL by default http://localhost:80
