const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Order = require('./../models/orderModel');

// @desc Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    next(new AppError('No order items', 400));
  }

  const order = new Order({
    orderItems: orderItems.map(item => {
      return {
        ...item,
        product: item._id,
        quantity: item.qty,
        _id: undefined,
      };
    }),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc GET logged in user orders
// @route GET /api/orders/myorders
// @access Private
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc GET order by id
// @route GET /api/orders/:id
// @access Private
exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    '_id name email'
  );

  if (!order) next(new AppError('Order not found', 404));

  if (req.user.role !== 'admin' && !order.user._id.equals(req.user._id))
    next(new AppError('You do not have an order with this id', 401));

  res.status(200).json(order);
});

// @desc Update order to paid
// @route PATCH /api/orders/:id/pay
// @access Private/Admin
exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) next(new AppError('Order not found', 404));
  console.log(req.body);
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
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
