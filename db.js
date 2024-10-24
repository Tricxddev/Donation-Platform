
const dotenv =require("dotenv")
const  mongoose=require("mongoose")

const dbconnect = async()=>{
    try{
        mongoose.connect(`${process.env.DB_URL}`)
        .then(()=>{
            console.log("DB NOW CONNECTED")
        })
    }catch(error){
        return res.status(400).json({msg:error.message})
    }
};

module.exports=dbconnect