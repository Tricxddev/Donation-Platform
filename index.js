//dependencies
const express =require("express")
const dotenv =require("dotenv")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
//paths
const dbconnect=require("./db")
const {causeModel,organizerModel}=require("./models/users_db")
const  {mailCheck} =require("./middleware/validateOrg")
const mailBot=require("./services/mailer")

//configs
const app=express()

dotenv.config()
dbconnect()

PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ,${PORT}`)
})

app.use(express.json())

app.get("/test",(req,res)=>{
    return res.status(200).json({msg:"Welldone Tricxddev"})
})


app.post("/regOrgUser",mailCheck,async(req,res)=>{
    try{
        const  {orgName,orgMail,orgPassWord,orgDetails}=req.body
    const mailCheck = await organizerModel.findOne({orgMail})
    if(mailCheck){
        return res.status(401).json({msg:"USER ALREADY EXISTS"})
    }

    const passHash = await bcrypt.hash(orgPassWord,12)

    const newOrgUser = new organizerModel({
        orgName,
        orgMail,
        orgPassWord:passHash,
        orgDetails
    })
     const savedUser =  await newOrgUser.save()
     if(savedUser){
        mailBot(orgMail,orgName)
     }else{
        return res.status(402).json({msg:"SAVE USER NOT SUCCESSFUL"})
     }
   
     return res.status(200).json({
        msg:"SUCCESSFUL",
        savedUser
        // A SUCCESSFUL RESGISTRATION MAIL MUST BE SENT TO THE USER'S MAIL
     })
    }catch(error){return res.status(400).json({msg:error.message})}    

})




