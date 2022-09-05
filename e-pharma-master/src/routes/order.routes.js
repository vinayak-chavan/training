import express from 'express';
import {
  addOrder, updateOrder, viewCompletedOrders, viewOrders, updateOrderView,
} from '../controllers/order/order.controller';
import {
  verifyTokenAuth
} from '../middlewares/verifyAuthToken';
import {
  userRole
} from '../middlewares/checkRole'; 

const route = express.Router();

// user add order
route.post('/order', verifyTokenAuth, userRole, addOrder);
// // route.get('/order', viewUserOrders);
// route.get('/orders', viewOrders);
// route.get('/completeorder', viewCompletedOrders);
// route.post('/orders', updateOrder);
// route.get('/updateOrder/:id', updateOrderView);

module.exports = route;
