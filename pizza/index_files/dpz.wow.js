function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.wow", ["dpz.config", "dpz.customer", "dpz.template"], function (_ref, _ref2, dpzTemplate) {
  var getMarketProperty = _ref.getMarketProperty;
  var userStatus = _ref2.userStatus,
      getStatus = _ref2.getStatus;
  var getTranslateContextValue = dpzTemplate.getTranslateContextValue;
  var provider = "WOW";
  var DISABLED_ERROR_MESSAGE = "Wow+ is disabled";
  var accountStatuses = {
    ACCOUNT_ACTIVE: "ACCOUNT_ACTIVE",
    ACCOUNT_CREATION_FAILED: "ACCOUNT_CREATION_FAILED",
    ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
    ACCOUNT_SUSPENDED: "ACCOUNT_SUSPENDED",
    EMAIL_SENDING_FAILED: "EMAIL_SENDING_FAILED",
    EMAIL_VERIFICATION_FAILED: "EMAIL_VERIFICATION_FAILED",
    EMAIL_VERIFICATION_PENDING: "EMAIL_VERIFICATION_PENDING",
    SERVER_ERROR: "SERVER_ERROR"
  };

  var isWowActive = function isWowActive() {
    var _getMarketProperty = getMarketProperty("profile"),
        wowPlusEnabled = _getMarketProperty.wowPlusEnabled;

    return wowPlusEnabled;
  };

  var sendEmail = function sendEmail() {
    return new Promise(function (resolve, reject) {
      if (isWowActive()) {
        jsDPZ.ajax.createAccountForWallet({
          provider: provider
        }).then(resolve).fail(reject);
      } else {
        reject(new Error(DISABLED_ERROR_MESSAGE));
      }
    });
  };

  var verifyEmail = function verifyEmail(_ref3) {
    var token = _ref3.token;
    return new Promise(function (resolve, reject) {
      if (isWowActive()) {
        var _jsDPZ$app$customer$g = jsDPZ.app.customer.getCustomer().data.CustomerID,
            customerId = _jsDPZ$app$customer$g === void 0 ? "" : _jsDPZ$app$customer$g;
        jsDPZ.ajax.verifyEmailForWallet({
          provider: provider,
          data: {
            customerId: customerId,
            token: token
          }
        }).then(resolve).fail(reject);
      } else {
        reject(new Error(DISABLED_ERROR_MESSAGE));
      }
    });
  };

  var getAccountDetails = function getAccountDetails() {
    return new Promise(function (resolve, reject) {
      if (isWowActive()) {
        jsDPZ.ajax.getAccountForWallet({
          provider: provider
        }).then(resolve).fail(reject);
      } else {
        reject(new Error(DISABLED_ERROR_MESSAGE));
      }
    });
  };

  var isStoreEnabledForWallet = function isStoreEnabledForWallet(storeId) {
    return new Promise(function (resolve, reject) {
      if (isWowActive()) {
        jsDPZ.ajax.isStoreEnabledForWallet({
          provider: provider,
          storeId: storeId
        }).then(resolve).fail(function () {
          return resolve({
            enabled: false
          });
        });
      } else {
        reject(new Error(DISABLED_ERROR_MESSAGE));
      }
    });
  };

  var getProviderPreferences = function getProviderPreferences() {
    return new Promise(function (resolve) {
      if (isWowActive()) {
        jsDPZ.ajax.getProviderPreferences({
          provider: provider
        }).then(resolve).fail(function () {
          return resolve({
            showPrompt: false
          });
        });
      } else {
        resolve({
          showPrompt: false
        });
      }
    });
  };

  var setProviderPreferences = function setProviderPreferences() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$showPrompt = _ref4.showPrompt,
        showPrompt = _ref4$showPrompt === void 0 ? true : _ref4$showPrompt;

    return new Promise(function (resolve) {
      if (isWowActive()) jsDPZ.ajax.setProviderPreferences({
        provider: provider,
        data: {
          showPrompt: showPrompt
        }
      }).then(resolve).fail(resolve);else resolve();
    });
  };

  var renderEmailValidationPage = function renderEmailValidationPage(_ref5) {
    var accountStatus = _ref5.accountStatus,
        selector = _ref5.selector;

    require(["customer.components", "dpz.template", "marketconfig/dpz.lang.wowPlus"], function (_ref6, _ref7, wowPlusStrings) {
      var WowPlusEmailVerificationPage = _ref6.WowPlusEmailVerificationPage,
          TranslateContext = _ref6.TranslateContext;
      var contextFixed = _ref7.contextFixed,
          getTranslateContextValue = _ref7.getTranslateContextValue;
      var container = document.querySelector(selector);
      preact.render(preact.h(TranslateContext.Provider, {
        value: getTranslateContextValue(_objectSpread({}, wowPlusStrings))
      }, preact.h(WowPlusEmailVerificationPage, {
        jsDPZ: jsDPZ,
        urlConfig: urlConfig,
        contextFixed: contextFixed,
        accountStatus: accountStatus,
        isAccountCreated: accountStatus === accountStatuses.ACCOUNT_ACTIVE
      })), container);
    });
  };

  var isWowPlusPromotionApplicable = function isWowPlusPromotionApplicable(_ref8) {
    var storeId = _ref8.storeId;
    return new Promise(function (resolve) {
      if (!isWowActive() || getStatus() === userStatus.ANONYMOUS) return resolve(false);
      Promise.all([isStoreEnabledForWallet(storeId), getProviderPreferences(), getAccountDetails()]).then(function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 3),
            enabled = _ref10[0].enabled,
            showPrompt = _ref10[1].showPrompt,
            status = _ref10[2].status;

        resolve(enabled && showPrompt && status === accountStatuses.ACCOUNT_NOT_FOUND);
      })["catch"](function () {
        resolve(false);
      });
    });
  };

  var showAccountCreationModal = function showAccountCreationModal() {
    require(["confirmation.components", "marketconfig/dpz.lang.customer", "marketconfig/dpz.lang.wowPlus"], function (_ref11, customerStrings, wowPlusStrings) {
      var TranslateContext = _ref11.TranslateContext,
          WowCreateAccountPromotionModal = _ref11.WowCreateAccountPromotionModal;

      var closeModal = function closeModal() {
        var closeModalTimeout;

        var unrender = function unrender() {
          preact.render(null, document.querySelector(".js-modalContainer"));
          window.removeEventListener("link", unrender, false);
          clearTimeout(closeModalTimeout);
        };

        window.addEventListener("link", unrender, false);
        closeModalTimeout = setTimeout(unrender, 500);
      };

      preact.render(preact.h(TranslateContext.Provider, {
        value: getTranslateContextValue(_objectSpread(_objectSpread({}, customerStrings), wowPlusStrings))
      }, preact.h(WowCreateAccountPromotionModal, {
        accountEmail: jsDPZ.app.customer.getCustomer().data.Email,
        accountStatuses: accountStatuses,
        closeModal: closeModal,
        preventClosing: true,
        sendEmail: sendEmail,
        setProviderPreferences: setProviderPreferences,
        site: site,
        template: dpzTemplate
      })), document.querySelector(".js-modalContainer"));
    });
  };

  return {
    accountStatuses: accountStatuses,
    getAccountDetails: getAccountDetails,
    isStoreEnabledForWallet: isStoreEnabledForWallet,
    isWowActive: isWowActive,
    isWowPlusPromotionApplicable: isWowPlusPromotionApplicable,
    renderEmailValidationPage: renderEmailValidationPage,
    sendEmail: sendEmail,
    showAccountCreationModal: showAccountCreationModal,
    verifyEmail: verifyEmail
  };
});
//# sourceMappingURL=dpz.wow.js.map
