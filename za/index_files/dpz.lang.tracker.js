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
  "tracker.an_error_has_occurred_and": function(d) { return "An error has occurred and Domino's Tracker is unavailable at this time."; },
  "tracker.and": function(d) { return "and"; },
  "tracker.and_may_be_dropping_off_a_nearby_order": function(d) { return "and may be dropping off a nearby order"; },
  "tracker.at": function(d) { return " at "; },
  "tracker.at_the_door": function(d) { return "Get Ready! $DriverName$ is pulling up now"; },
  "tracker.bake": function(d) { return "Bake"; },
  "tracker.best": function(d) { return "Best"; },
  "tracker.completed_step": function(d) { return "completed"; },
  "tracker.csrname_received_your_order": function(d) { return "$CsrName$ received your order."; },
  "tracker.csrname_received_your_order_at": function(d) { return "$CsrName$ received your order at $StartTime$."; },
  "tracker.current_step": function(d) { return "current step"; },
  "tracker.delivered": function(d) { return "Delivered"; },
  "tracker.delivery_destination": function(d) { return "delivery destination"; },
  "tracker.delivery_origin": function(d) { return "Your order is being delivered from store location at: " + d.StoreAddress + "."; },
  "tracker.dominos_logo_on_map": function(d) { return "Domino's logo on map."; },
  "tracker.dominos_tracker": function(d) { return "Domino's Tracker"; },
  "tracker.driver": function(d) { return "driver"; },
  "tracker.driver_badges": function(d) { return "Badges coming soon"; },
  "tracker.driver_is_arriving_any_second_now": function(d) { return "$DriverName$ is arriving any second now"; },
  "tracker.driver_is_in_your_neighborhood": function(d) { return "$DriverName$ is in your neighborhood"; },
  "tracker.driver_languages_spoken": function(d) { return "Other than English, I also speak"; },
  "tracker.driver_left_at": function(d) { return "Left at " + d.routeTime; },
  "tracker.driver_pet_friendly": function(d) { return "If you have pets, I'd probably"; },
  "tracker.driver_tracking_unavailable": function(d) { return "Delivery tracking is unavailable, but we're headed your way"; },
  "tracker.driver_why_I_drive": function(d) { return "When I'm not driving for Domino's, I'm"; },
  "tracker.drivername_left_the_store_with": function(d) { return "$DriverName$ left the store with your order at $RouteTime$."; },
  "tracker.dropping_off_nearby_order": function(d) { return "(and may be dropping off a nearby order)"; },
  "tracker.estimated_delivery_minutes": function(d) { return "Current estimated delivery time " + d.estimatedTime + " mins"; },
  "tracker.estimated_pickup_minutes": function(d) { return "Current estimated pickup time " + d.estimatedTime + " mins"; },
  "tracker.estimated_pickup_time": function(d) { return "Estimated pickup time $EstimatedPickupRange$"; },
  "tracker.eta": function(d) { return "ETA"; },
  "tracker.eta_unavailable": function(d) { return "ETA unavailable"; },
  "tracker.follow_your_order": function(d) { return "Follow your order from the store to your door with the new and improved Domino’s Tracker® with GPS."; },
  "tracker.fullscreen_button_label": function(d) { return "Expand map to full screen"; },
  "tracker.if_you_dont_immediately_see_your_order_CA": function(d) { return "If you don’t immediately see your order, please enter the phone number associated with your order and click \"track your order\"."; },
  "tracker.in_the_neighborhood": function(d) { return "$DriverName$ is in your neighborhood"; },
  "tracker.its_boxed_and_ready_to": function(d) { return "It's boxed and ready to go"; },
  "tracker.know_the_status_of_your": function(d) { return "Know the status of your order, from the moment it's placed to the second it leaves our store for delivery or is ready to be picked up."; },
  "tracker.leaving_the_store": function(d) { return "$DriverName$ left the store at $RouteTime$"; },
  "tracker.managername_began_custom_making_your": function(d) { return "$ManagerName$ began custom-making your order at $StartTime$."; },
  "tracker.managername_double_checked_your_order": function(d) { return "$ManagerName$ double-checked your order for perfection at $RackTime$."; },
  "tracker.managername_put_your_order_in": function(d) { return "$ManagerName$ put your order in the oven at $OvenTime$."; },
  "tracker.meet_your_delivery_driver": function(d) { return "Meet Your Delivery Driver"; },
  "tracker.mmm_its_all_yours": function(d) { return "Mmm, it's all yours"; },
  "tracker.mmm_its_there": function(d) { return "Mmm, it's there"; },
  "tracker.now_you_can_track": function(d) { return "Now you can track your driver right to your door with the New Delivery Tracker!"; },
  "tracker.num1": function(d) { return "1"; },
  "tracker.num2": function(d) { return "2"; },
  "tracker.num3": function(d) { return "3"; },
  "tracker.num4": function(d) { return "4"; },
  "tracker.num5": function(d) { return "5"; },
  "tracker.order_canceled": function(d) { return "The order has been canceled. Please contact the store at " + d.phone + " for more information."; },
  "tracker.order_canceled_short": function(d) { return "order canceled"; },
  "tracker.order_completed": function(d) { return "complete"; },
  "tracker.order_has_been_delivered": function(d) { return "Order Has Been Delivered"; },
  "tracker.order_placed": function(d) { return "Order Placed"; },
  "tracker.our_delivery_expert": function(d) { return "Our delivery expert"; },
  "tracker.our_expert_customer_representative": function(d) { return "Our expert customer representative"; },
  "tracker.our_expert_pizza_maker": function(d) { return "Our Expert Pizza Maker"; },
  "tracker.out_for_delivery": function(d) { return "Out For Delivery"; },
  "tracker.pandu_ambil": function(d) { return "Pandu Ambil"; },
  "tracker.patent_pending": function(d) { return "Patent Pending"; },
  "tracker.pause": function(d) { return "Pause"; },
  "tracker.perfection_check_complete": function(d) { return "Perfection check complete"; },
  "tracker.phone_note": function(d) { return ""; },
  "tracker.pick_your_theme": function(d) { return "pick your theme"; },
  "tracker.play": function(d) { return "Play"; },
  "tracker.potong_q": function(d) { return "Potong-Q"; },
  "tracker.prep": function(d) { return "Prep"; },
  "tracker.quality_check": function(d) { return "Quality Check"; },
  "tracker.ready_for_dine_in": function(d) { return "Dine In"; },
  "tracker.ready_for_pickup": function(d) { return "Ready For Pickup"; },
  "tracker.ready_soon_carryout": function(d) { return "Your Order will be ready soon!"; },
  "tracker.ready_soon_delivery": function(d) { return "Your Order is headed your way soon!"; },
  "tracker.reload": function(d) { return "Reload"; },
  "tracker.see_driver_profile": function(d) { return "See Driver Profile"; },
  "tracker.stay_on_page_for_drive_up_carryout": function(d) { return "Please stay on this page for your Take-Away order"; },
  "tracker.tell_us_how_we_did": function(d) { return "Tell us how we did"; },
  "tracker.terms_of_use": function(d) { return "Yes. I agree to the <a class=\"js-isTemplatePopup\" data-template-popup=\"contentPageTerms\" href=\"" + d.ctx + "/" + "#" + "!/content/terms/\">Terms of Use</a> and I am 13 or older"; },
  "tracker.thanks_for_picking_up_your": function(d) { return "Thanks for picking up your order -- enjoy your meal!"; },
  "tracker.theme_picker_header": function(d) { return "Choose a Tracker theme. And turn your speakers up to 11."; },
  "tracker.track_your_order": function(d) { return "Track Your Order"; },
  "tracker.tracker_splash_notification": function(d) { return "Our team is preparing your order now. You will be able to track your delivery on this map once it leaves the store!"; },
  "tracker.want_real_time_text": function(d) { return "Want real-time text message updates to track this order? Enter your info below."; },
  "tracker.we_have_your_order_ready": function(d) { return "We have your order ready for pickup as of $RackTime$."; },
  "tracker.we_hope_youre_enjoying_your": function(d) { return "We hope you're enjoying your meal!"; },
  "tracker.well_have_your_order_ready": function(d) { return "We'll have your order ready on $AdvancedOrderDate$ at $AdvancedOrderTime$."; },
  "tracker.were_firing_it_up": function(d) { return "We're firing it up"; },
  "tracker.were_on_the_way": function(d) { return "We're on the way"; },
  "tracker.worst": function(d) { return "Worst"; },
  "tracker.your_delivery_expert": function(d) { return "Your delivery expert"; },
  "tracker.your_delivery_expert_eta": function(d) { return "Your delivery expert, " + d.driverName + ", left the store and is " + d.etaMins + " mins away!"; },
  "tracker.your_future_order_is_in": function(d) { return "Your future order is in"; },
  "tracker.your_order_is_in": function(d) { return "Your order is in"; },
  "tracker.your_order_is_in_the_oven": function(d) { return "Your order is in the oven"; },
  "tracker.your_order_is_in_the_oven_at": function(d) { return "Your order entered the oven at " + d.ovenAtTime; },
  "tracker.your_order_is_ready_for_pickup": function(d) { return "Your order is ready for pickup"; },
  "tracker.your_order_was_delivered_at": function(d) { return "Your order was delivered at " + d.deliveredAtTime; },
  "tracker.your_order_was_ready_at": function(d) { return "Your order was ready for pickup at " + d.readyAtTime; }
}
}
);
