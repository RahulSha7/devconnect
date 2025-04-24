const express = require('express');
const {signupValidation} = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    //validating
    signupValidation(req);
    //password hash
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    // console.log(hashPassword);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();
    res.send("user saved");
  } catch (err) {
    res.status(400).send("user getting error: " + err.message);
  }
});

router.post("/login", async (req, res) => {
    try {
      //validate
      const { email, password } = req.body;
      if (!validator.isEmail(email)) {
        throw new Error("insert correct email")
      }
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid Credentials");
        
      }
      const comparePassword = await user.validatePassword(password);
      if (comparePassword) {
        const token = await user.getJWT();
  
        res.cookie("token", token);
        res.json({data:user});
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (err) {
      res.status(400).send("Error in loging in:" + err.message);
    }
  });

router.post("/logout",(req,res)=>{
    res
    .cookie("token",null,{expires: new Date(Date.now())})
    .send("logout successful");

  })

module.exports= router;