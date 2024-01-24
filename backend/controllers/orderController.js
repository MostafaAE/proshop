const AppError = require('../utils/appError');
const { calcPrices } = require('../utils/calcPrices.js');
const catchAsync = require('../utils/catchAsync');
const {
  verifyPayPalPayment,
  checkIfNewTransaction,
} = require('../utils/paypal.js');
const Order = require('./../models/orderModel');
const Product = require('./../models/productModel');

// @desc Create new order
// @route POST /api/orders
// @access Private
exports.addOrderItems = catchAsync(async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map(x => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map(itemFromClient => {
      const matchingItemFromDB = itemsFromDB.find(
        itemFromDB => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        quantity: itemFromClient.qty,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    console.log(dbOrderItems);
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // console.log(order);
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
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
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
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
  const orders = await Order.find().populate('user', '_id name');
  res.status(200).json(orders);
});
