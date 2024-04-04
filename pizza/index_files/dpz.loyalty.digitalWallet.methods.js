function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.loyalty.digitalWallet.methods", function () {
  var CURRENT_OFFERS = "currentOffers";
  var ACTIVATED = "Applied";
  var AVAILABLE = "Available";
  var UPCOMING = "Upcoming";
  var CURRENT_OFFER_STATUSES = [AVAILABLE, ACTIVATED, UPCOMING];
  var PAST_OFFERS = "pastOffers";
  var COUPONS_APPLY_BUTTON = "/pages/order/?partnerCode=DOMINOS&so=hp&panelnumber=2";

  var getFormattedDigitalWallet = function getFormattedDigitalWallet(digitalWalletData) {
    if (!digitalWalletData) {
      return;
    }

    var offersToDisplay = digitalWalletData.offersToDisplay;
    digitalWalletData.offersToDisplay = getOffersByStatus(offersToDisplay);
    return digitalWalletData;
  };

  var getOfferByStatus = function getOfferByStatus(all, offer) {
    var offerWithProps = getOfferProps(offer);
    var status = offerWithProps.status;
    var isCurrent = CURRENT_OFFER_STATUSES.includes(status);
    var key = isCurrent ? CURRENT_OFFERS : PAST_OFFERS;
    return _objectSpread(_objectSpread({}, all), {}, _defineProperty({}, key, [].concat(_toConsumableArray(all[key]), [offerWithProps])));
  };

  var getOffersByStatus = function getOffersByStatus(offers) {
    var _offers$reduce;

    return offers.reduce(getOfferByStatus, (_offers$reduce = {}, _defineProperty(_offers$reduce, CURRENT_OFFERS, []), _defineProperty(_offers$reduce, PAST_OFFERS, []), _offers$reduce));
  };

  var getOfferProps = function getOfferProps(_ref) {
    var description = _ref.description,
        id = _ref.id,
        _ref$metaData = _ref.metaData,
        TandC = _ref$metaData.TandC,
        availability = _ref$metaData.availability,
        button = _ref$metaData.button,
        headline = _ref$metaData.headline,
        image = _ref$metaData.imageWeb,
        status = _ref$metaData.status,
        statusDate = _ref$metaData.statusDate,
        urgency = _ref$metaData.urgent,
        _ref$promoCode = _ref.promoCode,
        code = _ref$promoCode.code,
        name = _ref$promoCode.name;
    var offerLink = getOfferLink({
      code: code,
      name: name
    });
    var termsAndConditions = getMarkdownTerms(TandC);
    var urgent = urgency === "true";
    return {
      availability: availability,
      button: button,
      code: code,
      description: description,
      headline: headline,
      id: id,
      image: jsDPZ.util.htmlUnEncode(image),
      offerLink: offerLink,
      status: status,
      statusDate: jsDPZ.util.htmlUnEncode(statusDate),
      termsAndConditions: termsAndConditions,
      urgent: urgent
    };
  };

  var getMarkdownTerms = function getMarkdownTerms(termsAndConditionsValue) {
    var markdownTerms = termsAndConditionsValue === null || termsAndConditionsValue === void 0 ? void 0 : termsAndConditionsValue.replace(/(https:\/\/[^\s]+[a-zA-Z0-9-+&@#\/%=~_|])/g, function (url) {
      return "[".concat(url, "](").concat(url, ")");
    });
    return markdownTerms;
  };

  var getOfferLink = function getOfferLink(_ref2) {
    var code = _ref2.code,
        name = _ref2.name;
    var searchParams = new URLSearchParams(_objectSpread({
      couponCode_0: code
    }, name && {
      panelname: name
    }));
    var queryString = searchParams.toString();
    return [COUPONS_APPLY_BUTTON, queryString].join("&");
  };

  return {
    getFormattedDigitalWallet: getFormattedDigitalWallet
  };
});
//# sourceMappingURL=dpz.loyalty.digitalWallet.methods.js.map
