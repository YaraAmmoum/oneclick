const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const ProductRate = async (req, res) => {
  const { rating, id } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5." });
  }
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const newNumReviews = product.numReviews + 1;
    const newRating =
      (product.rating * product.numReviews + rating) / newNumReviews;
    product.rating = newRating;
    product.numReviews = newNumReviews;

    await product.save();
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error rating product", message: err.message });
  }
};

const ProductPostImage = [
  upload.single("image"),
  async (req, res) => {
    const { name, desc, price, quantity, category } = req.body;
    const image = req.file ? req.file.path : "";
    const userId = req.userId;

    const newProduct = new Product({
      name,
      desc,
      price,
      quantity,
      image,
      category,
      userId,
    });
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res
        .status(400)
        .send({ error: "Error saving product", message: err.message });
    }
  },
];

const ProductGet = async (req, res) => {
  const userId = req.userId;
  try {
    const products = await Product.find({ userId });
    res.json(products);
  } catch (err) {
    res.status(500).send({ error: "Server error", message: err.message });
  }
};
const ProductGetnoauth=async(req,res)=>
{
  try{
  const products=await Product.find();
  res.json(products);
  }
  catch{
    res.status(500).send({ error: "Server error", message: err.message });

  }
}

const ProductCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).send({ error: "Retrieve error", message: err.message });
  }
};
const ProductPutImage = [
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { name, desc, price, quantity, category } = req.body;
    const image = req.file ? req.file.path : "";

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, desc, price, quantity, image, category },
        { new: true }
      );
      res.json(updatedProduct);
    } catch (err) {
      res
        .status(400)
        .send({ error: "Error updating product", message: err.message });
    }
  },
];

const ProductDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Error deleting product", message: err.message });
  }
};
const ProductGetId = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).send({ error: "Server error", message: err.message });
  }
};
const ProductReviewGet = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).select("reviews");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product.reviews);
  } catch (err) {
    res.status(500).send({ error: "Server error", message: err.message });
  }
};

const ProductReviewPost = async (req, res) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.reviews.push({ rating, comment });
    await product.save();

    res.json(product.reviews);
  } catch (err) {
    res
      .status(500)
      .send({ error: "Error submitting review", message: err.message });
  }
};
const count=async(req,res)=>
{
try {
  const productCount = await Product.countDocuments(); 
  res.json({ count: productCount });
} catch (error) {
  console.error('Error fetching product count:', error);
  res.status(500).json({ message: 'Error fetching product count', error });
}}
module.exports = {
  ProductRate,
  ProductPost: ProductPostImage,
  ProductGet,
  ProductPutImage,
  ProductCategory,
  ProductGetId,
  ProductDelete,
  ProductReviewGet,
  ProductReviewPost,
  count,
  ProductGetnoauth
};
