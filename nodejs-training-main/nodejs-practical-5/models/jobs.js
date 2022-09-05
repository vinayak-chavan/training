const mongoose = require('mongoose');
const Schema= require('mongoose');
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    department:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    package:{
        type:String,
        required:true,
        trim:true
    },
    qualification:{
        type:String,
        required:true,
        trim:true
    },
    experience:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    applied:{
        type:[Schema.Types.ObjectId]
    },
},{
    timestamps: true
  });


const jobs= new mongoose.model("jobs", jobSchema);

module.exports = jobs;
   