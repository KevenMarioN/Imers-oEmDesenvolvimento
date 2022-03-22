const {
  deepEqual,
  ok
} = require('assert');
const database = require('./database');
const Database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 2
}

describe('Suite de manipulação de Herois', () => {
  before(async () => {
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
  });
  it("Deve pesquisar um heroi usando arquivos", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await Database.listar(expected.id);
    deepEqual(resultado, expected);
  });
  it('Deve cadastrar um heroi, usando arquivos', async () => {
    const expect = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
    deepEqual(actual, expect)
  });

  it('deve remover um heroi por id', async () => {
    const expect = true;
    const resultado = await Database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepEqual(resultado,expect)
  });
});