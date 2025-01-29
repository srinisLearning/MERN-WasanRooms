const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const mongoose = require("mongoose");

router.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const userExists = await User.findOne({ email });
  try {
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    console.log(error);
  }

  const newUser = new User({ name, email, mobile, password });
  //console.log(newUser);

  try {
    newUser.save();
    res.send("User Registered successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      //console.log("User Logged in successfully");
      const loggedInUser = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      return res.send(loggedInUser);
    } else {
      //  console.log("Invalid Credentials");
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });

    res.send("User Logged in successfully");
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
router.get("/getUserById/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  if (mongoose.Types.ObjectId.isValid(userId)) {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
      console.log(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.status(400).json({ error: "Invalid user  ID" });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  try {
    await User.findOneAndDelete({ _id: userId });
    res.send("User Deleted Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

/* router.put("/makeUserAdmin/:userId", async (req, res) => {
  const userId = req.params.userId;

  console.log(userId);

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { isAdmin: true }
    );
    res.send(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}); */
router.put("/updateUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { name, email, mobile, password } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { name, email, mobile, password, isAdmin: true },
      { new: true }
    );
    if (user) {
      res.send({ message: "User Updated Successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/changepassword", async (req, res) => {
  const { password, userid } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userid },
      { password },
      { new: true }
    );
    if (user) {
      res.send({ message: "Password Changed Successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/changephone", async (req, res) => {
  const { phone, userid } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userid },
      { mobile: phone },
      { new: true }
    );
    if (user) {
      res.send({ message: "Phone Number Changed Successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
module.exports = router;
