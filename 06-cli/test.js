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

const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'BATMAN',
  poder: 'Dinheiro',
  id: 1
}

describe('Suite de manipulação de Herois', () => {
  before(async () => {
    await Database.remover();
    await Database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await Database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
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

  it('deve atualizar um heroi pelo id',async () => {
      const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      poder : 'MUITO DINHEIRO'
      }
      const novoDado = {
        poder : 'MUITO DINHEIRO'
      }

      await Database.atualizar(DEFAULT_ITEM_ATUALIZAR.id,novoDado)
      const [resultado] = await Database.listar(DEFAULT_ITEM_ATUALIZAR.id)

      deepEqual(resultado,expected)
  });
});