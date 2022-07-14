const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Blog = new Schema({
    author: { type: 'string' },
    title: { type: String, default: '', maxLength: 255, minLength: 30 },
    body: String,
    date: { type: Date, default: Date.now },
    image: { type: String, default: '', maxLength: 255 }

});

module.exports = mongoose.model('Blogs', Blog);