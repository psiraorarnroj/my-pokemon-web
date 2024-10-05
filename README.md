## My Pokemon Web

This is a web application that allows users to view pokemon.

## Requirements

- Node 18
- Git (optional)
- Docker (optional)

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/psiraorarnroj/my-pokemon-web.git
cd my-pokemon-web
npm install
```

## Steps for develop and build application

### Develop

To develop the application, run the following

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.

### Build

To run the application in production mode, run the following

```bash
npm run build
npm run start
```

### Use Docker

You can also run this app as a Docker container:
Step 1: Clone the repo

```bash
git clone https://github.com/psiraorarnroj/my-pokemon-web.git
```

Step 2: Build the Docker image

```bash
docker build -t my-pokemon-web .
```

Step 3: Run the Docker container locally:

```bash
docker run -p 3000:3000 --name my-pokemon-web -d my-pokemon-web
```

### Use Docker Compose

You can also run this app as a Docker Compose container:
Step 1: Clone the repo

```bash
git clone https://github.com/psiraorarnroj/my-pokemon-web.git
```

Step 2: Build the Docker Compose image

```bash
docker-compose build
```

Step 3: Run the Docker Compose container locally:

```bash
docker-compose up -d
```
