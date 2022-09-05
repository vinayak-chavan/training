const joi = require("joi");
const { errorFunction } = require("../../utils/errorFunction");

const validation = joi.object({
	title: joi.string().trim(true).required(),
	description: joi.string().trim(true).required(),
});

const projectValidation = (req, res, next) => {
	const incomingData = {
		title: req.body.title,
		description: req.body.description,
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
	projectValidation,
};
