const express = require('express');
const products = require('./dev-data/data/products');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
// Unhandled routes handler middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
