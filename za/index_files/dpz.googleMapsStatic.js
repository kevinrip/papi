define("dpz.googleMapsStatic", ["dpz.config"], function (_ref) {
  var getIsProduction = _ref.getIsProduction,
      getMarketProperty = _ref.getMarketProperty;
  var baseURL = "https://maps.googleapis.com/maps/api";

  var getMapsConfig = function getMapsConfig() {
    return getIsProduction() ? getMarketProperty("thirdParty").googleMaps.prod : getMarketProperty("thirdParty").googleMaps.sandbox;
  };

  return Object.freeze({
    getStaticMapViewURL: function getStaticMapViewURL() {
      var pins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$width = _ref2.width,
          width = _ref2$width === void 0 ? 300 : _ref2$width,
          _ref2$height = _ref2.height,
          height = _ref2$height === void 0 ? 600 : _ref2$height,
          _ref2$autoscale = _ref2.autoscale,
          autoscale = _ref2$autoscale === void 0 ? true : _ref2$autoscale;

      var mapsConfig = getMapsConfig();
      var credentialType = mapsConfig.credentialType;
      var serializedPins = pins.map(function (_ref3) {
        var size = _ref3.size,
            color = _ref3.color,
            label = _ref3.label,
            latitude = _ref3.latitude,
            longitude = _ref3.longitude;
        return "&markers=size:".concat(encodeURIComponent(size || "mid"), "|color:").concat(encodeURIComponent(color || "0x006491")).concat(label ? "|".concat(encodeURIComponent(label)) : "", "|").concat(encodeURIComponent(latitude), ",").concat(encodeURIComponent(longitude));
      }).join("");
      return "".concat(baseURL, "/staticmap?size=").concat(width, "x").concat(height, "&").concat(autoscale ? "autoscale=1" : "").concat(serializedPins, "&").concat(credentialType, "=").concat(mapsConfig[credentialType], "&channel=").concat(dpz.market.marketName);
    },
    getStaticStreetViewURL: function getStaticStreetViewURL(position, _ref4) {
      var height = _ref4.height,
          width = _ref4.width;
      var mapsConfig = getMapsConfig();
      var credentialType = mapsConfig.credentialType;
      return "".concat(baseURL, "/streetview?size=").concat(width, "x").concat(height, "&location=").concat(position.lat(), ",").concat(position.lng(), "&").concat(credentialType, "=").concat(mapsConfig[credentialType], "&channel=").concat(dpz.market.marketName);
    }
  });
});
//# sourceMappingURL=dpz.googleMapsStatic.js.map
