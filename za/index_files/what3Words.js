define("external/what3Words", ["dpz.config"], function (_ref) {
  var getMarketProperty = _ref.getMarketProperty;
  var _getMarketProperty$wh = getMarketProperty("thirdParty").what3Words,
      productionKey = _getMarketProperty$wh.productionKey,
      sandboxKey = _getMarketProperty$wh.sandboxKey;
  var isProd = !!envConfig.match(/\bprod/);
  var what3WordsKey = isProd ? productionKey : sandboxKey;
  var hashes = {};

  var addScript = function addScript(_ref2) {
    var hash = _ref2.hash,
        src = _ref2.src,
        _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? "text/javascript" : _ref2$type;
    if (!hashes[hash]) hashes[hash] = new Promise(function (resolve, reject) {
      var scriptSrc = src;
      var scriptElement = document.createElement("script");
      scriptElement.src = scriptSrc;
      scriptElement.type = type;
      scriptElement.async = true;
      scriptElement.onload = resolve;

      scriptElement.onerror = function () {
        reject();
        delete hashes[hash];
      };

      var firstScriptNode = document.getElementsByTagName("script")[0];
      firstScriptNode.parentNode.insertBefore(scriptElement, firstScriptNode);
    });
    return hashes[hash];
  };

  var loadAPI = function loadAPI() {
    return Promise.all([addScript({
      hash: "nomodule",
      src: "https://cdn.what3words.com/javascript-components@4-latest/dist/what3words/what3words.js?key=".concat(what3WordsKey),
      type: "text/javascript"
    }), addScript({
      hash: "module",
      src: "https://cdn.what3words.com/javascript-components@4-latest/dist/what3words/what3words.esm.js?key=".concat(what3WordsKey),
      type: "module"
    })]);
  };

  return {
    loadAPI: loadAPI
  };
});
//# sourceMappingURL=what3Words.js.map
