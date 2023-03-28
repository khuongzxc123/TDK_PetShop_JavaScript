const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { json } = require("express");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createdProduct: newProduct ? newProduct : "Cannot create new product",
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});
// Filtering, sorting & pagination
const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // tach cac truong dac biet ra khoi querry
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  //format lai cac operators cho dung cu phap cua mongoose
  let querryString = JSON.stringify(queries);
  querryString = querryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (mathedEl) => `$${mathedEl}`
  );
  const formatedQueries = JSON.parse(querryString);
  //Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatedQueries);
  //sorting
  //acb, efg => [abc, efg ]=> abc efg
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join("");
    queryCommand = queryCommand.sort(sortBy);
  }
  //fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join("");
    queryCommand = queryCommand.select(fields);
  }
  //pageination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  //execute query
  //number of products that satisfy the condition !== number of products returned by the API call
  queryCommand
    .exec()
    .then((response) => {
      return Product.find(formatedQueries)
        .countDocuments()
        .then((counts) => {
          return res.status(200).json({
            success: response ? true : false,
            products: response ? response : "Cannot get products",
            counts,
          });
        });
    })
    .catch((err) => {
      throw new Error(err.message);
    });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product",
  });
});
//de danh gia sp :login => verifytoken
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing inputs"); //neu co star va pid
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id //toString()
  );
  //tim product yes or no
  //   console.log(alreadyRating);
  if (alreadyRating) {
    //update star and comment
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: { "ratings.$.star": star, "ratings.$.comment": comment }, // $ cai object  models ratings = alreadyrating
      },
      { new: true }
    );
  } else {
    // add star and comment
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
  }

  //sum ratings
  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();
  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing Inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updateProduct: response ? response : "cannot update images product",
  });
});
module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
