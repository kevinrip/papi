define("markettemplates/signInToast", [
    "marketconfig/dpz.lang.forms",
    "marketconfig/dpz.lang.general",
    "handlebars.runtime"
], function(formsStrings, generalStrings, Handlebars) {
      return { name: "signInToast", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = helpers.ifKillSwitch.call(depth0 != null ? depth0 : (container.nullContext || {}),"clickableLoginToast",{"name":"ifKillSwitch","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    return " <button class=\"toast__inner--loyalty btn--link js-login\" aria-label=\"Login Toast Message\" type=\"button\" data-quid=\"sign-in-toast-text-button\"> "
    + container.escapeExpression(helpers.t.call(
        depth0 != null ? depth0 : (container.nullContext || {}),
        "forms.sign_in_loyalty",
        {"name":"t","hash":{},"data":data},
        formsStrings
    ))
    + " </button> ";
},"4":function(container,depth0,helpers,partials,data) {
    return " <p class=\"toast__inner--loyalty\"> "
    + container.escapeExpression(helpers.t.call(
        depth0 != null ? depth0 : (container.nullContext || {}),
        "forms.sign_in_loyalty",
        {"name":"t","hash":{},"data":data},
        formsStrings
    ))
    + " </p> ";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression, alias4=depth0 != null ? depth0 : (container.nullContext || {});

  return " <a href=\""
    + alias3(alias2((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/login/\" class=\"btn toast__btn js-login--pop-up\"> "
    + alias3(helpers.t.call(alias4, "forms.sign_in", {"name":"t","hash":{},"data":data}, formsStrings))
    + " </a> <p class=\"center\"> "
    + alias3(helpers.t.call(
      alias4,
      "general.dont_have_a_pizza_profile",
      {"name":"t","hash":{},"data":data},
      generalStrings
  ))
    + " <a href=\""
    + alias3(alias2((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/profile/new\" class=\"site-nav__profile__create-account js-create-profile--pop-up\"> "
    + alias3(helpers.t.call(
      alias4,
      "general.create_one",
      {"name":"t","hash":{},"data":data},
      generalStrings
  ))
    + " </a> </p> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <div class=\"js-sign-in--pop-up toast sign-in-toast is-hidden "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.popOverLocationClass : depth0), depth0))
    + "\" data-quid=\"sign-in-toast\"> <div class=\"toast__triangle toast__triangle--sign-in\"></div> <div class=\"toast__inner\"> <button class=\"toast__close js-close-button btn--link\" aria-label=\"Close Message\" type=\"button\" data-quid=\"sign-in-toast-x\"> × </button> "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.loyaltyEnabled : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + " </div> </div>";
},"useData":true}) };
    });