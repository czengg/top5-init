var DishesController = function ($http) {
    this.here = "hi";
    this.restaurant = {};
    var self = this;
    var url = 'http://localhost:3000/getrestaurant/lulus';        
    $http.get(url).success(function(data) {self.restaurant = data});
};    

var controllerCall = angular.module('top5', ['ngAnimate'])
       .controller('DishesController', DishesController);