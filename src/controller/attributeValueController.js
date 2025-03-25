const db = require("../models/index");

const attributeValueModel = db.attributeValue;

const getAttributeValues = async (req, res) => {
  const attributeList = await attributeValueModel.findAll({});
  res.status(200).json({ attributeList });
};

module.exports = {
  getAttributeValues,
};
