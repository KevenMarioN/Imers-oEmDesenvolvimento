const axios = require('axios');
const URL = `https://swapi.dev/api/people`;

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&formart=json`;
  const { data } = await axios.get(url);
  return data;
}

module.exports = {
  obterPessoas
}