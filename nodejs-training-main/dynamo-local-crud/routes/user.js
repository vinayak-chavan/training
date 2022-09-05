const express = require("express");
const { defaultController } = require("../controllers/defaultController");
const {
	addUser,
	updateUser,
	getUser,
	deleteUser,
} = require("../controllers/users/users.controller");

const { UserValidation } = require("../controllers/users/users.validator");

const router = express.Router();

router.post("/addUser", userValidation, addUser);
router.post("/updateUser", userValidation, updateUser);
router.post("/getUser", getUser);
router.post("/deleteUser", deleteUser);

module.exports = router;
