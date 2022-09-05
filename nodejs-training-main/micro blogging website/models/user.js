const mongoose = require('mongoose');
const Schema = require('mongoose');
const bcrypt = require('bcryptjs');

const blogUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    emailID: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    following:{
        type: [Schema.Types.ObjectId]
    },
    token:{
        type:String
    }
});

blogUserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const bloguser = new mongoose.model("bloguser", blogUserSchema);

module.exports = bloguser;
