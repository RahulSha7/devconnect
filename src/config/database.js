const mongoose = require("mongoose");

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://rahulsharma312004:ve1X4XmzCy95hEz0@secmogambo.pponu.mongodb.net/devConnect");
}

module.exports={
    connectDb
}