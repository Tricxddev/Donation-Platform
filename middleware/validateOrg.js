
const mailCheck = async(req,res,next)=>{
    const  orgMail=req.body
    if(!orgMail){
        return resizeBy.status(400).json({msg:"This field Should not be Empty, Please Fill"})
    }
    // if(!validEmail(orgMail)){
    //     return res.status(400).json({msg:"Wrong Mail format"})
    // }

    next()
}


// Validate Email With Regex
const validEmail = (orgMail) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(orgMail).toLowerCase());
}


module.exports={mailCheck,validEmail}