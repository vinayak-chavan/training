const path = require('path');
const diff = require('lodash.difference');
const { readFile } = require('./fileOperations');

const projectFilePath = path.join(__dirname, '../resource/projects.json');

exports.nonExistProjects = async(projectArr) => {
    const projectData = await readFile(projectFilePath);
    const projectIDs = projectData.map((ele) => ele.ID);
    return diff(projectArr, projectIDs);
};
