# Description

This is repo running with NodeJS

## Setup

**Requirement**:

- node >= 16.19
- docker >= 3.8
- npm => 8.19

**Step 1:**
After you clone the repo, please creating `.env` file in the root folder

Copy and paste:
```
DEV_APP_PORT=3000
DEV_DB_HOST=127.0.0.1
DEV_DB_PORT=33060
DEV_DB_NAME=football_dev
DEV_DB_USERNAME=root
DEV_DB_PASSWORD=123456
```


**Step 2**

```bash
npm install
```

<h3>Database</h3>

Note: We are using MySQL as our storage database. In order to run MySQL, you will need to download Docker. Then, run the following command:

```bash
make build_application
```

## Running the app

```bash
# development
$ npm run start

$ npx sequelize-cli db:seed:all                                                          
```

## Test

**Note:** we don't have any tests for now. If you like to contribute for tests, please go ahead and create ticket!

```bash
# unit tests
$ npm run test











