const {get} = require('axios');
const URL = `https://swapi.dev/api/people`;

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&formart=json`;
  const { data } = await get(url);
  return data.results.map(mapearPessoas);
}
function mapearPessoas(item) {
  return {
    nome: item.name,
    peso : item.height
  }
}

module.exports = {
  obterPessoas
}