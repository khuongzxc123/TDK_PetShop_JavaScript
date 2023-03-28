const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const createCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createCategory: response ? response : "cannot create new blog-category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    blogCategories: response ? response : "cannot get blog-category",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedCategory: response ? response : "cannot update new product-category",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid);
  return res.json({
    success: response ? true : false,
    deletedCategory: response ? response : "cannot delete new product-category",
  });
});
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
