const Hapi = require('@hapi/hapi');

const ContextStrategy = require('./db/strategies/base/contextStrategy');
const Mongodb = require('./db/strategies/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiShema');

const connection = Mongodb.connect();
const context = new ContextStrategy(new Mongodb(connection,HeroiSchema));
const app = new Hapi.Server({
  port : 5000
});

async function main() {
  app.route([
    {
      path : '/herois',
      method : 'GET',
      handler : (request,head) => {
        return context.read();
      }
    }
  ]);
  app.start();
  console.log('RUNNING IN PORT :', app.info.port);
}

main();