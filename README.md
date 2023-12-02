# Installation

## Project structure

- web : NextJS frontend website
- server : Login / Signup Authentication
- package: Database schema shared by server and web

## Install Latest NodeJS, Yarn, and MySQL

Install these services in your computer.

## Install packages

```bash
cd ./web
yarn
cd ../server
yarn
cd ../package
yarn
```

## Set environment variables

### Web

Create `./web/.env` file from `./web/.env.example` and replace variable wrapped in parentheses with your own.

```text
NEXT_PUBLIC_BACKEND_URL=http://localhost:{PORT}
```

{PORT} here refers to the port for server.

### Server

Create `./server/.env` file from `./server/.env.example` and replace all variables wrapped in parentheses with your own. Note that {PORT} should be identical to the one in web.

```text
PORT={PORT}
MYSQL_URL=mysql://{DB_USERNAME}:{DB_PASSWORD}@localhost:3306/{DB_NAME}/
JWT_SECRET=jwt_secret
JWT_EXPIRES_IN=1h
DB_USERNAME={DB_USERNAME}
DB_PASSWORD={DB_PASSWORD}
DB_NAME={DB_NAME}
DB_HOST=127.0.0.1
```

# Run guide

1. Start the server

    ```bash
    cd ./server
    yarn dev
    ```
2. Start the web

    ```bash
    cd ./web
    yarn dev
    ```
3. Go to `http://localhost:3000` in your browser
