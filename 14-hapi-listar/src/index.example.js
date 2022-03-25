const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb');
const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema');


const app = new Hapi.Server({
  port : 5000
})

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection,heroiSchema));
  app.route([
    {
      path : '/herois',
      method : 'GET',
      handler : (request,head) => {
        return context.read()
      }
    }
  ]);

  await app.start();
};

main();