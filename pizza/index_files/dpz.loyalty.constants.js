define("dpz.loyalty.constants", function () {
  var CAMPAIGN_ERROR_TOPIC = "loyalty.campaign.error";
  var CAMPAIGN_VARIANT_CODES = {
    SCB: "scb",
    BREADTWISTS: "breadtwists",
    TOTS: "tots"
  };
  /* Use this to filter out inactive campaign codes */

  var ACTIVE_CAMPAIGN_VARIANT_CODES = [CAMPAIGN_VARIANT_CODES.TOTS];
  /* START OFFER CONFIGS */

  var breadBurns = {
    offerId: "breadburns",
    label: {
      scb: {
        offerType: "stuffed cheesy bread",
        pointsCost: "40",
        showLegalText: false
      },
      breadtwists: {
        offerType: "bread twists",
        pointsCost: "30",
        showLegalText: true
      }
    },
    promotionCodes: ["scb", "breadtwists"],
    taggingCouponCode: "",
    customSort: function customSort(loyaltyOfferCodes) {
      var newCodes = loyaltyOfferCodes;
      var GARLIC_BREAD_TWIST_CODE = "B8PCGT";
      var garlicIndex = newCodes.indexOf(GARLIC_BREAD_TWIST_CODE);

      if (garlicIndex > -1) {
        newCodes.splice(garlicIndex, 1);
        newCodes.unshift(GARLIC_BREAD_TWIST_CODE);
      }

      var FETA_CHEESY_BREAD_CODE = "B8PCSSF";
      var fetaIndex = newCodes.indexOf(FETA_CHEESY_BREAD_CODE);

      if (fetaIndex > -1) {
        newCodes.splice(fetaIndex, 1);
        newCodes.push(FETA_CHEESY_BREAD_CODE);
      }

      return newCodes;
    }
  };
  var tots = {
    offerId: "tots",
    label: {
      tots: {
        offerType: "tots",
        pointsCost: "40",
        showLegalText: false
      }
    },
    promotionCodes: ["tots"],
    taggingCouponCode: "LTY027"
  };
  /* END OFFER CONFIGS */

  return {
    CAMPAIGN_ERROR_TOPIC: CAMPAIGN_ERROR_TOPIC,
    ACTIVE_CAMPAIGN_VARIANT_CODES: ACTIVE_CAMPAIGN_VARIANT_CODES,
    LOYALTY_CAMPAIGNS: {
      breadBurns: breadBurns,
      tots: tots
    }
  };
});
//# sourceMappingURL=dpz.loyalty.constants.js.map
