const { AWS } = require("../utils/awsConfiguration");
const fs = require("fs");
const path = require("path");

const checkTaskTable = () => {
  const alreadyExists = true;
  try {
    const dynamoDB = new AWS.DynamoDB();
    const params = {
      TableName: "task",
    };
    dynamoDB.describeTable(params, async (err, data) => {
      if (err) {
        if (err.code === "ResourceNotFoundException") {
          alreadyExists = true;
          await createTaskTable();
        }
      } else {
        alreadyExists = false;
        return;
      }
    });
  } catch (error) {
    return console.log(
      "Error Checking Table. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const createTaskTable = async () => {
  let alreadyExists = false;
  try {
    const dynamoDB = new AWS.DynamoDB();

		const params = {
      TableName: "Task",
      KeySchema: [
        { AttributeName: "id", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "title", AttributeType: "S" },
        { AttributeName: "description", AttributeType: "S" },
		{ AttributeName: "projectId", AttributeType: "N" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
      },
    };

    dynamoDB.createTable(params, async (err, data) => {
      if (err) {
        if (err.code === "ResourceInUseException") {
          alreadyExists = true;
          return;
        } else
          return console.log(
            "Unable to Create Table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
      } else {
        if (data.TableDescription.TableStatus === "ACTIVE")
          return await loadTaskTableData();
      }
    });
  } catch (error) {
    return console.log(
      "Error Creating Table. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const deleteTaskTable = () => {
  let notExists = false;
  try {
    const dynamoDB = new AWS.DynamoDB();

    const params = {
      TableName: "task",
    };

    dynamoDB.deleteTable(params, (err, data) => {
      if (err) {
        if (err.code === "ResourceNotFoundException") {
          notExists = true;
          return console.log("Table Does not Exists");
        }
        return console.log(
          "Unable to Delete Table. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log(
          "Table Deleted. Table JSON:",
          JSON.stringify(data, null, 2)
        );
      }
    });
  } catch (error) {
    return console.log(
      "Error Deleting Table. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const loadTaskTableData = async () => {
  try {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const filePath = path.join(__dirname, "../data/tasks.json");

    const allTasks = JSON.parse(fs.readFileSync(filePath, "utf8"));
    allTasks.forEach((task) => {
      var params = {
        TableName: "task",
        Item: {
          title: task.title,
          description: description,
          projectId: projectId,
        },
      };

      docClient.put(params, (err, data) => {
        if (err) {
          console.log(
            "Unable to Add a Task - ",
            task.id,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("task Added. Task Id:", task.id);
        }
      });
    });
  } catch (error) {
    console.log(
      "Error Loading Tasks. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

module.exports = { checkTaskTable, createTaskTable, deleteTaskTable };

