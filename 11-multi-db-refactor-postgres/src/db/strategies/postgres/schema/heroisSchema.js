const Sequelize = require('sequelize');
const HeroisSchema = {
  name : 'TB_HEROIS',
  schema : {
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
  },
  options : {
    freezeTableName: false,
    timestamps: false
  }
}

module.exports = HeroisSchema;