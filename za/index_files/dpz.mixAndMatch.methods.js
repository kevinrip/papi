function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.mixAndMatch.methods", ["dpz.mixAndMatch.constants"], function (_ref) {
  var ALL_CODES = _ref.ALL_CODES,
      ALL_LEGACY_CODES = _ref.ALL_LEGACY_CODES,
      CARRYOUT = _ref.CARRYOUT,
      GENERIC_CODES = _ref.GENERIC_CODES,
      LEGACY_UPSELL_CODES = _ref.LEGACY_UPSELL_CODES,
      MIX_AND_MATCH = _ref.MIX_AND_MATCH,
      MIX_AND_MATCH_UPSELL = _ref.MIX_AND_MATCH_UPSELL,
      PRICE = _ref.PRICE,
      SERVICE_METHOD_MAP = _ref.SERVICE_METHOD_MAP,
      UPSELL_CODES = _ref.UPSELL_CODES;

  var getCatalog = function getCatalog() {
    return jsDPZ.app.catalog.getCatalog();
  };

  var getCoupon = function getCoupon(code) {
    return getCatalog().getHiddenCoupon(code);
  };

  var getOrderDetails = function getOrderDetails() {
    return jsDPZ.app.order.getOrder().data.Details;
  };

  var getCoupons = function getCoupons() {
    return getOrderDetails().Coupons;
  };

  var getServiceMethod = function getServiceMethod() {
    return getOrderDetails().ServiceMethod;
  };

  var getIsOnCheckout = function getIsOnCheckout() {
    return document.location.href.includes("#!/checkout/");
  };

  var getIsOnMenu = function getIsOnMenu() {
    return document.location.href.includes("/pages/order/#!/section/Food/category/");
  };

  var getShouldRouteToMenu = function getShouldRouteToMenu() {
    var isOnMenu = getIsOnMenu();
    var isOnCheckout = getIsOnCheckout();
    return !isOnMenu && !isOnCheckout;
  };

  var _urlConfig = urlConfig,
      root = _urlConfig.root;

  var routeToMenu = function routeToMenu() {
    return document.location.href = "".concat(root, "/pages/order/#!/section/Food/category/AllEntrees/");
  };

  var defaultServiceMethod = CARRYOUT;

  var getMixAndMatchCodeForServiceMethod = function getMixAndMatchCodeForServiceMethod(isUpsell) {
    return function (serviceMethod) {
      return SERVICE_METHOD_MAP[serviceMethod || defaultServiceMethod][isUpsell ? MIX_AND_MATCH_UPSELL : MIX_AND_MATCH];
    };
  };

  var _map = [false, true].map(getMixAndMatchCodeForServiceMethod),
      _map2 = _slicedToArray(_map, 2),
      getMixAndMatchCode = _map2[0],
      getMixAndMatchUpsellCode = _map2[1];

  var getMixAndMatchPrice = function getMixAndMatchPrice(code) {
    return PRICE[code];
  };

  var getIsCode = function getIsCode(codes) {
    return function (code) {
      return codes.includes(code);
    };
  };

  var _map3 = [ALL_LEGACY_CODES, ALL_CODES, GENERIC_CODES, LEGACY_UPSELL_CODES, UPSELL_CODES].map(getIsCode),
      _map4 = _slicedToArray(_map3, 5),
      getIsAnyLegacyMixAndMatch = _map4[0],
      getIsAnyMixAndMatch = _map4[1],
      getIsGenericMixAndMatch = _map4[2],
      getIsLegacyMixAndMatchUpsell = _map4[3],
      getIsMixAndMatchUpsell = _map4[4];

  var getNewMixAndMatchCode = function getNewMixAndMatchCode(_ref2) {
    var couponCode = _ref2.couponCode,
        serviceMethod = _ref2.serviceMethod;
    var isLegacyUpsell = getIsLegacyMixAndMatchUpsell(couponCode);
    var isNewUpsell = getIsMixAndMatchUpsell(couponCode);
    var isUpsell = isLegacyUpsell || isNewUpsell;
    var getNewCode = isUpsell ? getMixAndMatchUpsellCode : getMixAndMatchCode;
    var newCouponCode = getNewCode(serviceMethod);
    return newCouponCode;
  };

  var getCurrentMixAndMatchCoupon = function getCurrentMixAndMatchCoupon() {
    var coupons = getCoupons();
    var coupon = coupons.find(getIsAnyMixAndMatchCoupon);
    return coupon;
  };

  var getHasAnyMixAndMatch = function getHasAnyMixAndMatch() {
    var currentMixAndMatchCoupon = getCurrentMixAndMatchCoupon();
    var hasMixAndMatch = Boolean(currentMixAndMatchCoupon);
    return hasMixAndMatch;
  };

  var getIsAnyMixAndMatchCoupon = function getIsAnyMixAndMatchCoupon(_ref3) {
    var Code = _ref3.Code;
    return getIsAnyMixAndMatch(Code);
  };

  var getHasAndIsMixAndMatch = function getHasAndIsMixAndMatch(couponCode) {
    var isMixAndMatch = getIsAnyMixAndMatch(couponCode);
    var hasMixAndMatch = getHasAnyMixAndMatch();
    var hasAndIsMixAndMatch = hasMixAndMatch && isMixAndMatch;
    return hasAndIsMixAndMatch;
  };

  var getIsCouponActive = function getIsCouponActive(couponCode) {
    var _jsDPZ$app$catalog$is = jsDPZ.app.catalog.isCouponActive(couponCode),
        Success = _jsDPZ$app$catalog$is.Success;

    return Success;
  };

  var getIsMixAndMatchActive = function getIsMixAndMatchActive() {
    var serviceMethod = getServiceMethod();
    var getCouponCode = getMixAndMatchCodeForServiceMethod(false);
    var couponCode = getCouponCode(serviceMethod);
    var isActive = getIsCouponActive(couponCode);
    return isActive;
  };

  return {
    getCatalog: getCatalog,
    getCoupon: getCoupon,
    getCoupons: getCoupons,
    getCurrentMixAndMatchCoupon: getCurrentMixAndMatchCoupon,
    getHasAndIsMixAndMatch: getHasAndIsMixAndMatch,
    getHasAnyMixAndMatch: getHasAnyMixAndMatch,
    getIsAnyLegacyMixAndMatch: getIsAnyLegacyMixAndMatch,
    getIsAnyMixAndMatch: getIsAnyMixAndMatch,
    getIsGenericMixAndMatch: getIsGenericMixAndMatch,
    getIsMixAndMatchActive: getIsMixAndMatchActive,
    getIsMixAndMatchUpsell: getIsMixAndMatchUpsell,
    getMixAndMatchCode: getMixAndMatchCode,
    getMixAndMatchPrice: getMixAndMatchPrice,
    getMixAndMatchUpsellCode: getMixAndMatchUpsellCode,
    getNewMixAndMatchCode: getNewMixAndMatchCode,
    getServiceMethod: getServiceMethod,
    getShouldRouteToMenu: getShouldRouteToMenu,
    routeToMenu: routeToMenu
  };
});
//# sourceMappingURL=dpz.mixAndMatch.methods.js.map
