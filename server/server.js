var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var cors        = require('cors');
var morgan      = require('morgan');
var path        = require('path');
var mongoose    = require('mongoose');
var config      = require('./config/database'); // get db config file

// var port 	    = process.env.PORT || 8080;
var port 	    = process.env.PORT || 80;

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use(cors());

// log to console
app.use(morgan('dev'));

//Require User Routes////
require('./app/comments/comments.server.routes')(app);



app.use(express.static(path.join(__dirname, '../public')));


// Start the server
app.listen(port);
console.log('Chase Isley Port: http://localhost:' + port);
