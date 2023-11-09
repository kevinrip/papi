define("dpz.what3Words", ["dpz.config", "external/what3Words"], function (_, _ref) {
  var _loadAPI = _ref.loadAPI;
  var what3WordsCoordinates = {};
  var what3WordsCache = {};
  var events = {
    SELECTED_SUGGESTION: "selected_suggestion",
    VALUE_CHANGED: "value_changed"
  };

  var isWhat3WordsEnabled = function isWhat3WordsEnabled() {
    return killConfig.isMarketEnabled("3345eed3-80a4-46f1-b4af-b2b2f9c0e3c9");
  };

  var normalizeCoordinates = function normalizeCoordinates() {
    var coordinates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (coordinates.lat) return {
      latitude: coordinates.lat,
      longitude: coordinates.lng
    };
    if (coordinates.Latitude) return {
      latitude: +coordinates.Latitude,
      longitude: +coordinates.Longitude
    };
    return coordinates;
  };

  var coordinateToHash = function coordinateToHash(_ref2) {
    var latitude = _ref2.latitude,
        longitude = _ref2.longitude;
    return "".concat(latitude, ":").concat(longitude);
  };

  var areValidCoordinates = function areValidCoordinates(_ref3) {
    var latitude = _ref3.latitude,
        longitude = _ref3.longitude;
    return latitude && longitude;
  };

  var convertToWords = function convertToWords(coordinates) {
    var normalizedCoordinates = normalizeCoordinates(coordinates);
    return new Promise(function (resolve) {
      if (!(isWhat3WordsEnabled() && areValidCoordinates(normalizedCoordinates))) {
        resolve("");
      } else {
        var cachedWhat3Words = what3WordsCache[coordinateToHash(normalizedCoordinates)];
        if (cachedWhat3Words) resolve(cachedWhat3Words);else {
          var latitude = normalizedCoordinates.latitude,
              longitude = normalizedCoordinates.longitude;

          _loadAPI().then(function () {
            return window.what3words.api.convertTo3wa({
              lat: latitude,
              lng: longitude
            }).then(function (_ref4) {
              var words = _ref4.words;
              what3WordsCache[coordinateToHash(normalizedCoordinates)] = words;
              resolve(words);
            });
          })["catch"](function () {
            return resolve("");
          });
        }
      }
    });
  };

  var convertToCoordinates = function convertToCoordinates(what3Words) {
    return new Promise(function (resolve) {
      var cachedCoordinates = what3WordsCoordinates[what3Words];
      if (!isWhat3WordsEnabled()) resolve(null);else if (!jsDPZ.util.empty(cachedCoordinates)) resolve(cachedCoordinates);else _loadAPI().then(function () {
        return window.what3words.api.convertToCoordinates(what3Words);
      }).then(function (_ref5) {
        var coordinates = _ref5.coordinates;
        what3WordsCoordinates[what3Words] = normalizeCoordinates(coordinates);
        resolve(what3WordsCoordinates[what3Words]);
      })["catch"](function () {
        return resolve(null);
      });
    });
  };

  var getDisabledModulePromise = function getDisabledModulePromise() {
    return new Promise(function (_, reject) {
      return reject("What3Words is disabled");
    });
  };

  var areSameCoordinates = function areSameCoordinates(coordinates1, coordinates2) {
    var _normalizeCoordinates = normalizeCoordinates(coordinates1),
        latitude1 = _normalizeCoordinates.latitude,
        longitude1 = _normalizeCoordinates.longitude;

    var _normalizeCoordinates2 = normalizeCoordinates(coordinates2),
        latitude2 = _normalizeCoordinates2.latitude,
        longitude2 = _normalizeCoordinates2.longitude;

    return latitude1 === latitude2 && longitude1 === longitude2;
  };

  return {
    areSameCoordinates: areSameCoordinates,
    convertToCoordinates: convertToCoordinates,
    convertToWords: convertToWords,
    isWhat3WordsEnabled: isWhat3WordsEnabled,
    loadAPI: function loadAPI(params) {
      return isWhat3WordsEnabled() ? _loadAPI(params) : getDisabledModulePromise();
    },
    what3WordsEvents: events
  };
});
//# sourceMappingURL=dpz.what3Words.js.map
