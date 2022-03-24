const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema');

const MOCK_HEROI_CREATE= {nome : 'Gaviao Negro', poder : 'flexas'}
const MOCK_HEROI_UPDATE = {nome : 'Batman', poder : 'Dinheiro'}
let context = {};
describe.only('Postgres Strategy', function () {
  this.beforeAll(async function () {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection,HeroiSchema)
    context = new Context(new Postgres(connection,model));
    await context.delete();
    await context.create(MOCK_HEROI_UPDATE);
  });
  it('PostgresSQL Connection', async function ()  {
      const result = await context.IsConnected();
      assert.equal(result,true)
  });
  it('Create', async function () {
    const result = await context.create(MOCK_HEROI_CREATE);
    delete result.id;
    assert.deepEqual(result,MOCK_HEROI_CREATE)
  });
  it('List',async function () {
    const [result] = await context.read({ nome : MOCK_HEROI_CREATE.nome});
    delete result.id;
    assert.deepEqual(result,MOCK_HEROI_CREATE);
  });
  it('Update',async function () {
    const [itemAtualizar] = await context.read({nome : MOCK_HEROI_UPDATE.nome});
    const novoItem = {
      ...MOCK_HEROI_UPDATE,
      nome : 'Mulher Maravilha'
    };
    const [result] = await context.update(itemAtualizar.id, novoItem);
    const [itemAtualized] = await context.read({ id : itemAtualizar.id});
    delete itemAtualized.id;

    assert.deepEqual(itemAtualized,novoItem);
    assert.deepEqual(result,1);
  });
  it('Delete', async function () {
    const [itemDelete] = await context.read();
    const result = await context.delete(itemDelete.id);
    assert.deepEqual(result,1)
  });
});