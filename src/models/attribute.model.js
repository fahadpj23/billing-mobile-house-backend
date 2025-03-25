module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define("attribute", {
    attributeName: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  });
  return attribute;
};
