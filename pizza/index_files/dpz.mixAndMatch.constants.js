function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.mixAndMatch.constants", ["dpz.coupons", "dpz.serviceMethod.constants"], function (_ref, _ref2) {
  var _CARRYOUT, _DELIVERY, _SERVICE_METHOD_MAP, _PRICE;

  var getCouponConfig = _ref.getCouponConfig;
  var CARRYOUT = _ref2.CARRYOUT,
      DELIVERY = _ref2.DELIVERY;
  var config = getCouponConfig();
  var CARRYOUT_CODE = config.carryoutMixAndMatch,
      CARRYOUT_PRICE = config.carryoutMixAndMatchPrice,
      CARRYOUT_UPSELL_CODE = config.carryoutMixAndMatchUpsell,
      CARRYOUT_UPSELL_PRICE = config.carryoutMixAndMatchUpsellPrice,
      DELIVERY_CODE = config.deliveryMixAndMatch,
      DELIVERY_PRICE = config.deliveryMixAndMatchPrice,
      DELIVERY_UPSELL_CODE = config.deliveryMixAndMatchUpsell,
      DELIVERY_UPSELL_PRICE = config.deliveryMixAndMatchUpsellPrice,
      MIX_AND_MATCH = config.genericMixAndMatch,
      MIX_AND_MATCH_UPSELL = config.genericMixAndMatchUpsell,
      LEGACY_CODE = config.legacyMixAndMatch,
      LEGACY_UPSELL_CODE = config.legacyMixAndMatchUpsell;
  var SERVICE_METHOD_MAP = (_SERVICE_METHOD_MAP = {}, _defineProperty(_SERVICE_METHOD_MAP, CARRYOUT, (_CARRYOUT = {}, _defineProperty(_CARRYOUT, MIX_AND_MATCH, CARRYOUT_CODE), _defineProperty(_CARRYOUT, MIX_AND_MATCH_UPSELL, CARRYOUT_UPSELL_CODE), _CARRYOUT)), _defineProperty(_SERVICE_METHOD_MAP, DELIVERY, (_DELIVERY = {}, _defineProperty(_DELIVERY, MIX_AND_MATCH, DELIVERY_CODE), _defineProperty(_DELIVERY, MIX_AND_MATCH_UPSELL, DELIVERY_UPSELL_CODE), _DELIVERY)), _SERVICE_METHOD_MAP);
  var PRICE = (_PRICE = {}, _defineProperty(_PRICE, CARRYOUT_CODE, CARRYOUT_PRICE), _defineProperty(_PRICE, CARRYOUT_UPSELL_CODE, CARRYOUT_UPSELL_PRICE), _defineProperty(_PRICE, DELIVERY_CODE, DELIVERY_PRICE), _defineProperty(_PRICE, DELIVERY_UPSELL_CODE, DELIVERY_UPSELL_PRICE), _PRICE);
  var CODES = [CARRYOUT_CODE, DELIVERY_CODE].filter(Boolean);
  var UPSELL_CODES = [CARRYOUT_UPSELL_CODE, DELIVERY_UPSELL_CODE].filter(Boolean);
  var ALL_CODES = [].concat(_toConsumableArray(CODES), _toConsumableArray(UPSELL_CODES));
  var LEGACY_CODES = [LEGACY_CODE].filter(Boolean);
  var LEGACY_UPSELL_CODES = [LEGACY_UPSELL_CODE].filter(Boolean);
  var ALL_LEGACY_CODES = [].concat(_toConsumableArray(LEGACY_CODES), _toConsumableArray(LEGACY_UPSELL_CODES));
  var GENERIC_CODES = [MIX_AND_MATCH, MIX_AND_MATCH_UPSELL].filter(Boolean);
  return {
    ALL_CODES: ALL_CODES,
    ALL_LEGACY_CODES: ALL_LEGACY_CODES,
    CARRYOUT: CARRYOUT,
    CARRYOUT_CODE: CARRYOUT_CODE,
    CARRYOUT_UPSELL_CODE: CARRYOUT_UPSELL_CODE,
    CODES: CODES,
    DELIVERY: DELIVERY,
    DELIVERY_CODE: DELIVERY_CODE,
    DELIVERY_UPSELL_CODE: DELIVERY_UPSELL_CODE,
    GENERIC_CODES: GENERIC_CODES,
    LEGACY_CODES: LEGACY_CODES,
    LEGACY_UPSELL_CODES: LEGACY_UPSELL_CODES,
    MIX_AND_MATCH: MIX_AND_MATCH,
    MIX_AND_MATCH_UPSELL: MIX_AND_MATCH_UPSELL,
    PRICE: PRICE,
    SERVICE_METHOD_MAP: SERVICE_METHOD_MAP,
    UPSELL_CODES: UPSELL_CODES
  };
});
//# sourceMappingURL=dpz.mixAndMatch.constants.js.map
