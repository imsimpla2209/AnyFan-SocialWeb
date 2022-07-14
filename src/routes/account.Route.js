var express = require('express');
var router = express.Router();

const accountController = require('../app/controllers/accountController');

router.post('/signup', accountController.signUp);

router.post('/signin', accountController.signIn);

router.get('/updateProfile', accountController.updateProfile);

router.get('/signup', accountController.sign);

router.get('/signin', accountController.sign);

module.exports = router;