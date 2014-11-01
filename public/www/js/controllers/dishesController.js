var DishesController = function ($http, $scope) {

    this.favoriteToggle = function(restaurant, dish) {
        dish.favorited = !dish.favorited;
        var counter;
        var f;
        if (counter !== undefined) {
            clearTimeout(counter);
        }
        counter = setTimeout(function() {
            if (dish.favorited) {
                f = 1;
            } else {
                f = 0;
            }
            var favoriteUrl = 'http://localhost:3000/updatefavorite/' + restaurant.id + '/' + dish.id + '/' + f;
            $http.get(favoriteUrl).success(function(data) {
                console.log(data);
            });
        }, 50);  
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            self.long = Math.floor(position.coords.longitude);
            self.lat = Math.floor(position.coords.latitude);
            var geoUrl = 'http://localhost:3000/getrestaurant/' + self.long + '/' + self.lat;
            $http.get(geoUrl).success(function(data) {
                console.log(data);
                $scope.restaurant = data;
                console.log($scope.restaurant);
            });
        });
    }
};    

var controllerCall = angular.module('top5', ['ngAnimate'])
       .controller('DishesController', DishesController);
