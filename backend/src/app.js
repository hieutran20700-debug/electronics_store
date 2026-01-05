const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");

//init middlewares
app.use(express.json());
app.use(cors());

//init database
database.connect();

//init router
app.use("/api/categories", require("./modules/category/category.route"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
