define("markettemplates/homePagePromoFilter", ["handlebars.runtime"], function(Handlebars) {
      return ({ name: "homePagePromoFilter", template: Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<!-- Begin CA change - no actual code change here but this file is needed in this directory for the featured promo --> <svg aria-hidden=\"true\" class=\"promo__price__filter\" focusable=\"false\" viewbox=\"0 0 0 0\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" > <filter id=\"price-stroke\"> <feMorphology in=\"SourceGraphic\" operator=\"dilate\" radius=\"2\" result=\"expand\" /> <feFlood flood-color=\"#e31837\" /> <feComposite in2=\"expand\" operator=\"in\" result=\"expand\" /> <feMerge> <feMergeNode in=\"expand\" /> <feMergeNode in=\"SourceGraphic\" /> </feMerge> </filter> </svg> ";
},"useData":true}) })
    });