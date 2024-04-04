function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define(["dpz.globalPayments.status", "paymentmodules/paymenthelpers/dpz.applePayHelper", "shared.components"], function (gpstatus, _ref, _ref2) {
  var _module;

  var beginPaymentFlow = _ref.beginPaymentFlow,
      getApplePayConfig = _ref.getApplePayConfig,
      getApplePayToken = _ref.getApplePayToken,
      renderApplePayButton = _ref.renderApplePayButton,
      setApplePayConfig = _ref.setApplePayConfig,
      setApplePaySession = _ref.setApplePaySession;
  var ApplePayOption = _ref2.ApplePayOption;
  var ACI_APPLE_PAY_STRING = "AciApplePay";
  var MERCHANT_CAPABILITIES = ["supports3DS"]; // Map applePayHelper's network names to NOLO equivalents

  var NETWORK_MAP = {
    amex: "American Express",
    discover: "Discover Card",
    jcb: "JCB",
    masterCard: "Mastercard",
    visa: "Visa"
  };
  var STATUS_CODES = [
  /*  0 */
  "SUCCESS",
  /*  1 */
  "PLACE_ORDER_FAILED",
  /*  2 */
  "ABORTED",
  /*  3 */
  "FAILED",
  /*  4 */
  "REFUND_TRIGGERED",
  /*  5 */
  "PENDING",
  /*  6 */
  "TECHNICAL_ERROR",
  /*  7 */
  "WAITING_CONFIRMATION",
  /*  8 */
  "DECLINED",
  /*  9 */
  "DUPLICATE_ORDER",
  /* 10 */
  "CONFIGURATION_MISSING",
  /* 11 */
  "WAITING_NOTIFICATION",
  /* 12 */
  "AUTHORIZATION_FAILED",
  /* 13 */
  "CANCELLED"];
  var VALIDATION_LINK = {
    method: "POST",
    url: urlConfig.legacyApi + "/power/paymentGatewayService/validateWallet?providerId=ACI_APPLE_PAY&walletType=APPLE_PAY"
  };

  var getPlaceOrderData = function getPlaceOrderData() {
    return require(["dpz.placeorder"], function (_ref3) {
      var buildAndReturnOrderJSON = _ref3.buildAndReturnOrderJSON;
      return buildAndReturnOrderJSON().then(function (orderObject) {
        return $.extend(true, {}, orderObject, {
          Order: {
            Payments: [{
              Amount: jsDPZ.app.order.getOrder().data.Details.Amounts.Customer,
              Type: "AciApplePay"
            }]
          }
        });
      });
    });
  };

  var getStatusLogger = function getStatusLogger(statusNumber, statusDescription) {
    return function () {
      var _console;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /* startDevBlock */

      /* eslint-disable no-console */
      (_console = console).log.apply(_console, ["Received status ".concat(statusNumber, " (").concat(statusDescription, ") with:")].concat(args));
      /* eslint-enable no-console */

      /* endDevBlock */


      site.func.overlayToggle(true, "codeOverlay", {}, {
        code: "eApplePayGenericError",
        label: site.format.phoneNumber({
          number: jsDPZ.app.store.getStore().data.Phone
        }, "storePhone")
      });
    };
  };

  var getSupportedNetworks = function getSupportedNetworks() {
    return Object.entries(NETWORK_MAP).reduce(function (supportedNetworks, _ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          applePayNetworkName = _ref5[0],
          noloNetworkName = _ref5[1];

      if (jsDPZ.app.store.getStore().data.AcceptableCreditCards.includes(noloNetworkName)) {
        supportedNetworks.push(applePayNetworkName);
      }

      return supportedNetworks;
    }, []);
  };

  var getTotalWithTip = function getTotalWithTip() {
    return [jsDPZ.app.order.getOrder().data.Details.Amounts.Customer, // subtotal
    site.data.tipAmount // tip
    ].reduce(function (total, value) {
      return total + Number(value);
    }, 0).toFixed(2).toString();
  };

  var handleCheckoutClick = function handleCheckoutClick() {
    setApplePayConfig({
      currencyCode: "USD",
      countryCode: dpz.market.marketCode,
      merchantCapabilities: MERCHANT_CAPABILITIES,
      supportedNetworks: getSupportedNetworks(),
      total: {
        amount: getTotalWithTip(),
        label: "Domino’s",
        type: "final"
      }
    });
    var ApplePaySession = window.ApplePaySession;

    var versionToUse = function () {
      var version = 0;

      while (ApplePaySession !== null && ApplePaySession !== void 0 && ApplePaySession.supportsVersion(version + 1)) {
        version++;
      }

      return version;
    }();

    setApplePaySession(new ApplePaySession(versionToUse, getApplePayConfig()));
    dpz.utag.fire.link(null, {
      event_name: "Check out with Apple Pay"
    });
    $(".js-placeOrder").click();
  };

  var statusHandlers = {
    0: function _(data) {
      return $.Deferred(function (promise) {
        require(["dpz.placeorder"], function (_ref6) {
          var getOrderObject = _ref6.getOrderObject,
              success = _ref6.success;
          var orderObject = getOrderObject();
          data.Status = 0;
          jsDPZ.util.sessionStorage("gpmTransactionNumber", data.transactionMerchant || data.id);
          var _data$orderRequestDto = data.orderRequestDto.Order,
              PulseOrderGuid = _data$orderRequestDto.PulseOrderGuid,
              _data$orderRequestDto2 = _data$orderRequestDto.metaData,
              metaData = _data$orderRequestDto2 === void 0 ? {} : _data$orderRequestDto2;
          orderObject.Order.PulseOrderGuid = PulseOrderGuid;
          orderObject.Order.metaData = _objectSpread(_objectSpread({}, orderObject.Order.metaData), metaData);
          promise.resolve(success($.extend({}, orderObject, {
            Details: {
              StoreOrderID: data.storeOrderID
            }
          })));
        });
      });
    }
  };

  var subscribeToGiftCardChanges = function subscribeToGiftCardChanges(setIsDisabled) {
    // The Apple Pay payment method should be disabled when
    // the gift card option is selected, and vice versa.
    jsDPZ.topic("paymentForm.giftcard").subscribe(function (_ref7) {
      var selected = _ref7.selected;
      setIsDisabled(selected);
    });
  };

  var module = (_module = {
    aciApplePayString: ACI_APPLE_PAY_STRING
  }, _defineProperty(_module, "".concat(ACI_APPLE_PAY_STRING.toLowerCase(), "Forms"), {
    init: function init(props) {
      if (jsDPZ.app.customer.getCustomer().data.Session.ShowAciApplePayAtCheckout) {
        renderApplePayButton({
          configExtension: {
            merchantCapabilities: MERCHANT_CAPABILITIES,
            supportedNetworks: getSupportedNetworks()
          },
          overrideClickHandler: handleCheckoutClick
        });
        var container = document.querySelector(".js-applePayContainer");
        container && preact.render(preact.h(ApplePayOption, _extends({
          inputValue: ACI_APPLE_PAY_STRING,
          subscribeToGiftCardChanges: subscribeToGiftCardChanges
        }, props)), container);
      }
    }
  }), _defineProperty(_module, "placeOrderAjaxSettings", {
    url: jsDPZ.config.power.globalPaymentGateway.processPayment(true),
    data: function data() {
      return $.Deferred(function (promise) {
        require(["dpz.placeorder"], function (_ref8) {
          var buildAndReturnOrderJSON = _ref8.buildAndReturnOrderJSON;
          buildAndReturnOrderJSON().then(function (orderObject) {
            var applePayNode = orderObject.Order.Payments.find(function (payment) {
              return payment.Type === "AciApplePay";
            });
            var applePayToken = getApplePayToken();
            var updatedApplePayNode = $.extend(true, {}, applePayNode, {
              PaymentMethod: {
                applePaySession: window.btoa(JSON.stringify(applePayToken.paymentData))
              },
              Token: "",
              Type: "AciApplePay"
            });
            orderObject.Order.Payments = orderObject.Order.Payments.filter(function (payment) {
              return payment.Type !== "AciApplePay";
            }).concat(updatedApplePayNode);
            promise.resolve({
              orderRequestDto: orderObject
            });
          });
        });
      });
    },
    dataType: "json",
    accepts: {
      json: "application/vnd.com.dominos.ecommerce.payment.gateway.response+json; version=1.0"
    },
    beforeSend: function beforeSend(xhr) {
      var auth = jsDPZ.util.sessionStorage("dpz_authorization");

      if (auth) {
        xhr.setRequestHeader("Authorization", "Basic ".concat(auth));
      }
    },
    context: {
      done: function done(data) {
        $.extend(data, {
          initialResponse: true
        });
        gpstatus.handle(data);
      }
    }
  }), _defineProperty(_module, "onSubmit", function onSubmit() {
    return new Promise(function (resolve, reject) {
      if ($(".js-paymentType:checked").data("gpm-payment-subtype") === "applepay") {
        beginPaymentFlow({
          link: VALIDATION_LINK,
          onSubmitReject: function onSubmitReject() {
            var _console2;

            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            /* startDevBlock */

            /* eslint-disable no-console */
            (_console2 = console).log.apply(_console2, ["In onSubmitReject:"].concat(args));
            /* eslint-enable no-console */

            /* endDevBlock */


            reject.apply(void 0, args);
          },
          onSubmitResolve: resolve,
          placeOrderData: getPlaceOrderData()
        });
      } else {
        resolve(null);
      }
    });
  }), _defineProperty(_module, "provider", ACI_APPLE_PAY_STRING.toLowerCase()), _defineProperty(_module, "statusCodes", STATUS_CODES), _defineProperty(_module, "statusHandlers", $.extend(true, {}, STATUS_CODES.reduce(function (handlers, status, i) {
    handlers[i] = getStatusLogger(i, status);
    return handlers;
  }, {}), statusHandlers)), _defineProperty(_module, "supportedNetworks", getSupportedNetworks()), _module);
  return module;
});
//# sourceMappingURL=gpmACI.js.map
