//dependencies
const express =require("express")
const dotenv =require("dotenv")
//paths
const dbconnect=require("./db")
const {causeModel,organizerModel}=require("./models/users_db")

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


app.post("/registerOrg",(req,res)=>{
    const   {organizerName,organizerMail,organizerPassWord}=req.body

})




