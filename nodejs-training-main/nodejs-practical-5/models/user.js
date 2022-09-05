const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    emailID:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    contactno:{
        type:Number,
        require:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    experience:{
        type:String,
        required:true,
        trim:true
    },
    degree:{
        type:String,
        required:true,
        trim:true
    },
    resume:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password, 10);
    }
    next();
})

const user= new mongoose.model("user", userSchema);

module.exports = user;
   