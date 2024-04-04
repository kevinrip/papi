var _excluded = ["transactionId", "transactionParameterKey"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define(["dpz.config", "dpz.customer", "paymentmodules/dpz.globalPayments.constants"], function (_ref, _ref2, _ref3) {
  var getMarketProperty = _ref.getMarketProperty;
  var isProfiled = _ref2.isProfiled;
  var amountStatuses = _ref3.amountStatuses,
      topics = _ref3.topics,
      redirectLandingPages = _ref3.redirectLandingPages,
      transactionStatuses = _ref3.transactionStatuses,
      challengeId = _ref3.challengeId,
      challengeType = _ref3.challengeType;

  var _getMarketProperty = getMarketProperty("payment"),
      _getMarketProperty$no = _getMarketProperty.nonSupportedPayments,
      nonSupportedPayments = _getMarketProperty$no === void 0 ? [] : _getMarketProperty$no,
      _isSplitPaymentsEnabled = _getMarketProperty.splitPayments.enabled;

  var buildRedirectUrl = function buildRedirectUrl(_ref4) {
    var appLinkScheme = _ref4.appLinkScheme,
        paymentProviderId = _ref4.paymentProviderId,
        cartId = _ref4.cartId,
        gpmPaymentType = _ref4.gpmPaymentType,
        gpmPaymentSubType = _ref4.gpmPaymentSubType,
        _ref4$landingPage = _ref4.landingPage,
        landingPage = _ref4$landingPage === void 0 ? redirectLandingPages.PAYMENT : _ref4$landingPage,
        _ref4$isHybrid = _ref4.isHybrid,
        isHybrid = _ref4$isHybrid === void 0 ? false : _ref4$isHybrid;
    var _urlConfig = urlConfig,
        root = _urlConfig.root;
    var marketUrl = getMarketProperty("market-identification").urls[0];
    var appLinkSchemeParam = appLinkScheme ? "&scheme=".concat(encodeURIComponent(appLinkScheme)) : "";
    var hybridParam = isHybrid ? "&hybrid=true" : "";
    return "https://".concat(window.location.hostname).concat(envConfig === "localhost" ? ":8443" : "").concat(root, "/pages/order/").concat(landingPage, "?cartid=").concat(encodeURIComponent(cartId), "&paymentProviderId=").concat(encodeURIComponent(paymentProviderId), "&redirect=payment&marketUrl=").concat(encodeURIComponent(marketUrl), "&gpmPaymentType=").concat(encodeURIComponent(gpmPaymentType), "&gpmPaymentSubType=").concat(encodeURIComponent(gpmPaymentSubType || gpmPaymentType)).concat(appLinkSchemeParam).concat(hybridParam);
  };

  var persistOrder = function persistOrder(orderData) {
    var payLoad = {
      Fulfiller: {
        Groups: []
      }
    };
    return jsDPZ.ajax.sessionSave({
      id: "",
      data: $.extend({}, jsDPZ.app.order.getOrder().data, payLoad),
      async: true
    }).fail(site.func.powerCommunicationError);
  };

  var errorOverlay = function errorOverlay(defaultCode, data) {
    var _data$response;

    var overrideServerMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var messageCode = defaultCode;
    var label = [getMarketProperty("payment").callCenterPhone || site.format.phoneNumber({
      number: jsDPZ.app.store.getStore().data.Phone
    }, "storePhone")];

    if (data !== null && data !== void 0 && (_data$response = data.response) !== null && _data$response !== void 0 && _data$response.responseMessage && !overrideServerMessage) {
      messageCode = "eServerMessage";
      label = "Error Reason: ".concat(jsDPZ.util.htmlEscape(data.response.responseMessage)).concat(data.id ? " <br>Transaction Reference: ".concat(data.id) : "");
    } else if (data !== null && data !== void 0 && data.id && messageCode !== "eCreditCardRefundTriggered") {
      label = [data.id.toString()].concat(_toConsumableArray(label));
    }

    site.func.overlayToggle(true, "codeOverlay", {}, {
      code: messageCode,
      label: label
    }, function () {
      site.func.setupLayerCloseEvents({
        closeSelector: ".js-closeButton",
        layerSelector: ".js-cardOverlay",
        callback: function callback() {
          if (!_isSplitPaymentsEnabled) window.location = "".concat(urlConfig.localRoot, "/pages/order/payment");
        }
      });
    });
    if (messageCode === "eCreditCardRefundTriggered") jsDPZ.topic("order.payment.refund").publish();
  };

  var showIframe = function showIframe(_ref5, gpstatus, module) {
    var transactionId = _ref5.transactionId,
        _ref5$transactionPara = _ref5.transactionParameterKey,
        transactionParameterKey = _ref5$transactionPara === void 0 ? "codTrans" : _ref5$transactionPara,
        data = _objectWithoutProperties(_ref5, _excluded);

    var iFrameClosed = false;
    site.func.overlayToggle(true, "iFrameOverlay", {
      keepCentered: false,
      xPos: 1,
      yPos: 1
    }, _objectSpread({}, data), function () {
      function iFrameCloseHandler(evt) {
        var evtOrig = evt.originalEvent;
        if (evtOrig.origin !== window.location.origin || typeof evtOrig.data !== "string") return;

        var _ref6 = JSON.parse(evtOrig.data || {}) || {},
            message = _ref6.message,
            _ref6$params = _ref6.params,
            iFrameParameters = _ref6$params === void 0 ? "" : _ref6$params;

        if (message !== "signal.iFrameCloseEvent") {
          return;
        }

        $(window).off("message", iFrameCloseHandler);
        iFrameClosed = true;
        var queryParameters = Object.fromEntries(new URLSearchParams(iFrameParameters)) || {};
        var gpgsTransactionId = transactionId !== null && transactionId !== void 0 ? transactionId : queryParameters[transactionParameterKey];
        site.func.overlayToggle(false);
        site.func.toggleLoading("golopayment", true);
        gpstatus.fetch($.extend({}, module.checkStatusAjaxSettings, {
          transactionId: gpgsTransactionId,
          pollStatus: transactionStatuses.WAITING_CONFIRMATION
        })).always(function (statusdata) {
          gpstatus.handle(statusdata);
        });
      }

      $(window).on("message", iFrameCloseHandler); // center the iFrameOverlay upon render

      $(window).trigger("scroll.layer"); // 15-minute timeout

      setTimeout(function () {
        if (!iFrameClosed) {
          site.func.overlayToggle(false);
          window.location.reload();
        }
      }, 9e5);
    });
  };

  var isContactlessEnabled = function isContactlessEnabled() {
    var serviceMethod = jsDPZ.app.order.getOrder().data.Details.ServiceMethod;
    return killConfig.isMarketEnabled("contactless-".concat(serviceMethod.toLowerCase(), "-orders"));
  };

  var bindAvailableContactless = function bindAvailableContactless(availablePayments, isContactlessEnabled, onToggledContactless) {
    var store = jsDPZ.app.store.getStore();
    var order = jsDPZ.app.order.getOrder();
    var _store$data = store.data,
        ContactlessCarryout = _store$data.ContactlessCarryout,
        ContactlessDelivery = _store$data.ContactlessDelivery;
    var ServiceMethod = order.data.Details.ServiceMethod;
    var isDelivery = ServiceMethod === "Delivery";
    var contactlessOption = isDelivery ? ContactlessDelivery : ContactlessCarryout;

    if (isContactlessEnabled && contactlessOption === "AVAILABLE" && availablePayments.length) {
      document.removeEventListener("toggledContactless", onToggledContactless);
      document.addEventListener("toggledContactless", onToggledContactless);
    }
  };

  var fetchCards = function fetchCards(_ref7) {
    var _ref7$canUseCards = _ref7.canUseCards,
        canUseCards = _ref7$canUseCards === void 0 ? true : _ref7$canUseCards,
        isProfiled = _ref7.isProfiled,
        provider = _ref7.provider;
    return isProfiled && canUseCards ? new Promise(function (resolve, reject) {
      jsDPZ.app.customer.getCustomer().fetchCreditCard().then(function (cards) {
        if (provider) resolve(cards.filter(function (card) {
          return Array.isArray(provider) ? provider.includes(card.provider) : card.provider === provider;
        }));else resolve(cards);
      })["catch"](function () {
        return reject([]);
      });
    }) : Promise.resolve([]);
  };

  var getGPMTransactionNumber = function getGPMTransactionNumber(_ref8) {
    var _ref8$payment = _ref8.payment,
        paymentTransactionNumber = _ref8$payment.gpmTransactionNumber,
        Type = _ref8$payment.Type,
        orderTransactionNumber = _ref8.order.gpmTransactionNumber;

    if (_isSplitPaymentsEnabled && nonSupportedPayments.includes(Type.toLowerCase())) {
      return paymentTransactionNumber;
    } else {
      return orderTransactionNumber;
    }
  };

  var setGPMTransactionId = function setGPMTransactionId(_ref9) {
    var gpmTransactionId = _ref9.gpmTransactionId;
    jsDPZ.util.sessionStorage("gpmTransactionNumber", gpmTransactionId);
  };

  var addPaymentIntent = function addPaymentIntent(intent) {
    jsDPZ.topic(topics.NEW_INTENT).publish(intent);
  };

  var removePaymentIntent = function removePaymentIntent(intent) {
    jsDPZ.topic(topics.DELETE_INTENT).publish(intent);
  };

  var onProviderSelectionUpdate = function onProviderSelectionUpdate(_ref10) {
    var intent = _ref10.intent,
        selected = _ref10.selected;
    if (selected) addPaymentIntent(intent);else removePaymentIntent(intent);
  };

  var bindSplitPaymentEvents = function bindSplitPaymentEvents(_ref11) {
    var module = _ref11.module;

    if (_isSplitPaymentsEnabled) {
      var unsubscribeOnRender = function unsubscribeOnRender() {
        jsDPZ.topic(topics.RENDER_CHECKOUT).unsubscribe(unsubscribeOnRender);
        jsDPZ.topic(topics.UPDATE_PROVIDERS).unsubscribe(module.updateProviders);
        jsDPZ.topic(topics.START_TRANSACTION).unsubscribe(module.startTransaction);
        if (module.continueTransaction) jsDPZ.topic(topics.CONTINUE_TRANSACTION).unsubscribe(module.continueTransaction);
      };

      jsDPZ.topic(topics.UPDATE_PROVIDERS).unsubscribe(module.updateProviders).subscribe(module.updateProviders);
      jsDPZ.topic(topics.START_TRANSACTION).unsubscribe(module.startTransaction).subscribe(module.startTransaction);
      if (module.continueTransaction) jsDPZ.topic(topics.CONTINUE_TRANSACTION).unsubscribe(module.continueTransaction).subscribe(module.continueTransaction);
      jsDPZ.topic(topics.RENDER_CHECKOUT).subscribe(unsubscribeOnRender);
    }
  };

  var getHasIntentsOrTransactions = function getHasIntentsOrTransactions(_ref12) {
    var _ref12$providers = _ref12.providers,
        providers = _ref12$providers === void 0 ? [] : _ref12$providers;
    return providers.some(function () {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref13$amounts = _ref13.amounts;

      _ref13$amounts = _ref13$amounts === void 0 ? [] : _ref13$amounts;

      var _ref13$amounts2 = _slicedToArray(_ref13$amounts, 1),
          status = _ref13$amounts2[0].status;

      return [amountStatuses.SELECTED, amountStatuses.IN_PROGRESS].includes(status);
    });
  };

  var getChallengeResponses = function getChallengeResponses() {
    var isProfiledUser = isProfiled();
    var isConfigOTPVerificationEnabled = getMarketProperty("customerVerification").otpVerification.enabled;
    var isProfiledOTPVerificationEnabled = isProfiledUser && killConfig.isMarketEnabled("d45149bb-c7ff-4349-95ac-2f5c13efdb12") && isConfigOTPVerificationEnabled;
    var isGuestOTPVerificationEnabled = !isProfiledUser && killConfig.isMarketEnabled("e31589e3-4302-4467-9700-537c970111fc") && isConfigOTPVerificationEnabled;
    var hasOTPVerificationEnabled = isProfiledOTPVerificationEnabled || isGuestOTPVerificationEnabled;
    var verificationCode = jsDPZ.app.customer.getCustomer().data.Session.verificationCode;
    return hasOTPVerificationEnabled && verificationCode ? {
      challengeResponses: [{
        type: challengeType.OTP,
        id: challengeId.OTP,
        code: verificationCode
      }]
    } : {};
  };

  var createTransaction = function createTransaction(_ref14) {
    var sessionId = _ref14.sessionId,
        transactions = _ref14.transactions,
        transaction = _ref14.transaction;
    jsDPZ.ajax.createPaymentSessionTransaction({
      sessionId: sessionId,
      data: {
        transactions: transactions
      }
    }).then(jsDPZ.topic(topics.UPDATE_TRANSACTION).publish, function () {
      return jsDPZ.topic(topics.UPDATE_TRANSACTION).publish(_objectSpread(_objectSpread({}, transaction), {}, {
        status: transaction.ERROR
      }));
    });
  };

  return {
    addPaymentIntent: addPaymentIntent,
    bindAvailableContactless: bindAvailableContactless,
    bindSplitPaymentEvents: bindSplitPaymentEvents,
    buildRedirectUrl: buildRedirectUrl,
    createTransaction: createTransaction,
    errorOverlay: errorOverlay,
    fetchCards: fetchCards,
    getGPMTransactionNumber: getGPMTransactionNumber,
    getHasIntentsOrTransactions: getHasIntentsOrTransactions,
    isContactlessEnabled: isContactlessEnabled,
    isSplitPaymentsEnabled: function isSplitPaymentsEnabled() {
      return _isSplitPaymentsEnabled;
    },
    onProviderSelectionUpdate: onProviderSelectionUpdate,
    getChallengeResponses: getChallengeResponses,
    persistOrder: persistOrder,
    redirectLandingPages: redirectLandingPages,
    removePaymentIntent: removePaymentIntent,
    setGPMTransactionId: setGPMTransactionId,
    showIframe: showIframe
  };
});
//# sourceMappingURL=dpz.globalPayments.funcs.js.map
