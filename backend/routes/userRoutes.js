const express = require('express');

const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/signup').post(userController.signupUser);

router.route('/login').post(userController.loginUser);

router.route('/logout').post(userController.logoutUser);

router.route('/').get(userController.getUsers);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/profile')
  .get(userController.getUserProfile)
  .patch(userController.updateUserProfile);

module.exports = router;
