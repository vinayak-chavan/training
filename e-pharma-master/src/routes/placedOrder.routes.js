/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
import express from 'express';
import {
  addPlacedOrder,
  viewPlacedOrder,
  viewPlacedOrderOne,
  updatePlacedOrder,
} from '../controllers/placedOrder/placedOrder.controller';
import { verifyTokenAuth } from '../middlewares/verifyAuthToken';
import { adminRole, userRole } from '../middlewares/checkRole';

const router = express.Router();

// routes for user
router.post('/placedorder', verifyTokenAuth, userRole, addPlacedOrder);

// routes for admin and user
router.get('/placedorder', verifyTokenAuth, viewPlacedOrder);
router.get('/placedorder/:orderId', verifyTokenAuth, viewPlacedOrderOne);

// routes for admin
router.put('/placedorder/:orderId', verifyTokenAuth, adminRole, updatePlacedOrder);

module.exports = router;
