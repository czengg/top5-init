var DishesController = function ($http) {
    this.restaurant = {};
    var self = this;

    this.favoriteToggle = function(restaurant, dish) {
        dish.favorited = !dish.favorited;
        var favoriteUrl = 'http://localhost:3000/updatefavorite/' + restaurant.id + '/' + dish.id;
        $http.get(favoriteUrl).success(function(data) {
            console.log(data);
        });
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            self.long = Math.floor(position.coords.longitude);
            self.lat = Math.floor(position.coords.latitude);
            var geoUrl = 'http://localhost:3000/getrestaurant/' + self.long + '/' + self.lat;
            $http.get(geoUrl).success(function(data) {
                console.log(data);
                self.restaurant = data
            });
        });
    }
};    

var controllerCall = angular.module('top5', ['ngAnimate'])
       .controller('DishesController', DishesController);
