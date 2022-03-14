const service = require('./service');

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];
  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }
  return novoArrayMapeado;
};

async function main() {
  try {
    const { results } = await service.obterPessoas('r');
    // const names = [];
    // results.results.forEach(function (item) {
    //   names.push(item.name);
    // });
    // const names = results.map(function (pessoa) {
    //   return pessoa.name;
    // })
    // console.time('map')
    // const names = results.map(pessoa => pessoa.name);
    // console.timeEnd('map')

    const names = results.meuMap(function (pessoa, indice) {
      return `[${indice + 1}] ${pessoa.name}`;
    });
    console.log(names);
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}

main();
