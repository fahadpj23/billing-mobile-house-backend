const attributeController = require("../controller/attributeController");

const router = require("express").Router();

router.get("/getAttribute", attributeController.getAttribute);

router.post("/addAttribute", attributeController.addAttribute);

router.put("/editAttribute/:id", attributeController.editAttribute);

module.exports = router;
