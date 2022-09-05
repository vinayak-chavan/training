const { AWS } = require("../../utils/awsConfiguration");
const { errorFunction } = require("../../utils/errorFunction");
const { uuid } = require('uuidv4');
const addTask = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();

		const { title, description, projectID } = req.body;
		const getParams = {
			TableName: "task",
			Key: {
				id: uuid(),
				title: title,
				description: description,
				projectID: projectID
			},
		};
		dynamoClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to Get Task. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get Task"));
			} else if (JSON.stringify(data) !== "{}") {
				res.status(302);
				return res.json(
					errorFunction(true, "Task Already Exists", {})
				);
			} else {
				const params = {
					TableName: "task",
					Item: {
						title, 
						description,
						projectID
					},
				};

				dynamoClient.put(params, (err, data) => {
					if (err) {
						console.log(
							`Unable to Add the Task id - ${ id }. Error JSON:`,
							JSON.stringify(err, null, 2)
						);
						res.status(501);
						return res.json(
							errorFunction(true, "Unable to Add Task")
						);
					} else {
						res.status(201);
						return res.json(
							errorFunction(false, "Task Added", req.body)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Adding Task. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Adding Task"));
	}
};

const getTask = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id } = req.body;
		if (
			id === undefined
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "ID required to Get Task")
			);
		} else {
			const params = {
				TableName: "task",
				Key: {
					id: id
				},
			};
			dynamoClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to Get Task. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Task")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "Task Not Found")
					);
				} else {
					res.status(200);
					return res.json(
						errorFunction(false, "Task Details", data.Item)
					);
				}
			});
		}
	} catch (error) {
		console.log(
			"Error Getting Task. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Getting Task"));
	}
};

const deleteTask = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id } = req.body;
		if (
			id === undefined
		) {
			res.status(406);
			return res.json(
				errorFunction(true, "ID required to Delete Task")
			);
		} else {
			const params = {
				TableName: "task",
				Key: {
					id: id
				},
			};
			dynamoClient.get(params, (err, data) => {
				if (err) {
					console.log(
						"Unable to get Task. Error JSON:",
						JSON.stringify(err, null, 2)
					);
					res.status(400);
					return res.json(
						errorFunction(true, "Unable to Get Task")
					);
				} else if (JSON.stringify(data) === "{}") {
					res.status(404);
					return res.json(
						errorFunction(true, "Task Not Found")
					);
				} else {
					dynamoClient.delete(params, (err, deletedData) => {
						if (err) {
							console.log(
								"Unable to Delete Task. Error JSON:",
								JSON.stringify(err, null, 2)
							);
							res.status(400);
							return res.json(
								errorFunction(
									true,
									"Unable to Delete Task"
								)
							);
						} else {
							res.status(200);
							return res.json(
								errorFunction(
									false,
									"Task Deleted",
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
			"Error Deleting Task. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Deleting Task"));
	}
};

const updateTask = async (req, res, next) => {
	try {
		const dynamoClient = new AWS.DynamoDB.DocumentClient();
		const { id, info } = req.body;
		const getParams = {
			TableName: "task",
			Key: {
				id
			},
		};
		dynamoClient.get(getParams, (err, data) => {
			if (err) {
				console.log(
					"Unable to get Task. Error JSON:",
					JSON.stringify(err, null, 2)
				);
				res.status(400);
				return res.json(errorFunction(true, "Unable to Get Task"));
			} else if (JSON.stringify(data) === "{}") {
				res.status(404);
				return res.json(errorFunction(true, "Task Not Found"));
			} else {
				const params = {
					TableName: "Task",
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
								"Error Updating Task",
								JSON.stringify(err, null, 2)
							)
						);
					} else {
						res.status(200);
						return res.json(
							errorFunction(
								false,
								"Task Updated",
								req.body
							)
						);
					}
				});
			}
		});
	} catch (error) {
		console.log(
			"Error Updating Task. Error JSON",
			JSON.stringify(error, null, 2)
		);
		res.status(500);
		return res.json(errorFunction(true, "Error Updating Task"));
	}
};


module.exports = {
	addTask,
	updateTask,
	getTask,
	deleteTask,
};
