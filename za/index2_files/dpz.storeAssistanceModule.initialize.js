define("dpz.storeAssistanceModule.initialize", ["dpz.goloDuc", "dpz.storeAssistanceModule.props", "dpz.storeAssistanceModule.state", "dpz.storeAssistanceModule.methods", "dpz.storeAssistanceModule.renderer"], function (_ref, _ref2, _ref3, _ref4, _ref5) {
  var getIsGoloDucOrderingEnabled = _ref.getIsGoloDucOrderingEnabled;
  var getServiceMethodFromOrder = _ref2.getServiceMethodFromOrder,
      setIsAutoSet = _ref2.setIsAutoSet;
  var getState = _ref3.getState,
      setState = _ref3.setState;
  var getCurrentOrderInfo = _ref4.getCurrentOrderInfo,
      setServiceMethodFromProfileData = _ref4.setServiceMethodFromProfileData;
  var renderSam = _ref5.renderSam;

  var onServiceMethodChange = function onServiceMethodChange() {
    var _jsDPZ$app$order$getO = jsDPZ.app.order.getOrder().data,
        serviceMethodDetail = _jsDPZ$app$order$getO.Details.ServiceMethod,
        isDucOrder = _jsDPZ$app$order$getO.isDucOrder,
        isPickupOrder = _jsDPZ$app$order$getO.isPickupOrder;
    var isGoloDucOrder = getIsGoloDucOrderingEnabled();
    var serviceMethodFromOrder = getServiceMethodFromOrder({
      isDucOrder: isGoloDucOrder ? jsDPZ.app.customer.getCustomer().getSessionData().CurbsidePickup : isDucOrder,
      isPickupOrder: isPickupOrder,
      serviceMethodDetail: serviceMethodDetail
    });

    var _getState = getState(),
        samServiceMethod = _getState.serviceMethod;

    if (serviceMethodFromOrder !== samServiceMethod) {
      setIsAutoSet(false);
      setState({
        serviceMethodFromOrder: serviceMethodFromOrder
      });
      initSamNav();
    }
  };

  var onCustomerSignIn = function onCustomerSignIn(_ref6) {
    var key = _ref6.Email;
    return setServiceMethodFromProfileData(key);
  };

  var initSamNav = function initSamNav() {
    getCurrentOrderInfo();

    if (getState().isHotSpot) {
      return;
    }

    initListeners();
    jsDPZ.topic("storeAssistanceModule.updated").publish();
  };

  var initListeners = function initListeners() {
    jsDPZ.topic("order.service.method.changed").unsubscribe(onServiceMethodChange).subscribe(onServiceMethodChange);
    jsDPZ.topic("login.success").unsubscribe(onCustomerSignIn).subscribe(onCustomerSignIn);
    jsDPZ.topic("storeAssistanceModule.updated").unsubscribe(renderSam).subscribe(renderSam);
  };

  return {
    initSamNav: initSamNav
  };
});
//# sourceMappingURL=dpz.storeAssistanceModule.initialize.js.map
