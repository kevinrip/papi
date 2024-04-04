define("dpz.couponServiceMethodWarning", [], function () {
  /* add any coupon warning handlers here */
  var VALIDATORS = [];

  var getCurrentServiceMethod = function getCurrentServiceMethod() {
    return jsDPZ.app.order.getOrder().data.Details.ServiceMethod;
  };

  var validateCouponServiceMethod = function validateCouponServiceMethod(_ref) {
    var handleChange = _ref.handleChange,
        serviceMethod = _ref.serviceMethod;
    var currentServiceMethod = getCurrentServiceMethod();
    var isServiceMethodChanged = serviceMethod !== currentServiceMethod;

    if (isServiceMethodChanged) {
      var props = {
        handleChange: handleChange,
        serviceMethod: serviceMethod
      };

      var runValidator = function runValidator(validate) {
        return validate(props);
      };

      var canChange = VALIDATORS.map(runValidator).every(Boolean);
      if (canChange) handleChange();
    } else handleChange();
  };

  return {
    validateCouponServiceMethod: validateCouponServiceMethod
  };
});
//# sourceMappingURL=dpz.couponServiceMethodWarning.js.map
