function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(["dpz.config", "dpz.loyalty.digitalWallet.methods", "dpz.launchDarkly!external/ldclient.min",
/* START ECOM-67857 */
"dpz.customer", "dpz.abTesting", "abtests/DPZ_ECOM-67857"
/* END ECOM-67857 */
], function (_ref, _ref2, ld
/* START ECOM-67857 */
, _ref3, _ref4, _ref5
/* END ECOM-67857 */
) {
  var getMarketProperty = _ref.getMarketProperty;
  var getFormattedDigitalWallet = _ref2.getFormattedDigitalWallet;
  var isProfiled = _ref3.isProfiled;
  var setTest = _ref4.setTest;
  var getEligibleExperiences = _ref5.getEligibleExperiences;
  var DIGITAL_WALLET = "digitalwallet";
  /* START ECOM-67857 */

  var setDigitalWalletCustomerContext = function setDigitalWalletCustomerContext(customerId, digitalWalletGroup) {
    var context = ld.client.getUser();
    context.custom.customerId = customerId;
    context.custom.digitalWalletGroup = digitalWalletGroup;
    return ld.client.identify(context);
  };

  var digitalWalletTest = function digitalWalletTest(customerId, digitalWalletGroup) {
    return setDigitalWalletCustomerContext(customerId, digitalWalletGroup).then(function () {
      return site.func.getOffers("DPZ_ECOM-67857");
    }).then(setTest).then(getEligibleExperiences);
  };
  /* END ECOM-67857 */


  var digitalWalletLDVisibility = function digitalWalletLDVisibility(customerId) {
    var result = {
      digitalWalletVisible: false,
      digitalWalletGroupValue: null
    };
    return new Promise(function (resolve) {
      var _getMarketProperty$di;

      var isMarketEnabled = (_getMarketProperty$di = getMarketProperty("loyalty").digitalWallet) === null || _getMarketProperty$di === void 0 ? void 0 : _getMarketProperty$di.enabled;

      if (!isMarketEnabled) {
        resolve(result);
      }

      var context = ld.client.getUser();
      context.custom.customerId = customerId;
      var isDigitalWalletVisible;
      ld.client.identify(context).then(function () {
        var isDigitalWalletEnabled = ld.client.variation("6ac50cd5-16cd-4ee6-a205-5df00ef31d21");

        if (!isDigitalWalletEnabled) {
          resolve(result);
        }

        var digitalWalletGroup = ld.client.variation("268f49b0-b33b-4a96-9d55-de686d16e67c");
        result.digitalWalletGroupValue = digitalWalletGroup;
        context.custom.digitalWalletGroup = digitalWalletGroup;
        context.custom.sourceOrganizationUri = "order.dominos.com";
        site.sessionTools.save().then(function () {
          ld.client.identify(context).then(function () {
            isDigitalWalletVisible = ld.client.variation("83ee9e72-6f39-493d-b383-aa9bf03d6ac7");

            if (isDigitalWalletVisible) {
              digitalWalletTest(customerId).then(function () {
                result.digitalWalletVisible = true;
                resolve(result);
              });
            } else {
              resolve(result);
            }
          })["catch"](function () {
            resolve(result);
          });
        });
      })["catch"](function () {
        return resolve(result);
      });
    });
  };

  var setDigitalWallet = function setDigitalWallet() {
    return new Promise(function (resolve) {
      var customerData = jsDPZ.app.customer.getCustomer().data;
      var customerId = customerData.CustomerID;
      digitalWalletLDVisibility(customerId).then(function (_ref6) {
        var digitalWalletVisible = _ref6.digitalWalletVisible,
            digitalWalletGroupValue = _ref6.digitalWalletGroupValue;

        if (digitalWalletVisible) {
          var loyaltyProgramOfferPayload = {
            customerAttributes: {
              ecommCustomerId: customerId,
              email: customerData.Email
            }
          };
          jsDPZ.ajax.loyaltyProgramOffer({
            programName: DIGITAL_WALLET,
            payload: loyaltyProgramOfferPayload
          }).then(function (response) {
            customerData.LoyaltyPrograms = _objectSpread(_objectSpread({}, customerData.LoyaltyPrograms), {}, {
              // response should match return value of detailedLogin in ROLO
              digitalwallet: _objectSpread(_objectSpread({}, getFormattedDigitalWallet(response)), {}, {
                digitalWalletGroup: digitalWalletGroupValue,
                digitalWalletVisible: true
              })
            });
            /* START ECOM-67857 */

            if (isProfiled()) {
              dpz.utag.fire.link(null, {
                abtest_bucket_5: "Wallet offers: ".concat(getAvailableOffersCount())
              });
            }
            /* END ECOM-67857 */


            site.sessionTools.save();
            resolve();
          })["catch"](resolve);
        } else {
          customerData.LoyaltyPrograms = _objectSpread(_objectSpread({}, customerData.LoyaltyPrograms), {}, {
            digitalwallet: {
              digitalWalletGroup: digitalWalletGroupValue
            }
          });
          resolve();
        }
      })["catch"](resolve);
    });
  };

  var isDigitalWalletActive = function isDigitalWalletActive() {
    return new Promise(function (resolve) {
      var customerObj = jsDPZ.app.customer.getCustomer();
      resolve("LoyaltyPrograms" in customerObj.data && DIGITAL_WALLET in customerObj.data.LoyaltyPrograms && "offersToDisplay" in customerObj.data.LoyaltyPrograms.digitalwallet);
    });
  };
  /* START ECOM-67857 */


  var getAvailableOffersCount = function getAvailableOffersCount() {
    var _customerData$Loyalty, _customerData$Loyalty2, _customerData$Loyalty3;

    var customerData = jsDPZ.app.customer.getCustomer().data;
    var currentOffers = ((_customerData$Loyalty = customerData.LoyaltyPrograms) === null || _customerData$Loyalty === void 0 ? void 0 : (_customerData$Loyalty2 = _customerData$Loyalty.digitalwallet) === null || _customerData$Loyalty2 === void 0 ? void 0 : (_customerData$Loyalty3 = _customerData$Loyalty2.offersToDisplay) === null || _customerData$Loyalty3 === void 0 ? void 0 : _customerData$Loyalty3.currentOffers) || [];
    var availableOffers = currentOffers.filter(function (offer) {
      return offer.status === "Available";
    });
    var orderCoupons = jsDPZ.app.order.getOrder().data.Details.Coupons;
    var offersNotApplied = availableOffers.filter(function (offer) {
      return !orderCoupons.some(function (appliedOffer) {
        return appliedOffer.Code === offer.code;
      });
    });
    return offersNotApplied.length;
  };

  var updateDealsBadge = function updateDealsBadge() {
    if ($(".js-dealsBadge").length) {
      var offerCount = getAvailableOffersCount();
      $(".js-dealsBadge").text(offerCount);
    }
  };
  /* END ECOM-67857 */


  return {
    /* START ECOM-67857 */
    digitalWalletTest: digitalWalletTest,
    getAvailableOffersCount: getAvailableOffersCount,
    updateDealsBadge: updateDealsBadge,

    /* END ECOM-67857 */
    setDigitalWallet: setDigitalWallet,
    isDigitalWalletActive: isDigitalWalletActive
  };
});
//# sourceMappingURL=dpz.loyalty.digitalWallet.js.map
