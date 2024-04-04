function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.bounceBack", ["shared.components", "contexts.components", "dpz.serviceMethod.constants", "marketconfig/dpz.lang.overlays", "marketconfig/dpz.lang.general", "marketconfig/dpz.lang.errors", //, "dpz.launchDarkly!external/ldclient.min", // BEGIN CA Change
"dayjs"], function (_ref, _ref2, _ref3, overlaysStrings, generalStrings, errorStrings, //, ld // BEGIN CA Change
dayjs) {
  var AAAClaimCreative = _ref.AAAClaimCreative,
      BounceBackModal = _ref.BounceBackModal,
      CarryoutTipsModal = _ref.CarryoutTipsModal,
      TranslateContext = _ref.TranslateContext;
  var withGNOLOContext = _ref2.withGNOLOContext;
  var AT_STORE_METHODS = _ref3.AT_STORE_METHODS;
  var twoWeeks = "";
  var cobbOffer = "";
  var cobbOffers = ["cobb", "cobb2"];
  var aaaOffer = "";
  var aaaOffers = ["aaa", "aaa_offers_test_ctrl", "aaa_offers_test_50", "aaa_offers_test_35", "aaa_offers_test_tw"];
  /* START ECOM-67579b */

  var aaaCreativeTest = "";
  var claimTests = [];
  /* END ECOM-67579b */

  function setSessionFlag() {
    jsDPZ.app.customer.getCustomer().getSessionData().bounceBackShown = true;
    return site.sessionTools.save();
  }

  function sendPageTitle(analyticsTitle) {
    if (analyticsTitle) {
      jsDPZ.topic("site.onPage").publish({
        analyticsTitle: analyticsTitle
      });
    }
  }

  function claimCode(_ref4) {
    var offerId = _ref4.claimId,
        pulseOrderGuid = _ref4.pulseOrderGuid;
    return jsDPZ.ajax.claimTargetedOffer({
      data: {
        offerId: offerId,
        pulseOrderGuid: pulseOrderGuid
      }
    }).then(function (response, _, _ref5) {
      var status = _ref5.status;
      return setSessionFlag().then(function () {
        return _objectSpread(_objectSpread({}, response), {}, {
          status: status
        });
      });
    });
  }

  function claimedToday(offerId) {
    var sessionData = jsDPZ.util.sessionStorage("bounceback-claimed");

    if (sessionData) {
      try {
        var format = "YYYY-MM-DD";
        var parsed = JSON.parse(sessionData);

        if (offerId === parsed.offerId && parsed.claimedDate === dayjs().format(format)) {
          return parsed;
        } // eslint-disable-next-line no-empty

      } catch (err) {}
    }

    return null;
  }

  function getModal(offer, order) {
    var isCarryoutTips = offer === "carryouttip";
    var offerId = getOfferId(offer, order);
    if (isCarryoutTips) return CarryoutTipsModal;
    /* START ECOM-67579b */

    var aaaModalTests = claimTests.filter(function (test) {
      return test !== "claim_test_ctrl";
    });

    if (offerId === "aaa" && aaaModalTests.includes(aaaCreativeTest)) {
      return AAAClaimCreative;
    }
    /* END ECOM-67579b */


    return BounceBackModal;
  }

  function isAtStoreOrder(serviceMethod) {
    return AT_STORE_METHODS.includes(serviceMethod);
  }

  function getClaimOfferId(offerId, order, aaaOffer) {
    if (!offerId) return;
    if (offerId === "carryouttip") return offerId;
    if (order && isAtStoreOrder(order.Details.ServiceMethod)) return "cobb";
    if (aaaOffer) return aaaOffer;
    return offerId;
  }

  function getAaaOffer(offer) {
    if (!offer) return "";
    if (aaaOffers.includes(offer)) return offer;
    if (offer === "aaa2") return "aaa";
    return "";
  }

  function getOfferId(offerId, order) {
    if (offerId === "carryouttip") return offerId;
    if (order && isAtStoreOrder(order.Details.ServiceMethod)) return "cobb";
    if (offerId === "aaa2") return "aaa";
    if (order && !isAtStoreOrder(order.Details.ServiceMethod)) return "aaa";
    return offerId;
  }

  return {
    determineAvailability: function determineAvailability(_ref6, requestedOfferId) {
      var Customer = _ref6.Customer,
          Details = _ref6.Details,
          pulseOrderGuid = _ref6.pulseOrderGuid;
      return new Promise(function (resolve) {
        resolve(false); /// BEGIN CA - right now CA is not using bounceback

        var user = ld.client.getUser();
        var defaultOfferId = isAtStoreOrder(Details.ServiceMethod) ? "cobb" : "aaa";
        var offerId = requestedOfferId || defaultOfferId;
        ld.identify(_objectSpread(_objectSpread({}, user), {}, {
          custom: _objectSpread(_objectSpread({}, user.custom), {}, {
            offer: offerId.toUpperCase(),
            email: Customer.Email
          })
        })).then(function () {
          if (killConfig.isMarketEnabled("2ee8c13c-decb-11e9-8a34-2a2ae2dbcce4")) {
            if (claimedToday(offerId)) {
              return resolve(true);
            }

            return jsDPZ.ajax.getTargetedOffer({
              offerId: offerId,
              email: Customer.Email,
              orderId: Details.OrderID,
              pulseOrderGuid: pulseOrderGuid
            }).then(function () {
              var _aaaOffer;

              var getCustomer = jsDPZ.app.customer.getCustomer;
              var Session = getCustomer().data.Session;
              Session.targetedOffersTestFlag = (_aaaOffer = aaaOffer) !== null && _aaaOffer !== void 0 ? _aaaOffer : aaaOffer;

              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              var _args$ = args[0];
              _args$ = _args$ === void 0 ? {} : _args$;
              var offers = _args$.offers,
                  _args$2 = args[2];
              _args$2 = _args$2 === void 0 ? {} : _args$2;
              var status = _args$2.status;
              twoWeeks = offers !== null && offers !== void 0 && offers.hasOwnProperty("aaa2") ? "aaa2" : "";
              var offer = offers ? Object.keys(offers)[0].toLowerCase() : "";
              cobbOffer = cobbOffers.includes(offer) ? offer : "";
              aaaOffer = getAaaOffer(offer);

              if (!cobbOffer && !aaaOffer && offerId !== "carryouttip") {
                return resolve(false); // silently fail if it's not an offer we're expecting
              }

              dpz.utag.fire.link(null, {
                claim_creative_test: aaaOffer
              });
              resolve(status === 200);
            })["catch"](function () {
              return resolve(false);
            });
          } else {
            return resolve(false);
          }
        });
      });
    },
    renderCarryoutTipsTiles: function renderCarryoutTipsTiles(order, _ref7) {
      var pulseOrderGuid = _ref7.pulseOrderGuid,
          offerId = _ref7.offerId;

      require(["dpz.carryoutTips"], function (carryoutTips) {
        carryoutTips.render({
          claimCode: claimCode,
          previouslyClaimed: claimedToday(offerId),
          pulseOrderGuid: (order === null || order === void 0 ? void 0 : order.pulseOrderGuid) || pulseOrderGuid,
          offerId: offerId
        });
      });
    },
    render: function render(order, _ref8) {
      var _this = this;

      var pulseOrderGuid = _ref8.pulseOrderGuid,
          offerId = _ref8.offerId,
          isAaaTile = _ref8.isAaaTile;

      if (offerId !== "carryouttip" && jsDPZ.app.customer.getCustomer().getSessionData().bounceBackShown || isAaaTile && !aaaOffer) {
        return null;
      }
      /* START ECOM-67579b */


      site.func.getOffers("DPZ_ECOM-67579b").then(function (aaaTest) {
        if (aaaOffer) {
          aaaCreativeTest = aaaTest === null || aaaTest === void 0 ? void 0 : aaaTest.experience;
          claimTests = aaaTest === null || aaaTest === void 0 ? void 0 : aaaTest.validExperiences;

          if (aaaCreativeTest) {
            var aaaCreativeTestTaggingLabel = {
              claim_test_ctrl: "Claim Creative – Control",
              claim_test_copy: "Claim Creative – Exp B New Copy​",
              claim_test_imagery: "Claim Creative – Exp C Imagery​",
              claim_test_animation: "Claim Creative – Exp D Animation"
            }[aaaCreativeTest];
            dpz.utag.fire.link(null, {
              event_category: "AAA – Free M2T Offer​",
              targeted_offer_test_flag: aaaCreativeTestTaggingLabel
            });
          }
        }
        /* END ECOM-67579b */


        if (isAaaTile && (!aaaCreativeTest || aaaCreativeTest === "claim_test_ctrl")) {
          return;
        } // eslint-disable-next-line no-unused-vars


        var isCarryoutTips = offerId === "carryouttip";
        var ModalWithGNOLO = withGNOLOContext(getModal(offerId, order));

        if (isCarryoutTips) {
          _this.renderCarryoutTipsTiles(order, {
            pulseOrderGuid: pulseOrderGuid,
            offerId: offerId
          });
        }

        var targetElement = isAaaTile ? ".js-aaaTileContainer" : ".js-modalContainer";

        var closeModal = function closeModal(e) {
          dpz.utag.fire.link(e, {
            event_category: "AAA – Free M2T Offer",
            event_name: "X"
          });
          preact.render(null, document.body, document.querySelector(targetElement));
        };

        offerId = offerId || (order && isAtStoreOrder(order.Details.ServiceMethod) ? "cobb" : "aaa");

        if (offerId === "aaa2") {
          offerId = "aaa";
          twoWeeks = "aaa2";
        }

        if (offerId.includes("aaa")) {
          if (!aaaOffer) {
            aaaOffer = offerId;
          }

          offerId = "aaa";
        }

        if (offerId.includes("cobb")) cobbOffer = "cobb";
        preact.render(preact.h(TranslateContext.Provider, {
          value: dpz.template.getTranslateContextValue(_objectSpread(_objectSpread(_objectSpread({}, overlaysStrings), generalStrings), errorStrings))
        }, preact.h(TranslateContext.Consumer, null, function (_ref9) {
          var t = _ref9.t,
              tmd = _ref9.tmd;
          return preact.h(ModalWithGNOLO, {
            closeModal: closeModal,
            modalQuid: "bounce-back",
            onShowCallback: setSessionFlag,
            email: order === null || order === void 0 ? void 0 : order.Customer.Email,
            claimCode: claimCode,
            sendPageTitle: sendPageTitle,
            claiming: !!pulseOrderGuid,
            pulseOrderGuid: (order === null || order === void 0 ? void 0 : order.pulseOrderGuid) || pulseOrderGuid,
            emailReminder: killConfig.isMarketEnabled("a247c077-abe7-418d-a731-a1d76700afea"),
            t: t,
            tmd: tmd,
            offerId: getClaimOfferId(offerId, order, aaaOffer),
            aaaOffer: aaaOffer,
            cobbOffer: cobbOffer,
            previouslyClaimed: claimedToday(offerId),
            aaaCreativeTest: aaaCreativeTest,
            twoWeeks: twoWeeks,
            isAaaTile: isAaaTile
          });
        })), document.querySelector(targetElement));
        /* START ECOM-67579b */
      });
      /* END ECOM-67579b */
    }
  };
});
//# sourceMappingURL=dpz.bounceBack.js.map
