var DishesController = function () {
    this.dishes = [
        {
            type        : "food",
            name        : "Pad Thai",
            price       : 7.25,
            description : "Thai rice noodles stir fried in a special thai sauce with egg, tofu, bean sprouts, green onions, and chopped peanuts, then garnished with bean sprouts and red cabbage.",
            favorited   : true,
            likeRank    : 2
        },
        {
            type        : "food",
            name        : "Singapore Rice Noodle",
            price       : 7.25,
            description : "Vermicelli rice noodles stir fried in light curry with shrimp, chicken, bean sprouts, onion and eggs.",
            favorited   : true,
            likeRank    : 1
        },
        {
            type        : "food",
            name        : "Beef Chow Fun",
            price       : 7.25,
            description : "Fresh wide rice noodles, bean sprouts, green onions, stir fried in specia sauce handed down from ma ma's recipes.",
            favorited   : false,
            likeRank    : 3
        },
        {
            type        : "food",
            name        : "Traditional Fried Rice",
            price       : 6.50,
            description : "Seasoned rice, green peas, carrot, onion, egg, your choice of meats.",
            favorited   : false,
            likeRank    : 4
        }, 
        {
            type        : "drink",
            name        : "Fresh Mango Bubble Tea",
            price       : 7.25,
            description : "Milk Tea with Bubbles made with Fresh Mango",
            favorited   : true,
            likeRank    : 0
        }
    ];
    this.selected = this.dishes[0].name;
    this.name = "Lulu's Noodle House";
};    

angular.module('top5', ['ngAnimate'])
       .controller('DishesController', DishesController);
