define("markettemplates/v2018Homepage", [
    "marketconfig/dpz.lang.home",
    "marketconfig/dpz.lang.navigation",
    "handlebars.runtime",
    "dpz.template",
    "dpz.layout",
    "markettemplates/homePagePromoFilter",
    "markettemplates/homePagePromoFilter-CA"
], function(homeStrings, navigationStrings, Handlebars, dpzTemplate, dpzLayout) {
    for (var _len = arguments.length, partials = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      partials[_key - 5] = arguments[_key];
    }
    dpzTemplate.set(partials.map(function (partial) {
      var name = partial.name;
      var template = partial.template;
      return {
        name: name,
        template: dpzLayout.create(template)
      };
    }));
    return { name: "v2018Homepage", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

return " <section class=\"card__contactless-alert home__contactless-alert\" role=\"alert\"> "
  + ((stack1 = helpers["if"].call(alias2,((stack1 = (depth0 != null ? depth0.contactless : depth0)) != null ? stack1.available : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " "
  + ((stack1 = helpers["if"].call(alias2,((stack1 = (depth0 != null ? depth0.contactless : depth0)) != null ? stack1.required : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " "
  + ((stack1 = helpers["if"].call(alias2,((stack1 = (depth0 != null ? depth0.contactless : depth0)) != null ? stack1.required_cashless : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " </section> ";
},"2":function(container,depth0,helpers,partials,data) {
  return " "
  + container.escapeExpression(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "home.contactless_delivery_available",
      {"name":"t","hash":{},"data":data},
      homeStrings
  ))
  + " ";
},"4":function(container,depth0,helpers,partials,data) {
  return " "
  + container.escapeExpression(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "home.contactless_delivery_required",
      {"name":"t","hash":{},"data":data},
      homeStrings
  ))
  + " ";
},"6":function(container,depth0,helpers,partials,data) {
  return " "
  + container.escapeExpression(helpers.t.call(
      depth0 != null ? depth0 : (container.nullContext || {}),
      "home.contactless_delivery_required_cashless",
      {"name":"t","hash":{},"data":data},
      homeStrings
  ))
  + " ";
},"8":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression, alias4=depth0 != null ? depth0 : (container.nullContext || {});

return " <li class=\"js-mobileNav"
  + alias3(alias2((data && data.index), depth0))
  + "\"> <a "
  + ((stack1 = helpers["if"].call(alias4,(depth0 != null ? depth0.dataQuid : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " href=\""
  + alias3(helpers.makeLink.call(alias4,(depth0 != null ? depth0.url : depth0),{"name":"makeLink","hash":{},"data":data}))
  + "\" class=\"btn btn--block btn--large c-site-nav-main-link-"
  + alias3(alias2((data && data.index), depth0))
  + "-mobile action-ctas__icon "
  + alias3(alias2((depth0 != null ? depth0.anchorClass : depth0), depth0))
  + "\"> "
  + ((stack1 = alias2((depth0 != null ? depth0.text : depth0), depth0)) != null ? stack1 : "")
  + " </a> </li> ";
},"9":function(container,depth0,helpers,partials,data) {
  return " data-quid=\""
  + container.escapeExpression(container.lambda((depth0 != null ? depth0.dataQuid : depth0), depth0))
  + "\" ";
},"11":function(container,depth0,helpers,partials,data) {
  return "promos--footer";
},"13":function(container,depth0,helpers,partials,data) {
  return "  ";
},"15":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression, alias4=container.lambda;

return " <li> <a "
  + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.dataQuid : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " href=\""
  + alias3(helpers.makeLink.call(alias2,(depth0 != null ? depth0.url : depth0),{"name":"makeLink","hash":{},"data":data}))
  + "\" class=\"btn btn--block btn--large c-site-nav-main-link-"
  + alias3(alias4((data && data.index), depth0))
  + "-mobile action-ctas__icon "
  + alias3(alias4((depth0 != null ? depth0.anchorClass : depth0), depth0))
  + "\"> "
  + ((stack1 = alias4((depth0 != null ? depth0.text : depth0), depth0)) != null ? stack1 : "")
  + " </a> </li> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
  var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.escapeExpression, alias4=container.lambda;

return " <!-- Begin CA change - added aria-label --> <main role=\"main\" class=\"main home\" aria-label=\"main content\"> <!-- End CA change --> "
  + ((stack1 = helpers.ifKillSwitch.call(alias2,"ee8acec3-6b14-41a6-a171-e186af59f387",{"name":"ifKillSwitch","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + "  <section data-quid=\"start-your-order-desktop\" role=\"banner\" aria-label=\"start your order\" class=\"home-section home-section--start-order home-section--start-order-desktop js-smartOrder is-hidden is-visible@desktop\"> </section>  <!-- Begin CA change - added aria-label --> <section role=\"region\" aria-label=\"order settings\" class=\"js-orderSettings is-hidden@handheld\"></section> <!-- End CA change --> <!-- Begin CA change - added aria-label --> <section role=\"region\" aria-label=\"mobile home navigation\" class=\"home-section home-section--buttons-top is-hidden@desktop\"> <!-- End CA change --> <ul> "
  + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.mobileNavTop : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " </ul> </section>  <div class=\"block block--aspect-ratio block110 promo\" data-number=\"110\" data-image-type=\"footer\" data-quid=\"block110\"></div>   <section role=\"contentinfo\" aria-label=\"promotions\" class=\"home-section home-section--promos promos js-promos\">  "
  + alias3(helpers.prt.call(alias2,"homePagePromoFilter",{"name":"prt","hash":{},"data":data}))
  + " <!-- Begin CA change --> "
  + alias3(helpers.prt.call(alias2,"homePagePromoFilter-CA",{"name":"prt","hash":{},"data":data}))
  + " <!-- End CA Change --> <div class=\"block block--aspect-ratio block0 promo promo--hero\" data-number=\"0\" data-image-type=\"hero\" data-quid=\"block0\"></div> <div class=\"block block--aspect-ratio block1 promo\" data-number=\"1\" data-image-type=\"side\" data-quid=\"block1\"> </div> <div class=\"block block--aspect-ratio block2 promo\" data-number=\"2\" data-image-type=\"side\" data-quid=\"block2\"> </div> <div class=\"block block--aspect-ratio block3 promo is-hidden\" data-number=\"3\" data-image-type=\"side\" data-quid=\"block3\"></div> </section> <!-- Begin CA change - added aria-label --> <section role=\"region\" aria-label=\"promotions\" class=\"home-section js-home-touts__bottom "
  + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.isHandheld : depth0),{"name":"unless","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + "\"> <!-- End CA change --> <!-- Begin CA change --> <div class=\"block block6\" data-number=\"6\" data-image-type=\"footer\" data-quid=\"block6\"></div> <div class=\"block block--aspect-ratio block112 promo\" data-number=\"111\" data-image-type=\"footer\" data-quid=\"block112\"></div>  <div class=\"block block7\" data-number=\"7\" data-image-type=\"footer\" data-quid=\"block7\"></div>  <div class=\"block block--aspect-ratio block111 promo\" data-number=\"111\" data-image-type=\"footer\" data-quid=\"block111\"> </div>   <div class=\"block block114 is-hidden\" data-number=\"114\" data-image-type=\"footer\" data-quid=\"block114\"></div>  <div class=\"block block8 is-hidden\" data-number=\"8\" data-image-type=\"footer\" data-quid=\"block8\"></div><div class=\"block block9 is-hidden\" data-number=\"9\" data-image-type=\"footer\" data-quid=\"block9\"></div>  <div class=\"block block11 is-hidden\" data-number=\"11\" data-image-type=\"footer\" data-quid=\"block11\"></div> <div class=\"block block12 is-hidden\" data-number=\"12\" data-image-type=\"footer\" data-quid=\"block12\"></div> <div class=\"block block13 is-hidden\" data-number=\"13\" data-image-type=\"footer\" data-quid=\"block13\"></div>  <div class=\"block block16 is-hidden\" data-number=\"16\" data-image-type=\"footer\" data-quid=\"block16\"></div> <div class=\"block block17 is-hidden\" data-number=\"17\" data-image-type=\"footer\" data-quid=\"block17\"></div>  </section> "
  + ((stack1 = helpers.unless.call(alias2,(depth0 != null ? depth0.isWAMCampaign : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " <!--  BEGIN CA CHANGES - DNP-1308 --> <div class=\"disclaimer-location grid grid--no-gutter\"> <div class=\"grid__cell--two-fifths disclaimer-location__content-grid-cell grid__cell--handheld--one\"> <h3 class=\"disclaimer-location__title\">"
  + alias3(helpers.t.call(
    alias2,
    "home.disclaimer_prices_may_vary",
    {"name":"t","hash":{},"data":data},
    homeStrings
))
  + "</h3> <p class=\"disclaimer-location__content\">"
  + alias3(helpers.t.call(
    alias2,
    "home.disclaimer_handmade_pan_pizza",
    {"name":"t","hash":{},"data":data},
    homeStrings
))
  + "</p> </div> <div class=\"grid__cell--one-eighth disclaimer-location__logo-grid-cell\"> <img src=\""
  + alias3(alias4((depth0 != null ? depth0.market_assets_ctx : depth0), depth0))
  + "/images/img/dpc_logo-tm.svg\" alt=\"Domino's Pizza\" /> </div> <div class=\"grid__cell--two-fifths disclaimer-location__content-grid-cell grid__cell--handheld--one\"> <h3 class=\"disclaimer-location__title\">"
  + alias3(helpers.t.call(
    alias2,
    "home.disclaimer_over_number_locations",
    {"name":"t","hash":{},"data":data},
    homeStrings
))
  + "</h3> <p class=\"disclaimer-location__content\">"
  + alias3(helpers.t.call(
    alias2,
    "home.disclaimer_no_registration_or_credit_card",
    {"name":"t","hash":{},"data":data},
    homeStrings
))
  + "</p> </div> </div> <!--  END CA CHANGES - DNP-1308 --> <!--  BEGIN CA CHANGES <section role=\"region\" class=\"home-section home-section--menu\"> <div class=\"menu is-hidden is-visible@desktop\"> <header class=\"home-section__header\"> <h2 class=\"home-section__title\">"
  + alias3(helpers.t.call(
    alias2,
    "home.browse_our_menu",
    {"name":"t","hash":{},"data":data},
    homeStrings
))
  + "</h2> </header> <div class=\"menu__tile\"> <a href=\""
  + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
  + "/pages/order/menu\" class=\"btn menu__tile-cta js-fullMenu\">"
  + alias3(helpers.t.call(
    alias2,
    "home.view_full_menu",
    {"name":"t","hash":{},"data":data},
    homeStrings
))
  + "</a> </div> </div> </section> END CA CHANGES --> <!-- Begin CA change - added aria-label --> <section role=\"region\" aria-label=\"mobile navigation\" class=\"home-section home-section--buttons-bottom is-hidden@desktop \"> <!-- End CA change --> <ul class=\"action-ctas js-navButtonsBottom\"> "
  + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.mobileNavBottom : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
  + " </ul> </section> <!-- Begin CA change - added aria-label --> <section data-quid=\"start-your-order-handheld\" role=\"region\" aria-label=\"start your order\" class=\"home-section home-section--start-order home-section--start-order-handheld js-smartOrder is-hidden@desktop\"> <!-- End CA change -->  </section> <!--  BEGIN CA CHANGES <nav role=\"navigation\" class=\"nav nav--secondary\" aria-label=\"secondary\"> <ul class=\"nav__group\"> <li class=\"nav__menu-item is-hidden is-visible@desktop\"> <a href=\""
  + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
  + "/pages/order/?locations=1#!/locations/\"> "
  + alias3(helpers.t.call(
    alias2,
    "navigation.locations",
    {"name":"t","hash":{},"data":data},
    navigationStrings
))
  + " </a> </li> <li class=\"nav__menu-item\"> <a href=\""
  + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
  + "/pages/content/opt-in/opt-in\"> "
  + alias3(helpers.t.call(
    alias2,
    "navigation.offers",
    {"name":"t","hash":{},"data":data},
    navigationStrings
))
  + " </a> </li> <li class=\"nav__menu-item\"> <a href=\""
  + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
  + "/pages/giftcard/\"> "
  + alias3(helpers.t.call(
    alias2,
    "navigation.gift_cards",
    {"name":"t","hash":{},"data":data},
    navigationStrings
))
  + " </a> </li> <li class=\"nav__menu-item is-hidden is-visible@desktop\"> <a href=\""
  + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
  + "/pages/tracker/#!/track/order/\"> "
  + alias3(helpers.t.call(
    alias2,
    "navigation.tracker",
    {"name":"t","hash":{},"data":data},
    navigationStrings
))
  + " </a> </li> <li class=\"nav__menu-item\"> <a href=\""
  + alias3(alias4((depth0 != null ? depth0.ctx : depth0), depth0))
  + "/pages/content/nutritional/nutrition\"> "
  + alias3(helpers.t.call(
    alias2,
    "navigation.nutrition",
    {"name":"t","hash":{},"data":data},
    navigationStrings
))
  + " </a> </li> </ul> </nav> END CA CHANGES --> </main>";
},"useData":true}) };
});