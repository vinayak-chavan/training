/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import {
  Cart, CartProduct, Product, PlacedOrder,
} from '../../models';
import { successResponse, errorResponse } from '../../helpers/index';

// user can add products to cart
exports.addProductsToCart = async (req, res) => {
  try {
    // check if product id is defined or not
    if (!req.params.productId) {
      return errorResponse(req, res, 'Product id required', 401);
    }

    // check if order is placed or not
    const checkData = await Cart.findOne({
      where: {
        userId: req.user.id,
        isPlaced: false,
      },
    });

    let productData;
    try {
      // data of product
      productData = await Product.findOne({
        where: {
          id: req.params.productId,
        },
      });
    } catch (error) {
      return errorResponse(
        req,
        res,
        'Error while retriving price of product!',
        404,
        error,
      );
    }

    // if order is not placed then add data to existing cart
    if (checkData) {
      // check if product is already in the cart or not
      const alreadyExist = await CartProduct.findOne({
        where: {
          productId: req.params.productId,
          cartId: checkData.id,
        },
      });

      if (alreadyExist) {
        // updated price for more than one products
        const total = Number(checkData.totalPrice) + Number(productData.price);

        await Cart.update(
          { totalPrice: total },
          {
            where: {
              id: checkData.id,
            },
          },
        );

        await CartProduct.update({
          quantity: alreadyExist.quantity + 1,
        }, {
          where: {
            id: alreadyExist.id,
          },
        });

        return successResponse(req, res, 'Product Added to cart', 200);
      }

      // updated price for multi products
      const total = Number(checkData.totalPrice) + Number(productData.price);

      try {
        await Cart.update(
          { totalPrice: total },
          {
            where: {
              id: checkData.id,
            },
          },
        );

        await CartProduct.create({
          id: uuidv4(),
          productId: req.params.productId,
          cartId: checkData.id,
          quantity: 1,
        });

        return successResponse(req, res, 'Product Added to cart', 200);
      } catch (error) {
        return errorResponse(
          req,
          res,
          'Error while adding products to cart!',
          500,
          error,
        );
      }
    }

    const cartData = await Cart.create({
      id: uuidv4(),
      userId: req.user.id,
      totalPrice: productData.price,
    });

    await CartProduct.create({
      id: uuidv4(),
      productId: req.params.productId,
      cartId: cartData.id,
      quantity: 1,
    });

    return successResponse(req, res, 'Product Added to cart', 200);
  } catch (error) {
    return errorResponse(
      req,
      res,
      'Error while adding product to cart',
      500,
      error,
    );
  }
};

exports.viewCart = async (req, res) => {
  try {
    // check if order is placed or not
    const checkData = await Cart.findOne({
      where: {
        userId: req.user.id,
        isPlaced: false,
      },
    });

    if (!checkData) {
      return errorResponse(req, res, 'No products available in your cart!', 404);
    }

    const cartProductData = await CartProduct.findAll({
      where: {
        cartId: checkData.id,
      },
      include: [{
        model: Product,
        attributes: ['id', 'title', 'companyName', 'price', 'productImage'],
      }],
      attributes: ['quantity'],
    });

    const resultData = {
      cartId: checkData.id,
      totalPriceOfCart: checkData.totalPrice,
      quantity: cartProductData.quantity,
      productData: cartProductData,
    };
    return successResponse(req, res, resultData, 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while fetching products of cart!', 500);
  }
};

exports.deleteCartProduct = async (req, res) => {
  try {
    // check if product id is defined or not
    if (!req.params.productId) {
      return errorResponse(req, res, 'Product id required', 401);
    }

    // find cart of user for delete product of their own
    const cartUserData = await Cart.findOne({
      where: {
        userId: req.user.id,
      },
    });

    if (!cartUserData) {
      return errorResponse(req, res, 'Cart not found for user', 404);
    }

    // find product data for price of one product
    const productData = await Product.findOne({
      where: {
        id: req.params.productId,
      },
    });

    // find cartProduct data to check its quantity
    const cartProductData = await CartProduct.findOne({
      where: {
        productId: req.params.productId,
        cartId: cartUserData.id,
      },
    });

    if (!cartProductData) {
      return errorResponse(req, res, 'Product not found in your cart!', 404);
    }

    if (cartProductData.quantity === 1) {
      await CartProduct.destroy({
        where: {
          productId: req.params.productId,
          cartId: cartUserData.id,
        },
      });

      try {
        await Cart.update(
          {
            totalPrice:
              Number(cartUserData.totalPrice) - Number(productData.price),
          },
          {
            where: {
              id: cartUserData.id,
            },
          },
        );

        await PlacedOrder.destroy({
          where: {
            cartId: cartUserData.id,
          },
        });
        return successResponse(req, res, 'Product removed from cart', 200);
      } catch (error) {
        return errorResponse(req, res, 'Something went wrong!', 500);
      }
    } else {
      try {
        await CartProduct.update({
          quantity: cartProductData.quantity - 1,
        }, {
          where: {
            productId: req.params.productId,
            cartId: cartUserData.id,
          },
        });

        await Cart.update(
          {
            totalPrice:
              Number(cartUserData.totalPrice) - Number(productData.price),
          },
          {
            where: {
              id: cartUserData.id,
            },
          },
        );

        return successResponse(req, res, 'Product removed from cart', 200);
      } catch (error) {
        return errorResponse(req, res, 'Something went wrong!', 500);
      }
    }
  } catch (error) {
    return errorResponse(
      req,
      res,
      'Error while removing product to cart',
      500,
      error,
    );
  }
};
