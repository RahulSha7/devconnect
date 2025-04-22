const express = require('express');


const { userAuthentication } = require("../middlewares/auth");
const ConnectionModel = require("../models/requestConnection");
const User = require("../models/user");
const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuthentication, async (req, res) => {
  try{
    user=req.user;
    const fromUserId =user._id; 
     const toUserId=req.params.toUserId;
     const status = req.params.status;
     const validStatus=["interested","ignored"];
     if(!validStatus.includes(status)){
      return res.status(400).json({error:"status not valid"});
     }
     const validToUserId=  await User.findById(toUserId);
     if(!validToUserId) {
      return res.status(400).json({error:"User not present"});
     }
     const existingSentRequest = await ConnectionModel.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
     });
     if(existingSentRequest){
      return res.status(400).json({error:"Request already sent"});
     }

     const sendConnection = new ConnectionModel({
        fromUserId,
        toUserId,
        status
     })
   const data=   await sendConnection.save();
     res.json({message:"request sent successfully",
       data,}
     
     );
  }catch (err) {

    res.status(400).json({ error: err.message });
  }
});

router.post("/request/review/:status/:requestId",userAuthentication,async (req,res)=>{
  try{
    const user= req.user;
    const{ status , requestId} = req.params;
   
    const validStatus= ["accepted","rejected"];
    if(!validStatus.includes(status)){
      return res.status(400).json({error:"invalid status"});
    }
    const connectionRequest = await ConnectionModel.findOne({
      _id:requestId,
      toUserId:user._id,
      status:"interested"
      })
      console.log(connectionRequest);
      if(!connectionRequest) return res.status(400).json({error:"user not found"});

      connectionRequest.status=status;
      const data = await connectionRequest.save();
      res.json({message:"Request" + status,data});

  }catch(err){
    res.status(400).send("Something Went wrong" + err.message);
  }

})
module.exports = router;