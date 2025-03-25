const attributeValueController = require("../controller/attributeValueController");

const router = require("express").Router();

router.get("/getAttributeValues", attributeValueController.getAttributeValues);

module.exports = router;
