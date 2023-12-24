const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

// @desc  Login user
// @route POST /api/users/login
// @access Public
exports.loginUser = catchAsync(async (req, res, next) => {
  res.send('login user');
});

// @desc  Register user profile
// @route POST /api/users/signup
// @access Public
exports.signupUser = catchAsync(async (req, res, next) => {
  res.send('register user');
});

// @desc  Logout user
// @route POST /api/users/logout
// @access Private
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.send('logout user');
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
exports.getUserProfile = catchAsync(async (req, res, next) => {
  res.send('get user profile');
});

// @desc  Update user profile
// @route PATCH /api/users/profile
// @access Private
exports.updateUserProfile = catchAsync(async (req, res, next) => {
  res.send('update user profile');
});

// @desc  Get users
// @route Get /api/users/
// @access Private/Admin
exports.getUsers = catchAsync(async (req, res, next) => {
  res.send('get users');
});

// @desc  Get user by id
// @route Get /api/users/:id
// @access Private/Admin
exports.getUserById = catchAsync(async (req, res, next) => {
  res.send('get user by id');
});

// @desc  Delete user
// @route Delete /api/users/:id
// @access Private/Admin
exports.deleteUser = catchAsync(async (req, res, next) => {
  res.send('delete user');
});

// @desc  Update user
// @route PUT /api/users/:id
// @access Private/Admin
exports.updateUser = catchAsync(async (req, res, next) => {
  res.send('update user');
});
