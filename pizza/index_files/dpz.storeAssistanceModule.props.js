define("dpz.storeAssistanceModule.props", [
/* START ECOM-69775 */
"abtests/DPZ_ECOM-69775",
/* END ECOM-69775 */
"dpz.storeAssistanceModule.constants", "dpz.storeAssistanceModule.state", "dpz.customer", "dpz.config"], function (
/* START ECOM-69775 */
_ref,
/* END ECOM-69775 */
_ref2, _ref3, _ref4, _ref5) {
  var getHasNationalStoreSelected = _ref.getHasNationalStoreSelected;
  var SERVICE_METHODS = _ref2.SERVICE_METHODS;
  var getState = _ref3.getState;
  var isProfiled = _ref4.isProfiled;
  var getMarketProperty = _ref5.getMarketProperty;

  var setSessionData = function setSessionData(key) {
    return function (val) {
      var Session = jsDPZ.app.customer.getCustomer().data.Session;
      Session[key] = val;
      site.sessionTools.save();
    };
  };

  var getSessionData = function getSessionData(key) {
    var Session = jsDPZ.app.customer.getCustomer().data.Session;
    return Session[key];
  };

  var setInteractedWithSam = function setInteractedWithSam() {
    return setSessionData("hasInteractedWithSam")(true);
  };

  var hasInteractedWithSam = function hasInteractedWithSam() {
    return getSessionData("hasInteractedWithSam");
  };

  var getIsAutoSet = function getIsAutoSet() {
    return getSessionData("isAutoSet");
  };

  var setIsAutoSet = setSessionData("isAutoSet");

  var getShouldShowSam = function getShouldShowSam() {
    /* START ECOM-69775 */
    var hasNationalStoreSelected = getHasNationalStoreSelected();
    /* END ECOM-69775 */

    return (// UNCOMMENT ECOM-69775 killConfig.isMarketEnabled("1ab5c89e-7066-4c55-84d3-6d9ba9e7a367") &&

      /* START ECOM-69775 */
      // Implementation: find a better permanent solution (isMarketEnabled
      // returns false in control when signing in on the local menu page).
      (killConfig.isMarketEnabled("1ab5c89e-7066-4c55-84d3-6d9ba9e7a367") || hasNationalStoreSelected) &&
      /* END ECOM-69775 */
      getMarketProperty("locations").storeAssistanceModule.guest // BEGIN CA Enable showsam when a user not sign in
      //   ||
      // isProfiled()
      // END CA
      && !getState().isHotSpot && getMarketProperty("locations").storeAssistanceModule.profiled && !site.isPaymentPage && !site.isConfirmationPage && !["locations", "hotspots", "deliver-to-me"].some(function (val) {
        return window.location.hash.includes(val);
      })
    );
  };

  var isFutureOrder = function isFutureOrder() {
    return Boolean(jsDPZ.app.order.getOrder().data.Details.OrderDateTime);
  };

  var getServiceMethodFromOrder = function getServiceMethodFromOrder(_ref6) {
    var isDucOrder = _ref6.isDucOrder,
        isPickupOrder = _ref6.isPickupOrder,
        serviceMethodDetail = _ref6.serviceMethodDetail;

    if (isDucOrder && serviceMethodDetail === SERVICE_METHODS.CARRYOUT) {
      return SERVICE_METHODS.DCD;
    }

    if (isPickupOrder && serviceMethodDetail === SERVICE_METHODS.CARRYOUT) {
      return SERVICE_METHODS.PICKUP_WINDOW;
    }

    return serviceMethodDetail;
  };

  var hasServiceMethodSelected = function hasServiceMethodSelected() {
    var _jsDPZ$app$order$getO = jsDPZ.app.order.getOrder().data,
        serviceMethodDetail = _jsDPZ$app$order$getO.Details.ServiceMethod,
        isDucOrder = _jsDPZ$app$order$getO.isDucOrder,
        isPickupOrder = _jsDPZ$app$order$getO.isPickupOrder;
    var isGoloDuc = killConfig.isMarketEnabled("profileColumnCurbsideCarryoutCheckbox") || killConfig.isMarketEnabled("9ad5cf4d-c802-4fbf-909c-d7fba83bf401");
    var serviceMethod = getServiceMethodFromOrder({
      isDucOrder: isGoloDuc ? getSessionData("CurbsidePickup") : isDucOrder,
      isPickupOrder: isPickupOrder,
      serviceMethodDetail: serviceMethodDetail
    });
    return Boolean(serviceMethod);
  };

  return {
    getIsAutoSet: getIsAutoSet,
    getServiceMethodFromOrder: getServiceMethodFromOrder,
    getShouldShowSam: getShouldShowSam,
    setInteractedWithSam: setInteractedWithSam,
    hasInteractedWithSam: hasInteractedWithSam,
    hasServiceMethodSelected: hasServiceMethodSelected,
    setIsAutoSet: setIsAutoSet,
    isFutureOrder: isFutureOrder
  };
});
//# sourceMappingURL=dpz.storeAssistanceModule.props.js.map
