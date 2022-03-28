const Hapi = require('@hapi/hapi');

const ContextStrategy = require('./db/strategies/base/contextStrategy');
const Mongodb = require('./db/strategies/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiShema');
const HeroRoute = require('./routes/heroiRoutes');

const connection = Mongodb.connect();
const context = new ContextStrategy(new Mongodb(connection,HeroiSchema));
const app = new Hapi.Server({
  port : 5000
});
function mapRoutes(instance,methods){
  return methods.map(method => instance[method]())
}
async function main() {
  app.route(mapRoutes(new HeroRoute(context),HeroRoute.methods()));
  await app.start()
  console.log('SERVE RUNNING IN PORT:', app.info.port);
  return app;
}

module.exports = main();