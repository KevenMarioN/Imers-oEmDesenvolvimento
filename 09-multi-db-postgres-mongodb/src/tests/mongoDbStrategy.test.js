const assert = require('assert');
const Context = require('../db/strategies/base/contextStrategy');
const MongoDb = require('../db/strategies/mongodb');

const context = new Context(new MongoDb());

const MOCK_HEROI_CREATE = {
  nome : 'Flash',
  poder : 'Velocidade'
}

const MOCK_HEROI_DEFAULT = {
  nome : `Davi-${Date.now()}`,
  poder : 'Baladeira'
}

describe('MongoDB Suite de testes', function () {
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEROI_DEFAULT);
  });
  this.afterAll(async () => {
    await context.disconnect();
  });
  it('Connection', async () => {
    const result = await context.IsConnected();
    assert.deepEqual(result, 'Conectado')
  });
  it('Create', async () => {
    const {nome , poder } = await context.create(MOCK_HEROI_CREATE);
    assert.deepEqual({nome,poder},MOCK_HEROI_CREATE);
  });
  it.only('Read', async () => {
    const [{nome,poder}] = await context.read({ nome : MOCK_HEROI_DEFAULT.nome});
    const result = {nome, poder};
    assert.deepEqual(result,MOCK_HEROI_DEFAULT)
  });
});