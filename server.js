var http    = require('http'),
    path    = require('path'),
    fs      = require('fs'),
    url     = require('url'),
    mongojs = require('mongojs'),
    express = require('express');

var app = express();
var router = express.Router();

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public/www')));


var databaseUrl = "128.237.175.46:27017/top5db1"; // "username:password@example.com/mydb"
var collections = ["restaurants"]
var db = require("mongojs").connect(databaseUrl, collections);

// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

router.get('/getrestaurant/:long/:lat', function(req, res) {
    db.restaurants.find({
        long : parseInt(req.params.long),
        lat  : parseInt(req.params.lat)
    }, function(err, restaurant) {
        if (err) {
            res.send(JSON.stringify(err));
        } else {
            res.send(JSON.stringify(restaurant[0]));
        }
    });
});

router.get('/updatefavorite/:restaurant/:dish', function(req, res) {
    res.send(req.params.dish);
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});