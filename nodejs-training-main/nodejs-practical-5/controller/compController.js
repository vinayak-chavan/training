const { compare } = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");
const comp = require("../models/company");
const jobs = require("../models/jobs");
const user = require("../models/user");
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require('../middleware/token');
const { isAuth } = require('../middleware/auth');

const companyRegister = async (req, res) => {
    try {
        const addingcompRecords = new comp(req.body)
        const insert = addingcompRecords.save();
        res.status(201).send("Registration Successful");
    } catch (e) {
        res.status(400).send(e);
    }
}

const compLogin = async (req, res) => {
    try {
        const emailID = req.body.emailID;
        const password = req.body.password;
        const userdata = await comp.findOne({ emailID: emailID });
        if (!userdata) throw new error("Invalid credentials")
        const isMatch = await compare(password, userdata.password);
        console.log(isMatch);
        if (!isMatch) throw new error("Invalid password...");
        const accesstoken = createAccessToken(userdata.emailID);
        const refreshtoken = createRefreshToken(userdata.emailID);
        comp.refreshtoken = refreshtoken;
        sendRefreshToken(res, refreshtoken);
        sendAccessToken(res, req, accesstoken);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const logoutCompany = async (req, res) => {
    res.clearCookie('refreshtoken');
    res.send("Logout");
}

const viewComp = async (req, res) => {
    try {
        const page = req.params.page;
        const size = 10;
        const skip = (page - 1) * size;
        const getComps = await comp.find({}, {}, { size: size, skip: skip }).sort({ "createdAt": 1 });
        res.send(getComps);
    } catch (e) {
        res.status(400).send(e);
    }
}

const viewOneComp = async (req, res) => {
    try {
        const _id = req.params.id;
        const getcomp = await comp.findById(_id);
        res.send(`Name: ${getcomp.name}\n Location: ${getcomp.location}\n EmailID: ${getcomp.emailID}`);
    } catch (e) {
        res.status(400).send(e);
    }
}

const updateComp = async (req, res) => {
    try {
        const _id = req.params.id;
        const getcomp = await comp.findByIdAndUpdate(_id, req.body, { new: true });
        res.send(getcomp);
    } catch (e) {
        res.status(500).send(e);
    }
}

const deleteComp = async (req, res) => {
    try {
        const getComp = await comp.findByIdAndDelete(req.params.id);
        res.send(getComp);
    } catch (e) {
        res.status(500).send(e);
    }
}

const viewApplier = async (req, res) => {
    try {
        const userID = isAuth(req);
        if (!userID) throw new Error("Failed to load company data!!!");
        const jobApplier = await jobs.aggregate([
            {
                '$match': {
                    '_id': mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'applied',
                    'foreignField': '_id',
                    'as': 'userData'
                }
            }, {
                '$unwind': {
                    'path': '$userData',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'appliername': '$userData.fullname',
                    'applieremail': '$userData.emailID',
                    'appliercontactno': '$userData.contactno',
                    'applierlocation': '$userData.location',
                    'applierexperience': '$userData.experience',
                    'applierdegree': '$userData.degree',
                    'applierresume': '$userData.resume'
                }
            }
        ])
        if (jobApplier.length == 0) throw new error("Users data does not exist!!!")
        res.status(200).json({ jobApplier })
    } catch (e) {
        res.status(500).send(e.message);
    }
}

module.exports = { companyRegister, compLogin, logoutCompany, viewComp, viewOneComp, updateComp, deleteComp, viewApplier };