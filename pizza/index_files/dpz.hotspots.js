function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.hotspots", ["simplr", "dpz.config", "dpz.kiosk", "dpz.easyOrder", "dpz.geolocation"], function (simplr, config, kiosk, easyOrder, geolocation) {
  if (!killConfig.isMarketEnabled("hotspots") || kiosk.isActive) {
    return {
      isActive: function isActive() {
        return false;
      },
      isHotspotOrder: function isHotspotOrder() {
        return false;
      }
    };
  }

  var module = {
    radius: 0.16,
    // 10 miles in degrees (approx)
    hotspotDeliveryInstructionsLength: 70,
    clearHotspot: function clearHotspot() {
      delete jsDPZ.app.order.getOrder().data.DeliveryHotspot;
      jsDPZ.app.order.getOrder().data.Customer.Address.Coordinates = {
        Latitude: 0,
        Longitude: 0
      };
      jsDPZ.app.order.getOrder().data.Customer.Address.Name = "";
      jsDPZ.app.order.getOrder().data.Customer.Address.Description = "";
      site.sessionTools.save();
    },
    isActive: function isActive() {
      return killConfig.isMarketEnabled("hotspots") && !easyOrder.isInEasyOrderFlow();
    },
    getHotspots: function getHotspots(coordinates, distanceCoordinates, radius, maxResults) {
      var options = $.extend({
        distanceCoordinates: distanceCoordinates
      }, coordinates);
      if (radius) options.radius = radius;
      if (maxResults) options.maxResults = maxResults;
      return jsDPZ.ajax.getHotspotsByGPSCoords(options).then(function (results) {
        return results;
      });
    },
    addressInHotspotsArea: function addressInHotspotsArea(address) {
      return _addressInHotspotsArea(address, {
        radius: module.radius,
        maxResults: 1
      });
    },
    getLocatorPermission: function getLocatorPermission() {
      var bool = dpz.util.cookies.getItem("geolocationPermission");
      return bool === "false" ? false : bool;
    },
    getUserLocation: function getUserLocation(options) {
      var userLocation = geolocation.getUserLocation(options);
      $.when(userLocation.cached).fail(function (data) {
        jsDPZ.topic("hotspots.geolocation.error").publish({
          error: new Error("Unable to get the cached user location"),
          customData: data
        });
      });

      if (userLocation.cached !== userLocation.current) {
        userLocation.current.fail(function (data) {
          jsDPZ.topic("hotspots.geolocation.error").publish({
            error: new Error("Unable to get the current user location"),
            customData: data
          });
        });
      }

      return userLocation;
    },
    isHotspotOrder: function isHotspotOrder() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsDPZ.app.order.getOrder().data,
          DeliveryHotspot = _ref.DeliveryHotspot;

      return module.isActive() && !!(DeliveryHotspot !== null && DeliveryHotspot !== void 0 && DeliveryHotspot.Id);
    },
    setLocatorPermission: function setLocatorPermission(bool) {
      dpz.util.cookies.setItem("geolocationPermission", bool);
    },
    autoLocateHotspotStore: function autoLocateHotspotStore(hotspot) {
      jsDPZ.ajax.storeProfile(hotspot).then(function (profile) {
        var customerSession = jsDPZ.app.customer.getCustomer().getSessionData();
        var hotspotAddress = {
          Coordinates: {
            Latitude: hotspot.Latitude,
            Longitude: hotspot.Longitude
          }
        };

        if (hotspot.UseHotspotCityAndZipCode) {
          hotspotAddress = _objectSpread(_objectSpread({}, hotspotAddress), {}, {
            City: hotspot.City,
            Region: hotspot.State,
            PostalCode: hotspot.ZipCode
          });
        }

        profile.Address = {
          City: profile.City,
          PostalCode: profile.PostalCode,
          Region: profile.Region,
          Street: profile.Street,
          StreetName: profile.StreetName,
          UnitNumber: profile.UnitNumber,
          UnitType: profile.UnitType
        };
        customerSession.Address = _objectSpread(_objectSpread({}, hotspotAddress), {}, {
          Name: hotspot.Name,
          Description: hotspot.Description
        });
        customerSession.StoreID = profile.StoreID;
        delete jsDPZ.app.order.getOrder().data.Customer.Address;
        jsDPZ.app.order.getOrder().data.Customer.Address = _objectSpread({}, hotspotAddress);
        jsDPZ.app.store.setStore(profile);
        $.extend(true, jsDPZ.app.order.getOrder().data, {
          DeliveryHotspot: hotspot
        }, {
          Notifications: {}
        });
        site.sessionTools.save().then(window.location = "".concat(urlConfig.root, "/pages/order/#!/locate/?StoreID=").concat(hotspot.StoreID, "&type=Delivery&latitude=").concat(hotspot.Latitude, "&longitude=").concat(hotspot.longitude, "&hotspot=true"));
      }).fail(function () {
        site.func.powerCommunicationError();
      });
    }
  }; // Internal functions
  // http://api-qa.dominos.com/store-locator-international-service/locate/hotspot?city ?streetAddress

  function _addressInHotspotsArea(address, options) {
    options.timeout = 5000;
    return jsDPZ.ajax.getHotspotsByAddress($.extend(true, {
      address: address
    }, options)).then(function (results) {
      return !!results.Hotspots && !!results.Hotspots.length;
    });
  }

  return module;
});
//# sourceMappingURL=dpz.hotspots.js.map
