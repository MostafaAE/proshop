const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');

const app = express();
const productRouter = require('./routes/productRoutes');

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// ROUTES
app.use('/api/products', productRouter);

// Unhandled routes handler middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
