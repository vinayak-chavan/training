const express = require("express");
const router = new express.Router();
const {signUp, verifyOtp} = require('../controller/userController');

router.post('/signup', signUp);
router.post('/signup/verify', verifyOtp);

module.exports = router;