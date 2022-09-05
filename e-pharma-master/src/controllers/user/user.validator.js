/* eslint-disable import/no-import-module-exports */
import joi from 'joi';
import { errorResponse } from '../../helpers';

// validation on add user
const userRegisterValid = joi.object({
  firstName: joi.string().trim(true).required(),
  lastName: joi.string().trim(true).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().trim(true).min(8).max(12)
    .required(),
  contactNo: joi.string().trim(true).length(10).required(),
});

exports.userRegisterValidation = async (req, res, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    contactNo: req.body.contactNo,
  };
  const { error } = userRegisterValid.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 406, error.details);
  }
  return next();
};

// validation on update user
const userUpdateValid = joi.object({
  firstName: joi.string().trim(true).required(),
  lastName: joi.string().trim(true).required(),
  contactNo: joi.string().trim(true).length(10).required(),
});

exports.userUpdateValidation = async (req, res, next) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contactNo: req.body.contactNo,
  };
  const { error } = userUpdateValid.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 406);
  }
  return next();
};

// login validation on user
const loginValid = joi.object({
  email: joi.string().email().trim(true).required(),
  password: joi.string().trim(true).required().min(8)
    .max(12),
});

exports.loginValidation = async (req, res, next) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error } = loginValid.validate(payload);
  if (error) {
    return errorResponse(req, res, error.message, 406);
  }
  return next();
};
