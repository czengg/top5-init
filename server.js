var http     = require('http'),
    path     = require('path'),
    fs       = require('fs'),
    url      = require('url'),
    mongo    = require('mongodb'),
    mongoose = require('mongoose'),
    express  = require('express'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
var router = express.Router();

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public/www')));
app.use(passport.initialize());
app.use(passport.session());

// establish mongo connection
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/data';
var db = mongoose.createConnection(mongoUri);
db.on('error', function(err) {
    console.log('MongoDB connection error:', err);
});
db.once('open', function() {
    console.log("MongoDB connected");
});

// New mongoose schema to create our
var Schema = mongoose.Schema;
var Collection = mongoose.Collection;

var Dish = new Schema({
    name           : { type: String , required: true },
    type           : { type: String , required: true },
    description    : { type: String , required: true },
    favorited      : { type: Boolean, required: true },
    likes          : { type: Number , required: true },
    restaurant_id  : { type: String , required: true } 
});
var DishModel = db.model('Dish', Dish);

var Restaurant = new Schema({
    name     : { type: String, required: true },
    lat      : { type: Number, required: true },
    lon      : { type: Number, required: true }
});
var RestaurantModel = db.model('Restaurant', Restaurant);

// authentication
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

router.get('/login', function (req, res) {
    res.sendFile('login.html');
})

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

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

router.get('/updatefavorite/:restaurant/:dish/:favorite', function(req, res) {
    DishModel.findOne({
        id: req.params.dish
    }, function(err, dish) {
        if (err) { res.send(err) }
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

router.get('/addrestaurant/:name/:lat/:lon', function(req, res) {
    var restaurant = new RestaurantModel({
        name: req.params.name,
        lat: req.params.lat,
        lon: req.params.lon
    });
    restaurant.save(function(err){
        if (err) { res.send(err) }
        res.send(restaurant);
    });
});

router.post('/adddish', function(req, res) {
    RestaurantModel.findOne({
        name: req.body.restaurant
    }, function (err, restaurant) {
        if (err) { res.send(err) }
        var dish = new DishModel({
            name: req.body.dish.name,
            type: req.body.dish.type,
            description: req.body.dish.description,
            favorited: req.body.dish.favorited,
            likes: req.body.dish.likes,
            restaurant_id: restaurant._id
        });
        dish.save(function(err) {
            if (err) { res.send(err) }
            res.send(dish);
        });
    });
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});