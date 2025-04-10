const express = require("express");
const { connectDb } = require("./config/database");

const User = require("./models/user");
const { userAuthentication } = require("./middlewares/auth");
const signupValidation = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    console.log(userEmail);
    const users = await User.find({ email: userEmail });

    if (users.length === 0) {
      res.status(400).send("user getting error:" + err.message);
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("user getting error: " + err.message);
  }
});

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
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("email not registered");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      //token generate
      const token = await jwt.sign({ _id: user._id }, "Devconnect");
      //send in cookie
      res.cookie("token", token);
      res.send("login succesfull");
    } else {
      res.status(400).send("invalid password");
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
app.patch("/user/:userid", async (req, res) => {
  const userId = req.params?.userid;
  const data = req.body;
  try {
    const Update_Allowed = ["skills", "age", "gender"];
    const user_allowwed = Object.keys(data).every((k) =>
      Update_Allowed.includes(k)
    );
    if (!user_allowwed) {
      throw new Error("update dont allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills dont allowed");
    }
    const user = await User.findOneAndUpdate({ _id: userId }, data, {
      runValidators: true,
      returnDocument: "after",
    });
    res.send("updated succesfully");
    console.log(user);
  } catch (err) {
    res.status(400).send("update failed :" + err.message);
  }
});

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
