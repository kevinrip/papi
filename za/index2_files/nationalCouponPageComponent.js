define("markettemplates/nationalCouponPageComponent", ["handlebars.runtime"], function(Handlebars) {
      return ({ name: "nationalCouponPageComponent", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "data-dpz-segment-track-name=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.dpzTrackName : depth0), depth0))
    + "\"";
},"3":function(container,depth0,helpers,partials,data) {
    return "data-dpz-segment-track-position=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.dpzTrackPosition : depth0), depth0))
    + "\"";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " data-dpz-segment-track-creative=\""
    + alias3(alias2((depth0 != null ? depth0.dpzTrackEvtName : depth0), depth0))
    + "\" data-dpz-segment-track-evt-name=\""
    + alias3(alias2((depth0 != null ? depth0.dpzTrackEvtName : depth0), depth0))
    + "\" ";
},"7":function(container,depth0,helpers,partials,data) {
    return "data-dpz-track-evt-pagename=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.dpzEventTrackingPageName : depth0), depth0))
    + "\"";
},"9":function(container,depth0,helpers,partials,data) {
    return " <div class=\"js-configDrivenCoupon\"></div> ";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.image : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <img src=\""
    + alias3(alias2((depth0 != null ? depth0.image : depth0), depth0))
    + "\" alt=\""
    + alias3(alias2((depth0 != null ? depth0.alt : depth0), depth0))
    + "\"> ";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"media__description is-hidden\">"
    + ((stack1 = container.lambda((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</div> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression, alias4=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\""
    + alias3(alias2((depth0 != null ? depth0.cssClass : depth0), depth0))
    + "\"> <a class=\""
    + alias3(alias2((depth0 != null ? depth0.tileClass : depth0), depth0))
    + "\" href=\""
    + alias3(alias2((depth0 != null ? depth0.ctx : depth0), depth0))
    + alias3(alias2((depth0 != null ? depth0.href : depth0), depth0))
    + "\" data-dpz-segment-track-event-name=\"Promotion Clicked\" "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.dpzTrackName : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.dpzTrackName : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.dpzTrackEvtName : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.dpzEventTrackingPageName : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " data-couponcode=\""
    + alias3(alias2((depth0 != null ? depth0.couponCode : depth0), depth0))
    + "\"> "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.hasTextContent : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + " </a> </div>";
},"useData":true}) })
    });