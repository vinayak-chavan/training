const joi = require("joi");
const errorFunction = require("../../utils/errorFunction");

const validation = joi.object({
     title: joi.string().alphanum().min(3).max(25).trim(true).required(),
     description: joi.string().email().trim(true).required(),
     photo:joi.string(),
     userID:joi.string().required(),
     like:joi.number.default(0),
     dislike:joi.number.default(0)
});

const blogValidation = async (req, res, next) => {
	const payload = {
		title: req.body.title,
		description: req.body.description,
		photo: req.body.photo,
		userID: req.body.userID,
		like: req.body.like,
		dislike: req.body.dislike
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
module.exports = blogValidation;