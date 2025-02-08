
import mongoose from "mongoose";

const contactSchema= new mongoose.Schema({
name:{type:String,require:true},
email:{type:String,require:true},
phone:{type:Number,require:true},
type:{type:String,require:true},
created_at:{type:Date,default:Date.now},
user:{type:mongoose.Schema.Types.ObjectId},


});

export const Contact = new mongoose.model("contact",contactSchema)
