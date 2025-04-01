const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT || 9000;

const attributeRoute = require("./routes/attributeRoute");
const attributeValueRoute = require("./routes/attributeValueRoute");

app.use("/api/attributes/", attributeRoute);
app.use("/api/attributeValues", attributeValueRoute);

app.listen(PORT, () => {
  console.log("server running ", PORT);
});
