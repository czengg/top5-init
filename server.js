var http    = require('http'),
    path    = require('path'),
    fs      = require('fs'),
    url     = require('url'),
    mongojs = require('mongojs'),
    express = require('express'),
    session = require('express-session'),
    router  = require('router');

var app = express();

//all environments
app.set('port', process.env.PORT || 8080);
app.use(router);
app.use(session({secret:"keyboard cat"}));
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://rocky-earth-8065.herokuapp.com/');
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');

    next();
}

app.get('/', function (req, res) {
    console.log('hello');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});