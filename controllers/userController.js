// controllers/userController.js
const userModal = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Login user
const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Find the user with the given userId and password
    const user = await userModal.findOne({ userId, password });

    // If the user doesn't exist or their account isn't verified, send an error response
    if (!user || !user.verified) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If the user exists and their account is verified, create an authentication token and send it back to the client
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Register user
const registerController = async (req, res) => {
  try {
    const newUser = new userModal({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).json({ message: "New user added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to add new user" });
  }
};

module.exports = {
  loginController,
  registerController,
};
