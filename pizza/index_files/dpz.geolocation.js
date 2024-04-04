define("dpz.geolocation", function () {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  };

  var module = {
    cacheLocation: function cacheLocation(position) {
      var coords = $.extend({}, position.coords);
      var pos = $.extend({}, position, {
        coords: coords
      });
      jsDPZ.app.customer.getCustomer().data.Session.cachedPosition = pos;
      return site.sessionTools.save();
    },
    getUserLocation: function getUserLocation() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          lowAccuracy = _ref.lowAccuracy,
          _ref$highAccuracyTime = _ref.highAccuracyTimeout,
          highAccuracyTimeout = _ref$highAccuracyTime === void 0 ? 3000 : _ref$highAccuracyTime,
          _ref$lowAccuracyTimeo = _ref.lowAccuracyTimeout,
          lowAccuracyTimeout = _ref$lowAccuracyTimeo === void 0 ? 7000 : _ref$lowAccuracyTimeo,
          _ref$maximumAge = _ref.maximumAge,
          maximumAge = _ref$maximumAge === void 0 ? 0 : _ref$maximumAge;

      var currentPosition = $.Deferred(function (promise) {
        var cachePosition = function cachePosition(position) {
          module.cacheLocation(position).then(function () {
            promise.resolve(position);
          });
        }; // We will try to get the position from gps otherwise we
        // fallback to the network one


        var getLowAccuracyPosition = function getLowAccuracyPosition() {
          return navigator.geolocation.getCurrentPosition(cachePosition, promise.reject, {
            enableHighAccuracy: false,
            timeout: lowAccuracyTimeout,
            maximumAge: maximumAge
          });
        };

        var getHighAccuracyPosition = function getHighAccuracyPosition() {
          return navigator.geolocation.getCurrentPosition(cachePosition, getLowAccuracyPosition, {
            enableHighAccuracy: true,
            timeout: highAccuracyTimeout,
            maximumAge: maximumAge
          });
        };

        if (lowAccuracy) {
          getLowAccuracyPosition();
        } else {
          getHighAccuracyPosition();
        }
      });
      var cachedPosition = jsDPZ.app.customer.getCustomer().data.Session.cachedPosition ? jsDPZ.app.customer.getCustomer().data.Session.cachedPosition : currentPosition;
      return {
        cached: cachedPosition,
        current: currentPosition
      };
    },
    handleLocationChange: function handleLocationChange(callback, position) {
      callback(position);
    },
    watchUserLocation: function watchUserLocation() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          lowAccuracy = _ref2.lowAccuracy,
          _ref2$highAccuracyTim = _ref2.highAccuracyTimeout,
          highAccuracyTimeout = _ref2$highAccuracyTim === void 0 ? 3000 : _ref2$highAccuracyTim,
          _ref2$lowAccuracyTime = _ref2.lowAccuracyTimeout,
          lowAccuracyTimeout = _ref2$lowAccuracyTime === void 0 ? 7000 : _ref2$lowAccuracyTime,
          _ref2$maximumAge = _ref2.maximumAge,
          maximumAge = _ref2$maximumAge === void 0 ? 0 : _ref2$maximumAge;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var currentPosition = $.Deferred(function (promise) {
        var cachePosition = function cachePosition(position) {
          module.handleLocationChange(callback, position);
          module.cacheLocation(position).then(function () {
            promise.resolve(position);
          });
        };

        var handleSuccessfulPermission = function handleSuccessfulPermission(position) {
          cachePosition(position);
        }; // We will try to get the position from gps otherwise we
        // fallback to the network one


        var watchLowAccuracyPosition = function watchLowAccuracyPosition() {
          return navigator.geolocation.watchPosition(cachePosition, promise.reject, {
            enableHighAccuracy: false,
            timeout: lowAccuracyTimeout,
            maximumAge: maximumAge
          });
        };

        var watchHighAccuracyPosition = function watchHighAccuracyPosition() {
          return navigator.geolocation.watchPosition(handleSuccessfulPermission, watchLowAccuracyPosition, {
            enableHighAccuracy: true,
            timeout: highAccuracyTimeout,
            maximumAge: maximumAge
          });
        };

        if (lowAccuracy) {
          watchLowAccuracyPosition();
        } else {
          watchHighAccuracyPosition();
        }
      });
      var cachedPosition = jsDPZ.app.customer.getCustomer().data.Session.cachedPosition ? jsDPZ.app.customer.getCustomer().data.Session.cachedPosition : currentPosition;
      return {
        cached: cachedPosition,
        current: currentPosition
      };
    },
    getPermission: function getPermission() {
      if (navigator.permissions) {
        return navigator.permissions.query({
          name: "geolocation"
        });
      }

      return new Promise(function (resolve) {
        navigator.geolocation.getCurrentPosition(function () {
          resolve({
            state: "granted"
          });
        }, function () {
          resolve({
            state: "denied"
          });
        });
      });
    },
    calculateDistance: function calculateDistance(startCoords, endCoords) {
      var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "miles";
      var lat1 = startCoords.latitude || startCoords.lat || startCoords.Latitude || 0;
      var lon1 = startCoords.longitude || startCoords.lng || startCoords.Longitude || 0;
      var lat2 = endCoords.latitude || endCoords.lat || endCoords.Latitude || 0;
      var lon2 = endCoords.longitude || endCoords.lng || endCoords.Longitude || 0; // Using Haversine formula

      var R = 6371; // Earth Radius in Km

      var dLat = (lat2 - lat1).toRad();
      var dLon = (lon2 - lon1).toRad();
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distance = R * c;
      var distanceInMiles = distance * 0.621371;
      return unit === "miles" ? distanceInMiles : distance;
    }
  };
  return module;
});
//# sourceMappingURL=dpz.geolocation.js.map
