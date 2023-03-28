const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const app = express();
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 8888;
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dbConnect();
initRoutes(app);
app.listen(port, () => {
  console.log(`server is running on the port :` + port);
});
