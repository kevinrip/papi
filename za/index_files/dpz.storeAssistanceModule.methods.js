var _excluded = ["customerOrders", "easyOrder"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.storeAssistanceModule.methods", [
/* START ECOM-69775 */
"abtests/DPZ_ECOM-69775",
/* END ECOM-69775 */
"dpz.serviceMethod.constants", "dpz.storeAssistanceModule.constants", "dpz.storeAssistanceModule.props", "dpz.storeAssistanceModule.state", "dpz.storeAssistanceModule.renderer", "dpz.storeAssistanceModule.handlers", "dpz.customer", "dpz.config", "dpz.goloDuc", "simplr", "site.funcs"], function (
/* START ECOM-69775 */
_ref,
/* END ECOM-69775 */
_ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12) {
  var getHasNationalStoreSelected = _ref.getHasNationalStoreSelected;
  var AT_STORE_METHODS = _ref2.AT_STORE_METHODS;
  var CARRYOUT = _ref3.CARRYOUT,
      DELIVERY = _ref3.DELIVERY,
      DCD = _ref3.DCD,
      INACTIVE = _ref3.INACTIVE;
  var isFutureOrder = _ref4.isFutureOrder,
      hasServiceMethodSelected = _ref4.hasServiceMethodSelected,
      setIsAutoSet = _ref4.setIsAutoSet,
      sessionOptions = _ref4.sessionOptions;
  var setState = _ref5.setState;
  var renderSam = _ref6.renderSam;
  var getServiceMethodFromOrder = _ref7.getServiceMethodFromOrder;
  var isProfiled = _ref8.isProfiled;
  var getMarketProperty = _ref9.getMarketProperty;
  var getIsGoloDucOrderingEnabled = _ref10.getIsGoloDucOrderingEnabled,
      showLocatorAndOrderSettingsIndicator = _ref10.showLocatorAndOrderSettingsIndicator;
  var mRouteAndExecute = _ref11.controller.mRouteAndExecute;
  var displayCurbside = _ref12.func.displayCurbside;
  var isDineInEnabled = killConfig.isMarketEnabled("dineIn");
  var isHotspotsEnabled = killConfig.isMarketEnabled("hotspots");

  var serviceMethodFromAbbreviation = function serviceMethodFromAbbreviation(letter) {
    switch (letter) {
      case "D":
      case "H":
        return DELIVERY;

      case "C":
      case "P":
      case "T":
      case "I":
        return CARRYOUT;

      case "X":
        return DCD;

      default:
        return null;
    }
  };

  var getCustomer = function getCustomer() {
    return jsDPZ.app.customer.getCustomer();
  };

  var getCustomerData = function getCustomerData() {
    return getCustomer().data;
  };

  var getOrder = function getOrder() {
    return jsDPZ.app.order.getOrder();
  };

  var getSession = function getSession() {
    return getCustomer().getSessionData();
  };

  var getStore = function getStore() {
    return jsDPZ.app.store.getStore();
  };

  var getStoreProfile = function getStoreProfile(StoreID) {
    return jsDPZ.ajax.storeProfile({
      StoreID: StoreID
    }).then(function (storeProfile) {
      // Preserve address data across repeated calls to jsDPZ.ajax.storeProfile
      if (!storeProfile.Address) {
        jsDPZ.app.store.setStoreFromPower(storeProfile);
      }

      return storeProfile;
    });
  };

  var getIsDucAvailable = function getIsDucAvailable(_ref13) {
    var AllowDuc = _ref13.AllowDuc,
        StoreID = _ref13.StoreID;
    var isDucAvailable = !isFutureOrder() && getStore().data.AllowDuc && getStore().getAvailableServiceMethods().includes("DriveUpCarryout");
    return isDucAvailable || showLocatorAndOrderSettingsIndicator({
      AllowDuc: AllowDuc
    }) || displayCurbside(StoreID);
  };

  var getKey = function getKey(_ref14) {
    var _ref15 = _slicedToArray(_ref14, 1),
        key = _ref15[0];

    return key;
  };

  var findOrderByStreet = function findOrderByStreet(street) {
    return function (_ref16) {
      var _ref16$order = _ref16.order,
          _ref16$order$Address = _ref16$order.Address,
          Street = _ref16$order$Address.Street,
          StreetName = _ref16$order$Address.StreetName,
          ServiceMethod = _ref16$order.ServiceMethod,
          StoreID = _ref16$order.StoreID;
      var currentStreet = Street || StreetName;
      return AT_STORE_METHODS.includes(ServiceMethod) ? StoreID === street : currentStreet === street;
    };
  };

  var setOrderAddress = function setOrderAddress() {
    var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        Address = _ref17.Address,
        StoreID = _ref17.StoreID,
        ServiceMethod = _ref17.ServiceMethod,
        _ref17$isDucOrder = _ref17.isDucOrder,
        isDucOrder = _ref17$isDucOrder === void 0 ? false : _ref17$isDucOrder;

    var _getMarketProperty = getMarketProperty("locations"),
        ignoredAddressFields = _getMarketProperty.ignoredAddressFields;

    var uiIgnoredFields = Object.values(ignoredAddressFields).reduce(function (ignoredFields, ignoredField) {
      return _objectSpread(_objectSpread({}, ignoredFields), {}, _defineProperty({}, ignoredField, ""));
    }, {});
    var session = getSession();
    session.Address = _objectSpread(_objectSpread({}, Address), uiIgnoredFields);
    session.AddressSelection = Address.Name || "__OTHER_ADDRESS__";
    session.ServiceMethod = ServiceMethod;
    session.StoreID = StoreID;
    site.storage.save("ServiceType", ServiceMethod);

    var onSetOrderAddress = function onSetOrderAddress() {
      var url = site.func.buildURL({
        url: "#!/customer/store/update",
        parameters: {
          ServiceMethod: ServiceMethod,
          StoreID: StoreID,
          Substituted: "false"
        }
      });
      mRouteAndExecute(url);
      var isCarryout = ServiceMethod === CARRYOUT;
      var hasStreet = Boolean(Address.Street);

      if (isCarryout && hasStreet) {
        setState({
          serviceMethod: ServiceMethod,
          storeCity: Address.City,
          StoreId: StoreID,
          storePostalCode: Address.PostalCode,
          storeRegion: Address.Region,
          storeStreet: Address.Street,
          isDucOrder: isDucOrder
        });
      }

      renderSam();
    };

    site.sessionTools.save().then(onSetOrderAddress);
  };

  var setCarryout = function setCarryout(_ref18) {
    var StoreID = _ref18.StoreID,
        _ref18$ServiceMethod = _ref18.ServiceMethod,
        ServiceMethod = _ref18$ServiceMethod === void 0 ? CARRYOUT : _ref18$ServiceMethod;
    return getStoreProfile(StoreID).then(function (_ref19) {
      var _ref19$Address = _ref19.Address,
          City = _ref19$Address.City,
          PostalCode = _ref19$Address.PostalCode,
          Region = _ref19$Address.Region,
          Street = _ref19$Address.Street,
          isCarryoutAvailable = _ref19.AllowCarryoutOrders,
          isDeliveryAvailable = _ref19.AllowDeliveryOrders,
          isDineInAvailable = _ref19.AllowDineInOrders,
          AllowDuc = _ref19.AllowDuc,
          isHotspotAvailable = _ref19.AllowHotspotLiteOrders,
          isPickupWindowAvailable = _ref19.AllowPickupWindowOrders,
          isOnline = _ref19.IsOnlineNow,
          StoreID = _ref19.StoreID;
      var isDucOrder = ServiceMethod === DCD && getIsDucAvailable({
        AllowDuc: AllowDuc,
        StoreID: StoreID
      });
      var isGoloDuc = getIsGoloDucOrderingEnabled();

      if (isGoloDuc) {
        getSession().CurbsidePickup = isDucOrder;
      }

      if (isDucOrder && !isGoloDuc) {
        jsDPZ.app.order.getOrder().data = _objectSpread(_objectSpread(_objectSpread({}, jsDPZ.app.order.getOrder().data), sessionOptions), {}, {
          isDucOrder: true
        });
      }

      site.sessionTools.save();
      setState({
        isCarryoutAvailable: isCarryoutAvailable,
        isDeliveryAvailable: isDeliveryAvailable,
        isDineInAvailable: isDineInEnabled && isDineInAvailable,
        isDucAvailable: getIsDucAvailable({
          AllowDuc: AllowDuc,
          StoreID: StoreID
        }),
        isHotspotAvailable: isHotspotAvailable,
        isOnline: isOnline,
        isPickupWindowAvailable: isPickupWindowAvailable,
        isDucOrder: isDucOrder
      });
      /* START ECOM-69775 */

      var hasNationalStoreSelected = getHasNationalStoreSelected();
      /* END ECOM-69775 */

      var storeInfo = {
        Address: {
          City: City,
          PostalCode: PostalCode,
          Region: Region,

          /* START ECOM-69775 */
          Street: hasNationalStoreSelected ? Street : null
          /* END ECOM-69775 */

        },
        ServiceMethod: CARRYOUT,
        isDucOrder: isDucOrder,
        StoreID: StoreID
      };
      return setOrderAddress(storeInfo);
    });
  };

  var getDeliveryStreet = function getDeliveryStreet(address) {
    return getMarketProperty("locations").storeAssistanceModule.deliveryStreetFields.map(function (addressKey) {
      return address[addressKey] || "";
    }).filter(Boolean).join(" ");
  };

  var getOrderHistory = function getOrderHistory() {
    return getCustomer().fetchOrderHistory().then(function (_ref20) {
      var _ref20$customerOrders = _ref20.customerOrders,
          customerOrders = _ref20$customerOrders === void 0 ? [] : _ref20$customerOrders,
          easyOrder = _ref20.easyOrder,
          orderHistory = _objectWithoutProperties(_ref20, _excluded);

      var _getMarketProperty2 = getMarketProperty("profile"),
          cleanAddresses = _getMarketProperty2.cleanAddresses;

      if (cleanAddresses) {
        return $.Deferred(function (_ref21) {
          var resolve = _ref21.resolve;

          require(["marketjs/modules/cleanAddress"], function (_ref22) {
            var cleanOrderAddress = _ref22.cleanOrderAddress;

            var cleanOrderHistoryAddress = function cleanOrderHistoryAddress(order) {
              if (order) {
                return _objectSpread(_objectSpread({}, order), {}, {
                  order: _objectSpread(_objectSpread({}, order.order), {}, {
                    Address: cleanOrderAddress({
                      address: order.order.Address
                    })
                  })
                });
              } else {
                return order;
              }
            };

            resolve(_objectSpread(_objectSpread({}, orderHistory), {}, {
              customerOrders: customerOrders.map(cleanOrderHistoryAddress),
              easyOrder: cleanOrderHistoryAddress(easyOrder)
            }));
          });
        });
      }

      return orderHistory;
    });
  };

  var setDelivery = function setDelivery() {
    return getOrderHistory().then(function (orderHistory) {
      var deliveryOrders = deliveryOnly(orderHistory);

      if (deliveryOrders.length) {
        var address = mostPopularAddress(deliveryOrders);
        getStoreProfile(address.StoreID).then(function (_ref23) {
          var isCarryoutAvailable = _ref23.AllowCarryoutOrders,
              isDeliveryAvailable = _ref23.AllowDeliveryOrders,
              isDineInAvailable = _ref23.AllowDineInOrders,
              AllowDuc = _ref23.AllowDuc,
              isHotspotAvailable = _ref23.AllowHotspotLiteOrders,
              isPickupWindowAvailable = _ref23.AllowPickupWindowOrders,
              isOnline = _ref23.IsOnlineNow;
          setState({
            customerCity: address.Address.City,
            customerPostalCode: address.Address.PostalCode,
            customerRegion: address.Address.Region,
            customerStreet: getDeliveryStreet(address),
            isCarryoutAvailable: isCarryoutAvailable,
            isDeliveryAvailable: isDeliveryAvailable,
            isDineInAvailable: isDineInEnabled && isDineInAvailable,
            isDucAvailable: getIsDucAvailable({
              AllowDuc: AllowDuc,
              StoreID: address.StoreID
            }),
            isHotspotAvailable: isHotspotAvailable,
            isOnline: isOnline,
            isPickupWindowAvailable: isPickupWindowAvailable,
            serviceMethod: DELIVERY,
            StoreId: address.StoreID
          });
          return setOrderAddress(address);
        });
      }
    });
  };

  var deliveryOnly = function deliveryOnly(orderHistory) {
    return orderHistory.customerOrders.filter(function (order) {
      return order.order.ServiceMethod === "Delivery";
    });
  };

  var getAddressFrequency = function getAddressFrequency(orderHistory) {
    return orderHistory.reduce(function (addresses, _ref24) {
      var _ref24$order = _ref24.order,
          _ref24$order$Address = _ref24$order.Address;
      _ref24$order$Address = _ref24$order$Address === void 0 ? {} : _ref24$order$Address;
      var _ref24$order$Address$ = _ref24$order$Address.Street,
          Street = _ref24$order$Address$ === void 0 ? "" : _ref24$order$Address$,
          _ref24$order$Address$2 = _ref24$order$Address.StreetName,
          StreetName = _ref24$order$Address$2 === void 0 ? "" : _ref24$order$Address$2,
          ServiceMethod = _ref24$order.ServiceMethod,
          StoreID = _ref24$order.StoreID;
      var orderStreet = Street || StreetName || "";
      var addressIdentifier = AT_STORE_METHODS.includes(ServiceMethod) ? StoreID : orderStreet;
      var currentCount = addresses[addressIdentifier] || 0;
      return _objectSpread(_objectSpread({}, addresses), {}, _defineProperty({}, addressIdentifier, currentCount + 1));
    }, {});
  };

  var mostPopularAddress = function mostPopularAddress(orderHistory) {
    var addressFrequency = getAddressFrequency(orderHistory);
    var addresses = Object.entries(addressFrequency);

    var _addresses = _slicedToArray(addresses, 1),
        defaultAddress = _addresses[0];

    var primaryAddresses = addresses.reduce(function (winners, address) {
      var _address = _slicedToArray(address, 2),
          value = _address[1];

      var _winners$ = _slicedToArray(winners[0], 2),
          currentValue = _winners$[1];

      if (currentValue === value) return [].concat(_toConsumableArray(winners), [address]);
      if (currentValue < value) return [address];
      return winners;
    }, [defaultAddress]);

    var _primaryAddresses$map = primaryAddresses.map(getKey),
        _primaryAddresses$map2 = _slicedToArray(_primaryAddresses$map, 1),
        primaryStreet = _primaryAddresses$map2[0];

    var findOrderByPrimaryStreet = findOrderByStreet(primaryStreet);

    var _orderHistory$find = orderHistory.find(findOrderByPrimaryStreet),
        _orderHistory$find$or = _orderHistory$find.order,
        Address = _orderHistory$find$or.Address,
        ServiceMethod = _orderHistory$find$or.ServiceMethod,
        StoreID = _orderHistory$find$or.StoreID;

    return {
      Address: Address,
      ServiceMethod: ServiceMethod,
      StoreID: StoreID
    };
  };

  window.mostPopularAddress = mostPopularAddress;

  var assignServiceMethod = function assignServiceMethod() {
    setServiceMethodFromProfileData(getCustomerData().Email);
  };

  var getServiceMethodFromOrderHistory = function getServiceMethodFromOrderHistory() {
    return getOrderHistory().then(function () {
      var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref25$customerOrders = _ref25.customerOrders,
          customerOrders = _ref25$customerOrders === void 0 ? [] : _ref25$customerOrders;

      var _ref26 = mostPopularAddress(customerOrders) || {},
          _ref26$ServiceMethod = _ref26.ServiceMethod,
          ServiceMethod = _ref26$ServiceMethod === void 0 ? "" : _ref26$ServiceMethod,
          _ref26$StoreID = _ref26.StoreID,
          StoreID = _ref26$StoreID === void 0 ? "" : _ref26$StoreID;

      return {
        DOMINANT_SERVICE_METHOD: ServiceMethod || "",
        DOMINANT_STORE: {
          value: StoreID
        }
      };
    });
  };

  var getServiceMethodFromCustomerDetails = function getServiceMethodFromCustomerDetails(data) {
    return isProfiled() ? jsDPZ.ajax.fetchCustomerDetails(data) : $.Deferred().resolve({});
  };

  var setServiceMethodFromProfileData = function setServiceMethodFromProfileData(email) {
    var _getMarketProperty3 = getMarketProperty("profile"),
        useCustomerDetailService = _getMarketProperty3.useCustomerDetailService;

    var getCustomerDetails = useCustomerDetailService ? getServiceMethodFromCustomerDetails : getServiceMethodFromOrderHistory;
    getCustomerDetails({
      key: email,
      type: "email"
    }).then(function (_ref27) {
      var DOMINANT_SERVICE_METHOD = _ref27.DOMINANT_SERVICE_METHOD,
          DOMINANT_STORE = _ref27.DOMINANT_STORE;
      var dominantServiceMethod = typeof DOMINANT_SERVICE_METHOD === "string" ? DOMINANT_SERVICE_METHOD : serviceMethodFromAbbreviation(DOMINANT_SERVICE_METHOD === null || DOMINANT_SERVICE_METHOD === void 0 ? void 0 : DOMINANT_SERVICE_METHOD.value);
      /* START ECOM-69775 */

      var hasNationalStoreSelected = getHasNationalStoreSelected();
      /* END ECOM-69775 */

      if (hasServiceMethodSelected()
      /* START ECOM-69775 */
      && !hasNationalStoreSelected
      /* END ECOM-69775 */
      ) {
        return;
      }

      setIsAutoSet(true);
      var hasOrderHistory = Boolean(dominantServiceMethod); // if hasn't ordered yet
      // if api for dominant service method is down

      if (!hasOrderHistory || !dominantServiceMethod) {
        /* START ECOM-69775 */
        if (!hasNationalStoreSelected) {
          /* END ECOM-69775 */
          setState({
            serviceMethod: INACTIVE
          });
          /* START ECOM-69775 */
        }
        /* END ECOM-69775 */


        renderSam();
      }

      if (dominantServiceMethod === DELIVERY) {
        return setDelivery();
      } else if ([CARRYOUT, DCD].includes(dominantServiceMethod) && DOMINANT_STORE !== null && DOMINANT_STORE !== void 0 && DOMINANT_STORE.value) {
        return setCarryout({
          StoreID: DOMINANT_STORE.value,
          ServiceMethod: dominantServiceMethod
        });
      }
    })["catch"](function () {
      setState({
        serviceMethod: INACTIVE
      });
      jsDPZ.topic("storeAssistanceModule.updated").publish();
    });
  };

  var getCurrentOrderInfo = function getCurrentOrderInfo() {
    var _getOrder$data = getOrder().data,
        customerAddress = _getOrder$data.Customer.Address,
        _getOrder$data$Detail = _getOrder$data.Details,
        serviceMethodDetail = _getOrder$data$Detail.ServiceMethod,
        storeID = _getOrder$data$Detail.StoreID,
        isDucOrder = _getOrder$data.isDucOrder,
        isPickupOrder = _getOrder$data.isPickupOrder,
        lastSelectedStoreLocatorServiceMethodInputValue = _getOrder$data.lastSelectedStoreLocatorServiceMethodInputValue;
    var customerCity = customerAddress.City,
        customerPostalCode = customerAddress.PostalCode,
        customerRegion = customerAddress.Region,
        customerStreet = customerAddress.Street,
        customerStreetName = customerAddress.StreetName;

    var _getSession = getSession(),
        CurbsidePickup = _getSession.CurbsidePickup;

    var _getStore$data = getStore().data,
        _getStore$data$Addres = _getStore$data.Address,
        storeCity = _getStore$data$Addres.City,
        storeRegion = _getStore$data$Addres.Region,
        storeStreet = _getStore$data$Addres.Street,
        storePostalCode = _getStore$data$Addres.PostalCode,
        isCarryoutAvailable = _getStore$data.AllowCarryoutOrders,
        isDeliveryAvailable = _getStore$data.AllowDeliveryOrders,
        isDineInAvailable = _getStore$data.AllowDineInOrders,
        AllowDuc = _getStore$data.AllowDuc,
        isHotspotAvailable = _getStore$data.AllowHotspotLiteOrders,
        isPickupWindowAvailable = _getStore$data.AllowPickupWindowOrders,
        isOnline = _getStore$data.IsOnlineNow,
        StoreID = _getStore$data.StoreID;
    var serviceMethod = getServiceMethodFromOrder({
      isDucOrder: getIsGoloDucOrderingEnabled() ? CurbsidePickup : isDucOrder,
      isPickupOrder: isPickupOrder,
      serviceMethodDetail: serviceMethodDetail
    });
    /* START ECOM-69775 */

    var hasNationalStoreSelected = getHasNationalStoreSelected();
    /* END ECOM-69775 */

    var isHotSpot = lastSelectedStoreLocatorServiceMethodInputValue === "Hotspots" && serviceMethodDetail === DELIVERY;
    setState({
      isCarryoutAvailable: isCarryoutAvailable,
      isDeliveryAvailable: isDeliveryAvailable,
      isDineInAvailable: isDineInEnabled && isDineInAvailable,
      isDucAvailable: getIsDucAvailable({
        AllowDuc: AllowDuc,
        StoreID: StoreID
      }),
      isDucOrder: getIsGoloDucOrderingEnabled() ? CurbsidePickup : isDucOrder,
      isHotSpot: isHotSpot,
      isHotspotAvailable: isHotspotAvailable,
      isHotspotsEnabled: isHotspotsEnabled,
      isOnline: isOnline,
      isPickupOrder: isPickupOrder,
      isPickupWindowAvailable: isPickupWindowAvailable,
      serviceMethod: serviceMethod,
      storeCity: storeCity,
      storeID: storeID,
      storePostalCode: storePostalCode,
      storeRegion: storeRegion,
      storeStreet: storeStreet
    }); // prevents rerender from overwriting good data

    if (customerStreet || customerStreetName) {
      setState({
        customerCity: customerCity,
        customerPostalCode: customerPostalCode,
        customerRegion: customerRegion,
        customerStreet: getDeliveryStreet(customerAddress)
      });
    } // Handle refresh and first sign in
    // BEGIN CA - Prevent /power/customer/order from being called when CustomerID doesn't exist


    if (!serviceMethod && getCustomer().data.CustomerID
    /* START ECOM-69775 */
    || hasNationalStoreSelected
    /* END ECOM-69775 */
    ) {
      // END CA
      assignServiceMethod();
    } else if (serviceMethod === CARRYOUT && !storeStreet) {
      // Have partial info
      setCarryout({
        StoreID: storeID,
        ServiceMethod: serviceMethod,
        isDucOrder: isDucOrder
      });
      renderSam();
    } else if (serviceMethod === DELIVERY && !(customerStreet || customerStreetName)) {
      // Have partial info
      setDelivery();
      renderSam();
    }
  };

  return {
    getCurrentOrderInfo: getCurrentOrderInfo,
    setOrderAddress: setOrderAddress,
    serviceMethodFromAbbreviation: serviceMethodFromAbbreviation,
    setServiceMethodFromProfileData: setServiceMethodFromProfileData
  };
});
//# sourceMappingURL=dpz.storeAssistanceModule.methods.js.map
