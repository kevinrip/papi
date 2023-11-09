define("markettemplates/footerAppButtons", ["handlebars.runtime"], function(Handlebars) {
      return ({ name: "footerAppButtons", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <a data-quid=\"footer-app-"
    + alias3(alias2((depth0 != null ? depth0.type : depth0), depth0))
    + "\" class=\"footer__group-app-link footer__group-app-link--"
    + alias3(alias2((depth0 != null ? depth0.type : depth0), depth0))
    + "\" href=\""
    + alias3(alias2((depth0 != null ? depth0.href : depth0), depth0))
    + "\" target=\"_blank\" > <img class=\"footer__group-app-link-img\" src=\""
    + alias3(alias2((depths[1] != null ? depths[1].assets_ctx : depths[1]), depth0))
    + "/images/homepage/"
    + alias3(alias2((depth0 != null ? depth0.imgName : depth0), depth0))
    + "\" alt=\""
    + alias3(alias2((depth0 != null ? depth0.altText : depth0), depth0))
    + "\" /> </a> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " <div class=\"footer__group footer__group--apps\"> "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.appLinks : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> ";
},"useData":true,"useDepths":true}) })
    });