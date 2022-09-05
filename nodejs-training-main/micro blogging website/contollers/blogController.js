const errorFunction = require("../utils/errorFunction");
const blog = require("../models/blog");
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const mongoose = require("mongoose");
let uid, blogID;

const viewBlog = async (req, res) => {
    try {
        const allBlogs = await blog.find();
        res.render("viewBlog", { blogs: allBlogs });
    } catch (e) {
        res.status(400).send(e);
    }
}

const createBlog = async (req, res) => {
    if (!uid) {
        res.redirect('/');
    }
    try {
        const newBlog = new blog({
            title: req.body.title,
            description: req.body.description,
            photo: req.file.filename,
            userID: uid
        });
        newBlog.save();
        console.log('new blog added');
        res.redirect('/myblog');
    } catch (e) {
        res.status(400).send(e);
    }
}

const updateBlogView = async (req, res) => {
    try {
        const getBlog = await blog.findById(req.params.id);
        blogID = req.params.id;
        res.render("updateBlog", { blogs: getBlog });
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateblo = async (req, res) => {
    if (!uid) {
        res.redirect('/');
    }
    try {
        const blogDetails = await blog.findByIdAndUpdate(blogID, {
            title: req.body.title,
            description: req.body.description,
            photo: req.file.filename
        });
        console.log('blog updated added');
        res.redirect('/myblog');
    } catch (e) {
        res.status(400).send(e);
    }
}

const viewMyBlog = async (req, res) => {
    if (!uid) {
        res.redirect('/');
    }
    try {
        const myBlogs = await blog.find({ userID: uid });
        res.render("myBlog", { blogs: myBlogs });
    } catch (e) {
        res.status(400).send(e);
    }
}

const deleteBlog = async (req, res) => {
    if (!uid) {
        res.redirect('/');
    }
    try {
        const delBlog = await blog.findByIdAndDelete(req.params.id);
        res.redirect('/myBlog');
    } catch (e) {
        res.status(500).send(e);
    }
}

const blogLike = async (req, res) => {
    try {
        const blogdata = await blog.findById(req.body.blogId)
        if (!(blogdata.like.includes(uid))) {
            blogdata.like.push(uid);
            blogdata.save();
        }
        if (blogdata.dislike.includes(uid)) {
            let index = blogdata.dislike.indexOf(uid);
            blogdata.dislike.splice(index, 1);
        }
        return res.status(200).send({ message: "Successfully", likeCount: blogdata.like.length, dislikeCount: blogdata.dislike.length });
    } catch (e) {
        return res.status(400).send(e);
    }
}

const blogDislike = async (req, res) => {
    try {
        const blogdata = await blog.findById(req.body.blogId)
        if (!(blogdata.dislike.includes(uid))) {
            blogdata.dislike.push(uid);
            blogdata.save();
        }
        if (blogdata.like.includes(uid)) {
            let index = blogdata.like.indexOf(uid);
            blogdata.like.splice(index, 1);
        }
        return res.status(200).send({ message: "Successfully", likeCount: blogdata.like.length, dislikeCount: blogdata.dislike.length });
    } catch (e) {
        return res.status(400).send(e);
    }
}

module.exports = {viewBlog, createBlog, updateblo, updateBlogView, viewMyBlog, deleteBlog, blogLike, blogDislike};