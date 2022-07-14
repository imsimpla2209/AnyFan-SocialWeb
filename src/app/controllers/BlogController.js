const Blog = require('../models/Blog');
const { mongooseToObject } = require('../../util/mongoose');

class BlogController {

    // [GET] /blog/:slug
    async show(req, res, next) {
        Blog.findOne({ slug: req.params.slug })
            .then(blog =>
                res.render('blog/show', { blog: mongooseToObject(blog) })
            )
            .catch(next)
    }

}

module.exports = new BlogController;