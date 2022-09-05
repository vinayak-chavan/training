const fs = require('fs');

exports.readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return new Error(error);
  }
};

exports.writeFile = async (filePath, dataToStore) => {
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(dataToStore));
  } catch (error) {
    return new Error(error);
  }
};

exports.isEmptyFile = (data) => {
  if (!data || !data.length) {
    return true;
  }
  return false;
};