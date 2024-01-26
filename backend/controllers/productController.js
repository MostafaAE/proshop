const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Product = require('./../models/productModel');

exports.getTopProducts = (req, res, next) => {
  req.query.sort = '-rating';
  req.query.limit = '3';
  next();
};
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = catchAsync(async (req, res, next) => {
  console.log('sort', req.query);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = req.query.sort?.replaceAll(',', ' ');

  const search = req.query.search
    ? { name: { $regex: req.query.search, $options: 'i' } }
    : {};

  const count = await Product.countDocuments({ ...search });

  const products = await Product.find({ ...search })
    .skip(skip)
    .limit(limit)
    .sort(sortBy);

  res.status(200).json({ products, pages: Math.ceil(count / limit) });
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

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = catchAsync(async (req, res, next) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError('Product not found', 404));

  // Prevent the user from reviewing a product more than one time
  const alreadyReviewed = product.reviews.find(
    review => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed)
    return next(new AppError('You have already reviewed this product', 400));

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({
    message: 'Review added',
  });
});
