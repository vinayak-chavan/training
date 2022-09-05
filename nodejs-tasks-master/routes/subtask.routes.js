const express = require("express");

const { addSubtask, viewSubtasks, updateSubtask, deleteSubtask, viewOneSubtask } = require('../controllers/subtaskController');
const {auth} = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

const route = express.Router();

route.post("/task", auth, isAdmin, addSubtask);
route.get("/subtasks/:taskid", auth, viewSubtasks);
route.get("/subtask/:id", auth, viewOneSubtask);
route.put("/subtask/:id", auth, isAdmin, updateSubtask);
route.delete("/subtask/:id", auth, isAdmin, deleteSubtask);


module.exports = route;