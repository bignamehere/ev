// BASE SETUP
//================================

// INIT MODELS
var User = require('./server/models/user');

//load the express package and crate our app
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var config = require('./config/');

var app = express();
app.user = User;
app.config = config;

// APP Config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure app to use CORS requests and allow other domains to access out API
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,\Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// DB connection
var connectDb = function(){
    var options = {server: {socketOptions: {keepAlive:1}}};
    mongoose.connect( config.database, options);
};
connectDb();


// STATIC FRONTEND LOCATION
app.use(express.static(__dirname + config.staticLocation));

// ROUTES
var router = require('./server/router/routes/api.js')(app, express);


app.get('*', function(req, res){
    res.sendFile( path.join(__dirname + config.webStart) );
});


// start the server
app.set('port', config.port);

var server = app.listen(app.get('port'), function(){
    console.log('Express Server Running on port 1337');
});
