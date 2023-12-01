const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./../../config/db');
const usersData = require('./users');
const productsData = require('./products');
const User = require('./../../models/userModel');
const Product = require('./../../models/productModel');
const Order = require('./../../models/orderModel');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(usersData);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = productsData.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.create(sampleProducts);

    console.log('Data Imported!');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

const deleteAllData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

(async () => {
  const operations = {
    '--import': importData,
    '--delete': deleteAllData,
  };
  operations[process.argv[2]]();
})();
