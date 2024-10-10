const mongoose = require('mongoose')

const causeSchema = new mongoose.Schema({
    causeTitle:{type:String},
    causeId:{type:String,unique:true},
    causeDuration:{
        fromDate:{type:Date},
        toDate:{type:Date}},
    desc:{type:String},
    goalAmount:{type:Number},
    raiseAmount:{type:Number},
    orgName:{type:String},
    org_Id:{type:mongoose.Types.ObjectId,ref:'organizerModel',require:true}
});
const causeModel = new mongoose.model("causeModel",causeSchema);

const organizerSchema = new mongoose.Schema({
    orgName:{type:String,require:true},
    orgMail:{type:String,require:true},
    orgPassWord:{type:String,require:true,unique:true},
    orgDetails:{type:String,required:true}
});

const organizerModel = new mongoose.model("organizerModel",organizerSchema);

module.exports={causeModel,organizerModel};