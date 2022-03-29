const assert = require('assert');
const api = require('../api');
const Postgres = require('./../db/strategies/postgres');
const UserSchema = require('./../db/strategies/postgres/schemas/userSchema');
const ContextStrategy = require('./../db/strategies/base/contextStrategy');
let app = {}

const USER = {
  username : 'Keven',
  password : '123456'
}

const USER_DB = {
    username : USER.username.toLowerCase(),
    password : '$2b$04$4RVFoY0Q859Iq1Se2mbZceD9iGlyJ2KNfasx8r1fY4Y0QqjVrFP1W'
}
describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api;
    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres,UserSchema);
    const context = new ContextStrategy(new Postgres(connectionPostgres,model));
    await context.update(null,USER_DB,true);
  });
  it('Should be able recived token', async () => {
    const result = await app.inject({
      method: "POST",
      url: '/login',
      payload: {
        username : 'keven',
        password : '123456'
      } 
    });
    const { statusCode, payload } = result;
    const data = JSON.parse(payload);
    assert.deepEqual(statusCode,200);
    assert.ok(data.token.length > 10);
  });
  it('Should be able recived unauthorized', async () => {
    const result = await app.inject({
      method: "POST",
      url: '/login',
      payload: {
        username : 'keven',
        password : '123566'
      } 
    });
    const { statusCode } = result;
    assert.deepEqual(statusCode,401);
  });
});