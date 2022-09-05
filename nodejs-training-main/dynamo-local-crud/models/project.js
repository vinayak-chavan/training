const { AWS } = require("../utils/awsConfiguration");
const fs = require("fs");
const path = require("path");

const checkProjectTable = () => {
  const alreadyExists = true;
  try {
    const dynamoDB = new AWS.DynamoDB();
    const params = {
      TableName: "project",
    };
    dynamoDB.describeTable(params, async (err, data) => {
      if (err) {
        if (err.code === "ResourceNotFoundException") {
          alreadyExists = true;
          await createProjectTable();
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

const createProjectTable = async () => {
  let alreadyExists = false;
  try {
    const dynamoDB = new AWS.DynamoDB();

	const params = {
      TableName: "project",
      KeySchema: [
        { AttributeName: "id", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "title", AttributeType: "S" },
        { AttributeName: "description", AttributeType: "S" },
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
          return await loadProjectTableData();
      }
    });
  } catch (error) {
    return console.log(
      "Error Creating Table. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const deleteProjectTable = () => {
  let notExists = false;
  try {
    const dynamoDB = new AWS.DynamoDB();

    const params = {
      TableName: "project",
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

const loadProjectTableData = async () => {
  try {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const filePath = path.join(__dirname, "../data/projects.json");

    const allProjects = JSON.parse(fs.readFileSync(filePath, "utf8"));
    allProjects.forEach((project) => {
      var params = {
        TableName: "project",
        Item: {
          title: project.title,
          description: project.description,
        },
      };

      docClient.put(params, (err, data) => {
        if (err) {
          console.log(
            "Unable to Add a Project - ",
            project.id,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("Project Added. Project Id:", Project.id);
        }
      });
    });
  } catch (error) {
    console.log(
      "Error Loading Projects. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

module.exports = { checkProjectTable, createProjectTable, deleteProjectTable };

