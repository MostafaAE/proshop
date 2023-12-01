const express = require('express');
const products = require('./dev-data/data/products');

const app = express();

app.get('/', (req, res, next) => {
  res.send('API is running');
});

app.get('/api/products', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: products,
  });
});

app.get('/api/products/:id', (req, res, next) => {
  const { id: productId } = req.params;
  const product = products.find(p => p._id === productId);

  res.status(200).json({
    result: 'success',
    data: product,
  });
});

module.exports = app;
