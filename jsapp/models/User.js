const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema= new Schema({
id:{
    type:Number
    
},
username:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    required:true
},
description:{
    type:String,
    required:true
},
amount:{
    type:Number,
    reqired:true
},
});
module.exports = User=mongoose.model('users',UserSchema);