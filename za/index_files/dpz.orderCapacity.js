function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.orderCapacity", ["simplr", "dpz.config", "dpz.template"], function (simplr, _ref, template) {
  var getMarketProperty = _ref.getMarketProperty;

  var getNameSpace = function getNameSpace() {
    var serviceMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return "dpz_future_order_capacity_black_list_".concat(serviceMethod.replace("-", "").toLowerCase());
  };

  var getServiceMethod = function getServiceMethod(order) {
    return order.data.Details.ServiceMethod || "";
  };

  var isFutureOrderCapacityEnabled = function isFutureOrderCapacityEnabled() {
    return getMarketProperty("order").isFutureOrderCapacityEnabled;
  };

  var getFutureOrderCapacityBlacklist = function getFutureOrderCapacityBlacklist() {
    var order = jsDPZ.app.order.getOrder();
    var serviceMethod = getServiceMethod(order);
    return isFutureOrderCapacityEnabled() && jsDPZ.dataConversion.JSONStringToObject(site.storage.load(getNameSpace(serviceMethod))) || [];
  };

  var updateFutureOrderCapacityBlacklist = function updateFutureOrderCapacityBlacklist() {
    var order = jsDPZ.app.order.getOrder();
    var store = jsDPZ.app.store.getStore();
    var previousCapacity = getFutureOrderCapacityBlacklist(order);
    var ServiceMethod = order.data.Details.ServiceMethod;
    var _store$data = store.data,
        BusinessDate = _store$data.BusinessDate,
        StoreID = _store$data.StoreID;

    var persistCapacity = function persistCapacity() {
      var futureOrderCapacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      site.storage.save(getNameSpace(ServiceMethod), jsDPZ.dataConversion.JSONObjectToString(futureOrderCapacity));
    };

    return jsDPZ.ajax.getFutureOrderCapacityBlackList({
      storeId: StoreID,
      startDate: BusinessDate,
      serviceMethod: ServiceMethod
    }).then(persistCapacity)["catch"](function () {
      return persistCapacity(previousCapacity);
    });
  };

  var showFutureOrderLimitModal = function showFutureOrderLimitModal(_ref2) {
    var validateOrderOnUpdate = _ref2.validateOrderOnUpdate,
        redirectToOrderOnCancel = _ref2.redirectToOrderOnCancel;
    updateFutureOrderCapacityBlacklist().then(function () {
      require(["order.components", "marketconfig/dpz.lang.locations", "marketconfig/dpz.lang.overlays"], function (_ref3, locationsStrings, overlaysStrings) {
        var FutureOrderLimitModal = _ref3.FutureOrderLimitModal,
            TranslateContext = _ref3.TranslateContext;
        var OrderDateTime = jsDPZ.app.order.getOrder().data.Details.OrderDateTime;
        var _getMarketProperty$fo = getMarketProperty("date").format,
            DATE_TIME = _getMarketProperty$fo.DATE_TIME,
            SERVER_DATE_POWER = _getMarketProperty$fo.SERVER_DATE_POWER,
            SERVER_DATE_TIME_POWER = _getMarketProperty$fo.SERVER_DATE_TIME_POWER,
            SERVER_TIME_POWER = _getMarketProperty$fo.SERVER_TIME_POWER,
            TIME = _getMarketProperty$fo.TIME;
        var nextAvailableDateTime = site.catalogTools.getNextOrderableDateTime(OrderDateTime);

        var chooseDifferentTime = function chooseDifferentTime() {
          if (redirectToOrderOnCancel) {
            jsDPZ.app.customer.getCustomer().data.Session.forceFutureDateSelection = true;
            return site.sessionTools.save().then(function () {
              window.location = "".concat(urlConfig.localRoot, "/pages/order/");
            });
          } else {
            simplr.controller.mRouteAndExecute(site.func.buildURL({
              url: "#!/order/time/view",
              parameters: {
                code: "eOrderDateTimeInvalid"
              }
            }));
          }
        };

        if (nextAvailableDateTime) {
          var dayjsFutureOrdertime = dayjs(OrderDateTime, SERVER_DATE_TIME_POWER);
          var dayjsNextAvailableDateTime = dayjs(nextAvailableDateTime, SERVER_DATE_TIME_POWER);

          var updateTime = function updateTime() {
            simplr.controller.mRouteAndExecute(site.func.buildURL({
              url: "#!/order/time/update",
              parameters: {
                date: dayjsNextAvailableDateTime.format(SERVER_DATE_POWER),
                time: dayjsNextAvailableDateTime.format(SERVER_TIME_POWER),
                validateOrder: validateOrderOnUpdate
              }
            }));
          };

          preact.render(preact.h(TranslateContext.Provider, {
            value: template.getTranslateContextValue(_objectSpread(_objectSpread({}, locationsStrings), overlaysStrings))
          }, preact.h(FutureOrderLimitModal, {
            site: site,
            dpzTemplate: template,
            nextAvailableTimeSlot: dayjsNextAvailableDateTime.format(dayjsNextAvailableDateTime.isAfter(dayjsFutureOrdertime, "day") ? DATE_TIME : TIME),
            chooseNextAvailableSlot: updateTime,
            chooseDifferentTime: chooseDifferentTime,
            serviceMethod: jsDPZ.app.order.getOrder().data.Details.ServiceMethod
          })), document.querySelector(".js-modalContainer"));
        } else {
          chooseDifferentTime();
        }
      });
    });
  };

  return {
    isFutureOrderCapacityEnabled: isFutureOrderCapacityEnabled,
    getFutureOrderCapacityBlacklist: getFutureOrderCapacityBlacklist,
    updateFutureOrderCapacityBlacklist: updateFutureOrderCapacityBlacklist,
    showFutureOrderLimitModal: showFutureOrderLimitModal
  };
});
//# sourceMappingURL=dpz.orderCapacity.js.map
