const ICrud = require('./interfaces/ICrud');
const Mongoose = require('mongoose');
const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando"
}
class MongoDb extends ICrud {
  constructor() {
    super();
    this._connection = null;
    this._herois = null;
  }
  async create(item) {
    return await this._herois.create(item);
  }
  async read(item,skip=0,limit=10) {
      return await this._herois.find(item).skip(skip).limit(limit);;
  }
  async IsConnected() {
    const state = STATUS[this._connection.readyState]
    if (state === STATUS[1]) {
      return state
    }
    if (state !== STATUS[2]) return state

    await new Promise(resolve => setTimeout(resolve, 1000))

    return STATUS[this._connection.readyState];
  }

  async connect() {
    Mongoose.connect('mongodb://keven:123456@localhost:27017/herois', (error) => {
      if (error) {
        console.error('DEU MERDA', error);
        return;
      }
    });
    this._connection = Mongoose.connection;
    this._connection.once('open', () => console.log('Connection with mongoDB this OKAY🆙'));
    this._defineModel();
  }
  
  _defineModel() {
    const heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      poder: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    });
    this._herois = Mongoose.model('herois', heroiSchema);
  }
  async disconnect() {
    this._connection.close();
  }
}

module.exports = MongoDb 