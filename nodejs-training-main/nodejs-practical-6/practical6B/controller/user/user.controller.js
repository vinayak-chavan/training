const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/fileOperations');
const userFilePath = path.join(__dirname, '../../resource/users.json');
const { nonExistProjects } = require('../../utils/existanceChecker');

module.exports.getUsers = async (event) => {
  try {
    const data = await readFile(userFilePath);
    // Check if file is emty or not
      return(data);
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.getUser = async (event) => {
  const { userId } = event.pathParameters;
  try {
    const data = await readFile(userFilePath);

    // Check if file is emty or not
    if (isEmptyFile(data)) {
      return('file is empty');
    }

    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));
    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
			return('data does not exist');
    }
    return(data[singleUserIndex]);
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.addUser = async (event) => {
  const {
    fullName, emailID, designation, department, technologiesKnown, projects,
  } = JSON.parse(event.body);

  try {
    let data = await readFile(userFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }

    if (!fullName || !emailID || !designation || !department || !technologiesKnown || !projects) {
      return('enter all parameters');
    }

    const payload = {
      ID: data[data.length - 1].ID + 1,
      fullName,
      emailID,
      designation,
      department,
      technologiesKnown,
      projects,
    };

    data.push(payload);
    await writeFile(userFilePath, data);
		return('data added successfully');
  } catch (error) {
    console.log(error)
    return(error.message);
  }
};

module.exports.updateUser = async (event) => {
  const { userId } = event.pathParameters;
  try {
    const data = await readFile(userFilePath);

    // Check if data present in file or not
    if (!data || !data.length) {
      return('empty data');
    }
    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));

    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
      return('data does not exist');
    }
    // Check if project IDs exist or not
    if (Object.keys(data[singleUserIndex]).includes('projects')) {
      const invalidProject = await nonExistProjects(req.body.projects);
      if (invalidProject.length) {
        return(`Projects ${invalidProject} does not exist`);
      }
    }
    Object.keys(req.body).forEach((prop) => {
      if (Object.keys(data[singleUserIndex]).includes(prop)) {
        data[singleUserIndex][prop] = req.body[prop];
      }
    });
    await writeFile(userFilePath, data);
    return('data updated successfully');
  } catch (error) {
    return(error.message);
  }
};

module.exports.deleteUser = async (event) => {
  const { userId } = event.pathParameters;
  try {
    let data = await readFile(userFilePath);
    // Check if data present in file or not
    if (!data || !data.length) {
      data = [];
    }
    const singleUserIndex = data.findIndex((ele) => ele.ID === Number(userId));
    // Check if user with ID exist or not
    if (singleUserIndex < 0) {
      return('data does not exist');
    }
    const updatedData = data.filter((user) => user.ID !== Number(userId));
    await writeFile(userFilePath, updatedData);
    return('data deleted successfully');
  } catch (error) {
    return('something went wrong');
  }
};
