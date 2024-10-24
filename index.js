//dependencies
const express =require("express")
const dotenv =require("dotenv")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const nano_id=require("nanoid")
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
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
})

app.use(express.json())

app.get("/test",(req,res)=>{
    return res.status(200).json({msg:"Welldone Tricxddev"})
})

//ORGANISATION/USER REGISTRATION
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
    const token = await jwt.sign({orgMail},`${process.env.loginFrmMailToken}`,{expiresIn:"30m"})
     const savedUser =  await newOrgUser.save()
     if(savedUser){
        mailBot(orgMail,orgName)
     }else{
        return res.status(402).json({msg:"USER NOT SAVED TO DATABASE"})
     }
   
     return res.status(200).json({
        msg:"SUCCESSFUL",
        savedUser
        // A SUCCESSFUL RESGISTRATION MAIL MUST BE SENT TO THE USER'S MAIL
     })
    }catch(error){return res.status(400).json({msg:error.message})}    

})

//ACTIVATION LINK LOGIN
app.post("/userFromMail/:token",async(req,res)=>{
    const {}=req.params.token
})

//ORGANISATION/USER LOGIN
app.post("/orgLogin&",mailCheck,async(req,res)=>{
    try {
        const {orgMail,orgPassWord}=req.body
        const verifyMail = await organizerModel.findOne({orgMail})
        if(!verifyMail){
        return res.status(401).json({msg:"INVALID ACCESS"})
        }

        const passDecode = await bcrypt.compare(orgPassWord,verifyMail.orgPassWord)
        if(!passDecode){
        return res.status(400).json({msg:"INVALID ACCESS"})
        }

        const getOrgId = await verifyMail._id

        const accesslnk = jwt.sign({id:getOrgId},`${process.env.actiVelnk}`,{expiresIn:"60m"})

        return res.status(200).json({
            msg:"SUCCESSFUL",
            getOrgId,
            OrgName:verifyMail.orgName,
            accesslnk
        })
    } catch (error) { return res.status(400).json(error.message)}
    })


//ORGANIATION CREATE CAUSE
app.post("/createCause/:_id",async(req,res)=>{
    try{
        const {causeTitle,fromDate,toDate,desc,goalAmount,raiseAmount}=req.body
        const bearer =req.header.split('')[1]
        const {_id}=req.params
        const findId= organizerModel.findOne(_id)
        const causeId = Math.floor(Math.random()*1000)
    
        const newCause = new causeModel({
        causeTitle,
        causeId,
        causeDuration:
        {fromDate:new Date(fromDate),
        toDate: new Date(toDate)},
        desc,
        goalAmount:Number(goalAmount),
        raiseAmount:Number(raiseAmount),
        orgName:findId.orgName,
        org_Id:findId._id
        })

        const causeSave = await newCause.save()

        return res.status(200).json({
        msg:"SUCCESSFUL",
        causeSave
        })
    }catch(error){return res.status(400).json(error.message)}    
})

// //API to recover user password
// app.get("/recoverPw",async(req,res)=>{
//     const{orgMail}=req.body
//     const findmail= await organizerModel.findOne(orgMail)
//     const password = findmail.orgPassWord
//     const comparePw = await bcrypt.hashSync
// })