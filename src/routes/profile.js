const express = require("express");

const { userAuthentication } = require("../middlewares/auth");
const {allowedProfileUpdate} = require ( "../utils/validation");

const router = express.Router();

router.get("/profile/view", userAuthentication, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error getting profile" + err.message);
  }
});
router.patch("/profile/edit",userAuthentication,async(req,res)=>{
  try{
  if(!allowedProfileUpdate(req)){
    res.status(400).send("update not possible");
  };
  const loggedInUser= req.user;
     
     Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key]);
  
     await loggedInUser.save();
     res.json({message:`${loggedInUser.firstName} your profile has been edited`,
 data:  loggedInUser });

  }catch(err){
    res.status(400).send("Something Went Wrong " + err.message)
  }
})

router.patch("/profile/password" ,userAuthentication,async(req,res)=>{
try{
  

}catch(err){
  res.status(400).send("error changing password" + err.message)
}
})
module.exports = router;
