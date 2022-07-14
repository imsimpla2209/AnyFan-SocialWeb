var express = require('express');
var router = express.Router();

const BlogController = require('../app/controllers/BlogController');

router.get('/:slug', BlogController.show);


module.exports = router;