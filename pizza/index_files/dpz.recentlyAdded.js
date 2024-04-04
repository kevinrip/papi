define("dpz.recentlyAdded", ["dpz.config", "site.funcs"], function (_ref, _ref2) {
  var getMarketProperty = _ref.getMarketProperty;
  var getKillConfigChoiceFromArray = _ref2.func.getKillConfigChoiceFromArray;
  var sources = {
    config: "config",
    menu: "menu"
  };
  var _getMarketProperty$re = getMarketProperty("entrees").recentlyAdded,
      source = _getMarketProperty$re.source,
      recentlyAddedProducts = _getMarketProperty$re.products;
  var useMenu = source === sources.menu;

  var getProductsFromConfig = function getProductsFromConfig() {
    return getKillConfigChoiceFromArray(recentlyAddedProducts);
  };

  var getProductsFromMenu = function getProductsFromMenu() {
    return Object.values(jsDPZ.app.catalog.getCatalog().data.Variants).filter(function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$Tags = _ref3.Tags;

      _ref3$Tags = _ref3$Tags === void 0 ? {} : _ref3$Tags;
      var _ref3$Tags$RecentlyAd = _ref3$Tags.RecentlyAdded,
          RecentlyAdded = _ref3$Tags$RecentlyAd === void 0 ? false : _ref3$Tags$RecentlyAd;
      return Boolean(RecentlyAdded);
    }).sort(function (_ref4, _ref5) {
      var _ref4$Tags$RecentlyAd = _ref4.Tags.RecentlyAddedOrder,
          a = _ref4$Tags$RecentlyAd === void 0 ? Number.MAX_VALUE : _ref4$Tags$RecentlyAd;
      var _ref5$Tags$RecentlyAd = _ref5.Tags.RecentlyAddedOrder,
          z = _ref5$Tags$RecentlyAd === void 0 ? Number.MAX_VALUE : _ref5$Tags$RecentlyAd;
      return a - z;
    }).map(function (_ref6) {
      var Code = _ref6.Code;
      return Code;
    });
  };

  return {
    getRecentlyAddedProducts: function getRecentlyAddedProducts() {
      return useMenu ? getProductsFromMenu() : getProductsFromConfig();
    }
  };
});
//# sourceMappingURL=dpz.recentlyAdded.js.map
