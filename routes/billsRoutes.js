const express = require("express");

const router = express.Router();
const {
  addBillsController,
  getBillsController,
} = require("../controllers/billsController");
//routes
//Method - Post
router.post("/add-bills", addBillsController);
//Method -get
router.get("/get-bills", getBillsController);

module.exports = router;
