function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.couponSwapper", ["dpz.mixAndMatch", "dpz.weekLongCarryout"], function (_ref, _ref2) {
  var swapMixAndMatch = _ref.swapMixAndMatch;
  var swapWeekLongCarryout = _ref2.swapWeekLongCarryout;
  var SWAPPERS = [
  /* add swappers for any other types of coupons here */
  swapMixAndMatch, swapWeekLongCarryout];

  var getServiceMethod = function getServiceMethod() {
    return jsDPZ.app.order.getOrder().data.Details.ServiceMethod;
  };

  var swapCoupon = function swapCoupon(currentCoupon) {
    var serviceMethod = getServiceMethod();

    var swap = function swap(coupon, swapper) {
      return swapper({
        coupon: coupon,
        serviceMethod: serviceMethod
      });
    };

    var coupon = SWAPPERS.reduce(swap, _objectSpread({}, currentCoupon));
    return coupon;
  };

  var swapCouponCode = function swapCouponCode(Code) {
    var coupon = {
      Code: Code
    };

    var _swapCoupon = swapCoupon(coupon),
        swappedCode = _swapCoupon.Code;

    return swappedCode;
  };

  return {
    swapCoupon: swapCoupon,
    swapCouponCode: swapCouponCode
  };
});
//# sourceMappingURL=dpz.couponSwapper.js.map
