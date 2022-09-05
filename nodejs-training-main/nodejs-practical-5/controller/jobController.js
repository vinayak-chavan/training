const express = require("express");
const router = new express.Router();
const job = require("../models/jobs");

const viewJob = async (req, res) => {
    try {
        const order = req.params.order;
        const page = req.params.page;
        const size = 10;
        const skip = (page - 1) * size;
        if (order === 'desc') {
            const getJobs = await job.find({}, {}, { size: size, skip: skip }).sort({ "createdAt": 1 });
            res.send(getJobs);
        } else if (order === 'asc') {
            const getJobs = await job.find({}, {}, { size: size, skip: skip }).sort({ "createdAt": 0 });
            res.send(getJobs);
        }
        else {
            const getJobs = await job.find({}, {}, { size: size, skip: skip }).sort({ "createdAt": 0 });
            res.send(getJobs);
        }
    } catch (e) {
        res.status(400).send(e);
    }
}

const viewOneJob = async (req, res) => {
    try {
        const _id = req.params.id;
        const getJob = await job.findById(_id)
        res.send(getJob);
    } catch (e) {
        res.status(400).send(e);
    }
}

const createJob = async (req, res) => {
    try {
        const addingJobsRecords = new job(req.body)
        console.log(req.body);
        const insert = addingJobsRecords.save();
        res.status(201).send(insert);
    } catch (e) {
        res.status(400).send(e);
    }
}

const updateJob = async (req, res) => {
    try {
        const _id = req.params.id;
        const getJob = await job.findByIdAndUpdate(_id, req.body, { new: true });
        res.send(getJob);
    } catch (e) {
        res.status(500).send(e);
    }
}

const deleteJob = async (req, res) => {
    try {
        const getJob = await job.findByIdAndDelete(req.params.id);
        res.send(getJob);
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = { viewJob, viewOneJob, createJob, updateJob, deleteJob };
