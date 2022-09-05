const joi = require("joi");
const { errorFunction } = require("../../utils/errorFunction");

const validation = joi.object({
	emailId: joi.string().trim(true).required(),
	designation: joi.string().trim(true).required(),
	department: joi.string().trim(true).required(),
	teckKnown: joi.string().trim(true).required(),
	project: joi.array().items(joi.string().trim(true)),
});

const userValidation = (req, res, next) => {
	const incomingData = {
		emailId: req.body.emailId,
		designation: req.body.designation,
		department: req.bodydepartment,
		techKnown: req.body.techKnown,
		project: req.body.project,
	};

	const { error } = validation.validate(incomingData);
	if (error) {
		res.status(400);
		return res.json(errorFunction(true, error.message));
	} else {
		next();
	}
};

module.exports = {
	userValidation,
};
