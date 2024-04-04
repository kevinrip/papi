function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.deliverToMe", ["dpz.config", "dpz.easyOrder", "dpz.geolocation", "dpz.kiosk", "marketconfig/dpz.lang.errors"], function (_ref, easyOrder, geolocation, kiosk, errorsStrings) {
  var isMarketEnabled = _ref.isMarketEnabled;
  var isDeliverToMeEnabled = isMarketEnabled("1cad9dd6-4699-403d-9813-9f9b2e98bce3");

  if (!isDeliverToMeEnabled || kiosk.isActive) {
    return {
      isActive: function isActive() {
        return false;
      },
      getDeliverToMe: function getDeliverToMe() {
        return $.when(false);
      },
      getStores: function getStores() {
        return $.when({
          dtmHotspotsEnabled: false,
          hotspotsDTMResponse: {},
          validDTMHotspots: []
        });
      },
      watchUserLocation: function watchUserLocation() {
        return false;
      },
      isDeliverToMeOrder: function isDeliverToMeOrder() {
        return false;
      }
    };
  }

  var module = {
    radius: 0.16,
    // 10 miles in degrees (approx)
    deliverToMeDeliveryInstructionsLength: 70,
    errorData: {
      code: "eNoDeliveryStoreFound",
      label: []
    },
    getStores: function getStores() {
      var isDeliverToMeEnabled = killConfig.isMarketEnabled("1cad9dd6-4699-403d-9813-9f9b2e98bce3");
      var userLocation = module.isActive() && module.watchUserLocation().cached.coords;
      if (!isDeliverToMeEnabled || !userLocation) return null;
      return module.getDeliverToMe(userLocation, userLocation).then(function (response) {
        module.cacheDTMStoreResponse(response);
        return {
          dtmHotspotsEnabled: isDeliverToMeEnabled,
          hotspotsDTMResponse: response,
          validDTMHotspots: module.validateHotspots(response === null || response === void 0 ? void 0 : response.DeliverToMeSpots)
        };
      })["catch"](function () {
        return null;
      });
    },
    cacheDTMStoreResponse: function cacheDTMStoreResponse(data) {
      jsDPZ.app.customer.getCustomer().data.Session.DTMCachedResponse = data;
      return site.sessionTools.save();
    },
    validateHotspots: function validateHotspots(hotspots) {
      if (!(hotspots !== null && hotspots !== void 0 && hotspots.length)) return [];
      return hotspots.map(function (hotspot) {
        return _objectSpread(_objectSpread({}, hotspot), {}, {
          validDeliveryStores: module.validateStoreList(hotspot.StoreList)
        });
      });
    },
    getValidDeliveryStores: function getValidDeliveryStores(hotspot) {
      return hotspot.validDeliveryStores;
    },
    hasValidDeliveryStores: function hasValidDeliveryStores(hotspot) {
      return Boolean(hotspot.validDeliveryStores.length);
    },
    validateStoreList: function validateStoreList(storeList) {
      if (!storeList.length) return [];
      var stores = storeList.map(function (store) {
        return store.StoreInformation;
      });
      var uniqueStores = site.func.uniqBy(stores, "StoreID");
      var deliveryStores = uniqueStores.filter(function (store) {
        return store.IsDeliveryStore;
      });

      if (!deliveryStores.length) {
        module.errorData.code = dpz.template.isTranslationStringEmpty("errors.eCEPNotFound", errorsStrings) ? "eNoDeliveryStoreFound" : "eCEPNotFound";
        return [];
      }

      return uniqueStores.map(function (store) {
        if (!store.IsDeliveryStore) return null;

        if (store.OnlineStatusCode === "ManualOffline" && dpz.template.translateError("eManualOffline")) {
          module.errorData.code = "eManualOffline";
          return null;
        } else if (store.IsOnlineNow) {
          var allowFutureDeliveryOrders = site.func.allowFutureOrders(store.NoDeliveryOrdersUntil);
          var allowDeliveryOrders = store.AllowDeliveryOrders || allowFutureDeliveryOrders;

          if (allowDeliveryOrders) {
            return store;
          } else {
            module.errorData.code = "eDeliveryDisabled";
            return null;
          }
        } else {
          module.errorData.code = "eStoreIsClosed";
          return null;
        }
      }).filter(function (store) {
        return Boolean(store);
      });
    },
    clearDeliverToMe: function clearDeliverToMe() {
      delete jsDPZ.app.order.getOrder().data.DeliverySpot;
      jsDPZ.app.order.getOrder().data.Customer.Address.Coordinates = {
        Latitude: 0,
        Longitude: 0
      };
      jsDPZ.app.order.getOrder().data.Customer.Address.Name = "";
      jsDPZ.app.order.getOrder().data.Customer.Address.Description = "";
      site.sessionTools.save();
    },
    setLocatorPermission: function setLocatorPermission(hasUserGeolocationPermissions) {
      dpz.util.cookies.setItem("geolocationPermission", hasUserGeolocationPermissions);
    },
    getLocatorPermission: function getLocatorPermission() {
      var hasUserGeolocationPermissions = dpz.util.cookies.getItem("geolocationPermission");
      return hasUserGeolocationPermissions === "false" ? false : hasUserGeolocationPermissions;
    },
    getDeliverToMe: function getDeliverToMe(coordinates, distanceCoordinates, radius, maxResults) {
      var options = $.extend({
        distanceCoordinates: distanceCoordinates
      }, coordinates);
      if (radius) options.radius = radius;
      if (maxResults) options.maxResults = maxResults;
      return jsDPZ.ajax.getDeliverToMeByGPSCoords(options).then(function (results) {
        return results;
      });
    },
    watchUserLocation: function watchUserLocation(options) {
      var userLocation = geolocation.watchUserLocation(options);
      $.when(userLocation.cached).fail(function (data) {
        jsDPZ.topic("deliverToMe.geolocation.error").publish({
          error: new Error("Unable to get the cached user location"),
          customData: data
        });
      });

      if (userLocation.cached !== userLocation.current) {
        userLocation.current.fail(function (data) {
          jsDPZ.topic("deliverToMe.geolocation.error").publish({
            error: new Error("Unable to get the current user location"),
            customData: data
          });
        });
      }

      return userLocation;
    },
    isActive: function isActive() {
      return !easyOrder.isInEasyOrderFlow() && !kiosk.isActive;
    },
    addressInDeliverToMeArea: function addressInDeliverToMeArea(address) {
      return _addressInDeliverToMeArea(address, {
        radius: module.radius,
        maxResults: 1
      });
    },
    isDeliverToMeOrder: function isDeliverToMeOrder() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsDPZ.app.order.getOrder().data,
          DeliverySpot = _ref2.DeliverySpot;

      return module.isActive() && Boolean(DeliverySpot === null || DeliverySpot === void 0 ? void 0 : DeliverySpot.PlaceId);
    },
    autoLocateDeliverToMeStore: function autoLocateDeliverToMeStore(deliverToMe) {
      var deliveryStore = deliverToMe.validDeliveryStores[0];
      jsDPZ.ajax.storeProfile(deliveryStore).then(function (profile) {
        var customerSession = jsDPZ.app.customer.getCustomer().getSessionData();
        var _deliverToMe$Address = deliverToMe.Address,
            City = _deliverToMe$Address.City,
            Region = _deliverToMe$Address.State,
            PostalCode = _deliverToMe$Address.ZipCode;
        var deliverToMeAddress = {
          Coordinates: {
            Latitude: deliverToMe.Latitude,
            Longitude: deliverToMe.Longitude
          },
          City: City,
          Region: Region,
          PostalCode: PostalCode
        };
        var deliveryHotspot = {
          Name: "Hotspot",
          Description: "",
          Id: deliverToMe.PlaceId
        };
        profile.Address = {
          City: profile.City,
          PostalCode: profile.PostalCode,
          Region: profile.Region,
          Street: profile.Street,
          StreetName: profile.StreetName,
          UnitNumber: profile.UnitNumber,
          UnitType: profile.UnitType
        };
        customerSession.Address = _objectSpread(_objectSpread({}, deliverToMeAddress), {}, {
          Name: deliverToMe.DisplayName,
          Description: deliverToMe.DisplayName
        });
        customerSession.StoreID = profile.StoreID;
        delete jsDPZ.app.order.getOrder().data.Customer.Address;
        jsDPZ.app.order.getOrder().data.Customer.Address = _objectSpread({}, deliverToMeAddress);
        jsDPZ.app.store.setStore(profile);
        $.extend(true, jsDPZ.app.order.getOrder().data, {
          Address: deliverToMeAddress
        }, {
          DeliveryHotspot: deliveryHotspot
        }, {
          DeliverySpot: deliverToMe
        }, {
          Notifications: {}
        });
        site.sessionTools.save().then(window.location = "".concat(urlConfig.root, "/pages/order/#!/locate/?StoreID=").concat(profile.StoreID, "&type=Delivery&latitude=").concat(deliverToMe.Latitude, "&longitude=").concat(deliverToMe.Longitude, "&deliverToMe=true"));
      }).fail(function () {
        site.func.powerCommunicationError();
      });
    },
    isSettingNewLocation: false,
    getIsSettingNewLocation: function getIsSettingNewLocation() {
      return module.isSettingNewLocation;
    },
    setIsSettingNewLocation: function setIsSettingNewLocation(value) {
      module.isSettingNewLocation = value;
    }
  }; // Internal functions
  // http://api-qa.dominos.com/store-locator-international-service/locate/deliverToMe?city ?streetAddress

  function _addressInDeliverToMeArea(address, options) {
    options.timeout = 5000;
    return jsDPZ.ajax.getDeliverToMeByAddress($.extend(true, {
      address: address
    }, options)).then(function (results) {
      return !!results.DeliverToMe && !!results.DeliverToMe.length;
    });
  }

  return module;
});
//# sourceMappingURL=dpz.deliverToMe.js.map
