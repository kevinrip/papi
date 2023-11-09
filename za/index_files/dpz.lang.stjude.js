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
  "stjude.automatically_round_up": function(d) { return "I no longer want to automatically round up my change for St. Jude Children's Research Hospital<sup>®</sup>"; },
  "stjude.automatically_round_up_error": function(d) { return "We’re sorry, we are unable to opt you out at this time. Please try again later."; },
  "stjude.automatically_round_up_good": function(d) { return "You’ve been opted out of always donating your change to St. Jude."; },
  "stjude.give_a_gift": function(d) { return "Give a gift that could last a lifetime. Order now and Donate. Saint Jude Children's Research Hospital."; },
  "stjude.give_to_help_live": function(d) { return "Give to help her live. Order now and Donate. Saint Jude Children's Research Hospital."; },
  "stjude.logo_alt_text": function(d) { return "St. Jude Logo"; },
  "stjude.order_now_and_donate": function(d) { return "Order Now &amp; Donate"; },
  "stjude.roundup_always": function(d) { return "Always round up my order"; },
  "stjude.roundup_be_the_hero": function(d) { return "Be The Hero, Round Up for Change"; },
  "stjude.roundup_cent_donate": function(d) { return "cent donation"; },
  "stjude.roundup_cent_now": function(d) { return "cent now"; },
  "stjude.roundup_cents_now": function(d) { return "cents now"; },
  "stjude.roundup_donate_to_st_jude": function(d) { return "to St. Jude by rounding up your order total to the nearest dollar?"; },
  "stjude.roundup_join_in": function(d) { return "Join in their lifesaving mission: Finding Cures. Saving Children.®"; },
  "stjude.roundup_opt_in_to_automatically_round_up": function(d) { return "Opt in to automatically round up your change on future web orders. You can opt out at any time."; },
  "stjude.roundup_would_you_like_to_donate": function(d) { return "Would you like to donate"; },
  "stjude.roundup_yes_add": function(d) { return "Yes, add"; },
  "stjude.roundup_yes_donate": function(d) { return ""; },
  "stjude.roundup_yes_round_up_today": function(d) { return "Yes, round up today"; },
  "stjude.social_share_headline": function(d) { return "Thank you for your support."; },
  "stjude.social_share_subtext": function(d) { return "Ask others to join the cause by sharing with your friends and family online."; },
  "stjude.thermometer_status_full": function(d) { return "We're " + d.stJudePercentage + "% to our goal of $10 million. 2021 Saint Jude Thanks and Giving&reg; campaign."; },
  "stjude.thermometer_status_left_1": function(d) { return "We're "; },
  "stjude.thermometer_status_left_2": function(d) { return " to our goal of $10 million"; },
  "stjude.thermometer_status_right": function(d) { return "2021 St. Jude <em>Thanks and Giving<sup>&reg;</sup></em> campaign"; },
  "stjude.thermometer_title": function(d) { return "St. Jude National Donation Tracker"; },
  "stjude.thermometer_title_label": function(d) { return "Saint Jude National Donation Tracker"; },
  "stjude.upsell_description_no_coupon": function(d) { return "Would you like to donate to St. Jude?"; },
  "stjude.upsell_description_with_coupon": function(d) { return "You saved " + d.savingsAmount + " today. Would you like to donate to St. Jude?"; },
  "stjude.upsell_error_donation_too_much": function(d) { return "Donations through this form are limited to $99.99 or less. If you would like to donate a greater amount, please visit <a href=\"https://www.stjude.org/donate/tg-dominos.html\" target=\"_blank\">https://www.stjude.org/donate/tg-dominos.html</a> to donate."; },
  "stjude.upsell_error_zero_donation": function(d) { return "Donation must be greater than $0.00"; },
  "stjude.upsell_stjude_benefits": function(d) { return "<h2>At St. Jude, every dollar donated makes an impact. Here is how your donation could help the hospital and its patients:</h2><p><strong>$1</strong> donation could help St. Jude provide infant diapers or pediatric isolation gowns</p><p><strong>$2</strong> donation could help St. Jude provide bandages or IV bags</p><p><strong>$5</strong> donation could help St. Jude provide pediatric isolation masks or thermometers</p><p><strong>$10</strong> donation could help St. Jude provide medical teaching dolls or new toys for hospital play areas</p>"; },
  "stjude.upsell_stjude_operating_cost": function(d) { return "<strong>At St. Jude, every dollar donated makes an impact. The daily operating cost for St. Jude is $2 million, which is primarily covered by individual contributors. Please donate to help St. Jude focus on what matters most – saving children regardless of their financial situation.</strong>"; },
  "stjude.upsell_title": function(d) { return "Donation For St. Jude Children's Research Hospital<sup>&reg;</sup>"; }
}
}
);
