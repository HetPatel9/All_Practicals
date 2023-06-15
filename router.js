const express = require('express');
const viewController = require('./Controller/viewController');
const authController = require('./Controller/authController');

const router = express.Router();

router.route('/').get(viewController.homepage);
router.route('/login').post(authController.login).get(viewController.loginPage);
router
  .route('/signup')
  .post(authController.signup)
  .get(viewController.signupPage);
router.route('/logout').get(authController.logout);
router
  .route('/welcome')
  .get(authController.protect, viewController.welcomePage);
// app.get('/logout', authController.logout);
// app.post('/signup', authController.signup);
// app.post('/login', authController.login);

// app.get('/login', viewController.loginPage);
// app.get('/signup', viewController.signupPage);
// app.get('/welcome', authController.protect, viewController.welcomePage);

module.exports = router;
