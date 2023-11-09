function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define("dpz.customerWallet", ["dpz.customer", "dpz.config", "dpz.template", "dpz.profile", "site.funcs", "simplr", "marketconfig/dpz.lang.coupons", "marketconfig/dpz.lang.customer", "marketconfig/dpz.lang.general"], function (_ref, _ref2, _ref3, _ref4, _ref5, simplr, couponsStrings, customerStrings, generalStrings) {
  var getStatus = _ref.getStatus,
      isProfiled = _ref.isProfiled,
      _ref$userStatus = _ref.userStatus,
      LOGGED_IN = _ref$userStatus.LOGGED_IN,
      REMEMBERED = _ref$userStatus.REMEMBERED;
  var getMarketProperty = _ref2.getMarketProperty;
  var getTranslateContextValue = _ref3.getTranslateContextValue;
  var ADD_COUPON = _ref4.successCommands.ADD_COUPON;
  var _ref5$func = _ref5.func,
      buildURL = _ref5$func.buildURL,
      getCurrentBreakpoint = _ref5$func.getCurrentBreakpoint;
  var cachedCoupons;
  var cachedFilteredCouponsCount;
  var module = {
    isEnabled: killConfig.isMarketEnabled("gnolo.isCustomerWalletEnabled"),
    getPersonalCoupons: function getPersonalCoupons() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        filterOrderCoupons: false
      },
          _ref6$filterOrderCoup = _ref6.filterOrderCoupons,
          filterOrderCoupons = _ref6$filterOrderCoup === void 0 ? false : _ref6$filterOrderCoup;

      if (isProfiled()) {
        return $.when(cachedCoupons || jsDPZ.ajax.getPersonalCoupons()).then(function (coupons) {
          var orderCoupons = $.extend(true, [], jsDPZ.app.order.getOrder().data.Details.Coupons);
          cachedCoupons = coupons;
          if (!filterOrderCoupons) return coupons;
          return coupons.reduce(function (nonUsedCoupons, coupon) {
            var usedCouponIndex = orderCoupons.findIndex(function (_ref7) {
              var Code = _ref7.Code;
              return Code === coupon.data.Code;
            });

            if (usedCouponIndex >= 0) {
              orderCoupons.splice(usedCouponIndex, 1);
              return nonUsedCoupons;
            }

            return [].concat(_toConsumableArray(nonUsedCoupons), [coupon]);
          }, []);
        });
      }

      return $.Deferred(function (_ref8) {
        var reject = _ref8.reject;
        return reject("This feature is not enabled or user is not signed in");
      });
    },
    renderProfileWalletInColumn: function renderProfileWalletInColumn() {
      if (isProfiled() && site.data.inOrderFunnel && jsDPZ.app.order.getOrder().data.Details.StoreID && !site.isPaymentPage && !site.isConfirmationPage) {
        module.getPersonalCoupons({
          filterOrderCoupons: true
        }).then(function (coupons) {
          require(["order.components"], function (_ref9) {
            var OrderProfileWallet = _ref9.OrderProfileWallet,
                TranslateContext = _ref9.TranslateContext;
            var into = document.querySelector(".js-orderProfileWallet".concat(getCurrentBreakpoint() === "handheld" ? "Handheld" : ""));

            var addCoupon = function addCoupon(code) {
              var url = buildURL({
                url: "#!/order/coupons/new",
                parameters: {
                  code: code,
                  qty: 1,
                  eCoupon: true
                }
              });
              var userLoggedInStatus = getStatus();

              if (userLoggedInStatus === LOGGED_IN) {
                simplr.controller.mRouteAndExecute(url);
              } else if (userLoggedInStatus === REMEMBERED) {
                site.func.showLoginPopup({
                  successCommand: ADD_COUPON,
                  couponCode: code,
                  eCoupon: true
                });
              }
            };

            if (into) {
              preact.render(preact.h(TranslateContext.Provider, {
                value: getTranslateContextValue(_objectSpread(_objectSpread(_objectSpread({}, couponsStrings), customerStrings), generalStrings))
              }, coupons && coupons.length ? // END CA
              preact.h(OrderProfileWallet, {
                coupons: coupons,
                addCoupon: addCoupon,
                getMarketProperty: getMarketProperty,
                jsDPZ: jsDPZ // BEGIN CA - Remove "E-Coupon" section when signed in customer does not have any E-Coupons

              }) : null), into);
            }
          });
        });
      }
    },
    updateCouponNumber: function updateCouponNumber() {
      module.getPersonalCoupons({
        filterOrderCoupons: true
      }).then(function (coupons) {
        if (cachedFilteredCouponsCount !== coupons.length) {
          site.func.updateMinorNavigation();
          module.renderProfileWalletInColumn();
          cachedFilteredCouponsCount = coupons.length;
        }
      });
    },
    unrenderProfileWalletInColumn: function unrenderProfileWalletInColumn() {
      if (isProfiled() && site.data.inOrderFunnel && !site.isPaymentPage && !site.isConfirmationPage) {
        var unrender = function unrender(element) {
          return preact.render(null, element);
        };

        [".js-orderProfileWallet", ".js-orderProfileWalletHandheld"].map(document.querySelector).filter(Boolean).forEach(unrender);
      }
    },
    cleanWallet: function cleanWallet() {
      cachedFilteredCouponsCount = null;
      module.unrenderProfileWalletInColumn();
    },
    orderHasCoupons: function orderHasCoupons() {
      return $.when(module.getPersonalCoupons(), module.getPersonalCoupons({
        filterOrderCoupons: true
      })).then(function () {
        var allCoupons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var nonUsedCoupons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        return allCoupons.length !== nonUsedCoupons.length;
      });
    },
    init: function init() {
      $(document).on(["/order/validate/", "/order/price/", "/order/variant/new/", "/order/variant/edit/", "/order/variant/delete/"].join(" "), module.updateCouponNumber);
      $(document).on("customerLogin.success", module.renderProfileWalletInColumn);
      $(document).on("customerLogout", module.cleanWallet);
    }
  };
  return module;
});
//# sourceMappingURL=dpz.customerWallet.js.map
