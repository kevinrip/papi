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
  "coupons.coupon_code_instruction_CA": function(d) { return "Please enter the code exactly as shown, including the hyphen:"; },
  "coupons.coupon_removed": function(d) { return "Coupon Removed"; },
  "coupons.valid_at_time": function(d) { return "* Valid after " + d.effectiveAt; },
  "coupons.valid_at_until_time": function(d) { return "* Valid at " + d.effectiveAt + " until " + d.expiresAt; },
  "coupons.valid_from_date": function(d) { return "* Valid from " + d.effectiveOn; },
  "coupons.valid_from_to_date": function(d) { return "* Valid from " + d.effectiveOn + " to " + d.expiresOn; },
  "coupons.valid_on_days": function(d) { return "* Valid on " + d.days + " only"; },
  "coupons.valid_until_date": function(d) { return "* Valid until " + d.expiresOn; },
  "coupons.valid_until_time": function(d) { return "* Valid before " + d.expiresAt; }
}
}
);
