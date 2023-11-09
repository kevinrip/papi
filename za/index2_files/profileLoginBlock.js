define("markettemplates/profileLoginBlock", [
    "marketconfig/dpz.lang.general",
    "marketconfig/dpz.lang.forms",
    "marketconfig/dpz.lang.navigation",
    "handlebars.runtime"
], function(generalStrings, formsStrings, navigationStrings, Handlebars) {
      return { name: "profileLoginBlock", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isProfiled : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(21, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"js-changeLoginState js-loginStateLoggedIn profile-action "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showPersonalCoupons : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.profileIconOnly : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " profile-action--logout "
    + ((stack1 = helpers.ifKillSwitch.call(alias2,"extendedLoginButton",{"name":"ifKillSwitch","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-customer-coupons-qty=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.personalCouponsCount : depth0), depth0))
    + "\"> "
    + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.profileIconOnly : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> ";
},"3":function(container,depth0,helpers,partials,data) {
    return "profile-action--show-coupon-count";
},"5":function(container,depth0,helpers,partials,data) {
    return "profile-action--icon-only";
},"7":function(container,depth0,helpers,partials,data) {
    return " nav__group--profile--name";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " <span class=\""
    + ((stack1 = helpers.ifKillSwitch.call(alias2,"extendedLoginButton",{"name":"ifKillSwitch","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.firstName : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "")
    + " </span> <span> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showLogoutButton : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </span> ";
},"10":function(container,depth0,helpers,partials,data) {
    return "js-loggedInUserName nav__group--profile--name";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression;

  return " "
    + alias3(helpers.t.call(alias2, "general.hi", {"name":"t","hash":{},"data":data}, generalStrings))
    + " "
    + alias3(helpers.t.call(
      alias2,
      "general.first_name_string",
      {"name":"t","hash":{},"data":data},
      generalStrings
  ))
    + " ";
},"14":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression;

  return " <a data-quid=\"site-nav-user-name\" href=\""
    + alias2(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/profile/\" class=\"site-nav__profile__welcome-user js-userName\"> "
    + alias2(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "general.hi_when_username_is_null",
      {"name":"t","hash":{},"data":data},
      generalStrings
  ))
    + " </a> ";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <a data-quid=\"nav-sign-out-button\" href=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/logout/\" class=\"site-nav__profile__not-user js-notUser c-header-sign-out\"> "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFirstNameNull : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "")
    + " </a> ";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "general.sign_out_when_username_is_null",
      {"name":"t","hash":{},"data":data},
      generalStrings
  )) != null ? stack1 : "")
    + " ";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "general.not_firstname_sign_out",
      {"name":"t","hash":{},"data":data},
      generalStrings
  )) != null ? stack1 : "")
    + " ";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <span> <a href=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/login/\" class=\"js-login js-changeLoginState js-loginStateLoggedOut profile-action profile-action--login\" data-quid=\"profile-action--login\"> "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.loyaltyEnabled : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.program(24, data, 0),"data":data})) != null ? stack1 : "")
    + " </a> </span> ";
},"22":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(helpers.t.call(
        depth0 != null ? depth0 : (container.nullContext || {}),
        "forms.sign_in_and_earn_rewards",
        {"name":"t","hash":{},"data":data},
        formsStrings
    ))
    + " ";
},"24":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(helpers.t.call(
        depth0 != null ? depth0 : (container.nullContext || {}),
        "forms.sign_in",
        {"name":"t","hash":{},"data":data},
        formsStrings
    ))
    + " ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"profile-login-block\">  <button type=\"button\" class=\"nav__close-btn--light is-hidden@desktop js-mobileNavCloseButton\" tabindex=\"-1\" aria-expanded=\"true\" aria-label=\""
    + container.escapeExpression(helpers.t.call(
      alias2,
      "navigation.side_menu_close",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + "\"></button> <div class=\"site-nav__visual-language-picker is-hidden js-visualLanguageSwitcher\"></div> "
    + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.isConfirmationPage : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div> ";
},"useData":true}) };
    });