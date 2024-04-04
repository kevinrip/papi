define(["atLaunchDarkly"], function (_ref) {
  var getOffer = _ref.getOffer;
  var EXPERIENCE_MAP = {
    pbsb: "b",
    pbsc: "c"
  };

  var getFormattedExperience = function getFormattedExperience(_ref2) {
    var experience = _ref2.experience;
    return EXPERIENCE_MAP[experience];
  };

  var getEligibleExperiences = function getEligibleExperiences(test) {
    if (!test) return Promise.resolve(null);
    var experience = getFormattedExperience(test);
    return Promise.resolve({
      ecom73139: {
        inExperienceB: experience === "b",
        inExperienceC: experience === "c"
      }
    });
  };

  return {
    getEligibleExperiences: getEligibleExperiences,
    getFormattedExperience: getFormattedExperience,
    getOffer: getOffer,
    mboxName: "DPZ_ECOM-73139",
    validExperiences: Object.keys(EXPERIENCE_MAP)
  };
});
//# sourceMappingURL=DPZ_ECOM-73139.js.map
