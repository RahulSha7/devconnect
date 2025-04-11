const express = require("express");
const { connectDb } = require("./config/database");

const User = require("./models/user");
const { userAuthentication } = require("./middlewares/auth");
const signupValidation = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
  try {
    //validate
    const { email, password } = req.body;
    if (!validator.isEmail(email)) throw new Error("insert correct email");
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      //token generate
      const token = await jwt.sign({ _id: user._id }, "Devconnect",{expiresIn:'14d'});
      //send in cookie
      res.cookie("token", token);
      res.send("login succesfull");
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error in loging in:" + err.message);
  }
});

app.get("/profile", userAuthentication, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error getting profile" + err.message);
  }
});

app.post("/sendConnectionRequest",userAuthentication,async(req,res)=>{
      user= req.user;
            res.send(user.firstName+" send the connection request");
            console.log("connection req sent");
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
  });
