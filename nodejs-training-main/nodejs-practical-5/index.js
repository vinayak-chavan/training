require('dotenv/config');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
require('./db/conn');
const routers = require('./route/routesAll');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routers);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
})