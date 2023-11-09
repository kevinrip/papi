(function($) {
define("homeSiteViews/BogoWeekPopup", ["simplr"], function (simplr) {
  simplr.view.mAddViews({
    BogoWeekPopup: {
      html: function html(data) {
        return $.Deferred(function (promise) {
          var isEnglishUSMarket = dpz.market.activeLanguageCode === "en" && dpz.market.marketCode === "US";
          var customClass = "bogo-week-popup__container pizza-box";
          data.popUpSelector = "BogoWeekPopup";
          var layoutConfig = {
            component: "genericOverlay",
            tokens: {
              overlayContent: {
                component: data.popUpSelector,
                tokens: {
                  dateRange: site.func.homepageWeekPopupConfig.friendlyDate()
                }
              },
              customClass: customClass
            }
          };

          if (isEnglishUSMarket) {
            customClass += " english-us-market pizza-box";
          }

          dpz.template.assembleLayout(layoutConfig).then(function (markup) {
            promise.resolve(markup);
          });
        });
      },
      callback: function callback(selector, data) {
        site.func.stackAttack("#".concat(data.popUpSelector));
        $(".js-orderNow", "#".concat(data.popUpSelector)).click(function (e) {
          e.preventDefault();
          window.location.href = "".concat(urlConfig.root, "/pages/order/?couponCode_0=9206&partnerCode=DOMINOS&so=hp&ordtype=Carryout");
        });
        $(".js-closeButton, .js-noThanks", "#".concat(data.popUpSelector)).click(function (e) {
          e.preventDefault();
          site.func.overlayToggle(false, data.popUpSelector, {}, {});
          $("#BogoWeekPopup").fadeOut();

          if (!(site.func.customerLoggedIn() || site.func.customerSemiLoggedIn() || site.func.isHandheld())) {
            site.func.signInPopup();
          }
        });
      }
    }
  });
});define("homeSiteViews/CosWeekPopup", ["simplr", "dpz.customer"], function (simplr, _ref) {
  var isProfiled = _ref.isProfiled;
  simplr.view.mAddViews({
    CosWeekPopup: {
      html: function html(data) {
        data.popUpSelector = "CosWeekPopup";
        return dpz.template.assembleLayout({
          component: "genericOverlay",
          tokens: {
            overlayContent: {
              component: data.popUpSelector,
              tokens: {
                dateRange: site.func.homepageWeekPopupConfig.friendlyDate()
              }
            },
            customClass: "generic-popup__container cos-week-popup",
            closeClass: "card--overlay__close--circular",
            hideHeader: true
          }
        });
      },
      callback: function callback(selector) {
        $(".js-orderNow", selector).click(function (e) {
          e.preventDefault();
          window.location.href = "".concat(urlConfig.root, "/pages/order/?couponCode_0=9159&partnerCode=DOMINOS&so=hp&ordtype=Carryout");
        });
        $(".js-closeButton, .js-noThanks", selector).click(function (e) {
          e.preventDefault();
          site.func.overlayToggle(false, selector, {}, {});
          $("#CosWeekPopup").fadeOut();

          if (!(isProfiled() || site.func.isHandheld())) {
            site.func.signInPopup();
          }
        });
      },
      meta: function meta(data) {
        return {
          analyticsTitle: "Cos Week Popup"
        };
      }
    }
  });
});function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define("homeSiteViews/homepageTouts", ["simplr", "dpz.template", "dpz.config", "dpz.customer", "dpz.storeAssistanceModule", "marketconfig/dpz.lang.customer", "marketconfig/dpz.lang.navigation", "marketconfig/dpz.lang.confirmation", "marketconfig/dpz.lang.locations", "marketconfig/dpz.lang.home", "marketconfig/dpz.lang.general", "marketconfig/dpz.lang.pizzaBuilder", "dpz.abTesting", "external/ua-parser.min"], function (simplr, template, _ref, _ref2, _ref3, customerStrings, navigationStrings, confirmationStrings, locationsStrings, homeStrings, generalStrings, pizzaBuilderStrings, _ref4, uaParser) {
  var getMarketProperty = _ref.getMarketProperty;
  var isProfiled = _ref2.isProfiled,
      userStatus = _ref2.userStatus,
      getStatus = _ref2.getStatus;
  var getShouldShowSam = _ref3.getShouldShowSam;
  var setTest = _ref4.setTest;
  var showWelcomeGuestNote = getMarketProperty("home").showWelcomeGuestNote;
  simplr.view.mAddViews({
    homepage_touts: {
      html: function html(data) {
        var renderGuestHomepage = data.renderGuestHomepage;
        $(document).on("customerLogin.success", appendProfileStyles);
        var loggedIn = isProfiled();
        if (loggedIn) appendProfileStyles();

        function appendProfileStyles() {
          var profileStylesheets = ["homepage-profile.css", "homepage-profile.desktop.css", "homepage-profile.fixed.css"].map(function (stylesheet) {
            return "".concat(urlConfig.assets, "/css/").concat(stylesheet);
          });
          var hasProfileStylesheet = [].slice.call(document.styleSheets).some(function (ssObj) {
            return ssObj.href === profileStylesheets[0];
          });
          if (!hasProfileStylesheet) killConfig.loadDependency({
            key: "profiled",
            appendScriptTags: {
              css: profileStylesheets
            }
          });
        }

        return $.Deferred(function (promise) {
          require(["dpz.config", "dpz.template", "homeSiteViews/homeStartYourOrder"
          /* BEGIN CA,"dpz.launchDarkly!external/ldclient.min", */
          ], function (config, template, homeStartYourOrder
          /* BEGIN CA, ld*/
          ) {
            window.dpz.template = window.dpz.template || template;
            window.dpz.config = window.dpz.config || config;
            var loyaltyImage = loggedIn ? "DPZ_Loyalty_Mobile_ActivateRewards.jpg" : "DPZ_Loyalty_Mobile_JoinNow.jpg";
            var loyaltyHandheldUrl = "".concat(dpz.market.directory, "/images/promo/").concat(loyaltyImage);
            var Session = jsDPZ.app.customer.getCustomer().data.Session;

            function getMobileNavigation() {
              var mobileNav = {
                top: [],
                bottom: []
              };
              var shouldRenderProfiledHomepageWithoutOrderHistory = killConfig.isMarketEnabled("renderProfiledHomepageWithoutOrderHistory") && isProfiled();
              var hasEasyOrder = Session.hasEasyOrder,
                  RecentOrderCount = Session.RecentOrderCount;
              var customerHasOrderHistory = RecentOrderCount || hasEasyOrder;
              return config.getNavigation("home").sort(function (a, b) {
                if (a.mobileNavPriority < b.mobileNavPriority) return -1;
                if (a.mobileNavPriority > b.mobileNavPriority) return 1;
                return 0;
              }).reduce(function (mobileNavAccum, currentNav, index) {
                currentNav.text = dpz.template.translate(currentNav.text, null, navigationStrings);
                if (currentNav.mobileNavPriority) if (killConfig.isMarketEnabled("handheldProfileHomepageNavCTAsPlacement")) {
                  var mobileNavPlacement = shouldRenderProfiledHomepageWithoutOrderHistory || customerHasOrderHistory ? currentNav.mobileNavProfilePlacement : currentNav.mobileNavGuestPlacement;
                  mobileNavAccum[mobileNavPlacement].push(currentNav);
                } else index === 0 ? mobileNav.top.push(currentNav) : mobileNav.bottom.push(currentNav);
                return mobileNavAccum;
              }, mobileNav);
            }

            var _getMobileNavigation = getMobileNavigation(),
                mobileNavTop = _getMobileNavigation.top,
                mobileNavBottom = _getMobileNavigation.bottom;

            var globalContactlessState = "REQUIRED_CASHLESS";
            /* BEGIN CA ld.client.variation(
            "46f203df-7888-41ca-8269-dcf1801bf30d"
            )?.["ContactlessDelivery"]; END CA*/

            var tokens = {
              appStoreLinks: getMarketProperty("home").appLinks,
              contactless: {
                available: globalContactlessState === "AVAILABLE",
                required: globalContactlessState === "REQUIRED",
                required_cashless: globalContactlessState === "REQUIRED_CASHLESS"
              },
              isHandheld: site.func.isHandheld(),
              isWAMCampaign: killConfig.isMarketEnabled("wamActive"),
              loggedIn: loggedIn,
              loyaltyHandheldUrl: loyaltyHandheldUrl,
              mobileNavBottom: mobileNavBottom,
              mobileNavTop: mobileNavTop,
              shouldShowSam: getShouldShowSam(),
              mobileHomeTile: getMarketProperty("home").MobileHomeTile,
              storeAddress: Session.StoreAddress,
              storeResultsURL: Session.storeResultsURL,
              profiledHomepageCollapsedSections: killConfig.isMarketEnabled("profiledHomepageCollapsedSections"),
              showWelcomeGuestNote: showWelcomeGuestNote
            };
            var component = "homePage";

            if (killConfig.isMarketEnabled("v2018HomepageLayout")) {
              if (!loggedIn || renderGuestHomepage) component = "v2018Homepage";else component = "v2018ProfiledHomepage";
            } else if (loggedIn && !renderGuestHomepage) component = "v2018ProfiledHomepage";

            var showSmartOrderForMarket = getMarketProperty("home").showSmartOrderInTemplates.includes(component);
            var hasStoreId = Boolean(jsDPZ.app.order.getOrder().data.Details.StoreID);
            var smartOrderDirectToMenuEnabled = hasStoreId && !site.func.isHandheld() && getMarketProperty("home").smartOrder.directToMenu;
            var hideByHomepage = isProfiled() ? !smartOrderDirectToMenuEnabled : !site.func.isHandheld();
            tokens.hideSmartOrder = !showSmartOrderForMarket || hideByHomepage;
            template.assembleLayout({
              component: component,
              tokens: tokens
            }).then(function (res) {
              if (!tokens.hideSmartOrder) {
                require(["contexts.components", "shared.components"], function (_ref5, _ref6) {
                  var withGNOLOContext = _ref5.withGNOLOContext;
                  var SmartOrder = _ref6.SmartOrder,
                      TranslateContext = _ref6.TranslateContext;

                  var intos = _toConsumableArray(document.getElementsByClassName("js-smartOrder"));

                  var contextValue = template.getTranslateContextValue(homeStrings);

                  var insertSmartOrder = function insertSmartOrder(into, index) {
                    var SmartOrderWithCtx = withGNOLOContext(SmartOrder);
                    preact.render(preact.h(TranslateContext.Provider, {
                      value: contextValue
                    }, preact.h(SmartOrderWithCtx // Assumes that the first SmartOrder on the page needs an h1, otherwise an h2
                    , {
                      headingLevel: index ? "h2" : "h1",
                      isCarryoutDisabled: killConfig.isMarketEnabled("d1a050cb-a642-4619-a47f-a9ced8841877"),
                      isDeliveryDisabled: killConfig.isMarketEnabled("157458fd-44c0-44ec-b375-1a29a991985f"),
                      isProfiled: isProfiled(),
                      isDirectToMenuEnabled: smartOrderDirectToMenuEnabled,
                      isTransparent: true,
                      showWelcomeGuestNote: showWelcomeGuestNote && site.func.isHandheld()
                    })), into);
                  }; // intos.forEach(insertSmartOrder);  BEGIN CA - DNP-4265 START YOUR ORDER CTA's shows on homepage after being cookie'd to a store

                });
              }

              promise.resolve(res);
            });
          });
        });
      },
      callback: function callback(selector, data) {
        var _this = this;

        var homepageBounceback = site.func.homepageWeekPopupConfig.isActive();
        var customerData = jsDPZ.app.customer.getCustomer().data;
        var customerIsLoggedIn = isProfiled();
        var customerID = data.customerID,
            orderHistoryData = data.orderHistoryData,
            showRecentOrderItems = data.showRecentOrderItems,
            renderOrderHistory = data.renderOrderHistory,
            renderGuestHomepage = data.renderGuestHomepage;

        var _jsDPZ$app$order$getO = jsDPZ.app.order.getOrder(),
            order = _jsDPZ$app$order$getO.data;

        var _jsDPZ$app$store$getS = jsDPZ.app.store.getStore(),
            store = _jsDPZ$app$store$getS.data;

        var showOrderSettings = killConfig.isMarketEnabled("6fbcf12f-50d5-4ae1-b763-a2d6f912d021") && // BEGIN CA  jsDPZ.util.empty(order.DeliveryHotspot) &&
        order.Details.StoreID && !site.func.isHandheld(); //  && getShouldShowSam();  // BEGIN CA always show OrderSettings

        var renderStartYourOrder; // Certain events trigger the re-tile of the homepage, but don't trigger the call back again.
        // Need to make sure we unhide any of the ABdelayed tiles.
        // $(document).on("/breakpoint/change/handheld/ /breakpoint/change/desktop/", site.func.unhideDelayedABTiles);

        $(document).on("/breakpoint/change/handheld/ /breakpoint/change/desktop/", site.func.unhideDelayedABTiles);
        $(document).on("/customer/profile/login/", site.func.unhideDelayedABTiles);
        $(document).on("/customer/profile/login/", site.func.unhideDelayedABTiles);

        if (!renderGuestHomepage) {
          var _document$getElements = document.getElementsByClassName("js-orderHistoryContainer"),
              _document$getElements2 = _slicedToArray(_document$getElements, 1),
              orderHistoryContainer = _document$getElements2[0];

          orderHistoryContainer === null || orderHistoryContainer === void 0 ? void 0 : orderHistoryContainer.classList.remove("is-hidden");
        }

        if (showOrderSettings) {
          require(["dpz.template", "home.components"], function (template, _ref7) {
            var OrderSettings = _ref7.OrderSettings,
                TranslateContext = _ref7.TranslateContext;
            var mount = document.querySelector(".js-orderSettings");
            preact.render(preact.h(TranslateContext.Provider, {
              value: template.getTranslateContextValue(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, confirmationStrings), locationsStrings), homeStrings), generalStrings), pizzaBuilderStrings))
            }, preact.h(OrderSettings, {
              store: store,
              order: order,
              dpzConfig: dpz.config,
              ctx: dpz.template.contextFixed.ctx,
              site: site
            })), mount);
          });
        } else if (!renderOrderHistory || site.func.isHandheld()) {
          require(["contexts.components", "shared.components"], function (_ref8, _ref9) {
            var withGNOLOContext = _ref8.withGNOLOContext;
            var SmartOrder = _ref9.SmartOrder,
                TranslateContext = _ref9.TranslateContext;

            var intos = _toConsumableArray(document.getElementsByClassName("js-smartOrder"));

            var contextValue = template.getTranslateContextValue(homeStrings);

            var insertSmartOrder = function insertSmartOrder(into, index) {
              var SmartOrderWithCtx = withGNOLOContext(SmartOrder);
              var hasStoreId = Boolean(jsDPZ.app.order.getOrder().data.Details.StoreID);
              var isDirectToMenuEnabled = hasStoreId && !site.func.isHandheld() && getMarketProperty("home").smartOrder.directToMenu;
              preact.render(preact.h(TranslateContext.Provider, {
                value: contextValue
              }, preact.h(SmartOrderWithCtx // Assumes that the first SmartOrder on the page needs an h1, otherwise an h2
              , {
                headingLevel: index ? "h2" : "h1",
                isCarryoutDisabled: killConfig.isMarketEnabled("d1a050cb-a642-4619-a47f-a9ced8841877"),
                isDeliveryDisabled: killConfig.isMarketEnabled("157458fd-44c0-44ec-b375-1a29a991985f"),
                isProfiled: isProfiled(),
                isDirectToMenuEnabled: isDirectToMenuEnabled,
                isTransparent: true,
                showWelcomeGuestNote: showWelcomeGuestNote && site.func.isHandheld()
              })), into);
            };

            intos.forEach(insertSmartOrder);
          });
        }

        if (killConfig.isMarketEnabled("stickyOrderOnlineButton")) $(window, selector).on("scroll", function () {
          var scrollDistance = $(window).scrollTop();
          $(".js-navButtonsTop").toggleClass("sticky-order-online-button", scrollDistance > 61);
        });

        var hideSkeletonLoader = function hideSkeletonLoader() {
          return document.body.classList.remove("skeleton");
        };

        $(document).on("render.tiles", function () {
          var dxpLinks = $(".block").find(".js-footer__dxp-link, .js-side__dxp-link, .js-footer--dxp, .js-side--dxp");
          var campaign = isProfiled() ? "profile" : "guest";
          var skeleton = document.body.classList.contains("skeleton");

          if (skeleton) {
            var _$;

            var images = $(".promo__image");

            var addLoadListener = function addLoadListener(i, image) {
              var waitForLoadOrTimeout = function waitForLoadOrTimeout(_ref10) {
                var resolve = _ref10.resolve;
                var timeout;

                var onLoad = function onLoad() {
                  $(image).off("load", onLoad);
                  clearTimeout(timeout);
                  resolve();
                };

                $(image).one("load", onLoad);
                timeout = setTimeout(onLoad, 1000);
              };

              return $.Deferred(waitForLoadOrTimeout);
            };

            (_$ = $).when.apply(_$, _toConsumableArray(images.map(addLoadListener))).then(hideSkeletonLoader);
          }

          $.each(dxpLinks, function (index, tile) {
            var $tile = $(tile);
            var medium = $tile.hasClass("js-side__dxp-link") ? "side" : "footer";
            var url = "";
            if (site.func.isHandheld()) medium = "secondary";
            url = "http://www.dominosdxp.com#home?".concat(["utm_source=dominos", "utm_medium=".concat(medium), "utm_campaign=".concat(campaign)].join("&"));
            $tile.attr("href", url);
          });
          var recruitingLinks = $(".block").find(".js-footer--recruiting, .js-side--recruiting");
          $.each(recruitingLinks, function (index, tile) {
            var $tile = $(tile);
            var url = "https://jobs.dominos.com/dominos-careers/?Codes=banner?";
            $tile.attr("href", url);
          });
          var anywareLinks = $(".block").find(".js-side--anyware");
          $.each(anywareLinks, function (index, tile) {
            var $tile = $(tile);
            var url = "https://anyware.dominos.com/";
            $tile.attr("href", url);
          });
        });
        $(document).on("customerLogin.success", function () {
          $("#asideMain .block .js-side--loyalty, #footerMain .js-footer--loyalty").removeClass("guest").find(".media__btn").text(dpz.template.translate("customer.activate_rewards", null, customerStrings));
          if (site.func.isHandheld()) $("#asideMain .block .js-side--loyalty, #footerMain .block .js-footer--loyalty").find("img").attr("src", "".concat(dpz.market.directory, "/images/promo/DPZ_Loyalty_Mobile_ActivateRewards.jpg"));
        });
        jsDPZ.topic("header.rendered").subscribe(function () {
          require(["dpz.hybrid"], function (_ref11) {
            var isActive = _ref11.isActive,
                isTrackingDisabled = _ref11.isTrackingDisabled;
            var isWebOrTrackingEnabled = !(isActive && isTrackingDisabled()); // Cookie policy banner & sign-in pop-up for anonymous users

            var displayCookieBanner = isWebOrTrackingEnabled && killConfig.isMarketEnabled("cookieHeaderBanner") && !customerData.Session.cookieBannerDisplayed;

            if (displayCookieBanner && !customerIsLoggedIn && !dpz.util.cookies.getItem("dpz_cookie_banner")) {
              dpz.util.cookies.setItem("dpz_cookie_banner", "true", {
                sDomain: ".".concat(document.domain),
                vEnd: 7
              });
              simplr.view.mRender({
                name: "cookieBanner",
                data: {},
                selector: ".js-cookieBanner"
              });
              customerData.Session.cookieBannerDisplayed = true;
              site.sessionTools.save();
            }
          });
        });
        site.func.updateMainNavigation({
          main: "home",
          sub: ""
        }); // Render the profiled homepage

        if (customerIsLoggedIn && !renderGuestHomepage) {
          WebTrendsHomePage();
          dpz.utag.fire.link(null, {
            event_name: "NOLO Profiled Homepage"
          });
          simplr.view.mRender({
            data: {
              customerOrders: orderHistoryData,
              showRecentOrderItems: showRecentOrderItems
            },
            name: "order_history_view",
            selector: "#orderHistory"
          });
        }

        (renderStartYourOrder = function renderStartYourOrder() {
          var hasOrders = jsDPZ.app.customer.getCustomer().data.Session.RecentOrderCount || jsDPZ.app.customer.getCustomer().data.Session.hasEasyOrder;

          var _getMarketProperty = getMarketProperty("home"),
              showGuestSmartOrderAtTop = _getMarketProperty.showGuestSmartOrderAtTop;

          var startYourOrderSelector = ".js-startYourOrder";
          if (site.func.isHandheld()) startYourOrderSelector = showGuestSmartOrderAtTop || isProfiled() && hasOrders ? ".js-startYourOrderHandheldTop" : ".js-startYourOrderHandheldBottom";
          simplr.view.mRender({
            name: "homeStartYourOrder",
            data: {},
            selector: startYourOrderSelector
          });
        })();
        $(document).on("/breakpoint/change/desktop/ /breakpoint/change/handheld/", function (e) {
          var hasOrders = jsDPZ.app.customer.getCustomer().data.Session.RecentOrderCount || jsDPZ.app.customer.getCustomer().data.Session.hasEasyOrder;
          $(".js-startYourOrderContainer").remove();
          if (e.type === "/breakpoint/change/desktop/" && hasOrders) return;
          renderStartYourOrder();
          $(".js-home-touts__bottom").toggleClass("promos--footer", e.type === "/breakpoint/change/desktop/" && !customerIsLoggedIn);
        });

        function WebTrendsHomePage() {
          var wtData = {};
          site.trigger.onPage({
            uri: "/home",
            group: "Home Page",
            subGroup: "Home Page",
            action: "view",
            base: urlConfig.root,
            analyticsTitle: isProfiled() && "Profiled Home Page"
          }); // Temp fix for the homepage redirect will go away when we are off www

          if (dpz.util.cookies.getItem("homepageRedirect")) {
            dpz.util.cookies.removeItem("homepageRedirect", "/", ".dominos.com");
            if ($(".js-userName").is(":visible")) wtData = {
              semiLoggedIn: true
            };
            $(".js-sign-in--pop-up").hide();
            site.func.showLoginPopup(wtData);
          }
        } // Displays the selected store notification for handheld devices


        if (customerData.Session.DisplayRedirectMessage) {
          $(".js-store-notification").removeClass("is-hidden");
          customerData.Session.DisplayRedirectMessage = false;
          site.sessionTools.save();
        }

        site.func.setupTemplatePopups(selector, {
          klass: window.isKiosk && "kiosk-contentpage-pane prevent-click"
        });
        site.func.canDisplayDomButton().then(function () {
          simplr.view.mRender({
            name: "dom_chat_button",
            data: {},
            selector: ".js-domChat"
          });
        });

        require(["dpz.home", "dpz.template",
        /* BEGIN CA,"dpz.launchDarkly!external/ldclient.min", */
        "marketconfig/dpz.lang.errorsValidator", "marketconfig/dpz.lang.forms", "marketconfig/dpz.lang.home", "marketconfig/dpz.lang.hotspots", "marketconfig/dpz.lang.locations", "marketconfig/dpz.lang.customer", "marketconfig/dpz.lang.navigation", "home.components", "contexts.components"
        /* START AAA */
        , "dpz.bounceBack"
        /* END AAA */
        ], function (home, template,
        /* BEGIN CA, ld*/
        errorsValidatorStrings, formsStrings, homeStrings, hotspotsStrings, locationsStrings, customerStrings, navigationStrings, _ref12, _ref13
        /* START AAA */
        , bounceBack
        /* END AAA */
        ) {
          var DeliveryTimeBanner = _ref12.DeliveryTimeBanner,
              StoreLocator = _ref12.StoreLocator,
              TranslateContext = _ref12.TranslateContext,
              LoyaltyReminder = _ref12.LoyaltyReminder,
              ValueSiteModal = _ref12.ValueSiteModal,
              Modal = _ref12.Modal;
          var withGNOLOContext = _ref13.withGNOLOContext;

          /* 
            *********************************
             HOMEPAGE MODAL CONDITION BLOCKS
            *********************************
          */
          var renderSurpriseFreesPopup = function renderSurpriseFreesPopup() {
            var eventLabel = "Surprise Frees Modal";

            var updateSession = function updateSession() {
              jsDPZ.app.customer.getCustomer().getSessionData().hasSeenSurpriseFreesModal = true;
              return site.sessionTools.save();
            };

            setTimeout(function () {
              require(["shared.components", "marketconfig/dpz.lang.general"], function (_ref14, generalStrings) {
                var Modal = _ref14.Modal,
                    SurpriseFreesHeading = _ref14.SurpriseFreesHeading,
                    SurpriseFreesPopup = _ref14.SurpriseFreesPopup,
                    TranslateContext = _ref14.TranslateContext;

                var closeModal = function closeModal(evt) {
                  evt.preventDefault();
                  updateSession().then(function () {
                    preact.render(null, document.body, document.querySelector(".js-modal"));
                  });
                };

                var Header = function Header() {
                  return preact.h(SurpriseFreesHeading, {
                    activeLanguageCode: dpz.market.activeLanguageCode,
                    assets_ctx: dpz.template.contextFixed.assets_ctx,
                    className: "surprise-frees-popup__heading",
                    headingLevel: "h1"
                  });
                };

                var locatorLink = "".concat(urlConfig.root, "/pages/order/#!/locations/search/?type=Delivery");

                var preselectDeliveryAndNavigate = function preselectDeliveryAndNavigate(evt) {
                  evt.preventDefault();
                  updateSession().then(function () {
                    window.location.assign(locatorLink);
                  });
                };

                var props = {
                  closeButtonClass: "surprise-frees-popup__close",
                  closeButtonEventLabel: eventLabel,
                  closeModal: closeModal,
                  Header: Header,
                  modalQuid: "surprise-frees-popup",
                  sectionClass: "surprise-frees-popup",
                  site: site
                };
                site.sessionTools.save();
                preact.render(preact.h(TranslateContext.Provider, {
                  value: template.getTranslateContextValue(_objectSpread({}, generalStrings))
                }, preact.h(Modal, props, preact.h(SurpriseFreesPopup, {
                  eventLabel: eventLabel,
                  handleClick: preselectDeliveryAndNavigate,
                  locatorLink: locatorLink
                }))), document.body);
                dpz.utag.fire.link(null, {
                  event_name: eventLabel
                });
              });
            }, 1500);
          };

          $(document).on("render.tiles", function (_, _ref15) {
            var shouldShowHighEngagementPromotionalModal = _ref15.shouldShowHighEngagementPromotionalModal,
                shouldShowHighEngagementWelcomeModal = _ref15.shouldShowHighEngagementWelcomeModal,
                valueSiteEligible = _ref15.valueSiteEligible;
            var _jsDPZ$app$customer$g = jsDPZ.app.customer.getCustomer().data,
                Session = _jsDPZ$app$customer$g.Session,
                Email = _jsDPZ$app$customer$g.Email;
            var bounceBacks = ["aaa", "cobb", "aaa2", "cobb2", "aaa_offers_test_ctrl", "aaa_offers_test_50", "aaa_offers_test_35", "aaa_offers_test_tw"];
            var bounceBackEligible = bounceBacks.reduce(function (acc, offerId) {
              if (dpz.util.getQueryParameters(offerId)) {
                acc = {
                  offerId: offerId,
                  pulseOrderGuid: dpz.util.getQueryParameters(offerId)
                };
              }

              return acc;
            }, false);
            var _site$func$homepageWe = site.func.homepageWeekPopupConfig,
                id = _site$func$homepageWe.id,
                _site$func$homepageWe2 = _site$func$homepageWe.templates,
                templates = _site$func$homepageWe2 === void 0 ? {} : _site$func$homepageWe2,
                _site$func$homepageWe3 = _site$func$homepageWe.overridesSavedCart,
                overridesSavedCart = _site$func$homepageWe3 === void 0 ? false : _site$func$homepageWe3;
            var surpriseFreesFlag = killConfig.isMarketEnabled("6a87ba96-0775-4a1f-bb89-71f103279c5a");
            var shouldRenderSurpriseFreesPopup = surpriseFreesFlag && killConfig.isActive("homepageUpsellOverlay") && !Session.hasSeenSurpriseFreesModal && !window.isKiosk;
            /* START AAA */

            if (shouldShowHighEngagementPromotionalModal) {
              dpz.loyalty.renderHighEngagementPromotionalModal();
            } else if (dpz.util.getQueryParameters("cotip")) {
              bounceBack.render(null, {
                offerId: "carryouttip",
                pulseOrderGuid: dpz.util.getQueryParameters("cotip")
              });
            } else if (bounceBackEligible) {
              bounceBack.render(null, bounceBackEligible);
            } else if (shouldShowHighEngagementWelcomeModal) {
              dpz.loyalty.renderHighEngagementWelcomeModal();
            } else if (
            /* END AAA */

            /* START Loyalty expiration message */
            customerData.Session.LoggedInOnHomepage && site.func.customerLoggedIn() && !customerData.Session.ranDisplayLoyaltyReminderLogic && dpz.loyalty.isEnrolled()) {
              var _customerData$Loyalty = customerData.Loyalty,
                  vestedPointBalance = _customerData$Loyalty.VestedPointBalance,
                  basePointExpirationDate = _customerData$Loyalty.BasePointExpirationDate;
              basePointExpirationDate = dayjs(basePointExpirationDate, getMarketProperty("date").format.SERVER_DATE_POWER);
              var expirationInDays = basePointExpirationDate.diff(dayjs(new Date().toISOString().split("T")[0]), "days");

              if (expirationInDays >= 0 && expirationInDays <= dpz.loyalty.getNumberOfDaysBeforeShowingPointExpiration() && vestedPointBalance > 0) {
                preact.render(preact.h(TranslateContext.Provider, {
                  value: template.getTranslateContextValue(_objectSpread(_objectSpread({}, customerStrings), navigationStrings))
                }, preact.h(Modal, {
                  site: site,
                  title: template.decodeAndSanitize(template.translate("customer.create_feature_loyalty_title", null, customerStrings)),
                  sectionClass: "loyalty-reminder card--overlay--small",
                  closeModal: function closeModal(evt) {
                    evt.preventDefault();
                    dpz.utag.fire.link(evt, {
                      abtest_bucket_1: vestedPointBalance.toString(),
                      abtest_bucket_2: expirationInDays.toString()
                    });
                    preact.render(null, document.body, document.querySelector(".js-modal"));
                  }
                }, preact.h(LoyaltyReminder, _extends({
                  name: customerData.FirstName,
                  date: basePointExpirationDate.format(getMarketProperty("date").format.DATE),
                  points: vestedPointBalance,
                  expirationInDays: expirationInDays,
                  dpzUtag: dpz.utag,
                  site: site
                }, _this.props)))), document.body);
              }

              customerData.Session.ranDisplayLoyaltyReminderLogic = true;
              site.sessionTools.save();
            } else if (
            /* END Loyalty expiration message */

            /* START Value Site */
            customerData.Session.LoggedInOnHomepage && site.func.customerLoggedIn() && valueSiteEligible) {
              Session.valueSiteOffer.available = false;
              site.sessionTools.save();

              var claimValueSiteOffer = function claimValueSiteOffer(setCoupon, setStep) {
                jsDPZ.ajax.claimValueSiteOffer({
                  email: Email,
                  offer: "vsdeal"
                }).then(function (coupon) {
                  setCoupon(coupon);
                  setStep(2);
                });
              };

              var applyValueSiteOffer = function applyValueSiteOffer(couponCode) {
                Session.addedHomepageCoupon = true;
                site.sessionTools.save().then(function () {
                  var cc = encodeURIComponent(couponCode);
                  window.location = "".concat(urlConfig.root, "/pages/order/?couponCode_0=").concat(cc, "&partnerCode=DOMINOS");
                });
              };

              preact.render(preact.h(TranslateContext.Provider, {
                value: template.getTranslateContextValue(_objectSpread(_objectSpread({}, customerStrings), navigationStrings))
              }, preact.h(ValueSiteModal, {
                site: site,
                claimValueSiteOffer: claimValueSiteOffer,
                applyValueSiteOffer: applyValueSiteOffer
              })), document.body);
            }
            /* END Value Site */
            // Create Easy Order Confirmation
            else if (Session.createdEasyOrderConfirm) site.func.overlayToggle(true, "easyOrderConfirmationOverlay", {}, {});else if (jsDPZ.util.sessionStorage("save_eo_home") === "true" && killConfig.isMarketEnabled("saveEasyOrderSetupModal") && jsDPZ.util.sessionStorage("save_eo_popup_seen") !== "true") {
              site.func.overlayToggle(true, "saveEasyOrderOverlay");
              jsDPZ.util.sessionStorage("save_eo_popup_seen", true);
            } else if (homepageBounceback && !Session.hasSeenWeekSpecialPopup && killConfig.isActive("homepageUpsellOverlay") && !window.isKiosk && (overridesSavedCart || !site.storage.load("dpz_customer_cart_saved"))) {
              setTimeout(function () {
                var popupTemplate = templates[id];

                var updateSession = function updateSession() {
                  Session.hasSeenWeekSpecialPopup = true;
                  return site.sessionTools.save();
                };

                if (id === "DCDAwareness") {
                  require(["shared.components", "marketconfig/dpz.lang.tiles"], function (_ref16, tileStrings) {
                    var DominosCarsideDeliveryTile = _ref16.DominosCarsideDeliveryTile,
                        Modal = _ref16.Modal,
                        TranslateContext = _ref16.TranslateContext;

                    var closeModal = function closeModal(evt) {
                      evt.preventDefault();
                      updateSession().then(function () {
                        preact.render(null, document.body, document.querySelector(".js-modal"));
                      });
                    };

                    var href = "".concat(urlConfig.root, "/pages/order/?couponCode_0=9216&serviceType=Carryout&partnerCode=DOMINOS");

                    var addCouponAndNavigate = function addCouponAndNavigate(evt) {
                      evt.preventDefault();
                      var Session = jsDPZ.app.customer.getCustomer().data.Session;
                      Session.addedHomepageCoupon = true;
                      site.sessionTools.save().then(updateSession).then(function () {
                        return window.location.assign(href);
                      });
                    };

                    site.sessionTools.save();
                    preact.render(preact.h(TranslateContext.Provider, {
                      value: template.getTranslateContextValue(_objectSpread(_objectSpread({}, generalStrings), tileStrings))
                    }, preact.h(Modal, {
                      site: site,
                      title: "",
                      sectionClass: "modal--dcd-awareness card--overlay--small",
                      closeModal: closeModal,
                      modalQuid: "dcd-popup"
                    }, preact.h(DominosCarsideDeliveryTile, {
                      isActive: true,
                      href: href,
                      addCouponAndNavigate: addCouponAndNavigate
                    }))), document.body);
                  });
                } else if (template) {
                  site.func.overlayToggle(true, popupTemplate, {}, {}, updateSession);
                }
              }, 1500);
            } else if (shouldRenderSurpriseFreesPopup) {
              renderSurpriseFreesPopup();
            }
          });

          if (site.data.homepageStoreLocatorAvailable) {
            var mountingSelector = document.querySelector(".js-StoreLocatorWidget");
            var StoreLocatorWithCtx = withGNOLOContext(StoreLocator);
            preact.render(preact.h(TranslateContext.Provider, {
              value: template.getTranslateContextValue(_objectSpread(_objectSpread(_objectSpread({}, locationsStrings), errorsValidatorStrings), formsStrings))
            }, preact.h(StoreLocatorWithCtx, null)), mountingSelector);

            var handleStoreLocatorClicked = function handleStoreLocatorClicked(event) {
              if (!event.target.classList.contains("js-storeLocatorDropDown") && !$(event.target).parents(".js-StoreLocatorWidget").length) {
                $(".js-storeLocatorDropDown").removeClass("active");
                $(".js-StoreLocatorWidget").addClass("is-hidden");
              }
            };

            if (!getShouldShowSam()) {
              $(document).on("click", handleStoreLocatorClicked);
            }

            jsDPZ.topic("login.success").subscribe(function () {
              if (getShouldShowSam) {
                $(document).off("click", handleStoreLocatorClicked);
              }
            });
          }

          var showContainer = function showContainer() {
            if (showRecentOrderItems) document.querySelector(".js-deliveryTimeOrderProfile").classList.remove("is-hidden");else document.querySelector(".js-home-touts__bottom").classList.remove("is-hidden");
          };

          var searchStores = function searchStores() {
            var coordinatesData = getMarketProperty("locations").storeSearchingData;
            jsDPZ.ajax.globalStoreSearch({
              data: {
                latitude: coordinatesData.latitude || 0,
                longitude: coordinatesData.longitude || 0
              }
            }).then(function (_ref17) {
              var Stores = _ref17.Stores;

              var _Stores$filter$reduce = Stores.filter(function (store) {
                return store.ServiceMethodEstimatedWaitMinutes && store.ServiceMethodEstimatedWaitMinutes.Delivery;
              }).reduce(function (accumulated, store) {
                accumulated.addedTimesLength++;
                accumulated.addedTimes += (store.ServiceMethodEstimatedWaitMinutes.Delivery.Min + store.ServiceMethodEstimatedWaitMinutes.Delivery.Max) / 2;
                return accumulated;
              }, {
                addedTimesLength: 0,
                addedTimes: 0
              }),
                  addedTimes = _Stores$filter$reduce.addedTimes,
                  addedTimesLength = _Stores$filter$reduce.addedTimesLength;

              var averageTime = addedTimesLength ? addedTimes / addedTimesLength : 0;
              var selectorDeliveryBanner = document.querySelector(showRecentOrderItems ? ".js-deliveryTimeOrderProfile" : ".js-deliveryTimeOrder");
              preact.render(preact.h(TranslateContext.Provider, {
                value: template.getTranslateContextValue(_objectSpread(_objectSpread({}, homeStrings), hotspotsStrings))
              }, preact.h(DeliveryTimeBanner, {
                averageTime: averageTime,
                showContainer: showContainer,
                profileContainer: showRecentOrderItems
              })), selectorDeliveryBanner);
            });
          };

          if (killConfig.isMarketEnabled("homepageDeliveryBanner")) searchStores();

          var loadGuestHomepage = function loadGuestHomepage() {
            WebTrendsHomePage(); // Add class to `header banner` for sizing changes based on whether your on the homepage

            $('header[role="banner"]').addClass("homepage");
            if (renderGuestHomepage) home.setTiles(null, "anonymous");else home.setTiles();
            if (getStatus() === userStatus.ANONYMOUS) $("#homeWrapper, header[role='banner']").addClass("is-anon").removeClass("is-profiled");
          };

          if (!killConfig.isActive("profileHomepage") || !customerID || renderGuestHomepage) loadGuestHomepage();else home.setTiles(); // Removed N1
          // Pan Pizza RollOvers...

          $(".abs-pos-hover ul li").hover(function () {
            $(this).addClass("isActive").find(".popUpContent").show();
          }, function () {
            $(this).removeClass("isActive").find(".popUpContent").hide();
          });

          var setCustomerAddedHomepageCoupon = function setCustomerAddedHomepageCoupon() {
            var Session = jsDPZ.app.customer.getCustomer().data.Session;
            Session.addedHomepageCoupon = true;
            return site.sessionTools.save();
          };

          $("#homeWrapper").on("click", ".js-coupon", setCustomerAddedHomepageCoupon).on("click", ".js-kiosk-order", function (e) {
            e.preventDefault();
            !dpz.kiosk.sessionStarting && dpz.kiosk.beginSession("en");
          }).on("click", ".js-kiosk-order-espanol", function (e) {
            e.preventDefault();
            !dpz.kiosk.sessionStarting && dpz.kiosk.beginSession("es");
          });
          $(".js-pizzaMakers a").on("click", function (e) {
            e.preventDefault();
            window.open($(this).attr("href").split("?")[0], "_blank");
          }); // This is the implementation to change the voice ordering, redirecting the traffic to the correct market.

          (function changeNavigator() {
            var nav = navigator.userAgent; // Arrays with info about the devices.

            var iOs = ["iPod", "iPad", "iPhone"];
            var targetChange = $(".js-footer--voice-ordering a");
            var profileTargetChange = $("#voiceOrdering a"); // Check if the navigator belongs to iOS.

            var typeNav = new RegExp(iOs.join("|"), "g");
            var result = nav.match(typeNav);
            var redirection; // The device doesn't belong to iOS.

            if (result === null) {
              // Check if the device is an Android Device.
              result = nav.match(/Android/, "gi"); // The device doesn't belong to Android either.

              if (result === null) {// go to the page by default.
                // var redirection ="/pages/content/content?page=apps&so=hp&panelnumber=4&panelname=apps";
              } else {
                // Go to the google play market if the device it's and Android.
                redirection = "https://play.google.com/store/apps/details?id=com.dominospizza";
                targetChange.prop("target", "_blank");
                profileTargetChange.prop("target", "_blank");
              }
            } else if (result !== null) {
              // go to Apple Market if the device it's a iOS.
              redirection = "http://itunes.apple.com/us/app/dominos-pizza-usa/id436491861";
              targetChange.prop("target", "_blank");
              profileTargetChange.prop("target", "_blank");
            }

            targetChange.prop("href", redirection);
            profileTargetChange.prop("href", redirection);
          })(); // If there's no store selected we suppose it's a new order and we reset the saved service type


          if (order.Details.OrderID.length === 0) site.storage.save("ServiceType", "");

          (function rotateTouts() {
            var toutOver = false;
            $("#rotationTout").on("hover", function (e) {
              if (e.type === "mouseenter") toutOver = true;else if (e.type === "mouseleave") toutOver = false;
            });
            setInterval(function () {
              if (toutOver === false) {
                $("#rotationTout > a:visible").fadeOut(700);
                $("#rotationTout > a:not(:visible)").fadeIn(700);
              }
            }, 4000);
          })(); // Show the cart in case it has items


          site.func.notifyCartUpdate();
          /* BEGIN CA
           Existing issue:
          When a user logs in from the home page, the home page automatically refreshs, which causes
          the existing phoneConfirmation.check (modal) code in `src/main/js/base/modules/dpz.profile.js`
          to hide from the DOM
           Work around solution:
          1. Add conditional check to first see if user is logged in
          2. Set a counter to see how many times the home page have been viewed/loaded
          3. Compare previous URL and current URL
          4. Combining all listed conditions, the phoneConfirmation.check (modal) will appear when a user logs in from the home page
          */

          if (isProfiled()) {
            var counter = 0;
            var isPreviousURLSame = document.referrer === window.location.href;

            if (sessionStorage.getItem("homePageLoadCounter") === null) {
              sessionStorage.setItem("homePageLoadCounter", 1);
              counter = 1;
            } else {
              counter = parseInt(sessionStorage.getItem("homePageLoadCounter"));
              counter++;
              sessionStorage.setItem("homePageLoadCounter", counter);
            }
            /*
            This file renders twice when a user logs in from the home page
            For more details, refer to src/main/js/derived/site/homepage/scripts.js where renderProfiledHomepage(); is called
            */


            if (isPreviousURLSame && counter <= 2) {
              require(["marketjs/modules/phoneConfirmation"], function (phoneConfirmation) {
                phoneConfirmation.check();
              });
            }
          } else {
            sessionStorage.removeItem('homePageLoadCounter');
          }
          /* END CA */

        });
      }
    }
  });
});define("homeSiteViews/homeStartYourOrder", ["simplr", "external/ua-parser.min", "dpz.config"], function (simplr, site, _ref) {
  var getMarketProperty = _ref.getMarketProperty;
  var showWelcomeGuestNote = getMarketProperty("home").showWelcomeGuestNote;
  simplr.view.mAddViews({
    homeStartYourOrder: {
      html: function html(data) {
        return dpz.template.assembleLayout({
          component: "homeStartYourOrder",
          tokens: {
            isCarryoutDisabled: killConfig.isMarketEnabled("d1a050cb-a642-4619-a47f-a9ced8841877"),
            isDeliveryDisabled: killConfig.isMarketEnabled("157458fd-44c0-44ec-b375-1a29a991985f"),
            showWelcomeGuestNote: showWelcomeGuestNote
          }
        });
      },
      callback: function callback() {
        $(".js-delivery, .js-carryout").on("click", function (evt) {
          var serviceMethod = $(this).attr("data-method");
          var eventName = "SYO_".concat(serviceMethod);
          var isServiceMethodDisabled = {
            Carryout: killConfig.isMarketEnabled("d1a050cb-a642-4619-a47f-a9ced8841877"),
            Delivery: killConfig.isMarketEnabled("157458fd-44c0-44ec-b375-1a29a991985f")
          };
          evt.preventDefault();

          if (!isServiceMethodDisabled[serviceMethod]) {
            dpz.utag.fire.link(null, {
              event_name: eventName,
              event_action: "click",
              event_category: "button",
              event_label: "navigation"
            });
            window.location.href = "".concat($(this).attr("href"), "?type=").concat(serviceMethod);
          }
        });
      }
    }
  });
});function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("homeSiteViews/Week50OffPopup", ["simplr"], function (simplr) {
  // global
  var _urlConfig = urlConfig,
      root = _urlConfig.root;
  var OVERLAY = "genericOverlay";
  var COMPONENT = "Week50OffPopup";
  var COUPON_REDIRECT_URL = "".concat(root, "/pages/order/?couponCode_0=9413&partnerCode=DOMINOS&so=hp");
  var closeClass = "card--overlay__close--circular";
  var customClass = "generic-popup__container fifty-off-popup";

  var html = function html() {
    return dpz.template.assembleLayout({
      component: OVERLAY,
      tokens: {
        overlayContent: {
          component: COMPONENT,
          tokens: {
            dateRange: site.func.homepageWeekPopupConfig.friendlyDate()
          }
        },
        closeClass: closeClass,
        hideHeader: true,
        customClass: customClass
      }
    });
  };

  var callback = function callback(selector) {
    site.func.setupLayerCloseEvents({
      closeSelector: ".js-closeButton",
      layerSelector: ".js-cardOverlay"
    });
    $(".js-orderNow", selector).one("click", function () {
      var Session = jsDPZ.app.customer.getCustomer().data.Session;
      Session.addedHomepageCoupon = true;
      site.sessionTools.save().then(function () {
        return window.location.href = COUPON_REDIRECT_URL;
      });
    });
  };

  simplr.view.mAddViews(_defineProperty({}, COMPONENT, {
    html: html,
    callback: callback,
    meta: function meta() {
      return {
        analyticsTitle: "50% off popup"
      };
    }
  }));
});define("homeSiteViews", ["homeSiteViews/BogoWeekPopup", "homeSiteViews/CosWeekPopup", "homeSiteViews/homepageTouts", "homeSiteViews/homeStartYourOrder", "homeSiteViews/Week50OffPopup", "siteViews/loyalty_small_widget"], function () {});define("siteViews/loyalty_small_widget", ["simplr"], function (simplr) {
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
});})(jQuery);

//# sourceMappingURL=home-site.js.map
