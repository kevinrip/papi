define(["atLaunchDarkly"], function (_ref) {
  var getOffer = _ref.getOffer;
  var EXPERIENCE_MAP = {
    dwb: "b",
    dwc: "c"
  };

  var getFormattedExperience = function getFormattedExperience(_ref2) {
    var experience = _ref2.experience;
    return EXPERIENCE_MAP[experience];
  };

  var getEligibleExperiences = function getEligibleExperiences(test) {
    if (!test) return Promise.resolve(null);
    var experience = getFormattedExperience(test);
    return Promise.resolve({
      isEcom67857ExperienceB: experience === "b",
      isEcom67857ExperienceC: experience === "c"
    });
  };

  return {
    getEligibleExperiences: getEligibleExperiences,
    getFormattedExperience: getFormattedExperience,
    getOffer: getOffer,
    mboxName: "DPZ_ECOM-67857",
    validExperiences: Object.keys(EXPERIENCE_MAP)
  };
});
//# sourceMappingURL=DPZ_ECOM-67857.js.map
