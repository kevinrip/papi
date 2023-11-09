define("markettemplates/visualLanguagePicker", ["handlebars.runtime"], function(Handlebars) {
      return ({ name: "visualLanguagePicker", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <div class=\"media__image language-picker__dropdown-img\"> <img class=\"language-picker__dropdown-img\" src=\""
    + alias3(alias2((depth0 != null ? depth0.assets_ctx : depth0), depth0))
    + "/images/flags/"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.activeLanguage : depth0)) != null ? stack1.code : stack1), depth0))
    + ".svg\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.activeLanguage : depth0)) != null ? stack1.code : stack1), depth0))
    + "\"> </div> ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.activeLanguage : depth0)) != null ? stack1.flag : stack1), depth0))
    + " ";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.lambda, alias4=container.escapeExpression;

  return " "
    + ((stack1 = helpers.unless.call(alias2,(depths[1] != null ? depths[1].emojiSupported : depths[1]),{"name":"unless","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\""
    + ((stack1 = helpers.unless.call(alias2,(depths[1] != null ? depths[1].emojiSupported : depths[1]),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + " language-picker__dropdown-text\"> <a href=\"/"
    + alias4(alias3((depth0 != null ? depth0.code : depth0), depth0))
    + alias4(alias3((depths[1] != null ? depths[1].langExcludedRelativeUrl : depths[1]), depth0))
    + "\" data-quid=\"language-picker__btn--"
    + alias4(alias3((depth0 != null ? depth0.code : depth0), depth0))
    + "\">"
    + ((stack1 = helpers["if"].call(alias2,(depths[1] != null ? depths[1].emojiSupported : depths[1]),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</a> </div> "
    + ((stack1 = helpers.unless.call(alias2,(depths[1] != null ? depths[1].emojiSupported : depths[1]),{"name":"unless","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return " <div class=\"media--horizontal language-picker__dropdown-content-item\"> <div class=\"media__image language-picker__dropdown-img\"> <a href=\"/"
    + alias3(alias2((depth0 != null ? depth0.code : depth0), depth0))
    + alias3(alias2((depths[1] != null ? depths[1].langExcludedRelativeUrl : depths[1]), depth0))
    + "\" data-quid=\"language-picker__btn--"
    + alias3(alias2((depth0 != null ? depth0.code : depth0), depth0))
    + "\"> <img class=\"language-picker__dropdown-img\" src=\""
    + alias3(alias2((depths[1] != null ? depths[1].assets_ctx : depths[1]), depth0))
    + "/images/flags/"
    + alias3(alias2((depth0 != null ? depth0.code : depth0), depth0))
    + ".svg\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.activeLanguage : depth0)) != null ? stack1.code : stack1), depth0))
    + " \"> </a> </div> ";
},"8":function(container,depth0,helpers,partials,data) {
    return "media__body";
},"10":function(container,depth0,helpers,partials,data) {
    return "language-picker__dropdown-content-item--emoji";
},"12":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.flag : depth0), depth0))
    + " ";
},"14":function(container,depth0,helpers,partials,data) {
    return " </div> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"language-picker__dropdown\"> <div class=\"media--horizontal language-picker__dropbtn js-languagePickerDropbtn\" data-quid=\"language-picker__dropbtn\"> "
    + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.emojiSupported : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"media__body language-picker__dropbtn-text\"> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.emojiSupported : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> </div> <div class=\"language-picker__dropdown-content js-languagePickerDropdownContent is-hidden\"> "
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.languages : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div> </div>";
},"useData":true,"useDepths":true}) })
    });