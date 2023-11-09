define("markettemplates/customerResponsiveLogin", [
    "marketconfig/dpz.lang.forms",
    "marketconfig/dpz.lang.builders",
    "marketconfig/dpz.lang.navigation",
    "handlebars.runtime"
], function(formsStrings, buildersStrings, navigationStrings, Handlebars) {
      return { name: "customerResponsiveLogin", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "sam";
},"3":function(container,depth0,helpers,partials,data) {
    return " <div class=\"nav__menu-item nav__sam\" id=\"js-storeAssistanceModuleMobile\"><!-- !!! --></div> ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = helpers.unlessKillSwitch.call(depth0 != null ? depth0 : (container.nullContext || {}),"boloCutOver",{"name":"unlessKillSwitch","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <div class=\"nav__menu-item nav__login\"> "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.message : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + " </div> ";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <a href=\""
    + alias3(alias2((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/login/\" class=\"sign-in js-login--responsive js-homeResponsiveMenuBtn site-nav__profile__sign-in nav--mini--normal\"> "
    + alias3(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "forms.sign_in",
      {"name":"t","hash":{},"data":data},
      formsStrings
  ))
    + " </a> <span class=\"nav--mini--normal\"> "
    + ((stack1 = alias2((depth0 != null ? depth0.message : depth0), depth0)) != null ? stack1 : "")
    + " </span> ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return "  "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.showCouponSubBanner : depth0),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression;

  return " <a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/login/\" class=\"sign-in js-login--responsive js-homeResponsiveMenuBtn site-nav__profile__sign-in\"> "
    + alias2(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "forms.sign_in",
      {"name":"t","hash":{},"data":data},
      formsStrings
  ))
    + " </a> ";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <div class=\"nav__menu-item nav__menu-item--back-btn\"> "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.showCustomBackLink : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + " </div> ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <a href=\""
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.backlink : depth0)) != null ? stack1.href : stack1), depth0))
    + "\" class=\"nav--mini__back-btn js-miniNavBackBtn\" data-hook=\"back-link\"> "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.backlink : depth0)) != null ? stack1.text : stack1), depth0))
    + " </a> ";
},"15":function(container,depth0,helpers,partials,data) {
    return " <button class=\"nav--mini__back-btn js-miniNavBackBtn btn--link\" type=\"button\"> "
    + container.escapeExpression(helpers.t.call(
        depth0 != null ? depth0 : (container.nullContext || {}),
        "builders.back",
        {"name":"t","hash":{},"data":data},
        buildersStrings
    ))
    + " </button> ";
},"17":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression;

  return " <div class=\"nav__menu-item mobile-sub-banner\"> <ul class=\"nav__sub-banner js-sub-banner\"> <li id=\"csn-All\" class=\"nav__menu-item\"><a href=\"#!/section/Coupons/category/All/\" class=\"navigation-All\">"
    + alias3(helpers.t.call(
      alias2,
      "navigation.view_all",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + "</a></li> <li id=\"csn-Feeds1To2\" class=\"nav__menu-item\"><a href=\"#!/section/Coupons/category/Feeds1To2/\" class=\"navigation-Feeds1To2\">"
    + alias3(helpers.t.call(
      alias2,
      "navigation.feeds_1_2",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + "</a></li> <li id=\"csn-Feeds3To5\" class=\"nav__menu-item\"><a href=\"#!/section/Coupons/category/Feeds3To5/\" class=\"navigation-Feeds3To5\">"
    + alias3(helpers.t.call(
      alias2,
      "navigation.feeds_3_5",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + "</a></li> <li id=\"csn-Feeds6Plus\" class=\"nav__menu-item\"><a href=\"#!/section/Coupons/category/Feeds6Plus/\" class=\"navigation-Feeds6Plus\">"
    + alias3(helpers.t.call(
      alias2,
      "navigation.feeds_6",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + "</a></li> <li id=\"csn-LunchOffers\"  class=\"nav__menu-item\"><a href=\"#!/section/Coupons/category/LunchOffers/\" class=\"navigation-LunchOffers\">"
    + alias3(helpers.t.call(
      alias2,
      "navigation.lunch_offers",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + "</a></li> </ul> </div> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " <section role=\"region\" class=\"nav--mini nav__sub is-hidden@desktop js-handheldSubNav "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.shouldShowSam : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.shouldShowSam : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.renderData : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showBackButton : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showCouponSubBanner : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </section>";
},"useData":true}) };
    });