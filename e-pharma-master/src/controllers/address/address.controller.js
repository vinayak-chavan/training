/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { Addresses } from '../../models';
import { successResponse, errorResponse } from '../../helpers/index';

// add address of user
exports.addAddress = async (req, res) => {
  try {
    // add userid in address table from middleware

    const payload = {
      id: uuidv4(),
      userId: req.user.id,
      address: req.body.address,
      area: req.body.area,
      city: req.body.city,
      pincode: req.body.pincode,
      isArchived: false,
    };

    // check if same address is exist or not
    const addressData = await Addresses.findOne({
      where: {
        [Op.and]: [
          { address: req.body.address },
          { area: req.body.area },
          { pincode: req.body.pincode },
          { isArchived: false },
        ],
      },
    });

    if (addressData) {
      return errorResponse(req, res, 'User Address is already exist!', 409);
    }

    await Addresses.create(payload);
    return successResponse(req, res, 'Address successfully added', 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400);
  }
};

// to view only One addresse which is added by user
exports.viewOwnAddress = async (req, res) => {
  try {
    if (!req.params.addressId) {
      return errorResponse(req, res, 'addressid is not defined!', 406);
    }

    // check if address is exist or not
    const matchedAddress = await Addresses.findOne({
      where: {
        id: req.params.addressId,
        isArchived: false,
      },
      attributes: [
        'id', 'address', 'area', 'city', 'pincode',
      ],
    });

    if (!matchedAddress) {
      return errorResponse(req, res, 'Addresses Not Found', 404);
    }
    return successResponse(req, res, matchedAddress, 200);
  } catch (error) {
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};

// view addresses which is added by user
exports.viewAddress = async (req, res) => {
  try {
    // to check if addresses of user exist or not
    const userCheck = await Addresses.findOne({
      where: {
        userId: req.user.id,
        isArchived: false,
      },
      attributes: [
        'id', 'userId', 'address', 'area', 'city', 'pincode',
      ],
    });

    if (!userCheck) {
      return errorResponse(req, res, 'User does not exist!', 404);
    }

    // find addresses of user
    const addressData = await Addresses.findAll({
      where: {
        userId: userCheck.userId,
        isArchived: false,
      },
      attributes: [
        'id', 'address', 'area', 'city', 'pincode',
      ],
    });

    if (!addressData) {
      return errorResponse(req, res, 'Addresses not found!', 404);
    }

    return successResponse(req, res, addressData, 200);
  } catch (error) {
    return errorResponse(req, res.message, 500);
  }
};

// edit existing address
exports.updateAddress = async (req, res) => {
  try {
    if (!req.params.addressId) {
      return errorResponse(req, res, 'addressid is not defined!', 406);
    }

    // check if address is exist or not
    const matchedAddress = await Addresses.findOne({
      where: {
        id: req.params.addressId,
        isArchived: false,
      },
      attributes: [
        'id', 'address', 'area', 'city', 'pincode',
      ],
    });

    if (!matchedAddress) {
      return errorResponse(req, res, 'Addresses Not Found', 404);
    }

    await Addresses.update(
      {
        address: req.body.address,
        area: req.body.area,
        city: req.body.city,
        pincode: req.body.pincode,
      },
      {
        where: {
          id: matchedAddress.id,
        },
      },
    );

    return successResponse(req, res, 'Address updated successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};

//   remove any one address
exports.deleteAddress = async (req, res) => {
  try {
    if (!req.params.addressId) {
      return errorResponse(req, res, 'addressid is not defined!', 406);
    }

    // check if address is exist or not
    const matchedAddress = await Addresses.findOne({
      where: {
        id: req.params.addressId,
        isArchived: false,
      },
      attributes: [
        'id', 'address', 'area', 'city', 'pincode',
      ],
    });

    if (!matchedAddress) {
      return errorResponse(req, res, 'Addresses Not Found', 404);
    }

    await Addresses.update(
      {
        isArchived: true,
      },
      {
        where: {
          id: matchedAddress.id,
        },
      },
    );

    return successResponse(req, res, 'Address removed successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};
