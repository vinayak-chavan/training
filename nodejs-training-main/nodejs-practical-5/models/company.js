const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const companySchema = new mongoose.Schema({
    name:{
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
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    token:{
        type:String
    }
});

companySchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password, 10);
    }
    next();
})

const company= new mongoose.model("company", companySchema);

module.exports = company;
   