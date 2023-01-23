#!/bin/bash

cd api-nestjs-gateway && pnpm run lint:fix && cd -
cd api-nestjs-notification && pnpm run lint:fix && cd -
cd api-nestjs-user && pnpm run lint:fix && cd -