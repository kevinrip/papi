define("markettemplates/header", [
    "marketconfig/dpz.lang.navigation",
    "marketconfig/dpz.lang.general",
    "handlebars.runtime",
    "dpz.template",
    "dpz.layout",
    "markettemplates/kioskBanner",
    "markettemplates/callCenterBanner"
], function(navigationStrings, generalStrings, Handlebars, dpzTemplate, dpzLayout) {
    for (var _len = arguments.length, partials = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      partials[_key - 5] = arguments[_key];
    }
    dpzTemplate.set(partials.map(function (partial) {
      var name = partial.name;
      var template = partial.template;
      return {
        name: name,
        template: dpzLayout.create(template)
      };
    }));
    return { name: "header", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
  return container.escapeExpression(helpers.prt.call(depth0 != null ? depth0 : (container.nullContext || {}),"kioskBanner",{"name":"prt","hash":{},"data":data}));
},"3":function(container,depth0,helpers,partials,data) {
  return "ecom69775--nav__inner";
},"5":function(container,depth0,helpers,partials,data) {
  return " <div class=\"nav__group is-hidden@desktop\"> <button class=\"nav__hamburger site-nav__toggle site-nav__toggle--nav js-toggleNavigation\" aria-label=\""
  + container.escapeExpression(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "navigation.side_menu_open",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
  + "\" aria-expanded=\"false\" data-dpz-track-evt-name=\"hamburger\"></button> </div> ";
},"7":function(container,depth0,helpers,partials,data) {
  return " <div class=\"direction-phone is-hidden@handheld\"> "
  + container.escapeExpression(helpers.prt.call(depth0 != null ? depth0 : (container.nullContext || {}),"callCenterBanner",{"name":"prt","hash":{},"data":data}))
  + " </div> ";
},"9":function(container,depth0,helpers,partials,data) {
  return "nav__group--profile-with-ecoupons";
},"11":function(container,depth0,helpers,partials,data) {
  return "is-hidden is-visible--flex@desktop";
},"13":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression;

return "  <div class=\"nav__group nav__group--cart "
  + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.showCartText : depth0),{"name":"unless","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isInEasyOrderFlow : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + "\">  <div class=\"js-CouponIconContainer coupon-icon \" /> <a href=\""
  + alias3(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
  + "/pages/order/#!/checkout/\" class=\"site-nav__toggle site-nav__toggle--cart js-cart-icon"
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isInEasyOrderFlow : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + "\" data-dpz-track-evt-category=\"Text\" data-order-qty=\"\" data-quid=\"header-mobile-checkout"
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isInEasyOrderFlow : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + "\" > <span class=\"cart-icon__text "
  + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.showCartText : depth0),{"name":"unless","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + "\">"
  + alias3(helpers.tt.call(
    alias2,
    "general",
    depth0 != null ? depth0.cartText : depth0,
    {"name":"tt","hash":{},"data":data},
    generalStrings
))
  + "</span> <span aria-hidden=\"true\" class=\"js-cartQuantityBadge cart-quantity-badge\"></span> </a> <span class=\"js-cartQuantityText is-visually-hidden\" aria-live=\"polite\" aria-atomic=\"true\"></span> <div class=\"js-miniCartContainer\" /> </div> ";
},"14":function(container,depth0,helpers,partials,data) {
  return "nav__group--cart-with-no-text";
},"16":function(container,depth0,helpers,partials,data) {
  return " easy-order--icon-container";
},"18":function(container,depth0,helpers,partials,data) {
  return " site-nav__toggle--cart--easy-order";
},"20":function(container,depth0,helpers,partials,data) {
  return "-easy-order";
},"22":function(container,depth0,helpers,partials,data) {
  return "is-visually-hidden";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

return " <a href=\"#pageContent\" role=\"region\" class=\"sr-only\">"
  + ((stack1 = helpers.t.call(
    alias2,
    "general.skip_to_main_content_CA",
    {"name":"t","hash":{},"data":data},
    generalStrings
)) != null ? stack1 : "")
  + "</a>  <div class=\"js-cookieBanner site-nav__cookie-banner\"> <!-- --> </div> "
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.kioskIsActive : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " <nav class=\"nav nav--primary\" aria-label=\"primary\" data-quid=\"primary-nav\"> <div class=\"nav__inner "
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.hasNationalStoreSelected : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + "\"> "
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showHamburger : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " <ul data-quid=\"header-main-navigation-desktop\" class=\"nav__group js-siteMainNavigation\"></ul> "
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showCallCenterPhone : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " <div class=\"js-headerProfileContainer js-headerProfileContainerNavigationBar nav__group nav__group--profile "
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showPersonalCouponsCountInMobileNavBar : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
  + "\"> </div> <div class=\"is-hidden@desktop is-hidden js-savedCartToastContainer\"> <!-- --> </div> "
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showCart : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " </div> <div id=\"js-subNavigationPage\" class=\"js-subNavigationPage nav__sub-banner-wrap\"> <!-- --> </div> </nav> <nav class=\"nav nav--drawer is-hidden@desktop js-mobileNav\" data-quid=\"mobile-nav\" aria-hidden=\"true\"> <div class=\"js-headerProfileContainer js-headerProfileContainerDrawer nav__group nav__group--profile is-hidden@desktop\"></div> <ul data-quid=\"header-main-navigation-mobile\" class=\"nav__group js-siteMainNavigation\"></ul> <div id=\"js-myProfilePageHandheld\" class=\"js-orderSettingsBar is-hidden@desktop\"> <!-- --> </div> <div class=\"js-orderProfileWalletHandheld\"></div> </nav> <div class=\"js-miniNavContainer mini-nav-container\"> <!-- --> </div> <div class=\"nav__untoggle-overlay site-nav__untoggle-overlay js-untoggleOverlay\"> <!-- --> </div> ";
},"useData":true}) };
});