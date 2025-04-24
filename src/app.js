const express = require("express");
const { connectDb } = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
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
