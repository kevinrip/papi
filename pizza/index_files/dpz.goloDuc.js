function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.goloDuc", ["dpz.config"], function (_ref) {
  var getMarketProperty = _ref.getMarketProperty;

  var getIsGoloDucOrderingEnabled = function getIsGoloDucOrderingEnabled() {
    return killConfig.isMarketEnabled("profileColumnCurbsideCarryoutCheckbox") || killConfig.isMarketEnabled("9ad5cf4d-c802-4fbf-909c-d7fba83bf401");
  };

  var getIsGOLOCurbsideEnabled = function getIsGOLOCurbsideEnabled() {
    return killConfig.isMarketEnabled("9ad5cf4d-c802-4fbf-909c-d7fba83bf401");
  };

  var isGoloDucCapableSync = function isGoloDucCapableSync() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        AllowDuc = _ref2.AllowDuc;

    return getIsGOLOCurbsideEnabled() && AllowDuc;
  };

  var goloDucCapable = function goloDucCapable(StoreID) {
    var isEnabled = getIsGOLOCurbsideEnabled();
    return new Promise(function (resolve, reject) {
      if (!isEnabled) return resolve(false);
      var isTrackerPage = site.func.isTrackerPage();
      var currentStore = jsDPZ.app.store.getStore();
      var currentStoreID = currentStore.data.StoreID;
      var shouldFetchStoreProfile = isTrackerPage || currentStoreID !== StoreID;

      var isDUCAllowed = function isDUCAllowed() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            AllowDuc = _ref3.AllowDuc;

        return AllowDuc;
      };

      shouldFetchStoreProfile ? jsDPZ.ajax.storeProfile({
        StoreID: StoreID
      }).then(isDUCAllowed, function () {
        return resolve(false);
      }) : resolve(isDUCAllowed(currentStore.data));
    });
  };

  var getIsGoloDucAvailable = function getIsGoloDucAvailable(orderData, StoreID) {
    return orderData.Details.ServiceMethod === "Carryout" ? goloDucCapable(StoreID) : new Promise(function (resolve) {
      return resolve(false);
    });
  };

  var showLocatorAndOrderSettingsIndicator = function showLocatorAndOrderSettingsIndicator(storeData) {
    return isGoloDucCapableSync(storeData) && getMarketProperty("order").showLocatorAndOrderSettingsIndicator;
  };

  var renderGoloDucSection = function renderGoloDucSection(renderContainer, preselectGoloDuc) {
    require(["payment.components", "marketconfig/dpz.lang.payment", "marketconfig/dpz.lang.forms"], function (_ref4, paymentStrings, formsStrings) {
      var GoloDucCard = _ref4.GoloDucCard,
          TranslateContext = _ref4.TranslateContext;
      var floatingLabelTextbox = killConfig.isMarketEnabled("36999e17-35a4-4ef4-b911-d4d4917b79a0") && getMarketProperty("generic").floatingLabelTextbox;
      preact.render(preact.h(TranslateContext.Provider, {
        value: dpz.template.getTranslateContextValue(_objectSpread(_objectSpread({}, paymentStrings), formsStrings))
      }, preact.h(GoloDucCard, {
        initialShowFormState: preselectGoloDuc,
        floatingLabelTextbox: floatingLabelTextbox
      })), renderContainer);
    });
  };

  var renderIHaveArrivedSection = function renderIHaveArrivedSection(_ref5) {
    var _okToRenderMainChecki;

    var orderData = _ref5.orderData,
        orderStatus = _ref5.orderStatus;
    var _orderData$Customer = orderData.Customer;
    _orderData$Customer = _orderData$Customer === void 0 ? {} : _orderData$Customer;
    var FullPhone = _orderData$Customer.FullPhone,
        Phone = _orderData$Customer.Phone,
        PhonePrefix = _orderData$Customer.PhonePrefix,
        Extension = _orderData$Customer.Extension,
        FirstName = _orderData$Customer.FirstName,
        LastName = _orderData$Customer.LastName,
        _orderData$Details = orderData.Details;
    _orderData$Details = _orderData$Details === void 0 ? {} : _orderData$Details;
    var ServiceMethod = _orderData$Details.ServiceMethod,
        StoreID = _orderData$Details.StoreID,
        StoreOrderID = _orderData$Details.StoreOrderID,
        StorePlaceOrderTime = _orderData$Details.StorePlaceOrderTime;
    var nameMissing = !FirstName || !LastName;
    var fullPhone = FullPhone || "".concat(PhonePrefix).concat(Phone).concat(Extension);
    var goloDucVehicleDetails = JSON.parse(site.storage.load("golo_duc_vehicle_details") || "{}")[fullPhone];
    var okToRenderMainCheckinSection = (site.isConfirmationPage && !!goloDucVehicleDetails || !site.isConfirmationPage && ServiceMethod === "Carry-Out") && goloDucCapable(StoreID);
    okToRenderMainCheckinSection === null || okToRenderMainCheckinSection === void 0 ? void 0 : (_okToRenderMainChecki = okToRenderMainCheckinSection.then) === null || _okToRenderMainChecki === void 0 ? void 0 : _okToRenderMainChecki.call(okToRenderMainCheckinSection, function (renderSection) {
      if (renderSection) {
        var isTrackerPage = site.func.isTrackerPage();

        require(["dpz.template", "".concat(isTrackerPage ? "tracker" : "confirmation", ".components"), "marketconfig/dpz.lang.payment", "marketconfig/dpz.lang.confirmation", "marketconfig/dpz.lang.forms", "marketconfig/dpz.lang.errorsValidator", "marketconfig/dpz.lang.customer"], function (template, _ref6, paymentStrings, confirmationStrings, formsStrings, errorStrings, customerStrings) {
          var DucCheckIn = _ref6.DucCheckIn,
              TranslateContext = _ref6.TranslateContext;
          var mount = document.querySelector(".js-duckCheckInContainer"); //Honestly, this is a Alamar specific handler. At some point, we need to
          //integrate the idea of franchises into our code...

          var _ref7 = goloDucVehicleDetails || {},
              color = _ref7.color,
              make = _ref7.make,
              plate = _ref7.plate,
              details = _ref7.details;

          var goloDucSubmitHandler = function goloDucSubmitHandler(e) {
            var vehiclesDetailsFromForm = goloDucVehicleDetails && !nameMissing ? {} : $(e.target).serialize().split("&").reduce(function (vehicleFormObj, vehicleDetail) {
              var vehicleKeyValue = vehicleDetail.split("=");
              vehicleFormObj[vehicleKeyValue[0]] = vehicleKeyValue[1];
              return vehicleFormObj;
            }, {});
            var fullName = nameMissing && "".concat(vehiclesDetailsFromForm.First_Name, " ").concat(vehiclesDetailsFromForm.Last_Name);
            return $.ajax({
              url: "".concat(urlConfig.alamar_api_ctx, "/dominos/stores/car-side-pickup"),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "POST",
              data: JSON.stringify({
                OrderID: StoreOrderID,
                StoreID: StoreID,
                BusinessDate: StorePlaceOrderTime,
                VehicleMake: vehiclesDetailsFromForm.Vehicle_Make || make,
                VehicleColor: vehiclesDetailsFromForm.Vehicle_Color || color,
                PlateNumber: vehiclesDetailsFromForm.Vehicle_Plate || plate,
                PickupDetails: vehiclesDetailsFromForm.Pickup_Details || details,
                CustomerName: fullName || "".concat(FirstName, " ").concat(LastName),
                CustomerPhone: fullPhone
              })
            }).fail(function () {
              site.func.overlayToggle(true, "codeOverlay", {}, {
                code: "eGoloDucCheckinError"
              });
            });
          };

          preact.render(preact.h(TranslateContext.Provider, {
            value: template.getTranslateContextValue(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, paymentStrings), confirmationStrings), formsStrings), errorStrings), customerStrings))
          }, preact.h(DucCheckIn, {
            defaultCheckedInState: false,
            goloDucSubmitHandler: goloDucSubmitHandler,
            isHandheld: site.func.isHandheld(),
            jsDpzTopic: jsDPZ.topic,
            nameMissing: nameMissing,
            orderStatus: orderStatus,
            requestVehicleInformation: !goloDucVehicleDetails || nameMissing
          })), mount);
        });
      }
    });
  };

  var extendValidationRules = function extendValidationRules(validationRules) {
    $.extend(true, validationRules, {
      YesDUC: {
        showOptional: true
      },
      NoDUC: {
        showOptional: true
      },
      Vehicle_Color: {
        required: true
      },
      Vehicle_Make: {
        required: true
      },
      Vehicle_Plate: {
        showOptional: true
      },
      Pickup_Details: {
        required: true
      },
      Order_Golo_Duc: {
        showOptional: true
      }
    });
  };

  var initialize = function initialize(_ref8) {
    var validationRules = _ref8.validationRules,
        orderData = _ref8.orderData,
        StoreID = _ref8.orderData.Details.StoreID,
        renderContainer = _ref8.renderContainer,
        preselectGoloDuc = _ref8.preselectGoloDuc;
    return getIsGoloDucAvailable(orderData, StoreID).then(function (goloDucAvailable) {
      if (goloDucAvailable) {
        extendValidationRules(validationRules);
        renderGoloDucSection(renderContainer, preselectGoloDuc);
      }
    });
  };

  return {
    getIsGoloDucOrderingEnabled: getIsGoloDucOrderingEnabled,
    isGoloDucCapableSync: isGoloDucCapableSync,
    initialize: initialize,
    renderIHaveArrivedSection: renderIHaveArrivedSection,
    showLocatorAndOrderSettingsIndicator: showLocatorAndOrderSettingsIndicator
  };
});
//# sourceMappingURL=dpz.goloDuc.js.map
