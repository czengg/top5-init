
var http     = require('http'),
    path     = require('path'),
    fs       = require('fs'),
    url      = require('url'),
    mongo    = require('mongodb'),
    mongoose = require('mongoose'),
    express  = require('express'),
    bodyParser = require('body-parser');


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


// New mongoose schema to create our
var Schema = mongoose.Schema;
var Collection = mongoose.Collection;

var Dish = new Schema({
    id          : { type: Number , required: true },
    name        : { type: String , required: true },
    type        : { type: String , required: true },
    description : { type: String , required: true },
    favorited   : { type: Boolean, required: true },
    likes       : { type: Number , required: true },
    restaurant  : { type: Number , required: true } 
});
var DishModel = db.model('Dish', Dish);

var Restaurant = new Schema({
    name     : { type: String, required: true },
    lat      : { type: Number, required: true },
    lon      : { type: Number, required: true },
    dish_ids : { type: Array , required: false }
});
var RestaurantModel = db.model('Restaurant', Restaurant);

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

// get all dishes for restaurant given longitude and latitude
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

router.get('/test', function (req, res) {
    res.sendFile('test.html',{ root: 'public/www' });
});

router.post('/test', function(req, res) {
    console.log(req.body);
    res.sendFile('test.html',{ root: 'public/www' });
    // RestaurantModel.insert({
    //     name : req.body.restaurant.name,
    //     long : parseInt(req.body.restaurant.long),
    //     lat  : parseInt(req.body.restaurant.lat),
    // })
    // for (var d in req.body.dishes) {
    //     DishModel.insert({
    //         name        : d.name,
    //         type        : d.type,
    //         description : d.description,
    //         favorited   : 'false',
    //         likes       : d.likes,
    //         restaurant  :  d.restaurant
    //     })
    // }
    // res.send(JSON.stringify(rest));
    

});



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

});

app.use('/', router);








http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});