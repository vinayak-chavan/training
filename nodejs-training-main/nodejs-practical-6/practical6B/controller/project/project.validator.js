const joi = require('joi');

const projectObject = joi.object({
  title: joi.string().trim(true).required(),
	description: joi.string().trim(true).required()
});

exports.projectValidation = async(event, context) => {
	const eventBody = JSON.parse(event.body);
	const payload = {
		title: eventBody.title,
		description: eventBody.description,
	}

	const {error} = projectObject.validate(payload);
	if(error){
		context.end();
		return { statusCode: 400, error: error.message };
	}
	return { statusCode: 200 };
};
