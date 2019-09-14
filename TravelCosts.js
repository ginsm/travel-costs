const { getTravelCosts, printCosts } = require('./lib/logic');

const expenses = {

    Gas: {
        mpg: 27,
        tripMiles: 3158,
        gasPrice: 2.7
    },

    Food: {
        people: 2,
        mealsPerDay: 3,
        days: 5,
        costPerMeal: 8.99
    },

    Lodging: {
        nights: 4,
        avgCost: 40
    }

}

getTravelCosts(expenses).then(printCosts);