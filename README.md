# nestjs-docker-prisma-mysql

[![Node.js Testing](https://github.com/fsubal/nestjs-docker-prisma-mysql/actions/workflows/test.yml/badge.svg)](https://github.com/fsubal/nestjs-docker-prisma-mysql/actions/workflows/test.yml)
[![Static analysis checking](https://github.com/fsubal/nestjs-docker-prisma-mysql/actions/workflows/check.yml/badge.svg)](https://github.com/fsubal/nestjs-docker-prisma-mysql/actions/workflows/check.yml)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Application template for [NestJS](https://github.com/nestjs/nest) + Docker + Prisma + MySQL

## Features

Backend core-service with:

- 📱 [**NestJS**](https://docs.nestjs.com/) — latest version
- 🎉 [**TypeScript**](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) - Type checking
- ⚙️ [**Dotenv**](https://docs.nestjs.com/techniques/configuration) - Supports environment variables
- 🗝 [**Authentication**](https://docs.nestjs.com/security/encryption-and-hashing) - JWT, Bcrypt
- 🏪 [**Prisma**](https://www.prisma.io/docs) - Database ORM
- 🏪 [**MySQL**](https://dev.mysql.com/doc/) - Open-Source Relational Database
- 📃 [**Swagger**](https://swagger.io/docs/) - API Documentation
- 📏 [**ESLint**](https://eslint.org/docs/latest/) — Pluggable JavaScript linter
- 💖 [**Prettier**](https://prettier.io/docs/en/) - Opinionated Code Formatter
- 📝 [**Jest**](https://docs.nestjs.com/fundamentals/testing) - Testing framework

## Setup

```bash
# install
$ yarn

# Setup env file for database
$ cp prisma/.env.example prisma/.env

# run containers
$ yarn dev

# setup database ( sync database schema )
$ docker exec -it app yarn db:apply

# insert seed data
$ docker exec -it app yarn db:seed
```

Currently HMR is not enabled, so the server will reload on every file change.

## Use Prisma Studio

You can view / edit DB tables using [Prisma Studio](https://www.prisma.io/studio).

Once you run `yarn dev`, you can open it in `http://localhost:5555`.

## Migration (Development)

Log in to the `app` container and run

```bash
$ docker exec -it app yarn db:migrate:dev
```

## Swagger

Swagger UI is available on `http://localhost:3000/api`

## Test

```bash
# unit tests
$ docker exec -it app yarn test

# e2e tests
$ docker exec -it app yarn test:e2e

# test coverage
$ docker exec -it app yarn test:cov
```
