const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
} = require("./../controllers/userController");
//routes
//Method - get
router.post("/login", loginController);
//Method -Post
router.post("/register", registerController);

module.exports = router;
