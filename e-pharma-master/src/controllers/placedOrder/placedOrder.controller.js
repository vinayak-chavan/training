/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import {
  PlacedOrder, Addresses, User, Cart, CartProduct, Product,
} from '../../models';
import {
  successResponse,
  errorResponse,
} from '../../helpers/index';
import { sendmail } from '../../utils/mail';

// user can place order
exports.addPlacedOrder = async (req, res) => {
  try {
    // check id parameter is there or not
    if (!req.body.cartId || !req.body.addressId) {
      return errorResponse(req, res, 'Cart Id and AddressId is required!', 401);
    }

    // check if cart id is exist or not
    const placedOrderExists = await PlacedOrder.findOne({
      where: {
        cartId: req.body.cartId,
      },
    });

    if (placedOrderExists) {
      return successResponse(req, res, 'your order is already requested!', 200);
    }

    // find address of user
    const addressData = await Addresses.findOne({
      where: {
        id: req.body.addressId,
      },
    });

    if (!addressData) {
      return errorResponse(req, res, 'Error while fetching Address of user!', 404);
    }

    // find user email to send
    const adminEmailData = await User.findAll({
      where: {
        isAdmin: true,
      },
      attributes: ['email'],
    });

    const orderData = await PlacedOrder.create({
      id: uuidv4(),
      cartId: req.body.cartId,
      addressId: req.body.addressId,
      status: 'Pending',
    });

    adminEmailData.forEach((obj) => {
      sendmail(obj.email, 'Order Request', `${req.user.email} requested for Order: ${orderData.id}.`);
    });
    return successResponse(req, res, 'Your order is requested successfully!', 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while placing your order!', 500);
  }
};

// view placed or requested order for user and admin
exports.viewPlacedOrder = async (req, res) => {
  try {
    let orderData;
    const statusQuery = req.query.status || 'Pending';
    if (req.user.isAdmin) {
      orderData = await PlacedOrder.findAll({
        where: {
          status: statusQuery,
        },
        include: [
          {
            model: Cart,
            attributes: ['userId'],
            include: [{
              model: CartProduct,
              attributes: ['productId'],
              include: [{
                model: Product,
                attributes: ['title', 'companyName', 'price', 'productImage'],
              }],
            }],
          },
          {
            model: Addresses,
            attributes: ['address', 'area', 'city', 'pincode'],
          },
        ],
        attributes: ['id', 'status'],
      });
    } else {
      orderData = await PlacedOrder.findAll({
        include: [
          {
            model: Cart,
            where: {
              userId: req.user.id,
            },
            attributes: ['userId'],
            include: [{
              model: CartProduct,
              attributes: ['productId'],
              include: [{
                model: Product,
                attributes: ['title', 'companyName', 'price', 'productImage'],
              }],
            }],
          },
          {
            model: Addresses,
            where: {
              userId: req.user.id,
              isArchived: false,
            },
            attributes: ['address', 'area', 'city', 'pincode'],
          },
        ],
        attributes: ['id', 'status'],
      });
    }
    return successResponse(req, res, orderData, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching your orders', 500);
  }
};

// view one order user and admin
exports.viewPlacedOrderOne = async (req, res) => {
  try {
    // check if parameter is there or not
    if (!req.params.orderId) {
      return errorResponse(req, res, 'OrderId parameter is required', 401);
    }

    // check if order is exist or not
    const orderExist = await PlacedOrder.findOne({
      where: {
        id: req.params.orderId,
      },
    });

    if (!orderExist) {
      return errorResponse(req, res, 'Order is not exist!', 404);
    }

    let orderData;
    if (req.user.isAdmin) {
      orderData = await PlacedOrder.findAll({
        where: {
          id: req.params.orderId,
        },
        include: [
          {
            model: Cart,
            attributes: ['userId'],
            include: [{
              model: CartProduct,
              attributes: ['productId'],
              include: [{
                model: Product,
                attributes: ['title', 'companyName', 'price', 'productImage'],
              }],
            }],
          },
          {
            model: Addresses,
            attributes: ['address', 'area', 'city', 'pincode'],
          },
        ],
        attributes: ['id', 'status'],
      });
    } else {
      orderData = await PlacedOrder.findAll({
        where: {
          id: req.params.orderId,
        },
        include: [
          {
            model: Cart,
            where: {
              userId: req.user.id,
            },
            attributes: ['userId'],
            include: [{
              model: CartProduct,
              attributes: ['productId'],
              include: [{
                model: Product,
                attributes: ['title', 'companyName', 'price', 'productImage'],
              }],
            }],
          },
          {
            model: Addresses,
            where: {
              userId: req.user.id,
              isArchived: false,
            },
            attributes: ['address', 'area', 'city', 'pincode'],
          },
        ],
        attributes: ['id', 'status'],
      });
    }
    return successResponse(req, res, orderData, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching your orders', 500);
  }
};

// status update by admin
// eslint-disable-next-line consistent-return
exports.updatePlacedOrder = async (req, res) => {
  try {
    // check if query parameter is tehre or not
    if (req.query.status !== 'On the way' && req.query.status !== 'Delivered') {
      return errorResponse(req, res, 'Status parameter is not valid!', 401);
    }

    // check if parameter is there or not
    if (!req.params.orderId) {
      return errorResponse(req, res, 'OrderId parameter is required', 401);
    }

    // check if order is exist or not
    const orderExist = await PlacedOrder.findOne({
      where: {
        id: req.params.orderId,
      },
    });

    if (!orderExist) {
      return errorResponse(req, res, 'Order is not exist!', 404);
    }

    // check status of order
    if (orderExist.status === 'Pending' && req.query.status === 'On the way') {
      try {
        await PlacedOrder.update({
          status: 'On the way',
        }, {
          where: {
            id: req.params.orderId,
          },
        });

        // update cart table status
        await Cart.update({
          isPlaced: true,
        }, {
          where: {
            id: orderExist.cartId,
          },
        });

        sendmail(req.user.email, 'Pharmly', `Order has been successfully placed. Order Id: ${orderExist.id} and it's status is: On the way.`);
        return successResponse(req, res, 'Order status updated with On the way', 200);
      } catch (error) {
        return errorResponse(req, res, 'Error while updating status of order', 500);
      }
    } else if (orderExist.status === 'On the way' && req.query.status === 'Delivered') {
      try {
        await PlacedOrder.update({
          status: 'Delivered',
        }, {
          where: {
            id: req.params.orderId,
          },
        });

        // update cart table status
        await Cart.update({
          isPlaced: true,
        }, {
          where: {
            id: orderExist.cartId,
          },
        });

        sendmail(req.user.email, 'Pharmly', `Order has been successfully placed. Order Id: ${orderExist.id} and it's status is Delivered.`);
        return successResponse(req, res, 'Order status updated with On the way', 200);
      } catch (error) {
        return errorResponse(req, res, 'Error while updating status of order', 500);
      }
    } else {
      return errorResponse(req, res, 'Status can not be updated to Delivery', 500);
    }
  } catch (error) {
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};
