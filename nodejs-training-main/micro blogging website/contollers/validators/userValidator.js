const joi = require("joi");
const errorFunction = require("../../utils/errorFunction");

const validation = joi.object({
     username: joi.string().alphanum().min(3).max(20).trim(true).required(),
     emailID: joi.string().email().trim(true).required(),
     password: joi.string().min(6).trim(true).required(),
});

const userValidation = async (req, res, next) => {
	const payload = {
		username: req.body.username,
		emailID: req.body.email,
		password: req.body.password
	};

	const { error } = validation.validate(payload);
	if (error) {
		res.status(406);
		return res.json(
			errorFunction(true, `Error in User Data : ${error.message}`)
		);
	} else {
		next();
	}
};
module.exports = userValidation;