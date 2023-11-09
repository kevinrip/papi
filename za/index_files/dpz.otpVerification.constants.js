define("otpVerification/dpz.otpVerification.constants", [], function () {
  var otpStatuses = Object.freeze({
    CODE_REQUESTED: "CODE_REQUESTED",
    VERIFIED: "VERIFIED",
    INVALID_STATUS: "INVALID_STATUS",
    OTP_DISABLED: "INVALID_STATUS",
    PHONE_USAGE_NOT_FOUND: "PHONE_USAGE_NOT_FOUND",
    PHONE_VERIFICATION_FAILURE: "PHONE_VERIFICATION_FAILURE",
    TOKEN_VERIFICATION_FAILURE: "TOKEN_VERIFICATION_FAILURE",
    MAX_LIMIT_EXCEEDED: "MAX_LIMIT_EXCEEDED",
    PHONE_TYPE_NOT_SUPPORTED: "PHONE_TYPE_NOT_SUPPORTED",
    PHONE_NUMBER_ALREADY_USED: "PHONE_NUMBER_ALREADY_USED",
    UNKNOWN_FAILURE: "UnknownError"
  });
  var otpUIState = Object.freeze({
    IDLE: "IDLE",
    WAIT: "WAIT",
    SKIP_AND_RESEND: "SKIP_AND_RESEND"
  });
  var errorTypes = Object.freeze({
    SENT: "SENT",
    VERIFY: "VERIFY"
  });
  var otpTypes = Object.freeze({
    EMAIL: "EMAIL",
    PHONE: "PHONE"
  });
  var topics = Object.freeze({
    LOG_ERROR: "OTPVerification"
  });
  return {
    ERROR_TAG: "OTPVerification.error",
    otpStatuses: otpStatuses,
    otpUIState: otpUIState,
    otpTypes: otpTypes,
    topics: topics,
    errorTypes: errorTypes
  };
});
//# sourceMappingURL=dpz.otpVerification.constants.js.map
