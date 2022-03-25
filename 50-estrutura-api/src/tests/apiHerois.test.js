const supertest = require('supertest');
const assert = require('assert');
const app = require('../api');



describe.only('API HERO', () => {
  it('should be able list heroes', async () => {
    await supertest(app).get('/herois')
      .expect(200)
      .then((response) => {
        assert.ok(Array.isArray(response.body));
      });
  });
  it('should be able status 400 when limit is differrent of integer', async () => {
    await supertest(app).get('/herois?limit=mkadasd')
      .expect(400);
  });
});