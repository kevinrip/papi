(function($) {
define("siteViews/addressChangeOverlay", ["simplr", "marketconfig/dpz.lang.customer"], function (simplr, customerStrings) {
  simplr.view.mAddViews({
    addressChangeOverlay: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("customer.address_saved", null, customerStrings),
            overlayContent: {
              component: "addressChangeOverlay",
              tokens: {}
            }
          }
        });
      },
      callback: function callback(selector, data) {
        if (site.func.getCurrentBreakpoint() !== "handheld") {
          $(".card--overlay").css("width", "600px");
        }

        site.func.setupLayerCloseEvents({
          closeSelector: ".js-closeButton",
          layerSelector: selector
        });
      }
    }
  });
});define("siteViews/address_predictions", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    address_predictions: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "typeaheadDropdown",
          tokens: {
            predictions: data.predictions && data.predictions.map(function (place) {
              return {
                description: place.description || place,
                place_id: place.place_id || place
              };
            }),
            showArrows: !!(data.predictions && data.predictions.length > 3 && !killConfig.isMarketEnabled("googleMapsAddressAutocomplete"))
          }
        });
      },
      callback: function callback(selector, data) {
        data.searchBox.off("keydown").on("keydown", function (evt) {
          var keyPressed = evt.keyCode,
              predictions = $(".js-addressPrediction", selector),
              activePrediction = predictions.filter(".active"),
              keyBindings = $.extend(true, {
            13: function _() {
              // enter
              // Stop retrieving predictions
              data.searchBox.triggerHandler("blur");
              jsDPZ.topic("place_selected").publish(activePrediction.attr("data-placeid") || data.searchBox.val());
              $(selector).empty();
            },
            27: function _() {
              // esc
              predictions.is(".active") && $(this).val($(this).attr("data-value"));
              $(selector).empty();
            },
            38: function _() {
              // up arrow
              keyBindings.toggleActive("prev");
            },
            40: function _() {
              // down arrow
              // if the last prediction is active, don't go further down the list.
              if (predictions.last().is(".active")) return; // if no predictions are active, activate the first one, and remember what the user was typing.

              if (!predictions.is(".active")) {
                $(this).attr("data-value", $(this).val());
                predictions.eq(0).toggleClass("active");
                keyBindings.populateInput();
              } else {
                keyBindings.toggleActive("next");
              }
            },
            toggleActive: function toggleActive(sibling) {
              activePrediction.toggleClass("active")[sibling]().toggleClass("active");
              keyBindings.populateInput();
            },
            populateInput: function () {
              // If there's an active prediction, populate the input with it, if not, revert the input to what the user was typing.
              $(this).val($(".js-addressPrediction.active", selector).text() || $(this).attr("data-value"));
            }.bind(this)
          }, data.keyBindings);

          if (!keyBindings.hasOwnProperty(keyPressed)) {
            return;
          }

          evt.preventDefault();
          keyBindings[keyPressed].call(this);
        });
        var scrollElement;
        data.searchBox.on("blur", function (evt) {
          var input = this;

          var thisVal = function thisVal() {
            $(input).val($(this).html());
            jsDPZ.topic("place_selected").publish($(this).attr("data-placeid"));
          };

          $(".js-addressPrediction").hover(thisVal).click(thisVal);
        });
        jsDPZ.topic("address.predictions.update").subscribe(function (predictions) {
          this.html({
            predictions: predictions
          }).then(function (markup) {
            $(selector).empty().append(markup);

            if (!killConfig.isMarketEnabled("googleMapsAddressAutocomplete") && predictions.length > 3) {
              scrollElement = site.func.eventScrollY({
                speed: 5,
                scrollContent: "ul.address-typeahead__predictions.js-addressPredictions",
                up: {
                  actionTrigger: ".up-anchor",
                  startAction: "focus",
                  stopAction: "blur"
                },
                down: {
                  actionTrigger: ".down-anchor",
                  startAction: "focus",
                  stopAction: "blur"
                }
              });
            }

            if (predictions.length === 0) $(selector).html("");
            $(".js-addressPrediction", selector).on("click", function (evt) {
              if (scrollElement && scrollElement.isScrolling()) {
                scrollElement.stopAnimation(false);
              } else {
                $(selector).empty();
                if (scrollElement) scrollElement.stopAnimation(true);
              }
            });
          });
        }.bind(this));
      }
    }
  });
});define("siteViews/fuse_predictions", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    fuse_predictions: {
      html: function html(data) {
        var predictions = data.results;
        return dpz.template.assembleLayout({
          component: "typeaheadDropdown",
          tokens: {
            predictions: predictions,
            fuseSearch: true
          }
        });
      },
      callback: function callback(selector, data) {
        if (data.customClickHandler) {
          data.customClickHandler(selector, data);
        } else {
          $(".js-addressPrediction", selector).on("click", function (evt) {
            data.fieldSelector.val($(this).text());
            $(selector).html("");
            $(".js-streetName").focus();
          });
        }
      }
    }
  });
});function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("siteViews/bubbleCodeOverlay", ["simplr", "marketconfig/dpz.lang.general", "marketconfig/dpz.lang.builders"], function (simplr, generalStrings, buildersStrings) {
  var toggleOff = function toggleOff() {
    return site.func.bubbleOverlayToggle(false);
  };

  var html = function html(data) {
    var _$$extend = $.extend({
      attentionMsg: true,
      code: "",
      label: "",
      success: false,
      customMsg: "",
      showHeader: true,
      keepCentered: false
    }, data),
        attentionMsg = _$$extend.attentionMsg,
        code = _$$extend.code,
        internalView = _$$extend.internalView,
        label = _$$extend.label,
        success = _$$extend.success,
        customMsg = _$$extend.customMsg,
        showHeader = _$$extend.showHeader,
        keepCentered = _$$extend.keepCentered;

    return dpz.template.assembleLayout({
      component: "bubbleCodeOverlay",
      tokens: {
        attentionMsg: attentionMsg,
        codeClass: success ? "informationText" : "errorText",
        internalView: internalView,
        message: customMsg || dpz.template.translateError(code, label),
        title: data.title ? dpz.template.translate(data.title, null, _objectSpread(_objectSpread({}, generalStrings), buildersStrings)) : "",
        showHeader: showHeader,
        keepCentered: keepCentered
      }
    });
  };

  var callback = function callback(selector, data) {
    // custom duration or number of words / avg words per minute * ms
    var displayTime = data.duration || $(selector).text().split(" ").length / 5 * 2000; // BEGIN CA CHANGE - double the length of time messages are shown

    data.callback && data.callback();
    displayTime > 0 && (site.data.bubbleOverlayTimeout = setTimeout(toggleOff, displayTime));
    $(".js-closeButton", selector).click(function (event) {
      event.preventDefault();
      site.data.bubbleOverlayTimeout && clearTimeout(site.data.bubbleOverlayTimeout);
      toggleOff();
    });
  };

  simplr.view.mAddViews({
    bubbleCodeOverlay: {
      html: html,
      callback: callback
    }
  });
});define("siteViews/claimRewardsOrderDetailsInfo", ["simplr", "dpz.postorderearn"], function (simplr, poe) {
  simplr.view.mAddViews({
    claimRewardsOrderDetailsInfo: {
      html: function html(data) {
        var emailEnabled = poe.isEmailEnabled();
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: "",
            // BEGIN CA - no title set, to match US
            overlayContent: {
              component: "claimRewardsOrderDetailsInfo",
              tokens: {
                isEmailEnabled: emailEnabled,
                orderReceiptClassName: emailEnabled ? "grid__cell--1/2@desktop" : "grid__cell--1/2@desktop",
                // BEGIN CA CHANGE
                orderReceiptSpacer: emailEnabled && !site.func.isHandheld() ? "" : "" // BEGIN CA CHANGE

              }
            }
          }
        });
      },
      callback: function callback(selector, data) {
        site.func.setupLayerCloseEvents({
          closeSelector: ".js-closeButton",
          layerSelector: selector
        });
        site.func.setupLayerCloseEvents({
          closeSelector: "[data-hook='close-button']",
          layerSelector: selector,
          callback: function callback() {
            window.scrollTo(0, 0);
          }
        });
      }
    }
  });
});define("siteViews/confirmOverlay", ["simplr", "marketconfig/dpz.lang.forms"], function (simplr, formsStrings) {
  simplr.view.mAddViews({
    confirmOverlay: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("forms.attention", null, formsStrings),
            overlayContent: {
              component: "confirmOverlay",
              tokens: {
                message: dpz.template.translateError(data.code)
              }
            }
          }
        });
      },
      callback: function callback(selector, data) {
        site.trigger.onEvent({
          uri: "/error/" + data.code,
          title: "Error or Alert " + data.code,
          group: "Error",
          subGroup: data.code,
          eventType: "error"
        });
        $(".js-continue", selector).click(function (e) {
          e.preventDefault();
          site.func.overlayToggle(false);

          if (data.continueFunc) {
            data.continueFunc();
          }
        });
        site.func.setupLayerCloseEvents({
          closeSelector: ".js-closeButton",
          layerSelector: selector,
          callback: function callback() {
            if (data.cancelFunc) {
              data.cancelFunc();
            }
          }
        });
      }
    }
  });
});define("siteViews/customerPasswordUpdated", ["simplr", "dpz.template", "marketconfig/dpz.lang.customer"], function (simplr, _ref, customerStrings) {
  var assembleLayout = _ref.assembleLayout,
      decodeAndSanitize = _ref.decodeAndSanitize,
      translate = _ref.translate,
      translateError = _ref.translateError;
  simplr.view.mAddViews({
    customerPasswordUpdated: {
      html: function html(data) {
        return assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: decodeAndSanitize(translate("customer.password_updated", null, customerStrings)),
            overlayContent: {
              component: "customerPasswordResetConfirmation",
              tokens: {
                message: translateError(data.code ? data.code : "eGenericPointOfServiceError"),
                confirm: translate("customer.continue_to_sign_in", null, customerStrings),
                codeClass: data.success ? "informationText" : "errorText"
              }
            }
          }
        });
      },
      callback: function callback(data) {
        $(".js-closeButton").click(function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(false);
          window.location = urlConfig.localRoot + "/index";
        });
        $(".js-confirm").click(function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(false);
          site.func.doLoginRedirectAndShowPopup(evt, {
            forceRedirect: true
          });
        });
      }
    }
  });
});
// BEGIN CA - Canada only file
define("siteViews/customerPasswordUpdatedLoggedIn", ["simplr", "marketconfig/dpz.lang.customer", "marketconfig/dpz.lang.general"], function (simplr, customerStrings, generalStrings) {
  simplr.view.mAddViews({
    customerPasswordUpdatedLoggedIn: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("customer.password_updated", null, customerStrings),
            overlayContent: {
              component: "customerPasswordResetConfirmation",
              tokens: {
                message: dpz.template.translateError(data.code ? data.code : "eGenericPointOfServiceError"),
                confirm: dpz.template.translate("general.ok", null, generalStrings),
                codeClass: data.success ? "informationText" : "errorText"
              }
            }
          }
        });
      },
      callback: function callback(data) {
        $(".js-closeButton").click(function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(false);
        });
        $(".js-confirm").click(function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(false);
        });
      }
    }
  });
});define("siteViews/deliverToMeFYIOverlay", ["simplr", "dpz.deliverToMe", "marketconfig/dpz.lang.deliverToMe"], function (simplr, deliverToMe, deliverToMeStrings) {
  simplr.view.mAddViews({
    deliverToMeFYIOverlay: {
      html: function html(options) {
        this.data = options;
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            overlayContent: {
              component: "deliverToMeFYIOverlay",
              tokens: {}
            },
            title: "".concat(dpz.template.translate("deliverToMe.fyi_title", null, deliverToMeStrings), "\n              ").concat(dpz.template.translate("deliverToMe.dominos_deliver_to_me", null, deliverToMeStrings)),
            customClass: "deliver-to-me-fyi-overlay deliver-to-me-modal deliver-to-me-fyi__title"
          }
        });
      },
      callback: function callback() {
        var _this = this;

        site.trigger.onPage({
          documentTitle: "Deliver To Me FYI Overlay",
          group: "Deliver To Me"
        });
        $(".js-continue").on("click", function (event) {
          event.preventDefault();
          deliverToMe.autoLocateDeliverToMeStore(_this.data, dpz.market.activeLanguageCode);
          site.func.overlayToggle(false, "deliverToMeFYIOverlay", {}, {});
        });
        $(".js-closeButton").on("click", function () {
          site.func.overlayToggle(false, "deliverToMeFYIOverlay", {}, {});
        });
      }
    }
  });
});define("siteViews/deliverToMeLocationAccessOverlay", ["simplr", "dpz.geolocation", "dpz.deliverToMe", "marketconfig/dpz.lang.deliverToMe"], function (simplr, geolocation, deliverToMe, deliverToMeStrings) {
  simplr.view.mAddViews({
    deliverToMeLocationAccessOverlay: {
      html: function html() {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("deliverToMe.where_are_you", null, deliverToMeStrings),
            overlayContent: {
              component: "deliverToMeLocationAccessOverlay",
              tokens: {}
            },
            customClass: "deliver-to-me-location-access deliver-to-me-modal"
          }
        });
      },
      callback: function callback(selector, data) {
        site.trigger.onPage({
          documentTitle: "Deliver To Me Location Permission Overlay",
          group: "Deliver To Me"
        });
        $(".js-closeButton", selector).click(function (e) {
          e.preventDefault();

          if (data.cancelCallback) {
            data.cancelCallback();
          }

          site.func.overlayToggle(false, "deliverToMeLocationAccessOverlay", {}, {});
        });
        $(".js-continue", selector).click(function () {
          site.func.overlayToggle(false, "deliverToMeLocationAccessOverlay", {}, {});

          if (navigator.geolocation) {
            geolocation.getUserLocation().current.then(function () {
              deliverToMe.setLocatorPermission(true);
              simplr.controller.mRouteAndExecute("/deliver-to-me/");
            }).fail(function () {
              site.func.overlayToggle(true, "deliverToMeLocationErrorOverlay", {}, {});
            });
          } else {
            //geolocation not supported.
            site.func.overlayToggle(true, "deliverToMeLocationErrorOverlay", {}, {});
          }
        });
      }
    }
  });
});define("siteViews/deliverToMeLocationErrorOverlay", ["simplr", "marketconfig/dpz.lang.deliverToMe"], function (simplr, deliverToMeStrings) {
  function buildLink(os, browser) {
    var languageCode = dpz.market.activeLanguageCode;
    var platforms = {
      android: "Android",
      ios: "iOS"
    };
    var platform = platforms[os.toLowerCase()] || "Desktop";

    switch (browser.toLowerCase()) {
      case "chrome":
        return "https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3D" + platform + "&hl=" + languageCode;

      case "firefox":
        return "https://www.mozilla.org/" + languageCode + "-US/firefox/geolocation/";

      case "safari":
        return platform === "Desktop" ? "https://support.apple.com/" + languageCode + "-us/HT204690" : "https://support.apple.com/" + languageCode + "-us/HT207092";

      case "edge":
        return "https://privacy.microsoft.com/" + languageCode + "-US/windows-10-location-and-privacy";

      case "ie":
      case "ie mobile":
        return "https://support.microsoft.com/" + languageCode + "-us/help/17479/windows-internet-explorer-11-change-security-privacy-settings";

      default:
        return "";
    }
  }

  simplr.view.mAddViews({
    deliverToMeLocationErrorOverlay: {
      html: function html(data) {
        return $.Deferred(function (markupPromise) {
          require(["external/ua-parser.min"], function (uaParser) {
            var uaData = uaParser();
            dpz.template.assembleLayout({
              component: "genericOverlay",
              tokens: {
                title:
                /* START AT-1834 */
                data.at1834inTest ? "Device Location Blocked" :
                /* END AT-1834 */
                dpz.template.translate("deliverToMe.we_cant_find_you", null, deliverToMeStrings),
                overlayContent: {
                  component: "deliverToMeLocationErrorOverlay",
                  tokens: {
                    link: buildLink(uaData.os.name || "", uaData.browser.name || ""),
                    returnToDeliveryOrCarryout: data["return"]
                  }
                },
                customClass: "deliver-to-me-location-error deliver-to-me-modal"
              }
            }).then(function (markup) {
              markupPromise.resolve(markup);
            });
          });
        });
      },
      callback: function callback(selector, data) {
        site.trigger.onPage({
          documentTitle: "Deliver To Me Location Error Overlay",
          group: "Deliver To Me"
        });
        $(".js-closeButton", selector).click(function (e) {
          e.preventDefault();
          site.func.overlayToggle(false);

          if (data["return"]) {
            simplr.controller.mRouteAndExecute("/locations/search/?type=Delivery");
          }
        });
      }
    }
  });
});define("siteViews/deliveryTrackerPromotion", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    deliveryTrackerPromotion: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: "",
            customClass: "driver-tracker-promotional-overlay",
            overlayContent: {
              component: "deliveryTrackerPromotion",
              tokens: {}
            }
          }
        });
      },
      callback: function callback(selector, data) {
        var deliveryTrackerPromotion = $(selector);
        var fadeoutTimeout;
        fadeoutTimeout = setTimeout(function () {
          deliveryTrackerPromotion.fadeOut("slow");
        }, 4000);
        deliveryTrackerPromotion.on("mouseover", function () {
          clearTimeout(fadeoutTimeout);
        });
        deliveryTrackerPromotion.on("mouseleave", function () {
          fadeoutTimeout = setTimeout(function () {
            deliveryTrackerPromotion.fadeOut("slow");
          }, 2000);
        });
        $(".js-driverTrackerPromotionalOverlayContainer").on("click", function () {
          deliveryTrackerPromotion.fadeOut();
          site.func.animateScroll("html, body", ".js-smsOptInAnchor", true);
        });
        $(".js-closeButton", selector).click(function (evt) {
          evt.preventDefault();
          deliveryTrackerPromotion.addClass("is-hidden");
        });
      }
    }
  });
});define("siteViews/glutenFreeDisclaimer", ["simplr", "marketconfig/dpz.lang.general"], function (simplr, generalStrings) {
  simplr.view.mAddViews({
    glutenFreeDisclaimer: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("general.wed_like_you_to_know", null, generalStrings),
            overlayContent: {
              component: "glutenFreeDisclaimer",
              tokens: {
                kioskIsActive: window.isKiosk
              }
            }
          }
        });
      },
      callback: function callback(selector, data) {
        $("a.js-closeButton").hide();
        $(".js-continue").on("click", function () {
          simplr.controller.mRouteAndExecute(data.url);
          site.func.overlayToggle(false);
        });
      }
    }
  });
});define("siteViews/groupOrderingInfo", ["simplr", "marketconfig/dpz.lang.groupOrdering"], function (simplr, groupOrderingStrings) {
  simplr.view.mAddViews({
    groupOrderingInfo: {
      html: function html(data) {
        site.trigger.onPage({
          analyticsTitle: "Group Ordering Overlay"
        });
        var couponThresholds = [];
        var couponTokens = [];
        var counter = 0;
        $.each(data.coupons, function (index, coupon) {
          couponThresholds.push(coupon.CouponTierThreshold);
        });

        for (var i = 0, iL = couponThresholds.length; i < iL; i++) {
          if (i + 1 < iL) {
            var current = couponThresholds[i];
            var next = parseInt(couponThresholds[i + 1]) - 1;
            couponThresholds[i] = current + "-" + next;
          } else {
            couponThresholds[i] = couponThresholds[i] + "+";
          }
        }

        $.each(data.coupons, function (index, coupon) {
          couponTokens.push({
            numberOfPizzas: couponThresholds[counter],
            percentOff: coupon.CouponTierPercentOff
          });
          counter++;
        });
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("groupOrdering.dominos_group_ordering", null, groupOrderingStrings),
            overlayContent: {
              component: "groupOrderingInfo",
              tokens: {
                showsCustomCouponInfo: dpz.config.getMarketProperty("groupOrdering").showsCustomCouponInfo,
                couponInfo: {
                  component: "couponInfo",
                  tokens: couponTokens
                }
              }
            }
          }
        });
      },
      callback: function callback(selector, data) {
        $(".card--overlay").css("width", "800px"); // Font layering

        site.func.stackAttack(selector);
        site.func.setupLayerCloseEvents({
          closeSelector: ".js-closeButton, .js-continue",
          layerSelector: selector
        });
        $(".js-overlayFooter a").on("click", function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(false);
          window.location = $(this).attr("href");
        });
      }
    }
  });
});define("siteViews/hotspotsFYIOverlay", ["simplr", "dpz.hotspots", "marketconfig/dpz.lang.hotspots"], function (simplr, hotspots, hotspotsStrings) {
  simplr.view.mAddViews({
    hotspotsFYIOverlay: {
      html: function html(options) {
        this.data = options;
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            overlayContent: {
              component: "hotspotsFYIOverlay",
              tokens: {}
            },
            title: "".concat(dpz.template.translate("hotspots.fyi_title", null, hotspotsStrings), "\n              ").concat(dpz.template.translate("hotspots.dominos_hotspots", null, hotspotsStrings)),
            customClass: "hotspots-fyi-overlay hotspots-modal hotspots-fyi__title"
          }
        });
      },
      callback: function callback(options) {
        var _this = this;

        site.trigger.onPage({
          documentTitle: "Hotspots FYI Overlay",
          group: "Hotspots"
        });
        $(".js-continue").click(function (event) {
          event.preventDefault();
          hotspots.autoLocateHotspotStore(_this.data, dpz.market.activeLanguageCode);
          site.func.overlayToggle(false, "hotspotsFYIOverlay", {}, {});
        });
        $(".js-closeButton").click(function (evt) {
          site.func.overlayToggle(false, "hotspotsFYIOverlay", {}, {});
        });
      }
    }
  });
});define("siteViews/hotspotsLocationAccessOverlay", ["simplr", "dpz.geolocation", "dpz.hotspots", "marketconfig/dpz.lang.hotspots"], function (simplr, geolocation, hotspots, hotspotsStrings) {
  simplr.view.mAddViews({
    hotspotsLocationAccessOverlay: {
      html: function html() {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("hotspots.where_are_you", null, hotspotsStrings),
            overlayContent: {
              component: "hotspotsLocationAccessOverlay",
              tokens: {}
            },
            customClass: "hotspots-location-access hotspots-modal"
          }
        });
      },
      callback: function callback(selector, data) {
        site.trigger.onPage({
          documentTitle: "Hotspots Location Permission Overlay",
          group: "Hotspots"
        });
        $(".js-closeButton", selector).click(function (e) {
          e.preventDefault();

          if (data.cancelCallback) {
            data.cancelCallback();
          }

          site.func.overlayToggle(false, "hotspotsLocationAccessOverlay", {}, {});
        });
        $(".js-continue", selector).click(function () {
          site.func.overlayToggle(false, "hotspotsLocationAccessOverlay", {}, {});

          if (navigator.geolocation) {
            geolocation.getUserLocation().current.then(function () {
              hotspots.setLocatorPermission(true);
              simplr.controller.mRouteAndExecute("/hotspots/");
            }).fail(function () {
              site.func.overlayToggle(true, "hotspotsLocationErrorOverlay", {}, {});
            });
          } else {
            //geolocation not supported.
            site.func.overlayToggle(true, "hotspotsLocationErrorOverlay", {}, {});
          }
        });
      }
    }
  });
});define("siteViews/hotspotsLocationErrorOverlay", ["simplr", "marketconfig/dpz.lang.hotspots"], function (simplr, hotspotsStrings) {
  function buildLink(os, browser) {
    var languageCode = dpz.market.activeLanguageCode;
    var platforms = {
      android: "Android",
      ios: "iOS"
    };
    var platform = platforms[os.toLowerCase()] || "Desktop";

    switch (browser.toLowerCase()) {
      case "chrome":
        return "https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3D" + platform + "&hl=" + languageCode;

      case "firefox":
        return "https://www.mozilla.org/" + languageCode + "-US/firefox/geolocation/";

      case "safari":
        return platform === "Desktop" ? "https://support.apple.com/" + languageCode + "-us/HT204690" : "https://support.apple.com/" + languageCode + "-us/HT207092";

      case "edge":
        return "https://privacy.microsoft.com/" + languageCode + "-US/windows-10-location-and-privacy";

      case "ie":
      case "ie mobile":
        return "https://support.microsoft.com/" + languageCode + "-us/help/17479/windows-internet-explorer-11-change-security-privacy-settings";

      default:
        return "";
    }
  }

  simplr.view.mAddViews({
    hotspotsLocationErrorOverlay: {
      html: function html(data) {
        return $.Deferred(function (markupPromise) {
          require(["external/ua-parser.min"], function (uaParser) {
            var uaData = uaParser();
            dpz.template.assembleLayout({
              component: "genericOverlay",
              tokens: {
                title:
                /* START AT-1834 */
                data.at1834inTest ? "Device Location Blocked" :
                /* END AT-1834 */
                dpz.template.translate("hotspots.we_cant_find_you", null, hotspotsStrings),
                overlayContent: {
                  component: "hotspotsLocationErrorOverlay",
                  tokens: {
                    link: buildLink(uaData.os.name || "", uaData.browser.name || ""),
                    returnToDeliveryOrCarryout: data["return"]
                  }
                },
                customClass: "hotspots-location-error hotspots-modal"
              }
            }).then(function (markup) {
              markupPromise.resolve(markup);
            });
          });
        });
      },
      callback: function callback(selector, data) {
        site.trigger.onPage({
          documentTitle: "Hotspots Location Error Overlay",
          group: "Hotspots"
        });
        $(".js-closeButton", selector).click(function (e) {
          e.preventDefault();
          site.func.overlayToggle(false);

          if (data["return"]) {
            simplr.controller.mRouteAndExecute("/locations/search/?type=Delivery");
          }
        });
      }
    }
  });
});define("siteViews/iFrameOverlay", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    iFrameOverlay: {
      html: function html(_ref) {
        var customClass = _ref.customClass,
            customCloseButtonClass = _ref.customCloseButtonClass;
        return dpz.template.assembleLayout({
          component: "3dSecureCheckOverlay",
          tokens: {
            customClass: customClass,
            customCloseButtonClass: customCloseButtonClass
          }
        });
      },
      callback: function callback(selector, data) {
        var loadingBar = data.loadingBar,
            html = data.html,
            src = data.src,
            canClose = data.canClose;
        var iframe = document.getElementById("iFrameOverlay");

        if (loadingBar) {
          site.func.toggleLoading(loadingBar, true);
        }

        if (!data) {
          throw new Error("No html or src URL for the iFrameOverlay!");
        }

        var handleClose = function handleClose(evt) {
          evt.preventDefault();
          var placeOrderButton = document.querySelector(".js-placeOrder");
          placeOrderButton.disabled = false;
          site.func.overlayToggle(false);
        };

        var closeButton = document.querySelector(".js-closeButton");

        if (canClose) {
          closeButton.classList.remove("is-hidden");
        }

        closeButton.addEventListener("click", handleClose); // The width of the iframe is set via css.

        $(iframe, selector).height(0.75 * $(window).height());

        if (html) {
          var iframeDoc = iframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(html);
          iframeDoc.close();
        } else if (src) {
          iframe.src = src;
        }

        site.func.setupLayerCloseEvents({
          layerSelector: selector
        });
      }
    }
  });
});define("siteViews/loyalty_checkout_activate", ["simplr", "marketconfig/dpz.lang.customer"], function (simplr, customerStrings) {
  simplr.view.mAddViews({
    loyalty_checkout_activate: {
      html: function html(data) {
        var enrollmentBonusConfig = dpz.loyalty.getEnrollmentBonusConfig();
        var loyaltyDetails = dpz.loyalty.config.defaultBase; // BEGIN CORE-5136

        var premarkup = {
          component: "checkoutLoyaltyActivate",
          tokens: {
            showBonus: enrollmentBonusConfig.show,
            bonusPoints: enrollmentBonusConfig.bonusPoints,
            bonusTotalNeeds: enrollmentBonusConfig.bonusTotalNeeds,
            earningPoints: loyaltyDetails.pointsPerOrder,
            totalNeeded: loyaltyDetails.totalNeeded,
            loyaltyReward: dpz.template.translate(loyaltyDetails.rewardString, null, customerStrings),
            rewardPoints: loyaltyDetails.rewardPoints,
            loyaltyTermsBody: {
              component: "loyaltyTermsBody",
              tokens: {}
            },
            loyaltyInfographic: {
              component: "loyaltyInfographic",
              tokens: {
                customClass: "loyalty-infographic--stopover",
                hideBanner: true
              }
            }
          }
        };
        return dpz.template.assembleLayout(premarkup); // END CORE-5136
        // CORE-5136: when test done, unpromisfy above or not...your choice.
      },
      callback: function callback(selector, data) {
        site.func.showFull();
        $(".js-activateLoyalty").on("click", function (evt) {
          evt.preventDefault();

          if (site.func.customerLoggedIn()) {
            dpz.loyalty.enrollCustomer();
          } else {
            site.func.showLoginPopup({
              successCommand: dpz.loyalty.config.commands.enroll
            });
          }
        });
        $(".legal-text-button").on("click", function (evt) {
          evt.preventDefault();
          $(".legal-dropdown").stop().slideToggle();
          site.trigger.onEvent({
            uri: "Checkout/asProfiled/LoyaltyTaCClick",
            title: "Checkout as Profiled Loyalty TaC Click",
            group: "Checkout",
            subGroup: "as Profiled Loyalty TaC Click"
          });
        });
        site.trigger.onEvent({
          group: "Checkout",
          subGroup: "as Profiled Activate Loyalty",
          title: "Checkout as Profiled Activate Loyalty",
          uri: "/Checkout/asProfiled/ActivateLoyalty"
        }); // if ( jsDPZ.app.customer.getCustomer().data.Session.LoyaltyEnrollmentError ) { //CORE-5136 : swap the if condition below after test is done

        if (jsDPZ.app.customer.getCustomer().data.Session.LoyaltyEnrollmentError && jsDPZ.app.customer.getCustomer().data.Session.loyaltyStopover && !jsDPZ.app.customer.getCustomer().data.Session.loyaltyStopover.settings.experience === "m") {
          delete jsDPZ.app.customer.getCustomer().data.Session.LoyaltyEnrollmentError;
          site.sessionTools.save();
          site.func.overlayToggle(true, "codeOverlay", {}, {
            code: "eLoyaltyProfileCreationFailed"
          });
        }

        site.func.stackAttack(selector); // Hide group ordering dashboard

        if (site.func.isGroupOrdering()) {
          $("#js-discountDashboard").hide();
        }
      }
    }
  });
});define("siteViews/loyalty_checkout_signin", ["simplr", "marketconfig/dpz.lang.customer", "marketconfig/dpz.lang.forms", "dpz.config", "dpz.customer"], function (simplr, customerStrings, formsStrings, _ref, _ref2) {
  var getMarketProperty = _ref.getMarketProperty;
  var getStatus = _ref2.getStatus,
      userStatus = _ref2.userStatus;
  simplr.view.mAddViews({
    loyalty_checkout_signin: {
      html: function html(data) {
        site.trigger.onPage({
          analyticsTitle: "Loyalty Checkout Stopover"
        });
        var promise = $.Deferred();
        var customerData = jsDPZ.app.customer.getCustomer().data;
        var enrollmentBonusConfig = dpz.loyalty.getEnrollmentBonusConfig();
        var loyaltyRewardConfig = dpz.loyalty.config.defaultBase;
        var useLegacyName = killConfig.isMarketEnabled("customerLegacyName");

        var _getMarketProperty = getMarketProperty("profile"),
            _getMarketProperty$pr = _getMarketProperty.profileFields.Confirm_Password;

        _getMarketProperty$pr = _getMarketProperty$pr === void 0 ? {} : _getMarketProperty$pr;
        var isConfirmPasswordRequired = _getMarketProperty$pr.required;
        var premarkup = {
          component: "checkoutLoyaltyStopover",
          tokens: {
            loyaltyCanEnroll: dpz.loyalty.canEnroll(),
            firstName: useLegacyName ? jsDPZ.util.htmlUnEscape(customerData.FirstName) : "",
            lastName: jsDPZ.util.htmlUnEscape(customerData.LastName),
            email: customerData.Email,
            phone: customerData.Phone,
            extension: customerData.Extension,
            showBonus: enrollmentBonusConfig.show,
            bonusPoints: enrollmentBonusConfig.bonusPoints,
            bonusTotalNeeds: enrollmentBonusConfig.bonusTotalNeeds,
            earningPoints: loyaltyRewardConfig.pointsPerOrder,
            totalNeeded: loyaltyRewardConfig.totalNeeded,
            rewardPoints: loyaltyRewardConfig.rewardPoints,
            loyaltyReward: dpz.template.translate(loyaltyRewardConfig.rewardString, null, customerStrings),
            isConfirmPasswordRequired: isConfirmPasswordRequired
          }
        };
        dpz.template.assembleLayout(premarkup).then(function (markup) {
          promise.resolve(markup);
        });
        return promise;
      },
      callback: function callback(selector, data) {
        $(".js-loginKeepLoggedIn").click(function () {
          $("input#Remember_Me").prop("checked", true);
        });
        $(".js-loginOnce").click(function () {
          $("input#Remember_Me").prop("checked", false);
        });
        var loginForm = {
          el: $("form#loyalty-stopover-signin", selector),
          inputs: {
            Email: $(".js-email", selector),
            Password: $(".js-password", selector)
          },
          settings: {
            loginView: true
          },
          init: function init() {
            this.el.focusClass().validate(this.validation);
            this.el.renderFields();

            if (!getStatus() === userStatus.REMEMBERED) {
              $(".js-semiLoggedIn", selector).remove();
            } else {
              $(".js-anonymous", selector).remove();
            }

            if (!data.paymentPage) {
              $(".js-payment", selector).remove();
            } else {
              $(".js-signout", selector).remove();
            } // Focus password if email is pre-filled


            this.inputs.Email.val() && this.inputs.Password.is(":visible") ? this.inputs.Password.focus() : this.inputs.Email.focus();
          },
          validation: {
            rules: {
              Email: {
                email: true,
                required: function required() {
                  return getStatus() === userStatus.ANONYMOUS || !loginForm.settings.loginView;
                },
                persist: true
              },
              Password: {
                required: function required() {
                  return loginForm.settings.loginView;
                }
              },
              Remember_Me: {
                showOptional: function showOptional() {
                  return loginForm.settings.loginView;
                }
              }
            },
            submitHandler: function submitHandler(form) {
              var formData = simplr.form.mGetValues(form);
              var parameters = {
                email: formData.Email,
                password: formData.Password,
                semiLoggedIn: data.semiLoggedIn,
                creditCardCheckout: data.creditCardCheckout,
                setEasyOrder: data.setEasyOrder,
                removeEasyOrder: data.removeEasyOrder,
                paymentPage: data.paymentPage,
                isLoginView: loginForm.settings.loginView
              };
              dpz.profile.login({
                parameters: parameters
              });
              site.func.overlayToggle(false);
            }
          }
        };
        loginForm.init();
        $(".js-toggleLogin", selector).on("click", function (e) {
          e.preventDefault();
          $(".js-formActions", selector).children().toggle();
          loginForm.settings.loginView = !loginForm.settings.loginView;
          loginForm.el.renderFields();
          $(".js-message", selector).toggle(loginForm.settings.loginView); // Focus password if email is pre-filled

          loginForm.inputs.Email.val() && loginForm.inputs.Password.is(":visible") ? loginForm.inputs.Password.focus() : loginForm.inputs.Email.focus();
        }); // LOYALTY-TODO: NEED TO UPDATE THESE TO BE LOYALTY
        // $(".js-loginSubmit", selector).on("click", function(){
        //     site.trigger.onEvent({
        //         group : "Account",
        //         subGroup : "Sign In Submit",
        //         title : "Account - Sign In Submit",
        //         uri : "/account/signinsubmit"
        //     });
        // });
        // $(".js-resetPassword", selector).on("click", function(){
        //     site.trigger.onEvent({
        //         group : "Account",
        //         subGroup : "Reset Password",
        //         title : "Account - Reset Password",
        //         uri : "/account/resetpassword"
        //     });
        // });
        // $(".js-createProfile", selector).on("click", function(){
        //     site.trigger.onEvent({
        //         group : "Account",
        //         subGroup : "Create Profile",
        //         title : "Account - Create Profile",
        //         uri : "/account/createprofile"
        //     });
        // });

        $(".js-signout", selector).on("click", function () {
          simplr.controller.mRouteAndExecute("/customer/logout/");
        });
        $(".js-payment", selector).on("click", function () {
          simplr.controller.mRouteAndExecute("/customer/guest-checkout/");
        });
        $(".js-rememberMeLegal").on("click", function (evt) {
          evt.preventDefault();
          $(".js-rememberMeLegalText").toggle();
          site.trigger.onEvent({
            group: "Checkout",
            subGroup: "as Profiled Keep Me Signedin ShowInfo",
            title: "Checkout as Profiled Keep Me Signedin ShowInfo",
            uri: "/Checkout/asProfiled/KeepMeSignedIn/ShowInfo"
          });
        });
        $(".js-rememberMe").on("click", function () {
          var state = $(".js-rememberMe").is(":checked") ? "Check" : "UnCheck";
          site.trigger.onEvent({
            group: "Checkout",
            subGroup: "as Profiled Keep Me Signedin " + state,
            title: "Checkout as Profiled Keep Me Signedin " + state,
            uri: "/Checkout/asProfiled/KeepMeSignedIn/" + state
          });
        }); // Close Button

        site.func.setupLayerCloseEvents({
          closeSelector: ".js-closeButton",
          layerSelector: selector,
          callback: function callback(el) {
            if (data.paymentPage) {
              if ($("input[name='Payment_Type'][value='Credit']").is(":checked") && $(".js-creditCardSelection").val() >= 0) {
                $("input[name='Credit_Card_Selection'][value='-1']").click();
              }

              if ($("#Easy_Order_Selection").is(":checked")) {
                $("#Easy_Order_Selection").prop("checked", false);
                $(".js-easyOrderLabel, #Easy_Order_Name").hide();
                $("#Easy_Order_Name").val("");
              }
            }
          }
        }); // ============================== ORDER AS GUEST =================================== //

        var useLegacyName = killConfig.isMarketEnabled("customerLegacyName");

        var _getMarketProperty2 = getMarketProperty("profile"),
            _getMarketProperty2$p = _getMarketProperty2.profileFields;

        _getMarketProperty2$p = _getMarketProperty2$p === void 0 ? {} : _getMarketProperty2$p;
        var _getMarketProperty2$p2 = _getMarketProperty2$p.Confirm_Email;
        _getMarketProperty2$p2 = _getMarketProperty2$p2 === void 0 ? {} : _getMarketProperty2$p2;
        var isConfirmEmailRequired = _getMarketProperty2$p2.required,
            _getMarketProperty2$p3 = _getMarketProperty2$p.Confirm_Password;
        _getMarketProperty2$p3 = _getMarketProperty2$p3 === void 0 ? {} : _getMarketProperty2$p3;
        var isConfirmPasswordRequired = _getMarketProperty2$p3.required;
        var createProfileForm = {
          el: $("form#loyalty-order-as-guest", selector),
          init: function init() {
            // Set the input masks
            if (killConfig.isMarketEnabled("masksEnabled")) {
              var masks = dpz.config.getMarketProperty("mask");
              $(".js-phone", selector).mask(masks.phone.mask, masks.phone.properties).val(masks.phone.properties.defaultVal || null);

              if (killConfig.isMarketEnabled("phoneExtension")) {
                $(".js-extension", selector).mask(masks.extension.mask, masks.extension.properties);
              }
            }

            $(".js-emailOptIn", selector).on("click", function () {
              if ($(this).is(":checked")) {
                site.trigger.onEvent({
                  group: "Checkout",
                  subGroup: "as Guest Email Optin Check",
                  title: "Checkout as Guest Email Optin Check",
                  uri: "/Checkout/asGuest/EmailOptinCheck"
                });
              } else {
                site.trigger.onEvent({
                  group: "Checkout",
                  subGroup: "as Guest Email Optin Uncheck",
                  title: "Checkout as Guest Email Optin Uncheck",
                  uri: "/Checkout/asGuest/EmailOptinUncheck"
                });
              }
            }).prop("checked", false); // BEGIN CA - change to false
            // Setup the Content Popups

            site.func.setupContentPopups(selector);
            site.func.setupTemplatePopups(selector);
            this.el.focusClass().validate(this.validation);
            this.el.renderFields();
          },
          validation: {
            rules: {
              First_Name: {
                required: useLegacyName
              },
              Last_Name: {
                required: true
              },
              Email: {
                required: true,
                email: true
              },
              Confirm_Email: {
                required: isConfirmEmailRequired,
                equalToCI: function equalToCI() {
                  return $(".js-guest-email", selector).val();
                }
              },
              Phone: {
                required: true,
                phone: true
              },
              Extension: {
                showOptional: true
              },
              Create_Password: {
                required: true,
                minlength: 8
              },
              Confirm_Password: {
                required: isConfirmPasswordRequired,
                equalTo: "#Create_Password"
              },
              EmailOptIn: {
                showOptional: function showOptional() {
                  // BEGIN CA
                  var opt = dpz.market.marketName === "UNITED_STATES" || dpz.market.marketName === "CANADA"; // END CA

                  return opt;
                }
              },
              Agree_To_Terms_Of_Use: {
                required: true
              }
            },
            submitHandler: function submitHandler(form) {
              var urlWithParams,
                  parameters,
                  formData = simplr.form.mGetValues(form),
                  isLoyaltyEnrollment = dpz.loyalty.canEnroll() && $(".js-loyaltyOptIn").is(":checked"),
                  baseURL = "".concat(urlConfig.localRoot, "/pages/order/payment");
              parameters = {
                FirstName: useLegacyName ? formData.First_Name : "",
                LastName: formData.Last_Name,
                Email: formData.Email,
                Phone: formData.Phone.replace(/[^0-9]/g, ""),
                Extension: killConfig.isMarketEnabled("phoneExtension") ? formData.Extension.replace(/[^0-9]/g, "") : "",
                Password: formData.Create_Password,
                EmailOptIn: formData.EmailOptIn,
                AgreeToTermsOfUse: formData.Agree_To_Terms_Of_Use,
                Age13OrOlder: formData.Agree_To_Terms_Of_Use
              };

              if (isLoyaltyEnrollment) {
                // Set flag to create new loyalty profile
                parameters.LoyaltyEnrollment = true;
                dpz.profile.createProfile({
                  parameters: parameters
                });
              } else {
                // Update the customer's session information
                $.extend(jsDPZ.app.customer.getCustomer().data, parameters); // Update the order's customer information

                $.extend(true, jsDPZ.app.order.getOrder().data.Customer, {
                  FirstName: useLegacyName ? parameters.FirstName : "",
                  LastName: parameters.LastName,
                  Email: parameters.Email,
                  Phone: parameters.Phone,
                  Extension: parameters.Extension
                });
                site.sessionTools.save().then(function () {
                  window.location = baseURL;
                });
              }
            }
          }
        };
        createProfileForm.init();
        site.func.showFull();

        var updateTogglerButtons = function updateTogglerButtons() {
          // Remove general background color
          if ($(".grid--loyalty-stopover--action--none-selected").length > 0) {
            $(".grid--loyalty-stopover--action--none-selected").removeClass("grid--loyalty-stopover--action--none-selected");
          } // Transforn buttons into links


          if ($(".js-signIn.js-viewToggle").hasClass("btn")) {
            $(".js-signIn.js-viewToggle").removeClass("btn").removeClass("checkout-selection--button").addClass("loyalty-stopover--action");
          }

          if ($(".js-orderAsGuest.js-viewToggle").hasClass("btn")) {
            $(".js-orderAsGuest.js-viewToggle").removeClass("btn").removeClass("checkout-selection--button").addClass("loyalty-stopover--action");
          }
        };

        $(".js-loyaltyOptInContainer").show();
        $(".js-signIn.js-viewToggle").on("click", function (evt) {
          evt.preventDefault();
          site.trigger.onEvent({
            group: "Checkout",
            subGroup: "Profiled Select",
            title: "Checkout as Profiled Select",
            uri: "/Checkout/asProfiled/Select"
          });
          updateTogglerButtons();
          $(".js-viewToggle").removeClass("btn").removeClass("checkout-selection--button").addClass("loyalty-stopover--action");
          $(".js-signIn.js-viewToggle").hide();
          $(".grid__cell--loyalty-stopover--checkout-selection--first").removeClass("grid__cell--loyalty-stopover--checkout-selection--first");
          $(".js-orderAsGuest-action-container").removeClass("grid__cell--loyalty-stopover--selected-action");
          $(".js-signIn-action-container").addClass("grid__cell--loyalty-stopover--selected-action");
          $(".js-orderAsGuest.js-viewToggle").show();
          $(".js-orderAsGuest.js-toggledContent").is(":visible") ? $(".js-toggledContent").toggle() : $(".js-signIn.js-toggledContent").slideDown("fast");
          $(".js-signIn #Email").focus();
        });
        $(".js-orderAsGuest.js-viewToggle").on("click", function (evt) {
          evt.preventDefault();
          site.trigger.onEvent({
            group: "Checkout",
            subGroup: "Guest Select",
            title: "Checkout Guest Select",
            uri: "/Checkout/Guest/Select"
          });
          updateTogglerButtons();
          $(".grid__cell--loyalty-stopover--checkout-selection--first").removeClass("grid__cell--loyalty-stopover--checkout-selection--first");
          $(".js-signIn-action-container").removeClass("grid__cell--loyalty-stopover--selected-action");
          $(".js-orderAsGuest-action-container").addClass("grid__cell--loyalty-stopover--selected-action");
          $(".js-orderAsGuest.js-viewToggle").hide();
          $(".js-signIn.js-viewToggle").show();
          $(".js-signIn.js-toggledContent").is(":visible") ? $(".js-toggledContent").toggle() : $(".js-orderAsGuest.js-toggledContent").slideDown("fast");
          $(".js-orderAsGuest #First_Name").focus();
          $(selector).on("focus", ".js-phone", function () {
            if ($(".js-arrow-box").css("display") === "none" && !$(".js-loyaltyOptIn").prop("checked")) {
              if (site.func.isHandheld()) {
                $(".js-arrow-box").slideDown("slow");
              } else {
                $(".js-arrow-box").toggle("slide");
              }
            }
          });
        });

        if (dpz.loyalty.canEnroll()) {
          $(".js-loyaltyOptIn").on("change", function () {
            $(".js-loyaltyProfileCreationFields").stop().slideToggle("fast");

            if ($(".js-loyaltyOptIn").prop("checked")) {
              if (dpz.loyalty.config.enrollmentBonusConfig.show) {
                $(".js-arrow-box").hide();
              } else {
                $(".js-arrow-box").show();
              }

              $(".js-orderAsGuest .btn").text(dpz.template.translate("forms.enroll_and_continue", null, formsStrings));
              site.trigger.onEvent({
                group: "Checkout",
                subGroup: "as Guest Loyalty Enroll Check",
                title: "Checkout as Guest Loyalty Enroll Check",
                uri: "/Checkout/asGuest/LoyaltyEnrollCheck"
              });
            } else {
              if (dpz.loyalty.config.enrollmentBonusConfig.show) {
                $(".js-arrow-box").show();
              }

              $(".js-orderAsGuest .btn").text(dpz.template.translate("forms.continue", null, formsStrings));
              site.trigger.onEvent({
                group: "Checkout",
                subGroup: "as Guest Loyalty Enroll UnCheck",
                title: "Checkout as Guest Loyalty Enroll UnCheck",
                uri: "/Checkout/asGuest/LoyaltyEnrollUnCheck"
              });
            }

            $(".js-termsOfUse").toggle();
          });
          $(".js-showLoyaltyInfo").on("click", function (evt) {
            evt.preventDefault();
            dpz.loyalty.showInfographicOverlay();
          });
        } // By default we show the order as a guest fields if the user has already filled his customer information


        var customerData = jsDPZ.app.customer.getCustomer().data;
        var orderData = jsDPZ.app.order.getOrder().data;

        if (customerData.FirstName !== "" && customerData.Email !== "") {
          // Update the email opt in selector before showing the customer information
          updateTogglerButtons();
          $(".js-emailOptIn", selector).prop("checked", orderData.Customer.EmailOptIn ? orderData.Customer.EmailOptIn : customerData.EmailOptIn);
          $(".grid__cell--loyalty-stopover--checkout-selection--first").removeClass("grid__cell--loyalty-stopover--checkout-selection--first");
          $(".js-signIn-action-container").removeClass("grid__cell--loyalty-stopover--selected-action");
          $(".js-orderAsGuest-action-container").addClass("grid__cell--loyalty-stopover--selected-action");
          $(".js-orderAsGuest.js-viewToggle").hide();
          $(".js-signIn.js-toggledContent").hide();
          $(".js-signIn.js-viewToggle").show();
          $(".js-orderAsGuest.js-toggledContent").slideDown("fast");

          if (dpz.loyalty.canEnroll()) {
            setTimeout(function () {
              if ($(".js-arrow-box").css("display") === "none" && !$(".js-loyaltyOptIn").prop("checked")) {
                if (site.func.isHandheld()) {
                  $(".js-arrow-box").slideDown("slow");
                } else {
                  $(".js-arrow-box").toggle("slide");
                }
              }
            }, 1000);
          }
        }

        $(".js-loyaltyTerms").on("click", function () {
          site.trigger.onEvent({
            uri: "Checkout/asGuest/LoyaltyTaCClick",
            title: "Checkout as Guest Loyalty TaC Click",
            group: "Checkout",
            subGroup: "as Guest Loyalty TaC Click"
          });
        });
        site.trigger.onEvent({
          uri: "/Checkout/asProfiledGuest",
          title: "Checkout as Profiled or Guest",
          group: "Checkout",
          subGroup: "as Profiled or Guest"
        });

        if (site.func.isGroupOrdering()) {
          $("#js-discountDashboard").hide();
        }
      }
    }
  });
});define("siteViews/loyalty_details_overlay", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    loyalty_details_overlay: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            customClass: "card--overlay--loyalty-details",
            overlayContent: {
              component: "loyaltyDetailsOverlay",
              tokens: {}
            }
          }
        });
      },
      callback: function callback(selector, data) {
        site.func.setupLayerCloseEvents({
          closeSelector: ".js-closeButton",
          layerSelector: selector
        });
      }
    }
  });
});function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("siteViews/loyalty_enrollment_details", ["simplr", "dpz.customer", "dpz.oauth.constants"], function (simplr, _ref, _ref2) {
  var getStatus = _ref.getStatus,
      isProfiled = _ref.isProfiled,
      userStatus = _ref.userStatus;
  var oauthScopes = _ref2.oauthScopes;
  simplr.view.mAddViews({
    loyalty_enrollment_details: {
      html: function html(viewData) {
        var promise = $.Deferred();
        var options = {};
        options.url = urlConfig.api + "/stock-ticker-service/stockticker";

        var renderDetails = function renderDetails(data) {
          var hasProfile = isProfiled();
          var loyaltyEnrollmentDetailsTokens = {
            hasProfile: hasProfile,
            showLoyaltyFail: !dpz.loyalty.loyaltyIsOk() && hasProfile,
            loyaltyProgramDetails: {
              component: "loyaltyProgramDetails",
              tokens: {
                isEnrolled: false,
                faqs: {
                  component: "loyaltyFaq",
                  tokens: {
                    customClass: "card__body--loyalty-details"
                  }
                },
                showPOE: killConfig.isMarketEnabled("loyaltyPostOrderEarn") && killConfig.isMarketEnabled("loyaltyPostOrderEarnProgramDetails")
              }
            },
            loyaltyInfographic: {
              component: "loyaltyInfographic",
              tokens: {
                customClass: "",
                hideBanner: true
              }
            }
          };

          if (killConfig.isMarketEnabled("enrollmentSourceTag")) {
            var _ref3 = dpz.util.getQueryParameters() || {},
                queryParamsSourceTag = _ref3.EnrollmentSourceTag;

            loyaltyEnrollmentDetailsTokens.enrollmentSourceTag = viewData.EnrollmentSourceTag || queryParamsSourceTag || "DEFAULT";
          }

          dpz.template.assembleLayout({
            component: "loyaltyEnrollmentDetails",
            tokens: loyaltyEnrollmentDetailsTokens
          }).then(function (markup) {
            promise.resolve(markup);
          });
        };

        options.error = renderDetails;
        options.success = renderDetails;
        jsDPZ.ajax.request(options);
        return promise;
      },
      callback: function callback(selector, data) {
        (function tick() {
          $(".loyalty-ticker__ticker").css("right", "-1300px");
          $(".loyalty-ticker__ticker").animate({
            right: "600px"
          }, 16000, "linear", tick);
        })();

        var hasProfile = isProfiled();

        var showLogin = function showLogin(data) {
          var options = $.extend({
            evt: undefined,
            trigger: {
              title: "Account - Loyalty Details Sign In",
              uri: "/locations/account/signin"
            },
            overlay: undefined
          }, data);
          site.func.showLoginPopup(options);
        };

        $(".js-loyaltyFaqLink").on("click", function (e) {
          e.preventDefault();
          var linkhref = $(this).attr("href");
          site.trigger.onEvent({
            group: "Profile Hub",
            subGroup: "Piece of the Pie Details FAQ Link Click",
            title: "Piece of the Pie FAQ link",
            uri: "/customer/rewards/"
          });
          window.location = linkhref;
        });
        $(".js-login-rewards", selector).on("click", function (e) {
          e.preventDefault();
          e.preventDefault();
          var data = {
            evt: e
          };
          site.func.showLoginPopup(data);
        });
        site.func.setupTemplatePopups(selector);
        $(".js-login--enroll").on("click", function (evt) {
          evt.preventDefault();

          var _ref4 = dpz.util.getQueryParameters() || {},
              _ref4$EnrollmentSourc = _ref4.EnrollmentSourceTag,
              EnrollmentSourceTag = _ref4$EnrollmentSourc === void 0 ? "SIGN_IN_TO_ENROLL" : _ref4$EnrollmentSourc;

          if (EnrollmentSourceTag === "NationalEmail") EnrollmentSourceTag = "NationalEmail_Activate"; // Temporary code to redirect users to order if signing in and does a auto enroll into loyalty

          site.func.showLoginPopup({
            successCommand: dpz.loyalty.config.commands.enroll,
            EnrollmentSourceTag: EnrollmentSourceTag
          });
        });

        if (hasProfile) {
          if (dpz.loyalty.loyaltyIsOk()) {
            $(selector).on("click", ".js-loyaltyEnroll", function (evt) {
              evt.preventDefault();

              if (getStatus() === userStatus.REMEMBERED && !dpz.oauth.isAuthorized([oauthScopes.UPDATE_PROFILE])()) {
                site.func.showLoginPopup({
                  successCommand: dpz.loyalty.config.commands.enroll
                });
              } else {
                var success = function success() {
                  window.location.hash = "#!/customer/profile/";
                };

                var error = function error() {
                  site.func.overlayToggle(true, "codeOverlay", {}, {
                    code: "eLoyaltyLoginFailed"
                  });
                };

                dpz.loyalty.enrollCustomer(_objectSpread({
                  successCallback: success,
                  errorCallback: error
                }, killConfig.isMarketEnabled("enrollmentSourceTag") && {
                  EnrollmentSourceTag: "Profiled_Activate"
                }));
              }
            }); // We subscribe only for a not ok change or it will cycle

            jsDPZ.topic("loyalty.status.changed").subscribe(function () {
              if (!dpz.loyalty.loyaltyIsOk()) {
                // Rerender itself if loyalty is not ok
                simplr.controller.mRouteAndExecute("#!/customer/rewards/");
              }
            });
          } else {
            simplr.view.mRender({
              name: "profile_hub_non_enrolled_loyalty_card_view",
              data: {},
              selector: ".js-hubLoyaltyNonEnrolledContainer"
            });
            $(".js-hubLoyaltyNonEnrolledContainer").show(); // We subscribe only for a not ok change or it will cycle

            jsDPZ.topic("loyalty.status.changed").subscribe(function () {
              if (dpz.loyalty.loyaltyIsOk()) {
                // Rerender itself if loyalty is not ok
                simplr.controller.mRouteAndExecute("#!/customer/rewards/");
              }
            });
          }
        }

        if (jsDPZ.app.customer.getCustomer().data.Session.ShowLogin) {
          if (!hasProfile) {
            jsDPZ.app.customer.getCustomer().data.Session.ShowRewards = true;
            showLogin({
              overlay: "loyaltyRedeemLoginOverlay"
            });
          }

          delete jsDPZ.app.customer.getCustomer().data.Session.ShowLogin;
          site.sessionTools.save();
        }

        site.func.stackAttack(selector);
        $(".js-loyaltyTermsBody").on("click", function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(true, "loyaltyTermsBody");
        });
        $(".js-openSweepstakesTermsAndConditions", selector).on("click", function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(true, "hotspotsSweepstakesTermsBody");
        });
      }
    }
  });
});define("siteViews/loyalty_rewards_details", ["simplr", "dpz.customer", "marketconfig/dpz.lang.customer"], function (simplr, _ref, customerStrings) {
  var isProfiled = _ref.isProfiled;
  simplr.view.mAddViews({
    loyalty_rewards_details: {
      html: function html() {
        return dpz.template.assembleLayout({
          component: "loyaltyRewardsDetails",
          tokens: {
            dashboard: {
              component: "loyaltyDashboard",
              tokens: {}
            },
            loyaltyProgramDetails: {
              component: "loyaltyProgramDetails",
              tokens: {
                isEnrolled: true,
                faqs: {
                  component: "loyaltyFaq",
                  tokens: {
                    customClass: "card__body--loyalty-details"
                  }
                },
                showPOE: killConfig.isMarketEnabled("loyaltyPostOrderEarn") && killConfig.isMarketEnabled("loyaltyPostOrderEarnProgramDetails")
              }
            }
          }
        });
      },
      callback: function callback(selector, data) {
        var $toggleLoyaltyHistoryBtn = $(".js-toggleLoyaltyHistory");
        var loyaltyHistoryVisible = false;
        simplr.view.mRender({
          name: "loyalty_card_condensed",
          data: {
            wrapperClass: "loyalty-container--full-width",
            hideHistoryLink: true
          },
          selector: ".js-loyaltyWidget"
        });
        $(".js-loyaltyFaqLink").on("click", function (e) {
          e.preventDefault();
          var linkhref = $(this).attr("href");
          site.trigger.onEvent({
            group: "Profile Hub",
            subGroup: "Piece of the Pie Details FAQ Link Click",
            title: "Piece of the Pie FAQ link",
            uri: window.location.hash
          });
          window.location = linkhref;
        });
        /** BEGIN CA - redirect to the term page instead of rendering the popup
        $(".js-loyaltyTermsBody").on("click", function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(true, "loyaltyTermsBody");
        });
        END CA */

        site.func.setupTemplatePopups(selector);
        $(".loyalty-rewards-details--opt-out a").on("click", function (evt) {
          evt.preventDefault();

          if (site.func.customerLoggedIn()) {
            simplr.controller.mRouteAndExecute("/loyalty/opt-out/");
          } else {
            site.func.showLoginPopup({
              successCommand: dpz.loyalty.config.commands.optOut
            });
          }
        }); // Fetch History

        jsDPZ.app.customer.getCustomer().data.Session.Loyalty = $.extend({}, jsDPZ.app.customer.getCustomer().data.Session.Loyalty, {
          pageIndex: 0
        });
        site.sessionTools.save();

        function toggleLoyaltyHistory() {
          loyaltyHistoryVisible = !loyaltyHistoryVisible;
          $(".js-loyalty-history-container.has-history").stop().slideToggle();

          if (loyaltyHistoryVisible) {
            $toggleLoyaltyHistoryBtn.text(dpz.template.translate("customer.loyalty_history_close_details", null, customerStrings) + " ▼");
            site.trigger.onEvent({
              group: "Loyalty",
              subGroup: "Details",
              title: "Loyalty Details",
              uri: "/Loyalty/Details"
            });
          } else {
            $toggleLoyaltyHistoryBtn.text(dpz.template.translate("customer.loyalty_history_see_details", null, customerStrings) + " ►");
          }
        }

        $toggleLoyaltyHistoryBtn.on("click", function (evt) {
          toggleLoyaltyHistory();
        });
        $toggleLoyaltyHistoryBtn.one("click", function (evt) {
          $toggleLoyaltyHistoryBtn.hide();
          simplr.controller.mRouteAndExecute(site.func.buildURL({
            url: "#!/loyalty/history/",
            parameters: {
              selector: "#js-customerPage"
            }
          }));
        });

        if (data.viewHistory) {
          $toggleLoyaltyHistoryBtn.trigger("click");
        }

        $(document).on("click", ".js-pointsLearnMore", function (evt) {
          evt.preventDefault();

          if (!loyaltyHistoryVisible) {
            toggleLoyaltyHistory();
          }
        });
        site.trigger.onEvent({
          group: "Account",
          subGroup: "Details Piece of the Pie Rewards",
          title: "Account Details Piece of the Pie Rewards",
          uri: "/account/details/PieceOfThePieRewards"
        });
        jsDPZ.topic("loyalty.status.changed").subscribe(function () {
          if (!dpz.loyalty.loyaltyIsOk()) {
            simplr.controller.mRouteAndExecute("#!/customer/rewards/");
          }
        });
        $(".js-openSweepstakesTermsAndConditions", selector).on("click", function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(true, "hotspotsSweepstakesTermsBody");
        });
      }
    }
  });
});define("siteViews/loyalty_small_widget", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    loyalty_small_widget: {
      html: function html(_ref) {
        var isAllEntrees = _ref.isAllEntrees;

        var _dpz$loyalty$getSmall = dpz.loyalty.getSmallWidgetRules({
          isAllEntrees: isAllEntrees
        }),
            _dpz$loyalty$getSmall2 = _dpz$loyalty$getSmall.display,
            clickableBalance = _dpz$loyalty$getSmall2.balance,
            clickablePizzaCounter = _dpz$loyalty$getSmall2.pizzaCounter,
            clickablePoints = _dpz$loyalty$getSmall2.points,
            clickableAlerts = _dpz$loyalty$getSmall.data.alerts.showWarning;

        return dpz.template.assembleLayout({
          component: "loyaltySmallWidget",
          tokens: {
            isHandheld: (site.isHomepage || isAllEntrees) && site.func.isHandheld(),
            isHomepage: site.isHomepage,
            clickableBalance: clickableBalance(),
            clickablePizzaCounter: clickablePizzaCounter(),
            clickablePoints: clickablePoints(),
            clickableAlerts: clickableAlerts
          }
        });
      },
      callback: function callback(selector, _ref2) {
        var isAllEntrees = _ref2.isAllEntrees;

        if (dpz.loyalty.loyaltyIsActive() && dpz.loyalty.isEnrolled()) {
          $(selector).removeClass("is-hidden");
          dpz.loyalty.updateWidgets(dpz.loyalty.getSmallWidgetRules({
            isAllEntrees: isAllEntrees
          }));
        }
      }
    }
  });
});define("siteViews/pizzaCalculatorHelp", ["simplr", "marketconfig/dpz.lang.groupOrdering"], function (simplr, groupOrderingStrings) {
  simplr.view.mAddViews({
    pizzaCalculatorHelp: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            title: dpz.template.translate("groupOrdering.pizza_math_calculator", null, groupOrderingStrings),
            overlayContent: {
              component: "pizzaCalculatorHelp",
              tokens: {}
            }
          }
        });
      },
      callback: function callback(selector, data) {
        site.func.setupLayerCloseEvents({
          closeSelector: ".js-closeButton, .js-continue",
          layerSelector: selector
        });
      }
    }
  });
});define("siteViews/holdOutsRemovalWarning", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    holdOutsRemovalWarning: {
      html: function html() {
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            overlayContent: {
              component: "holdOutsRemovalWarning",
              tokens: {}
            }
          }
        });
      },
      callback: function callback() {
        $(".js-continue, .js-closeButton").on("click", function (evt) {
          evt.preventDefault();
          site.func.overlayToggle(false);
        });
        dpz.utag.fire.link(undefined, {
          event_name: "TwistHoldEmailError",
          event_action: "Error",
          event_category: "Error",
          event_label: "ErrorCode"
        });
      }
    }
  });
});define("siteViews/visualPizzaBubbleOverlay", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    visualPizzaBubbleOverlay: {
      html: function html(data) {
        var overlayData = $.extend({
          feeds: "",
          size: ""
        }, data);
        var altFeedsText = null;

        if (!/\d/.test(data.feeds)) {
          altFeedsText = overlayData.feeds;
        }

        return dpz.template.assembleLayout({
          component: "visualPizzaOverlay",
          tokens: {
            feeds: overlayData.feeds,
            size: overlayData.size,
            altFeedsText: altFeedsText
          }
        });
      },
      callback: function callback(selector, data) {
        // number of words / avg words per minute * ms
        var displayTime = $(selector).text().split(" ").length / 2 * 1000;
        clearTimeout(site.data.visualPizzaBubbleOverlay);
        site.data.visualPizzaBubbleOverlay = setTimeout(function () {
          site.func.visualPizzaBubbleOverlayToggle(false);
        }, displayTime);
      }
    }
  });
});define("siteViews/x", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    x: ""
  });
});define("siteViews/driverCallbackInlineMessage", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    driver_callback_inline_message: {
      html: function html() {
        return dpz.template.assembleLayout({
          component: "driverCallbackInlineMessage",
          tokens: {}
        });
      },
      callback: function callback(selector) {
        document.querySelector(selector).classList.remove("is-hidden");
        dpz.utag.fire.link(null, {
          event_name: "Customer callback message"
        });
      }
    }
  });
});define("siteViews", ["siteViews/addressChangeOverlay", "siteViews/address_predictions", "siteViews/fuse_predictions", "siteViews/bubbleCodeOverlay", "siteViews/claimRewardsOrderDetailsInfo", "siteViews/confirmOverlay", "siteViews/customerPasswordUpdated",
/* BEGIN CA - custom handle password reset from profile */
"siteViews/customerPasswordUpdatedLoggedIn", "siteViews/deliverToMeFYIOverlay", "siteViews/deliverToMeLocationAccessOverlay", "siteViews/deliverToMeLocationErrorOverlay", "siteViews/deliveryTrackerPromotion", "siteViews/glutenFreeDisclaimer", "siteViews/groupOrderingInfo", "siteViews/hotspotsFYIOverlay", "siteViews/hotspotsLocationAccessOverlay", "siteViews/hotspotsLocationErrorOverlay", "siteViews/iFrameOverlay", "siteViews/loyalty_checkout_activate", "siteViews/loyalty_checkout_signin", "siteViews/loyalty_details_overlay", "siteViews/loyalty_enrollment_details", "siteViews/loyalty_rewards_details", "siteViews/loyalty_small_widget", "siteViews/pizzaCalculatorHelp", "siteViews/holdOutsRemovalWarning", "siteViews/visualPizzaBubbleOverlay", "siteViews/driverCallbackInlineMessage"], function () {});})(jQuery);

//# sourceMappingURL=site.js.map
