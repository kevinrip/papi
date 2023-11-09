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
  "home.add_items_and_checkout": function(d) { return "Add Items & Check Out"; },
  "home.add_items_to_cart": function(d) { return "Add Items To Cart"; },
  "home.add_to_order": function(d) { return "Yes, add to order"; },
  "home.an_easy_order_is_your": function(d) { return "An Easy Order is your favorite food order saved along with how you want to get it and how you want to pay, so you can order faster than ever next time."; },
  "home.average_time": function(d) { return "Current Average Delivery Times"; },
  "home.browse_our_menu": function(d) { return "Browse Our Menu"; },
  "home.click_add_items": function(d) { return "Click \"Add Items\" to browse the menu and build your order!"; },
  "home.click_to_view_any_of": function(d) { return "Click to view any of your recent online orders below so you can easily reorder or save one as your Easy Order."; },
  "home.click_to_view_any_of_reorder": function(d) { return "Click to view any of your recent online orders below so you can easily reorder."; },
  "home.close_details": function(d) { return "Close Details"; },
  "home.coming_soon_alt": function(d) { return ""; },
  "home.contactless_delivery_available": function(d) { return "Zero Contact Delivery now available at checkout"; },
  "home.contactless_delivery_required": function(d) { return "All Deliveries Are Zero Contact."; },
  "home.contactless_delivery_required_cashless": function(d) { return "All Deliveries Are Zero Contact."; },
  "home.cookie_banner": function(d) { return "By continuing to browse this site, you expressly agree to the placement of cookies on your computer that allow us to measure statistic of visits and improve the quality of the content offered. Click <a href=\"" + d.ctx + "/" + "#" + "!/content/cookies/\">here</a> for more information."; },
  "home.disclaimer_handmade_pan_pizza": function(d) { return "Handmade Pan Pizza and gluten free pizza may be subject to an additional charge."; },
  "home.disclaimer_no_registration_or_credit_card": function(d) { return "No registration or credit card required. <br />Place your order online at anytime."; },
  "home.disclaimer_over_number_locations": function(d) { return "Over 590 Locations Coast to Coast"; },
  "home.disclaimer_prices_may_vary": function(d) { return "*Prices May Vary By Location"; },
  "home.easy_order": function(d) { return "Easy Order"; },
  "home.easy_order_nickname_optional": function(d) { return "Easy Order Nickname (optional)"; },
  "home.ecom43188_easy_order_nickname": function(d) { return "Easy Order Nickname"; },
  "home.ecom43188_edit_editable_input": function(d) { return "<span class=\"is-visually-hidden\">Edit " + d.label + "</span>"; },
  "home.ecom43188_save_editable_input": function(d) { return "Save <span class=\"is-visually-hidden\">" + d.label + "</span>"; },
  "home.edit_before_checkout": function(d) { return "You can edit your order and modify the details before checkout."; },
  "home.edit_name": function(d) { return "Edit Name"; },
  "home.generic_warning_and_you_can_add_items_edit": function(d) { return "This order will replace any items or coupons currently in your cart. You can add items, edit your order, and modify your settings during checkout."; },
  "home.great_choice_would_you_like": function(d) { return ""; },
  "home.how": function(d) { return "How"; },
  "home.items": function(d) { return "Items"; },
  "home.items_unavailable": function(d) { return "The previously ordered items are unavailable at your local store and had to be removed from your order."; },
  "home.loyalty_awareness_activate_btn": function(d) { return "Activate Rewards"; },
  "home.loyalty_awareness_activate_text": function(d) { return "Activate Rewards now with one click &" + "#" + "9658;"; },
  "home.loyalty_awareness_info": function(d) { return "With Piece of the Pie Rewards, you'll earn 10 points for orders of $10 or more.* Redeem 60 points for a <strong>FREE medium 2-topping pizza!</strong> <a href=\"" + d.ctx + "/pages/customer/" + "#" + "!/customer/rewards/\" class=\"loyalty-awareness--learn-more\">Learn more</a>"; },
  "home.loyalty_awareness_terms": function(d) { return "By activating, you agree to comply with Piece of the Pie Rewards <br><a href=\"" + "#" + "\" class=\"js-isTemplatePopup js-loyaltyTermsTrigger\" data-template-popup=\"loyaltyTermsBody\">Terms & Conditions</a>. <br/>*Only one eligible order can be placed per calendar day."; },
  "home.loyalty_awareness_title": function(d) { return "Activate Piece of the Pie Rewards"; },
  "home.loyalty_profiled_enroll_header": function(d) { return "Join today and earn toward FREE PIZZA"; },
  "home.missing_items": function(d) { return "Missing items?"; },
  "home.mix_and_match_offer": function(d) { return ""; },
  "home.more_information": function(d) { return "For more information call your store directly."; },
  "home.no_easy_order_body": function(d) { return "An Easy Order is the fastest way to order from Domino&apos;s. What you want, how you want to get it, and how you want to pay for it is all saved so it&apos;s simpler than ever to order next time."; },
  "home.no_easy_order_cta": function(d) { return "create an easy order"; },
  "home.no_easy_order_icon_instruction_1": function(d) { return ""; },
  "home.no_easy_order_icon_instruction_2": function(d) { return ""; },
  "home.no_easy_order_icon_instruction_2_note": function(d) { return ""; },
  "home.no_easy_order_icon_instruction_3": function(d) { return ""; },
  "home.no_easy_order_title": function(d) { return "No Easy Order Saved"; },
  "home.no_thanks": function(d) { return "No thanks"; },
  "home.or": function(d) { return "or"; },
  "home.order_details": function(d) { return "Order Details"; },
  "home.order_it_again": function(d) { return "Order it again"; },
  "home.order_now": function(d) { return ""; },
  "home.payment": function(d) { return "Payment"; },
  "home.please_select_items": function(d) { return "Please select items to add to your cart"; },
  "home.previous_items": function(d) { return "Previous Items"; },
  "home.recent_orders": function(d) { return "Recent Orders"; },
  "home.remove_easy_order": function(d) { return "Remove Easy Order"; },
  "home.reorder_now": function(d) { return "Reorder Now"; },
  "home.replace_items_in_your_cart": function(d) { return "Adding items from this section will replace any items or coupons currently in your cart."; },
  "home.save_as_easy_order": function(d) { return "Save as Easy Order"; },
  "home.save_easy_order_footer": function(d) { return "Or <a class=\"js-easyOrderPopup\">place an order</a> and save it as your Easy Order at checkout."; },
  "home.save_easy_order_header": function(d) { return "You're 3 steps away from building an easy order:"; },
  "home.save_easy_order_ribbon": function(d) { return "Save a Recent Order as an Easy Order"; },
  "home.save_easy_order_step1": function(d) { return "Choose Delivery or Carryout."; },
  "home.save_easy_order_step2": function(d) { return "Add your favorite products and coupons and head to checkout to review your order."; },
  "home.save_easy_order_step3": function(d) { return "Continue checkout and look for the Easy Order section -shown below- to save it."; },
  "home.save_easy_order_subheader": function(d) { return "(Don't worry, you won't have to place the order to save it.)"; },
  "home.save_easy_order_title": function(d) { return "Want this to be your easy order?"; },
  "home.see_details": function(d) { return "See Details"; },
  "home.see_full_order_totalproducts_items": function(d) { return "See full order (" + d.totalProducts + " items total)"; },
  "home.see_less": function(d) { return "See less"; },
  "home.select_all": function(d) { return "Select All"; },
  "home.select_items_to_your_cart": function(d) { return "Please select items to add to your cart"; },
  "home.servicemethod_hours": function(d) { return d.serviceMethod + " hours"; },
  "home.sign_in": function(d) { return "Sign In"; },
  "home.sign_out": function(d) { return "Sign Out"; },
  "home.smartbanner_cta": function(d) { return "VIEW"; },
  "home.smartbanner_host": function(d) { return d.author; },
  "home.smartbanner_price": function(d) { return "FREE"; },
  "home.smartbanner_store_amazon": function(d) { return "In the Amazon Appstore"; },
  "home.smartbanner_store_apple": function(d) { return "On the App Store"; },
  "home.smartbanner_store_google": function(d) { return "In Google Play"; },
  "home.smartbanner_store_windows": function(d) { return "In the Windows Store"; },
  "home.smartbanner_title": function(d) { return ""; },
  "home.start_your_order": function(d) { return "Start Your Order"; },
  "home.start_your_order_carryout": function(d) { return "Carryout"; },
  "home.start_your_order_carside": function(d) { return "Carryout"; },
  "home.start_your_order_delivery": function(d) { return "Delivery"; },
  "home.start_your_order_drivethru": function(d) { return "Carryout"; },
  "home.store_menu_changed": function(d) { return "Your store menu may have changed"; },
  "home.store_storeid": function(d) { return "store " + "#" + d.storeID; },
  "home.tap_to_view_any_of": function(d) { return "Tap to view any of your recent online orders below so you can easily reorder."; },
  "home.temporarily_disabled": function(d) { return "Temporarily Disabled"; },
  "home.tracker": function(d) { return "Tracker"; },
  "home.upsell_triple_s_mx_description": function(d) { return "Topped with pepperoni, ham, Italian sausage and beef topped with extra cheese made with 100% real mozzarella."; },
  "home.upsell_triple_s_pizpv_description": function(d) { return "Roasted red peppers, fresh baby spinach, fresh onions, fresh mushrooms, tomatoes, black olives, cheeses made with 100% real mozzarella, feta and provolone, sprinkled with garlic herb seasoning, on a cheesy Parmesan Asiago crust."; },
  "home.upsell_triple_s_zz_description": function(d) { return "Loads of pepperoni, ham, Italian sausage, beef, fresh onions, fresh green peppers, fresh mushrooms and black olives topped with extra cheese made with 100% real mozzarella."; },
  "home.upsell_triple_specialty_header": function(d) { return "Special Offer on a Feast Pizza"; },
  "home.upsell_triple_specialty_subheader": function(d) { return "Would you like to make one of your items a feast pizza for only " + d.couponPrice + " more?"; },
  "home.view_full_menu": function(d) { return "View Full Menu"; },
  "home.view_menu": function(d) { return ""; },
  "home.welcome_back": function(d) { return "welcome back, " + d.name + "!"; },
  "home.welcome_customername": function(d) { return "Welcome " + d.customerName; },
  "home.with_your_easy_order_youre": function(d) { return "With your Easy Order, you're just a few clicks away from your favorite meal. You can edit your order and modify the details before checkout."; },
  "home.you_can_add_items_edit": function(d) { return "You can add items, edit your order and modify your settings during checkout."; },
  "home.you_can_modify_order": function(d) { return "You can modify order details during checkout"; },
  "home.your_easy_order": function(d) { return "Your Easy Order"; },
  "home.your_local_store": function(d) { return "Your Local Store"; },
  "home.your_order": function(d) { return "Your Order"; },
  "home.your_order_has_been_upgraded": function(d) { return "Your order has been updated"; },
  "home.your_order_has_been_upgraded_copy": function(d) { return "Breadsticks and Cinna Stix&reg; have been upgraded to Garlic Bread Twists and Cinnamon Bread Twists. This product change will be reflected in your cart.<br><br>Please review your order carefully before checking out. <strong>The prices may have changed.</strong>"; },
  "home.your_previously_ordered_items": function(d) { return "Your Previously Ordered Items"; },
  "home.your_recent_orders": function(d) { return "Your Recent Orders"; }
}
}
);
