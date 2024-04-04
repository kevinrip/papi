function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(["shared.components", "paymentmodules/gpmACI", "paymentmodules/paymenthelpers/dpz.applePayHelper", "marketconfig/dpz.lang.checkout", "dpz.template"], function (_ref, _ref2, _ref3, checkoutStrings, template) {
  var PaymentTypesTeaser = _ref.PaymentTypesTeaser,
      TranslateContext = _ref.TranslateContext;
  var supportedNetworks = _ref2.supportedNetworks;
  var applePayAvailable = _ref3.applePayAvailable;

  var getApplePayAvailability = function getApplePayAvailability() {
    return killConfig.isMarketEnabled("gpmACI") && applePayAvailable(supportedNetworks);
  };

  var renderPaymentTypesTeaser = function renderPaymentTypesTeaser(props) {
    var container = document.querySelector(".js-paymentTypesTeaserContainer");
    container && preact.render(preact.h(TranslateContext.Provider, {
      value: template.getTranslateContextValue(_objectSpread({}, checkoutStrings))
    }, preact.h(PaymentTypesTeaser, props)), container);
  };

  return {
    getApplePayAvailability: getApplePayAvailability,
    renderPaymentTypesTeaser: renderPaymentTypesTeaser
  };
});
//# sourceMappingURL=dpz.applePay.js.map
