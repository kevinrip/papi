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
  "meta.are_you_constantly_thinking": function(d) { return "Are you constantly thinking how to find pizza places near me? Do you dream about food delivery near me? Do you find yourself trying to bring up pizza near me in conversations with friends, coworkers, or strangers? Do you wish you could scream from the mountain tops “where can I find pizza delivery near me?” Dreams do come true! Now you can find the closest Domino’s pizza delivery nearby with just a few clicks. Simply type in your address and we’ll magically show you your closest Domino’s."; },
  "meta.are_you_looking_for_coupons": function(d) { return "Are you looking for Domino’s coupons? Choose from the best pizza coupons, promo codes and specials Domino’s has to offer. No matter what food you are craving, we have deals for you. Take advantage of savings on your favorite Domino’s orders. For even more coupons, find your local Domino’s restaurant to see pizza deals near you. Check back frequently to make sure you’re getting the best deal on your next order of pizza, <a href=\"/en/about-pizza/menu/pasta/\">pasta</a>, <a href=\"/en/about-pizza/chicken-wings/\">wings</a>, or <a href=\"/en/about-pizza/menu/salad/\">salad</a>."; },
  "meta.are_you_looking_for_dominos": function(d) { return "Are you looking for pizza delivery? Let Domino’s fill that special place in your heart. It might sound cheesy, but we want to be your favorite <a href=\"/about-pizza/pizzeria/\" class=\"gray-link\">pizzeria</a>. We love to provide our fans with the best <a href=\"/pages/order/coupon" + "#" + "/coupon/national/\" class=\"gray-link\">pizza deals</a> that Domino’s has to offer. Next time you’re thinking of <a href=\"/about-pizza/food-near-me/\" class=\"gray-link\">food places near me</a>, don’t forget about Domino’s. With over 5,000 <a href=\"/pages/order/?locations=1" + "#" + "/locations/\" class=\"gray-link\">pizza places</a> to choose from, you’re only a few clicks away from a delicious pizza."; },
  "meta.browse_coupons_order_dominos_online": function(d) { return "Browse coupons &amp; order Domino's online for delivery or pick up. Menu has specialty pizza, pasta, chicken wings, cheesy bread, sandwiches, desserts, chips &amp;  drinks"; },
  "meta.did_you_know": function(d) { return "When you’ve got pizza on the brain, order online from Domino’s. With over 5,000 Domino’s local restaurants, it is easy to find <a href=\"/en/about-pizza/delivery-near-me/\">pizza delivery near me</a>. All you have to do is select delivery (or carryout) and type in your address or zip code to find the closest Domino’s location to you. We’ll tell you exactly where the stores are and then you can order <a href=\"/en/about-pizza/online-pizza/\">pizza online</a> from our website. Enjoy tasty <a href=\"/en/about-pizza/food-delivery-near-me/\">food delivery near me</a> without having to leave your living room or conference room!"; },
  "meta.dominos_pizza_lets_you_browse": function(d) { return "Domino's Pizza lets you browse coupons and order online - try the all new hand tossed crust, robust sauce and shredded mozzarella cheese."; },
  "meta.dominos_pizza_profile_dominos_dominos": function(d) { return "dominos pizza profile, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, order pizza online, Pizza delivery, track pizza delivery, online pizza delivery, dominos tracker, pizza tracker, pizza delivery tracker, dominos delivery tracker"; },
  "meta.have_you_ever_checked_out": function(d) { return "The Domino’s menu features specialty pizzas, pizzas with <a href=\"/en/about-pizza/crusts/gluten-free/\">gluten free crust</a>, oven-baked <a href=\"/en/about-pizza/menu/sandwiches/\">sandwiches</a>, <a href=\"/en/about-pizza/chicken/boneless-chicken/\">chicken</a>, salads, desserts, drinks, and more. If customization is your style, our pizza menu includes a build your own pizza option that lets you choose from amazing toppings, sauces and cheeses. It will have you thinking about different pizza menu combinations for days. Or, you can keep it simple with a <a href=\"/en/about-pizza/toppings/pepperoni/\">pepperoni pizza</a>. Check out the Domino’s Pizza menu to see all of the amazing options that will take lunch, snack time or dinner to the next level."; },
  "meta.in_less_than_30_seconds": function(d) { return "In less than 30 seconds, order Domino's Pizza online for pick up or delivery with a Domino's Pizza Profile to make it even easier and faster to order pizza online."; },
  "meta.over_5_000_dominos_locations": function(d) { return "Over 5,000 Domino's locations. Automatically find yours for carry out or delivery."; },
  "meta.pizza_dominos_pizza_delivery_pizza": function(d) { return "pizza, domino's, pizza delivery, pizza online, order pizza online, order pizza"; },
  "meta.pizza_pizzas_a_pizza_new": function(d) { return "pizza, pizzas, a pizza, new pizza, new crust, pizza delivery, pizza menu, pizza coupons, order pizza online, dominos, domino's pizza, dominos pizza, domino, dominoes, domin, domi, dominoes pizza, dominos pizza menu, dominos coupons, B.B.Q, bbq, bar b que, bar que, barbecue, barbque, sweet mango habenero, inspired chicken, new chicken, boneless chicken, chicken wings"; },
  "meta.pizza_places_pizza_places_near": function(d) { return "pizza places, pizza places near me, order food online, dominos delivery"; },
  "meta.track_every_step_of_your": function(d) { return "Track every step of your Domino's order as it's delivered."; }
}
}
);
