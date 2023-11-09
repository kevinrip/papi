define("markettemplates/globalHomePageTile", ["handlebars.runtime"], function(Handlebars) {
      return ({ name: "globalHomePageTile", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " calorie-display";
},"3":function(container,depth0,helpers,partials,data) {
    return "home-touts__tile--wam";
},"5":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0));
},"7":function(container,depth0,helpers,partials,data) {
    return "data-dpz-segment-track-promotion_id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.tileName : depth0), depth0))
    + "\"";
},"9":function(container,depth0,helpers,partials,data) {
    return "data-dpz-segment-track-position=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.dpzTrackPosition : depth0), depth0))
    + "\"";
},"11":function(container,depth0,helpers,partials,data) {
    return "data-dpz-segment-track-name=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.alt : depth0), depth0));
},"13":function(container,depth0,helpers,partials,data) {
    return "data-dpz-segment-track-creative=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.dpzTrackEvtName : depth0), depth0))
    + "\"";
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable;

  return "target=\""
    + container.escapeExpression(helpers.chooseLinkTarget.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"chooseLinkTarget","hash":{"target":(depth0 != null ? depth0.target : depth0),"url":(depth0 != null ? depth0.href : depth0)},"data":data}))
    + "\" rel=\"noopener noreferrer\"";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return " "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFooterType : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(21, data, 0),"data":data})) != null ? stack1 : "")
    + " ";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return "  <div class=\"promo--light js-is-displayed-on--desktop js-is-displayed-on--handheld\"> <div class=\"promo--light__heading\"> <h2 class=\"promo--light__heading-text flag flag--blue\" data-quid=\""
    + alias3(alias2((depth0 != null ? depth0.quid : depth0), depth0))
    + "-h1\">"
    + alias3(alias2((depth0 != null ? depth0.textContentFlag : depth0), depth0))
    + "</h2> </div> <div class=\"promo--light__icon "
    + alias3(alias2((depth0 != null ? depth0.textContentIcon : depth0), depth0))
    + "\"></div> <div class=\"promo--light__copy\" data-quid=\""
    + alias3(alias2((depth0 != null ? depth0.quid : depth0), depth0))
    + "-copy\"> "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.textContentDetails : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> </div> ";
},"19":function(container,depth0,helpers,partials,data) {
    return " <div>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div> ";
},"21":function(container,depth0,helpers,partials,data) {
    return " <div class=\"js-configDrivenCoupon\"></div> ";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.lambda, alias4=container.escapeExpression;

  return "  "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.renderButton : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <img src=\""
    + alias4(alias3((depth0 != null ? depth0.image : depth0), depth0))
    + "\" alt=\""
    + alias4(alias3((depth0 != null ? depth0.alt : depth0), depth0))
    + "\"> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <div class=\"home-touts__btn-container home-touts__btn-container--"
    + alias3(alias2((depth0 != null ? depth0.tileName : depth0), depth0))
    + "\"> <button data-quid=\"btn-"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.quid : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "")
    + "\" class=\"btn is-hidden@handheld "
    + alias3(alias2((depth0 != null ? depth0.btnClass : depth0), depth0))
    + "\" type=\"button\">"
    + alias3(alias2((depth0 != null ? depth0.btnText : depth0), depth0))
    + "</button> </div> ";
},"25":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.quid : depth0), depth0));
},"27":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.tileName : depth0), depth0));
},"29":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <div class=\"media__description is-hidden\">"
    + ((stack1 = container.lambda((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</div> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression, alias4=depth0 != null ? depth0 : (container.nullContext || {});

  return " <!-- BEGIN CA - custom home page attributes --> <div class=\""
    + alias3(alias2((depth0 != null ? depth0.cssClass : depth0), depth0))
    + " home-touts__tile"
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.textContentDisplayCalorieInfo : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.isWamTile : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"> <!-- END CA - custom home page attributes  --> <a class=\""
    + alias3(alias2((depth0 != null ? depth0.tileClass : depth0), depth0))
    + " js-coupon\" href=\""
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.useContext : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias3(alias2((depth0 != null ? depth0.href : depth0), depth0))
    + "\" data-dpz-segment-track-event-name=\"Promotion Clicked\" "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.tileName : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.dpzTrackPosition : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.alt : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.dpzTrackEvtName : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " data-dpz-track-evt-name=\""
    + alias3(alias2((depth0 != null ? depth0.dpzTrackEvtName : depth0), depth0))
    + "_image\" data-wt-panelnumber=\""
    + alias3(alias2((depth0 != null ? depth0.trackingPanelNumber : depth0), depth0))
    + "\" data-wt-panelname=\""
    + alias3(alias2((depth0 != null ? depth0.trackingPanelName : depth0), depth0))
    + "\" data-couponcode=\""
    + alias3(alias2((depth0 != null ? depth0.couponCode : depth0), depth0))
    + "\" data-uri=\""
    + alias3(alias2((depth0 != null ? depth0.trackingUri : depth0), depth0))
    + "\" data-group=\""
    + alias3(alias2((depth0 != null ? depth0.trackingGroup : depth0), depth0))
    + "\" data-subgroup=\""
    + alias3(alias2((depth0 != null ? depth0.trackingSubGroup : depth0), depth0))
    + "\" data-quid=\""
    + alias3(alias2((depth0 != null ? depth0.quid : depth0), depth0))
    + "\" "
    + ((stack1 = helpers.ifUseLinkTarget.call(alias4,{"name":"ifUseLinkTarget","hash":{"target":(depth0 != null ? depth0.target : depth0),"url":(depth0 != null ? depth0.href : depth0)},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> "
    + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.hasTextContent : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(23, data, 0),"data":data})) != null ? stack1 : "")
    + " </a> </div>";
},"useData":true}) })
    });