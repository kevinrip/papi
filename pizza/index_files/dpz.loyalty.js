function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require(["simplr", // "dpz.launchDarkly!external/ldclient.min" - BEGIN CA Change
"dpz.template", "dpz.config", "dpz.customer", "dpz.oauth.constants", "marketconfig/dpz.lang.customer"], function (simplr, //ld - BEGIN CA Change
_ref, _ref2, _ref3, _ref4, customerStrings) {
  var translate = _ref.translate,
      decodeAndSanitize = _ref.decodeAndSanitize;
  var getMarketProperty = _ref2.getMarketProperty;
  var isProfiled = _ref3.isProfiled;
  var oauthSopes = _ref4.oauthSopes;
  var config = {
    signinURL: "#!/checkout/info/",
    activateURL: "#!/rewards/activate/",
    dashboardURL: "#!/customer/rewards/history/",
    // Number of days in which the user will see a warning before his points expires
    warningWindowBase: 30,
    history: {
      pageIndex: 1,
      pageSize: 2000,
      separatePending: true,
      hideLoading: true,
      translations: {
        ADJUSTMENT: "customer.loyalty_activity_adjustment",
        BONUS: "customer.loyalty_activity_bonus",
        EXPIRATION: "customer.loyalty_activity_expired",
        NON_QUALIFYING_ORDER: "customer.loyalty_activity_non_qualifying",
        QUALIFYING_ORDER: "customer.loyalty_activity_qualifying",
        REDEMPTION: "customer.loyalty_activity_redemption",
        POINTS_RETURNED: "customer.loyalty_activity_returned"
      }
    },
    loyaltyIsOk: true,
    enrollmentBonusConfig: {
      show: false,
      bonusPoints: 10,
      bonusTotalNeeds: 10
    },
    // This object will have the loyaltinformation needed for the guest and non loyalty customers (how many points per order, how many points to get a reward, reward translate string)
    defaultBase: {
      pointsPerOrder: 10,
      totalNeeded: 10,
      rewardPoints: 60,
      rewardString: "customer.loyalty_reward_2m2t"
    },
    // This object contains the commands passed to the login command to recognize a special action when customer was semi logged in and it's password was requested
    commands: {
      enroll: "LOYALTY_ENROLL",
      optOut: "LOYALTY_OPT_OUT",
      redeem: "LOYALTY_REDEEM",
      dashboard: "LOYALTY_VIEW_DASHBOARD",
      claimRewards: "CLAIM_REWARDS"
    },
    // Widget animation config
    animation: {
      animate: true,
      animateAllNewPizzas: false,
      cache: "general",
      cachePrefix: "dpz_loyalty_",
      updateCache: function updateCache() {
        return true;
      }
    },
    widgetRulesSkeleton: {
      animation: {},
      // Has the data object for each widget
      data: {
        balance: {
          checkout: false,
          useFullTitle: function useFullTitle() {
            return false;
          },
          showFullPoints: function showFullPoints() {
            return dpz.loyalty.animateWidgets("big") && (dpz.loyalty.getPizzaCount() === 1 || dpz.loyalty.config.animation.animateAllNewPizzas);
          },
          hideAfterAnimation: function hideAfterAnimation() {
            return false;
          }
        },
        pizzaCounter: {},
        redemption: {
          keepCoupons: false,
          hideRedemption: function hideRedemption() {
            return false;
          }
        },
        points: {
          showTotalPoints: function showTotalPoints() {
            return true;
          },
          showNextRewardPoints: function showNextRewardPoints() {
            return false;
          },
          showPendingPoints: function showPendingPoints() {
            return true;
          }
        },
        alerts: {
          showWarning: true
        }
      },
      // Has the rule for each widget we want to display
      display: {
        balance: function balance() {
          return true;
        },
        pizzaCounter: function pizzaCounter() {
          return true;
        },
        redemption: function redemption() {
          return true;
        },
        points: function points() {
          return true;
        },
        alerts: function alerts() {
          return true;
        }
      },
      // Which widgets will be treated as links to the rewards page
      redirectToRewards: {
        balance: true,
        pizzaCounter: true,
        redemption: false,
        points: true,
        alerts: true
      },
      parentSelector: ""
    }
  };
  var widgetAnimationCache; // High engagement eligibility validation methods.

  var eligibleForHighEngagement = function eligibleForHighEngagement() {
    return isProfiled() && dpz.loyalty.isEnrolled() && getMarketProperty("loyalty").isHighEngagementAvailable;
  };

  var eligibleFor50Off = function eligibleFor50Off() {
    return eligibleForHighEngagement() && killConfig.isMarketEnabled("5a6fccb5-12f9-42bf-badf-7678a6b8f08b");
  };

  var eligibleFor5Off = function eligibleFor5Off() {
    return eligibleForHighEngagement() && killConfig.isMarketEnabled("0a7ac188-fc73-4884-9eca-59f066f5e148");
  };

  var eligibleForDoublePoints = function eligibleForDoublePoints() {
    return eligibleForHighEngagement() && killConfig.isMarketEnabled("ddd35f12-bccf-4bf1-b494-9af79d28761c");
  };

  var eligibleForDeliveryDoublePoints = function eligibleForDeliveryDoublePoints() {
    return eligibleForHighEngagement() && killConfig.isMarketEnabled("832588f9-c05d-49e0-b8fe-fd1f4e81ca36");
  };

  var eligibleForBOGO = function eligibleForBOGO() {
    return eligibleForHighEngagement() && killConfig.isMarketEnabled("766f9d9c-602a-4a90-827c-61f806deaac5");
  };

  var eligibleForWelcome = function eligibleForWelcome() {
    return eligibleForHighEngagement() && killConfig.isMarketEnabled("8c954406-cfc0-4799-807c-ac81a70222c0");
  }; // Check to see if loyalty is turned on globally and in market


  var loyaltyIsActive = function loyaltyIsActive() {
    return killConfig.isMarketEnabled("loyalty");
  };

  var twoOrdersAwayEnabled = function twoOrdersAwayEnabled() {
    return killConfig.isMarketEnabled("e4baca08-cedb-4c9d-99a3-531969c857bf");
  }; // Check if loyalty has been disabled due to malfunction


  var loyaltyIsOk = function loyaltyIsOk() {
    var customerData = jsDPZ.app.customer.getCustomer().data;

    if (this.loyaltyIsActive()) {
      return this.config.loyaltyIsOk && typeof customerData.Session.loyaltyIsOk !== "undefined" ? customerData.Session.loyaltyIsOk : this.config.loyaltyIsOk;
    }

    return false;
  }; // Check cache from last ajax call to see if customer is enrolled


  var isEnrolled = function isEnrolled() {
    return this.loyaltyIsOk() && jsDPZ.app.customer.getCustomer().isLoyaltyCustomer();
  };

  var canEnroll = function canEnroll() {
    return this.loyaltyIsOk() && !this.isEnrolled() && this.store.isParticipating();
  };

  var doStopOver = function doStopOver() {
    return this.loyaltyIsOk() && site.func.customerLoggedIn() && !isEnrolled() && this.store.isParticipating() || !site.func.customerLoggedIn() && this.store.isParticipating();
  };

  var store = {
    storeSelectionChanged: false,
    isParticipating: function isParticipating() {
      return true; // jsDPZ.app.store.getStore().data.Pop; BEGIN CA Fix login coupon issue
    }
  };

  var loyaltyRedirect = function loyaltyRedirect(originalDestination) {
    var url;
    var isLoggedIn = site.func.customerLoggedIn();
    var isSemiLoggedIn = site.func.customerSemiLoggedIn();

    if (originalDestination) {
      jsDPZ.app.customer.getCustomer().data.Session.LoyaltyRedirect = originalDestination;
      site.sessionTools.save();
    }

    url = jsDPZ.app.customer.getCustomer().data.Session.LoyaltyRedirect;

    if ((isLoggedIn || isSemiLoggedIn) && this.store.isParticipating() && !isEnrolled && !site.isPaymentPage) {
      url = config.activateURL;
    } else if (!isLoggedIn && !isSemiLoggedIn) {
      url = config.signinURL;
    } else if ((isLoggedIn || isSemiLoggedIn) && dpz.loyalty.isEnrolled()) {
      url = jsDPZ.app.customer.getCustomer().data.Session.LoyaltyRedirect;
      jsDPZ.app.customer.getCustomer().data.Session.LoyaltyRedirect = "";
      site.sessionTools.save();
    }

    if (url[0] === "#") {
      window.location.hash = url;
    } else {
      window.location = url;
    }
  };

  var isReroute = function isReroute() {
    return jsDPZ.app.customer.getCustomer().data.Session.LoyaltyRedirect && jsDPZ.app.customer.getCustomer().data.Session.LoyaltyRedirect !== "";
  }; // Base points needed to win a new reward (FREE PIZZA!!!)


  var getBasePoints = function getBasePoints(couponCode) {
    var loyaltyCoupon;
    var couponName = couponCode || this.getBaseCoupon().CouponCode;
    var coupons = jsDPZ.app.customer.getCustomer().data.Loyalty.LoyaltyCoupons;

    if (this.loyaltyIsOk() && this.isEnrolled() && coupons) {
      loyaltyCoupon = coupons.find(function (coupon) {
        return coupon.CouponCode === couponName;
      });

      if (loyaltyCoupon) {
        return loyaltyCoupon.PointValue || 0;
      }
    }

    return 0;
  }; // The points that the customer have, this include (balance, pending, ceiling and floor points)
  // Loyalty-TODO: This have to reflect an order (if there is an order, a call to price-order to know actual vested points available in the order context)


  var getCustomerPoints = function getCustomerPoints() {
    var customerPoints = {
      BalancePoints: 0,
      PendingPoints: 0,
      RemainderPoints: 0,
      HasEarnedNewPizza: false
    }; // Calculate the values

    var basePoints = this.getBasePoints();
    customerPoints.Potential = jsDPZ.app.order.getOrder().data.Details.Loyalty.Potential;
    customerPoints.BalancePoints = jsDPZ.app.customer.getCustomer().data.Loyalty.VestedPointBalance - customerPoints.Potential.Burn.RedemptionPoints;
    customerPoints.PendingPoints = jsDPZ.app.customer.getCustomer().data.Loyalty.PendingPointBalance;
    customerPoints.RemainderPoints = basePoints > 0 ? (jsDPZ.app.customer.getCustomer().data.Loyalty.VestedPointBalance - customerPoints.Potential.Burn.RedemptionPoints) % basePoints : 0;
    customerPoints.HasEarnedNewPizza = customerPoints.RemainderPoints === 0 && customerPoints.BalancePoints > 0;
    return customerPoints;
  };

  var getPointsRange = function getPointsRange() {
    var basePoints = this.getBasePoints();
    var pointsRange = {
      FloorPoints: 0,
      CeilingPoints: 0,
      BasePoints: basePoints
    };
    var pizzas = this.getPizzaCount(this.getCustomerPoints());
    pointsRange.FloorPoints = pizzas * basePoints;
    pointsRange.CeilingPoints = (pizzas + 1) * basePoints;
    return pointsRange;
  };

  var getPizzaCount = function getPizzaCount(customerPoints) {
    var pointsBalance = customerPoints ? customerPoints.BalancePoints : this.getCustomerPoints().BalancePoints;
    var basePoints = this.getBasePoints();
    if (pointsBalance < 0) pointsBalance = 0;
    return basePoints > 0 ? Math.floor(pointsBalance / basePoints) : 0;
  };

  var getRawPercentage = function getRawPercentage() {
    var customerPoints = this.getCustomerPoints();
    var points = customerPoints.BalancePoints;
    var pizzas = this.getPizzaCount(customerPoints);
    var basePoints = this.getBasePoints();
    var rawPercentage = 0;

    if (basePoints > 0) {
      rawPercentage = customerPoints.HasEarnedNewPizza ? 1 : (points - pizzas * basePoints) / basePoints;
    }

    return rawPercentage;
  };

  var getPercentage = function getPercentage() {
    // When the bar is full we need to extend it a little more to prevent the bar showing as incomplete due to the negative margin
    // left that compensates the border css of the bar.
    var percentage = this.getRawPercentage();
    return percentage === 1 ? percentage * 100 + "%" : percentage * 100 + "%";
  };

  var positionBarEndcap = function positionBarEndcap() {
    // the 3 below is based on the skewed box triangle being 30% of the total box width
    // the box has a width of 9% so 3, it's algebraic.
    var percentage = this.getRawPercentage();
    return percentage === 1 ? percentage * 100 - 6 + "%" : percentage * 100 - 6 + "%";
  }; // Returns a boolean that tells if the customer's last activity is inside the expiration warning time


  var isLastActivityInsideWarningTime = function isLastActivityInsideWarningTime() {
    var currentDate;
    var expirationDate;
    var windowDate;

    if (this.isEnrolled()) {
      currentDate = dayjs(dayjs().format("YYYY-MM-DD"), "YYYY-MM-DD");
      expirationDate = dayjs(jsDPZ.app.customer.getCustomer().data.Loyalty.BasePointExpirationDate, "YYYY-MM-DD");

      if (expirationDate.isValid()) {
        windowDate = dayjs(currentDate).add(this.config.warningWindowBase, "days");
        return windowDate.isSame(expirationDate) || windowDate.isAfter(expirationDate) && (expirationDate.isAfter(currentDate) || expirationDate.isSame(currentDate));
      }
    }

    return false;
  };

  var getActivityString = function getActivityString(transactionType) {
    var uppercasedTransaction;

    if (typeof transactionType !== "undefined" && transactionType !== null && transactionType !== "") {
      uppercasedTransaction = transactionType.toUpperCase();
      return this.config.history.translations[uppercasedTransaction] ? this.config.history.translations[uppercasedTransaction] : transactionType.replace("-", " ");
    } // No Transaction type was received


    return "&nbsp";
  };

  var generateLoyaltyDescription = function generateLoyaltyDescription(data) {
    var description1 = "";
    var description2 = "";
    var dynamicDescription = data.Description.includes("${Points}");

    if (dynamicDescription) {
      var description = data.Description.split("${Points}");
      description1 = description[0].trim();
      description2 = description[1].trim();
    }

    if (dynamicDescription && data.Activity === "BASE") {
      data.Description = "".concat(data.Points, " ").concat(data.Description);
    }

    if (data.TransactionType === "MCSWEEPS") {
      data.isMasterCardSweeps = true;
    }

    return _objectSpread(_objectSpread({}, data), {}, {
      description1: description1,
      description2: description2,
      dynamicDescription: dynamicDescription
    });
  };

  var getHistoryPoints = function getHistoryPoints(options) {
    var pageIndex = options && options.pageIndex ? options.pageIndex : this.config.history.pageIndex;
    var separatePending = options && options.separatePending ? options.separatePending : this.config.history.separatePending;
    var successCallback = options && options.successCallback ? options.successCallback : function () {};
    var errorCallback = options && options.errorCallback ? options.errorCallback : function () {};

    if (this.loyaltyIsActive() && this.loyaltyIsOk() && this.isEnrolled()) {
      // Make the call
      jsDPZ.ajax.fetchLoyaltyHistory({
        pageIndex: pageIndex,
        pageSize: this.config.history.pageSize,
        useCache: false,
        success: function success(data) {
          var callbackData = {
            completedHistory: [],
            pendingHistory: [],
            fullHistory: (data.History || []).map(function (transaction) {
              return $.extend(true, {}, transaction, {
                TransactionDate: dayjs(transaction.TransactionDate).format("MM/DD/YY")
              });
            })
          };

          var mapTransaction = function mapTransaction(transaction) {
            var transactionData = $.extend({
              Description: "",
              OrderNumber: "",
              Points: "",
              PointBalance: "",
              PointStatus: "",
              TransactionDate: "",
              TransactionType: "",
              TransactionTotal: null,
              translateText: "",
              displayCustomerService: false,
              showBalance: true,
              rowClass: "",
              fullRowDescription: false,
              isMasterCardSweeps: false
            }, transaction, {
              Points: transaction.Points || 0,
              PointBalance: transaction.PointBalance || 0
            });
            transactionData = generateLoyaltyDescription(transactionData);
            transactionData.activityClass = "loyalty-history--cell--" + transactionData.TransactionType.toLowerCase().replace(new RegExp(" ", "g"), "-").replace(new RegExp("_", "g"), "-");
            transactionData.pointStatusClass = "loyalty-history--cell--" + transactionData.PointStatus.toLowerCase();
            transactionData.translateText = transactionData.TransactionType ? dpz.loyalty.getActivityString(transactionData.TransactionType) : "";
            transactionData.displayCustomerService = transactionData.TransactionType === "Expiration";
            transactionData.showTotal = transactionData.TransactionTotal && transactionData.TransactionTotal !== "0";
            transactionData.fullRowDescription = transactionData.TransactionType === "Expiration" || transactionData.TransactionType === "Customer Care";
            return transactionData;
          };

          if (data.Status !== "Fail") {
            if (separatePending) {
              $.extend(true, callbackData, {
                pendingHistory: callbackData.fullHistory.filter(function (transaction) {
                  return transaction.PointStatus === "PENDING";
                }).map(function (transaction) {
                  return $.extend(mapTransaction(transaction), {
                    showBalance: false
                  });
                }),
                completedHistory: callbackData.fullHistory.filter(function (transaction) {
                  return transaction.PointStatus !== "PENDING";
                }).map(function (transaction) {
                  return $.extend(mapTransaction(transaction), {
                    rowClass: transaction.rowClass
                  });
                })
              });
            }

            successCallback(callbackData);
          } else {
            errorCallback();
          }
        },
        error: function error() {
          // Show error
          errorCallback();
        }
      });
    } else if (!this.loyaltyIsOk()) {
      // We trigger the callback if loyalty / epsilon was down
      errorCallback();
    }
  };

  var setWidgetRules = function setWidgetRules(data) {
    this.config.widgetRules = $.extend(true, {}, this.config.widgetRulesSkeleton, {
      animation: this.config.animation
    }, {
      animation: {
        updateCache: function updateCache() {
          return !site.func.isHandheld();
        }
      }
    }, data);
  };

  var getSmallWidgetRules = function getSmallWidgetRules() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isAllEntrees = data.isAllEntrees || window.location.hash.endsWith("/AllEntrees/");
    return $.extend(true, this.config.widgetRulesSkeleton, {
      animation: {
        cache: "small"
      },
      data: {
        balance: {
          isAllEntrees: isAllEntrees,
          useFullTitle: function useFullTitle() {
            return site.func.isHandheld();
          },
          hideAfterAnimation: function hideAfterAnimation() {
            return dpz.loyalty.getCustomerPoints().HasEarnedNewPizza;
          },
          showFullPoints: function showFullPoints() {
            return dpz.loyalty.animateWidgets("small") && (dpz.loyalty.getPizzaCount() === 1 || dpz.loyalty.config.animation.animateAllNewPizzas);
          }
        },
        redemption: {
          isAllEntrees: isAllEntrees,
          keepCoupons: site.func.isHandheld() && site.isHomepage ? false : true,
          hideRedemption: function hideRedemption() {
            if ((site.isHomepage || isAllEntrees) && site.func.isHandheld()) return false;
            return site.func.isHandheld();
          }
        },
        points: {
          isAllEntrees: isAllEntrees,
          showTotalPoints: function showTotalPoints() {
            return false;
          },
          showNextRewardPoints: function showNextRewardPoints() {
            return dpz.loyalty.getCustomerPoints().BalancePoints >= 60;
          }
        },
        alerts: {
          showWarning: false
        }
      },
      display: {
        balance: function balance() {
          var customerPoints = dpz.loyalty.getCustomerPoints();
          return customerPoints.BalancePoints < 60 || dpz.loyalty.animateWidgets("small") && customerPoints.BalancePoints === 60;
        },
        pizzaCounter: function pizzaCounter() {
          var balancePoints = dpz.loyalty.getCustomerPoints().BalancePoints;
          return balancePoints > 60 || balancePoints === 60 && !dpz.loyalty.animateWidgets("small");
        },
        redemption: function redemption() {
          var balancePoints = dpz.loyalty.getCustomerPoints().BalancePoints;
          return balancePoints > 60 || balancePoints === 60 && !dpz.loyalty.animateWidgets("small");
        },
        points: function points() {
          var customerPoints = dpz.loyalty.getCustomerPoints();
          return customerPoints.PendingPoints > 0;
        }
      }
    }, data);
  };

  var animateWidgets = function animateWidgets(cache) {
    var animate = this.config.animation.animate;
    var customerData = jsDPZ.app.customer.getCustomer().data;
    var customerPoints = this.getCustomerPoints();
    var pizzaCount = this.getPizzaCount();

    if (animate) {
      if (typeof customerData.Session.WidgetAnimation === "undefined") {
        customerData.Session.WidgetAnimation = {};
      }

      widgetAnimationCache = this.config.animation.cachePrefix + cache; // We only animate if the we have not set the animate session to false and the browser has canvas support

      animate = customerData.Session.WidgetAnimation[widgetAnimationCache] !== false && site.func.hasCanvasSupport() && (pizzaCount <= 1 || customerPoints.RemainderPoints > 0 || this.config.animation.animateAllNewPizzas);
    }

    return animate;
  };

  function updateWidgets(data, effects) {
    var _this = this;

    var rules;
    var options = $.extend({
      keepCoupons: false
    }, data);
    var customerData = jsDPZ.app.customer.getCustomer().data;
    var animateWidgetsRules;
    var parentSelector;
    var balanceModifier;
    var pizzaCounterModifier;
    var balanceSelector;
    var pizzaCounterSelector;
    var redemptionSelector;
    var pointsSelector;
    var alertsSelector;
    var willBeAnimated;
    var clickableSelectors;
    var moduleIsOk;
    var pageName;
    var customerFetchedDetails = customerData.Session.customerFetchedDetails;
    var loadingOptions = {
      toggleLoadingBar: options.toggleLoadingBar
    };
    var getCustomer = jsDPZ.app.customer.getCustomer; // Fetch customer details for if a customer has ordered Gluten Free in the past
    // Once the data comes back, update the customer object with the new Details
    // If customer is not logged in, listen for the login event to then make the customer details call

    if (killConfig.isMarketEnabled("customerDetailsApiCall") && !customerFetchedDetails) {
      var fetchCustomerDetails = function fetchCustomerDetails() {
        getCustomer().fetchCustomerDetails(loadingOptions).then(function () {
          getCustomer().data.Session.customerFetchedDetails = true;
          return site.sessionTools.save();
        });
      };

      if (isProfiled()) {
        fetchCustomerDetails();
      } else {
        $(document).on("customerLogin.success", fetchCustomerDetails);
      }
    }

    if (data || !this.config.widgetRules) {
      this.setWidgetRules($.extend({}, data));
    }

    rules = this.config.widgetRules; // Only update widgets for enrolled users

    if (this.isEnrolled()) {
      // Render the widgets
      parentSelector = rules.parentSelector;
      animateWidgets = this.config.animation.animate; // Set the widget selectors

      parentSelector = rules.parentSelector;
      balanceSelector = "".concat(parentSelector, " .loyalty--widget-container--balance");
      pizzaCounterSelector = "".concat(parentSelector, " .loyalty--widget-container--pizza-counter");
      pointsSelector = "".concat(parentSelector, " .loyalty--widget-container--points");
      redemptionSelector = "".concat(parentSelector, " .loyalty--widget-container--redemption"); // Get the appropiate selector if we have two of them

      if ($(redemptionSelector).length >= 2) {
        if (site.func.isHandheld()) {
          redemptionSelector = "".concat(parentSelector, " .loyalty--widget-container--redemption--handheld");
        } else {
          redemptionSelector = "".concat(parentSelector, " .loyalty--widget-container--redemption--desktop");
        }
      }

      alertsSelector = "".concat(parentSelector, " .loyalty--widget-container--alerts"); // Check if customer session has the widget animation cache object container

      if (dpz.util.isEmpty(customerData.Session.WidgetAnimation)) {
        customerData.Session.WidgetAnimation = {};
      } // Merge the current customer session variable for the loyalty animation flag


      $.extend(this.config.animation, options.animation); // Check if the widgets are going to be animated

      animateWidgetsRules = effects && effects.forceAnimation || dpz.loyalty.animateWidgets(this.config.animation.cache);
      widgetAnimationCache = this.config.animation.cachePrefix + this.config.animation.cache; // This is used to tell to the pizza counter and redemption if they are going to be animated after the pizza meter finishes it's animation

      willBeAnimated = animateWidgetsRules && this.getCustomerPoints().HasEarnedNewPizza;
      balanceModifier = $(balanceSelector).data("widget-modifier");
      pizzaCounterModifier = $(pizzaCounterSelector).data("widget-modifier");

      if (site.func.isHandheld()) {
        balanceModifier = $(balanceSelector).data("widget-handheld-modifier");
        pizzaCounterModifier = $(pizzaCounterSelector).data("widget-handheld-modifier");
      }

      return jsDPZ.ajax.fetchLoyaltySummary(_objectSpread(_objectSpread({}, loadingOptions), {}, {
        value: customerData.CustomerID
      })).then(function (loyaltyData) {
        customerData.Loyalty = _objectSpread(_objectSpread({}, customerData.Loyalty), loyaltyData);
        delete customerData.Loyalty.CustomerID;
        return site.sessionTools.save();
      }).then(function () {
        return $.Deferred(function (_ref5) {
          var _loyaltyMarketConfig$;

          var resolve = _ref5.resolve;
          var loyaltyMarketConfig = getMarketProperty("loyalty");

          if (!((_loyaltyMarketConfig$ = loyaltyMarketConfig.twoOrdersAway) !== null && _loyaltyMarketConfig$ !== void 0 && _loyaltyMarketConfig$.isEnabled)) {
            resolve(false);
          } else if (jsDPZ.app.customer.getCustomer().data.Session.twoOrdersAwayPostClaim) {
            // user has claimed their points during this session, keep showing post-claim widget
            resolve(true);
          } else if (twoOrdersAwayEnabled()) {
            jsDPZ.ajax.loyaltyProgram({
              // can't cache, if they activate we need a fresh request
              type: "GET",
              url: "TwoOrdersAway/customers/".concat(getCustomer().data.CustomerID)
            }).then(function (_ref6) {
              var data = _ref6.data;
              var campaignCustomer = data.attributes.campaignCustomers[0];
              var bonusActivated = data.attributes.bonusActivated;
              var programName = data.attributes.programName;

              if (campaignCustomer) {
                // render twoOrdersAway widget
                if (!bonusActivated && programName === getCustomer().data.Session.activateProgram && data.attributes.campaignCustomers.length) {
                  jsDPZ.app.customer.getCustomer().data.Session.twoOrdersAwayEmailActivation = true;
                }

                resolve(true);
              } else {
                resolve(false);
              }
            })["catch"](function () {
              resolve(false);
            });
          } else {
            resolve(false);
          }
        });
      }).then(function (showTwoOrdersAway) {
        var renderOtherLoyaltyItems = function renderOtherLoyaltyItems() {
          var bandJumperElement = document.querySelector("".concat(parentSelector, " .js-bandJumper"));

          if (killConfig.isMarketEnabled("5414583f-a81f-438f-8305-57f119679147") && bandJumperElement) {
            require(["loyalty.components", "dpz.template", "marketconfig/dpz.lang.loyalty"], function (_ref7, template, loyaltyStrings) {
              var BandJumper = _ref7.BandJumper,
                  BandJumperProvider = _ref7.BandJumperProvider,
                  TranslateContext = _ref7.TranslateContext;

              var programRequest = function programRequest(request) {
                return jsDPZ.ajax.loyaltyProgram(_objectSpread(_objectSpread({}, request), loadingOptions));
              };

              var _getMarketProperty = getMarketProperty("loyalty"),
                  bandJumper = _getMarketProperty.bandJumper;

              preact.render(preact.h(TranslateContext.Provider, {
                value: template.getTranslateContextValue(_objectSpread({}, loyaltyStrings))
              }, preact.h(BandJumperProvider, {
                config: bandJumper,
                customer: jsDPZ.app.customer.getCustomer().data,
                languageCode: dpz.market.activeLanguageCode,
                programRequest: programRequest,
                removeActivateProgramFromSession: function removeActivateProgramFromSession() {
                  delete jsDPZ.app.customer.getCustomer().data.Session.activateProgram;
                  site.sessionTools.save();
                },
                utag: dpz.utag
              }, preact.h(BandJumper, null))), bandJumperElement);
            });
          }

          var appOrderBonusElement = document.querySelector("".concat(parentSelector, " .js-appOrderBonus"));

          if (site.isHomepage && dpz.market.activeLanguageCode == "en" && killConfig.isMarketEnabled("0e319703-7de6-471a-8f2b-e4f884796ae8") && appOrderBonusElement) {
            require(["loyalty.components", "dpz.template", "marketconfig/dpz.lang.loyalty"], function (_ref8, template, loyaltyStrings) {
              var AppOrderBonus = _ref8.AppOrderBonus,
                  AppOrderBonusProvider = _ref8.AppOrderBonusProvider,
                  TranslateContext = _ref8.TranslateContext;

              var programRequest = function programRequest(request) {
                return jsDPZ.ajax.loyaltyProgram(_objectSpread(_objectSpread({}, request), loadingOptions));
              };

              var sendSMSMessageRequest = function sendSMSMessageRequest(request) {
                return jsDPZ.ajax.sendSMSMessage(_objectSpread(_objectSpread({}, request), loadingOptions));
              };

              var _getMarketProperty2 = getMarketProperty("loyalty"),
                  appOrderBonus = _getMarketProperty2.appOrderBonus;

              preact.render(preact.h(TranslateContext.Provider, {
                value: template.getTranslateContextValue(_objectSpread({}, loyaltyStrings))
              }, preact.h(AppOrderBonusProvider, {
                config: appOrderBonus,
                customer: jsDPZ.app.customer.getCustomer().data,
                languageCode: dpz.market.activeLanguageCode,
                programRequest: programRequest,
                sendSMSMessageRequest: sendSMSMessageRequest,
                site: site,
                urlConfig: urlConfig,
                utag: dpz.utag
              }, preact.h(AppOrderBonus, null))), appOrderBonusElement);
            });
          }

          var highEngagementElement = document.querySelector("".concat(parentSelector, " .js-highEngagement"));

          if (site.isHomepage && highEngagementElement && ( // don't show 5off if doublepoints is showing on home page
          eligibleForBOGO() || eligibleFor5Off() && !eligibleForDoublePoints())) {
            fetchHighEngagement().then(function () {
              require(["loyalty.components", "dpz.template", "marketconfig/dpz.lang.tiles"], function (_ref9, template, tileStrings) {
                var HighEngagementBOGOTile = _ref9.HighEngagementBOGOTile,
                    HighEngagement5OffTile = _ref9.HighEngagement5OffTile,
                    TranslateContext = _ref9.TranslateContext;

                if (eligibleFor5Off()) {
                  preact.render(preact.h(TranslateContext.Provider, {
                    value: template.getTranslateContextValue(_objectSpread({}, tileStrings))
                  }, preact.h(HighEngagement5OffTile, {
                    urlConfig: urlConfig,
                    utag: dpz.utag
                  })), highEngagementElement);
                } else if (eligibleForBOGO()) {
                  preact.render(preact.h(TranslateContext.Provider, {
                    value: template.getTranslateContextValue(_objectSpread({}, tileStrings))
                  }, preact.h(HighEngagementBOGOTile, {
                    urlConfig: urlConfig,
                    utag: dpz.utag
                  })), highEngagementElement);
                }
              });
            })["catch"](function () {});
          }
        };

        if (showTwoOrdersAway) {
          // unfortunately, design has deviated so much we can't reuse the existing templates
          var twoOrdersAwaySelector = "";
          var hash = window.location.hash;
          var isCheckoutPage = hash.includes("/checkout/");
          var isCouponsPage = hash.includes("/section/Coupons/");
          var isMenuPage = hash.includes("/section/Food/category/");
          var isPizzaProfilePage = hash.includes("/customer/profile") || hash.includes("/customer/rewards");

          if (site.isHomepage && !site.func.isHandheld() || isPizzaProfilePage) {
            twoOrdersAwaySelector = "".concat(parentSelector, " .loyalty__dashboard");
          } else {
            twoOrdersAwaySelector = ".js-loyalty-widgets-container";
          }

          var modifierClass = "";

          if (site.func.isHandheld()) {
            modifierClass = "loyalty-two-orders-away--condensed";
          } else if (isMenuPage || isCheckoutPage || isCouponsPage) {
            modifierClass = "loyalty-two-orders-away--small-column-layout";
          }

          simplr.view.mRender({
            name: "loyalty_widget_two_orders_away",
            data: $.extend({}, rules.data.balance, {
              animate: animateWidgetsRules,
              newPizzaAnimation: _this.config.animation.animateAllNewPizzas,
              modifierClass: modifierClass,
              isCondensedWidget: data && data.isCondensedWidget,
              utag: dpz.utag
            }),
            selector: twoOrdersAwaySelector
          });
          renderOtherLoyaltyItems();
          return;
        } // render the standard widget


        simplr.view.mRender({
          name: "loyalty_widget_balance",
          data: $.extend({}, rules.data.balance, {
            animate: animateWidgetsRules,
            newPizzaAnimation: _this.config.animation.animateAllNewPizzas,
            modifierClass: balanceModifier,
            isCondensedWidget: data && data.isCondensedWidget
          }),
          selector: balanceSelector
        });
        simplr.view.mRender({
          name: "loyalty_widget_pizza_counter",
          data: $.extend({}, rules.data.pizzaCounter, {
            willBeAnimated: willBeAnimated,
            modifierClass: pizzaCounterModifier
          }),
          selector: pizzaCounterSelector
        });
        simplr.view.mRender({
          name: "loyalty_widget_points",
          data: $.extend({}, rules.data.points, _objectSpread(_objectSpread({}, loadingOptions), {}, {
            isCondensedWidget: data && data.isCondensedWidget
          })),
          selector: pointsSelector
        });
        simplr.view.mRender({
          name: "loyalty_widget_redemption",
          data: $.extend({}, rules.data.redemption, _objectSpread(_objectSpread({}, loadingOptions), {}, {
            willBeAnimated: willBeAnimated
          })),
          selector: redemptionSelector
        });
        simplr.view.mRender({
          name: "loyalty_widget_alerts",
          data: $.extend({}, rules.data.alerts),
          selector: alertsSelector
        });
        renderOtherLoyaltyItems(); // Hide the widgets that are set to false in the config

        moduleIsOk = _this.loyaltyIsOk();

        if (moduleIsOk && rules.display.balance()) {
          $(balanceSelector).show();
        } else {
          $(balanceSelector).hide();
        }

        if (moduleIsOk && rules.display.pizzaCounter()) {
          $(pizzaCounterSelector).show();
        } else {
          $(pizzaCounterSelector).hide();
        }

        if (moduleIsOk && rules.display.points()) {
          $(pointsSelector).show();
        } else {
          $(pointsSelector).hide();
        }

        if (moduleIsOk && rules.display.redemption()) {
          $(redemptionSelector).show();
        } else {
          $(redemptionSelector).hide();
        } // Prepare for button animation


        if (moduleIsOk && _this.canRedeem() && effects && effects.animateButton) {
          $(redemptionSelector).addClass("small-scale-hidden");
        }

        if (rules.display.alerts() || !moduleIsOk) {
          $(alertsSelector).show();
        } else {
          $(alertsSelector).hide();
        } // Hide the non used redemption


        if (~redemptionSelector.indexOf("handheld")) {
          $("".concat(parentSelector, " .loyalty--widget-container--redemption--desktop")).hide();
        } else if (~redemptionSelector.indexOf("desktop")) {
          $("".concat(parentSelector, " .loyalty--widget-container--redemption--handheld")).hide();
        } // Add the fallback class to the balance and pizza counter selector (in case they do not support the canvas)


        if (!site.func.hasCanvasSupport()) {
          $(balanceSelector + ", " + pizzaCounterSelector).addClass("widget__fallback");
        } // Add the widgets the click event to redirect the customer if the widget was click
        // First remove the previous click event (we remove the event from all the widgets because the rules could had changed)


        $("".concat(balanceSelector, ", ").concat(pizzaCounterSelector, ", ").concat(pointsSelector, ", ").concat(redemptionSelector, ", ").concat(alertsSelector)).off("click.redirectToRewards").off("keyup.redirectToRewards");

        if (_this.loyaltyIsOk()) {
          clickableSelectors = [];

          if (rules.redirectToRewards.balance && rules.display.balance()) {
            clickableSelectors.push(balanceSelector);
          }

          if (rules.redirectToRewards.pizzaCounter && rules.display.pizzaCounter()) {
            clickableSelectors.push(pizzaCounterSelector);
          }

          if (rules.redirectToRewards.redemption && rules.display.redemption()) {
            clickableSelectors.push(redemptionSelector);
          }

          if (rules.redirectToRewards.points && rules.display.points()) {
            clickableSelectors.push(pointsSelector);
          }

          if (rules.redirectToRewards.alerts && rules.data.alerts.showWarning) {
            clickableSelectors.push(alertsSelector);
          }

          $(clickableSelectors.join(",")).on("click.redirectToRewards", function (evt) {
            evt.preventDefault();
            dpz.loyalty.redirectToRewards();
          });
          $(clickableSelectors.join(",")).on("keyup.redirectToRewards", function (evt) {
            if (evt.which === 13 || evt.which === 32) {
              // Enter or Space
              dpz.loyalty.redirectToRewards();
            }
          });
        }

        if (site.func.isHandheld() && !dpz.loyalty.canRedeem()) jsDPZ.topic("render.redemption").subscribe(function () {
          redemptionSelector = "".concat(parentSelector, " .js-loyalty-widget-handheld-redemption");
          simplr.view.mRender({
            name: "loyalty_widget_redemption",
            data: $.extend({}, rules.data.redemption, _objectSpread(_objectSpread({}, loadingOptions), {}, {
              willBeAnimated: willBeAnimated
            })),
            selector: redemptionSelector
          });
        }); // Loyalty click on information button (i)

        if (options.showInfo) {
          // Send the webtrend
          pageName = options.showInfo.pageName ? options.showInfo.pageName : "";
          $(".loyalty-icon-info").off("click.loyaltyWidget").on("click.loyaltyWidget", function () {
            var webTrendPageName = pageName || utag.data.page_name;
            var webTrendEvent = $.extend(true, {
              title: "LoyaltyWidget " + webTrendPageName,
              group: "Loyalty Widget",
              subGroup: webTrendPageName + " Show Info",
              uri: "LoyaltyWidget/" + webTrendPageName + "/ShowInfo"
            }, options.showInfo.webTrendEvent);
            site.trigger.onEvent(webTrendEvent); // Make the callback

            if ($.isFunction(options.showInfo.callback)) {
              options.showInfo.callback();
            }
          });
        }

        if (moduleIsOk && _this.canRedeem() && effects && effects.animateButton) {
          setTimeout(function () {
            $(redemptionSelector).toggleClass("small-scale-hidden full-scale");
            $(redemptionSelector).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
              $(this).removeClass("full-scale");
            });
          }, 500);
        } // Prevent the widget animation until the customer refreshes the page
        // only if the widget was shown


        if (($(".js-loyalty-widgets-container").length === 0 || !$(".js-loyalty-widgets-container").css("display") !== "none") && rules.animation.updateCache()) {
          customerData.Session.WidgetAnimation[widgetAnimationCache] = false;
        }

        site.sessionTools.save();
      });
    } else {
      return $.Deferred();
    }
  }

  var continueAnimation = function continueAnimation(hideBalance) {
    var rules = this.config.widgetRules;
    var parentSelector = rules.parentSelector;
    var balanceSelector = parentSelector + " .loyalty--widget-container--balance";
    var pizzaCounterSelector = parentSelector + " .loyalty--widget-container--pizza-counter";
    var pointsSelector = parentSelector + " .loyalty--widget-container--points";
    var redemptionSelector = parentSelector + " .loyalty--widget-container--redemption";
    var redemptionCta = $(redemptionSelector).find(".js-loyaltyRedeem");

    var animatePoints = function animatePoints() {
      // Animate the pizza counter counter
      $(pizzaCounterSelector).find(".js-pizzasEarnedAnimOverlay").animate({
        width: "100%",
        height: "100%"
      }, {
        queue: false,
        duration: 300,
        complete: function complete() {
          $(pizzaCounterSelector).find(".js-pizzasEarnedAnimOverlay").hide();
        }
      });
      $(pizzaCounterSelector).find(".js-oldPizzasEarned").animate({
        top: "-100%"
      }, {
        queue: false
      });
      $(pizzaCounterSelector).find(".js-newPizzasEarned").animate({
        top: "50%"
      }, {
        queue: false,
        complete: function complete() {
          // Show the redemption widget (only for small widget)
          if (hideBalance) {
            redemptionCta.removeClass("inactive").removeAttr("disabled");
            $(redemptionSelector).fadeIn();
          }
        }
      });
    }; // Get the appropiate selector if we have two of them


    if ($(redemptionSelector).length >= 2) {
      if (site.func.isHandheld()) {
        redemptionSelector = parentSelector + " .loyalty--widget-container--redemption--handheld";
      } else {
        redemptionSelector = parentSelector + " .loyalty--widget-container--redemption--desktop";
      }
    } // Determine if the animation will display or not the pizza counter and redemption (small widget hides balance and shows pizza counter and redemption, big widget only adds an effect on them)


    if (hideBalance) {
      // On small widget the animation will start after the pizza meter has dissapeared
      $(balanceSelector).fadeOut({
        complete: function complete() {
          $(pizzaCounterSelector).fadeIn({
            complete: function complete() {
              animatePoints();
            }
          });
          $(pointsSelector).show();
          redemptionCta.removeClass("inactive").removeAttr("disabled");
          $(redemptionSelector).show();
        }
      });
    } else {
      animatePoints();

      if (dpz.loyalty.canRedeem()) {
        // Scale in/out the redeem button and make it active
        redemptionCta.toggle({
          effect: "scale",
          duration: 100,
          queue: false,
          complete: function complete() {
            redemptionCta.removeClass("inactive").removeAttr("disabled").toggle({
              effect: "scale",
              duration: 200
            });
          }
        });
      }
    }
  };

  var canRedeem = function canRedeem(couponCode) {
    var redeemableCount;
    var orderData;
    var orderCoupons;
    var redeemedCoupons;
    var coupon;
    var loyaltyCoupons;
    var maxRedeemableCoupons;
    var couponName = couponCode || this.getBaseCoupon().CouponCode;
    var storeNum = jsDPZ.app.store.getStore().data.StoreID; // If no store is selected we say the store is participating (customer could select a participating store)

    var storeParticipates = this.store.isParticipating() || storeNum === "";
    var loyaltyStatus = jsDPZ.app.customer.getCustomer().data.Loyalty.AccountStatus;

    if (this.isEnrolled() && loyaltyStatus !== "SUSPENDED" && couponName !== "" && storeParticipates) {
      redeemableCount = this.getPizzaCount();
      orderData = jsDPZ.app.order.getOrder().data;
      orderCoupons = orderData.Details.Coupons;

      if (redeemableCount > 0) {
        // If the user has coupons then it should have a store selected and we need to check coupon limit
        redeemedCoupons = orderCoupons.reduce(function (loyaltyCouponCount, orderCoupon) {
          return orderCoupon.Code === couponName ? loyaltyCouponCount + orderCoupon.Qty : loyaltyCouponCount;
        }, 0); // If the customer has already redeemed coupons then we check for the coupon limit

        if (redeemedCoupons > 0) {
          coupon = jsDPZ.app.catalog.getCatalog().getCoupon(couponName);

          if (coupon && coupon.data) {
            // Coupon is active, customer has enough points and I can still add more coupons to this order
            maxRedeemableCoupons = coupon.data.Tags.LimitPerOrder ? parseInt(coupon.data.Tags.LimitPerOrder, 10) : 1;
            return jsDPZ.app.catalog.isCouponActive(couponName, killConfig.isMarketEnabled("afterMidnightCoupon")).Success && redeemedCoupons < maxRedeemableCoupons;
          } // Coupon was not found or was missing in catalog, we use the information from the customer loyalty data


          loyaltyCoupons = jsDPZ.app.customer.getCustomer().data.Loyalty.LoyaltyCoupons;
          coupon = loyaltyCoupons.find(function (c) {
            return c.CouponCode === couponName;
          });

          if (coupon) {
            // If the coupon does not have a limit per order we will asume limit is one
            maxRedeemableCoupons = coupon.LimitPerOrder ? coupon.LimitPerOrder : 1;
            return redeemedCoupons < maxRedeemableCoupons;
          } // Coupon didn't match anything


          return false;
        } // The customer has enough points for other coupons and haven't redeemed coupons


        return true;
      } // The customer does not have enough points to redeem, there's no need to search if it has coupons already


      return false;
    } // Customer was not enrolled or coupon name was missing (no base coupon neither)


    return false;
  };

  var getBaseCoupon = function getBaseCoupon() {
    var defaultCoupon = {
      CouponCode: "",
      PointValue: 0,
      BaseCoupon: false
    };
    var loyaltyCoupons = jsDPZ.app.customer.getCustomer().data.Loyalty.LoyaltyCoupons;

    if (this.loyaltyIsOk() && this.isEnrolled() && loyaltyCoupons) {
      return loyaltyCoupons.find(function (coupon) {
        return coupon.BaseCoupon;
      }) || defaultCoupon;
    } // If no coupon we return an empty coupon


    return defaultCoupon;
  };

  var hasLoyaltyCoupon = function hasLoyaltyCoupon(code) {
    return jsDPZ.app.order.getOrder().data.Details.Coupons.some(function (coupon) {
      return ~coupon.Code.indexOf(code || "LTY");
    });
  };

  var updateLoyaltyStatus = function updateLoyaltyStatus(moduleIsOk, preserveCoupons) {
    var promise;
    jsDPZ.app.customer.getCustomer().data.Session.loyaltyIsOk = moduleIsOk; // Remove the loyalty coupons from the order

    if (!loyaltyIsOk && !preserveCoupons) {
      // Remove loyalty coupons
      promise = jsDPZ.app.order.getOrder().removeCoupons({
        successFilter: function successFilter(coupon, catalogCoupon) {
          return catalogCoupon.isLoyaltyCoupon();
        }
      });
    } // Save session and update the widgets after removing the coupons


    $.when(promise).done(function () {
      site.sessionTools.save().then(function () {
        // updateWidgets is already run by loyalty_card_condensed on the homepage.
        if (!site.isHomepage) {
          dpz.loyalty.updateWidgets();
        }

        jsDPZ.topic("loyalty.status.changed").publish({
          status: moduleIsOk
        });
      });
    });
  };

  var pizzaRedemptionAnimation = function pizzaRedemptionAnimation() {
    var $widgetBodyContainer = $(".js-smallWidgetBody:visible");
    var $widgetHTML = $widgetBodyContainer.html();
    var $pizzaRedemptionMarkup = this.getRedemptionTemplateMarkup();
    var opt1 = $.Deferred();
    var opt2 = $.Deferred(); // Set a static height to prepare for sliding animation when content changes

    $($widgetBodyContainer).css("height", $widgetBodyContainer.outerHeight());
    $pizzaRedemptionMarkup.then(function (pizzaRedemptionHtml) {
      // Face out the contents of the small widget, but leave the header
      $widgetBodyContainer.fadeTo(250, 0, function () {
        var $newText;
        var $newTextHeight; // Place the markup inside the widget body (at this point, the contents are
        // scaled to 0 by a css class, so it is hidden

        $widgetBodyContainer.html(pizzaRedemptionHtml); // Find and store the text that we want to animate, as well as its height

        $newText = $widgetBodyContainer.find(".js-pizzaRedeemedText");
        $newTextHeight = $newText.outerHeight(); // Turn the opacity back to 1. At this point, the contents are still
        // at a scale of 0, so they will still be hidden.

        $widgetBodyContainer.css("opacity", 1); // Slide the box to what the height of the new contents will be

        $widgetBodyContainer.animate({
          height: $newTextHeight
        }, function () {
          // Remove the scale of 0, and add the full-scale class, which
          // includes a css transition
          $newText.toggleClass("small-scale-hidden full-scale"); // Event listener that will run when the CSS transition is complete...

          $newText.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
            setTimeout(function () {
              $newText.removeClass("full-scale").addClass("small-scale-transition");
              $newText.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                // hide the box again while we replace the content back to the widget markup
                $widgetBodyContainer.css({
                  opacity: 0,
                  maxHeight: $newTextHeight,
                  height: "auto"
                }).html($widgetHTML); // Replace the original (pre-animation) HTML back into the widget

                if (dpz.loyalty.getPizzaCount() < 1 && dpz.loyalty.getCustomerPoints().RemainderPoints > 0) {
                  setTimeout(function () {
                    dpz.loyalty.updateWidgets({
                      data: {
                        balance: {
                          checkout: window.location.hash.indexOf("/checkout/") > -1
                        }
                      }
                    }, {
                      forceAnimation: true
                    }); // Run the widget update to account for new point total

                    opt1.resolve();
                  }, 1000);
                } else {
                  dpz.loyalty.updateWidgets({}, {
                    animateButton: dpz.loyalty.getPizzaCount() >= 1
                  }); // Run the widget update to account for new point total

                  opt1.resolve();
                }

                $widgetBodyContainer.animate({
                  maxHeight: 1000,
                  opacity: 1
                }, 1000, function () {
                  // Remove all inline styles that were used for animation purposes
                  $(this).removeAttr("style");
                  opt2.resolve();
                });
              });
            }, 500);
          });
        });
      });
    });
    return $.when(opt1, opt2);
  };

  var getEnrollmentBonusConfig = function getEnrollmentBonusConfig() {
    var enrollmentBonusConfig = $.extend({
      show: false,
      bonusPoints: 0,
      bonusTotalNeeds: 0
    }, this.config.enrollmentBonusConfig);
    return enrollmentBonusConfig;
  }; // This function updates the customer's loyalty points making a price order call. The function returns a promise that is resolved when the price order call succeds and the
  // points are updated. The function rejects the promise if the price order fails, loyalty is inactive or the customer is not enrolled.


  var updateOrderPoints = function updateOrderPoints() {
    var promise = $.Deferred();

    if (this.loyaltyIsOk() && this.isEnrolled()) {
      site.func.getOrderForPowerData({
        calculatePotentialPoints: true
      }).then(function (orderData) {
        jsDPZ.ajax.priceOrder({
          data: orderData
        }).then(function priceOrderSuccess(data) {
          var isEmptyPriceCall;

          if (data.Status >= 0) {
            if (data.Order && data.Order.Loyalty) {
              if (data.Order.Loyalty.Status && data.Order.Loyalty.Status === "Fail") {
                promise.reject(data);
              } else {
                $.extend(true, jsDPZ.app.order.getOrder().data.Details.Loyalty, {
                  Potential: data.Order.Loyalty.Potential || jsDPZ.config.dataModel.ORDER.Details.Loyalty.Potential,
                  Burn: data.Order.Loyalty.Burn || jsDPZ.config.dataModel.ORDER.Details.Loyalty.Burn,
                  Earn: data.Order.Loyalty.Earn || jsDPZ.config.dataModel.ORDER.Details.Loyalty.Earn,
                  PendingBalance: data.Order.Loyalty.PendingBalance || jsDPZ.config.dataModel.ORDER.Details.Loyalty.PendingBalance,
                  PointBalance: data.Order.Loyalty.PointBalance || jsDPZ.config.dataModel.ORDER.Details.Loyalty.PointBalance
                });
                site.sessionTools.save();
                promise.resolve();
              }
            } else {
              promise.reject(data);
            }
          } else {
            // We need to check if the error is due to an empty price call
            isEmptyPriceCall = data.Order.StatusItems.some(function (statusItem) {
              return statusItem.Code === "PosOrderIncomplete" && statusItem.PulseCode === 6;
            });

            if (isEmptyPriceCall) {
              $.extend(true, jsDPZ.app.order.getOrder().data.Details.Loyalty, {
                Potential: jsDPZ.config.dataModel.ORDER.Details.Loyalty.Potential,
                Burn: jsDPZ.config.dataModel.ORDER.Details.Loyalty.Burn,
                Earn: jsDPZ.config.dataModel.ORDER.Details.Loyalty.Earn,
                PendingBalance: jsDPZ.config.dataModel.ORDER.Details.Loyalty.PendingBalance,
                PointBalance: jsDPZ.config.dataModel.ORDER.Details.Loyalty.PointBalance
              });
              site.sessionTools.save();
              promise.resolve();
              return;
            } // Price order failed


            promise.reject(data);
          }
        }, function priceOrderFailure() {
          promise.reject();
        });
      });
    } else {
      promise.reject();
    }

    return promise;
  };

  var enrollCustomer = function enrollCustomer(data) {
    // Only make the enroll call if we know loyalty is ok
    var options = $.extend(true, {}, data);
    var customerData = jsDPZ.app.customer.getCustomer().data;

    if (this.loyaltyIsOk()) {
      $.extend(true, customerData.Loyalty, {
        Command: "ENROLL"
      });

      if (killConfig.isMarketEnabled("enrollmentSourceTag") && options.EnrollmentSourceTag) {
        customerData.EnrollmentSourceOrgUri = jsDPZ.config.dataModel.ORDER_REQUEST.SourceOrganizationURI;
        customerData.EnrollmentSourceTag = options.EnrollmentSourceTag;
      }

      site.func.saveAccountData({
        data: customerData,
        success: function success(saveAccountData) {
          if (saveAccountData.Loyalty && saveAccountData.Loyalty.Status !== "Fail") {
            // BEGIN CORE-5163
            if (jsDPZ.app.customer.getCustomer().data.Session.LoyaltyEnrollmentError && jsDPZ.app.customer.getCustomer().data.Session.loyaltyStopover) {
              delete jsDPZ.app.customer.getCustomer().data.Session.LoyaltyEnrollmentError;
            } // END CORE-5163


            jsDPZ.app.customer.getCustomer().data.Session.NewLoyaltyEnrollment = true;
            site.sessionTools.save().then(function () {
              if (options.successCallback && $.isFunction(options.successCallback)) {
                options.successCallback();
              } else {
                // Default action
                dpz.loyalty.loyaltyRedirect();
              }
            });
          } else {
            if (!saveAccountData.Loyalty) {
              dpz.loyalty.updateLoyaltyStatus(false);
            }

            site.func.overlayToggle(true, "codeOverlay", {}, {
              code: "eLoyaltyEnrollmentFailed"
            });

            if (options.errorCallback && $.isFunction(options.errorCallback)) {
              options.errorCallback();
            }
          }
        },
        error: function error() {
          if (options.errorCallback && $.isFunction(options.errorCallback)) {
            options.errorCallback();
          }
        }
      });
    } else {
      site.func.overlayToggle(true, "codeOverlay", {}, {
        code: "eLoyaltyEnrollmentFailed"
      });

      if (options.errorCallback && $.isFunction(options.errorCallback)) {
        options.errorCallback();
      }
    }
  };

  var resetOrderEarnPoints = function resetOrderEarnPoints() {
    if (this.loyaltyIsOk() && this.isEnrolled()) {
      $.extend(true, jsDPZ.app.order.getOrder().data.Details.Loyalty, {
        Potential: {
          Earn: jsDPZ.config.dataModel.ORDER.Details.Loyalty.Potential.Earn
        }
      });
      site.sessionTools.save();
    }
  };

  var renderSmallWidget = function renderSmallWidget(data) {
    var options = $.extend(true, {
      selector: ".js-myLoyaltyWidget",
      updateData: {}
    }, data);
    simplr.view.mRender({
      name: "loyalty_small_widget",
      data: options.updateData,
      selector: options.selector
    });
  };

  var getRedemptionTemplateMarkup = function getRedemptionTemplateMarkup() {
    return dpz.template.assembleLayout({
      component: "loyaltyWidgetPizzaRedeemed",
      tokens: {}
    });
  };

  var notifyLoginError = function notifyLoginError() {
    if (this.loyaltyIsActive() && jsDPZ.app.customer.getCustomer().data.Session.loyaltyIsOk === false) {
      site.func.overlayToggle(true, "codeOverlay", {}, {
        code: "eLoyaltyLoginFailed"
      });
    }
  };

  var showInfographicOverlay = function showInfographicOverlay() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this.loyaltyIsActive()) {
      var _e$currentTarget = e.currentTarget,
          currentTarget = _e$currentTarget === void 0 ? null : _e$currentTarget;
      site.func.overlayToggle(true, "contentOverlay", {}, {
        template: "loyaltyInfographic",
        templateData: {
          customClass: "loyalty-infographic--overlay",
          showBanner: true,
          focusedElement: currentTarget
        },
        title: decodeAndSanitize(translate("customer.create_feature_loyalty_title", null, customerStrings)),
        titleClass: "is-visually-hidden"
      }, function () {
        site.func.stackAttack(" .loyalty-infographic--overlay");
      });
    }
  };

  var refreshLoyaltyStatus = function refreshLoyaltyStatus() {
    var promise = $.Deferred();
    var customerData = jsDPZ.app.customer.getCustomer().data;

    if (this.loyaltyIsActive() && isProfiled()) {
      // We only are going to try to fetch the information if loyalty is down due to an session fail
      if (this.config.loyaltyIsOk) {
        jsDPZ.ajax.fetchLoyaltySummary(customerData.CustomerID).done(function (responseData) {
          // Add on the response data from customer loyalty call
          $.extend(true, customerData.Loyalty, responseData); // We don't need to save the customerID, since it is already on the customer object

          delete customerData.Loyalty.CustomerID;
          site.sessionTools.save().then(function () {
            dpz.loyalty.updateLoyaltyStatus(true);
            promise.resolve();
          });
        }).fail(function () {
          dpz.loyalty.updateLoyaltyStatus(false);
          site.func.overlayToggle(true, "codeOverlay", {}, {
            code: "eLoyaltyLoginFailed"
          });
          promise.reject();
        });
      } else {
        dpz.loyalty.updateLoyaltyStatus(false);
        site.func.overlayToggle(true, "codeOverlay", {}, {
          code: "eLoyaltyLoginFailed"
        });
        promise.reject();
      }
    }

    return promise;
  }; // This function redirects the customer to the rewards page (it will ask for the customer credentials if it is a remembered customer )


  var redirectToRewards = function redirectToRewards() {
    if (this.loyaltyIsActive()) {
      if (site.func.customerSemiLoggedIn() && !dpz.oauth.isAuthorized([oauthSopes.UPDATE_PROFILE])()) {
        site.func.showLoginPopup({
          successCommand: dpz.loyalty.config.commands.dashboard
        });
      } else if (~window.location.href.indexOf("/pages/customer/")) {
        // Guest or authenticated customer
        if (!~window.location.hash.indexOf(this.config.dashboardURL)) {
          // Change hash to #!/customer/rewards/
          window.location.hash = this.config.dashboardURL;
        }
      } else {
        // Redirect to pages/customer/#!/customer/rewards/
        window.location.href = urlConfig.root + "/pages/customer/" + this.config.dashboardURL;
      }
    }
  };

  var getWingsUpsell = function getWingsUpsell(couponCode, isFulfilled) {
    var isLoyaltyEnrolled = this.isEnrolled();
    var isLoyaltyWingsEnabled = killConfig.isMarketEnabled("e3498fd2-e490-4041-8b57-64b66a3b4d0c");

    var _getMarketProperty3 = getMarketProperty("loyalty"),
        wings = _getMarketProperty3.wings;

    var isApplicableCoupon = Object.keys(wings).includes(couponCode);
    var _jsDPZ$app$customer$g = jsDPZ.app.customer.getCustomer().data,
        ecommCustomerId = _jsDPZ$app$customer$g.CustomerID,
        sawLoyaltyWingsUpsell = _jsDPZ$app$customer$g.Session.sawLoyaltyWingsUpsell;
    var catalog = jsDPZ.app.catalog.getCatalog();
    var _catalog$data = catalog.data,
        products = _catalog$data.Products,
        variants = _catalog$data.Variants;
    var isWingProductInCart = jsDPZ.app.order.getOrder().data.Details.Variants.some(function (_ref10) {
      var _catalog$getVariant$d;

      var Code = _ref10.Code;
      return ((_catalog$getVariant$d = catalog.getVariant(Code).data.Tags) === null || _catalog$getVariant$d === void 0 ? void 0 : _catalog$getVariant$d.Wings) || false;
    });

    if (isLoyaltyEnrolled && isLoyaltyWingsEnabled && isFulfilled && isApplicableCoupon && !sawLoyaltyWingsUpsell && !isWingProductInCart) {
      jsDPZ.ajax.loyaltyProgram({
        type: "GET",
        url: "Wings/customers/".concat(ecommCustomerId)
      }).then(function (_ref11) {
        var _ref11$data$attribute = _slicedToArray(_ref11.data.attributes.campaignCustomers, 1),
            campaignCustomerInfo = _ref11$data$attribute[0];

        if (campaignCustomerInfo) {
          require(["contexts.components", "loyalty.components", "dpz.template", "marketconfig/dpz.lang.loyalty"], function (_ref12, _ref13, template, loyaltyStrings) {
            var withGNOLOContext = _ref12.withGNOLOContext;
            var TranslateContext = _ref13.TranslateContext,
                LoyaltyWingsModal = _ref13.LoyaltyWingsModal;

            var addWingsToCart = function addWingsToCart(variantCode) {
              var variantData = catalog.getVariant(variantCode).data;
              simplr.controller.mRouteAndExecute("/order/variant/new".concat(site.catalogTools.orderVariantToURLParameterString(variantData)));
            };

            var writeSawLoyaltyWingsUpsellToSession = function writeSawLoyaltyWingsUpsellToSession() {
              jsDPZ.app.customer.getCustomer().data.Session.sawLoyaltyWingsUpsell = true;
              site.sessionTools.save();
            };

            var _getMarketProperty4 = getMarketProperty("loyalty"),
                wingsConfig = _getMarketProperty4.wings;

            var LoyaltyWingsModalWithContext = withGNOLOContext(LoyaltyWingsModal);
            preact.render(preact.h(TranslateContext.Provider, {
              value: template.getTranslateContextValue(_objectSpread({}, loyaltyStrings))
            }, preact.h(LoyaltyWingsModalWithContext, {
              addWingsToCart: addWingsToCart,
              pointsAvailable: campaignCustomerInfo.pointsAvailable,
              products: products,
              wingsCouponConfig: wingsConfig[couponCode],
              writeSawLoyaltyWingsUpsellToSession: writeSawLoyaltyWingsUpsellToSession,
              variants: variants
            })), document.body);

            var _document$getElements = document.getElementsByClassName("js-modal"),
                _document$getElements2 = _slicedToArray(_document$getElements, 1),
                modal = _document$getElements2[0];

            modal.scrollTop = 0;
          });
        }
      })["catch"](function () {});
    }
  };

  var shouldInterceptWingRemoval = function shouldInterceptWingRemoval(variantToRemove) {
    var catalog = jsDPZ.app.catalog.getCatalog();

    var isWing = function isWing(code) {
      return catalog.getVariant(code).data.Tags.Wings || false;
    };

    var isWingVariant = isWing(variantToRemove.Code);
    var sawLoyaltyWingsUpsell = jsDPZ.app.customer.getCustomer().data.Session.sawLoyaltyWingsUpsell;
    var isLastWingProductInCart = jsDPZ.app.order.getOrder().data.Details.Variants.filter(function (_ref14) {
      var Code = _ref14.Code;
      return variantToRemove.Code === Code ? false : isWing(Code);
    }).length === 0;
    var isQualifyingOrder = jsDPZ.app.order.getOrder().data.Details.Amounts.Customer >= 10;
    return isWingVariant && this.isEnrolled() && sawLoyaltyWingsUpsell && isLastWingProductInCart && isQualifyingOrder;
  };

  var interceptWingRemoval = function interceptWingRemoval(removeVariantCallback) {
    require(["contexts.components", "loyalty.components", "dpz.template", "marketconfig/dpz.lang.loyalty"], function (_ref15, _ref16, template, loyaltyStrings) {
      var withGNOLOContext = _ref15.withGNOLOContext;
      var TranslateContext = _ref16.TranslateContext,
          LoyaltyWingsConfirmationModal = _ref16.LoyaltyWingsConfirmationModal;
      var LoyaltyWingsConfirmationModalWithContext = withGNOLOContext(LoyaltyWingsConfirmationModal);
      preact.render(preact.h(TranslateContext.Provider, {
        value: template.getTranslateContextValue(_objectSpread({}, loyaltyStrings))
      }, preact.h(LoyaltyWingsConfirmationModalWithContext, {
        removeVariant: removeVariantCallback
      })), document.body);

      var _document$getElements3 = document.getElementsByClassName("js-modal"),
          _document$getElements4 = _slicedToArray(_document$getElements3, 1),
          modal = _document$getElements4[0];

      modal.scrollTop = 0;
    });
  }; // Render the widgets when there's a view change


  $(document).on("/breakpoint/change/handheld/ /breakpoint/change/desktop/ ", function () {
    if (dpz.loyalty.loyaltyIsActive()) {
      dpz.loyalty.updateWidgets();
    }
  });
  /* BEGIN CA Change - cannot use ldClient methods because it was removed with darkly module, return null function
  let getNumberOfDaysBeforeShowingPointExpiration = () =>
    parseInt(ld.client.variation("034f6af4-03e3-4ef9-9c01-90366d5b17bf"));
  */

  var getNumberOfDaysBeforeShowingPointExpiration = function getNumberOfDaysBeforeShowingPointExpiration() {
    return null;
  };
  /* END CA Change */


  var fetchHighEngagement = function fetchHighEngagement() {
    return new Promise(function (resolve, reject) {
      var getCustomer = jsDPZ.app.customer.getCustomer;
      var highEngagementCampaignInfo = getCustomer().data.Session.highEngagementCampaignInfo;

      if (highEngagementCampaignInfo) {
        resolve(highEngagementCampaignInfo);
        return;
      }

      if (!eligibleForHighEngagement()) {
        reject("Customer not eligible for this campaign.");
        return;
      }

      jsDPZ.ajax.loyaltyProgram({
        type: "GET",
        url: "HE2021/customers/".concat(getCustomer().data.CustomerID)
      }).then(function (_ref17) {
        var data = _ref17.data;

        if (!(data !== null && data !== void 0 && data.attributes.campaignCustomers[0])) {
          reject("Customer is not included in this campaign.");
          return;
        }

        var Session = getCustomer().data.Session;

        var newData = _objectSpread(_objectSpread({}, data), {}, {
          attributes: _objectSpread(_objectSpread({}, data.attributes), {}, {
            campaignCustomer: data.attributes.campaignCustomers[0]
          })
        });

        delete newData.attributes.campaignCustomers;
        Session.highEngagementCampaignInfo = newData;
        site.sessionTools.save().then(function () {
          resolve(newData);
        });
      })["catch"](reject);
    });
  };

  var fetchHEDeliveryDoublePoints = function fetchHEDeliveryDoublePoints() {
    return new Promise(function (resolve, reject) {
      var getCustomer = jsDPZ.app.customer.getCustomer;
      var Session = getCustomer().data.Session;

      if (!eligibleForHighEngagement()) {
        Session.loyaltyTest = "ECOM-64101-Ctrl";
        Session.isEligibleForDeliveryDoublePoints = false;
        site.sessionTools.save();
        reject("Customer not eligible for this campaign.");
        return;
      }

      jsDPZ.ajax.loyaltyProgram({
        type: "GET",
        url: "DelDblPts/customers/".concat(getCustomer().data.CustomerID)
      }).then(function (_ref18) {
        var data = _ref18.data;

        if (!(data !== null && data !== void 0 && data.attributes.campaignCustomers[0])) {
          Session.loyaltyTest = "ECOM-64101-Ctrl";
          Session.isEligibleForDeliveryDoublePoints = false;
          site.sessionTools.save();
          reject("Customer is not included in this campaign.");
          return;
        }

        Session.loyaltyTest = "ECOM-64101-ExpB";
        Session.isEligibleForDeliveryDoublePoints = true;
        site.sessionTools.save();
        resolve();
      })["catch"](reject);
    });
  };

  var shouldShowHighEngagementPromotionalModal = function shouldShowHighEngagementPromotionalModal() {
    return new Promise(function (resolve) {
      if (eligibleFor50Off() || eligibleForDoublePoints()) {
        fetchHighEngagement().then(function (_ref19) {
          var attributes = _ref19.attributes;
          var _attributes$campaignC = attributes.campaignCustomer;
          _attributes$campaignC = _attributes$campaignC === void 0 ? {} : _attributes$campaignC;
          var _attributes$campaignC2 = _attributes$campaignC.shownPromotionalModal,
              shownPromotionalModal = _attributes$campaignC2 === void 0 ? false : _attributes$campaignC2;

          if (shownPromotionalModal) {
            // won't this always evaluate to false?
            resolve(false);
            return;
          }

          resolve(true);
        })["catch"](function () {
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  };

  var shouldShowHighEngagementWelcomeModal = function shouldShowHighEngagementWelcomeModal() {
    return new Promise(function (resolve) {
      if (eligibleForWelcome()) {
        fetchHighEngagement().then(function (_ref20) {
          var id = _ref20.id,
              type = _ref20.type,
              attributes = _ref20.attributes;
          var getCustomer = jsDPZ.app.customer.getCustomer;

          if (attributes.campaignCustomer.bonusActivated) {
            resolve(false);
            return;
          }

          jsDPZ.ajax.loyaltyProgram({
            data: JSON.stringify({
              data: {
                id: id,
                type: type,
                attributes: attributes
              }
            }),
            type: "PUT",
            url: "HE2021/customers/".concat(getCustomer().data.CustomerID)
          }).then(function (_ref21) {
            var data = _ref21.data;
            var Session = getCustomer().data.Session;
            Session.highEngagementCampaignInfo = data;
            site.sessionTools.save().then(function () {
              resolve(true);
            });
          })["catch"](function () {
            resolve(false);
          });
        })["catch"](function () {
          resolve(false);
        });
      } else {
        resolve(false);
      }
    });
  };

  var renderHighEngagementModal = function renderHighEngagementModal(HighEngagementModal) {
    require(["loyalty.components", "dpz.template", "marketconfig/dpz.lang.loyalty"], function (_ref22, template, loyaltyStrings) {
      var TranslateContext = _ref22.TranslateContext;
      preact.render(preact.h(TranslateContext.Provider, {
        value: template.getTranslateContextValue(_objectSpread({}, loyaltyStrings))
      }, preact.h(HighEngagementModal, null)), document.querySelector(".js-modalContainer"));
    }, function (error) {// Some pages won't have loyalty.components so this is to silently handle the error
    });
  };

  var renderHighEngagementPromotionalModal = function renderHighEngagementPromotionalModal() {
    require(["loyalty.components"], function (_ref23) {
      var HighEngagement50OffModal = _ref23.HighEngagement50OffModal,
          HighEngagementDoublePointsModal = _ref23.HighEngagementDoublePointsModal;

      var _jsDPZ$app$customer$g2 = jsDPZ.app.customer.getCustomer(),
          customerData = _jsDPZ$app$customer$g2.data;

      var Session = customerData.Session;
      var _Session$highEngageme = Session.highEngagementCampaignInfo;
      _Session$highEngageme = _Session$highEngageme === void 0 ? {} : _Session$highEngageme;
      var _Session$highEngageme2 = _Session$highEngageme.attributes;
      _Session$highEngageme2 = _Session$highEngageme2 === void 0 ? {} : _Session$highEngageme2;
      var _Session$highEngageme3 = _Session$highEngageme2.campaignCustomer,
          campaignCustomer = _Session$highEngageme3 === void 0 ? {} : _Session$highEngageme3;

      if (eligibleForDoublePoints()) {
        renderHighEngagementModal(HighEngagementDoublePointsModal);
      } else if (eligibleFor50Off()) {
        renderHighEngagementModal(HighEngagement50OffModal);
      } else {
        return;
      }

      campaignCustomer.shownPromotionalModal = true;
      site.sessionTools.save();
    });
  };

  var renderHighEngagementWelcomeModal = function renderHighEngagementWelcomeModal() {
    require(["loyalty.components"], function (_ref24) {
      var HighEngagementWelcomeModal = _ref24.HighEngagementWelcomeModal;
      renderHighEngagementModal(HighEngagementWelcomeModal);
    });
  };

  dpz.loyalty = {
    animateWidgets: animateWidgets,
    canEnroll: canEnroll,
    canRedeem: canRedeem,
    config: config,
    continueAnimation: continueAnimation,
    doStopOver: doStopOver,
    eligibleFor50Off: eligibleFor50Off,
    eligibleFor5Off: eligibleFor5Off,
    eligibleForBOGO: eligibleForBOGO,
    eligibleForDoublePoints: eligibleForDoublePoints,
    eligibleForDeliveryDoublePoints: eligibleForDeliveryDoublePoints,
    eligibleForHighEngagement: eligibleForHighEngagement,
    eligibleForWelcome: eligibleForWelcome,
    enrollCustomer: enrollCustomer,
    fetchHighEngagement: fetchHighEngagement,
    fetchHEDeliveryDoublePoints: fetchHEDeliveryDoublePoints,
    generateLoyaltyDescription: generateLoyaltyDescription,
    getActivityString: getActivityString,
    getBaseCoupon: getBaseCoupon,
    getBasePoints: getBasePoints,
    getCustomerPoints: getCustomerPoints,
    getEnrollmentBonusConfig: getEnrollmentBonusConfig,
    getHistoryPoints: getHistoryPoints,
    getNumberOfDaysBeforeShowingPointExpiration: getNumberOfDaysBeforeShowingPointExpiration,
    getPercentage: getPercentage,
    getPizzaCount: getPizzaCount,
    getPointsRange: getPointsRange,
    getRawPercentage: getRawPercentage,
    getRedemptionTemplateMarkup: getRedemptionTemplateMarkup,
    getSmallWidgetRules: getSmallWidgetRules,
    getWingsUpsell: getWingsUpsell,
    hasLoyaltyCoupon: hasLoyaltyCoupon,
    interceptWingRemoval: interceptWingRemoval,
    shouldShowHighEngagementPromotionalModal: shouldShowHighEngagementPromotionalModal,
    shouldShowHighEngagementWelcomeModal: shouldShowHighEngagementWelcomeModal,
    isEnrolled: isEnrolled,
    isLastActivityInsideWarningTime: isLastActivityInsideWarningTime,
    isReroute: isReroute,
    loyaltyIsActive: loyaltyIsActive,
    loyaltyIsOk: loyaltyIsOk,
    loyaltyRedirect: loyaltyRedirect,
    notifyLoginError: notifyLoginError,
    pizzaRedemptionAnimation: pizzaRedemptionAnimation,
    positionBarEndcap: positionBarEndcap,
    redirectToRewards: redirectToRewards,
    refreshLoyaltyStatus: refreshLoyaltyStatus,
    renderSmallWidget: renderSmallWidget,
    resetOrderEarnPoints: resetOrderEarnPoints,
    renderHighEngagementPromotionalModal: renderHighEngagementPromotionalModal,
    renderHighEngagementWelcomeModal: renderHighEngagementWelcomeModal,
    setWidgetRules: setWidgetRules,
    shouldInterceptWingRemoval: shouldInterceptWingRemoval,
    showInfographicOverlay: showInfographicOverlay,
    store: store,
    updateLoyaltyStatus: updateLoyaltyStatus,
    updateOrderPoints: updateOrderPoints,
    updateWidgets: updateWidgets
  };

  if (!site.isHomepage) {
    $(document).on("customerLogin.success", function () {
      shouldShowHighEngagementPromotionalModal().then(function (showPromotionalModal) {
        if (showPromotionalModal) {
          renderHighEngagementPromotionalModal();
        } else {
          shouldShowHighEngagementWelcomeModal().then(function (ShowHighEngagementWelcomeModal) {
            if (ShowHighEngagementWelcomeModal) {
              renderHighEngagementWelcomeModal();
            }
          });
        }
      });
    });
  }

  return dpz.loyalty;
});
//# sourceMappingURL=dpz.loyalty.js.map
