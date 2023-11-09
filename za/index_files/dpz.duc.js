function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.duc", ["simplr"], function (simplr) {
  var getDucData = function getDucData(orderData) {
    return new Promise(function (resolve) {
      if (killConfig.isMarketEnabled("042342a3-4099-462f-9c1e-e4049c8ad1da")) {
        // Get data from original TPS call
        orderData.carsideOrder ? resolve({
          storeNumber: orderData.StoreID,
          status: orderData.carsideOrder.status,
          orderPlacement: orderData.carsideOrder.orderPlacement,
          autoCheckInEnabled: orderData.carsideOrder.autoCheckInEnabled,
          autoCheckedIn: orderData.carsideOrder.autoCheckedIn
        }) : resolve({
          storeNumber: orderData.StoreID
        });
      } else {
        // Get data from DPS /duc endpoint
        jsDPZ.ajax.duc({
          orderId: orderData.PulseOrderGuid,
          apiKey: urlConfig.dpsApiKey
        }).then(resolve)["catch"](function () {
          return resolve({});
        });
      }
    });
  };

  var handleStoreClosedForCarside = function handleStoreClosedForCarside() {
    var onServiceMethodChange = function onServiceMethodChange() {
      simplr.controller.mRouteAndExecute("/order/price/");
      jsDPZ.topic("priceOrder.success").subscribe(function () {
        site.storage.remove("dpz_store_data"); // force site to get current hours

        window.location.reload();
      });
    };

    var updateServiceMethod = function updateServiceMethod() {
      return site.func.changeServiceMethod("Carryout", null, onServiceMethodChange);
    };

    site.func.overlayToggle(true, "codeOverlay", {}, {
      code: "eStoreClosedForCarside",
      closeHandler: function closeHandler() {
        // remove dcd flag from order data
        var orderData = jsDPZ.app.order.getOrder().data;
        delete orderData.isDucOrder;
        delete orderData.metaData.OriginalServiceMethod; // remove dcd coupons

        site.sessionTools.save().then(function () {
          var ducOnlyCoupons = jsDPZ.app.order.getOrder().data.Details.Coupons.filter(function (_ref) {
            var Code = _ref.Code;
            var couponServiceMethods = jsDPZ.app.catalog.getCatalog().getCoupon(Code).getServiceMethods();
            return couponServiceMethods.includes("Carside") && !couponServiceMethods.includes("Carryout");
          });

          if (ducOnlyCoupons.length) {
            var deleteDucOnlyCoupons = function deleteDucOnlyCoupons(_ref2) {
              var _ref3 = _toArray(_ref2),
                  nextCoupon = _ref3[0],
                  ducCoupons = _ref3.slice(1);

              if (nextCoupon) {
                var ID = nextCoupon.ID;
                simplr.controller.mRouteAndExecute(site.func.buildURL({
                  url: "#!/order/coupons/".concat(ID, "/delete"),
                  parameters: {
                    skipValidation: true
                  }
                }));
                $(document).one("/order/coupon/delete/", function () {
                  return deleteDucOnlyCoupons(ducCoupons);
                });
              } else {
                updateServiceMethod();
              }
            };

            deleteDucOnlyCoupons(ducOnlyCoupons);
          } else {
            updateServiceMethod();
          }
        });
      }
    });
  };

  var isCarsideCouponActive = function isCarsideCouponActive(couponCode) {
    var _coupon$getServiceMet;

    var catalog = jsDPZ.app.catalog;
    var store = jsDPZ.app.store.getStore();
    var coupon = catalog.getCatalog().getCoupon(couponCode);
    var couponServiceMethods = (coupon === null || coupon === void 0 ? void 0 : (_coupon$getServiceMet = coupon.getServiceMethods) === null || _coupon$getServiceMet === void 0 ? void 0 : _coupon$getServiceMet.call(coupon)) || [];

    if (store.data.AllowDuc && store.getAvailableServiceMethods().includes("DriveUpCarryout") && (!couponServiceMethods.length || couponServiceMethods.includes("Carside"))) {
      var isCouponActive = catalog.isCouponActive(couponCode); // BTB wants to by-pass the eCouponServiceMethod, so during this error, we still show the coupon.

      return isCouponActive.Success || isCouponActive.ErrorCodes.length === 1 && isCouponActive.ErrorCodes[0] === "eCouponServiceMethod" && jsDPZ.app.order.getOrder().data.Details.ServiceMethod === "Carryout";
    } else {
      return false;
    }
  };

  var deleteDucCoupons = function deleteDucCoupons(_ref4) {
    var _ref4$validateOrder = _ref4.validateOrder,
        validateOrder = _ref4$validateOrder === void 0 ? false : _ref4$validateOrder;
    var orderData = jsDPZ.app.order.getOrder().data;
    delete orderData.isDucOrder;
    delete orderData.metaData.OriginalServiceMethod;
    site.sessionTools.save().then(function () {
      var ducOnlyCoupons = jsDPZ.app.order.getOrder().data.Details.Coupons.filter(function (_ref5) {
        var Code = _ref5.Code;
        var couponServiceMethods = jsDPZ.app.catalog.getCatalog().getCoupon(Code).getServiceMethods();
        return couponServiceMethods.includes("Carside") && !couponServiceMethods.includes("Carryout");
      });

      if (ducOnlyCoupons.length) {
        var deleteDucOnlyCoupons = function deleteDucOnlyCoupons(_ref6) {
          var _ref7 = _toArray(_ref6),
              nextCoupon = _ref7[0],
              ducCoupons = _ref7.slice(1);

          if (nextCoupon) {
            var ID = nextCoupon.ID;
            simplr.controller.mRouteAndExecute(site.func.buildURL({
              url: "#!/order/coupons/".concat(ID, "/delete"),
              parameters: {
                skipValidation: true
              }
            }));
            $(document).one("/order/coupon/delete/", function () {
              return deleteDucOnlyCoupons(ducCoupons);
            });
          }
        };

        deleteDucOnlyCoupons(ducOnlyCoupons);
      }

      if (site.isPaymentPage) {
        simplr.controller.mRouteAndExecute("/checkout/payment/");
      } else if (site.func.isOnCheckoutPage()) {
        simplr.controller.mRouteAndExecute("/checkout/");
      } else if (validateOrder) {
        simplr.controller.mRouteAndExecute("/order/validate/");
      } else {
        site.func.renderProfileInColumn();
      }
    });
  };

  return {
    getDucData: getDucData,
    handleStoreClosedForCarside: handleStoreClosedForCarside,
    isCarsideCouponActive: isCarsideCouponActive,
    deleteDucCoupons: deleteDucCoupons
  };
});
//# sourceMappingURL=dpz.duc.js.map
