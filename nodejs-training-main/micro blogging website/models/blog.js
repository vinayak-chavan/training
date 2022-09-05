const mongoose = require('mongoose');
const Schema = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String
    },
    userID:{
        type: Schema.Types.ObjectId
    },
    like: {
        type: [Schema.Types.ObjectId]
    },
    dislike: {
        type: [Schema.Types.ObjectId]
    }
});


const blog = new mongoose.model("blog", blogSchema);

module.exports = blog;
