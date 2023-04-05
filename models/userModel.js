const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    userId: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    verified: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
  }
);

const Users = mongoose.model("User", userSchema);
module.exports = Users;
