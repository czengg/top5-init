var http    = require('http'),
    path    = require('path'),
    fs      = require('fs'),
    url     = require('url'),
    mongojs = require('mongojs'),
    express = require('express');
    jsdom = require("jsdom");
    locu = require("locu");
    vclient = new locu.VenueClient('a6d9c2a756e0ea4fecbece23c4849557cbef7fe5');

var app = express();
var router = express.Router();

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public/www')));


var databaseUrl = "top5db1"; // "username:password@example.com/mydb"
var collections = ["restaurants"]
var db = require("mongojs").connect(databaseUrl, collections);

app.use(function(req,res,next){
    req.db = db;
    next();
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

app.get('/getrestaurant/:long/:lat', function(req, res){

});




http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});