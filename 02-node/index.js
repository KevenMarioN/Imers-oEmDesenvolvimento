/**
 *  0 - Obter um usuário
 *  1 - Obter o numero de telefone de um usuário a partir de seu Id
 *  2 - Obter o endereco de usuario pelo Id
 */
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve,reject){
      setTimeout(() => {
        resolve({
          id: 1,
          nome: 'Keven Mário',
          dataNascimento: new Date().toISOString()
        });
      }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve,reject){
    setTimeout(() => {
      resolve({
        numero: '998298888',
        ddd: 77
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario,callback) {
    setTimeout(() => {
      return callback(null,{
        bairro: 'Vila Rica',
        cidade: 'Barreiras',
        estado: 'BA',
        rua : 'Serra Negra'
      });
    }, 2000);
}

// obterUsuario(function resolverUsuario(error, usuario) {
//   if (error) {
//     console.error('DEU RUIM EM USUARIO', error);
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//     if (error1) {
//       console.error('DEU RUIM EM TELEFONE', error1);
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//       if (error2) {
//         console.error('DEU RUIM EM ENDERECO', error2);
//         return;
//       }
//       console.log(`
//       Nome: ${usuario.nome},
//       Endereco : ${endereco.cidade}
//       Telefone : (${telefone.ddd}) ${telefone.telefone}
//       `);
//     });
//   })
// });

function convertToBr(date){
   const [dateWithouthours] = date.split('T');
   const [year,month,day] = dateWithouthours.split('-');
   const dateConvert = `${day}/${month}/${year}`;
   return dateConvert;
}

// obterUsuario().then((usuario) => {
//   obterTelefone(usuario.id).then((telefone) => {
//     obterEnderecoAsync(usuario.id).then((endereco) => {
//      console.log(`
//         Usuário : ${usuario.nome}, Data Nascimento : ${convertToBr(usuario.dataNascimento)}
//         Telefone : (${telefone.ddd}) ${telefone.numero}
//         Endereco : ${endereco.rua}, ${endereco.bairro}, ${endereco.cidade}
//      `)
//     });
//   });
// });

async function main() {
    try{
      const usuario = await obterUsuario();
      const telefone = await obterTelefone(usuario.id);
      const endereco = await obterEnderecoAsync(usuario.id);
      console.log(`
      Usuário : ${usuario.nome}, Data Nascimento : ${convertToBr(usuario.dataNascimento)}
      Telefone : (${telefone.ddd}) ${telefone.numero}
      Endereco : ${endereco.rua}, ${endereco.bairro}, ${endereco.cidade}
    `)
    } catch(error) {
      console.error("DEU RUIM",error)
    }
}
main();