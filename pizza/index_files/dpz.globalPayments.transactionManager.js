var _excluded = ["valid", "providers"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("paymentmodules/dpz.globalPayments.transactionManager", ["simplr", "dpz.config", "dpz.template", "site.funcs", "paymentmodules/dpz.globalPayments.constants", "paymentmodules/dpz.globalPayments.funcs"], function (simplr, _ref, _ref2, _ref3, _ref4, _ref5) {
  var getMarketProperty = _ref.getMarketProperty;
  var formatMoney = _ref2.formatMoney,
      getTranslateContextValue = _ref2.getTranslateContextValue;
  var toggleLoading = _ref3.func.toggleLoading;
  var amountStatuses = _ref4.amountStatuses,
      amountTypes = _ref4.amountTypes,
      amountTypesOrder = _ref4.amountTypesOrder,
      ERROR_TAG = _ref4.ERROR_TAG,
      errorStatuses = _ref4.errorStatuses,
      _ref4$nonRefundableEr = _ref4.nonRefundableErrorStatuses,
      nonRefundableErrorStatuses = _ref4$nonRefundableEr === void 0 ? [] : _ref4$nonRefundableEr,
      nonRefundableProviders = _ref4.nonRefundableProviders,
      paymentTypeMappers = _ref4.paymentTypeMappers,
      _ref4$pendingStatuses = _ref4.pendingStatuses,
      pendingStatuses = _ref4$pendingStatuses === void 0 ? [] : _ref4$pendingStatuses,
      _ref4$placingOrderSta = _ref4.placingOrderStatuses,
      placingOrderStatuses = _ref4$placingOrderSta === void 0 ? [] : _ref4$placingOrderSta,
      _ref4$refundableError = _ref4.refundableErrorStatuses,
      refundableErrorStatuses = _ref4$refundableError === void 0 ? [] : _ref4$refundableError,
      _ref4$refundMessageCo = _ref4.refundMessageCodes,
      refundMessageCodes = _ref4$refundMessageCo === void 0 ? {} : _ref4$refundMessageCo,
      SESSION_STORAGE = _ref4.SESSION_STORAGE,
      topics = _ref4.topics,
      transactionStatuses = _ref4.transactionStatuses,
      _ref4$waitingStatuses = _ref4.waitingStatuses,
      waitingStatuses = _ref4$waitingStatuses === void 0 ? [] : _ref4$waitingStatuses;
  var errorOverlay = _ref5.errorOverlay;
  var INTENTS_STORAGE_KEY = "dpzPaymentIntents";
  var _getMarketProperty$sp = getMarketProperty("payment").splitPayments,
      _getMarketProperty$sp2 = _getMarketProperty$sp.allowsRemainderReplacement,
      allowsRemainderReplacement = _getMarketProperty$sp2 === void 0 ? false : _getMarketProperty$sp2,
      _getMarketProperty$sp3 = _getMarketProperty$sp.enabled,
      enabled = _getMarketProperty$sp3 === void 0 ? false : _getMarketProperty$sp3,
      _getMarketProperty$sp4 = _getMarketProperty$sp.forceCancellationOnError,
      forceCancellationOnError = _getMarketProperty$sp4 === void 0 ? false : _getMarketProperty$sp4,
      _getMarketProperty$sp5 = _getMarketProperty$sp.nonSupportedPayments,
      nonSupportedPayments = _getMarketProperty$sp5 === void 0 ? [] : _getMarketProperty$sp5,
      placeOrderConfig = _getMarketProperty$sp.placeOrder,
      _getMarketProperty$sp6 = _getMarketProperty$sp.sessionPollingWaitMillis,
      sessionPollingWaitMillis = _getMarketProperty$sp6 === void 0 ? 5000 : _getMarketProperty$sp6,
      _getMarketProperty$sp7 = _getMarketProperty$sp.showRemainingBalanceAmount,
      showRemainingBalanceAmount = _getMarketProperty$sp7 === void 0 ? true : _getMarketProperty$sp7,
      _getMarketProperty$sp8 = _getMarketProperty$sp.transactionPollingWaitMillis,
      transactionPollingWaitMillis = _getMarketProperty$sp8 === void 0 ? 1000 : _getMarketProperty$sp8;
  var session = null;
  var transactionIntents = [];
  var transactions = [];
  var lastKnownRemainders = {};
  var canResumeTransactions = false;
  var isSelectMoreOptionsVisible = false;
  var paymentFormErrorSelector = ".js-paymentFormError";

  var isEnabled = function isEnabled() {
    return enabled;
  };

  var setSession = function setSession(paymentSession) {
    session = paymentSession;
    jsDPZ.util.sessionStorage(SESSION_STORAGE, paymentSession.id);
    return session;
  };

  var resetSession = function resetSession() {
    session = null;
    transactionIntents = [];
    transactions = [];
    lastKnownRemainders = {};
    jsDPZ.util.sessionStorage(SESSION_STORAGE, "");
    jsDPZ.util.sessionStorage(INTENTS_STORAGE_KEY, "[]");
  };

  var createSession = function createSession() {
    return new Promise(function (resolve, reject) {
      var setPaymentSession = function setPaymentSession(paymentSession) {
        setSession(paymentSession);
        resolve(session);
      };

      var logError = function logError(error) {
        return jsDPZ.topic(topics.LOG_ERROR).publish({
          tags: ["".concat(ERROR_TAG, ".create-session")],
          error: error
        });
      };

      site.func.getOrderForPowerData().then(function (orderRequest) {
        jsDPZ.ajax.createPaymentSession({
          data: {
            order: {
              orderRequest: orderRequest
            }
          },
          placeOrder: _objectSpread({}, placeOrderConfig)
        }).then(setPaymentSession).fail(function (error) {
          logError(error);

          if (error.status > 400) {
            jsDPZ.ajax.createPaymentSession({
              data: {
                order: {
                  id: jsDPZ.app.order.getOrder().data.Details.OrderID
                }
              },
              placeOrder: _objectSpread({}, placeOrderConfig)
            }).then(setPaymentSession).fail(function (error) {
              logError(error);
              reject(error);
            });
          } else {
            reject(error);
          }
        });
      });
    });
  };

  var _getSession = function getSession(sessionId) {
    return new Promise(function (resolve, reject) {
      return jsDPZ.ajax.getPaymentSession({
        sessionId: sessionId
      }).then(function (paymentSession) {
        setSession(paymentSession);
        resolve(session);
      }).fail(function (error) {
        if ((error === null || error === void 0 ? void 0 : error.status) === 404) {
          resetSession();
          createSession().then(resolve)["catch"](reject);
        } else {
          jsDPZ.topic(topics.LOG_ERROR).publish({
            tags: "".concat(ERROR_TAG, ".get-session"),
            error: error
          });
          reject(error);
        }
      });
    });
  };

  var _cancelSession = function cancelSession() {
    var _session;

    var sessionId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (_session = session) === null || _session === void 0 ? void 0 : _session.id;
    return new Promise(function (resolve) {
      jsDPZ.ajax.cancelPaymentSession({
        sessionId: sessionId
      }).then(function () {
        resetSession();
        resolve();
      }).fail(function (error) {
        jsDPZ.topic(topics.LOG_ERROR).publish({
          tags: "".concat(ERROR_TAG, ".cancel-session"),
          error: error
        });
        resetSession();
        resolve();
      });
    });
  };

  var getSessionId = function getSessionId() {
    var _session2;

    return ((_session2 = session) === null || _session2 === void 0 ? void 0 : _session2.id) || jsDPZ.util.sessionStorage(SESSION_STORAGE);
  };

  var getSessionProviders = function getSessionProviders(_ref6) {
    var _ref6$transactions = _ref6.transactions,
        providerTransactions = _ref6$transactions === void 0 ? [] : _ref6$transactions;
    return new Promise(function (resolve, reject) {
      var _ref7 = session || {},
          _ref7$id = _ref7.id,
          sessionId = _ref7$id === void 0 ? "" : _ref7$id;

      jsDPZ.ajax.getPaymentSessionProviders({
        sessionId: sessionId,
        data: {
          transactions: providerTransactions.map(function (transaction) {
            return transaction;
          })
        }
      }).then(resolve).fail(function (error) {
        jsDPZ.topic(topics.LOG_ERROR).publish({
          tags: ["".concat(ERROR_TAG, ".get-session")],
          error: error
        });
        reject(error);
      });
    });
  };

  var getTransactions = function getTransactions() {
    return new Promise(function (resolve, reject) {
      var _ref8 = session || {},
          _ref8$id = _ref8.id,
          sessionId = _ref8$id === void 0 ? "" : _ref8$id;

      jsDPZ.ajax.getPaymentSessionTransactions({
        sessionId: sessionId
      }).then(function (_ref9) {
        var serverTransactions = _ref9.transactions;
        transactions = serverTransactions;
        resolve(transactions);
      }).fail(function (error) {
        jsDPZ.topic(topics.LOG_ERROR).publish({
          tags: ["".concat(ERROR_TAG, ".get-transactions")],
          error: error
        });
        reject(error);
      });
    });
  };

  var getTransaction = function getTransaction(_ref10) {
    var transactionId = _ref10.transactionId;
    return new Promise(function (resolve, reject) {
      jsDPZ.ajax.getPaymentTransaction({
        transactionId: transactionId
      }).then(resolve).fail(reject);
    });
  };

  var updateOrder = function updateOrder(_ref11) {
    var order = _ref11.order;

    var _ref12 = session || {},
        _ref12$id = _ref12.id,
        sessionId = _ref12$id === void 0 ? "" : _ref12$id;

    return new Promise(function (resolve) {
      if (transactions.length) resolve(session);else jsDPZ.ajax.updatePaymentSessionOrder({
        sessionId: sessionId,
        data: {
          Order: order.Order
        }
      }).then(function (updatedSession) {
        session = updatedSession;
        resolve(session);
      });
    });
  };

  var updateProviders = function updateProviders(_ref13) {
    var _ref13$complete = _ref13.complete,
        complete = _ref13$complete === void 0 ? false : _ref13$complete,
        _ref13$providers = _ref13.providers,
        providers = _ref13$providers === void 0 ? [] : _ref13$providers,
        remainingBalance = _ref13.remainingBalance,
        _ref13$valid = _ref13.valid,
        valid = _ref13$valid === void 0 ? false : _ref13$valid;
    canResumeTransactions = valid && complete;

    if (valid) {
      var isSelected = function isSelected(_ref14) {
        var status = _ref14.status;
        return amountStatuses.SELECTED === status;
      };

      transactionIntents = providers.filter(function (_ref15) {
        var _ref15$amounts = _ref15.amounts,
            amounts = _ref15$amounts === void 0 ? [] : _ref15$amounts;
        return amounts.some(isSelected);
      }).map(function (_ref16) {
        var id = _ref16.id,
            amounts = _ref16.amounts;
        return amounts.filter(isSelected).map(function (amount) {
          return {
            providerId: id,
            amount: amount
          };
        });
      }).flat();
      jsDPZ.topic(topics.UPDATE_PROVIDERS).publish({
        complete: complete,
        lastKnownRemainders: lastKnownRemainders,
        providers: providers,
        transactions: transactions
      });

      var _ref17 = transactionIntents.find(function (_ref18) {
        var type = _ref18.amount.type;
        return type === amountTypes.REMAINDER;
      }) || {},
          _ref17$amount = _ref17.amount;

      _ref17$amount = _ref17$amount === void 0 ? {} : _ref17$amount;
      var selectedRemainderAmount = _ref17$amount.amount;
      var remainingBalanceAmount = showRemainingBalanceAmount && selectedRemainderAmount ? selectedRemainderAmount : remainingBalance;
      var numbersFormat = getMarketProperty("numbers");
      $(".js-remainingBalanceAmount").text(formatMoney(remainingBalanceAmount, numbersFormat));
      var selectMoreOptionsContainer = document.querySelector(paymentFormErrorSelector);

      if (isSelectMoreOptionsVisible && canResumeTransactions && selectMoreOptionsContainer) {
        isSelectMoreOptionsVisible = false;
        preact.render(null, selectMoreOptionsContainer);
      }
    }
  };

  var updateLastKnownRemainder = function updateLastKnownRemainder(listProvidersData) {
    var providers = listProvidersData.providers,
        valid = listProvidersData.valid;

    var hasTypeAvailable = function hasTypeAvailable(_ref19, amountType) {
      var _ref19$amounts = _ref19.amounts,
          amounts = _ref19$amounts === void 0 ? [] : _ref19$amounts;
      return amounts.some(function (_ref20) {
        var type = _ref20.type,
            status = _ref20.status;
        return status === amountStatuses.AVAILABLE && type === amountType;
      });
    };

    if (valid && providers.some(function (provider) {
      return hasTypeAvailable(provider, amountTypes.REMAINDER);
    }) && allowsRemainderReplacement) {
      lastKnownRemainders = providers.reduce(function (lastKnownRemainders, provider) {
        return _objectSpread(_objectSpread({}, lastKnownRemainders), {}, _defineProperty({}, provider.id, provider.enabled && (hasTypeAvailable(provider, amountTypes.REMAINDER) || hasTypeAvailable(provider, amountTypes.WHOLE_ORDER))));
      }, {});
    }

    return listProvidersData;
  };

  var cleanIntentsWithErrors = function cleanIntentsWithErrors(_ref21) {
    var valid = _ref21.valid,
        providers = _ref21.providers,
        listProvidersData = _objectWithoutProperties(_ref21, _excluded);

    if (valid) return _objectSpread({
      valid: valid,
      providers: providers
    }, listProvidersData);
    return getSessionProviders({
      transactions: []
    });
  };

  var createIntent = function createIntent(intent) {
    var _intent$amount, _intent$amount2;

    var isRemainder = function isRemainder(type) {
      return type === amountTypes.REMAINDER;
    };

    var isWholeOrder = function isWholeOrder(type) {
      return type === amountTypes.WHOLE_ORDER;
    };

    var intents = transactionIntents;

    if (allowsRemainderReplacement && isRemainder((_intent$amount = intent.amount) === null || _intent$amount === void 0 ? void 0 : _intent$amount.type)) {
      intents = [].concat(_toConsumableArray(transactionIntents.filter(function (_ref22) {
        var _ref22$amount = _ref22.amount;
        _ref22$amount = _ref22$amount === void 0 ? {} : _ref22$amount;
        var type = _ref22$amount.type;
        return !isRemainder(type) && !isWholeOrder(type);
      })), [intent]);
    } else if (isWholeOrder((_intent$amount2 = intent.amount) === null || _intent$amount2 === void 0 ? void 0 : _intent$amount2.type)) {
      intents = [intent];
    } else {
      intents = [].concat(_toConsumableArray(transactionIntents), [intent]);
    }

    getSessionProviders({
      transactions: _toConsumableArray(intents)
    }).then(cleanIntentsWithErrors).then(updateLastKnownRemainder).then(updateProviders);
  };

  var resetIntents = function resetIntents() {
    getSessionProviders({
      transactions: []
    }).then(cleanIntentsWithErrors).then(updateLastKnownRemainder).then(updateProviders);
  };

  var deleteIntent = function deleteIntent(_ref23) {
    var providerId = _ref23.providerId,
        _ref23$amount = _ref23.amount;
    _ref23$amount = _ref23$amount === void 0 ? {} : _ref23$amount;
    var type = _ref23$amount.type;
    transactionIntents = transactionIntents.filter(function (intent) {
      return intent.providerId !== providerId || intent.amount.type !== type;
    });
    getSessionProviders({
      transactions: _toConsumableArray(transactionIntents)
    }).then(cleanIntentsWithErrors).then(updateLastKnownRemainder).then(updateProviders);
  };

  var persistIntents = function persistIntents(_ref24) {
    var _ref24$transactionInt = _ref24.transactionIntents,
        transactionIntents = _ref24$transactionInt === void 0 ? [] : _ref24$transactionInt;
    jsDPZ.util.sessionStorage(INTENTS_STORAGE_KEY, transactionIntents);
  };

  var loadIntents = function loadIntents() {
    transactionIntents = JSON.parse(jsDPZ.util.sessionStorage(INTENTS_STORAGE_KEY) || "[]");
  };

  var transactionToIntent = function transactionToIntent(_ref25) {
    var providerId = _ref25.providerId,
        amount = _ref25.amount;
    jsDPZ.topic(topics.NEW_INTENT).publish({
      providerId: providerId,
      amount: amount
    });
  };

  var handleTransactionError = function handleTransactionError(_ref26) {
    var _WOW, _providerStatusMessag;

    var onError = _ref26.onError,
        transaction = _ref26.transaction;
    var providerId = transaction.providerId,
        status = transaction.status;
    var providerStatusMessages = {
      WOW: (_WOW = {}, _defineProperty(_WOW, transactionStatuses.DECLINED, "eWowPaymentAuthorizationFailed"), _defineProperty(_WOW, transactionStatuses.TECHNICAL_ERROR, "eWowPaymentAuthorizationFailed"), _WOW)
    };
    var providerMessage = ((_providerStatusMessag = providerStatusMessages[providerId]) === null || _providerStatusMessag === void 0 ? void 0 : _providerStatusMessag[status]) || "";
    $(".js-placeOrder").prop("disabled", false);

    if (transactions.some(function (_ref27) {
      var status = _ref27.status;
      return !errorStatuses.includes(status);
    })) {
      require(["payment.components", "marketconfig/dpz.lang.forms", "marketconfig/dpz.lang.payment"], function (_ref28, formsStrings, paymentStrings) {
        var SplitPaymentTransactionErrorModal = _ref28.SplitPaymentTransactionErrorModal,
            TranslateContext = _ref28.TranslateContext;
        var placeOrderFailed = status === transactionStatuses.PLACE_ORDER_FAILED;
        var refundMessageCode = placeOrderFailed ? refundMessageCodes.PLACE_ORDER_FAILED_WITH_REFUND : refundMessageCodes.PAYMENT_SESSION_CANCELLED_WITH_REFUND;
        var checkoutCommandUrl = "/payment/checkout/?createNewPaymentSession=true&showRefundMessage=true&refundMessageCode=".concat(refundMessageCode);

        if (status === transactionStatuses.PLACE_ORDER_FAILED) {
          resetSession();
          simplr.controller.mRouteAndExecute(checkoutCommandUrl);
          jsDPZ.topic("order.payment.refund").publish();
        } else if (forceCancellationOnError) {
          _cancelSession().then(function () {
            jsDPZ.topic("order.payment.refund").publish();
            simplr.controller.mRouteAndExecute(checkoutCommandUrl);
          });
        } else {
          site.func.toggleLoading("golopayment", false);
          preact.render(preact.h(TranslateContext.Provider, {
            value: getTranslateContextValue(_objectSpread(_objectSpread({}, formsStrings), paymentStrings))
          }, preact.h(SplitPaymentTransactionErrorModal, {
            site: site,
            cancelSession: function cancelSession() {
              _cancelSession().then(function () {
                jsDPZ.topic("order.payment.refund").publish();
                simplr.controller.mRouteAndExecute(checkoutCommandUrl);
              });
            },
            choosePayment: function choosePayment() {
              transactionToIntent(transaction);
              onError === null || onError === void 0 ? void 0 : onError();
            }
          })), document.body);
        }
      });
    } else {
      site.func.toggleLoading("golopayment", false);
      transactionToIntent(transaction);

      if ([transactionStatuses.DECLINED, transactionStatuses.AUTHORIZATION_FAILED].includes(status)) {
        errorOverlay(providerMessage || "ePaymentDeclined", transaction);
      } else if (status === transactionStatuses.CANCELLED) {
        errorOverlay(providerMessage || "ePaymentCancelled", transaction);
      } else if (nonRefundableErrorStatuses.includes(status) || nonRefundableProviders.includes(providerId)) {
        errorOverlay(providerMessage || "ePaymentTechnicalError", transaction);
      } else if (refundableErrorStatuses.includes(status)) {
        errorOverlay(providerMessage || "eCreditCardRefundTriggered", transaction);
        jsDPZ.topic("order.payment.refund").publish();
      }

      onError === null || onError === void 0 ? void 0 : onError();
    }
  };

  var waitForPlaceOrder = function waitForPlaceOrder(_ref29) {
    var id = _ref29.id,
        transaction = _ref29.transaction;

    _getSession(id).then(function (_ref30) {
      var Order = _ref30.order.orderRequest.Order,
          status = _ref30.status;

      if (status === transactionStatuses.SUCCESS) {
        var Payments = transactions.filter(function (_ref31) {
          var status = _ref31.status;
          return !errorStatuses.includes(status);
        }).map(function (_ref32) {
          var transactionId = _ref32.id,
              amount = _ref32.amount,
              gratuity = _ref32.gratuity,
              providerId = _ref32.providerId,
              transactionMerchant = _ref32.transactionMerchant;
          return {
            Type: paymentTypeMappers[providerId] || providerId,
            Amount: amount === null || amount === void 0 ? void 0 : amount.amount,
            TipAmount: gratuity === null || gratuity === void 0 ? void 0 : gratuity.amount,
            CardType: "",
            sessionId: id,
            transactionId: transactionId,
            gpmTransactionNumber: transactionMerchant || transactionId || id
          };
        });
        resetSession();

        require(["dpz.placeorder"], function (placeOrder) {
          placeOrder.success($.extend(true, {}, {
            Order: _objectSpread(_objectSpread({}, Order), {}, {
              Payments: []
            })
          }, {
            Order: {
              Payments: Payments
            },
            Details: {
              StoreOrderID: Order.StoreOrderID
            }
          }));
        });
      } else if (status === transactionStatuses.PLACE_ORDER_STARTED) {
        window.setTimeout(function () {
          return waitForPlaceOrder({
            id: id,
            transaction: transaction
          });
        }, sessionPollingWaitMillis);
      } else if (status === transactionStatuses.PLACE_ORDER_FAILED) {
        handleTransactionError(transaction);
      }
    });
  };

  var resumeTransactions = function resumeTransactions() {
    var _ref33 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref33$validate = _ref33.validate,
        validate = _ref33$validate === void 0 ? false : _ref33$validate;

    if (validate && !canResumeTransactions) {
      $(".js-placeOrder").prop("disabled", false);

      require(["payment.components", "marketconfig/dpz.lang.payment"], function (_ref34, paymentStrings) {
        var TranslateContext = _ref34.TranslateContext,
            ErrorNotification = _ref34.ErrorNotification;
        isSelectMoreOptionsVisible = true;
        var container = document.querySelector(paymentFormErrorSelector);
        if (container) preact.render(preact.h(TranslateContext.Provider, {
          value: getTranslateContextValue(_objectSpread({}, paymentStrings))
        }, preact.h(ErrorNotification, {
          translationKey: "payment.select_more_payment_options"
        })), container);
      });
    } else {
      var _ref35 = session || {},
          _ref35$id = _ref35.id,
          sessionId = _ref35$id === void 0 ? "" : _ref35$id;

      var sortByTypePriority = function sortByTypePriority(_ref36, _ref37) {
        var a = _ref36.amount.type;
        var z = _ref37.amount.type;
        return amountTypesOrder[a] - amountTypesOrder[z];
      };

      var getIsPendingTransaction = function getIsPendingTransaction(_ref38) {
        var status = _ref38.status;
        return status === !status || pendingStatuses.includes(status);
      };

      var getIsFailedTransaction = function getIsFailedTransaction(_ref39) {
        var status = _ref39.status;
        return errorStatuses.includes(status);
      };

      var _ref40 = [].concat(_toConsumableArray(transactions.filter(getIsPendingTransaction)), _toConsumableArray(transactionIntents.sort(sortByTypePriority))),
          nextIntent = _ref40[0],
          intents = _ref40.slice(1);

      if (nextIntent) {
        var isTransactionIntent = function isTransactionIntent(_ref41) {
          var id = _ref41.id;
          return !id;
        };

        transactionIntents = intents.filter(isTransactionIntent);

        if (isTransactionIntent(nextIntent)) {
          jsDPZ.topic(topics.START_TRANSACTION).publish(_objectSpread(_objectSpread({}, nextIntent), {}, {
            sessionId: sessionId
          }));
        } else {
          var status = nextIntent.status,
              waitingForUser = nextIntent.waitingForUser;
          persistIntents({
            transactionIntents: transactionIntents
          });

          if (status === transactionStatuses.WAITING_CONFIRMATION || waitingForUser) {
            jsDPZ.topic(topics.CONTINUE_TRANSACTION).publish(_objectSpread(_objectSpread({}, nextIntent), {}, {
              sessionId: sessionId
            }));
          } else {
            jsDPZ.topic(topics.UPDATE_TRANSACTION).publish({
              transactions: [nextIntent]
            });
          }
        }
      } else if (transactions.length && transactions.every(function (_ref42) {
        var status = _ref42.status;
        return status === transactionStatuses.SUCCESS;
      })) {
        waitForPlaceOrder({
          id: getSessionId(),
          transaction: transactions[transactions.length - 1]
        });
      } else if (transactions.some(getIsFailedTransaction)) {
        handleTransactionError({
          transaction: transactions.reverse().find(getIsFailedTransaction)
        });
      }
    }
  };

  var updateTransaction = function updateTransaction(_ref43) {
    var onError = _ref43.onError,
        _ref43$transactions = _slicedToArray(_ref43.transactions, 1),
        transaction = _ref43$transactions[0];

    transactions = transactions.some(function (_ref44) {
      var id = _ref44.id;
      return id === transaction.id;
    }) ? transactions.map(function (internalTransaction) {
      return internalTransaction.id === transaction.id ? transaction : internalTransaction;
    }) : [].concat(_toConsumableArray(transactions), [transaction]);

    if (transaction.status === transactionStatuses.DUPLICATE_ORDER) {
      require(["dpz.placeorder"], function (placeOrder) {
        toggleLoading("golopayment", false);
        placeOrder.duplicateOrderHandler();
      });
    } else if (errorStatuses.includes(transaction.status)) {
      handleTransactionError({
        transaction: transaction,
        onError: onError
      });
    } else if ([transactionStatuses.PENDING, transactionStatuses.WAITING_NOTIFICATION].includes(transaction.status) && !transaction.waitingForUser) {
      window.setTimeout(function () {
        return jsDPZ.ajax.getPaymentTransaction({
          transactionId: transaction.id
        }).then(function (transaction) {
          return updateTransaction({
            transactions: [transaction]
          });
        });
      }, transactionPollingWaitMillis);
    } else if (transaction.status === transactionStatuses.PAYMENT_COMPLETED) {
      resumeTransactions();
    } else if (placingOrderStatuses.includes(transaction.status)) {
      waitForPlaceOrder({
        id: getSessionId(),
        transaction: transaction
      });
    } else if (waitingStatuses.includes(transaction.status) && !transaction.waitingForUser) {
      window.setTimeout(function () {
        return getTransaction({
          transactionId: transaction.id
        }).then(function (transaction) {
          return updateTransaction({
            transactions: [transaction]
          });
        });
      }, transactionPollingWaitMillis);
    } else if (transaction.status === transactionStatuses.WAITING_CONFIRMATION || transaction.waitingForUser) {
      jsDPZ.topic(topics.CONTINUE_TRANSACTION).publish(_objectSpread({}, transaction));
    }
  };

  var getArePaymentSupported = function getArePaymentSupported(_ref45) {
    var payments = _ref45.payments;
    return payments.every(function (_ref46) {
      var gpmPaymentType = _ref46.gpmPaymentType;
      return !nonSupportedPayments.includes(gpmPaymentType);
    });
  };

  jsDPZ.topic(topics.NEW_INTENT).subscribe(createIntent);
  jsDPZ.topic(topics.DELETE_INTENT).subscribe(deleteIntent);
  jsDPZ.topic(topics.RESET_INTENTS).subscribe(resetIntents);
  jsDPZ.topic(topics.UPDATE_TRANSACTION).subscribe(updateTransaction);
  /* startDevBlock */
  // eslint-disable-next-line no-console

  jsDPZ.topic(topics.UPDATE_PROVIDERS).subscribe(console.log);
  /* endDevBlock */

  return {
    cancelSession: _cancelSession,
    getArePaymentSupported: getArePaymentSupported,
    getSession: function getSession() {
      var _ref47 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref47$sessionId = _ref47.sessionId,
          sessionId = _ref47$sessionId === void 0 ? "" : _ref47$sessionId;

      if (session) return Promise.resolve(session);else if (sessionId) return _getSession(sessionId);else return createSession();
    },
    getSessionId: getSessionId,
    getSessionProviders: getSessionProviders,
    getTransactions: getTransactions,
    isTransactionManagerEnabled: isEnabled,
    loadIntents: loadIntents,
    resetSession: resetSession,
    resumeTransactions: resumeTransactions,
    updateLastKnownRemainder: updateLastKnownRemainder,
    updateOrder: updateOrder
  };
});
//# sourceMappingURL=dpz.globalPayments.transactionManager.js.map
