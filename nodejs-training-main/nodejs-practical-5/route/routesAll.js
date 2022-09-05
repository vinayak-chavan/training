const express = require("express");
const router = new express.Router();
const multer = require('multer');
const path = require('path');
const pathToResume = path.join(__dirname, '../upload');
const upload = multer({ dest: pathToResume });
const { userRegister, uploadResume, userLogin, viewUser, updateUser, deleteUser, applyForJob } = require('../controller/userController');
const { companyRegister, compLogin, logoutCompany, viewComp, viewOneComp, updateComp, deleteComp, viewApplier } = require('../controller/compController');
const { viewJob, viewOneJob, createJob, updateJob, deleteJob } = require('../controller/jobController');

router.post("/compRegister", companyRegister);

router.post("/compLogin", compLogin);

router.post("/logoutCompany/:id", logoutCompany);

router.get("/viewComp", viewComp);

router.get("/viewComp/:id", viewOneComp);

router.patch("/update/:id", updateComp);

router.delete("/deleteComp/:id", deleteComp);

router.get('/viewApplier/:id', viewApplier);

router.post("/userRegister", userRegister)

router.patch("/uploadResume/:id", upload.single('resume'), uploadResume);

router.post("/userLogin", userLogin);

router.get("/viewUser/:id", viewUser);

router.patch("/updateuser/:id", updateUser);

router.delete("/deleteuser/:id", deleteUser);

router.patch("/applyForJob/:id", applyForJob);

router.get("/viewJob", viewJob)

router.get("/viewJob/:id", viewOneJob)

router.post("/createJob", createJob)

router.patch("/UpdateJob/:id", updateJob)

router.delete("/deleteJob/:id", deleteJob)

module.exports = router;