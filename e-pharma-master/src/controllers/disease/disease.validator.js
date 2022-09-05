/* eslint-disable import/no-import-module-exports */
import joi from 'joi';
import { errorResponse } from '../../helpers/index';

// validation on add disease
const diseaseRegisterValid = joi.object({
  diseaseName: joi.string().trim(true).required(),
  diseaseDescription: joi.string().trim(true).min(10).required(),
});

exports.diseaseRegisterValidation = async (req, res, next) => {
  const payload = {
    diseaseName: req.body.diseaseName,
    diseaseDescription: req.body.diseaseDescription,
  };
  const { error } = diseaseRegisterValid.validate(payload);

  if (error) {
    return errorResponse(req, res, error.message, 406);
  }

  return next();
};

// validation on update disease
const diseaseUpdateValid = joi.object({
  diseaseName: joi.string().trim(true).required(),
  diseaseDescription: joi.string().trim(true).min(10).required(),
});

exports.diseaseUpdateValidation = async (req, res, next) => {
  const payload = {
    diseaseName: req.body.diseaseName,
    diseaseDescription: req.body.diseaseDescription,
  };
  const { error } = diseaseUpdateValid.validate(payload);

  if (error) {
    return errorResponse(req, res, error.message, 406);
  }

  return next();
};
