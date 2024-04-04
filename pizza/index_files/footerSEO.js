define("markettemplates/footerSEO", ["marketconfig/dpz.lang.meta", "handlebars.runtime"], function(metaStrings, Handlebars) {
      return { name: "footerSEO", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <p class=\"js-seo-content\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.seoFooter : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</p> ";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable;

  return container.escapeExpression(helpers.tt.call(
    depth0 != null ? depth0 : (container.nullContext || {}),
    "meta",
    depth0 != null ? depth0.seoFooter : depth0,
    {"name":"tt","hash":{},"data":data},
    metaStrings
  ));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = helpers.ifKillSwitch.call(depth0 != null ? depth0 : (container.nullContext || {}),"seoFooter",{"name":"ifKillSwitch","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"useData":true}) };
    });