const express = require('express');
const accountValidation = require("../controllers/accountValidator");
const transactionValidation = require("../controllers/transactionValidator");
const {
  addAccount,
  newTransaction,
  viewTransaction,
} = require('../controllers/transactionController');

const route = express.Router();

route.post('/account', accountValidation, addAccount);
route.post('/transaction', transactionValidation, newTransaction);
route.get('/transaction', viewTransaction);

module.exports = route;