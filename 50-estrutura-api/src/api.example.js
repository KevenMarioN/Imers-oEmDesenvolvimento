const express = require('express');
const asyncHandler = require('express-async-handler');

const Context = require('./db/strategies/base/contextStrategy');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiShema');
const MongoDb = require('./db/strategies/mongodb');


async function main() {
  const app = express();
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection,HeroiSchema));
  app.use(express.json());

  app.use('/herois',asyncHandler (async (request,response) => {
    const data = await context.read();
    response.send(data);
  }));

  app.listen(5000,() => {
    console.log('RUNNING 5000! 🚀 ');
  })
}

main();