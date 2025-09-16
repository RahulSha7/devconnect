
const mongoose = require('mongoose');


const requestConnectionSchema= mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","rejected","accepted"],
            message:`{VALUE} is not correct status`
        },
        required:true,
    }
},
{
    timestamps: true
},);

requestConnectionSchema.pre("save", function(next){
    const connectionRequest= this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("cannot send request to yourself");
    }
    next();
})

const ConnectionModel = mongoose.model("connectionModel",requestConnectionSchema);

module.exports=ConnectionModel;