const express = require('express');
const userController = require('./../Controller/UserController');

const router = express.Router();

router
  .route('/')
  .post(userController.createUser)
  .get(userController.getAllUser);

router
  .route('/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
