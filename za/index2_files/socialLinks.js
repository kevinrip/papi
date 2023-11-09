define("markettemplates/socialLinks", ["marketconfig/dpz.lang.socialLinks", "handlebars.runtime"], function(socialLinksStrings, Handlebars) {
      return { name: "socialLinks", template: Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return " <ul class=\"footer__group footer__social\"> "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.facebookUrl : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.twitterUrl : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.pinterestUrl : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.instagramUrl : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.tumblrUrl : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.whatsappUrl : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.youtubeUrl : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.tiktokUrl : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias2,(depth0 != null ? depth0.linkedinUrl : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </ul> ";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--facebook js-footer-fb-btn fb-btn\" data-quid=\"footer__social-item--facebook\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.facebookUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\"> <div class=\"fb-like\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.facebook",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" role=\"img\" data-href=\"\" data-send=\"false\" data-layout=\"button_count\" data-show-faces=\"false\" data-dpz-icon=\"facebook\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.facebook",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\"></div> </a></li> ";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--twitter js-footer-tw-btn tw-btn\" data-quid=\"footer__social-item--twitter\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.twitterUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\" class=\"twitter-follow-button\" data-show-count=\"false\" data-show-screen-name=\"false\" data-width=\"65px\"> <div role=\"img\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.twitter",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.twitter",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" data-dpz-icon=\"twitter\"></div> </a></li> ";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--pinterest js-footer-pt-btn pt-btn\" data-quid=\"footer__social-item--pinterest\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.pinterestUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\"> <div class=\"\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.pinterest",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" role=\"img\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.pinterest",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" data-size=\"medium\" data-annotation=\"none\" data-recommendations=\"false\" data-href=\"\" data-dpz-icon=\"pinterest\"></div> </a></li> ";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--instagram js-footer-ig-btn ig-btn\" data-quid=\"footer__social-item--instagram\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.instagramUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\"> <div class=\"\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.instagram",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" role=\"img\" data-size=\"medium\" data-annotation=\"none\" data-recommendations=\"false\" data-href=\"\" data-dpz-icon=\"instagram\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.instagram",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\"></div> </a></li> ";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--tumblr js-footer-tm-btn tm-btn\" data-quid=\"footer__social-item--tumblr\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.tumblrUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\"> <div class=\"\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.tumblr",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" role=\"img\" data-size=\"medium\" data-annotation=\"none\" data-recommendations=\"false\" data-href=\"\" data-dpz-icon=\"tumblr\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.tumblr",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\"></div> </a></li> ";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--whatsapp js-footer-ig-btn ig-btn\" data-quid=\"footer__social-item--whatsapp\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.whatsappUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\"> <div class=\"\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.whatsapp",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" role=\"img\" data-size=\"medium\" data-annotation=\"none\" data-recommendations=\"false\" data-href=\"\" data-dpz-icon=\"whatsapp\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.whatsapp",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\"></div> </a></li> ";
},"14":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--youtube js-footer-yt-btn yt-btn\" data-quid=\"footer__social-item--youtube\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.youtubeUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\" > <div class=\"\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.youtube",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" role=\"img\" data-size=\"medium\" data-annotation=\"none\" data-recommendations=\"false\" data-href=\"\" data-dpz-icon=\"youtube\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.youtube",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\"></div> </a></li> ";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--tiktok js-footer-tk-btn tk-btn\" data-quid=\"footer__social-item--tiktok\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.tiktokUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\" class=\"tiktok-follow-button\" data-show-count=\"false\" data-show-screen-name=\"false\" data-width=\"65px\"> <div role=\"img\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.tiktok",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.tiktok",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" data-dpz-icon=\"tiktok\"></div> </a></li> ";
},"18":function(container,depth0,helpers,partials,data) {
    var alias1=container.propertyIsEnumerable, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return " <li class=\"footer__social-item footer__social-item--linkedin js-footer-tw-btn tw-btn\" data-quid=\"footer__social-item--linkedin\"><a href=\""
    + alias2(container.lambda((depth0 != null ? depth0.linkedinUrl : depth0), depth0))
    + "\" target=\"_blank\" data-dpz-track-evt-name=\"social media\" class=\"linkedin-follow-button\" data-show-count=\"false\" data-show-screen-name=\"false\" data-width=\"65px\"> <div role=\"img\" aria-label=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.linkedin",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" title=\""
    + alias2(helpers.t.call(
    alias3,
    "socialLinks.linkedin",
    {"name":"t","hash":{},"data":data},
    socialLinksStrings
  ))
    + "\" data-dpz-icon=\"linkedin\"></div> </a></li> ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = helpers.ifKillSwitch.call(depth0 != null ? depth0 : (container.nullContext || {}),"socialLinks",{"name":"ifKillSwitch","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true}) };
    });