const Logic = {
    getTravelCosts: async (expenses) => {
        const costs = Object.keys(expenses).reduce((obj, expense) => {
          // Get the expense object and module path
          const input = expenses[expense];
          const handler = `${__dirname}/../costs/${expense.toLowerCase()}.js`;
          // Assign a new key with the expense handler's output
          return ({
            ...obj,
            [expense]: require(handler)(input).toFixed(2),
          });
        }, {});

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
        const max = (arr) => arr.reduce((a, b) => a.length > b.length ? a : b);

        // Find out the length of the longest string
        const longestKey = max(Object.keys(costs)).length;

        // Begin printing
        console.log('\nHere are your travel costs:\n');
        Object.entries(costs).forEach(([key, value]) => {
            const spaces = new Array(longestKey - key.length + 3).join(' ');
            const string = `${key}:${spaces}$${value}`
            console.log(key == 'Total' && `\n${string}\n` || string);
        })
    }
}

module.exports = Logic;
