const nodemailer = require("nodemailer")


const mailBot = async(userMail)=>{

    const sender = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:`${process.env.botMail}`,
            pass:`${process.env.botPass}`
        }
    })

    const sendDetails= {
        from:process.env.botMail,
        to:userMail,
        html:`<h1>WELCOME,${orgName}</h1>
            <p>Your Account have been Succesfully creeated, 
            Kindly click the link below to get Started </p>
        `
    }

    const sendCommand= await sender.sendMail(sendDetails);

}

module.exports=mailBot ;