const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if (connect.connection.readyState === 1)
      console.log("db connection successfully");
    else console.log("db connecting");
  } catch (error) {
    console.log("db connection is fail");
    throw new Error(error);
  }
};

module.exports = dbConnect;
