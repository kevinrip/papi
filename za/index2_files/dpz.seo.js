define("dpz.seo", ["simplr", "marketconfig/dpz.lang.seo"], function (simplr, seoStrings) {
  return {
    /*
      Copied/pasted this from dpz.title.js and site.funcs.js.
      This uses the page's URL to generate a key and then searches
      seo.json for the closest match.
      
      Example, if your page URL is:
      https://localhost.dominos.com:8443/es/pages/order/#!/locations/search/?type=Carryout
       The SEO key becomes:
      /pages/order/#!/locations/search
       Using the key, we'll match anything in seo.json that starts with the key. This
      new matching will allow us to slowly migrate away from titles.json.
    */
    get: function get() {
      var langPathRegex = new RegExp("^(/".concat(dpz.market.activeLanguageCode, "/)"));
      var baseSeoKey = location.pathname.replace(langPathRegex, "/").replace("index.html", "");
      var withParamKey = "".concat(baseSeoKey).concat(location.search).concat(location.hash);
      var withoutParam = "".concat(baseSeoKey).concat(location.hash.split("?")[0].replace(/\/$/, ""));
      return seoStrings["seo.".concat(withParamKey)] || seoStrings["seo.".concat(withoutParam)] || seoStrings["seo.".concat(withoutParam, "/")] || seoStrings["seo./"];
    }
  };
});
//# sourceMappingURL=dpz.seo.js.map
