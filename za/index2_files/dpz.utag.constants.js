define("dpz.utag.constants", function () {
  var UTAG_EVENTS = {
    CART_REVIEW: "Cart Review",
    CHECKOUT_PAGE_VIEWED: "Checkout Page Viewed",
    CHECKOUT_START: "Checkout Start",
    COUPON_ADDED: "Coupon Added",
    COUPONS_PAGE_VIEWED: "Coupons Page Viewed",
    COUPON_REMOVED: "Coupon Removed",
    MINI_CART: "mini-cart",
    MINI_CART_VIEWED: "Mini Cart Viewed",
    NEW_PROFILE_CREATED: "New Profile Created",
    ORDER_CONFIRMED: "Order Confirmed",
    ORDER_PLACED: "Order Placed",
    PAYMENT_TYPE_CHANGED: "Payment Type Changed",
    PRODUCT_ADDED: "Product Added",
    PRODUCT_BUILDER: "Product Builder",
    PRODUCT_REMOVED: "Product Removed",
    PRODUCT_UPDATED: "Product Updated",
    SELECT_PROMOTION_PRODUCT: "Select Promotion Product",
    SERVICE_METHOD_CHANGED: "Service Method Changed",
    USER_SIGNED_IN: "User Signed In"
  };
  var GTM_EVENTS = {
    ADD_PAYMENT_INFO: "add_payment_info",
    ADD_SHIPPING_INFO: "add_shipping_info",
    ADD_TO_CART: "add_to_cart",
    BEGIN_CHECKOUT: "begin_checkout",
    COMPLETE_PURCHASE: "purchase",
    PAGE_VIEW: "Pageview",
    REMOVE_TO_CART: "remove_from_cart",
    SELECT_ITEM: "select_item",
    VIEW_CART: "view_cart"
  };
  return {
    UTAG_EVENTS: UTAG_EVENTS,
    GTM_EVENTS: GTM_EVENTS
  };
});
//# sourceMappingURL=dpz.utag.constants.js.map
