function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.orderTiming", ["dpz.config", "simplr", "dpz.duc"], function (config, simplr, _ref) {
  var deleteDucCoupons = _ref.deleteDucCoupons;

  var checkFutureTimeAvailability = function checkFutureTimeAvailability(serviceMethod, serviceMethodsObject) {
    switch (serviceMethod) {
      case "Carryout":
      case "Pick-Up":
      case "Carside":
        return checkFutureTimeCarryoutAvailability(serviceMethod, serviceMethodsObject);

      case "Delivery":
      case "Hotspot":
        return checkFutureTimeDeliveryAvailability(serviceMethod, serviceMethodsObject);

      default:
        return false;
    }
  };

  var checkFutureTimeCarryoutAvailability = function checkFutureTimeCarryoutAvailability(serviceMethod, serviceMethodsObject) {
    return serviceMethodsObject.carryout[serviceMethod].isAvailable;
  };

  var checkFutureTimeDeliveryAvailability = function checkFutureTimeDeliveryAvailability(serviceMethod, serviceMethodsObject) {
    return serviceMethodsObject.delivery[serviceMethod].isAvailable;
  };

  var timeTo12 = function timeTo12(time) {
    var TIME_TO_12 = config.getMarketProperty("date").format.TIME_TO_12;
    return dayjs(time, "HHmm").format(TIME_TO_12);
  };

  var timeToHourMinuteSecond = function timeToHourMinuteSecond(time) {
    var SERVER_TIME_POWER = config.getMarketProperty("date").format.SERVER_TIME_POWER;
    return dayjs(time, "HHmm").format(SERVER_TIME_POWER);
  };
  /**
   * this method make ajax request to new service endpoint and returns a promise that is resolved with data or an empty array
   * @method: getTimeIntervalsForServiceMethodAtFutureDate
   * @param {Object} options config has shape of {storeId, interval, date, time} for ajax call
   * @returns {Promise} return an array of available future times or empty array if there is an error or no future times available
   */


  var getTimeIntervalsForServiceMethodAtFutureDate = function getTimeIntervalsForServiceMethodAtFutureDate() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return jsDPZ.ajax.getAvailableServiceMethodsForFutureDate(options).then(function (data) {
      var _data$intervals;

      var futureTimeIntervals = [];
      var isCarryoutOrder = jsDPZ.app.order.getOrder().isCarryoutOrder();
      var serviceMethod = isCarryoutOrder ? "Carryout" : "Delivery";

      var isFutureTimeAvailable = function isFutureTimeAvailable(futureTime) {
        return checkFutureTimeAvailability(serviceMethod, futureTime);
      };

      futureTimeIntervals = (_data$intervals = data.intervals) === null || _data$intervals === void 0 ? void 0 : _data$intervals.filter(isFutureTimeAvailable);
      return futureTimeIntervals.map(function (_ref2) {
        var startTime = _ref2.startTime;
        return {
          disabled: false,
          label: timeTo12(startTime),
          value: timeToHourMinuteSecond(startTime)
        };
      });
    })["catch"](function () {
      return [];
    });
  };
  /**
   * This method makes ajax request to new store-service endpoint and returns a promise that is resolved with
   * eligible service methods or an empty array
   * @method: getAvailableServiceMethodsAtFutureDate
   * @param {Object} options config has shape of {storeId, interval, date, time} for ajax call
   * @returns {Promise} return a map of all service methods or empty object if no service methods or an error
   * Ex. {
   *       Carryout: true
   *       Carside: false
   *       Delivery: true
   *       Hotspot: false
   *       Pick-Up: true
   *     }
   */


  var getAvailableServiceMethodsAtFutureDate = function getAvailableServiceMethodsAtFutureDate() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return jsDPZ.ajax.getAvailableServiceMethodsForFutureDate(options).then(function (_ref3) {
      var intervals = _ref3.intervals;

      var _ref4 = intervals[0] || {},
          carryout = _ref4.carryout,
          delivery = _ref4.delivery;

      var serviceMethods = _objectSpread(_objectSpread({}, carryout), delivery);

      var availabilityMap = {};
      Object.keys(serviceMethods).map(function (method) {
        return availabilityMap[method] = serviceMethods[method].isAvailable;
      });
      return availabilityMap;
    })["catch"](function () {
      return {};
    });
  };

  var getIsInsideDucHours = function getIsInsideDucHours(orderableDateTime) {
    var availableServiceMethods = jsDPZ.app.store.getStore().getAvailableServiceMethods({
      dtString: orderableDateTime
    });
    return availableServiceMethods.includes("DriveUpCarryout");
  };

  var getAllowFutureDucOrder = function getAllowFutureDucOrder() {
    return config.getMarketProperty("order").allowFutureDucOrder && killConfig.isMarketEnabled("61b28d53-5a6b-4d67-912f-06c1768f135a");
  };

  var getSelectedFutureTime = function getSelectedFutureTime() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var futureSelectedTime = $(".js-future-time option:selected", selector).val();
    if (jsDPZ.util.empty(futureSelectedTime)) return;
    var _config$getMarketProp = config.getMarketProperty("date").format,
        SERVER_TIME_POWER = _config$getMarketProp.SERVER_TIME_POWER,
        FUTURE_ORDER_TIME = _config$getMarketProp.FUTURE_ORDER_TIME;
    return dayjs(futureSelectedTime, SERVER_TIME_POWER).format(FUTURE_ORDER_TIME);
  };

  var getAvailabilityInterval = function getAvailabilityInterval(selectedFutureTime, data) {
    return data.intervals.find(function (interval) {
      return interval.startTime === selectedFutureTime;
    });
  };

  var toggleVisibility = function toggleVisibility() {
    var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var isVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    $(className).toggleClass("is-hidden", !isVisible);
  };

  var toggleVisibilityAll = function toggleVisibilityAll() {
    var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var isVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (classNames.length !== isVisible.length) return;
    classNames.forEach(function (className, index) {
      return toggleVisibility(className, isVisible[index]);
    });
  };

  var closeAll = function closeAll() {
    var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classNames.forEach(function (className) {
      return toggleVisibility(className, false);
    });
  };

  var openAll = function openAll() {
    var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classNames.forEach(function (className) {
      return toggleVisibility(className, true);
    });
  };

  var renderFutureOrderAttentionPopup = function renderFutureOrderAttentionPopup(_ref5) {
    var _ref5$orderableDateTi = _ref5.orderableDateTime,
        orderableDateTime = _ref5$orderableDateTi === void 0 ? null : _ref5$orderableDateTi,
        _ref5$validateOrder = _ref5.validateOrder,
        validateOrder = _ref5$validateOrder === void 0 ? false : _ref5$validateOrder;

    var openFutureTime = function openFutureTime() {
      simplr.controller.mRouteAndExecute(site.func.buildURL({
        url: "#!/order/time/view",
        parameters: {}
      }));
    };

    var submitFutureTime = function submitFutureTime() {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      simplr.controller.mRouteAndExecute(site.func.buildURL({
        url: "#!/order/time/update",
        parameters: {
          date: date,
          time: time
        }
      }));
    };

    var changeDucToCarryout = function changeDucToCarryout(_ref6) {
      var _ref6$orderableDateTi = _ref6.orderableDateTime,
          orderableDateTime = _ref6$orderableDateTi === void 0 ? null : _ref6$orderableDateTi,
          _ref6$validateOrder = _ref6.validateOrder,
          validateOrder = _ref6$validateOrder === void 0 ? false : _ref6$validateOrder;
      site.func.changeServiceMethod("Carryout");
      deleteDucCoupons({
        validateOrder: validateOrder
      });

      if (!jsDPZ.util.empty(orderableDateTime)) {
        var _orderableDateTime$sp = orderableDateTime === null || orderableDateTime === void 0 ? void 0 : orderableDateTime.split(" "),
            _orderableDateTime$sp2 = _slicedToArray(_orderableDateTime$sp, 2),
            date = _orderableDateTime$sp2[0],
            time = _orderableDateTime$sp2[1];

        submitFutureTime(date, time);
      } else {
        submitFutureTime();
      }
    };

    require(["dpz.template", "order.components", "marketconfig/dpz.lang.overlays"], function (_ref7, _ref8, overlayStrings) {
      var getTranslateContextValue = _ref7.getTranslateContextValue,
          contextFixed = _ref7.contextFixed;
      var TranslateContext = _ref8.TranslateContext,
          FutureOrderAttentionPopup = _ref8.FutureOrderAttentionPopup;
      preact.render(preact.h(TranslateContext.Provider, {
        value: getTranslateContextValue(overlayStrings)
      }, preact.h(FutureOrderAttentionPopup, {
        jsDPZ: jsDPZ,
        site: site,
        openFutureTime: openFutureTime,
        changeDucToCarryout: changeDucToCarryout,
        contextFixed: contextFixed,
        orderableDateTime: orderableDateTime,
        validateOrder: validateOrder
      })), document.querySelector(".js-modalContainer"));
    });
  };

  var renderFutureOrderAttentionPopupIfOutsideDucHour = function renderFutureOrderAttentionPopupIfOutsideDucHour(_ref9) {
    var _ref9$validateOrder = _ref9.validateOrder,
        validateOrder = _ref9$validateOrder === void 0 ? false : _ref9$validateOrder;
    var orderableDateTime = jsDPZ.app.order.getOrder().data.Details.OrderDateTime;

    if (!getIsInsideDucHours(orderableDateTime)) {
      renderFutureOrderAttentionPopup({
        orderableDateTime: orderableDateTime,
        validateOrder: validateOrder
      });
    }
  };

  var getServiceMethodTimings = function getServiceMethodTimings() {
    var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref10$Min = _ref10.Min,
        Min = _ref10$Min === void 0 ? 0 : _ref10$Min,
        _ref10$Max = _ref10.Max,
        Max = _ref10$Max === void 0 ? 0 : _ref10$Max;

    return {
      Min: Min,
      Max: Max,
      Avg: Math.round(parseFloat((Min + Max) / 2))
    };
  };

  return {
    timeTo12: timeTo12,
    timeToHourMinuteSecond: timeToHourMinuteSecond,
    checkFutureTimeAvailability: checkFutureTimeAvailability,
    getAvailableServiceMethodsAtFutureDate: getAvailableServiceMethodsAtFutureDate,
    getTimeIntervalsForServiceMethodAtFutureDate: getTimeIntervalsForServiceMethodAtFutureDate,
    getIsInsideDucHours: getIsInsideDucHours,
    getAllowFutureDucOrder: getAllowFutureDucOrder,
    getSelectedFutureTime: getSelectedFutureTime,
    getAvailabilityInterval: getAvailabilityInterval,
    getServiceMethodTimings: getServiceMethodTimings,
    toggleVisibility: toggleVisibility,
    toggleVisibilityAll: toggleVisibilityAll,
    closeAll: closeAll,
    openAll: openAll,
    renderFutureOrderAttentionPopup: renderFutureOrderAttentionPopup,
    renderFutureOrderAttentionPopupIfOutsideDucHour: renderFutureOrderAttentionPopupIfOutsideDucHour
  };
});
//# sourceMappingURL=dpz.orderTiming.js.map
