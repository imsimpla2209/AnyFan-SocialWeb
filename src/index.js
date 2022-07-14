const path = require('path');
const express = require('express');
var formidable = require("express-formidable");
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;


// Using route
const route = require(`./routes/index.Route`);

//middleware setup
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use(formidable());


// Using Model
const mongoDB = require('./config/db/index.js');

const http = require("http").createServer(app);


const fileSystem = require('fs');


const socketIO = require('socket.io')(http);
var socketID = "";
var users = [];

socketIO.on('connection', (socket) => {
    console.log(`User connected`, socket.id);
    socketID = socket.id;
})



// connect DB to Mongo
mongoDB.connect();


// app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));



// View setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


// Template engine setup
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
}));

//Routes init
route(app);

var getPort = port;
//127.0.0.1 - localhost

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${port}`)
})