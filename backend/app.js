const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');

const app = express();
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const uploadRouter = require('./routes/uploadRoutes');

const AppError = require('./utils/appError');

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(cors());

// ROUTES
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.use('/api/upload', uploadRouter);

const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, '/uploads')));

// Unhandled routes handler middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
