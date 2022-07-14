var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

// router.post('/getUser', siteController.getUser);

router.get('/logout', siteController.logout);

router.get('/:slug', siteController.show);

router.get('/', siteController.index);

module.exports = router;