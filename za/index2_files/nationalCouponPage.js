define("markettemplates/nationalCouponPage", ["marketconfig/dpz.lang.nationalCoupon", "handlebars.runtime"], function(nationalCouponStrings, Handlebars) {
      return { name: "nationalCouponPage", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " <div class=\"js-couponList\" data-quid=\"national-coupon-list\"></div> <div class=\"js-couponTxt\" data-quid=\"national-coupon-text\"></div> ";
},"3":function(container,depth0,helpers,partials,data) {
    return " <div class=\"js-couponTxt\" data-quid=\"national-coupon-text\"></div> <div class=\"js-couponList\" data-quid=\"national-coupon-list\"></div> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"grid grid--no-gutter\"> <div class=\"grid__cell--1 grid__cell--3/4@desktop grid__cell--offset-1/8@desktop\"> <h1 class=\"national-coupon__heading stackAttack\"> "
    + container.escapeExpression(helpers.t.call(
      alias2,
      "nationalCoupon.pageHeader",
      {"name":"t","hash":{},"data":data},
      nationalCouponStrings
  ))
    + " </h1> </div> </div> <div class=\"js-couponEnterCode\" data-quid=\"national-coupon-enter-code\"></div> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.showNationalCouponsFirst : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true}) };
    });