const express = require ('express');

const app=express();

app.use("/home", (req,res)=>{
    res.send("hello from home")
});

app.use("/hey", (req,res)=>{
    res.send("hey from server")
});

app.use("/test", (req,res)=>{
    res.send("testing it")
});



app.listen(4000,()=>{
    console.log("server is active ")
})