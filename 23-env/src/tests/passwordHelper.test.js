const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = 'Mario1994'
describe('UserHelper test suite',function () {
  it('Deve gerar uma hash a partir de uma senha', async () =>{
    const Hash = await PasswordHelper.hashPassword(SENHA);
    assert.ok(Hash.length > 10);
  });
  it('Deve comparar a senha com hash', async () =>{
    const Hash = await PasswordHelper.hashPassword(SENHA);
    const Result = await PasswordHelper.comparePassword(SENHA,Hash);
    assert.ok(Result);
  });
});