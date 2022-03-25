const assert = require('assert');
const api = require('./../api');

let app = {};
describe('Test api HEROES', function () {
  this.beforeAll(async function () {
    app = await api;
  });
  it('list heroes', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    });
    const { statusCode, payload } = result;
    const data = JSON.parse(payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(data));
  });
  it('list heroes custom', async () => {
    const TOTAL_LIMIT = 3
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TOTAL_LIMIT}`
    });
    const { statusCode, payload } = result;
    const data = JSON.parse(payload);
    assert.deepEqual(statusCode, 200);
    assert.ok(data.length === TOTAL_LIMIT);
  });
  it('should be able return erro in list heroes case limit different of number', async () => {
    const TOTAL_LIMIT = 'sfdsfsdf'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TOTAL_LIMIT}`
    });
    const { statusCode } = result;
    assert.deepEqual(statusCode, 500);
  });
  it('list heroes custom with name', async () => {
    const TOTAL_LIMIT = '3'
    const NAME = 'Davi-1648066031056'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TOTAL_LIMIT}&nome=${NAME}`
    });
    const { statusCode,payload } = result;
    const data = JSON.parse(payload);
    assert.deepEqual(data[0].nome,NAME);
    assert.deepEqual(data[0].poder,'Baladeira');
    assert.deepEqual(statusCode, 200);
  });
});