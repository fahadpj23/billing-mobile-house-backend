module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define("attribute", {
    attributeName: {
      type: DataTypes.STRING,
      // unique: true,
      unique: {
        name: "attribute_name_unique",
        msg: "attribute name is already in use",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  });
  return attribute;
};
