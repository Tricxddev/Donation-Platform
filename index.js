const express =require("express")
const dotenv =require("dotenv")
const dbconnect=require("./db")
const app=express()



PORT = process.env.PORT || 5000

app.listen(PORT,(req,res)=>{
    console.log(`SERVER RUNNING ON PORT ,${PORT}`)
})
dotenv.config()
app.use(express.json())

dbconnect()