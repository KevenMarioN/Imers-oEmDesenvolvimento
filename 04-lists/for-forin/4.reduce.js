const {
  obterPessoas
} = require("./service")

Array.prototype.meuReduce = function (callback, valorInicial) {
  let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
  for (let index = 0; index <= this.length - 1; index++) {
    valorFinal = callback(valorFinal, this[index],this)
  }
  return valorFinal;
}

async function main() {
  try {
    const { results } = await obterPessoas('a');
    const pesos = results.map(item => parseInt(item.height))
    console.log('Pesos', pesos)
    const total = pesos.meuReduce((anterior, proximo) => {
      return anterior + proximo
    }, 0);
    console.log('total', total)
  } catch (error) {
    console.error("DEU RUIM", error);
  }

}

main();