const mongoose = require('mongoose')

const causeSchema = new mongoose.Schema({
    causeTitle:{type:String},
    desc:{type:String},
    goalAmount:{type:Number},
    raiseAmount:{type:Number},
    organizer:{type:String},
    organizer_id:{type:mongoose.Types.ObjectId,ref:'organizerModel',require:true}
})
const causeModel = new mongoose.model("causeModel",causeSchema);

const organizerSchema = new mongoose.Schema({
    organizerName:{type:String,require:true},
    userMail:{type:String,require:true},
    organizerPassWord:{type:String,require:true,unique:true}    
})

const organizerModel = new mongoose.model("organizerModel",organizerSchema)

module.exports={causeModel,organizerModel}