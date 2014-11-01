var DishesController = function ($http) {
    this.here = "hi";
    this.restaurant = {};
    var self = this;
    var url = 'http://localhost:3000/getrestaurant/lulus';        
    $http.get(url).success(function(data) {
        self.restaurant = data
    });
    
    this.favoriteToggle = function(restaurant, dish) {
        dish.favorited = !dish.favorited;
        var favoriteUrl = 'http://localhost:3000/updatefavorite/' + restaurant.id + '/' + dish.id;
        $http.get(favoriteUrl).success(function(data) {
            console.log(data);
        });
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function() {
            self.longitude = position.coords.longitude;
            self.latitude = position.coords.latitude;
        });
    }
        
};    

var controllerCall = angular.module('top5', ['ngAnimate'])
       .controller('DishesController', DishesController);
