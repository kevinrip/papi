function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define("dpz.orderHistory.message", function () {
  var COUPON_SWAPPED = "CouponSwapped";
  var PRODUCT_REMOVED = "RemovedProduct";
  var PRODUCT_SWAPPED = "ProductSwapped";
  var TOPPING_REMOVED = "InvalidOptionPartRemoved";
  var TOPPING_UPDATED = "UpdatedToppingWeight";
  var INFORMATIONAL = "Informational";
  var MESSAGE_CATEGORIES = [COUPON_SWAPPED, PRODUCT_REMOVED, PRODUCT_SWAPPED, TOPPING_REMOVED, TOPPING_UPDATED, INFORMATIONAL];

  var getMessage = function getMessage(all, _ref) {
    var Message = _ref.Message,
        MessageCategory = _ref.MessageCategory;
    var isSupported = MESSAGE_CATEGORIES.includes(MessageCategory);
    if (!isSupported) return all;
    return [].concat(_toConsumableArray(all), [Message]);
  };

  var getMessages = function getMessages(messages) {
    return messages.reduce(getMessage, []);
  };

  var getHasMessage = function getHasMessage(_ref2) {
    var OrderMessages = _ref2.OrderMessages;
    var messages = getMessages(OrderMessages);
    return !!messages.length;
  };

  var renderMessage = function renderMessage(_ref3) {
    var handleChange = _ref3.handleChange,
        OrderMessages = _ref3.order.OrderMessages;
    return require(["dpz.template", "shared.components", "marketconfig/dpz.lang.general"], function (_ref4, _ref5, translations) {
      var getTranslateContextValue = _ref4.getTranslateContextValue;
      var OrderHistoryMessageModal = _ref5.OrderHistoryMessageModal,
          TranslateContext = _ref5.TranslateContext;

      var onClose = function onClose() {
        return handleChange(true);
      };

      var messages = getMessages(OrderMessages);
      var props = {
        onClose: onClose,
        messages: messages,
        site: site
      };

      var modal = function modal() {
        return preact.h(OrderHistoryMessageModal, _extends({
          modalQuid: "order-history-message-modal"
        }, props));
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

  var SESSION_KEY = "hasSeenOrderHistoryMessage";

  var getSessionData = function getSessionData() {
    return jsDPZ.app.customer.getCustomer().getSessionData();
  };

  var setHasSeenOrderHistoryMessage = function setHasSeenOrderHistoryMessage() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    return new Promise(function (resolve) {
      var session = getSessionData();
      session[SESSION_KEY] = value;
      site.sessionTools.save().then(resolve);
    });
  };

  var getHasSeenOrderHistoryMessage = function getHasSeenOrderHistoryMessage() {
    var session = getSessionData();
    return session[SESSION_KEY];
  };

  return {
    getHasMessage: getHasMessage,
    getHasSeenOrderHistoryMessage: getHasSeenOrderHistoryMessage,
    renderMessage: renderMessage,
    setHasSeenOrderHistoryMessage: setHasSeenOrderHistoryMessage
  };
});
//# sourceMappingURL=dpz.orderHistory.message.js.map
