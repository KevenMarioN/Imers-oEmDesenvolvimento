const Mongoose = require('mongoose');

Mongoose.connect('mongodb://keven:123456@localhost:27017/herois',(error) => {
  if(error){
    console.error('DEU MERDA',error);
    return;
  }
});
const connection = Mongoose.connection;

connection.once('open',() => console.log('Connection with mongoDB this OKAY🆙'));

// setTimeout(() => {
//   const state = connection.readyState
//   console.log(state);
// },1000)

/**
 *  0 : Disconectado
 *  1 : Conectado
 *  2 : Conectando
 *  3 : Disconectando
 */

const heroiSchema =  new Mongoose.Schema({
  nome : {
    type : String,
    required : true
  },
  poder : {
    type : String,
    required : true
  },
  insertedAt: {
    type : Date,
    default : new Date()
  }
});

const model = Mongoose.model('herois',heroiSchema);

const main = async () => {
  const resultCadastrar = await model.create({
    nome : 'Batman',
    poder : 'Dinheiro'
  });
  console.log(resultCadastrar);

  const listItens = await model.find();

  console.log('items',listItens);
}
main();