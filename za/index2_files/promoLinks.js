define("markettemplates/promoLinks", ["handlebars.runtime"], function(Handlebars) {
      return ({ name: "promoLinks", template: Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression;

  return "  <!-- BEGIN CA Changes <div class=\"footer__promo footer__promo--coke\"> <img src=\""
    + alias3(alias2((depth0 != null ? depth0.assets_ctx : depth0), depth0))
    + "/images/img/footer-links/dpz-coke.png\" alt=\"Coca-Cola -- Complete your Order with a Drink\" /> </div> <div class=\"footer__promo footer__promo--dairy\"> <a href=\"https://dairygood.org/undeniably-dairy?utm_source=Dominos&utm_medium=Owned&utm_content=Owned_Dominos_Organic_Reintro_UDLink&utm_campaign=Reintro\"> <img src=\""
    + alias3(alias2((depth0 != null ? depth0.assets_ctx : depth0), depth0))
    + "/images/img/footer-links/dpz-dairy.png\" alt=\"Delivering Dairy Goodness\" /> </a> </div> END CA Changes -->";
},"useData":true}) })
    });