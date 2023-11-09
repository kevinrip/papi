define(["simplr", "dpz.title"], function (simplr, dpzTitle) {
  var module = {};
  $.extend(module, {
    setupContentPageGiftCardsView: function setupContentPageGiftCardsView() {
      simplr.view.mAddViews({
        contentPageGiftCards: {
          html: function html() {
            return dpz.template.assembleLayout({
              component: "contentPageGiftCards",
              tokens: {}
            });
          },
          callback: function callback() {
            simplr.view.mRender({
              name: "giftCards",
              data: {
                isGiftCardPage: true
              },
              selector: "#giftCardEntry"
            });
          }
        }
      });
    },
    renderContentPageGiftCardsView: function renderContentPageGiftCardsView(resource) {
      var siteScript = document.createElement("script");
      siteScript.type = "text/javascript";
      siteScript.src = "".concat(urlConfig.assets, "/js/site/site.js");
      document.body.appendChild(siteScript);
      var giftCardScript = document.createElement("script");
      giftCardScript.type = "text/javascript";
      giftCardScript.src = "".concat(urlConfig.assets, "/js/site/content/giftcard/scripts.js");
      document.body.appendChild(giftCardScript); // Need to set the page title with this approach since home page title is loaded by default

      dpzTitle.setPagetitle({
        route: {
          resources: resource
        }
      }); // Borrowed this conditional statement from `src/main/js/base/modules/dependencies.js` - Need to load recaptchaV2 for gift card page

      if (killConfig.isMarketEnabled("recaptchaV2") && !killConfig.isMarketEnabled("2f37ef94-e93d-466d-883e-fd7ee8c51ebd")) {
        //Creating global scope pointer because google does not allow periods in callback name.
        window.dpzRecaptchaReady = dpz.recaptcha.jsLoaded;
        killConfig.loadDependency({
          key: "recaptchaV2",
          appendScriptTags: {
            js: ["//www.google.com/recaptcha/api.js?onload=dpzRecaptchaReady&render=explicit"]
          }
        });
      }

      simplr.view.mRender({
        name: "contentPageGiftCards",
        data: {},
        selector: ".js-contentPage"
      });
    },
    // Copied `fakeErrorField` from src/main/js/base/site/order/payment/scripts.js
    // Need to bring function into this file since importing the entire script causes the gift card page to break
    fakeErrorField: function fakeErrorField(selector, errorCode) {
      $(selector).addClass("error");

      if (errorCode) {
        site.trigger.onEvent({
          uri: "/error/" + errorCode,
          title: "Error or Alert " + errorCode,
          group: "Error",
          subGroup: errorCode,
          eventType: "error"
        });
        $(selector).last().after('<label class="js-' + $(selector).attr("name") + "Error" + ' error" for=' + $(selector).attr("name") + ' generated="true" style="display:block">' + dpz.template.translateError(errorCode) + "</>");
      }
    }
  });
  return module;
});
//# sourceMappingURL=ca.giftCard.js.map
