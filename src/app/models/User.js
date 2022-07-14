const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    gender: { type: 'string', default: '', },
    image: { type: 'string', default: '', },
    coverimage: { type: 'string', default: '', },
    dob: { type: 'string', default: '', },
    country: { type: 'string', default: '', },
    friends: { type: 'array', default: [], },
    groups: { type: 'array', default: [], },
    posts: { type: 'array', default: [], },
    accessToken: { type: 'string', default: '', },

}, {
    timestamps: true,
});

module.exports = mongoose.model('users', User);