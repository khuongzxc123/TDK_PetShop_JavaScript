const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
      sucess: false,
      mes: "Missing inputs",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("user has existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      mes: newUser
        ? "Register is successfully. Please go login "
        : "Something went wrong",
    });
  }
});
//refresh token => cap moi access token
//access token => xac thuc nguoi dung , phan quyen nguoi dung
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      mes: "Missing inputs",
    });

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    //tach password va role ra khoi response
    const { password, role, ...userData } = response.toObject();
    //tao access token
    const accessToken = generateAccessToken(response._id, role);
    //tao refersh token
    const refreshToken = generateRefreshToken(response._id);
    // luu refesh token vao database
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    //luu refresh token vao cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("invaild credentials");
  }
});
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: false,
    rs: user ? user : "user not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  //lay token tu cookies
  const cookie = req.cookies;
  //cchekc cos token hay khog
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  //check token co hop le hay khong
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SERCRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccesToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Xóa refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});
//client gui mail
//server check mail hop le hay khong => gui mail +kem theo link
//client check mail =>click link
//clinet gui api kem token
//check token cos giong voi token ma server da gui mail
//change pass
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
};
