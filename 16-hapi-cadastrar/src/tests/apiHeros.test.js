const { deepEqual, ok, notStrictEqual } = require('assert');
const { isStringLiteral } = require('typescript');
const api = require('../api');
let app = {};
const MOCK_HERO_CREATE = {
  nome: `Luffy-${Date.now()}`,
  poder: 'Nika Nika no mi'
}
describe.only('Teste for API HEROES', function () {
  this.beforeAll(async function () {
    app = await api
  });
  it('Should be able render list', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    });

    const { statusCode, payload } = result;
    const data = JSON.parse(payload);
    deepEqual(statusCode, 200);
    ok(Array.isArray(data));
  });
  it('Should be able render list with limit', async () => {
    const LIMIT_ITEM = 3;
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${LIMIT_ITEM}`
    });

    const { statusCode, payload } = result;
    const data = JSON.parse(payload);
    deepEqual(statusCode, 200);
    ok(data.length === LIMIT_ITEM);
  });
  it('Should be able render error with limit', async () => {
    const LIMIT_ITEM = "kajdkshadj";
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${LIMIT_ITEM}`
    });
    deepEqual(result.statusCode, 400);
  });
  it('Should be able create new hero', async () => {
    const { statusCode, payload } = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: MOCK_HERO_CREATE
    });
    const { message, _id } = JSON.parse(payload);

    notStrictEqual(_id, undefined);
    deepEqual(message, "Heroi cadastrado com sucesso!");
    deepEqual(statusCode,200);
  });
  it('Should be able return erro in method POST, if not exists nome or poder', async () => {
    const { statusCode } = await app.inject({
      method: 'POST',
      url: '/herois'
    });
    deepEqual(statusCode, 400);
  });
});