var express = require('express');
var router = require('./routes');
var morgan = require('morgan');
var path = require('path');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
//var socketio = require('socket.io');


var app = express();
app.use(express.static('public'));
// what you call this on will depend on how much of your code you want to be public
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(router);

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

//var io;
var models = require('./models');

models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(1337);
    //io = socketio.listen(server);
})
.catch(console.error);
