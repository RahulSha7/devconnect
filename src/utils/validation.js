const validator = require('validator');

const signupValidation= (req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("name is required");
    }
   else if(!validator.isEmail(email)){
                    throw new Error("email not valid");
                }
                
  else if(!validator.isStrongPassword(password)){
                    throw new Error("password  not strong");
                }           
   
}

const allowedProfileUpdate = (req)=>{
    const allowedUpdate = ["firstName","lastName","age","gender","skills","photoUrl"];
    const isUpdateAllowed = Object.keys(req.body).every(field => allowedUpdate.includes(field));
    // if(!isAllowedUpdate){
    //     res.status(400).send("please enter only valid fields")
    // }
    return isUpdateAllowed;

}
module.exports={signupValidation,allowedProfileUpdate};