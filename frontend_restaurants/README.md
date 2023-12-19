# Installation

## Project structure

-   frontend_restaurants : NextJS frontend website

## Install Latest NodeJS, Yarn

Install these services in your computer.

## Install packages

```bash
cd ./frontend_restaurants
yarn
```

## Set environment variables

Create `./frontend_restaurants/.env` file from `./frontend_restaurants/.env.example` and replace variable wrapped in parentheses with your own.

```text
NEXT_PUBLIC_BACKEND_URL=http://localhost:{PORT}
```

{PORT} here refers to the port for server.

# Run guide

1. Start the web

    ```bash
    cd ./frontend_restaurants
    yarn dev
    ```

2. Go to `http://localhost:3005` in your browser
