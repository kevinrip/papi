define("markettemplates/nationalCouponTxt", ["marketconfig/dpz.lang.nationalCoupon", "handlebars.runtime"], function(nationalCouponStrings, Handlebars) {
      return { name: "nationalCouponTxt", template: Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression;

  return " <div class=\"card\"> <header class=\"card__header\"> <h3 class=\"card__title\"> "
    + alias3(helpers.t.call(
    alias2,
    "nationalCoupon.localHeader",
    {"name":"t","hash":{},"data":data},
    nationalCouponStrings
  ))
    + " </h3> </header> <div class=\"coupon-message coupon-message--cardboard\"> <p class=\"informationText coupon-message__body\"> "
    + alias3(helpers.t.call(
    alias2,
    "nationalCoupon.more_coupon_text",
    {"name":"t","hash":{},"data":data},
    nationalCouponStrings
  ))
    + " </p> <a class=\"btn coupon-message__cta\" href=\""
    + alias3(container.lambda((depth0 != null ? depth0.ctx : depth0), depth0))
    + "/pages/order/#!/section/Coupons/category/All/?localCoupons=true\"> "
    + alias3(helpers.t.call(
    alias2,
    "nationalCoupon.coupon_cta",
    {"name":"t","hash":{},"data":data},
    nationalCouponStrings
  ))
    + " </a> </div> </div>";
},"useData":true}) };
    });