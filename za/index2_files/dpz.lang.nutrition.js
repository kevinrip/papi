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
  "nutrition.build_a_pizza": function(d) { return "Build a pizza..."; },
  "nutrition.calories": function(d) { return "Calories"; },
  "nutrition.counting_calories": function(d) { return "Counting Calories?"; },
  "nutrition.crust": function(d) { return "Crust"; },
  "nutrition.favorites": function(d) { return "Favorites"; },
  "nutrition.got_it_thanks": function(d) { return "got it. thanks."; },
  "nutrition.load_up_veggies": function(d) { return "Load up on vegetable toppings as they add minimal calories"; },
  "nutrition.no_nutrition_info": function(d) { return "We're sorry. Nutrition information is temporarily unavailable."; },
  "nutrition.pick_meats": function(d) { return "Pick meats with lower caloric value - Chicken, Ham or Philly Steak"; },
  "nutrition.saturated_fat": function(d) { return "Saturated Fat (g)"; },
  "nutrition.sauce": function(d) { return "Sauce"; },
  "nutrition.serving_size": function(d) { return "Serving Size"; },
  "nutrition.side_salads": function(d) { return "Complete your meals with Salads on the side"; },
  "nutrition.size": function(d) { return "Size"; },
  "nutrition.slice": function(d) { return "1/8 of Pizza"; },
  "nutrition.sodium": function(d) { return "Sodium (mg)"; },
  "nutrition.some_options": function(d) { return "Here are some tips for lighter options:"; },
  "nutrition.speciality_pizzas": function(d) { return "Specialty Pizzas"; },
  "nutrition.total_sugars": function(d) { return "Total Sugars (g)"; },
  "nutrition.view_details": function(d) { return "View Details"; },
  "nutrition.weight": function(d) { return "Weight g (oz)"; }
}
}
);
