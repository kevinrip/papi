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
  "claimRewards.activate_rewards": function(d) { return "activate rewards"; },
  "claimRewards.activate_rewards_existing_profile": function(d) { return "You have a Pizza Profile but aren't enrolled in Piece of the Pie Rewards<sup>&reg;</sup>. Activate rewards below with a single click to claim your points!"; },
  "claimRewards.activate_rewards_legal": function(d) { return "By Activating, you agree to comply with <br> Piece of the Pie Rewards<a href=\"" + "#" + "\" class=\"underline\" data-hook=\"show-terms\">Terms &amp; Conditions</a>."; },
  "claimRewards.activate_rewards_new_profile": function(d) { return "You created a Pizza Profile but you're not enrolled in Piece of the Pie Rewards<sup>&reg;</sup>. If you don't activate it now, your points won't be claimed."; },
  "claimRewards.alert": function(d) { return "Alert"; },
  "claimRewards.almost_there": function(d) { return "You're almost there."; },
  "claimRewards.back": function(d) { return "Back"; },
  "claimRewards.bonus_activation_activate": function(d) { return "Activate"; },
  "claimRewards.bonus_activation_already_activated_header": function(d) { return "Your offer has already been activated"; },
  "claimRewards.bonus_activation_customer_not_part_of_campaign": function(d) { return "You are not eligible for this offer"; },
  "claimRewards.bonus_activation_details": function(d) { return "Please enter the email address associated with your rewards account to activate this offer."; },
  "claimRewards.bonus_activation_email_placeholder": function(d) { return "(Email address required)"; },
  "claimRewards.bonus_activation_expired": function(d) { return "This offer has expired"; },
  "claimRewards.bonus_activation_expired_message": function(d) { return "Please <a href=\"javascript: window.location.reload()\" class=\"page-link\">Click Here</a> to try again"; },
  "claimRewards.bonus_activation_extra_info": function(d) { return "Must be a Rewards Member and make a Qualifying Order from your Piece of the Pie Rewards email address to receive offer. For complete program details visit <a href=\"" + "#" + "!/customer/rewards/\" class=\"page-link\">DOMINOS.COM/REWARDS.</a>"; },
  "claimRewards.bonus_activation_generic_header": function(d) { return "That didn't work"; },
  "claimRewards.bonus_activation_great_news": function(d) { return "Great News!"; },
  "claimRewards.bonus_activation_header1": function(d) { return "You're almost there!"; },
  "claimRewards.bonus_activation_header2": function(d) { return "Activate your offer below"; },
  "claimRewards.bonus_activation_internal_processing_error": function(d) { return "We're having a little trouble activating this offer"; },
  "claimRewards.bonus_activation_internal_processing_message": function(d) { return "Please try again later or contact coustomer support if you experience further issues."; },
  "claimRewards.bonus_activation_oops": function(d) { return "Oops!"; },
  "claimRewards.bonus_activation_order_now": function(d) { return "Order Now"; },
  "claimRewards.bonus_activation_other_deals": function(d) { return "Find other great deals <a href=\"/en/pages/order/" + "#" + "!/section/Coupons/category/All/\" class=\"page-link\">here</a>"; },
  "claimRewards.bonus_activation_rewards_history": function(d) { return "View your <a href=\"" + "#" + "!/customer/rewards/history/\" class=\"page-link\">Rewards History</a>"; },
  "claimRewards.bonus_activation_sorry": function(d) { return "Sorry!"; },
  "claimRewards.bonus_activation_success": function(d) { return "Success!"; },
  "claimRewards.bonus_activation_success_header": function(d) { return "Your offer has been activated"; },
  "claimRewards.bonus_activation_success_not_a_member": function(d) { return "Not yet a member? <br><a href=\"" + "#" + "!/customer/profile/new\" class=\"page-link\">Click Here</a> to create a pizza profile with the email address used to activate this offer"; },
  "claimRewards.box_label_1": function(d) { return "Box Label 1"; },
  "claimRewards.box_label_2": function(d) { return "Box Label 2"; },
  "claimRewards.box_label_3": function(d) { return "Box Label 3"; },
  "claimRewards.claim_info_box_label": function(d) { return "There are 3 types of box labels. See below to help decide which one you have."; },
  "claimRewards.claim_info_disclaimer": function(d) { return "Box labels and order receipt are only available in participating Detroit Metro area stores."; },
  "claimRewards.claim_info_email": function(d) { return "Click Claim Rewards to reach the auto-filled Claim Your Rewards page."; },
  "claimRewards.claim_info_receipt": function(d) { return "There are two types of order receipts. See below to help decide which one you have."; },
  "claimRewards.claim_now": function(d) { return "Claim now"; },
  "claimRewards.claim_points": function(d) { return "claim points"; },
  "claimRewards.claim_rewards": function(d) { return "claim rewards"; },
  "claimRewards.claim_your_rewards": function(d) { return "Claim your Rewards"; },
  "claimRewards.confirmation_banner_header": function(d) { return "This order can still earn points toward <span>Free&nbsp;Pizza</span>"; },
  "claimRewards.confirmation_banner_subheader": function(d) { return "claim your points now!"; },
  "claimRewards.confirmation_cta_order_online": function(d) { return "order online"; },
  "claimRewards.confirmation_cta_view_profile": function(d) { return "View your Pizza Profile and rewards"; },
  "claimRewards.confirmation_cta_view_tracker": function(d) { return "view tracker"; },
  "claimRewards.confirmation_disclaimer": function(d) { return "Claimed points are pending and will be available within 48-72 hours."; },
  "claimRewards.confirmation_email": function(d) { return "Confirmation Email"; },
  "claimRewards.confirmation_header": function(d) { return "Congrats!"; },
  "claimRewards.confirmation_note_orders_must_be_ten_or_more": function(d) { return "NOTE: Orders must be $10 or more to earn points."; },
  "claimRewards.confirmation_points_claimed": function(d) { return "You have claimed " + d.points + " rewards points"; },
  "claimRewards.confirmation_popup_free_pizza": function(d) { return "free pizza"; },
  "claimRewards.confirmation_popup_header": function(d) { return "This order can still earn points toward"; },
  "claimRewards.confirmation_popup_subheader": function(d) { return "claim your points now!"; },
  "claimRewards.confirmation_still_earn_points": function(d) { return "Your order could still earn points toward free pizza! Claim your points now!"; },
  "claimRewards.confirmation_subheader": function(d) { return "You successfully claimed your points."; },
  "claimRewards.contact_us": function(d) { return "Contact Us"; },
  "claimRewards.create_profile_benefits": function(d) { return "Create a Pizza Profile to enroll in Piece of the Pie Rewards<sup>&reg;</sup> and claim your points. <br> A Pizza Profile also gives you access to these awesome benefits:"; },
  "claimRewards.create_your_profile": function(d) { return "Create Profile and Claim Points"; },
  "claimRewards.customer_claim_attempts_error": function(d) { return "Sorry. Looks like you've entered the wrong info one too many times. Please try again in 24 hours."; },
  "claimRewards.customer_monthly_claim_error": function(d) { return "Whoops. You can only earn points from one unclaimed order every 30 days."; },
  "claimRewards.customer_not_enrolled_error": function(d) { return "In order to receive rewards points, you must join Piece of the Pie Rewards®. Please join by selecting \"activate rewards\" in your profile, and then try claiming your points again."; },
  "claimRewards.deny_activate_rewards_existing_profile": function(d) { return "No thanks, I don't want to claim my points."; },
  "claimRewards.deny_activate_rewards_new_profile": function(d) { return "No thanks, create profile without claiming points."; },
  "claimRewards.details_claim_points_anonymous": function(d) { return ": Any qualifying order placed within the last 30 days that has not already earned points can be claimed."; },
  "claimRewards.details_claim_points_profiled": function(d) { return ": Any qualifying order placed within the last 30 days that has not already earned points can be claimed."; },
  "claimRewards.digital_order_not_found_error": function(d) { return "SORRY YOUR POINTS CAN’T BE CLAIMED RIGHT NOW. BUT NO WORRIES, YOU CAN STILL CLAIM YOUR POINTS USING THE LINK IN YOUR ORDER CONFIRMATION EMAIL. PLEASE TRY AGAIN TOMORROW."; },
  "claimRewards.enter_info_recent_order": function(d) { return "Enter your info from a recent order to claim points."; },
  "claimRewards.example_box_label_1": function(d) { return "example box label 1"; },
  "claimRewards.example_box_label_2": function(d) { return "example box label 2"; },
  "claimRewards.example_box_label_3": function(d) { return "example box label 3"; },
  "claimRewards.example_confirmation_email": function(d) { return "example confirmation email"; },
  "claimRewards.example_receipt_1": function(d) { return "example receipt 1"; },
  "claimRewards.example_receipt_2": function(d) { return "example receipt 2"; },
  "claimRewards.faq_link": function(d) { return "Try the <a class=\"underline\" target=\"_blank\" href=\"" + d.ctx + "/pages/content/customer-service/faq?faqsection=rewards\">Rewards FAQ"; },
  "claimRewards.find_this_info_details": function(d) { return "Find this info in your <strong>Box Label</strong> or <strong>Receipt</strong>."; },
  "claimRewards.got_it": function(d) { return "Got it!"; },
  "claimRewards.guest_loyalty_icon": function(d) { return "guest loyalty icon"; },
  "claimRewards.guest_profile_icon": function(d) { return "guest profile icon"; },
  "claimRewards.locate_order_details": function(d) { return "Locate Your Order Details"; },
  "claimRewards.not_qualified": function(d) { return "Oh no! This order doesn’t qualify for rewards points either because 1) The total price was below the $10 pre-tip minimum, or 2) You already claimed points once in the past 30 days."; },
  "claimRewards.or": function(d) { return "or"; },
  "claimRewards.order_claimed_error": function(d) { return "Sorry. Points for this order have already been claimed."; },
  "claimRewards.order_details": function(d) { return "Order Details"; },
  "claimRewards.order_expired_error": function(d) { return "Oops. This order won't qualify. It's more than 30 days old."; },
  "claimRewards.order_not_found_error": function(d) { return "Hmm. This Order Number or Rewards Code could not be found. Heads up that Rewards Codes are case sensitive, and may contain a mix of upper and lower case letters."; },
  "claimRewards.order_number": function(d) { return "Order Number"; },
  "claimRewards.order_receipt_1": function(d) { return "Order Receipt 1"; },
  "claimRewards.order_receipt_2": function(d) { return "Order Receipt 2"; },
  "claimRewards.points_not_claimed": function(d) { return "Uh-oh! Your points haven't been claimed yet."; },
  "claimRewards.profile_required_already_have_profile": function(d) { return "Already have a Pizza Profile? <br> Sign in to see if points are available."; },
  "claimRewards.profile_required_claim_your_points": function(d) { return "Claim Your Points"; },
  "claimRewards.profile_required_create_profile": function(d) { return "Create profile to enroll"; },
  "claimRewards.profile_required_header": function(d) { return "Enroll in Piece of the Pie Rewards"; },
  "claimRewards.profile_required_header_enroll": function(d) { return "Enroll in"; },
  "claimRewards.profile_required_header_pop": function(d) { return "Piece Of The Pie"; },
  "claimRewards.profile_required_header_rewards": function(d) { return "Rewards"; },
  "claimRewards.profile_required_subheader": function(d) { return "To claim points, enroll in Piece of the Pie Rewards by creating a Pizza Profile."; },
  "claimRewards.profile_required_terms": function(d) { return "Clicking here indicates you want to enroll in Domino&apos;s Piece of the Pie Rewards, and you agree to the <a href=\"\" data-hook=\"potpr-toc\" class=\"js-loyaltyTermsBody underline\">Terms &amp; Conditions</a> of the program."; },
  "claimRewards.questions": function(d) { return "Questions?"; },
  "claimRewards.rewards_code": function(d) { return "Rewards Code"; },
  "claimRewards.rewards_home": function(d) { return "Rewards Home"; },
  "claimRewards.show_me": function(d) { return "show me"; },
  "claimRewards.sign_in": function(d) { return "Sign In"; },
  "claimRewards.sign_in_to_claim_rewards": function(d) { return "You'll be asked to sign in or create a Pizza Profile to claim points."; },
  "claimRewards.sign_in_to_your_pizza": function(d) { return "Sign in to your Pizza Profile to claim points"; },
  "claimRewards.to_qualify": function(d) { return "To qualify, order must be $10 or more to earn points, order cannot have already earned points, only 1 previous order per month can be claimed; only 1 order per 24 hours can earn points; unclaimed orders must be less than 30 days old to qualify."; },
  "claimRewards.unknown_error": function(d) { return "Well, this is embarrassing. We're having a little trouble with the Piece of the Pie Rewards&reg;. Please check your reward history to make sure you received your points. If you haven't, please try again in 24 hours. Sorry for the inconvenience!"; }
}
}
);
