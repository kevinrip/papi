function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

define("dpz.storeAssistanceModule.renderer", [
/* START ECOM-69775 */
"abtests/DPZ_ECOM-69775",
/* END ECOM-69775 */
"dpz.storeAssistanceModule.props", "dpz.storeAssistanceModule.state", "dpz.storeAssistanceModule.handlers", "shared.components", "contexts.components", "dpz.template", "marketconfig/dpz.lang.overlays", "marketconfig/dpz.lang.navigation", "marketconfig/dpz.lang.forms", "marketconfig/dpz.lang.home"], function (
/* START ECOM-69775 */
_ref,
/* END ECOM-69775 */
_ref2, _ref3, _ref4, _ref5, _ref6, template, overlayStrings, navigationStrings, formsStrings, homeStrings) {
  var getHasNationalStoreSelected = _ref.getHasNationalStoreSelected;
  var setInteractedWithSam = _ref2.setInteractedWithSam;
  var getState = _ref3.getState;
  var handleServiceMethodChangeInSam = _ref4.handleServiceMethodChangeInSam,
      handleInactiveClick = _ref4.handleInactiveClick;
  var FindAStoreButton = _ref5.FindAStoreButton,
      StoreAssistanceModuleNav = _ref5.StoreAssistanceModuleNav,
      StoreAssistanceModuleNavModal = _ref5.StoreAssistanceModuleNavModal,
      TranslateContext = _ref5.TranslateContext;
  var withGNOLOContext = _ref6.withGNOLOContext;

  var renderSam = function renderSam() {
    var orderSettings = document.getElementsByClassName("js-orderSettings");

    if (orderSettings[0]) {
      orderSettings[0].classList.add("is-hidden");
    }

    if (getState().isHotSpot) {
      // don't show sam for hotspots
      return;
    }
    /* START ECOM-69775 */


    var hasNationalStoreSelected = getHasNationalStoreSelected();
    /* END ECOM-69775 */

    var containers = [{
      container: document.getElementById("js-storeAssistanceModule"),

      /* START ECOM-69775 */
      isMainNav: true,

      /* END ECOM-69775 */
      mobile: false
    }, {
      container: document.getElementById("js-storeAssistanceModuleMobile"),

      /* START ECOM-69775 */
      isMainNav: true,

      /* END ECOM-69775 */
      mobile: true
    },
    /* START ECOM-69775 */
    {
      container: hasNationalStoreSelected ? document.querySelector(".js-ecom69775__order-details--find-store-btn") : null
    }
    /* END ECOM-69775 */
    ];
    /* START ECOM-69775 */

    if (hasNationalStoreSelected) {
      containers.forEach(function (_ref7) {
        var container = _ref7.container,
            isMainNav = _ref7.isMainNav;
        container && preact.render(preact.h(TranslateContext.Provider, {
          value: template.getTranslateContextValue(navigationStrings)
        }, preact.h(FindAStoreButton, {
          ctx: template.contextFixed.ctx,
          isMainNav: isMainNav,
          isMobile: site.func.isHandheld()
        })), container);
      });
    } else {
      /* END ECOM-69775 */
      containers.forEach(function (_ref8) {
        var container = _ref8.container,
            mobile = _ref8.mobile;
        container && preact.render(preact.h(TranslateContext.Provider, {
          value: template.getTranslateContextValue(navigationStrings)
        }, preact.h(StoreAssistanceModuleNav, _extends({}, getState(), {
          handleServiceMethodChangeInSam: handleServiceMethodChangeInSam,
          isMobile: mobile,
          openModal: openModal,
          handleInactiveClick: handleInactiveClick
        }))), container);
      });
      /* START ECOM-69775 */
    }
    /* END ECOM-69775 */

  };

  var StoreAssistanceModuleNavModalWithGNOLO = withGNOLOContext(StoreAssistanceModuleNavModal);

  var openModal = function openModal(props) {
    preact.render(preact.h(TranslateContext.Provider, {
      value: template.getTranslateContextValue(_objectSpread(_objectSpread(_objectSpread({}, overlayStrings), formsStrings), homeStrings))
    }, preact.h(StoreAssistanceModuleNavModalWithGNOLO, _extends({}, props, getState(), {
      handleServiceMethodChangeInSam: handleServiceMethodChangeInSam,
      setInteractedWithSam: setInteractedWithSam
    }))), document.querySelector(".js-modalContainer"));
  };

  return {
    renderSam: renderSam,
    openModal: openModal
  };
});
//# sourceMappingURL=dpz.storeAssistanceModule.renderer.js.map
