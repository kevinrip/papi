define("wallets/dpz.wallets.constants", [], function () {
  var createDisabledErrorMessage = function createDisabledErrorMessage(_ref) {
    var provider = _ref.provider;
    return "".concat(provider, " is disabled");
  };

  var accountStatuses = Object.freeze({
    ACCOUNT_ACTIVE: "ACCOUNT_ACTIVE",
    ACCOUNT_CREATION_FAILED: "ACCOUNT_CREATION_FAILED",
    ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
    ACCOUNT_SUSPENDED: "ACCOUNT_SUSPENDED",
    NEW: "NEW",
    OTP_SENDING_FAILED: "OTP_SENDING_FAILED",
    OTP_VERIFICATION_FAILED: "OTP_VERIFICATION_FAILED",
    OTP_VERIFICATION_PENDING: "OTP_VERIFICATION_PENDING",
    SERVER_ERROR: "SERVER_ERROR"
  });
  var otpStatuses = Object.freeze({
    NEW: "NEW",
    MAX_LIMIT_EXCEEDED: "MAX_LIMIT_EXCEEDED",
    OTP_SENDING_FAILED: "OTP_SENDING_FAILED",
    OTP_SENDING_MAX_LIMIT_EXCEEDED: "OTP_SENDING_MAX_LIMIT_EXCEEDED",
    OTP_SENT: "OTP_SENT",
    OTP_VERIFICATION_FAILED: "OTP_VERIFICATION_FAILED",
    OTP_VERIFICATION_MAX_LIMIT_EXCEEDED: "OTP_VERIFICATION_MAX_LIMIT_EXCEEDED",
    OTP_VERIFICATION_PENDING: "OTP_VERIFICATION_PENDING",
    OTP_VERIFIED: "OTP_VERIFIED"
  });
  var otpTypes = Object.freeze({
    EMAIL: "EMAIL",
    PHONE: "PHONE"
  });
  var topics = Object.freeze({
    LOG_ERROR: "wallet"
  });
  return {
    accountStatuses: accountStatuses,
    createDisabledErrorMessage: createDisabledErrorMessage,
    ERROR_TAG: "wallets.v1.error",
    otpStatuses: otpStatuses,
    otpTypes: otpTypes,
    topics: topics
  };
});
//# sourceMappingURL=dpz.wallets.constants.js.map
