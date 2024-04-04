/*
 * ca.tools.js - BEGIN CA - module to handle general US origin based and CA customized functions
 */
define(["dpz.config"], function (config) {
  var module = {};
  $.extend(module, {
    getIsWithinDucServiceHours: function getIsWithinDucServiceHours(storeData) {
      var getIsWithinDucServiceHours = function getIsWithinDucServiceHours(_ref) {
        var dayOfWeek = _ref.dayOfWeek,
            serverDateFormat = _ref.serverDateFormat,
            serverDateTimeFormat = _ref.serverDateTimeFormat,
            serviceHours = _ref.serviceHours,
            serviceMethod = _ref.serviceMethod,
            storeAsOfTime = _ref.storeAsOfTime;
        var serviceHoursForMethod = serviceHours[serviceMethod];
        var todaysServiceHours = serviceHoursForMethod[dayOfWeek];
        var storeTime = dayjs(storeAsOfTime, serverDateTimeFormat);
        var storeDate = storeTime.format(serverDateFormat);
        return !!todaysServiceHours.find(function (_ref2) {
          var CloseTime = _ref2.CloseTime,
              OpenTime = _ref2.OpenTime;
          var openStamp = "".concat(storeDate, " ").concat(OpenTime, ":00");
          var open = dayjs(openStamp, serverDateTimeFormat);
          var closeStamp = "".concat(storeDate, " ").concat(CloseTime, ":00");
          var close = dayjs(closeStamp, serverDateTimeFormat);
          return storeTime.isAfter(open) && storeTime.isBefore(close);
        });
      };

      var dayOfWeek = jsDPZ.obj.dateTime().getDayOfWeek();
      var _dpz$config$getMarket = dpz.config.getMarketProperty("date").format,
          serverDateFormat = _dpz$config$getMarket.SERVER_DATE_POWER,
          serverDateTimeFormat = _dpz$config$getMarket.SERVER_DATE_TIME_POWER;
      var serviceHours = storeData.ServiceHours,
          storeAsOfTime = storeData.StoreAsOfTime;
      var serviceMethod = "DriveUpCarryout";
      return getIsWithinDucServiceHours({
        dayOfWeek: dayOfWeek,
        serverDateFormat: serverDateFormat,
        serverDateTimeFormat: serverDateTimeFormat,
        serviceHours: serviceHours,
        serviceMethod: serviceMethod,
        storeAsOfTime: storeAsOfTime
      });
    },
    getStoreProfileData: function getStoreProfileData(storeId, type) {
      var promise = $.Deferred();
      jsDPZ.ajax.request({
        url: urlConfig.legacyApi + "/power/store/" + storeId + "/profile?lang=" + dpz.market.activeLanguageCode,
        success: function success(storeData) {
          promise.resolve(storeData);
        },
        error: function error() {
          promise.resolve(null);
        }
      });
      return promise;
    },
    isOntarioStore: function isOntarioStore() {
      return jsDPZ.app.store.getStore().data.Address && jsDPZ.app.store.getStore().data.Address.Region && (jsDPZ.app.store.getStore().data.Address.Region.toUpperCase() === "ONTARIO" || jsDPZ.app.store.getStore().data.Address.Region.toUpperCase() === "ON");
    },
    getCalorieInformation: function getCalorieInformation(Tags) {
      var productCalories = "";

      if (module.isOntarioStore() && !dpz.util.isEmpty(Tags) && !dpz.util.isEmpty(Tags.Cals)) {
        if (!dpz.util.isEmpty(Tags.Servings)) {
          productCalories = Tags.Cals + "; " + Tags.Servings;
        } else if (!dpz.util.isEmpty(Tags.ServingSize)) {
          productCalories = "Cals " + Tags.Cals + " per " + Tags.ServingSize;
        } else {
          productCalories = Tags.Cals;
        }
      }

      return productCalories;
    },
    getHolidayTimeArr: function getHolidayTimeArr(opts) {
      var options = $.extend({
        date: "",
        increment: 15,
        minTime: "00:00",
        maxTime: "23:59"
      }, opts);
      var serviceHours = options.serviceHours;
      var dateTimeArr = [];
      var maxTimeDate = jsDPZ.obj.dateTime(options.date + " " + options.maxTime).data;
      var minTimeDate = jsDPZ.obj.dateTime(options.date + " " + options.minTime).data; // Adding time buffer (for open and close time)

      var beforeOpenIncrement = config.getMarketProperty("date").beforeOpenIncrement;
      var beforeCloseIncrement = config.getMarketProperty("date").beforeCloseIncrement;

      for (var i = 0; i < serviceHours.length; i++) {
        if (serviceHours[i].OpenTime !== '00:00') {
          serviceHours[i].hasOpenTime = true;
        } else {
          serviceHours[i].hasCloseTime = true;
        }
      }

      for (var _i = 0; _i < serviceHours.length; _i++) {
        // iterate over night time and day time hours
        var openDate = jsDPZ.obj.dateTime(options.date + " " + serviceHours[_i].OpenTime).data;
        var closeDate = jsDPZ.obj.dateTime(options.date + " " + serviceHours[_i].CloseTime).data;

        if (serviceHours[_i].hasOpenTime) {
          openDate = new Date(openDate.getTime() + beforeOpenIncrement * 60 * 1000);
        }

        if (serviceHours[_i].hasCloseTime) {
          closeDate = new Date(closeDate.getTime() - beforeCloseIncrement * 60 * 1000);
        }

        while (openDate.getTime() <= closeDate.getTime()) {
          if (openDate.getTime() >= minTimeDate.getTime() && openDate.getTime() <= maxTimeDate.getTime()) {
            if (module.isOrderableTime(openDate.getDateTimeObject().getPulseDateTimeString())) {
              dateTimeArr.push(openDate.getDateTimeObject());
            }
          }

          openDate = new Date(openDate.getTime() + options.increment * 60 * 1000); // increment time
        }
      }

      return dateTimeArr;
    },
    getHolidayHours: function getHolidayHours(data, dateValue) {
      if (!dateValue) {
        var dateConfig = dpz.config.getMarketProperty("date"); // Get the market's date format, and replace the "/" dividers with "-" for visual cleanliness in the date-picker.

        var DATE_FORMAT = dateConfig.format.DATE.replace(/\//g, "-");
        dateValue = dayjs($(".js-future-date").val(), DATE_FORMAT).format("YYYY-MM-DD");
      }

      var holidays = data.Holidays;
      var holidayHour = holidays[dateValue];
      var holidayHours = holidayHour && holidayHour.Hours;
      return holidayHours;
    },
    getHolidayHour: function getHolidayHour(data, dateValue) {
      var holidays = data.Holidays;
      var holidayHour = holidays[dateValue];
      return holidayHour;
    },
    isOrderableTime: function isOrderableTime(dateTimeStr) {
      var orderDateTime = jsDPZ.obj.dateTime(dateTimeStr);
      var sO = jsDPZ.app.store.getStore();
      var storeAsOfDateTime = jsDPZ.obj.dateTime(sO.data.StoreAsOfTime); // Order Must Be 1 Hour In Future

      var storeDatePlusHour = new Date(storeAsOfDateTime.data.getTime() + config.getMarketProperty("date").futureOrderTime * 60 * 60 * 1000);
      var isHourInFuture = orderDateTime.data >= storeDatePlusHour;
      if (!isHourInFuture) return false;
      return true;
    },
    setCouponCode: function setCouponCode(couoponData, currentVariantCode) {
      var promise = $.Deferred();

      if (!dpz.util.isEmpty(couoponData)) {
        promise.resolve(couoponData);
      } else {
        var couponsInOrder = jsDPZ.app.order.getOrder().data.Details.Coupons;

        if (!dpz.util.isEmpty(couponsInOrder) && couponsInOrder.length) {
          couponsInOrder.forEach(function (coupon) {
            // Make call to coupon to confirm current variant(initialVariant.Code) begin edited is part of this coupon
            jsDPZ.ajax.coupon({
              StoreID: jsDPZ.app.customer.getCustomer().data.Session.StoreID,
              CouponCode: coupon.Code,
              success: function success(data) {
                var _data$ProductGroups, _data$ProductGroups2;

                if ((_data$ProductGroups = data.ProductGroups) !== null && _data$ProductGroups !== void 0 && _data$ProductGroups.length && (_data$ProductGroups2 = data.ProductGroups) !== null && _data$ProductGroups2 !== void 0 && _data$ProductGroups2[0].ProductCodes.includes(currentVariantCode)) {
                  promise.resolve(coupon.Code);
                } else {
                  promise.resolve("");
                }
              },
              error: function error() {
                promise.resolve("Error");
              }
            });
          });
        } else {
          promise.resolve(null);
        }
      }

      return promise;
    },
    checkOptedInStatus: function checkOptedInStatus(phoneNumber) {
      var promise = $.Deferred();
      var path = "/tracker-presentation-service/optStatus";
      var data = {
        "PhoneNumber": phoneNumber
      };
      jsDPZ.ajax.request({
        url: "".concat(urlConfig.api).concat(path),
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        dataType: "json",
        success: function success(data) {
          promise.resolve(data);
        },
        error: function error(err) {
          promise.resolve(err);
        }
      });
      return promise;
    },
    restrictTopping: function restrictTopping(couponCode, topping) {
      var couponData = jsDPZ.app.catalog.getCatalog().getCoupon(couponCode).data;

      if (!dpz.util.isEmpty(couponData) && module.hasRestrictToppings(couponData)) {
        var weightFilter = function weightFilter(weight) {
          return weight <= couponData.Tags.RestrictToppings;
        }; // Remove None options before filtering


        topping.Availability = topping.Availability.filter(function (e) {
          return e !== '0';
        });
        topping.Availability = topping.Availability.filter(weightFilter);
        return topping;
      } else {
        return topping;
      }
    },
    hasRestrictToppings: function hasRestrictToppings(couponData) {
      return !dpz.util.isEmpty(couponData.Tags) && !dpz.util.isEmpty(couponData.Tags.RestrictToppings);
    },
    updateSelectOptions: function updateSelectOptions(options, restrictToppings) {
      options.each(function () {
        if (this.value > restrictToppings) {
          this.remove();
        }
      });
    },
    viewSelectOptionCheckInterval: function viewSelectOptionCheckInterval(couponData) {
      var viewCheckInterval = setInterval(function () {
        if ($("#toppingsWrapper .js-toppingsList select").length) {
          var $cheeseOptions = $("#cheeseSauceWrapper .js-cheese .topping.split:not(.is-hidden) select option");
          var $sauceOptions = $("#cheeseSauceWrapper .js-sauces select").find('option');
          var $toppingsOptions = $("#toppingsWrapper .js-toppingsList select").find('option');
          module.updateSelectOptions($cheeseOptions, couponData.Tags.RestrictToppings);
          module.updateSelectOptions($sauceOptions, couponData.Tags.RestrictToppings);
          module.updateSelectOptions($toppingsOptions, couponData.Tags.RestrictToppings);
          clearInterval(viewCheckInterval);
        }
      }, 100);
    },
    setLocationInfo: function setLocationInfo(LanguageTranslations, LanguageLocationInfo) {
      var lang = dpz.market.activeLanguageCode;
      var info = "";

      if (!dpz.util.isEmpty(LanguageLocationInfo) && !dpz.util.isEmpty(LanguageLocationInfo[lang])) {
        info = LanguageLocationInfo[lang];
      }

      if (!dpz.util.isEmpty(LanguageTranslations) && !dpz.util.isEmpty(LanguageTranslations[lang]) && !dpz.util.isEmpty(LanguageTranslations[lang].LocationInfo)) {
        info = LanguageTranslations[lang].LocationInfo;
      }

      return info;
    },
    getServiceHours: function getServiceHours(serviceMethodHoursData) {
      return !dpz.util.isEmpty(serviceMethodHoursData) ? "<li>" + serviceMethodHoursData.split("\n").join("</li><li>") + "</li>" : "";
    },
    isEnvironmentNonProd: function isEnvironmentNonProd() {
      var environments = ["localhost", "dev", "dev1", "dev2", "qa", "qa1", "qa.dominos.ca", "www.qa.dominos.ca", "preprod", "preprod.dominos.ca", "www.preprod.dominos.ca"];
      return environments.includes(envConfig);
    },
    setRecaptchaV3Key: function setRecaptchaV3Key() {
      return dpz.market.marketConfig.thirdParty.recaptcha.v3 = module.isEnvironmentNonProd() ? dpz.market.marketConfig.thirdParty.recaptcha.v3ca.nonProductionKey : dpz.market.marketConfig.thirdParty.recaptcha.v3ca.productionKey;
    }
  });
  return module;
});
//# sourceMappingURL=ca.tools.js.map
