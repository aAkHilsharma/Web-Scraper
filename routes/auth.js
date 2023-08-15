const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.send({ success: false, msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;

    const user = new User(req.body);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwt_secret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
      }
    );
  } catch (err) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, msg: "Internal Server Error" });
    }
  }
});

// @route - /api/auth/login
// Authenticate user and get token

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.send({ success: false, msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send({ success: false, msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwt_secret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
      }
    );
  } catch (err) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ success: false, msg: "Internal Server Error" });
    }
  }
});

module.exports = router;
