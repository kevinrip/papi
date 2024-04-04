define("dpz.address", function () {
  var getCustomer = function getCustomer() {
    return jsDPZ.app.customer.getCustomer();
  };

  var getSessionAddress = function getSessionAddress() {
    return getCustomer().getSessionAddress().data;
  };

  var getHasStreetAddress = function getHasStreetAddress() {
    var _getSessionAddress = getSessionAddress(),
        Street = _getSessionAddress.Street;

    var hasStreetAddress = !!Street;
    return hasStreetAddress;
  };

  return {
    getHasStreetAddress: getHasStreetAddress
  };
});
//# sourceMappingURL=dpz.address.js.map
