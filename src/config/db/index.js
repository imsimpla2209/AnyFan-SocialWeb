const mongoose = require('mongoose');

const connect = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/AnyFan_dev');
        console.log('Connected to Mongo')
    } catch (error) {
        console.log('Error connecting to Mongo');
        console.log(error.message);
    }
}

module.exports = { connect };