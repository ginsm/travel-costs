const exists = require('fs').existsSync;

const Logic = {
    getTravelCosts: async (expenses) => {
        // Empty object to populate
        const costs = {};

        Object.keys(expenses).forEach(expense => {
            // Get the expense object and module path
            const input = expenses[expense];
            const handler = `${__dirname}/costs/${expense.toLowerCase()}.js`;

            // Assign a new key with the expense handler's output
            if (exists(handler))
                costs[expense] = require(handler)(input).toFixed(2);
        })

        // Sum all the values in costs to get a total amount
        costs.Total =
            Object.values(costs).reduce((total, current) =>
                (parseFloat(total) + parseFloat(current)).toFixed(2)
            );

        // Return the populated costs
        return costs;
    },

    printCosts: (costs) => {
        // Get the longest string in an array
        const max = (arr) => arr.reduce((a, b) =>
            a.length > b.length && a || b
        );

        // Find out the length of the longest string
        const maxKey = max(Object.keys(costs)).length;

        // Begin printing
        console.log('\nHere are your travel costs:\n');
        Object.entries(costs).forEach(cost => {
            // Amount of space needed to line up values properly
            const spaces = new Array(maxKey - cost[0].length + 3).join(' ');

            // Separate the key and value
            const [key, value] = cost;

            // Create the string to print
            const string = `${key}:${spaces}$${value}`

            // On the last key (total) add a new line; otherwise print string
            console.log(key == 'Total' && `\n${string}\n` || string);
        })
    }
}

module.exports = Logic;