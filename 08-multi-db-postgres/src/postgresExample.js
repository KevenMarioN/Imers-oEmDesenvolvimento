const Sequelize = require('sequelize');
const driver = new Sequelize(
  'heroes',
  'kevenm',
  '123456',
  {
    host : 'localhost',
    dialect: "postgres",
    quoteIdentifiers : false
  }
)


async function main() {
  const Herois = driver.define('heroes', {
    id : {
      type : Sequelize.INTEGER,
      required : true,
      primaryKey : true,
      autoIncrement : true
    },
    nome : {
      type : Sequelize.STRING,
      required : true
    },
    poder : {
      type : Sequelize.STRING,
      required : true
    }
  },{
    tablename : 'TB_HEROIS',
    freezeTableName : false,
    timestamps : false
  });

  await Herois.sync();
  const result = await Herois.findAll({ raw : true});

  console.log(result);
}

main();