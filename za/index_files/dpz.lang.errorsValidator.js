define([], function anonymous(
) {
var pluralFuncs = {
  en: function(n, ord) {
    var s = String(n).split('.'), v0 = !s[1], t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
    if (ord) return (n10 == 1 && n100 != 11) ? 'one'
        : (n10 == 2 && n100 != 12) ? 'two'
        : (n10 == 3 && n100 != 13) ? 'few'
        : 'other';
    return (n == 1 && v0) ? 'one' : 'other';
  }
};
var fmt = {};
var number = function(value, offset) {
  if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
  return value - (offset || 0);
};
var plural = function(value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key]();
  return data.other();
};
var select = function(value, data) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  return data.other()
};

return {
  "errorsValidator.CNPJValidator": function(d) { return ""; },
  "errorsValidator.CPFValidator": function(d) { return ""; },
  "errorsValidator.CodFiscale": function(d) { return ""; },
  "errorsValidator.PIVA": function(d) { return ""; },
  "errorsValidator.accept": function(d) { return "Please enter a value with a valid extension."; },
  "errorsValidator.alphaNumeric": function(d) { return "This field only accepts numbers and letters"; },
  "errorsValidator.ccLength": function(d) { return ""; },
  "errorsValidator.ccValidation": function(d) { return ""; },
  "errorsValidator.city": function(d) { return "Please enter a valid city."; },
  "errorsValidator.countryCodePhonePattern": function(d) { return "Please enter a valid phone number."; },
  "errorsValidator.creditcard": function(d) { return "Please enter a valid credit card number."; },
  "errorsValidator.cvv": function(d) { return "Please enter a valid security code."; },
  "errorsValidator.date": function(d) { return "Please enter a valid date."; },
  "errorsValidator.dateISO": function(d) { return "Please enter a valid date (ISO)."; },
  "errorsValidator.datemm": function(d) { return "Invalid format. please use MM"; },
  "errorsValidator.dateyy": function(d) { return "Invalid format. please use YY"; },
  "errorsValidator.digits": function(d) { return "Please enter only digits."; },
  "errorsValidator.dniNumber": function(d) { return ""; },
  "errorsValidator.email": function(d) { return "Please enter a valid email address."; },
  "errorsValidator.emailOptIn": function(d) { return ""; },
  "errorsValidator.emailStrict": function(d) { return "Please enter a valid email address."; },
  "errorsValidator.equalTo": function(d) { return "Please enter the same value again."; },
  "errorsValidator.equalToCI": function(d) { return "Please enter the same value again."; },
  "errorsValidator.expirationdate": function(d) { return "Expiration Date must be in the future."; },
  "errorsValidator.future_time": function(d) { return "Please select your future time"; },
  "errorsValidator.gültigNIF": function(d) { return ""; },
  "errorsValidator.invalid_card_holder": function(d) { return "Invalid card holder"; },
  "errorsValidator.invalid_mobile_number": function(d) { return "Invalid mobile number"; },
  "errorsValidator.invalid_postal_code_ca": function(d) { return "Invalid Postal Code"; },
  "errorsValidator.max": function(d) { return "Please enter a value less than or equal to " + d["0"] + "."; },
  "errorsValidator.maxlength": function(d) { return "Please enter no more than " + d["0"] + " characters."; },
  "errorsValidator.min": function(d) { return "Please enter a value greater than or equal to " + d["0"] + "."; },
  "errorsValidator.minlength": function(d) { return "Please enter at least " + d["0"] + " characters."; },
  "errorsValidator.moreThanOrderAmount": function(d) { return "Amount entered must be greater than order amout"; },
  "errorsValidator.nameContainsAlpha": function(d) { return "Valid name required"; },
  "errorsValidator.nitNumber": function(d) { return ""; },
  "errorsValidator.number": function(d) { return "Please enter a valid number."; },
  "errorsValidator.oibError": function(d) { return "Please enter a valid OIB Code"; },
  "errorsValidator.otp_validation_required_for_create_profile": function(d) { return "Please verify mobile number to create the profile"; },
  "errorsValidator.otp_validation_required_for_place_order": function(d) { return "Please verify mobile number to place an order"; },
  "errorsValidator.otp_validation_required_for_update_profile": function(d) { return "Please verify mobile number to update the profile"; },
  "errorsValidator.passportValidation": function(d) { return "Please enter a valid passport."; },
  "errorsValidator.phone": function(d) { return "Please enter a valid phone number."; },
  "errorsValidator.postal_code": function(d) { return "Please enter a valid postal code."; },
  "errorsValidator.postalcode": function(d) { return "Please enter a valid postal code."; },
  "errorsValidator.qitaf_code_request": function(d) { return ""; },
  "errorsValidator.qitaf_max_amount": function(d) { return ""; },
  "errorsValidator.qitaf_otp_request": function(d) { return ""; },
  "errorsValidator.qitaf_otp_required": function(d) { return ""; },
  "errorsValidator.qitaf_phone_required": function(d) { return ""; },
  "errorsValidator.range": function(d) { return "Please enter a value between " + d["0"] + " and " + d["1"] + "."; },
  "errorsValidator.rangelength": function(d) { return "Please enter a value between " + d["0"] + " and " + d["1"] + " characters long."; },
  "errorsValidator.region": function(d) { return "Please enter a valid province."; },
  "errorsValidator.remote": function(d) { return "Please fix this field."; },
  "errorsValidator.required": function(d) { return "This field is required."; },
  "errorsValidator.requiredCharacters": function(d) { return "The value must have at least one uppercase letter, one lowercase letter, one number, and one special character."; },
  "errorsValidator.rncNumber": function(d) { return "RNC number is invalid. Enter a valid 9 or 11 digit number."; },
  "errorsValidator.room": function(d) { return "Please enter a valid room number."; },
  "errorsValidator.rtnNumber": function(d) { return ""; },
  "errorsValidator.rucNumber": function(d) { return ""; },
  "errorsValidator.rucValidation": function(d) { return ""; },
  "errorsValidator.sadad_OLP_valid": function(d) { return ""; },
  "errorsValidator.street": function(d) { return "Please enter a valid street address."; },
  "errorsValidator.streetNumber": function(d) { return "Please enter a valid street number"; },
  "errorsValidator.uniqueAddress": function(d) { return "That name is in use."; },
  "errorsValidator.uniqueCard": function(d) { return "That name is in use."; },
  "errorsValidator.url": function(d) { return "Please enter a valid URL."; },
  "errorsValidator.validNIF": function(d) { return ""; }
}
}
);
