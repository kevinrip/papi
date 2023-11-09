define("markettemplates/headerProfile", ["handlebars.runtime", "dpz.template", "dpz.layout", "markettemplates/profileLoginBlock", "markettemplates/signInToast"], function(Handlebars, dpzTemplate, dpzLayout) {
    for (var _len = arguments.length, partials = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      partials[_key - 3] = arguments[_key];
    }
    dpzTemplate.set(partials.map(function (partial) {
      var name = partial.name;
      var template = partial.template;
      return {
        name: name,
        template: dpzLayout.create(template)
      };
    }));
    return ({ name: "headerProfile", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
  return " "
  + container.escapeExpression(helpers.prt.call(depth0 != null ? depth0 : (container.nullContext || {}),"signInToast",{"name":"prt","hash":{},"data":data}))
  + " ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

return " "
  + container.escapeExpression(helpers.prt.call(alias2,"profileLoginBlock",{"name":"prt","hash":{},"data":data}))
  + " "
  + ((stack1 = helpers.unlessKillSwitch.call(alias2,"boloCutOver",{"name":"unlessKillSwitch","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true}) })
});