
import mongoose from 'mongoose';

const UserModelSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    created_at:{type:Date,default:Date.now},

});

export const User=  mongoose.model("userdata",UserModelSchema); 