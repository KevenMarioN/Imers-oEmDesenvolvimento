const Sequelize = require('sequelize');
const ICrud = require('../interfaces/ICrud');

class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
    
  }
  async IsConnected() {
    try {
      this._connection.authenticate();
      return true;
    } catch (error) {
      console.error('DEU RUIM POSTGRES', error)
    }
  }
  async create(item) {
    const { dataValues } = await this._schema.create(item);
    return dataValues;
  }
  async read(item) {
    return await this._schema.findAll({ where: item, raw: true });
  }
  async update(id, item,upsert = false) {
    const fn = upsert ? 'upsert' : 'update'
    return await this._schema[fn](item, { where: { id } });

  }
  async delete(id) {
    const query = id ? { id } : {}
    return await this._schema.destroy({ where: query });

  }
  static async defineModel(connection, schema) {
    const model = await connection.define(
      schema.name, schema.schema, schema.options
    );
    await model.sync();
    return model;
  }
  static async connect() {
    const connection = new Sequelize(process.env.POSTGRES_URL,
      {
        quoteIdentifiers: false,
        logging: false,
        ssl : process.env.SSL_DB,
        dialectOptions : {
          ssl : process.env.SSL_DB
        }
      });
    return connection
  }
  static async disconnect() {
    await this._schema.sequelize.close();
  }
}

module.exports = Postgres 