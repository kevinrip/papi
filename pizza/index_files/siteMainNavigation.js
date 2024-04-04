define("markettemplates/siteMainNavigation", ["marketconfig/dpz.lang.general", "handlebars.runtime"], function(generalStrings, Handlebars) {
      return { name: "siteMainNavigation", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression;

  return " <a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.logoLink : depth0), depth0))
    + "\" class=\"navigation-home\" data-quid=\"dpz-icon-home-link\">"
    + alias2(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "general.dominos_pizza",
      {"name":"t","hash":{},"data":data},
      generalStrings
  ))
    + "</a> ";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.lambda, alias4=container.escapeExpression;

  return " <li class=\"js-mainNav "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.drawerSubNav : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " nav__menu-item "
    + alias4(alias3((depth0 != null ? depth0.listClass : depth0), depth0))
    + "\"> <a "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.dataDPZTrackEvtPageName : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " class=\""
    + alias4(alias3((depth0 != null ? depth0.anchorClass : depth0), depth0))
    + " c-site-nav-main-link-"
    + alias4(alias3((data && data.index), depth0))
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isDeals : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-quid=\""
    + alias4(alias3((depth0 != null ? depth0.quid : depth0), depth0))
    + "\" href=\""
    + alias4(helpers.makeLink.call(alias2,(depth0 != null ? depth0.url : depth0),{"name":"makeLink","hash":{},"data":data}))
    + "\"> "
    + ((stack1 = alias3((depth0 != null ? depth0.text : depth0), depth0)) != null ? stack1 : "")
    + "  "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.isDeals : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </a> <ul class=\"js-mainSubNav nav__menu-item-subnav is-hidden@desktop\"></ul> </li> ";
},"4":function(container,depth0,helpers,partials,data) {
    return "js-drawerSubNav";
},"6":function(container,depth0,helpers,partials,data) {
    return "data-dpz-track-evt-pagename=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.dataDPZTrackEvtPageName : depth0), depth0))
    + "\" ";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].isEcom67857ExperienceB : depths[1]),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return " navigation-deals__icon";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].isEcom67857ExperienceC : depths[1]),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return " <span class=\"js-dealsBadge navigation-deals__quantity-badge\">"
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].dealsCount : depths[1]), depth0))
    + "</span> ";
},"14":function(container,depth0,helpers,partials,data) {
    return " <li class=\"nav__menu-item\" id=\"js-storeAssistanceModule\"><!-- !!! --></li> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"nav__menu-item nav__logo\" data-show-sam=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.shouldShowSam : depth0), depth0))
    + "\"> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.logoLink : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </li> "
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.mainNavigation : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.shouldShowSam : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true}) };
    });