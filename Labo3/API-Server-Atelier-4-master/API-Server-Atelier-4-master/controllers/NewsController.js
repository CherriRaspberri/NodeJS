const PostsModel = require('../models/post');
const Repository = require('../models/repository');
module.exports =
    class NewsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new Repository(new PostsModel()));
        }
    }