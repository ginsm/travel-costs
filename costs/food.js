module.exports = (input) => {
    const { people, mealsPerDay, days, costPerMeal } = input;
    return ((mealsPerDay * people) * costPerMeal) * days;
}