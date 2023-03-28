const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config.js");
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get("/", ctrls.getBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.get("/one/:bid", ctrls.getBlogs);
router.put("/likes/:bid", [verifyAccessToken], ctrls.likeBlog);
router.put(
  "/image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.uploadImagesBlog
);
router.put("/dislike/:bid", [verifyAccessToken], ctrls.dislikeBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);
module.exports = router;
