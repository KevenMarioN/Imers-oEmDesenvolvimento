const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
  const newArray = [];
  for (index in this) {
    const item = this[index]
    const result = callback(item, index, this)
    if (!result) {
      continue
    } else {
      newArray.push(item)
    }
  }
  return newArray;
}
async function main() {
  try {
    const { results } = await obterPessoas('a');
    const familiaLars = results.meuFilter((item, index, list) => {
      console.log(`index : ${index}, ${list.length}`)
      const result = item.name.toLowerCase().indexOf('lars') !== -1;
      return result;
    });
    const names = familiaLars.map(pessoa => pessoa.name)
    console.log(names);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}
main();