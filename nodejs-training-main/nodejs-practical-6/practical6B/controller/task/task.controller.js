const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/fileOperations');
const taskFilePath = path.join(__dirname, '../../resource/tasks.json');
const { nonExistProjects } = require('../../utils/existanceChecker');

module.exports.getTasks = async (event) => {
  try {
    const data = await readFile(taskFilePath);
    if (isEmptyFile(data)) {
      return('empty data');
    }
    return(data);
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.getTask = async (event) => {
  const { taskId } = event.pathParameters;
  try {
    const data = await readFile(taskFilePath);
    if (isEmptyFile(data)) {
      return('empty file');
    }
    const singleTaskIndex = data.findIndex((ele) => ele.ID === Number(taskId));
    if (singleTaskIndex < 0) {
      console.log('data does not exist');
    }
    return(data[singleTaskIndex]);
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.addTask = async (event) => {
  const { title, description, projectID } = JSON.parse(event.body);
  try {
    let data = await readFile(taskFilePath);
    if (!data || !data.length) {
      data = [];
    }
    if (!title || !description || !projectID) {
      return('enter all parameters');
    }
    const payload = {
      ID: data[data.length - 1].ID + 1,
      title,
      description,
      projectID,
    };
    data.push(payload);
    await writeFile(taskFilePath, data);
    return('data added successfully');
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.updateTask = async (event) => {
  const { taskId } = event.pathParameters;
  try {
    let data = await readFile(taskFilePath);
    if (!data || !data.length) {
      data = [];
    }
    const singleTaskIndex = data.findIndex((ele) => ele.ID === Number(taskId));
    if (singleTaskIndex < 0) {
      return('data does not exist');
    }
    if (Object.keys(data[singleTaskIndex]).includes('projectID')) {
      const invalidProject = await nonExistProjects(Array(1).fill(req.body.projectID));
      if (invalidProject.length) {
        return(`Projects ${invalidProject} does not exist !!!`);
      }
    }
    Object.keys(req.body).forEach((prop) => {
      if (Object.keys(data[singleTaskIndex]).includes(prop)) {
        data[singleTaskIndex][prop] = req.body[prop];
      }
    });
    await writeFile(taskFilePath, data);
    return('data updated successfully');
  } catch (error) {
		return('something went wrong');
  }
};

module.exports.deleteTask = async (event) => {
  const { taskId } = event.pathParameters;
  try {
    let data = await readFile(taskFilePath);
    if (!data || !data.length) {
      data = [];
    }
    const singleTaskIndex = data.findIndex((ele) => ele.ID === Number(taskId));
    if (singleTaskIndex < 0) {
      return('data does not exist');
    }
    const updatedData = data.filter((project) => project.ID !== Number(taskId));
    await writeFile(taskFilePath, updatedData);
    return('data deleted successfully');
  } catch (error) {
    return('something went wrong');
  }
};
