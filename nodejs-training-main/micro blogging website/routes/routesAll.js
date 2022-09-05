const express = require("express");
const auth = require('../middleware/auth');
const router = new express.Router();
const { createview, loginview, login, register, logout, follow, unfollow, following, viewUsers, followerAdd } = require('../contollers/userController');
const {viewBlog, createBlog, updateblo, updateBlogView, viewMyBlog, deleteBlog, blogLike, blogDislike} = require("../contollers/blogController");
const uploadFunction = require('../middleware/imageUpload');

router.get("/", loginview);

router.post("/login", authenticateToken, login)

router.post("/register", authenticateToken, register);

router.get("/logout", logout);

router.get("/viewblog", viewBlog);

router.get("/addblog", createview);

router.post("/addblog", uploadFunction, createBlog);

router.get("/updateblog/:id", updateBlogView);

router.post("/updateblo", uploadFunction, updateblo);

router.get("/deleteBlog/:id", deleteBlog);

router.get("/myblog", viewMyBlog);

router.post("/like",  blogLike);

router.post("/dislike", blogDislike);

router.get("/following", following);

router.get("/viewUsers", viewUsers);

router.post("/follow", follow);

router.post("/unfollow", unfollow);


module.exports = router;