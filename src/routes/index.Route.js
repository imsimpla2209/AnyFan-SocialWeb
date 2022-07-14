const newsRouter = require('./news.Route');
const siteRouter = require('./site.Route');
const blogsRouter = require('./blog.Route');
const accountsRouter = require('./account.Route');


var route = (app) => {

    app.use('/news', newsRouter);
    app.use('/blogs', blogsRouter);
    app.use('/', siteRouter);
    app.use('/account', accountsRouter);
}

module.exports = route;