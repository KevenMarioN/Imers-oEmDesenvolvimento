const { deepEqual, ok } = require('assert');
const api = require('../api');
let app = {};
describe('Teste for API HEROES', function () {
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
});