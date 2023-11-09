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
  "nationalCoupon.coupon_cta": function(d) { return "See local coupons"; },
  "nationalCoupon.ecom69775_find_local_dominos": function(d) { return "Find your local Domino's store to see all of the pizza coupons and deals available in your area."; },
  "nationalCoupon.ecom69775_see_all_coupons": function(d) { return "See all coupons"; },
  "nationalCoupon.header": function(d) { return "Looking for more coupons?"; },
  "nationalCoupon.localHeader": function(d) { return "Domino's Local Coupons"; },
  "nationalCoupon.more_coupon_text": function(d) { return "Find your local Domino’s Pizza restaurant to see your current local pizza coupon promos and deals."; },
  "nationalCoupon.nationalHeader": function(d) { return "Domino's National Coupons"; },
  "nationalCoupon.pageHeader": function(d) { return "Choose from the best Domino’s pizza coupons, promo codes and offers below."; },
  "nationalCoupon.seoFooter": function(d) { return "<p>Find Domino's online pizza coupons here! Don't search for Domino's pizza deals or promo codes when you can always find these latest Domino's national and local online coupons right here. To get the most current pizza deals, use these coupons to order Dominos by phone, online or with our app that's available for desktop, tablet and smartphone (<a href='https://itunes.apple.com/us/app/dominos-pizza-usa/id436491861?mt=8'>iPhone</a> or <a href='https://play.google.com/store/apps/details?id=com.dominospizza&hl=en'>Android</a>). Easiest of all, create a <a href='https://www.dominos.ca/pages/customer/" + "#" + "!/customer/rewards/'>Domino's Pizza Profile</a> and earn rewards towards a free pizza. Please note that these are not printable coupons, so be sure to conveniently order your Domino's pizza online, by phone or with the app. Visit our <a href='https://www.dominos.ca/pages/order/menu" + "#" + "!/menu/category/all/'>pizza menu page</a> and you'll see that Domino's serves delicious pizzas, pasta, bread, sandwiches, specialty chicken, desserts and drinks.</p>"; }
}
}
);
