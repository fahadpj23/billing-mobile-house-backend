const dbConfig = require("../config/db");
const Sequelize = require("sequelize");
const DataTypes = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.attribute = require("./attribute.model.js")(sequelize, DataTypes);
db.attributeValue = require("./attributeValue.model.js")(sequelize, DataTypes);

db.attribute.hasMany(db.attributeValue, { foreignKey: "attributeId" });
db.attributeValue.belongsTo(db.attribute, { foreignKey: "attributeId" });

db.sequelize.sync({ alter: true }).then(() => {
  console.log("sync done");
});

module.exports = db;
