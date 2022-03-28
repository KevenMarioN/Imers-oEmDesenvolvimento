const assert = require('assert');
const api = require('../api');

let app = {}

describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api;
  });
  it('Should be able recived token', async () => {
    const result = await app.inject({
      method: "POST",
      url: '/login',
      payload: {
        username : 'Keven',
        password : '123456'
      } 
    });
    const { statusCode, payload } = result;
    const data = JSON.parse(payload);
    assert.deepEqual(statusCode,200);
    assert.ok(data.token.length > 10);
  });
});