define("markettemplates/mobileLogo", ["marketconfig/dpz.lang.general", "handlebars.runtime"], function(generalStrings, Handlebars) {
      return { name: "mobileLogo", template: Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression;

  return " <a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.logo_link : depth0), depth0))
    + "\"><div class=\"logo--mobile\">"
    + alias2(helpers.t.call(
    depth0 != null ? depth0 : (container.nullContext || {}),
    "general.dominos_pizza",
    {"name":"t","hash":{},"data":data},
    generalStrings
  ))
    + "</div></a> ";
},"useData":true}) };
    });