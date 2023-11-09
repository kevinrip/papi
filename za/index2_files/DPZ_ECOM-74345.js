function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define([
/* START ECOM-69775 */
"abtests/DPZ_ECOM-69775",
/* END ECOM-69775 */
"atLaunchDarkly", "dpz.abTesting", "dpz.config", "dpz.coupons", "dpz.template", "dpz.utag.constants", "marketconfig/dpz.lang.general"], function (
/* START ECOM-69775 */
_ref,
/* END ECOM-69775 */
_ref2, _ref3, _ref4, _ref5, _ref6, _ref7, generalStrings) {
  var getHasNationalStoreSelected = _ref.getHasNationalStoreSelected;
  var getOffer = _ref2.getOffer;
  var setTest = _ref3.setTest;
  var getMarketProperty = _ref4.getMarketProperty;
  var getIsNationalCoupon = _ref5.getIsNationalCoupon;
  var formatMoney = _ref6.formatMoney,
      decodeAndSanitize = _ref6.decodeAndSanitize,
      translate = _ref6.translate;
  var MINI_CART = _ref7.UTAG_EVENTS.MINI_CART;
  var couponsPageURL = "".concat(urlConfig.root, "/pages/order/#!/section/Coupons/category/All/");
  var EXPERIENCE_MAP = {
    cccb: "b",
    cccc: "c"
  };

  var getCouponCalloutTest = function getCouponCalloutTest() {
    var orderDetails = jsDPZ.app.order.getOrder().data.Details;
    var hasCoupons = orderDetails.Coupons.filter(function (_ref8) {
      var couponCode = _ref8.Code;
      return couponCode !== "SJRD";
    } // ignore St. Jude round-up
    ).length > 0;
    var hasEmptyCart = orderDetails.Variants.length === 0;
    /* START ECOM-69775 */

    var hasNationalStoreSelected = getHasNationalStoreSelected();
    if (hasNationalStoreSelected) return Promise.resolve(null);
    /* END ECOM-69775 */

    var isOnCouponsPage = window.location.hash.includes("/section/Coupons/");

    if (hasCoupons || hasEmptyCart || isOnCouponsPage) {
      return Promise.resolve(null);
    }

    return site.func.getOffers("DPZ_ECOM-74345").then(setTest);
  };

  var getFormattedExperience = function getFormattedExperience(_ref9) {
    var experience = _ref9.experience;
    return EXPERIENCE_MAP[experience];
  };

  var getHandleRouteToCoupons = function getHandleRouteToCoupons() {
    var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        closeMiniCart = _ref10.closeMiniCart;

    return function (e) {
      e.preventDefault();
      dpz.utag.fire.link(null, {
        event_name: e.target.textContent,
        modal_name: closeMiniCart ? MINI_CART : null
      });
      closeMiniCart === null || closeMiniCart === void 0 ? void 0 : closeMiniCart();
      window.location.href = couponsPageURL;
    };
  }; // Implementation: nothing below this line is needed for Experience B.


  var catalog = jsDPZ.app.catalog.getCatalog();
  var couponCalloutFilters = {
    notExcludedByOrderTiming: function notExcludedByOrderTiming(_ref11) {
      var NoFutureOrder = _ref11.Tags.NoFutureOrder;
      var isFutureOrder = !dpz.util.isEmpty(jsDPZ.app.order.getOrder().data.Details.OrderDateTime);
      return !NoFutureOrder || !isFutureOrder;
    },
    notUndefined: Boolean
  };
  var couponCalloutInitialState = {
    couponCalloutStatus: null,
    couponCalloutMessage: null,
    fulfilledLocalCoupons: [],
    shouldShowBrowseButton: false
  };

  var getText = function getText(key) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return decodeAndSanitize(translate("general.".concat(key), context, generalStrings));
  };

  var _map = ["add_coupon", "ecom74345_browse_coupons", "ecom74345_check_for_coupons", "ecom74345_checking_for_coupons"].map(getText),
      _map2 = _slicedToArray(_map, 4),
      addCouponLabel = _map2[0],
      browseCouponsLabel = _map2[1],
      checkForCouponsLabel = _map2[2],
      checkingForCoupons = _map2[3];

  var getCouponCalloutStatus = function getCouponCalloutStatus() {
    var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        fulfilledLocalCoupons = _ref12.fulfilledLocalCoupons,
        hasFulfilledCoupons = _ref12.hasFulfilledCoupons,
        hasUnfulfilledCoupons = _ref12.hasUnfulfilledCoupons;

    var hasNoResults = !hasFulfilledCoupons && !hasUnfulfilledCoupons;
    if (hasNoResults) return getText("ecom74345_no_coupons_found");
    return getText("ecom74345_coupons_found", {
      isSingular: (fulfilledLocalCoupons === null || fulfilledLocalCoupons === void 0 ? void 0 : fulfilledLocalCoupons.length) === 1 && !hasUnfulfilledCoupons
    });
  };

  var getCouponCalloutMessage = function getCouponCalloutMessage() {
    var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        hasFulfilledCoupons = _ref13.hasFulfilledCoupons,
        hasFulfilledLocalCoupons = _ref13.hasFulfilledLocalCoupons,
        hasFulfilledNationalCouponsOrAnyUnfulfilledCoupons = _ref13.hasFulfilledNationalCouponsOrAnyUnfulfilledCoupons,
        hasUnfulfilledCoupons = _ref13.hasUnfulfilledCoupons;

    var hasNoResults = !hasFulfilledCoupons && !hasUnfulfilledCoupons;

    if (hasNoResults) {
      return getText("ecom74345_none_of_our_coupons_quite_fit_your_order");
    }

    if (hasFulfilledNationalCouponsOrAnyUnfulfilledCoupons) {
      return hasFulfilledLocalCoupons ? getText("ecom74345_looking_for_something_else") : getText("ecom74345_we_found_you_more_ways_to_save");
    }

    return null;
  };

  var getCouponCalloutState = function getCouponCalloutState(_ref14) {
    var _ref14$maxFulfilledLo = _ref14.maxFulfilledLocalCoupons,
        maxFulfilledLocalCoupons = _ref14$maxFulfilledLo === void 0 ? 2 : _ref14$maxFulfilledLo,
        setIsMakingAutoCouponRequest = _ref14.setIsMakingAutoCouponRequest;
    return $.Deferred(function (_ref15) {
      var resolve = _ref15.resolve;
      // Implementation: we might want to rename toggleMakingFetchRequest in the
      // mini cart to clarify what kind of fetch it's making (also, it's more of
      // a setter than a toggle). The coupon section has its own fetch animation
      // that happens independently of the main section.
      setIsMakingAutoCouponRequest(true);
      return site.func.getOrderForPowerData().then(function (orderData) {
        return jsDPZ.ajax.getAllCouponsForOrder({
          data: orderData,
          toggleLoadingBar: false
        });
      })
      /* startDevBlock */
      .then(function (couponData) {
        var getCouponCodesList = function getCouponCodesList(commaSeparatedCodes) {
          return (commaSeparatedCodes === null || commaSeparatedCodes === void 0 ? void 0 : commaSeparatedCodes.split(",").filter(function (code) {
            return !isNaN(code);
          })) || [];
        };

        var testParameters = new URLSearchParams(window.location.search);

        var _map$map = ["fc", "uc"].map(function (parameter) {
          return testParameters.get(parameter);
        }).map(getCouponCodesList),
            _map$map2 = _slicedToArray(_map$map, 2),
            fulfilledCouponCodes = _map$map2[0],
            unfulfilledCouponCodes = _map$map2[1];

        var useMockedCodes = [fulfilledCouponCodes, unfulfilledCouponCodes].some(function (a) {
          return a.length > 0;
        });
        return useMockedCodes ? {
          fulfilledCoupons: fulfilledCouponCodes,
          unfulfilledCoupons: unfulfilledCouponCodes
        } : couponData;
      })
      /* endDevBlock */
      .then(function (couponData) {
        var notExcludedByOrderTiming = couponCalloutFilters.notExcludedByOrderTiming,
            notUndefined = couponCalloutFilters.notUndefined;
        var fulfilledCouponCodes = couponData.fulfilledCoupons,
            unfulfilledCouponCodes = couponData.unfulfilledCoupons;
        var fulfilledLocalCoupons = fulfilledCouponCodes.filter(function (couponCode) {
          return !getIsNationalCoupon(couponCode);
        }).map(function (couponCode) {
          return catalog.data.Coupons[couponCode];
        }) // The auto-couponing service doesn't always return coupons that we can show. Add filters to fine-tune the results as necessary.
        .filter(notUndefined).filter(notExcludedByOrderTiming) // Only keep as many coupons as we plan to show
        .slice(0, maxFulfilledLocalCoupons);

        var _map3 = [fulfilledLocalCoupons, unfulfilledCouponCodes].map(function (a) {
          return Boolean(a.length);
        }),
            _map4 = _slicedToArray(_map3, 2),
            hasFulfilledLocalCoupons = _map4[0],
            hasUnfulfilledCoupons = _map4[1];

        var hasFulfilledNationalCoupons = fulfilledCouponCodes.some(getIsNationalCoupon);
        var hasFulfilledCoupons = hasFulfilledLocalCoupons || hasFulfilledNationalCoupons;
        var hasFulfilledNationalCouponsOrAnyUnfulfilledCoupons = hasFulfilledNationalCoupons || hasUnfulfilledCoupons;
        /* There are five core rules that determine what's displayed in this widget:
        1. If we don't have any coupons, show the "No Coupons Found" heading and message.
        2. If we have fulfilled or unfulfilled coupons, show the "Coupon(s) Found" heading (singular if only one fulfilled local coupon was found, otherwise plural).
        3. If we have fulfilled local coupons, show the coupon description and "Add" button for each fulfilled local coupon, up to a maximum of `maxFulfilledLocalCoupons`.
        4. If we have fulfilled national coupons and/or unfulfilled coupons (local or national), show the "We found..." message and "Browse Coupons" button.
        5. If both 3 & 4 are true, update the "We found..." message to "Looking for something else?"
        */

        var couponCalloutStatus = getCouponCalloutStatus({
          fulfilledLocalCoupons: fulfilledLocalCoupons,
          hasFulfilledCoupons: hasFulfilledCoupons,
          hasUnfulfilledCoupons: hasUnfulfilledCoupons
        });
        var couponCalloutMessage = getCouponCalloutMessage({
          hasFulfilledCoupons: hasFulfilledCoupons,
          hasFulfilledLocalCoupons: hasFulfilledLocalCoupons,
          hasFulfilledNationalCouponsOrAnyUnfulfilledCoupons: hasFulfilledNationalCouponsOrAnyUnfulfilledCoupons,
          hasUnfulfilledCoupons: hasUnfulfilledCoupons
        });
        var shouldShowBrowseButton = hasFulfilledNationalCouponsOrAnyUnfulfilledCoupons;
        resolve({
          couponCalloutStatus: couponCalloutStatus,
          couponCalloutMessage: couponCalloutMessage,
          fulfilledLocalCoupons: fulfilledLocalCoupons,
          shouldShowBrowseButton: shouldShowBrowseButton
        });
      }).fail(function () {
        resolve({
          couponCalloutStatus: getCouponCalloutStatus(),
          couponCalloutMessage: getCouponCalloutMessage(),
          fulfilledLocalCoupons: [],
          shouldShowBrowseButton: false
        });
      }).always(function () {
        setIsMakingAutoCouponRequest(false);
      });
    });
  };

  var getFormattedPrice = function getFormattedPrice(price) {
    return formatMoney(price, getMarketProperty("numbers"));
  };

  var getHandleCheckForCoupons = function getHandleCheckForCoupons(_ref16) {
    var getFulfilledLocalCoupons = _ref16.getFulfilledLocalCoupons,
        getIsExpanded = _ref16.getIsExpanded,
        getShouldShowBrowseButton = _ref16.getShouldShowBrowseButton,
        setCouponCalloutState = _ref16.setCouponCalloutState,
        setIsExpanded = _ref16.setIsExpanded,
        setIsMakingAutoCouponRequest = _ref16.setIsMakingAutoCouponRequest;
    return function (e) {
      e.preventDefault();
      var fulfilledLocalCoupons = getFulfilledLocalCoupons();
      var isExpanded = getIsExpanded();
      var shouldShowBrowseButton = getShouldShowBrowseButton();
      dpz.utag.fire.link(null, {
        event_name: [e.target.textContent, "-", isExpanded ? "Collapse" : "Expand"].join(" ")
      });
      setIsExpanded(!isExpanded);
      if (fulfilledLocalCoupons.length || shouldShowBrowseButton) return;
      getCouponCalloutState({
        setIsMakingAutoCouponRequest: setIsMakingAutoCouponRequest
      }).then(setCouponCalloutState);
    };
  };

  var setCatalog = function setCatalog() {
    catalog = jsDPZ.app.catalog.getCatalog();
  };

  jsDPZ.topic("catalog.set").unsubscribe(setCatalog).subscribe(setCatalog);
  return {
    addCouponLabel: addCouponLabel,
    browseCouponsLabel: browseCouponsLabel,
    checkForCouponsLabel: checkForCouponsLabel,
    checkingForCoupons: checkingForCoupons,
    couponCalloutInitialState: couponCalloutInitialState,
    couponsPageURL: couponsPageURL,
    getCouponCalloutState: getCouponCalloutState,
    getCouponCalloutTest: getCouponCalloutTest,
    getFormattedExperience: getFormattedExperience,
    getFormattedPrice: getFormattedPrice,
    getHandleCheckForCoupons: getHandleCheckForCoupons,
    getHandleRouteToCoupons: getHandleRouteToCoupons,
    getOffer: getOffer,
    mboxName: "DPZ_ECOM-74345",
    validExperiences: Object.keys(EXPERIENCE_MAP)
  };
});
//# sourceMappingURL=DPZ_ECOM-74345.js.map
