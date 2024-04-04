function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.couponWizardUpsell", ["dpz.config", "dpz.template", "marketconfig/dpz.lang.builders", "simplr", "site.funcs"], function (_ref, _ref2, buildersStrings, _ref3, _ref4) {
  var isMarketEnabled = _ref.isMarketEnabled;
  var getTranslateContextValue = _ref2.getTranslateContextValue;
  var mRouteAndExecute = _ref3.controller.mRouteAndExecute;
  var buildURL = _ref4.func.buildURL;
  var UPSELL_COUPON = {
    DRINKS: "8223"
  };
  var isProductStackWizardEnabled = isMarketEnabled("7891a7b8-b45a-41c0-8f9d-f6c453f17755");
  var isCouponUpsellEnabled = isMarketEnabled("283a55d7-5efa-4fa1-8b68-c9e24884da0d");

  var getOrder = function getOrder() {
    return jsDPZ.app.order.getOrder();
  };

  var getOrderDetails = function getOrderDetails() {
    return getOrder().data.Details;
  };

  var getCatalog = function getCatalog() {
    return jsDPZ.app.catalog.getCatalog();
  };

  var renderAddDrinksButton = function renderAddDrinksButton(couponCode) {
    if (isProductStackWizardEnabled && isCouponUpsellEnabled) {
      var findWizardCoupon = function findWizardCoupon(_ref5) {
        var Code = _ref5.Code;
        return Code === couponCode;
      };

      var getIsFulfilled = function getIsFulfilled() {
        var _getOrderDetails = getOrderDetails(),
            Coupons = _getOrderDetails.Coupons;

        var _ref6 = Coupons.find(findWizardCoupon) || {},
            Fulfilled = _ref6.Fulfilled;

        return Fulfilled;
      };

      var getUpsellCouponCode = function getUpsellCouponCode() {
        var _coupon$Tags;

        var coupon = getCatalog().getCoupon(couponCode).data;
        return coupon === null || coupon === void 0 ? void 0 : (_coupon$Tags = coupon.Tags) === null || _coupon$Tags === void 0 ? void 0 : _coupon$Tags.OnFulFilledUpsellCoupon;
      };

      var closeModal = function closeModal() {
        return site.func.overlayToggle(false);
      };

      var fetchUpsellCoupon = function fetchUpsellCoupon() {
        var orderDetails = getOrderDetails();
        var StoreID = orderDetails.StoreID;
        return jsDPZ.ajax.coupon({
          CouponCode: upsellCouponCode,
          StoreID: StoreID
        });
      };

      var addUpsellCoupon = function addUpsellCoupon() {
        site.sessionTools.save();
        var parameters = {
          code: upsellCouponCode,
          qty: "1"
        };
        var addUpsellCouponUrl = site.func.buildURL({
          url: "#/order/coupons/new",
          parameters: parameters
        });
        mRouteAndExecute(addUpsellCouponUrl);
      };

      var tryOnFulfilledUpsellCoupon = function tryOnFulfilledUpsellCoupon() {
        var upsellCouponCode = getUpsellCouponCode();
        var hasUpsellCoupon = Boolean(upsellCouponCode);

        if (hasUpsellCoupon) {
          closeModal();
          fetchUpsellCoupon().then(addUpsellCoupon);
        }
      };

      var upsellCouponCode = getUpsellCouponCode();
      var isDrinkUpsell = upsellCouponCode === UPSELL_COUPON.DRINKS;
      var isFulfilled = getIsFulfilled();

      if (isDrinkUpsell && isFulfilled) {
        require(["order.components"], function (_ref7) {
          var AddDrinksButton = _ref7.AddDrinksButton,
              TranslateContext = _ref7.TranslateContext;

          var _document$getElements = document.getElementsByClassName("js-addDrinksButton"),
              _document$getElements2 = _slicedToArray(_document$getElements, 1),
              container = _document$getElements2[0];

          var addDrinks = function addDrinks() {
            return tryOnFulfilledUpsellCoupon(upsellCouponCode);
          };

          var props = {
            addDrinks: addDrinks
          };
          preact.render(preact.h(TranslateContext.Provider, {
            value: getTranslateContextValue(buildersStrings)
          }, preact.h(AddDrinksButton, props)), container);
        });
      }
    }
  };

  var COUPON = "coupon";
  var COUPONS = "coupons";
  var VARIANT = "variant";

  var getIsCoupon = function getIsCoupon(_ref8) {
    var producttype = _ref8.producttype;
    return producttype === COUPON;
  };

  var getDeleteItemUrl = function getDeleteItemUrl(variant) {
    var isCoupon = getIsCoupon(variant);
    var path = isCoupon ? COUPONS : VARIANT;
    var id = variant.id;
    return "#!/order/".concat(path, "/").concat(id, "/delete");
  };

  var removeBundledProducts = function removeBundledProducts(coupon) {
    var order = getOrder();
    var ID = coupon.ID;
    var orderItem = order.getItemData({
      ID: ID
    });

    var _ref9 = (orderItem === null || orderItem === void 0 ? void 0 : orderItem.Tags) || {},
        targetHash = _ref9.Hash;

    if (targetHash) {
      var getVariantsByHash = function getVariantsByHash() {
        var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            Tags = _ref10.Tags;

        return (Tags === null || Tags === void 0 ? void 0 : Tags.couponHash) === targetHash;
      };

      var getVariantId = function getVariantId(_ref11) {
        var variantID = _ref11.ID;
        return variantID;
      };

      var variantIds = getOrderDetails().Variants.filter(getVariantsByHash).map(getVariantId);

      var uniqueVariantIds = _toConsumableArray(new Set(variantIds));

      var getDeleteVariantUrl = function getDeleteVariantUrl(id) {
        return buildURL({
          url: getDeleteItemUrl({
            id: id
          }),
          parameters: {
            toggleLoadingBar: 0,
            skipValidation: true
          }
        });
      };

      uniqueVariantIds.map(getDeleteVariantUrl).forEach(mRouteAndExecute);
    }
  };

  return {
    getDeleteItemUrl: getDeleteItemUrl,
    removeBundledProducts: removeBundledProducts,
    renderAddDrinksButton: renderAddDrinksButton
  };
});
//# sourceMappingURL=dpz.couponWizardUpsell.js.map
