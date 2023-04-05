const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./config/config");
require("colors");
dotenv.config();
//dbconfig
connectDb();
//rest obj
const app = express();

//middlware
app.use(cors()); //truy cap cac domain #
app.use(express.json()); //phan tich cac res duoi dang json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //---------------dang url coded
app.use(morgan("dev")); //ghi lai req gui toi server

//routes khai bao cac dinh tuyen URL
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoutes"));
//port
const PORT = process.env.PORT || 8081; //dat cong server
//listen

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`.bgCyan.white);
});
