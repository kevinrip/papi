function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(["atLaunchDarkly", "dpz.serviceMethod.constants", "dpz.template", "simplr"], function (_ref, _ref2, template, _ref3) {
  var getOffer = _ref.getOffer;
  var CARRYOUT = _ref2.CARRYOUT;
  var controller = _ref3.controller;
  // Implementation: we'll probably use the existing national stores for this,
  // so check dpz.market.marketConfig.nationalMenu.dataDriven instead of 9958.
  var ECOM69775_NATIONAL_STORE_ID = "9958";

  var setNationalStore = function setNationalStore() {
    var orderData = jsDPZ.app.order.getOrder().data;
    var Session = jsDPZ.app.customer.getCustomer().data.Session;
    orderData.Details.StoreID = ECOM69775_NATIONAL_STORE_ID;
    orderData.Details.ServiceMethod = CARRYOUT;
    Session.StoreID = ECOM69775_NATIONAL_STORE_ID;
    Session.ServiceMethod = CARRYOUT;
    site.sessionTools.save();
  };

  var getHasNationalStoreSelected = function getHasNationalStoreSelected() {
    var StoreID = jsDPZ.app.order.getOrder().data.Details.StoreID;
    return StoreID === ECOM69775_NATIONAL_STORE_ID;
  };

  var handleNationalStoreLogin = function handleNationalStoreLogin(route) {
    var resetAndRoute = function resetAndRoute() {
      jsDPZ.topic("catalog.set").unsubscribe(resetAndRoute);
      site.oloTools.reset();
      controller.mRouteAndExecute(route);
    };

    jsDPZ.topic("catalog.set").subscribe(resetAndRoute);
    $(window).on("hashchange", function () {
      jsDPZ.topic("catalog.set").unsubscribe(resetAndRoute);
    });
  };

  var miniCartContinueHandler = function miniCartContinueHandler(closeMiniCart) {
    var continueHandler = function continueHandler() {
      closeMiniCart();
      redirectToCheckoutAfterLocator();
    };

    if (!site.func.hasCouponPrerequisiteUnfulfilled({
      continueHandler: continueHandler
    })) {
      continueHandler();
    }
  };

  var redirectToCheckoutAfterLocator = function redirectToCheckoutAfterLocator() {
    jsDPZ.app.customer.getCustomer().data.Session.ecom69775RedirectAfterLocator = "#!/checkout/";
    site.sessionTools.save().then(function () {
      return window.location.href = "".concat(urlConfig.root, "/pages/order/#!/locations/search");
    });
  };

  var suppressWaterfallUpsell = function suppressWaterfallUpsell() {
    var Session = jsDPZ.app.customer.getCustomer().data.Session;
    var _Session$waterfallUps = Session.waterfallUpsellAttempts,
        waterfallUpsellAttempts = _Session$waterfallUps === void 0 ? 0 : _Session$waterfallUps;
    Session.waterfallUpsellAttempts = waterfallUpsellAttempts + 1;
    jsDPZ.app.order.getOrder().data.HasSeenUpsell = true;
    site.sessionTools.save();
  };

  var renderFindStoreButton = function renderFindStoreButton(selector, isMainNav) {
    require(["shared.components", "marketconfig/dpz.lang.navigation"], function (_ref4, navigationStrings) {
      var FindAStoreButton = _ref4.FindAStoreButton,
          TranslateContext = _ref4.TranslateContext;
      var mountingSelector = document.querySelector(selector);
      mountingSelector && preact.render(preact.h(TranslateContext.Provider, {
        value: template.getTranslateContextValue(navigationStrings)
      }, preact.h(FindAStoreButton, {
        ctx: template.contextFixed.ctx,
        isMainNav: isMainNav,
        isMobile: site.func.isHandheld()
      })), mountingSelector);
    });
  };

  var renderFindLocalCoupons = function renderFindLocalCoupons() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        headingLevel = _ref5.headingLevel;

    require(["order.components", "marketconfig/dpz.lang.nationalCoupon"], function (_ref6, nationalCouponStrings) {
      var FindLocalCouponsCard = _ref6.FindLocalCouponsCard,
          TranslateContext = _ref6.TranslateContext;
      var findLocalCouponsContainer = document.querySelector(".js-ecom69775__find-local-coupons");
      preact.render(preact.h(TranslateContext.Provider, {
        value: template.getTranslateContextValue(_objectSpread({}, nationalCouponStrings))
      }, preact.h(FindLocalCouponsCard, {
        ctx: template.contextFixed.ctx,
        headingLevel: headingLevel
      })), findLocalCouponsContainer);
    });
  };

  return {
    ECOM69775_NATIONAL_STORE_ID: ECOM69775_NATIONAL_STORE_ID,
    getHasNationalStoreSelected: getHasNationalStoreSelected,
    getOffer: getOffer,
    handleNationalStoreLogin: handleNationalStoreLogin,
    mboxName: "DPZ_ECOM-69775",
    miniCartContinueHandler: miniCartContinueHandler,
    redirectToCheckoutAfterLocator: redirectToCheckoutAfterLocator,
    renderFindLocalCoupons: renderFindLocalCoupons,
    renderFindStoreButton: renderFindStoreButton,
    setNationalStore: setNationalStore,
    suppressWaterfallUpsell: suppressWaterfallUpsell,
    validExperiences: ["obpl"]
  };
});
//# sourceMappingURL=DPZ_ECOM-69775.js.map
