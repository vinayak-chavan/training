const express = require("express");
const auth = require('../middleware/auth');
const router = new express.Router();
const {viewBlog, createBlog, updateblo, updateBlogView, viewMyBlog, deleteBlog, blogLike, blogDislike} = require("../contollers/blogController");
const uploadFunction = require('../middleware/imageUpload');

router.get("/viewblog", viewBlog);

router.post("/addblog", uploadFunction, createBlog);

router.get("/updateblog/:id", updateBlogView);

router.post("/updateblo", uploadFunction, updateblo);

router.get("/deleteBlog/:id", deleteBlog);

router.get("/myblog", viewMyBlog);

router.post("/like",  blogLike);

router.post("/dislike", blogDislike);


module.exports = router;