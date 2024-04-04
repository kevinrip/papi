function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define("dpz.easyOrder", ["dpz.config", "dpz.oauth.constants", "marketconfig/dpz.lang.easyOrder" // BEGIN CA
], function (_ref, _ref2, easyOrderStrings // BEGIN CA
) {
  var getMarketProperty = _ref.getMarketProperty;
  var oauthScopes = _ref2.oauthScopes;

  var easyOrderReferrerIsValid = function easyOrderReferrerIsValid(referrer) {
    return referrer === "app" || referrer === "microsite";
  };

  var isInEasyOrderFlow = function isInEasyOrderFlow() {
    return killConfig.isMarketEnabled("createEasyOrderEnabled") && jsDPZ.app.customer.getCustomer().data.Session.CreateEasyOrder;
  };

  var placeInEasyOrderFlow = function placeInEasyOrderFlow() {
    jsDPZ.app.customer.getCustomer().data.Session.CreateEasyOrder = true;
    return site.sessionTools.save();
  };

  var removeFromEasyOrderFlow = function removeFromEasyOrderFlow() {
    var customerData = jsDPZ.app.customer.getCustomer().data;
    customerData.Session.CreateEasyOrder = false;
    customerData.Session.EasyOrderReferrer = "";
    return site.sessionTools.save();
  };

  var createEasyOrder = function createEasyOrder(data) {
    var callSetEasyOrder = function callSetEasyOrder(order) {
      return jsDPZ.ajax.setEasyOrderExpress({
        data: JSON.stringify(order)
      });
    };

    site.func.getOrderForPowerData().then(function (powerData) {
      return jsDPZ.ajax.priceOrder({
        data: powerData
      });
    }).then(function (res) {
      var requestObj = {
        order: res.Order
      };
      var paymentObj = {
        Type: data.Payment_Type === "Cash" ? "Cash" : "CreditCard",
        Amount: jsDPZ.app.order.getOrder().data.Details.Amounts.Customer
      };
      var easyOrderNickname;

      if (data.Easy_Order_Name) {
        easyOrderNickname = data.Easy_Order_Name;
      } else if (jsDPZ.app.customer.getCustomer().data.Session.EasyOrder) {
        easyOrderNickname = jsDPZ.app.customer.getCustomer().data.Session.EasyOrder.easyOrderNickName;
      } else {
        // BEGIN CA easyOrderNickname = "My Domino's Favorite";
        easyOrderNickname = dpz.template.translate("easyOrder.default_easy_order_nickname", null, easyOrderStrings); // END CA
      }

      requestObj.easyOrder = true;
      requestObj.easyOrderNickName = easyOrderNickname;
      return $.Deferred(function (promise) {
        if (data.Payment_Type === "Credit") {
          if (data.Save_Credit_Card) {
            var _getMarketProperty$cr;

            var expirationFormat = ((_getMarketProperty$cr = getMarketProperty("payment").creditCard) === null || _getMarketProperty$cr === void 0 ? void 0 : _getMarketProperty$cr.expirationFormat) || "M-YYYY";
            var isExpirationShortDate = /^\w{2}\-\w{2}$/.test(expirationFormat);
            var expirationMonth = data.Expiration_Month;
            var expirationYear = data.Expiration_Year;
            var number = data.Credit_Card_Number;

            if (isExpirationShortDate) {
              var expirationDate = dayjs([expirationMonth, expirationYear].join("/"), "M/YY");
              expirationMonth = expirationDate.format("M");
              expirationYear = expirationDate.format("YYYY");
              number = number.replace(/\s/g, "");
            }

            jsDPZ.app.customer.getCustomer().saveCreditCard({
              data: {
                billingZip: data.Billing_Postal_Code,
                cardType: data.Credit_Card_Type,
                expirationMonth: expirationMonth,
                expirationYear: expirationYear,
                nickName: data.Credit_Card_Nickname,
                number: number,
                securityCode: data.Credit_Card_Security_Code,
                isDefault: Boolean(data.Is_Default_CC)
              },
              success: function success(card) {
                $.extend(paymentObj, {
                  CardID: card.id,
                  CardType: card.cardType,
                  Expiration: "0".concat(card.expirationMonth).slice(-2) + String(card.expirationYear).substr(2, 2),
                  Number: card.lastFour,
                  PostalCode: card.billingZip
                });
                requestObj.order.Payments.push(paymentObj);
                promise.resolve(requestObj);
              },
              error: function error(err) {
                var errors = err.responseText.error;
                var errorCode = "powerCustomerGenericError";

                if (errors.length && errors[0].code === "CardOnFileLimitExceeded") {
                  errorCode = "powerCustomerMaxCreditCards";
                }

                site.func.overlayToggle(true, "codeOverlay", {}, {
                  code: errorCode
                });
              }
            });
          } else {
            if (data.Credit_Card_Selection >= 0) {
              var selectedCard = jsDPZ.app.customer.getCustomer().data.CreditCards[data.Credit_Card_Selection];
              $.extend(paymentObj, {
                CardID: selectedCard.id,
                CardType: selectedCard.cardType,
                Expiration: "0".concat(selectedCard.expirationMonth).slice(-2) + String(selectedCard.expirationYear).substr(2, 2),
                Number: selectedCard.lastFour,
                PostalCode: selectedCard.billingZip
              });
            } else {
              $.extend(paymentObj, {
                billingZip: data.Billing_Postal_Code,
                cardType: data.Credit_Card_Type,
                expirationMonth: data.Expiration_Month,
                expirationYear: data.Expiration_Year,
                nickName: data.Credit_Card_Nickname,
                number: data.Credit_Card_Number,
                saveAndPlaceOrder: false,
                securityCode: data.Credit_Card_Security_Code,
                gpmPaymentType: $(".js-paymentType:checked").data("gpm-payment-type")
              });
            }

            requestObj.order.Payments.push(paymentObj);
            promise.resolve(requestObj);
          }
        } else {
          requestObj.order.Payments.push(paymentObj);
          promise.resolve(requestObj);
        }
      });
    }).then(function (requestObj) {
      return callSetEasyOrder(requestObj);
    }).then(function () {
      jsDPZ.app.customer.getCustomer().data.Session.createdEasyOrderConfirm = true;
      return site.sessionTools.save();
    }).then(function () {
      jsDPZ.cache.expire("dpz_expire_on_order_and_auth_change_".concat(dpz.market.activeLanguageCode));
      window.location.href = "/"; // BEGIN CA
    })["catch"](function () {
      site.func.overlayToggle(true, "codeOverlay", {}, {
        code: "powerCustomerGenericError"
      });
    });
  };

  function handleEasyOrderButtonClick(e) {
    e.preventDefault();
    var setInEasyOrderFlow = killConfig.isMarketEnabled("createEasyOrderEnabled");
    var Session = jsDPZ.app.customer.getCustomer().data.Session;

    if (setInEasyOrderFlow && !$(this).hasClass("saveEasyOrder")) {
      Session.CreateEasyOrder = true;
      Session.EasyOrderReferrer = "site";

      var promptLoginOrRedirect = function promptLoginOrRedirect() {
        if (site.func.customerSemiLoggedIn() && !dpz.oauth.isAuthorized([oauthScopes.UPDATE_ORDER_HISTORY])()) site.func.showLoginPopup({
          routeAfter: "".concat(urlConfig.root, "/pages/order/")
        });else window.location.href = "".concat(urlConfig.root, "/pages/order/");
      };

      site.sessionTools.save().then(promptLoginOrRedirect);
    } else if (site.func.customerSemiLoggedIn() && !dpz.oauth.isAuthorized([oauthScopes.UPDATE_ORDER_HISTORY])()) site.func.showLoginPopup({
      selector: "js-createEasyOrder",
      setEasyOrder: $(this).attr("data-orderid")
    });else {
      site.func.createEasyOrder();
      if (site.func.isHandheld() && !$(".orderHistoryOrder").is(":visible")) $(".js-recentOrders .card__title").click();
    }
  }

  var getOrderById = function getOrderById(orderId) {
    return function (_ref3) {
      var id = _ref3.id;
      return id === orderId;
    };
  };

  var getHandleOrderThisClick = function getHandleOrderThisClick(_ref4) {
    var customerOrders = _ref4.customerOrders,
        _ref4$easyOrder = _ref4.easyOrder,
        easyOrder = _ref4$easyOrder === void 0 ? {} : _ref4$easyOrder,
        selector = _ref4.selector;
    return function (e) {
      e.preventDefault(); // BEGIN CA Change - compare saved addresses with order history and display a message if they don't line up
      // CA change is the import of addressmatch function, everything embedded within that function is base code

      var that = this; // assignment of click event scope

      var orderInfoType = $(this).hasClass("js-easyOrder") ? easyOrder : ""; // END CA Change

      var orderThis = function orderThis() {
        var skipMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        // BEGIN CA Change
        require(["marketjs/modules/addressmatch"], function (addressMatch) {
          addressMatch.check(orderInfoType).then(function () {
            // END CA (for now)
            var isEasyOrder = !jsDPZ.util.empty(easyOrder);
            var containerSelector = isEasyOrder ? ".js-easyOrderContainer" : ".js-recentOrders";
            var container = $(containerSelector);
            removeFromEasyOrderFlow();
            var orderNavBarActiveItem = $(".js-orderNavBar [aria-selected='true']", selector);
            var index; // BEGIN CA Change

            if ($(that).hasClass("js-recentOrder")) {
              // END CA Change
              index = orderNavBarActiveItem.index(); // WebTrends Tagging

              site.trigger.onEvent({
                uri: "/home/ROReorder",
                title: "Recent Order Reorder",
                group: "Recent Order Reorder",
                subGroup: "Recent Order Reorder ".concat(index + 1)
              });
            } // BEGIN CA Change


            if ($(that).hasClass("js-cta-missing-products")) // END CA Change
              site.trigger.onEvent({
                uri: "/home/eoreorder/discountinuedproduct/additems",
                title: "Discontinued Product Add Items",
                group: "Reorder",
                subGroup: "Discontinued Product Add Items"
              });
            var Session = jsDPZ.app.customer.getCustomer().data.Session; // Create Easy Order

            if (Session.CreateEasyOrder) {
              Session.CreateEasyOrder = false;
              Session.EasyOrderReferrer = "";
            }

            var allMissingBool = false;
            var missingProductsOverlayData;
            var showProductSwappedMessage = false;
            var showMissingProductsMessage = false;
            var showServiceMethodSwappedMessage = false;

            if (!skipMessages) {
              showProductSwappedMessage = $(this).data("product-swapped");
              showMissingProductsMessage = $(this).data("missing-products");
              var serviceMethod = isEasyOrder ? $(".js-easyOrderDetails").attr("data-serviceMethod") : orderNavBarActiveItem[0].attributes["data-service-method"].value;
              var currentServiceMethod = jsDPZ.app.order.getOrder().data.Details.ServiceMethod;
              var serviceMethodSwapped = !jsDPZ.util.empty(currentServiceMethod) && currentServiceMethod !== serviceMethod;
              showServiceMethodSwappedMessage = !site.isHomepage && (isEasyOrder || orderNavBarActiveItem.length) && serviceMethodSwapped;
            }

            if (showProductSwappedMessage) site.func.overlayToggle(true, "productSwappedOverlay", {}, {
              onConfirm: function () {
                site.func.profileReorder(this, easyOrder, customerOrders);
              }.bind(this)
            }, function () {
              // BEGIN CA Change
              if ($(that).data("missing-products")) {
                // END CA Change
                Session.showRemovedProductsOnCheckout = true;
                site.sessionTools.save();
              }
            });else if (showMissingProductsMessage) {
              // BEGIN CA Change
              if ($(that).closest(containerSelector).length > 0) // END CA Change
                allMissingBool = !container.find(".js-listOfProducts:visible").children().length;
              missingProductsOverlayData = {
                allMissing: allMissingBool,
                triggers: {
                  load: {}
                },
                onConfirm: function () {
                  site.func.profileReorder(this, easyOrder, customerOrders);
                }.bind(this),
                hideAddItems: true,
                updatedToppingWeight: $(this).data("updated-topping-weight")
              };
              site.func.overlayToggle(true, "missingProductsOverlay", {}, missingProductsOverlayData);
            } else if (showServiceMethodSwappedMessage) site.func.overlayToggle(true, "serviceMethodSwappedOverlay", {}, {
              onConfirm: function () {
                site.func.profileReorder(this, easyOrder, customerOrders);
              }.bind(this)
            }); // BEGIN CA Change
            else site.func.profileReorder(that, easyOrder, customerOrders); // END CA Change
            // BEGIN CA Change
          });
        }); // END CA Change

      };

      try {
        require(["dpz.orderHistory"], function (_ref5) {
          var getHasMessage = _ref5.getHasMessage,
              renderMessage = _ref5.renderMessage,
              setHasSeenOrderHistoryMessage = _ref5.setHasSeenOrderHistoryMessage;

          var checkMessages = function checkMessages() {
            var orderId = e.currentTarget.dataset.orderid;
            var getOrder = getOrderById(orderId);

            var _ref6 = [].concat(_toConsumableArray(customerOrders), [easyOrder]).find(getOrder) || {},
                order = _ref6.order;

            if (order) {
              var hasMessage = getHasMessage(order);

              if (hasMessage) {
                var finish = function finish() {
                  return orderThis(true);
                };

                var handleChange = function handleChange() {
                  return setHasSeenOrderHistoryMessage().then(finish);
                };

                renderMessage({
                  handleChange: handleChange,
                  order: order
                });
              } else orderThis();
            } else orderThis();
          };

          setHasSeenOrderHistoryMessage(false).then(checkMessages);
        });
      } catch (e) {
        orderThis();
      }
    };
  };

  return {
    createEasyOrder: createEasyOrder,
    easyOrderReferrerIsValid: easyOrderReferrerIsValid,
    getHandleOrderThisClick: getHandleOrderThisClick,
    handleEasyOrderButtonClick: handleEasyOrderButtonClick,
    isInEasyOrderFlow: isInEasyOrderFlow,
    placeInEasyOrderFlow: placeInEasyOrderFlow,
    removeFromEasyOrderFlow: removeFromEasyOrderFlow
  };
});
//# sourceMappingURL=dpz.easyOrder.js.map
