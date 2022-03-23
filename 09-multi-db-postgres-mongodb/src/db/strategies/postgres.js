const Sequelize = require('sequelize');
const ICrud = require('./interfaces/ICrud');

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
    this._connect();
  }
  async IsConnected() {
    try {
      this._driver.authenticate();
      return true;
    } catch (error) {
      console.error('DEU RUIM POSTGRES', error)
    }
  }
  async create(item) {
    const { dataValues } = await this._herois.create(item);
    return dataValues;
  }
  async read(item) {
    return await this._herois.findAll({ where: item, raw: true });
  }
  async update(id, item) {
    return await this._herois.update(item, { where: { id } });

  }
  async delete(id) {
    const query = id ? { id } : {}
    return await this._herois.destroy({ where: query });

  }
  async _defineModel() {
    this._herois = this._driver.define('TB_HEROIS', {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        required: true
      },
      poder: {
        type: Sequelize.STRING,
        required: true
      }
    }, {
      freezeTableName: false,
      timestamps: false
    });
    await this._herois.sync();
  }
  _connect() {
    this._driver = new Sequelize(
      'heroes',
      'kevenm',
      '123456',
      {
        host: 'localhost',
        port: '5433',
        dialect: "postgres",
        quoteIdentifiers: false,
      }
    );
    this._defineModel();
  }
}

module.exports = Postgres 