const express = require("express");
const router = new express.Router();
const job = require("../models/jobs");
const formidable = require("formidable");

router.get("/viewJob", async(req, res) => {
    try{
        const order = req.params.order;
        const page= req.params.page;
        const size=10;
        const skip = (page-1)*size;
        if(order==='desc'){
            const getJobs = await job.find({},{},{size:size, skip:skip}).sort({"createdAt":1});
            res.send(getJobs);
        }else if(order==='asc'){
            const getJobs = await job.find({},{},{size:size, skip:skip}).sort({"createdAt":0});
            res.send(getJobs);
        }
        else{
            const getJobs = await job.find({},{},{size:size, skip:skip}).sort({"createdAt":0});
            res.send(getJobs);
        }    
    }catch(e){
        res.status(400).send(e);
    }
}) 

router.get("/viewJob/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const getJob = await job.findById(_id)
        res.send(getJob);
    }catch(e){
        res.status(400).send(e);
    }
}) 

router.post("/createJob", async(req, res) =>{
    try{
        const addingJobsRecords = new job(req.body)
        console.log(req.body);
        const insert = addingJobsRecords.save();
        res.status(201).send(insert);
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch("/UpdateJob/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const getJob = await job.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(getJob);
    }catch(e){
        res.status(500).send(e);
    }
}) 

router.delete("/deleteJob/:id", async(req, res) => {
    try{
        const getJob = await job.findByIdAndDelete(req.params.id);
        res.send(getJob);
    }catch(e){
        res.status(500).send(e);
    }
}) 

module.exports = router;