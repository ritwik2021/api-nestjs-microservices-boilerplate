#!/bin/bash
ls
cd .. 

cd api-nestjs-gateway && pnpm run start:dev && cd -
cd api-nestjs-notification && pnpm run start:dev && cd -
cd api-nestjs-user && pnpm run start:dev && cd -