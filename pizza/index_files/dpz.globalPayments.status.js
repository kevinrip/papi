function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(function () {
  var handlers = {};
  var statusCodes = [];

  var errorHandler = function errorHandler() {};

  var waitingNotificationMessageRendered = false;
  return {
    setStatusCodes: function setStatusCodes(_statusCodes) {
      statusCodes = _statusCodes;
    },
    getStatusCodes: function getStatusCodes(index) {
      return statusCodes[index] || statusCodes;
    },
    setHandlers: function setHandlers(_handlers) {
      $.extend(true, handlers, _handlers);
    },
    getHandlers: function getHandlers() {
      return handlers;
    },
    setErrorHandler: function setErrorHandler(_errorHandler) {
      errorHandler = _errorHandler;
    },
    getErrorHandler: function getErrorHandler() {
      return errorHandler;
    },
    fetch: function fetch(options) {
      var defaultPollInterval = 500;
      var defaultMaxTimeouts = 3;
      var timeoutAttempts = 0;

      if (typeof options.transactionId !== "string") {
        return $.Deferred().reject(new Error("Invalid transaction Id or transaction Id missing"));
      }

      var statusPromise = $.Deferred();

      var alwaysBlock = function alwaysBlock(data, checkStatus) {
        if (options.pollStatus && (data === null || data === void 0 ? void 0 : data.TransactionStatus) === options.pollStatus) {
          setTimeout(checkStatus, options.pollInterval || defaultPollInterval);
        } else if ((data === null || data === void 0 ? void 0 : data.status) === 0 && data.statusText === "timeout" && timeoutAttempts < (options.maxTimeouts || defaultMaxTimeouts)) {
          timeoutAttempts++;
          checkStatus();
        } else {
          statusPromise.resolve(data);
        }
      };

      (function checkStatus() {
        if (options.advancedPayment) {
          options.advancedStatus(options.transactionId, options.paymentDetails).always(function (data) {
            return alwaysBlock(data, checkStatus);
          });
        } else {
          jsDPZ.ajax.globalPaymentStatus(_objectSpread(_objectSpread({}, options), {}, {
            url: options.url(options.transactionId, options.versionNext)
          })).always(function (data) {
            return alwaysBlock(data, checkStatus);
          });
        }
      })();

      return statusPromise;
    },
    handle: function handle(data) {
      var status;

      try {
        status = data.TransactionStatus || data.transactionStatus;

        if (typeof status === "undefined") {
          throw new Error("TransactionStatus is undefined.");
        } else if (!["PENDING", "WAITING_CONFIRMATION", "WAITING_NOTIFICATION"].includes(status)) {
          site.func.toggleLoading("golopayment", false);
        }
      } catch (e) {
        jsDPZ.topic("gpm.transaction_status_error.IOLO-15696").publish({
          error: e,
          customData: data
        });
        /* startDevBlock */

        /* eslint-disable no-console */

        console.error("transaction status undefined");
        console.log(e);
        console.log(data);
        /* eslint-enable no-console */

        /* endDevBlock */
      }

      if (~statusCodes.indexOf(status)) {
        var statusLower = status.toLowerCase();

        if (~statusLower.indexOf("success") || ~statusLower.indexOf("duplicate")) {
          jsDPZ.topic("checkout.priceOrder").publish();
        }

        if (killConfig.isMarketEnabled("dcc5923a-931e-49df-bace-5d7c8b1d0db1") && status === "WAITING_NOTIFICATION" && !waitingNotificationMessageRendered) {
          waitingNotificationMessageRendered = true;

          require(["shared.components", "contexts.components", "marketconfig/dpz.lang.forms", "marketconfig/dpz.lang.payment"], function (_ref, _ref2, formsStrings, paymentStrings) {
            var Modal = _ref.Modal,
                CodeOverlay = _ref.CodeOverlay;
            var withGNOLOContext = _ref2.withGNOLOContext;
            var ModalWithContext = withGNOLOContext(Modal);
            preact.render(preact.h(ModalWithContext, {
              title: dpz.template.translate("forms.attention", null, formsStrings),
              closeButtonClass: "is-hidden"
            }, preact.h(CodeOverlay, {
              codeClass: "errorText",
              message: dpz.template.translate("payment.waiting_notification_message", null, paymentStrings)
            })), document.body);
          });
        } else if (status !== "WAITING_NOTIFICATION") {
          waitingNotificationMessageRendered = false;
          preact.render(null, document.body, document.querySelector(".js-modal"));
        }

        handlers[statusCodes.indexOf(status)](data);
      } else {
        site.func.toggleLoading("golopayment", false);
        errorHandler(new ReferenceError("Status ".concat(status, " has no associated handler.")));
      }
    }
  };
});
//# sourceMappingURL=dpz.globalPayments.status.js.map
