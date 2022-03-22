const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./Heroi');
async function main() {
  Commander
    .version('v1')
    .option('-n, --nome [value]', "nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "Listar herois")
    .option('-li --listarID [value]', "Listar por id")
    .parse(process.argv)
  const heroi = new Heroi(Commander._optionValues)
  try {
    if (Commander._optionValues.cadastrar) {
      const resultado = await Database.cadastrar(heroi);
      console.log(resultado);
    }
    if (Commander._optionValues.listar && Commander._optionValues.listarID !== undefined) {
      const dados = await Database.listar(parseInt(Commander._optionValues.listarID));
      console.log(dados)
    } else {
      const dados = await Database.listar();
      console.log(dados)
    }
  } catch (error) {
    console.error(error);
  }
}

main();