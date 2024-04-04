function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.mixAndMatch.validator", ["dpz.mixAndMatch.constants", "dpz.mixAndMatch.methods", "dpz.template", "marketconfig/dpz.lang.general"], function (_ref, _ref2, _ref3, translations) {
  var _COUPON_DESCRIPTION;

  var CARRYOUT_CODE = _ref.CARRYOUT_CODE,
      CARRYOUT_UPSELL_CODE = _ref.CARRYOUT_UPSELL_CODE,
      DELIVERY_CODE = _ref.DELIVERY_CODE,
      DELIVERY_UPSELL_CODE = _ref.DELIVERY_UPSELL_CODE,
      PRICE = _ref.PRICE;
  var getCoupons = _ref2.getCoupons,
      getCurrentMixAndMatchCoupon = _ref2.getCurrentMixAndMatchCoupon,
      getHasAnyMixAndMatch = _ref2.getHasAnyMixAndMatch,
      getNewMixAndMatchCode = _ref2.getNewMixAndMatchCode,
      getServiceMethod = _ref2.getServiceMethod,
      getShouldRouteToMenu = _ref2.getShouldRouteToMenu,
      routeToMenu = _ref2.routeToMenu;
  var getTranslateContextValue = _ref3.getTranslateContextValue,
      tmd = _ref3.translateMarkdown;
  var KEY = "general.short_mix_and_match";
  var UPSELL_KEY = "".concat(KEY, "_upsell");

  var getTranslation = function getTranslation(key, context) {
    return tmd(key, context, translations);
  };

  var getDescription = function getDescription(price) {
    return getTranslation(KEY, {
      price: price
    });
  };

  var carryoutPrice = PRICE[CARRYOUT_CODE];
  var deliveryPrice = PRICE[DELIVERY_CODE];

  var _map = [carryoutPrice, deliveryPrice].map(getDescription),
      _map2 = _slicedToArray(_map, 2),
      carryoutDescription = _map2[0],
      deliveryDescription = _map2[1];

  var getUpsellDescription = function getUpsellDescription(_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        price = _ref5[0],
        upsellPrice = _ref5[1];

    return getTranslation(UPSELL_KEY, {
      price: price,
      upsellPrice: upsellPrice
    });
  };

  var carryoutUpsellPrice = PRICE[CARRYOUT_UPSELL_CODE];
  var deliveryUpsellPrice = PRICE[DELIVERY_UPSELL_CODE];
  var carryoutPrices = [carryoutPrice, carryoutUpsellPrice];
  var deliveryPrices = [deliveryPrice, deliveryUpsellPrice];

  var _map3 = [carryoutPrices, deliveryPrices].map(getUpsellDescription),
      _map4 = _slicedToArray(_map3, 2),
      carryoutUpsellDescription = _map4[0],
      deliveryUpsellDescription = _map4[1];

  var COUPON_DESCRIPTION = (_COUPON_DESCRIPTION = {}, _defineProperty(_COUPON_DESCRIPTION, CARRYOUT_CODE, carryoutDescription), _defineProperty(_COUPON_DESCRIPTION, CARRYOUT_UPSELL_CODE, carryoutUpsellDescription), _defineProperty(_COUPON_DESCRIPTION, DELIVERY_CODE, deliveryDescription), _defineProperty(_COUPON_DESCRIPTION, DELIVERY_UPSELL_CODE, deliveryUpsellDescription), _COUPON_DESCRIPTION);

  var renderMixAndMatchWarning = function renderMixAndMatchWarning(_ref6) {
    var handleChange = _ref6.handleChange,
        nextServiceMethod = _ref6.serviceMethod;
    return require(["shared.components"], function (_ref7) {
      var CouponServiceMethodWarningModal = _ref7.CouponServiceMethodWarningModal,
          TranslateContext = _ref7.TranslateContext;
      var coupon = getCurrentMixAndMatchCoupon();

      var _ref8 = coupon || {},
          couponCode = _ref8.Code;

      var nextCouponCode = getNewMixAndMatchCode({
        couponCode: couponCode,
        serviceMethod: nextServiceMethod
      });
      var couponDescription = COUPON_DESCRIPTION[nextCouponCode];
      var currentServiceMethod = getServiceMethod();

      var onCancel = function onCancel() {
        var shouldRouteToMenu = getShouldRouteToMenu();
        if (shouldRouteToMenu) routeToMenu();
      };

      var onConfirm = function onConfirm() {
        return handleChange();
      };

      var modalQuid = "mm-service-method-warning";
      var analytics = {
        documentTitle: "general-overlay-".concat(modalQuid)
      };
      var props = {
        analytics: analytics,
        couponDescription: couponDescription,
        currentServiceMethod: currentServiceMethod,
        modalQuid: modalQuid,
        nextServiceMethod: nextServiceMethod,
        onCancel: onCancel,
        onConfirm: onConfirm,
        site: site
      };

      var modal = function modal() {
        return preact.h(CouponServiceMethodWarningModal, props);
      };

      var value = getTranslateContextValue(translations);

      var _document$getElements = document.getElementsByClassName("js-modalContainer"),
          _document$getElements2 = _slicedToArray(_document$getElements, 1),
          container = _document$getElements2[0];

      preact.render(preact.h(TranslateContext.Provider, {
        value: value
      }, preact.h(TranslateContext.Consumer, null, modal)), container);
    });
  };

  var validateMixAndMatch = function validateMixAndMatch() {
    var coupons = getCoupons();
    var hasAnyMixAndMatch = getHasAnyMixAndMatch(coupons);

    if (hasAnyMixAndMatch) {
      renderMixAndMatchWarning.apply(void 0, arguments);
      return false;
    }

    return true;
  };

  return {
    validateMixAndMatch: validateMixAndMatch
  };
});
//# sourceMappingURL=dpz.mixAndMatch.validator.js.map
