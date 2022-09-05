const joi = require("joi");
const { errorResponse } = require("../utils/index");

const validation = joi.object({
  username: joi.string().min(3).max(25).trim(true).required(),
  emailID: joi.string().email().trim(true).required(),
  accType: joi.string().trim(true).required(),
  balance: joi.number().required(),
});

const transactionValidation = async (req, res, next) => {
  const payload = {
    username: req.body.username,
    emailID: req.body.emailID,
    accType: req.body.accType,
    balance: req.body.balance,
  };

  const { error } = validation.validate(payload);
  if (error) {
    console.log(error.message);
    return errorResponse(req, res, "enter valid data", 406);
  } else {
    next();
  }
};
module.exports = transactionValidation;
