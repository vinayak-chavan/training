const express = require("express");

const { viewTasks, viewOneTask, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { auth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/checkRole');

const route = express.Router();

route.post("/task", auth, isAdmin, addTask);
route.get('/task', auth, viewTasks);
route.get('/task/:id', auth, viewOneTask);
route.put('/task/:id', auth, isAdmin, updateTask);

route.delete('/task/:id', auth, isAdmin, deleteTask);

module.exports = route;