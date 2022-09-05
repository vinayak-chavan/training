const path = require('path');
const { readFile, writeFile, isEmptyFile } = require('../../utils/fileOperations');
const projectFilePath = path.join(__dirname, '../../resource/projects.json');

module.exports.getProjects = async (event) => {
  try {
    const data = await readFile(projectFilePath);
    if (isEmptyFile(data)) {
      return('empty data');
    }
    return(data);
  } catch (error) {
    return(error);
  }
};

module.exports.getProject = async (event) => {
  const { projectId } = event.pathParameters;
  try {
    const data = await readFile(projectFilePath);
    if (isEmptyFile(data)) {
      return('empty data');
    }
    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));
    if (singleProjectIndex < 0) {
      return('Data does not exist');
    }
    return(data[singleProjectIndex]);
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.addProject = async (event) => {
  const { title, description } = JSON.parse(event.body);
  try {
    let data = await readFile(projectFilePath);
    if (!data || !data.length) {
      data = [];
    }
    if (!title || !description) {
        return('enter all parameters');
    }
    const payload = {
      ID: data[data.length - 1].ID + 1,
      title,
      description,
    };
    data.push(payload);
    await writeFile(projectFilePath, data);
    return('data added successfully');
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.updateProject = async (event) => {
  const { projectId } = event.pathParameters;
  try {
    let data = await readFile(projectFilePath);
    if (!data || !data.length) {
      data = [];
    }
    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));
    // Check if project with ID exist or not
    if (singleProjectIndex < 0) {
      return('data does not exist');
    }
    Object.keys(req.body).forEach((prop) => {
      if (Object.keys(data[singleProjectIndex]).includes(prop)) {
        data[singleProjectIndex][prop] = req.body[prop];
      }
    });
    await writeFile(projectFilePath, data);
    return('data updated successfully');
  } catch (error) {
    return('something went wrong');
  }
};

module.exports.deleteProject = async (event) => {
  const { projectId } = event.pathParameters;
  try {
    let data = await readFile(projectFilePath);
    if (!data || !data.length) {
      data = [];
    }
    const singleProjectIndex = data.findIndex((ele) => ele.ID === Number(projectId));
    if (singleProjectIndex < 0) {
      return('data does not exist');
    }
    const updatedData = data.filter((project) => project.ID !== Number(projectId));
    await writeFile(projectFilePath, updatedData);
    return('data deleted successfully');
  } catch (error) {
    return('something went wrong');
  }
};
