const express = require("express");
const { connectDb } = require("./config/database");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter= require('./routes/auth');
const profileRouter= require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user')

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter)

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
