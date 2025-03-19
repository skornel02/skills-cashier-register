# Skills cashier register

## Edit test data

To edit the available test data, you can set the following environment variables:

```bash
export CUSTOMERS_JSON='[{...}]'
export PRODUCTS_JSON='[{...}]'
```

## Getting Started with cashier application

If you install the application for the first time, you need to install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploy on docker

```bash
docker build -t skills-cashier-register .
docker run -d -e TARGET_API="http://host.docker.internal:8998" -e TARGET_PATH="api/purchase" -p 3000:3000 skills-cashier-register
```
## Start test server

This is a test server to verify that the application is working correctly. (Both starts on port 8998)

### NodeJS

```bash
node ./testing/node/test-server.mjs
```

### ASP.NET Core

```bash
cd ./testing/dotnet
dotnet run
```