const express = require("express");
const auth = require('../middleware/auth');
const router = new express.Router();
const { createview, loginview, login, register, logout, follow, unfollow, following, viewUsers} = require('../contollers/userController');
const uploadFunction = require('../middleware/imageUpload');

router.get("/", loginview);

router.post("/login", authenticateToken, login)

router.post("/register", authenticateToken, register);

router.get("/logout", logout);

router.get("/addblog", createview);

router.get("/following", following);

router.get("/viewUsers", viewUsers);

router.post("/follow", follow);

router.post("/unfollow", unfollow);


module.exports = router;