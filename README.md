# Description

This is repo running with NodeJS

## Setup

**Requirement**:

- node >= 16.19
- docker >= 3.8
- docker-compose: >= 1.29
- npm => 8.19

**Step 1:**
After you clone the repo, please creating `.env` file in the root folder

Copy and paste:
```
DEV_APP_PORT=
DEV_DB_HOST=
DEV_DB_PORT=
DEV_DB_NAME=
DEV_DB_USERNAME=
DEV_DB_PASSWORD=

TEST_APP_PORT=
TEST_DB_HOST=
TEST_DB_PORT=
TEST_DB_NAME=
TEST_DB_USERNAME=
TEST_DB_PASSWORD=
```
*Note*: This file should **NEVER** been committed to source control, because it contains sensitive information

**Step 2**
<h3>Database</h3>

Note: We are using MySQL as our storage database. In order to run MySQL, you will need to download Docker. Then, run the following command:

## Running the app

```bash
make build_application

# development
$ npm install
$ npm run start:dev
$ npm run migrate
$ npm run seed
```

## Documentation API
```
Swagger: http://localhost:3000/docs
```

## Test

```bash
# unit tests
$ npm run test

$ npm run test:coverage
