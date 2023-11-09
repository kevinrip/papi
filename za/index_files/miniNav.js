define("markettemplates/miniNav", [
    "marketconfig/dpz.lang.home",
    "marketconfig/dpz.lang.navigation",
    "handlebars.runtime"
], function(homeStrings, navigationStrings, Handlebars) {
      return { name: "miniNav", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "sam";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return "  "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shouldShowSam : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"4":function(container,depth0,helpers,partials,data) {
    return " <div class=\"nav__menu-item\" id=\"js-storeAssistanceModuleMobile\"><!-- !!! --></div> ";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression;

  return " <a data-quid=\"nav-sign-out-button\" href=\""
    + alias2(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/logout/\" class=\"js-logout sign-out\"> "
    + alias2(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "home.sign_out",
      {"name":"t","hash":{},"data":data},
      homeStrings
  ))
    + " </a> ";
},"8":function(container,depth0,helpers,partials,data) {
    return "nav__menu-item--tracker";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.lambda, alias4=container.escapeExpression;

  return " <section role=\"region\" class=\"nav--mini nav__sub is-hidden@desktop js-handheldSubNav "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.shouldShowSam : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">  <div class=\"nav__menu-item nav__login\"> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showLogoutButton : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <a href=\""
    + alias4(alias3((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/customer/#!/customer/login/\" class=\"sign-in js-login js-homeResponsiveMenuBtn\"> "
    + alias4(helpers.t.call(alias2, "home.sign_in", {"name":"t","hash":{},"data":data}, homeStrings))
    + " </a>  </div>  <div class=\"nav__menu-item "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.shouldShowSam : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"> <a href=\""
    + alias4(alias3((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/tracker/\"> "
    + alias4(helpers.t.call(
      alias2,
      "navigation.tracker",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + " </a> </div> </section>";
},"useData":true}) };
    });