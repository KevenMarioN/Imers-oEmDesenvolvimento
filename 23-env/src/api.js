const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const HapiJwt = require('hapi-auth-jwt2');

const ContextStrategy = require('./db/strategies/base/contextStrategy');
const Mongodb = require('./db/strategies/mongodb');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroiShema');
const HeroRoute = require('./routes/heroRoutes');
const AuthRoutes = require('./routes/authRoutes');
const Postgres = require('./db/strategies/postgres');
const UserSchema = require('./db/strategies/postgres/schemas/userSchema');

const JWT_SECRET = "MEU_SEGREDO"

const app = new Hapi.Server({
  port: 5000
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}
async function main() {
  const connection = Mongodb.connect();
  const context = new ContextStrategy(new Mongodb(connection, HeroiSchema));
  
  const connectionPostgres = await Postgres.connect();
  const model = await Postgres.defineModel(connectionPostgres,UserSchema);
  const contextPostgres = new ContextStrategy(new Postgres(connectionPostgres,model));
  const swaggerOptions = {
    info: {
      title: 'API HEROS - #CursoNodeBR',
      version: 'v1.0',
    }}
  await app.register([
    Inert,
    Vision,
    HapiJwt,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);
  app.auth.strategy('jwt','jwt',{
    key : JWT_SECRET,
    // options : {
    //   expiresIn : 20
    // }
    validate : async (data,request) => {
      const [result] = await contextPostgres.read({
        username : data.username.toLowerCase()
      })
      if(!result){
        return {
          isValid : false
        }
      }
      return {
        isValid : true
      }
    }
  });
  app.auth.default('jwt');
  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET,contextPostgres),AuthRoutes.methods())
  ]);
  await app.start()
  console.log('SERVE RUNNING IN PORT:', app.info.port);
  return app;
}

module.exports = main();