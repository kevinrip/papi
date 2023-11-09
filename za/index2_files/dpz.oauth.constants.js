define("dpz.oauth.constants", [], function () {
  var oauthScopes = {
    CREATE_CARD: "customer:card:create",
    CREATE: "customer:orderHistory:create",
    DELETE_CARD: "customer:card:delete",
    OPT_IN_OUT_EASY_ORDER: "easyOrder:optInOut",
    PLACE_ORDER_CARD_ON_FILE: "order:place:cardOnFile",
    READ_CARD: "customer:card:read",
    READ_EASY_ORDER: "easyOrder:read",
    READ_LOYALTY_HISTORY: "customer:loyaltyHistory:read",
    READ_LOYALTY: "customer:loyalty:read",
    READ_ORDER_HISTORY: "customer:orderHistory:read",
    READ_PROFILE_BASIC: "customer:profile:read:basic",
    READ_PROFILE_EXTENDED: "customer:profile:read:extended",
    UPDATE_CARD: "customer:card:update",
    UPDATE_ORDER_HISTORY: "customer:orderHistory:update",
    UPDATE_PROFILE: "customer:profile:update"
  };
  return {
    oauthScopes: oauthScopes
  };
});
//# sourceMappingURL=dpz.oauth.constants.js.map
