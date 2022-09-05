const {v4} = require('uuid');
const AWS = require('aws-sdk');

const addTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const { todo } = JSON.parse(event.body);
  const createAt = new Date();
  const id= v4;

  const newTodo = { 
    id,
    todo,
    createAt,
    completed: false
  }

  await dynamodb.put({
    TableName: "TodoTable",
    Item: newTodo
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo
}
