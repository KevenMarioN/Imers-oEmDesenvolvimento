/**
 *  0 - Obter um usuário
 *  1 - Obter o numero de telefone de um usuário a partir de seu Id
 *  2 - Obter o endereco de usuario pelo Id
 */


function obterUsuario(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      nome: 'Keven Mário',
      dataNascimento: new Date()
    });
  }, 1000);

}

function obterTelefone(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      telefone: '998298888',
      ddd: 77
    });
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      bairro: 'Vila Rica',
      cidade: 'Barreiras',
      estado: 'BA'
    });
  }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error('DEU RUIM EM USUARIO', error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error('DEU RUIM EM TELEFONE', error1);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error('DEU RUIM EM ENDERECO', error2);
        return;
      }
      console.log(`
      Nome: ${usuario.nome},
      Endereco : ${endereco.cidade}
      Telefone : (${telefone.ddd}) ${telefone.telefone}
      `);
    });
  })
});
