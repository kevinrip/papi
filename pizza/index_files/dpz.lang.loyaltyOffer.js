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
  "loyaltyOffer.banner_title": function(d) { return "Create a pizza profile below to join"; },
  "loyaltyOffer.button_close": function(d) { return "Later"; },
  "loyaltyOffer.button_create_profile": function(d) { return "Create my profile and join"; },
  "loyaltyOffer.button_order": function(d) { return "Order now"; },
  "loyaltyOffer.confirmation_popup_banner_title": function(d) { return "Welcome to"; },
  "loyaltyOffer.confirmation_popup_no_offer_body_1": function(d) { return "Order now to start earning points toward"; },
  "loyaltyOffer.confirmation_popup_no_offer_body_2": function(d) { return "!"; },
  "loyaltyOffer.confirmation_popup_no_offer_title": function(d) { return "Your profile has successfully been created"; },
  "loyaltyOffer.confirmation_popup_offer_body_1": function(d) { return "Order now and automatically apply your"; },
  "loyaltyOffer.confirmation_popup_offer_body_2": function(d) { return "Or come back later and use the coupon code sent to your email."; },
  "loyaltyOffer.confirmation_popup_offer_title": function(d) { return "Off coupon"; },
  "loyaltyOffer.disclaimer_1": function(d) { return "By enrolling, you agree to comply with the "; },
  "loyaltyOffer.disclaimer_2": function(d) { return " of Piece of the Pie Rewards®, as well as our general "; },
  "loyaltyOffer.disclaimer_3": function(d) { return " and that you are at least 14 years old."; },
  "loyaltyOffer.disclaimer_4": function(d) { return "*Only one order per calendar day of $10 or more (excluding tip & donations) can earn points."; },
  "loyaltyOffer.disclaimer_5": function(d) { return "You must join Piece of the Pie Rewards® with this email address now through 10/06/19 to receive discount offer. Offer will be available and sent to your email after a Pizza Profile is created and you join Piece of the Pie Rewards®. Offer valid for one-time use now through 11/3/19 and only applies to menu-priced items ordered online. Prices, participation, delivery area and charges may vary. Limit one offer per customer."; },
  "loyaltyOffer.disclaimer_profile_1": function(d) { return "By creating a profile you agree to our "; },
  "loyaltyOffer.disclaimer_profile_2": function(d) { return " and that you are at least 14 years old."; },
  "loyaltyOffer.disclaimer_t2e": function(d) { return "You must join Piece of the Pie Rewards® now through 11/24/2019 to receive discount offer. Offer will be available and sent to your email after a Pizza Profile is created and you join Piece of the Pie Rewards®. Offer valid for one-time use now through 12/22/2019 and only applies to menu-priced items ordered online AT SELECT STORES. Prices, participation, delivery area and charges may vary. Limit one offer per customer."; },
  "loyaltyOffer.disclaimer_terms_and_conditions": function(d) { return "Terms & Conditions"; },
  "loyaltyOffer.disclaimer_terms_of_use": function(d) { return "Terms of Use"; },
  "loyaltyOffer.enroll_in_piece_of_the_pie": function(d) { return "Enroll in Piece of the Pie Rewards®"; },
  "loyaltyOffer.enroll_in_piece_of_the_pie_description_1": function(d) { return "By clicking this, I'm selecting to enroll in Domino's Piece of the Pie Rewards and will agree to comply with the "; },
  "loyaltyOffer.enroll_in_piece_of_the_pie_description_2": function(d) { return " of the program."; },
  "loyaltyOffer.feature_1_title": function(d) { return "Free Pizza"; },
  "loyaltyOffer.feature_2_body_1": function(d) { return "Access to order history"; },
  "loyaltyOffer.feature_2_body_2": function(d) { return "and saved info."; },
  "loyaltyOffer.feature_2_title": function(d) { return "Faster Checkout"; },
  "loyaltyOffer.feature_3_body_1": function(d) { return "Member-only"; },
  "loyaltyOffer.feature_3_body_2": function(d) { return "promotions and offers."; },
  "loyaltyOffer.feature_3_title": function(d) { return "Exclusive Deals"; },
  "loyaltyOffer.form_email": function(d) { return "Email Address:"; },
  "loyaltyOffer.form_email_annotation": function(d) { return "Please enter the email address associated with where you received this offer."; },
  "loyaltyOffer.form_email_confirm": function(d) { return "Confirm Email Address:"; },
  "loyaltyOffer.form_email_list_signup": function(d) { return "<span class=\"dominosColor2 yes\">Yes!</span> I would like to receive <strong>exclusive</strong><span>&nbsp;</span> e-mail coupons from Domino's Pizza"; },
  "loyaltyOffer.form_enroll_help_button": function(d) { return "Help with Piece of the Pie Rewards&reg;"; },
  "loyaltyOffer.form_error_max_length": function(d) { return "Please enter fewer characters."; },
  "loyaltyOffer.form_error_mismatch": function(d) { return "Please enter the same value again."; },
  "loyaltyOffer.form_error_required": function(d) { return "This field is required."; },
  "loyaltyOffer.form_error_valid_email": function(d) { return "Please enter a valid email address."; },
  "loyaltyOffer.form_error_valid_password": function(d) { return "Please enter at least 8 characters."; },
  "loyaltyOffer.form_error_valid_phone": function(d) { return "Please enter a valid phone number."; },
  "loyaltyOffer.form_name_first": function(d) { return "First Name:"; },
  "loyaltyOffer.form_name_last": function(d) { return "Last Name:"; },
  "loyaltyOffer.form_password": function(d) { return "Password"; },
  "loyaltyOffer.form_password_confirm": function(d) { return "Confirm Password"; },
  "loyaltyOffer.form_password_notification_1": function(d) { return ""; },
  "loyaltyOffer.form_password_notification_2": function(d) { return ""; },
  "loyaltyOffer.form_phone": function(d) { return "Primary Phone Number:"; },
  "loyaltyOffer.form_phone_ext_label": function(d) { return "<abbr title='Extension'>Ext.</abbr>"; },
  "loyaltyOffer.form_phone_label": function(d) { return "Primary Phone Number"; },
  "loyaltyOffer.form_phone_placeholder": function(d) { return "Phone"; },
  "loyaltyOffer.form_phone_placeholder_ext": function(d) { return "Ext."; },
  "loyaltyOffer.form_required_message": function(d) { return ""; },
  "loyaltyOffer.free_pizza": function(d) { return "Free Pizza"; },
  "loyaltyOffer.offer_expired": function(d) { return "Looks like the offer you’re trying to activate has expired."; },
  "loyaltyOffer.offer_header": function(d) { return "And get"; },
  "loyaltyOffer.offer_percent_off": function(d) { return "Off"; },
  "loyaltyOffer.order": function(d) { return "Order"; },
  "loyaltyOffer.pizza_count": function(d) { return "1"; },
  "loyaltyOffer.pizza_points_free": function(d) { return "60"; },
  "loyaltyOffer.pizza_points_value": function(d) { return "10"; },
  "loyaltyOffer.pts": function(d) { return "pts."; }
}
}
);
