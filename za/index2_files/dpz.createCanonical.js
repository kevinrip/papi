define("dpz.createCanonical", [], function () {
  var createCanonical = function createCanonical() {
    var canonical = document.createElement("a");
    canonical.href = document.location.href; // Make sure we make these meta tags point to production

    canonical.host = "www.".concat(dpz.market.marketConfig["market-identification"].urls[0]);
    canonical.port = 443;
    canonical.protocol = "https";
    var multiLang = Object.keys(dpz.market.languages).length > 1;

    if (multiLang) {
      if (!canonical.pathname.match(/^\/\w\w\//)) {
        // market supports multiple languages but we're currently in a
        // path whose first segment is not the two letter language code
        // so we're adding it in
        canonical.pathname = "/".concat(dpz.market.activeLanguageCode).concat(canonical.pathname);
      }
    }

    canonical.pathname = canonical.pathname.replace(/(?:index)?.html$/, ""); // canonicals shouldn't have query params

    canonical.search = "";
    return canonical.href;
  };

  return {
    createCanonical: createCanonical
  };
});
//# sourceMappingURL=dpz.createCanonical.js.map
