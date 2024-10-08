
const mailCheck = async(req,res,next)=>{
    const  userMail=req.body
    if(!userMail){
        return resizeBy.status(400).json({msg:"This field Should not be Empty, Please Fill"})
    }
    if(!validEmail(userMail)){
        return res.status(400).json({msg:"Wrong Mail format"})
    }



    next()
}


// Validate Email With Regex
const validEmail = (userMail) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userMail).toLowerCase());
}


module.exports={mailCheck,validEmail}