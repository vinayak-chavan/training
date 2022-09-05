const mongoose = require('mongoose');
const Schema = require('mongoose');

const subTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    taskID:{
      type: Schema.Types.ObjectId
    }
  }
);

const subTask = new mongoose.model('subTask', subTaskSchema);

module.exports = subTask;
