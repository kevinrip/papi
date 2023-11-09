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
  "groupOrdering.0_large_pizzas": function(d) { return "= </p><div class=\"fl\"><span class=\"js-numberOfPizzas numberOfPizzas\">0</span></div><p class=\"fl\"> Large <span class=\"pizzaCalcIcon\">Pizzas</span>"; },
  "groupOrdering.and_see_your_discount_grow": function(d) { return "and see your discount grow in the dashboard below."; },
  "groupOrdering.back": function(d) { return "back..."; },
  "groupOrdering.build_your_own_pizza": function(d) { return "Build Your Own Pizza"; },
  "groupOrdering.calculate": function(d) { return "Calculate"; },
  "groupOrdering.checkout": function(d) { return "Checkout"; },
  "groupOrdering.current_discount_level": function(d) { return "Current discount level"; },
  "groupOrdering.current_discount_level_0_pizzas_0_percent_off_each": function(d) { return ""; },
  "groupOrdering.custom_coupon_info": function(d) { return ""; },
  "groupOrdering.discount": function(d) { return "discount"; },
  "groupOrdering.dominos_group_ordering": function(d) { return "Domino's Group Ordering"; },
  "groupOrdering.dont_see_what_youre_looking": function(d) { return "Don't see what you're looking for? You can build any pizza you want and it will still apply to your Group Order discount."; },
  "groupOrdering.for_0_people_at_0": function(d) { return "For <span class=\"js-numberOfPeople\">0</span> people at <span class=\"js-slicesPerPerson\">0</span> slices per person"; },
  "groupOrdering.formula_is_of_people_multiplied": function(d) { return "Formula is: " + "#" + " of People multiplied by " + "#" + " of Slices Per Person, then divided by 8 Slices Per Large Pizza."; },
  "groupOrdering.get_started": function(d) { return "Get Started"; },
  "groupOrdering.if_equation_doesnt_come_out": function(d) { return "If equation doesn't come out to exact, Pizza Total is rounded up to the next full pizza."; },
  "groupOrdering.if_the_item_you_love": function(d) { return "If the item you love isn't here, check out our <a href=\"" + "#" + "\">Full Menu</a> and add any item you want."; },
  "groupOrdering.if_you_dont_see_the": function(d) { return "If you don't see the pizza you like, click Build Your Own, or explore the rest of the site. Don't worry, the discount will apply to every pizza you add to your cart."; },
  "groupOrdering.if_you_wish_to_see": function(d) { return "If you wish to see all available discounts, check out our <a href=\"" + d.ctx + "/pages/order/" + "#" + "!/section/Coupons/category/All/\">coupons section.</a>"; },
  "groupOrdering.just_type_in_how_many": function(d) { return "Just type in how many people are in your group and how many slices you'd like each person to have, and hit OK, and we'll estimate how many large pizzas you'll need."; },
  "groupOrdering.level": function(d) { return "level"; },
  "groupOrdering.next": function(d) { return "next"; },
  "groupOrdering.next_discount_level_0_pizzas_0_percent_off_each": function(d) { return "<span>next</span> discount: level <span class=\"js-nextDiscountLevel\">0</span>, <span class=\"js-nextPercentOff\">0</span>% off each"; },
  "groupOrdering.next_step": function(d) { return "next step..."; },
  "groupOrdering.no_coupon_available": function(d) { return "Group Ordering is not available for your current service method. Please switch service method and try again"; },
  "groupOrdering.no_of_people": function(d) { return "No. of <span class=\"pizzaCalcIcon\">people</span>"; },
  "groupOrdering.not_sure_how_many_to": function(d) { return "Not sure how many to order?"; },
  "groupOrdering.numberofpizzas_pizzas_percentoff_off": function(d) { return d.numberOfPizzas + " Pizzas = " + d.percentOff + "% Off"; },
  "groupOrdering.off_each": function(d) { return "off each"; },
  "groupOrdering.ok": function(d) { return "ok"; },
  "groupOrdering.order": function(d) { return "Order"; },
  "groupOrdering.order_at_least": function(d) { return "Order at least " + d.pizzaLevel + " Pizzas and get them all for " + d.percentLevel + "% off!"; },
  "groupOrdering.percent_level": function(d) { return d.percentLevel + "% off all pizzas"; },
  "groupOrdering.pizza_discount": function(d) { return "Pizza Discount"; },
  "groupOrdering.pizza_math_calculator": function(d) { return "Pizza Math Calculator"; },
  "groupOrdering.recalculate": function(d) { return "Recalculate"; },
  "groupOrdering.recommendation_is_based_on_large": function(d) { return "Recommendation is based on large pizzas, which have 8 slices."; },
  "groupOrdering.return_to": function(d) { return "return to"; },
  "groupOrdering.sides_and_drinks": function(d) { return "Sides & Drinks"; },
  "groupOrdering.slices_per_person": function(d) { return "Slices per <span class=\"pizzaCalcIcon\">person</span>"; },
  "groupOrdering.start_adding_pizzas_to_your": function(d) { return "Start adding pizzas to your cart and the discount dashboard will appear."; },
  "groupOrdering.start_ordering_pizzas": function(d) { return "Start Ordering Pizzas"; },
  "groupOrdering.start_ordering_sides": function(d) { return "Start Ordering Sides"; },
  "groupOrdering.starting_a_group_order_will": function(d) { return "Starting a Group Order will replace the coupon already on your order."; },
  "groupOrdering.step1coupons": function(d) { return "The more pizzas you order the more you save"; },
  "groupOrdering.step1nocoupons": function(d) { return "It's never been easier to order for everyone"; },
  "groupOrdering.step2": function(d) { return "Make sure all your bases are covered"; },
  "groupOrdering.the_more_pizzas_you_order": function(d) { return "The More Pizzas You Order, The More You Save."; },
  "groupOrdering.this_coupon_will_replace_one": function(d) { return "This coupon cannot be combined with one or more of the coupons currently in your order. If you wish to proceed, this coupon will replace one or more of the existing coupons in your cart."; },
  "groupOrdering.total_pizzas": function(d) { return "Total Pizzas"; },
  "groupOrdering.use_our_pizza_math_calculator": function(d) { return "Use our Pizza Math Calculator."; },
  "groupOrdering.you_can_edit_items_by": function(d) { return "You can edit items by clicking on them in the \"My Order\" section on the right."; },
  "groupOrdering.you_need_0_large_pizzas": function(d) { return "You need <span class=\"js-pizzasNeeded\">0</span> large pizzas"; },
  "groupOrdering.you_will_need": function(d) { return "You will need...<a class=\"hint helpIcon helpIconReverse noText js-pizzaCalcHelp fr\" href=\"" + "#" + "\">?</a>"; }
}
}
);
