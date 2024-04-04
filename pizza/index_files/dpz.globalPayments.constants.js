define("paymentmodules/dpz.globalPayments.constants", [], function () {
  var topics = {
    CONTINUE_TRANSACTION: "/globalPayments/intents/continue",
    DELETE_INTENT: "/globalPayments/intents/delete",
    LOG_ERROR: "/globalPayments/error/publish",
    NEW_INTENT: "/globalPayments/intents/new",
    SALE_LIMIT_SELECTED: "/globalPayments/providers/saleLimitSelected",
    START_TRANSACTION: "/globalPayments/transaction/start",
    UPDATE_PROVIDERS: "/globalPayments/providers/update",
    UPDATE_TRANSACTION: "/globalPayments/transaction/update",
    RENDER_CHECKOUT: "/globalPayments/checkout/render",
    RESET_INTENTS: "/globalPayments/intents/reset"
  };
  var amountTypes = {
    ENTIRE_BALANCE: "ENTIRE_BALANCE",
    FIXED: "FIXED",
    REMAINDER: "REMAINDER",
    WHOLE_ORDER: "WHOLE_ORDER"
  };
  var amountStatuses = {
    AVAILABLE: "AVAILABLE",
    IN_PROGRESS: "IN_PROGRESS",
    SELECTED: "SELECTED"
  };
  var amountTypesOrder = {
    ENTIRE_BALANCE: 1,
    FIXED: 2,
    REMAINDER: 3,
    WHOLE_ORDER: 0
  };
  var challengeType = {
    OTP: "OTP"
  };
  var challengeId = {
    OTP: "OTP"
  };
  var intentTypes = {
    CREATE_RECURRING: "CREATE_RECURRING",
    ONE_TIME: "ONE_TIME",
    PAY_RECURRING: "PAY_RECURRING"
  };
  var transactionStatuses = {
    ABORTED: "ABORTED",
    ADVANCE_SETTLEMENT: "ADVANCE_SETTLEMENT",
    AUTHORIZATION_FAILED: "AUTHORIZATION_FAILED",
    AUTO_CONFIRMATION: "AUTO_CONFIRMATION",
    CANCELLED: "CANCELLED",
    CONFIGURATION_MISSING: "CONFIGURATION_MISSING",
    DECLINED: "DECLINED",
    DUPLICATE_ORDER: "DUPLICATE_ORDER",
    ERROR: "ERROR",
    EXPIRED: "EXPIRED",
    FAILED: "FAILED",
    INCORRECT_PASSWORD: "INCORRECT_PASSWORD",
    INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
    LIMIT_EXCEEDED: "LIMIT_EXCEEDED",
    NOT_ENROLLED: "NOT_ENROLLED",
    NOT_FOUND: "NOT_FOUND",
    OLP_VALIDATION_FAILED: "OLP_VALIDATION_FAILED",
    PAYMENT_COMPLETED: "PAYMENT_COMPLETED",
    PAYMENT_SERVICE_PROVIDER_LIMIT_EXCEEDED: "PAYMENT_SERVICE_PROVIDER_LIMIT_EXCEEDED",
    PENDING: "PENDING",
    PLACE_ORDER_FAILED: "PLACE_ORDER_FAILED",
    PLACE_ORDER_STARTED: "PLACE_ORDER_STARTED",
    POLLING: "POLLING",
    PRICE_ORDER_FAILED: "PRICE_ORDER_FAILED",
    PROCESSING: "WAITING_NOTIFICATION",
    REDIRECT_AND_AWAIT_NOTIFICATION: "REDIRECT_AND_AWAIT_NOTIFICATION",
    REFUND_EMAIL_TRIGGERED: "REFUND_EMAIL_TRIGGERED",
    REFUND_FAILED: "REFUND_FAILED",
    REFUND_STARTED: "REFUND_STARTED",
    REFUND_SUCCESS: "REFUND_SUCCESS",
    REFUND_TRIGGERED: "REFUND_TRIGGERED",
    SUCCESS: "SUCCESS",
    TECHNICAL_ERROR: "TECHNICAL_ERROR",
    WAITING_CONFIRMATION: "WAITING_CONFIRMATION",
    WAITING_NOTIFICATION: "WAITING_NOTIFICATION"
  };
  var nonRefundableErrorStatuses = [transactionStatuses.ABORTED, transactionStatuses.CANCELLED, transactionStatuses.CONFIGURATION_MISSING, transactionStatuses.DECLINED, transactionStatuses.ERROR, transactionStatuses.EXPIRED, transactionStatuses.FAILED, transactionStatuses.INCORRECT_PASSWORD, transactionStatuses.INSUFFICIENT_BALANCE, transactionStatuses.LIMIT_EXCEEDED, transactionStatuses.NOT_ENROLLED, transactionStatuses.OLP_VALIDATION_FAILED, transactionStatuses.TECHNICAL_ERROR];
  var refundableErrorStatuses = [transactionStatuses.PLACE_ORDER_FAILED, transactionStatuses.REFUND_EMAIL_TRIGGERED, transactionStatuses.REFUND_FAILED, transactionStatuses.REFUND_STARTED, transactionStatuses.REFUND_SUCCESS, transactionStatuses.REFUND_TRIGGERED];
  var waitingStatuses = [transactionStatuses.PENDING, transactionStatuses.POLLING, transactionStatuses.REDIRECT_AND_AWAIT_NOTIFICATION, transactionStatuses.WAITING_NOTIFICATION];
  var pendingStatuses = [].concat(waitingStatuses, [transactionStatuses.WAITING_CONFIRMATION]);
  var errorStatuses = [].concat(nonRefundableErrorStatuses, refundableErrorStatuses);
  var placingOrderStatuses = [transactionStatuses.PLACE_ORDER_STARTED, transactionStatuses.SUCCESS];
  var paymentTypeMappers = {
    DOOR_CREDIT: "DoorCredit",
    DOOR_DEBIT: "DoorDebit",
    STORE_CREDIT: "Cash",
    STORE_DEBIT: "Cash",
    VALES_CDMX: "ValesCDMX"
  };
  var nonRefundableProviders = ["CASH", "DOOR_CREDIT", "DOOR_DEBIT", "STORE_CREDIT", "STORE_DEBIT", "VALES_CDMX"];
  var refundMessageCodes = {
    PAYMENT_SESSION_CANCELLED_WITH_REFUND: "paymentSessionCancelledWithRefund",
    PLACE_ORDER_FAILED_WITH_REFUND: "placeOrderFailedWithRefund"
  };
  var redirectLandingPages = {
    PAYMENT: "payment",
    // Default
    PAYMENT_REDIRECT: "payment-redirect",
    // For Hybrid Apps that are processing the payment in inappbrowser
    IFRAME_REDIRECT: "3dSecureCheckLandingPage" // For Payments using iFramed version

  };
  return {
    amountStatuses: amountStatuses,
    amountTypes: amountTypes,
    amountTypesOrder: amountTypesOrder,
    ERROR_TAG: "gpm.v3.error",
    errorStatuses: errorStatuses,
    intentTypes: intentTypes,
    nonRefundableErrorStatuses: nonRefundableErrorStatuses,
    nonRefundableProviders: nonRefundableProviders,
    paymentTypeMappers: paymentTypeMappers,
    pendingStatuses: pendingStatuses,
    placingOrderStatuses: placingOrderStatuses,
    redirectLandingPages: redirectLandingPages,
    refundableErrorStatuses: refundableErrorStatuses,
    refundMessageCodes: refundMessageCodes,
    SESSION_STORAGE: "dpzPaymentSessionId",
    topics: topics,
    challengeId: challengeId,
    challengeType: challengeType,
    transactionStatuses: transactionStatuses,
    waitingStatuses: waitingStatuses
  };
});
//# sourceMappingURL=dpz.globalPayments.constants.js.map
