module.exports = (input) => {
    const { mpg, tripMiles, gasPrice } = input;
    return ((tripMiles / mpg) * gasPrice);
};