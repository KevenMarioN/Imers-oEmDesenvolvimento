# Study with Erick Wendel

## Docker postgres

docker run --name postgres -e POSTGRES_USER=kevenm -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=heroes -p 5432:5433 -d postgres

## List dockers with status running

docker ps

## Entry in the docker

docker exec -it postgres /bin/bash

## Docker Adminer

docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

## MongoDB

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INIT_ROOT_PASSWORD=123456 -d mongo:4

## Client for Mongo

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

## Create user for mongdb

docker exec -it mongodb mongo --host localhost -u admin -p 123456 -authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user : 'keven', pwd: '123456', roles: [{ role : 'readWrite',db: 'herois'}]})"

## This project using Design patterns - Strategy

- [Refactoring Guru](https://refactoring.guru/pt-br/design-patterns/strategy)