const ContextStrategy = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb');
const Postgres = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDb);
const contextPostgres = new ContextStrategy(new Postgres);

contextMongo.create();
contextPostgres.create();
