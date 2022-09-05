require("./db/connection");
const dotenv = require("dotenv");
const express = require("express");

const routes = require("./routes/transaction");

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
