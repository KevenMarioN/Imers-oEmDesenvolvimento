const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDb = require('./db/strategies/mongodb');
const heroiShema = require('./db/strategies/mongodb/schemas/heroiSchema');
const HeroRoute = require('./routes/heroRoutes');

const app = new Hapi.Server({
  port : 5000
})
function mapRoutes(instance,methods) {
  return methods.map(method => instance[method]());
}
async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection,heroiShema));
  app.route(...mapRoutes(new HeroRoute(context), HeroRoute.methods()));

  return app;
};

module.exports = main();