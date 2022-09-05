/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
import express from 'express';
import {
  addProductsToCart,
  deleteCartProduct,
  viewCart,
} from '../controllers/cart/cart.controller';
import { verifyTokenAuth } from '../middlewares/verifyAuthToken';
import { userRole } from '../middlewares/checkRole';

const router = express.Router();

// routes for user
router.post('/cart/:productId', verifyTokenAuth, userRole, addProductsToCart);
router.delete('/cart/:productId', verifyTokenAuth, userRole, deleteCartProduct);
router.get('/cart', verifyTokenAuth, userRole, viewCart);

module.exports = router;
