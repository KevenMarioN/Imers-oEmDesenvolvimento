const assert = require('assert');
const Context = require('../db/strategies/base/contextStrategy');
const MongoDb = require('../db/strategies/mongodb');

const context = new Context(new MongoDb());

describe('MongoDB Suite de testes', function () {
  this.beforeAll(async () => {
    await context.connect();
  });
  it('Connection', async () => {
    const result = await context.IsConnected();
    assert.deepEqual(result, 'Conectado')
    await context.disconnect();
  });
});