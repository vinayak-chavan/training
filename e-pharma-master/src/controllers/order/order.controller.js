/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { Order } from '../../models';
import { successResponse, errorResponse } from '../../helpers/index';

let orderId;

const addOrder = async (req, res) => {
  try {
    const {
      userId, price, productId, addressId,
    } = req.body;
    const payload = {
      id: uuidv4(),
      userId,
      productId,
      status: 'Pending',
      price,
      addressId,
    };
    console.log(payload);
    const newOrder = await Order.create(payload);
    console.log('newOrder', newOrder);
    return successResponse(req, res, newOrder, 200);
  } catch (error) {
    console.log('used in error', error.message);
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

// const viewOneOrder = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const matchedOrder = await Order.findOne({ where: { orderId: id } });
//     if (!matchedOrder) {
//       return errorResponse(req, res, 'Address Not Found', 404);
//     }
//     return successResponse(req, res, matchedOrder, 200);
//   } catch (error) {
//     return errorResponse(req, res, 'something went wrong', 400);
//   }
// };

const viewOrders = async (req, res) => {
  try {
    const statusValue = 'Complete';
    const allOrders = await Order.findAll({ where: { status: { [Op.ne]: statusValue } } });
    if (!allOrders) {
      return errorResponse(req, res, 'Address Not Found', 404);
    }
    res.render('viewOrder', { orders: allOrders });
    // return successResponse(req, res, allOrders, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400);
  }
};

const viewCompletedOrders = async (req, res) => {
  try {
    const statusValue = 'Complete';
    const allOrders = await Order.findAll({ where: { status: statusValue } });
    if (!allOrders) {
      return errorResponse(req, res, 'not found', 404);
    }
    res.render('viewCompleteOrder', { orders: allOrders });
    // return successResponse(req, res, allOrders, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400);
  }
};

const updateOrderView = async (req, res) => {
  try {
    orderId = req.params.id;
    const getOrder = await Order.findOne({ where: { id: orderId } });
    console.log(JSON.parse(JSON.stringify(getOrder)));
    res.render('updateOrder', { orders: JSON.parse(JSON.stringify(getOrder)) });
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    console.log(orderId);
    console.log('update running');
    const {
      status,
    } = req.body;
    console.log(req.body);
    const updatedProject = await Order.update(
      {
        status,
      },
      { returning: true, where: { id: orderId } },
    );
    console.log(req.body);
    console.log(updatedProject);
    const statusValue = 'Complete';
    const allOrders = await Order.findAll({ where: { status: { [Op.ne]: statusValue } } });
    if (!allOrders) {
      return errorResponse(req, res, 'Address Not Found', 404);
    }
    res.render('viewOrder', { orders: allOrders });
    return successResponse(req, res, 'status updated', 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, error.message);
  }
};

module.exports = {
  addOrder, updateOrder, viewCompletedOrders, viewOrders, updateOrderView,
};
