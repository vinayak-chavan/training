const AWS = require('aws-sdk');

const fetchTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const id = req.pathParameters

  let todo;
  try{

    const result = await dynamodb.get({ 
        TableName:"TodoTable",
        key:{id}
      }).promise()
    todo = result.Item
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
  handler: fetchTodo
}
