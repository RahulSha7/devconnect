const express = require('express');
const { connectDb } = require("./config/database");
const app = express();
const User = require("./models/user")
const { adminauth } = require("./middlewares/auth");


app.use(express.json());


app.post("/signup", async (req, res) => {
    const user= new User(req.body);
    
    try {
        await user.save();
        res.send("user saved");
    } catch {
        (err) => {
            res.status(400).send("user saving error:" +err.message);
        }

    }

})

connectDb()
    .then(() => {
        console.log("connection is sexfull");

        app.listen(4000, () => {
            console.log("server is active ");
        });
    })
    .catch((err) => {
        console.error("connection failed");
    })

