const express = require("express");
const { defaultController } = require("../controllers/defaultController");
const {
	addTask,
	updateTask,
	getTask,
	deleteTask,
} = require("../controllers/tasks/tasks.controller");

const { taskValidation } = require("../controllers/tasks/tasks.validator");

const router = express.Router();

router.post("/addTask", taskValidation, addTask);
router.post("/updateTask", taskValidation, updateTask);
router.post("/getTask", getTask);
router.post("/deleteTask", deleteTask);

module.exports = router;
