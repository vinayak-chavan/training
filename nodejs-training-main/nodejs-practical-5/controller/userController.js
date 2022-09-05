const bcrypt = require("bcryptjs");
const express = require("express");
const router = new express.Router();
const user = require("../models/user");
const job = require("../models/jobs");
const multer = require('multer');
const path = require('path');
const pathToResume = path.join(__dirname, '../upload');
const upload = multer({ dest: pathToResume });

const userRegister = async (req, res) => {
    try {
        const addinguserRecords = new user(req.body);
        const insert = await addinguserRecords.save();
        res.status(201).send("Registration Successful");
    } catch (e) {
        res.status(400).send(e);
    }
}

const uploadResume = async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(req.file.path)
        const getuser = await user.findByIdAndUpdate(_id, { resume: req.file.path }, { new: true });
        res.status(201).send("Resume Uploded Succeessfully");
    } catch (e) {
        res.status(400).send(e);
    }
}

const userLogin = async (req, res) => {
    try {
        const emailID = req.body.emailID;
        const password = req.body.password;
        const userdata = await user.findOne({ emailID: emailID });
        const isMatch = await bcrypt.compare(password, userdata.password);

        if (isMatch)
            res.status(201).send("Login Successful");
        else
            res.send("Invalid data");
    } catch (error) {
        res.status(400).send("Invalid data");
    }
}

const viewUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const getuser = await user.findById(_id);
        res.send(getuser);
    } catch (e) {
        res.status(400).send(e);
    }
}

const updateUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const getuser = await user.findByIdAndUpdate(_id, req.body, { new: true });
        res.send(getuser);
    } catch (e) {
        res.status(500).send(e);
    }
}

const deleteUser = async (req, res) => {
    try {
        const getuser = await user.findByIdAndDelete(req.params.id);
        res.send(getuser);
    } catch (e) {
        res.status(500).send(e);
    }
}

const applyForJob = async (req, res) => {
    try {
        const jobData = await job.findOne(req.param.id)
        console.log(jobData);
        let jobApplieData = [];
        jobApplieData.push(...jobData.applied);
        jobApplieData.push(req.query.userID);
        const apply = await job.findByIdAndUpdate(req.params.id, { applied: jobApplieData });
        res.status(201).send("Applied Succesfully");
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = { userRegister, uploadResume, userLogin, viewUser, updateUser, deleteUser, applyForJob };