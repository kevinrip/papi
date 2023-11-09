define("dpz.utag.orderEvents", ["dpz.utag.constants"], function (_ref) {
  var _ref$UTAG_EVENTS = _ref.UTAG_EVENTS,
      COUPON_ADDED = _ref$UTAG_EVENTS.COUPON_ADDED,
      COUPON_REMOVED = _ref$UTAG_EVENTS.COUPON_REMOVED,
      PAYMENT_TYPE_CHANGED = _ref$UTAG_EVENTS.PAYMENT_TYPE_CHANGED,
      PRODUCT_ADDED = _ref$UTAG_EVENTS.PRODUCT_ADDED,
      PRODUCT_REMOVED = _ref$UTAG_EVENTS.PRODUCT_REMOVED,
      PRODUCT_UPDATED = _ref$UTAG_EVENTS.PRODUCT_UPDATED,
      SERVICE_METHOD_CHANGED = _ref$UTAG_EVENTS.SERVICE_METHOD_CHANGED;

  var getCatalog = function getCatalog() {
    return jsDPZ.app.catalog.getCatalog();
  };

  var getProductCodeFromVariant = function getProductCodeFromVariant() {
    var _getCatalog$getVarian;

    var variantCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return ((_getCatalog$getVarian = getCatalog().getVariant(variantCode).data) === null || _getCatalog$getVarian === void 0 ? void 0 : _getCatalog$getVarian.ProductCode) || "";
  };

  var createOnCouponAdded = function createOnCouponAdded(trigger) {
    return function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$couponCode = _ref2.couponCode,
          couponCode = _ref2$couponCode === void 0 ? "" : _ref2$couponCode;

      trigger(null, {
        event_name: COUPON_ADDED,
        event_label: couponCode
      });
    };
  };

  var createOnCouponRemoved = function createOnCouponRemoved(trigger) {
    return function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$couponCode = _ref3.couponCode,
          couponCode = _ref3$couponCode === void 0 ? "" : _ref3$couponCode;

      trigger(null, {
        event_name: COUPON_REMOVED,
        event_label: couponCode
      });
    };
  };

  var createOnProductAdded = function createOnProductAdded(trigger) {
    return function (_) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref4$variantCode = _ref4.variantCode,
          variantCode = _ref4$variantCode === void 0 ? "" : _ref4$variantCode,
          quantity = _ref4.quantity,
          name = _ref4.name,
          category = _ref4.category,
          toppings = _ref4.toppings,
          couponCode = _ref4.couponCode,
          price = _ref4.price;

      var productCode = getProductCodeFromVariant(variantCode);
      trigger(null, {
        event_name: PRODUCT_ADDED,
        event_label: productCode,
        productDetails: {
          id: productCode,
          price: price,
          code: variantCode,
          quantity: quantity,
          name: name,
          category: category,
          toppings: toppings
        },
        couponCode: couponCode
      });
    };
  };

  var createOnProductRemoved = function createOnProductRemoved(trigger) {
    return function (_) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$variantCode = _ref5.variantCode,
          variantCode = _ref5$variantCode === void 0 ? "" : _ref5$variantCode,
          quantity = _ref5.quantity,
          name = _ref5.name,
          category = _ref5.category,
          toppings = _ref5.toppings,
          couponCode = _ref5.couponCode,
          price = _ref5.price;

      var productCode = getProductCodeFromVariant(variantCode);
      trigger(null, {
        event_name: PRODUCT_REMOVED,
        event_label: productCode,
        productDetails: {
          id: productCode,
          price: price,
          code: variantCode,
          quantity: quantity,
          name: name,
          category: category,
          toppings: toppings
        },
        couponCode: couponCode
      });
    };
  };

  var createOnProductUpdated = function createOnProductUpdated(trigger) {
    return function (_) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref6$id = _ref6.id,
          id = _ref6$id === void 0 ? "" : _ref6$id,
          _ref6$newVariantCode = _ref6.newVariantCode,
          newVariantCode = _ref6$newVariantCode === void 0 ? "" : _ref6$newVariantCode,
          quantity = _ref6.quantity,
          oldQuantity = _ref6.oldQuantity,
          price = _ref6.price,
          name = _ref6.name,
          category = _ref6.category,
          toppings = _ref6.toppings;

      var _ref7 = jsDPZ.app.order.getOrder().data.Details.Variants.find(function (_ref8) {
        var ID = _ref8.ID;
        return ID === id;
      }) || {},
          _ref7$Code = _ref7.Code,
          variantCode = _ref7$Code === void 0 ? "" : _ref7$Code;

      var productCode = getProductCodeFromVariant(variantCode);
      trigger(null, {
        event_name: PRODUCT_UPDATED,
        event_label: productCode
      });

      if (quantity > oldQuantity) {
        trigger(null, {
          event_name: PRODUCT_ADDED,
          event_label: productCode,
          productDetails: {
            id: productCode,
            price: price,
            code: newVariantCode,
            quantity: quantity - oldQuantity,
            name: name,
            category: category,
            toppings: toppings
          }
        });
      } else if (quantity < oldQuantity) {
        trigger(null, {
          event_name: PRODUCT_REMOVED,
          event_label: productCode,
          productDetails: {
            id: productCode,
            price: price,
            code: newVariantCode,
            quantity: oldQuantity - quantity,
            name: name,
            category: category,
            toppings: toppings
          }
        });
      }
    };
  };

  var createOnOrderReview = function createOnOrderReview(trigger) {
    return function (_, _ref9) {
      var event_name = _ref9.event_name;
      trigger(null, {
        event_name: event_name
      });
    };
  };

  var createOnOrderPlaced = function createOnOrderPlaced(trigger) {
    return function (_, _ref10) {
      var event_name = _ref10.event_name;
      trigger(null, {
        event_name: event_name
      });
    };
  };

  var createOnOrderConfirmed = function createOnOrderConfirmed(trigger) {
    return function (_, _ref11) {
      var event_name = _ref11.event_name;
      trigger(null, {
        event_name: event_name
      });
    };
  };

  var createOnServiceMethodChange = function createOnServiceMethodChange(trigger) {
    return function (method) {
      var Session = jsDPZ.app.customer.getCustomer().data.Session;
      trigger(null, {
        event_name: SERVICE_METHOD_CHANGED,
        event_label: method,
        store_id: Session.StoreID
      });
    };
  };

  var createOnPaymentTypeChange = function createOnPaymentTypeChange(trigger) {
    return function (_, _ref12) {
      var payment_type = _ref12.payment_type;
      trigger(null, {
        event_name: PAYMENT_TYPE_CHANGED,
        order_payment_type: [payment_type]
      });
    };
  };

  var createOnOrderCheckout = function createOnOrderCheckout(trigger) {
    return function (_, _ref13) {
      var event_name = _ref13.event_name;
      trigger(null, {
        event_name: event_name
      });
    };
  };

  return {
    createOnCouponAdded: createOnCouponAdded,
    createOnCouponRemoved: createOnCouponRemoved,
    createOnProductAdded: createOnProductAdded,
    createOnProductRemoved: createOnProductRemoved,
    createOnProductUpdated: createOnProductUpdated,
    createOnOrderPlaced: createOnOrderPlaced,
    createOnOrderConfirmed: createOnOrderConfirmed,
    createOnServiceMethodChange: createOnServiceMethodChange,
    createOnOrderCheckout: createOnOrderCheckout,
    createOnPaymentTypeChange: createOnPaymentTypeChange,
    createOnOrderReview: createOnOrderReview
  };
});
//# sourceMappingURL=dpz.utag.orderEvents.js.map
