/* eslint-disable import/no-import-module-exports */
import joi from 'joi';
import { errorResponse, deleteFile } from '../../helpers/index';

// validation on add category
const categoryRegisterValid = joi.object({
  categoryName: joi.string().trim(true).required(),
});

exports.categoryRegisterValidation = async (req, res, next) => {
  const payload = {
    categoryName: req.body.categoryName,
  };
  const { error } = categoryRegisterValid.validate(payload);

  if (!req.file) {
    return errorResponse(req, res, 'please upload category image', 406);
  }

  if (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return errorResponse(req, res, error.message, 406);
  }

  return next();
};

// validation on update category
const categoryUpdateValid = joi.object({
  categoryName: joi.string().trim(true).required(),
});

exports.categoryUpdateValidation = async (req, res, next) => {
  const payload = {
    categoryName: req.body.categoryName,
  };
  const { error } = categoryUpdateValid.validate(payload);

  if (!req.file) {
    return errorResponse(req, res, 'please upload category image', 406);
  }

  if (error) {
    if (req.file) {
      deleteFile(req.file.path);
    }
    return errorResponse(req, res, error.message, 406);
  }

  return next();
};
