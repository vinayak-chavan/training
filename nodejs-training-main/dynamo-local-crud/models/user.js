const { AWS } = require("../utils/awsConfiguration");
const fs = require("fs");
const path = require("path");

const checkUserTable = () => {
  const alreadyExists = true;
  try {
    const dynamoDB = new AWS.DynamoDB();
    const params = {
      TableName: "User",
    };
    dynamoDB.describeTable(params, async (err, data) => {
      if (err) {
        if (err.code === "ResourceNotFoundException") {
          alreadyExists = true;
          await createUserTable();
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

const createUserTable = async () => {
  let alreadyExists = false;
  try {
    const dynamoDB = new AWS.DynamoDB();

		const params = {
      TableName: "user",
      KeySchema: [
        { AttributeName: "id", KeyType: "RaANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "fullName", AttributeType: "S" },
        { AttributeName: "emailId", AttributeType: "S" },
				{ AttributeName: "designation", AttributeType: "S" },
				{ AttributeName: "department", AttributeType: "S" },
				{ AttributeName: "techKnown", AttributeType: "S" },
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
          return await loadUserTableData();
      }
    });
  } catch (error) {
    return console.log(
      "Error Creating Table. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

const deleteUserTable = () => {
  let notExists = false;
  try {
    const dynamoDB = new AWS.DynamoDB();

    const params = {
      TableName: "User",
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

const loadUserTableData = async () => {
  try {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const filePath = path.join(__dirname, "../data/users.json");

    const allUsers = JSON.parse(fs.readFileSync(filePath, "utf8"));
    allUsers.forEach((User) => {
      var params = {
        TableName: "users",
        Item: {
          year: user.year,
          title: user.title,
          info: user.info,
        },
      };

      docClient.put(params, (err, data) => {
        if (err) {
          console.log(
            "Unable to Add a User titled - ",
            user.title,
            ". Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log("User Added. User emailId:", user.emailId);
        }
      });
    });
  } catch (error) {
    console.log(
      "Error Loading Users. Error JSON:",
      JSON.stringify(error, null, 2)
    );
  }
};

module.exports = { checkUserTable, createUserTable, deleteUserTable };

