define("dpz.mixAndMatch.initialize", ["dpz.mixAndMatch.constants", "dpz.mixAndMatch.methods"], function (_ref, _ref2) {
  var ALL_CODES = _ref.ALL_CODES;
  var getCoupon = _ref2.getCoupon;

  var setMixAndMatchCouponsInCatalog = function setMixAndMatchCouponsInCatalog() {
    var coupons = ALL_CODES.map(getCoupon);
    return Promise.all(coupons).then(site.sessionTools.save);
  };

  var initializeMixAndMatch = function initializeMixAndMatch() {
    return setMixAndMatchCouponsInCatalog();
  };

  return {
    initializeMixAndMatch: initializeMixAndMatch
  };
});
//# sourceMappingURL=dpz.mixAndMatch.initialize.js.map
