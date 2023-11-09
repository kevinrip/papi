function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define(["dpz.template", "marketconfig/dpz.lang.checkout", "marketconfig/dpz.lang.confirmation"], function (_ref, checkoutStrings, confirmationStrings) {
  var isTranslationStringEmpty = _ref.isTranslationStringEmpty,
      translate = _ref.translate;
  var shippingTypeMap = {
    Carryout: "storePickup",
    Delivery: "delivery"
  };
  var newApplePaySession = null;
  var authorizedResponse = {};
  var totalTranslation = isTranslationStringEmpty("checkout.apple_pay_total", checkoutStrings) ? translate("confirmation.total", null, confirmationStrings) : translate("checkout.apple_pay_total", null, checkoutStrings);
  var applePayConfig = {
    currencyCode: null,
    countryCode: dpz.market.marketCode,
    merchantIdentifier: "",
    merchantCapabilities: [],
    supportedNetworks: [],
    shippingType: shippingTypeMap[jsDPZ.app.order.getOrder().data.Details.ServiceMethod],
    total: {
      label: totalTranslation,
      amount: null,
      type: "final"
    }
  };
  var ApplePaySession = window.ApplePaySession;

  var versionToUse = function () {
    var version = 0;

    while (ApplePaySession !== null && ApplePaySession !== void 0 && ApplePaySession.supportsVersion(version + 1)) {
      version++;
    }

    return version;
  }();

  var applePayCapable = ApplePaySession === null || ApplePaySession === void 0 ? void 0 : ApplePaySession.canMakePayments();

  var deviceSupportsNetworks = function deviceSupportsNetworks(providerSupportedNetworks) {
    var networkToMinimumVersionMap = {
      amex: 1,
      cartesBancaires: 4,
      chinaUnionPay: 1,
      discover: 1,
      eftpos: 4,
      electron: 4,
      elo: 5,
      interac: 1,
      jcb: 2,
      mada: 5,
      maestro: 4,
      masterCard: 1,
      privateLabel: 1,
      visa: 1,
      vPay: 4
    };

    var networkToMinimumVersions = function networkToMinimumVersions(provider) {
      return networkToMinimumVersionMap[provider];
    };

    var deviceSupportsEveryNetwork = function deviceSupportsEveryNetwork(version) {
      return version <= versionToUse;
    };

    return providerSupportedNetworks.map(networkToMinimumVersions).every(deviceSupportsEveryNetwork);
  };

  var applePayAvailable = function applePayAvailable() {
    var providerSupportedNetworks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return applePayCapable && killConfig.isMarketEnabled("98b601a4-7503-4efc-add4-3e61fffa94b0") && deviceSupportsNetworks(providerSupportedNetworks);
  };

  var renderApplePayButton = function renderApplePayButton() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        overrideClickHandler = _ref2.overrideClickHandler,
        buttonType = _ref2.buttonType,
        currencyCode = _ref2.currencyCode,
        configExtension = _ref2.configExtension,
        gpmFormPromise = _ref2.gpmFormPromise,
        getTotalAmount = _ref2.getTotalAmount;

    var merchantIdentifier = configExtension.merchantIdentifier;
    var cardsActivePromise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
    var applePayButtonPreactComponentPromise = new Promise(function (resolve, reject) {
      require(["payment.components"], function (_ref3) {
        var ApplePayButton = _ref3.ApplePayButton;
        resolve(ApplePayButton);
      }, function () {
        jsDPZ.topic("apple.pay.button.component.error").publish({
          error: new Error("requirejs failed to retrieve Apple Pay Button component.")
        });
        reject();
      });
    });
    var applePayContainer = document.querySelector(".js-applePayButtonContainer");

    var showAndHideOnClick = function showAndHideOnClick(updateViewState) {
      var updateButton = function updateButton(event) {
        var isApplePay = event.currentTarget.dataset.gpmPaymentSubtype === "applepay";
        var isRadio = event.currentTarget.type === "radio";

        if (isApplePay || isRadio) {
          $(".js-placeOrder").toggleClass("is-hidden", isApplePay);
          updateViewState(isApplePay);
        }
      };

      $(".js-paymentType").on("click", updateButton);
      return function () {
        $(".js-paymentType").off("click", updateButton);
      };
    };

    var clickHandler = overrideClickHandler || function () {
      $.extend(true, applePayConfig, configExtension, {
        currencyCode: currencyCode,
        total: {
          amount: (getTotalAmount === null || getTotalAmount === void 0 ? void 0 : getTotalAmount()) || jsDPZ.app.order.getOrder().data.Details.Amounts.Customer.toString()
        }
      });
      /* startDevBlock */

      /* eslint-disable no-console */

      console.log("call applepaysession constructor");
      console.log(versionToUse, "apple pay version being used");
      console.log(applePayConfig, "config object for constructor");
      /* eslint-enable no-console */

      /* endDevBlock */

      newApplePaySession = new ApplePaySession(versionToUse, applePayConfig);
      $(".js-placeOrder").click();
    };

    Promise.all([cardsActivePromise, applePayButtonPreactComponentPromise, gpmFormPromise]).then(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          canMakePayments = _ref5[0],
          ApplePayButton = _ref5[1];

      if (!canMakePayments) {
        if (ApplePaySession.openPaymentSetup && merchantIdentifier) {
          clickHandler = function clickHandler() {
            ApplePaySession.openPaymentSetup(merchantIdentifier).then(function (success) {
              if (success) {//not sure what the experience should be
              } else {//will need to talk to ba about experience
              }
            })["catch"](function (e) {//same thing here, need to talk to ba about experience
            });
          };
        } else {//probably going to want to display some sort of messaging for user to
          //setup wallet
        }
      }

      preact.render(preact.h(ApplePayButton, {
        buttonType: buttonType,
        dpzMarket: dpz.market,
        showAndHideOnClick: showAndHideOnClick,
        clickHandler: clickHandler
      }), applePayContainer);
    });
  };

  var validateApplePaySession = function validateApplePaySession(_ref6) {
    var link = _ref6.link,
        appleUrl = _ref6.appleUrl,
        placeOrderData = _ref6.placeOrderData;
    return jsDPZ.ajax.request({
      url: jsDPZ.util.htmlUnEncode(link.url),
      type: link.method,
      contentType: "application/json",
      data: JSON.stringify($.extend(true, {}, {
        orderRequestDto: placeOrderData
      }, {
        additionalRequestParams: {
          domain: window.location.hostname,
          validationUrl: appleUrl
        },
        orderRequestDto: {
          Order: {
            OrderMethod: "web",
            SourceOrganizationURI: jsDPZ.config.dataModel.ORDER_REQUEST.SourceOrganizationURI
          }
        }
      }))
    });
  };

  var setApplePayEventHandlers = function setApplePayEventHandlers() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        onSubmitResolve = _ref7.onSubmitResolve,
        onSubmitReject = _ref7.onSubmitReject,
        link = _ref7.link,
        placeOrderData = _ref7.placeOrderData;

    Object.assign(newApplePaySession, {
      onvalidatemerchant: function onvalidatemerchant(event) {
        validateApplePaySession({
          link: link,
          appleUrl: event.validationURL,
          placeOrderData: placeOrderData
        }).then(function (data) {
          /* startDevBlock */

          /* eslint-disable no-console */
          console.log(data, "onvalidatemerchant");
          /* eslint-enable no-console */

          /* endDevBlock */

          if (data !== null && data !== void 0 && data.response) {
            newApplePaySession.completeMerchantValidation(data.response);
          } else {
            jsDPZ.topic("validate.wallet.failure").publish({
              error: new Error("No response body from validate wallet call.")
            });
            onSubmitReject === null || onSubmitReject === void 0 ? void 0 : onSubmitReject({
              reason: "validateWalletResponseFailed"
            });
          }
        })["catch"](function (error) {
          jsDPZ.topic("validate.wallet.failure").publish({
            error: error
          });
        });
      },
      onpaymentmethodselected: function onpaymentmethodselected(event) {
        /* startDevBlock */

        /* eslint-disable no-console */
        console.log(event, "onpaymentmethodselected");
        /* eslint-enable no-console */

        /* endDevBlock */

        newApplePaySession.completePaymentMethodSelection({
          newTotal: applePayConfig.total,
          newLineItem: []
        });
      },
      onshippingcontactselected: function onshippingcontactselected(event) {
        /* startDevBlock */

        /* eslint-disable no-console */
        console.log(event, "onshippingcontactselected");
        /* eslint-enable no-console */

        /* endDevBlock */

        newApplePaySession.completeShippingContactSelection({
          newTotal: applePayConfig.total
        });
      },
      onshippingmethodselected: function onshippingmethodselected(event) {
        /* startDevBlock */

        /* eslint-disable no-console */
        console.log(event, "onshippingmethodselected");
        /* eslint-enable no-console */

        /* endDevBlock */

        newApplePaySession.completeShippingMethodSelection({
          newTotal: applePayConfig.total
        });
      },
      onpaymentauthorized: function onpaymentauthorized(event) {
        /* startDevBlock */

        /* eslint-disable no-console */
        console.log(event, "onpaymentauthorized");
        /* eslint-enable no-console */

        /* endDevBlock */

        $.extend(authorizedResponse, event);
        newApplePaySession.completePayment(ApplePaySession.STATUS_SUCCESS);
        onSubmitResolve === null || onSubmitResolve === void 0 ? void 0 : onSubmitResolve();
      },
      oncancel: function oncancel(event) {
        // Always re-enable the Place Order button
        $(".js-placeOrder:disabled").prop("disabled", false);
        /* startDevBlock */

        /* eslint-disable no-console */

        console.log(event, "oncancel");
        /* eslint-enable no-console */

        /* endDevBlock */

        onSubmitReject === null || onSubmitReject === void 0 ? void 0 : onSubmitReject({
          reason: "applePayCancelled"
        });
      }
    });
  };

  var beginPaymentFlow = function beginPaymentFlow() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        onSubmitResolve = _ref8.onSubmitResolve,
        onSubmitReject = _ref8.onSubmitReject,
        link = _ref8.link,
        placeOrderData = _ref8.placeOrderData;

    setApplePayEventHandlers({
      onSubmitResolve: onSubmitResolve,
      onSubmitReject: onSubmitReject,
      link: link,
      placeOrderData: placeOrderData
    });
    /* startDevBlock */

    /* eslint-disable no-console */

    console.log("begin()");
    /* eslint-enable no-console */

    /* endDevBlock */

    newApplePaySession.begin();
  };

  var getAuthorizedResponse = function getAuthorizedResponse() {
    return authorizedResponse;
  };

  var getApplePayConfig = function getApplePayConfig() {
    return applePayConfig;
  };

  var setApplePayConfig = function setApplePayConfig(config) {
    return applePayConfig = config;
  };

  var getApplePaySession = function getApplePaySession() {
    return newApplePaySession;
  };

  var setApplePaySession = function setApplePaySession(session) {
    return newApplePaySession = session;
  };

  var getApplePayToken = function getApplePayToken() {
    var _authorizedResponse$p = authorizedResponse.payment;
    _authorizedResponse$p = _authorizedResponse$p === void 0 ? {} : _authorizedResponse$p;
    var _authorizedResponse$p2 = _authorizedResponse$p.token,
        applePayToken = _authorizedResponse$p2 === void 0 ? {} : _authorizedResponse$p2;
    return applePayToken;
  };

  return {
    applePayAvailable: applePayAvailable,
    renderApplePayButton: renderApplePayButton,
    beginPaymentFlow: beginPaymentFlow,
    getAuthorizedResponse: getAuthorizedResponse,
    getApplePayConfig: getApplePayConfig,
    setApplePayConfig: setApplePayConfig,
    getApplePaySession: getApplePaySession,
    setApplePaySession: setApplePaySession,
    getApplePayToken: getApplePayToken
  };
});
//# sourceMappingURL=dpz.applePayHelper.js.map
