const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      require: true,
    },
    customerNumber: {
      type: Number,
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
    },
    subTotal: {
      type: Number,
      require: true,
    },
    tax: {
      type: Number,
      require: true,
    },
    paymentMode: {
      type: String,
      require: true,
    },
    cartItems: {
      type: Array,
      require: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamp: true,
  }
);

const Bills = mongoose.model("bill", billSchema);
module.exports = Bills;
