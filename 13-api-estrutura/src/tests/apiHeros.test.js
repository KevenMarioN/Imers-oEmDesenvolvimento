const assert = require('assert');
const api = require('./../api');

let app = {};
describe('Test api HEROES',function (){
  this.beforeAll(async function () {
     app = await api;
  });
  it('list heroes', async () => {
    const result = await app.inject({
      method : 'GET',
      url : '/herois'
    });
    const {statusCode,payload} = result;
    const data = JSON.parse(payload);

    assert.deepEqual(statusCode,200);
    assert.ok(Array.isArray(data));
  });
});