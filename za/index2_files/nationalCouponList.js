define("markettemplates/nationalCouponList", [
    "marketconfig/dpz.lang.nationalCoupon",
    "handlebars.runtime",
    "dpz.template",
    "dpz.layout",
    "markettemplates/homePagePromoFilter"
], function(nationalCouponStrings, Handlebars, dpzTemplate, dpzLayout) {
    for (var _len = arguments.length, partials = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
      partials[_key - 4] = arguments[_key];
    }
    dpzTemplate.set(partials.map(function (partial) {
      var name = partial.name;
      var template = partial.template;
      return {
        name: name,
        template: dpzLayout.create(template)
      };
    }));
    return { name: "nationalCouponList", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
  return " <div class=\"block block10 promo promo--featured\" data-number=\"10\" data-image-type=\"featured\"></div> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression;

return " <div class=\"card\"> "
  + alias3(helpers.prt.call(alias2,"homePagePromoFilter",{"name":"prt","hash":{},"data":data}))
  + " <header class=\"card__header\"> <h2 class=\"card__title\">"
  + alias3(helpers.t.call(
    alias2,
    "nationalCoupon.nationalHeader",
    {"name":"t","hash":{},"data":data},
    nationalCouponStrings
))
  + "</h2> </header> <div class=\"national-coupon__list\"> <div id=\"couponPage\" data-dpz-track-group=\"coupons-banners\"> "
  + ((stack1 = helpers.ifKillSwitch.call(alias2,"wamActive",{"name":"ifKillSwitch","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " <div class=\"block block0 promo promo--featured\" data-number=\"0\" data-image-type=\"featured\"></div> <div class=\"block block1 promo promo--featured\" data-number=\"1\" data-image-type=\"featured\"></div> <div class=\"block block2 promo promo--featured\" data-number=\"2\" data-image-type=\"featured\"></div> <div class=\"block block3 promo promo--featured\" data-number=\"3\" data-image-type=\"featured\"></div> <div class=\"block block4 promo promo--featured\" data-number=\"4\" data-image-type=\"featured\"></div> <div class=\"block block5 promo promo--featured\" data-number=\"5\" data-image-type=\"featured\"></div> <div class=\"block block6 promo promo--featured\" data-number=\"6\" data-image-type=\"featured\"></div> </div> </div> </div>";
},"useData":true}) };
});