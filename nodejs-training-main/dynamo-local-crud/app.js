require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/project");
const taskRoutes = require("./routes/task");

const app = express();

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", userRoutes);
app.use("/", projectRoutes);
app.use("/", taskRoutes);

module.exports = app;
