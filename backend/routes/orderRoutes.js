const express = require('express');

const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, orderController.addOrderItems)
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.getOrders
  );

router
  .route('/myorders')
  .get(authController.protect, orderController.getMyOrders);

router.route('/:id').get(authController.protect, orderController.getOrderById);

router
  .route('/:id/pay')
  .patch(authController.protect, orderController.updateOrderToPaid);

router
  .route('/:id/deliver')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.updateOrderToDelivered
  );

module.exports = router;
