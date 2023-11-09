define("dpz.storeAssistanceModule", ["dpz.storeAssistanceModule.initialize", "dpz.storeAssistanceModule.props", "dpz.storeAssistanceModule.renderer"], function (_ref, _ref2, _ref3) {
  var initSamNav = _ref.initSamNav;
  var hasInteractedWithSam = _ref2.hasInteractedWithSam,
      getShouldShowSam = _ref2.getShouldShowSam,
      getIsAutoSet = _ref2.getIsAutoSet;
  var openModal = _ref3.openModal;
  return {
    initSamNav: initSamNav,
    openModal: openModal,
    hasInteractedWithSam: hasInteractedWithSam,
    getShouldShowSam: getShouldShowSam,
    getIsSamAutoSet: getIsAutoSet
  };
});
//# sourceMappingURL=dpz.storeAssistanceModule.js.map
