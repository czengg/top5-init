var DishesController = function () {
    this.here = "hi";
    this.restaurant = {};
    
    var url = 'http://localhost:8080/getrestaurant/lulus';
    var that = this;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            that.restaurant = xmlhttp.responseText;
        }
    }
    
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    console.log('here');
};    

var controllerCall = angular.module('top5', ['ngAnimate'])
       .controller('DishesController', DishesController);