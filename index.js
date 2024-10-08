//dependencies
const express =require("express")
const dotenv =require("dotenv")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
//paths
const dbconnect=require("./db")
const {causeModel,organizerModel}=require("./models/users_db")
const  {mailCheck} =require("./middleware/validateOrg")

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
        const  {organizerName,userMail,organizerPassWord}=req.body

    const passHash = bcrypt.hash(organizerPassWord,12)

    const newOrgUser = new organizerModel({
                            organizerName,
                            userMail,
                            organizerPassWord:passHash})
     const savedUser =  await newOrgUser.save()

     return res.status(200).json({
        msg:"SUCCESSFUL",
        savedUser
        // A SUCCESSFUL RESGISTRATION MAIL MUST BE SENT TO THE USER'S MAIL
     })
    }catch(error){return res.status(400).json({msg:error.message})}    

})




