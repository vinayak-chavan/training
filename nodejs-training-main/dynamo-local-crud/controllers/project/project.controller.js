const { AWS } = require("../../utils/awsConfiguration");
const { errorFunction } = require("../../utils/errorFunction");
const { uuid } = require('uuidv4');
const addProject = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();

		const { title, description } = req.body;
		const getParams = {
			TableName: "project",
			Key: {
				id: uuid(),
				title: title,
				description: description,
				
			},
		};
		dynamoClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to Get Project Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get Project"));
			} else if (JSON.stringify(data) !== "{}") {
				res.status(302);
				return res.json(
					errorFunction(true, "Project Already Exists", {})
				);
			} else {
				const params = {
					TableName: "project",
					Item: {
						id,
						title,
						description
					},
				};

				dynamoClient.put(params, (err, data) => {
					if (err) {
						console.log(
							`Unable to Add the Project id - ${id}. Error JSON:`,
							JSON.stringify(err, null, 2)
						);
						res.status(501);
						return res.json(
							errorFunction(true, "Unable to Add Project")
						);
					} else {
						res.status(201);
						return res.json(
							errorFunction(false, "Project Added", req.body)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Adding Project. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Adding Project"));
	}
};

const getProject = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id } = req.body;
		if (
			id === undefined
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "ID required to Get Project")
			);
		} else {
			const params = {
				TableName: "project",
				Key: {
					id: id
				},
			};
			dynamoClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Get Project. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Project")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "Project Not Found")
					);
				} else {
					res.status(200);
					return res.json(
						errorFunction(false, "Project Details", data.Item)
					);
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Getting Project. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Getting Project"));
	}
};

const deleteProject = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id } = req.body;
		if (
			id === undefined
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "ID required to Delete Project")
			);
		} else {
			const params = {
				TableName: "roject",
				Key: {
					id: id
				},
			};
			dynamoClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to get Project. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Project")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "Project Not Found")
					);
				} else {
					dynamoClient.delete(params, (err, deletedData) => {
						if (err) {
							console.log(
								"Unable to Delete Project. Error JSON:",
								JSON.stringify(err, null, 2)
							);
							res.status(400);
							return res.json(
								errorFunction(
									true,
									"Unable to Delete Project"
								)
							);
						} else {
							res.status(200);
							return res.json(
								errorFunction(
									false,
									"Project Deleted",
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
			"Error Deleting Project. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Deleting Project"));
	}
};

const updateProject = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id, info } = req.body;
		const getParams = {
			TableName: "project",
			Key: {
				id
			},
		};
		dynamoClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to get Project. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get Project"));
			} else if (JSON.stringify(data) === "{}") {
				res.status(404);
				return res.json(errorFunction(true, "Project Not Found"));
			} else {
				const params = {
					TableName: "project",
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
								"Error Updating Project",
								JSON.stringify(err, null, 2)
							)
						);
					} else {
						res.status(200);
						return res.json(
							errorFunction(
								false,
								"Project Updated",
								req.body
							)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Updating Project. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Updating Project"));
	}
};


module.exports = {
	addProject,
	updateProject,
	getProject,
	deleteProject,
};
