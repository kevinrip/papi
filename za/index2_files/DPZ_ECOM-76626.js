function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(["atLaunchDarkly", "dpz.config", "dpz.abTesting"], function (_ref, _ref2, _ref3) {
  var getOffer = _ref.getOffer;
  var getMarketProperty = _ref2.getMarketProperty;
  var setTest = _ref3.setTest;
  var EXPERIENCE_MAP = {
    obdb: "b",
    obdc: "c",
    obdd: "d"
  };

  var getFormattedExperience = function getFormattedExperience(_ref4) {
    var experience = _ref4.experience;
    return EXPERIENCE_MAP[experience];
  };

  var nationalMenuCategories = {
    BREADS: "breads",
    BREADSOBD: "breadsandovenbakeddips",
    EXTRAS: "extras",
    OBD: "ovenbakeddips",
    VIEWALL: "viewall"
  };
  var localMenuCategories = {
    BREADS: "Breads",
    OBD: "OvenBakedDips"
  };

  var getCatalog = function getCatalog() {
    return jsDPZ.app.catalog.getCatalog();
  };

  var isProductsByCategoryEnabled = function isProductsByCategoryEnabled(category) {
    var products = getCatalog().getCategoryData("Food", category).Products;
    return !!(products !== null && products !== void 0 && products.length);
  };

  var setEligibleExperiences = function setEligibleExperiences(test) {
    if (!test) return Promise.resolve(null);
    var experience = getFormattedExperience(test);
    return Promise.resolve(_objectSpread(_objectSpread({}, test), {}, {
      isExperienceB: experience === "b",
      isExperienceC: experience === "c",
      isExperienceD: experience === "d"
    }));
  };

  var configureSubNavigation = function configureSubNavigation(subNavConfig) {
    var hasBreadProducts = isProductsByCategoryEnabled("Bread");
    var hasBreadDipCombosProducts = isProductsByCategoryEnabled("BreadDipCombos");
    var hasDipsProducts = isProductsByCategoryEnabled("Dips");
    var nationalMenuBreadOBDIndex = subNavConfig.findIndex(function (_ref5) {
      var url = _ref5.url;
      return url.includes("breadsandovenbakeddips");
    });

    if (~nationalMenuBreadOBDIndex) {
      var categories = [];

      if (hasBreadProducts || hasBreadDipCombosProducts) {
        categories.push({
          text: "navigation.ecom76626_breads",
          url: "#!/menu/category/".concat(nationalMenuCategories.BREADS, "/"),
          listId: "",
          anchorClass: "js-navigationLink",
          quid: "sub-navigation-".concat(nationalMenuCategories.BREADS)
        });
      }

      if (hasDipsProducts || hasBreadDipCombosProducts) {
        categories.push({
          text: "navigation.ecom76626_oven_baked_dips",
          url: "#!/menu/category/".concat(nationalMenuCategories.OBD, "/"),
          listId: "",
          anchorClass: "js-navigationLink",
          quid: "sub-navigation-".concat(nationalMenuCategories.OBD)
        });
      }

      subNavConfig.splice.apply(subNavConfig, [nationalMenuBreadOBDIndex + 1, 0].concat(categories));
      subNavConfig.splice(nationalMenuBreadOBDIndex, 1);
    } else {
      var localMenuBreadOBDIndex = subNavConfig.findIndex(function (_ref6) {
        var url = _ref6.url;
        return url.includes("BreadAndOvenBakedDips");
      });

      if (~localMenuBreadOBDIndex) {
        var _categories = [];

        if (hasBreadProducts || hasBreadDipCombosProducts) {
          _categories.push({
            text: "navigation.ecom76626_breads",
            url: "#!/section/Food/category/".concat(localMenuCategories.BREADS, "/"),
            listId: "",
            anchorClass: "navigation-".concat(localMenuCategories.BREADS),
            quid: "sub-navigation-".concat(nationalMenuCategories.BREADS)
          });
        }

        if (hasDipsProducts || hasBreadDipCombosProducts) {
          _categories.push({
            text: "navigation.ecom76626_oven_baked_dips",
            url: "#!/section/Food/category/".concat(localMenuCategories.OBD, "/"),
            listId: "",
            anchorClass: "navigation-".concat(localMenuCategories.OBD),
            quid: "sub-navigation-".concat(nationalMenuCategories.OBD)
          });
        }

        subNavConfig.splice.apply(subNavConfig, [localMenuBreadOBDIndex + 1, 0].concat(_categories));
        subNavConfig.splice(localMenuBreadOBDIndex, 1);
      }
    }
  };

  var sortBreadCategory = function sortBreadCategory(breadProducts) {
    var breadProductsOrder = ["F_SCBRD", "F_SSBRD", "F_SBBRD", "F_PARMT", "F_GARLICT", "F_PBITES", "F_CINNAT"];
    breadProducts.sort(function (a, b) {
      var indexA = breadProductsOrder.indexOf(a);
      var indexB = breadProductsOrder.indexOf(b);
      return indexA - indexB;
    });
  };

  var configureAllCategoryPages = function configureAllCategoryPages() {
    var _ref7;

    var categories = getCatalog().data.Categorization.Food.Categories;

    var _getMarketProperty = getMarketProperty("categories"),
        ecom76626BreadsAndOBS = _getMarketProperty.ecom76626BreadsAndOBS,
        ecom76626DipsAndOBS = _getMarketProperty.ecom76626DipsAndOBS;

    var breadsCategoryProducts = categories.filter(function (category) {
      return ecom76626BreadsAndOBS.includes(category.Code);
    }).map(function (category) {
      if (category.Code === "Bread") {
        sortBreadCategory(category.Products);
      }

      return category;
    });
    return _ref7 = {}, _defineProperty(_ref7, localMenuCategories.BREADS, {
      group: "Breads",
      view: "category_product2",
      subNav: {
        main: "entrees",
        sub: "Breads"
      },
      categoryData: {
        Code: "Breads",
        Name: "Breads",
        Group: "breads",
        Products: [],
        Categories: breadsCategoryProducts
      },
      categoryParams: {
        section: "Breads",
        category: "Breads"
      }
    }), _defineProperty(_ref7, localMenuCategories.OBD, {
      group: "Oven-baked Dips",
      view: "category_product2",
      subNav: {
        main: "entrees",
        sub: "OvenBakedDips"
      },
      categoryData: {
        Code: "OvenBakedDips",
        Name: "Oven-baked Dips",
        Group: "ovenbakeddips",
        Products: [],
        Categories: categories.filter(function (category) {
          return ecom76626DipsAndOBS.includes(category.Code);
        })
      },
      categoryParams: {
        section: "OvenBakedDips",
        category: "OvenBakedDips"
      }
    }), _ref7;
  };

  var getNationalMenuCategory = function getNationalMenuCategory(category, experience) {
    var _b, _c, _d;

    experience = getFormattedExperience({
      experience: experience
    });

    if (!Object.values(EXPERIENCE_MAP).includes(experience)) {
      return category;
    }

    var categoriesByExperience = {
      b: (_b = {}, _defineProperty(_b, nationalMenuCategories.BREADSOBD, "breadsandovenbakeddips"), _defineProperty(_b, nationalMenuCategories.EXTRAS, "ecom76626-extras"), _b),
      c: (_c = {}, _defineProperty(_c, nationalMenuCategories.BREADS, "ecom76626-breads"), _defineProperty(_c, nationalMenuCategories.OBD, "ecom76626-obd"), _c),
      d: (_d = {}, _defineProperty(_d, nationalMenuCategories.BREADS, "ecom76626-breads"), _defineProperty(_d, nationalMenuCategories.EXTRAS, "ecom76626-extras"), _defineProperty(_d, nationalMenuCategories.OBD, "ecom76626-obd"), _d)
    };
    return categoriesByExperience[experience][category] || category;
  };

  var getFormattedGroupName = function getFormattedGroupName(categoryName) {
    return {
      breadsandovenbakeddips: nationalMenuCategories.BREADSOBD,
      "ecom76626-breads": nationalMenuCategories.BREADS,
      "ecom76626-extras": nationalMenuCategories.EXTRAS,
      "ecom76626-obd": nationalMenuCategories.OBD
    }[categoryName] || "";
  };

  var sortExtras = function sortExtras(categoryData) {
    var catalog = getCatalog();
    var ecom76626Cups = ["F_HOTCUP", "F_SMHAB", "F_BBQC", "F_SIDRAN", "F_Bd", "F_SIDGAR", "F_SIDICE", "F_SIDMAR", "F_NACHODC"];
    var ecom76626Dressing = ["F_CAESAR", "F_ITAL", "F_LITAL", "F_RANCHPK", "F_BALVIN"];
    var ecom76626Donations = ["F_STJUDE", "F__SCHOOL"];
    var ecom76626Dips = ["F_MARDIP", "F_FVCHEDIP"];
    var extraCups = categoryData.Products.filter(function (product) {
      return ecom76626Cups.includes(product);
    });
    var extraDressing = categoryData.Products.filter(function (product) {
      return ecom76626Dressing.includes(product);
    });
    var extraDonations = categoryData.Products.filter(function (product) {
      return ecom76626Donations.includes(product);
    });
    var extraDips = ecom76626Dips.filter(function (product) {
      var _catalog$getProduct;

      return !!((_catalog$getProduct = catalog.getProduct(product)) !== null && _catalog$getProduct !== void 0 && _catalog$getProduct.data);
    });
    var notSides = [].concat(_toConsumableArray(extraCups), _toConsumableArray(extraDressing), _toConsumableArray(extraDonations), _toConsumableArray(extraDips));
    var extraSides = categoryData.Products.filter(function (product) {
      return !notSides.includes(product);
    });
    return {
      Categories: [{
        Categories: [],
        Code: "Sides",
        Description: "",
        Name: "Oven-Baked Dips",
        Products: extraDips
      }, {
        Categories: [],
        Code: "Sides",
        Description: "",
        Name: "Dipping Cups",
        Products: extraCups
      }, {
        Categories: [],
        Code: "Sides",
        Description: "",
        Name: "Sides",
        Products: extraSides
      }, {
        Categories: [],
        Code: "Sides",
        Description: "",
        Name: "Salad Dressing",
        Products: extraDressing
      }, {
        Categories: [],
        Code: "Sides",
        Description: "",
        Name: "Donations",
        Products: extraDonations
      }],
      Code: "Sides",
      Description: "",
      Name: "Extras",
      Group: "extras",
      Products: []
    };
  };

  var configurePanels = function configurePanels(panels) {
    var hasBreadProducts = isProductsByCategoryEnabled("Bread");
    var hasBreadDipCombosProducts = isProductsByCategoryEnabled("BreadDipCombos");
    var hasDipsProducts = isProductsByCategoryEnabled("Dips");
    var nationalPanelBreadOBDIndex = panels.findIndex(function (_ref8) {
      var href = _ref8.href;
      return href.includes("breadsandOvenBakedDips");
    });

    if (~nationalPanelBreadOBDIndex) {
      var categories = [];

      if (hasBreadProducts || hasBreadDipCombosProducts) {
        categories.push({
          divId: "",
          anchorClass: "qa-".concat(localMenuCategories.BREADS, " grid"),
          alt: "breads_alt",
          title: "breads_title",
          href: "#!/menu/category/".concat(nationalMenuCategories.BREADS, "/"),
          panelname: localMenuCategories.BREADS,
          pageName: "National Menu",
          imgUrl: "/images/img/entree-page/ecom76626-breads.png"
        });
      }

      if (hasDipsProducts || hasBreadDipCombosProducts) {
        categories.push({
          divId: "",
          anchorClass: "qa-".concat(localMenuCategories.OBD, " grid"),
          alt: "ecom76626_obd_alt",
          title: "ecom76626_obd_title",
          href: "#!/menu/category/".concat(nationalMenuCategories.OBD, "/"),
          panelname: localMenuCategories.OBD,
          pageName: "National Menu",
          imgUrl: "/images/img/entree-page/ecom76626-ovenbakeddips.png"
        });
      }

      panels.splice.apply(panels, [nationalPanelBreadOBDIndex + 1, 0].concat(categories));
      panels.splice(nationalPanelBreadOBDIndex, 1);
    } else {
      var localPanelBreadOBDIndex = panels.findIndex(function (_ref9) {
        var href = _ref9.href;
        return href.includes("BreadAndOvenBakedDips");
      });

      if (~localPanelBreadOBDIndex) {
        var _categories2 = [];

        if (hasBreadProducts || hasBreadDipCombosProducts) {
          _categories2.push({
            code: localMenuCategories.BREADS,
            divId: "entree-".concat(localMenuCategories.BREADS),
            anchorClass: "qa-".concat(localMenuCategories.BREADS, " grid"),
            href: "#!/section/Food/category/".concat(localMenuCategories.BREADS, "/"),
            panelname: nationalMenuCategories.BREADS,
            pageName: "Local Menu",
            imgUrl: "/images/img/entree-page/gridLayout/ecom76626-breads.png",
            imgUrlWidescreen: "/images/img/products/larges/F_SCBRD.jpg",
            alt: "ecom76626_breads_alt",
            title: "ecom76626_breads_title"
          });
        }

        if (hasDipsProducts || hasBreadDipCombosProducts) {
          _categories2.push({
            code: localMenuCategories.OBD,
            divId: "entree-".concat(localMenuCategories.OBD),
            anchorClass: "qa-".concat(localMenuCategories.OBD, " grid"),
            href: "#!/section/Food/category/".concat(localMenuCategories.OBD, "/"),
            panelname: nationalMenuCategories.OBD,
            pageName: "Local Menu",
            imgUrl: "/images/img/entree-page/gridLayout/ecom76626-ovenbakeddips.png",
            imgUrlWidescreen: "/images/img/products/larges/F_FVCHEDIP.jpg",
            alt: "ecom76626_obd_alt",
            title: "ecom76626_obd_title"
          });
        }

        panels.splice.apply(panels, [localPanelBreadOBDIndex + 1, 0].concat(_categories2));
        panels.splice(localPanelBreadOBDIndex, 1);
      }
    }
  };

  var getEcom76626 = function getEcom76626() {
    return site.func.getOffers("DPZ_ECOM-76626").then(function (ecom76626) {
      if (ecom76626.inTest) {
        dpz.utag.fire.link(null, {
          ab_test: ecom76626.testGroup
        });
      }

      return ecom76626;
    }).then(setTest).then(setEligibleExperiences);
  };

  return {
    configureAllCategoryPages: configureAllCategoryPages,
    configurePanels: configurePanels,
    configureSubNavigation: configureSubNavigation,
    getEcom76626: getEcom76626,
    getFormattedExperience: getFormattedExperience,
    getFormattedGroupName: getFormattedGroupName,
    getNationalMenuCategory: getNationalMenuCategory,
    getOffer: getOffer,
    localMenuCategories: Object.values(localMenuCategories),
    mboxName: "DPZ_ECOM-76626",
    nationalMenuCategories: Object.values(nationalMenuCategories),
    setEligibleExperiences: setEligibleExperiences,
    sortBreadCategory: sortBreadCategory,
    sortExtras: sortExtras,
    validExperiences: Object.keys(EXPERIENCE_MAP)
  };
});
//# sourceMappingURL=DPZ_ECOM-76626.js.map
