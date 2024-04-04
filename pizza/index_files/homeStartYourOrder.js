define("markettemplates/homeStartYourOrder", ["marketconfig/dpz.lang.home", "handlebars.runtime"], function(homeStrings, Handlebars) {
      return { name: "homeStartYourOrder", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression, alias4=container.lambda;

  return " <div class=\"js-startYourOrderContainer start-your-order\" data-quid=\"start-your-order-content\"> <div class=\"grid\"> <div class=\"grid__cell--1/2@desktop grid__cell--1 start-your-order__header-container\"> <h2 class=\"start-your-order__heading\">"
    + alias3(helpers.t.call(
      alias2,
      "home.start_your_order",
      {"name":"t","hash":{},"data":data},
      homeStrings
  ))
    + "</h2> </div> <div class=\"grid__cell--1/2@desktop grid__cell--1 start-your-order__ctas\"> <div class=\"start-your-order__cta-container\"> <a class=\"btn btn--delivery "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isDeliveryDisabled : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " js-delivery\" href=\""
    + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/order/#!/locations/search/\" data-method=\"Delivery\" data-quid=\"start-your-order-delivery\">"
    + alias3(helpers.t.call(
      alias2,
      "home.start_your_order_delivery",
      {"name":"t","hash":{},"data":data},
      homeStrings
  ))
    + "</a> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isDeliveryDisabled : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> <span class=\"or\"><!-- --></span> <div class=\"start-your-order__cta-container\"> <a class=\"btn btn--carryout "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isCarryoutDisabled : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " js-carryout\" href=\""
    + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/order/#!/locations/search/\" data-method=\"Carryout\" data-quid=\"start-your-order-carryout\">"
    + alias3(helpers.t.call(
      alias2,
      "home.start_your_order_carryout",
      {"name":"t","hash":{},"data":data},
      homeStrings
  ))
    + "</a> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isCarryoutDisabled : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> </div> </div> ";
},"2":function(container,depth0,helpers,partials,data) {
    return "btn--disabled";
},"4":function(container,depth0,helpers,partials,data) {
    return "<p class=\"start-your-order__service-method-disabled-warning\"> "
    + container.escapeExpression(helpers.t.call(
        depth0 != null ? depth0 : (container.nullContext || {}),
        "home.temporarily_disabled",
        {"name":"t","hash":{},"data":data},
        homeStrings
    ))
    + "</p>";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <!-- Begin CA Change - add #unless --> "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.hasOrderHistory : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <!-- End CA Change -->";
},"useData":true}) };
    });