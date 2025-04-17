const express = require("express");
const { userAuthentication } = require("../middlewares/auth");
const ConnectionModel = require("../models/requestConnection");
const router = express.Router();

const USER_DATA = "firstName lastName gender age";

router.get("/user/requests/recieved", userAuthentication, async (req, res) => {
  try {
    user = req.user;
    const connectionRequest = await ConnectionModel.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", USER_DATA);

    res.json({ message: "data fetched successfully", data:connectionRequest });
  } catch (err) {
    res
      .status(400)
      .json({ error: "cannot view pending requests" + err.message });
  }
});

router.get(
  "/user/connections",
  userAuthentication,
  async (req, res) => {
    try {
      const user = req.user;
      const connectionRequest = await ConnectionModel.find({
        $or: [
          { toUserId: user._id, status: "accepted" },
          { fromUserId: user._id, status: "accepted" },
        ],
      })
        .populate("toUserId", USER_DATA)
        .populate("fromUserId", USER_DATA);

      const data = connectionRequest.map((row) => {
        if (row.fromUserId._id.toString() === user._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      });
      res.json({ message: "connection fetched successfully", data });
    } catch (err) {
      res.status(400).json({ error: "cannot view connections" + err.message });
    }
  }
);

module.exports = router;