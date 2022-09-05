const joi = require('joi');

const userObject = joi.object({
  fullName: joi.string().required(),
	emailID: joi.string().email().required(),
	designation:joi.string().required(),
	technologiesKnown: joi.array().items(joi.string()).min(1).required(),
	projects: joi.array().items(joi.number()).unique().min(1).required()
});

exports.userValidation = async(event, context) => { 
	const eventBody = JSON.parse(event.body);
	const payload = {
		fullName: eventBody.fullName,
		emailID: eventBody.emailID,
		designation: eventBody.designation,
		technologiesKnown: eventBody.technologiesKnown,
		projects: eventBody.projects
	}

	const {error} = userObject.validate(payload);
	if(error){
		context.end();
		return { statusCode: 400, error: error.message };
	}
	return { statusCode: 200 };
};
