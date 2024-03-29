const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'strict',
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Rmove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// @desc  Login user
// @route POST /api/users/login
// @access Public
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password)))
    return next(new AppError('Incorrect email or password', 401));

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

// @desc  Register user profile
// @route POST /api/users/signup
// @access Public
exports.signupUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) return next(new AppError('User already exists', 401));

  const user = await User.create({
    email,
    name,
    password,
  });

  createSendToken(user, 200, res);
});

// @desc  Logout user
// @route POST /api/users/logout
// @access Private
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie('jwt', '', { httpOnly: true, expiresIn: new Date(0) });

  res.status(200).json({
    status: 'success',
  });
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
exports.getUserProfile = catchAsync(async (req, res, next) => {
  const { email, name, role, _id } = req.user;

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
    },
  });
});

// @desc  Update user profile
// @route PATCH /api/users/profile
// @access Private
exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();

  const { email, name, role, _id } = updatedUser;

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        _id,
        name,
        email,
        role,
      },
    },
  });
});

// @desc  Get users
// @route Get /api/users/
// @access Private/Admin
exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc  Get user by id
// @route Get /api/users/:id
// @access Private/Admin
exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) return next(new AppError('User not found', 404));

  res.status(200).json(user);
});

// @desc  Delete user
// @route Delete /api/users/:id
// @access Private/Admin
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found', 404));

  if (user.role === 'admin')
    return next(new AppError('Can not delete admin user', 403));

  await User.deleteOne({ _id: user._id });
  res.status(204).json({ message: 'User removed' });
});

// @desc  Update user
// @route PUT /api/users/:id
// @access Private/Admin
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('User not found', 404));

  const { name, email, role } = req.body;
  const updatedUser = await user.updateOne({ name, email, role });

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});
