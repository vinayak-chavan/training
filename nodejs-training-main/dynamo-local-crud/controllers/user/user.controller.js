const { AWS } = require("../../utils/awsConfiguration");
const { errorFunction } = require("../../utils/errorFunction");
const { uuid } = require('uuidv4');
const addUser = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();

		const { fullName, emailId, designation, department, techKnown, project  } = req.body;
		const getParams = {
			TableName: "user",
			Key: {
				id: uuid(),
				fullName: fullName,
				emailId: emailId,
				designation: designation,
				department: department,
				techKnown: techKnown,
				project: project,
			},
		};
		dynamoClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to Get User. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get User"));
			} else if (JSON.stringify(data) !== "{}") {
				res.status(302);
				return res.json(
					errorFunction(true, "User Already Exists", {})
				);
			} else {
				const params = {
					TableName: "user",
					Item: {
						fullName,
						emailId, 
						designation, 
						department, 
						techKnown, 
						project 
					},
				};

				dynamoClient.put(params, (err, data) => {
					if (err) {
						console.log(
							`Unable to Add the User email - ${emailId}. Error JSON:`,
							JSON.stringify(err, null, 2)
						);
						res.status(501);
						return res.json(
							errorFunction(true, "Unable to Add User")
						);
					} else {
						res.status(201);
						return res.json(
							errorFunction(false, "User Added", req.body)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Adding User. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Adding User"));
	}
};

const getUser = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id } = req.body;
		if (
			id === undefined
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "ID required to Get User")
			);
		} else {
			const params = {
				TableName: "user",
				Key: {
					id: id
				},
			};
			dynamoClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Get User. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get User")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "User Not Found")
					);
				} else {
					res.status(200);
					return res.json(
						errorFunction(false, "User Details", data.Item)
					);
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Getting User. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Getting User"));
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id } = req.body;
		if (
			id === undefined
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "ID required to Delete User")
			);
		} else {
			const params = {
				TableName: "user",
				Key: {
					id: id
				},
			};
			dynamoClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to get User. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get User")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "User Not Found")
					);
				} else {
					dynamoClient.delete(params, (err, deletedData) => {
						if (err) {
							console.log(
								"Unable to Delete User. Error JSON:",
								JSON.stringify(err, null, 2)
							);
							res.status(400);
							return res.json(
								errorFunction(
									true,
									"Unable to Delete User"
								)
							);
						} else {
							res.status(200);
							return res.json(
								errorFunction(
									false,
									"User Deleted",
									data.Item
								)
							);
						}
					});
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Deleting User. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Deleting User"));
	}
};

const updateUser = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id, info } = req.body;
		const getParams = {
			TableName: "user",
			Key: {
				id
			},
		};
		dynamoClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to get User. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get User"));
			} else if (JSON.stringify(data) === "{}") {
				res.status(404);
				return res.json(errorFunction(true, "User Not Found"));
			} else {
				const params = {
					TableName: "user",
					Key: {
						id: id
					},
					UpdateExpression:
						"set info = :i",
					ExpressionAttributeValues: {
						":i": info,
					},
					ReturnValues: "UPDATED_NEW",
				};
				dynamoClient.update(params, (err, data) => {
					if (err) {
						res.status(400);
						return res.json(
							errorFunction(
								true,
								"Error Updating User",
								JSON.stringify(err, null, 2)
							)
						);
					} else {
						res.status(200);
						return res.json(
							errorFunction(
								false,
								"User Updated",
								req.body
							)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Updating User. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Updating User"));
	}
};


module.exports = {
	addUser,
	updateUser,
	getUser,
	deleteUser,
};
