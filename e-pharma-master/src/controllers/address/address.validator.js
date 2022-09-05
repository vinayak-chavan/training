/* eslint-disable import/no-import-module-exports */
import joi from 'joi';
import { errorResponse } from '../../helpers/index';

// validation on add address
const addressAddValid = joi.object({
  address: joi.string().trim(true).required(),
  area: joi.string().trim(true).required(),
  city: joi.string().trim(true).required(),
  pincode: joi.string().trim(true).length(6).required(),
});

exports.addressAddValidation = async (req, res, next) => {
  const payload = {
    address: req.body.address,
    area: req.body.area,
    city: req.body.city,
    pincode: req.body.pincode,
  };

  const { error } = addressAddValid.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 406);
  }
  return next();
};

// validation on update address
const addressUpdateValid = joi.object({
  address: joi.string().trim(true).required(),
  area: joi.string().trim(true).required(),
  city: joi.string().trim(true).required(),
  pincode: joi.string().trim(true).length(6).required(),
});

exports.addressUpdateValidation = async (req, res, next) => {
  const payload = {
    address: req.body.address,
    area: req.body.area,
    city: req.body.city,
    pincode: req.body.pincode,
  };

  const { error } = addressUpdateValid.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 406);
  }
  return next();
};
