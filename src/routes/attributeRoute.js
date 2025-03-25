const attributeController = require("../controller/attributeController");

const router = require("express").Router();

router.get("/getAttribute", attributeController.getAttribute);

router.post("/addAttribute", attributeController.addAttribute);

module.exports = router;
