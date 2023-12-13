const express = require('express');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');

const app = express();
// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Unhandled routes handler middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
