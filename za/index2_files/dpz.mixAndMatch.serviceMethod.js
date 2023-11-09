function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.mixAndMatch.serviceMethod", ["dpz.address", "dpz.mixAndMatch.constants", "dpz.mixAndMatch.methods"], function (_ref, _ref2, _ref3) {
  var getHasStreetAddress = _ref.getHasStreetAddress;
  var DELIVERY = _ref2.DELIVERY;
  var getCoupons = _ref3.getCoupons,
      getHasAnyMixAndMatch = _ref3.getHasAnyMixAndMatch;

  var getOnMixAndMatchServiceMethodChange = function getOnMixAndMatchServiceMethodChange(serviceMethod) {
    var currentOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve) {
      var _currentOptions$isOrd = currentOptions.isOrderStarted,
          isOrderStarted = _currentOptions$isOrd === void 0 ? true : _currentOptions$isOrd;
      if (!isOrderStarted) return resolve(null);
      var hasAnyMixAndMatch = getHasAnyMixAndMatch();
      if (!hasAnyMixAndMatch) return resolve(null);
      var shouldRedirect = !site.func.resetCoupons;
      if (shouldRedirect) return resolve(null);
      var isDelivery = serviceMethod === DELIVERY;
      var hasStreetAddress = getHasStreetAddress();
      var suppressValidation = isDelivery && !hasStreetAddress;
      var coupons = getCoupons();

      var options = _objectSpread({
        suppressValidation: suppressValidation
      }, currentOptions);

      return site.func.resetCoupons({
        coupons: coupons,
        options: options
      }).then(resolve);
    });
  };

  return {
    getOnMixAndMatchServiceMethodChange: getOnMixAndMatchServiceMethodChange
  };
});
//# sourceMappingURL=dpz.mixAndMatch.serviceMethod.js.map
