function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define("dpz.thresholdCoupons", ["simplr", "dpz.config"], function (simplr, _ref) {
  var getMarketProperty = _ref.getMarketProperty;
  var cache = {};

  var getIsAutomaticallyApplied = function getIsAutomaticallyApplied(couponCode) {
    var _jsDPZ$app$catalog$ge = jsDPZ.app.catalog.getCatalog().getCoupon(couponCode),
        _jsDPZ$app$catalog$ge2 = _jsDPZ$app$catalog$ge.data;

    _jsDPZ$app$catalog$ge2 = _jsDPZ$app$catalog$ge2 === void 0 ? {} : _jsDPZ$app$catalog$ge2;
    var _jsDPZ$app$catalog$ge3 = _jsDPZ$app$catalog$ge2.Tags;
    _jsDPZ$app$catalog$ge3 = _jsDPZ$app$catalog$ge3 === void 0 ? {} : _jsDPZ$app$catalog$ge3;
    var NoManualEntryByUser = _jsDPZ$app$catalog$ge3.NoManualEntryByUser;
    return NoManualEntryByUser;
  };

  var getIsThresholdCoupon = function getIsThresholdCoupon(couponCode) {
    var _jsDPZ$app$catalog$ge4 = jsDPZ.app.catalog.getCatalog().getCoupon(couponCode),
        _jsDPZ$app$catalog$ge5 = _jsDPZ$app$catalog$ge4.data;

    _jsDPZ$app$catalog$ge5 = _jsDPZ$app$catalog$ge5 === void 0 ? {} : _jsDPZ$app$catalog$ge5;
    var _jsDPZ$app$catalog$ge6 = _jsDPZ$app$catalog$ge5.Tags;
    _jsDPZ$app$catalog$ge6 = _jsDPZ$app$catalog$ge6 === void 0 ? {} : _jsDPZ$app$catalog$ge6;
    var DeliveryDiscount = _jsDPZ$app$catalog$ge6.DeliveryDiscount,
        MinimumPaymentAmount = _jsDPZ$app$catalog$ge6.MinimumPaymentAmount,
        ThresholdCoupon = _jsDPZ$app$catalog$ge6.ThresholdCoupon;
    return MinimumPaymentAmount && (ThresholdCoupon || DeliveryDiscount);
  };

  var getIsDeliveryDiscountCoupon = function getIsDeliveryDiscountCoupon(couponCode) {
    var _jsDPZ$app$catalog$ge7;

    return (_jsDPZ$app$catalog$ge7 = jsDPZ.app.catalog.getCatalog().getCoupon(couponCode).data) === null || _jsDPZ$app$catalog$ge7 === void 0 ? void 0 : _jsDPZ$app$catalog$ge7.Tags.DeliveryDiscount;
  };

  var getOrderCacheKey = function getOrderCacheKey() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsDPZ.app.order.getOrder(),
        _ref2$data$Details = _ref2.data.Details,
        _ref2$data$Details$St = _ref2$data$Details.StoreID,
        StoreID = _ref2$data$Details$St === void 0 ? "" : _ref2$data$Details$St,
        ServiceMethod = _ref2$data$Details.ServiceMethod,
        _ref2$data$Details$Va = _ref2$data$Details.Variants,
        Variants = _ref2$data$Details$Va === void 0 ? [] : _ref2$data$Details$Va,
        _ref2$data$Details$Co = _ref2$data$Details.Coupons,
        Coupons = _ref2$data$Details$Co === void 0 ? [] : _ref2$data$Details$Co;

    var appliedCoupons = Coupons.filter(function (_ref3) {
      var Code = _ref3.Code,
          Fulfilled = _ref3.Fulfilled;
      return Fulfilled && !getIsThresholdCoupon(Code);
    }).map(function (_ref4) {
      var Code = _ref4.Code;
      return Code;
    }).sort(function (a, z) {
      return a.localeCompare(z);
    }).join("-");

    var appliedProducts = _toConsumableArray(Variants).sort(function (_ref5, _ref6) {
      var a = _ref5.ID;
      var z = _ref6.ID;
      return a - z;
    }).map(function (_ref7) {
      var _ref7$Code = _ref7.Code,
          Code = _ref7$Code === void 0 ? "" : _ref7$Code,
          _ref7$Qty = _ref7.Qty,
          Qty = _ref7$Qty === void 0 ? 0 : _ref7$Qty,
          _ref7$Sides = _ref7.Sides,
          Sides = _ref7$Sides === void 0 ? {} : _ref7$Sides,
          _ref7$Toppings = _ref7.Toppings,
          Toppings = _ref7$Toppings === void 0 ? {} : _ref7$Toppings;
      return btoa("".concat(Code, "-").concat(Qty, "-").concat(JSON.stringify(Sides), "-").concat(JSON.stringify(Toppings)));
    }).join("-");

    return "".concat(StoreID, "-").concat(ServiceMethod, "-").concat(appliedCoupons, "-").concat(appliedProducts);
  };

  var getFromCache = function getFromCache() {
    var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsDPZ.app.order.getOrder();
    var key = getOrderCacheKey(order);
    return cache[key] || {};
  };

  var setCache = function setCache() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref8$extend = _ref8.extend,
        extend = _ref8$extend === void 0 ? true : _ref8$extend,
        _ref8$key = _ref8.key,
        key = _ref8$key === void 0 ? "" : _ref8$key,
        _ref8$value = _ref8.value,
        value = _ref8$value === void 0 ? {} : _ref8$value;

    cache[key] = _objectSpread(_objectSpread({}, extend && cache[key]), value);
  };

  var getAmountValue = function getAmountValue(_ref9) {
    var _ref9$amounts = _ref9.amounts,
        amounts = _ref9$amounts === void 0 ? {} : _ref9$amounts,
        field = _ref9.field;
    return typeof amounts[field] !== "undefined" ? +amounts[field] : 0;
  };

  var getOrderTotal = function getOrderTotal(_ref10) {
    var amounts = _ref10.amounts;

    var _getMarketProperty = getMarketProperty("order"),
        _getMarketProperty$th = _getMarketProperty.thresholdCouponsCustomerAmountFields,
        thresholdCouponsCustomerAmountFields = _getMarketProperty$th === void 0 ? [] : _getMarketProperty$th;

    return thresholdCouponsCustomerAmountFields.reduce(function (orderTotal, field) {
      return orderTotal + getAmountValue({
        amounts: amounts,
        field: field
      });
    }, 0);
  };

  var getIsDeliveryDiscountCouponInOrder = function getIsDeliveryDiscountCouponInOrder(_ref11) {
    var orderData = _ref11.orderData;
    return orderData.Details.Coupons.some(function (_ref12) {
      var Code = _ref12.Code;
      return getIsDeliveryDiscountCoupon(Code);
    });
  };

  var filterDeliveryDiscountProduct = function filterDeliveryDiscountProduct(_ref13) {
    var _catalog$getProduct$d, _catalog$getProduct$d2;

    var Code = _ref13.Code;
    var catalog = jsDPZ.app.catalog.getCatalog();

    var _ref14 = Object.values(catalog.data.Coupons).find(function (_ref15) {
      var Code = _ref15.Code;
      return getIsDeliveryDiscountCoupon(Code);
    }) || {},
        deliveryDiscountCouponCode = _ref14.Code;

    var ProductCode = catalog.getVariant(Code).data.ProductCode;
    return ((_catalog$getProduct$d = catalog.getProduct(ProductCode).data) === null || _catalog$getProduct$d === void 0 ? void 0 : (_catalog$getProduct$d2 = _catalog$getProduct$d.Tags) === null || _catalog$getProduct$d2 === void 0 ? void 0 : _catalog$getProduct$d2.CouponOnly) !== deliveryDiscountCouponCode;
  };

  var sortThresholdCouponsByPriority = function sortThresholdCouponsByPriority(_ref16, _ref17) {
    var _ref16$data$Tags = _ref16.data.Tags,
        minimumPaymentAmountA = _ref16$data$Tags.MinimumPaymentAmount,
        thresholdPriorityA = _ref16$data$Tags.ThresholdPriority;
    var _ref17$data$Tags = _ref17.data.Tags,
        minimumPaymentAmountZ = _ref17$data$Tags.MinimumPaymentAmount,
        thresholdPriorityZ = _ref17$data$Tags.ThresholdPriority;

    if (thresholdPriorityA || thresholdPriorityZ) {
      if (!thresholdPriorityA) return 1;
      if (!thresholdPriorityZ) return -1;
      return parseInt(thresholdPriorityA) - parseInt(thresholdPriorityZ);
    }

    return parseInt(minimumPaymentAmountZ) - parseInt(minimumPaymentAmountA);
  };

  var sortThresholdCouponsByThreshold = function sortThresholdCouponsByThreshold(couponA, couponZ) {
    var minimumPaymentAmountA = couponA.data.Tags.MinimumPaymentAmount;
    var minimumPaymentAmountZ = couponZ.data.Tags.MinimumPaymentAmount;
    return minimumPaymentAmountA === minimumPaymentAmountZ ? sortThresholdCouponsByPriority(couponA, couponZ) : parseInt(minimumPaymentAmountA) - parseInt(minimumPaymentAmountZ);
  };

  var getIsCouponActive = function getIsCouponActive(code) {
    return jsDPZ.app.catalog.isCouponActive(code).Success;
  };

  var getIsEligibleThresholdCoupon = function getIsEligibleThresholdCoupon(_ref18) {
    var coupon = _ref18.coupon,
        amounts = _ref18.amounts;
    var orderTotal = getOrderTotal({
      amounts: amounts
    });
    var _coupon$data = coupon.data,
        Code = _coupon$data.Code,
        MinimumPaymentAmount = _coupon$data.Tags.MinimumPaymentAmount;
    var isCouponActive = getIsCouponActive(Code);
    var isThresholdMet = parseFloat(orderTotal) >= parseFloat(MinimumPaymentAmount);
    return isCouponActive && isThresholdMet;
  };

  var getOrderAmounts = function getOrderAmounts() {
    var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsDPZ.app.order.getOrder();
    var cache = getFromCache(order);
    var orderCacheKey = getOrderCacheKey(order);
    var amounts = cache.amounts;
    var noThresholdCouponsInOrder = order.data.Details.Coupons.every(function (_ref19) {
      var Code = _ref19.Code;
      return !getIsThresholdCoupon(Code);
    });
    if (!jsDPZ.util.empty(amounts)) return Promise.resolve(amounts);

    if (noThresholdCouponsInOrder && !jsDPZ.util.empty(order.data.Details.Amounts)) {
      var _amounts = Object.entries(order.data.Details.Amounts).reduce(function (amts, _ref20) {
        var _ref21 = _slicedToArray(_ref20, 2),
            amountKey = _ref21[0],
            amount = _ref21[1];

        return _objectSpread(_objectSpread({}, amts), {}, _defineProperty({}, amountKey, parseFloat(amount)));
      }, {});

      setCache({
        key: orderCacheKey,
        value: {
          amounts: _amounts
        }
      });
      return Promise.resolve(_amounts);
    }

    return new Promise(function (resolve, reject) {
      return site.func.getOrderForPowerData().then(function (powerData) {
        powerData.Order.Coupons = powerData.Order.Coupons.filter(function (_ref22) {
          var Code = _ref22.Code;
          return !getIsThresholdCoupon(Code);
        });
        return jsDPZ.ajax.priceOrder({
          data: powerData
        });
      }).then(function (powerOrderResponse) {
        if (powerOrderResponse.Status >= 0) {
          var pricedOrder = new jsDPZ.obj.order();
          pricedOrder.updateDataFromPowerResponse(powerOrderResponse);
          var _amounts2 = pricedOrder.data.Details.Amounts;
          setCache({
            key: orderCacheKey,
            value: {
              amounts: _amounts2
            }
          });
          resolve(_amounts2);
        } else {
          reject(new Error("Price order failed"));
        }
      });
    });
  };

  var getThresholdCoupons = function getThresholdCoupons() {
    var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref23$onlyAutomatica = _ref23.onlyAutomaticallyApplied,
        onlyAutomaticallyApplied = _ref23$onlyAutomatica === void 0 ? false : _ref23$onlyAutomatica;

    var catalog = jsDPZ.app.catalog.getCatalog();
    var thresholdCoupons = catalog.getCouponsArray().filter(function (_ref24) {
      var _ref24$data = _ref24.data;
      _ref24$data = _ref24$data === void 0 ? {} : _ref24$data;
      var Code = _ref24$data.Code;
      return getIsThresholdCoupon(Code) && getIsCouponActive(Code) && (!onlyAutomaticallyApplied || getIsAutomaticallyApplied(Code));
    }).sort(sortThresholdCouponsByPriority);
    return thresholdCoupons;
  };

  var getThresholdCouponsByType = function getThresholdCouponsByType() {
    var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref25$onlyAutomatica = _ref25.onlyAutomaticallyApplied,
        onlyAutomaticallyApplied = _ref25$onlyAutomatica === void 0 ? true : _ref25$onlyAutomatica;

    return getThresholdCoupons({
      onlyAutomaticallyApplied: onlyAutomaticallyApplied
    }).sort(sortThresholdCouponsByPriority).reduce(function (thresholdCoupons, coupon) {
      thresholdCoupons[getIsDeliveryDiscountCoupon(coupon.data.Code) ? "deliveryDiscountCoupons" : "thresholdCoupons"].push(coupon);
      return thresholdCoupons;
    }, {
      deliveryDiscountCoupons: [],
      thresholdCoupons: []
    });
  };

  var getThresholdOrderAmount = function getThresholdOrderAmount() {
    var _ref26 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref26$order = _ref26.order,
        order = _ref26$order === void 0 ? jsDPZ.app.order.getOrder() : _ref26$order;

    return getOrderAmounts(order).then(function (amounts) {
      return getOrderTotal({
        amounts: amounts
      });
    });
  };

  var getEligibleThresholdCoupons = function getEligibleThresholdCoupons() {
    var _ref27 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      order: order
    },
        _ref27$order = _ref27.order,
        order = _ref27$order === void 0 ? jsDPZ.app.order.getOrder() : _ref27$order;

    var _getFromCache = getFromCache(order),
        eligibleThresholdCoupons = _getFromCache.eligibleThresholdCoupons;

    if (typeof eligibleThresholdCoupons !== "undefined") return Promise.resolve(eligibleThresholdCoupons);
    return getOrderAmounts(order).then(function (amounts) {
      var _getThresholdCouponsB = getThresholdCouponsByType({
        onlyAutomaticallyApplied: true
      }),
          _getThresholdCouponsB2 = _getThresholdCouponsB.deliveryDiscountCoupons,
          deliveryDiscountCoupons = _getThresholdCouponsB2 === void 0 ? [] : _getThresholdCouponsB2,
          _getThresholdCouponsB3 = _getThresholdCouponsB.thresholdCoupons,
          thresholdCoupons = _getThresholdCouponsB3 === void 0 ? [] : _getThresholdCouponsB3;

      var getIsCouponEligible = function getIsCouponEligible(coupon) {
        return getIsEligibleThresholdCoupon({
          coupon: coupon,
          amounts: amounts
        });
      };

      var deliveryDiscountCoupon = deliveryDiscountCoupons.find(getIsCouponEligible);
      var thresholdCoupon = thresholdCoupons.find(getIsCouponEligible);
      var eligibleCoupons = {
        deliveryDiscountCoupon: deliveryDiscountCoupon,
        thresholdCoupon: thresholdCoupon
      };
      setCache({
        key: getOrderCacheKey(),
        value: {
          eligibleThresholdCoupons: eligibleCoupons
        }
      });
      return eligibleCoupons;
    });
  };

  var getNextNonEligibleThresholdCoupons = function getNextNonEligibleThresholdCoupons() {
    var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref28$order = _ref28.order,
        order = _ref28$order === void 0 ? jsDPZ.app.order.getOrder() : _ref28$order;

    var _getFromCache2 = getFromCache(order),
        nextNonEligibleThresholdCoupons = _getFromCache2.nextNonEligibleThresholdCoupons;

    if (typeof nextNonEligibleThresholdCoupons !== "undefined") return Promise.resolve(nextNonEligibleThresholdCoupons);
    return getOrderAmounts(order).then(function (amounts) {
      var _getThresholdCouponsB4 = getThresholdCouponsByType({
        onlyAutomaticallyApplied: true
      }),
          _getThresholdCouponsB5 = _getThresholdCouponsB4.deliveryDiscountCoupons,
          deliveryDiscountCoupons = _getThresholdCouponsB5 === void 0 ? [] : _getThresholdCouponsB5,
          _getThresholdCouponsB6 = _getThresholdCouponsB4.thresholdCoupons,
          thresholdCoupons = _getThresholdCouponsB6 === void 0 ? [] : _getThresholdCouponsB6;

      var getIsNonEligibleThresholdCoupon = function getIsNonEligibleThresholdCoupon(coupon) {
        return !getIsEligibleThresholdCoupon({
          coupon: coupon,
          amounts: amounts
        });
      };

      var deliveryDiscountCoupon = deliveryDiscountCoupons.sort(sortThresholdCouponsByThreshold).find(getIsNonEligibleThresholdCoupon);
      var thresholdCoupon = thresholdCoupons.sort(sortThresholdCouponsByThreshold).find(getIsNonEligibleThresholdCoupon);
      var nextEligibleThresholdCoupons = {
        deliveryDiscountCoupon: deliveryDiscountCoupon,
        thresholdCoupon: thresholdCoupon
      };
      setCache({
        key: getOrderCacheKey(),
        value: {
          nextNonEligibleThresholdCoupons: nextEligibleThresholdCoupons
        }
      });
      return nextEligibleThresholdCoupons;
    });
  };

  var getCouponOnlyProducts = function getCouponOnlyProducts(couponCode) {
    return Object.keys(jsDPZ.app.catalog.getCatalog().data.Products).map(function (productCode) {
      return jsDPZ.app.catalog.getCatalog().getProduct(productCode);
    }).filter(function (_ref29) {
      var _ref29$data = _ref29.data;
      _ref29$data = _ref29$data === void 0 ? {} : _ref29$data;
      var _ref29$data$Tags = _ref29$data.Tags;
      _ref29$data$Tags = _ref29$data$Tags === void 0 ? {} : _ref29$data$Tags;
      var _ref29$data$Tags$Coup = _ref29$data$Tags.CouponOnly,
          CouponOnly = _ref29$data$Tags$Coup === void 0 ? "" : _ref29$data$Tags$Coup;
      return CouponOnly === couponCode;
    });
  };

  var addThresholdCouponProduct = function addThresholdCouponProduct(product) {
    return new Promise(function (resolve) {
      var _ref30 = site.catalogTools.defaultVariantToOrderVariant(site.catalogTools.getDefaultVariantCode(product.data.Code)) || {},
          Code = _ref30.Code;

      var parameters = {
        code: Code,
        qty: 1,
        skipValidation: true,
        suppressWizard: true
      };
      var PRODUCT_ADDED_EVENT = "/order/variant/new/";

      var resolveAndUnsubscribe = function resolveAndUnsubscribe(_, _ref31) {
        var variantCode = _ref31.variantCode;

        if (Code === variantCode) {
          $(document).off(PRODUCT_ADDED_EVENT, resolveAndUnsubscribe);
          resolve();
        }
      };

      $(document).on(PRODUCT_ADDED_EVENT, resolveAndUnsubscribe);
      var url = site.func.buildURL({
        url: "#!/order/variant/new",
        parameters: parameters
      });
      simplr.controller.mRouteAndExecute(url);
    });
  };

  var applyThresholdCoupon = function applyThresholdCoupon(_ref32) {
    var couponCode = _ref32.couponCode,
        suppressWizard = _ref32.suppressWizard;
    var COUPON_ADDED_EVENT = "/order/coupon/add/";
    var COUPON_REJECTED_EVENT = "order.coupon.rejected";

    var parameters = _objectSpread({
      code: couponCode,
      couponAdd: 1,
      qty: 1,
      suppressValidation: true
    }, suppressWizard && {
      suppressWizard: "1"
    });

    var url = site.func.buildURL({
      url: "#!/order/coupons/new",
      parameters: parameters
    });
    var couponPromise = new Promise(function (resolve) {
      var resolveAndUnsubscribe = function resolveAndUnsubscribe(evt, data) {
        var updatedCoupon = (evt === null || evt === void 0 ? void 0 : evt.couponCode) || (data === null || data === void 0 ? void 0 : data.couponCode);

        if (updatedCoupon === couponCode) {
          jsDPZ.topic(COUPON_REJECTED_EVENT).unsubscribe(resolveAndUnsubscribe);
          $(document).off(COUPON_ADDED_EVENT, resolveAndUnsubscribe);
          resolve();
        }
      };

      jsDPZ.topic(COUPON_REJECTED_EVENT).subscribe(resolveAndUnsubscribe);
      $(document).on(COUPON_ADDED_EVENT, resolveAndUnsubscribe);
    });
    simplr.controller.mRouteAndExecute(url);
    return Promise.all([].concat(_toConsumableArray(getCouponOnlyProducts(couponCode).map(addThresholdCouponProduct)), [couponPromise]));
  };

  var removeThresholdCoupon = function removeThresholdCoupon(_ref33) {
    var ID = _ref33.ID;
    return new Promise(function (resolve) {
      var COUPON_REMOVED_EVENT = "/order/coupon/delete/";
      var removeCouponURL = site.func.buildURL({
        url: "#!/order/coupons/".concat(ID, "/delete"),
        parameters: {
          skipValidation: true
        }
      });

      var resolveAndUnsubscribe = function resolveAndUnsubscribe(_, _ref34) {
        var orderCouponID = _ref34.orderCouponID;

        if (orderCouponID === ID) {
          $(document).off(COUPON_REMOVED_EVENT, resolveAndUnsubscribe);
          resolve();
        }
      };

      $(document).on(COUPON_REMOVED_EVENT, resolveAndUnsubscribe);
      simplr.controller.mRouteAndExecute(removeCouponURL);
    });
  };

  var applyThresholdCoupons = function applyThresholdCoupons() {
    var orderCoupons = jsDPZ.app.order.getOrder().data.Details.Coupons;
    return getEligibleThresholdCoupons().then(function (_ref35) {
      var _deliveryDiscountCoup, _thresholdCoupon$data;

      var deliveryDiscountCoupon = _ref35.deliveryDiscountCoupon,
          thresholdCoupon = _ref35.thresholdCoupon;
      var applicableThresholdCouponsCodes = [{
        couponCode: deliveryDiscountCoupon === null || deliveryDiscountCoupon === void 0 ? void 0 : (_deliveryDiscountCoup = deliveryDiscountCoupon.data) === null || _deliveryDiscountCoup === void 0 ? void 0 : _deliveryDiscountCoup.Code,
        suppressWizard: "1"
      }, {
        couponCode: thresholdCoupon === null || thresholdCoupon === void 0 ? void 0 : (_thresholdCoupon$data = thresholdCoupon.data) === null || _thresholdCoupon$data === void 0 ? void 0 : _thresholdCoupon$data.Code
      }].filter(function (_ref36) {
        var couponCode = _ref36.couponCode;
        return Boolean(couponCode);
      });
      var applicableThresholdCoupons = applicableThresholdCouponsCodes.filter(function (_ref37) {
        var couponCode = _ref37.couponCode;
        return orderCoupons.every(function (_ref38) {
          var Code = _ref38.Code;
          return Code !== couponCode;
        });
      });
      var removableThresholdCoupons = orderCoupons.filter(function (_ref39) {
        var Code = _ref39.Code;
        return getIsThresholdCoupon(Code) && getIsAutomaticallyApplied(Code) && applicableThresholdCouponsCodes.every(function (_ref40) {
          var couponCode = _ref40.couponCode;
          return couponCode !== Code;
        });
      });
      return Promise.all([].concat(_toConsumableArray(removableThresholdCoupons.map(removeThresholdCoupon)), _toConsumableArray(applicableThresholdCoupons.map(applyThresholdCoupon)))).then(function () {
        return Boolean(removableThresholdCoupons.length || applicableThresholdCoupons.length);
      });
    });
  };

  var getAreThresholdCouponsAvailable = function getAreThresholdCouponsAvailable() {
    return getThresholdCoupons({
      onlyAutomaticallyApplied: true
    }).length;
  };

  return {
    applyThresholdCoupons: applyThresholdCoupons,
    filterDeliveryDiscountProduct: filterDeliveryDiscountProduct,
    getAreThresholdCouponsAvailable: getAreThresholdCouponsAvailable,
    getIsAutomaticallyApplied: getIsAutomaticallyApplied,
    getIsDeliveryDiscountCoupon: getIsDeliveryDiscountCoupon,
    getIsDeliveryDiscountCouponInOrder: getIsDeliveryDiscountCouponInOrder,
    getIsThresholdCoupon: getIsThresholdCoupon,
    getNextNonEligibleThresholdCoupons: getNextNonEligibleThresholdCoupons,
    getThresholdCoupons: getThresholdCoupons,
    getThresholdOrderAmount: getThresholdOrderAmount
  };
});
//# sourceMappingURL=dpz.thresholdCoupons.js.map
