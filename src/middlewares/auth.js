const jwt = require('jsonwebtoken');
const User= require("../models/user");

const userAuthentication = async (req, res, next) => {
  try{
      //read the token
      const {token }=req.cookies;
      if(!token){
        return res.status(401).send("Unauthorized: No token provided");
      }
      const  decodedObj= await jwt.verify(token,'Rahul@123');
const {_id}= decodedObj;

const user= await User.findOne({_id:_id});
if(!user){
  throw new Error("user not found:"+err.message);
}
req.user=user;
next();
  }catch (err){
    res.status(400).send("ERROR"+err.message);
  }
};

module.exports =  {userAuthentication };
