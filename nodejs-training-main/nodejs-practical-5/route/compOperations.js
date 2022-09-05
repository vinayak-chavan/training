const {compare} = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();
const comp = require("../models/company");
const jobs = require("../models/jobs");
const user = require("../models/user");
const {createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken}= require('../token');
const {isAuth} = require('../auth');

router.post("/compRegister", async(req, res) =>{
    try{
        const addingcompRecords = new comp(req.body)
        const insert = addingcompRecords.save();
        res.status(201).send("Registration Successful");
    }catch(e){
        res.status(400).send(e);
    }
})

router.post("/compLogin", async(req, res) =>{
    try{
        const emailID = req.body.emailID;
        const password = req.body.password;
        const userdata = await comp.findOne({emailID:emailID});
        //console.log(userdata.password, typeof userdata)
        const isMatch = await compare(password, userdata.password);
        console.log(isMatch);
        if(!isMatch) throw new error("Invalid password...");
        const accesstoken=createAccessToken(userdata.emailID);
        const refreshtoken=createRefreshToken(userdata.emailID);
        comp.refreshtoken=refreshtoken;
        sendRefreshToken(res, refreshtoken);
        sendAccessToken(res, req, accesstoken);
    }catch(error){
        res.status(400).send(error.message);
    }
});

router.post('/logoutCompany/:id', (req, res) =>{
    res.clearCookie('refreshtoken');
    res.send("Logout");
})

router.get("/viewComp", async(req, res) => {
    try{
        const page= req.params.page;
        const size=10;
        const skip = (page-1)*size;
        const getComps = await comp.find({},{},{size:size, skip:skip}).sort({"createdAt":1});
        res.send(getComps);
    }catch(e){
        res.status(400).send(e);
    }
}) 

router.get("/viewComp/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const getcomp = await comp.findById(_id);
        res.send(`Name: ${getcomp.name}\n Location: ${getcomp.location}\n EmailID: ${getcomp.emailID}`);
    }catch(e){
        res.status(400).send(e);
    }
}) 

router.patch("/update/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const getcomp = await comp.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(getcomp);
    }catch(e){
        res.status(500).send(e);
    }
}) 

router.delete("/deleteComp/:id", async(req, res) => {
    try{
        const getComp = await comp.findByIdAndDelete(req.params.id);
        res.send(getComp);
    }catch(e){
        res.status(500).send(e);
    }
}) 

router.get('/viewApplier/:id', async(req, res) => {
    try{
        const userID = isAuth(req);
        if(!userID) throw new Error("Failed to load company data!!!");
        // console.log(req.params.id);
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
        if(jobApplier.length == 0) throw new error("Users data does not exist!!!")
        res.status(200).json({jobApplier})
    }catch(e){
        res.status(500).send(e.message);
    }
})
module.exports = router;