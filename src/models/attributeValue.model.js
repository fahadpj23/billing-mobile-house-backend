module.exports = (sequelize, DataTypes) => {
  const attributeValue = sequelize.define("attributeValue", {
    attributeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refernces: {
        model: "attribute",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  });
  return attributeValue;
};
