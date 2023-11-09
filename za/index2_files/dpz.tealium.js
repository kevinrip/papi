define("dpz.tealium", ["dpz.tealiumAdapterOverride"], function (tealiumAdapterOverride) {
  // BEGIN CA Modification
  var tealiumProfile;
  var tealiumEnv;
  var tealium = tealiumAdapterOverride; // CA Modification

  var moduleInitialized = false;
  var isEnabled = true;
  var views = [];
  var links = [];

  function init(_ref) {
    var _ref$links = _ref.links,
        preInitLinks = _ref$links === void 0 ? [] : _ref$links,
        _ref$views = _ref.views,
        preInitViews = _ref$views === void 0 ? [] : _ref$views,
        updateData = _ref.updateData;

    // TODO: It should wait for dpz.market, but if you require again the module everything breaks
    if (!killConfig.isMarketEnabled("tealium")) {
      isEnabled = false;
      return;
    }

    switch (dpz.market.marketCode) {
      case "US":
        tealiumProfile = "main";
        break;
      // BEGIN CA Modification

      case "CA":
        tealiumProfile = "canada";
        break;
      // END CA Modification

      default:
        tealiumProfile = "golo";
    }

    switch (envConfig) {
      case "nolo-us-preprod":
      case "nolo-us-qa":
      case "golo-qa":
      case "golo-preprod":
      case "nolo-ca-qa":
      case "nolo-ca-preprod":
        tealiumEnv = "qa";
        break;

      case "golo-de-prod1":
      case "golo-de-prod2":
      case "golo-prod1":
      case "golo-prod2":
      case "golo-va-prod1":
      case "golo-va-prod2":
      case "golo02-az-eu-north-prod1":
      case "golo02-az-eu-north-prod2":
      case "golo02-az-eu-west-prod1":
      case "golo02-az-eu-west-prod2":
      case "nolo-ca-prod":
      case "nolo-us-prod":
        tealiumEnv = "prod";
        break;

      default:
        tealiumEnv = "dev";
        break;
    } // TODO: Fix the utag to work as an actual module
    // BEGIN CA DNP-1232 - Force update of tealium "d" parameter
    // Ensure internal udo object has the most up-to-date order_grand_total for the confirmation page only


    if (site.isConfirmationPage) {
      var udoInterval = setInterval(function () {
        if (!$.isEmptyObject(site.data.lastOrder)) {
          //assignment of order_grand_total so tealium has access to this specific data point
          window.utag_data.order_grand_total = site.data.lastOrder.Details.Amounts.Customer;
          window.utag_data.order_subtotal = site.data.lastOrder.Details.Amounts.FoodAndBeverage;
          window.utag_data.order_id = site.data.lastOrder.Details.OrderID;
          tealium.init(tealiumProfile, tealiumEnv, updateData, false);
          finalizeInit(preInitLinks, preInitViews); // BEGIN CA call refacored code

          clearInterval(udoInterval);
        }
      }, 100);
    } else {
      tealium.init(tealiumProfile, tealiumEnv, updateData, false);
      finalizeInit(preInitLinks, preInitViews); // BEGIN CA call refacored code
    } // END CA - Force update of tealium d parameter

  } // BEGIN CA - refactor some code for reuse and so it is moved up to each if/then branch to avoid timing problems


  function finalizeInit(preInitLinks, preInitViews) {
    moduleInitialized = true;
    links = links.concat(preInitLinks);
    views = views.concat(preInitViews);
    links.forEach(tealium.link);
    views.forEach(tealium.view);
  }

  function link(data) {
    if (!moduleInitialized && isEnabled) {
      links.push(data);
      return;
    }

    if (isEnabled) tealium.link(data);
  }

  function view(data) {
    if (!moduleInitialized && isEnabled) {
      views.push(data);
      return;
    }

    if (isEnabled) tealium.view(data);
  }

  return {
    init: init,
    link: link,
    view: view
  };
});
//# sourceMappingURL=dpz.tealium.js.map
