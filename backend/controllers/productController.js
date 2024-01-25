const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Product = require('./../models/productModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.status(200).json(product);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = catchAsync(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('Product not found', 404));

  await Product.deleteOne({ _id: product._id });
  res.status(204).json({
    message: 'Product removed',
  });
});

// @desc    Edit a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('Product not found', 404));

  const updatedProduct = await product.updateOne(req.body);

  res.status(200).json(updatedProduct);
});
