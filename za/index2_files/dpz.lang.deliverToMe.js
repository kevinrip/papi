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
  "deliverToMe.aerial_alert": function(d) { return "Map switched to aerial view for more detail."; },
  "deliverToMe.agree_and_continue": function(d) { return "Agree and Continue"; },
  "deliverToMe.approval": function(d) { return "Approval"; },
  "deliverToMe.available": function(d) { return "Available"; },
  "deliverToMe.be_at_the_deliver_to_me": function(d) { return "&" + "#" + "8432; You will be given an updated Estimated Delivery Time when you place your order."; },
  "deliverToMe.cancel": function(d) { return "Cancel"; },
  "deliverToMe.cant_find_you_a": function(d) { return "We need to know your location in order for you to use Domino's Hotspot, but for some reason your settings aren't allowing us to see where you are.<br><br>Check to make sure the following settings are enabled on your device and/or browser."; },
  "deliverToMe.cant_find_you_b": function(d) { return "1. Turn on Location Services on your device"; },
  "deliverToMe.cant_find_you_c": function(d) { return "2. Grant Dominos.com access to your current location"; },
  "deliverToMe.cant_find_you_d": function(d) { return "If you need help, click below to visit the location permission help page to see how you can access, enable, and/or reset these settings for your device."; },
  "deliverToMe.cant_reorder": function(d) { return "Domino's Hotspot orders cannot be reordered from Recent Orders."; },
  "deliverToMe.change_to_carryout_or_delivery": function(d) { return "Change to Carryout or Delivery"; },
  "deliverToMe.change_to_delivery_or_carryout": function(d) { return "Change to Delivery or Carryout"; },
  "deliverToMe.choose_deliver_to_me": function(d) { return "Confirm delivery to this hotspot"; },
  "deliverToMe.continue_to_checkout": function(d) { return "Continue to checkout"; },
  "deliverToMe.current_estimated": function(d) { return "(Current Estimated Delivery Time)"; },
  "deliverToMe.dash_driving_time": function(d) { return "Min Drive"; },
  "deliverToMe.dash_walking_time": function(d) { return "Min Walk"; },
  "deliverToMe.deliver_to_me": function(d) { return "Hotspots"; },
  "deliverToMe.deliver_to_me_approval": function(d) { return "Hotspot Approval"; },
  "deliverToMe.deliver_to_me_distance": function(d) { return d.distanceToHotspot + " Miles"; },
  "deliverToMe.deliver_to_me_hotspot": function(d) { return "Hotspot"; },
  "deliverToMe.deliver_to_me_order": function(d) { return "Domino's Hotspot Order"; },
  "deliverToMe.deliver_to_me_subtitle": function(d) { return "A Domino's delivery driver can meet you at this Hotspot."; },
  "deliverToMe.deliver_to_me_title": function(d) { return "Confirm Your Delivery Hotspot"; },
  "deliverToMe.delivery_instructions": function(d) { return "Help the driver recognize you at the Domino's Hotspot"; },
  "deliverToMe.delivery_instructions_note": function(d) { return "(Note: I'm wearing red shorts, white tank top, etc.)"; },
  "deliverToMe.delivery_instructions_placeholder": function(d) { return "Describe where you are (park, lakeside, car etc.)"; },
  "deliverToMe.dominos_deliver_to_me": function(d) { return "Domino's Hotspots®"; },
  "deliverToMe.dominos_deliver_to_me_deliver_to_me": function(d) { return "Domino's Hotspot"; },
  "deliverToMe.driving_time": function(d) { return d.drivingTime + " Min Drive"; },
  "deliverToMe.email": function(d) { return "Email"; },
  "deliverToMe.email_address_verified": function(d) { return "Email Address Verified"; },
  "deliverToMe.email_required": function(d) { return "Email (required):"; },
  "deliverToMe.estimated_delivery_time": function(d) { return "Hotspot Estimated Delivery Time"; },
  "deliverToMe.estimated_details": function(d) { return "Meet the driver at your Domino's Hotspot in about"; },
  "deliverToMe.existing_deliver_to_me": function(d) { return "Existing Hotspot"; },
  "deliverToMe.existing_dominos_deliver_to_me": function(d) { return "Existing Domino's Hotspot"; },
  "deliverToMe.expand_view": function(d) { return "Expand the view to find more hotspots"; },
  "deliverToMe.explore_deliver_to_me": function(d) { return "Explore Hotspots"; },
  "deliverToMe.find_a_deliver_to_me": function(d) { return "Find a Hotspot"; },
  "deliverToMe.find_dominos_deliver_to_me": function(d) { return "Find Domino's Hotspot"; },
  "deliverToMe.find_nearby_dominos_deliver_to_me": function(d) { return "Find Nearby Domino's Hotspot"; },
  "deliverToMe.five_hundred_character_limit": function(d) { return "500 Character Limit"; },
  "deliverToMe.footnote": function(d) { return "Pre-pay online with credit, debit, or gift cards. We'll send you text notifications that provide updates on your order."; },
  "deliverToMe.fyi_one": function(d) { return "Please arrive at the Domino's Hotspot before the driver. We'll get you your estimated delivery time faster than you can spell pizza."; },
  "deliverToMe.fyi_three": function(d) { return "We need to text you with order updates so you'll know when your pizza's ready."; },
  "deliverToMe.fyi_title": function(d) { return "Things to know about"; },
  "deliverToMe.fyi_two": function(d) { return "Unfortunately, we don't accept cold, hard cash. Good thing debit, credit, and gift cards are all fair game."; },
  "deliverToMe.general_area": function(d) { return "Suggested Hotspot may be located in the vicinity of a suggested pin."; },
  "deliverToMe.get_started": function(d) { return "Get started"; },
  "deliverToMe.get_there": function(d) { return "Get there before your driver"; },
  "deliverToMe.get_to_your_deliver_to_me": function(d) { return "Get to your Domino's Hotspot before the driver."; },
  "deliverToMe.got_it": function(d) { return "Got it"; },
  "deliverToMe.got_it_continue": function(d) { return "Got it, continue"; },
  "deliverToMe.great_taste": function(d) { return "You've got great taste!"; },
  "deliverToMe.great_taste_content": function(d) { return "Turns out, you can already get pizza delivered to this location. What are you waiting for? Order some pizza!"; },
  "deliverToMe.help_me": function(d) { return "Help me"; },
  "deliverToMe.how_it_works": function(d) { return "How It Works"; },
  "deliverToMe.if_approved": function(d) { return "You'll receive an email if your suggestion is approved."; },
  "deliverToMe.inactive": function(d) { return "Inactive"; },
  "deliverToMe.intro": function(d) { return "Pizza fanatics rejoice! Domino's now delivers to almost anywhere you are, like parks, beaches and more, even if you don't have an address."; },
  "deliverToMe.introducing": function(d) { return "Introducing Domino's Hotspots"; },
  "deliverToMe.is_this_spot_correct": function(d) { return "Is this location correct?"; },
  "deliverToMe.landing_text": function(d) { return "We have over 150,000 Domino's Hotspots already!\n Is there a beach, park, or unique location you'd like to suggest?"; },
  "deliverToMe.map_example": function(d) { return "Domino's Hotspot Map Example"; },
  "deliverToMe.map_for_illustration": function(d) { return "Map for illustration only"; },
  "deliverToMe.minutes": function(d) { return "Minutes"; },
  "deliverToMe.minutes_abbreviation": function(d) { return "min"; },
  "deliverToMe.move_map_to_place_pin": function(d) { return "Move the map to place the red pin in your preferred location."; },
  "deliverToMe.need_your_cell": function(d) { return "Check your mobile device for order update text notifications."; },
  "deliverToMe.new_deliver_to_me": function(d) { return "A new Hotspot"; },
  "deliverToMe.no_available_hotspots": function(d) { return "We don't currently offer delivery to your location. "; },
  "deliverToMe.no_available_hotspots_move_map": function(d) { return "Please move the pin on the map and<br>select 'SET LOCATION' to find another Hotspot."; },
  "deliverToMe.no_cash": function(d) { return "Cash is not accepted for Hotspot delivery orders"; },
  "deliverToMe.no_deliver_to_me_available": function(d) { return "No Hotspots in view"; },
  "deliverToMe.no_deliver_to_me_selected": function(d) { return "Choose a Domino's Hotspot"; },
  "deliverToMe.place_an_order": function(d) { return "Place an order"; },
  "deliverToMe.powered_by": function(d) { return "Powered By"; },
  "deliverToMe.prepay_online": function(d) { return "Pre-pay with debit, credit or gift card."; },
  "deliverToMe.ready_to_order": function(d) { return "Ready to order Domino's right now?"; },
  "deliverToMe.receive_directions": function(d) { return "You can get directions to this Domino's Hotspot from your current location once you have placed your order."; },
  "deliverToMe.receive_email_offers": function(d) { return "Yes, I would like to receive email offers from Domino's Pizza"; },
  "deliverToMe.required_for_deliver_to_me": function(d) { return "Required for Domino's Hotspot Delivery"; },
  "deliverToMe.return_to_map": function(d) { return "Return to map"; },
  "deliverToMe.review": function(d) { return "Review"; },
  "deliverToMe.right_click": function(d) { return "Right click to set and suggest a new Hotspot"; },
  "deliverToMe.ring_ring": function(d) { return "Ring Ring Ring... Pizza Phone"; },
  "deliverToMe.ring_ring_a": function(d) { return "If the store needs to reach you, we'll call this phone number. Please pick up, or else we won't be able to deliver your order."; },
  "deliverToMe.ring_ring_b": function(d) { return "For Domino's Hotspot, make sure your number can receive text messages."; },
  "deliverToMe.select_deliver_to_me": function(d) { return "Find Nearby Domino's Hotspot<sup>&reg;</sup>"; },
  "deliverToMe.select_previous_hotspot": function(d) { return "Select previous hotspot"; },
  "deliverToMe.selected": function(d) { return "Selected"; },
  "deliverToMe.send_me_text_updates": function(d) { return "Send me text updates about my Domino's Hotspot Order<sup>**</sup>"; },
  "deliverToMe.set_location": function(d) { return "Set location"; },
  "deliverToMe.set_new_location": function(d) { return "Set new location"; },
  "deliverToMe.set_new_location_question": function(d) { return "Want to set a different location?"; },
  "deliverToMe.share_location": function(d) { return "You will be asked to share your location."; },
  "deliverToMe.step_one": function(d) { return "Select \"Find Nearby Domino's Hotspot\" to view a map that shows the nearest Hotspot to your location."; },
  "deliverToMe.step_three": function(d) { return "Meet your driver at the Domino's Hotspot by the Estimated Delivery Time to receive your order."; },
  "deliverToMe.step_two": function(d) { return "Build and place to order of your dreams"; },
  "deliverToMe.suggest_a_new_deliver_to_me": function(d) { return "Suggest a New Hotspot"; },
  "deliverToMe.suggested_inactive": function(d) { return "Good news: The Domino's Hotspot you suggested already exists.\n Bad News: This location is currently closed. We'll see you here tomorrow for pizza!"; },
  "deliverToMe.suggested_step_one": function(d) { return "Navigate Map"; },
  "deliverToMe.suggested_step_one_content": function(d) { return "Navigate the map to find your desired location."; },
  "deliverToMe.suggested_step_three": function(d) { return "Suggest"; },
  "deliverToMe.suggested_step_three_content": function(d) { return "Submit your Domino's Hotspot suggestion."; },
  "deliverToMe.suggested_step_three_content_minus_period": function(d) { return "Submit your Domino's Hotspot suggestion"; },
  "deliverToMe.suggested_step_two": function(d) { return "Drop a pin"; },
  "deliverToMe.suggested_step_two_content": function(d) { return "Tap and hold to drop a Domino's Hotspot pin."; },
  "deliverToMe.suggested_step_two_content_desktop": function(d) { return "Right click map to drop a Domino's Hotspot pin"; },
  "deliverToMe.tap_allow": function(d) { return "Tap \"allow\" on the next prompt so we can know where you are and show you the closest Domino's Hotspot<sup>&reg</sup>.<br><br> If you don't allow location access, you won't be able to use Hotspot-- which will make your stomach not only hungry, but also very sad."; },
  "deliverToMe.tap_and_hold": function(d) { return "Tap and hold to set and suggest a new hotspot"; },
  "deliverToMe.tap_deliver_to_me_for_info": function(d) { return "Tap to select a <img src=\"" + d.assets_ctx + "/images/hotspots/map-pin.svg\" class=\"hotspot-pin__img\"> hotspot to see more information"; },
  "deliverToMe.tap_to_select_deliver_to_me": function(d) { return "Select an available Domino's Hotspot where you'd like to receive your Domino's delivery."; },
  "deliverToMe.tell_us_why": function(d) { return "What makes this a great Domino's Hotspot?"; },
  "deliverToMe.tell_us_why_placeholder": function(d) { return "example: picnic tables + beach = the perfect spot for a Domino's Delivery Hotspot!"; },
  "deliverToMe.text_disclaimer": function(d) { return "<sup>**</sup>By checking this box, you consent to receive up to 5 text messages for this order from 88607. Message and data rates may apply."; },
  "deliverToMe.text_disclaimer_less_button": function(d) { return "Less <span aria-hidden='true'>&" + "#" + "x25be;</span>"; },
  "deliverToMe.text_disclaimer_more": function(d) { return "To opt out of receiving text messages for this order, send the word stop to 88607 at any time. You understand and agree that text messages sent to your mobile phone/device may be generated using automated technology. Your consent to receive text messages is not required to make purchases from Domino's but only to receive a delivery at a Domino's Hotspot location."; },
  "deliverToMe.text_disclaimer_more_button": function(d) { return "More <span aria-hidden='true'>&" + "#" + "x25b8;</span>"; },
  "deliverToMe.texts_required": function(d) { return "(text messages required for Domino's Hotspot Delivery)"; },
  "deliverToMe.thanks_for_your_suggestion": function(d) { return "Thank you for your Hotspot suggestion!"; },
  "deliverToMe.this_deliver_to_me_is_closed": function(d) { return "This Domino's Hotspot is currently <i>UNAVAILABLE</i>. Come back later or choose a currently available Domino's Hotspot on the map."; },
  "deliverToMe.unavailable": function(d) { return "Unavailable"; },
  "deliverToMe.verification_link": function(d) { return "We're sending you a verification link, so be sure to check your email."; },
  "deliverToMe.verify": function(d) { return "Verify"; },
  "deliverToMe.walking_time": function(d) { return d.walkingTime + " Min Walk"; },
  "deliverToMe.we_cant_find_you": function(d) { return "Your pizza needs to find you"; },
  "deliverToMe.we_will_review": function(d) { return "We will review your Domino's Hotspot suggestion."; },
  "deliverToMe.what_happens": function(d) { return "What happens after you submit your suggestion:"; },
  "deliverToMe.whats_next": function(d) { return "Here's what's happening next:"; },
  "deliverToMe.where_are_you": function(d) { return "Where are you?"; },
  "deliverToMe.you_can_get_directions": function(d) { return "You can get directions to your Domino's Hotspot from your current location once you place your order."; },
  "deliverToMe.your_email_address": function(d) { return "ILovePizza@Dominos.com"; },
  "deliverToMe.zoom_in": function(d) { return "Zoom in to your desired location."; }
}
}
);
