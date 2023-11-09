function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.storeAssistanceModule.state", ["dpz.goloDuc", "dpz.storeAssistanceModule.constants", "dpz.template"], function (_ref, _ref2, dpzTemplate) {
  var getIsGoloDucOrderingEnabled = _ref.getIsGoloDucOrderingEnabled;
  var serviceMethodsEnum = _ref2.SERVICE_METHODS;

  var fireAction = function fireAction() {
    var _dpz$utag$fire;

    return (_dpz$utag$fire = dpz.utag.fire).link.apply(_dpz$utag$fire, arguments);
  };

  var state = {
    dpzTemplate: dpzTemplate,
    fireAction: fireAction,
    isGoloDucEnabled: getIsGoloDucOrderingEnabled(),
    serviceMethodsEnum: serviceMethodsEnum,
    site: site
  };

  var getState = function getState() {
    return state;
  };

  var setState = function setState(nextState) {
    state = _objectSpread(_objectSpread({}, state), nextState);
    return state;
  };

  var sessionOptions = {
    isDucOrder: false,
    isPickupOrder: false
  };
  return {
    getState: getState,
    setState: setState,
    sessionOptions: sessionOptions
  };
});
//# sourceMappingURL=dpz.storeAssistanceModule.state.js.map
