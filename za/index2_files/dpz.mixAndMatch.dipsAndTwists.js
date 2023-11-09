define("dpz.mixAndMatch.dipsAndTwists", ["dpz.config", "dpz.mixAndMatch.methods"], function (_ref, _ref2) {
  var getMarketProperty = _ref.getMarketProperty;
  var getCatalog = _ref2.getCatalog,
      getIsAnyMixAndMatch = _ref2.getIsAnyMixAndMatch;

  var getShowDipsAndTwistsUpsell = function getShowDipsAndTwistsUpsell(couponCode) {
    var isAnyMixAndMatch = getIsAnyMixAndMatch(couponCode);
    if (!isAnyMixAndMatch) return false;

    var _getMarketProperty = getMarketProperty("fulfillerWizard"),
        combos = _getMarketProperty.dip_combo_variants,
        dips = _getMarketProperty.dip_product_codes;

    var hasConfig = [combos.length, dips.length].every(Boolean);
    if (!hasConfig) return false;
    var catalog = getCatalog();
    var coupon = catalog.getCoupon(couponCode);
    if (!coupon) return false;
    var ProductGroups = coupon.data.ProductGroups;
    if (!ProductGroups) return false;
    var variants = ProductGroups[0].ProductCodes;

    var getHasCombo = function getHasCombo(code) {
      var isCouponCombo = variants.includes(code);
      if (!isCouponCombo) return false;
      var combo = catalog.getVariant(code);
      var hasCombo = !dpz.util.isEmpty(combo);
      if (!hasCombo) return false;
      return true;
    };

    var getHasDip = function getHasDip(code) {
      var product = catalog.getProduct(code);
      return !dpz.util.isEmpty(product);
    };

    var hasCombos = combos.every(getHasCombo);
    var hasDips = dips.every(getHasDip);
    return [hasCombos, hasDips].every(Boolean);
  };

  return {
    getShowDipsAndTwistsUpsell: getShowDipsAndTwistsUpsell
  };
});
//# sourceMappingURL=dpz.mixAndMatch.dipsAndTwists.js.map
