define("errors/constants", [], function () {
  var powerErrorCodes = {
    AUTO_ADDED_ORDER_ID: "AutoAddedOrderId",
    BELOW_MINIMUM_CUSTOMER_AMOUNT: "BelowMinimumCustomerAmount",
    BELOW_MINIMUM_DELIVERY_AMOUNT: "BelowMinimumDeliveryAmount",
    // NOTE: This error comes as a string in this format:
    //
    // { Code: 'BelowMinimumDeliveryAmountForProduct GTB7HTFT 13.00' }
    //
    // When comparing Code to pulseErrorCodes.BELOW_MINIMUM_DELIVERY_AMOUNT_FOR_PRODUCT,
    // make sure to use a string split for comparing the code:
    //
    // Ex.
    // item.Code.split(" ")[0] === powerErrorCodes.BELOW_MINIMUM_DELIVERY_AMOUNT_FOR_PRODUCT
    //
    // and also enforce the override value, when present:
    //
    // Ex.
    // const minimumDeliveryValueOverride = +item.Code.split(" ")?.[2];
    BELOW_MINIMUM_DELIVERY_AMOUNT_FOR_PRODUCT: "BelowMinimumDeliveryAmountForProduct",
    BELOW_MINIMUM_ORDER_AMOUNT: "BelowMinimumOrderAmount",
    CAMPAIGN_ONLY_COUPON_UNAVAILABLE_FOR_CUSTOMER: "CampaignOnlyCouponUnavailableForCustomer",
    CARD_NOT_VALID_IN_STORE: "CardNotValidInStore",
    CASH_LIMIT_EXCEEDED: "CashLimitExceeded",
    CODE_ATTEMPT_LIMIT_EXCEEDED: "CodeAttemptLimitExceeded",
    CODE_EXPIRED: "CodeExpired",
    CODE_INVALID: "CodeInvalid",
    CODE_REQUIRED: "CodeRequired",
    COMPLETE_PREPAYMENT_REQUIRED_FOR_CARSIDE_ORDERES: "CompletePrepaymentRequiredForCarsideOrders",
    COUPON_IS_INVALID_FOR_DAY_OF_WEEK: "CouponIsInvalidForDayOfWeek",
    COUPON_IS_INVALID_FOR_DAY_PART: "CouponIsInvalidForDayPart",
    INVALID_ORDER_INFO_COLLECTION: "InvalidOrderInfoCollection",
    INVALID_SOURCE_ORG_URI_FOR_APP_BOOST: "InvalidSourceOrgUriForAppBoost",
    MAX_ORDER_LIMIT_EXCEEDED: "MaxOrderLimitExceeded",
    MINIMUM_AMOUNT_VALIDATION_ERROR: "MinimumAmountValidationError",
    MINIMUM_PAYMENT_AMOUNT: "MinimumPaymentAmount",
    MINIMUM_PRODUCT_QTY_VALIDATION_ERROR: "MinimumProductQtyValidationError",
    MISSING_NEIGHBORHOOD: "MissingNeighborhood",
    MISSING_OR_INVALID_PHONE_NUMER: "MissingOrInvalidPhoneNumber",
    MISSING_STREET_NUMBER_AND_NAME: "MissingStreetNumberAndName",
    MITIGATION_REQUIRED: "MitigationRequired",
    PERSONAL_COUPON_VALIDATION_ERROR: "PersonalCouponValidationError",
    PROMO_CODE_NOT_ASSIGNED_TO_USER_VIOLATION: "PromoCodeNotAssignedToUserViolation",
    PROMO_CODE_REDEEMED_SAME_DAY_VIOLATON: "PromoCodeRedeemedSameDayViolation",
    PULSE_DUPLICATE_ORDER_ID: "PosDuplicateOrderID",
    PULSE_FAILED: "PosFailed",
    PULSE_MINIMUM_DELIVERY_AMOUNT: "PosMinimumDeliveryAmount",
    PULSE_ORDER_INCOMPLETE: "PosOrderIncomplete",
    PULSE_ORDER_SUBMIT: "PosOrderSubmitError",
    PULSE_UNKNOWN_ERROR: "PosUnknownError",
    RESTRICTED_ITEM_PURCHASE_FORBIDDEN: "RestrictedItemPurchaseForbidden",
    RULE_EXECUTION_ERROR: "RuleExecutionError",
    SERVICE_METHOD_NOT_ALLOWED: "ServiceMethodNotAllowed",
    STORE_CLOSED: "StoreClosed",
    STORE_CLOSED_FOR_CARRYOUT: "StoreClosedForCarryout",
    STORE_CLOSED_FOR_CARSIDE: "StoreClosedForCarside",
    STORE_CLOSED_FOR_DELIVERY: "StoreClosedForDelivery",
    STORE_CLOSED_FOR_FUTURE_TIME: "StoreClosedForFutureTime",
    STORE_IN_WARNING_TIME_FOR_CARRYOUT: "StoreInWarningTimeForCarryout",
    STORE_IN_WARNING_TIME_FOR_DELIVERY: "StoreInWarningTimeForDelivery",
    STORE_NOT_ALLOWED_FOR_CARRYOUT: "StoreNotAllowedForCarryout",
    STORE_NOT_ALLOWED_FOR_DELIVERY: "StoreNotAllowedForDelivery",
    STORE_OVERRIDE: "StoreOverride",
    TAX_ID_VALIDATION_ERROR: "TaxIDValidationError",
    UNABLE_TO_PROCESS_ANONYMOUS_CREDIT_CARDS: "UnableToProcessAnonymousCreditCards",
    UNABLE_TO_PROCESS_GIFT_CARDS: "UnableToProcessGiftCards",
    UNABLE_TO_PROCESS_LOYALTY: "UnableToProcessLoyalty",
    UNABLE_TO_PROCESS_LOYALTY_AT_THIS_TIME: "UnableToProcessLoyaltyAtThisTime",
    UNABLE_TO_PROCESS_LOYALTY_NON_PARTICIPATING_STORE: "UnableToProcessLoyaltyNonParticipatingStore",
    UNABLE_TO_PROCESS_SAVED_CREDIT_CARDS: "UnableToProcessSavedCreditCards",
    UNABLE_TO_REDEEM: "UnableToRedeem",
    UNAUTHORIZED: "Unauthorized",
    USAGE_COUNT_VIOLATION: "UsageCountViolation",
    VERIFICATION_CODE_REQUIRED: "VerificationCodeRequired"
  };
  var pulseErrorCodes = {
    OUT_OF_DELIVERY_AREA: 10
  };
  var pulseErrorMessages = {
    ADDRESS_INFORMATION_INCOMPLETE: "The address information is not complete",
    ADVANCE_ORDER_IS_TOO_LATER: "Advance Order Date is more than 30 days from now",
    ADVANCE_ORDER_IS_TOO_SOON: "Advance Order Time is too soon",
    CREDIT_CARD_ERROR: "Credit Card Error",
    DUPLICATE_ORDER_ID: "Duplicate OrderID",
    INSUFFICIENT_DIGITS_IN_PHONE_NUMBER: "The phone information is not complete. Insufficient digits in phone number.",
    INVALID_BILLING_POSTAL_CODE: "Invalid Billing Postal Code",
    INVALID_CARD_NUMBER: "Invalid Card Number",
    INVALID_CREDIT_CARD: "Invalid Credit Card Number, Please try again",
    INVALID_CVV: "Invalid CVV",
    INVALID_EXPIRATION_DATE: "Invalid Expiration Date",
    NOT_APPROVED: "Not Approved",
    NOT_VALID_CPF: "Not a valid CPF/CNPJ",
    NO_ITEMS_IN_ORDER: "No Items In Order",
    OUT_OF_DELIVER_AREA: "Out of Delivery Area",
    THRESHOLD_AMOUNT_NOT_MET: "Threshold Amount Not Met"
  };
  var powerErrorMessages = {
    SERVICE_METHOD_NOT_ALLOWED_FOR_ADDRESS_AT_STORE: "ServiceMethodAllowedForAddressAtStore"
  };
  return {
    powerErrorCodes: powerErrorCodes,
    pulseErrorCodes: pulseErrorCodes,
    pulseErrorMessages: pulseErrorMessages,
    powerErrorMessages: powerErrorMessages
  };
});
//# sourceMappingURL=constants.js.map
