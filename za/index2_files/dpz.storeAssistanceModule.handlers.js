function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.storeAssistanceModule.handlers", ["dpz.goloDuc", "dpz.storeAssistanceModule.constants", "dpz.storeAssistanceModule.props", "dpz.storeAssistanceModule.state", "simplr"], function (_ref, _ref2, _ref3, _ref4, _ref5) {
  var getIsGoloDucOrderingEnabled = _ref.getIsGoloDucOrderingEnabled;
  var SERVICE_METHODS = _ref2.SERVICE_METHODS,
      RADIO_NAMES = _ref2.RADIO_NAMES;
  var getServiceMethodFromOrder = _ref3.getServiceMethodFromOrder;
  var setState = _ref4.setState,
      sessionOptions = _ref4.sessionOptions;
  var _ref5$controller = _ref5.controller,
      mData = _ref5$controller.mData,
      mAddBases = _ref5$controller.mAddBases,
      mRouteAndExecute = _ref5$controller.mRouteAndExecute;

  var changePageUrl = function changePageUrl(serviceMethod, ctx) {
    window.location.href = "".concat(ctx, "/pages/order/#!/locations/search/?type=").concat(serviceMethod);
  };

  var validatePrice = function validatePrice() {
    if (!mData().Bases.order) mAddBases(["order"]);
    mRouteAndExecute(site.func.buildURL({
      url: "#!/order/validate/"
    }));
  };

  var getIsInvalidServiceMethodForCouponError = function getIsInvalidServiceMethodForCouponError(_ref6) {
    var Code = _ref6.Code;
    return Code === "InvalidServiceMethodForCoupon";
  };

  var getHasInvalidServiceMethodForCouponError = function getHasInvalidServiceMethodForCouponError(_ref7) {
    var StatusItems = _ref7.StatusItems;
    return StatusItems.some(getIsInvalidServiceMethodForCouponError);
  };

  var getHandleOrderValidate = function getHandleOrderValidate(ctx) {
    return function (_ref8) {
      var _payload$Order;

      var payload = _ref8.payload;
      var couponHasError = payload === null || payload === void 0 ? void 0 : (_payload$Order = payload.Order) === null || _payload$Order === void 0 ? void 0 : _payload$Order.Coupons.some(getHasInvalidServiceMethodForCouponError);
      var isOnOrderingPage = window.location.href.includes("/pages/order/");
      if (couponHasError && !isOnOrderingPage) window.location.href = "".concat(ctx, "/pages/order/#!/section/Food/category/AllEntrees/");
    };
  };

  var handleServiceMethodChangeInSam = function handleServiceMethodChangeInSam(_ref9) {
    var closeAction = _ref9.closeAction,
        ctx = _ref9.ctx,
        serviceMethod = _ref9.serviceMethod;
    closeAction();
    var handleOrderValidate = getHandleOrderValidate(ctx);
    $(document).one("/order/validate/ /order/price/", handleOrderValidate); // if delivery we bump them to the location page

    var isDelivery = serviceMethod === SERVICE_METHODS.DELIVERY;
    var isDCD = serviceMethod === SERVICE_METHODS.DCD;
    var isGoloDuc = isDCD && getIsGoloDucOrderingEnabled();
    var callback = null;
    var nextServiceMethod = serviceMethod;
    if (isDelivery) return changePageUrl(serviceMethod, ctx);

    if (getIsGoloDucOrderingEnabled()) {
      delete jsDPZ.app.customer.getCustomer().data.Session.CurbsidePickup;
    }

    switch (serviceMethod) {
      case SERVICE_METHODS.DCD:
        callback = function callback() {
          if (isGoloDuc) {
            jsDPZ.app.customer.getCustomer().data.Session.CurbsidePickup = true;
          } else {
            jsDPZ.app.order.getOrder().data = _objectSpread(_objectSpread(_objectSpread({}, jsDPZ.app.order.getOrder().data), sessionOptions), {}, {
              isDucOrder: true,
              // Set to NOW order time
              Details: _objectSpread(_objectSpread({}, jsDPZ.app.order.getOrder().data.Details), {}, {
                OrderDateTime: ""
              })
            });
          }

          setState(_objectSpread(_objectSpread({}, sessionOptions), {}, {
            isDucOrder: true,
            serviceMethod: getServiceMethodFromOrder({
              serviceMethodDetail: serviceMethod,
              isDucOrder: true
            })
          })); // handle date form on menu page.

          mRouteAndExecute(site.func.buildURL({
            url: "#!/order/time/update"
          }));
          site.sessionTools.save();
        };

        nextServiceMethod = SERVICE_METHODS.CARRYOUT;
        break;

      case SERVICE_METHODS.PICKUP_WINDOW:
        callback = function callback() {
          delete jsDPZ.app.customer.getCustomer().getSessionData().CurbsidePickup;
          jsDPZ.app.order.getOrder().data = _objectSpread(_objectSpread(_objectSpread({}, jsDPZ.app.order.getOrder().data), sessionOptions), {}, {
            isPickupOrder: true
          });
          setState(_objectSpread(_objectSpread({}, sessionOptions), {}, {
            isPickupOrder: true,
            serviceMethod: getServiceMethodFromOrder({
              isPickupOrder: true,
              serviceMethodDetail: serviceMethod
            })
          }));
          site.sessionTools.save();
        };

        nextServiceMethod = SERVICE_METHODS.CARRYOUT;
        break;

      default:
        callback = function callback() {
          jsDPZ.app.order.getOrder().data = _objectSpread(_objectSpread({}, jsDPZ.app.order.getOrder().data), sessionOptions);
          setState(_objectSpread(_objectSpread({}, sessionOptions), {}, {
            serviceMethod: serviceMethod
          }));
          site.sessionTools.save();
        };

        break;
    }

    var onServiceMethodChange = function onServiceMethodChange() {
      var _site$func, _site$func$renderProf;

      callback();
      (_site$func = site.func) === null || _site$func === void 0 ? void 0 : (_site$func$renderProf = _site$func.renderProfileInColumn) === null || _site$func$renderProf === void 0 ? void 0 : _site$func$renderProf.call(_site$func);
      jsDPZ.topic("storeAssistanceModule.updated").publish();
      validatePrice();
    };

    site.func.handleServiceMethodChange(nextServiceMethod, null, onServiceMethodChange);
  };

  var handleInactiveClick = function handleInactiveClick(_ref10) {
    var isMobile = _ref10.isMobile,
        ctx = _ref10.ctx;

    if (isMobile || !killConfig.isMarketEnabled("homePageStoreLocator")) {
      window.location.href = "".concat(ctx, "/pages/order/#!/locations/search");
    } else {
      var locatorWidget = document.querySelector(".js-StoreLocatorWidget");
      locatorWidget.classList.toggle("is-hidden");

      if (!locatorWidget.classList.contains("is-hidden")) {
        var _$$;

        (_$$ = $(".js-storeLocatorClose")[0]) === null || _$$ === void 0 ? void 0 : _$$.focus();
      }
    }
  };

  return {
    handleServiceMethodChangeInSam: handleServiceMethodChangeInSam,
    handleInactiveClick: handleInactiveClick,
    getServiceMethodFromOrder: getServiceMethodFromOrder
  };
});
//# sourceMappingURL=dpz.storeAssistanceModule.handlers.js.map
