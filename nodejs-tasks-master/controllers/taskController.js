const mongoose = require('mongoose');

const task = require('../models/task');
const subtask = require('../models/subTask');

const { successResponse, errorResponse } = require('../utils');

const viewTasks = async (req, res) => {
  try {
    const taskData = await task.find();

    // check if task is exist or not
    if(!taskData){
      return errorResponse(req, res, 'Task Not Found', 404);
    } else{
      return successResponse(req, res, taskData, 200);
    }
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const viewOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const matchedTask = await task.findOne({ _id: id });

    // check if task is exist or not
    if (!matchedTask) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }

    return successResponse(req, res, matchedTask, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.body)
    const payload = {
      title,
      status: 'Not Started',
    };

    // insert task payload in database
    const newTask = new task(payload);
    const insertTask = await newTask.save();
    console.log('insert successful');
    return successResponse(req, res, insertTask, 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    // check if task exist or not
    const taskData = await task.findOne({ _id: id });
    if (!taskData) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }

    const taskDetails = await task.findByIdAndUpdate(id, {
      title: req.body.title,
      status: req.body.status,    
    });
    return successResponse(req, res, 'Update Successful', 200);
  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // check if task exist or not
    const taskData = await task.findOne({ _id: id });
    if (!taskData) {
      return errorResponse(req, res, 'Task Not Found', 404);
    }

    // deleteing task from database
    const deleteTaskData = await task.findByIdAndDelete(id);

    // deleteing subtask related to task from database
    const deleteSubtask = await subtask.deleteMany( { taskID: id } )
    return successResponse(req, res, deleteTaskData, 200);

  }
  catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

module.exports = { viewTasks, viewOneTask, addTask, updateTask, deleteTask };