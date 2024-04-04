define([], function anonymous(
) {
var pluralFuncs = {
  en: function(n, ord) {
    var s = String(n).split('.'), v0 = !s[1], t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
    if (ord) return (n10 == 1 && n100 != 11) ? 'one'
        : (n10 == 2 && n100 != 12) ? 'two'
        : (n10 == 3 && n100 != 13) ? 'few'
        : 'other';
    return (n == 1 && v0) ? 'one' : 'other';
  }
};
var fmt = {};
var number = function(value, offset) {
  if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
  return value - (offset || 0);
};
var plural = function(value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key]();
  return data.other();
};
var select = function(value, data) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  return data.other()
};

return {
  "menu.available_options": function(d) { return "Available Options"; },
  "menu.breads_alt": function(d) { return "Breads"; },
  "menu.breads_and_oven_baked_dips_alt": function(d) { return "Breads and Oven-Baked Dips"; },
  "menu.breads_and_oven_baked_dips_title": function(d) { return "Breads & Oven-Baked Dips"; },
  "menu.breads_and_sides_alt": function(d) { return "Breads and sides"; },
  "menu.breads_and_sides_title": function(d) { return "Breads & Sides"; },
  "menu.breads_heading": function(d) { return "Domino's Breads & Oven-Baked Dips"; },
  "menu.breads_subheading": function(d) { return "<strong>Order bread</strong> from Domino's selection of delicious twists and <strong>stuffed cheesy bread</strong>, and finish with oven-<strong>baked dips</strong>!"; },
  "menu.breads_title": function(d) { return "Breads"; },
  "menu.build_your_own_pizza_alt": function(d) { return "Build Your Own Pizza"; },
  "menu.build_your_own_pizza_title": function(d) { return "Build Your Own Pizza"; },
  "menu.chicken_alt": function(d) { return "Chicken"; },
  "menu.chicken_heading": function(d) { return "Domino's Chicken & Wings"; },
  "menu.chicken_subheading": function(d) { return "We've got <strong>wing</strong> lovers covered with our selection of tasty <strong>hot wings</strong> and flavorful <strong>boneless chicken</strong>."; },
  "menu.chicken_title": function(d) { return "Chicken"; },
  "menu.click_the_product_to_order_online": function(d) { return "Click the product to order online"; },
  "menu.default_heading": function(d) { return "Domino's National Menu"; },
  "menu.desserts_alt": function(d) { return "Desserts"; },
  "menu.desserts_heading": function(d) { return "Domino's Desserts"; },
  "menu.desserts_subheading": function(d) { return "We've got your sweet tooth covered - Domino's has a delicious lineup of <strong>desserts for delivery</strong> or carryout."; },
  "menu.desserts_title": function(d) { return "Desserts"; },
  "menu.drinks_alt": function(d) { return "Drinks"; },
  "menu.drinks_heading": function(d) { return "Domino's Drinks & Beverages"; },
  "menu.drinks_subheading": function(d) { return "Complete your order with <strong>drinks for delivery</strong> or carryout, including your favorite soda or bottled water."; },
  "menu.drinks_title": function(d) { return "Drinks"; },
  "menu.extras_alt": function(d) { return "Extras"; },
  "menu.extras_heading": function(d) { return "Domino's Sauce & Dressing"; },
  "menu.extras_subheading": function(d) { return "Complete your order with our famous <strong>dipping sauces</strong>! From Hot Buffalo, to Sweet Mango Habanero, to <strong>Garlic Dipping Sauce</strong>, we've got the perfect flavor for everyone."; },
  "menu.extras_title": function(d) { return "Extras"; },
  "menu.loaded_tots_alt": function(d) { return "Loaded Tots"; },
  "menu.loaded_tots_description": function(d) { return "Loaded Tots"; },
  "menu.loaded_tots_heading": function(d) { return "Domino's Loaded Tots"; },
  "menu.loaded_tots_subheading": function(d) { return "Looking for <strong>loaded tots near you</strong>? Check out <strong>Domino's Loaded Tots</strong>, from Philly Cheese Steak to Melty 3-Cheese tots, there are tasty tots for everyone."; },
  "menu.loaded_tots_title": function(d) { return "Loaded Tots"; },
  "menu.meats": function(d) { return "Meats"; },
  "menu.meats_meatcount": function(d) { return "Meats (" + d.meatCount + ")"; },
  "menu.non_meats": function(d) { return "Non-Meats"; },
  "menu.non_meats_nonmeatcount": function(d) { return "Non-Meats (" + d.nonMeatCount + ")"; },
  "menu.pasta_alt": function(d) { return "Pasta"; },
  "menu.pasta_heading": function(d) { return "Domino's Pastas"; },
  "menu.pasta_subheading": function(d) { return "Dinner is easy with an order of our classic <strong>pasta</strong>, available <strong>for delivery</strong> or carryout. Feeling creative? Domino's also offers a <strong>Build Your Own Pasta</strong> option."; },
  "menu.pasta_title": function(d) { return "Pasta"; },
  "menu.pizza_alt": function(d) { return "Pizza"; },
  "menu.pizza_crusts": function(d) { return "Pizza Crusts"; },
  "menu.pizza_crusts_crustcount": function(d) { return "Pizza Crusts (" + d.crustCount + ")"; },
  "menu.pizza_heading": function(d) { return "Domino's Pizza"; },
  "menu.pizza_sizes": function(d) { return "Pizza Sizes"; },
  "menu.pizza_sizes_sizecount": function(d) { return "Pizza Sizes (" + d.sizeCount + ")"; },
  "menu.pizza_subheading": function(d) { return "<strong>Build your own pizza</strong> at Domino's! Start with our signature crust and finish with all your favorite <strong>pizza toppings</strong>."; },
  "menu.pizza_title": function(d) { return "Pizza"; },
  "menu.pricing_available_when_ordering": function(d) { return "Pricing available when ordering"; },
  "menu.salads_alt": function(d) { return "Salads"; },
  "menu.salads_heading": function(d) { return "Domino's Salads"; },
  "menu.salads_subheading": function(d) { return "Good news for those who love greens! Domino's has two delicious <strong>salads for delivery</strong> or carryout."; },
  "menu.salads_title": function(d) { return "Salads"; },
  "menu.sandwiches_alt": function(d) { return "Sandwiches"; },
  "menu.sandwiches_heading": function(d) { return "Domino's Sandwiches"; },
  "menu.sandwiches_subheading": function(d) { return "Looking for the <strong>best sandwiches near you</strong>? You're in luck - Domino's pizza ovens bake some of the tastiest <strong>toasted sandwiches</strong> on the planet."; },
  "menu.sandwiches_title": function(d) { return "Sandwiches"; },
  "menu.sauces": function(d) { return "Sauces"; },
  "menu.sauces_saucecount": function(d) { return "Sauces (" + d.sauceCount + ")"; },
  "menu.see_all": function(d) { return "See All"; },
  "menu.sides": function(d) { return "Sides"; },
  "menu.sides_sidecount": function(d) { return "Sides (" + d.sideCount + ")"; },
  "menu.smallie_alt": function(d) { return "Smallie"; },
  "menu.specialty_pizza_heading": function(d) { return "Domino's Specialty Pizza"; },
  "menu.specialty_pizza_subheading": function(d) { return "<strong>Pizza</strong> is the name of our game, and <strong>Specialty Pizzas</strong> are our most valuable players. From our <strong>Philly Cheese Steak pizza</strong>, to the Pacific <strong>Veggie pizza</strong>, there is a <strong>gourmet pizza</strong> for everyone!"; },
  "menu.specialty_pizzas_alt": function(d) { return "Specialty Pizzas"; },
  "menu.specialty_pizzas_title": function(d) { return "Specialty Pizzas"; },
  "menu.starting_at": function(d) { return "Starting @"; },
  "menu.the_prices_shown_are_for_the_small_size": function(d) { return ""; },
  "menu.view_all_heading": function(d) { return "Domino's Menu"; },
  "menu.view_all_subheading": function(d) { return "Discover everything on the Domino's lunch and <strong>dinner menu</strong>. Explore our pizza, pasta, sandwiches & more for carryout or <strong>food delivery near you.</strong>"; }
}
}
);
