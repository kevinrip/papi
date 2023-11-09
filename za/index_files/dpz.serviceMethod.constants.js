define("dpz.serviceMethod.constants", function () {
  var CARRYOUT = "Carryout";
  var CARSIDE = "Carside";
  var DELIVERY = "Delivery";
  var DELIVER_TO_ME = "DeliverToMe";
  var DINE_IN = "DineIn";
  var DRIVE_THRU = "DriveThru";
  var DRIVE_UP_CARRYOUT = "DriveUpCarryout";
  var DUC = "DUC";
  var HOTSPOTS = "Hotspots";
  var HOTSPOTS_LITE = "HotspotsLite";
  var ALL_METHODS = [CARRYOUT, CARSIDE, DELIVERY, DELIVER_TO_ME, DINE_IN, DRIVE_THRU, DRIVE_UP_CARRYOUT, DUC, HOTSPOTS, HOTSPOTS_LITE];
  var AT_STORE_METHODS = [CARRYOUT, CARSIDE, DINE_IN, DRIVE_THRU, DRIVE_UP_CARRYOUT];
  var DELIVERY_METHODS = ALL_METHODS.filter(function (method) {
    return !AT_STORE_METHODS.includes(method);
  });
  return {
    AT_STORE_METHODS: AT_STORE_METHODS,
    CARRYOUT: CARRYOUT,
    CARSIDE: CARSIDE,
    DELIVERY: DELIVERY,
    DELIVERY_METHODS: DELIVERY_METHODS,
    DELIVER_TO_ME: DELIVER_TO_ME,
    DINE_IN: DINE_IN,
    DRIVE_THRU: DRIVE_THRU,
    DRIVE_UP_CARRYOUT: DRIVE_UP_CARRYOUT,
    DUC: DUC,
    HOTSPOTS: HOTSPOTS,
    HOTSPOTS_LITE: HOTSPOTS_LITE
  };
});
//# sourceMappingURL=dpz.serviceMethod.constants.js.map
