const db = require("../models/index");

const attributeModel = db.attribute;
const attributeValueModel = db.attributeValue;

const getAttribute = async (req, res) => {
  const attributeList = await attributeModel.findAll({});
  res.status(200).json({ attributeList });
};

const addAttribute = async (req, res) => {
  console.log(req.body);
  const { attributeName, status, attributeValues } = req.body;
  try {
    const newAttribute = await attributeModel.create({
      attributeName,
      status,
    });

    console.log(attrib);
    const addAttributeValue = await attributeValueModel.bulkCreate(
      attributeValues.map((attributeValue) => ({
        attributeId: newAttribute?.id,
        name: attributeValue.name,
        status: 1,
      }))
    );
    res.status(201).json({
      message: "attrubute addedd succesfully",
      attribute: newAttribute,
    });
  } catch (error) {
    if (error.attributeName === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: "attribute already exist",
      });
    } else {
      res.status(500).json({
        message: "An error occurred while creating the user",
        error: error.message,
      });
    }
  }
};

module.exports = {
  getAttribute,
  addAttribute,
};
