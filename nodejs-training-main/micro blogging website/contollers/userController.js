const errorFunction = require("../utils/errorFunction");
const blog = require("../models/blog");
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const mongoose = require("mongoose");
const multer = require('multer');
const auth = require('../middleware/auth');
let uid, blogID;

const register = async (req, res) => {
    try {
        const addinguserRecords = new user(req.body);
        const insert = await addinguserRecords.save();
        const token = generateAccessToken({ username: req.body.username });
        console.log('Registration Successful');
        res.redirect('/');
    } catch (e) {
        res.status(400).send(e);
    }
}

const loginview = (req, res) => {
    res.render('login');
}

const createview = (req, res) => {
    res.render('addBlog');
}

const login = async (req, res) => {
    try {
        const emailID = req.body.emailID;
        const password = req.body.password;
        const userdata = await user.findOne({ emailID: emailID });
        const isMatch = await bcrypt.compare(password, userdata.password);
        console.log(isMatch)
        if (isMatch) {
            uid = userdata._id;
            console.log('user logged in');
            res.redirect('viewblog');
        }
        else {
            res.render('login');
        }
    } catch (error) {
        res.status(400).send("Invalid data");
    }
}

const logout = async (req, res) => {
    uid = null;
    console.log('user logged out');
    res.redirect('/');
}

const follow = async (req, res) => {
    try {
        const userdata = await user.findById(req.body.userId)
        if (!(userdata.following.includes(uid))) {
            userdata.following.push(uid);
            userdata.save();
        }
        return res.status(200).send({ message: "Successfully", followingCount: userdata.following.length });
    } catch (e) {
        return res.status(400).send(e);
    }
}

const unfollow = async (req, res) => {
    try {
        const userdata = await user.findById(req.body.userId)
        if (userdata.following.includes(uid)) {
            let index = userdata.following.indexOf(uid);
            userdata.following.splice(index, 1);
            userdata.save();
        }
        return res.status(200).send({ message: "Successfully", followingCount: userdata.following.length });
    } catch (e) {
        return res.status(400).send(e);
    }
}

const following = async (req, res) => {
   try {
       console.log(uid)
        const userdata = await user.find({
            following: { $in: uid }
        });
        console.log(userdata);
        res.render("following", {userdata:userdata });
    } catch (e) {
        res.status(400).send(e);
    }
}

const viewUsers = async (req, res) => {
    try {
        const allUsers = await user.find();
        res.render("viewUsers", { users: allUsers });
    } catch (e) {
        res.status(400).send(e);
    }
}

const followerAdd = async (req, res) => {

}

module.exports = { createview, loginview, login, register, logout, follow, unfollow, following, viewUsers, followerAdd };