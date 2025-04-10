const { where } = require("sequelize");
const db = require("../models/index");

const attributeModel = db.attribute;
const attributeValueModel = db.attributeValue;

const getAttribute = async (req, res) => {
  const attributeList = await attributeModel.findAll({
    include: [
      {
        model: attributeValueModel,
        as: "attributeValues",
      },
    ],
  });
  res.status(200).json({ attributeList });
};

const addAttribute = async (req, res) => {
  const { attributeName, status, attributeValues } = req.body;
  console.log(attributeName);
  const transaction = await db.sequelize.transaction();
  try {
    const newAttribute = await attributeModel.create(
      {
        attributeName,
        status,
      },
      { transaction }
    );
    const newAttributeValues = attributeValues.map((attributeValue) => ({
      attributeValue,
      attributeId: newAttribute.id,
    }));
    const addAttributeValues = await attributeValueModel.bulkCreate(
      newAttributeValues,
      {
        transaction,
      }
    );

    await transaction.commit();
    res.status(201).json({
      message: "attribute added successfully",
      attribute: newAttribute,
      attributeValue: addAttributeValues,
    });
  } catch (error) {
    if (error.attributeName === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: "attribute already exist",
      });
    } else {
      res.status(500).json({
        message: error.message,
        error: error.message,
      });
    }
  }
};

const editAttribute = async (req, res) => {
  const { attributeName, status, attributeValues } = req.body;
  const id = req.params.id;
  const transaction = await db.sequelize.transaction();
  try {
    const attribute = await attributeModel.findOne({ where: { id } });

    if (attribute) {
      const editAttribute = await attributeModel.update(
        {
          attributeName,
          status,
        },
        { where: { id } },
        { transaction }
      );
      const newAttributeValues = attributeValues.map((attributeValue) => ({
        ...attributeValue,
        attributeId: id,
      }));

      const addAttributeValues = await attributeValueModel.bulkCreate(
        newAttributeValues,
        {
          transaction,
        }
      );

      await transaction.commit();
      res.status(201).json({
        message: "attribute added successfully",
        attribute: editAttribute,
        attributeValue: addAttributeValues,
      });
    } else {
      console.log("not found");
    }
  } catch (error) {
    if (error.attributeName === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: "attribute already exist",
      });
    } else {
      res.status(500).json({
        message: error.message,
        error: error.message,
      });
    }
  }
};

module.exports = {
  getAttribute,
  addAttribute,
  editAttribute,
};
