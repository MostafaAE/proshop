const catchAsync = require('../utils/catchAsync');
const Order = require('./../models/orderModel');

// @desc Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = catchAsync(async (req, res, next) => {
  res.status(201).json('add order items');
});

// @desc GET logged in user orders
// @route GET /api/orders/myorders
// @access Private
exports.getMyOrders = catchAsync(async (req, res, next) => {
  res.status(200).json('get my orders');
});

// @desc GET order by id
// @route GET /api/orders/:id
// @access Private
exports.getOrderById = catchAsync(async (req, res, next) => {
  res.status(200).json('get order by id');
});

// @desc Update order to paid
// @route PATCH /api/orders/:id/pay
// @access Private/Admin
exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  res.status(200).json('update order to paid');
});

// @desc Update order to delivered
// @route PATCH /api/orders/:id/deliver
// @access Private/Admin
exports.updateOrderToDelivered = catchAsync(async (req, res, next) => {
  res.status(200).json('update order to delivered');
});

// @desc GET all orders
// @route GET /api/orders
// @access Private/Admin
exports.getOrders = catchAsync(async (req, res, next) => {
  res.status(200).json('get my orders');
});
