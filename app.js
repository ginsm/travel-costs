const exists = require('fs').existsSync;

const App = {
    getTravelCosts: async (obj) => {
        // Set up App object
        const App = {};
        // Run a function for each expense
        Object.keys(obj).forEach(key => {
            // Get the module path and key's object to give the module
            const input = obj[key];
            const module = `${__dirname}/costs/${key.toLowerCase()}.js`;
            // Set up a new key:value pair for the module
            if (exists(module))
                App[key] = require(module)(input).toFixed(2);
        })
        // Sum all the values to get a total amount
        App.Total =
            Object.values(App).reduce((total, current) =>
                (parseFloat(total) + parseFloat(current)).toFixed(2)
            );
        // Return the generated object
        return App
    },

    printCosts: (costs) => {
        // Get the longest string in the array
        const max = (arr) => arr.reduce((a, b) =>
            a.length > b.length && a || b
        );
        // Find out the length of the longest string
        const maxKey = max(Object.keys(costs)).length;
        // Begin printing
        console.log('\nHere are your travel costs:\n')
        Object.entries(costs).forEach(entry => {
            // Amount of space needed to line up values properly
            const spaces = new Array(maxKey - entry[0].length + 3).join(' ')
            // Separate the key values
            const [key, value] = entry
            // Create the string to print
            const string = `${key}:${spaces}$${value}`
            // On the last key (total) add a new line; otherwise print string
            console.log(key == 'Total' && `\n${string}\n` || string);
        })
    }
}

module.exports = App;