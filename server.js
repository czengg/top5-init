<<<<<<< HEAD
var http    = require('http'),
    path    = require('path'),
    fs      = require('fs'),
    url     = require('url'),
    mongojs = require('mongojs'),
    express = require('express');
    jsdom = require("jsdom");
    locu = require("locu");
    vclient = new locu.VenueClient('a6d9c2a756e0ea4fecbece23c4849557cbef7fe5');
=======
var http     = require('http'),
    path     = require('path'),
    fs       = require('fs'),
    url      = require('url'),
    mongoose = require('mongoose'),
    express  = require('express');
>>>>>>> 64f2feecad730094717b76f203d2f74b89ef05b0

var app = express();
var router = express.Router();

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public/www')));

// establish mongo connection
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/data';
var db = mongoose.createConnection(mongoUri);
db.on('error', function(err) {
    console.log('MongoDB connecton error:', err);
});
db.once('open', function() {
    console.log("MongoDB connected");
});

<<<<<<< HEAD
var databaseUrl = "top5db1"; // "username:password@example.com/mydb"
var collections = ["restaurants"]
var db = require("mongojs").connect(databaseUrl, collections);

app.use(function(req,res,next){
    req.db = db;
    next();
});


=======
// New mongoose schema to create our
var Schema = mongoose.Schema;
var Collection = mongoose.Collection;

var Dish = new Schema({
    id          : { type: int    , required: true },
    name        : { type: String , required: true },
    type        : { type: String , required: true },
    description : { type: String , required: true },
    favorited   : { type: boolean, required: true },
    likes       : { type: int    , required: true },
    restaurant  : { type: String , required: true } 
});
var DishModel = db.model('Dish', Dish);

var Restaurant = new Schema({
    name     : { type: String, required: true },
    lat      : { type: float , required: true },
    lon      : { type: float , required: true },
    dish_ids : { type: Array , required: true }
});
var RestaurantModel = db.model('Restaurant', Restaurant);

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

// get all dishes for restaurant given longitude and latitude
>>>>>>> 64f2feecad730094717b76f203d2f74b89ef05b0
router.get('/getrestaurant/:long/:lat', function(req, res) {
   RestaurantModel.findOne({
        long : parseInt(req.params.long),
        lat  : parseInt(req.params.lat)
   }, function(restaurantErr, restaurants) {
         var rest = restaurants[0];
        DishModel.find({
            id : { $in : rest.dish_ids }
        }, function(dishErr, dishes) {
            if (restaurantErr) {
                res.send(JSON.stringify(restaurantErr));
            } else if (dishErr) {
                res.send(JSON.stringify(dishErr));
            } else {
                rest.dishes = dishes;
                rest.selected = dishes[0];
                res.send(JSON.stringify(rest));
            }
        });
    });

});

<<<<<<< HEAD


router.get('/updatefavorite/:restaurant/:dish', function(req, res) {
    res.send(req.params.dish);
=======
router.get('/updatefavorite/:restaurant/:dish/:favorite', function(req, res) {
    DishModel.findOne({
        id: req.params.dish
    }, function(err, dish) {
        if (req.params.dish === 1) {
            dish.favorited = true;
            dish.likes += 1;
        } else {
            dish.favorited = false;
            dish.likes -= 1;
        }
        dish.save(function(err) {
            if (err) {
                res.send(err);
            } else {
                res.send(dish);
            }
        });
    });
>>>>>>> 64f2feecad730094717b76f203d2f74b89ef05b0
});

app.use('/', router);

app.get('/getrestaurant/:long/:lat', function(req, res){

});




http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});