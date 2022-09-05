const express = require("express");

const { login, register, first } = require("../controllers/userController");

const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.get('/', first);

module.exports = route;