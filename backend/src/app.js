const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./config/database");
const errorHandler = require("./middlewares/error.middleware");

//init middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001", // Link của Frontend (sau này sửa sau)
    credentials: true, // Cho phép nhận Cookie (RefreshToken)
  })
);

//init database
database.connect();

//init router
app.use("/api/categories", require("./modules/category/category.route"));
app.use("/api/products", require("./modules/product/product.route"));
app.use("/api/user", require("./modules/user/user.router"));
app.use("/api/token", require("./modules/token/token.route"));
app.use("/api/auth", require("./modules/auth/auth.router"));

//handler error
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
