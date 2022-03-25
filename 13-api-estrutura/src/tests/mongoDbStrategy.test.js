const assert = require('assert');
const Context = require('../db/strategies/base/contextStrategy');
const MongoDb = require('../db/strategies/mongodb');
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroiSchema');

const MOCK_HEROI_CREATE = {
  nome: 'Flash',
  poder: 'Velocidade'
}

const MOCK_HEROI_DEFAULT = {
  nome: `Davi-${Date.now()}`,
  poder: 'Baladeira'
}

const MOCK_HEROI_ACTULIZATION = {
  nome: `Jose-${Date.now()}`,
  poder: 'RICO'
}
let context = {};
describe('MongoDB Suite de testes', function () {
  let MOCK_HEROI_ID;
  this.beforeAll(async () => {
    const connection = MongoDb.connect();
    context = new Context(new MongoDb(connection,HeroiSchema));
    await context.create(MOCK_HEROI_DEFAULT);
    const result = await context.create(MOCK_HEROI_ACTULIZATION);
    MOCK_HEROI_ID = result.id;
  });
  it('Connection', async () => {
    const result = await context.IsConnected();
    assert.deepEqual(result, 'Conectado')
  });
  it('Create', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CREATE);
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CREATE);
  });
  it('Read', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome });
    const result = { nome, poder };
    assert.deepEqual(result, MOCK_HEROI_DEFAULT)
  });
  it('Actualization', async () => {
    const nomeUpdate = 'Marcos'
    const { modifiedCount } = await context.update(MOCK_HEROI_ID, { nome: nomeUpdate });
    if (modifiedCount === 1) {
      const [result] = await context.read({ _id: MOCK_HEROI_ID });
      assert.deepEqual(result.nome, nomeUpdate)
    }
    assert.deepEqual(modifiedCount, 1);
  });
  it('Remove', async () => {
    const {deletedCount} = await context.delete(MOCK_HEROI_ID);
    assert.deepEqual(deletedCount, 1);
  });
});