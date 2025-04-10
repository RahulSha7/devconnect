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
module.exports=signupValidation;