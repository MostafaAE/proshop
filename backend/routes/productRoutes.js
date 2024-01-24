const express = require('express');

const productController = require('./../controllers/productController');
const authController = require('./../controllers/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createProduct
  );

router.route('/:id').get(productController.getProduct);

module.exports = router;
