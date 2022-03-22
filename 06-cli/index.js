const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./Heroi');

const program = Commander;

async function main() {
  program
    .version('v1')
    .option('-n, --nome [value]', "nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-id --id [value]', "id do Heroi")

    .option('-r --remover ',"Remove item pelo id, sem id limpa a lista")
    .option('-a --atualizar [value]',"Atualiza Heroi cadastrado")
    .option('-c, --cadastrar', "Cadastrar um heroi")
    .option('-l, --listar', "Listar herois")

    .parse(process.argv)
  const heroi = new Heroi(Commander._optionValues)
  try {
    if (Commander._optionValues.cadastrar) {
      const resultado = await Database.cadastrar(heroi);
      if(resultado != undefined){
        console.log('Heroi cadastrado');
      }
    }
    if (Commander._optionValues.listar && Commander._optionValues.id !== undefined) {
      const dados = await Database.listar(heroi.id);
      console.log(dados)
    } 
    if (Commander._optionValues.listar && Commander._optionValues.id === undefined) {
      const dados = await Database.listar();
      console.log(dados)
    }
    if (Commander._optionValues.remover && Commander._optionValues.id !== undefined) {
      await Database.remover(heroi.id);
      console.log('Heroi removido com sucesso!');
      return;
    } 
    if (Commander._optionValues.remover) {
      await Database.remover();
      console.log('database limpo');
      return;
    }
    if (Commander._optionValues.atualizar !== undefined) {
      const idAtualizar = parseInt(Commander._optionValues.atualizar);
      const dado = JSON.stringify(heroi);
      const heroAtualizar = JSON.parse(dado);
      await Database.atualizar(idAtualizar,heroAtualizar);
      console.log('Heroi atualizado com sucesso!');
      return;
    } 
  } catch (error) {
    console.error(error);
  }
}

main();