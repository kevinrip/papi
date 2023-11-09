define("markettemplates/footer", ["marketconfig/dpz.lang.navigation", "handlebars.runtime"], function(navigationStrings, Handlebars) {
      return { name: "footer", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <div class=\"footer__group calorie__disclaimer\" style=\"text-align:center;\"> <h3 style=\"margin-bottom:8px;font-size:1.2em\">Adults and youths (ages 13 and older) need an average of 2,000 Calories a day, and children (ages 4 to 12) need an average of 1,500 Calories a day. However, individual needs vary.</h3> </div> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " <div class=\"footer__group calorie__disclaimer\" style=\"text-align:center;\"> <h3 style=\"margin-bottom:8px;font-size:1.2em\">Domino’s Pizza of Canada Ltd. welcomes and encourages applications from people with disabilities. Accommodations are available on request for candidates taking part in all aspects of the selection process.</h3> </div> ";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isComponent : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <li class=\"footer__link-item "
    + alias3(alias2((depth0 != null ? depth0.listClass : depth0), depth0))
    + "\" data-link-text=\""
    + ((stack1 = alias2((depth0 != null ? depth0.text : depth0), depth0)) != null ? stack1 : "")
    + "\" data-link-href=\""
    + alias3(helpers.makeLink.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.url : depth0),{"name":"makeLink","hash":{},"data":data}))
    + "\"></li> ";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression, alias4=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__link-item "
    + alias3(alias2((depth0 != null ? depth0.listClass : depth0), depth0))
    + "\"> <a class=\""
    + alias3(alias2((depth0 != null ? depth0.anchorClass : depth0), depth0))
    + " c-site-footer-link-"
    + alias3(alias2((data && data.index), depth0))
    + "\" data-quid=\"footer__link-item--"
    + alias3(alias2((data && data.index), depth0))
    + "\" href=\""
    + alias3(helpers.makeLink.call(alias4,(depth0 != null ? depth0.url : depth0),{"name":"makeLink","hash":{},"data":data}))
    + "\" "
    + ((stack1 = helpers.ifUseLinkTarget.call(alias4,{"name":"ifUseLinkTarget","hash":{"target":(depth0 != null ? depth0.target : depth0),"url":(depth0 != null ? depth0.url : depth0)},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(alias2((depth0 != null ? depth0.attributes : depth0), depth0))
    + " data-quid="
    + alias3(alias2((depth0 != null ? depth0.dataValue : depth0), depth0))
    + ">"
    + ((stack1 = alias2((depth0 != null ? depth0.text : depth0), depth0)) != null ? stack1 : "")
    + "</a> </li> ";
},"9":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable;

  return "target=\""
    + container.escapeExpression(helpers.chooseLinkTarget.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"chooseLinkTarget","hash":{"target":(depth0 != null ? depth0.target : depth0),"url":(depth0 != null ? depth0.url : depth0)},"data":data}))
    + "\" rel=\"noopener noreferrer\"";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = container.lambda((depth0 != null ? depth0.appButtons : depth0), depth0)) != null ? stack1 : "")
    + " ";
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression;

  return " <div class=\"body--homepage\"> <div class=\"homepage-wrapper is-anon footer-order-online is-hidden@desktop\"> <a data-quid=\"footer-order-now-btn\" href=\""
    + alias2(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/order/\" class=\"btn btn--block action-ctas__icon\">"
    + alias2(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "navigation.order_online",
      {"name":"t","hash":{},"data":data},
      navigationStrings
  ))
    + "</a> </div> </div> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.lambda;

  return " <footer role=\"contentinfo\" class=\"footer\"> <!-- START CA Modification --> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.displayCalorieInfo : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.displayEmploymentDisclaimer : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <!-- END CA Modification --> <ul class=\"footer__group footer__links js-footerLinks\"> "
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.footerLinks : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </ul> <div class=\"footer__group footer__group--promos\"> "
    + ((stack1 = alias3((depth0 != null ? depth0.socialLinks : depth0), depth0)) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.hideFooterAppButtons : depth0),{"name":"unless","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = alias3((depth0 != null ? depth0.promoLinks : depth0), depth0)) != null ? stack1 : "")
    + " </div> <div class=\"js-homepageFooterBanner footer__banner\"></div> <div class=\"footer__legal\" data-quid=\"footer__legal\"> "
    + ((stack1 = alias3((depth0 != null ? depth0.footerLegal : depth0), depth0)) != null ? stack1 : "")
    + " </div> <div class=\"seo-content\"> "
    + ((stack1 = alias3((depth0 != null ? depth0.footerSEO : depth0), depth0)) != null ? stack1 : "")
    + " </div> </footer>  "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showOrderOnline : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}) };
    });