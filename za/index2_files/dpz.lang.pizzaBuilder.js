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
  "pizzaBuilder.all": function(d) { return "Featured"; },
  "pizzaBuilder.alphabetical": function(d) { return "A - Z"; },
  "pizzaBuilder.choose_size_and_crust": function(d) { return "Choose Your Size &amp; Crust"; },
  "pizzaBuilder.ecom73139_alphabetical": function(d) { return ""; },
  "pizzaBuilder.ecom73139_aria_label_alphabetical": function(d) { return ""; },
  "pizzaBuilder.ecom73139_aria_label_extra": function(d) { return ""; },
  "pizzaBuilder.ecom73139_aria_label_featured": function(d) { return ""; },
  "pizzaBuilder.ecom73139_aria_label_light": function(d) { return ""; },
  "pizzaBuilder.ecom73139_aria_label_none": function(d) { return ""; },
  "pizzaBuilder.ecom73139_aria_label_normal": function(d) { return ""; },
  "pizzaBuilder.ecom73139_aria_label_popular": function(d) { return ""; },
  "pizzaBuilder.ecom73139_featured": function(d) { return ""; },
  "pizzaBuilder.ecom73139_no_sauce": function(d) { return ""; },
  "pizzaBuilder.ecom73139_popular": function(d) { return ""; },
  "pizzaBuilder.ecom73139_topping_side_left": function(d) { return ""; },
  "pizzaBuilder.ecom73139_topping_side_right": function(d) { return ""; },
  "pizzaBuilder.ecom73139_topping_side_whole": function(d) { return ""; },
  "pizzaBuilder.featured": function(d) { return "Featured"; },
  "pizzaBuilder.from": function(d) { return "From"; },
  "pizzaBuilder.left": function(d) { return "Left"; },
  "pizzaBuilder.most_popular": function(d) { return ""; },
  "pizzaBuilder.note": function(d) { return ""; },
  "pizzaBuilder.popular": function(d) { return "Most Popular"; },
  "pizzaBuilder.premium_cheese_price_text": function(d) { return "Personal : RM0.50</br>Regular : RM1.00</br>Large : RM2.00</br>Xtra Large : RM3.00"; },
  "pizzaBuilder.recent_pizzas_add_pizza_to_order": function(d) { return "Add pizza to order"; },
  "pizzaBuilder.recent_pizzas_add_recent_pizza": function(d) { return "Add a recently ordered pizza"; },
  "pizzaBuilder.recent_pizzas_begin_from_scratch": function(d) { return "Begin from scratch with a cheese pizza and build your perfect pizza."; },
  "pizzaBuilder.recent_pizzas_see_pizzas": function(d) { return "See Recent Pizzas"; },
  "pizzaBuilder.recent_pizzas_skip_builder": function(d) { return "Skip the pizza builder and add a recently ordered pizza directly to your cart."; },
  "pizzaBuilder.recent_pizzas_start_from_scratch": function(d) { return "Start from scratch"; },
  "pizzaBuilder.remove_both_cheese_and_sauce": function(d) { return "Please confirm you would like to remove both cheese and sauce from this pizza. Thanks!"; },
  "pizzaBuilder.reset_pizza_selection": function(d) { return "Reset selection"; },
  "pizzaBuilder.right": function(d) { return "Right"; },
  "pizzaBuilder.size_10": function(d) { return "10\""; },
  "pizzaBuilder.size_11": function(d) { return ""; },
  "pizzaBuilder.size_115": function(d) { return ""; },
  "pizzaBuilder.size_12": function(d) { return "12\""; },
  "pizzaBuilder.size_13": function(d) { return ""; },
  "pizzaBuilder.size_14": function(d) { return "14\""; },
  "pizzaBuilder.size_16": function(d) { return "16\""; },
  "pizzaBuilder.size_18": function(d) { return ""; },
  "pizzaBuilder.size_30": function(d) { return ""; },
  "pizzaBuilder.size_35": function(d) { return ""; },
  "pizzaBuilder.size_40": function(d) { return ""; },
  "pizzaBuilder.size_6": function(d) { return "6\""; },
  "pizzaBuilder.size_8": function(d) { return "8\""; },
  "pizzaBuilder.size_BRD": function(d) { return "BRD"; },
  "pizzaBuilder.size_BROT": function(d) { return ""; },
  "pizzaBuilder.size_CL": function(d) { return ""; },
  "pizzaBuilder.size_GIG": function(d) { return ""; },
  "pizzaBuilder.size_GR": function(d) { return ""; },
  "pizzaBuilder.size_GRD": function(d) { return ""; },
  "pizzaBuilder.size_LG": function(d) { return ""; },
  "pizzaBuilder.size_LG_specialty": function(d) { return ""; },
  "pizzaBuilder.size_MD": function(d) { return ""; },
  "pizzaBuilder.size_MD_specialty": function(d) { return ""; },
  "pizzaBuilder.size_MED": function(d) { return ""; },
  "pizzaBuilder.size_SM": function(d) { return ""; },
  "pizzaBuilder.size_SM_specialty": function(d) { return ""; },
  "pizzaBuilder.size_XL": function(d) { return ""; },
  "pizzaBuilder.size__30": function(d) { return ""; },
  "pizzaBuilder.size_brot": function(d) { return ""; },
  "pizzaBuilder.size_cl": function(d) { return ""; },
  "pizzaBuilder.size_crust_label": function(d) { return d.sectionSizeName + " (" + d.sizeCode + "&quot;) " + d.flavorName; },
  "pizzaBuilder.size_gig": function(d) { return ""; },
  "pizzaBuilder.size_gr": function(d) { return ""; },
  "pizzaBuilder.size_grd": function(d) { return ""; },
  "pizzaBuilder.size_label_10": function(d) { return "Small"; },
  "pizzaBuilder.size_label_12": function(d) { return "Medium"; },
  "pizzaBuilder.size_label_14": function(d) { return "Large"; },
  "pizzaBuilder.size_label_16": function(d) { return "X-Large"; },
  "pizzaBuilder.size_label_18": function(d) { return ""; },
  "pizzaBuilder.size_label_2SLICES": function(d) { return "2 Slices"; },
  "pizzaBuilder.size_label_30": function(d) { return ""; },
  "pizzaBuilder.size_label_35": function(d) { return ""; },
  "pizzaBuilder.size_label_40": function(d) { return ""; },
  "pizzaBuilder.size_label_6": function(d) { return "Individual"; },
  "pizzaBuilder.size_label_8": function(d) { return "Individual"; },
  "pizzaBuilder.size_label_BRD": function(d) { return "Garlic Bread Pizza"; },
  "pizzaBuilder.size_label_CL": function(d) { return ""; },
  "pizzaBuilder.size_label_GR": function(d) { return ""; },
  "pizzaBuilder.size_label_LG": function(d) { return ""; },
  "pizzaBuilder.size_label_MD": function(d) { return ""; },
  "pizzaBuilder.size_label_XL": function(d) { return ""; },
  "pizzaBuilder.size_label__30": function(d) { return ""; },
  "pizzaBuilder.size_large": function(d) { return ""; },
  "pizzaBuilder.size_lg": function(d) { return ""; },
  "pizzaBuilder.size_ma11": function(d) { return ""; },
  "pizzaBuilder.size_ma14": function(d) { return ""; },
  "pizzaBuilder.size_ma16": function(d) { return ""; },
  "pizzaBuilder.size_md": function(d) { return ""; },
  "pizzaBuilder.size_med": function(d) { return ""; },
  "pizzaBuilder.size_medium": function(d) { return ""; },
  "pizzaBuilder.size_sm": function(d) { return ""; },
  "pizzaBuilder.size_xl": function(d) { return ""; },
  "pizzaBuilder.size_xlarge": function(d) { return ""; },
  "pizzaBuilder.sort_by": function(d) { return "Sort By"; },
  "pizzaBuilder.sort_toppings": function(d) { return "Sort Toppings"; },
  "pizzaBuilder.the_pizza_builder_will_always": function(d) { return ""; },
  "pizzaBuilder.topping_required_C": function(d) { return "Sorry! Cheese cannot be removed from our " + d.crustName + " pizzas due to product quality."; },
  "pizzaBuilder.topping_side_left": function(d) { return "Left"; },
  "pizzaBuilder.topping_side_right": function(d) { return "Right"; },
  "pizzaBuilder.topping_side_whole": function(d) { return "Whole"; },
  "pizzaBuilder.weight_hash_double_description": function(d) { return "Double"; },
  "pizzaBuilder.weight_hash_double_prefix": function(d) { return "Double "; },
  "pizzaBuilder.weight_hash_extra_description": function(d) { return "Extra"; },
  "pizzaBuilder.weight_hash_extra_prefix": function(d) { return "Extra "; },
  "pizzaBuilder.weight_hash_light_description": function(d) { return "Light"; },
  "pizzaBuilder.weight_hash_light_prefix": function(d) { return "Light "; },
  "pizzaBuilder.weight_hash_none_description": function(d) { return "None"; },
  "pizzaBuilder.weight_hash_none_prefix": function(d) { return "No "; },
  "pizzaBuilder.weight_hash_normal_description": function(d) { return "Normal"; },
  "pizzaBuilder.weight_hash_normal_prefix": function(d) { return ""; },
  "pizzaBuilder.weight_hash_triple_description": function(d) { return "Triple"; },
  "pizzaBuilder.weight_hash_triple_prefix": function(d) { return "Triple "; },
  "pizzaBuilder.whole": function(d) { return "Whole"; }
}
}
);
