define("markettemplates/kioskBanner", ["marketconfig/dpz.lang.general", "handlebars.runtime"], function(generalStrings, Handlebars) {
      return { name: "kioskBanner", template: Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression, alias4=container.lambda;

  return "<nav class=\"js-kioskNav nav--kiosk is-hidden is-visible@kiosk\"> <ul> <li><span class=\"logo\">"
    + alias3(helpers.t.call(
    alias2,
    "general.dominos_pizza",
    {"name":"t","hash":{},"data":data},
    generalStrings
  ))
    + "</span></li> <li><a href=\""
    + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/order/#!/section/Food/category/AllEntrees/\" class=\"btn menu js-kioskNavMenu\">"
    + alias3(helpers.t.call(alias2, "general.menu", {"name":"t","hash":{},"data":data}, generalStrings))
    + "</a></li> <li><a href=\""
    + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/order/#!/section/Coupons/category/All/\" class=\"btn coupons js-kioskNavCoupons\">"
    + alias3(helpers.t.call(
    alias2,
    "general.coupons",
    {"name":"t","hash":{},"data":data},
    generalStrings
  ))
    + "</a></li> <li><button class=\"btn btn--start-over js-start-over\">"
    + alias3(helpers.t.call(
    alias2,
    "general.start_over",
    {"name":"t","hash":{},"data":data},
    generalStrings
  ))
    + "</button></li> <li><a href=\""
    + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/order/#!/checkout/\" class=\"btn btn--cart js-cart-icon\" data-order-qty=\"\">"
    + alias3(helpers.t.call(
    alias2,
    "general.checkout",
    {"name":"t","hash":{},"data":data},
    generalStrings
  ))
    + "</a></li> </ul> </nav> ";
},"useData":true}) };
    });