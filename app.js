var express = require('express');
var router = require('./routes');
var morgan = require('morgan');
var path = require('path')
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


var app = express();
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(router);

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

var server = app.listen(1337);
var io = socketio.listen(server);
