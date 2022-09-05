/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
import express from 'express';
import {
  addAddress,
  viewAddress,
  viewOwnAddress,
  deleteAddress,
  updateAddress,
} from '../controllers/address/address.controller';
import {
  addressAddValidation,
  addressUpdateValidation,
} from '../controllers/address/address.validator';
import {
  verifyTokenAuth,
} from '../middlewares/verifyAuthToken';
import {
  userRole,
} from '../middlewares/checkRole';

const route = express.Router();

route.post('/addresses', verifyTokenAuth, userRole, addressAddValidation, addAddress);
route.get('/addresses', verifyTokenAuth, userRole, viewAddress);
route.get('/addresses/:addressId', verifyTokenAuth, userRole, viewOwnAddress);
route.delete('/addresses/:addressId', verifyTokenAuth, userRole, deleteAddress);
route.put('/addresses/:addressId', verifyTokenAuth, userRole, addressUpdateValidation, updateAddress);

module.exports = route;
