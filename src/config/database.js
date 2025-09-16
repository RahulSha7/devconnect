const mongoose = require("mongoose");

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://rahulsharma312004:ve1X4XmzCy95hEz0@secmogambo.pponu.mongodb.net/devConnect")
    .then(() => console.log("DB connected"))
    .catch(err => console.error("MongoDB Error:", err.message));
}

module.exports={
    connectDb
}