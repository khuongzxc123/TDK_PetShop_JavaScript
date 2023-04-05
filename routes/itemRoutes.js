const express = require("express");

const router = express.Router();
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
} = require("./../controllers/itemController");
//routes
//Method - get
router.get("/get-item", getItemController);
//Method -Post
router.post("/add-item", addItemController);
//Method -put
router.put("/edit-item", editItemController);
//Method -delete
router.post("/delete-item", deleteItemController);
module.exports = router;
