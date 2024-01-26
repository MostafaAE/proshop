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

router
  .route('/top-3-products')
  .get(productController.getTopProducts, productController.getAllProducts);

router
  .route('/:id')
  .get(productController.getProduct)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateProduct
  );

router
  .route('/:id/reviews')
  .post(authController.protect, productController.createProductReview);

module.exports = router;
