const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('../controllers/authMiddleware');

const router = express.Router();

router.route('/signup').post(userController.signupUser);

router.route('/login').post(userController.loginUser);

router.route('/logout').post(userController.logoutUser);

router.route('/').get(userController.getUsers);

router
  .route('/profile')
  .get(authController.protect, userController.getUserProfile)
  .patch(authController.protect, userController.updateUserProfile);

router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
