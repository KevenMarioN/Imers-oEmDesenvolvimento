const ICrud = require('../interfaces/ICrud');
const Mongoose = require('mongoose');
const STATUS = {
  0: "Disconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Disconectando"
}
class MongoDb extends ICrud {
  constructor(connection,schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }
  async create(item) {
    return await this._schema.create(item);
  }
  async read(item,skip=0,limit=10) {
      return await this._schema.find(item).skip(skip).limit(limit);;
  }
  async update(id,item){
    return await this._schema.updateOne({ _id : id},{$set : item})
  }
  async delete(id) {
    const itemID = id ?{ _id : id} : {}
    return await this._schema.deleteMany(itemID);
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

  static connect() {
    Mongoose.connect(process.env.MONGODB_URL, (error) => {
      if (error) {
        console.error('DEU MERDA', error);
        return;
      }
    });
    const connection = Mongoose.connection;
    connection.once('open', () => console.log('Connection with mongoDB this OKAY🆙'));
    return connection
  }
  
  async disconnect() {
    this._connection.close();
  }
}

module.exports = MongoDb 