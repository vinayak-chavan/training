const express = require("express");
const { defaultController } = require("../controllers/defaultController");
const {
	addProject,
	updateProject,
	getProject,
	deleteProject,
} = require("../controllers/projects/projects.controller");

const { projectValidation } = require("../controllers/projects/projects.validator");

const router = express.Router();

router.post("/addProject", projectValidation, addProject);
router.post("/updateProject", projectValidation, updateProject);
router.post("/getProject", getProject);
router.post("/deleteProject", deleteProject);

module.exports = router;
