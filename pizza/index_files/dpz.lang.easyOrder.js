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
  "easyOrder.congratulations": function(d) { return "Congratulations!"; },
  "easyOrder.continue": function(d) { return "Continue"; },
  "easyOrder.continue_easy_order": function(d) { return "Continue to save easy order"; },
  "easyOrder.create_easy_order": function(d) { return ""; },
  "easyOrder.default_easy_order_nickname": function(d) { return "My Favourite"; },
  "easyOrder.edit_easy_order": function(d) { return "Edit Easy Order"; },
  "easyOrder.go_to_dominos_anyware": function(d) { return "Go to <a href=\"https://anyware.dominos.ca/\" target=\"_blank\">Domino's AnyWare</a> to see all the amazing ways you can place your Easy Order."; },
  "easyOrder.got_it_thanks": function(d) { return "Got it. Thanks!"; },
  "easyOrder.save_easy_order": function(d) { return "Save Your Easy Order"; },
  "easyOrder.you_easy_order_is_saved": function(d) { return "Your Easy Order is saved!"; },
  "easyOrder.your_mobile_number_is_signed_up_for": function(d) { return "Your mobile number is signed up for these ordering channel(s):"; }
}
}
);
