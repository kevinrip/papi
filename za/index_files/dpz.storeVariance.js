function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.storeVariance", ["dpz.config"], function (_ref) {
  var getMarketProperty = _ref.getMarketProperty;

  var isAfter = function isAfter(d1, d2, unit) {
    return d1.isSame(d2, unit) || d1.isAfter(d2, unit);
  };

  var isBefore = function isBefore(d1, d2, unit) {
    return d1.isSame(d2, unit) || d1.isBefore(d2, unit);
  };

  var getVarianceTime = function getVarianceTime(orderDateTime, varianceTime) {
    var _getMarketProperty$fo = getMarketProperty("date").format,
        SERVER_DATE_TIME_POWER = _getMarketProperty$fo.SERVER_DATE_TIME_POWER,
        SERVER_TIME_SHORT = _getMarketProperty$fo.SERVER_TIME_SHORT;

    if (!orderDateTime) {
      return dayjs(varianceTime, SERVER_TIME_SHORT);
    }

    var _varianceTime$split = varianceTime.split(":"),
        _varianceTime$split2 = _slicedToArray(_varianceTime$split, 2),
        varianceHour = _varianceTime$split2[0],
        varianceMinute = _varianceTime$split2[1];

    return dayjs(orderDateTime, SERVER_DATE_TIME_POWER).set("hour", varianceHour).set("minute", varianceMinute);
  };

  return {
    inVariance: function inVariance(_ref2) {
      var dateTime = _ref2.dateTime,
          variance = _ref2.variance,
          serviceMethod = _ref2.serviceMethod;
      if (!variance) return false;
      var validFrom = variance.validFrom,
          validTo = variance.validTo,
          storeHoursByServiceMethod = variance.storeHoursByServiceMethod;
      var _getMarketProperty$fo2 = getMarketProperty("date").format,
          SERVER_DATE_POWER = _getMarketProperty$fo2.SERVER_DATE_POWER,
          SERVER_DATE_TIME_POWER = _getMarketProperty$fo2.SERVER_DATE_TIME_POWER;
      var currentDateTime = dateTime ? dayjs(dateTime, SERVER_DATE_TIME_POWER) : dayjs();

      var _ref3 = storeHoursByServiceMethod[serviceMethod] || {},
          _ref3$OpenTime = _ref3.OpenTime,
          OpenTime = _ref3$OpenTime === void 0 ? "00:00" : _ref3$OpenTime,
          _ref3$CloseTime = _ref3.CloseTime,
          CloseTime = _ref3$CloseTime === void 0 ? "00:00" : _ref3$CloseTime;

      return isAfter(currentDateTime, dayjs(validFrom, SERVER_DATE_POWER), "day") && isBefore(currentDateTime, dayjs(validTo, SERVER_DATE_POWER), "day") && isAfter(currentDateTime, getVarianceTime(dateTime, OpenTime), "minute") && isBefore(currentDateTime, getVarianceTime(dateTime, CloseTime), "minute");
    }
  };
});
//# sourceMappingURL=dpz.storeVariance.js.map
