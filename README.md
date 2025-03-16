# Skills cashier register

## Edit test data

To edit the available test data, you can edit the file `./src/lib/static-data.ts`.

## Getting Started with cashier application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deploy on docker

```bash
docker build -t skills-cashier-register .
docker run -d -e TARGET_API="http://host.docker.internal:8998" -p 3000:3000 skills-cashier-register
```

## Start test server

This is a test server to verify that the application is working correctly.

### NodeJS

```bash
node ./testing/node/test-server.mjs
```

### ASP.NET Core

```bash
cd ./testing/dotnet
dotnet run
```