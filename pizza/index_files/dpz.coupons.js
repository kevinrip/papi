define("dpz.coupons", ["dpz.config"], function (_ref) {
  var getMarketProperty = _ref.getMarketProperty;
  var MARKET_PROPERTY = "coupons";

  var getCouponConfig = function getCouponConfig() {
    return getMarketProperty(MARKET_PROPERTY);
  };

  var _getCouponConfig = getCouponConfig(),
      nationalCoupons = _getCouponConfig.nationalCoupons;

  var getIsNationalCoupon = function getIsNationalCoupon(couponCode) {
    return nationalCoupons.includes(couponCode);
  };

  return {
    getCouponConfig: getCouponConfig,
    getIsNationalCoupon: getIsNationalCoupon
  };
});
//# sourceMappingURL=dpz.coupons.js.map
