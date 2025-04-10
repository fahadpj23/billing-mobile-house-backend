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
    attributeValue: {
      type: DataTypes.STRING,
    },
  });
  return attributeValue;
};
