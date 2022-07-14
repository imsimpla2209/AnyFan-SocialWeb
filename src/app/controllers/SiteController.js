const Blog = require('../models/Blog');
const User = require('../models/User');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {

    // [GET] /
    index(req, res, next) {
        Blog.find({})
            .then(Blogs => {
                res.render('home', {
                    Blogs: multipleMongooseToObject(Blogs)
                });
            })
            .catch(next);
    }


    // [GET] /search
    show(req, res) {
        res.send('Detail');
    }

    // [GET] /logout
    logout(req, res) {
        res.redirect('/account/signin');
    }

    // [POST] /getuser
    getUser(request, result) {
        var accessToken = request.fields.accessToken;
        User.findOne({
            "accessToken": accessToken
        }, function(error, user) {
            if (user == null) {
                result.json({
                    "status": "error",
                    "message": "User has been logged out. Please login again."
                });
            } else {
                result.json({
                    "status": "success",
                    "message": "Record has been fetched.",
                    "data": user
                });
            }
        });
    }
}

module.exports = new SiteController;