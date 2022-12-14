const AWS = require('aws-sdk');

const fetchTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient()

  let todo;
  try{

    const result = await dynamodb.scan({ TableName:"TodoTable"}).promise()
    todo = result.Items
  }
  catch(error)
  {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };

};

module.exports = {
  handler: fetchTodos
}
