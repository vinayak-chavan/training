/* eslint-disable import/no-import-module-exports */
import joi from 'joi';
import { errorResponse, deleteFile } from '../../helpers/index';

// validation on add product
const productRegisterValid = joi.object({
  title: joi.string().trim(true).required(),
  companyName: joi.string().trim(true).required(),
  price: joi.string().trim(true).required(),
});

exports.productRegisterValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    companyName: req.body.companyName,
    price: req.body.price,
  };
  const { error } = productRegisterValid.validate(payload);

  if (!req.file) {
    return errorResponse(req, res, 'please upload product image', 406);
  }

  if (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return errorResponse(req, res, error.message, 406);
  }

  return next();
};

// validation on update product
const productUpdateValid = joi.object({
  title: joi.string().trim(true).required(),
  companyName: joi.string().trim(true).required(),
  price: joi.string().trim(true).required(),
});

exports.productUpdateValidation = async (req, res, next) => {
  const payload = {
    title: req.body.title,
    companyName: req.body.companyName,
    price: req.body.price,
  };
  const { error } = productUpdateValid.validate(payload);

  if (!req.file) {
    return errorResponse(req, res, 'please upload product image', 406);
  }

  if (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return errorResponse(req, res, error.message, 406);
  }
  return next();
};
