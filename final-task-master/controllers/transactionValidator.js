const joi = require("joi");
const { errorResponse } = require("../utils/index");

const validation = joi.object({
  fromAccountId: joi.string().trim(true).required(),
  toAccountId: joi.string().trim(true).required(),
  amount: joi.number().required(),
});

const accountValidation = async (req, res, next) => {
  const payload = {
    fromAccountId: req.body.fromAccountId,
    toAccountId: req.body.toAccountId,
    amount: req.body.amount,
  };

  const { error } = validation.validate(payload);
  if (error) {
    console.log(error.message);
    return errorResponse(req, res, "enter valid data", 406);
  } else {
    next();
  }
};

module.exports = accountValidation;
