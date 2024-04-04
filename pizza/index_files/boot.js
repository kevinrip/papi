
var _excluded = ["date", "interval", "time"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! Start jsdpz v2.185.1 2023-07-14 */
(function ($) {
  var jsDPZ = window.jsDPZ = {
    ajax: {},
    app: {},
    config: {},
    dataConversion: {},
    obj: {},
    topic: {},
    util: {}
  };
})(jQuery);
/**
 * The ajax module provides standard methods for making requests to the POWER service layer
 * @module ajax
 */

/**
 * Ajax Request
 * @class jsDPZ.ajax
 * @uses config
 * @uses util
 * @uses obj
 * @static
 */


(function ($) {
  var rejectedRequest = function rejectedRequest(_ref) {
    var message = _ref.message;
    return $.Deferred(function (_ref2) {
      var reject = _ref2.reject;
      return reject(new Error(message));
    });
  };

  var mandatoryOptionFields = function mandatoryOptionFields(_ref3) {
    var _ref3$fields = _ref3.fields,
        fields = _ref3$fields === void 0 ? [] : _ref3$fields,
        options = _ref3.options,
        template = _ref3.template;
    var missingFields = fields.filter(function (field) {
      return !options[field];
    });

    if (missingFields.length) {
      return rejectedRequest({
        message: template.replace("{fields}", missingFields.join(", "))
      });
    }
  };

  var allowedFieldValues = function allowedFieldValues(_ref4) {
    var allowedFieldValues = _ref4.allowedFieldValues,
        field = _ref4.field,
        options = _ref4.options,
        template = _ref4.template;

    if (!allowedFieldValues.includes(options[field])) {
      return rejectedRequest({
        message: template.replace("{field}", field).replace("{allowedValues}", allowedFieldValues)
      });
    }
  };
  /**
   * Use to fill out tokenization template for non-place-order calls
   * @method processTokenizationTemplate
   * @param template {Object} the template for tokenization request
   * @param cardPayment {Object}
   * @param cardPayment.Number {string} the card number being tokenized
   * @param cardPayment.Expiration {string} the expiration month and year
   * @return {Object} Promise with request options to tokenize credit card
   */


  function processTokenizationTemplate(template, cardPayment) {
    function substituteCardDetails(cardDetails, payment) {
      var body = JSON.parse(jsDPZ.util.htmlUnEscape(cardDetails));
      var expirationMonth = payment.Expiration.slice(0, 2);
      var twoDigitYear = payment.Expiration.slice(2, 4);
      var fourDigitYear = "20" + twoDigitYear;

      if (body.cardInfo) {
        //cybersource cards
        body.cardInfo.cardNumber = payment.Number;
        body.cardInfo.cardExpirationMonth = expirationMonth;
        body.cardInfo.cardExpirationYear === "%cardExpYear2%" ? body.cardInfo.cardExpirationYear = twoDigitYear : body.cardInfo.cardExpirationYear = fourDigitYear;
      } else {
        //ACI cards
        body.accountNumber = payment.Number;
        body.cardExpiryDate = expirationMonth + twoDigitYear;
      }

      return body;
    }

    return $.Deferred(function (promise) {
      try {
        var request = {
          url: template.Request.Uri,
          headers: template.Request.Headers,
          method: template.Request.Method,
          body: substituteCardDetails(template.Request.Body, cardPayment)
        };
        promise.resolve(request, template.TokenType);
      } catch (error) {
        promise.reject(error);
      }
    });
  }
  /**
   * An object used with all oauth requests. The values are set by nolo when
   * the site loads.
   * @namespace jsDPZ.ajax
   */


  jsDPZ.ajax.oAuthConfig = {
    chromeKiosk: {
      tokenKey: "",
      path: "",
      clientId: "",
      authHeader: "",
      secret: "",
      scope: "",
      validator: ""
    },
    customer: {
      path: "",
      scope: "",
      rememberMeScope: "",
      clientId: "",
      rememberMeClientId: "",
      authHeader: "",
      rememberMeAuthHeader: "",
      validatorId: "",
      tokenKey: ""
    }
  };
  /**
   * Global array for storing promises used when
   * getting a new auth token.
   */

  var oAuthPromiseCache = [];
  /**
   * A wrapper for methods that do ajax requests; this method allows us to inject
   * oauth headers into these requests. This method confirms that the user has an
   * auth token to perform the request.
   * @namespace jsDPZ.ajax
   * @method withOAuth + returnedWithOAuth
   * @param originalMethod original method we're wrapping<br />
   * @param type is a string value representing the settings found in
   * jsDPZ.ajax.oAuthConfig<br />
   */

  function returnedWithOAuth(originalMethod, type, options) {
    var _options;

    //placeholder for the error and complete functions
    var error = $.noop,
        complete = $.noop; //Ensure that options is valid and is an object.

    if (typeof options === "undefined") {
      options = {};
    } else if (_typeof(options) !== "object") {
      options = {
        value: options
      };
    }

    if (options.error) {
      error = options.error;
      delete options.errors;
    }

    if (options.complete) {
      complete = options.complete;
      delete options.complete;
    }

    var dfd = $.Deferred(),
        preFlightCheck = $.Deferred(),
        config = jsDPZ.ajax.oAuthConfig[type],
        refreshToken = jsDPZ.util.oauth.getTokens().refreshTokens[config.tokenKey],
        authToken = jsDPZ.util.oauth.getTokens().accessTokens[config.tokenKey]; //Start Preflight Checks. This will authorize the user to make the desired request.
    //It checks to see if we have a valid token. If we dont, this chunk of code will request a new token.
    //Check 1: Are we attempting to login? If so, get auth token, and continue the request to power.

    if (options && options.data && options.data.u && options.data.p && !options.data.n) {
      refreshToken && (options.data.rememberMe = true);
      var headers = {
        Authorization: "Basic " + options.data.rememberMe ? config.rememberMeAuthHeader : config.authHeader
      };

      if (options.data.gRecaptchaResponse) {
        headers["X-DPZ-CAPTCHA"] = options.data.gRecaptchaResponse + "; google-recaptcha-v2-checkbox";
      }

      jsDPZ.ajax.oauth.authorize({}, {
        headers: headers,
        url: config.path,
        data: {
          grant_type: "password",
          validator_id: config.validatorId,
          client_id: options.data.rememberMe ? config.rememberMeClientId : config.clientId,
          refresh_token: refreshToken,
          scope: config.scope,
          username: options.data.u,
          password: options.data.p
        }
      }, config.tokenKey, originalMethod.name).fail(function (jqXHR, textStatus, errorThrown) {
        jsDPZ.util.oauth.didPingFail(jqXHR);
        preFlightCheck.reject();
        dfd.reject(jqXHR, textStatus, errorThrown);
        error(jqXHR, textStatus, errorThrown);
        complete(jqXHR, textStatus, errorThrown);
      }).then(function () {
        preFlightCheck.resolve();
      }); //Check 2: Are we a remembered user with a refresh token?
    } else if (refreshToken && !authToken) {
      if (jsDPZ.util.empty(oAuthPromiseCache[refreshToken])) {
        oAuthPromiseCache[refreshToken] = jsDPZ.ajax.oauth.authorizeWithRefreshToken(options, config);
      }

      oAuthPromiseCache[refreshToken].fail(function (jqXHR, textStatus, errorThrown) {
        jsDPZ.util.oauth.didPingFail(jqXHR);

        if (jqXHR.status === 400) {
          jsDPZ.util.oauth.removeTokens(config.tokenKey, "refreshTokens");
        }

        preFlightCheck.reject();
        dfd.reject(jqXHR, textStatus, errorThrown);
        error(jqXHR, textStatus, errorThrown);
        complete(jqXHR, textStatus, errorThrown);
      }).then(function () {
        preFlightCheck.resolve();
      }); //Check 3: If we need captcha on a request without auth, add it into request headers.
    } else if ((_options = options) !== null && _options !== void 0 && _options.requireCaptchaAction) {
      jsDPZ.util.getRecaptchaHeader(options.requireCaptchaAction, options).then(function () {
        preFlightCheck.resolve();
      }); //Check 4: If we have a token or are making a request without auth, we just continue.
    } else {
      preFlightCheck.resolve();
    } //Run the orignial method


    preFlightCheck.then(function () {
      function optionsPlusOAuth() {
        authToken = jsDPZ.util.oauth.getTokens().accessTokens[config.tokenKey];

        if (authToken) {
          return $.extend({}, {
            oauth: config.tokenKey
          }, options);
        } else {
          return options;
        }
      }

      originalMethod(optionsPlusOAuth()) //Typically the originalMethod is a call to power. When this call is successful .then is called.
      //In most cases we just return the resolve the dfd promise and continue on.
      .then(function (data, code, rqObject) {
        //If we are creating a new account. We'll want the original method (customer save) to run
        //and then we'll want to log the user in via oauth.
        if (options.data && options.data.Password && options.data.Email) {
          var headers = {
            Authorization: "Basic " + config.authHeader
          };
          jsDPZ.ajax.oauth.authorize({}, {
            headers: headers,
            url: config.path,
            data: {
              grant_type: "password",
              validator_id: config.validatorId,
              client_id: config.clientId,
              scope: config.scope,
              username: options.data.Email,
              password: options.data.Password
            }
          }, config.tokenKey).then(function () {
            dfd.resolve(data, code, rqObject);
            complete(data, code, rqObject);
          }).fail(function (jqXHR, textStatus, errorThrown) {
            jsDPZ.util.oauth.didPingFail(jqXHR);
            dfd.reject(jqXHR, textStatus, errorThrown);
            error(jqXHR, textStatus, errorThrown);
            complete(jqXHR, textStatus, errorThrown);
          });
        } else {
          dfd.resolve(data, code, rqObject);
          complete(data, code, rqObject);
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        refreshToken = jsDPZ.util.oauth.getTokens().refreshTokens[config.tokenKey];

        switch (jqXHR.status) {
          case 401:
          case 403:
            if (refreshToken) {
              jsDPZ.util.oauth.removeTokens(config.tokenKey, "accessTokens");
              jsDPZ.ajax.oauth.authorizeWithRefreshToken(options, config).then(function (data, code, rqObject) {
                originalMethod(optionsPlusOAuth()).then(function (data, code, rqObject) {
                  dfd.resolve(data, code, rqObject);
                  complete(data, code, rqObject);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                  dfd.reject(jqXHR, textStatus, errorThrown);
                  error(jqXHR, textStatus, errorThrown);
                  complete(jqXHR, textStatus, errorThrown);
                });
              }).fail(function (jqXHR, textStatus, errorThrown) {
                jsDPZ.util.oauth.didPingFail(jqXHR);

                if (jqXHR.status === 400) {
                  jsDPZ.util.oauth.removeTokens(config.tokenKey, "refreshTokens");
                }

                dfd.reject(jqXHR, textStatus, errorThrown);
                error(jqXHR, textStatus, errorThrown);
                complete(jqXHR, textStatus, errorThrown);
              });
            } else {
              jsDPZ.util.oauth.removeTokens(config.tokenKey);
              dfd.reject(jqXHR, textStatus, errorThrown);
              error(jqXHR, textStatus, errorThrown);
              complete(jqXHR, textStatus, errorThrown);
            }

            break;

          default:
            dfd.reject(jqXHR, textStatus, errorThrown);
            error(jqXHR, textStatus, errorThrown);
            complete(jqXHR, textStatus, errorThrown);
            break;
        }
      });
    });
    return dfd;
  }

  function withOAuth(originalMethod, type) {
    return returnedWithOAuth.bind(this, originalMethod, type);
  }

  $.extend(jsDPZ.ajax, {
    /**
     * Makes a request to Power to retrieve the balance of a gift card. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method balanceInquiry
     * @param options {Object} a JSON object with the following default values <br />
     *  type : "POST", <br />
     *  url : jsDPZ.config.power.balanceInquiry(), <br />
     *  data : jsDPZ.config.dataModel.BALANCE_INQUIRY_REQUEST, <br />
     *  contentType : "application/json; charset=utf-8" <br />
     */
    balanceInquiry: withOAuth(function (options) {
      options = $.extend(true, {
        type: "POST",
        url: jsDPZ.config.power.balanceInquiry(),
        data: $.extend(true, {}, jsDPZ.config.dataModel.BALANCE_INQUIRY_REQUEST),
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data.GiftCards)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Makes a cached request to Power to retrieve the list of Campus/Base Buildings. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method buildingsBySite
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_site", <br />
     *  site : "", <br />
     *  data : [Empty Object] <br />
     */
    buildingsBySite: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options = $.extend({
        cache: "dpz_site",
        site: "",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.site)) {
        options.url = jsDPZ.config.power.buildingsBySite(options);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Makes a request to Power to update the users password. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method changePassword
     * @param options {Object} a JSON object with the following default values <br />
     *  type : "POST", <br />
     *  url : jsDPZ.config.power.changePassword(), <br />
     *  data : [ <br />
     *    u : "", <br />
     *    p : "", <br />
     *    n : "" <br />
     *  ] <br />
     */
    changePassword: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        url: jsDPZ.config.power.changePassword(),
        data: {
          u: "",
          p: "",
          n: ""
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Makes a cached request to Power to try and find a Store Level Coupon. This is used mainly when the coupon is not found in Master Menu. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method coupon
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_coupon", <br />
     *  CouponCode : "", <br />
     *  StoreID : "", <br />
     *  data : [ <br />
     *    lang : dpz.market.activeLanguageCode <br />
     *  ] <br />
     */
    coupon: withOAuth(function (options) {
      options = $.extend(true, {
        cache: "dpz_coupon_" + dpz.market.activeLanguageCode,
        CouponCode: "",
        StoreID: "",
        data: {
          lang: dpz.market.activeLanguageCode
        }
      }, options);

      if (!jsDPZ.util.empty(options.CouponCode) && !jsDPZ.util.empty(options.StoreID)) {
        options.url = jsDPZ.config.power.coupon(options.StoreID, options.CouponCode);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Function to combine call to get normal login data (customerLoginPowerCall) and also call to get
     * loyalty summary (fetchLoyaltySummary), and combine response data into one customer object before
     * running the success or error callbacks sent from NOLO. If loyalty is not active, this
     * function will run the normal customerLoginPowerCall without making second loyalty call.
     *
     * @namespace jsDPZ.ajax
     * @method customerLogin
     * @param options {Object} a JSON object with the following default values <br />
     *  url : jsDPZ.config.power.customerLogin(), <br />
     *  type : "POST", <br />
     *  data : [ <br />
     *    loyaltyIsActive : false,
     *    u: "", <br />
     *    p: "" <br />
     *  ] <br />
     */
    customerLogin: function customerLogin(options) {
      if (options.data && options.data.loyaltyIsActive) {
        var customerObj = $.extend(true, {}, jsDPZ.config.dataModel.CUSTOMER),
            // Save off the original "options" passed from NOLO, since we will use the
        // callbacks after the entire process is complete
        loginOptions = $.extend(true, {
          error: $.noop,
          complete: $.noop,
          success: $.noop
        }, options),
            // We only want to send the username and password for the initial login,
        // since we don't want to run NOLO success and error callbacks yet
        loginCredentials = {
          data: $.extend(true, {}, loginOptions.data)
        };
        return jsDPZ.ajax.customerLoginPowerCall(loginCredentials).then(function profileLoginSuccess(data) {
          // After successful login, fetch loyalty data
          $.extend(true, customerObj, data);
          successfulProfileLogin = true;
          return jsDPZ.ajax.fetchLoyaltySummary(customerObj.CustomerID);
        }, function profileLoginFailure(errorData) {
          loginOptions.error(errorData);
          loginOptions.complete(errorData); //REFACTOR NOTE PART 1
          //We use passThrough = true to let the next fail know to return the errorData
          //without running any additional logic. We will want to refactor this in the
          //future. We need to investigate if we can short circuit/break the promise
          //chain in this fail.

          errorData.passThrough = true;
          return errorData;
        }).then(function loyaltyLoginSuccess(data) {
          $.extend(true, customerObj.Loyalty, data);
          delete customerObj.Loyalty.CustomerID;
          loginOptions.success(customerObj);
          return customerObj;
        }, function loyaltyLoginFailure(errorData) {
          //REFACTOR NOTE PART 2
          //See REFACTOR NOTE PART 1; this conditional statement will be replaced
          //in the future.
          if (errorData.passThrough) {
            return errorData;
          } else {
            // If we hit a loyalty login error, go ahead and successfully log user in
            // without loyalty summary data
            loginOptions.success(customerObj);
            var promise;

            if (errorData.status === 404) {
              // Remove the loyalty coupons from the order
              promise = jsDPZ.app.order.getOrder().removeCoupons({
                successFilter: function successFilter(coupon, catalogCoupon) {
                  return catalogCoupon.isLoyaltyCoupon();
                }
              }).then(function () {
                return customerObj;
              });
            } else {
              // If we have an error 500 we set the loyalty ok flag to false (something broke up)
              jsDPZ.app.customer.getCustomer().data.Session.loyaltyIsOk = false;
              promise = $.Deferred();
              promise.resolve(customerObj);
            }

            return promise;
          }
        }).then(function (data) {
          site.sessionTools.save();
          loginOptions.complete(data);
          return data;
        });
      } else {
        return jsDPZ.ajax.customerLoginPowerCall(options);
      }
    },

    /**
     * Sends a POST to Power to log the user into the site. Must pass a success or complete function to handle the returned data. The username and password are replaced with an oauth token, so we can remove them from the body.
     * @namespace jsDPZ.ajax
     * @method customerLoginPowerCall
     * @param options {Object} a JSON object with the following default values <br />
     *  url : jsDPZ.config.power.customerLogin(), <br />
     *  type : "POST", <br />
     *  data : [ <br />
     *  ] <br />
     */
    customerLoginPowerCall: withOAuth(function customerLoginPowerCall(options) {
      if (options.data.u) {
        delete options.data.u;
      }

      if (options.data.p) {
        delete options.data.p;
      }

      options = $.extend({
        url: jsDPZ.config.power.customerLogin(),
        type: "POST"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Sends a POST to Power to log the user out of the site. (delete server-side RememberMe session cookie)
     * @namespace jsDPZ.ajax
     * @method customerLogout
     * @param options {Object} a JSON object with the following default values <br />
     *  url : jsDPZ.config.power.customerLogout(), <br />
     *  type : "POST", <br />
     *  data : [ <br />
     *    u: "", <br />
     *    p: "" <br />
     *  ] <br />
     */
    customerLogout: withOAuth(function (options) {
      var accessToken;
      var refreshToken;
      options = $.extend({
        url: jsDPZ.config.power.customerLogout(),
        type: "POST",
        dataType: "text",
        data: {}
      }, options);
      accessToken = jsDPZ.util.oauth.getTokens().accessTokens[jsDPZ.ajax.oAuthConfig["customer"].tokenKey];
      refreshToken = jsDPZ.util.oauth.getTokens().refreshTokens[jsDPZ.ajax.oAuthConfig["customer"].tokenKey];

      if (refreshToken) {
        options.data.refresh_token = refreshToken;
        options.data.client_id = jsDPZ.ajax.oAuthConfig["customer"].rememberMeClientId;
      } else if (accessToken) {
        options.data.client_id = jsDPZ.ajax.oAuthConfig["customer"].clientId;
      }

      jsDPZ.util.oauth.removeTokens(jsDPZ.ajax.oAuthConfig["customer"].tokenKey);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Makes a cached request to Power for a customers past orders. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method customerPastOrder
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_pastorders", <br />
     *  CustomerID : "", <br />
     *  data : [Empty Object], <br />
     *  contentType : "application/json; charset=utf-8" <br />
     */
    customerPastOrders: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_pastorders",
        CustomerID: "",
        url: "",
        data: {},
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.CustomerID)) {
        options.url = jsDPZ.config.power.customerPastOrders(options.CustomerID);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Wrapper function to roll together customerSave and fetchLoyaltySummary before running success function.
     * Posts customer info to Power to save customer info. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method customerSave
     * @param options {Object} a JSON object with the following default values <br />
     *   type : "POST", <br />
     *   url : jsDPZ.config.power.customerSave(), <br />
     *   data : jsDPZ.dataConversion.JSONObjectToString(options.data), <br />
     *   contentType : "application/json; charset=utf-8" <br />
     */
    customerSave: function customerSave(options) {
      // This turns on phone validation on the backend. The unconventional name is for obscurification, not my choice.
      options.data.phoneAB = "B";
      var isLoyaltyEnrollment = options.data.Loyalty && options.data.Loyalty.Command === "ENROLL",
          // Save off only the customer data, so that we don't run a success function until we are ready
      requestData = {
        data: $.extend(true, {}, options.data)
      },
          // Initiate customer object where all customer data will be combined
      customerObj = $.extend(true, {}, jsDPZ.config.dataModel.CUSTOMER);

      if (isLoyaltyEnrollment) {
        // If this is a loyalty enrollment, we need to fetch the loyalty summary and combine the data
        return jsDPZ.ajax.customerSavePowerCall(requestData) // initiate profile save sequence
        .fail(function (errorData) {
          if (options && options.error) options.error(errorData); //REFACTOR NOTE PART 1
          //We use passThrough = true to let the next fail know to return the errorData
          //without running any additional logic. We will want to refactor this in the
          //future. We need to investigate if we can short circuit/break the promise
          //chain in this fail.

          errorData.passThrough = true;
          return errorData;
        }).then(function (data) {
          $.extend(true, customerObj, data);
          return jsDPZ.ajax.fetchLoyaltySummary(customerObj.CustomerID);
        }).fail(function (errorData) {
          //REFACTOR NOTE PART 2
          //See REFACTOR NOTE PART 1; this conditional statement will be replaced
          //in the future.
          if (errorData.passThrough) {
            return errorData;
          }

          jsDPZ.app.customer.getCustomer().data.Session.loyaltyIsOk = false;
          site.sessionTools.save();
          return customerObj;
        }).then(function (loyaltyData) {
          $.extend(true, customerObj.Loyalty, loyaltyData);
          delete customerObj.Loyalty.CustomerID;
          if (options && options.success) options.success(customerObj);
          return customerObj;
        });
      } else {
        return jsDPZ.ajax.customerSavePowerCall(options).fail(function (e) {
          authorizeAfterCustomerSave = false;
          return Promise.reject(e);
        });
      }
    },

    /**
     * Ajax call that posts customer info to Power to save customer info. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method customerSavePowerCall
     * @param options {Object} a JSON object with the following default values <br />
     *   type : "POST", <br />
     *   url : jsDPZ.config.power.customerSave(), <br />
     *   data : jsDPZ.dataConversion.JSONObjectToString(options.data), <br />
     *   contentType : "application/json; charset=utf-8" <br />
     */
    customerSavePowerCall: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        url: jsDPZ.config.power.customerSave(),
        data: {},
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Ajax call that posts customer info to Power to a token back to redirect . Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method customerLoginPowerCallEncrypted
     * @param options {Object} a JSON object with the following default values <br />
     *   type : "POST", <br />
     *   url : jsDPZ.config.power.customerSave(), <br />
     *   data : jsDPZ.dataConversion.JSONObjectToString(options.data), <br />
     *   contentType : "application/json; charset=utf-8" <br />
     */
    customerLoginPowerCallEncrypted: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        url: jsDPZ.config.power.customerBOLORedirect(options.customerID),
        dataType: "text",
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          Authorization: "Basic " + options.authorization,
          "Content-Type": "application/json"
        },
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
    * Function that does basic setup for power credit card calls that require basic auth
    * @namespace jsDPZ.ajax
    * @method customerCreditCard
    * @param options {Object} a JSON object with the following possible values
    *   username : "",        // "<joe@gmail.com>" <br />
    password : "",        // "<users password>" <br />
    data : {             <br />
    "cardID" : undefined    // "<card id returned from power>" <br />
    "nameOnCard" : "",    // "<name_on_card>" <br />
    "number" : "",      // "<last_four_digits_card_number>" <br />
    "cardType" : "",    // <AMEX|DINERS|DISCOVER|ENROUTE|JCB|MASTERCARD|VISA> <br />
    "expirationMonth" : "", // <month_digit_1_to_12> <br />
    "expirationYear" : "",  // <four_digit_year> <br />
    "securityCode" : "",  // <security_code> <br />
    "billingZip" : "",    // "90210" <br />
    "isDefault" : "false",  // <true|false> <br />
    "nickName" : ""     // <nick_name_for_card> <br />
    },                 <br />
    */
    customerCreditCard: withOAuth(function (options) {
      var cO = jsDPZ.app.customer.getCustomer();
      var settings = $.extend(true, {
        data: {},
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        headers: {
          Accept: "application/vnd.dominos.customer.card+json;version=1.0",
          "Content-Type": "application/json",
          "X-Return-Forbidden-Status": true
        }
      }, options);
      settings.url = jsDPZ.config.power.customerCreditCards(cO.data.CustomerID, settings.data.id, settings.headers["X-DPZ-CAPTCHA"]);

      if (settings.type === "DELETE") {
        // Cant send data with DELETE
        delete settings.data;
      } else if (settings.type === "PUT") {
        delete settings.data.panDataEnabled;
        settings.data = JSON.stringify(settings.data);
      } else if (settings.type === "POST") {
        return $.Deferred(function (promise) {
          var tokenizationSuccess = false;
          jsDPZ.ajax.getTokenizationTemplateWithFallback({
            storeID: null,
            cardPayment: {
              Number: settings.data.number.replace(/-/g, ""),
              CardType: settings.data.cardType,
              Expiration: settings.data.expirationMonth.padStart(2, "0") + settings.data.expirationYear.slice(-2)
            },
            retryCount: 0,
            failureTokenType: null,
            promise: null
          }).then(function (tokenizeResponse) {
            var token = tokenizeResponse.token;
            var tokenType = tokenizeResponse.tokenType;

            if (token) {
              settings.data.token = token;
              settings.data.tokenType = tokenType;
              settings.data.number = settings.data.number.slice(settings.data.number.length - 4);
              tokenizationSuccess = true;
            }
          }).always(function () {
            if (tokenizationSuccess || settings.data.panDataEnabled) {
              delete settings.data.panDataEnabled;
              settings.data = JSON.stringify(settings.data);
              jsDPZ.ajax.request(settings).then(promise.resolve)["catch"](promise.reject);
            } else {
              promise.resolve(false);
            }
          });
        });
      }

      return jsDPZ.ajax.request(settings);
    }, "customer"),

    /**
     * Function that saves easyorder from payment page (with no order history created)
     * @namespace jsDPZ.ajax
     * @method customerCreditCard
     * @param options {Object} a JSON
     */
    setEasyOrderExpress: withOAuth(function (options) {
      var cO = jsDPZ.app.customer.getCustomer();
      var settings = $.extend(true, {
        type: "POST",
        data: {},
        cache: false,
        contentType: "application/json; charset=utf-8"
      }, options);
      settings.url = jsDPZ.config.power.setEasyOrderExpressUrl(cO.data.CustomerID);
      return jsDPZ.ajax.request(settings);
    }, "customer"),

    /**
     * Changes customers email
     * @namespace jsDPZ.ajax
     * @method emailChange
     * @param options {Object}
     *
     */
    emailChange: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "POST",
        url: jsDPZ.config.power.emailChangeService()
      }, options);
      return jsDPZ.ajax.request(settings);
    }, "customer"),

    /**
     * Check a customers loyalty status
     * @namespace jsDPZ.ajax
     * @method fetchLoyaltySummary
     * @param options {Object} - contains customer id, and customer information
     *
     */
    fetchLoyaltySummary: withOAuth(function (options) {
      var custID = options.value || jsDPZ.app.customer.getCustomer().data.CustomerID;
      delete options.value;
      var settings = $.extend(true, {
        type: "GET",
        cache: false,
        data: {},
        contentType: "application/json; charset=utf-8",
        url: jsDPZ.config.power.loyaltySummaryService(custID)
      }, options);
      return jsDPZ.ajax.request(settings);
    }, "customer"),

    /**
     * Check a customers loyalty status
     * @namespace jsDPZ.ajax
     * @method fetchLoyaltySummary
     * @param options {Object} - need to pass CustomerID, page and page size
     *
     */
    fetchLoyaltyHistory: withOAuth(function (options) {
      var custID = options.value || options.customerID || jsDPZ.app.customer.getCustomer().data.CustomerID;
      delete options.customerID;
      delete options.value;
      var pageIndex = options.pageIndex || 1;
      var pageSize = options.pageSize || 10;
      var useCache = options.useCache || false;
      var settings = $.extend(true, {
        type: "GET",
        cache: useCache,
        data: {
          pageIndex: pageIndex,
          recordCount: pageSize
        },
        contentType: "application/json; charset=utf-8",
        url: jsDPZ.config.power.loyaltyHistoryService(custID),
        success: options.success,
        error: options.error,
        complete: options.complete
      }, options);
      return jsDPZ.ajax.request(settings);
    }, "customer"),

    /**
     * Fetch either a list of credit cards or an individual credit card (if cardID is passed) from power
     * @param ajax-options {Object} a JSON object with the following default values <br />
     *  cardID : undefined
     */
    fetchCustomerCreditCard: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "GET"
      }, options);
      return jsDPZ.ajax.customerCreditCard(settings);
    }, "customer"),

    /**
     * Save a given credit card to customers account
     * @namespace jsDPZ.ajax
     * @method saveCustomerCreditCard
     * @param ajax-options {Object}
     *  creditCard object
     */
    saveCustomerCreditCard: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "POST"
      }, options);
      return jsDPZ.ajax.customerCreditCard(settings);
    }, "customer"),

    /**
     * Save a given credit card to customers account when the call requires a captcha
     * @namespace jsDPZ.ajax
     * @method saveCustomerCreditCardCaptcha
     * @param ajax-options {Object}
     *  creditCard object
     */
    saveCustomerCreditCardCaptcha: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "POST",
        headers: {
          "X-DPZ-CAPTCHA": options.data.captcha + "; google-recaptcha-v2-checkbox"
        }
      }, options);
      return jsDPZ.ajax.customerCreditCard(settings);
    }, "customer"),

    /**
    *
    creditCard : {
    "cardID : "",
    "nameOnCard" : "", // not editable
    "lastFour" : "", //<last_four_digits_card_number> - not editable
    "cardType" : "", // not editable
    "billingZip" : "", // not editable
    "expirationMonth" : "",
    "expirationYear" : "",
    "isDefault" : false,
    "nickName" : ""
    }
    *
    */
    updateCustomerCreditCard: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "PUT"
      }, options);
      return jsDPZ.ajax.customerCreditCard(settings);
    }, "customer"),

    /**
     * Delete a given credit card to customers account
     * @namespace jsDPZ.ajax
     * @method deleteCustomerCreditCard
     * @param ajax-options {Object}
     *  cardID : undefined
     */
    deleteCustomerCreditCard: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "DELETE"
      }, options);
      return jsDPZ.ajax.customerCreditCard(settings);
    }, "customer"),

    /**
     * Function that does basic setup for power order history
     * @namespace jsDPZ.ajax
     * @method customerOrderHistory
     */
    customerOrderHistory: withOAuth(function (options) {
      var settings = $.extend(true, {
        url: jsDPZ.config.power.customerOrders(options.data.customerID, options.data.orderID, options.lang, options.filterDeliveryHotspot),
        data: {},
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        headers: {
          "Content-Type": "application/json",
          "X-Return-Forbidden-Status": true
        }
      }, options);
      delete settings.data.customerID;
      delete settings.data.orderID;

      if (settings.type === "PUT" || settings.type === "POST") {
        settings.data = JSON.stringify(settings.data);
      }

      return jsDPZ.ajax.request(settings);
    }, "customer"),

    /**
     * Requests order history for a given customer
     * @param options
     */
    fetchCustomerOrders: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "GET",
        cache: "dpz_expire_on_order_and_auth_change_" + dpz.market.activeLanguageCode
      }, options);
      /**
       * Change the serviceMethod from Carside to Carryout, and add necessary metaData if needed
       * for recent/easy ordera. It ensures NOLO will not crash when NOLO receive Carside as serviceMethod
       * @param {Object} orderHistoryResponse - response object from customerOrderHistory function call
       * @return {Object} - modified response object with new ServiceMethod and new metaData
       * if changes were made
       */

      function patchCarsideServiceMethod(orderHistoryResponse) {
        var CARSIDE = "Carside",
            CARRYOUT = "Carryout";

        function changeCarsideServiceMethodAndAddMetaData(orderObj) {
          if (!jsDPZ.util.empty(orderObj) && !jsDPZ.util.empty(orderObj.order) && orderObj.order.ServiceMethod === CARSIDE) {
            orderObj.order.ServiceMethod = CARRYOUT;
            orderObj.order = $.extend(true, orderObj.order, {
              metaData: {
                OriginalServiceMethod: CARSIDE
              },
              isCarsideConvertedToCarryout: true
            });
          }

          return orderObj;
        }

        orderHistoryResponse.customerOrders = orderHistoryResponse.customerOrders.map(changeCarsideServiceMethodAndAddMetaData);
        orderHistoryResponse.easyOrder = changeCarsideServiceMethodAndAddMetaData(orderHistoryResponse.easyOrder);
        return orderHistoryResponse;
      }

      return jsDPZ.ajax.customerOrderHistory(settings).then(patchCarsideServiceMethod);
    }, "customer"),

    /**
     * Sets an easy order for a given customer
     * @param options
     */
    setCustomerEasyOrder: withOAuth(function (options) {
      var settings = $.extend(true, {
        type: "PUT"
      }, options);
      return jsDPZ.ajax.customerOrderHistory(settings);
    }, "customer"),
    eoeOptInAndOutSMS: withOAuth(function (options) {
      options = $.extend(true, {
        type: "POST",
        url: jsDPZ.config.power.eoeOptInAndOutSMS(options.data),
        data: {
          smsNumber: ""
        },
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),
    eoeOptInAndOutSMSInfoByCustomerId: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        data: {},
        cache: false,
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.customerID)) {
        options.url = jsDPZ.config.power.eoeOptInAndOutSMSInfoByCustomerId(options.customerID);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),
    eoeOptInAndOutTwitter: withOAuth(function (options) {
      options = $.extend(true, {
        type: "POST",
        url: jsDPZ.config.power.eoeOptInAndOutTwitter(options.data),
        data: {
          twitterId: ""
        },
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),
    eoeOptInAndOutTwitterInfoByCustomerId: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        data: {},
        cache: false,
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.customerID)) {
        options.url = jsDPZ.config.power.eoeOptInAndOutTwitterInfoByCustomerId(options.customerID);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Sends a service request to Domino's twitter service to get the url for
     * loading the Twitter authentication page needed to bind the customer's
     * Domino's profile with his Twitter account for Twitter ordering.
     *
     * @param {Object} - options The available options to feed the ajax request:
     * @param {string} options.callbackRedirect - The url that twitter will redirect
     * to after the user grants permission.
     * @returns {XMLHttpRequest} A XMLHttpRequest object with the AJAX response,
     * the service will return an empty response with the `Location` header pointing
     * to the Twitter auth URL page. If callbackRedirect is empty the function will
     * return a failed deferred object.
     */
    bindTwitterAccount: withOAuth(function (options) {
      var customerId = options.customerId || "";
      var callbackRedirect = options.callbackRedirect || "";
      var opts = $.extend({
        type: "GET",
        cache: false,
        dataType: "text",
        url: jsDPZ.config.power.bindTwitterAccount(customerId, callbackRedirect)
      }, options);

      if (jsDPZ.util.empty(customerId)) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("bindTwitterAccount needs the customerId option to make the request"));
        });
      }

      if (jsDPZ.util.empty(callbackRedirect)) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("bindTwitterAccount needs the callbackRedirect option to make the request"));
        });
      }

      return jsDPZ.ajax.request(opts);
    }, "customer"),
    twitterFollow: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        data: {},
        cache: false,
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.twitterId)) {
        options.url = jsDPZ.config.power.twitterFollow(options.twitterId);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Posts customer messaging info to Power to opt-in or opt-out of email and or sms/phone messages.
     * PostalCode is always required.
     * If updating email status, must send an EmailOptIn parameter with a value of true or false, and a ConfirmEmail array with the users confirmed email addresses.
     * If updating text/phone messages, SmsOptIn must be passed as true or false, and SmsPhone must be a phone number String.
     * Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method emailOptInAndOut
     * @param options {Object} a JSON object with the following default values <br />
     *  type : "POST", <br />
     *  url : jsDPZ.config.power.emailOptInAndOut(), <br />
     *  data : [ <br />
     *    PostalCode : "" <br />
     *  ], <br />
     *  dataType : "text", <br />
     *  contentType : "application/json; charset=utf-8" <br />
     */
    emailOptInAndOut: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        url: jsDPZ.config.power.emailOptInAndOut(),
        data: {
          PostalCode: ""
        },
        dataType: "text",
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Posts customer messaging info to Power to opt-in or opt-out of Customer Marketing Options.
     * Orders and addresses are optional fields.
     * If a customer is not opting in or out, the post should completely exclude "options.email" and "options.sms".
     * We will also need to include DPZ-Market and DPZ-Language headers on each post.
     * @namespace jsDPZ.ajax
     * @method customerMarketingOptions
     * @param options {Object} a JSON object with the following default values <br />
     *  type : "POST", <br />
     *  url : jsDPZ.config.power.customerMarketingOptions(), <br />
     *  data : [Empty Object], <br />
     *  contentType : "application/json; charset=utf-8" <br />
     */
    customerMarketingOptions: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        url: jsDPZ.config.power.customerMarketingOptions(),
        data: {},
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Makes a cached request to Power for the store specific menu. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method menu
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_menu", <br />
     *  StoreID : "", <br />
     *  data : [ <br />
     *    lang : dpz.market.activeLanguageCode <br />
     *  ] <br />
     */
    menu: withOAuth(function (options) {
      var dataObject = {
        lang: dpz.market.activeLanguageCode
      };
      dataObject = $.extend(dataObject, options.includeAssets ? {
        includeAssets: true
      } : {
        structured: true
      });
      options = $.extend(true, {
        cache: "dpz_menu_" + dpz.market.activeLanguageCode,
        StoreID: "",
        data: dataObject
      }, options);

      if (!jsDPZ.util.empty(options.StoreID)) {
        options.url = jsDPZ.config.power.menu(options.StoreID);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Post a customer order to Power. The data send to Power is stringified JSON, and is specified in the Power API Docs. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method placeOrder
     * @param options {Object} a JSON object with the following default values <br />
     *  type : "POST", <br />
     *  contentType : "application/json; charset=utf-8", <br />
     *  data : jsDPZ.dataConversion.JSONObjectToString(options.data), <br />
     *  url : jsDPZ.config.power.placeOrder() <br />
     */
    placeOrder: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.placeOrder(),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {},
        headers: {
          Accept: "application/vnd.dominos.customer.card+json;version=1.0"
        }
      }, options); //we need to have the globalpayment gateways NOT use placeOrder and
      //override all the options. IOLO-25028

      if (!jsDPZ.util.empty(options.data)) {
        options.data = JSON.stringify(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /** Make a request to the backend to get the parameters for tokenizing a credit card with auto fallback.
     * @namespace jsDPZ.ajax
     * @method getTokenizationTemplateWithFallback
     * @param options {Object} a JSON object with the following default values <br />
     *  storeID : null, <br />
     *  cardPayment : [Empty Object], <br />
     *  retryCount : 0, <br />
     *  failureTokenType : null, <br />
     *  promise : null <br />
     */
    getTokenizationTemplateWithFallback: withOAuth(function (options) {
      // Failsafe
      if (!options.promise) options.promise = $.Deferred();
      if (options.retryCount >= 10) return options.promise.resolve(false);

      function getPerformanceDuration(name) {
        var pref = window.performance.getEntriesByType("measure").find(function (measure) {
          return measure.name.includes(name);
        });
        return pref && pref.duration;
      }

      function publishCstTemplateDataSuccess(data, _, request) {
        jsDPZ.topic("cst_template").publish({
          responseCode: request.status,
          tokenizeFlag: data.Enabled ? "true" : "false",
          responseTime: getPerformanceDuration("power/paymentGatewayService/tokenizeTemplate"),
          gatewayType: data.TokenType
        });
      }

      function publishCstTemplateDataFailure(request) {
        jsDPZ.topic("cst_template").publish({
          responseCode: request && request.status,
          responseTime: getPerformanceDuration("power/paymentGatewayService/tokenizeTemplate")
        });
      }

      var tokenTemplateData = {
        storeID: options.storeID,
        cardType: options.cardPayment.CardType,
        retryCount: options.retryCount
      };
      if (options.failureTokenType) tokenTemplateData.failureTokenType = options.failureTokenType;
      jsDPZ.ajax.getTokenizationTemplate({
        data: tokenTemplateData,
        success: publishCstTemplateDataSuccess,
        error: publishCstTemplateDataFailure
      }).then(function (template) {
        // On retryCount 3, template.Enabled should be false and break the recursion
        return template.Enabled && processTokenizationTemplate(template, {
          Number: options.cardPayment.Number,
          Expiration: options.cardPayment.Expiration
        }).then(jsDPZ.ajax.getTokenizedCreditCard).fail(function () {
          // Set the tokenType to be used in the next attempt
          options.failureTokenType = template.TokenType;
        });
      }).then(options.promise.resolve).fail(function () {
        options.retryCount++;
        jsDPZ.ajax.getTokenizationTemplateWithFallback(options);
      });
      return options.promise;
    }, "customer"),

    /** Make a request to the backend to get the parameters for tokenizing a credit card.
     * This includes which payment processor to use, what API URI to hit, and any required authorization
     * @namespace jsDPZ.ajax
     * @method getTokenizationTemplate
     * @param options {Object} a JSON object with the following default values <br />
     *  type : "GET", <br />
     *  contentType : "application/json; charset=utf-8", <br />
     *  data : jsDPZ.dataConversion.JSONObjectToString(options.data), <br />
     *  url : api.dominos.com/power/paymentGatewayService/tokenizeTemplate <br />
     */
    getTokenizationTemplate: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.tokenizeTemplate(),
        type: "GET",
        contentType: "application/json; charset=utf-8",
        data: {}
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Contacts the payment processor to get the tokenized creditCard number.
     * This call expectes options and a request provided by the getTokenizationTemplate call
     * @namespace jsDPZ.ajax
     * @method getTokenizedCreditCard
     */
    getTokenizedCreditCard: function getTokenizedCreditCard(options, tokenType) {
      var callId = Math.random() * Math.pow(2, 32);
      var url = jsDPZ.util.htmlUnEscape(options.uri || options.url);

      var escapeObject = function escapeObject(object) {
        var obj = {};
        Object.keys(object).forEach(function (attr) {
          return obj[attr] = jsDPZ.util.htmlUnEscape(object[attr]);
        });
        return obj;
      };

      function getPerformanceDuration(name) {
        window.performance.mark(callId + "end");
        window.performance.measure(url, callId + "start", callId + "end");
        var pref = window.performance.getEntriesByType("measure").find(function (measure) {
          return measure.name.includes(name);
        });
        return pref && pref.duration;
      }

      function publishCstTokenizeDataSuccess(_, __, request) {
        jsDPZ.topic("cst_tokenize").publish({
          responseCode: request && request.status,
          responseTime: getPerformanceDuration(url),
          gatewayType: tokenType
        });
      }

      function publishCstTokenizeDataFailure(request) {
        jsDPZ.topic("cst_tokenize").publish({
          responseCode: request && request.status,

          /* START ECOM-38650 */
          responseData: request && (request.responseJSON || request.responseText),

          /* END ECOM-38650 */
          responseTime: getPerformanceDuration(url),
          gatewayType: tokenType
        });
      }

      return $.Deferred(function (promise) {
        window.performance.mark(callId + "start");
        $.ajax({
          type: options.method,
          headers: escapeObject(options.headers),
          url: url,
          data: JSON.stringify(options.body),
          dataType: "json",
          success: publishCstTokenizeDataSuccess,
          error: publishCstTokenizeDataFailure
        }).then(function (response) {
          var token = response.token || response.TOKEN_ID;
          var maskedPan = response.maskedPan || response.ACCT_NUM;
          promise.resolve({
            token: token,
            tokenType: tokenType,
            maskedPan: maskedPan
          });
        }).fail(promise.reject);
      });
    },

    /**
     * Make a request to Power to price the products for a users order. The data send to Power is stringified JSON, and is specified in the Power API Docs. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method priceOrder
     * @param options {Object} a JSON object with the following default values <br />
     *  url : jsDPZ.config.power.priceOrder(), <br />
     *  type : "POST", <br />
     *  contentType : "application/json; charset=utf-8", <br />
     *  data : [Empty Object] <br />
     */
    priceOrder: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.priceOrder(),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Make a cached request to Power to get the list of regions (States, Provinces, etc.). Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method regions
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_regions", <br />
     *  url : jsDPZ.config.power.regions(), <br />
     *  data : [Empty Object] <br />
     */
    regions: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options = $.extend({
        cache: "dpz_regions",
        url: jsDPZ.config.power.regions(options),
        data: {}
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to Power to get the list of regions (States, Provinces, etc.) in jsonapi format. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method regions
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_regions", <br />
     *  url : jsDPZ.config.power.regions(), <br />
     *  data : [Empty Object] <br />
     */
    getRegions: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_regions",
        url: jsDPZ.config.power.getRegions(),
        data: {}
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to Power to get the users current session data. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method sessionLoad
     * @param options {Object} a JSON object with the following default values <br />
     *  id : "", <br />
     *  cache : false <br />
     *  data : [Empty Object] <br />
     */
    sessionLoad: withOAuth(function (options) {
      options = $.extend({
        id: "",
        cache: false,
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.id)) {
        options.url = jsDPZ.config.power.sessionLoad(options.id);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Make a Post request to Power to store the users current session data. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method sessionLoad
     * @param options {Object} a JSON object with the following default values <br />
     *  id : "", <br />
     *  type : "POST", <br />
     *  data : [Empty Object], <br />
     *  contentType : "application/json; charset=utf-8" <br />
     */
    sessionSave: withOAuth(function (options) {
      options = $.extend({
        id: "",
        type: "POST",
        data: {},
        contentType: "application/json; charset=utf-8"
      }, options);
      options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
      options.url = jsDPZ.config.power.sessionSave(options.id);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of cities, for the set market. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalCountryService
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_cities", <br />
     *  data   : [Empty Object] <br />
     */
    globalCountryService: withOAuth(function (options) {
      options = $.extend({
        // cache   : "dpz_global_cities",
        error: site.func.powerCommunicationError,
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.country.summary+json;version=1.0"
        }
      }, options);
      options.url = jsDPZ.config.power.globalCountryService();
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of cities, for the set market. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalCountryDetailService
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_cities", <br />
     *  data   : [Empty Object] <br />
     */
    globalCountryDetailService: withOAuth(function (options) {
      options = $.extend({
        // cache   : "dpz_global_cities",
        error: site.func.powerCommunicationError,
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.country+json;version=1.0"
        }
      }, options);
      options.url = jsDPZ.config.power.globalCountryDetailService(options.countryCode);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to global service to get a list of cities, for the set market. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearch
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_locator", <br />
     *  data   : [Empty Object] <br />
     **
     **  Version 1.2 now accepts a latitude and longitude and will respond with Carryout stores within a certain
     **  radius, for certain markets.
     */
    globalStoreSearch: withOAuth(function (options) {
      var regionCodeInData = options && options.regionCodeInData;
      var opts = $.extend({
        data: {},
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.response+json;version=1.2"
        }
      }, options);
      /* START ECOM-41428 */

      if (regionCodeInData) {
        /* END ECOM-41428 */
        opts.data.regionCode = opts.data.Region || dpz.market.marketCode;
        /* START ECOM-41428 */
      }
      /* END ECOM-41428 */


      opts.url = jsDPZ.config.power.globalStoreSearch(
      /* START ECOM-41428 */
      opts.data.Region, !regionCodeInData
      /* END ECOM-41428 */
      );
      return jsDPZ.ajax.request(opts);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of cities, for the set market. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalCities
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_cities", <br />
     *  data   : [Empty Object] <br />
     */
    globalCities: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_global_cities",
        error: site.func.powerCommunicationError,
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.places.city-list+json;version=1.0"
        }
      }, options);
      options.url = jsDPZ.config.power.globalCities(options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of neighborhoods, for the set market. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalTypeAheadNeighborhods
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_type_ahead_neighborhoods", <br />
     *  data   : [Empty Object] <br />
     */
    globalTypeAheadNeighborhoods: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_global_type_ahead_neighborhoods",
        error: site.func.powerCommunicationError
      }, options);
      options.url = jsDPZ.config.power.globalTypeAheadNeighborhoods(options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of neighborhoods, given a passed city. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalNeighborhoods
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_neighborhoods", <br />
     *  region : "", <br />
     *  data   : [Empty Object] <br />
     */
    globalNeighborhoods: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_global_neighborhoods",
        error: site.func.powerCommunicationError,
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.places.neighborhood-list+json;version=1.0"
        }
      }, options);
      options.url = jsDPZ.config.power.globalNeighborhoods(options.city, options.region);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of streetranges, given a passed city, neighborhood, and point of interest flag. Must pass
     * a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStreetRanges
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_streetranges", <br />
     *  region : "", <br />
     *  data   : [Empty Object] <br />
     */
    globalStreetRanges: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_global_streetranges",
        error: site.func.powerCommunicationError,
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.places.streetrange-list+json;version=1.0"
        }
      }, options);
      options.url = jsDPZ.config.power.globalStreetRanges(options.city, options.region, options.neighborhood, options.poiFlag);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of streets, given a passed city, region, and neighborhood. Must pass
     * a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStreet
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_street", <br />
     *  region : "", <br />
     *  data   : [Empty Object] <br />
     */
    globalStreet: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_global_street",
        error: site.func.powerCommunicationError,
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.places.street-list+json;version=1.0"
        }
      }, options);
      options.url = jsDPZ.config.power.globalStreet(options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to global service to get a list of neighborhoods, given a passed city. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalPlaces
     * @param options {Object} a JSON object with the following default values <br />
     *  cache  : "dpz_global_places", <br />
     *  region : "", <br />
     *  data   : [Empty Object] <br />
     */
    globalPlaces: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_global_places",
        error: site.func.powerCommunicationError,
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.places.place-list+json;version=1.0"
        }
      }, options);
      options.url = jsDPZ.config.power.globalPlaces(options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to global service to get a list of the Regions. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchTypeAhead
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     **
     * Ex: jsDPZ.ajax.globalStoreSearchTypeAhead(options)
     */
    globalStoreSearchTypeAhead: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        data: {},
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      }, options);
      options.url = jsDPZ.config.power.globalStoreSearchTypeAhead(options.data.Region);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Gets a list of street categories from
     * Make a request to global service to get a list of cities, for the set market. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchTypeAheadStreetCategories
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     **
     * Ex: jsDPZ.ajax.globalStoreSearchTypeAheadStreetCategories(options)
     * Options should have the regionCode and the State in order to get the Cities
     */
    globalStoreSearchTypeAheadStreetCategories: withOAuth(function (options) {
      var params = {
        market: options.market || ""
      };
      var opts = $.extend(true, {
        type: "GET",
        data: _objectSpread({}, options.useQueryParams && params),
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      }, options);
      opts.url = options.useQueryParams ? jsDPZ.config.power.globalStoreSearchTypeAheadStreetCategoriesV2(options) : jsDPZ.config.power.globalStoreSearchTypeAheadStreetCategories(opts.countryCode);
      return jsDPZ.ajax.request(opts);
    }, "customer"),

    /**
     * Make a request to global service to get a list of cities, for the set market. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchTypeAheadCity
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     **
     * Ex: jsDPZ.ajax.globalStoreSearchTypeAheadCity(options)
     * Options should have the CountryCode and the State in order to get the Cities
     */
    globalStoreSearchTypeAheadCity: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        data: {},
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      }, options);
      options.url = jsDPZ.config.power.globalStoreSearchTypeAheadCity(options.countryCode, options.state);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to global service to get a list of Streets, for the set market. Must pass a success or complete function to handle the returned data.
     * This is a special case for brazil due to the amount of Data that they have.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchTypeAheadStreets
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     **
     * Ex: jsDPZ.ajax.globalStoreSearchTypeAheadStreetsByPath(options)
     * Options should have the CountryCode and the State and the City in order to get the Streets
     */
    globalStoreSearchTypeAheadStreetsByPath: withOAuth(function (options) {
      var opts = {
        type: "GET",
        data: {},
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      };
      var params = $.extend({
        city: "",
        market: "",
        state: "",
        street: ""
      }, options.data);
      opts.url = jsDPZ.config.power.globalStoreSearchTypeAheadStreetsByPath(params);
      return jsDPZ.ajax.request(opts);
    }, "customer"),

    /**
     * Make a request to global service to get a list of Streets, for the set market. Must pass a success or complete function to handle the returned data.
     * This is a special case for brazil due to the amount of Data that they have.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchTypeAheadStreets
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     **
     * Ex: jsDPZ.ajax.globalStoreSearchTypeAheadStreets(options)
     * Options should have the CountryCode and the State and the City in order to get the Streets
     */
    globalStoreSearchTypeAheadStreets: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        data: {},
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      }, options);
      options.url = jsDPZ.config.power.globalStoreSearchTypeAheadStreets(options.countryCode, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to global service info using State, city and street. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchTypeAheadAddress
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     **
     * Ex: jsDPZ.ajax.globalStoreSearchTypeAheadAddress(options)
     * Options should have the CountryCode and the State and the City and the Street to have the CEP and other relevant info.
     */
    globalStoreSearchTypeAheadAddress: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cep = options.cep,
          city = options.city,
          _options$countryCode = options.countryCode,
          countryCode = _options$countryCode === void 0 ? dpz.market.marketCode : _options$countryCode,
          neighborhood = options.neighborhood,
          state = options.state,
          street = options.street,
          streetLimit = options.streetLimit;
      return jsDPZ.ajax.request($.extend(true, {
        type: "GET",
        data: _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, cep && {
          cep: cep
        }), neighborhood && {
          neighborhood: neighborhood
        }), streetLimit && {
          streetLimit: streetLimit
        }), {}, {
          city: city,
          countryCode: countryCode,
          state: state,
          street: street
        }),
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        },
        url: jsDPZ.config.power.globalStoreSearchTypeAheadAddress()
      }, options));
    }, "customer"),

    /**
     * Make a request to global service to get an address using a number. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchTypeAheadCEP
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     **
     * Ex: jsDPZ.ajax.globalStoreSearchTypeAheadAddress(options)
     * Options should the number to get all the info.
     */
    globalStoreSearchTypeAheadCEP: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        data: {},
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      }, options);
      options.url = jsDPZ.config.power.globalStoreSearchTypeAheadCEP(options.countryCode, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to type ahead service to get a list of buildings tied to the previously
     * picked street from the type ahead service. Must pass a success or complete function to
     * handle the returned data.
     * @namespace jsDPZ.ajax
     * @method globalStoreSearchBuildingsByStreetId
     * @param options {Object} a JSON object with the following default values <br />
     *   cache  : "dpz_global_locator", <br />
     *   data   : [Empty Object] <br />
     * @param options.market {String} The market alpha-2 country code
     * @param options.city {String} The city name to use in the query
     * @param options.street {String} The street name to use to query
     * @returns {$.Deferred} An Promise with the XHR response
     **
     * Ex: jsDPZ.ajax.globalStoreSearchPlacesByStreet(options)
     * Options should have the CountryCode and the State and the City in order to get the Streets
     */
    globalStoreSearchPlacesByStreet: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var params = $.extend({
        city: "",
        market: "",
        street: ""
      }, options.data);
      var hasRequiredParams = params.city && params.market && params.street;

      if (!hasRequiredParams) {
        return $.Deferred(function (promise) {
          promise.reject("city, market and street are required options");
        });
      }

      var opts = {
        type: "GET",
        data: _objectSpread({}, options.useQueryParams && params),
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      };

      var _ref5 = options || {},
          useQueryParams = _ref5.useQueryParams;

      opts.url = useQueryParams ? jsDPZ.config.power.globalStoreSearchPlaces(options) : jsDPZ.config.power.globalStoreSearchPlacesByStreet(params.market, params.city, params.street);
      return jsDPZ.ajax.request(opts);
    }, "customer"),

    /**
     * Fetch all the DTM stores with a 10 mile radius from the center given by
     * the latitude/longitude params on the object.
     *
     * @param options {Object} An object with the following values <br />
     *    latitude (required): The latitude of the center of the search <br />
     *    longitude (required): The longitude of the center of the center <br />
     *
     * @namespace jsDPZ.ajax
     * @method getDeliverToMeByGPSCoords
     */
    getDeliverToMeByGPSCoords: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getDeliverToMeByGPSCoords(options.latitude, options.longitude, options),
        type: "GET",
        data: {},
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.response+json;version=1.2"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a hotspots IP call to get location
     *
     * @param options {Object} An object with the following values <br />
     *    radius: The radius in degrees to use as max distance of the hotspots
     *            from the IP center
     * @namespace jsDPZ.ajax
     * @method getHotspotsByIP
     */
    getHotspotsByIP: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getHotspotsByIP(options),
        type: "GET",
        data: {},
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.response+json;version=1.2"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Fetch all the hotspots with a 10 mile radius from the center given by
     * the latitude/longitude params on the object.
     *
     * The options object might also have a distanceCoordinates object with
     * another coordinates object; when this option is present platform will
     * calculate the distance of the hotspots to the coordinates given.
     *
     * @param options {Object} An object with the following values <br />
     *    latitude (required): The latitude of the center of the search <br />
     *    longitude (required): The longitude of the center of the center <br />
     *    distanceCoordinates: An coordinates object (latitude/longitude) with
     *                         the point to use as a reference to calculate the
     *                         distance of the hotspots to that point. <br />
     *    radius: The radius in degrees to use as max distance of the hotspots
     *            from the IP center
     * The options object might also have a distanceCoordinates object with
     * another coordinates object; when this option is present platform will
     * calculate the distance of the hotspots to the coordinates given.
     * @namespace jsDPZ.ajax
     * @method getHotspotsByGPSCoords
     */
    getHotspotsByGPSCoords: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getHotspotsByGPSCoords(options.latitude, options.longitude, options),
        type: "GET",
        data: {},
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.response+json;version=1.2"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a hotspots GPS call using an address to get location
     * @param options {Object} An object with the following values <br />
     *    address: An object with the following address properties: City, Street, PostalCode, Region, Type<br />
     *    radius: The radius in degrees to use as max distance of the hotspots
     *            from the IP center
     * @namespace jsDPZ.ajax
     * @method getHotspotsByAddress
     */
    getHotspotsByAddress: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getHotspotsByAddress(options.address, options),
        type: "GET",
        data: {},
        headers: {
          Accept: "application/vnd.com.dominos.ecommerce.store-locator.response+json;version=1.2"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a suggest hotspots call using an address
     * @param options {Object} An object with the following values <br />
     *    latitude, longitude, reason, profileName
     * @namespace jsDPZ.ajax
     * @method suggestHotspot
     */
    suggestHotspot: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.suggestHotspot(options),
        type: "POST",
        data: {
          data: {
            type: "suggestedHotspots",
            attributes: {
              latitude: options.latitude,
              longitude: options.longitude,
              reason: options.reason,
              email: options.email,
              updatedBy: options.profileName
            }
          }
        },
        headers: {
          "Content-Type": "application/vnd.api+json"
        }
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
      }

      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a verify hotspot call using a hotspot id to confirm the email is valid
     * @param options {Object} An object with the following values <br />
     *    id
     * @namespace jsDPZ.ajax
     * @method suggestHotspot
     */
    verifyHotspot: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.verifyHotspot(options.id),
        type: "PUT",
        headers: {
          "Content-Type": "application/vnd.api+json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a cached request to Power to get a list of sites ( Colleges, Millitary Bases, etc. ), given a passed in region. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method sitesByRegion
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_region", <br />
     *  region : "", <br />
     *  data : [Empty Object] <br />
     */
    sitesByRegion: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_region",
        region: "",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.region)) {
        options.url = jsDPZ.config.power.sitesByRegion(options);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Make a cached request to Power to get a list of sites ( Colleges, Millitary Bases, etc. ), given a passed in region, in jsonapi format. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method getSitesByRegion
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_region", <br />
     *  url : "", <br />
     *  data : [Empty Object] <br />
     */
    getSitesByRegion: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_sites",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.url)) {
        options.url = jsDPZ.config.power.prependHost(options.url);
        return jsDPZ.ajax.request(options);
      } else {
        return $.Deferred(function (promise) {
          promise.reject(new Error("No URL Provided"));
        });
      }
    }, "customer"),

    /**
     * Make a cached request to Power to get a list of buildings (dorms, barracks), given a passed in site, in jsonapi format. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method getBuildingsBySite
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_site", <br />
     *  url : "", <br />
     *  data : [Empty Object] <br />
     */
    getBuildingsBySite: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_buildings",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.url)) {
        options.url = jsDPZ.config.power.prependHost(options.url);
        return jsDPZ.ajax.request(options);
      } else {
        return $.Deferred(function (promise) {
          promise.reject(new Error("No URL Provided"));
        });
      }
    }, "customer"),

    /**
     * Make a cached request to Power to get the store profile data, given a passed in StoreID. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method storeProfile
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_store", <br />
     *  StoreID : "", <br />
     *  data : [Empty Object] <br />
     */
    storeProfile: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_store",
        StoreID: "",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.StoreID)) {
        options.url = jsDPZ.config.power.storeProfile(options.StoreID);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Make a request to Power to get a list of stores, given a passed in campus/base building ID. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method storesByBuilding
     * @param options {Object} a JSON object with the following default values <br />
     *  building : "", <br />
     *  data : [Empty Object] <br />
     */
    storesByBuilding: withOAuth(function (options) {
      options = $.extend({
        building: "",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.building)) {
        options.url = jsDPZ.config.power.storesByBuilding(options);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Make a request to Power to get a list of stores in jsonapi format, given a passed in campus/base building ID. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method getStoresByBuilding
     * @param options {Object} a JSON object with the following default values <br />
     *  building : "", <br />
     *  data : [Empty Object] <br />
     */
    getStoresByBuilding: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_stores_by_building",
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.buildingId)) {
        options.url = jsDPZ.config.power.deliveryBuilding(options.buildingId);
        return jsDPZ.ajax.request(options);
      } else {
        return $.Deferred(function (promise) {
          promise.reject(new Error("No Building Id Provided"));
        });
      }
    }, "customer"),

    /**
     * Make a request to Power to get a list of stores, given a passed in campus/base building ID. The data parameter needs to have either a s (street), c (campus), b(building), or u (unit) Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method storeSearch
     * @param options {Object} a JSON object with the following default values <br />
     *  url : jsDPZ.config.power.storeSearch(), <br />
     *  data : [Empty Object] <br />
     */
    storeSearch: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.storeSearch(),
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),
    findAddress: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getFindAddress()
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to Power validate and users order. The data parameter is order json. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method validateOrder
     * @param options {Object} a JSON object with the following default values <br />
     *  url : jsDPZ.config.power.validateOrder(), <br />
     *  type : "POST", <br />
     *  data : [Empty Object], <br />
     *  contentType : "application/json; charset=utf-8" <br />
     */
    validateOrder: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.validateOrder(),
        type: "POST",
        data: {},
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }
    }, "customer"),

    /**
     * Make a cached request to Power to get a customer's Company Name, given a provided rncNumber. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method rncName
     * @param options {Object} a JSON object with the following default values <br />
     *  cache : "dpz_rnc_name", <br />
     *  data : [Empty Object] <br />
     */
    rncName: withOAuth(function (options) {
      options = $.extend({
        cache: "dpz_rnc_name",
        rncNumber: "",
        data: {}
      }, options);
      options.url = jsDPZ.config.power.rncName(options.rncNumber);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /*
     * @namespace jsDPZ.ajax
     * @method globalPaymentListProviders
     * @param options {Object} a JSON object with jQuery AJAX settings
     */
    globalPaymentListProviders: withOAuth(function (options) {
      options = $.extend({}, {
        url: jsDPZ.config.power.globalPaymentGateway.listProviders(),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        accepts: {
          json: "application/vnd.com.dominos.ecommerce.payment.checkstatus.response+json;version=1.0"
        },
        timeout: 60000
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /*
     * @namespace jsDPZ.ajax
     * @method globalPaymentStatus
     * @param options {Object} a JSON object with jQuery AJAX settings
     */
    globalPaymentStatus: withOAuth(function (options) {
      options = $.extend({}, {
        url: jsDPZ.config.power.hyphenCheckStatus(options.transactionId),
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        accepts: {
          json: "application/vnd.com.dominos.ecommerce.payment.checkstatus.response+json;version=1.0"
        },
        timeout: 3000
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /* Do a POST from one of the market customer services form to the appropriate power service */
    postCustomerServicesForm: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        url: jsDPZ.config.power[options.powerService](),
        contentType: "application/json; charset=utf-8",
        dataType: "text"
      }, options);
      options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * @namespace jsDPZ.ajax
     * @method qitafOneTimePassword
     * @param options {Object} a JSON object with jQuery AJAX settings,
     *                requires phoneNumber field.
     */
    qitafOneTimePassword: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.qitafOneTimePassword(options.phoneNumber),
        cache: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        accepts: {
          json: "application/vnd.com.dominos.ecommerce.onetime.password.response+json;version=1.0;charset=utf-8"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    oauth: {
      /**
       * @namespace jsDPZ.ajax.oauth
       * @method authorize
       * @param options {Object} a JSON object with jQuery AJAX settings
       */
      authorize: function authorize(options, xhrOptions, tokenKey, calledFrom) {
        var authUrl = jsDPZ.ajax.oAuthConfig.customer.path;
        var isAuthProxy = /\/auth-proxy-service\//.test(authUrl);
        var isPassword = xhrOptions.data.grant_type === "password";
        var request = jsDPZ.ajax.request;

        if (isAuthProxy && isPassword) {
          xhrOptions.beforeSend = checkForHeaderBeforeSend;

          if ("grecaptcha" in window && !(xhrOptions.headers && xhrOptions.headers["X-DPZ-CAPTCHA"])) {
            request = getRecaptchaHeader;
          } else {
            log("auth-proxy.grecpatcha.not.loaded");
          }
        }

        xhrOptions = $.extend(true, {
          type: "POST",
          url: authUrl,
          data: options,
          timeout: 15000
        }, xhrOptions);
        return request(xhrOptions).then(function (data) {
          jsDPZ.util.oauth.saveTokens(data.access_token, data.refresh_token, tokenKey);
          return data;
        }); // implementation details are below

        function getRecaptchaHeader(authRequestOptions) {
          var action = authUrl.split("/").splice(-2).join("/").match(/[A-z0-9\/]+/g).join("");
          return jsDPZ.util.getRecaptchaHeader(action, authRequestOptions, log);
        }

        function checkForHeaderBeforeSend() {
          var missingHeader = this.headers && jsDPZ.util.empty(this.headers["X-DPZ-CAPTCHA"]);
          var missingData = this.data && !this.data.includes("X-DPZ-CAPTCHA");

          if (missingHeader && missingData) {
            log("auth-proxy.no.captcha");
          }
        }

        function log(message, er) {
          var tags = [];
          if (options.grant_type) tags.push(options.grant_type);
          if (calledFrom) tags.push(calledFrom);
          jsDPZ.topic("auth-proxy.captcha.log").publish({
            error: new Error(message),
            tags: tags,
            customData: {
              grant_type: options.grant_type,
              grecaptchaExecuteError: er || "n/a"
            }
          });
        }
      },
      authorizeWithRefreshToken: function authorizeWithRefreshToken(options, config) {
        var headers = {},
            data = {},
            promise = $.Deferred();

        if (config.rememberMeAuthHeader) {
          headers["Authorization"] = "Basic " + config.rememberMeAuthHeader;
        } else if (config.tokenKey === "chromeKiosk-oauth") {
          headers["Authorization"] = "Basic " + config.authHeader;
          headers["content-type"] = "application/x-www-form-urlencoded";
          config.path = JSON.parse(localStorage.getItem("chromeConfig")) && JSON.parse(localStorage.getItem("chromeConfig")).data.pingfed.url;
        }

        data["grant_type"] = "refresh_token";
        data["client_id"] = config.rememberMeClientId ? config.rememberMeClientId : config.clientId;
        data["refresh_token"] = jsDPZ.util.oauth.getTokens().refreshTokens[config.tokenKey];
        data["scope"] = config.rememberMeScope ? config.rememberMeScope : config.scope;
        data["validator_id"] = config.validatorId; //The tryAuthorize method is a recursive method, which attempts to exchange a refresh token for
        //an access token. To exchange the refresh token for an access token we simply make a request
        //to jsDPZ.ajax.oauth.authorize() with the correct payload. An race condition can happens when
        //two or more requests are sent at the same time (such as when multiple tabs are loaded). To
        //handle this we have an even listener to sense for browser storage updates, and checks to see
        //if the refresh token has been changed. If the refresh token has changed, we raise a flag and
        //in the event of auth failure we re-run tryAuthorize().

        var refreshTokenModified = false;
        $(window).on("storage.oauth", function (evt) {
          if (evt.key === "refreshTokens" && !dpz.util.isEmpty(jsDPZ.util.oauth.getTokens().refreshTokens) && jsDPZ.util.oauth.getTokens().refreshTokens[config.tokenKey].length > 0 && jsDPZ.util.oauth.getTokens().refreshTokens[config.tokenKey] !== data["refresh_token"]) {
            refreshTokenModified = true;
          }
        });

        (function tryAuthorize() {
          jsDPZ.ajax.oauth.authorize({}, {
            headers: headers,
            url: config.path,
            data: data
          }, config.tokenKey).then(function (data, code, rqObject) {
            $(window).off("storage.oauth");
            promise.resolve(data, code, rqObject);
          }).fail(function (jqXHR, textStatus, errorThrown) {
            if (refreshTokenModified) {
              data["refresh_token"] = jsDPZ.util.oauth.getTokens().refreshTokens[config.tokenKey];
              refreshTokenModified = false;
              tryAuthorize();
            } else {
              $(window).off("storage.oauth");
              promise.reject(jqXHR, textStatus, errorThrown);
            }
          });
        })();

        return promise;
      }
    },
    orderKioskDeviceWakeUp: withOAuth(function (options) {
      options = $.extend(true, {
        type: "POST",
        url: jsDPZ.config.power.orderKioskDeviceWakeup(options.storeId),
        contentType: "application/json",
        data: options.data,
        headers: {
          Accept: "application/vnd.api+json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "chromeKiosk"),
    orderKioskPaymentRequest: withOAuth(function (options) {
      options = $.extend(true, {
        type: "POST",
        url: jsDPZ.config.power.orderKioskPaymentRequest(),
        contentType: "application/json",
        dataType: "text",
        data: options.data,
        headers: {
          Accept: "application/json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "chromeKiosk"),
    orderKioskPaymentStatus: withOAuth(function (options) {
      options = $.extend(true, {
        type: "GET",
        url: jsDPZ.config.power.orderKioskPaymentStatus(options.orderId),
        contentType: "application/json; charset=utf-8",
        headers: {
          Accept: "application/json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "chromeKiosk"),
    getECommerceOrders: withOAuth(function (options) {
      options = $.extend(true, {
        type: "GET",
        url: jsDPZ.config.power.getECommerceOrders(options.orderId),
        contentType: "application/json; charset=utf-8",
        headers: {
          Accept: "application/json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "chromeKiosk"),
    claimLoyalty: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.claimLoyalty(),
        type: "POST"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to get a customer's cart contents.
     * @namespace jsDPZ.ajax
     * @method getCart
     * @param options {Object} a JSON object with the following default values <br />
     *   url : jsDPZ.config.getCart(), <br />
     *   type : "GET", <br />
     *   contentType : "application/json; charset=utf-8", <br />
     *   data : [Empty Object] <br />
     */
    cartService: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getCart(options.cartId || ""),
        type: options.type || "GET",
        contentType: "application/json; charset=utf-8",
        data: {}
      }, options);
      options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    verifyEmailForWallet: withOAuth(function (options) {
      if (!options.provider) return $.Deferred(function (promise) {
        promise.reject("verifyEmailForWallet needs the wallet provider");
      });
      if (!options.data || !options.data.customerId) return $.Deferred(function (promise) {
        promise.reject("verifyEmailForWallet needs the customerId in data");
      });
      if (!options.data.token) return $.Deferred(function (promise) {
        promise.reject("verifyEmailForWallet needs the token in data");
      });
      var provider = options.provider;
      var opts = $.extend(true, {
        url: jsDPZ.config.power.verifyEmailForWallet(provider),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {}
      }, options);
      opts.data = jsDPZ.dataConversion.JSONObjectToString(opts.data);
      return jsDPZ.ajax.request(opts);
    }, "customer"),
    isStoreEnabledForWallet: withOAuth(function (options) {
      if (!options.provider) return $.Deferred(function (promise) {
        promise.reject("isStoreEnabledForWallet needs the wallet provider");
      });
      if (!options.storeId) return $.Deferred(function (promise) {
        promise.reject("isStoreEnabledForWallet needs the store id");
      });
      var opts = $.extend(true, {
        url: jsDPZ.config.power.isStoreEnabledForWallet(options),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(opts);
    }, "customer"),
    createAccountForWallet: withOAuth(function (options) {
      if (!options.provider) return $.Deferred(function (promise) {
        promise.reject("createAccountForWallet needs the wallet provider");
      });
      var provider = options.provider;
      var opts = $.extend(true, {
        url: jsDPZ.config.power.createAccountForWallet(provider),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: {}
      }, options);
      return jsDPZ.ajax.request(opts);
    }, "customer"),
    getAccountForWallet: withOAuth(function (options) {
      if (!options.provider) return $.Deferred(function (promise) {
        promise.reject("getAccountForWallet needs the wallet provider");
      });
      var provider = options.provider;
      var opts = $.extend(true, {
        url: jsDPZ.config.power.getAccountForWallet(provider),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(opts);
    }, "customer"),
    getProviderPreferences: withOAuth(function (options) {
      if (!options.provider) return $.Deferred(function (promise) {
        promise.reject("getProviderPreferences needs the provider id");
      });
      var provider = options.provider;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.providerPreferences(provider),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }));
    }, "customer"),
    setProviderPreferences: withOAuth(function (options) {
      if (!options.provider) return $.Deferred(function (promise) {
        promise.reject("setProviderPreferences needs the provider id");
      });
      var provider = options.provider;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.providerPreferences(provider),
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        data: jsDPZ.dataConversion.JSONObjectToString(options.data)
      }));
    }, "customer"),
    getStoreTrackerStatus: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getStoreTrackerStatus(options.storeId),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    getTargetedOffer: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getTargetedOffer(options.offerId),
        data: JSON.stringify({
          emailAddress: options.email,
          ecommOrderId: options.orderId,
          pulseOrderGuid: options.pulseOrderGuid
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    claimTargetedOffer: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.claimTargetedOffer(),
        type: "POST",
        contentType: "application/json; charset=utf-8"
      }, options, {
        data: JSON.stringify(options.data)
      });
      return jsDPZ.ajax.request(options);
    }, "customer"),
    getCampaignsActivationsService: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getCampaignsActivationsService(options.name, options.email, options.baseValue),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    activateBonusCampaign: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.activateBonusCampaign(),
        type: "POST",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    activateTwoOrdersAway: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.activateTwoOrdersAway(options.customerID),
        type: "PUT",
        contentType: "application/vnd.api+json"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    activateBPMe: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.activateBPMe(),
        type: "POST",
        contentType: "application/json"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    getUpsellsForOrder: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getUpsellsForOrder(),
        type: "POST",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    getStepUpsellForOrder: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getStepUpsellForOrder(),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        }
      }, options);
      options.data = JSON.stringify(options.data);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to push Delivery Tracker Opt-in Information
     * @namespace jsDPZ.ajax
     * @method pushSmsOptIn
     * @param options {Object} a JSON object with the following default values <br />
     *   url : jsDPZ.config.pushSmsOptIn(), <br />
     *   type : "POST", <br />
     *   contentType : "application/json", <br />
     *   data : [Empty Object] <br />
     */
    pushSmsOptIn: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        cache: false,
        url: jsDPZ.config.power.pushSmsOptIn(),
        dataType: "text",
        headers: {
          Accept: "application/json"
        },
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
      }

      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Make a request to get Coupon Information for Auto-Coupon
     * @namespace jsDPZ.ajax
     * @method getAllCouponsForOrder
     * @param options {Object} a JSON object with the following default values <br />
     *   url : jsDPZ.config.getAllCouponsForOrder(), <br />
     *   type : "POST", <br />
     *   contentType : "application/json", <br />
     *   data : site.func.getOrderForPowerData()  <br />
     */
    getAllCouponsForOrder: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        cache: false,
        url: jsDPZ.config.power.getAllCouponsForOrder(),
        headers: {
          Accept: "application/json"
        },
        contentType: "application/json; charset=utf-8"
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
      }

      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Makes a request to fetch order information using Tracker Presentation Service
     *
     * @param {Object} options an options for jQuery ajax call
     * @param {Object} options.data an object with the following values
     * @param {String} options.data.phoneNumber the customers phone number
     * @param {String} options.data.storeNumber the store number for the order
     * @param {String} options.data.orderKey the order key for the order placed
     * @returns {Promise}
     */
    tpsGetOrders: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        cache: false,
        url: jsDPZ.config.power.tpsGetOrders(options),
        headers: {
          Accept: "application/json"
        },
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Makes a request to fetch driver profile and badges information using TPS
     * @namespace jsDPZ.ajax
     * @param {String} options.storeId the store id of the order
     * @param {String} options.driverId the driver id of the order
     * @returns {Promise}
     */
    getDriverProfileAndBadges: withOAuth(function (options) {
      options = $.extend({
        type: "GET",
        cache: false,
        url: jsDPZ.config.power.getDriverProfileAndBadges(options),
        headers: {
          Accept: "application/json"
        },
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    checkForValidTLSVersion: function checkForValidTLSVersion(options) {
      options = $.extend({
        type: "GET",
        cache: false,
        url: jsDPZ.config.power.getTlsVersion()
      }, options);
      return jsDPZ.ajax.request(options);
    },

    /**
     * Make a request to Dinner Bell API json. Must pass a success or complete function to handle the returned data.
     * @namespace jsDPZ.ajax
     * @method getDinnerBellDeepLink
     * @param options {Object} a JSON object with the following default values <br />
     *  url : http://services-mi-dev1.us.dominos.com:8080/url-shortening-service/?type=short-link, <br />
     *  type : "POST", <br />
     *  data : [Empty Object], <br />
     *  contentType : "application/json; charset=utf-8" <br />
     */
    getDinnerBellDeepLink: withOAuth(function (options) {
      options = $.extend({
        async: true,
        crossDomain: true,
        url: jsDPZ.config.power.getDinnerBellDeepLink(),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        processData: false,
        data: {}
      }, options);

      if (!jsDPZ.util.empty(options.data)) {
        options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
        return jsDPZ.ajax.request(options);
      }

      return $.Deferred(function (promise) {
        promise.reject(new Error("Can't make request without data"));
      });
    }, "customer"),
    fetchCustomerDetails: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.customerDetails(options.type, options.key),
        method: "GET",
        cache: "dpz_expire_on_order_and_auth_change_" + dpz.market.activeLanguageCode
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    socialMediaIdentities: withOAuth(function (options) {
      var baseUrl = jsDPZ.config.power.socialMediaIdentities();
      if (options.url) options.url = baseUrl + "/" + options.url;
      options = $.extend({
        url: baseUrl,
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          Authorization: "Bearer" + jsDPZ.util.oauth.getTokens().accessTokens[options.oauth],
          "Content-Type": "application/vnd.api+json"
        },
        data: {}
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    deliveryInsurance: function deliveryInsurance(options) {
      options.url = jsDPZ.config.power.deliveryInsurance(options.url);
      options = $.extend(true, {
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    },
    loyaltyProgram: withOAuth(function (options) {
      options.url = jsDPZ.config.power.loyaltyProgram(options.url);
      options = $.extend(true, {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    loyaltyProgramOffer: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.loyaltyProgramOffer(options.programName),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(options.payload)
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),
    carsideGuarantee: function carsideGuarantee(options) {
      options.url = jsDPZ.config.power.carsideGuarantee(options.url);
      options = $.extend(true, {
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    },
    sendSMSMessage: withOAuth(function (options) {
      options.url = jsDPZ.config.power.sendSMSMessage(options.url);
      options = $.extend(true, {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * Retrieves a question from the feedback service for a given order.
     *
     * The service returns a response based on the question answered which may be a new question or empty
     * if there aren't any questions left for that survey.
     *
     * The first question code to use is 1 without a response value
     *
     * @param options {Object} The body to send to the server
     * @param options.order {Object} The summary of the order that the survey questions are meant to (context).
     * @param options.order.externalOrderId {String} The store order id (DOTS id in case of MY)
     * @param options.order.orderId {String} The order id
     * @param options.order.orderType {String} The service method for the placed order
     * @param options.order.placeOrderTime {String} The date in YYYY-MM-DD format in which the order was placed
     * @param options.order.sourceOrganizationURI {String} The channel used for placing the order
     * @param options.order.storeId {String} the store id
     * @param options.questionResponse {Object} The anser for the particular question given
     * @param options.questionResponse.code {String} The code of the question (first question is 1, the rest are followed based on the responses from this endpoint)
     * @param options.questionResponse.response {String} The options selected by the user (not sent in the first request)
     *
     * @returns {Deferred} A jquery promise that will resolve with the response from the service, the service will
     * return a new question with an object for the next question or empty if that survey does not have more questions
     * open.
     */
    fetchFeedbackQuestion: withOAuth(function (options) {
      var data = $.extend(true, {
        order: {
          externalOrderId: "",
          orderId: "",
          orderType: "",
          placeOrderTime: "",
          serviceType: "",
          sourceOrganizationURI: "",
          storeId: ""
        },
        questionResponse: {}
      }, options);
      var opts = {
        url: jsDPZ.config.power.fetchFeedbackQuestion(),
        method: "PUT",
        headers: {},
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        data: jsDPZ.dataConversion.JSONObjectToString(data)
      };
      return jsDPZ.ajax.request(opts);
    }, "customer"),

    /**
     * This request publishes the answers submitted via fetchFeedbackQuestion,
     * the parameters are sent via the path, since the answers are already stored
     * in the server.
     *
     * @param options {Object} an object containing the data for building the path
     * @param options.storeId {String} The store ID in which the order was placed
     * @param options.orderId {String} The order ID
     */
    publishFeedbackQuestions: withOAuth(function (options) {
      var opts = {
        url: jsDPZ.config.power.publishFeedbackQuestions(options),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({})
      };
      return jsDPZ.ajax.request(opts);
    }, "customer"),

    /**
     * This request fetches the customer's personal coupons from the
     * targeted offers service.
     *
     * @param options {Object} The params to use in the request query string
     * @param options.customerId {String} The customer id to fetch the coupons
     */
    getPersonalCoupons: withOAuth(function (options) {
      var params = $.extend({}, options);
      var opts = {
        url: jsDPZ.config.power.getPersonalCoupons(),
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET",
        contentType: "application/json; charset=utf-8",
        oauth: params.oauth,
        data: {}
      };

      var mapCoupons = function mapCoupons(data) {
        var couponMapper = function couponMapper(coupon) {
          var tags = {};
          if (coupon.validUntil) tags.ExpiresOn = coupon.validUntil;
          return jsDPZ.obj.coupon({
            Code: coupon.code,
            Description: coupon.description,
            ImageCode: coupon.code,
            Name: coupon.name,
            Tags: tags,
            Price: coupon.price || null,
            Type: coupon.couponType
          });
        };

        return data.coupons.map(couponMapper);
      };

      return jsDPZ.ajax.request(opts).then(mapCoupons);
    }, "customer"),

    /**
     * This request assigns a 3rd party code to the user from the
     * targeted offers service.
     *
     * @param options {Object} The params to use in the request query string
     * @param options.offerId {String} offer id
     * @param options.pulseOrderGuid {String} pulse order guid
     *
     */
    assignThirdPartyCode: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.assignThirdPartyCode(),
        data: JSON.stringify({
          offerId: options.offerId,
          pulseOrderGuid: options.pulseOrderGuid
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * This requests an offer code from the value site
     *
     * @param options {Object} The params to use in the request query string
     * @param options.email {String} email address
     *
     */
    getValueSiteOffer: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.getValueSiteOffer(),
        data: JSON.stringify({
          email: options.email
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * This claims an offer code from the value site
     *
     * @param options {Object} The params to use in the request query string
     * @param options.offer {String} offer code
     * @param options.email {String} email address
     *
     */
    claimValueSiteOffer: withOAuth(function (options) {
      options = $.extend({
        url: jsDPZ.config.power.claimValueSiteOffer(options),
        data: JSON.stringify({
          email: options.email
        }),
        type: "POST",
        contentType: "application/json; charset=utf-8"
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * This request fetches the coupon upsell for combat order situations (the store
     * gives a coupon to the user if they switch to carryout).
     *
     * @param options {Object} The params to use in the request query string
     * @param options.storeId {String} The store id to check for upsell
     */
    upsellForDeliveryDelay: withOAuth(function (options) {
      var opts;

      if (!options || !options.storeId) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("upsellForDeliveryDelay needs the storeId option to make the request"));
        });
      }

      opts = {
        type: "GET",
        url: jsDPZ.config.power.upsellForDeliveryDelay(options.storeId),
        data: {},
        contentType: "application/json; charset=utf-8"
      };
      return jsDPZ.ajax.request(opts).then(jsDPZ.obj.coupon);
    }, "customer"),
    getSurveyQuestions: function getSurveyQuestions(options) {
      var opts;

      if (!options || !options.token || !options.key) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("getSurveyQuestions requires a token and authorization key"));
        });
      }

      opts = {
        type: "POST",
        url: jsDPZ.config.power.piePassSurvey(),
        data: JSON.stringify({
          token: options.token
        }),
        headers: {
          Authorization: "Basic " + btoa("SURVEY:" + options.key),
          "Content-Type": "application/json"
        },
        dataType: "text"
      };
      return jsDPZ.ajax.request(opts);
    },
    sendSurveyAnswers: function sendSurveyAnswers(options) {
      var opts;

      if (!options || !options.token || !options.questionsAndAnswers || !options.key) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("sendSurveyAnswers requires a token, questionsAndAnswers, and authorization key"));
        });
      }

      opts = {
        type: "POST",
        url: jsDPZ.config.power.piePassSurvey(),
        data: JSON.stringify({
          token: options.token,
          questionsAndAnswers: options.questionsAndAnswers
        }),
        headers: {
          Authorization: "Basic " + btoa("SURVEY:" + options.key),
          "Content-Type": "application/json"
        },
        dataType: "text"
      };
      return jsDPZ.ajax.request(opts);
    },
    customerCheckIn: function customerCheckIn(options) {
      var opts;

      if (!options || !options.storeId || !options.orderId || !options.alertType) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("customerCheckIn needs storeId, orderId and alertType"));
        });
      }

      var payload = {
        alertType: options.alertType,
        storeNumber: options.storeId,
        orderId: options.orderId
      };

      if (options.platform && options.platform !== "") {
        payload.platform = options.platform;
      }

      if (options.customerVehicle) {
        payload.customerVehicle = options.customerVehicle;
      }

      if (options.orderPlacement && options.orderPlacement !== "") {
        payload.orderPlacement = options.orderPlacement;
      }

      if (typeof options.customerStillWaiting === "boolean") {
        payload.customerStillWaiting = options.customerStillWaiting;
      }

      opts = {
        type: "POST",
        url: jsDPZ.config.power.customerCheckIn(),
        data: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        dataType: "text"
      };
      return jsDPZ.ajax.request(opts);
    },
    addCheese: function addCheese(options) {
      var opts;

      if (!options || !options.orderId) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("addCheese requires orderId"));
        });
      }

      opts = {
        type: "POST",
        url: jsDPZ.config.power.cheese(),
        data: JSON.stringify({
          orderId: options.orderId
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8"
        },
        dataType: "json"
      };
      return jsDPZ.ajax.request(opts);
    },
    duc: function duc(options) {
      var opts;

      if (!(options && options.orderId && options.apiKey)) {
        var error = !options.orderId && "orderId" || !options.apiKey && "apiKey";
        return $.Deferred(function (promise) {
          promise.reject(new Error("duc needs an " + error));
        });
      }

      opts = {
        type: "GET",
        url: jsDPZ.config.power.duc(options.orderId),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "DPZ-Api-Key": options.apiKey
        }
      };
      return jsDPZ.ajax.request(opts);
    },

    /**
     * This request POSTs to the customer details service's endpoint passed in via
     * options.
     *
     * @param options {Object} an object containing the data for building the path
     * @param options.endpoint {String} The desired endpoint to hit
     */
    customerPrivacy: function customerPrivacy(options) {
      options.url = jsDPZ.config.power.customerPrivacy(options.endpoint);
      options = $.extend(true, {
        type: "POST",
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    },
    checkAvResourceAvailability: function checkAvResourceAvailability(options) {
      var opts;

      if (!options || !options.orderId) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("avResourceAvailability needs an orderId"));
        });
      }

      if (!options || !options.apiKey) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("avResourceAvailability needs an apiKey"));
        });
      }

      opts = {
        method: "POST",
        url: jsDPZ.config.power.avRequestAvailability(),
        data: JSON.stringify({
          orderId: options.orderId
        }),
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json",
          "DPZ-Api-Key": options.apiKey
        },
        dataType: "text"
      };
      return jsDPZ.ajax.request(opts);
    },
    createAvBooking: function createAvBooking(options) {
      var opts;

      if (!options || !options.orderId) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("createAvBooking needs an orderId"));
        });
      }

      if (!options || !options.apiKey) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("createAvBooking needs an apiKey"));
        });
      }

      opts = {
        method: "POST",
        url: jsDPZ.config.power.avBooking(),
        data: JSON.stringify({
          orderId: options.orderId,
          usageKey: options.usageKey,
          smsNumber: options.smsNumber,
          provider: options.provider,
          availableResourceId: options.resourceId
        }),
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json",
          "DPZ-Api-Key": options.apiKey
        }
      };
      return jsDPZ.ajax.request(opts);
    },
    getUpsellForProductsAndCoupons: function getUpsellForProductsAndCoupons(options) {
      var opts;

      if (!options || !options.order) {
        return $.Deferred(function (promise) {
          promise.reject(new Error("getUpsellForProductsAndCoupons needs the order object"));
        });
      }

      opts = {
        method: "POST",
        url: jsDPZ.config.power.getUpsellForProductsAndCouponsEndpoint(),
        data: JSON.stringify({
          order: options.order,
          sortBy: options.sortBy || "PRIORITY",
          upsellType: options.upsellType || "BEST"
        }),
        headers: {
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      };
      return jsDPZ.ajax.request(opts);
    },

    /**
     * GET Request to check if supplied email belongs to an existing customer
     *
     * @param options {string} a string representing an email address
     */
    emailExist: function emailExist(options) {
      var opts = {
        method: "GET",
        url: jsDPZ.config.power.emailExist(options),
        headers: {
          "Content-Type": "application/json"
        },
        toggleLoadingBar: false
      };
      return jsDPZ.ajax.request(opts);
    },
    resendCode: withOAuth(function (options) {
      options = $.extend({
        type: "POST",
        url: jsDPZ.config.power.resendCode(),
        headers: {
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        }
      }, options);
      return jsDPZ.ajax.request(options);
    }, "customer"),

    /**
     * It returns an array of date-time intervals that are not eligible for future orders
     * due to the store reaching the maximum number of allowed future orders for that slot
     * @param options {Object} an object containing the data for building the path
     * @param options.startDate {string} The business date in which the service will use as
     * a starting point to get the next 21 days of black listed elements.
     * @param options.storeId {string} The store id that is going to be used to check the
     * future order capacity
     * @param options.serviceMethod {string} The service method to query the the endpoint
     *
     * @returns {Promise} a promise resolved with an array of blacklisted future order date-time slots
     */
    getFutureOrderCapacityBlackList: function getFutureOrderCapacityBlackList(options) {
      var startDate = options && options.startDate;
      var storeId = options && options.storeId;
      var serviceMethod = options && options.serviceMethod;

      if (!startDate) {
        return $.Deferred().reject(new Error("getFutureOrderCapacityBlackList needs the start date in the options"));
      }

      if (!storeId) {
        return $.Deferred().reject(new Error("getFutureOrderCapacityBlackList needs the storeId in the options"));
      }

      if (!serviceMethod) {
        return $.Deferred().reject(new Error("getFutureOrderCapacityBlackList needs the service method in the options"));
      }

      return jsDPZ.ajax.request({
        method: "GET",
        url: jsDPZ.config.power.getFutureOrderCapacityBlackListEndpoint(storeId, startDate),
        data: {
          serviceMethod: serviceMethod
        },
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    createPaymentSession: withOAuth(function (options) {
      var hasOrder = options && options.data && options.data.order;
      if (!hasOrder || !(options.data.order.id || options.data.order.orderRequest)) return $.Deferred(function (promise) {
        promise.reject(new Error("createPaymentSession needs the ecom order id or an order request"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.createSession(),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify($.extend(true, {}, options.data))
      }));
    }, "customer"),
    getPaymentSession: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("getPaymentSession needs the session id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getSession(options),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }));
    }, "customer"),
    getPaymentSessionEvents: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("getPaymentSessionEvents needs the session id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getSessionEvents(),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }));
    }, "customer"),
    updatePaymentSessionEvents: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("updatePaymentSessionEvents needs the session id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getSessionEvents(options),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify($.extend(true, {}, options.data))
      }));
    }, "customer"),
    cancelPaymentSession: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("cancelPaymentSession needs the session id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.cancelSession(options),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: ""
      }));
    }, "customer"),
    updatePaymentSessionOrder: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("updatePaymentSessionOrder needs the session id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.updateSessionOrder(options),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify($.extend(true, {}, options.data))
      }));
    }, "customer"),
    getPaymentSessionProviders: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("getPaymentSessionProviders needs the session id"));
      });
      var hasTransactions = !jsDPZ.util.empty(options.data) && !jsDPZ.util.empty(options.data.transactions);
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getSessionProviders($.extend(true, {}, options, {
          withTransactions: hasTransactions
        })),
        type: hasTransactions ? "POST" : "GET",
        contentType: "application/json; charset=utf-8",
        data: hasTransactions ? JSON.stringify({
          transactions: options.data.transactions
        }) : {}
      }));
    }, "customer"),
    getPaymentSessionTransactions: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("getPaymentSessionTransactions needs the session id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getSessionTransactions(options),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }));
    }, "customer"),
    createPaymentSessionTransaction: withOAuth(function (options) {
      if (!options || !options.sessionId) return $.Deferred(function (promise) {
        promise.reject(new Error("createPaymentSessionTransaction needs the session id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getSessionTransactions(options),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify($.extend(true, {}, options.data))
      }));
    }, "customer"),
    getPaymentTransaction: withOAuth(function (options) {
      if (!options || !options.transactionId) return $.Deferred(function (promise) {
        promise.reject(new Error("getPaymentTransaction needs the transaction id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getTransaction(options),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }));
    }, "customer"),
    advanceTransactionPayment: withOAuth(function (options) {
      var rejectedResponse = mandatoryOptionFields({
        fields: ["transactionId", "data"],
        options: options,
        template: "advanceTransactionPayment needs {fields}."
      });
      if (rejectedResponse) return rejectedResponse;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.advanceTransactionPayment(options),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(options.data)
      }));
    }, "customer"),
    getPaymentTransactionEvents: withOAuth(function (options) {
      if (!options || !options.transactionId) return $.Deferred(function (promise) {
        promise.reject(new Error("getPaymentTransactionEvents needs the transaction id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getTransactionEvents(options),
        type: "GET",
        contentType: "application/json; charset=utf-8"
      }));
    }, "customer"),
    sendPaymentTransactionEvent: withOAuth(function (options) {
      if (!options || !options.transactionId) return $.Deferred(function (promise) {
        promise.reject(new Error("sendPaymentTransactionEvent needs the transaction id"));
      });
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.globalPaymentGateway.getTransactionEvents(options),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify($.extend(true, {}, options.data))
      }));
    }, "customer"),
    createCustomerWallet: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var email = options.email,
          provider = options.provider,
          phoneNumber = options.phoneNumber,
          type = options.type;
      var rejectedResponse = mandatoryOptionFields({
        fields: ["email", "provider", "phoneNumber", "type"],
        options: options,
        template: "createCustomerWallet needs {fields}."
      });
      if (rejectedResponse) return rejectedResponse;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        url: jsDPZ.config.power.customerWallet.getCustomerWallet(options),
        headers: _objectSpread({}, jsDPZ.config.app.ajax.headers),
        type: "POST",
        contentType: "application/json;domain=dominos.wallet.otp;charset=utf-8",
        data: JSON.stringify($.extend(true, {}, {
          email: email,
          phoneNumber: phoneNumber,
          provider: provider,
          type: type
        }))
      }));
    }, "customer"),
    getCustomerWallet: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var provider = options.provider;
      if (!provider) return rejectedRequest("getCustomerWallet needs the provider");
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        headers: _objectSpread({}, jsDPZ.config.app.ajax.headers),
        url: jsDPZ.config.power.customerWallet.getCustomerWallet(options),
        type: "GET",
        contentType: "application/json;domain=dominos.wallet.wallet;charset=utf-8",
        data: $.extend(true, {}, {
          provider: provider
        })
      }));
    }, "customer"),
    getCustomerWalletBalance: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var rejectedResponse = mandatoryOptionFields({
        fields: ["provider", "walletId"],
        options: options,
        template: "getCustomerWalletBalance needs {fields}."
      });
      if (rejectedResponse) return rejectedResponse;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        headers: _objectSpread({}, jsDPZ.config.app.ajax.headers),
        url: jsDPZ.config.power.customerWallet.getCustomerWalletBalance(options),
        type: "GET",
        contentType: "application/json;domain=dominos.wallet.balance;charset=utf-8",
        data: {}
      }));
    }, "customer"),
    sendCustomerWalletOTP: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var rejectedResponse = mandatoryOptionFields({
        fields: ["otpId", "provider", "walletId"],
        options: options,
        template: "sendCustomerWalletOTP needs {fields}."
      });
      if (rejectedResponse) return rejectedResponse;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        headers: _objectSpread({}, jsDPZ.config.app.ajax.headers),
        url: jsDPZ.config.power.customerWallet.sendOTP(options),
        type: "POST",
        contentType: "application/json;domain=dominos.wallet.otp;charset=utf-8",
        data: JSON.stringify({})
      }));
    }, "customer"),
    sendCustomerVerificationOTP: withOAuth(function (options) {
      var to = options.to,
          type = options.type;
      var rejectedResponse = mandatoryOptionFields({
        fields: ["to", "type"],
        options: options,
        template: "sendCustomerVerificationOTP needs {fields}."
      }) || allowedFieldValues({
        allowedFieldValues: ["email", "phone"],
        field: "type",
        options: options,
        template: "{field} field only allows {allowedValues}"
      });
      if (rejectedResponse) return rejectedResponse;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        headers: _objectSpread({}, jsDPZ.config.app.ajax.headers),
        url: jsDPZ.config.power.customerVerificationOTP.sendOTP(),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(_objectSpread(_objectSpread({}, type === "email" ? {
          email: to
        } : {
          phoneNumber: to
        }), {}, {
          market: dpz.market.marketName,
          locale: "".concat(dpz.market.activeLanguageCode, "-").concat(dpz.market.marketCode)
        }))
      }));
    }, "customer"),
    verifyCustomerVerificationOTP: withOAuth(function (options) {
      var code = options.code,
          to = options.to,
          type = options.type;
      var rejectedResponse = mandatoryOptionFields({
        fields: ["code", "to", "type"],
        options: options,
        template: "verifyCustomerVerificationOTP needs {fields}."
      }) && allowedFieldValues({
        allowedFieldValues: ["email", "phone"],
        field: "type",
        options: options,
        template: "{field} field only allows {allowedValues}"
      });
      if (rejectedResponse) return rejectedResponse;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        headers: _objectSpread({}, jsDPZ.config.app.ajax.headers),
        url: jsDPZ.config.power.customerVerificationOTP.verifyOTP(),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(_objectSpread(_objectSpread({
          code: code
        }, type === "email" ? {
          email: to
        } : {
          phoneNumber: to
        }), {}, {
          market: dpz.market.marketName,
          locale: "".concat(dpz.market.activeLanguageCode, "-").concat(dpz.market.marketCode)
        }))
      }));
    }, "customer"),
    verifyCustomerWalletOTP: withOAuth(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var code = options.code;
      var rejectedResponse = mandatoryOptionFields({
        fields: ["code", "otpId", "provider", "walletId"],
        options: options,
        template: "verifyCustomerWalletOTP needs {fields}."
      });
      if (rejectedResponse) return rejectedResponse;
      return jsDPZ.ajax.request($.extend(true, {}, options, {
        headers: _objectSpread({}, jsDPZ.config.app.ajax.headers),
        url: jsDPZ.config.power.customerWallet.verifyOTP(options),
        type: "POST",
        contentType: "application/json;domain=dominos.wallet.otp;charset=utf-8",
        data: JSON.stringify({
          code: code
        })
      }));
    }, "customer"),
    getAvailableServiceMethodsForFutureDate: withOAuth(function () {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          date = _ref6.date,
          interval = _ref6.interval,
          time = _ref6.time,
          options = _objectWithoutProperties(_ref6, _excluded);

      var url = jsDPZ.config.power.getAvailableServiceMethodsForFutureDate(options);
      return jsDPZ.ajax.request({
        type: "GET",
        data: {
          date: date,
          interval: interval,
          time: time
        },
        headers: {
          "DPZ-Market": dpz.market.marketName,
          "Content-Type": "application/json"
        },
        url: url
      });
    }, "customer"),
    getWAMComponent: withOAuth(function (_ref7) {
      var component = _ref7.component,
          marketName = _ref7.marketName,
          activeLanguageCode = _ref7.activeLanguageCode;
      var url = jsDPZ.config.power.getWAMResourceURL({
        component: component,
        marketName: marketName,
        activeLanguageCode: activeLanguageCode
      });
      return jsDPZ.ajax.request({
        type: "GET",
        headers: {
          "DPZ-Market": dpz.marketName,
          "Content-Type": "application/json"
        },
        url: url
      });
    }, "customer")
  });
})(jQuery);

(function ($) {
  var pendingRequests = {};
  $.extend(jsDPZ.ajax, {
    /**
     * The core request function that makes all ajax requests. This function augments a normal jQuery $.ajax function with the ability to cache requests
     * and the ability to avoid sending duplicate identical calls
     * @namespace jsDPZ.ajax
     * @method request
     * @param options {Object} a JSON object with the following default values <br />
     *   cache : "", <br />
     *   url : "", <br />
     *   data : [EmptyObject], <br />
     *   type : "GET", <br />
     *   dataType : "json", <br />
     *   success: function(data, code, rqObject) [], <br />
     *   complete: function(rqObject, code) [], <br />
     *   error : function(rqObject, eType, exObject) [] <br />
     */
    request: function request(options) {
      options = $.extend(true, {}, {
        cache: "",
        url: "",
        type: "GET",
        dataType: "json",
        headers: {
          Market: dpz.market.marketName,
          "DPZ-Language": dpz.market.activeLanguageCode,
          "DPZ-Market": dpz.market.marketName
        },
        success: function success(data, code, rqObject) {},
        complete: function complete(rqObject, code) {},
        error: function error(rqObject, eType, exObject) {}
      }, jsDPZ.util.empty(options) ? {} : options);
      var xid = jsDPZ.util.localStorage("X-DPZ-D");
      if (xid) options.headers["X-DPZ-D"] = xid; //Add the oauth header here.

      if (options.oauth) {
        options.headers["Authorization"] = "Bearer " + jsDPZ.util.oauth.getTokens().accessTokens[options.oauth];
        delete options.oauth;
      }

      function sanitizeData(unsafeData, incoming) {
        if (unsafeData && typeof unsafeData == "string" && (unsafeData.charAt(0) == "[" || unsafeData.charAt(0) == "{")) {
          var d = jsDPZ.util.htmlEscape(JSON.parse(unsafeData));
          return incoming ? d : JSON.stringify(d);
        } else {
          return jsDPZ.util.htmlEscape(unsafeData);
        }
      }

      function unSanitizeData(safeData, incoming) {
        if (safeData && typeof safeData == "string" && (safeData.charAt(0) == "[" || safeData.charAt(0) == "{")) {
          var d = jsDPZ.util.htmlUnEscape(JSON.parse(safeData));
          return incoming ? d : JSON.stringify(d);
        } else {
          return jsDPZ.util.htmlUnEscape(safeData);
        }
      }

      function sanitizeAndHtmlEscape(responseText) {
        if (responseText) {
          responseText = sanitizeData(responseText, true);
          responseText = jsDPZ.util.htmlEscape(responseText);
        }

        return responseText;
      }

      var successFunc = options.success,
          errorFunc = options.error,
          completeFunc = options.complete,
          saveToCache = false,
          callId = Math.random() * Math.pow(2, 32);
      delete options.success;
      options.data = unSanitizeData(options.data);
      var hash = jsDPZ.util.hash(JSON.stringify({
        data: options.data,
        url: options.url
      })); //Makes this work with cache: false

      if (!jsDPZ.util.empty(options.url)) {
        if (options.cache && !jsDPZ.util.empty(options.cache) && jsDPZ.cache.isLocalStorageAvailable()) {
          var dataString = jsDPZ.cache.get({
            key: options.cache,
            identifier: options.url
          });

          if (dataString !== null) {
            var data = jsDPZ.dataConversion.JSONStringToObject(dataString);
            successFunc(data);
            completeFunc(data); //return a resolved promise with the data

            return $.when(data);
          } else {
            saveToCache = true; //For IE11 and older browsers, this will force the browser to fetch new data.

            options.headers["Pragma"] = "no-cache";
          }
        }

        window.performance.mark(callId + "start");
        pendingRequests[hash] = pendingRequests[hash] || $.ajax($.extend(true, {}, options, {
          error: function error(jqXHR, textStatus, errorThrown) {
            jqXHR.responseText = sanitizeAndHtmlEscape(jqXHR.responseText);
          },
          complete: function complete(jqXHR, textStatus) {
            window.performance.mark(callId + "end");
            window.performance.measure(options.url, callId + "start", callId + "end");
            jqXHR.responseText = sanitizeAndHtmlEscape(jqXHR.responseText);
            delete pendingRequests[hash];
          }
        })).then(function (data, code, rqObject) {
          var sanitizedData = sanitizeData(data, true);

          if (saveToCache) {
            jsDPZ.cache.set({
              key: options.cache,
              identifier: options.url,
              data: jsDPZ.dataConversion.JSONObjectToString(sanitizedData),
              freshness: 600000
            });
          }

          return $.Deferred().resolve(sanitizedData, code, rqObject).promise();
        });
        jsDPZ.topic("pendingRequest").publish({
          promise: pendingRequests[hash],
          options: options,
          hash: hash
        });
        pendingRequests[hash].then(function (data, code, rqObject) {
          successFunc(data, code, rqObject);
          completeFunc(rqObject, code);
        }, function (jqXHR, textStatus, errorThrown) {
          errorFunc(jqXHR, textStatus, errorThrown, options.url);
          completeFunc(jqXHR, textStatus);
        });
        return pendingRequests[hash];
      }
    }
  });
})(jQuery);
/**
 *  The app module provides methods for manipulating and storing data,
 *  in regards to the current state of the application.
 *  @module app
 **/

/**
 *  @class jsDPZ.app.catalog
 *  @uses config
 *  @uses util
 *  @uses obj
 *  @uses topic
 *  @static
 **/


(function ($) {
  var convertedMenu = false;
  $.extend(jsDPZ.app, {
    catalog: {
      /**
       * Get the current catalog JSON Object
       * @namespace jsDPZ.app
       * @method getCatalog
       * @return {Object} jsDPZ catalog object
       */
      getCatalog: function getCatalog() {
        if (jsDPZ.config.app.catalog == null) {
          jsDPZ.config.app.catalog = jsDPZ.obj.catalog();
        }

        return jsDPZ.config.app.catalog;
      },
      isProductActive: function isProductActive(code) {
        var product = jsDPZ.app.catalog.getCatalog().getProduct(code);
        var orderData = jsDPZ.app.order.getOrder().data;
        var orderDetails = orderData.Details;
        var dtString = jsDPZ.util.empty(orderDetails.OrderDateTime) ? jsDPZ.app.store.getStore().data.StoreAsOfTime : orderDetails.OrderDateTime;
        return !jsDPZ.util.empty(product) ? product.isActive({
          dtString: dtString
        }) : false;
      },

      /**
       * Verify a coupon is active or not, meaning it can be added to a users order.
       * @namespace jsDPZ.app
       * @method isCouponActive
       * @param code {String} coupon code
       * @return {Object} jsDPZ status message object
       */
      isCouponActive: function isCouponActive(code, afterMidnightCoupon) {
        var statusResults = $.extend(true, {}, jsDPZ.config.dataModel.STATUS_MESSAGE);
        var coupon = jsDPZ.app.catalog.getCatalog().getCoupon(code);
        var orderData = jsDPZ.app.order.getOrder().data;
        var orderDetails = orderData.Details;
        var serviceMethod = orderDetails.ServiceMethod;
        var dtString = jsDPZ.util.empty(orderDetails.OrderDateTime) ? jsDPZ.app.store.getStore().data.StoreAsOfTime : orderDetails.OrderDateTime; // START HOTSPOTS

        if (serviceMethod === "Delivery" && orderData.DeliveryHotspot && orderData.DeliveryHotspot.Id) {
          serviceMethod = "Hotspot";
        } // END HOTSPOTS


        if (!jsDPZ.util.empty(coupon) && orderData.isDucOrder && serviceMethod === "Carryout" && coupon.data.Tags && coupon.data.Tags.ServiceMethods === "Carside") {
          serviceMethod = "Carside";
        }

        if (!jsDPZ.util.empty(coupon)) {
          return coupon.isActive({
            dtString: dtString,
            serviceMethod: serviceMethod,
            afterMidnightCoupon: afterMidnightCoupon,
            isFutureOrder: !jsDPZ.util.empty(orderDetails.OrderDateTime)
          });
        }

        statusResults.ErrorCodes.push("eCouponInvalid");
        return statusResults;
      },

      /**
       * Set the menu/catalog
       * @namespace jsDPZ.app
       * @method setCatalog
       * @param data {Object} json catalog object
       * @return {Object} jsDPZ catalog object
       */
      // TODO : Use structured menu...
      setCatalog: function setCatalog(data) {
        jsDPZ.config.app.catalog = jsDPZ.obj.catalog(data);
        jsDPZ.topic("catalog.set").publish(jsDPZ.config.app.catalog);
        return jsDPZ.app.catalog.getCatalog();
      },

      /**
       * Takes a coupon from a raw Power Menu and transform it into JSON and stores it in jsDPZ.
       * @namespace jsDPZ.app
       * @method setCouponFromPower
       * @param data {Object} json object from a Power Menu service response <br />
       *  Code : "", <br />
       *  Description : "", <br />
       *  Name : "", <br />
       *  ImageCode : "", <br />
       *  Price : "", <br />
       *  Tags : "" // : delimited string <br />
       * @return {Object} jsDPZ catalog object
       */
      setCouponFromPower: function setCouponFromPower(data) {
        if (!jsDPZ.util.empty(data)) {
          var newData = $.extend(true, {}, jsDPZ.obj.coupon().data, {
            Bundle: data.Bundle,
            Code: data.Code,
            Description: data.Description,
            Name: data.Name,
            ImageCode: data.ImageCode,
            Price: data.Price,
            PulseCode: data.PulseCode || "",
            Tags: data.Tags,
            SortSeq: data.SortSeq
          });

          for (var tag in newData.Tags) {
            var tdata = newData.Tags[tag];

            if (typeof tdata == "string") {
              newData.Tags[tag] = tdata.split(":");

              if (newData.Tags[tag].length == 1) {
                newData.Tags[tag] = newData.Tags[tag][0];
              }
            }
          }

          jsDPZ.app.catalog.getCatalog().data.Coupons[data.Code] = newData;
        }

        return jsDPZ.app.catalog.getCatalog();
      },

      /**
       * Takes an array of quickList items and stores it in the catalog as cross sell items
       * @namespace jsDPZ.app
       * @method setCrossSellItems
       * @param data {Array} quickList items array
       * @return {Object} jsDPZ catalog object
       */
      setCrossSellItems: function setCrossSellItems(data) {
        if (!jsDPZ.util.empty(data) && $.isArray(data)) {
          jsDPZ.app.catalog.getCatalog().data.CrossSellItems = jsDPZ.app.catalog.getOrderableQuickList(data).data;
        }

        return jsDPZ.app.catalog.getCatalog();
      },

      /**
       * Get a list of cross sell items.
       * @namespace jsDPZ.app
       * @method getCrossSellQuicklist
       * @return {Object} jsDPZ cross sells quick list
       */
      getCrossSellQuicklist: function getCrossSellQuicklist() {
        var crossSellItems = jsDPZ.app.catalog.getCatalog().data.CrossSellItems;
        var quicklistData = [];

        for (var i = 0, iL = crossSellItems.length; i < iL; i++) {
          var itemSet = $.makeArray(crossSellItems[i]).map(function (item) {
            return $.extend(true, {}, item);
          });

          if (itemSet.every(function (eachItem) {
            return $.isFunction(eachItem.Conditional) ? eachItem.Conditional() : eachItem.Conditional;
          })) {
            quicklistData.push(itemSet.length == 1 ? itemSet[0] : itemSet);
          }
        }

        return jsDPZ.obj.quicklist(quicklistData);
      },

      /**
       * Validates items in a quicklist to make sure they are orderable, if not, they are removed from the list, and only the orderable items are returned
       * @namespace jsDPZ.app
       * @method getOrderableQuickList
       * @return {Object} jsDPZ cross sells quick list
       */
      getOrderableQuickList: function getOrderableQuickList(data, length) {
        function findCodeInArray(code, arr) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].Code == code) {
              return true;
            }
          }

          return false;
        }

        var quicklistData = [];

        if (!jsDPZ.util.empty(data) && $.isArray(data)) {
          var maxLength = !jsDPZ.util.empty(length) ? parseInt(length) : data.length;
          var catalog = jsDPZ.app.catalog.getCatalog();

          for (var i = 0, iL = data.length; i < iL; i++) {
            var itemSet = $.makeArray(data[i]).map(function (item) {
              return $.extend(true, {}, item);
            });
            var validItemSet = itemSet.filter(function (item) {
              var variant = null; // Coupon

              if (item.Type && item.Type === "Coupon") {
                variant = catalog.getCoupon(item.Code);

                if ($.isEmptyObject(variant)) {
                  return false;
                }
              } else {
                // Variant
                variant = catalog.getVariant(item.Code);

                if ($.isEmptyObject(variant)) {
                  return false;
                } // We add the toppings and sides of the variant


                var availableVariantToppings = catalog.getAvailableVariantToppingsData(variant.data.Code);

                for (var key in item.Toppings) {
                  if (!findCodeInArray(key, availableVariantToppings)) {
                    return false;
                    break;
                  }
                }

                var availableVariantSides = catalog.getAvailableVariantSidesData(variant.data.Code);

                for (var key in item.Sides) {
                  if (!findCodeInArray(key, availableVariantSides)) {
                    return false;
                    break;
                  }
                }
              }

              return true;
            });
            var addItemSetToArray = validItemSet.length >= 2 || validItemSet.length === itemSet.length;

            if (addItemSetToArray && quicklistData.length < maxLength) {
              $.each(validItemSet, function (i) {
                if (this.Type !== "Coupon") jsDPZ.app.catalog.addDefaultToppings(this);
              });
              quicklistData.push(validItemSet);
            }
          }
        }

        return jsDPZ.obj.quicklist(quicklistData);
      },

      /**
       * Adds the default toppings and sides to a quickListItem, only if the toppings/side is not explicitly defined on the object
       * @namespace jsDPZ.app
       * @param quickListItem {Object} a quicklist item as defined by jsDPZ.config.dataModel.QUICKLIST_VARIANT
       * @method addDefaultToppings
       */
      addDefaultToppings: function addDefaultToppings(quickListItem) {
        var catalog = jsDPZ.app.catalog.getCatalog();
        var variant = catalog.getVariant(quickListItem.Code);
        var defaultVariantToppings = catalog.getDefaultVariantToppingsData(variant.data.Code);
        $.each(defaultVariantToppings, function (index, topping) {
          if (quickListItem.Toppings[topping.Code] == null && topping.Availability.length > 0) {
            quickListItem.Toppings[topping.Code] = {
              "1/1": topping.Availability[0]
            };
          }
        });
        var defaultVariantSides = catalog.getDefaultVariantSidesData(variant.data.Code);
        $.each(defaultVariantSides, function (index, side) {
          if (quickListItem.Sides[side.Code] == null && side.Availability.length > 0) {
            quickListItem.Sides[side.Code] = side.Availability[0];
          }
        });
      }
    }
  });
})(jQuery);
/**
 * @class jsDPZ.app.customer
 * @uses config
 * @uses util
 * @uses obj
 * @static
 */


(function ($) {
  $.extend(jsDPZ.app, {
    customer: {
      /**
       * Get the current customer JSON Object
       * @namespace jsDPZ.app
       * @method getCustomer
       * @return {Object} jsDPZ customer object
       */
      getCustomer: function getCustomer() {
        if (jsDPZ.config.app.customer == null) {
          jsDPZ.config.app.customer = jsDPZ.obj.customer();
        } // Unencode the first/last name to make html entities become real characters (and this preserve accents and such)
        // Then html escape to make tags not fire
        // TODO: More permanent solution, possibly with setter/getter (that can survive a $.extend)


        jsDPZ.config.app.customer.data.FirstName = jsDPZ.util.sanitizeAndPreserveSpecialCharacters(jsDPZ.config.app.customer.data.FirstName);
        jsDPZ.config.app.customer.data.LastName = jsDPZ.util.sanitizeAndPreserveSpecialCharacters(jsDPZ.config.app.customer.data.LastName);
        return jsDPZ.config.app.customer;
      },

      /**
       * Get a quick list of items for users past items
       * @namespace jsDPZ.app
       * @method getPastItemsQuicklist
       * @return {Object} jsDPZ quicklist of past items
       */
      getPastItemsQuicklist: function getPastItemsQuicklist() {
        var catalog = jsDPZ.app.catalog.getCatalog();
        var items = jsDPZ.app.catalog.getOrderableQuickList($.extend(true, [], jsDPZ.app.customer.getCustomer().data.PastItems), jsDPZ.config.app.MAX_PAST_ITEMS).data;

        for (var i = 0, iL = items.length; i < iL; i++) {
          var item = items[i];
          var variant = catalog.getVariant(items[i].Code);
          /* Toppings, and remove weight "0" items */

          var productToppings = catalog.getDefaultProductToppingsData(variant.data.ProductCode);

          for (var j = 0, jL = productToppings.length; j < jL; j++) {
            if (jsDPZ.util.empty(item.Toppings[productToppings[j].Code])) {
              item.Toppings[productToppings[j].Code] = {
                "1/1": productToppings[j].Availability[0]
              };
            } else if (!jsDPZ.util.empty(item.Toppings[productToppings[j].Code]["1/1"]) && item.Toppings[productToppings[j].Code]["1/1"] == "0") {
              delete item.Toppings[productToppings[j].Code];
            }
          }
          /* Sides and remove weight "0" items */


          var productSides = catalog.getDefaultProductSidesData(variant.data.ProductCode);

          for (var j = 0, jL = productSides.length; j < jL; j++) {
            if (jsDPZ.util.empty(item.Sides[productSides[j].Code])) {
              item.Sides[productSides[j].Code] = productSides[j].Availability[0];
            } else if (item.Sides[productSides[j].Code] == "0") {
              delete item.Sides[productSides[j].Code];
            }
          }
        }

        return jsDPZ.obj.quicklist(items);
      },

      /**
       * Set a customer in jsDPZ
       * @namespace jsDPZ.app
       * @method setCustomer
       * @return {Object} jsDPZ customer object
       */
      setCustomer: function setCustomer(data) {
        jsDPZ.config.app.customer = jsDPZ.obj.customer(data);
        return jsDPZ.app.customer.getCustomer();
      },

      /**
       * Set a customer's past items in jsDPZ from raw Power Customer data.
       * @namespace jsDPZ.app
       * @method setPastItemsFromPower
       * @return {Object} jsDPZ customer object
       */
      setPastItemsFromPower: function setPastItemsFromPower(data) {
        return jsDPZ.app.customer.getCustomer().setPastItemsFromPower(data);
      },

      /**
       * Set a customer in jsDPZ from raw Power Customer data.
       * @namespace jsDPZ.app
       * @method setCustomerFromPower
       * @return {Object} jsDPZ customer object
       */
      setCustomerFromPower: function setCustomerFromPower(data) {
        // Remove customer order history if we're setting up the customer.
        jsDPZ.cache.expire("dpz_expire_on_order_and_auth_change" + dpz.market.activeLanguageCode);
        var customer = jsDPZ.app.customer.getCustomer().setDataFromPower(data);
        jsDPZ.topic("customer.data.synced").publish(customer);
        return customer;
      }
    }
  });
})(jQuery);
/**
 * @class jsDPZ.app.order
 * @uses config
 * @uses util
 * @uses obj
 * @static
 */


(function ($) {
  /**
   * @method findCouponInOrderCoupons
   * @param code {String} coupon code
   * @param orderCoupons {Object} a hash map of coupons
   * @return {boolean} true if the code was found, false otherwise
   * @private
   */
  function findCouponInOrderCoupons(code, orderCoupons) {
    for (var i = 0, iL = orderCoupons.length; i < iL; i++) {
      if (orderCoupons[i].Code == code) {
        return true;
      }
    }

    return false;
  }

  function addZeroedPart(toppingCode, part) {
    if (part) {
      if (this[toppingCode] === 0) delete this[toppingCode];
      if (!this[toppingCode]) this[toppingCode] = {};
      if (!this[toppingCode][part]) this[toppingCode][part] = 0;
    } else {
      this[toppingCode] = 0;
    }
  }

  $.extend(jsDPZ.app, {
    order: {
      /**
       * Attempts to add a coupon to users order and return a STATUS_MESSAGE object with info regarding success or failure. This function will check if a coupon is active, exclusivity, and if duplicates are allowed
       * @namespace jsDPZ.app
       * @method addCouponAndReturnStatus
       * @param data {Object} coupon object with a basic structure of jsDPZ.config.dataModel.ORDER_COUPON
       * @return {Promise} returns a promise resolved with a jsDPZ.config.dataModel.STATUS_MESSAGE object
       */
      addCouponAndReturnStatus: function addCouponAndReturnStatus(data, afterMidnightCoupon) {
        var promise = $.Deferred();
        var statusResults = $.extend(true, {}, jsDPZ.config.dataModel.STATUS_MESSAGE);

        if (!jsDPZ.util.empty(data)) {
          var orderCoupon = $.extend(true, {}, jsDPZ.config.dataModel.ORDER_COUPON, data);
          var catalog = jsDPZ.app.catalog.getCatalog();
          var coupon = catalog.getCoupon(orderCoupon.Code);
          var orderDetails = jsDPZ.app.order.getOrder().data.Details;
          $.extend(statusResults, jsDPZ.app.catalog.isCouponActive(orderCoupon.Code, afterMidnightCoupon));

          if (statusResults.Success) {
            var couponsCleared;
            var couponType = coupon.getCombineFlag();
            var duplicatesNotAllowed = jsDPZ.util.empty(coupon.data.Tags.MultiSame);

            if (findCouponInOrderCoupons(orderCoupon.Code, orderDetails.Coupons)) {
              // is duplicate
              if (duplicatesNotAllowed) {
                // if duplicates not allowed
                statusResults.ErrorCodes.push("eCouponDuplicate");
                statusResults.Success = false;
                promise.resolve(statusResults);
                return promise;
              } else if (!jsDPZ.util.empty(coupon.data.Tags.LimitPerOrder)) {
                // Check if the coupon has exceeded the maximum number allowed per order
                var maximumAllowed = parseInt(coupon.data.Tags.LimitPerOrder) - 1;
                var couponsFound = 0;

                for (var i = 0, iL = orderDetails.Coupons.length; i < iL; i++) {
                  var cData = orderDetails.Coupons[i];

                  if (orderCoupon.Code === cData.Code) {
                    if (couponsFound >= maximumAllowed) {
                      // No need to continue searching we're max cap
                      statusResults.ErrorCodes.push("eCouponDuplicate");
                      statusResults.Success = false;
                      promise.resolve(statusResults);
                      return promise;
                    }

                    couponsFound++;
                  }
                }
              }
            } else {
              // not a duplicate
              // We set the default clear exclusive coupons if the new coupon is a non loyalty/exclusive-compatiable coupon
              var removeCouponsData = {
                deleteFailure: true,
                successFilter: function successFilter(filteredCoupon, catalogCoupon) {
                  var tmpCouponType = catalogCoupon.getCombineFlag();
                  return tmpCouponType == "Exclusive" && coupon.data && !coupon.isLoyaltyCoupon() && !coupon.data.Tags.ExclusiveCompatible;
                }
              };

              if (couponType == "Normal") {
                // Remove coupons with normal or exclusive combine flags
                removeCouponsData.successFilter = function (filteredCoupon, catalogCoupon) {
                  var tmpCouponType = catalogCoupon.getCombineFlag();
                  return tmpCouponType == "Normal" || tmpCouponType == "Exclusive";
                };
              } else if (couponType == "Exclusive") {
                // Remove all non loyalty and coupons that work with exclusive
                removeCouponsData.successFilter = function (filteredCoupon, catalogCoupon) {
                  return !catalogCoupon.isLoyaltyCoupon() && !catalogCoupon.data.Tags.ExclusiveCompatible;
                };
              } // Remove the filtered coupons


              couponsCleared = jsDPZ.app.order.getOrder().removeCoupons(removeCouponsData);
            }

            $.when(couponsCleared).then(function () {
              orderCoupon.Price = coupon.data.Price;
              jsDPZ.app.order.getOrder().addCoupon(orderCoupon);
              promise.resolve(statusResults);
            });
          } else {
            statusResults.Success = false;
            promise.resolve(statusResults);
          }
        } else {
          statusResults.ErrorCodes.push("eEmpty");
          promise.resolve(statusResults);
        }

        return promise;
      },

      /**
       * Attempts to add a product variant to order and return a STATUS_MESSAGE object with info regarding success or failure.
       * @namespace jsDPZ.app
       * @method addVariantAndReturnStatus
       * @param data {Object} variant object with a basic structure of jsDPZ.config.dataModel.ORDER_VARIANT
       * @return {Object} jsDPZ.config.dataModel.STATUS_MESSAGE object
       */
      addVariantAndReturnStatus: function addVariantAndReturnStatus(data) {
        var statusResults = $.extend(true, {}, jsDPZ.config.dataModel.STATUS_MESSAGE);

        if (!jsDPZ.util.empty(data)) {
          var orderVariant = $.extend(true, {}, jsDPZ.config.dataModel.ORDER_VARIANT, data);
          orderVariant.isNew = true;
          var catalog = jsDPZ.app.catalog.getCatalog();
          var variant = catalog.getVariant(orderVariant.Code);
          var sidesAsVariants = {};
          var sidesAdded = false;
          orderVariant.Code.split("/").forEach(function (code) {
            var variant = catalog.getVariant(code);

            if (!jsDPZ.util.empty(variant)) {
              var product = catalog.getProduct(variant.data.ProductCode);
              var order = jsDPZ.app.order.getOrder();
              /* Check Sides */

              if (!jsDPZ.util.empty(orderVariant.Sides)) {
                var maxSides = parseInt(product.data.Tags.MaxOptionQty);
                var availableSides = catalog.getAvailableVariantSidesData(variant.data.Code);
                var defaultSides = catalog.getDefaultVariantSidesData(variant.data.Code);
                var availableSidesData = {};

                for (var i = 0, iL = availableSides.length; i < iL; i++) {
                  var sidesData = availableSides[i];
                  availableSidesData[sidesData.Code] = true;
                }

                var allowedSides = 0;

                for (var i = 0, iL = defaultSides.length; i < iL; i++) {
                  allowedSides += parseInt(defaultSides[i].Availability[0]);
                }

                var totalSides = 0;
                var currentSides = 0;
                var sidesError = false;

                for (var code in orderVariant.Sides) {
                  if (availableSidesData[code]) {
                    var amt = orderVariant.Sides[code];
                    var amount = parseInt(amt);
                    totalSides += amt;
                    currentSides += amt;

                    if (totalSides > maxSides) {
                      sidesError = true;
                    } else if (currentSides > allowedSides && !sidesError) {
                      var tmpProduct = catalog.getProduct("F_" + code);
                      var removedAmt = currentSides - allowedSides;
                      var newAmt = amt - removedAmt;
                      currentSides -= removedAmt;

                      if (!jsDPZ.util.empty(tmpProduct)) {
                        sidesAsVariants[tmpProduct.getVariantCodeData()[0]] = removedAmt;

                        if (newAmt == 0) {
                          delete orderVariant.Sides[code];
                        } else {
                          orderVariant.Sides[code] = newAmt;
                        }
                      }
                    }
                  } else {
                    sidesError = true;
                  }

                  if (sidesError) {
                    break;
                  }
                }

                if (sidesError) {
                  statusResults.ErrorCodes.push("eSidesError");
                  return statusResults;
                }
              }
              /* Check Quantity */


              var existingOrderVariant = order.getItemData(orderVariant);
              orderVariant.Qty = parseInt(orderVariant.Qty, 10);

              if (isNaN(orderVariant.Qty) || orderVariant.Qty <= 0) {
                statusResults.ErrorCodes.push("eQtyError");
                return statusResults;
              } else {
                if (orderVariant.Qty > jsDPZ.config.app.MAX_QUANTITY) {
                  orderVariant.Qty = jsDPZ.config.app.MAX_QUANTITY;
                  statusResults.SuccessCodes.push("sQtyReducedMax");
                }

                if (!jsDPZ.util.empty(existingOrderVariant) && existingOrderVariant.ID != orderVariant.ID && orderVariant.Qty + existingOrderVariant.Qty > jsDPZ.config.app.MAX_QUANTITY) {
                  orderVariant.Qty = jsDPZ.config.app.MAX_QUANTITY - existingOrderVariant.Qty;
                  statusResults.SuccessCodes.push("sQtyReducedMax");
                }
              } // Add Additional Side Variants


              if (!sidesAdded) {
                for (var code in sidesAsVariants) {
                  jsDPZ.app.order.addVariantAndReturnStatus($.extend(true, {}, jsDPZ.config.dataModel.ORDER_VARIANT, {
                    Code: code,
                    Qty: orderVariant.Qty * sidesAsVariants[code]
                  }));
                }

                sidesAdded = true;
              }
            }
          }); // Add the Variant

          if (!statusResults.ErrorCodes.length) {
            jsDPZ.app.order.getOrder().addVariant(orderVariant);
            statusResults.Success = true;
          }
        } else {
          statusResults.ErrorCodes.push("eEmpty");
        }

        return statusResults;
      },

      /**
       * Get a users order
       * @namespace jsDPZ.app
       * @method getOrder
       * @return {Object} jsDPZ order object
       */
      getOrder: function getOrder() {
        if (jsDPZ.config.app.order == null) {
          jsDPZ.config.app.order = jsDPZ.obj.order();
        }

        return jsDPZ.config.app.order;
      },

      /**
       * Get a users order and prepares it to be sent to the Power service.
       * @namespace jsDPZ.app
       * @method getOrderForPowerData
       * @param data {Object} data object with the overrides per market
       * @return {Object} jsDPZ order object prepared for Power
       */
      getOrderForPowerData: function getOrderForPowerData(data) {
        var catalogObject = jsDPZ.app.catalog.getCatalog();
        var orderObject = jsDPZ.app.order.getOrder();
        var customerObj = jsDPZ.app.customer.getCustomer();
        var customerIsLoggedIn = customerObj.data.CustomerID !== "";
        var loyaltyIsOk = customerObj.data.Session.loyaltyIsOk != false;
        var isLoyaltyCustomer = customerObj.isLoyaltyCustomer();
        var options = $.extend(true, {}, data);
        var failedToAdd = false;

        if (!jsDPZ.util.empty(orderObject.data) && !jsDPZ.util.empty(catalogObject.data)) {
          if (!orderObject.isCarryoutOrder()) orderObject.fixRequiredDeliverySides(catalogObject);
          var oD = orderObject.data;
          var orderRequest = {
            Order: $.extend(true, {}, jsDPZ.config.dataModel.ORDER_REQUEST, {
              LanguageCode: dpz.market.activeLanguageCode,
              CustomerID: oD.Customer.CustomerID,
              Phone: oD.Customer.Phone,
              PhonePrefix: oD.Customer.PhonePrefix,
              Email: oD.Customer.Email,
              FirstName: oD.Customer.FirstName,
              HotspotsLite: oD.Details.HotspotsLite,
              LastName: oD.Customer.LastName,
              Extension: oD.Customer.Extension,
              OrderID: oD.Details.OrderID,
              StoreID: oD.Details.StoreID,
              ServiceMethod: oD.isDucOrder ? "Carside" : oD.Details.ServiceMethod,
              Address: oD.Customer.Address,
              Payments: oD.Details.Payments,
              FutureOrderTime: oD.Details.OrderDateTime,
              Notifications: oD.Notifications
            })
          }; // START HOTSPOTS
          // Send the delivery hotspot node if we have an id
          // Only send necessary variables

          if (oD.DeliveryHotspot && oD.DeliveryHotspot.Id) {
            orderRequest.Order.DeliveryHotspot = {
              Name: oD.DeliveryHotspot.Name,
              Id: oD.DeliveryHotspot.Id,
              Description: oD.DeliveryHotspot.Description
            };
          } // END HOTSPOTS
          // Extend the orderRequest for price, validate, and place orders with custom market information.


          orderRequest.Order.OrderInfoCollection = $.extend(true, $.isPlainObject(options.orderInfo) ? {} : [], options.orderInfo, oD.OrderInfoCollection); // We have to do some transformation to get an address that pulse understands?!

          var tmpAddress = $.extend(true, {}, oD.Customer.Address);

          if (tmpAddress.AddressLine2 && tmpAddress.AddressLine2[0] == "#") {
            tmpAddress.AddressLine2 = tmpAddress.AddressLine2.substring(1);
          }

          orderRequest.Order.Address["OrganizationName"] = tmpAddress.LocationName;
          orderRequest.Order.Address.AddressLine2 = tmpAddress.AddressLine3;
          orderRequest.Order.Address.AddressLine3 = tmpAddress.AddressLine4;
          orderRequest.Order.Address.AddressLine4 = tmpAddress.SectorName;
          orderRequest.Order.Address.SectorName = "";
          orderRequest.Order.Address.LocationName = ""; // remove empty address keys

          for (var key in orderRequest.Order.Address) {
            if (orderRequest.Order.Address[key] == "") {
              delete orderRequest.Order.Address[key];
            }
          } // Remove Coordinates node from address for empty lat/lng (mutually inclusive)


          if (orderRequest.Order.Address.hasOwnProperty("Coordinates") && orderRequest.Order.Address.Coordinates.Latitude === 0) {
            delete orderRequest.Order.Address.Coordinates;
          } // Add Partners from order


          for (var key in oD.Partners) {
            var obj = oD.Partners[key];
            orderRequest.Order.Partners[key] = {
              Tags: $.extend(true, {
                token: obj.Token
              }, obj.Tags)
            };
          } // Add Tags from order


          for (var key in oD.Tags) {
            var obj = oD.Tags[key];
            orderRequest.Order.Tags[key] = obj;
          } // Remove future order time is not time set


          if (jsDPZ.util.empty(orderRequest.Order.FutureOrderTime)) {
            delete orderRequest.Order.FutureOrderTime;
          } // Add the coupons


          for (var i = 0, iL = oD.Details.Coupons.length; i < iL; i++) {
            var orderRequestCoupon = $.extend(true, {}, oD.Details.Coupons[i]);
            delete orderRequestCoupon["Price"];
            delete orderRequestCoupon["Fulfilled"];
            orderRequest.Order.Coupons.push(orderRequestCoupon);
          } // If we know definitively if this is a loyalty customer, send flag to tell power if LoyaltyCustomer is true or false.
          // If services are down, or customer is not logged in, omit flag and let power do anonymous lookup.


          if (loyaltyIsOk && customerIsLoggedIn) {
            // Also add customerID, since this is always required for a loyalty priceOrder call
            orderRequest.Order.CustomerID = customerObj.data.CustomerID; // Add the loyalty customer and check balance flag

            $.extend(true, orderRequest.Order, {
              Loyalty: {
                LoyaltyCustomer: isLoyaltyCustomer,
                CalculatePotentialPoints: options.calculatePotentialPoints
              }
            });
          }
          /* Add the order variants */


          failedToAdd = oD.Details.Variants.find(function (variant) {
            variant.Code = jsDPZ.util.htmlUnEscape(variant.Code);
            var optionsToZero = {};
            var boundAddZeroedPart = addZeroedPart.bind(optionsToZero);
            var variantCodeArray = variant.Code.split("/");
            var variantsData = variantCodeArray.map(function (productCode) {
              return catalogObject.getVariant(productCode);
            });
            var emptyVariants = variantsData.some(function (emptyVariantCheck) {
              return jsDPZ.util.empty(emptyVariantCheck.data);
            });
            if (emptyVariants) return true; //a return of true means this failedToAdd, aka failed to pass validation

            var products = variantsData.map(function (emptyVariantCheck) {
              return catalogObject.getProduct(emptyVariantCheck.data.ProductCode);
            });
            var emptyProducts = products.some(function (product) {
              return jsDPZ.util.empty(product);
            });
            if (emptyProducts) return true; //a return of true means this failedToAdd, aka failed to pass validation

            var orderRequestProduct = $.extend(true, {}, variant);
            orderRequestProduct.Options = {};
            $.extend(orderRequestProduct.Options, orderRequestProduct.Sides, orderRequestProduct.Toppings);
            delete orderRequestProduct.Toppings;
            delete orderRequestProduct.Sides;
            delete orderRequestProduct.Price;
            products.forEach(function (product) {
              product.getDefaultToppingsData().forEach(function (topping) {
                var splitToppingBaseNumber;
                var partsToCheck;

                if (topping.Code in orderRequestProduct.Options) {
                  splitToppingBaseNumber = Object.keys(orderRequestProduct.Options[topping.Code])[0].split("/")[1];

                  if (splitToppingBaseNumber > 1) {
                    partsToCheck = jsDPZ.config.app.PARTS_MAP[splitToppingBaseNumber];
                    partsToCheck.forEach(function (part) {
                      if (!(part in orderRequestProduct.Options[topping.Code])) {
                        boundAddZeroedPart(topping.Code, part);
                      }
                    });
                  }
                } else {
                  boundAddZeroedPart(topping.Code);
                }
              });
              product.getDefaultSidesData().forEach(function (side) {
                if (jsDPZ.util.empty(orderRequestProduct.Options[side.Code])) {
                  orderRequestProduct.Options[side.Code] = 0;
                }
              });
            });
            $.extend(true, orderRequestProduct.Options, optionsToZero);
            orderRequest.Order.Products.push(orderRequestProduct);
            return false; //no errors, or this did not fail to add, aka we pass validation
          });

          if (!failedToAdd) {
            return orderRequest;
          }
        }

        return {};
      },

      /**
       * Set an order in jsDPZ
       * @namespace jsDPZ.app
       * @method setOrder
       * @param data {Object} jsDPZ order object
       * @return {Object} jsDPZ order object
       */
      setOrder: function setOrder(data) {
        jsDPZ.config.app.order = jsDPZ.obj.order(data);
        return jsDPZ.app.order.getOrder();
      },

      /**
       * Update the fulfiller based on what coupon and products have been added to the users order
       * @namespace jsDPZ.app
       * @method updateFulfillerFromPowerCoupon
       * @param data {Object} coupon object
       * @return {Object} jsDPZ order object
       */
      updateFulfillerFromPowerCoupon: function updateFulfillerFromPowerCoupon(data, orderedSizeArray) {
        if (!jsDPZ.util.empty(data)) {
          var catalog = jsDPZ.app.catalog.getCatalog();

          var getAvailableSizesCrusts = function getAvailableSizesCrusts(product, sizes) {
            return product.Variants.reduce(function (acc, currV) {
              if (sizes && (!product.PizzaFlavorCode || catalog.data.Variants[currV].FlavorCode === product.PizzaFlavorCode)) {
                acc.push(catalog.data.Variants[currV].SizeCode);
              } else if (!sizes) {
                acc.push(catalog.data.Variants[currV].FlavorCode);
              }

              return acc;
            }, []);
          };

          var getExactMatch = function getExactMatch(product, productGroupData) {
            return product.Variants.find(function (variantCode) {
              var found;

              if (productGroupData.Default && productGroupData.Default.PizzaSizeCode == catalog.data.Variants[variantCode].SizeCode && productGroupData.Default.PizzaFlavorCode === catalog.data.Variants[variantCode].FlavorCode) {
                found = true;
              }

              return found;
            });
          };

          var getIntersection = function getIntersection(arrayA, arrayB) {
            return arrayA.filter(function (element) {
              return arrayB.indexOf(element) !== -1;
            });
          };

          var newGroup = $.extend(true, {}, jsDPZ.config.dataModel.ORDER_FULFILLER_GROUP, {
            GroupID: data.Code
          });

          for (var i = 0, iL = data.ProductGroups.length; i < iL; i++) {
            var productGroupData = data.ProductGroups[i];
            var newGroupCondition = [];
            var tmpProductType = productGroupData.Default.CategoryCode;
            /* Product Template */

            var productTemplate = $.extend(true, {}, jsDPZ.config.dataModel.ORDER_FULFILLER_PRODUCT);

            if ((tmpProductType == "Pasta" || tmpProductType == "Pizza") && !jsDPZ.util.empty(productGroupData.Default.FlavorCode)) {
              productTemplate.FlavorCode = productGroupData.Default.FlavorCode;
            }

            if (!(tmpProductType == "GSalad" || tmpProductType == "Sides" || tmpProductType == "Sandwich" || tmpProductType == "Pasta") && !jsDPZ.util.empty(productGroupData.Default.SizeCode)) {
              productTemplate.SizeCode = productGroupData.Default.SizeCode;
            }
            /* Create the Products*/


            var tmpProducts = {};

            for (var j = 0, jL = productGroupData.ProductCodes.length; j < jL; j++) {
              var vD = catalog.getVariant(productGroupData.ProductCodes[j]).data;

              if (!jsDPZ.util.empty(vD)) {
                if (jsDPZ.util.empty(tmpProducts[vD.ProductCode])) {
                  tmpProducts[vD.ProductCode] = $.extend(true, {}, productTemplate, {
                    Code: vD.ProductCode
                  }, {
                    ProductType: catalog.data.Products[vD.ProductCode].ProductType
                  });
                }

                tmpProducts[vD.ProductCode].Variants.push(vD.Code);
              }
            }

            for (var key in tmpProducts) {
              var availableSizes;
              var sizeIntersection;
              var availableCrusts;
              var crustsIntersection;
              var exactMatch;
              var largestAvailable = tmpProducts[key].Variants.sort(function (a, b) {
                return orderedSizeArray.indexOf(catalog.data.Variants[b].SizeCode) - orderedSizeArray.indexOf(catalog.data.Variants[a].SizeCode);
              });
              var largestAvailableWithMatchingCrust = largestAvailable.filter(function (variantCode) {
                return catalog.data.Variants[variantCode].FlavorCode === productGroupData.Default.PizzaFlavorCode;
              })[0];

              if (tmpProducts[key].ProductType == "Pizza") {
                if (!tmpProducts[key].SizeCode || !tmpProducts[key].FlavorCode) {
                  exactMatch = getExactMatch(tmpProducts[key], productGroupData);
                  availableSizes = getAvailableSizesCrusts(tmpProducts[key], true);
                  sizeIntersection = getIntersection(orderedSizeArray || [], availableSizes);
                  availableCrusts = getAvailableSizesCrusts(tmpProducts[key]);
                  crustsIntersection = getIntersection(availableCrusts, [tmpProducts[key].PizzaFlavorCode]);

                  if (exactMatch) {
                    tmpProducts[key].PizzaSizeCode = catalog.data.Variants[exactMatch].SizeCode;
                    tmpProducts[key].PizzaFlavorCode = catalog.data.Variants[exactMatch].FlavorCode;
                  } else {
                    if (largestAvailableWithMatchingCrust) {
                      tmpProducts[key].PizzaSizeCode = catalog.data.Variants[largestAvailableWithMatchingCrust].SizeCode;
                      tmpProducts[key].PizzaFlavorCode = catalog.data.Variants[largestAvailableWithMatchingCrust].FlavorCode;
                    } else {
                      tmpProducts[key].PizzaSizeCode = catalog.data.Variants[largestAvailable[0]].SizeCode;
                      tmpProducts[key].PizzaFlavorCode = catalog.data.Variants[largestAvailable[0]].FlavorCode;
                    }
                  }
                } else {
                  if (tmpProducts[key].SizeCode && !tmpProducts[key].PizzaSizeCode) tmpProducts[key].PizzaSizeCode = tmpProducts[key].SizeCode;
                  if (tmpProducts[key].FlavorCode && !tmpProducts[key].PizzaFlavorCode) tmpProducts[key].PizzaFlavorCode = tmpProducts[key].FlavorCode;
                }
              }

              newGroupCondition.push(tmpProducts[key]);
            }
            /* Add an entry for each Quantity */


            for (var x = 0; x < productGroupData.RequiredQty; x++) {
              newGroup.UnFulfilled.push(newGroupCondition);
            }

            newGroup.TotalSteps = newGroup.UnFulfilled.length;
          }

          return jsDPZ.app.order.getOrder().addFulfillerGroup(newGroup);
        }

        return jsDPZ.app.order.getOrder();
      },

      /**
       * Update the order with what an raw order returned from Power
       * @namespace jsDPZ.app
       * @method updateOrderFromPower
       * @param data {Object} coupon object
       * @return {Object} jsDPZ order object
       */
      updateOrderFromPower: function updateOrderFromPower(data) {
        if (!jsDPZ.util.empty(data)) {
          if (!jsDPZ.util.empty(data.Order.EstimatedWaitMinutes)) {
            jsDPZ.app.store.getStore().data.EstimatedWaitMinutes = data.Order.EstimatedWaitMinutes;
          }
        }

        return jsDPZ.app.order.getOrder().updateDataFromPowerResponse(data);
      },
      tokenizeCreditCardOrder: function tokenizeCreditCardOrder(cardPayment) {
        var order = jsDPZ.app.order.getOrder().data.Details;
        var storeID = order.StoreID;
        var cardPayment = cardPayment || order.Payments.find(function (payment) {
          return payment.Type === "CreditCard";
        });
        var promise = $.Deferred(); //If already tokenized by saveCard do not tokenize

        if (cardPayment && !cardPayment.CardID) {
          jsDPZ.ajax.getTokenizationTemplateWithFallback({
            storeID: storeID,
            cardPayment: cardPayment,
            retryCount: 0,
            failureTokenType: null,
            promise: null
          }).then(promise.resolve).fail(promise.reject);
        } else if (cardPayment && cardPayment.CardID) {
          // Previously tokenized card
          promise.resolve({
            token: true,
            tokenType: false
          });
        } else {
          //Non Credit card orders, no tokenization required
          promise.resolve({
            token: false
          });
        }

        return promise;
      }
    }
  });
})(jQuery);
/**
 * @class jsDPZ.app.search
 * @uses config
 * @uses obj
 * @static
 */


(function ($) {
  $.extend(jsDPZ.app, {
    search: {
      /**
       * Get a store search object
       * @namespace jsDPZ.app
       * @method getStoreSearch
       * @return {Object} jsDPZ store search object
       */
      getStoreSearch: function getStoreSearch() {
        if (jsDPZ.config.app.storeSearch == null) {
          jsDPZ.config.app.storeSearch = jsDPZ.obj.storeSearch();
        }

        return jsDPZ.config.app.storeSearch;
      },

      /**
       * Set a store search object
       * @namespace jsDPZ.app
       * @method setStoreSearch
       * @return {Object} jsDPZ store search object
       */
      setStoreSearch: function setStoreSearch(data) {
        jsDPZ.config.app.storeSearch = jsDPZ.obj.storeSearch(data);
        return jsDPZ.app.search.getStoreSearch();
      },

      /**
       * Set a store search object with data requested from Power Store service.
       * @namespace jsDPZ.app
       * @method setStoreSearchFromPower
       * @return {Object} jsDPZ store search object
       */
      setStoreSearchFromPower: function setStoreSearchFromPower(data) {
        return jsDPZ.app.search.getStoreSearch().setDataFromPower(data);
      },

      /**
       * Updates the users session with the searched for store.
       * @namespace jsDPZ.app
       * @method updateSessionStoreFromSearch
       * @param id {String} store ID
       * @param ignoreSearchFields {Array} Array with the fields that won't be synced back from the search
       * @return {Object} jsDPZ store search object
       */
      updateSessionStoreFromSearch: function updateSessionStoreFromSearch(id, ignoreSearchFields) {
        if (!jsDPZ.util.empty(id)) {
          var storeSearch = jsDPZ.app.search.getStoreSearch();
          var stores = storeSearch.getStores();

          for (var i = 0, iL = stores.length; i < iL; i++) {
            var store = stores[i];

            if (id == store.data.StoreID) {
              var _searchData$Coordinat, _searchData$Coordinat2;

              var customerSession = jsDPZ.app.customer.getCustomer().getSessionData();
              var searchData = storeSearch.getSearchedAddress().data;
              var newAddressFields = Object.entries(_objectSpread({
                Street: searchData.Street,
                AddressLine3: searchData.AddressLine3,
                AddressLine4: searchData.AddressLine4,
                City: searchData.City,
                Region: searchData.Region,
                PostalCode: searchData.PostalCode
              }, ((_searchData$Coordinat = searchData.Coordinates) === null || _searchData$Coordinat === void 0 ? void 0 : _searchData$Coordinat.Latitude) && ((_searchData$Coordinat2 = searchData.Coordinates) === null || _searchData$Coordinat2 === void 0 ? void 0 : _searchData$Coordinat2.Longitude) && {
                Coordinates: searchData.Coordinates
              })).filter(function (data) {
                return jsDPZ.util.empty(ignoreSearchFields) || !ignoreSearchFields.includes(data[0]);
              }).reduce(function (syncedFields, data) {
                syncedFields[data[0]] = data[1];
                return syncedFields;
              }, {});
              customerSession.Address = $.extend(true, {}, customerSession.Address, newAddressFields);
              customerSession.StoreID = store.data.StoreID;
              customerSession.ServiceMethod = store.data.IsDeliveryStore ? customerSession.ServiceMethod : "Carryout";
              jsDPZ.app.store.setStore(store.data);
              break;
            }
          }
        }

        return jsDPZ.app.search.getStoreSearch();
      }
    }
  });
})(jQuery);
/**
 * @class jsDPZ.app.store
 * @uses config
 * @uses app
 * @uses obj
 * @static
 */


(function ($) {
  $.extend(jsDPZ.app, {
    store: {
      /**
       * Get a store object
       * @namespace jsDPZ.app
       * @method getStore
       * @return {Object} jsDPZ store object
       */
      getStore: function getStore() {
        if (jsDPZ.config.app.store == null) {
          jsDPZ.config.app.store = jsDPZ.obj.store();
        }

        return jsDPZ.config.app.store;
      },

      /**
       * Set a store object with a jsDPZ store object
       * @namespace jsDPZ.app
       * @method setStore
       * @param data {Object} jsDPZ store object
       * @return {Object} jsDPZ store object
       */
      setStore: function setStore(data) {
        jsDPZ.config.app.store = jsDPZ.obj.store(data);
        return jsDPZ.app.store.getStore();
      },

      /**
       * Set a store object with raw Power Data
       * @namespace jsDPZ.app
       * @method setStoreFromPower
       * @param data {Object} Power store object
       * @return {Object} jsDPZ store object
       */
      setStoreFromPower: function setStoreFromPower(data) {
        return jsDPZ.app.store.getStore().setDataFromPower(data);
      }
    }
  });
})(jQuery);
/**
* The cache module provides methods for storing and retrieving data in localStorage
* @module cache
*/

/**
* @class jsDPZ.cache
* @static
*/


(function () {
  /**
    * Helper method to create a localStorage key for storing the time the cache was created.
    * @namespace jsDPZ.cache
    * @method createTimeKey
    * @param key {String} unique identifier for the cache
    * @return {String} key for cache time
    * @private
    */
  function createTimeKey(key) {
    return key;
  }
  /**
    * Helper method to create a localStorage key for storing the data for the cache
    * @namespace jsDPZ.cache
    * @method createDataKey
    * @param key {String} unique identifier for the cache
    * @return {String} key for cache data
    * @private
    */


  function createDataKey(key) {
    return key + "_data";
  }
  /**
    * Generate the time value to correspond to the time key. This value is used to determine when to expire the cache
    * @namespace jsDPZ.cache
    * @method createTimeValue
    * @param key {String} unique identifier for the cache
    * @param freshness {Number} how many milliseconds to keep the data cached
    * @return {String} time value for when to expire the cache
    * @private
    */


  function createTimeValue(key, freshness) {
    return key + "|" + (new Date().getTime() + freshness);
  }
  /**
    * Helper method to see if localStorage is supported by the browser
    * @namespace jsDPZ.cache
    * @method localStorageAvailable
    * @return {boolean} true if localStorage is available false otherwise
    * @private
    */


  function localStorageAvailable() {
    // Modernizer Check
    try {
      localStorage.setItem("__x", "x");
      localStorage.removeItem("__x");
      return true;
    } catch (e) {
      return false;
    }
  }

  jsDPZ.cache = {
    /**
        * Method to see if localStorage is supported by the browser
        * @namespace jsDPZ.cache
        * @method isLocalStorageAvailable
        * @return {boolean} true if localStorage is available false otherwise
        */
    isLocalStorageAvailable: localStorageAvailable,

    /**
        * Method to see if localStorage is supported by the browser
        * @namespace jsDPZ.cache
        * @method expire
        * @param key {String} name cache to expire
        */
    expire: function expire(key) {
      if (localStorageAvailable()) {
        localStorage.removeItem(createTimeKey(key));
        localStorage.removeItem(createDataKey(key));
      }

      return null;
    },

    /**
        * Retrieve the cached data from localStorage
        * @namespace jsDPZ.cache
        * @method get
        * @param options {Object} an object with the following keys <br />
        * 	key : "", string used for locaStorage key <br />
        *  identifier : "", url of requested service <br />
        * @return {String} cached data that maps to the key/identifier pair
        */
    get: function get(options) {
      var settings = $.extend({
        key: "",
        identifier: ""
      }, options);

      if (localStorageAvailable() && settings.key != "") {
        var timeData = localStorage.getItem(createTimeKey(settings.key));

        if (timeData != null) {
          var timeParts = timeData.split("|");

          if (timeParts.length == 2) {
            if (timeParts[0] == settings.identifier) {
              if (new Date().getTime() <= parseInt(timeParts[1], 10)) {
                return localStorage.getItem(createDataKey(settings.key));
              } else {
                jsDPZ.cache.expire(settings.key);
              }
            }
          }
        }
      }

      return null;
    },

    /**
        * Store cached data in localStorage
        * @namespace jsDPZ.cache
        * @method set
        * @param options {Object} an object with the following keys <br />
        * 	key : "", string used for localStorage key associated with data ex: locaStorage[key]
        *	identifier : "", url of requested service
        *	data : "", stored data value to be retrieved later for use
        *	freshness : 600000, how soon in the future the cache will expire in ms
        * @return {String} cached data that maps to the provided key/identifier pair
        */
    set: function set(options) {
      var settings = $.extend({
        key: "",
        identifier: "",
        data: "",
        freshness: 600000
      }, options);

      if (localStorageAvailable()) {
        if (settings.key != "") {
          localStorage.setItem(createTimeKey(settings.key), createTimeValue(settings.identifier, settings.freshness));
          localStorage.setItem(createDataKey(settings.key), settings.data);
        }
      }

      return settings.data;
    }
  };
})();
/**
 * The config module provides a set of data models, and configurations for jsDPZ
 * @module config
 */

/**
 * The app class is a namespace to store all application data and configurations.
 * @class app
 * @namespace jsDPZ.config
 * @static
 */


(function ($) {
  $.extend(jsDPZ.config, {
    app: {
      setConfig: function setConfig() {
        var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            activeLanguageCode = _ref8.activeLanguageCode,
            marketCode = _ref8.marketCode,
            _ref8$numbers = _ref8.numbers;

        _ref8$numbers = _ref8$numbers === void 0 ? {} : _ref8$numbers;
        var marketPriceBase = _ref8$numbers.money_digits_after_decimal,
            _ref8$order = _ref8.order;
        _ref8$order = _ref8$order === void 0 ? {} : _ref8$order;
        var _ref8$order$useMinimu = _ref8$order.useMinimumDeliveryOrderAmountOverride,
            useMinimumDeliveryOrderAmountOverride = _ref8$order$useMinimu === void 0 ? false : _ref8$order$useMinimu;
        $.extend(true, this, {
          ajax: {
            headers: {
              "Accept-Language": "".concat(activeLanguageCode, "-").concat(marketCode)
            }
          },
          priceConfig: {
            mantissa: marketPriceBase,
            usableConversionValue: "1e" + marketPriceBase
          },
          storeConfig: {
            useMinimumDeliveryOrderAmountOverride: useMinimumDeliveryOrderAmountOverride
          }
        });
      },

      /**
       * The language the applications is rendering in. For example in the U.S. we have English (en) and Spanish (es), Canada has English (en) and French (fr)
       * @property LANGUAGE_CODE
       * @type String
       * @final
       */
      LANGUAGE_CODE: dpz.market.activeLanguageCode,

      /**
       * The maximum orderable number for a single line item.
       * @property MAX_QUANTITY
       * @type Number
       * @final
       */
      MAX_QUANTITY: 25,

      /**
       * The maximum number of side options a given product can have associated with it. For example, bread can have any combination of up to 25 dipping cups.
       * @property MAX_SIDE_QTY
       * @type Number
       * @final
       */
      MAX_SIDE_QTY: 25,

      /**
       * The maximum ways you can divide toppings on a pizza. 1 would mean whole, 2 would mean halves, 4 would mean quarters
       * @property MAX_PIZZA_BUILDER_PARTS
       * @type Number
       * @final
       */
      MAX_PIZZA_BUILDER_PARTS: 4,

      /**
       * The maximum number of past ordered items to display for a user
       * @property MAX_PAST_ITEMS
       * @type Number
       * @final
       */
      MAX_PAST_ITEMS: 10,

      /**
       * A definition of keys for each part on a pizza.
       * @property PARTS_MAP
       * @type Object
       * @final
       */
      PARTS_MAP: {
        1: ["1/1"],
        2: ["1/2", "2/2"],
        4: ["1/4", "2/4", "3/4", "4/4"]
      },
      ajax: {
        headers: {}
      },
      priceConfig: {
        mantissa: 2,
        usableConversionValue: 100
      },

      /**
       * Object used to handle data from store search Power service. This is commonly used when search for college campus and need to drill down from State to Campus to Building
       * @property storeSearch
       * @type Object
       */
      storeSearch: null,

      /**
       * Object used to handle any data and functionality related to the user, such as address information, as well as session data
       * @property customer
       * @type Object
       */
      customer: null,

      /**
       * Object used to handle any data and functionality related to the current order, such as items in the order and order totals
       * @property order
       * @type Object
       */
      order: null,

      /**
       * Object used to handle any data and functionality related to the current store the user is set to use
       * @property store
       * @type Object
       */
      store: null,

      /**
       * Object used to handle any data and functionality related to the current menu and products.
       * @property catalog
       * @type Object
       */
      catalog: null,

      /**
       *  Object used to handle delivery building drilldown
       * @property deliveryBuilding
       * @type object
       */
      deliveryBuilding: null
    }
  });
})(jQuery);
/**
 * The dataModel class is a namespace to store all data models. These models are the definition for what a base object should look like, and what attributes it should have
 * @class dataModel
 * @namespace jsDPZ.config
 * @static
 */


(function ($) {
  $.extend(jsDPZ.config, {
    dataModel: {
      /**
       * A list of additional coupon categories for front-end use, not specified in the Power Service response. Categories have a structure of Code : "", Name : ""
       * @property ADDITIONAL_COUPON_CATEGORIES
       * @type Array
       */
      ADDITIONAL_COUPON_CATEGORIES: [{
        Code: "AllStoreCoupons",
        Name: "All Available Coupons"
      }],

      /**
       * A list of additional pizza categories for front-end use, not specified in the Power Service response. Categories have a structure of Code : "", Name : ""
       * @property ADDITIONAL_PIZZA_CATEGORIES
       * @type Array
       */
      ADDITIONAL_PIZZA_CATEGORIES: [{
        Code: "Legend",
        Name: "Legend Pizzas"
      }, {
        Code: "Feast",
        Name: "Feast Pizzas"
      }, {
        Code: "BuildYourOwn",
        Name: "Build Your Own"
      }],

      /**
       * A list of additional sandwich categories for front-end use, not specified in the Power Service response. Categories have a structure of Code : "", Name : ""
       * @property ADDITIONAL__SANDWICH_CATEGORIES
       * @type Array
       */
      ADDITIONAL_SANDWICH_CATEGORIES: [{
        Code: "Slice",
        Name: "Domino's Sandwich Slice&trade;"
      }, {
        Code: "Sandwich",
        Name: "Sandwiches"
      }, {
        Code: "Hoagie",
        Name: "Hoagies"
      }],

      /**
       * A Standard Postal Address. For example a users home address <br />
       *  Street : "", House number with street name, ex: 123 Main <br />
       *	LocationName : "", Name to associate the address with, ex: My House, or Work <br />
       *	AddressLine2 : "", Usually Apartment or Suite number <br />
       *	AddressLine3 : "", <br />
       *	AddressLine4 : "", <br />
       *	City : "",  <br />
       *	Region : "", The state or province, ex: MI <br />
       *	PostalCode : "" The ZIP code, ex: 48105 <br />
       *	DeliveryInstructions : "", <br />
       *	CampusID : "", Unique ID for a campus/base <br />
       *	BuildingID : "", Unique ID for a building <br />
       *  Type : "", Home, Apartment, Business, Campus, etc. <br />
       *  Name : "", Name to associate the address with, ex: My House, or Work <br />
       *  IsDefault : "", Sets address to primary <br />
       * @property ADDRESS
       * @type Object
       */
      ADDRESS: {
        Street: "",
        StreetName: "",
        StreetNumber: "",
        StreetAddress2: "",
        StreetField1: "",
        StreetField2: "",
        StreetRange: "",
        LocationName: "",
        PlaceType: "",
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        AddressLine4: "",
        UnitNumber: "",
        UnitType: "",
        PropertyType: "",
        PropertyNumber: "",
        Neighborhood: "",
        SubNeighborhood: "",
        City: "",
        Region: "",
        PostalCode: "",
        DeliveryInstructions: "",
        CampusID: "",
        BuildingID: "",
        Type: "",
        Name: "",
        IsDefault: "",
        UpdateTime: "",
        Coordinates: {
          Latitude: 0,
          Longitude: 0
        },
        SectorName: ""
      },

      /**
       * Object used to handle Gift Card balance inquiries <br />
       *  Version : "1.0", API Version <br />
       *	OrderID : "", ID of the current order <br />
       *	CaptchaChallengeCode : "", Code provided to us for this captcha instance <br />
       *	CaptchaResponseCode : "", Code entered by user <br />
       *	GiftCards : [] An array of gift card numbers <br />
       * @property BALANCE_INQUIRY_REQUEST
       * @type Object
       */
      BALANCE_INQUIRY_REQUEST: {
        Version: "1.0",
        OrderID: "",
        CaptchaChallengeCode: "",
        CaptchaResponseCode: "",
        GiftCards: []
      },

      /**
       * Used to handle all catalog/menu information, including coupons, products, sides, toppings, etc. <br />
       *  Categorization : [ An object to handle the types of categories  <br />
       *  	Food : Object, Everything that's not a coupon <br />
       *  	Coupons : Object, Everything that is a coupon <br />
       *  ] <br />
       *
       *	Coupons : Object, A list of all available coupons for a given menu <br />
       *	Flavors : Object, A list of all possible flavors for a given menu <br />
       *	Misc : Object, Misc. data not related any other category <br />
       *	Products : Object, A list of all products for a given menu <br />
       *	Sides : Object, A list of all side items for a given menu <br />
       *	Sizes : Object, A list of all sizes for a given menu <br />
       *	Toppings : Object, A list of all toppings for a given menu <br />
       *	Variants : Object, A list of all variants for a given menu <br />
       *	CrossSellItems : Array, A list of cross-sell items as specified by the applications. this data does not currently come from Power <br />
       * @property CATALOG
       * @type Object
       */
      CATALOG: {
        AlternativeProductNames: {},
        Categorization: {
          Food: {},
          Coupons: {}
        },
        Coupons: {},
        Flavors: {},
        Misc: {},
        Products: {},
        Sides: {},
        Sizes: {},
        Toppings: {},
        Variants: {},
        CrossSellItems: [],
        NationalStoreID: ""
      },

      /**
       * Used to group products into logical sets <br />
       *  Categories : [], A list of sub-categories <br />
       *	Code : "", Category Code <br />
       *	Description : "", Category Description <br />
       *	Products : [], A list of product codes for a given category <br />
       *	Name : "" The name of the category <br />
       * @property CATEGORY
       * @type Object
       */
      CATEGORY: {
        Categories: [],
        Code: "",
        Description: "",
        Products: [],
        Name: ""
      },

      /**
       * Used to give discounts to a user when added to their order <br />
       *	Description : "", An explanation of the how the coupon effects the user and order <br />
       *	ImageCode : "", An image to visually represent a coupon in the UI <br />
       *	Name : "" The name of the coupon <br />
       *	Price : 0, A visual representation of how much the discounted products will cost the user. <br />
       *  PulseCode : "" The coupon code used in pulse (usually its the same as Code with the exception of prefixed/unique codes) <br />
       *	SortSeq : The sequence in which the store wants their coupons to appear. <br />
       *	Tags : Object, Rules for how a coupon can be added to the users order
       *  Code : "", Unique ID for a coupon <br />
       * @property COUPON
       * @type Object
       */
      COUPON: {
        Code: "",
        Description: "",
        ImageCode: "",
        Name: "",
        Price: 0,
        PulseCode: "",
        SortSeq: 0,
        Tags: {},
        Type: ""
      },

      /**
      * Function that does basic setup for power credit card calls that require basic auth
      * @namespace jsDPZ.ajax
      * @method customerCreditCard
      * @param optinos {Object} a JSON object with the following possible values
      * 	username : "", // "<joe@gmail.com>" <br />���
      password : "", // "<users password>" <br />���
      data : { <br />���
          "cardID" : undefined ��� ���// "<card id returned from power>" <br />
          "number" : "", // "<last_four_digits_card_number>" <br />���
          "cardType" : "", // <AMEX|DINERS|DISCOVER|ENROUTE|JCB|MASTERCARD|VISA> <br />���
          "expirationMonth" : "", // <month_digit_1_to_12> <br />���
          "expirationYear" : "", // <four_digit_year> <br />���
          "securityCode" : "", // <security_code> <br />���
          "billingZip" : "", // "90210" <br />���
          "isDefault" : "false",// <true|false> <br />���
          "nickName" : "" // <nick_name_for_card> <br />���
      },<br />���
      */
      CREDIT_CARD: {
        // eslint-disable-next-line no-undefined
        cardID: undefined,
        number: "",
        cardType: "",
        expirationMonth: "",
        expirationYear: "",
        securityCode: "",
        billingZip: "",
        isDefault: "false",
        nickName: ""
      },
      CUSTOMER: {
        Addresses: [],
        Age13OrOlder: false,
        AgreeToTermsOfUse: false,
        AlternateExtension: "",
        AlternatePhone: "",
        AsOfTime: "",
        BirthDate: "",
        CreditCards: [],
        CustomerID: "",
        Details: {
          GFCRUST: {
            code: "",
            description: "",
            value: "0"
          }
        },
        Email: "",
        EmailOptIn: false,
        EmailOptInTime: "",
        Extension: "",
        FirstName: "",
        Gender: "",
        LastName: "",
        Loyalty: {
          EnrollDate: "",
          PointExpirationDate: "",
          LastActivityDate: "",
          History: [],
          PendingPointBalance: 0,
          AccountStatus: "INACTIVE",
          VestedPointBalance: 0
        },
        PasswordHash: "",
        PasswordSalt: "",
        Phone: "",
        PhonePrefix: "",
        SmsOptIn: false,
        SmsOptInTime: "",
        SmsPhone: "",
        Type: "",
        UpdateTime: "",
        Session: {
          Address: {},
          AddressSelection: "",
          StoreID: "",
          ServiceMethod: ""
        },
        TaxInformation: {
          TaxType: "",
          TaxID: "",
          isDefault: false
        },
        PastItems: {}
      },
      DATE_FORMAT: "MM/DD/YYYY HH:mm:ss",
      ORDER: {
        Fulfiller: {
          Groups: []
        },
        Customer: {
          Address: {},
          CustomerID: "",
          Email: "",
          Extension: "",
          FirstName: "",
          LastName: "",
          Phone: ""
        },
        Details: {
          Amounts: {},
          Coupons: [],
          HotspotsLite: false,
          Loyalty: {
            Potential: {
              Burn: {
                RedemptionPoints: 0
              },
              Earn: {
                BasePoints: 0,
                BonusPoints: 0,
                PendingPoints: 0,
                TotalPoints: 0,
                ActivityDetail: []
              },
              PendingBalance: 0,
              PointBalance: 0
            },
            Burn: {
              RedemptionPoints: 0
            },
            Earn: {
              BasePoints: 0,
              BonusPoints: 0,
              PendingPoints: 0,
              TotalPoints: 0
            },
            PendingBalance: 0,
            PointBalance: 0
          },
          OrderID: "",
          OrderDateTime: "",
          Payments: [],
          ServiceMethod: "",
          StoreID: "",
          StoreOrderID: "",
          Variants: []
        },
        Partners: {},
        metaData: {}
      },
      ORDER_FULFILLER_GROUP: {
        GroupID: "",
        UnFulfilled: [],
        Fulfilled: []
      },
      ORDER_FULFILLER_PRODUCT: {
        Code: "",
        SizeCode: "",
        FlavorCode: "",
        Variants: []
      },
      ORDER_COUPON: {
        Code: "",
        Qty: 0,
        Price: 0,
        ID: -1,
        Fulfilled: false,
        IsBelowMinimumOrderAmount: false,
        isBelowMinimumCustomerAmount: false,
        IsBelowMinimumPaymentAmount: false
      },
      ORDER_VARIANT: {
        Code: "",
        Qty: 0,
        Sides: {},
        Toppings: {},
        Price: -1,
        ID: -1
      },
      ORDER_REQUEST: {
        Address: {},
        Coupons: [],
        CustomerID: "",
        Email: "",
        Extension: "",
        FirstName: "",
        FutureOrderTime: "",
        LastName: "",
        LanguageCode: "en",
        OrderChannel: "OLO",
        OrderID: "",
        OrderMethod: "Web",
        OrderTaker: null,
        Payments: [],
        Phone: "",
        PhonePrefix: "",
        Products: [],
        ServiceMethod: "",
        SourceOrganizationURI: null,
        StoreID: "",
        Tags: {},
        Version: "1.0",
        NoCombine: true,
        Partners: {}
      },
      PRODUCT: {
        AvailableToppings: "",
        AvailableSides: "",
        Code: "",
        DefaultToppings: "",
        DefaultSides: "",
        Description: "",
        ImageCode: "",
        Name: "",
        ProductType: "",
        Tags: {},
        Variants: []
      },
      OPTION: {
        Availability: [],
        Code: "",
        Description: "",
        Name: "",
        Tags: {}
      },
      TOPPING_AVAILABILITY: ["0", "0.5", "1", "1.5", "2", "3"],
      SIDES_AVAILABILITY: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      SIZE: {
        Code: "",
        Description: "",
        Name: ""
      },
      FLAVOR: {
        Code: "",
        Description: "",
        Name: "",
        SortSeq: ""
      },
      STORE: {
        AcceptAnonymousCreditCards: true,
        AcceptGiftCards: true,
        AcceptSavedCreditCard: true,
        AcceptableCreditCards: [],
        AcceptablePaymentTypes: [],
        AcceptableWalletTypes: [],
        AcceptableTipPaymentTypes: [],
        Address: {},
        AllowAutonomousDelivery: false,
        AllowCardSaving: true,
        AllowCarryoutOrders: false,
        AllowDeliveryOrders: false,
        AllowDineInOrders: false,
        AllowDuc: false,
        AllowDcdgPuw: true,
        AllowHotspotLiteOrders: false,
        AllowPiePass: false,
        AllowPickupWindowOrders: false,
        AllowSmsNotification: false,
        AlternatePaymentProcess: false,
        IsTippingAllowedAtCheckout: false,
        BusinessDate: "",
        StoreEndTimeEvenSpansToNextBusinessDay: "",
        CashLimit: "",
        CarryoutWaitTimeReason: "",
        CarsideTippingEnabled: false,
        City: "",
        DeliveryWaitTimeReason: "",
        DriverTrackingSupportMode: "NOT_SUPPORTED",
        EstimatedWaitMinutes: "",
        FutureOrderBlackoutBusinessDate: "",
        FutureOrderDelayInHours: false,
        ContactlessDelivery: "DISABLED",
        ContactlessCarryout: "DISABLED",
        ServiceMethodEstimatedWaitMinutes: {
          Delivery: {},
          Carryout: {}
        },
        Holidays: {},
        HolidaysDescription: "",
        IsAllergenWarningEnabled: false,
        IsAVSEnabled: false,
        IsDeliveryStore: false,
        IsDriverSafetyEnabled: false,
        IsOpen: false,
        IsOnlineNow: false,
        IsSaltWarningEnabled: false,
        NoCarryoutOrdersUntil: "",
        NoDeliveryOrdersUntil: "",
        NoDineInOrdersUntil: "",
        NoHotspotLiteOrdersUntil: "",
        SaltWarningInfo: {
          Icon: false,
          Message: "",
          PreIconText: "",
          Disclaimer: "",
          City: ""
        },
        LanguageTranslations: "",
        LobbyAccess: true,
        LocationInfo: "",
        Pop: false,
        MinimumDeliveryOrderAmount: "",
        MinimumDeliveryOrderAmountOverride: 0,
        MinimumOTPAmount: 0,
        OnlineStatusCode: "",
        Phone: "",
        PhonePrefix: "",
        PostalCode: "",
        RequireMaskInStore: "",
        ServiceHours: {
          Carryout: {},
          Delivery: {},
          DriveUpCarryout: {}
        },
        ServiceHoursDescription: {
          Carryout: "",
          Delivery: "",
          DriveUpCarryout: ""
        },
        ServiceHoursForWarning: {
          Carryout: {},
          Delivery: {},
          DriveUpCarryout: {}
        },
        ServiceIsOpen: {
          Carryout: false,
          Delivery: false
        },
        SocialReviewLinks: {},
        StreetName: "",
        StoreAsOfTime: "",
        StoreLocation: {
          Latitude: null,
          Longitude: null
        },
        StoreID: "",
        StoreName: "",
        StoreVariance: null,
        SubstitutionStore: "",
        Substituted: false,
        TaxRates: {}
      },
      STORE_SEARCH: {
        Granularity: "",
        Status: "",
        Stores: [],
        SearchedAddress: {}
      },
      VARIANT: {
        Code: "",
        FlavorCode: "",
        ImageCode: "",
        Name: "",
        Price: "",
        ProductCode: "",
        SizeCode: "",
        Tags: {}
      },
      QUICKLIST: [],
      QUICKLIST_VARIANT: {
        Code: "",
        Toppings: {},
        Sides: {}
      },
      QUICKLIST_COUPON: {
        Code: "",
        Type: ""
      },
      STATUS_MESSAGE: {
        Success: false,
        SuccessCodes: [],
        ErrorCodes: []
      },
      PARTNER: {
        Code: "",
        Token: "",
        Tags: {}
      }
    }
  });
})(jQuery);
/**
 * The power class is a namespace to generate all paths to the Power Services.
 * @class power
 * @namespace jsDPZ.config
 * @static
 */


(function ($) {
  var urlPrefixes = {
    legacyApi: "",
    api: "",
    trackerApi: "",
    oauth: ""
  };

  var getGlobalPaymentBase = function getGlobalPaymentBase(options) {
    var version = options && options.version ? options.version : "";
    var pathComponents = [urlPrefixes.legacyApi, "global-payment-gateway-service"];
    if (version) pathComponents.push(version);
    return pathComponents.join("/");
  };

  var getCustomerWalletBase = function getCustomerWalletBase() {
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref9$version = _ref9.version,
        version = _ref9$version === void 0 ? "v1" : _ref9$version;

    return "".concat(urlPrefixes.api, "/customer-wallet-service/").concat(encodeURIComponent(version), "/wallets");
  };

  var getCustomerVerificationOTPBase = function getCustomerVerificationOTPBase() {
    return "".concat(urlPrefixes.legacyApi, "/power/otpVerification");
  };

  var getCustomerWalletDetailsBase = function getCustomerWalletDetailsBase() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var walletId = options.walletId;
    return "".concat(getCustomerWalletBase(options), "/").concat(encodeURIComponent(walletId));
  };

  var getCustomerWalletOTPBase = function getCustomerWalletOTPBase() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var otpId = options.otpId;
    return "".concat(getCustomerWalletDetailsBase(options), "/otps/").concat(encodeURIComponent(otpId));
  };

  var customerWallet = {
    createCustomerWallet: function createCustomerWallet(options) {
      return getCustomerWalletBase(options);
    },
    getCustomerWallet: function getCustomerWallet(options) {
      return getCustomerWalletBase(options);
    },
    getCustomerWalletBalance: function getCustomerWalletBalance(options) {
      return "".concat(getCustomerWalletDetailsBase(options), "/balance");
    },
    sendOTP: function sendOTP(options) {
      return "".concat(getCustomerWalletOTPBase(options), "/_send");
    },
    verifyOTP: function verifyOTP(options) {
      return "".concat(getCustomerWalletOTPBase(options), "/_verify");
    }
  };
  var customerVerificationOTP = {
    sendOTP: function sendOTP() {
      return "".concat(getCustomerVerificationOTPBase(), "/_send");
    },
    verifyOTP: function verifyOTP() {
      return "".concat(getCustomerVerificationOTPBase(), "/_verify");
    }
  };
  $.extend(jsDPZ.config, {
    power: {
      /**
       * Allows you to override urlPrefixes
       * @namespace jsDPZ.config
       * @method setUrlPrefixes
       * @return {Object} The new urlPrefixes
       */
      setUrlPrefixes: function setUrlPrefixes(urlConfig) {
        return urlPrefixes = {
          legacyApi: urlConfig.legacyApi || "",
          api: urlConfig.api || "",
          trackerApi: urlConfig.trackerApi || "",
          oauth: urlConfig.oauth || "",
          authProxy: urlConfig.authProxy || ""
        };
      },

      /**
       * Allow NOLO to pass the google recaptcha object to the jsdpz
       * @namespace jsDPZ.config
       * @method setRecaptcha
       */
      recaptcha: {
        getToken: function getToken(url) {
          return this.ready.then(function (grecaptcha) {
            var urlParts = url.split("/");
            var action = urlParts.length >= 5 ? urlParts.splice(3, 2).join("/").match(/[A-z0-9\/]+/g).join("") : "";
            return $.Deferred(function (promise) {
              if (grecaptcha === false) {
                promise.reject("api.not.loaded");
              } else if (action && this.siteKey) {
                grecaptcha.execute(this.siteKey, {
                  action: action
                }).then(function grecaptchaExecuteSuccess(token) {
                  if (jsDPZ.util.empty(token)) {
                    promise.reject("no.token.returned");
                  } else {
                    promise.resolve({
                      action: action,
                      token: token
                    });
                  }
                }, function grecaptchaExecuteError() {
                  jsDPZ.topic("auth-proxy.token.response").publish({
                    error: new Error("auth-proxy.token.response.error"),
                    customData: {
                      action: action
                    }
                  });
                  promise.reject("get.token.error");
                });
              } else {
                promise.reject("no.action.or.key");
              }
            }.bind(this));
          }.bind(this), function () {
            return $.Deferred(function (promise) {
              promise.reject("dependency.rejected");
            });
          }.bind(this));
        },
        siteKey: "",
        ready: $.Deferred(function (promise) {
          promise.resolve(false);
        })
      },
      initializeRecaptcha: function initializeRecaptcha(siteKey, ready) {
        $.extend(this.recaptcha, {
          siteKey: siteKey,
          ready: ready
        });
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of cities
       * @namespace jsDPZ.config
       * @method globalCountryService
       * @return {String} GSL city service path.
       */
      globalCountryService: function globalCountryService() {
        return urlPrefixes.legacyApi + "/country/CountryLocator/country";
      },

      /**
       * Returns the path of the change-email service
       * @namespace jsDPZ.config
       * @method emailChangeService
       * @return {String} power change-email path.
       */
      emailChangeService: function emailChangeService() {
        return urlPrefixes.legacyApi + "/power/change-email";
      },

      /**
       * Returns customer orders and easy order object
       * @namespace jsDPZ.config
       * @method setEasyOrderExpressUrl
       * @return {String} power order path.
       */
      setEasyOrderExpressUrl: function setEasyOrderExpressUrl(customerID) {
        return urlPrefixes.legacyApi + "/power/customer/" + customerID + "/order";
      },

      /**
       * Returns location by lat/long
       * @namespace jsDPZ.config
       * @method getDeliverToMeByGPSCoords
       * @return {String} location by lat/long.
       */
      getDeliverToMeByGPSCoords: function getDeliverToMeByGPSCoords(lat, _long, options) {
        var url = urlPrefixes.api + "/store-locator-international-service/locate/deliverToMeSpots?latitude=" + encodeURIComponent(lat) + "&longitude=" + encodeURIComponent(_long);
        var distanceCoordinates = options && options.distanceCoordinates;

        if (distanceCoordinates) {
          url += "&distLatitude=" + encodeURIComponent(distanceCoordinates.latitude) + "&distLongitude=" + encodeURIComponent(distanceCoordinates.longitude);
        }

        if (options.radius) {
          url += "&radius=" + encodeURIComponent(options.radius);
        }

        if (options.maxResults) {
          url += "&maxResults=" + encodeURIComponent(options.maxResults);
        }

        return url;
      },

      /**
       * Returns location by IP url
       * @namespace jsDPZ.config
       * @method getHotspotsByIP
       * @return {String} location by ip path.
       */
      getHotspotsByIP: function getHotspotsByIP(options) {
        var url = urlPrefixes.api + "/store-locator-international-service/locate/hotspot";

        if (options.radius) {
          url += "?radius=" + encodeURIComponent(options.radius);
        }

        if (options.maxResults) {
          url += ~url.indexOf("?radius=") ? "&" : "?";
          url += "maxResults=" + encodeURIComponent(options.maxResults);
        }

        return url;
      },

      /**
       * Returns location by lat/long
       * @namespace jsDPZ.config
       * @method getHotspotsByGPSCoords
       * @return {String} location by lat/long.
       */
      getHotspotsByGPSCoords: function getHotspotsByGPSCoords(lat, _long2, options) {
        var url = urlPrefixes.api + "/store-locator-international-service/locate/hotspot?latitude=" + encodeURIComponent(lat) + "&longitude=" + encodeURIComponent(_long2);
        var distanceCoordinates = options && options.distanceCoordinates;

        if (distanceCoordinates) {
          url += "&distLatitude=" + encodeURIComponent(distanceCoordinates.latitude) + "&distLongitude=" + encodeURIComponent(distanceCoordinates.longitude);
        }

        if (options.radius) {
          url += "&radius=" + encodeURIComponent(options.radius);
        }

        if (options.maxResults) {
          url += "&maxResults=" + encodeURIComponent(options.maxResults);
        }

        return url;
      },

      /**
       * Returns verifyhotspot url
       * @namespace jsDPZ.config
       * @method verifyHotspot
       * @return {String}.
       */
      verifyHotspot: function verifyHotspot(id) {
        return urlPrefixes.api + "/store-presentation-service/suggestedHotspots/" + encodeURIComponent(id) + ":verifyEmail";
      },

      /**
       * Returns suggested hotspot api url
       * @namespace jsDPZ.config
       * @method suggestHotspot
       * @return {String}
       */
      suggestHotspot: function suggestHotspot(options) {
        return urlPrefixes.api + "/store-presentation-service/suggestedHotspots";
      },

      /**
       * Returns location by address
       * @namespace jsDPZ.config
       * @method getHotspotsByAddress
       * @return {String} location by address.
       */
      getHotspotsByAddress: function getHotspotsByAddress(address, options) {
        var url = urlPrefixes.api + "/store-locator-international-service/locate/hotspot" + "?city=" + (address.City && encodeURIComponent(address.City) || "") + "&streetAddress1=" + (address.Street && encodeURIComponent(address.Street) || "") + "&postalCode=" + (address.PostalCode && encodeURIComponent(address.PostalCode) || "") + "&regionCode=" + (address.Region && encodeURIComponent(address.Region) || "") + "&placeType=" + (address.Type && encodeURIComponent(address.Type) || "");

        if (options.radius) {
          url += "&radius=" + encodeURIComponent(options.radius);
        }

        if (options.maxResults) {
          url += "&maxResults=" + encodeURIComponent(options.maxResults);
        }

        return url;
      },
      getFindAddress: function getFindAddress() {
        return urlPrefixes.api + "/store-locator-international-service/findAddress";
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of cities
       * @namespace jsDPZ.config
       * @method globalCountryService
       * @return {String} GSL city service path.
       */
      globalCountryDetailService: function globalCountryDetailService(countryCode) {
        return urlPrefixes.legacyApi + "/country/CountryLocator/country/" + countryCode;
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of cities
       * @namespace jsDPZ.config
       * @method globalStoreSearch
       * @return {String} GSL city service path.
       */
      globalStoreSearch: function globalStoreSearch(regionCode, addRegionCode) {
        var url = urlPrefixes.legacyApi + "/store-locator-international/locate/store";
        /* START ECOM-41428 */

        if (addRegionCode) {
          regionCode = regionCode || dpz.market.marketCode;
          return url + "?regionCode=" + regionCode;
        }
        /* END ECOM-41428 */


        return url;
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of cities
       * based on the regionCode and countryCode.
       * @namespace jsDPZ.config
       * @method globalCities
       * @return {String} global city service path.
       */
      globalCities: function globalCities(options) {
        return urlPrefixes.legacyApi + "/store-locator-international/locations/city?countryCode=" + dpz.market.marketCode + (options.region && "&regionCode=" + options.region || "");
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of neighborhoods
       * based on the market, state, and city.
       * @namespace jsDPZ.config
       * @method globalTypeAheadNeighborhoods
       * @return {String} global type ahead neighborhood service path.
       */
      globalTypeAheadNeighborhoods: function globalTypeAheadNeighborhoods(options) {
        return urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/neighborhoods?market=" + dpz.market.marketCode + (options.state && "&state=" + encodeURIComponent(options.state) || "") + (options.city && "&city=" + encodeURIComponent(options.city) || "");
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of neighborhoods
       * @namespace jsDPZ.config
       * @method globalNeighborhoods
       * @return {String} global neighborhood service path.
       */
      globalNeighborhoods: function globalNeighborhoods(city, regionCode) {
        regionCode = regionCode || dpz.market.marketCode;
        var queries = [],
            queryString = "?";

        if (city) {
          queries.push("city=" + encodeURIComponent(city));
        }

        if (regionCode) {
          regionCode === "all" ? queries.push("region=" + regionCode) : queries.push("regionCode=" + encodeURIComponent(regionCode));
        }

        queryString += queries.join("&");
        return urlPrefixes.legacyApi + "/store-locator-international/locations/neighborhood" + queryString;
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of streetranges
       * @namespace jsDPZ.config
       * @method globalStreetRangeas
       * @return {String} global streetrange service path.
       */
      globalStreetRanges: function globalStreetRanges(city, regionCode, neighborhood, poiFlag) {
        var regionCode = regionCode || dpz.market.marketCode;
        queryString = "?", queries = [city, regionCode, neighborhood, poiFlag].filter(function (value) {
          return value;
        }).map(function (value) {
          return key + "=" + encodeURIComponent(value);
        });
        queryString += queries.join("&");
        return urlPrefixes.legacyApi + "/store-locator-international/locations/streetrange" + queryString;
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of streets
       * @namespace jsDPZ.config
       * @method globalStreet
       * @return {String} global street service path.
       */
      globalStreet: function globalStreet(options) {
        options.regionCode = options.regionCode || dpz.market.marketCode;
        var queryString = "?",
            queries = ["city", "regionCode", "neighborhood", "removeDuplicateStreetsForNeighborhood"].filter(function (key) {
          return options[key];
        }).map(function (key) {
          return key + "=" + encodeURIComponent(options[key]);
        });
        queryString += queries.join("&");
        return urlPrefixes.legacyApi + "/store-locator-international/locations/street" + queryString;
      },

      /**
       * Returns the path of the Global Store Locator service, which returns a list of "places"
       * @namespace jsDPZ.config
       * @method globalPlaces
       * @return {String} global places service path.
       */
      globalPlaces: function globalPlaces(options) {
        var queries = [],
            queryString = "?"; // TODO : write tests for this...

        if (options.city) {
          queries.push("city=" + options.city);
        }

        if (options.region) {
          queries.push("regionCode=" + options.region);
        }

        if (options.neighborhood) {
          queries.push("neighborhood=" + options.neighborhood);
        }

        if (options.name) {
          queries.push("name=" + options.name);
        }

        if (options.types) {
          queries.push("types=" + options.types.replace("/", "%2F"));
        }

        if (options.streetName) {
          queries.push("streetName=" + options.streetName);
        }

        queryString += queries.join("&");
        return urlPrefixes.legacyApi + "/store-locator-international/locations/place" + queryString;
      },

      /**
       * Returns the path of the Typeahead service which returns a list of "places"
       * @namespace jsDPZ.config
       * @method globalStoreSearchTypeAhead
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAhead: function globalStoreSearchTypeAhead(regionCode, parameters) {
        regionCode = regionCode || dpz.market.marketCode;
        return urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/states?countrycode=" + regionCode;
      },

      /**
       * Returns the path of the Typeahead service which returns a list of "street categories"
       * @namespace jsDPZ.config
       * @method globalStoreSearchTypeAhead
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAheadStreetCategories: function globalStoreSearchTypeAheadStreetCategories(countryCode) {
        var code = countryCode || dpz.market.marketCode;
        return urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/streetCategories/market/" + encodeURIComponent(code);
      },

      /**
       * Returns the path of the Typeahead service which returns a list of "street categories"
       * @namespace jsDPZ.config
       * @param {Object} param0
       * @param {String} param0.version The typeahead service version to use
       * @method globalStoreSearchTypeAheadStreetCategoriesV2
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAheadStreetCategoriesV2: function globalStoreSearchTypeAheadStreetCategoriesV2(_ref10) {
        var _ref10$version = _ref10.version,
            version = _ref10$version === void 0 ? "v2" : _ref10$version;
        return "".concat(urlPrefixes.legacyApi, "/store-locator-typeahead-service/").concat(version, "/search/streetCategories");
      },

      /**
       * Returns the path of the Typeahead service which returns a list of "streets"
       * @namespace jsDPZ.config.power
       * @method globalStoreSearchTypeAheadStreetsByPath
       * @params options {Object} Options with the path parameters
       * @params options.market {String} The market's iso code
       * @params options.state {String} The state (region) to use to filter the streets
       * @params options.city {String} The city name to use to filter the streets
       * @params options.street {String} The street prefix to use when filtering
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAheadStreetsByPath: function globalStoreSearchTypeAheadStreetsByPath(options) {
        var opts = $.extend(true, {
          city: "",
          market: "",
          state: "",
          street: ""
        }, options);

        var parameterExists = function parameterExists(key) {
          return !!opts[key];
        };

        var addParameterToPath = function addParameterToPath(path, key) {
          return path + "/" + key + "/" + encodeURIComponent(opts[key]);
        };

        var path = urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/streets";
        return ["market", "state", "city", "street"].filter(parameterExists).reduce(addParameterToPath, path);
      },

      /**
       * Returns the path of the Typeahead service which returns a list of "cities"
       * @namespace jsDPZ.config
       * @method globalStoreSearchTypeAheadCity
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAheadCity: function globalStoreSearchTypeAheadCity(regionCode, parameters) {
        regionCode = regionCode || dpz.market.marketCode;
        return urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/cities?countrycode=" + regionCode + "&State=" + encodeURIComponent(parameters);
      },

      /**
       * Returns the path of the Typeahead service which returns a list of "streets".
       * streetLimit parameter added to limit the number of results that the back-end is returning.
       * @namespace jsDPZ.config
       * @method globalStoreSearchTypeAheadStreets
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAheadStreets: function globalStoreSearchTypeAheadStreets(countryCode, parameters) {
        var streetLimit = encodeURIComponent(parameters.streetLimit || 25);
        var url = urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/address?countrycode=" + encodeURIComponent(countryCode || dpz.market.marketCode);
        if (parameters.state) url += "&State=" + encodeURIComponent(parameters.state);
        if (parameters.city) url += "&city=" + encodeURIComponent(parameters.city);
        return url + "&street=" + encodeURIComponent(parameters.street) + "&streetLimit=" + streetLimit;
      },

      /**
       * Returns the path of the Typeahead service which returns an address based of streetname, city and region.
       * @namespace jsDPZ.config
       * @method globalStoreSearchTypeAheadAddress
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAheadAddress: function globalStoreSearchTypeAheadAddress() {
        return "".concat(urlPrefixes.legacyApi, "/store-locator-typeahead-service/search/address");
      },

      /**
       * Returns the path of the Typeahead service which returns an address based on a number.
       * @namespace jsDPZ.config
       * @method globalStoreSearchTypeAheadCEP
       * @return {String} global places service path.
       */
      globalStoreSearchTypeAheadCEP: function globalStoreSearchTypeAheadCEP(regionCode, parameters) {
        regionCode = regionCode || dpz.market.marketCode;
        return urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/cep?cep=" + parameters.cep + "&countrycode=" + regionCode;
      },

      /**
       * Returns the path of the type ahead service that returns a list of buildings
       * tied to a street selected from the type ahead service.
       * @param {String} market The market alpha-2 country code
       * @param {String} city The city to look up for
       * @param {String} street The street name to look up for
       * @return {String} Type ahead buildings by street id service path.
       */
      globalStoreSearchPlacesByStreet: function globalStoreSearchPlacesByStreet(market, city, street) {
        return urlPrefixes.legacyApi + "/store-locator-typeahead-service/search/places/market/" + encodeURIComponent(market) + "/streetName/" + encodeURIComponent(street) + "/city/" + encodeURIComponent(city);
      },

      /**
       * Returns the path of the type ahead service that returns a list of buildings
       * tied to a street selected from the type ahead service.
       * @param {Object} param0
       * @param {String} param0.version The service version
       * @return {String} Type ahead buildings by street id service path.
       */
      globalStoreSearchPlaces: function globalStoreSearchPlaces(_ref11) {
        var _ref11$version = _ref11.version,
            version = _ref11$version === void 0 ? "v2" : _ref11$version;
        return "".concat(urlPrefixes.legacyApi, "/store-locator-typeahead-service/").concat(version, "/search/places");
      },

      /**
       * Returns the path of the Power service, which returns a gift card balance
       * @namespace jsDPZ.config
       * @method balanceInquiry
       * @return {String} Power giftcard balance inquiry service path
       */
      balanceInquiry: function balanceInquiry() {
        return urlPrefixes.legacyApi + "/power/gift-card-balance-inquiry";
      },

      /**
       * Returns the path of the Power service, which changes a users password
       * @namespace jsDPZ.config
       * @method changePassword
       * @return {String} Power change password service path
       */
      changePassword: function changePassword() {
        return urlPrefixes.legacyApi + "/power/change-password";
      },

      /**
       * Returns the path of the Power service, which returns a coupon for a given store
       * @namespace jsDPZ.config
       * @method coupon
       * @param storeID {String} id of the store to search
       * @param couponID {String} id of the coupon to search
       * @return {String} Power store coupon service path
       */
      coupon: function coupon(storeID, couponID) {
        return urlPrefixes.legacyApi + "/power/store/" + storeID + "/coupon/" + couponID;
      },

      /**
       * Returns the path of the Power service, which allows a user to log in
       * @namespace jsDPZ.config
       * @method customerLogin
       * @return {String} Power customer login service path
       */
      customerLogin: function customerLogin() {
        return urlPrefixes.legacyApi + "/power/login";
      },

      /**
       * Returns the path of the Power service, which allows a user to log out
       * @namespace jsDPZ.config
       * @method customerLogout
       * @return {String} Power customer logout service path
       */
      customerLogout: function customerLogout() {
        return urlPrefixes.legacyApi + "/power/logout";
      },

      /**
       * Returns the path of the Power service, which returns a customers past orders
       * @namespace jsDPZ.config
       * @method customerPastOrders
       * @param customerID {String} id of the customer to search
       * @return {String} Power customer orders service path
       * @depricated
       */
      customerPastOrders: function customerPastOrders(customerID) {
        return urlPrefixes.legacyApi + "/power/customer-orders/" + customerID;
      },

      /**
       * Returns the path of the Power service, which saves customer data
       * @namespace jsDPZ.config
       * @method customerSave
       * @return {String} Power customer path
       */
      customerSave: function customerSave() {
        return urlPrefixes.legacyApi + "/power/customer";
      },

      /**
       * Returns the path of the Power service, which give the info of the user in a token
       * @namespace jsDPZ.config
       * @method customerBOLORedirect
       * @return {String} Power customer path
       */
      customerBOLORedirect: function customerBOLORedirect(customerID) {
        return urlPrefixes.legacyApi + "/power/customer/" + customerID + "/profile/secured";
      },

      /**
       * Returns the path of the Power service which retrieves customer credit cards
       * @namespace jsDPZ.config
       * @method customerCreditCards
       * @return {String} Power customer credit cards path
       */
      customerCreditCards: function customerCreditCards(customerID, cardID, captcha) {
        return urlPrefixes.legacyApi + "/power/customer/" + customerID + "/card" + (cardID ? "/" + cardID : "") + (captcha ? "/captcha" : "");
      },

      /**
       * Returns the path of the Customer Marketing Options Service, which saves customer data
       * @namespace jsDPZ.config
       * @method customerMarketingOptions
       * @return {String} Customer Marketing Options Service
       */
      customerMarketingOptions: function customerMarketingOptions() {
        return urlPrefixes.legacyApi + "/customer-marketing-options-service/options/update";
      },

      /**
       * Returns the path to the Power service which retrieves the customer's order history
       * @namespace jsDPZ.config
       * @param customerID {String} id of the customer to search
       * @returns {String}
       */
      customerOrders: function customerOrders(customerID, orderID, lang, filterDeliveryHotspot) {
        return urlPrefixes.legacyApi + "/power/customer/" + customerID + "/order" + (orderID ? "/" + orderID : "") + "?limit=5&lang=" + lang + "&filterDeliveryHotspot=" + filterDeliveryHotspot;
      },
      eoeOptInAndOutSMS: function eoeOptInAndOutSMS(data) {
        var inOrOut = data.smsNumber ? "optInSMS" : "optOutSMS";
        return urlPrefixes.legacyApi + "/power/easyorder/optInAndOut/" + inOrOut + "/";
      },
      eoeOptInAndOutSMSInfoByCustomerId: function eoeOptInAndOutSMSInfoByCustomerId(customerID) {
        return urlPrefixes.legacyApi + "/power/easyorder/optInAndOut/smsInfoByCustomerId/" + customerID;
      },
      eoeOptInAndOutTwitter: function eoeOptInAndOutTwitter(data) {
        var inOrOut = data.twitterId ? "optInTwitter" : "optOutTwitter";
        return urlPrefixes.legacyApi + "/power/easyorder/optInAndOut/" + inOrOut + "/";
      },
      eoeOptInAndOutTwitterInfoByCustomerId: function eoeOptInAndOutTwitterInfoByCustomerId(customerID) {
        return urlPrefixes.legacyApi + "/power/easyorder/optInAndOut/twitterInfoByCustomerId/" + customerID;
      },

      /**
       * This service will bind a user's twitter account with the
       * received NOLO's customer, and will grant access to the NOLO's
       * api services to access the user's twitter account.
       *
       * The result of this call is a Twitter HTML page where the user
       * confirm's his Twitter account. After signing in / confirming
       * and granting permissions to Domino's services; the Twitter
       * page will redirect to the received callbackRedirect.
       *
       * @param {string} customerId The Domino's customer Id
       * @param {string} callbackRedirect A url to where the user should
       *                                  be redirected after
       *                                  the user grants access to Domino's
       *                                  services.
       */
      bindTwitterAccount: function bindTwitterAccount(customerId, callbackRedirect) {
        return urlPrefixes.api + "/twitter-service/twitter/signin/?customerId=" + customerId + "&noloCallback=" + callbackRedirect;
      },

      /**
       * This service will make the customer's Twitter account to start
       * following Domino's Twitter account.
       *
       * @param {string} twitterId The customer's twitter's account ID
       */
      twitterFollow: function twitterFollow(twitterId) {
        return urlPrefixes.api + "/twitter-service/twitter/follow/" + encodeURIComponent(twitterId);
      },

      /**
       * Returns the path of the Power service, which saves customer data
       * @namespace jsDPZ.config
       * @method customerSave
       * @return {String} Power customer path
       */
      emailOptInAndOut: function emailOptInAndOut() {
        return urlPrefixes.legacyApi + "/power/opt-in-and-opt-out";
      },

      /**
       * Returns the path of the Power service, which returns the store menu
       * @namespace jsDPZ.config
       * @method menu
       * @return {String} Power store menu path
       */
      menu: function menu(storeID) {
        return urlPrefixes.legacyApi + "/power/store/" + storeID + "/menu";
      },

      /**
       * Returns the path of the Power service, which returns the tokenization template
       * @namespace jsDPZ.config
       * @method tokenizeTemplate
       * @param {string} storeID the store ID
       * @param {string} cardType one of the following: "visa" "mastercard" "discover" "amex" "diners" "carteblanche" "jcb"
       * @return {String} Power store menu path
       */
      tokenizeTemplate: function tokenizeTemplate() {
        return urlPrefixes.legacyApi + "/power/paymentGatewayService/tokenizeTemplate";
      },

      /**
       * Returns the path of the Power service, which places an order
       * @namespace jsDPZ.config
       * @method placeOrder
       * @return {String} Power place order path
       */
      placeOrder: function placeOrder() {
        return urlPrefixes.legacyApi + "/power/place-order";
      },

      /**
       * Returns the path of the Power service, which prices an order
       * @namespace jsDPZ.config
       * @method priceOrder
       * @return {String} Power price order path
       */
      priceOrder: function priceOrder() {
        return urlPrefixes.legacyApi + "/power/price-order";
      },

      /**
       * Returns the path of the Power service, which returns regions
       * @namespace jsDPZ.config
       * @method regions
       * @return {String} site locator regions path
       */
      regions: function regions() {
        var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref12$version = _ref12.version,
            version = _ref12$version === void 0 ? "v1" : _ref12$version;

        return "".concat(urlPrefixes.api, "/site-locator-service/").concat(encodeURIComponent(version), "/regions");
      },

      /**
       * Returns the path of the Power service, which returns buildings by site
       * @namespace jsDPZ.config
       * @method buildingsBySite
       * @param siteID {String} id of the site to search
       * @return {String} site-locator service path
       */
      buildingsBySite: function buildingsBySite(_ref13) {
        var _ref13$site = _ref13.site,
            site = _ref13$site === void 0 ? "" : _ref13$site,
            _ref13$version = _ref13.version,
            version = _ref13$version === void 0 ? "v1" : _ref13$version;
        return "".concat(urlPrefixes.api, "/site-locator-service/").concat(encodeURIComponent(version), "/site/").concat(encodeURIComponent(site), "/buildings");
      },

      /**
       * Returns the path of the Power service, which loads the users session
       * @namespace jsDPZ.config
       * @method sessionLoad
       * @param sessionID {String} id of the users session
       * @return {String} Power client session path
       */
      sessionLoad: function sessionLoad(sessionID) {
        return urlPrefixes.legacyApi + "/power/client-session/" + sessionID;
      },

      /**
       * Returns the path of the Power service, which saves the users session
       * @namespace jsDPZ.config
       * @method sessionSave
       * @param sessionID {String} id of the users session
       * @return {String} Power client session path
       */
      sessionSave: function sessionSave(sessionID) {
        return urlPrefixes.legacyApi + "/power/client-session" + (sessionID ? "/" + encodeURIComponent(sessionID) : "");
      },

      /**
       * Returns the path of the Power service, which returns the store profile
       * @namespace jsDPZ.config
       * @method storeProfile
       * @param storeID {String} id of the store
       * @return {String} Power store profile path
       */
      storeProfile: function storeProfile(storeID) {
        return urlPrefixes.legacyApi + "/power/store/" + storeID + "/profile";
      },

      /**
       * Returns the path of the Power service, which returns a list of stores
       * @namespace jsDPZ.config
       * @method storeSearch
       * @return {String} Power store locator path
       */
      storeSearch: function storeSearch() {
        return urlPrefixes.legacyApi + "/power/store-locator";
      },

      /**
       * Returns the path of the Power service, which returns regions as a jsonapi response
       * @namespace jsDPZ.config
       * @method regions
       * @return {String} site locator regions path
       */
      getRegions: function getRegions() {
        return urlPrefixes.api + "/store-presentation-service/regions";
      },

      /**
       * Prepends the correct api path to a function
       * @namespace jsDPZ.config
       * @method prependHost
       * @parameters {String} string to be prepended
       * @return {String} prepended string
       */
      prependHost: function prependHost(string) {
        return urlPrefixes.api + string;
      },

      /**
       * returns the deliverybuilding url based on building id
       * @namespace jsDPZ.config
       * @method deliveryBuilding
       * @parameters {String} buildingId
       * @return {String} url
       */
      deliveryBuilding: function deliveryBuilding(buildingId) {
        return urlPrefixes.api + "/store-presentation-service/deliveryBuildings/" + buildingId;
      },

      /**
       * Returns the path of the Power service, which returns a list of sites
       * @namespace jsDPZ.config
       * @method sitesByRegion
       * @param regionID {String} ID of the region
       * @return {String} site locator region path
       */
      sitesByRegion: function sitesByRegion(_ref14) {
        var region = _ref14.region,
            _ref14$version = _ref14.version,
            version = _ref14$version === void 0 ? "v1" : _ref14$version;
        return "".concat(urlPrefixes.api, "/site-locator-service/").concat(encodeURIComponent(version), "/region/").concat(encodeURIComponent(region), "/sites");
      },

      /**
       * Returns the path of the Power service, which returns a list of stores
       * @namespace jsDPZ.config
       * @method storesByBuilding
       * @param buildingID {String} ID of the building
       * @return {String} site locator building path
       */
      storesByBuilding: function storesByBuilding(_ref15) {
        var building = _ref15.building,
            _ref15$version = _ref15.version,
            version = _ref15$version === void 0 ? "v1" : _ref15$version;
        return "".concat(urlPrefixes.api, "/site-locator-service/").concat(encodeURIComponent(version), "/building/").concat(encodeURIComponent(building), "/stores");
      },

      /**
       * Returns the path of the Power service, which validates an order
       * @namespace jsDPZ.config
       * @method validateOrder
       * @return {String} Power validate order path
       */
      validateOrder: function validateOrder() {
        return urlPrefixes.legacyApi + "/power/validate-order";
      },

      /**
       * Returns the path of the service to look up an RNC Name
       * @namespace jsDPZ.config
       * @method rncName
       * @return {String} RNC lookup path
       */
      rncName: function rncName(rncNumber) {
        return urlPrefixes.legacyApi + "/commercial-entity-service/commercialEntity/commercialentity/" + rncNumber;
      },

      /**
       * Returns the path of the service that returns the Hyphen hosted payment page authorization-request data
       * @namespace jsDPZ.config
       * @method hyphenAuthorizationRequest
       * @return {String} hyphen-payment-gateway-service authorization request data path
       */
      hyphenAuthorizationRequest: function hyphenAuthorizationRequest() {
        return urlPrefixes.legacyApi + "/hyphen-payment-gateway-service/payment/authorizationRequest";
      },

      /**
       * Returns the path of the service that returns the status of the Hyphen hosted payment page credit-card transaction.
       * @namespace jsDPZ.config
       * @method hyphenCheckStatus
       * @return {String} hyphen-payment-gateway-service status service path
       */
      hyphenCheckStatus: function hyphenCheckStatus(transactionID) {
        return urlPrefixes.legacyApi + "/hyphen-payment-gateway-service/payment/status?id=" + transactionID;
      },

      /**
       * Returns the path of the Power Email Service for Franchising Form Email
       * @namespace jsDPZ.config
       * @method sendFranchisingEmail
       * @return {String} Power Email Service URL
       */
      franchiseeRequest: function franchiseeRequest() {
        return urlPrefixes.legacyApi + "/power/franchiseeRequest";
      },

      /**
       * Returns the path of the Power Email Service for the Customer Feedback.
       * @namespace jsDPZ.config
       * @method customerFeedback
       * @return {String} Power Email Service URL
       */
      customerFeedback: function customerFeedback() {
        return urlPrefixes.legacyApi + "/power/customerFeedback";
      },

      /**
       * Returns the path of the loyalty summary power service
       * @namespace jsDPZ.config
       * @method loyaltySummaryService
       * @return {String} Power Loyalty Summary Service URL
       */
      loyaltySummaryService: function loyaltySummaryService(customerID) {
        return urlPrefixes.legacyApi + "/power/customer/" + customerID + "/loyalty";
      },

      /**
       * Returns the path of the loyalty history power service
       * @namespace jsDPZ.config
       * @method loyaltyHistoryService
       * @return {String} Power Loyalty History Service URL
       */
      loyaltyHistoryService: function loyaltyHistoryService(customerID) {
        return urlPrefixes.legacyApi + "/power/customer/" + customerID + "/loyalty/history";
      },
      globalPaymentGateway: {
        /**
         * Returns the path of the Process Payment Service of the Global Payment Gateway.
         * @namespace jsDPZ.config.globalPaymentGateway
         * @method processPayment
         * @return {String} Power Payment Gateway[:]Process Payment URL
         */
        processPayment: function processPayment(versionNext) {
          var urlSuffix = versionNext ? "/power/paymentGatewayService" : "/power/paymentGateway/processPayment";
          return urlPrefixes.legacyApi + urlSuffix;
        },

        /**
         * Returns the path of the Status Service of the Global Payment Gateway.
         * @namespace jsDPZ.config.globalPaymentGateway
         * @method status
         * @return {String} Power Payment Gateway[:]Status URL
         */
        status: function status(transactionId, versionNext) {
          var urlSuffix = versionNext ? "/power/paymentGatewayService/" : "/power/paymentGateway/status?id=";
          return urlPrefixes.legacyApi + urlSuffix + transactionId;
        },

        /**
         * Returns the path of the List Providers of the Global Payment Gateway.
         * @namespace jsDPZ.config.globalPaymentGateway
         * @method listProviders
         * @return {String} Power Payment Gateway[:]Status URL
         */
        listProviders: function listProviders() {
          return urlPrefixes.legacyApi + "/power/paymentGatewayService/listProviders";
        },
        createSession: function createSession() {
          return getGlobalPaymentBase({
            version: "v3"
          }) + "/sessions";
        },
        getSession: function getSession(options) {
          var opts = $.extend(true, {
            sessionId: ""
          }, options);
          return getGlobalPaymentBase({
            version: "v3"
          }) + "/sessions/" + encodeURIComponent(opts.sessionId);
        },
        getSessionEvents: function getSessionEvents(options) {
          return this.getSession(options) + "/events";
        },
        getSessionOrder: function getSessionOrder(options) {
          return this.getSession(options) + "/order";
        },
        cancelSession: function cancelSession(options) {
          return this.getSession(options) + "/_cancel";
        },
        updateSessionOrder: function updateSessionOrder(options) {
          return this.getSession(options) + "/_updateOrder";
        },
        getSessionProviders: function getSessionProviders(options) {
          var withTransactions = options && options.withTransactions;
          return this.getSession(options) + (withTransactions ? "/_listProviders" : "/providers");
        },
        getSessionTransactions: function getSessionTransactions(options) {
          return this.getSession(options) + "/transactions";
        },
        getTransaction: function getTransaction(options) {
          var opts = $.extend(true, {
            transactionId: ""
          }, options);
          return getGlobalPaymentBase({
            version: "v3"
          }) + "/transactions/" + encodeURIComponent(opts.transactionId);
        },
        getTransactionEvents: function getTransactionEvents(options) {
          return this.getTransaction(options) + "/events";
        },
        advanceTransactionPayment: function advanceTransactionPayment(options) {
          return this.getTransaction(options) + "/_advance";
        }
      },
      customerWallet: customerWallet,
      customerVerificationOTP: customerVerificationOTP,

      /**
       * Returns the path of the qitaf one time password request (OTP)
       * @namespace jsDPZ.config
       * @method qitafOneTimePassword
       * @param {String} phoneNumber The client's phone number that is associated with a qitaf account
       * @return {String} Qitaf OTP Service URL
       */
      qitafOneTimePassword: function qitafOneTimePassword(phoneNumber) {
        return urlPrefixes.legacyApi + "/power/oneTimePassword?phoneNumber=" + phoneNumber;
      },
      orderKioskDeviceWakeup: function orderKioskDeviceWakeup(storeId) {
        return urlPrefixes.api + "/kiosk-service-v2/stores/" + storeId + "/station:initialize";
      },
      orderKioskPaymentRequest: function orderKioskPaymentRequest() {
        return urlPrefixes.api + "/kiosk-service-v2/kioskPayments";
      },
      orderKioskPaymentStatus: function orderKioskPaymentStatus(orderId) {
        return urlPrefixes.api + "/kiosk-service-v2/orders/" + orderId;
      },
      getECommerceOrders: function getECommerceOrders(orderId) {
        return urlPrefixes.api + "/kiosk-service-v2/eCommerceOrders/" + orderId;
      },
      claimLoyalty: function claimLoyalty() {
        return urlPrefixes.api + "/post-order-loyalty-service/claimLoyalty";
      },
      getCart: function getCart(cartId) {
        return urlPrefixes.api + "/cart-management-service/carts/" + cartId;
      },
      isStoreEnabledForWallet: function isStoreEnabledForWallet(options) {
        return urlPrefixes.legacyApi + "/global-payment-gateway-service/providers/" + encodeURIComponent(options.provider) + "/stores/" + encodeURIComponent(options.storeId);
      },
      getAccountForWallet: function getAccountForWallet(provider) {
        return urlPrefixes.legacyApi + "/global-payment-gateway-service/providers/" + encodeURIComponent(provider) + "/wallets";
      },
      createAccountForWallet: function createAccountForWallet(provider) {
        return urlPrefixes.legacyApi + "/global-payment-gateway-service/providers/" + encodeURIComponent(provider) + "/wallets";
      },
      verifyEmailForWallet: function verifyEmailForWallet(provider) {
        return urlPrefixes.legacyApi + "/global-payment-gateway-service/providers/" + encodeURIComponent(provider) + "/wallets/_verify";
      },
      providerPreferences: function providerPreferences(provider) {
        return urlPrefixes.legacyApi + "/global-payment-gateway-service/providers/" + encodeURIComponent(provider) + "/preferences";
      },
      getStoreTrackerStatus: function getStoreTrackerStatus(storeId) {
        return urlPrefixes.trackerApi + "/tracker-presentation-service/status?storeId=" + storeId;
      },
      pushSmsOptIn: function pushSmsOptIn() {
        return urlPrefixes.trackerApi + "/tracker-presentation-service/optIn";
      },
      getTargetedOffer: function getTargetedOffer(offerId) {
        return urlPrefixes.api + "/targeted-offers-service/" + offerId + "/";
      },
      claimTargetedOffer: function claimTargetedOffer() {
        return urlPrefixes.api + "/targeted-offers-service/claim";
      },
      getCampaignsActivationsService: function getCampaignsActivationsService(name, email, baseValue) {
        return urlPrefixes.api + "/campaigns-activations-service/campaigns?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&baseValue=" + encodeURIComponent(baseValue);
      },
      activateBonusCampaign: function activateBonusCampaign() {
        return urlPrefixes.api + "/campaigns-activations-service/campaigns/customers";
      },
      activateTwoOrdersAway: function activateTwoOrdersAway(customerID) {
        return urlPrefixes.api + "/promo-presentation-service/programs/TwoOrdersAway/customers/" + encodeURIComponent(customerID);
      },
      activateBPMe: function activateBPMe() {
        return urlPrefixes.api + "/promo-presentation-service/campaigns/DOMINOSBPME/promocodes";
      },
      getUpsellsForOrder: function getUpsellsForOrder() {
        return urlPrefixes.api + "/upsell-service/stores/upsellForOrder/";
      },
      getStepUpsellForOrder: function getStepUpsellForOrder() {
        return urlPrefixes.api + "/upsell-service/stores/stepUpsellForOrder";
      },
      getAllCouponsForOrder: function getAllCouponsForOrder() {
        return urlPrefixes.api + "/auto-couponing-service/operation/all-coupons-for-order";
      },
      tpsGetOrders: function tpsGetOrders(options) {
        return options.phoneNumber ? urlPrefixes.trackerApi + "/tracker-presentation-service/v2/orders?phonenumber=" + options.phoneNumber : urlPrefixes.trackerApi + "/tracker-presentation-service" + options.path;
      },

      /**
       * Returns the path of the service that returns driver profile and badges information
       * @namespace jsDPZ.config
       * @method getDriverProfileAndBadges
       * @param {String} storeId The store id
       * @param {String} driverId The driver id
       * @return {String} Profile And Badges path
       */
      getDriverProfileAndBadges: function getDriverProfileAndBadges(_ref16) {
        var storeId = _ref16.storeId,
            driverId = _ref16.driverId;
        return "".concat(urlPrefixes.trackerApi, "/tracker-presentation-service/stores/").concat(encodeURIComponent(storeId), "/drivers/").concat(encodeURIComponent(driverId), "/profileAndBadges");
      },
      getTpsSseEndpoint: function getTpsSseEndpoint(orderId) {
        return urlPrefixes.trackerApi + "/tracker-presentation-service/sse/orders/" + orderId + "?source=nolo";
      },
      getTlsVersion: function getTlsVersion() {
        return urlPrefixes.legacyApi + "/tlstest";
      },

      /**
       * Returns the path of the Power service, which validates an order
       * @namespace jsDPZ.config
       * @method getDinnerBellDeepLink
       * @return {String} Dinner Bell path
       */
      getDinnerBellDeepLink: function getDinnerBellDeepLink() {
        return urlPrefixes.api + "/url-shortening-service/createGroup";
      },
      customerDetails: function customerDetails(type, key) {
        return urlPrefixes.api + "/customer-details-service/customerDetails/" + type + "/" + key;
      },
      socialMediaIdentities: function socialMediaIdentities() {
        return urlPrefixes.api + "/external-identity-service";
      },
      deliveryInsurance: function deliveryInsurance(url) {
        return urlPrefixes.api + "/promo-presentation-service/dig/" + (url || "");
      },
      loyaltyProgram: function loyaltyProgram(url) {
        return urlPrefixes.api + "/promo-presentation-service/programs/" + (url || "");
      },
      loyaltyProgramOffer: function loyaltyProgramOffer(programName) {
        return "".concat(urlPrefixes.api, "/promo-presentation-service/programs/").concat(programName, "/offers");
      },
      carsideGuarantee: function carsideGuarantee(url) {
        return urlPrefixes.api + "/promo-presentation-service/dcd/" + (url || "");
      },
      sendSMSMessage: function sendSMSMessage(url) {
        return urlPrefixes.api + "/promo-presentation-service/messages/sms/" + (url || "");
      },
      piePassCheckinSub: function piePassCheckinSub(orderID, useNewSSEEndpoint) {
        var ssePath = useNewSSEEndpoint ? "/pie-pass-presentation-service/sse/orders/" : "/pie-pass-presentation-service/orders/";
        return urlPrefixes.api + ssePath + orderID + "?source=NOLO";
      },
      piePassSurvey: function piePassSurvey() {
        return urlPrefixes.api + "/pie-pass-presentation-service/survey";
      },
      fetchFeedbackQuestion: function fetchFeedbackQuestion() {
        return urlPrefixes.api + "/feedback-service-v2/survey/question";
      },
      publishFeedbackQuestions: function publishFeedbackQuestions(options) {
        var opts = $.extend({
          storeId: "",
          orderId: ""
        }, options);
        return urlPrefixes.api + "/feedback-service-v2/survey/publishResponse/" + encodeURIComponent(opts.storeId) + "/" + encodeURIComponent(opts.orderId);
      },
      getPersonalCoupons: function getPersonalCoupons() {
        return urlPrefixes.api + "/targeted-offers-service/personalCoupons";
      },
      assignThirdPartyCode: function assignThirdPartyCode() {
        return urlPrefixes.api + "/targeted-offers-service/assignThirdPartyCode";
      },
      getValueSiteOffer: function getValueSiteOffer() {
        return urlPrefixes.api + "/targeted-offers-service/orchestratedOffers/value-site";
      },
      claimValueSiteOffer: function claimValueSiteOffer(options) {
        return urlPrefixes.api + "/targeted-offers-service/orchestratedOffers/value-site/" + encodeURIComponent(options.offer);
      },

      /**
       * Returns the path of the service, which returns the coupon for upsell for delivery delay
       * @namespace jsDPZ.config
       * @method upsellForDeliveryDelay
       * @param {String} storeId The store id to check for the upsell
       * @return {String} upsell service path
       */
      upsellForDeliveryDelay: function upsellForDeliveryDelay(storeId) {
        return urlPrefixes.api + "/upsell-service/stores/" + encodeURIComponent(storeId) + "/upsellForDeliveryDelay";
      },
      customerCheckIn: function customerCheckIn() {
        return urlPrefixes.legacyApi + "/power/pizza";
      },
      cheese: function cheese() {
        return urlPrefixes.legacyApi + "/power/cheese";
      },
      duc: function duc(orderId) {
        return urlPrefixes.api + "/delivery-presentation-service/duc/" + orderId;
      },

      /**
       * Returns the path of the service, which returns customer privacy data
       * @namespace jsDPZ.config
       * @method customerPrivacy
       * @param {String} endpoint The service's endpoint
       * @return {String} customer data-privacy service path
       */
      customerPrivacy: function customerPrivacy(endpoint) {
        return urlPrefixes.api + "/customer-details-service/data-privacy/" + endpoint;
      },

      /**
       * Returns the path of the service, which returns if an AV resource is available
       * @namespace jsDPZ.config
       * @method avRequestAvailability
       * @return {String} AV resource availability service path
       */
      avRequestAvailability: function avRequestAvailability() {
        return urlPrefixes.api + "/autonomous-vehicle-service/availableResources";
      },
      avBooking: function avBooking() {
        return urlPrefixes.api + "/autonomous-vehicle-service/bookings";
      },
      getDeliveryPresentationServiceEndpoint: function getDeliveryPresentationServiceEndpoint(storeId) {
        return urlPrefixes.api + "/delivery-presentation-service/stores/" + storeId;
      },
      getUpsellForProductsAndCouponsEndpoint: function getUpsellForProductsAndCouponsEndpoint() {
        return urlPrefixes.api + "/upsell-service/stores/upsellForProductsAndCoupons/";
      },

      /**
       * Returns whether or not provided email belongs to existing customer
       * @namespace jsDPZ.config
       * @method emailExists
       * @param {String} email Email to test if existing customer
       * @return {Boolean} True if email belongs to existing customer, otherwise false
       */
      emailExist: function emailExist(email) {
        return urlPrefixes.api + "/customer-details-service/email-exist/" + email;
      },
      resendCode: function resendCode() {
        return urlPrefixes.legacyApi + "/power/resend-code";
      },
      getFutureOrderCapacityBlackListEndpoint: function getFutureOrderCapacityBlackListEndpoint(storeId, startDate) {
        return urlPrefixes.legacyApi + "/power/capacity/capacityAttribute/" + storeId + "/businessDate/" + startDate;
      },

      /**
       * Returns path to the service which gives the availability of service method on a future date
       * @namespace jsDPZ.config
       * @method getAvailableServiceMethodsForFutureDate
       * @param {String} storeId
       * @return {String} future available service methods path
       */
      getAvailableServiceMethodsForFutureDate: function getAvailableServiceMethodsForFutureDate(_ref17) {
        var storeId = _ref17.storeId;
        return "".concat(urlPrefixes.api, "/store-service/stores/").concat(encodeURIComponent(storeId), "/serviceMethodsAvailability");
      },
      getWAMResourceURL: function getWAMResourceURL(_ref18) {
        var component = _ref18.component,
            marketName = _ref18.marketName,
            activeLanguageCode = _ref18.activeLanguageCode;
        return "https://cache.dominos.com/wam/prod/market/".concat(marketName, "/").concat(activeLanguageCode, "/").concat(component, ".json");
      }
    }
  });
})(jQuery);
/**
* The dataConversion module hold functionality to convert JSON to Strings and Strings back to JSON
* @module dataConversion
*/

/**
* The dataConversion class hold functionality to convert JSON to Strings and Strings back to JSON <br />
* Using JSON Parser from http://www.JSON.org/json2.js, wrapped into our framework.
* @class jsDPZ.dataConversion
* @static
*/


(function ($) {
  function f(n) {
    return n < 10 ? "0" + n : n;
  }

  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function (key) {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    };

    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
      return this.valueOf();
    };
  }

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    '"': '\\"',
    "\\": "\\\\"
  },
      rep;

  function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
      var c = meta[a];
      return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
  }

  function str(key, holder) {
    var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];

    if (value && _typeof(value) === "object" && typeof value.toJSON === "function") {
      value = value.toJSON(key);
    }

    if (typeof rep === "function") {
      value = rep.call(holder, key, value);
    }

    switch (_typeof(value)) {
      case "string":
        return quote(value);

      case "number":
        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":
        return String(value);

      case "object":
        if (!value) {
          return "null";
        }

        gap += indent;
        partial = [];

        if (Object.prototype.toString.apply(value) === "[object Array]") {
          length = value.length;

          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
          gap = mind;
          return v;
        }

        if (rep && _typeof(rep) === "object") {
          length = rep.length;

          for (i = 0; i < length; i += 1) {
            k = rep[i];

            if (typeof k === "string") {
              v = str(k, value);

              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {
          for (k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
              v = str(k, value);

              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }

        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }

  $.extend(jsDPZ.dataConversion, {
    /**
        * Takes a JSON object and stringifies it
        * @namespace jsDPZ.dataConversion
        * @method JSONObjectToString
        * @param value {String}
        * @param replacer {String}
        * @param space {String}
        * @return {String} stringified JSON
        */
    JSONObjectToString: function JSONObjectToString(value, replacer, space) {
      return JSON.stringify(value, replacer, space);
    },

    /**
        * Takes stringified JSON and returns JSON object
        * @namespace jsDPZ.dataConversion
        * @method JSONStringToObject
        * @param text {String}
        * @param reviver {String}
        * @return {Object} JSON
        */
    JSONStringToObject: function JSONStringToObject(text, reviver) {
      try {
        return JSON.parse(text, reviver);
      } catch (error) {
        console && console.error(error);
      }
    }
  });
})(jQuery);
/**
* The obj module hold all objects which will be instantiated
* @module obj
*/

/**
* A standard postal address object
* @class address
* @requires util
* @requires config
*/


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
        * @method jsDPZ.obj.address
        * @param value {Object} JSON Address
        * @return {Address} Instantiated address
        */
    address: function address(value) {
      return new _address(value);
    }
  });
  /**
    * Generate an address based on the jsDPZ.config.dataModel.ADDRESS
    * @method address
    * @param data {Object} address JSON object
    * @constructor address
    * @private
    */

  function _address(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.ADDRESS);

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
  /**
    * Get an array which holds all address fields to be used in the UI
    * @param address {Object} format JSON object.
    * @method getDisplayAddress
    * @return {Array} all address fields
    + Updated 07/2015 Added param address to remove other dependencies.     
    */


  _address.prototype.getDisplayAddress = function (address) {
    var result = [],
        displayAddress = address || "",
        override = displayAddress.override || "",
        keys = displayAddress.fields || "";

    if (!jsDPZ.util.empty(this.data[override.exists])) {
      keys = override.newFields;
    }

    for (var i = 0, iL = keys.length; i < iL; i++) {
      var key = keys[i];

      if (!jsDPZ.util.empty(this.data[key])) {
        result.push(this.data[key]);
      }
    }

    var csz = ""; // city, state, zip

    keys = displayAddress.keysCSZ || "";

    for (var i = 0, iL = keys.length; i < iL; i++) {
      var key = keys[i];

      if (!jsDPZ.util.empty(this.data[key])) {
        csz += (i == 1 ? csz != "" ? ", " : "" : csz != "" ? " " : "") + this.data[key];
      }
    }

    if (!jsDPZ.util.empty(csz)) {
      result.push(csz);
    }

    return result;
  };
})(jQuery);
/**
 * Catalog manages all menu, product, and coupon data.
 * @class catalog
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.catalog
     * @param data {Object} JSON Catalog
     * @return {Catalog} Instantiated catalog
     */
    catalog: function catalog(data) {
      return new _catalog(data);
    }
  });
  /**
   * Generate an catalog based on the jsDPZ.config.dataModel.CATALOG
   * @method catalog
   * @param data {Object} catalog JSON object
   * @constructor catalog
   * @private
   */

  function _catalog(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.CATALOG);

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
  /**
   * Helper function to extract data from a given object without modifying the original object
   * @method getData
   * @param rootObj {Object}
   * @param type {String}
   * @param code {String} product/variant/size etc.
   * @param defaults {Object} default data model from jsDPZ.config.dataModel
   * @return {Array} subset of catalog data
   * @private
   */


  function getData(rootObj, type, code, defaults) {
    if (!jsDPZ.util.empty(type)) {
      if (!jsDPZ.util.empty(rootObj[type])) {
        var parentObj = rootObj[type];

        if (!jsDPZ.util.empty(code)) {
          if (!jsDPZ.util.empty(parentObj[code])) {
            return $.extend(true, {}, defaults, parentObj[code]);
          }

          return {};
        }

        var result = [];

        for (var key in parentObj) {
          result.push($.extend(true, {}, defaults, parentObj[key]));
        }

        return result;
      }
    }

    return [];
  }
  /**
   * Helper function to parse default options for a product from Power Master Menu
   * @method defaultOptionParser
   * @param string {String} default option string from master menu
   * @return {Object} default options JSON
   * @private
   */


  function defaultOptionParser(string) {
    if (!jsDPZ.util.empty(string)) {
      var results = {};
      var stringArr = string.split(",");

      for (var i = 0, iL = stringArr.length; i < iL; i++) {
        var tmp = stringArr[i].split("=");
        results[tmp[0]] = [tmp[1]];
      }

      return results;
    }

    return {};
  }
  /**
   * Helper function to get product flavor sizes
   * @method getProductFlavorsSizes
   * @param code {String} product code
   * @param type {String} "Flavor" or "Size"
   * @param thisObject {Object} the Catalog object
   * @return {Array} product flavors sizes
   * @private
   */


  function getProductFlavorsSizes(productCode, type, thisObject) {
    var p = thisObject.getProduct(productCode);

    if (!jsDPZ.util.empty(p)) {
      var finalizedResults = [];
      var variantCodeArr = p.getVariantCodeData();

      for (var i = 0, iL = variantCodeArr.length; i < iL; i++) {
        var v = thisObject.getVariant(variantCodeArr[i]);

        if (!jsDPZ.util.empty(v)) {
          var finalizedData = thisObject["get" + type + "sData"](p.data.ProductType, v.data[type + "Code"]);

          if (!jsDPZ.util.empty(finalizedData)) {
            var found = false;

            for (var j = 0, jL = finalizedResults.length; j < jL; j++) {
              found = finalizedResults[j].Code == finalizedData.Code;

              if (found) {
                break;
              }
            }

            if (!found) {
              finalizedResults.push($.extend(true, {}, finalizedData));
            }
          }
        }
      }

      return finalizedResults;
    }

    return [];
  }
  /**
   * Helper function to get product code from a given variant code
   * @method getProductCode
   * @param variantCode {String}
   * @param thisObject {Object} the Catalog object
   * @return {String} product code
   * @private
   */


  function getProductCode(variantCode, thisObject) {
    var v = thisObject.getVariant(variantCode);

    if (!jsDPZ.util.empty(v)) {
      return v.data.ProductCode;
    }

    return null;
  }

  function getVariantsFlavors(variantCodes, catalog) {
    var variantCodeToProductCode = function variantCodeToProductCode(variantCode) {
      return getProductCode(variantCode, catalog);
    };

    var nonEmptyProductCodes = function nonEmptyProductCodes(productCode) {
      return !!productCode;
    };

    var productCodeToFlattenedFlavors = function productCodeToFlattenedFlavors(flavors, productCode) {
      var nonDuplicateFlavors = function nonDuplicateFlavors(_f) {
        var flavorCode = _f.Code;

        var flavorExists = function flavorExists(flavor) {
          return flavor.Code === flavorCode;
        };

        return !flavors.some(flavorExists);
      };

      var newProductFlavors = getProductFlavorsSizes(productCode, "Flavor", catalog).filter(nonDuplicateFlavors);
      return flavors.concat(newProductFlavors);
    };

    return $.makeArray(variantCodes).map(variantCodeToProductCode).filter(nonEmptyProductCodes).reduce(productCodeToFlattenedFlavors, []);
  }
  /**
   * Helper function to get product options (sides/toppings)
   * @method getProductOptions
   * @param productCode {String}
   * @param collection {String} "Toppings" or "Sides"
   * @param type {String} "Available" or "Default"
   * @param override {String} override the sides or toppings
   * @param thisObject {Object} the Catalog object
   * @param {Array} product options
   * @private
   */


  function getProductOptions(productCode, collection, type, override, thisObject) {
    var p = thisObject.getProduct(productCode);
    var finalizedOptions = [];
    /* UNCOMMENT START ECOM-16014 
    var isAvailable = function(code) {
      var unsupportedOptions = thisObject.data.UnsupportedOptions || {};
      var unsupportedProducts = thisObject.data.UnsupportedProducts || {};
      return !(unsupportedOptions[code] || unsupportedProducts[code]);
    };
    UNCOMMENT END ECOM-16014 */

    if (!jsDPZ.util.empty(p)) {
      var availableOptions = p["getAvailable" + collection + "Data"]();

      if (!jsDPZ.util.empty(availableOptions)) {
        for (var i = 0, iL = availableOptions.length; i < iL; i++) {
          var object = availableOptions[i]; // UNCOMMENT ECOM-16014 if (isAvailable(object.Code))

          finalizedOptions.push($.extend({}, thisObject["get" + collection + "Data"](p.data.ProductType, object.Code), {
            Availability: object.Availability
          }));
        }

        var mergeOptions = override != null ? override : type == "Default" ? p["get" + type + collection + "Data"]() : null;

        if (mergeOptions != null) {
          if ($.isArray(mergeOptions)) {
            var _i = 0;

            while (_i < finalizedOptions.length) {
              var found = false;

              for (var j = 0, jL = mergeOptions.length; j < jL; j++) {
                if (mergeOptions[j].Code == finalizedOptions[_i].Code) {
                  finalizedOptions[_i].Availability = mergeOptions[j].Availability;
                  found = true;
                  j = jL;
                }
              }

              if (!found) {
                finalizedOptions.remove(_i);
              } else {
                _i++;
              }
            }
          } else {
            var _i2 = 0;

            while (_i2 < finalizedOptions.length) {
              var option = finalizedOptions[_i2];

              if (jsDPZ.util.empty(mergeOptions[option.Code])) {
                finalizedOptions.remove(_i2);
              } else {
                option.Availability = mergeOptions[option.Code];
                _i2++;
              }
            }
          }
        }
      }
    }

    return finalizedOptions;
  }
  /**
   * Helper function to get category data
   * @method getProductOptions
   * @param category {Object} category JSON object
   * @param code {String} category code
   * @return {Category} Category object
   * @private
   */


  function findCategory(category, code) {
    if (category.Code == code) {
      return category;
    } else if (category.Categories.length > 0) {
      var tmp = {};

      for (var i = 0, iL = category.Categories.length; i < iL; i++) {
        tmp = findCategory(category.Categories[i], code);

        if (!jsDPZ.util.empty(tmp)) {
          break;
        }
      }

      return tmp;
    }

    return {};
  }
  /**
   * Helper function to take the string of available cooking instructions and build an object populated with the info from catalog
   * @method getCookingInstructionObject
   * @param variantData {Object} variant JSON object
   * @param catalogData {object} catalog JSON object
   * @return {object} fully rolled-up cookingInstructions object
   * @private
   */


  function getCookingInstructionObject(variantData, catalogData) {
    var cookingInstructions = variantData.AllowedCookingInstructions.split(",");
    var cookingInstructionsArray = cookingInstructions.filter(function (key) {
      return catalogData.data.CookingInstructions[key];
    }).map(function (key) {
      return catalogData.data.CookingInstructions[key];
    });
    return cookingInstructionsArray.length > 0 ? addDefaultInstructions(cookingInstructionsArray, variantData, catalogData) : // eslint-disable-next-line no-undefined
    undefined;
  }
  /**
   * Helper function that takes the cooking instructions object from getCookingInstructionObject and appends it with that Variants default instructions
   * @method addDefaultInstructions
   * @param cookingInstructions {object} cookingInstruction JSON object
   * @param variantData {object} variant JSON object
   * @param catalogData {object} catalog JSON object
   * @return {object} cookingInstructionObject with the Variant defaults added
   * @private
   */


  function addDefaultInstructions(cookingInstructions, variantData, catalogData) {
    for (var i = 0, iL = cookingInstructions.length; i < iL; i++) {
      var defaultInstructions = variantData.DefaultCookingInstructions.split(",");
      cookingInstructions[i]["Default"] = false;

      for (var j = 0, jL = defaultInstructions.length; j < jL; j++) {
        if (defaultInstructions[j] === cookingInstructions[i].Code) {
          cookingInstructions[i].Default = true;
        }
      }
    }

    return rollupInstructionsToGroups(cookingInstructions, catalogData);
  }
  /**
   * Helper function that takes all of the cooking instruction data and nests it underneath its proper group
   * @method rollupIntructionsToGroups
   * @param cookingInstructions {object} cookingInstructions JSON object
   * @param catalogData {object} catalog JSON object
   * @return {object} cookingInstructionGroups {object} JSON object of all the instructions nested into its groups
   * @private
   */


  function rollupInstructionsToGroups(cookingInstructions, catalogData) {
    var cookingInstructionGroups = catalogData.data.CookingInstructionGroups;
    $.each(cookingInstructionGroups, function (index, group) {
      group["Instructions"] = [];

      for (var i = 0, iL = cookingInstructions.length; i < iL; i++) {
        if (cookingInstructions[i].Group === group.Code) {
          group.Instructions.push(cookingInstructions[i]);
        }
      }
    });
    return cookingInstructionGroups;
  }
  /**
   * Get data for a given category
   * @method getCategoryData
   * @param rootCode {String} root category code to limit scope of your search
   * @param categoryCode {String} category code to search for
   * @return {Category} Category object
   */


  _catalog.prototype.getCategoryData = function (rootCode, categoryCode) {
    var yourCategory = {};

    if (!jsDPZ.util.empty(rootCode) && !jsDPZ.util.empty(categoryCode)) {
      if (!jsDPZ.util.empty(this.data.Categorization[rootCode])) {
        for (var i = 0, iL = this.data.Categorization[rootCode].Categories.length; i < iL; i++) {
          var categoryData = this.data.Categorization[rootCode].Categories[i];
          yourCategory = findCategory(categoryData, categoryCode);

          if (!jsDPZ.util.empty(yourCategory)) {
            i = iL;
          }
        }
      }
    }

    return yourCategory;
  };
  /**
   * Get Coupon for a given coupon code from the current catalog
   * @method getCoupon
   * @param couponCode {String}
   * @return {Coupon} Coupon object
   */


  _catalog.prototype.getCoupon = function (couponCode) {
    if (!jsDPZ.util.empty(this.data.Coupons[couponCode])) {
      return jsDPZ.obj.coupon(this.data.Coupons[couponCode]);
    }

    return {};
  };
  /**
   * Get an array of coupons that passes a filter. It also sorts the array by some criteria if the options value is passed
   * @namespace jsDPZ.app
   * @method getCouponsArray
   * @return [Array] array of coupon objects
   */


  _catalog.prototype.getCouponsArray = function () {
    var catalog = this;

    var getCatalogCoupon = function getCatalogCoupon(coupon) {
      return catalog.getCoupon(coupon.Code);
    };

    var hasData = function hasData(coupon) {
      return !jsDPZ.util.empty(coupon);
    };

    return Object.values(this.data.Coupons).map(getCatalogCoupon).filter(hasData);
  };
  /**
   * Get an array of coupons that passes a filter.
   * @namespace jsDPZ.app
   * @method getExclusiveCoupons
   * @return [Array] array of exclusive coupons in current catalog
   */


  _catalog.prototype.getExclusiveCoupons = function () {
    return this.getCouponsArray().filter(function (coupon) {
      return coupon.isExclusiveCoupon();
    });
  };
  /**
   * Fetches a specific coupon on this catalog, if the coupon is not on the catalog,
   * it tries to fetch the coupon information from power.
   * @method getHiddenCoupon
   * @param couponCode {String} coupon code to be fetched
   * @return {Promise} If the coupon information is found, the promise is resolved with
   *                   the coupon as a parameter; if the coupon is not found the promise
   *                   is resolved with a blank coupon (the object only has the coupon code)
   */


  _catalog.prototype.getHiddenCoupon = function (couponCode) {
    var promise = $.Deferred();
    var coupon = this.getCoupon(couponCode);
    var catalog = this;

    if (coupon.data) {
      promise.resolve({
        fetched: true,
        coupon: coupon
      });
    } else {
      coupon = jsDPZ.obj.coupon({
        Code: couponCode
      });
      var storeID = jsDPZ.app.order.getOrder().data.Details.StoreID;

      if (storeID === "") {
        if (this.data.NationalStoreID === "") {
          promise.resolve({
            fetched: false,
            coupon: coupon
          });
          return promise;
        } else {
          storeID = this.data.NationalStoreID;
        }
      }

      jsDPZ.ajax.coupon({
        CouponCode: couponCode,
        StoreID: storeID,
        success: function success(data) {
          jsDPZ.app.catalog.setCouponFromPower(data);
          promise.resolve({
            fetched: true,
            coupon: catalog.getCoupon(couponCode)
          });
        },
        error: function error(data) {
          promise.resolve({
            fetched: false,
            coupon: coupon
          });
        }
      });
    }

    return promise;
  };
  /**
   * Get Product for a given product code from the current catalog
   * @method getProduct
   * @param productCode {String}
   * @return {Product} Product object
   */


  _catalog.prototype.getProduct = function (productCode) {
    if (!jsDPZ.util.empty(this.data.Products[productCode])) {
      return jsDPZ.obj.product(this.data.Products[productCode]);
    }

    return {};
  };
  /**
   * Get Variant for a given variant code from the current catalog
   * @method getVariant
   * @param variantCode {String}
   * @return {Variant} Variant object
   */


  _catalog.prototype.getVariant = function (variantCodes) {
    // In the case of half and half specialty pizzas we have two codes separated by a slash
    // So we only return the variant representing the first half
    var variantCode = variantCodes && variantCodes.split("/")[0];

    if (variantCode && !jsDPZ.util.empty(this.data.Variants[variantCode])) {
      return jsDPZ.obj.variant(this.data.Variants[variantCode]);
    }

    return {};
  };
  /**
   * Get Variant for a given product code, flavor code, and size code from the current catalog
   * @method getVariantOfProduct
   * @param productCode {String} product type as defined on a product object
   * @param flavorCode {String} flavor code as defined on a variant object
   * @param sizeCode {String} size code as defined on a variant object
   * @return {Variant} Variant object
   */


  _catalog.prototype.getVariantOfProduct = function (productCode, flavorCode, sizeCode) {
    var p = this.getProduct(productCode);

    if (!jsDPZ.util.empty(p)) {
      var variantCodeArr = p.getVariantCodeData();

      for (var i = 0, iL = variantCodeArr.length; i < iL; i++) {
        var v = this.getVariant(variantCodeArr[i]);

        if (!jsDPZ.util.empty(v) && v.data.FlavorCode == flavorCode && v.data.SizeCode == sizeCode) {
          return v;
        }
      }
    }

    return {};
  };
  /**
   * Get sizes data for a product type and size code from the current catalog
   * @method getSizesData
   * @param productType {String} product type as defined on a product object
   * @param sizeCode {String} size code as defined on a variant object
   * @return {Object} size JSON object
   */


  _catalog.prototype.getSizesData = function (productType, sizeCode) {
    return getData(this.data.Sizes, productType, sizeCode, jsDPZ.config.dataModel.SIZE);
  };
  /**
   * Returns an array of available sizes for a variant based on it's flavorCode
   * @method getAllAvailableSizes
   * @param flavorCode {String}
   * @return {Array} size JSON object
   */


  _catalog.prototype.getAllAvailableSizes = function (flavorCode, productCode) {
    var productType = "";
    return Object.keys(this.data.Variants).reduce(function (acc, key) {
      var variant = this.data.Variants[key];

      if (variant.FlavorCode === flavorCode && variant.ProductCode === productCode) {
        !productType && (productType = this.data.Products[variant.ProductCode].ProductType);
        !~acc.indexOf(variant.SizeCode) && acc.push(variant.SizeCode);
      }

      return acc;
    }.bind(this), []).sort(function (a, b) {
      var sizes = this.data.Sizes[productType];
      return sizes[a].SortSeq - sizes[b].SortSeq;
    }.bind(this));
  };
  /**
   * Get flavor data for a product type and flavor code from the current catalog
   * @method getFlavorsData
   * @param productType {String} product type as defined on a product object
   * @param flavorCode {String} flavor code as defined on a variant object
   * @return {Object} flavor JSON object
   */


  _catalog.prototype.getFlavorsData = function (productType, flavorCode) {
    return getData(this.data.Flavors, productType, flavorCode, jsDPZ.config.dataModel.FLAVOR);
  };
  /**
   * Get toppings data for a product type and topping code from the current catalog
   * @method getToppingsData
   * @param productType {String} product type as defined on a product object
   * @param toppingCode {String} topping code as defined on a variant object
   * @return {Object} topping JSON object
   */


  _catalog.prototype.getToppingsData = function (productType, toppingCode) {
    return getData(this.data.Toppings, productType, toppingCode, jsDPZ.config.dataModel.OPTION);
  };
  /**
   * Get sides data for a product type and side code from the current catalog
   * @method getSidesData
   * @param productType {String} product type as defined on a product object
   * @param sideCode {String} side code as defined on a variant object
   * @return {Object} side JSON object
   */


  _catalog.prototype.getSidesData = function (productType, sideCode) {
    return getData(this.data.Sides, productType, sideCode, jsDPZ.config.dataModel.OPTION);
  };
  /**
   * Get available toppings for a given product from the current catalog
   * @method getAvailableProductToppingsData
   * @param productCode {String} product code as defined on a product object
   * @return {Array} toppings JSON objects
   */


  _catalog.prototype.getAvailableProductToppingsData = function (productCode) {
    return getProductOptions(productCode, "Toppings", "Available", null, this);
  };
  /**
   * Get default toppings for a given product from the current catalog
   * @method getDefaultProductToppingsData
   * @param productCode {String} product code as defined on a product object
   * @return {Array} toppings JSON objects
   */


  _catalog.prototype.getDefaultProductToppingsData = function (productCode) {
    return getProductOptions(productCode, "Toppings", "Default", null, this);
  };
  /**
   * Get available toppings for a given variant from the current catalog
   * @method getAvailableVariantToppingsData
   * @param variantCode {String} variant code as defined on a variant object
   * @return {Array} options JSON objects
   */


  _catalog.prototype.getAvailableVariantToppingsData = function (variantCode) {
    return getProductOptions(getProductCode(variantCode, this), "Toppings", "Available", null, this);
  };
  /**
   * Get default toppings for a given variant from the current catalog
   * @method getDefaultVariantToppingsData
   * @param variantCode {String} variant code as defined on a variant object
   * @return {Array} options JSON objects
   */


  _catalog.prototype.getDefaultVariantToppingsData = function (variantCode) {
    var v = this.getVariant(variantCode);

    if (!jsDPZ.util.empty(v)) {
      var overrides = v.data.Tags.DefaultToppings != null ? defaultOptionParser(v.data.Tags.DefaultToppings) : null;
      return getProductOptions(getProductCode(variantCode, this), "Toppings", "Default", overrides, this);
    }

    return [];
  };
  /**
   * Get available sides for a given product from the current catalog
   * @method getAvailableProductSidesData
   * @param productCode {String} product code as defined on a product object
   * @return {Array} sides JSON objects
   */


  _catalog.prototype.getAvailableProductSidesData = function (productCode) {
    return getProductOptions(productCode, "Sides", "Available", null, this);
  };
  /**
   * Get default sides for a given product from the current catalog
   * @method getDefaultProductSidesData
   * @param productCode {String} product code as defined on a product object
   * @return {Array} sides JSON objects
   */


  _catalog.prototype.getDefaultProductSidesData = function (productCode) {
    return getProductOptions(productCode, "Sides", "Default", null, this);
  };
  /**
   * Get available sides for a given variant from the current catalog
   * @method getAvailableVariantSidesData
   * @param variantCode {String} variant code as defined on a variant object
   * @return {Array} sides JSON objects
   */


  _catalog.prototype.getAvailableVariantSidesData = function (variantCode) {
    return getProductOptions(getProductCode(variantCode, this), "Sides", "Available", null, this);
  };
  /**
   * Get default sides for a given variant from the current catalog
   * @method getDefaultVariantSidesData
   * @param variantCode {String} variant code as defined on a variant object
   * @return {Array} sides JSON objects
   */


  _catalog.prototype.getDefaultVariantSidesData = function (variantCode) {
    var v = this.getVariant(variantCode);

    if (!jsDPZ.util.empty(v)) {
      var overrides = v.data.Tags.DefaultSides !== null ? defaultOptionParser(v.data.Tags.DefaultSides) : null;
      return getProductOptions(getProductCode(variantCode, this), "Sides", "Default", overrides, this);
    }

    return [];
  };
  /**
   * Get flavors for a given product from the current catalog
   * @method getProductFlavorsData
   * @param productCode {String} product code as defined on a product object
   * @return {Array} flavor JSON objects
   */


  _catalog.prototype.getProductFlavorsData = function (productCode) {
    return getProductFlavorsSizes(productCode, "Flavor", this);
  };
  /**
   * Get sizes for a given product from the current catalog
   * @method getProductSizesData
   * @param productCode {String} product code as defined on a product object
   * @return {Array} size JSON objects
   */


  _catalog.prototype.getProductSizesData = function (productCode) {
    return getProductFlavorsSizes(productCode, "Size", this);
  };

  _catalog.prototype.getVariantsFlavors = function (variantCodes) {
    return getVariantsFlavors(variantCodes, this);
  };
  /**
   * Sets the national store ID for this catalog
   * @method setNationalStoreID
   * @param nationalStoreID {String} ID of the national store for this market
   */


  _catalog.prototype.setNationalStoreID = function (nationalStoreID) {
    this.data.NationalStoreID = nationalStoreID;
  };
  /**
   * Get Allowable Cooking Instructions for this Variant Item
   * @method getCookingInstructions
   * @param variantCode {String} Code for the requested product variant
   * @return {Array} of Allowable Cooking Instructions
   */


  _catalog.prototype.getCookingInstructions = function (variantCode) {
    var v = this.getVariant(variantCode);

    if (!jsDPZ.util.empty(v)) {
      return v.data.AllowedCookingInstructions !== null ? getCookingInstructionObject(v.data, this) : null;
    }

    return false;
  };
  /**
   * Get bundled products for selection area of product builder
   * @method getBuilderBundledProducts
   * @param productType {String} Product category type
   * @return {Array} of bundled products
   */


  _catalog.prototype.getBuilderBundledProducts = function (productType) {
    var products = this.data.Products;
    var bundledProducts = [];
    $.each(products, function (_, value) {
      if (value.Tags && value.Tags.BundleBuilderProducts && value.ProductType === productType) {
        bundledProducts.push(value);
      }
    });
    return bundledProducts;
  };
  /**
   * Helper to check if a product is new. Iterates over product variants and looks for isNewItem tag.
   * @param {String} productCode
   * @returns {Boolean}
   */


  _catalog.prototype.getIsNewProduct = function (productCode) {
    var _this = this;

    var product = this.getProduct(productCode);
    if (jsDPZ.util.empty(product)) return false;
    var variantCodes = product.getVariantCodeData();
    return variantCodes.some(function (variantCode) {
      var _this$getVariant$isNe, _this$getVariant;

      return (_this$getVariant$isNe = (_this$getVariant = _this.getVariant(variantCode)).isNewItem) === null || _this$getVariant$isNe === void 0 ? void 0 : _this$getVariant$isNe.call(_this$getVariant);
    });
  };
  /**
   * Iterates Categories recursively to see if there is a new product
   * @param {Category} category
   * @returns {Boolean}
   */


  _catalog.prototype.checkCategoryForNewItems = function (category) {
    var _this2 = this;

    var _category$Categories = category.Categories,
        Categories = _category$Categories === void 0 ? [] : _category$Categories,
        _category$Products = category.Products,
        Products = _category$Products === void 0 ? [] : _category$Products;
    var hasNewProduct = Products.some(function (productCode) {
      return _this2.getIsNewProduct(productCode);
    });

    var checkSubCategory = function checkSubCategory(subCategory) {
      return _this2.checkCategoryForNewItems(subCategory);
    };

    return hasNewProduct || Categories.some(checkSubCategory);
  };
})(jQuery);
/**
 * The coupon provides functionality for all business rules related to adding a coupon to your order
 * @class coupon
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.coupon
     * @param data {Object} JSON Coupon
     * @return {Coupon} Instantiated coupon
     */
    coupon: function coupon(data) {
      return new _coupon(data);
    }
  });
  /**
   * Generate a coupon based on the jsDPZ.config.dataModel.COUPON
   * @method coupon
   * @param data {Object} coupon JSON object
   * @constructor coupon
   * @private
   */

  function _coupon(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.COUPON);

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
  /**
   * Helper function to determine if a given time is valid for a given coupon
   * @method inTimeRange
   * @param current {String} current dateTime
   * @param start {String} start dateTime
   * @param end {String} end dateTime
   * @return {Boolean} true if is within the start and end time, false otherwise
   * @private
   */


  function inTimeRange(current, start, end) {
    var c = jsDPZ.obj.dateTime(current).data;
    var cT = parseFloat(c.getHours() + "." + c.getMinutes());
    var sT, //start time
    eT; //end time

    if (!jsDPZ.util.empty(start)) sT = parseFloat(start[0] + "." + start[1]);
    if (!jsDPZ.util.empty(end)) eT = parseFloat(end[0] + "." + end[1]);
    /******A coupon may have an EffectiveAt tag, or an ExpiresAt tag, or both, or none.
     ****Some coupons have both, but the ExpiresAt time is "less than" the EffectiveAt time.  For example,
     ****the "Lunch && Late Night @ $5" coupon which is EffectiveAt "20:45:00" (8:45 pm) and ExpiresAt "15:15:00"
     ****(3:15 pm, the next day).  This is a multi-day, time-sensitive coupon.
     ****The following conditional statement addresses this variation, along with
     ****same-day time-sensitive cases.  10/8/2014 Pierre Pirault
     **/

    if (sT && eT && sT < eT && cT >= sT && cT < eT || sT > eT && (cT >= sT || cT < eT) || sT && !eT && cT >= sT || eT && !cT && cT < eT || !sT && !eT) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Helper function to determine if the service method is allowed for a given coupon
   * @method inServiceMethod
   * @param serviceMethod {String} type of service method ex: "Delivery"
   * @param methods {String} colon delimited string of service methods allowed for the coupon
   * @return {Boolean} true if given service method is a valid service method for the coupon
   * @private
   */


  function inServiceMethod(serviceMethod, methods) {
    if (!jsDPZ.util.empty(serviceMethod) && !jsDPZ.util.empty(methods)) {
      return Array.isArray(methods) ? methods.includes(serviceMethod) : serviceMethod === methods;
    }

    return true;
  }
  /**
   * Helper function to determine if the day of the week is allowed for a given coupon
   * @method inDayRange
   * @param current {String} dateTime string
   * @param days {Array} days the coupon is active
   * @return {Boolean} true if given service method is a valid service method for the coupon
   * @private
   */


  function inDayRange(current, days) {
    if (!jsDPZ.util.empty(current)) {
      var c = jsDPZ.obj.dateTime(current).data;

      if (!jsDPZ.util.empty(days)) {
        return -1 < $.inArray(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][c.getDay()], $.isArray(days) ? days : [days]);
      }
    }

    return true;
  }
  /**
   * Helper function to determine if a given date is valid for a given coupon
   * @method inDateRange
   * @param current {String} current dateTime
   * @param end {String} end dateTime
   * @return {Boolean} true if is before the end time, false otherwise
   * @private
   */


  function inDateRange(current, end) {
    if (!jsDPZ.util.empty(current)) {
      var c = jsDPZ.obj.dateTime(current).data;

      if (!jsDPZ.util.empty(end)) {
        if (c >= jsDPZ.obj.dateTime(end).data) {
          return false;
        }
      }
    }

    return true;
  }
  /**
   * Get the combine flag for a coupon, this value is used in determining how to combine a coupon
   * @method getCombineFlag
   * @return {String} combine flag
   */


  _coupon.prototype.getCombineFlag = function () {
    if (!jsDPZ.util.empty(this.data.Tags.Combine)) {
      return this.data.Tags.Combine;
    }

    return "Normal";
  };
  /**
   * Determine if a coupon is active, and therefore able to be added to an order
   * @param options {Object} JSON object with the following defaults <br />
   * dtString : "", dateTime string <br />
   * serviceMethod : "Carryout", either "Delivery" or "Carryout" <br />
   * @returns {statusResults} jsDPZ.config.dataModel.STATUS_MESSAGE object
   */


  _coupon.prototype.isActive = function (options) {
    var statusResults = $.extend(true, {}, jsDPZ.config.dataModel.STATUS_MESSAGE);
    var opts = $.extend({
      dtString: "",
      serviceMethod: "Carryout",
      isFutureOrder: false
    }, options);

    if (!inServiceMethod(opts.serviceMethod, this.data.Tags.ServiceMethodOverride || this.data.Tags.ValidServiceMethods || this.data.Tags.ServiceMethods)) {
      statusResults.ErrorCodes.push("eCouponServiceMethod");
    }

    if (!inDateRange(opts.dtString, this.data.Tags.ExpiresOn)) {
      statusResults.ErrorCodes.push("eCouponDate");
    }

    if (!inDayRange(opts.dtString, this.data.Tags.Days) && !opts.afterMidnightCoupon) {
      statusResults.ErrorCodes.push("eCouponDay");
    }

    if (!inTimeRange(opts.dtString, this.data.Tags.EffectiveAt, this.data.Tags.ExpiresAt)) {
      statusResults.ErrorCodes.push("eCouponTime");
    }

    if (!this.isValidSourceOrgURI()) {
      statusResults.ErrorCodes.push("eCouponInvalid");
    }

    if (opts.isFutureOrder && this.data.Tags.NoFutureOrder) statusResults.ErrorCodes.push("eCouponInvalidForFutureOrder");
    statusResults.Success = !statusResults.ErrorCodes.length;
    return statusResults;
  };
  /**
   * Determine if coupon has a tag that indicates loyalty
   * @method isLoyaltyCoupon
   * @return {Boolean} true if coupon has LoyaltyPoints tag
   */


  _coupon.prototype.isLoyaltyCoupon = function () {
    return this.data && this.data.Tags && "LoyaltyPoints" in this.data.Tags;
  };
  /**
   * Determine if coupon has a tag that indicates exclusivity
   * @method isExclusiveCoupon
   * @return {Boolean} true if coupon has LoyaltyPoints tag
   */


  _coupon.prototype.isExclusiveCoupon = function () {
    return this.data && this.data.Tags && this.data.Tags.Combine && ~this.data.Tags.Combine.toLowerCase().indexOf("exclusive") ? true : false;
  };
  /**
   * Assure that the coupon has none of the tags that would make the coupon
   * inapplicable to online ordering
   * @method isApplicable
   * @return {Boolean} false if non-applicable tags are found
   */


  _coupon.prototype.isApplicable = function () {
    if (!jsDPZ.util.empty(this.data.Tags)) {
      if (this.data.Tags.NoEntry || this.data.Tags.NativeApps || this.data.Tags.NoManualEntryByUser) {
        return false;
      }
    }

    return true;
  };
  /**
   * Determine if coupon is valid for the current platform
   * @method isValidSourceOrgURI
   * @return {Boolean} true if coupon is valid for the current platform
   */


  _coupon.prototype.isValidSourceOrgURI = function () {
    // If the coupon doesn't use the SOURCEURI tag, it's valid for all platforms
    if (!this.hasTag("SOURCEURI")) return true; // SOURCEURI can be a string or an array of strings

    var validPlatforms = Array.isArray(this.data.Tags.SOURCEURI) ? this.data.Tags.SOURCEURI : [this.data.Tags.SOURCEURI];
    return validPlatforms.indexOf(jsDPZ.config.dataModel.ORDER_REQUEST.SourceOrganizationURI) > -1;
  };
  /**
   * Determine if coupon has a tag particular tag defined
   * @method hasTag
   * @return {Boolean} true if coupon has a value on the tag
   */


  _coupon.prototype.hasTag = function (tag) {
    return this.data && this.data.Tags && tag in this.data.Tags;
  };

  _coupon.prototype.getServiceMethods = function () {
    var toArray = function toArray(serviceMethods) {
      return Array.isArray(serviceMethods) ? serviceMethods : [serviceMethods];
    };

    if (!jsDPZ.util.empty(this.data.Tags.ServiceMethodOverride)) return toArray(this.data.Tags.ServiceMethodOverride);
    if (!jsDPZ.util.empty(this.data.Tags.ValidServiceMethods)) return toArray(this.data.Tags.ValidServiceMethods);
    return toArray(this.data.Tags.ServiceMethods || []);
  };
})(jQuery);
/**
* The obj module hold all objects which will be instantiated
* @module obj
*/

/**
* A standard postal creditCard object
* @class creditCard
* @requires util
* @requires config
*/


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
        * @method jsDPZ.obj.creditCard
        * @param value {Object} JSON creditCard
        * @return {creditCard} Instantiated creditCard
        */
    creditCard: function creditCard(value) {
      return new _creditCard(value);
    }
  });
  /**
    * Generate an creditCard based on the jsDPZ.config.dataModel.CREDIT_CARD
    * @method creditCard
    * @param data {Object} creditCard JSON object
    * @constructor creditCard
    * @private
    */

  function _creditCard(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.CREDIT_CARD);

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
})(jQuery);
/**
 * The customer class represents a user with session data
 * @class customer
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.customer
     * @param data {Object} JSON Customer
     * @return {Customer} Instantiated customer
     */
    customer: function customer(data) {
      return new _customer(data);
    }
  });
  /**
   * Generate a customer based on the jsDPZ.config.dataModel.CUSTOMER
   * @method customer
   * @param data {Object} customer JSON object
   * @constructor customer
   * @private
   */

  function _customer(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.CUSTOMER, {
      Session: {
        Address: jsDPZ.config.dataModel.ADDRESS
      },
      PastItems: $.extend(true, [], jsDPZ.config.dataModel.QUICKLIST)
    });

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
  /**
   * Get a customers session data
   * @method getSessionData
   * @return {Object} session JSON
   */


  _customer.prototype.getSessionData = function () {
    return this.data.Session;
  };
  /**
   * Get a customers session address
   * @method getSessionAddress
   * @return {Object} address object
   */


  _customer.prototype.getSessionAddress = function () {
    return jsDPZ.obj.address(this.data.Session.Address);
  };
  /**
   * Get a customer data in a format compatible with Power
   * @method getCustomerForPower
   * @return {Object} customer JSON
   */


  _customer.prototype.getCustomerForPower = function () {
    var requestData = $.extend(true, {}, this.data);

    for (var i = 0, iL = requestData.Addresses.length; i < iL; i++) {
      var addr = requestData.Addresses[i];

      if (!jsDPZ.util.empty(addr.Type)) {
        addr.AddressType = addr.Type;
        delete addr.Type;
      }
    }

    delete requestData.Session;
    delete requestData.CreditCards;
    delete requestData.PastItems;
    return requestData;
  };
  /**
   * Sets the customers past ordered items from Power response data
   * @method setPastItemsFromPower
   * @param data {Object} Power past items JSON
   * @return {Object} this customer
   */


  _customer.prototype.setPastItemsFromPower = function (data) {
    function isInArray(value, arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        var areEqual = jsDPZ.util.equal([value, arr[i]]);

        if (areEqual) {
          return true;
        }
      }

      return false;
    }

    function normalizeToppings(arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        for (var topping in arr[i].Toppings) {
          var parts = arr[i].Toppings[topping];
          var partAmount = null;
          var partsLength = 0;
          var partsEqual = true;

          for (var part in parts) {
            parts[part] += "";

            if (partAmount == null) {
              partAmount = parts[part];
            }

            partsEqual = partAmount == parts[part];
            partAmount = parts[part];
            partsLength++;

            if (!partsEqual) {
              break;
            }
          }

          if (partsLength > 1 && partsEqual) {
            arr[i].Toppings[topping] = {
              "1/1": partAmount
            };
          }
        }
      }
    }

    if (!jsDPZ.util.empty(data)) {
      /* Sort the Orders by date */
      data.Orders.sort(function (a, b) {
        return jsDPZ.obj.dateTime(a.StorePlaceOrderTime).data > jsDPZ.obj.dateTime(b.StorePlaceOrderTime).data ? -1 : 1;
      });
      /* Create the quicklist variants */

      var thisObj = this;
      thisObj.data.PastItems = $.extend(true, [], jsDPZ.config.dataModel.QUICKLIST);

      for (var i = 0, iL = data.Orders.length; i < iL; i++) {
        var orderData = data.Orders[i];

        for (var j = 0, jL = orderData.Products.length; j < jL; j++) {
          var productData = orderData.Products[j]; // Create the newPastItem

          var newPastItem = $.extend(true, {}, jsDPZ.config.dataModel.QUICKLIST_VARIANT, {
            Code: productData.Code
          }); // Set the Options into Toppings or Sides

          var type = productData.CategoryCode;

          if (type == "Pizza" || type == "Sandwich" || type == "Pasta") {
            newPastItem.Toppings = $.extend(true, {}, productData.Options);
          } else if (type == "Dessert" || type == "GSalad" || type == "Wings") {
            newPastItem.Sides = $.extend(true, {}, productData.Options);
          } // Check for repeats


          if (!isInArray(newPastItem, thisObj.data.PastItems)) {
            thisObj.data.PastItems.push(newPastItem);
          }
        }
      }
      /* Now Reduce Toppings */


      normalizeToppings(thisObj.data.PastItems);
    }

    return this;
  };
  /**
   * Sets the customers data from Power response data
   * @method setDataFromPower
   * @param data {Object} Power customer JSON
   * @return {Object} this customer
   */


  _customer.prototype.setDataFromPower = function (data) {
    if (!jsDPZ.util.empty(data)) {
      /* Update Addresses */
      var newAddresses = [];

      for (var i = 0, iL = data.Addresses.length; i < iL; i++) {
        var addressObj = data.Addresses[i];
        newAddresses.push($.extend(true, {}, jsDPZ.config.dataModel.ADDRESS, {
          AddressLine2: !jsDPZ.util.empty(addressObj.AddressLine2) ? addressObj.AddressLine2 : "",
          AddressLine3: !jsDPZ.util.empty(addressObj.AddressLine3) ? addressObj.AddressLine3 : "",
          AddressLine4: !jsDPZ.util.empty(addressObj.AddressLine4) ? addressObj.AddressLine4 : "",
          CampusID: !jsDPZ.util.empty(addressObj.CampusID) ? addressObj.CampusID : "",
          BuildingID: !jsDPZ.util.empty(addressObj.BuildingID) ? addressObj.BuildingID : "",
          City: !jsDPZ.util.empty(addressObj.City) ? addressObj.City : "",
          LocationName: !jsDPZ.util.empty(addressObj.LocationName) ? addressObj.LocationName : "",
          Type: addressObj.AddressType || addressObj.Type || "",
          Name: !jsDPZ.util.empty(addressObj.Name) ? addressObj.Name : "",
          PostalCode: !jsDPZ.util.empty(addressObj.PostalCode) ? addressObj.PostalCode : "",
          Region: !jsDPZ.util.empty(addressObj.Region) ? addressObj.Region : "",
          Neighborhood: !jsDPZ.util.empty(addressObj.Neighborhood) ? addressObj.Neighborhood : "",
          StreetRange: !jsDPZ.util.empty(addressObj.StreetRange) ? addressObj.StreetRange : "",
          Street: !jsDPZ.util.empty(addressObj.Street) ? addressObj.Street : "",
          StreetField1: !jsDPZ.util.empty(addressObj.StreetField1) ? addressObj.StreetField1 : "",
          StreetField2: !jsDPZ.util.empty(addressObj.StreetField2) ? addressObj.StreetField2 : "",
          StreetName: !jsDPZ.util.empty(addressObj.StreetName) ? addressObj.StreetName : "",
          StreetNumber: !jsDPZ.util.empty(addressObj.StreetNumber) ? addressObj.StreetNumber : "",
          DeliveryInstructions: !jsDPZ.util.empty(addressObj.DeliveryInstructions) ? addressObj.DeliveryInstructions : "",
          IsDefault: !jsDPZ.util.empty(addressObj.IsDefault) ? addressObj.IsDefault : false,
          Coordinates: {
            Latitude: !jsDPZ.util.empty(addressObj.Coordinates) ? addressObj.Coordinates.Latitude : 0,
            Longitude: !jsDPZ.util.empty(addressObj.Coordinates) ? addressObj.Coordinates.Longitude : 0
          },
          PropertyType: !jsDPZ.util.empty(addressObj.PropertyType) ? addressObj.PropertyType : "",
          PropertyNumber: !jsDPZ.util.empty(addressObj.PropertyNumber) ? addressObj.PropertyNumber : "",
          UnitType: !jsDPZ.util.empty(addressObj.UnitType) ? addressObj.UnitType : "",
          UnitNumber: !jsDPZ.util.empty(addressObj.UnitNumber) ? addressObj.UnitNumber : "",
          SubNeighborhood: !jsDPZ.util.empty(addressObj.SubNeighborhood) ? addressObj.SubNeighborhood : ""
        }));
      }

      data.Addresses = newAddresses;
      /* Remove Unused Keys */

      delete data.URL;
      delete data.IPAddress;
      delete data.Status;
      this.data = $.extend(true, {}, jsDPZ.config.dataModel.CUSTOMER, {
        Loyalty: this.data.Loyalty
      }, data, {
        Session: this.data.Session,
        PastItems: this.data.CustomerID == data.CustomerID ? this.data.PastItems : $.extend(true, [], jsDPZ.config.dataModel.QUICKLIST),
        CreditCards: this.data.CreditCards,
        Details: this.data.Details
      });
      /* Remove Status Response from Loyalty Call */

      if (data.Loyalty) {
        delete this.data.Loyalty.Command;
        delete this.data.Loyalty.Status;
      }
    } else {
      this.data = $.extend(true, {}, jsDPZ.config.dataModel.CUSTOMER, {
        Session: this.data.Session,
        PastItems: this.data.PastItems,
        CreditCards: this.data.CreditCards
      });
    }

    return this;
  };

  _customer.prototype.fetchCreditCard = function (data) {
    var settings = $.extend(true, {
      success: $.noop
    }, data);
    var that = this;
    var devSuccess = settings.success;

    settings.success = function (data) {
      that.data.CreditCards = data;
      devSuccess(data);
    };

    return jsDPZ.ajax.fetchCustomerCreditCard(settings);
  };

  _customer.prototype.saveCreditCard = function (data) {
    var settings = $.extend(true, {
      success: $.noop
    }, data);
    var that = this;
    var devSuccess = settings.success;

    settings.success = function (data) {
      var defaultCardIndex = -1;
      var cardsArr = that.data.CreditCards;
      cardsArr.push(data);
      cardsArr.sort(function (a, b) {
        // Sort By lastUpdated time
        if (new Date(a.lastUpdated) > new Date(b.lastUpdated)) return -1;
        if (new Date(a.lastUpdated) < new Date(b.lastUpdated)) return 1; // a must be equal to b

        return 0;
      });

      for (var i = 0, iL = cardsArr.length; i < iL; i++) {
        // find the locations of the default card
        if (cardsArr[i].isDefault) {
          defaultCardIndex = i;
          break;
        }
      }

      if (defaultCardIndex >= 0) {
        cardsArr.splice(0, 0, cardsArr.splice(defaultCardIndex, 1)[0]); // this is slow
      }

      devSuccess(data);
    };

    jsDPZ.ajax.saveCustomerCreditCard(settings);
  };

  _customer.prototype.updateCreditCard = function (data) {
    var settings = $.extend(true, {
      success: $.noop
    }, data);
    var that = this;
    var devSuccess = settings.success;

    settings.success = function (data) {
      var defaultCardIndex = -1;
      var cardsArr = that.data.CreditCards;

      for (var i = 0; i < cardsArr.length; i++) {
        if (cardsArr[i].id === data.id) {
          cardsArr[i] = data;
          break;
        }
      }

      cardsArr.sort(function (a, b) {
        // Sort By lastUpdated time
        if (new Date(a.lastUpdated) > new Date(b.lastUpdated)) return -1;
        if (new Date(a.lastUpdated) < new Date(b.lastUpdated)) return 1; // a must be equal to b

        return 0;
      });

      for (var i = 0, iL = cardsArr.length; i < iL; i++) {
        // find the locations of the default card
        if (cardsArr[i].isDefault) {
          defaultCardIndex = i;
          break;
        }
      }

      if (defaultCardIndex >= 0) {
        cardsArr.splice(0, 0, cardsArr.splice(defaultCardIndex, 1)[0]); // this is slow
      }

      devSuccess(data);
    };

    jsDPZ.ajax.updateCustomerCreditCard(settings);
  };

  _customer.prototype.deleteCreditCard = function (options) {
    var settings = $.extend(true, {
      success: $.noop
    }, options);
    var that = this;
    var devSuccess = settings.success;
    var cardId = settings.data.id;

    settings.success = function (data) {
      for (var i = 0; i < that.data.CreditCards.length; i++) {
        if (that.data.CreditCards[i].id === cardId) {
          that.data.CreditCards.remove(i);
          break;
        }
      }

      devSuccess(data);
    };

    jsDPZ.ajax.deleteCustomerCreditCard(settings);
  };

  _customer.prototype.fetchOrderHistory = function (options) {
    var settings = $.extend(true, {
      error: $.noop
    }, options);

    if (settings.customerID && !settings.loggedIn) {
      return jsDPZ.ajax.customerLogin({
        data: {
          rememberMe: true,
          loyaltyIsActive: options.loyaltyIsActive ? options.loyaltyIsActive : false
        }
      }).fail(function (data) {
        settings.error();
        return data;
      }).then(function (data) {
        jsDPZ.app.customer.setCustomerFromPower(data);
        return jsDPZ.app.customer.getCustomer().fetchCreditCard({
          data: {
            rememberMe: true
          }
        });
      }).then(function (data) {
        settings.data = {};
        settings.data.customerID = settings.customerID || this.data.CustomerID;
        return jsDPZ.ajax.fetchCustomerOrders(settings);
      }).then(function (data) {
        return data;
      });
    } else {
      settings.data = {};
      settings.data.customerID = settings.customerID || this.data.CustomerID;
      return jsDPZ.ajax.fetchCustomerOrders(settings);
    }
  };

  _customer.prototype.setEasyOrder = function (options) {
    var settings = $.extend(true, {}, options);
    settings.data = {};
    settings.data.customerID = this.data.CustomerID;
    settings.data.orderID = options.data.orderID;
    settings.data.easyOrder = true;
    settings.data.easyOrderNickName = options.data.easyOrderNickName;
    return jsDPZ.ajax.setCustomerEasyOrder(settings);
  };

  _customer.prototype.removeEasyOrder = function (options) {
    var settings = $.extend(true, {}, options);
    settings.data = {};
    settings.data.customerID = this.data.CustomerID;
    settings.data.orderID = options.data.orderID;
    settings.data.easyOrder = false;
    return jsDPZ.ajax.setCustomerEasyOrder(settings);
  };

  _customer.prototype.isLoyaltyCustomer = function () {
    return this.data.Loyalty.AccountStatus === "ACTIVE" || this.data.Loyalty.AccountStatus === "SUSPENDED";
  };

  _customer.prototype.customerProfileType = function () {
    return this.data.Type;
  };

  _customer.prototype.fetchCustomerDetails = function (options) {
    var settings = $.extend({}, {
      type: "email",
      key: this.data.Email
    }, options);
    return jsDPZ.ajax.fetchCustomerDetails(settings).then(function (customerDetails) {
      return $.extend(true, jsDPZ.app.customer.getCustomer().data, {
        Details: customerDetails
      });
    });
  };
})(jQuery);
/**
 * The dateTime provides methods for formating dateTime objects
 * @class dateTime
 * @requires util
 * @requires config
 */


(function ($) {
  // Date Method to Convert a Date object to a jsDPZ.obj.dateTime
  Date.prototype.getDateTimeObject = function () {
    var dtString = this.getFullYear() + "-" + leadingZero(this.getMonth() + 1) + "-" + leadingZero(this.getDate()) + " " + leadingZero(this.getHours()) + ":" + leadingZero(this.getMinutes()) + ":" + leadingZero(this.getSeconds());
    return jsDPZ.obj.dateTime(dtString, "YYYY-MM-DD HH:mm:ss");
  };

  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.dateTime
     * @param value {String} dateTime string
     * @return {dateTime} Instantiated dateTime
     */
    dateTime: function dateTime(value, format) {
      return new _dateTime(value, format);
    }
  });
  /**
    * Generate a dateTime
    * @method dateTime
    * @param value {String} dateTime String
    * @param format {String} Indicate the format of the dateTime String being passed.
        Used to intelligently parse the value into a corresponding valid Date().
    * @constructor dateTime
    * @private
    */

  function _dateTime(value, format) {
    if (value) {
      this.data = dayjs(value, format).toDate();
    } else {
      this.data = new Date();
    }
  }
  /**
   * Helper method to add a leading zero to the time unit if needed
   * @method leadingZero
   * @param value {String} unit of time
   * @return {String} two digit unit of time, ex: "01" or "12"
   * @private
   */


  function leadingZero(val) {
    return val < 10 ? "0" + val : val;
  }
  /**
   * Format a dateTime given a token string
   * @method getDisplayFormat
   * @param format {String} format string, ex: "YYYY MM DD"
   * See https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#format-formatstringwithtokens-string for valid formats.
   * @return {String} formatted dateTime
   */


  _dateTime.prototype.getDisplayFormat = function (format) {
    var dateTimeFormat = typeof format === "string" ? format : jsDPZ.config.dataModel.DATE_FORMAT;
    return dayjs(this.data).format(dateTimeFormat);
  };
  /**
   * Format a dateTime in the same manner as Pulse
   * @method getPulseDateTimeString
   * @return {String} formatted dateTime
   */


  _dateTime.prototype.getPulseDateTimeString = function () {
    return this.getDisplayFormat("YYYY-MM-DD HH:mm:ss");
  };
  /**
   * Get the 3 letter day of the week
   * @method getDayOfWeek
   * @returns {String} day of week
   */


  _dateTime.prototype.getDayOfWeek = function () {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][this.data.getDay()];
  };
})(jQuery);
/**
 * An order is a collection of Food and Coupons which the user purchases
 * @class order
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.order
     * @param data {Object} order JSON object
     * @return {Order} Instantiated order
     */
    order: function order(data) {
      return new _order(data);
    }
  });
  /**
   * Generate an order
   * @method order
   * @param data {Object} order JSON
   * @constructor order
   * @private
   */

  function _order(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.ORDER, {
      Fulfiller: $.extend(true, {}, jsDPZ.config.dataModel.FULFILLER)
    }, {
      Customer: {
        Address: $.extend(true, {}, $.extend(true, {}, jsDPZ.config.dataModel.ADDRESS, {
          DeliveryInstructions: ""
        }))
      }
    });
    this.counter = 0;

    if (!jsDPZ.util.empty(data)) {
      var thisObj = this;
      $.extend(true, this.data, data);
      var collections = [this.data.Details.Variants, this.data.Details.Coupons];

      for (var i = 0, iL = collections.length; i < iL; i++) {
        var collection = collections[i];

        for (var j = 0, jL = collection.length; j < jL; j++) {
          var collectionData = collection[j];

          if (collectionData.ID > this.counter) {
            this.counter = collectionData.ID;
          }
        }
      }

      updateFulfillerGroups(this.data);
    }
  }
  /**
   * Add an item (coupon or food) to the users order
   * @method addItem
   * @param data {Object} item JSON
   * @param defaults {Object} item defaults JSON
   * @param thisObject {Order} a refernece to "this"
   * @param type {String} "Variants" or "Coupons"
   * @private
   */


  function addItem(data, defaults, thisObject, type) {
    var newItem = $.extend(true, {}, defaults, data);

    if (newItem.Qty > 0) {
      if (type == "Variants") {
        var fD = findItem(data, thisObject.data);

        if (fD.found && fD.type == type) {
          if (newItem.ID == thisObject.data.Details[fD.type][fD.index].ID) {
            newItem.ID = thisObject.data.Details[fD.type][fD.index].ID;
            thisObject.data.Details[fD.type][fD.index] = newItem;
          } else {
            thisObject.data.Details[fD.type][fD.index].Qty += newItem.Qty;
            thisObject.data.Details[fD.type][fD.index].isNew = true;
          }
        } else {
          thisObject.counter++;
          thisObject.data.Details[type].push($.extend(newItem, {
            ID: thisObject.counter
          }));
        }
      } else {
        // If coupons always add as seperate line items.
        for (var i = 0, iL = newItem.Qty; i < iL; i++) {
          thisObject.counter++;
          thisObject.data.Details[type].push($.extend(newItem, {
            ID: thisObject.counter,
            Qty: 1
          }));
        }
      }
    }
  }
  /**
   * Find an item (coupon or food) in the users order
   * @method findItem
   * @param itemData {Object} itemData JSON
   * @param objectData {Object} order data ex: this.data
   * @return {Object} item object
   * @private
   */


  function findItem(itemData, objectData) {
    if (!jsDPZ.util.empty(itemData)) {
      var finderData = {
        index: -1,
        found: false,
        type: ""
      };
      var itemToFind = $.extend(true, {}, itemData); // Remove fields that aren't used for matching

      delete itemToFind["Qty"];
      delete itemToFind["Price"];
      delete itemToFind["isNew"];
      delete itemToFind["ShowBestPriceMessage"];

      if (!jsDPZ.util.empty(itemToFind["ID"]) && itemToFind.ID == -1) {
        delete itemToFind["ID"];
      }

      var collections = [objectData.Details.Variants, objectData.Details.Coupons];

      for (var i = 0, iL = collections.length; i < iL; i++) {
        if (!finderData.found) {
          var collection = collections[i];

          for (var j = 0, jL = collection.length; j < jL; j++) {
            var itemToMatch = $.extend(true, {}, collection[j]);
            delete itemToMatch["Qty"];
            delete itemToMatch["Price"];
            delete itemToMatch["isNew"];
            delete itemToMatch["ShowBestPriceMessage"];

            if (jsDPZ.util.empty(itemToFind["ID"])) {
              delete itemToMatch["ID"];

              if (jsDPZ.util.equal([itemToFind, itemToMatch])) {
                finderData = {
                  index: j,
                  type: i == 0 ? "Variants" : "Coupons",
                  found: true
                };
                j = jL;
              }
            } else if (itemToFind.ID == itemToMatch.ID) {
              finderData = {
                index: j,
                type: i == 0 ? "Variants" : "Coupons",
                found: true
              };
              j = jL;
            }
          }
        }
      }
    }

    return finderData;
  }
  /**
   * Update the fullfiller groups with new order data
   * @method updateFulfillerGroups
   * @param data {Object} order data JSON
   * @private
   */


  function updateFulfillerGroups(data) {
    var tmpFulfillerGroups = [];

    for (var j = 0, jL = data.Details.Coupons.length; j < jL; j++) {
      var couponData = data.Details.Coupons[j];

      for (var i = 0; i < data.Fulfiller.Groups.length; i++) {
        var groupID = data.Fulfiller.Groups[i].GroupID;

        if (data.Details.Coupons[j].Code == groupID) {
          tmpFulfillerGroups.push(data.Fulfiller.Groups[i]);
          break;
        }
      }
    }

    data.Fulfiller.Groups = tmpFulfillerGroups;
  }
  /**
   * Get an amount as a floating point number, whether it was originally a number
   * or a string.
   * @method getAmountAsFloat
   * @param stringOrNumber original amount
   * @return number
   */


  function getAmountAsFloat(stringOrNumber) {
    if (stringOrNumber === null || stringOrNumber === undefined || typeof stringOrNumber === "number") {
      return stringOrNumber;
    }

    if (_typeof(stringOrNumber) === "object" && stringOrNumber.constructor === Number) {
      return stringOrNumber.valueOf();
    }

    if (typeof stringOrNumber === "string") {
      // Remove any thousands separators, which Number abhors
      return Number(stringOrNumber.replace(",", ""));
    } // Not prepared to deal with other types.


    return stringOrNumber;
  }
  /**
   * Fix the amounts breakdown object from an order, ensuring that the
   * amounts are numbers, not formatted strings (which power likes
   * to return for some values).
   * @method fixAmountsBreakdown
   * @param amountsBreakdown Object to be repaired
   * @return deep copy of amountsBreakdown
   */


  function fixAmountsBreakdown(amountsBreakdown) {
    var amounts = $.extend(true, {}, amountsBreakdown);

    if (amounts.DeliveryFee) {
      amounts.DeliveryFee = getAmountAsFloat(amounts.DeliveryFee);
    } // TODO Fix other amounts, but need to check impact


    return amounts;
  }
  /**
   * add fullfiller group to the order
   * @method addFulfillerGroup
   * @param data {Object} fulfiller data JSON
   * @return {Order} this
   */


  _order.prototype.addFulfillerGroup = function (data) {
    if (!jsDPZ.util.empty(data)) {
      var newGroup = $.extend(true, {}, jsDPZ.config.dataModel.ORDER_FULFILLER_GROUP, data);

      if (!jsDPZ.util.empty(newGroup.GroupID)) {
        for (var i = 0, iL = newGroup.UnFulfilled.length; i < iL; i++) {
          for (var j = 0, jL = newGroup.UnFulfilled[i].length; j < jL; j++) {
            newGroup.UnFulfilled[i][j] = $.extend(true, {}, jsDPZ.config.dataModel.ORDER_FULFILLER_PRODUCT, newGroup.UnFulfilled[i][j]);
          }
        }

        for (var i = 0, iL = newGroup.Fulfilled.length; i < iL; i++) {
          for (var j = 0, jL = newGroup.Fulfilled[i].length; j < jL; j++) {
            newGroup.Fulfilled[i][j] = $.extend(true, {}, jsDPZ.config.dataModel.ORDER_FULFILLER_PRODUCT, newGroup.Fulfilled[i][j]);
          }
        }
      }

      this.data.Fulfiller.Groups.push(newGroup);
    }

    return this;
  };
  /**
   * Set all prices to -1, and set fullfilled to false
   * @method orderChanged
   * @return {Order} this
   */


  _order.prototype.orderChanged = function () {
    this.data.Details.Amounts = {};

    for (var i = 0, iL = this.data.Details.Coupons.length; i < iL; i++) {
      this.data.Details.Coupons[i].Fulfilled = false;
    }

    return this;
  };
  /**
   * Set all prices to -1, and set fullfilled to false
   * @method getItemData
   * @param data {Object} JSON containing an ID key
   * @return {Object} item JSON
   */


  _order.prototype.getItemData = function (data) {
    var fD = findItem(data, this.data);

    if (fD.found) {
      return this.data.Details[fD.type][fD.index];
    }

    return {};
  };
  /**
   * Remove a fulfiller group from the order
   * @method removeFulfillerGroup
   * @param groupID {String} fulfiller group id
   * @returns {Order} this order
   */


  _order.prototype.removeFulfillerGroup = function (groupID) {
    if (!jsDPZ.util.empty(groupID)) {
      for (var i = 0; i < this.data.Fulfiller.Groups.length; i++) {
        if (this.data.Fulfiller.Groups[i].GroupID == groupID) {
          this.data.Fulfiller.Groups.remove(i);
          break;
        }
      }
    }

    return this;
  };
  /**
   * Remove a variant from the order
   * @method removeVariant
   * @param data {Object} JSON containing an ID key
   * @returns {Order} this order
   */


  _order.prototype.removeVariant = function (data) {
    var fD = findItem(data, this.data);

    if (fD.found && fD.type == "Variants") {
      this.data.Details[fD.type].remove(fD.index);
      this.orderChanged();
    }

    return this;
  };
  /**
   * Remove a coupon from the order
   * @method removeCoupon
   * @param data {Object} JSON containing an ID key
   * @returns {Order} this order
   */


  _order.prototype.removeCoupon = function (data) {
    var fD = findItem(data, this.data);

    if (fD.found && fD.type == "Coupons") {
      this.data.Details[fD.type].remove(fD.index);
      updateFulfillerGroups(this.data);
      this.orderChanged();
    }

    return this;
  };
  /**
   * Add a variant to the order
   * @method addVariant
   * @param data {Object} jsDPZ.config.dataModel.ORDER_VARIANT
   * @returns {Order} this order
   */


  _order.prototype.addVariant = function (data) {
    if (!jsDPZ.util.empty(data)) {
      addItem(data, jsDPZ.config.dataModel.ORDER_VARIANT, this, "Variants");
      this.orderChanged();
    }

    return this;
  };
  /**
   * Add a coupon to the order
   * @method addCoupon
   * @param data {Object} jsDPZ.config.dataModel.ORDER_COUPON
   * @returns {Order} this order
   */


  _order.prototype.addCoupon = function (data) {
    if (!jsDPZ.util.empty(data)) {
      addItem(data, jsDPZ.config.dataModel.ORDER_COUPON, this, "Coupons");
      this.orderChanged();
    }

    return this;
  };
  /**
   * Update the order data with the response from Power, commonly after a power validate or price order call
   * @method updateDataFromPowerResponse
   * @param responseData {Object} Power order response data
   * @returns {Order} this order
   */


  _order.prototype.updateDataFromPowerResponse = function (responseData) {
    if (!jsDPZ.util.empty(responseData.Order)) {
      var thisOrder = this;

      if (responseData.Status >= 0) {
        thisOrder.data.Details.StoreOrderID = !jsDPZ.util.empty(responseData.Order.StoreOrderID) ? responseData.Order.StoreOrderID : "";
        thisOrder.data.Details.Amounts = !jsDPZ.util.empty(responseData.Order.AmountsBreakdown) ? fixAmountsBreakdown($.extend(true, {}, responseData.Order.Amounts, responseData.Order.AmountsBreakdown)) : {};
        thisOrder.data.Details.OrderID = responseData.Order.OrderID;
        thisOrder.data.Details.Promotions = responseData.Order.Promotions; // Update loyalty order node

        if (responseData.Order.Loyalty) {
          var loyaltyNode = responseData.Order.Loyalty;

          if (loyaltyNode.Status && loyaltyNode.Status === "Fail") {
            // Reset the order data since it failed
            $.extend(true, thisOrder.data.Details.Loyalty, jsDPZ.config.dataModel.ORDER.Details.Loyalty); // Remove loyalty coupons

            this.removeCoupons({
              successFilter: function successFilter(coupon, catalogCoupon) {
                return catalogCoupon.isLoyaltyCoupon();
              }
            });
          } else {
            // Reset every empty field
            $.extend(true, thisOrder.data.Details.Loyalty, {
              Potential: responseData.Order.Loyalty.Potential || jsDPZ.config.dataModel.ORDER.Details.Loyalty.Potential,
              Burn: responseData.Order.Loyalty.Burn || jsDPZ.config.dataModel.ORDER.Details.Loyalty.Burn,
              Earn: responseData.Order.Loyalty.Earn || jsDPZ.config.dataModel.ORDER.Details.Loyalty.Earn,
              PendingBalance: responseData.Order.Loyalty.PendingBalance || jsDPZ.config.dataModel.ORDER.Details.Loyalty.PendingBalance,
              PointBalance: responseData.Order.Loyalty.PointBalance || jsDPZ.config.dataModel.ORDER.Details.Loyalty.PointBalance
            });
          } // Remove the loyalty check balance flag


          delete thisOrder.data.Details.Loyalty.calculatePotentialPoints;
        } // Update meta data


        if (!jsDPZ.util.empty(responseData.Order.metaData)) {
          $.extend(true, thisOrder.data.metaData, responseData.Order.metaData);
        }

        if (thisOrder.data.metaData && !thisOrder.data.isDucOrder && thisOrder.data.metaData.OriginalServiceMethod === "Carside") {
          delete thisOrder.data.metaData.OriginalServiceMethod;
        }

        var hasInvalidOptionPartRemoved = function hasInvalidOptionPartRemoved(StatusItem) {
          return StatusItem.Code === "InvalidOptionPartRemoved";
        };

        var cleanProductToppings = function cleanProductToppings(product) {
          if (product.StatusItems && product.StatusItems.some(hasInvalidOptionPartRemoved)) {
            var orderVariant = thisOrder.getItemData({
              ID: product.ID
            });
            var powerProductToppings = Object.keys(product.Options || {});
            var productCodes = jsDPZ.util.htmlUnEscape(product.Code).split("/");
            var defaultToppings = productCodes.reduce(function (allDefaultToppings, code) {
              var variant = jsDPZ.app.catalog.getCatalog().getVariant(code);

              if (!jsDPZ.util.empty(variant) && !jsDPZ.util.empty(variant.data.Tags) && !jsDPZ.util.empty(variant.data.Tags.DefaultToppings)) {
                var variantDefaultToppings = variant.data.Tags.DefaultToppings.split(",").map(function (topping) {
                  return topping.split("=")[0];
                });
                return allDefaultToppings.concat(variantDefaultToppings);
              }

              return allDefaultToppings;
            }, []);
            orderVariant.Toppings = Object.entries(orderVariant.Toppings).filter(function (toppingEntry) {
              var toppingKey = toppingEntry[0];
              return powerProductToppings.includes(toppingKey) || defaultToppings.includes(toppingKey);
            }).reduce(function (productToppings, toppingEntry) {
              var toppingKey = toppingEntry[0];
              var toppingData = toppingEntry[1];
              productToppings[toppingKey] = toppingData;
              return productToppings;
            }, {});
          }

          return product;
        };

        responseData.Order.Products = responseData.Order.Products.map(cleanProductToppings);
        var removalQueue = [];
        var collections = [responseData.Order.Products, responseData.Order.Coupons];

        var hasStatusCode = function hasStatusCode(item, statusCode) {
          var hasCode = function hasCode(statusItem) {
            return statusItem.Code === statusCode;
          };

          return item.StatusItems.some(hasCode);
        };

        for (var i = 0, iL = collections.length; i < iL; i++) {
          var collection = collections[i];

          for (var j = 0, jL = collection.length; j < jL; j++) {
            var item = collection[j];
            var orderItem = thisOrder.getItemData({
              ID: item.ID
            });
            var isBelowMinimumOrderAmount = false;
            var isBelowMinimumCustomerAmount = false;

            if (!jsDPZ.util.empty(orderItem)) {
              orderItem.Qty = item.Qty;

              if (!jsDPZ.util.empty(item.Price)) {
                orderItem.Price = item.Price;
              }

              if (!jsDPZ.util.empty(item.StatusItems)) {
                isBelowMinimumOrderAmount = hasStatusCode(item, "BelowMinimumOrderAmount");
                isBelowMinimumCustomerAmount = hasStatusCode(item, "BelowMinimumCustomerAmount");
                orderItem.Fulfilled = hasStatusCode(item, "Fulfilled");
                orderItem.IsBelowMinimumOrderAmount = isBelowMinimumOrderAmount;
                orderItem.IsBelowMinimumCustomerAmount = isBelowMinimumCustomerAmount;
                orderItem.IsBelowMinimumPaymentAmount = hasStatusCode(item, "MinimumPaymentAmount");

                if (hasStatusCode(item, "Removed")) {
                  removalQueue.push({
                    type: i === 0 ? "v" : "c",
                    id: item.ID
                  });
                }
              }
            }
          }
        }

        for (var i = 0, iL = removalQueue.length; i < iL; i++) {
          var info = removalQueue[i];

          if (info.type == "v") {
            thisOrder.removeVariant({
              ID: info.id
            });
          } else {
            thisOrder.removeCoupon({
              ID: info.id
            });
          }
        }

        updateFulfillerGroups(thisOrder.data);
      }
    }

    return this;
  };
  /**
   * Filters all the coupons that match the discriminator, by default returns all found coupons
   * @namespace jsDPZ.obj
   * @method filterCoupons
   * @param data {Object} override options parameters
   * @return Array with all the matched coupons
   */


  _order.prototype.filterCoupons = function (data) {
    var options = $.extend(true, {
      breakOnFound: false,
      filterFailure: true,
      successFilter: function successFilter(coupon) {
        return true;
      },
      failureFilter: function failureFilter(coupon) {
        return true;
      }
    }, data);
    var promise = $.Deferred();
    var coupons = this.data.Details.Coupons;
    var promisedCoupons = coupons.map(function (coupon) {
      return jsDPZ.app.catalog.getCatalog().getHiddenCoupon(coupon.Code);
    }); // Wait for the promises and remove the coupons that match the discriminator

    $.when.apply($, promisedCoupons).done(function () {
      // Since all coupons where fetched or not (was not found), we can now search in the catalog for each found coupon
      var couponFound = false;
      var catalog = jsDPZ.app.catalog.getCatalog();
      promise.resolve(coupons.filter(function (coupon) {
        var filterCoupon = false; // Check if we are only filtering the first found coupon, if true, we don't need to keep looking

        if (!couponFound && options.breakOnFound || !options.breakOnFound) {
          var catalogCoupon = catalog.getCoupon(coupon.Code);

          if (catalogCoupon.data) {
            // We have the complete information on the coupon
            if (options.successFilter(coupon, catalogCoupon)) {
              filterCoupon = true;
              couponFound = true;
            }
          } else {
            // We have only the order information on the coupon
            if (options.filterFailure && options.failureFilter(coupon)) {
              filterCoupon = true;
              couponFound = true;
            }
          }
        }

        return filterCoupon;
      }));
    });
    return promise;
  };
  /**
   * Removes all the coupons that match the discriminator, by default deletes all found coupons
   * @namespace jsDPZ.obj
   * @method removeCoupons
   * @param data {Object} override options parameters
   * @return {Order} return the order with the coupons removed
   */


  _order.prototype.removeCoupons = function (data) {
    var options = $.extend(true, {
      breakOnFound: false,
      deleteFailure: false,
      triggerChanged: true,
      successFilter: function successFilter(coupon, catalogCoupon) {
        return true;
      },
      failureFilter: function failureFilter(coupon) {
        // By default we keep the coupons that could not been fetched
        return this.deleteFailure;
      }
    }, data);
    var order = this;
    var coupons = this.data.Details.Coupons;
    var originalCouponsLength = coupons.length;
    var filterOptions = $.extend(true, {}, options, {
      // Filter coupons always have to filter failures, this way we can be sure that all the failures will remain or not depending on the failure function
      filterFailure: true,
      successFilter: function successFilter(coupon, catalogCoupon) {
        // We'll filter the coupons that do not match the remove coupons filter
        return !options.successFilter(coupon, catalogCoupon);
      },
      failureFilter: function failureFilter(coupon) {
        return !options.failureFilter(coupon);
      }
    });
    return this.filterCoupons(filterOptions).done(function (remainingCoupons) {
      order.data.Details.Coupons = remainingCoupons;
      updateFulfillerGroups(order.data);

      if (options.triggerChanged && remainingCoupons.length !== originalCouponsLength) {
        order.orderChanged();
      }
    });
  };
  /**
   * check an order is carryout order or not
   * @method: isCarryoutOrder
   * @param {Object} orderData
   * @returns {Boolean}
   */


  _order.prototype.isCarryoutOrder = function () {
    var CARRYOUT = "Carryout";
    var DINEIN = "Dine-In";

    if (!jsDPZ.util.empty(this.data.Details.ServiceMethod)) {
      return this.data.Details.ServiceMethod === CARRYOUT || this.data.Details.ServiceMethod === DINEIN;
    }

    return this.data.lastSelectedStoreLocatorServiceMethodInputValue === CARRYOUT || this.data.lastSelectedStoreLocatorServiceMethodInputValue === DINEIN;
  };

  _order.prototype.fixRequiredDeliverySides = function (catalog) {
    this.data.Details.Variants = this.data.Details.Variants.map(function (orderVariant) {
      var _ref19 = catalog.getVariant(orderVariant.Code) || {},
          _ref19$data = _ref19.data;

      _ref19$data = _ref19$data === void 0 ? {} : _ref19$data;
      var _ref19$data$Tags = _ref19$data.Tags;
      _ref19$data$Tags = _ref19$data$Tags === void 0 ? {} : _ref19$data$Tags;
      var _ref19$data$Tags$Requ = _ref19$data$Tags.RequiresDeliveryContainer,
          requiredVariantCode = _ref19$data$Tags$Requ === void 0 ? "" : _ref19$data$Tags$Requ;
      return requiredVariantCode ? _objectSpread(_objectSpread({}, orderVariant), {}, {
        Sides: _objectSpread(_objectSpread({}, orderVariant.Sides), {}, _defineProperty({}, requiredVariantCode, orderVariant.Qty))
      }) : orderVariant;
    });
  };
})(jQuery);
/**
* A price provides functionality for formating prices and doing math precisely with floating point numbers
* @class price
*/


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
        * @method jsDPZ.obj.price
        * @param value {String/Float} dollar amount string or float
        * @return {Price} Instantiated price
        */
    price: function price(value) {
      return new _price(value);
    }
  });
  /**
    * Generate a price
    * @method price
    * @param value {String/Float} dollar amount string or float
    * @constructor price
    * @private
    */

  function _price(value) {
    this.data = value;
  }
  /**
    * Format the price so it can be displayed in a friendly format
    * @method getDisplayValue
    * @return {String} price with a dollar sign
    */


  _price.prototype.getDisplayValue = function () {
    var mantissa = jsDPZ.config.app.priceConfig.mantissa;
    var price = typeof this.data === "undefined" ? "" : this.data;
    price = parseFloat(price.toString().replace(",", "")).toFixed(mantissa);

    if (isNaN(price)) {
      price = "";
    } else {
      for (var i = price.length - 6; i > 0; i -= 3) {
        price = price.slice(0, i) + "," + price.slice(i);
      }

      price = "$" + price;
    }

    return price;
  };
  /**
    * Returns a price value that can be multiplied and divided without rounding error.
    * @method getUsableValue
    * @return {Number} usable price value
    */


  _price.prototype.getUsableValue = function () {
    var usableConversionValue = jsDPZ.config.app.priceConfig.usableConversionValue;
    var mantissa = jsDPZ.config.app.priceConfig.mantissa;
    var price = this.data || 0;
    price = Math.round(parseFloat(parseFloat(price.toString().replace(",", "")).toFixed(mantissa)) * usableConversionValue);

    if (isNaN(price)) {
      price = 0;
    }

    return price;
  };
  /**
    * Changes a usable value back to a normal price point
    * @method setDataFromUsableValue
    * @param value {Number} Usable value price
    * @return {Price} this price
    */


  _price.prototype.setDataFromUsableValue = function (value) {
    var usableConversionValue = jsDPZ.config.app.priceConfig.usableConversionValue;
    var number = parseInt(value, 10);

    if (!isNaN(number)) {
      this.data = number / usableConversionValue;
    }

    return this;
  };
  /**
    * Get an amount as a floating point number, whether it was originally a number
    * or a string.
    * @method getAmountAsFloat
    * @param stringOrNumber original amount
    * @return number
    */


  function getAmountAsFloat(stringOrNumber) {
    if (stringOrNumber === null || stringOrNumber === undefined || typeof stringOrNumber === "number") {
      return stringOrNumber;
    }

    if (_typeof(stringOrNumber) === "object" && stringOrNumber.constructor === Number) {
      return stringOrNumber.valueOf();
    }

    if (typeof stringOrNumber === "string") {
      // Remove any thousands separators, which Number abhors
      return Number(stringOrNumber.replace(",", ""));
    } // Not prepared to deal with other types.


    return stringOrNumber;
  }
  /**
    * Fix the amounts breakdown object from an order, ensuring that the
    * amounts are numbers, not formatted strings (which power likes
    * to return for some values).
    * @method fixAmountsBreakdown
    * @param amountsBreakdown Object to be repaired
    * @return deep copy of amountsBreakdown
    */


  function fixAmountsBreakdown(amountsBreakdown) {
    var amounts = $.extend(true, {}, amountsBreakdown);

    if (amounts.DeliveryFee) {
      amounts.DeliveryFee = getAmountAsFloat(amounts.DeliveryFee);
    } // TODO Fix other amounts, but need to check impact


    return amounts;
  }
})(jQuery);
/**
 * A product is an non-orderable item, which when attributes are selected, a variant can be created and ordered
 * @class product
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.product
     * @param data {Object} product data JSON
     * @return {Product} Instantiated product
     */
    product: function product(data) {
      return new _product(data);
    }
  });
  /**
   * Generate a product
   * @method product
   * @param data {Object} product data jsDPZ.config.dataModel.PRODUCT
   * @constructor product
   * @private
   */

  function _product(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.PRODUCT);
    this.imageSizes = {
      LARGE: "LARGE",
      MINI: "MINI",
      THUMBNAIL: "THUMBNAIL"
    };

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }

  _product.prototype.isActive = function (options) {
    var inTimeRange = function inTimeRange(current, start, end) {
      var c = jsDPZ.obj.dateTime(current).data;
      var cT = parseFloat(c.getHours() + "." + c.getMinutes());
      var sT, //start time
      eT; //end time

      if (!jsDPZ.util.empty(start)) sT = parseFloat(start[0] + "." + start[1]);
      if (!jsDPZ.util.empty(end)) eT = parseFloat(end[0] + "." + end[1]);
      /******A product may have an EffectiveAt tag, or an ExpiresAt tag, or both, or none.
       ****Some products have both, but the ExpiresAt time is "less than" the EffectiveAt time.  For example,
       ****a product which is EffectiveAt "20:45:00" (8:45 pm) and ExpiresAt "15:15:00"
       ****(3:15 pm, the next day).  This is a multi-day, time-sensitive product.
       ****The following conditional statement addresses this variation, along with
       ****same-day time-sensitive cases.  Originally done for coupons on 10/8/2014 Pierre Pirault
       **/

      var productIsActiveWithinOneDay = sT && eT && sT < eT && cT >= sT && cT < eT;
      var productIsActiveAcrossTwoDays = sT > eT && (cT >= sT || cT < eT);
      var currentTimeIsPastStartTime = sT && !eT && cT >= sT;
      var currentTimeIsBeforeEndTime = eT && !sT && cT < eT;
      var productDoesNotHaveTimeTags = !sT && !eT;
      return productIsActiveWithinOneDay || productIsActiveAcrossTwoDays || currentTimeIsPastStartTime || currentTimeIsBeforeEndTime || productDoesNotHaveTimeTags;
    };

    return inTimeRange(options.dtString, this.data.Tags.EffectiveAt, this.data.Tags.ExpiresAt);
  };
  /**
   * Gets an array of variants for the product
   * @method getVariantCodeData
   * @return {Array} variants objects
   */


  _product.prototype.getVariantCodeData = function () {
    return this.data.Variants;
  };
  /**
   * Gets an array of available toppings JSON for the product
   * @method getAvailableToppingsData
   * @return {Array} toppings JSON
   */


  _product.prototype.getAvailableToppingsData = function () {
    var result = [];
    var baseAvailability = this.data.Tags["OptionQtys"] ? this.data.Tags["OptionQtys"] : jsDPZ.config.dataModel.TOPPING_AVAILABILITY;
    var availabilities = jsDPZ.util.stringToObjectParser(this.data.AvailableToppings, baseAvailability);
    /* UNCOMMENT START ECOM-16014 
    var catalogData = jsDPZ.app.catalog.getCatalog().data;
    var unsupportedOptions = catalogData.UnsupportedOptions || {};
    var unsupportedProducts = catalogData.UnsupportedProducts || {};
    var isAvailable = function(code) {
      return !(unsupportedOptions[code] || unsupportedProducts[code]);
    };
    UNCOMMENT END ECOM-16014 */

    for (var code in availabilities) {
      // UNCOMMENT ECOM-16014 if (isAvailable(code))
      result.push($.extend(true, {}, jsDPZ.config.dataModel.OPTION, {
        Code: code,
        Availability: availabilities[code]
      }));
    }

    return result;
  };
  /**
   * Gets an array of default toppings JSON for the product
   * @method getDefaultToppingsData
   * @return {Array} toppings JSON
   */


  _product.prototype.getDefaultToppingsData = function () {
    var result = [];
    var availabilities = jsDPZ.util.stringToObjectParser(this.data.DefaultToppings, jsDPZ.config.dataModel.TOPPING_AVAILABILITY);
    /* UNCOMMENT START ECOM-16014 
    var catalogData = jsDPZ.app.catalog.getCatalog().data;
    var unsupportedOptions = catalogData.UnsupportedOptions || {};
    var unsupportedProducts = catalogData.UnsupportedProducts || {};
    var isAvailable = function(code) {
      return !(unsupportedOptions[code] || unsupportedProducts[code]);
    };
    UNCOMMENT END ECOM-16014 */

    for (var code in availabilities) {
      // UNCOMMENT ECOM-16014 if (isAvailable(code))
      result.push($.extend(true, {}, jsDPZ.config.dataModel.OPTION, {
        Code: code,
        Availability: availabilities[code]
      }));
    }

    return result;
  };
  /**
   * Gets an array of available sides JSON for the product
   * @method getAvailableSidesData
   * @return {Array} sides JSON
   */


  _product.prototype.getAvailableSidesData = function () {
    var result = [];
    var baseAvailability = this.data.Tags["OptionQtys"] ? this.data.Tags["OptionQtys"] : jsDPZ.config.dataModel.SIDES_AVAILABILITY;
    var availabilities = jsDPZ.util.stringToObjectParser(this.data.AvailableSides, baseAvailability);
    /* UNCOMMENT START ECOM-16014 
    var catalogData = jsDPZ.app.catalog.getCatalog().data;
    var unsupportedOptions = catalogData.UnsupportedOptions || {};
    var unsupportedProducts = catalogData.UnsupportedProducts || {};
    var isAvailable = function(code) {
      return !(unsupportedOptions[code] || unsupportedProducts[code]);
    };
    UNCOMMENT END ECOM-16014 */

    for (var code in availabilities) {
      // UNCOMMENT ECOM-16014 if (isAvailable(code))
      result.push($.extend(true, {}, jsDPZ.config.dataModel.OPTION, {
        Code: code,
        Availability: availabilities[code]
      }));
    }

    return result;
  };
  /**
   * Gets an array of default sides JSON for the product
   * @method getDefaultSidesData
   * @return {Array} sides JSON
   */


  _product.prototype.getDefaultSidesData = function () {
    var result = [];
    var availabilities = jsDPZ.util.stringToObjectParser(this.data.DefaultSides, jsDPZ.config.dataModel.SIDES_AVAILABILITY);
    /* UNCOMMENT START ECOM-16014 
    var catalogData = jsDPZ.app.catalog.getCatalog().data;
    var unsupportedOptions = catalogData.UnsupportedOptions || {};
    var unsupportedProducts = catalogData.UnsupportedProducts || {};
    var isAvailable = function(code) {
      return !(unsupportedOptions[code] || unsupportedProducts[code]);
    };
    UNCOMMENT END ECOM-16014 */

    for (var code in availabilities) {
      // UNCOMMENT ECOM-16014 if (isAvailable(code))
      result.push($.extend(true, {}, jsDPZ.config.dataModel.OPTION, {
        Code: code,
        Availability: availabilities[code]
      }));
    }

    return result;
  };

  _product.prototype.getImageURL = function (options) {
    var config = $.extend(true, {
      baseURL: "",
      format: "jpg",
      imageMapper: {
        LARGE: "larges",
        MINI: "minis",
        THUMBNAIL: "thumbnails"
      },
      noCode: "noimage",
      size: "THUMBNAIL"
    }, options);

    if (this.data.Images && this.data.Images[options.size]) {
      return jsDPZ.util.htmlUnEncode(this.data.Images[options.size]);
    }

    var code = this.data.ImageCode || config.noCode;
    var size = config.imageMapper[config.size] || config.imageMapper.THUMBNAIL;
    return config.baseURL + "/" + size + "/" + code + "." + config.format;
  };
})(jQuery);
/**
 * A quicklist is a list if JSON objects that have the minimal amount of data needed for displaying and adding a product to order
 * @class quicklist
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
    * @method jsDPZ.obj.quicklist
    * @param data {Array} quicklist JSON array
    * @return {Quicklist} Instantiated quicklist
    */
    quicklist: function quicklist(data) {
      return new _quicklist(data);
    }
  });
  /**
  * Generate a quicklist
  * @method quicklist
  * @param data {Array} quicklist JSON array
  * @constructor quicklist
  * @private
  */

  function _quicklist(data) {
    function firstOrSet(data_set) {
      return data_set.length === 1 ? data_set[0] : data_set;
    }

    function extendModelWithItem(item) {
      return $.extend(true, {}, jsDPZ.config.dataModel[item.Type && item.Type === "Coupon" ? "QUICKLIST_COUPON" : "QUICKLIST_VARIANT"], item);
    }

    this.data = $.extend(true, [], jsDPZ.config.dataModel.QUICKLIST, data).map(function (item) {
      return $.makeArray(item).map(extendModelWithItem);
    }).map(firstOrSet);
  }
})(jQuery);
/**
 * A store is where the products are ordered from
 * @class store
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.store
     * @param data {Object} store JSON
     * @return {Store} Instantiated store
     */
    store: function store(data) {
      return new _store(data);
    }
  });
  /**
   * Generate a store
   * @method store
   * @param data {Object} store JSON
   * @constructor store
   * @private
   */

  function _store(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.STORE, {
      Address: jsDPZ.config.dataModel.ADDRESS
    });

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
  /**
   * Gets the address for the store
   * @method getAddress
   * @return {Address} the stores address
   */


  _store.prototype.getAddress = function () {
    return jsDPZ.obj.address(this.data.Address);
  };
  /**
   *
   * @param {Integer} days
   * @returns {Object} any array of days, starting from today to X amount of days, with the service methods hours.
   [
    {
        "day": {Object dayjs},
        "serviceMethods": {
            "Carryout": {
                "hours": [
                    {
                        "opens": {Object dayjs},
                        "closes": {Object dayjs}
                    },
                    {
                        "opens": {Object dayjs},
                        "closes": {Object dayjs}
                    }
                ],
                "isWithinTimePeriod": {Boolean}
            },
            "Delivery": {
                "hours": [
                    {
                        "opens": {Object dayjs},
                        "closes": {Object dayjs}
                    },
                    {
                        "opens": {Object dayjs},
                        "closes": {Object dayjs}
                    }
                ],
                "isWithinTimePeriod": {Boolean}
            },
            "DriveUpCarryout": {
                "hours": [
                    {
                        "opens": {Object dayjs},
                        "closes": {Object dayjs}
                    }
                ],
                "isWithinTimePeriod": {Boolean}
            },
            ...
        }
    },
    ...
  ]
   */


  _store.prototype.getHours = function () {
    var _this3 = this;

    var days = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var hours = [];
    var serviceHours = this.data.ServiceHours;
    var serviceMethods = Object.keys(serviceHours); // currentDay is the time now, and is then incremented as we run through the for loop below.

    var currentDay = dayjs(this.data.StoreAsOfTime);

    var _loop = function _loop(day) {
      var currentDayDate = currentDay.format("YYYY-MM-DD");
      hours.push({
        day: currentDay,
        serviceMethods: function () {
          return serviceMethods.reduce(function (acc, serviceMethodName) {
            var _this3$data$Holidays, _this3$data$Holidays$, _serviceHours$service, _serviceMethodHours;

            var isCarside = serviceMethodName === "DriveUpCarryout";
            var isWithinTimePeriod = false;

            var overrideHours = _toConsumableArray(((_this3$data$Holidays = _this3.data.Holidays) === null || _this3$data$Holidays === void 0 ? void 0 : (_this3$data$Holidays$ = _this3$data$Holidays[currentDayDate]) === null || _this3$data$Holidays$ === void 0 ? void 0 : _this3$data$Holidays$.Hours) || []);

            var serviceMethodHours = _toConsumableArray(((_serviceHours$service = serviceHours[serviceMethodName]) === null || _serviceHours$service === void 0 ? void 0 : _serviceHours$service[currentDay.locale("en").format("ddd")]) || []); // We override all hours with holiday hours, EXCEPT for carside.


            if (overrideHours.length) {
              // Carside currently only supports one set of hours, so look at the last overrides entry
              if (isCarside) {
                overrideHours = [overrideHours.sort(function (timesA, timesB) {
                  return timesA.OpenTime > timesB.OpenTime;
                }).pop()];
              } else {
                serviceMethodHours = overrideHours;
              }
            } // This is a 'just-in-case' code block, stores should not have more than one entry to begin with, but no power/pulse rule prevents it.


            if (isCarside) {
              serviceMethodHours = [serviceMethodHours.sort(function (timesA, timesB) {
                return timesA.OpenTime > timesB.OpenTime;
              }).pop()];
            }

            serviceMethodHours = (_serviceMethodHours = serviceMethodHours) === null || _serviceMethodHours === void 0 ? void 0 : _serviceMethodHours.map(function (serviceHoursSpan) {
              var span = {
                opens: dayjs("".concat(currentDayDate, " ").concat(serviceHoursSpan.OpenTime)),
                closes: dayjs("".concat(currentDayDate, " ").concat(serviceHoursSpan.CloseTime))
              }; // This insanity will use holiday hours with carside, only if the holiday hours affect the hours of operation of carside.

              if (overrideHours.length && isCarside) {
                overrideHoursSpan = {
                  opens: dayjs("".concat(currentDayDate, " ").concat(overrideHours[0].OpenTime)),
                  closes: dayjs("".concat(currentDayDate, " ").concat(overrideHours[0].CloseTime))
                };

                if (overrideHoursSpan.opens.isAfter(span.opens)) {
                  span.opens = overrideHoursSpan.opens;
                }

                if (overrideHoursSpan.closes.isBefore(span.closes)) {
                  span.closes = overrideHoursSpan.closes;
                }
              } // This code will set isWithinTimePeriod to true, which indicates the store is open for this service method.


              if (day === 0 && (currentDay.isSame(span.opens) || currentDay.isAfter(span.opens) && currentDay.isBefore(span.closes))) isWithinTimePeriod = true;
              return span;
            });
            acc[serviceMethodName] = {
              hours: serviceMethodHours,
              isWithinTimePeriod: isWithinTimePeriod
            };
            return acc;
          }, {});
        }()
      });
      currentDay = currentDay.add(1, "day");
    };

    for (var day = 0; day < days; day++) {
      _loop(day);
    }

    return hours;
  };
  /**
   * Gets value for if the store is taking orders online
   * @method isOnlineRightNow
   * @returns {Boolean} true if store is online, false otherwise
   */


  _store.prototype.isOnlineRightNow = function () {
    return this.data.IsOnlineNow;
  };
  /**
   * Gets value for if the store is open
   * @method isOpenRightNow
   * @returns {Boolean} true if store is open, false otherwise
   */


  _store.prototype.isOpenRightNow = function () {
    return this.data.IsOpen;
  };
  /**
   * Gets an array of possible service methods for the store at a given dateTime and if checks if it's a delivery store
   * @method getAvailableServiceMethods
   * @param options {Object} JSON with defaults of <br />
   * dtString : this.data.StoreAsOfTime, current store time <br />
   * @returns {Array} list of service methods
   */


  _store.prototype.getAvailableServiceMethods = function (options) {
    var opts = $.extend({
      dtString: this.data.StoreAsOfTime
    }, options); // Create the dateTime information

    var dto = jsDPZ.obj.dateTime(opts.dtString);
    var currentTime = parseFloat(dto.data.getHours() + "." + dto.data.getMinutes()); // Intially set the flags

    var hasDelivery = false;
    var hasCarryout = false;
    var hasDuc = false;
    var hasDineIn = false;
    var hasHolidayHoursToday = false;
    var withinHolidayHours = false; // Check for Holiday Exception

    if (!jsDPZ.util.empty(this.data.Holidays)) {
      for (var key in this.data.Holidays) {
        var holidayDTO = jsDPZ.obj.dateTime(key);

        if (holidayDTO.getDisplayFormat("YYYY-MM-DD") == dto.getDisplayFormat("YYYY-MM-DD")) {
          hasHolidayHoursToday = true;
          var hoursArray = this.data.Holidays[key].Hours;

          if (hoursArray) {
            for (var i = 0, iL = hoursArray.length; i < iL; i++) {
              var openTime = parseFloat(hoursArray[i].OpenTime.replace(":", "."));
              var closeTime = parseFloat(hoursArray[i].CloseTime.replace(":", "."));
              if (currentTime >= openTime && currentTime <= closeTime) withinHolidayHours = true;
            }
          } else {
            withinHolidayHours = true;
          }
        }
      }
    }

    if (!hasHolidayHoursToday) {
      // Check Delivery Hours
      var deliveryHours = this.data.ServiceHours.Delivery[dto.getDayOfWeek()];

      if (!jsDPZ.util.empty(deliveryHours)) {
        for (var i = 0, iL = deliveryHours.length; i < iL; i++) {
          var times = deliveryHours[i];
          var openTime = parseFloat(times.OpenTime.replace(":", "."));
          var closeTime = parseFloat(times.CloseTime.replace(":", "."));
          hasDelivery = currentTime >= openTime && currentTime <= closeTime;

          if (hasDelivery) {
            i = iL;
          }
        }
      } // Check Carryout Hours


      var carryoutHours = this.data.ServiceHours.Carryout[dto.getDayOfWeek()];

      if (!jsDPZ.util.empty(carryoutHours)) {
        for (var i = 0, iL = carryoutHours.length; i < iL; i++) {
          var times = carryoutHours[i];
          var openTime = parseFloat(times.OpenTime.replace(":", "."));
          var closeTime = parseFloat(times.CloseTime.replace(":", "."));
          hasCarryout = currentTime >= openTime && currentTime <= closeTime;
          hasDineIn = this.data.AllowDineInOrders;

          if (hasCarryout) {
            i = iL;
          }
        }
      } // Check DUC Hours


      var ducHours = this.data.ServiceHours.DriveUpCarryout && this.data.ServiceHours.DriveUpCarryout[dto.getDayOfWeek()];

      if (!jsDPZ.util.empty(ducHours)) {
        for (var i = 0, iL = ducHours.length; i < iL; i++) {
          var times = ducHours[i];
          var openTime = parseFloat(times.OpenTime.replace(":", "."));
          var closeTime = parseFloat(times.CloseTime.replace(":", "."));
          hasDuc = currentTime >= openTime && currentTime <= closeTime;

          if (hasDuc) {
            i = iL;
          }
        }
      }
    }

    var allowForFutureOrder = function allowForFutureOrder(noOrdersUntil) {
      return +dto.data > +jsDPZ.obj.dateTime(noOrdersUntil).data;
    };

    var allowForCarryout = this.data.AllowCarryoutOrders || allowForFutureOrder(this.data.NoCarryoutOrdersUntil);
    var allowForDelivery = this.data.AllowDeliveryOrders || allowForFutureOrder(this.data.NoDeliveryOrdersUntil);
    var allowForDineIn = this.data.AllowDineInOrders || allowForFutureOrder(this.data.NoDineInOrdersUntil);
    var results = [];

    if (withinHolidayHours) {
      if (allowForCarryout) results.push("Carryout");
      if (allowForDelivery) results.push("Delivery");
      if (allowForDineIn) results.push("DineIn");
      if (hasDuc && this.data.AllowDuc) results.push("DriveUpCarryout");
    } else if (!hasHolidayHoursToday) {
      if (hasCarryout && allowForCarryout) results.push("Carryout");
      if (hasDelivery && allowForDelivery) results.push("Delivery");
      if (hasDineIn && allowForDineIn) results.push("DineIn");
      if (hasDuc && this.data.AllowDuc) results.push("DriveUpCarryout");
    }

    return results;
  };
  /**
   * Gets the hours of service for a given day and service method
   * @method getServiceMethodBusinessDayTimes
   * @param options {Object} JSON with defaults of <br />
   * dtString : this.data.StoreAsOfTime, current store time <br />
   * serviceMethod : "Delivery", service method <br />
   * @returns {Object} with keys OpenTime and CloseTime
   */


  _store.prototype.getServiceMethodBusinessDayTimes = function (options) {
    var opts = $.extend({
      serviceMethod: "Delivery",
      dtString: this.data.StoreAsOfTime
    }, options);
    var businessDay = {
      OpenTime: "",
      CloseTime: ""
    };
    var currentDayTime = jsDPZ.obj.dateTime(opts.dtString); // Make sure we are using the right day to base business day from

    var currentHour = currentDayTime.data.getHours();

    if (currentHour >= 0 && currentHour < 5) {
      // between 12:00AM and 5:00AM, we actually need to calculate based on yesterdays date.
      currentDayTime.data.setTime(currentDayTime.data.getTime() - 86400000);
    } // Check for Holiday Exception


    var today = jsDPZ.obj.dateTime();
    today.data = new Date(currentDayTime.data.getTime());
    var tomorrow = jsDPZ.obj.dateTime();
    tomorrow.data = new Date(currentDayTime.data.getTime() + 86400000);
    var HolidayHoursToday = null;
    var HolidayHoursTomorrow = null;

    if (!jsDPZ.util.empty(this.data.Holidays)) {
      for (var key in this.data.Holidays) {
        var holidayDTO = jsDPZ.obj.dateTime(key);

        if (holidayDTO.getDisplayFormat("YYYY-MM-DD") == today.getDisplayFormat("YYYY-MM-DD")) {
          HolidayHoursToday = this.data.Holidays[key].Hours;
        } else if (holidayDTO.getDisplayFormat("YYYY-MM-DD") == tomorrow.getDisplayFormat("YYYY-MM-DD")) {
          HolidayHoursTomorrow = this.data.Holidays[key].Hours;
        }
      }
    } // Create the Service hours


    var serviceHours = this.data.ServiceHours;
    var todaysHours = serviceHours[opts.serviceMethod][currentDayTime.getDayOfWeek()];
    var orderHours = dayjs(jsDPZ.app.order.getOrder().data.Details.OrderDateTime || opts.dtString).format("HH:mm");

    for (var i = 0, iL = todaysHours.length; i < iL; i++) {
      var hours = todaysHours[i];

      if (hours.OpenTime != "00:00" && orderHours > hours.OpenTime && orderHours < hours.CloseTime) {
        $.extend(businessDay, hours); // Now adjust for HolidayHoursToday if necessary

        if (HolidayHoursToday != null) {
          for (var j = 0, jL = HolidayHoursToday.length; j < jL; j++) {
            var hHours = HolidayHoursToday[j];

            if (hHours.OpenTime != "00:00") {
              var hOpen = parseFloat(hHours.OpenTime.replace(":", "."));
              var bOpen = parseFloat(businessDay.OpenTime.replace(":", "."));

              if (hOpen > bOpen) {
                businessDay.OpenTime = hHours.OpenTime;
              }

              var hClose = parseFloat(hHours.CloseTime.replace(":", "."));
              var bClose = parseFloat(businessDay.CloseTime.replace(":", "."));

              if (hClose < bClose) {
                businessDay.CloseTime = hHours.CloseTime;
              }

              break;
            }
          }
        }

        if (businessDay.CloseTime == "23:59") {
          var tomorrowsHours = serviceHours[opts.serviceMethod][new Date(currentDayTime.data.getTime() + 86400000).getDateTimeObject().getDayOfWeek()];

          for (var j = 0, jL = tomorrowsHours.length; j < jL; j++) {
            var nextDayHours = tomorrowsHours[j];

            if (nextDayHours.OpenTime == "00:00") {
              businessDay.CloseTime = nextDayHours.CloseTime;
            }
          } // Now adjust for HolidayHoursTommorow if necessary


          if (HolidayHoursTomorrow != null) {
            for (var j = 0, jL = HolidayHoursTomorrow.length; j < jL; j++) {
              var hHours = HolidayHoursTomorrow[j];

              if (hHours.OpenTime == "00:00") {
                var hClose = parseFloat(hHours.CloseTime.replace(":", "."));
                var bClose = parseFloat(businessDay.CloseTime.replace(":", "."));

                if (hClose < bClose) {
                  businessDay.CloseTime = hHours.CloseTime;
                }

                break;
              }
            }
          }
        }

        break;
      }
    } // Adjust Close time if necessary to new hour


    if (businessDay.CloseTime.split(":")[1] == "59") {
      var tempDateTime = new Date("1/1/01 " + businessDay.CloseTime);
      tempDateTime.setMinutes(tempDateTime.getMinutes() + 1);
      businessDay.CloseTime = tempDateTime.getHours() + ":00";
    }

    return businessDay;
  };
  /**
   * Sets the store data from Power JSON
   * @method setDataFromPower
   * @param data {Object} Power store data JSON
   * @returns {Store} this store
   */


  _store.prototype.setDataFromPower = function (data) {
    if (!jsDPZ.util.empty(data)) {
      data["Address"] = $.extend(true, {}, jsDPZ.config.dataModel.ADDRESS, {
        Street: data.StreetName,
        City: data.City,
        Region: data.Region,
        PostalCode: data.PostalCode
      });
      delete data.StreetName, delete data.City, delete data.Region, delete data.PostalCode, delete data.AddressDescription;
      var newStoreData = $.extend(true, {}, jsDPZ.config.dataModel.STORE, data);

      for (var key in newStoreData) {
        if (typeof jsDPZ.config.dataModel.STORE[key] == "undefined") {
          delete newStoreData[key];
        }
      }

      if (jsDPZ.util.empty(newStoreData.ServiceHoursDescription)) {
        newStoreData.ServiceIsOpen = {};
      }

      this.data = newStoreData;
    } else {
      this.data = $.extend(true, {}, jsDPZ.config.dataModel.STORE, {
        Address: jsDPZ.config.dataModel.ADDRESS
      });
    }

    return this;
  };
  /**
   * Gets the minimum delivery order amount or the minimum delivery order amount override based on jsdpz store config
   * @return {Number} The minimum delivery amount for that store
   */


  _store.prototype.getMinimumDeliveryOrderAmount = function () {
    var _jsDPZ$config$app, _jsDPZ$config$app$sto;

    var _this$data = this.data;
    _this$data = _this$data === void 0 ? {} : _this$data;
    var MinimumDeliveryOrderAmount = _this$data.MinimumDeliveryOrderAmount,
        MinimumDeliveryOrderAmountOverride = _this$data.MinimumDeliveryOrderAmountOverride;
    return (_jsDPZ$config$app = jsDPZ.config.app) !== null && _jsDPZ$config$app !== void 0 && (_jsDPZ$config$app$sto = _jsDPZ$config$app.storeConfig) !== null && _jsDPZ$config$app$sto !== void 0 && _jsDPZ$config$app$sto.useMinimumDeliveryOrderAmountOverride ? MinimumDeliveryOrderAmountOverride : MinimumDeliveryOrderAmount;
  };
})(jQuery);
/**
 * A storeSearch is an address that gets sent to Power to retrieve a list of possible ordering stores for a customer
 * @class storeSearch
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.storeSearch
     * @param data {Object} storeSearch JSON
     * @return {StoreSearch} Instantiated storeSearch
     */
    storeSearch: function storeSearch(value) {
      return new _storeSearch(value);
    }
  });
  /**
   * Generate a storeSearch
   * @method storeSearch
   * @param data {Object} storeSearch JSON
   * @constructor storeSearch
   * @private
   */

  function _storeSearch(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.STORE_SEARCH, {
      SearchedAddress: jsDPZ.config.dataModel.ADDRESS
    });

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
  /**
   * Gets the address object used for the search
   * @method getSearchedAddress
   * @return {Address} the searched address
   */


  _storeSearch.prototype.getSearchedAddress = function () {
    return jsDPZ.obj.address(this.data.SearchedAddress);
  };
  /**
   * Gets list of stores associated with the storeSearch
   * @method getStores
   * @return {Array} store objects
   */


  _storeSearch.prototype.getStores = function () {
    var storeObjects = [];

    for (var i = 0, iL = this.data.Stores.length; i < iL; i++) {
      storeObjects.push(jsDPZ.obj.store(this.data.Stores[i]));
    }

    return storeObjects;
  };
  /**
   * Sets the storeSearch data from a Power request JSON
   * @method setDataFromPower
   * @param data {Object} storeSearch Power JSON
   * @return {StoreSearch} this storeSearch
   */


  _storeSearch.prototype.setDataFromPower = function (data) {
    if (!jsDPZ.util.empty(data)) {
      data = $.extend(true, {}, data); // Prefer provided street address over building one, which helps
      // in countries where street number is after street name.

      var streetAddress = data.Address.Street;

      if (jsDPZ.util.empty(streetAddress)) {
        streetAddress = !jsDPZ.util.empty(data.Address.StreetNumber) ? data.Address.StreetNumber + " " : "";
        streetAddress += !jsDPZ.util.empty(data.Address.StreetName) ? data.Address.StreetName : "";
      }

      data.SearchedAddress = $.extend(true, {}, jsDPZ.config.dataModel.ADDRESS, {
        Street: streetAddress,
        StreetName: !jsDPZ.util.empty(data.Address.StreetName) ? data.Address.StreetName : "",
        StreetNumber: !jsDPZ.util.empty(data.Address.StreetNumber) ? data.Address.StreetNumber : "",
        AddressLine2: (jsDPZ.util.empty(data.Address.UnitType) ? "" : data.Address.UnitType + (data.Address.UnitType == "#" ? "" : " ")) + (!jsDPZ.util.empty(data.Address.UnitNumber) ? data.Address.UnitNumber : ""),
        AddressLine3: !jsDPZ.util.empty(data.Address.AddressLine2) ? data.Address.AddressLine2 : "",
        AddressLine4: !jsDPZ.util.empty(data.Address.AddressLine3) ? data.Address.AddressLine3 : "",
        Neighborhood: !jsDPZ.util.empty(data.Address.Neighborhood) ? data.Address.Neighborhood : "",
        BuildingID: !jsDPZ.util.empty(data.Address.BuildingID) ? data.Address.BuildingID : "",
        City: !jsDPZ.util.empty(data.Address.City) ? data.Address.City : "",
        Region: !jsDPZ.util.empty(data.Address.Region) ? data.Address.Region : "",
        PostalCode: !jsDPZ.util.empty(data.Address.PostalCode) ? data.Address.PostalCode : "",
        SubNeighborhood: !jsDPZ.util.empty(data.Address.SubNeighborhood) ? data.Address.SubNeighborhood : "",
        SectorName: !jsDPZ.util.empty(data.Address.AddressLine4) ? data.Address.AddressLine4 : ""
      });
      delete data.Address;
      var tmp = data.Stores;
      data.Stores = [];

      for (var i = 0, iL = tmp.length; i < iL; i++) {
        var store = tmp[i];
        var tmpAddressParts = store.AddressDescription ? store.AddressDescription.replace(/\n/g, "|").split("|") : [];
        var s = tmpAddressParts[0] ? tmpAddressParts[0] : "";
        var c = tmpAddressParts[1] ? tmpAddressParts[1] : "";
        delete store.AddressDescription;
        store.Address = $.extend(true, {}, jsDPZ.config.dataModel.ADDRESS, {
          Street: s,
          City: c
        });
        var newStoreData = $.extend(true, {}, jsDPZ.config.dataModel.STORE, store);

        for (var key in newStoreData) {
          if (typeof jsDPZ.config.dataModel.STORE[key] == "undefined") {
            delete newStoreData[key];
          }
        }

        data.Stores.push(newStoreData);
      }

      this.data = $.extend(true, {}, jsDPZ.config.dataModel.STORE_SEARCH, data);
    } else {
      this.data = $.extend(true, {}, jsDPZ.config.dataModel.STORE_SEARCH, {
        SearchedAddress: jsDPZ.config.dataModel.ADDRESS
      });
    }

    return this;
  };
})(jQuery);
/**
 * A variant is a specific variation of product attributes which can be added to a customers order
 * @class variant
 * @requires util
 * @requires config
 */


(function ($) {
  $.extend(jsDPZ.obj, {
    /**
     * @method jsDPZ.obj.variant
     * @param data {Object} variant JSON
     * @return {Variant} Instantiated variant
     */
    variant: function variant(data) {
      return new _variant(data);
    }
  });
  /**
   * Generate a variant
   * @method variant
   * @param data {Object} variant JSON
   * @constructor variant
   * @private
   */

  function _variant(data) {
    this.data = $.extend(true, {}, jsDPZ.config.dataModel.VARIANT);

    if (!jsDPZ.util.empty(data)) {
      $.extend(true, this.data, data);
    }
  }
  /**
   * Gets the size for the variant
   * @method getSearchedAddress
   * @return {Object} size JSON jsDPZ.config.dataModel.SIZE
   */


  _variant.prototype.getSizeData = function () {
    if (!jsDPZ.util.empty(this.data.SizeCode)) {
      return $.extend(true, {}, jsDPZ.config.dataModel.SIZE, {
        Code: this.data.SizeCode
      });
    }

    return {};
  };
  /**
   * Gets the flavor for the variant
   * @method getFlavorData
   * @return {Object} flavor JSON jsDPZ.config.dataModel.FLAVOR
   */


  _variant.prototype.getFlavorData = function () {
    if (!jsDPZ.util.empty(this.data.FlavorCode)) {
      return $.extend(true, {}, jsDPZ.config.dataModel.FLAVOR, {
        Code: this.data.FlavorCode
      });
    }

    return {};
  };
  /**
   * Checks Tags for `isNewItem`
   * @returns {Boolean}
   */


  _variant.prototype.isNewItem = function () {
    if (!jsDPZ.util.empty(this.data.Tags)) {
      return Boolean(this.data.Tags.isNewItem);
    }
  };
})(jQuery);
/* Array Remove - By John Resig (MIT Licensed) */


Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
//Available at https://github.com/paulirish/matchMedia.js/


window.matchMedia || (window.matchMedia = function () {
  "use strict"; // For browsers that support matchMedium api such as IE 9 and webkit

  var styleMedia = window.styleMedia || window.media; // For those that don't support matchMedium

  if (!styleMedia) {
    var style = document.createElement("style"),
        script = document.getElementsByTagName("script")[0],
        info = null;
    style.type = "text/css";
    style.id = "matchmediajs-test";
    script.parentNode.insertBefore(style, script); // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers

    info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle;
    styleMedia = {
      matchMedium: function matchMedium(media) {
        var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }"; // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers

        if (style.styleSheet) {
          style.styleSheet.cssText = text;
        } else {
          style.textContent = text;
        } // Test if media query is true or false


        return info.width === "1px";
      }
    };
  }

  return function (media) {
    return {
      matches: styleMedia.matchMedium(media || "all"),
      media: media || "all"
    };
  };
}());
window.performance && window.performance.mark || function () {
  window.performance = $.extend({
    mark: function mark() {
      return $.noop;
    },
    measure: function measure() {
      return $.noop;
    },
    getEntriesByType: function getEntriesByType() {
      return [];
    }
  }, window.performance);
}(); //Why: because the iOS webview that Cordova uses does not
//support performance.now(). The object exists but throws
//an exception. Reference to this issue can be found here:
//https://gist.github.com/paulirish/5438650
//
//This is an issue because facebook and paypal scripts
//attempt to use performance.now();
//
//This polyfill can be removed once we're using a hybrid
//plugin that fully supports performance.now();

try {
  window.performance.now();
} catch (e) {
  if (e instanceof TypeError) {
    $.extend(window.performance, {
      now: function now() {
        var nowOffset = Date.now();

        Date.now = Date.now || function () {
          return new Date().getTime();
        };

        if (performance.timing && performance.timing.navigationStart) {
          nowOffset = performance.timing.navigationStart;
        }

        return Date.now() - nowOffset;
      }
    });
  }
}
/**
* Topics for pub/sub design pattern
*
*  See http://api.jquery.com/jquery.callbacks/
*
* @class topic
**/


(function ($) {
  var topics = {};

  jsDPZ.topic = function (id) {
    var callbacks,
        method,
        topic = id && topics[id];

    if (!topic) {
      callbacks = $.Callbacks();
      topic = {
        publish: callbacks.fire,
        subscribe: callbacks.add,
        unsubscribe: callbacks.remove
      };

      if (id) {
        topics[id] = topic;
      }
    }

    return topic;
  };
})(jQuery);

(function () {
  var object = typeof exports != "undefined" ? exports : this; // #8: web workers

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  function InvalidCharacterError(message) {
    this.message = message;
  }

  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype.name = "InvalidCharacterError"; // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]

  object.btoa || (object.btoa = function (input) {
    var str = String(input);

    for ( // initialize result and counter
    var block, charCode, idx = 0, map = chars, output = ""; // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = "=", idx % 1); // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      charCode = str.charCodeAt(idx += 3 / 4);

      if (charCode > 0xff) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  }); // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]

  object.atob || (object.atob = function (input) {
    var str = String(input).replace(/=+$/, "");

    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }

    for ( // initialize result and counters
    var bc = 0, bs, buffer, idx = 0, output = ""; // get next character
    buffer = str.charAt(idx++); // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, // and if not first of each 4 characters,
    // convert the first 8 bits to one ascii character
    bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }

    return output;
  });
}).bind(window)(); // From: https://github.com/carhartl/jquery-cookie/blob/master/jquery.cookie.js

(function ($) {
  var pluses = /\+/g;

  function raw(s) {
    return s;
  }

  function decoded(s) {
    return decodeURIComponent(s.replace(pluses, " "));
  }

  function converted(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }

    try {
      return config.json ? JSON.parse(s) : s;
    } catch (er) {}
  }

  var config = jsDPZ.util.cookie = function (key, value, options) {
    // write
    if (value !== void 0) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === "number") {
        var days = options.expires,
            t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = config.json ? JSON.stringify(value) : String(value);
      var documentCookie = [encodeURIComponent(key), "=", config.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
      typeof options.maxAge === "number" ? "; max-age=" + options.maxAge : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join("");
      return document.cookie = documentCookie;
    } // read


    var decode = config.raw ? raw : decoded;
    var cookies = document.cookie.split("; ");
    var result = key ? void 0 : {};

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split("=");
      var name = decode(parts.shift());
      var cookie = decode(parts.join("="));

      if (key && key === name) {
        result = converted(cookie);
        break;
      }

      if (!key) {
        result[name] = converted(cookie);
      }
    }

    return result;
  };

  config.defaults = {};

  jsDPZ.util.removeCookie = function (key, options) {
    if (jsDPZ.util.cookie(key) !== void 0) {
      jsDPZ.util.cookie(key, "", $.extend(options, {
        maxAge: 0
      }));
      return true;
    }

    return false;
  };
})(jQuery);
/**
* The util module holds functionality for misc helper methods
* @module util
*/

/**
* The util class holds functionality for misc helper methods
* @class jsDPZ.util
* @static
*/


(function ($) {
  $.extend(jsDPZ.util, {
    /**
        * Takes any sort of object and returns if it is empty
        * @namespace jsDPZ.util
        * @method empty
        * @param thing {Object} Can be a String, Object, Array
        * @returns {boolean} if the object is empty
        */
    empty: function empty(thing) {
      switch (_typeof(thing)) {
        case "undefined":
          return true;

        case "object":
          if ($.isArray(thing)) {
            return thing.length === 0;
          }

          return $.isEmptyObject(thing);

        default:
          return $.trim(thing + "") === "";
      }
    }
  });
})(jQuery);

(function ($) {
  $.extend(jsDPZ.util, {
    /**
        * Takes an array of objects and compares them to validate if they are equal to each other
        * @namespace jsDPZ.util
        * @method equal
        * @param things {Array} an array of ojects
        * @returns {boolean} if the objects are all equal to eachother
        */
    equal: function equal(things) {
      if ($.isArray(things)) {
        var valid = true;

        for (var i = 0, iL = things.length; i < iL; i++) {
          if (!areEqual(things[0], things[i])) {
            valid = false;
            i = iL;
          }
        }

        return valid;
      }

      return true;
    }
  });
  /**
    * Takes two objects and compares them, does not have to be an object literal, could be an array or string.
    * @namespace jsDPZ.util
    * @method areEqual
    * @param thing1 {Object} Can be a String, Object, Array
    * @param thing2 {Object} Can be a String, Object, Array
    * @returns {boolean} if the objects are equal
    * @private
    */

  function areEqual(thing1, thing2) {
    if (_typeof(thing1) == _typeof(thing2)) {
      if (_typeof(thing1) == "object") {
        if ($.isArray(thing1)) {
          if (thing1.length == thing2.length) {
            for (var i = 0, iL = thing1.length; i < iL; i++) {
              if (!areEqual(thing1[i], thing2[i])) {
                return false;
              }
            }

            return true;
          }

          return false;
        } else {
          var ret = true;

          for (var key in thing1) {
            if (!areEqual(thing1[key], thing2[key])) {
              ret = false;
              break;
            }
          }

          if (ret) {
            var l1 = 0;
            var l2 = 0;

            for (var key in thing1) {
              l1++;
            }

            for (var key in thing2) {
              l2++;
            }

            return l1 == l2;
          }

          return false;
        }
      }

      return thing1 == thing2;
    }

    return false;
  }
})(jQuery);
/**
 * The util module holds functionality for misc helper methods
 * @module util
 */

/**
 * The util class holds functionality for misc helper methods
 * @class jsDPZ.util
 * @static
 */


(function ($) {
  $.extend(jsDPZ.util, {
    /**
     * Takes an object and safely retrieves a nested property, returning undefined if unable to find it
     * @namespace jsDPZ.util
     * @method getNestedProperty
     * @param object {object} an object to retrieve a property from
     * @param keys {keys} a string signifying the location of the nested property
     * @returns {object} the property
     */
    getNestedProperty: function getNestedProperty(object, keys) {
      if (!keys) return;
      return keys.split(".").reduce(function (value, key) {
        return value && value[key];
      }, object);
    }
  });
})(jQuery);

(function ($) {
  $.extend(jsDPZ.util, {
    /**
     * Adds Captcha v3 headers to a requests options
     * @namespace jsDPZ.util
     * @method getRecaptchaHeader
     * @param action {string} identifier for captcha action
     * @param options {object} request options
     * @param logger {function} optional custom logger function
     * @returns {Deferred}
     */
    getRecaptchaHeader: function getRecaptchaHeader(action, options, logger) {
      var log = logger || defaultLogger;
      var retryTokenEnabled = window.killConfig.isMarketEnabled("61f3cf48-db38-40bc-92c2-4e81cfc0d46f");
      var retrying = false;
      var siteKey = jsDPZ.config.power.recaptcha.siteKey;
      return $.Deferred(function (promise) {
        window.grecaptcha.ready(function () {
          window.grecaptcha.execute(siteKey, {
            action: action
          }).then(getTokenSuccess, getTokenError);
        }); // request handlers

        function getTokenSuccess(token) {
          options.headers = $.extend(options.headers, {
            "X-DPZ-CAPTCHA": setCaptchaValue(token)
          });
          promise.resolve(options);
        }

        function getTokenRetrySuccess(token) {
          log("".concat(action, ".grecaptcha.token.retry.success"));
          options.data = $.extend(options.data, {
            "X-DPZ-CAPTCHA": setCaptchaValue(token)
          });
          promise.resolve(options);
        }

        function getTokenError(er) {
          var tokenError = typeof er === "string" ? er : "was not a string: " + JSON.stringify(arguments);

          if (retryTokenEnabled && !retrying) {
            retrying = true;
            window.grecaptcha.reset(siteKey);
            log("".concat(action, ".grecaptcha.token.retry"), tokenError);
            window.grecaptcha.execute(siteKey, {
              action: action,
              fast: true
            }).then(getTokenRetrySuccess, getTokenError);
          } else {
            log(retrying ? "".concat(action, ".grecaptcha.token.retry.error") : "".concat(action, ".grecaptcha.token.error"), tokenError);
            promise.resolve(options);
          }
        }
      }).then(jsDPZ.ajax.request); // helper functions

      function setCaptchaValue(token) {
        return "google-recaptcha-v3-enterprise-gnolo;token=" + token + ";action=" + action;
      }

      function defaultLogger(message, er) {
        jsDPZ.topic("".concat(action, ".captcha.log")).publish({
          error: new Error(message),
          customData: {
            grecaptchaExecuteError: er || "n/a"
          }
        });
      }
    }
  });
})(jQuery);

(function ($) {
  $.extend(jsDPZ.util, {
    /**
        * Takes a string and hashes it into a string using a lightweight hashing function.
        * Not cryptographically secure, consider performance.
        * @namespace jsDPZ.util
        * @method hash
        * @param s {string} a string
        * @returns {string} a hashed s
        */
    hash: function hash(s) {
      return s.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
    }
  });
})(jQuery);

(function ($) {
  $.extend(jsDPZ.util, {
    /**
        * Escaping characters to prevent XSS, see
        * https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
        * @namespace jsDPZ.util
        * @method htmlEscape
        * @param obj {Object} Can be a String, Object, Array
        * @returns {Object} Same object with escaped Strings
        */
    htmlEscape: function htmlEscape(obj) {
      if (typeof obj === "string") {
        obj = obj.replace(/^&$/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;").replace(/\//g, "&#x2F;");
      } else if (_typeof(obj) === "object") {
        for (var i in obj) {
          obj[i] = jsDPZ.util.htmlEscape(obj[i]);
        }
      }

      return obj;
    },

    /**
        * Unescape characters to send back to server, reverse of htmlEscape
        * @namespace jsDPZ.util
        * @method htmlUnEscape
        * @param obj {Object} Can be a String, Object, Array
        * @returns {Object} Same object with unescaped Strings
        */
    htmlUnEscape: function htmlUnEscape(obj) {
      if (typeof obj === "string") {
        obj = obj.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&#x2F;/g, "/");
      } else if (_typeof(obj) === "object") {
        for (var i in obj) {
          obj[i] = jsDPZ.util.htmlUnEscape(obj[i]);
        }
      }

      return obj;
    },

    /**
        * Unencode html entities to get text characters
        * Should leave html escaped due to properies of
        * textarea tags
        * @namespace jsDPZ.util
        * @method htmlUnEncode
        * @param obj {Object} Can be a String, Object, Array
        * @returns {Object} Same object with unencoded entities
        */
    htmlUnEncode: function htmlUnEncode(obj) {
      if (typeof obj === "string") {
        var txt = document.createElement("textarea");
        txt.innerHTML = obj;
        obj = txt.value;
      } else if (_typeof(obj) === "object") {
        for (var i in obj) {
          obj[i] = jsDPZ.util.htmlUnEncode(obj[i]);
        }
      }

      return obj;
    },

    /**
        * Unencode the first/last name to make html entities
        * become real characters (and this preserve accents
        * and such)
        * Then html escape to make tags escaped
        * Then remove any javascript:
        * @namespace jsDPZ.util
        * @method sanitizeAndPreserveSpecialCharacters
        * @param str String
        * @returns str sanitized String
        */
    sanitizeAndPreserveSpecialCharacters: function sanitizeAndPreserveSpecialCharacters(str) {
      return jsDPZ.util.htmlEscape(jsDPZ.util.htmlUnEncode(str)).replace("javascript:", "");
    },

    /**
        * Remove unencoded html/xml tags to send back to server
        * @namespace jsDPZ.util
        * @method removeMarkup
        * @param obj {Object} Can be a String
        * @returns {Object} Same object with unescaped Strings
        */
    removeMarkup: function removeMarkup(stringObj) {
      return stringObj.replace(/<(?:.|\n)*?>/gm, "");
    }
  });
})(jQuery);
/**
 * The util class holds functionality for misc helper methods
 * @class jsDPZ.util
 * @static
 */


(function ($) {
  $.extend(jsDPZ.util, {
    oauth: {
      /**
       * helper to decode auth tokens into a header, body, signatue, and a stringified version of the scope
       * @namespace jsDPZ.util.oauth
       * @method decomposeToken
       */
      decomposeToken: function decomposeToken(token) {
        var tokenPieces = token.split(".");

        if (tokenPieces.length === 3) {
          var body;

          try {
            body = JSON.parse(atob(tokenPieces[1]));
          } catch (e) {
            body = "";
          }

          var header;

          try {
            header = atob(tokenPieces[0]);
          } catch (e) {
            header = "";
          }

          return {
            header: header,
            body: body,
            signature: tokenPieces[2],
            scope: body.scope ? body.scope.join(" ") : ""
          };
        } else {
          return {};
        }
      },

      /**
       * helper to retrieve accessTokens and refreshTokens from browser storage
       * @namespace jsDPZ.util.oauth
       * @method saveTokens
       */
      getTokens: function getTokens() {
        return {
          accessTokens: jsDPZ.dataConversion.JSONStringToObject(jsDPZ.util.sessionStorage("accessTokens") || "{}"),
          refreshTokens: jsDPZ.dataConversion.JSONStringToObject(jsDPZ.cache.isLocalStorageAvailable() && localStorage.getItem("refreshTokens") || "{}")
        };
      },

      /**
       * saves oauth tokens to session and local storage
       * @namespace jsDPZ.util.oauth
       * @method saveTokens
       */
      saveTokens: function saveTokens(access_token, refresh_token, tokenKey) {
        var tokens = jsDPZ.util.oauth.getTokens();
        tokens.accessTokens[tokenKey] = access_token;
        tokens.refreshTokens[tokenKey] = refresh_token;
        jsDPZ.util.sessionStorage("accessTokens", JSON.stringify(tokens.accessTokens));
        localStorage.setItem("refreshTokens", JSON.stringify(tokens.refreshTokens));
        var cookieOptions = {
          path: "/"
        };

        if (refresh_token) {
          cookieOptions.maxAge = 365 * 24 * 60 * 60;
        }

        jsDPZ.util.cookie("dpz_csr", "true", cookieOptions);
      },

      /**
       * removes oauth tokens from session and local storage
       * @namespace jsDPZ.util.oauth
       * @method removeTokens
       */
      removeTokens: function removeTokens(tokenKey, type) {
        var tokens = jsDPZ.util.oauth.getTokens();

        if (!type || type === "accessTokens") {
          if (tokens.accessTokens[tokenKey]) {
            delete tokens.accessTokens[tokenKey];
            jsDPZ.util.sessionStorage("accessTokens", JSON.stringify(tokens.accessTokens));
          }
        }

        if (!type || type === "refreshTokens") {
          if (tokens.refreshTokens[tokenKey]) {
            delete tokens.refreshTokens[tokenKey];
            localStorage.setItem("refreshTokens", JSON.stringify(tokens.refreshTokens));
          }
        }

        jsDPZ.util.removeCookie("dpz_csr", {
          path: "/"
        });
      },

      /**
       * Determines if ping failed based on status code. If it does push our error.
       * @namespace jsDPZ.util.oauth
       * @method didPingFail
       */
      didPingFail: function didPingFail(jqXHR) {
        if (jqXHR.status === 404 || jqXHR.status >= 500 && jqXHR.status < 600) {
          jsDPZ.topic("oauth.error").publish(jqXHR);
          return true;
        }

        return false;
      }
    }
  });
})(jQuery);
/**
* The util class holds functionality for misc helper methods
* @class jsDPZ.util
* @static
*/


(function ($) {
  var storage = function storage(key, value, options, storageType) {
    if (jsDPZ.util.hasWebStorage) {
      return typeof value !== "undefined" ? storageType.setItem(key, value) : storageType.getItem(key);
    } else {
      if (typeof value === "undefined") {
        return jsDPZ.util.cookie(key);
      } else {
        return jsDPZ.util.cookie(key, value, options);
      }
    }
  };

  var removeStorage = function removeStorage(key, options, storageType) {
    if (jsDPZ.util.hasWebStorage) {
      return storageType.removeItem(key);
    } else {
      return jsDPZ.util.removeCookie(key, options);
    }
  };

  $.extend(jsDPZ.util, {
    /**
        * saves data to session storage, or to a cookie if sessionStorage not available
        * @namespace jsDPZ.util
        * @method sessionStorage
        * @param key {String}
        * @param value {String}
        * @param options {Object}
        * @returns {String} stored value
        */
    sessionStorage: function (_sessionStorage) {
      function sessionStorage(_x, _x2, _x3) {
        return _sessionStorage.apply(this, arguments);
      }

      sessionStorage.toString = function () {
        return _sessionStorage.toString();
      };

      return sessionStorage;
    }(function (key, value, options) {
      return storage(key, value, options, sessionStorage);
    }),

    /**
        * saves data to local storage, or to a cookie if localStorage not available
        * @namespace jsDPZ.util
        * @method localStorage
        * @param key {String}
        * @param value {String}
        * @param options {Object}
        * @returns {String} stored value
        */
    localStorage: function (_localStorage) {
      function localStorage(_x4, _x5, _x6) {
        return _localStorage.apply(this, arguments);
      }

      localStorage.toString = function () {
        return _localStorage.toString();
      };

      return localStorage;
    }(function (key, value, options) {
      return storage(key, value, options, localStorage);
    }),

    /**
        * removes data from session storage, or from a cookie if sessionStorage not available
        * @namespace jsDPZ.util
        * @method removeSessionStorage
        * @param key {String}
        * @param options {Object}
        * @returns {String} stored value
        */
    removeSessionStorage: function removeSessionStorage(key, options) {
      return removeStorage(key, options, sessionStorage);
    },

    /**
        * removes data from local storage, or from a cookie if localStorage not available
        * @namespace jsDPZ.util
        * @method removeLocalStorage
        * @param key {String}
        * @param options {Object}
        * @returns {String} stored value
        */
    removeLocalStorage: function removeLocalStorage(key, options) {
      return removeStorage(key, options, localStorage);
    },
    hasWebStorage: function () {
      // Modernizr check
      try {
        localStorage.setItem("__x", "x");
        localStorage.removeItem("__x");
        return true;
      } catch (e) {
        return false;
      }
    }()
  });
})(jQuery);

(function ($) {
  $.extend(jsDPZ.util, {
    /**
        * Takes a string and parses it into an object with defaults
        * @namespace jsDPZ.util
        * @method stringToObjectParser
        * @param string {String} a string to be parsed
        * @param defaults {Object} default values
        * @returns {Object} a parsed JSON object
        */
    stringToObjectParser: function stringToObjectParser(string, defaults) {
      if (!jsDPZ.util.empty(string)) {
        var results = {};
        defaults = jsDPZ.util.empty(defaults) ? "" : defaults;
        var type = jsDPZ.util.empty(defaults) ? 0 : _typeof(defaults) == "object" ? 1 : 0;
        var stringArr = string.split(",");

        for (var i = 0, iL = stringArr.length; i < iL; i++) {
          var componentParts = stringArr[i].split("=");

          if (componentParts.length == 2) {
            componentParts[1] = componentParts[1].split(":");

            if (componentParts[1].length == 1 && type == 0) {
              componentParts[1] = componentParts[1].join("");
            }
          }

          results[componentParts[0]] = jsDPZ.util.empty(componentParts[1]) ? defaults : componentParts[1];
        }

        return results;
      }

      return {};
    }
  });
})(jQuery);

(function ($) {
  // This is all based off of the v4 browser logic from https://github.com/kelektiv/node-uuid
  // We only grabbed the logic that we need to generate the uuid. In the feature we should look into
  // just pulling in that package without all the extra node logic with it.
  // getRandomValues needs to be invoked in a context where "this" is a Crypto
  // implementation. Also, find the complete implementation of crypto on IE11.
  function getRandomValues() {
    var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);

    if (getRandomValues) {
      // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
      var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

      getRandomValues(rnds8);
      return rnds8;
    } else {
      // Math.random()-based (RNG)
      //
      // If all else fails, use Math.random().  It's fast, but is of unspecified
      var rnds = new Array(16);

      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return rnds;
    }
  }
  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */


  function bytesToUuid(buf) {
    var byteToHex = [];

    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }

    var index = 0;
    var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

    return [bth[buf[index++]], bth[buf[index++]], bth[buf[index++]], bth[buf[index++]], "-", bth[buf[index++]], bth[buf[index++]], "-", bth[buf[index++]], bth[buf[index++]], "-", bth[buf[index++]], bth[buf[index++]], "-", bth[buf[index++]], bth[buf[index++]], bth[buf[index++]], bth[buf[index++]], bth[buf[index++]], bth[buf[index++]]].join("");
  }

  $.extend(jsDPZ.util, {
    uuid: function uuid() {
      var buf = getRandomValues(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      buf[6] = buf[6] & 0x0f | 0x40;
      buf[8] = buf[8] & 0x3f | 0x80;
      return bytesToUuid(buf);
    }
  });
  var cookieXID = jsDPZ.util.cookie("X-DPZ-D");
  var localStorageXID = jsDPZ.util.localStorage("X-DPZ-D");
  var newXID = jsDPZ.util.uuid();
  var hasLegacyXID = localStorageXID && localStorageXID !== cookieXID;
  if (hasLegacyXID) jsDPZ.util.sessionStorage("LEGACY-X-DPZ-D", localStorageXID);
  var xid = cookieXID || localStorageXID || newXID;
  if (xid !== localStorageXID) jsDPZ.util.localStorage("X-DPZ-D", xid);
})(jQuery);
/*! End jsdpz v2.185.1 2023-07-14 */
//# sourceMappingURL=jsdpz.js.map
window.site = window.site || {};
Object.assign(window.site, {
  data: {
    hash: {
      wait: null,
      // resolved promise!?
      init: ""
    },
    // params : {},
    uiConfig: {
      AVAILABLE_LOCATIONS_ARRAY: [],
      AVAILABLE_LOCATIONS_HASH: {},
      AVAILABLE_PARTS_CLASS_ARRAY: [],
      AVAILABLE_WEIGHTS_HASH: {},
      AVAILABLE_FEEDSIZE_HASH: {},
      AVAILABLE_TITLETAGS: {},
      ADJUSTMENT_THRESHOLD: 0
    },
    lastOrder: {},
    transactionRecords: [],
    tmpOrder: {},
    noStepUpsell: false,
    ui: {
      hidePromoField: false
    },
    noScroll: false,
    ABData: {
      upsellAtHomepage: false,
      upsellAtBasket: false,
      savingsHeader: false,
      productUpsellHeader: "",
      priceMyOrder: {},
      hideDippingCups: false,
      keepMeSignedIn: {},
      specialtyChicken: {},
      showBuilder: false,
      moveGOBYO: false,
      newCouponWizard: true,
      experience: "",
      youSaved: "",
      fiftyOffExperience: ""
    },
    customerLoginOverlay: "pizzaProfileLoginOverlay",
    breakpoint: {
      previousBreakpoint: null,
      resizeTimer: null,
      handheldMaxSize: 640
    },
    specialtyChickenCodes: ["CKRGCBT", "CKRGHTB", "CKRGSJP", "CKRGSBQ"],
    breadTwistsCodes: ["B8PCPT", "B8PCGT", "B8PCCT"],
    deepLink: {
      wasDeepLinked: false
    },
    OWtest: "",
    productDefaults: {
      S_BUILD: {
        // BYO Pasta
        DefaultToppings: "Xf=1" // Alfredo Sauce

      }
    },
    getCartFromService: "getCartFromService",
    meta: {
      title: "",
      modal: {
        visible: false,
        analyticsTitle: ""
      },
      data: null
    }
  }
});
var _window = window,
    _window$kioskOauthCon = _window.kioskOauthConfig,
    kioskOauthConfig = _window$kioskOauthCon === void 0 ? {} : _window$kioskOauthCon; // BEGIN CA Change

urlConfig.authProxy = urlConfig.authProxy.replace("api.", "authproxy."); // END CA Change

jsDPZ.ajax.oAuthConfig = $.extend(jsDPZ.ajax.oAuthConfig, window.isKiosk && {
  chromeKiosk: {
    tokenKey: "chromeKiosk-oauth",
    clientId: kioskOauthConfig.clientId,
    authHeader: btoa(kioskOauthConfig.clientId + ":" + kioskOauthConfig.secret),
    secret: kioskOauthConfig.secret,
    scope: kioskOauthConfig.scope,
    validatorId: kioskOauthConfig.validatorId
  }
}, {
  customer: {
    oauthToken: urlConfig.api + "/as/authorization.oauth2",
    path: // BEGIN CA Change
    (dpz.market.marketCode === "CA" // END CA Change
    ? urlConfig.authProxy + "/auth-proxy-service" : urlConfig.api + "/as") + "/token.oauth2"
  }
}); // Kill Switch Config

var killConfig = {
  globalData: {},
  localData: {},
  loadDependency: function loadDependency(opts) {
    require(["simplr"], function () {
      var options = $.extend(true, {
        key: "",
        ajax: {
          url: "",
          dataType: "script",
          timeout: 3000,
          success: function success() {},
          error: function error() {},
          complete: function complete() {}
        },
        write: "",
        append: "",
        appendTo: "body"
      }, opts);
      var tagConfig = {
        jsonld: {
          type: "script",
          parent: document.head,
          props: {
            type: "application/ld+json"
          }
        },
        js: {
          type: "script",
          parent: document.body,
          urlProp: "src",
          props: {
            type: "text/javascript",
            charset: "utf-8",
            async: true
          },
          data: $.extend({}, opts.data)
        },
        css: {
          type: "link",
          parent: document.head,
          urlProp: "href",
          props: {
            rel: "stylesheet",
            type: "text/css",
            charset: "utf-8"
          }
        }
      };
      var ajaxOptions;

      if (!dpz.util.isEmpty(options.key)) {
        if (!dpz.util.isEmpty(options.ajax.url)) {
          ajaxOptions = $.extend(true, {}, options.ajax, {
            success: function success(data) {
              options.ajax.success(data);
            },
            error: function error() {
              window.killConfig.globalData[options.key] = false;
              options.ajax.error();
            },
            complete: function complete() {
              options.ajax.complete();
            }
          });
          $.ajax(ajaxOptions);
        } else if (!dpz.util.isEmpty(options.append)) {
          $(function () {
            $(options.appendTo).append(options.append);
          });
        } else if (!dpz.util.isEmpty(options.appendScriptTags)) {
          Object.keys(tagConfig).forEach(function (type) {
            $.makeArray(options.appendScriptTags[type]).forEach(function (context) {
              var config = tagConfig[type];
              var tag = document.createElement(config.type);
              $.each(config.props, function (key, value) {
                tag[key] = value;
              });
              $.each(config.data, function (key, value) {
                tag.setAttribute("data-".concat(key), value);
              });
              tag[config.urlProp || "innerText"] = context;

              if (options.appendScriptTags.onerror) {
                tag.setAttribute("onerror", options.appendScriptTags.onerror);
              }

              config.parent.appendChild(tag);
            });
          });
        }
      }
    });
  }
}; //initialize site globals

window.killConfig = $.extend(true, {}, killConfig, window.killConfig); // Local Kill Switch Config

window.killConfig.localData.googleAnalytics = true;
window.killConfig.localData.twitterFollow = true;
window.killConfig.localData.facebookLike = true;
window.killConfig.localData.stJude = false;
window.killConfig.localData.mBox = true;
window.killConfig.localData.tealium = true;
window.killConfig.localData.driverTracker = true;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

window.dpz = window.dpz || {};
dpz.util = {
  isEmpty: function isEmpty(thing) {
    var typeOfThing = _typeof(thing);

    if (typeOfThing !== "undefined" && thing != null) {
      if (typeOfThing === "object") {
        if ($.isArray(thing)) {
          return thing.length === 0;
        }

        return $.isEmptyObject(thing);
      }

      return $.trim(thing) === "";
    }

    return true;
  },
  // Returns null if there are no parameters or the requested parameter doesn't exist
  // Returns value of requested parameter if it does exist, or all parameters if a specific one is not specified
  getQueryParameters: function () {
    var paramsMemo = null;

    window.onpopstate = function () {
      return paramsMemo = null;
    };

    return function (name) {
      var string;
      var i;
      var iL;
      var keyValue;

      if (paramsMemo === null) {
        string = window.location.search;

        if (string) {
          paramsMemo = {};
          string = string.substring(1).split("&");

          for (i = 0, iL = string.length; i < iL; i++) {
            keyValue = string[i].split("=");
            paramsMemo[keyValue[0]] = $.trim(jsDPZ.util.htmlEscape(decodeURIComponent(keyValue[1])));
          }
        } else {
          paramsMemo = null;
        }
      }

      if (name) {
        return paramsMemo && name in paramsMemo ? paramsMemo[name] : null;
      }

      return paramsMemo;
    };
  }(),
  // Cookie reader/writer
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
  cookies: {
    getItem: function getItem(sKey) {
      if (!sKey) {
        return null;
      }

      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function setItem(sKey, sValue, options) {
      var sExpires = "";
      var expirationValue;
      var expirationDate;
      options = options || {};

      if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }

      if (options.vEnd) {
        switch (options.vEnd.constructor) {
          case Number:
            expirationValue = "Fri, 31 Dec 9999 23:59:59 GMT";

            if (options.vEnd !== Infinity) {
              expirationDate = new Date();
              expirationDate.setTime(expirationDate.getTime() + options.vEnd * 86400000);
              expirationValue = expirationDate.toUTCString();
            }

            sExpires = "; expires=" + expirationValue;
            break;

          case String:
            sExpires = "; expires=" + options.vEnd;
            break;

          case Date:
            sExpires = "; expires=" + options.vEnd.toUTCString();
            break;

          default:
            sExpires = "";
        }
      }

      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (options.sDomain ? "; domain=" + options.sDomain : "") + (options.sPath ? "; path=" + options.sPath : "") + (options.bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function removeItem(sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) {
        return false;
      }

      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function hasItem(sKey) {
      if (!sKey) {
        return false;
      }

      return new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
    },
    keys: function keys() {
      var nLen;
      var nIdx;
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);

      for (nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
        aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
      }

      return aKeys;
    }
  }
};
var DEBUG = false; //eslint-disable-line
// Patch support for window.location.origin in IE

if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
};dpz.version={"name":"gnolo-ca","version":"6.114.10"};dpz.version.toString = function() {
  return [ "                    ···"
          ,"                  ·······"
          ,"                ···········"
          ,"              ······   ······"
          ,"            ·······     ·······"
          ,"         •••  ······   ······"
          ,"       •••••••  ···········"
          ,"     •••••••••••  ·······"
          ,"   ••   •••••   ••  ···"
          ," •••     •••     •••    "          ,"   ••   •••••   ••"
          ,"     •••••••••••    "          ,"       •••••••"
          ,"         •••     " + "view source="  ].join("\n");};/**!

 @license
 handlebars v4.3.5

Copyright (C) 2011-2017 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
define("handlebars/utils",["exports"],function(a){"use strict";function b(a){return j[a]}function c(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function d(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1}function e(a){if("string"!=typeof a){if(a&&a.toHTML)return a.toHTML();if(null==a)return"";if(!a)return a+"";a=""+a}return l.test(a)?a.replace(k,b):a}function f(a){return!a&&0!==a||!(!o(a)||0!==a.length)}function g(a){var b=c({},a);return b._parent=a,b}function h(a,b){return a.path=b,a}function i(a,b){return(a?a+".":"")+b}a.__esModule=!0,a.extend=c,a.indexOf=d,a.escapeExpression=e,a.isEmpty=f,a.createFrame=g,a.blockParams=h,a.appendContextPath=i;var j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},k=/[&<>"'`=]/g,l=/[&<>"'`=]/,m=Object.prototype.toString;a.toString=m;var n=function(a){return"function"==typeof a};n(/x/)&&(a.isFunction=n=function(a){return"function"==typeof a&&"[object Function]"===m.call(a)}),a.isFunction=n;var o=Array.isArray||function(a){return!(!a||"object"!=typeof a)&&"[object Array]"===m.call(a)};a.isArray=o}),define("handlebars/exception",["exports","module"],function(a,b){"use strict";function c(a,b){var e=b&&b.loc,f=void 0,g=void 0;e&&(f=e.start.line,g=e.start.column,a+=" - "+f+":"+g);for(var h=Error.prototype.constructor.call(this,a),i=0;i<d.length;i++)this[d[i]]=h[d[i]];Error.captureStackTrace&&Error.captureStackTrace(this,c);try{e&&(this.lineNumber=f,Object.defineProperty?Object.defineProperty(this,"column",{value:g,enumerable:!0}):this.column=g)}catch(j){}}var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b.exports=c}),define("handlebars/helpers/block-helper-missing",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerHelper("blockHelperMissing",function(b,d){var e=d.inverse,f=d.fn;if(b===!0)return f(this);if(b===!1||null==b)return e(this);if(c.isArray(b))return b.length>0?(d.ids&&(d.ids=[d.name]),a.helpers.each(b,d)):e(this);if(d.data&&d.ids){var g=c.createFrame(d.data);g.contextPath=c.appendContextPath(d.data.contextPath,d.name),d={data:g}}return f(b,d)})}}),define("handlebars/helpers/each",["exports","module","../utils","../exception"],function(a,b,c,d){"use strict";function e(a){return a&&a.__esModule?a:{"default":a}}var f=e(d);b.exports=function(a){a.registerHelper("each",function(a,b){function d(b,d,f){j&&(j.key=b,j.index=d,j.first=0===d,j.last=!!f,k&&(j.contextPath=k+b)),i+=e(a[b],{data:j,blockParams:c.blockParams([a[b],b],[k+b,null])})}if(!b)throw new f["default"]("Must pass iterator to #each");var e=b.fn,g=b.inverse,h=0,i="",j=void 0,k=void 0;if(b.data&&b.ids&&(k=c.appendContextPath(b.data.contextPath,b.ids[0])+"."),c.isFunction(a)&&(a=a.call(this)),b.data&&(j=c.createFrame(b.data)),a&&"object"==typeof a)if(c.isArray(a))for(var l=a.length;h<l;h++)h in a&&d(h,h,h===a.length-1);else{var m=void 0;for(var n in a)a.hasOwnProperty(n)&&(void 0!==m&&d(m,h-1),m=n,h++);void 0!==m&&d(m,h-1,!0)}return 0===h&&(i=g(this)),i})}}),define("handlebars/helpers/helper-missing",["exports","module","../exception"],function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}var e=d(c);b.exports=function(a){a.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new e["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')})}}),define("handlebars/helpers/if",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerHelper("if",function(a,b){return c.isFunction(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||c.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})})}}),define("handlebars/helpers/log",["exports","module"],function(a,b){"use strict";b.exports=function(a){a.registerHelper("log",function(){for(var b=[void 0],c=arguments[arguments.length-1],d=0;d<arguments.length-1;d++)b.push(arguments[d]);var e=1;null!=c.hash.level?e=c.hash.level:c.data&&null!=c.data.level&&(e=c.data.level),b[0]=e,a.log.apply(a,b)})}}),define("handlebars/helpers/lookup",["exports","module"],function(a,b){"use strict";b.exports=function(a){a.registerHelper("lookup",function(a,b){if(!a)return a;if("constructor"!==b||a.propertyIsEnumerable(b))return a[b]})}}),define("handlebars/helpers/with",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerHelper("with",function(a,b){c.isFunction(a)&&(a=a.call(this));var d=b.fn;if(c.isEmpty(a))return b.inverse(this);var e=b.data;return b.data&&b.ids&&(e=c.createFrame(b.data),e.contextPath=c.appendContextPath(b.data.contextPath,b.ids[0])),d(a,{data:e,blockParams:c.blockParams([a],[e&&e.contextPath])})})}}),define("handlebars/helpers",["exports","./helpers/block-helper-missing","./helpers/each","./helpers/helper-missing","./helpers/if","./helpers/log","./helpers/lookup","./helpers/with"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}function j(a){l["default"](a),m["default"](a),n["default"](a),o["default"](a),p["default"](a),q["default"](a),r["default"](a)}function k(a,b,c){a.helpers[b]&&(a.hooks[b]=a.helpers[b],c||delete a.helpers[b])}a.__esModule=!0,a.registerDefaultHelpers=j,a.moveHelperToHooks=k;var l=i(b),m=i(c),n=i(d),o=i(e),p=i(f),q=i(g),r=i(h)}),define("handlebars/decorators/inline",["exports","module","../utils"],function(a,b,c){"use strict";b.exports=function(a){a.registerDecorator("inline",function(a,b,d,e){var f=a;return b.partials||(b.partials={},f=function(e,f){var g=d.partials;d.partials=c.extend({},g,b.partials);var h=a(e,f);return d.partials=g,h}),b.partials[e.args[0]]=e.fn,f})}}),define("handlebars/decorators",["exports","./decorators/inline"],function(a,b){"use strict";function c(a){return a&&a.__esModule?a:{"default":a}}function d(a){e["default"](a)}a.__esModule=!0,a.registerDefaultDecorators=d;var e=c(b)}),define("handlebars/logger",["exports","module","./utils"],function(a,b,c){"use strict";var d={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(a){if("string"==typeof a){var b=c.indexOf(d.methodMap,a.toLowerCase());a=b>=0?b:parseInt(a,10)}return a},log:function(a){if(a=d.lookupLevel(a),"undefined"!=typeof console&&d.lookupLevel(d.level)<=a){var b=d.methodMap[a];console[b]||(b="log");for(var c=arguments.length,e=Array(c>1?c-1:0),f=1;f<c;f++)e[f-1]=arguments[f];console[b].apply(console,e)}}};b.exports=d}),define("handlebars/base",["exports","./utils","./exception","./helpers","./decorators","./logger"],function(a,b,c,d,e,f){"use strict";function g(a){return a&&a.__esModule?a:{"default":a}}function h(a,b,c){this.helpers=a||{},this.partials=b||{},this.decorators=c||{},d.registerDefaultHelpers(this),e.registerDefaultDecorators(this)}a.__esModule=!0,a.HandlebarsEnvironment=h;var i=g(c),j=g(f),k="4.3.5";a.VERSION=k;var l=8;a.COMPILER_REVISION=l;var m=7;a.LAST_COMPATIBLE_COMPILER_REVISION=m;var n={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0 <4.3.0",8:">= 4.3.0"};a.REVISION_CHANGES=n;var o="[object Object]";h.prototype={constructor:h,logger:j["default"],log:j["default"].log,registerHelper:function(a,c){if(b.toString.call(a)===o){if(c)throw new i["default"]("Arg not supported with multiple helpers");b.extend(this.helpers,a)}else this.helpers[a]=c},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,c){if(b.toString.call(a)===o)b.extend(this.partials,a);else{if("undefined"==typeof c)throw new i["default"]('Attempting to register a partial called "'+a+'" as undefined');this.partials[a]=c}},unregisterPartial:function(a){delete this.partials[a]},registerDecorator:function(a,c){if(b.toString.call(a)===o){if(c)throw new i["default"]("Arg not supported with multiple decorators");b.extend(this.decorators,a)}else this.decorators[a]=c},unregisterDecorator:function(a){delete this.decorators[a]}};var p=j["default"].log;a.log=p,a.createFrame=b.createFrame,a.logger=j["default"]}),define("handlebars/safe-string",["exports","module"],function(a,b){"use strict";function c(a){this.string=a}c.prototype.toString=c.prototype.toHTML=function(){return""+this.string},b.exports=c}),define("handlebars/runtime",["exports","./utils","./exception","./base","./helpers"],function(a,b,c,d,e){"use strict";function f(a){return a&&a.__esModule?a:{"default":a}}function g(a){var b=a&&a[0]||1,c=d.COMPILER_REVISION;if(!(b>=d.LAST_COMPATIBLE_COMPILER_REVISION&&b<=d.COMPILER_REVISION)){if(b<d.LAST_COMPATIBLE_COMPILER_REVISION){var e=d.REVISION_CHANGES[c],f=d.REVISION_CHANGES[b];throw new o["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+e+") or downgrade your runtime to an older version ("+f+").")}throw new o["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function h(a,c){function d(d,e,f){f.hash&&(e=b.extend({},e,f.hash),f.ids&&(f.ids[0]=!0)),d=c.VM.resolvePartial.call(this,d,e,f);var g=b.extend({},f,{hooks:this.hooks}),h=c.VM.invokePartial.call(this,d,e,g);if(null==h&&c.compile&&(f.partials[f.name]=c.compile(d,a.compilerOptions,c),h=f.partials[f.name](e,g)),null!=h){if(f.indent){for(var i=h.split("\n"),j=0,k=i.length;j<k&&(i[j]||j+1!==k);j++)i[j]=f.indent+i[j];h=i.join("\n")}return h}throw new o["default"]("The partial "+f.name+" could not be compiled when running in runtime-only mode")}function f(b){function c(b){return""+a.main(h,b,h.helpers,h.partials,e,i,g)}var d=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],e=d.data;f._setup(d),!d.partial&&a.useData&&(e=m(b,e));var g=void 0,i=a.useBlockParams?[]:void 0;return a.useDepths&&(g=d.depths?b!=d.depths[0]?[b].concat(d.depths):d.depths:[b]),(c=n(a.main,c,h,d.depths||[],e,i))(b,d)}if(!c)throw new o["default"]("No environment passed to template");if(!a||!a.main)throw new o["default"]("Unknown template object: "+typeof a);a.main.decorator=a.main_d,c.VM.checkRevision(a.compiler);var g=a.compiler&&7===a.compiler[0],h={strict:function(a,b){if(!(b in a))throw new o["default"]('"'+b+'" not defined in '+a);return a[b]},lookup:function(a,b){for(var c=a.length,d=0;d<c;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:b.escapeExpression,invokePartial:d,fn:function(b){var c=a[b];return c.decorator=a[b+"_d"],c},programs:[],program:function(a,b,c,d,e){var f=this.programs[a],g=this.fn(a);return b||e||d||c?f=i(this,a,g,b,c,d,e):f||(f=this.programs[a]=i(this,a,g)),f},data:function(a,b){for(;a&&b--;)a=a._parent;return a},nullContext:Object.seal({}),noop:c.VM.noop,compilerInfo:a.compiler};return f.isTop=!0,f._setup=function(d){if(d.partial)h.helpers=d.helpers,h.partials=d.partials,h.decorators=d.decorators,h.hooks=d.hooks;else{h.helpers=b.extend({},c.helpers,d.helpers),a.usePartial&&(h.partials=b.extend({},c.partials,d.partials)),(a.usePartial||a.useDecorators)&&(h.decorators=b.extend({},c.decorators,d.decorators)),h.hooks={};var f=d.allowCallsToHelperMissing||g;e.moveHelperToHooks(h,"helperMissing",f),e.moveHelperToHooks(h,"blockHelperMissing",f)}},f._child=function(b,c,d,e){if(a.useBlockParams&&!d)throw new o["default"]("must pass block params");if(a.useDepths&&!e)throw new o["default"]("must pass parent depths");return i(h,b,a[b],c,0,d,e)},f}function i(a,b,c,d,e,f,g){function h(b){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],h=g;return!g||b==g[0]||b===a.nullContext&&null===g[0]||(h=[b].concat(g)),c(a,b,a.helpers,a.partials,e.data||d,f&&[e.blockParams].concat(f),h)}return h=n(c,h,a,g,d,f),h.program=b,h.depth=g?g.length:0,h.blockParams=e||0,h}function j(a,b,c){return a?a.call||c.name||(c.name=a,a=c.partials[a]):a="@partial-block"===c.name?c.data["partial-block"]:c.partials[c.name],a}function k(a,c,e){var f=e.data&&e.data["partial-block"];e.partial=!0,e.ids&&(e.data.contextPath=e.ids[0]||e.data.contextPath);var g=void 0;if(e.fn&&e.fn!==l&&!function(){e.data=d.createFrame(e.data);var a=e.fn;g=e.data["partial-block"]=function(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return c.data=d.createFrame(c.data),c.data["partial-block"]=f,a(b,c)},a.partials&&(e.partials=b.extend({},e.partials,a.partials))}(),void 0===a&&g&&(a=g),void 0===a)throw new o["default"]("The partial "+e.name+" could not be found");if(a instanceof Function)return a(c,e)}function l(){return""}function m(a,b){return b&&"root"in b||(b=b?d.createFrame(b):{},b.root=a),b}function n(a,c,d,e,f,g){if(a.decorator){var h={};c=a.decorator(c,h,d,e&&e[0],f,g,e),b.extend(c,h)}return c}a.__esModule=!0,a.checkRevision=g,a.template=h,a.wrapProgram=i,a.resolvePartial=j,a.invokePartial=k,a.noop=l;var o=f(c)}),define("handlebars/no-conflict",["exports","module"],function(a,b){"use strict";b.exports=function(a){var b="undefined"!=typeof global?global:window,c=b.Handlebars;a.noConflict=function(){return b.Handlebars===a&&(b.Handlebars=c),a}}}),define("handlebars.runtime",["exports","module","./handlebars/base","./handlebars/safe-string","./handlebars/exception","./handlebars/utils","./handlebars/runtime","./handlebars/no-conflict"],function(a,b,c,d,e,f,g,h){"use strict";function i(a){return a&&a.__esModule?a:{"default":a}}function j(){var a=new c.HandlebarsEnvironment;return f.extend(a,c),a.SafeString=k["default"],a.Exception=l["default"],a.Utils=f,a.escapeExpression=f.escapeExpression,a.VM=g,a.template=function(b){return g.template(b,a)},a}var k=i(d),l=i(e),m=i(h),n=j();n.create=j,m["default"](n),n["default"]=n,b.exports=n});/* globals requirejs, envConfig */
requirejs.config(buildRequireJSConfig({
  moduleBase: urlConfig.assets + "/js/modules",
  marketDirectory: dpz.market.directory
}));

function buildRequireJSConfig(options) {
  // Set all paths for the rest of the application...
  var requireConfig = {
    waitSeconds: 10,
    baseUrl: options.moduleBase,
    paths: {
      master: urlConfig.assets + "/market/master/_",
      market: options.marketDirectory,
      marketconfig: options.marketDirectory + "/config",
      marketjs: options.marketDirectory + "/../js",
      marketmodules: options.marketDirectory + "/../js/modules",
      paymentmodules: urlConfig.assets + "/js/modules/paymentmodules",
      markettemplates: options.marketDirectory + "/templates",
      "dpz.wam": dpz.market.wamDirectory + "/dpz.wam",
      unittesthelpermodules: urlConfig.root + "/tests/tests/helpers",
      abtests: urlConfig.assets + "/js/modules/abtests",
      external: urlConfig.assets + "/js/external",
      tracker: urlConfig.assets + "/js/tracker/index",
      Fuse: urlConfig.assets + "/js/external/fuse",
      dayjs: urlConfig.assets + "/js/external/dayjs.min",
      emarsysWebPush: "https://assets.emarsys.net/web-emarsys-sdk/3.3.0/web-emarsys-sdk"
    },
    shim: {
      "jquery.smartbanner": [],
      hammer: [],
      dms: [],
      "latlon-spherical": ["dms"],
      emarsysWebPush: []
    }
  }; // unless in development, use the concatenated file

  if (envConfig !== "localhost") requireConfig.bundles = {
    "market/dpz.marketConfig": ["marketconfig/dpz.app"]
  };
  return requireConfig;
}define("dpz.dayjsconfig", ["dayjs", "external/customParseFormat", "external/advancedFormat", "external/updateLocale"], function (dayjs, customParseFormat, advancedFormat, updateLocale) {
  return function (marketconfig) {
    var currentLocale = dpz.market.activeLanguageCode,
        dateConfig = marketconfig.date;
    dayjs.extend(customParseFormat);
    dayjs.extend(advancedFormat);
    dayjs.extend(updateLocale);

    var updateLocaleData = function updateLocaleData() {
      return dayjs.updateLocale(currentLocale, {
        months: dateConfig.months,
        monthsShort: dateConfig.monthsShort,
        weekdays: dateConfig.weekdays,
        weekdaysShort: dateConfig.weekdaysShort
      });
    }; // dayjs comes with English loaded by default


    if (currentLocale !== "en") {
      require(["external/dayjs-locale-".concat(currentLocale)], function () {
        dayjs.locale(currentLocale);
        updateLocaleData();
      });
    } else {
      updateLocaleData();
    }

    window.dayjs = dayjs;
  };
});var _excluded = ["user"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define("dpz.hybrid", ["site.funcs", "dpz.config", "dpz.customer"], function (_ref, _ref2, _ref3) {
  var _ref$func = _ref.func,
      isContentPage = _ref$func.isContentPage,
      isHandheld = _ref$func.isHandheld;
  var getMarketProperty = _ref2.getMarketProperty;
  var isProfiled = _ref3.isProfiled;
  window.dpz = window.dpz || {}; // If we are not in hybrid mode we just return an empty module

  if (!dpz.util.getQueryParameters("hybrid") && !(jsDPZ.util.localStorage("dpz_hybrid") === "true")) {
    var _module = {
      isActive: false,
      isTrackingDisabled: function isTrackingDisabled() {
        return false;
      }
    };
    window.dpz.hybrid = _module;
    return _module;
  } // Define the module


  var MODULE_NAMESPACE = "dpz_hybrid";
  var CHANGE_COUNTRY = "".concat(MODULE_NAMESPACE, "_change_country");
  var OVERRIDE_EXTERNAL_LINKS_URL = "".concat(MODULE_NAMESPACE, "_override_external_links");
  var COUPON = "".concat(MODULE_NAMESPACE, "_coupon");
  var ORDER_CONFIG = "".concat(MODULE_NAMESPACE, "_order_config");
  var PLATFORM = "dpz_platform";
  var PAYPAL_CLIENT_METADATA_ID = "".concat(MODULE_NAMESPACE, "_paypal_client_metadata_id");
  var APP_LINK_SCHEME = "".concat(MODULE_NAMESPACE, "_app_link_scheme");
  var STORED_SERVICE_METHOD = "".concat(MODULE_NAMESPACE, "_service_method");
  var IN_APP_BROWSER_SUPPORTED = "".concat(MODULE_NAMESPACE, "_in_app_browser");
  var TRACKING_DISABLED = "".concat(MODULE_NAMESPACE, "_tracking_disabled");
  var FONT_SCALE = "".concat(MODULE_NAMESPACE, "_font_scale");
  var BASE_CSS_PATH = "".concat(urlConfig.assets, "/css");
  var messageCommands = {
    OPEN_IN_APP_BROWSER: "app/inappbrowser/open",
    SEGMENT_TRACK_IDENTIFY: "app/segment/identify",
    SEGMENT_TRACK_RESET: "app/segment/identify"
  };

  var isServiceMethodEnabled = function isServiceMethodEnabled(serviceMethod) {
    return !killConfig.isMarketEnabled(serviceMethod === "Delivery" ? "157458fd-44c0-44ec-b375-1a29a991985f" : "d1a050cb-a642-4619-a47f-a9ced8841877");
  };

  var overrideExternalLinkURL = function overrideExternalLinkURL(evt) {
    evt.preventDefault();
    window.location.href = "external://".concat(evt.currentTarget.href);
  };

  var postMessage = function postMessage() {
    var _window$ReactNativeWe;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (_window$ReactNativeWe = window.ReactNativeWebView) === null || _window$ReactNativeWe === void 0 ? void 0 : _window$ReactNativeWe.postMessage(JSON.stringify(message));
  };

  var updateFontScale = function updateFontScale(fontScale) {
    document.querySelector("html").classList.add("dpz-hybrid-font-size", "dpz-hybrid-font-size--".concat(fontScale));
    killConfig.loadDependency({
      key: "hybrid-font-size",
      appendScriptTags: {
        css: ["".concat(BASE_CSS_PATH, "/hybrid-font-scales.css")]
      }
    });
  };

  var getShouldShowNavBackButton = function getShouldShowNavBackButton() {
    return isHandheld() && (!site.isHomepage || isContentPage());
  };

  var module = {
    isActive: true,
    config: {
      analytics: {
        android: "AndroidApp",
        ios: "iOSApp"
      },
      orderConfig: {
        "native": {
          android: {
            SourceOrganizationURI: "android.dominos.com"
          },
          ios: {
            SourceOrganizationURI: "iphone.dominos.com"
          }
        },
        hybrid: {
          android: {
            SourceOrganizationURI: "android-hybrid.dominos.com"
          },
          ios: {
            SourceOrganizationURI: "iphone-hybrid.dominos.com"
          }
        }
      }
    },
    bindEvents: function bindEvents() {
      var platform = module.getItem(PLATFORM) || "";

      var _getMarketProperty = getMarketProperty("generic"),
          absoluteHeadersOnHybrid = _getMarketProperty.absoluteHeadersOnHybrid; // START ECOM-44438


      if (platform === "ios" && !window.ReactNativeWebView && absoluteHeadersOnHybrid) {
        $("body").on({
          focusin: function focusin() {
            $(".js-headerContainer").addClass("hybrid-absolute-header");
            $(".js-mainHeading").addClass("is-hidden@handheld");
          },
          focusout: function focusout() {
            $(".js-headerContainer").removeClass("hybrid-absolute-header");
            $(".js-mainHeading").removeClass("is-hidden@handheld");
          }
        }, "input, select");
      } // END ECOM-44438


      jsDPZ.topic("minor.nav.update").subscribe(function () {
        $(".js-contentWrap").addClass("content-wrap--full-header");
      });

      if (module.getItem(OVERRIDE_EXTERNAL_LINKS_URL) === "true") {
        $(document).on("click", "a[target='_blank']", overrideExternalLinkURL);
      }

      return module;
    },
    getAnalyticsVariable: function getAnalyticsVariable() {
      var platform = module.getItem(PLATFORM) || "UnknownDevice";

      if (module.config.analytics[platform]) {
        platform = module.config.analytics[platform];
      }

      return platform;
    },
    getSourceOrganizationURI: function getSourceOrganizationURI() {
      var _module$config$orderC, _module$config$orderC2;

      var platform = module.getItem(PLATFORM);
      var orderConfig = module.getItem(ORDER_CONFIG) || "native";
      return ((_module$config$orderC = module.config.orderConfig[orderConfig]) === null || _module$config$orderC === void 0 ? void 0 : (_module$config$orderC2 = _module$config$orderC[platform]) === null || _module$config$orderC2 === void 0 ? void 0 : _module$config$orderC2.SourceOrganizationURI) || "";
    },
    init: function init() {
      // Inject the css & js specific hybrid app
      module.setHybridFiles(); // Create and append a new meta tag that prevents
      // iOS from rendering numbers as telephone links

      var head = document.querySelector("head");
      var newMeta = document.createElement("meta");
      newMeta.name = "format-detection";
      newMeta.content = "telephone=no";
      head.appendChild(newMeta); // Set the viewport meta tag to prevent the user from zooming.
      // InAppBrowser uses "enableviewportscale=no" to set these values,
      // but initial-scale=1 displays the site incorrectly on iPad
      // and has to be manually removed.

      var updateViewport = function () {
        var tag = document.getElementById("dpzviewport");
        return function (match) {
          if (match) {
            tag.setAttribute("content", "user-scalable=no,viewport-fit=cover");
          } else {
            tag.setAttribute("content", "user-scalable=no,width=device-width,initial-scale=1");
          }
        };
      }();

      updateViewport(document.documentElement.clientWidth > 640);
      var mql = window.matchMedia("(orientation: landscape)");
      mql.addListener(function (m) {
        updateViewport(m.matches && document.documentElement.clientWidth > 640);
      }); // Update order config, views and bind to events

      module.updateStorageFromParams().updateViews().bindEvents();
      var fontScale = module.getItem(FONT_SCALE);

      if (["small", "large", "extra-large", "user-agent"].includes(fontScale)) {
        updateFontScale(fontScale);
      }

      return module;
    },
    showBack: function showBack(_ref4) {
      var selector = _ref4.selector;
      var shouldShowBackButton = getShouldShowNavBackButton();
      $(".js-back", selector).toggleClass("is-hidden", !shouldShowBackButton);
      $(".js-tracker-link", selector).toggleClass("is-hidden", shouldShowBackButton);

      if (shouldShowBackButton) {
        $(".js-back", selector).off("click").on("click", function (evt) {
          evt.preventDefault();
          var _site = site,
              isConfirmationPage = _site.isConfirmationPage;

          var _getMarketProperty2 = getMarketProperty("confirmation"),
              _getMarketProperty2$h = _getMarketProperty2.hybridBackRedirectToHomepage,
              hybridBackRedirectToHomepage = _getMarketProperty2$h === void 0 ? false : _getMarketProperty2$h;

          if (isConfirmationPage && hybridBackRedirectToHomepage) window.location.assign("".concat(urlConfig.root, "/"));else dpz.history.back();
        });
      }

      return module;
    },
    updateViews: function updateViews() {
      var _URL = new URL(window.location.href),
          _URL$pathname = _URL.pathname,
          pathname = _URL$pathname === void 0 ? "/" : _URL$pathname;

      var isHomepage = ["/", "/index", "/index.html", "".concat(urlConfig.root, "/"), "".concat(urlConfig.root, "/index"), "".concat(urlConfig.root, "/index.html")].includes(pathname);

      require(["simplr", "baseSiteViews"], function (simplr) {
        // Override hybrid specific views
        var views = $.extend(true, {}, simplr.view.mData().Views);
        simplr.view.mAddViews({
          mainNavigation: $.extend(true, {}, views.mainNavigation, {
            callback: function callback(selector, data) {
              require(["dpz.template"], function (template) {
                views.mainNavigation.callback(selector, data);
                $(".js-contentWrap").addClass("content-wrap--full-header");

                if (!module.getItem(CHANGE_COUNTRY) || module.getItem(CHANGE_COUNTRY) === "true") {
                  template.assembleLayout({
                    component: "marketChangeHybrid",
                    tokens: {}
                  }).then(function (markup) {
                    $(selector).find(".js-changeMarket").remove();
                    $(selector).find(".js-mainNav:last").after(markup);
                  });
                }
              });
            }
          }),
          miniNav_view: $.extend(true, {}, views.miniNav, {
            html: function html(data) {
              return $.Deferred(function (_ref5) {
                var resolve = _ref5.resolve;

                require(["dpz.template", "dpz.storeAssistanceModule"], function (template, _ref6) {
                  var getShouldShowSam = _ref6.getShouldShowSam;
                  template.assembleLayout({
                    component: "miniNavHybrid",
                    tokens: _objectSpread(_objectSpread({}, data), {}, {
                      shouldShowSam: getShouldShowSam()
                    })
                  }).then(resolve);
                });
              });
            },
            callback: function callback(selector, data) {
              views.miniNav_view.callback(selector, data);
              module.showBack({
                selector: selector
              });
            }
          }),
          customerResponsiveLogin: $.extend(true, {}, views.customerResponsiveLogin, {
            html: function html(data) {
              var promise = $.Deferred();
              var isAnonymous = !isProfiled();
              var isConfirmationPage = site.isConfirmationPage;
              $(".js-contentWrap").addClass("content-wrap--full-header");

              require(["dpz.storeAssistanceModule", "dpz.template", "marketconfig/dpz.lang.payment"], function (_ref7, template, paymentStrings) {
                var getShouldShowSam = _ref7.getShouldShowSam;
                var showBackButton = getShouldShowNavBackButton();
                template.assembleLayout({
                  component: "customerResponsiveLoginHybrid",
                  tokens: {
                    message: data.message ? dpz.template.translate(data.message, null, paymentStrings) : "",
                    showBackButton: showBackButton,
                    renderData: !(showBackButton && getShouldShowSam()) && isAnonymous && !isConfirmationPage,
                    direction: $("html").attr("dir").toLowerCase(),
                    shouldShowSam: getShouldShowSam()
                  }
                }).then(function (html) {
                  promise.resolve(html);
                });
              });

              return promise;
            },
            callback: function callback(selector, data) {
              views.customerResponsiveLogin.callback(selector, data);
              module.showBack({
                selector: selector
              });
            }
          }),
          mainFooter: $.extend(true, {}, views.mainFooter, {
            callback: function callback(selector, data) {
              views.mainFooter.callback(selector, data);
              $(".js-international").remove();
            }
          })
        });
      });

      if (isHomepage) {
        require(["simplr", "baseSiteViews", "homeSiteViews"], function (simplr) {
          // Override hybrid specific views
          var views = $.extend(true, {}, simplr.view.mData().Views);
          simplr.view.mAddViews({
            homepage_touts: $.extend(true, {}, views.homepage_touts, {
              callback: function callback(selector, data) {
                views.homepage_touts.callback(selector, data);

                require(["dpz.config"], function (config) {
                  // Check if we will show the first time coupon overlay
                  var showFirstTimeCoupon = module.getItem(COUPON) === "true";
                  var couponCode = config.getMarketProperty("coupons").appCoupons.couponCode;
                  var fetchCouponStores = config.getMarketProperty("coupons").appStoresCoupons.map(function (coupon) {
                    return coupon;
                  });

                  function getCouponFromStore() {
                    var StoreID = fetchCouponStores.shift();

                    if (StoreID) {
                      jsDPZ.ajax.coupon({
                        StoreID: StoreID,
                        CouponCode: couponCode,
                        success: module.renderFirstTimeCoupon,
                        error: function error() {
                          getCouponFromStore();
                        }
                      });
                    }
                  }

                  module.setItem(COUPON, false);

                  if (showFirstTimeCoupon && couponCode) {
                    getCouponFromStore();
                  }
                });
              }
            })
          });
        });
      }

      return module;
    },
    renderFirstTimeCoupon: function renderFirstTimeCoupon(_ref8) {
      var code = _ref8.Code,
          couponImage = _ref8.ImageCode,
          images = _ref8.Images,
          description = _ref8.Name,
          price = _ref8.Price;
      var _site2 = site,
          isHomepage = _site2.isHomepage;

      require([isHomepage ? "home.components" : "order.components", "simplr", "dpz.template", "marketconfig/dpz.lang.entrees", "marketconfig/dpz.lang.home", "marketconfig/dpz.lang.hybrid"], function (_ref9, simplr, template, entreesStrings, homeStrings, hybridStrings) {
        var HybridFirstTimeCouponOffer = _ref9.HybridFirstTimeCouponOffer,
            TranslateContext = _ref9.TranslateContext;
        var altText = dpz.template.decodeAndSanitize(description);
        var coupon = {
          altText: altText,
          code: code,
          couponImage: couponImage,
          description: description,
          images: images,
          price: price
        };
        var trackingData = {
          event_name: "Promotion Viewed",
          promotion_id: "hybrid-first-time-coupon-upsell",
          creative: description,
          name: "Hybrid First Time Coupon (".concat(code, ")"),
          position: "".concat(isHomepage ? "homepage" : "menupage", "-overlay")
        };
        var isSegmentEnabled = killConfig.isMarketEnabled("72b925fb-2e0b-4fce-be02-9063ae056e16");

        var addCoupon = function addCoupon() {
          if (isSegmentEnabled) {
            dpz.utag.fire.link(null, _objectSpread(_objectSpread({}, trackingData), {}, {
              event_name: "Promotion Clicked"
            }));
          }

          if (isHomepage) window.location.href = "".concat(urlConfig.root, "/pages/order/?couponCode_0=").concat(coupon.code);else simplr.controller.mRouteAndExecute("/order/coupons/new?code=".concat(coupon.code, "&qty=1"));
        };

        if (isSegmentEnabled) dpz.utag.fire.link(null, trackingData);
        preact.render(preact.h(TranslateContext.Provider, {
          value: template.getTranslateContextValue(_objectSpread(_objectSpread(_objectSpread({}, entreesStrings), homeStrings), hybridStrings))
        }, preact.h(HybridFirstTimeCouponOffer, {
          dpzMarket: dpz.market,
          site: site,
          dpzTemplate: dpz.template,
          addCoupon: addCoupon,
          description: coupon.description,
          coupon: coupon,
          acceptTranslationKey: "entrees.redeem_now",
          killConfig: killConfig,
          jsDPZ: jsDPZ
        })), document.querySelector(".js-modalContainer"));
      });
    },
    renderDelayedFirstTimeCoupon: function renderDelayedFirstTimeCoupon() {
      require(["dpz.config"], function (_ref10) {
        var getMarketProperty = _ref10.getMarketProperty;

        var _ref11 = getMarketProperty("coupons").appCoupons || {},
            _ref11$couponCode = _ref11.couponCode,
            couponCode = _ref11$couponCode === void 0 ? "" : _ref11$couponCode;

        if (couponCode && module.getItem(COUPON) === "true") {
          module.setItem(COUPON, false);
          jsDPZ.ajax.coupon({
            StoreID: jsDPZ.app.order.getOrder().data.Details.StoreID,
            CouponCode: couponCode
          }).then(module.renderFirstTimeCoupon);
        }
      });
    },
    setHybridFiles: function setHybridFiles() {
      var viewportIsHandheld = isHandheld();
      killConfig.loadDependency({
        key: "hybrid",
        appendScriptTags: {
          css: ["".concat(BASE_CSS_PATH, "/hybrid.css")].concat(_toConsumableArray(!viewportIsHandheld ? ["".concat(BASE_CSS_PATH, "/hybrid.desktop.css")] : []))
        }
      });

      if (viewportIsHandheld) {
        $(document).one("/breakpoint/change/desktop/", function () {
          killConfig.loadDependency({
            key: "hybrid",
            appendScriptTags: {
              css: ["".concat(BASE_CSS_PATH, "/hybrid.desktop.css")]
            }
          });
        });
      }

      return module;
    },
    getItem: function getItem(key) {
      return jsDPZ.util.localStorage(key);
    },
    setItem: function setItem(key, value) {
      jsDPZ.util.localStorage(key, value);
    },
    getPlatform: function getPlatform() {
      return module.getItem(PLATFORM);
    },
    getPaypalClientMetadataId: function getPaypalClientMetadataId() {
      return module.getItem(PAYPAL_CLIENT_METADATA_ID);
    },
    getLastKnownLocation: function getLastKnownLocation() {
      try {
        var position = JSON.parse(jsDPZ.util.sessionStorage("dpz_user_location"));
        return jsDPZ.util.empty(position === null || position === void 0 ? void 0 : position.coords) ? null : position;
      } catch (error) {
        jsDPZ.topic("hybrid.geolocation.error").publish(error);
        return;
      }
    },
    getLastKnownServiceMethod: function getLastKnownServiceMethod() {
      var _getMarketProperty3 = getMarketProperty("locations"),
          serviceMethodButtonsHiddenOnHybridMode = _getMarketProperty3.serviceMethodButtonsHiddenOnHybridMode;

      var defaultServiceMethod = serviceMethodButtonsHiddenOnHybridMode ? "Delivery" : "";
      return module.getItem(STORED_SERVICE_METHOD) || defaultServiceMethod;
    },
    isServiceMethodEnabled: isServiceMethodEnabled,
    setLastKnownServiceMethod: function setLastKnownServiceMethod(serviceMethod) {
      return module.setItem(STORED_SERVICE_METHOD, serviceMethod);
    },
    getAppLinkScheme: function getAppLinkScheme() {
      return module.getItem(APP_LINK_SCHEME) || "";
    },
    updateStorageFromParams: function updateStorageFromParams() {
      // Persist the hybrid parameter
      module.setItem(MODULE_NAMESPACE, true);

      if (dpz.util.getQueryParameters("hybrid")) {
        // Some markets will display a coupon overlay in the home page for new devices
        module.setItem(COUPON, dpz.util.getQueryParameters("firstTime") && module.getItem(COUPON) === null); // The hybrid app passes the device type on the loading url, which will be used for analytics and the SourceOrganizationURI

        if (dpz.util.getQueryParameters("platform")) {
          module.setItem(PLATFORM, dpz.util.getQueryParameters("platform"));
        } // store the order-config value


        module.setItem(ORDER_CONFIG, dpz.util.getQueryParameters("order-config") || "native"); // If the hybrid app has only one market, the app won't display the change country

        if (dpz.util.getQueryParameters("change-country")) {
          module.setItem(CHANGE_COUNTRY, dpz.util.getQueryParameters("change-country") === "true");
        } else {
          // Backward compatibility (by default they can change)
          module.setItem(CHANGE_COUNTRY, true);
        } // React native apps will send a flag to override the external (_blank) links to handle them correclty


        if (dpz.util.getQueryParameters("overrideExternalLinksURL")) {
          module.setItem(OVERRIDE_EXTERNAL_LINKS_URL, dpz.util.getQueryParameters("overrideExternalLinksURL") === "true");
        } // For iOS we are receiving the user location from the app to prevent the double prompt on cordova


        if (dpz.util.getQueryParameters("dpz_user_location")) {
          jsDPZ.util.sessionStorage("dpz_user_location", jsDPZ.util.htmlUnEncode(decodeURIComponent(dpz.util.getQueryParameters("dpz_user_location"))));
        }

        var paypalClientMetadataId = dpz.util.getQueryParameters("paypalClientMetadataId");
        if (paypalClientMetadataId) module.setItem(PAYPAL_CLIENT_METADATA_ID, paypalClientMetadataId);else module.setItem(PAYPAL_CLIENT_METADATA_ID, "");
        var appLinkScheme = dpz.util.getQueryParameters("appLinkScheme");
        if (appLinkScheme) module.setItem(APP_LINK_SCHEME, appLinkScheme);else module.setItem(APP_LINK_SCHEME, "");
        var inAppBrowserSupported = dpz.util.getQueryParameters("supportsInAppBrowser");
        if (inAppBrowserSupported === "true") module.setItem(IN_APP_BROWSER_SUPPORTED, true);else module.setItem(IN_APP_BROWSER_SUPPORTED, "");
        var isAppTrackingEnabled = dpz.util.getQueryParameters("isAppTrackingEnabled") || "true";
        module.setItem(TRACKING_DISABLED, isAppTrackingEnabled === "false");

        var _getMarketProperty4 = getMarketProperty("locations"),
            serviceMethodButtonsHiddenOnHybridMode = _getMarketProperty4.serviceMethodButtonsHiddenOnHybridMode;

        var hash = window.location.hash;

        var _ref12 = hash.match(/[?&]type=(Carryout|Delivery)/) || [],
            _ref13 = _slicedToArray(_ref12, 2),
            landingServiceMethod = _ref13[1];

        if (serviceMethodButtonsHiddenOnHybridMode && landingServiceMethod) {
          var alternateServiceMethod = landingServiceMethod === "Carryout" ? "Delivery" : "Carryout";

          if (isServiceMethodEnabled(landingServiceMethod)) {
            module.setItem(STORED_SERVICE_METHOD, landingServiceMethod);
          } else if (isServiceMethodEnabled(alternateServiceMethod)) {
            module.setItem(STORED_SERVICE_METHOD, alternateServiceMethod);
            window.location.hash = window.location.hash.replace("type=".concat(landingServiceMethod), "type=".concat(alternateServiceMethod));
            window.location.reload();
          } else {
            site.func.powerCommunicationError();
          }
        }

        var fontScale = dpz.util.getQueryParameters("fontScale") || "normal";
        if (fontScale) module.setItem(FONT_SCALE, fontScale);
      }

      return module;
    },
    openInAppBrowser: function openInAppBrowser(_ref14) {
      var _ref14$url = _ref14.url,
          url = _ref14$url === void 0 ? "" : _ref14$url,
          _ref14$reloadWebview = _ref14.reloadWebview,
          reloadWebview = _ref14$reloadWebview === void 0 ? false : _ref14$reloadWebview;

      if (!url) {
        return;
      }

      postMessage({
        command: messageCommands.OPEN_IN_APP_BROWSER,
        data: {
          url: url,
          reloadWebview: reloadWebview
        }
      });
    },
    segmentTrackIdentify: function segmentTrackIdentify() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var user = _ref15.user,
          traits = _objectWithoutProperties(_ref15, _excluded);

      if (!user) return;
      postMessage({
        command: messageCommands.SEGMENT_TRACK_IDENTIFY,
        data: _objectSpread({
          user: user
        }, traits)
      });
    },
    segmentTrackReset: function segmentTrackReset() {
      postMessage({
        command: messageCommands.RESET,
        data: {}
      });
    },
    supportsInAppBrowser: function supportsInAppBrowser() {
      return module.getItem(IN_APP_BROWSER_SUPPORTED);
    },
    isTrackingDisabled: function isTrackingDisabled() {
      return module.getItem(TRACKING_DISABLED) === "true";
    }
  }; // Extend and initialize the module

  window.dpz.hybrid = module;
  return module;
});function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

require(["dpz.hotspots", "dpz.config", "dpz.utag.orderEvents", "dpz.createCanonical", "external/tealium-update-all"], function (_ref, _ref2, _ref3, _ref4, _ref5) {
  var isHotspotOrder = _ref.isHotspotOrder;
  var getMarketProperty = _ref2.getMarketProperty;
  var createOnCouponAdded = _ref3.createOnCouponAdded,
      createOnCouponRemoved = _ref3.createOnCouponRemoved,
      createOnProductAdded = _ref3.createOnProductAdded,
      createOnProductRemoved = _ref3.createOnProductRemoved,
      createOnProductUpdated = _ref3.createOnProductUpdated,
      createOnOrderPlaced = _ref3.createOnOrderPlaced,
      createOnOrderConfirmed = _ref3.createOnOrderConfirmed,
      createOnServiceMethodChange = _ref3.createOnServiceMethodChange,
      createOnOrderCheckout = _ref3.createOnOrderCheckout,
      createOnPaymentTypeChange = _ref3.createOnPaymentTypeChange,
      createOnOrderReview = _ref3.createOnOrderReview;
  var createCanonical = _ref4.createCanonical;
  var updateAll = _ref5.updateAll,
      initializeUdo = _ref5.initializeUdo,
      initializeListeners = _ref5.initializeListeners;
  var views = [];
  var links = [];
  var initialized = false;
  var tagManagers = [];
  var isTrackingDisabled = false;
  /* window utag */

  window.dpz.utag = function () {
    var internalPageName; // local copy of udo.page_name

    var udo = initializeUdo(); // this is window.utag_data object

    initializeListeners({
      udo: udo
    });
    var linkEvent = document.createEvent("Event");
    linkEvent.initEvent("link", true, true);
    var hasTagManagersEnabled = killConfig.isMarketEnabled("tealium") || getMarketProperty("thirdParty").googleTagManager.isTrackEnabled || killConfig.isMarketEnabled("72b925fb-2e0b-4fce-be02-9063ae056e16");
    var util = {
      getPropsForUpdateAll: function getPropsForUpdateAll() {
        var _dpz$driverTracker;

        var _dpz$market = dpz.market,
            marketCode = _dpz$market.marketCode,
            activeLanguageCode = _dpz$market.activeLanguageCode,
            activeLanguageName = _dpz$market.activeLanguageName,
            marketName = _dpz$market.marketName;
        var canonical = createCanonical();
        return {
          uri: canonical || window.location.href,
          udo: udo,
          catalogData: jsDPZ.app.catalog.getCatalog().data,
          isConfirmationPage: site.isConfirmationPage || false,
          isInMiniCart: site.data.IsInMiniCart || false,
          isPaymentPage: site.isPaymentPage || false,
          isCheckoutPage: site.func.isOnCheckoutPage() || false,
          gpsMapEnabled: ((_dpz$driverTracker = dpz.driverTracker) === null || _dpz$driverTracker === void 0 ? void 0 : _dpz$driverTracker.mapEnabled()) || false,
          isHandheld: site.func.isHandheld(),
          market: {
            marketCode: marketCode,
            activeLanguageCode: activeLanguageCode,
            activeLanguageName: activeLanguageName,
            marketName: marketName
          },
          isRolo: false,
          modalName: site.data.meta.modal.visible && site.data.meta.modal.analyticsTitle || ""
        };
      },
      updateClaimCreativeTests: function updateClaimCreativeTests(test) {
        var _jsDPZ$app$customer$g = jsDPZ.app.customer.getCustomer().data.Session.claimCreativeTests,
            claimCreativeTests = _jsDPZ$app$customer$g === void 0 ? [] : _jsDPZ$app$customer$g;
        jsDPZ.app.customer.getCustomer().data.Session.claimCreativeTests = Array.from(new Set([].concat(_toConsumableArray(claimCreativeTests), [test])));
        var tests = jsDPZ.app.customer.getCustomer().data.Session.claimCreativeTests.filter(Boolean);
        udo.claim_creative_test = tests.join(",");
      },
      fire: {
        view: function view(_ref6) {
          var eventData = _ref6.eventData,
              title = _ref6.title;
          util.domCompletePromise.then(function () {
            if (!isTrackingDisabled) {
              if (tagManagers.length) {
                tagManagers.forEach(function (_ref7) {
                  var view = _ref7.view;
                  return view({
                    eventData: _objectSpread(_objectSpread({}, eventData), util.getPropsForUpdateAll()),
                    title: title
                  });
                });
              } else {
                views.push({
                  eventData: _objectSpread(_objectSpread({}, eventData), util.getPropsForUpdateAll()),
                  title: title
                });
              }
            }
          });
        },
        link: function link(evt, options) {
          options = options || {}; // if the target explicitly sets dpz data, we need to make sure we use it
          // otherwise fallback to the currentTarget.

          var target = evt ? Array.from(evt.target.attributes).some(function (attr) {
            return attr.name.indexOf("data-dpz") !== -1;
          }) ? evt.target : evt.currentTarget : null;
          var linkOptions = evt ? _objectSpread(_objectSpread({}, options), {}, {
            eventData: evt,
            el: target,
            trackedEventType: evt.type
          }) : options;
          linkOptions.order_tip = options.order_tip || "";
          linkOptions.error_code = options.error_code || "";
          var $evtTarget = evt && $(target);
          if (!options.event_name) options.event_name = $evtTarget === null || $evtTarget === void 0 ? void 0 : $evtTarget.attr("data-dpz-track-evt-name");
          linkOptions.page_name = ($evtTarget === null || $evtTarget === void 0 ? void 0 : $evtTarget.attr("data-dpz-track-evt-pagename")) || udo.page_name || document.title;

          var getHasOption = function getHasOption(name) {
            return !!options[name];
          };

          var setLinkOption = function setLinkOption(name) {
            return linkOptions[name] = options[name];
          };

          ["event_name", "event_action", "event_category", "event_label"].filter(getHasOption).forEach(setLinkOption); // START HOTSPOTS

          linkOptions.driving_time = options.driving_time || "";
          linkOptions.walking_time = options.walking_time || "";
          linkOptions.crow_fly_distance = options.crow_fly_distance || "";
          linkOptions.hotspot_id = options.hotspot_id || "";
          linkOptions.number_of_hotspots_shown = options.number_of_hotspots_shown || "0";
          linkOptions.store_id = options.store_id || ""; // END HOTSPOTS

          if (options.event_name === "test_side_selected" || udo.ab_test !== "false") {
            linkOptions.ab_test = udo.ab_test;
            linkOptions.ab_test_list_var = options.ab_test_list_var || "";
          }

          if (options.event_name === "offer_test_selected" || options.event_name === "targeted_offer_test_flag") {
            util.updateClaimCreativeTests(linkOptions.claim_creative_test);
            linkOptions.claim_creative_test = udo.claim_creative_test;
          }

          if (site.data.meta.modal.analyticsCreativeTest) {
            util.updateClaimCreativeTests(site.data.meta.modal.analyticsCreativeTest);
          }

          if (options.event_name && $evtTarget && $evtTarget.is("[type=checkbox]")) {
            linkOptions.event_name += "_".concat($evtTarget.is(":checked") ? "checked" : "unchecked");
          }

          if (options.event_name === "static_exit_survey") {
            linkOptions.order_id = options.order_id;
            linkOptions.order_date = options.order_date;
            linkOptions.exit_survey_response = options.exit_survey_response;
          }

          if (["cst_template", "cst_tokenize"].includes(options.event_name)) {
            linkOptions.cst_response_code = options.responseCode; // 90

            linkOptions.cst_response_time = options.responseTime; // 91

            linkOptions.cst_gateway = options.gatewayType; //92

            linkOptions.cst_tokenization_flag = options.tokenizeFlag; // 93
          }

          if (options.product_name) {
            linkOptions.product_name = options.product_name;
          }

          if (options.loyalty_test) {
            linkOptions.loyalty_test = options.loyalty_test;
          }

          udo.modal_name = options.modal_name || ($evtTarget === null || $evtTarget === void 0 ? void 0 : $evtTarget.attr("data-dpz-track-modal-name")) || udo.modal_name;

          if (!linkOptions.event_action && $evtTarget !== null && $evtTarget !== void 0 && $evtTarget.is("[type=radio],[type=checkbox]")) {
            linkOptions.event_action = $evtTarget.is(":checked") ? "checked" : "unchecked";
          }

          if (linkOptions.event_name === "Modal Open") {
            linkOptions.event_category = "Modal";
            linkOptions.event_action = "Open";
          }

          util.domCompletePromise.then(function () {
            if (!isTrackingDisabled) {
              if (tagManagers.length) {
                tagManagers.forEach(function (_ref8) {
                  var link = _ref8.link;
                  return link(_objectSpread(_objectSpread({}, linkOptions), {}, {
                    eventData: _objectSpread(_objectSpread({}, linkOptions.eventData), util.getPropsForUpdateAll())
                  }));
                });
              } else {
                links.push(_objectSpread(_objectSpread({}, linkOptions), {}, {
                  eventData: _objectSpread(_objectSpread({}, linkOptions.eventData), util.getPropsForUpdateAll())
                }));
              }
            }

            window.dispatchEvent(linkEvent);
          });
        }
      },
      getTagManagers: function getTagManagers() {
        var tagModules = [{
          module: "dpz.tealium",
          enabled: function enabled() {
            return killConfig.isMarketEnabled("tealium");
          }
        }, {
          module: "dpz.googleTagManager",
          enabled: function enabled() {
            var _getMarketProperty = getMarketProperty("thirdParty"),
                _getMarketProperty$go = _getMarketProperty.googleTagManager,
                googleTagManager = _getMarketProperty$go === void 0 ? {} : _getMarketProperty$go;

            return Boolean(googleTagManager.isTrackEnabled);
          }
        }, {
          module: "dpz.segment",
          enabled: function enabled() {
            return killConfig.isMarketEnabled("72b925fb-2e0b-4fce-be02-9063ae056e16");
          }
        }, {
          module: "dpz.emarsys",
          enabled: function enabled() {
            return getMarketProperty("thirdParty").emarsys.isEmarsysEnabled;
          }
        }];
        return tagModules.filter(function (_ref9) {
          var enabled = _ref9.enabled;
          return enabled();
        }).map(function (_ref10) {
          var module = _ref10.module;
          return module;
        });
      },
      init: function init() {
        require(["dpz.hybrid"], function (_ref11) {
          var isHybridTrackingDisabled = _ref11.isTrackingDisabled;
          var browserPrivacyPolicy = [navigator.doNotTrack, navigator.globalPrivacyControl].includes("1");
          var currentCCPACookie = dpz.util.cookies.getItem("DPZDNT") === "true";

          if (browserPrivacyPolicy && !currentCCPACookie) {
            dpz.util.cookies.setItem("DPZDNT", "true", {
              vEnd: Infinity,
              sPath: "/"
            });
          }

          if (isHybridTrackingDisabled()) isTrackingDisabled = true;

          if (hasTagManagersEnabled && !initialized && !isTrackingDisabled) {
            initialized = true;

            require(_toConsumableArray(util.getTagManagers()), function () {
              for (var _len = arguments.length, managers = new Array(_len), _key = 0; _key < _len; _key++) {
                managers[_key] = arguments[_key];
              }

              tagManagers = managers;
              tagManagers.forEach(function (tagManager) {
                return tagManager.init({
                  links: links,
                  views: views,
                  updateData: updateAll
                });
              });
            });
          }
        });
      },
      domCompletePromise: new Promise(function (resolve) {
        if (document.readyState === "complete") {
          resolve();
        } else {
          $(document).on("readystatechange", function () {
            if (document.readyState === "complete") {
              resolve();
            }
          });
        }
      })
    }; // Update udo object on interesting user clicks

    $(document).on("trackedClick", function (e, element) {
      var $elem = $(element);
      udo.last_click = "".concat($elem.data("uri"), "|").concat($elem.data("subgroup"), "|").concat($elem.data("group"));
    }); // Listen for site.onPage trigger

    jsDPZ.topic("site.onPage").subscribe(function (customEvtData) {
      var pageName = customEvtData.analyticsTitle || customEvtData.documentTitle || window.document.title;
      util.fire.view({
        eventData: _objectSpread(_objectSpread({}, customEvtData), {}, {
          pageName: pageName
        }),
        title: pageName
      });
    });
    $(document).ready(function () {
      var trackedClickSelectors = ["[data-dpz-track-evt]", "a:not([data-dpz-no-track])", "button:not([data-dpz-no-track])", "input[type='submit']:not([data-dpz-no-track])", "input[type='image']:not([data-dpz-no-track])"];
      var trackedChangeSelectors = ["input[type='radio']:not([data-dpz-no-track])", "input[type='checkbox']:not([data-dpz-no-track])"];
      $("body").off(".utag"); // TODO: This listener does not track elements inside modals because of
      // our modal mask, which covers the body and prevents any events to
      // bubble up to the body

      $("body").on("click.utag", trackedClickSelectors.join(", "), function (event) {
        if ($(this).get(0).hasAttribute("data-dpz-stop-propagation")) {
          event.stopPropagation();
        }

        jsDPZ.topic("site.onTrackedEvent").publish(event);
      });
      $("body").on("change.utag", trackedChangeSelectors.join(", "), function (event) {
        jsDPZ.topic("site.onTrackedEvent").publish(event);
      });
    });
    jsDPZ.topic("site.onTrackedEvent").subscribe(function (customEvtData) {
      util.fire.link(customEvtData);
    });

    var _getMarketProperty2 = getMarketProperty("analytics"),
        areEcommerceEventsEnabled = _getMarketProperty2.areEcommerceEventsEnabled;

    if (areEcommerceEventsEnabled) {
      $(document).on("/order/coupon/add/", createOnCouponAdded(util.fire.link));
      $(document).on("/order/coupon/delete/", createOnCouponRemoved(util.fire.link));
      $(document).on("/order/variant/new/", createOnProductAdded(util.fire.link));
      $(document).on("/order/variant/delete/", createOnProductRemoved(util.fire.link));
      $(document).on("/order/variant/update/", createOnProductUpdated(util.fire.link));
      $(document).on("/order/purchase/", createOnOrderPlaced(util.fire.link));
      $(document).on("/order/confirmation", createOnOrderConfirmed(util.fire.link));
      $(document).on("/order/payment/selected/", createOnPaymentTypeChange(util.fire.link));
      $(document).on("/order/checkout/start/", createOnOrderCheckout(util.fire.link));
      $(document).on("/order/review/", createOnOrderReview(util.fire.link));
      jsDPZ.topic("order.service.method.changed").subscribe(createOnServiceMethodChange(util.fire.link));
    }

    return {
      fire: util.fire,
      init: util.init
    };
  }();
});define("dpz.kiosk", ["simplr", "dpz.inactivityTimeout", "dpz.couponSummary", "marketconfig/dpz.lang.general", "marketconfig/dpz.lang.payment"], function (simplr, inactivity, couponSummary, generalStrings, paymentStrings) {
  var Dashboard = function Dashboard(handle, origin) {
    this.handle = handle;
    this.origin = origin;
  };

  var queryParams = dpz.util.getQueryParameters();
  var kioskDashboard;
  var module = {};

  if (window.isKiosk) {
    if (envConfig === "localhost"
    /*|| (envConfig.startsWith("nolo-us-qa") && urlConfig.root === "/kiosk")*/
    ) {
      var storeId = "9906";
      var username = storeId === "9934" // This is assuming store 9934 or 9906
      ? "07A34125-7403-4B56-A3BB-BAAB9CAA63F8" : "525f877e-6ebc-4a8c-ae9d-6113ba5f6021"; //9906
      // "11d2bdda-d89e-486c-b889-8d83a40c0d57", // 9930

      var experienceId = storeId === "9934" // This is assuming store 9934 or 9906
      ? "323935BF-DC8A-4BAF-8708-EFA6A01A648C" : "525f877e-6ebc-4a8c-ae9d-6113ba5f6021"; //9906
      // "11d2bdda-d89e-486c-b889-8d83a40c0d57", // 9930

      var serviceMethod = queryParams && queryParams.delivery ? "Delivery" : "";
      var deliveryAddress = queryParams && queryParams.delivery ? {
        addressType: "Hotel",
        city: "Phenix City",
        locationName: "Wyhdham Suites",
        state: "AL",
        streetAddress: "100 E Lake Dr 200",
        zip: "00000-9934"
      } : {};
      var paymentDeviceId = queryParams && queryParams.delivery ? "NA-MANUAL-09906-01" : "KIOSK-09906-03";
      window.postMessage({
        type: "chrome/configuration/SEND",
        serviceUrl: "/kiosk-service-v2/",
        experienceId: experienceId,
        pingfed: {
          url: "https://auth-qa.dominos.com/as/token.oauth2",
          username: username,
          password: "zPJ8q8hJSMnUzA5n"
        },
        paymentDeviceId: paymentDeviceId,
        storeId: storeId,
        name: "CHECK-IN",
        idleState: "active",
        serviceMethod: serviceMethod,
        deliveryAddress: deliveryAddress
      }, window.location.origin);
    }
  }

  module = {
    config: {},
    kioskExperience: "",
    // earnLoyalty is a temp check. We don't want this going to prouction (aka: widescreen) right away, but Max wants to be able to demo this feature on portrait.
    // This could go away when we roll this out to all kiosks
    // If we want to puruse this feature config going forward set this to true/false
    earnLoyalty: true,
    fakePhoneNumber: "000-111-2222",
    fakeEmailAddress: "kiosk@dominos.com",
    chromeConfig: {},
    getConfig: function getConfig() {
      return jsDPZ.dataConversion.JSONStringToObject(localStorage.getItem("kioskConfig"));
    },
    setConfig: function setConfig(data) {
      if (typeof data !== "undefined") {
        module.config = data;
        jsDPZ.cache.isLocalStorageAvailable() && localStorage.setItem("kioskConfig", JSON.stringify(data));
      }
    },
    hasKioskConfig: function hasKioskConfig() {
      return !!(module.chromeConfig && module.chromeConfig.data);
    },
    init: function init() {
      var kioskIsLoaded = !!sessionStorage.getItem("kioskLoaded");
      module.kioskExperience = localStorage.getItem("kioskExperiences") || queryParams && queryParams.combined;
      module.chromeConfig = localStorage.getItem("chromeConfig") && JSON.parse(localStorage.getItem("chromeConfig"));
      module.setupInactivityTimeout();
      $(document).on("placeOrder.success", function () {
        module.placeOrderSuccess = true;
      }); // Add/Remove Coupon Applied Banner

      $(document).on("/order/coupon/add/ /order/coupon/delete/ /order/validate/", function () {
        module.showCouponBanner();
      }); // Inject the css & js specific kiosk app

      this.appendStyles();
      this.updateViews();

      if (window.isKiosk && module.hasKioskConfig() && (dpz.util.isEmpty(JSON.parse(sessionStorage.getItem("accessTokens"))) || !kioskIsLoaded)) {
        jsDPZ.ajax.oauth.authorize({
          grant_type: "password",
          username: module.chromeConfig.data.pingfed.username,
          password: module.chromeConfig.data.pingfed.password,
          client_id: jsDPZ.ajax.oAuthConfig.chromeKiosk.clientId,
          scope: jsDPZ.ajax.oAuthConfig.chromeKiosk.scope,
          validator_id: jsDPZ.ajax.oAuthConfig.chromeKiosk.validatorId
        }, {
          url: module.chromeConfig.data.pingfed.url,
          headers: {
            Authorization: "Basic " + btoa(jsDPZ.ajax.oAuthConfig.chromeKiosk.clientId + ":" + jsDPZ.ajax.oAuthConfig.chromeKiosk.secret),
            "content-type": "application/x-www-form-urlencoded"
          }
        }, jsDPZ.ajax.oAuthConfig.chromeKiosk.tokenKey).then(function () {
          module.fetchKioskConfiguration();
          module.callWrapperApp({
            type: "experience/status/UPDATE",
            status: "up"
          });
          module.callWrapperApp({
            type: "experience/log/MESSAGE",
            experienceId: module.chromeConfig.data.experienceId,
            experienceVersion: dpz.version.version,
            code: "FULLY_OPERATIONAL",
            message: "This kiosk  has successfully received its configuration and is ready to serve customers.",
            logLevel: "operational"
          });
        }, function (e) {
          module.callWrapperApp({
            type: "experience/error/SEND",
            message: e.statusText,
            status: e.status,
            code: "OAuth Failure",
            location: module.chromeConfig.data.pingfed.url,
            misc: {
              isRecoverable: false
            }
          });
          site.func.overlayToggle(true, "codeOverlay", {}, {
            code: "ePowerCommunication"
          });
        });
      } else if (window.isKiosk && module.hasKioskConfig() && !(site.isPaymentPage || site.isConfirmationPage)) {
        module.callWrapperApp({
          type: "experience/status/UPDATE",
          status: "up"
        });
        module.callWrapperApp({
          type: "experience/log/MESSAGE",
          experienceId: module.chromeConfig.data.experienceId,
          experienceVersion: dpz.version.version,
          code: "FULLY_OPERATIONAL",
          message: "This kiosk  has successfully received its configuration and is ready to serve customers.",
          logLevel: "operational"
        });
      } else {
        module.setKillConfigItems();
      }

      $(window).on("hashchange", function () {
        var lang = localStorage.getItem("kiosk-language") || $("html").attr("lang") || dpz.market.primaryLanguageCode;
        var ada = localStorage.getItem("kiosk-ada");

        if (window.location.hash.indexOf("/locate/") === -1 && window.location.hash.indexOf("/AllEntrees/") === -1 || lang !== dpz.market.primaryLanguageCode || ada || module.kioskExperience === "check-in") {
          module.restartInactivityTimeout({
            forceRestart: true
          });
        }
      });
      return module;
    },
    wakeUpPaymentDevice: function wakeUpPaymentDevice() {
      return $.Deferred(function (promise) {
        jsDPZ.ajax.orderKioskDeviceWakeUp({
          storeId: module.getConfig().storeId,
          data: JSON.stringify({
            stationName: module.chromeConfig.data.paymentDeviceId
          })
        }).then(function (response) {
          var responseData = response.data.attributes;

          if (!responseData.successful && responseData.retryable) {
            return module.wakeUpPaymentDevice();
          } else if (!responseData.successful && !responseData.retryable) {
            promise.resolve(false);
          } else {
            promise.resolve(true);
          }
        }).fail(function (err) {
          promise.resolve(false);
        });
      });
    },
    setKillConfigItems: function setKillConfigItems() {
      // Toggle off features that aren't for kiosk users
      this.killConfigOverrides = {
        "9f784df9-aa8a-4296-940b-6758099bec17": false,
        pizzaTrackerFeedback: false,
        confirmationTrackerTile: false,
        driverTracker: false,
        profileHomepage: false,
        createProfileEnabled: false,
        loyaltyShowPotentialAtPayment: false,
        entreesPopularItems: false,
        entreesCoupons: false,
        mBox: false,
        creditCardsEnabled: this.getConfig() && this.getConfig().isCreditCardAccepted && this.getConfig().serviceMethod === "Delivery" && !this.getConfig().isPaymentTerminal,
        homepageUpsellOverlay: false,
        confirmationYoutubeVideo: false,
        hotspots: false
      };
      !!window.killConfig.setGlobalData && window.killConfig.setGlobalData();
    },
    fetchKioskConfiguration: function fetchKioskConfiguration() {
      var kioskConfig = {
        storeId: module.chromeConfig.data.storeId,
        deviceId: module.chromeConfig.data.experienceId,
        serviceMethod: module.chromeConfig.data.serviceMethod || "Carryout",
        isCreditCardAccepted: false,
        city: module.chromeConfig.data.deliveryAddress && module.chromeConfig.data.deliveryAddress.city || "",
        zip: module.chromeConfig.data.deliveryAddress && module.chromeConfig.data.deliveryAddress.zip || "",
        state: module.chromeConfig.data.deliveryAddress && module.chromeConfig.data.deliveryAddress.state || "",
        streetAddress: module.chromeConfig.data.deliveryAddress && module.chromeConfig.data.deliveryAddress.streetAddress || "",
        mountingType: "counter",
        isPaymentTerminal: !!module.chromeConfig.data.paymentDeviceId && !module.chromeConfig.data.paymentDeviceId.includes("NA-MANUAL"),
        isCash: false,
        addressType: module.chromeConfig.data.deliveryAddress && module.chromeConfig.data.deliveryAddress.addressType || "",
        locationName: module.chromeConfig.data.deliveryAddress && module.chromeConfig.data.deliveryAddress.locationName || ""
      };
      module.getStoreProfile(kioskConfig);
    },
    getStoreProfile: function getStoreProfile(kioskConfig) {
      jsDPZ.ajax.storeProfile({
        StoreID: kioskConfig.storeId
      }).then(function (response) {
        kioskConfig.isCreditCardAccepted = response.AcceptablePaymentTypes.includes("CreditCard");
        kioskConfig.isCash = response.AcceptablePaymentTypes.includes("Cash");

        if (!module.isDelivery()) {
          kioskConfig.city = response.City;
          kioskConfig.zip = response.PostalCode;
          kioskConfig.state = response.Region;
          kioskConfig.streetAddress = response.StreetName;
        }

        jsDPZ.cache.isLocalStorageAvailable() && localStorage.setItem("kioskConfig", JSON.stringify(kioskConfig));

        require(["site.funcs"], function (siteFuncs) {
          siteFuncs.sessionTools.save().then(function () {
            module.setKillConfigItems();
            module.beginSession($("html").attr("lang"));
          });
        });
      }, function (e) {
        module.callWrapperApp({
          type: "experience/error/SEND",
          message: e.statusText,
          status: e.status,
          code: "Store Profile Failure",
          location: "".concat(envConfig, "power/store/").concat(kioskConfig.storeId, "profile"),
          misc: {
            isRecoverable: false
          }
        });
        site.func.overlayToggle(true, "codeOverlay", {}, {
          code: "ePowerCommunication"
        });
      });
    },
    recieveMessage: function recieveMessage(event) {
      var kioskLoaded = JSON.parse(sessionStorage.getItem("kioskLoaded"));
      if (typeof event.data === "string") try {
        event.data = JSON.parse(event.data);
      } catch (exception) {}

      if (event.isTrusted && (event.origin.startsWith("chrome-extension://") || event.origin.includes("localhost") || event.origin.includes("www-dev") || event.origin.includes("www-qa") || event.origin.includes("www-preprod") || event.origin.includes("www-va-prod") || event.origin.includes("www-prod") || envConfig.includes("localhost") || envConfig.includes("nolo-us-qa")) && event.data.type && event.data.type.startsWith("chrome/configuration")) {
        module.chromeConfig = localStorage.getItem("chromeConfig") && JSON.parse(localStorage.getItem("chromeConfig"));

        if (!kioskDashboard) {
          kioskDashboard = new Dashboard(event.source, event.origin);
        }

        site.data.kioskConfig = {
          origin: event.origin,
          data: event.data
        };
        module.messageSource = event.source;
        site.data.kioskMessageSource = event.source;
        jsDPZ.cache.isLocalStorageAvailable() && localStorage.setItem("chromeConfig", JSON.stringify(site.data.kioskConfig));

        if (window.isKiosk && !kioskLoaded) {
          module.init();
        } else {
          module.callWrapperApp({
            type: "experience/status/UPDATE",
            status: "up"
          });
        }
      }
    },
    callWrapperApp: function callWrapperApp(data) {
      var messageType = data.type.split("/")[1];
      data.experienceId = module.chromeConfig.data.experienceId;
      data.experienceVersion = dpz.version.version;

      if (messageType === "error") {
        dpz.utag.fire.link("undefined", {
          group: "Error",
          event_name: data.message,
          event_action: data.location || "",
          event_category: "error",
          event_label: "",
          event_value: data.code,
          event_value2: "sad pizza face"
        });
      }

      if (kioskDashboard && kioskDashboard.origin && kioskDashboard.handle) {
        kioskDashboard.handle.postMessage(data, kioskDashboard.origin);
      }
    },
    isDelivery: function isDelivery() {
      return this.getConfig() && this.getConfig().serviceMethod === "Delivery";
    },
    appendStyles: function appendStyles() {
      var kioskClass = window.isKiosk ? "chrome-kiosk" : "";
      var serviceMethod = localStorage.getItem("chromeConfig") && JSON.parse(localStorage.getItem("chromeConfig")).data.serviceMethod || "carryout";
      $("body").addClass("kiosk");
      $("body").addClass(kioskClass);
      $("body").addClass("".concat(serviceMethod.toLowerCase(), "-kiosk"));
      killConfig.loadDependency({
        key: "kiosk",
        appendScriptTags: {
          css: ["".concat(urlConfig.assets, "/css/kiosk.css")]
        }
      });
      return module;
    },
    updateViews: function updateViews() {
      simplr.view.mAddViews({
        pin_pad_instructions: {
          html: function html(data) {
            return dpz.template.assembleLayout({
              component: "genericOverlay",
              tokens: {
                title: data.tryAgain ? dpz.template.translate("general.were_sorry", null, generalStrings) : dpz.template.translate("payment.please_use_pin_pad", null, paymentStrings),
                overlayContent: {
                  component: "kioskPinPadInstructions",
                  tokens: {
                    tryAgain: data.tryAgain
                  }
                },
                customClass: "card--overlay--pin-pad-instructions"
              }
            });
          },
          callback: function callback(selector, data) {
            $(".js-closeButton", selector).remove();
            $(selector).addClass("overlay-wrap--center center");
            $(".js-dismissButton").on("click", function () {
              module.resetSession("payment-error", true);
            });
            $(".js-payAtCounter", selector).on("click", function () {
              window.location = "".concat(urlConfig.localRoot, "/pages/order/confirmation");
            });
            $(".js-tryAgainWithCard", selector).on("click", function tryAgain() {
              $(this).add(".js-payAtCounter", selector).prop("disabled", true);
              module.completePayment(data.orderNumber).then(function () {
                window.location = "".concat(urlConfig.localRoot, "/pages/order/confirmation");
              }, function () {
                site.func.overlayToggle(true, "pin_pad_instructions", {}, {
                  tryAgain: true,
                  orderNumber: data.orderNumber
                });
              });
            });

            if (data.tryAgain) {
              module.setupInactivityTimeout();
            }
          }
        },
        kiosk_inactivity_timeout_overlay: {
          html: function html() {
            return dpz.template.assembleLayout({
              component: "kioskInactivityTimeout",
              tokens: {}
            });
          },
          callback: function callback(selector, data) {
            var kioskInactivityInterval = setInterval(function () {
              data.remainingTime--;

              if (data.remainingTime) {
                $(".js-remainingTime", selector).text(data.remainingTime);
              } else {
                clearInterval(kioskInactivityInterval);
                module.resetSession("inactivity-timeout", true);
              }
            }, 1000);
            $(".js-closeButton", selector).on("click", function (e) {
              e.preventDefault();
              clearInterval(kioskInactivityInterval);
              $(selector).remove();
              module.restartInactivityTimeout({
                forceRestart: true
              });
            }).focus().blur();
          }
        },
        kiosk_coupon_banner: {
          html: function html() {
            return dpz.template.assembleLayout({
              component: "couponSummary",
              tokens: couponSummary.getCouponSummaryTokens(true)
            });
          },
          callback: function callback(selector) {
            $(".js-fulfilled .js-addAnotherItem").removeClass("is-hidden");
            $(".js-unfulfilled .js-incomplete").removeClass("is-hidden");
            couponSummary.handleFulfillCouponButton(selector);
            couponSummary.handleRemoveCouponButton(selector);
          }
        }
      });
    },
    kioskConfigurationSuccess: function kioskConfigurationSuccess(data, lang, trigger) {
      sessionStorage.setItem("kioskLoaded", true);
      module.setConfig(data);
      var kioskConfig = module.getConfig();

      if (kioskConfig.locationName) {
        // locationName, in this case, is the name of the hotel that is being delivered to.
        // We need to extend it onto the customer's address in the session here,
        // because it's not part of the auto-locate store process
        jsDPZ.app.customer.setCustomer($.extend(true, jsDPZ.app.customer.getCustomer().data, {
          Session: {
            Address: $.extend(true, jsDPZ.config.dataModel.ADDRESS, {
              Type: kioskConfig.addressType,
              LocationName: kioskConfig.locationName
            })
          }
        }));

        require(["site.funcs"], function (siteFuncs) {
          siteFuncs.sessionTools.save().then(function () {
            if (trigger) $(".js-kioskInactivityTimeoutOverlay .js-closeButton").click();
            module.autoLocateKioskStore(kioskConfig, lang, trigger);
          });
        });
      } else {
        if (trigger) $(".js-kioskInactivityTimeoutOverlay .js-closeButton").click();
        module.autoLocateKioskStore(kioskConfig, lang, trigger);
      }
    },
    kioskConfigurationFail: function kioskConfigurationFail(jqXHR, textStatus) {
      jsDPZ.topic("kiosk.error").publish({
        error: new Error("kiosk configuration failure"),
        customData: {
          status: jqXHR.status,
          statusText: jqXHR.statusText
        }
      });
      module.destroySessionIfNotAuthorized(jqXHR.status, jqXHR.statusText, function () {
        // textStatus === "parsererror" indicates a 200 OK with an empty response body
        // this is a common potential case where kiosk internet connectivity is lost
        var overlayOpts = textStatus === "parsererror" ? {
          code: "tryAgainOrCSR",
          title: dpz.template.translate("general.internet_connectivity_issue", null, generalStrings)
        } : {
          code: "ePowerCommunication"
        };
        site.func.overlayToggle(true, "codeOverlay", {}, overlayOpts);
      });
      dpz.kiosk.sessionStarting = false;
    },
    beginSession: function beginSession(lang, trigger) {
      dpz.kiosk.sessionStarting = true;
      module.clearInactivityTimeout();
      var config = jsDPZ.cache.isLocalStorageAvailable() && JSON.parse(localStorage.getItem("kioskConfig"));

      if (config) {
        module.kioskConfigurationSuccess(config, lang, trigger);
      } else {
        module.kioskConfigurationFail(400, "no kiosk config");
      }

      module.setSessionId();
    },
    autoLocateKioskStore: function autoLocateKioskStore(kioskConfig, lang, trigger) {
      window.location.href = urlConfig.root + "/pages/order/#!/locate/" + "?StoreID=" + kioskConfig.storeId + "&type=" + kioskConfig.serviceMethod + "&s=" + encodeURIComponent(kioskConfig.streetAddress) + "&c=" + encodeURIComponent(kioskConfig.city + ", " + kioskConfig.state + " " + kioskConfig.zip) + (lang ? "&lang=" + lang : "") + (trigger ? "&kiosk-reset-trigger=" + trigger : "");
    },
    clearSessionData: function clearSessionData() {
      // Cache kiosk related stuff
      var accessTokens = jsDPZ.util.sessionStorage("accessTokens");
      var refreshTokens = localStorage.getItem("refreshTokens");
      var kioskConfig = localStorage.getItem("kioskConfig");
      var chromeConfig = localStorage.getItem("chromeConfig");
      var kioskExperience = localStorage.getItem("kioskExperiences"); // Wipe browser storage, just like ?reset=1

      site.sessionTools.remove();
      localStorage.clear();
      dpz.util.cookies.removeItem("noStepUpsell");
      jsDPZ.app.order.setOrder();
      jsDPZ.app.customer.setCustomer(); // Put back the important kiosk properties

      accessTokens && jsDPZ.util.sessionStorage("accessTokens", accessTokens);
      refreshTokens && localStorage.setItem("refreshTokens", refreshTokens);
      kioskConfig && localStorage.setItem("kioskConfig", kioskConfig);
      chromeConfig && localStorage.setItem("chromeConfig", chromeConfig);
      kioskExperience && localStorage.setItem("kioskExperiences", kioskExperience); // If any open overlays are still open, close them.

      $(".js-closeButton").click();
    },
    resetSession: function resetSession(trigger, experienceRestart) {
      module.clearSessionData();
      module.setKillConfigItems();

      if (module.kioskExperience === "check-in" && experienceRestart) {
        module.experienceStartOver();
      } else {
        module.beginSession(dpz.market.primaryLanguageCode, trigger ? "&kiosk-reset-trigger=".concat(trigger) : "");
        if ($("body").hasClass("ada-kiosk")) $("body").removeClass("ada-kiosk");
      }
    },
    setupInactivityTimeout: function setupInactivityTimeout(forceRestart) {
      // Kick off inactivity timer
      module.restartInactivityTimeout({
        forceRestart: forceRestart
      }); // Bind any click or scroll event to restartInactivityTimeout
      // (debounce the scroll event to stop it from from firing a zillion times)

      $(document).on("scroll.kioskTimeout click.kioskTimeout keyup.kioskTimeout change.kioskTimeout", function debounceEvents() {
        var timeout;
        return function debounceTimeout() {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            module.restartInactivityTimeout();
          }, 250);
        };
      }());
    },
    restartInactivityTimeout: function restartInactivityTimeout(options) {
      var forceRestart = options && options.forceRestart || false;

      if (options && options.restartInterval) {
        inactivity.setTimeoutInterval(options.restartInterval);
      }

      module.clearInactivityTimeout();
      var kioskExperience = localStorage.getItem("kioskExperiences");
      var kioskAda = localStorage.getItem("kiosk-ada");
      var kioskLanguage = localStorage.getItem("kiosk-language");

      if ( // I'm a kiosk
      window.isKiosk && ( // AND one of these conditions
      // I have items in my cart OR I'm being forced to restart OR in ADA layout OR in a translated state
      module.cartHasItems() || forceRestart || kioskAda || kioskLanguage && kioskLanguage !== dpz.market.primaryLanguageCode || // OR I'm a kiosk that is in the store AND is also a check-in kiosk
      !module.isDelivery() && kioskExperience && kioskExperience === "check-in" || // OR I'm delivery AND I'm not on the entrees all page OR the pizza builder is open
      // OR I'm stand-alone ordering AND I'm not on the entrees all page OR the pizza builder is open
      window.location.hash.indexOf("/AllEntrees/") === -1 || $(".js-cardOverlay").is(":visible"))) {
        module.inactivityTimeout = setTimeout(function () {
          // Append container for special kiosk timeout overlay
          $("body").append('<div class="js-kioskInactivityTimeoutOverlay"></div>');
          simplr.view.mRender({
            name: "kiosk_inactivity_timeout_overlay",
            data: {
              remainingTime: 10
            },
            selector: ".js-kioskInactivityTimeoutOverlay"
          });
        }, inactivity.getTimeoutInterval());
      }
    },
    cartHasItems: function cartHasItems() {
      var orderDetails = jsDPZ.app.order.getOrder().data.Details;
      return orderDetails.Coupons.length > 0 || orderDetails.Variants.length > 0;
    },
    unbindInactivityTimeoutEvents: function unbindInactivityTimeoutEvents() {
      $(document).off(".kioskTimeout");
    },
    clearInactivityTimeout: function clearInactivityTimeout() {
      clearTimeout(module.inactivityTimeout);
    },
    completePayment: function completePayment(orderNumber) {
      var dfd = $.Deferred();
      module.clearInactivityTimeout();
      module.unbindInactivityTimeoutEvents();

      function getPollPaymentStatus() {
        return $.Deferred(function (promise) {
          if (module.isDelivery()) {
            jsDPZ.ajax.kioskPaymentStatus({
              data: JSON.stringify({
                orderNumber: orderNumber
              })
            }).then(function (data) {
              promise.resolve(data);
            }, function (data) {
              site.func.overlayToggle(true, "pin_pad_instructions", {}, {
                tryAgain: true,
                orderNumber: data.orderNumber
              });
            });
          } else {
            getECommerceId().then(function (data) {
              promise.resolve(data);
            }, function (jqXHR) {
              if (jqXHR.status !== 404) {
                module.restartInactivityTimeout({
                  forceRestart: true,
                  restartInterval: 5
                });
                site.func.overlayToggle(true, "pin_pad_instructions", {}, {
                  tryAgain: true,
                  orderNumber: site.data.lastOrder.Details.OrderID
                });
              }
            });
          }
        });
      }

      function getECommerceId() {
        return jsDPZ.ajax.getECommerceOrders({
          orderId: site.data.lastOrder.Details.OrderID
        });
      }

      function pollPaymentStatus() {
        var poller = setInterval(function () {
          getPollPaymentStatus().then(function (data) {
            var paymentResponse = window.isKiosk ? data.paymentStatus.value : data.Message;

            switch (paymentResponse) {
              case "SUCCESS":
              case "PaymentAuthorized":
                clearInterval(poller);
                clearTimeout(paymentTimeout);
                dfd.resolve();
                break;

              case "FAILED":
              case "PaymentFailed":
                clearInterval(poller);
                clearTimeout(paymentTimeout);
                site.func.overlayToggle(false);
                dfd.reject();
                break;

              default:
                break;
            }
          }, function (data) {
            clearInterval(poller);
            clearTimeout(paymentTimeout);
            dfd.reject();
            module.restartInactivityTimeout({
              forceRestart: true,
              restartInterval: 5
            });

            if (window.isKiosk) {
              site.func.overlayToggle(true, "pin_pad_instructions", {}, {
                tryAgain: true,
                orderNumber: data.orderNumber
              });
            }
          });
        }, 1000);
        var paymentTimeout = setTimeout(function () {
          clearInterval(poller);
          module.restartInactivityTimeout({
            forceRestart: true,
            restartInterval: 5
          });
          site.func.overlayToggle(true, "pin_pad_instructions", {}, {
            tryAgain: true,
            orderNumber: site.data.lastOrder.Details.OrderID
          });
        }, 95000);
        site.func.overlayToggle(true, "pin_pad_instructions", {}, {});
      }

      function getKioskPaymentRequest() {
        var orderObj = JSON.parse(sessionStorage.getItem("LastOrder"));

        if (window.isKiosk) {
          site.func.overlayToggle(true, "pin_pad_instructions", {}, {});
          return jsDPZ.ajax.orderKioskPaymentRequest({
            data: JSON.stringify({
              stationName: module.chromeConfig.data.paymentDeviceId,
              storeNumber: orderObj.Details.StoreID,
              storeOrderId: orderObj.Details.StoreOrderID.split("#")[1]
            })
          });
        }

        return jsDPZ.ajax.kioskPaymentRequest({
          data: JSON.stringify({
            orderId: orderNumber
          })
        });
      }

      getKioskPaymentRequest().then(function () {
        pollPaymentStatus();
      }, function (data) {
        dfd.reject();
        module.restartInactivityTimeout({
          forceRestart: true,
          restartInterval: 5
        });

        if (window.isKiosk) {
          site.func.overlayToggle(true, "pin_pad_instructions", {}, {
            tryAgain: true,
            orderNumber: data.orderNumber
          });
        }
      });
      return dfd;
    },
    destroySessionIfNotAuthorized: function destroySessionIfNotAuthorized(status) {
      if (window.isKiosk) {
        module.callWrapperApp({
          type: "experience/error/SEND",
          message: "Not Authorized",
          status: status,
          code: "Not Authorized",
          location: "can't log in, destroying session",
          misc: {
            isRecoverable: false
          }
        });
      }
    },
    updateOrderConfig: function updateOrderConfig(payments) {
      $.extend(true, jsDPZ, {
        config: {
          dataModel: {
            ORDER_REQUEST: {
              SourceOrganizationURI: "kiosk-order.dominos.com",
              PendingOrder: module.setPendingOrder(payments)
            }
          }
        }
      });
      return module;
    },
    setPendingOrder: function setPendingOrder(payments) {
      return payments.some(function (payment) {
        return payment.PendingOrder;
      });
    },
    couponAllowed: function couponAllowed(couponData) {
      return typeof couponData.Tags.Remove !== "undefined" ? couponData.Tags.Remove.toLowerCase() !== "kiosk" : true;
    },
    setSessionId: function setSessionId() {
      var config = dpz.kiosk.getConfig();
      var time = new Date().valueOf();
      sessionStorage.setItem("kioskSessionID", config.storeId + "-" + config.deviceId + "-" + time);
    },
    experienceStartOver: function experienceStartOver() {
      module.callWrapperApp({
        type: "experience/request/START_OVER"
      });
    },
    loadCheckinExperience: function loadCheckinExperience() {
      var url = envConfig === "localhost" ? "http://localhost.dominos.com:3000?combined" : "https://" + urlConfig.base + "/check-in/?combined";
      jsDPZ.util.oauth.removeTokens(jsDPZ.ajax.oAuthConfig.chromeKiosk.tokenKey);
      localStorage.removeItem("kioskConfig");
      window.location = url;
    },
    showCouponBanner: function showCouponBanner() {
      jsDPZ.app.order.getOrder().data.Details.Coupons.length === 0 ? $(".coupon-summary").remove() : simplr.view.mRender({
        name: "kiosk_coupon_banner",
        data: {},
        selector: ".js-kioskCouponComponent"
      });
    },
    getKioskDeliveryAddress: function getKioskDeliveryAddress() {
      var chromeBoxConfig = module.chromeConfig.data;
      var kioskConfig = this.getConfig();
      return {
        Type: "Hotel",
        Street: chromeBoxConfig && chromeBoxConfig.deliveryAddress ? chromeBoxConfig.deliveryAddress.streetAddress : kioskConfig.streetAddress,
        City: chromeBoxConfig && chromeBoxConfig.deliveryAddress ? chromeBoxConfig.deliveryAddress.city : kioskConfig.city,
        Region: chromeBoxConfig && chromeBoxConfig.deliveryAddress ? chromeBoxConfig.deliveryAddress.state : kioskConfig.state,
        PostalCode: chromeBoxConfig && chromeBoxConfig.deliveryAddress ? chromeBoxConfig.deliveryAddress.zip : kioskConfig.zip
      };
    },
    allEntreesPanels: function allEntreesPanels(BYOPizzaCode) {
      return [{
        divId: "entree-BuildYourOwn",
        anchorClass: "js-buildYourOwnPizza qa-BYO grid c-order-entree-buildyourown",
        href: "#!/product/".concat(BYOPizzaCode, "/builder/"),
        panelname: "epic",
        imgUrl: "/images/img/entree-page/build.png",
        imgUrlWidescreen: "/images/widescreen/S_PIZPX@2x.jpg",
        alt: "watch_the_pizza_of_your",
        title: "build_your_own_pizza",
        description: "watch_the_pizza_of_your",
        kioskGridSize: "1",
        widescreenGridSize: "1/2"
      }, {
        divId: "entree-Pizza",
        anchorClass: "qa-Specialty grid",
        href: "#!/section/Food/category/Pizza/",
        panelname: "specialtypizza",
        imgUrl: "/images/img/entree-page/specialty.png",
        imgUrlWidescreen: "/images/widescreen/S_PIZPV@2x.jpg",
        alt: "specialtypizza_alt",
        title: "specialtypizza_title",
        description: "specialtypizza_description",
        widescreenGridSize: "1/2"
      }, {
        divId: "entree-Pasta",
        anchorClass: "qa-Pasta grid",
        href: "#!/section/Food/category/Pasta/",
        panelname: "pasta",
        imgUrl: "/images/img/entree-page/pasta.png",
        imgUrlWidescreen: "/images/widescreen/S_PRIM@2x.jpg",
        alt: "pasta_alt",
        title: "pasta_title",
        description: "pasta_description",
        widescreenGridSize: "1/4"
      }, {
        divId: "entree-Sandwich",
        anchorClass: "qa-Sand grid",
        href: "#!/section/Food/category/Sandwich/",
        panelname: "sandwiches",
        imgUrl: "/images/img/entree-page/sandwiches.png",
        imgUrlWidescreen: "/images/widescreen/S_MEDV@2x.jpg",
        alt: "sandwiches_alt",
        title: "sandwiches_title",
        description: "sandwiches_description",
        widescreenGridSize: "1/4"
      }, {
        divId: "entree-Wings",
        anchorClass: "qa-Chick grid",
        href: "#!/section/Food/category/Wings/",
        panelname: "chicken",
        imgUrl: "/images/img/entree-page/chicken.png",
        imgUrlWidescreen: "/images/widescreen/S_BONEIN@2x.jpg",
        alt: "chicken_alt",
        title: "chicken_title",
        description: "chicken_description",
        widescreenGridSize: "1/4"
      }, {
        divId: "",
        anchorClass: "grid",
        href: "#!/section/Food/category/Bread/",
        panelname: "sidesdrinks",
        imgUrl: "/images/img/entree-page/sides.png",
        imgUrlWidescreen: "/images/widescreen/F_PARMT@2x.jpg",
        alt: "bread_alt",
        title: "bread_title",
        description: "bread_description",
        widescreenGridSize: "1/4"
      }, {
        divId: "",
        anchorClass: "grid",
        href: "#!/section/Food/category/GSalad/",
        panelname: "salad",
        imgUrl: "/images/img/products/minis/placeholder.jpg",
        imgUrlWidescreen: "/images/widescreen/F_GARDEN@2x.jpg",
        alt: "salad_alt",
        title: "salad_title",
        description: "salad_description",
        widescreenGridSize: "1/4"
      }, {
        divId: "",
        anchorClass: "qa-Drinks grid",
        href: "#!/section/Food/category/AllDrinks/",
        panelname: "drinks",
        imgUrl: "/images/img/entree-page/drinks.png",
        imgUrlWidescreen: "/images/widescreen/drinks@2x.jpg",
        alt: "drinks_alt",
        title: "drinks_title",
        description: "drinks_description",
        widescreenGridSize: "1/4"
      }, {
        divId: "",
        anchorClass: "qa-Dessert grid",
        href: "#!/section/Food/category/Dessert/",
        panelname: "desserts",
        imgUrl: "/images/img/entree-page/dessert.png",
        imgUrlWidescreen: "/images/widescreen/F_MRBRWNE@2x.jpg",
        alt: "desserts_alt",
        title: "desserts_title",
        description: "desserts_description",
        widescreenGridSize: "1/4"
      }, {
        divId: "",
        anchorClass: "grid",
        href: "#!/section/Food/category/Sides/",
        panelname: "extras",
        imgUrl: "/images/img/products/minis/placeholder.jpg",
        imgUrlWidescreen: "/images/widescreen/F_SIDRED@2x.jpg",
        alt: "extras_alt",
        title: "extras_title",
        description: "extras_description",
        widescreenGridSize: "1/4"
      }];
    }
  }; // Extend and initialize the module

  window.dpz = window.dpz || {};
  window.dpz.kiosk = module;
  if (window.isKiosk) module.init();
  return module;
});/*
    Module that will be used by kiosk to keep track of where in the flow it is and manage the timeout interval
*/
define("dpz.inactivityTimeout", [], function () {
  var defaultTimeout = 30;
  var currentTimeout;

  var setTimeoutInterval = function setTimeoutInterval(interval) {
    currentTimeout = interval;
  };

  var getTimeoutInterval = function getTimeoutInterval() {
    return (currentTimeout || defaultTimeout) * 1000;
  };

  return {
    getTimeoutInterval: getTimeoutInterval,
    setTimeoutInterval: setTimeoutInterval
  };
});var _excluded = ["authHeader", "rememberMeAuthHeader"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

define("dpz.config", ["dpz.dayjsconfig", "marketconfig/dpz.app", "dpz.kiosk", urlConfig.assets + "/js/external/config.js?v=" + new Date().getTime() //"dpz.launchDarkly!external/ldclient.min" BEGIN CA Change - DNP-2088 disable darkly calls
], function (dayjsconfig, marketConfig, kiosk, killConfigGlobalData //, ld BEGIN CA turn off darkly
) {
  var app = {};
  var module = {};
  window.killConfig.globalData = $.extend({}, killConfigGlobalData, kiosk.killConfigOverrides);

  window.killConfig.setGlobalData = function () {
    window.killConfig.globalData = $.extend({}, killConfigGlobalData, kiosk.killConfigOverrides);
  };

  window.killConfig.isActive = function (key) {
    return !!(killConfig.globalData[key] && killConfig.localData[key] && marketConfig.killConfig[key]);
  };

  var isMarketEnabled = function isMarketEnabled(flag) {
    // BEGIN CA - DNP-1951
    // Turn off LaunchDarkly call for Canada (using a new killConfig switch)
    //  until we are certain the back-end is implemented for CA
    // ********* NOTE *************
    // BEGIN CA Change - DNP-2088
    // removing calls from darkly
    // ldClient.getVariationFlag() will not be called so long caLaunchDarkly killConfig is set to false
    // ldClient import has been commented out above
    if (marketConfig.killConfig["caLaunchDarkly"]) {
      return ldClient.getVariationFlag(flag, !!(killConfig.globalData[flag] && marketConfig.killConfig[flag]));
    } else {
      return !!(killConfig.globalData[flag] && marketConfig.killConfig[flag]);
    }
  }; // END CA


  window.killConfig.isMarketEnabled = isMarketEnabled;

  function getProperty(obj, prop) {
    if (Object.prototype.toString.call(obj) === "[object Object]") return Object.prototype.hasOwnProperty.call(obj, prop) ? obj[prop] : null;
    return null;
  }

  function registerMarketJSExtensions(extensionsConfig) {
    if (!extensionsConfig) {
      return false;
    }

    if (extensionsConfig.extensions && $.isArray(extensionsConfig.extensions)) {
      $.each(extensionsConfig.extensions, function (i, extension) {
        if (extension.route) {
          $(window).on("hashchange", function () {
            if (window.location.hash === extension.route) {
              require(extension.modules);
            }
          });
        } else {
          require(extension.modules);
        }
      });
    }

    return true;
  }

  var contentPages = {
    pages: null,
    init: function init() {
      // Adding support for case insensitive page names.
      this.pages = Object.entries(module.getMarketProperty("contentPages").pages).reduce( // Makes the page key, ie: /giftCard, case insensitive
      function (pages, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            pageName = _ref2[0],
            page = _ref2[1];

        pages[pageName.toLowerCase()] = page;
        return pages;
      }, {});
    }
  };
  $.extend(module, {
    isMarketEnabled: isMarketEnabled,
    loadConfig: function loadConfig(options) {
      if (!options.marketconfig) {
        throw new Error("No market configuration defined.");
      }

      app.marketconfig = options.marketconfig; // Load custom modules from the market's js/modules directory.

      registerMarketJSExtensions(options.marketconfig.jsExtensions); // Configure dayjs with market's month/week translations.

      dayjsconfig(marketConfig);
      jsDPZ.config.app.setConfig(_objectSpread(_objectSpread({}, dpz.market), marketConfig));

      var _marketConfig$profile = marketConfig.profile.oauth,
          authHeader = _marketConfig$profile.authHeader,
          rememberMeAuthHeader = _marketConfig$profile.rememberMeAuthHeader,
          oauth = _objectWithoutProperties(_marketConfig$profile, _excluded);

      $.extend(true, jsDPZ, {
        ajax: {
          oAuthConfig: {
            customer: _objectSpread(_objectSpread({}, oauth), {}, {
              authHeader: btoa(authHeader),
              rememberMeAuthHeader: btoa(rememberMeAuthHeader)
            })
          }
        }
      });
      return true;
    },
    getNavigation: function getNavigation(pageName) {
      var page = module.getMarketProperty(pageName);
      return page ? module.killConfigStrip(page.mainNavigation) : [];
    },
    getSubNavigation: function getSubNavigation(pageName) {
      var page = module.getMarketProperty(pageName);
      return page ? module.killConfigStrip(page.subNavigation) : [];
    },
    killConfigStrip: function killConfigStrip(nav) {
      nav = nav || [];
      return nav.filter(function (value) {
        if (value.listClass && value.listClass.match(/killConfig-/)) {
          return killConfig.isMarketEnabled(value.listClass.split("killConfig-")[1]);
        } else if (value.anchorClass && value.anchorClass.match(/killConfig-/)) {
          return killConfig.isMarketEnabled(value.anchorClass.split("killConfig-")[1]); // homepage tiles use the killConfig property and can pass either an array
          // or a string of killConfig keys
        } else if (value.killConfig) {
          if ($.isArray(value.killConfig)) {
            return value.killConfig.reduce(function (isActive, killSwitch) {
              return isActive && killConfig.isMarketEnabled(killSwitch);
            }, true);
          }

          return killConfig.isMarketEnabled(value.killConfig);
        }

        return true;
      });
    },
    killConfigActive: function killConfigActive(property) {
      if (app.marketconfig.killConfig[property]) {
        return true;
      }

      return false;
    },
    getMarketProperty: function getMarketProperty(prop) {
      var val = getProperty(app.marketconfig, prop);
      return val;
    },
    getContentPage: function getContentPage(pageName) {
      !contentPages.pages && contentPages.init();
      return contentPages.pages[pageName.toLowerCase()];
    },
    getIsProduction: function getIsProduction() {
      return !!envConfig.match(/\bprod/);
    }
  });
  module.loadConfig({
    marketconfig: marketConfig
  });
  return module;
});function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

define("dependencies", ["simplr", "dpz.config", "dpz.kiosk", "dpz.hybrid", "dpz.loyalty.constants", "paymentmodules/dpz.globalPayments.constants", "wallets/dpz.wallets.constants", "otpVerification/dpz.otpVerification.constants", // BEGIN CA Change
"marketjs/modules/ca.tools" // END CA
], function (simplr, config, kiosk, _ref, _ref2, _ref3, _ref4, _ref5, // BEGIN CA Change
caTools // END CA Change
) {
  var isHybridActive = _ref.isActive;
  var CAMPAIGN_ERROR_TOPIC = _ref2.CAMPAIGN_ERROR_TOPIC;
  var paymentTopics = _ref3.topics,
      PAYMENT_ERROR_TAG = _ref3.ERROR_TAG;
  var walletTopics = _ref4.topics,
      WALLET_ERROR_TAG = _ref4.ERROR_TAG;
  var otpVerificationTopics = _ref5.topics,
      OTP_ERROR_TAG = _ref5.ERROR_TAG;
  var hostPathString = location.protocol + "//" + location.host;
  var getRayGunTags;
  var getRaygunInfo;

  function googleConversionTag(conversionId, conversionLabel) {
    $("head").append('<img height="1" width="1" style="border-style:none;position:absolute;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/' + conversionId + "/?value=0&amp;label=" + conversionLabel + '&amp;guid=ON"/>');
  } // set Schema


  window.killConfig.loadDependency({
    key: "schema",
    appendScriptTags: {
      jsonld: [JSON.stringify(config.getMarketProperty("schema").organization)]
    }
  });

  if (killConfig.isMarketEnabled("googleMaps")) {
    define("googleMapsDependency", function () {
      var googleMapsApiLoaded = $.Deferred();

      window.dpzGoogleMapsLoaded = function () {
        // Google maps Loaded!
        googleMapsApiLoaded.resolve();
      };

      killConfig.loadDependency({
        key: "googleMaps",
        // Load the Google Maps API, along with the Places library for use of the lookahead address searchbox.
        appendScriptTags: {
          js: [urlConfig.assets + "/js/external/googlemaps.js"]
        }
      });
      return googleMapsApiLoaded;
    });
  }
  /* BEGIN CA - bingMaps */


  if (killConfig.isMarketEnabled("caBingMaps")) {
    define("bingMapsDependency", function () {
      var bingMapsApiLoaded = $.Deferred();

      window.dpzBingMapsLoaded = function () {
        // Bing maps Loaded!
        bingMapsApiLoaded.resolve();
      };

      killConfig.loadDependency({
        key: "bingMaps",
        // Load the Bing Maps API, along with the Places library for use of the lookahead address searchbox.
        appendScriptTags: {
          js: [urlConfig.assets + "/js/external/bingMaps.js"]
        }
      });
      return bingMapsApiLoaded;
    });
  }
  /* END CA - bingMaps */

  /* BEGIN CA - CA Future Order */


  if (killConfig.isMarketEnabled("caFutureOrder")) {
    killConfig.loadDependency({
      key: "caFutureOrder",
      appendScriptTags: {
        js: [urlConfig.assets + "/js/external/jsrsasign-latest-all-min.js"]
      }
    });
  }
  /* END CA - CA FutureOrder */


  if ("Raygun" in window) {
    (function () {
      /* eslint-disable no-mixed-operators */
      var getRayGunTags = function getRayGunTags() {
        return [!window.utag_data && "UDO not ready", window.utag_data && window.utag_data.market_name || dpz && dpz.market && dpz.market.marketName, window.utag_data && window.utag_data.market_language_name || dpz && dpz.market && dpz.market.activeLanguageName, "".concat(window.utag_data && window.utag_data.market_code || dpz && dpz.market && dpz.market.marketCode, "/_").concat(window.utag_data && window.utag_data.market_language_code || dpz && dpz.market && dpz.market.activeLanguageCode), kiosk.isActive ? "kiosk" : window.utag_data && window.utag_data.device_type || site && site.func && site.func.isHandheld && (site.func.isHandheld() ? "handheld" : "desktop"), envConfig];
      };

      var getRaygunInfo = function getRaygunInfo() {
        return {
          market_code: window.utag_data && window.utag_data.market_code || dpz && dpz.market && dpz.market.marketCode,
          market_language_code: window.utag_data && window.utag_data.market_language_code || dpz && dpz.market && dpz.market.activeLanguageCode,
          market_language_name: window.utag_data && window.utag_data.market_language_name || dpz && dpz.market && dpz.market.activeLanguageName,
          market_name: window.utag_data && window.utag_data.market_name || dpz && dpz.market && dpz.market.marketName,
          page_name: window.utag_data && window.utag_data.page_name || document.title,
          ab_test: window.utag_data && window.utag_data.ab_test,
          device_type: window.utag_data && window.utag_data.device_type || site && site.func && site.func.isHandheld && (site.func.isHandheld() ? "handheld" : "desktop")
        };
      };

      var CID = site.storage.load("CID") || jsDPZ.app.customer.getCustomer().data.CustomerID;
      rg4js("withTags", getRayGunTags);
      rg4js("withCustomData", getRaygunInfo);
      rg4js("setVersion", dpz.version.version + ".0");

      if (CID) {
        rg4js("setUser", {
          identifier: CID,
          isAnonymous: false
        });
      }

      jsDPZ.topic("generic.preact.error").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["generic.preact.error"]
        }, data));
      });
      ["customerLogin.captcha.shown", "customerLogin.captcha.error", "customerLogin.captcha.success", "customerLogin.captcha.success.loginSuccess", "customerLogin.captcha.success.loginFailed", "customerLogin.captcha.loadFailed.timeout", "customerLogin.captcha.loadFailed.undefined"].forEach(function (code) {
        jsDPZ.topic(code).subscribe(function (data) {
          rg4js("send", $.extend({
            tags: [code]
          }, {
            error: new Error(code),
            customData: {}
          }));

          try {
            dpz.utag.fire.link(null, {
              event_name: code,
              event_action: "log"
            });
          } catch (_unused) {}
        });
      });

      window.customerLoginCaptchaError = function () {
        jsDPZ.topic("customerLogin.captcha.error").publish({});
      };

      $(document).on("customerLogin.success", function (evt, data) {
        rg4js("setUser", {
          identifier: data.CustomerID,
          isAnonymous: false
        });
      });
      $(document).on("customerLogout", function () {
        Raygun.resetAnonymousUser();
      });
      jsDPZ.topic("fetchOrders.error").subscribe(function (jqXHR) {
        rg4js("send", $.extend({
          tags: ["fetchOrders.error"]
        }, {
          error: new Error("fetchOrders.error"),
          customData: jqXHR
        }));
      });
      jsDPZ.topic("oauth.error").subscribe(function (jqXHR) {
        rg4js("send", $.extend({
          tags: ["oauth.error"]
        }, {
          error: new Error("oauth error"),
          customData: jqXHR
        }));
      });
      jsDPZ.topic("oauth.error").subscribe(function (_ref6) {
        var error = _ref6.error,
            xhr = _ref6.xhr;
        rg4js("send", $.extend({
          tags: ["oauth.error", "oauth.error.missing-params"]
        }, {
          error: error,
          customData: xhr
        }));
      });
      jsDPZ.topic("preact.override.error").subscribe(function (error) {
        rg4js("send", $.extend({
          tags: ["preact.override.error"]
        }, error));
      });
      jsDPZ.topic("wam.error").subscribe(function (error) {
        rg4js("send", $.extend({
          tags: ["wam.error"]
        }, error));
      });
      jsDPZ.topic("adyen2.error").subscribe(function (error) {
        rg4js("send", $.extend({
          tags: ["adyen2.error"]
        }, error));
      });
      jsDPZ.topic("hbs.partial.error").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["hbs.partial.error"]
        }, data));
      });
      jsDPZ.topic("whenso.error").subscribe(function (error) {
        rg4js("send", $.extend({
          tags: ["whenso.error"]
        }, error));
      });
      jsDPZ.topic("hybrid.geolocation.error").subscribe(function (error) {
        rg4js("send", $.extend({
          tags: ["hybrid", "hybrid.geolocation.error"]
        }, error));
      }); //START ECOM-16453

      jsDPZ.topic("tokenization.failure").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["tokenization.failure"]
        }, data));
      });
      jsDPZ.topic("launchdarkly.failure").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["launchdarkly.failure"]
        }, data));
      });
      jsDPZ.topic("tokenResponse4XX.failure").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["tokenResponse4XX.failure"]
        }, data));
      }); //END ECOM-16453

      jsDPZ.topic("gpm.moyasar.error").subscribe(function (_ref7) {
        var _ref7$tags = _ref7.tags,
            tags = _ref7$tags === void 0 ? [] : _ref7$tags,
            error = _ref7.error,
            _ref7$transactionId = _ref7.transactionId,
            transactionId = _ref7$transactionId === void 0 ? "" : _ref7$transactionId;
        rg4js("send", $.extend({
          tags: ["gpm.moyasar.error"].concat(_toConsumableArray(tags)),
          customData: {
            transactionId: transactionId
          }
        }, error));
      }); //START APPLE PAY

      jsDPZ.topic("validate.wallet.failure").subscribe(function (error) {
        rg4js("send", $.extend({
          tags: ["validate.wallet.failure"]
        }, error));
      });
      jsDPZ.topic("apple.pay.button.component.error").subscribe(function (error) {
        rg4js("send", $.extend({
          tags: ["apple.pay.button.component.error"]
        }, error));
      }); //END APPLE PAY

      jsDPZ.topic("order.place.error").subscribe(function (_ref8) {
        var type = _ref8.type,
            error = _ref8.error;
        return rg4js("send", $.extend({
          tags: ["order.place.error"]
        }, error));
      });
      jsDPZ.topic("datagran.error").subscribe(function (_ref9) {
        var type = _ref9.type,
            error = _ref9.error;
        return rg4js("send", $.extend({
          tags: ["datagran.error", "datagran.".concat(type, ".error")]
        }, error));
      });
      jsDPZ.topic("gpm.transaction_status_error.IOLO-15696").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["gpm.transaction_status_error.IOLO-15696"]
        }, data));
      });
      jsDPZ.topic("gpm.directory_lookup_error").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["gpm.directory_lookup_error"]
        }, data));
      });
      jsDPZ.topic("gpm.adyen_polling_time_excessive").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["gpm.adyen_polling_time_excessive"]
        }, data));
      });
      jsDPZ.topic("gpm.adyen_polling_aborted").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["gpm.adyen_polling_aborted"]
        }, data));
      });
      jsDPZ.topic("utag.variant_undefined.IOLO-15696").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["utag.variant_undefined.IOLO-15696"]
        }, data));
      });
      jsDPZ.topic("kiosk.error").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["kiosk.error", dpz.kiosk.getConfig().deviceId]
        }, data));
      });
      jsDPZ.topic("hotspots.map.error").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["hotspots.map.error"]
        }, data));
      });
      jsDPZ.topic("hotspots.geolocation.error").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["hotspots.geolocation.error"]
        }, data));
      });
      jsDPZ.topic("upsell-service.fetch.error").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["upsell-service.fetch.error"]
        }, data));
      });
      jsDPZ.topic("gpm.onsubmitpromise_failed").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["gpm.onsubmitpromise_failed"]
        }, data));
      });
      jsDPZ.topic("gpm.listproviders_endpoint_failed").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["gpm.listproviders_endpoint_failed"]
        }, data));
      });
      [{
        topic: paymentTopics.LOG_ERROR,
        tag: PAYMENT_ERROR_TAG
      }, {
        topic: walletTopics.LOG_ERROR,
        tag: WALLET_ERROR_TAG
      }, {
        topic: otpVerificationTopics.LOG_ERROR,
        tag: OTP_ERROR_TAG
      }].forEach(function (_ref10) {
        var topic = _ref10.topic,
            tag = _ref10.tag;
        jsDPZ.topic(topic).subscribe(function () {
          var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              _ref11$tags = _ref11.tags,
              tags = _ref11$tags === void 0 ? [] : _ref11$tags,
              error = _ref11.error;

          rg4js("send", $.extend(true, {}, error, {
            tags: [tag].concat(_toConsumableArray(tags))
          }));
        });
      });

      var subscribeToLaunchDarklyError = function subscribeToLaunchDarklyError(reason) {
        var logLaunchDarklyError = function logLaunchDarklyError(data) {
          return rg4js("send", $.extend({
            tags: [reason]
          }, data));
        };

        jsDPZ.topic(reason).subscribe(logLaunchDarklyError);
      };

      ["launchdarkly.initialization_error", "launchdarkly.identify_error"].forEach(subscribeToLaunchDarklyError);
      jsDPZ.topic("auth-proxy.captcha.log").subscribe(function (_ref12) {
        var error = _ref12.error,
            _ref12$tags = _ref12.tags,
            tags = _ref12$tags === void 0 ? [] : _ref12$tags,
            _ref12$customData = _ref12.customData,
            customData = _ref12$customData === void 0 ? {} : _ref12$customData;
        rg4js("send", $.extend({
          error: error,
          tags: ["auth-proxy.captcha"].concat(_toConsumableArray(tags)),
          customData: customData
        }));
      });
      jsDPZ.topic("payments.node.missing").subscribe(function (data) {
        rg4js("send", $.extend({
          tags: ["payments.node.missing"]
        }, data));
      });
      jsDPZ.topic("openpay.groups.token.failure").subscribe(function (data) {
        return rg4js("send", $.extend({
          tags: ["openpay.groups.token.failure"]
        }, data));
      });
      jsDPZ.topic(CAMPAIGN_ERROR_TOPIC).subscribe(function () {
        var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref13$tags = _ref13.tags,
            tags = _ref13$tags === void 0 ? [] : _ref13$tags,
            error = _ref13.error;

        return rg4js("send", $.extend(true, {}, error, {
          tags: [CAMPAIGN_ERROR_TOPIC].concat(_toConsumableArray(tags))
        }));
      });
    })();
    /* eslint-enable */

  }

  if (jsDPZ.app.customer.getCustomer().data.Session.btnRef) {
    window.ButtonWebConfig = {
      applicationId: "app-38b2d89896856ea1"
    };

    (function (u, s, e, b, t, n) {
      u["__bttnio"] = b;

      u[b] = u[b] || function () {
        (u[b].q = u[b].q || []).push(arguments);
      };

      t = s.createElement(e);
      n = s.getElementsByTagName(e)[0];
      t.async = 1;
      t.src = "https://web.btncdn.com/v1/button.js";
      n.parentNode.insertBefore(t, n);
    })(window, document, "script", "bttnio");
  } //Banner Apps config for GOLO Markets, handle in a killswitch. To add new markets add the ID in the ThirdParty.json file inside of the market.


  if (killConfig.isMarketEnabled("bannerApps") && !isHybridActive) {
    // Set the market's meta data
    var smartbannerConfig = config.getMarketProperty("thirdParty").smartbanner;
    var metaCreated = $.map(smartbannerConfig, function (app) {
      if (app.store && app.id) {
        var tag = document.createElement("meta");
        tag.name = app.store;
        tag.content = app.id;
        return document.head.appendChild(tag);
      }

      return null;
    }).some(function (element) {
      return element;
    }); // We only trigger the smartbanner if we have at least one meta configuration for the smartbanner

    if (metaCreated) {
      killConfig.loadDependency({
        key: "smartbanner",
        appendScriptTags: {
          css: [urlConfig.assets + "/css/smartbanner.css"]
        }
      });

      require(["external/jquery.smartbanner", "marketconfig/dpz.lang.home"], function (smartbanner, homeStrings) {
        $.smartbanner(_objectSpread({
          title: dpz.template.translate("home.smartbanner_title", null, homeStrings),
          // What the title of the app should be in the banner (defaults to <title>)
          author: dpz.template.translate("home.smartbanner_host", null, homeStrings),
          // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
          price: dpz.template.translate("home.smartbanner_price", null, homeStrings),
          // Price of the app
          appStoreLanguage: dpz.market.marketCode || "US",
          // Market code for App Store
          inAppStore: dpz.template.translate("home.smartbanner_store_apple", null, homeStrings),
          // Text of price for iOS
          inGooglePlay: dpz.template.translate("home.smartbanner_store_google", null, homeStrings),
          // Text of price for Android
          inAmazonAppStore: dpz.template.translate("home.smartbanner_store_amazon", null, homeStrings),
          // Text of price for Amazon
          inWindowsStore: dpz.template.translate("home.smartbanner_store_windows", null, homeStrings),
          // Text of price for Windows
          GooglePlayParams: null,
          // Aditional parameters for the market
          icon: null,
          // The URL of the icon (defaults to <meta name="apple-touch-icon">)
          url: null,
          // The URL for the button. Keep null if you want the button to link to the app store.
          button: dpz.template.translate("home.smartbanner_cta", null, homeStrings),
          // Text for the install button
          scale: "auto",
          // Scale based on viewport size (set to 1 to disable)
          speedIn: 300,
          // Show animation speed of the banner
          speedOut: 400,
          // Close animation speed of the banner
          daysHidden: 15,
          // Duration to hide the banner after being closed (0 = always show banner)
          daysReminder: 90,
          // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
          force: null,
          // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
          hideOnInstall: true,
          // Hide the banner after "VIEW" is clicked.
          layer: false,
          // Display as overlay layer or slide down the page
          iOSUniversalApp: true,
          // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
          appendToSelector: "body",
          //Append the banner to a specific selector
          onInstall: function onInstall() {},
          onClose: function onClose() {},
          dynamicMeta: true
        }, config.getMarketProperty("thirdParty").smartbanner));
      });
    }
  } //Recaptcha V2


  if (!site.isHomepage && killConfig.isMarketEnabled("recaptchaV2") && !killConfig.isMarketEnabled("2f37ef94-e93d-466d-883e-fd7ee8c51ebd")) {
    //Creating global scope pointer because google does not allow periods in callback name.
    window.dpzRecaptchaReady = dpz.recaptcha.jsLoaded;
    killConfig.loadDependency({
      key: "recaptchaV2",
      appendScriptTags: {
        js: ["//www.google.com/recaptcha/api.js?onload=dpzRecaptchaReady&render=explicit"]
      }
    });
  } //Google Analytics


  if (killConfig.isActive("googleAnalytics")) {
    $(document).one("main.footer.rendered", function () {
      window._gaq = window._gaq || [];
      simplr.trigger.mAddServices({
        "Google Analytics": {
          data: {
            environmentIDs: dpz.market.marketConfig.thirdParty.googleAnalytics
          },
          onLoad: function onLoad(data) {
            if (Array.isArray(this.data.environmentIDs[data.envID])) {
              this.data.environmentIDs[data.envID].forEach(function (id) {
                window._gaq.push(["_setAccount", id], ["_setDomainName", window.location.hostname], ["_setAllowHash", false]);
              });
            } else {
              window._gaq.push(["_setAccount", this.data.environmentIDs[data.envID]], ["_setDomainName", window.location.hostname], ["_setAllowHash", false]);
            }

            return this.data.environmentIDs[data.envID];
          },
          onPage: function onPage(data) {
            var fullPath = (data.path + (dpz.util.isEmpty(data.route.url) ? "" : "#") + data.route.url).replace(hostPathString, ""); //pull in campaign params from route here

            if (site.storage.load("dpz_route_url") != null) {
              window._gaq.push(["_set", "campaignParams", site.storage.load("dpz_route_url").substring(1)]);

              site.storage.remove("dpz_route_url");
            } // ['_setCustomVar', slot, 'CustomVar Name', 'CustomVar Value', 'Scope (3 is page-level)']


            window._gaq.push(["_setCustomVar", 1, "BrowserWidth", site.func.getCurrentBreakpoint() || "desktop", 3]);

            if (jsDPZ.app.order.getOrder().data.Details.StoreID) {
              window._gaq.push(["_setCustomVar", 2, "Store", jsDPZ.app.order.getOrder().data.Details.StoreID, 3]);
            } // On hybrid apps, we send if it's an iOSApp or AndroidApp


            if (dpz.hybrid && dpz.hybrid.isActive) {
              window._gaq.push(["_setCustomVar", 3, "nativeApp", dpz.hybrid.getAnalyticsVariable(), 1]);
            }

            if (killConfig.isMarketEnabled("locatorStoreList")) {
              window._gaq.push(["_setCustomVar", 4, "storeSearch", "storeSearchExperience", 1]);

              window._gaq.push(["_setCustomVar", 5, "storeList", "storeListExperience", 1]);
            }

            window._gaq.push(["_trackPageview", fullPath]);

            return fullPath;
          },
          onEvent: function onEvent(data) {
            var tmpData = $.extend(true, {}, data);
            var eventData = {
              category: "",
              action: "",
              label: ""
            };
            eventData.label = tmpData.breadcrumb.pop();
            eventData.action = tmpData.breadcrumb.pop();
            eventData.category = tmpData.breadcrumb.join("_");

            window._gaq.push(["_setCustomVar", 1, "BrowserWidth", site.func.getCurrentBreakpoint() || "desktop", 3]);

            if (jsDPZ.app.order.getOrder().data.Details.StoreID) {
              window._gaq.push(["_setCustomVar", 2, "Store", jsDPZ.app.order.getOrder().data.Details.StoreID, 3]);
            }

            window._gaq.push(["_trackEvent", eventData.category, eventData.action, eventData.label, eventData.value]);

            return eventData;
          },
          onTransaction: function onTransaction(data) {
            //increment transaction delay
            var transactionPromise = $.Deferred();
            site.data.transactionRecords.push(transactionPromise);
            data = data.Details;
            var orderObj = {
              order: {},
              products: []
            };
            $.extend(orderObj.order, {
              OrderID: data.StoreOrderID + "#" + data.StoreID,
              StoreID: data.StoreID,
              Total: data.Amounts.Customer,
              Tax: data.Amounts.Tax,
              Delivery: data.Amounts.Surcharge
            });

            window._gaq.push(["_addTrans", orderObj.order.OrderID, orderObj.order.StoreID, orderObj.order.Total, orderObj.order.Tax, orderObj.order.Delivery]);

            $.each(data.Variants, function (i, product) {
              var productCode = jsDPZ.util.htmlUnEncode(product.Code);
              var vO = jsDPZ.app.catalog.getCatalog().getVariant(productCode).data;
              var categoryCode = jsDPZ.app.catalog.getCatalog().getProduct(jsDPZ.app.catalog.getCatalog().getVariant(productCode).data.ProductCode.split("/")[0]).data.ProductType;
              var productObj = {
                ProductCode: productCode,
                ProductDescription: vO.Name,
                CategoryCode: categoryCode,
                Price: vO.Price,
                Quantity: product.Qty
              };
              orderObj.products.push(productObj);

              window._gaq.push(["_addItem", orderObj.order.OrderID, productObj.ProductCode, productObj.ProductDescription, productObj.CategoryCode, productObj.Price, productObj.Quantity]);
            });

            window._gaq.push(["_set", "currencyCode", config.getMarketProperty("thirdParty").googleAnalyticsCurrencyCode]);

            window._gaq.push(["_trackTrans"], function () {
              transactionPromise.resolve();
            });

            return orderObj;
          }
        }
      });

      _gaq.push(function () {
        $(document).trigger("googleAnalytics.loaded");
      });

      killConfig.loadDependency({
        key: "googleAnalytics",
        appendScriptTags: {
          js: [(document.location.protocol == "https:" ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js"]
        }
      });
    });
  } // Google Analytics Content Experiments


  if (killConfig.isActive("googleAnalyticsContentExperiments")) {
    (function () {
      var environmentIDs = dpz.market.marketConfig.thirdParty.googleAnalyticsContentExperiments; // Possible values for 'utmx_combination': 0 - Control Group, 1 - Test Group, undefined - not in experiment

      function utmx_section() {}

      window.utmx = undefined;

      (function () {
        var k = environmentIDs[envConfig],
            d = document,
            l = d.location,
            c = d.cookie;
        if (l.search.indexOf("utm_expid=" + k) > 0) return;

        function f(n) {
          if (c) {
            var i = c.indexOf(n + "=");

            if (i > -1) {
              var j = c.indexOf(";", i);
              return escape(c.substring(i + n.length + 1, j < 0 ? c.length : j));
            }
          }
        }

        var x = f("__utmx"),
            xx = f("__utmxx"),
            h = l.hash;
        $("head").append('<script src="http' + (l.protocol == "https:" ? "s://ssl" : "://www") + ".google-analytics.com/ga_exp.js?" + "utmxkey=" + k + "&utmx=" + (x || "") + "&utmxx=" + (xx || "") + "&utmxtime=" + new Date().valueOf() + (h ? "&utmxhash=" + escape(h.substr(1)) : "") + '" type="text/javascript" charset="utf-8"></script>');
      })();

      var utmxInt = setInterval(function () {
        if (utmx) {
          window.utmx_combination = utmx("combination");
          clearInterval(utmxInt);
        }
      }, 100);
    })();
  }

  if (killConfig.isActive("googleConversionHomepage") || killConfig.isActive("googleConversionConfirmationPage") || killConfig.isActive("googleTabletAccountTag") || killConfig.isActive("googleConversionStoreLocator")) {
    var gConvConfig = dpz.market.marketConfig.thirdParty.googleConversion;
  } // Google Conversion Homepage


  if (killConfig.isActive("googleConversionHomepage")) {
    googleConversionTag(gConvConfig.googleConversionHomepage.conversionId, gConvConfig.googleConversionHomepage.conversionLabel);
  } //Google Conversion Confirmation Page


  if (killConfig.isActive("googleConversionConfirmationPage")) {
    googleConversionTag(gConvConfig.googleConversionConfirmationPage.conversionId, gConvConfig.googleConversionConfirmationPage.conversionLabel);
  }

  if (killConfig.isActive("googleTabletAccountTag")) {
    googleConversionTag(gConvConfig.googleTabletAccountTag.conversionId, gConvConfig.googleTabletAccountTag.conversionLabel);
  } // Google Mobile Conversion on the locator page


  if (killConfig.isActive("googleConversionStoreLocator")) {
    window.goog_snippet_vars = function () {
      var w = window;
      w.google_conversion_id = gConvConfig.googleConversionStoreLocator.conversionId;
      w.google_conversion_label = gConvConfig.googleConversionStoreLocator.conversionLabel;
      w.google_conversion_value = 1.0;
      w.google_remarketing_only = false;
    }; // DO NOT CHANGE THE CODE BELOW.


    window.goog_report_conversion = function (url) {
      goog_snippet_vars();
      window.google_conversion_format = "3";
      window.google_is_call = true;
      var opt = new Object();

      opt.onload_callback = function () {
        if (typeof url !== "undefined") {
          window.location = url;
        }
      };

      var conv_handler = window.google_trackConversion;

      if (typeof conv_handler === "function") {
        conv_handler(opt);
      }
    };
  } // Twitter Follow


  if (killConfig.isActive("twitterFollow") && !site.func.isHandheld()) {
    killConfig.loadDependency({
      key: "twitterFollow",
      append: '<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>'
    });
  } // Facebook Like


  if (killConfig.isActive("facebookLike") && !site.func.isHandheld()) {
    killConfig.loadDependency({
      key: "facebookLike",
      append: '<div id="fb-root"></div><script>(function(d,s,id){var js,fjs = d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>'
    });
  } // Tracker's Facebook Share Functionality


  if (killConfig.isActive("trackerFacebookShare")) {
    killConfig.loadDependency({
      key: "trackerFacebookShare",
      append: "<script>window.fbAsyncInit = function() {FB.init({appId:'374891579236861',status:true,cookie:true,xfbml:true});};(function(d, debug){var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];if (d.getElementById(id)) {return;}js = d.createElement('script'); js.id = id; js.async = true;js.src = '//connect.facebook.net/en_US/all' + (debug ? '/debug' : '') + '.js';ref.parentNode.insertBefore(js, ref);}(document, false));</script>"
    });
  }

  if (killConfig.isMarketEnabled("2f37ef94-e93d-466d-883e-fd7ee8c51ebd") && jsDPZ.util.empty(window.grecaptcha)) {
    // BEGIN CA Change
    caTools.setRecaptchaV3Key(); // END CA Change

    jsDPZ.topic("auth-proxy.captcha.log").publish({
      error: new Error("auth-proxy.load.grecaptcha.retry")
    });
    var api = document.createElement("script");
    api.src = "//www.google.com/recaptcha/api.js?retry&render=".concat(dpz.market.marketConfig.thirdParty.recaptcha.v3, "&logging=true");

    api.onerror = function () {
      jsDPZ.topic("auth-proxy.captcha.log").publish({
        error: new Error("auth-proxy.load.grecaptcha.retry.failed")
      });
    };

    api.onload = function () {
      jsDPZ.topic("auth-proxy.captcha.log").publish({
        error: new Error("auth-proxy.load.grecaptcha.retry.success")
      });
    };

    document.body.append(api);
  }
});"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! Start simplr v1.9.0 2019-31-10 */
define("simplr", [], function () {
  var simplr = {
    config: {
      Data: {
        ConsoleActive: false
      },
      mToggleConsole: function mToggleConsole(on) {
        $("#_simplr_core_console").remove();
        simplr.config.Data.ConsoleActive = false;

        if (on) {
          try {
            if (typeof window.console != "undefined" && typeof window.console.group != "undefined") {
              $(function () {
                var consoleHTML = '<p id="_simplr_core_console" style="margin: 0; text-align: center; position: fixed; top: 0; width: 100%; left: 0; border-bottom: 1px solid #000; color: #fff; font-weight: bold; background-color: #f00; padding: 5px; font-size: 11px; opacity: .75;">[console]: Console Messaging Active</p>';
                $("body").append(consoleHTML);
                $("#_simplr_core_console").mouseover(function () {
                  $(this).slideUp();
                }).mouseout(function () {
                  $(this).delay(3000).slideDown();
                });
              });
              simplr.config.Data.ConsoleActive = true;
            }
          } catch (e) {}
        }

        return simplr.config.Data.ConsoleActive;
      }
    },
    browser: {},
    controller: {},
    cookie: {},
    core: {},
    form: {},
    trigger: {},
    ui: {
      widget: {}
    },
    util: {},
    validation: {},
    view: {}
  };
  var browserData = {
    UserAgent: ""
  };
  simplr.browser = {
    mAddressBarHeight: function mAddressBarHeight() {
      var deviceID = simplr.browser.mDevice();
      return deviceID == "iPhone" || deviceID == "iPod" || deviceID == "iPad" ? 60 : 0;
    },
    mDevice: function mDevice() {
      if (browserData.UserAgent.match(/iPhone/i)) {
        return "iPhone";
      } else if (browserData.UserAgent.match(/iPod/i)) {
        return "iPod";
      } else if (browserData.UserAgent.match(/iPad/i)) {
        return "iPad";
      } else if (browserData.UserAgent.match(/Android/i)) {
        return "Android";
      }

      return "other";
    },
    mLocalStorageCapable: function mLocalStorageCapable() {
      return simplr.core.util.mHasLocalStorage();
    },
    mSetUserAgent: function mSetUserAgent(uaString) {
      browserData.UserAgent = uaString;
    },
    mTouchCapable: function mTouchCapable() {
      var deviceID = simplr.browser.mDevice();
      return deviceID == "iPhone" || deviceID == "iPod" || deviceID == "iPad" || deviceID == "Android";
    }
  };
  simplr.browser.mSetUserAgent(navigator.userAgent);

  function createTimeKey(key) {
    return key;
  }

  function createDataKey(key) {
    return key + "_data";
  }

  function createTimeValue(key, freshness) {
    return key + "|" + (new Date().getTime() + freshness);
  }

  simplr.cache = {
    mExpire: function mExpire(key) {
      if (simplr.core.util.mHasLocalStorage()) {
        localStorage.removeItem(createTimeKey(key));
        localStorage.removeItem(createDataKey(key));
      }

      return null;
    },
    mGet: function mGet(options) {
      options = $.extend({
        key: "",
        identifier: ""
      }, options);

      if (simplr.core.util.mHasLocalStorage() && options.key != "") {
        var timeData = localStorage.getItem(createTimeKey(options.key));

        if (timeData != null) {
          var timeParts = timeData.split("|");

          if (timeParts.length == 2) {
            if (timeParts[0] == options.identifier) {
              if (new Date().getTime() <= parseInt(timeParts[1], 10)) {
                return localStorage.getItem(createDataKey(options.key));
              } else {
                simplr.cache.mExpire(options.key);
              }
            }
          }
        }
      }

      return null;
    },
    mSet: function mSet(options) {
      options = $.extend({
        key: "",
        identifier: "",
        data: "",
        freshness: 600000
      }, options);

      if (simplr.core.util.mHasLocalStorage()) {
        if (options.key != "") {
          localStorage.setItem(createTimeKey(options.key), createTimeValue(options.identifier, options.freshness));
          localStorage.setItem(createDataKey(options.key), options.data);
        }
      }

      return options.data;
    }
  };

  function htmlEntities(string) {
    return string.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var ControllerData = {
    CRUD: {
      "view": true,
      // Show data
      "new": true,
      // View for New form action
      "update": true,
      // Submit for Edit
      "delete": true,
      // Submit to delete data
      "edit": true,
      // View for Edit form action
      "create": true // Submit for New

    },
    Commands: {},
    Bases: {}
  };
  simplr.controller = {
    mAddBases: function mAddBases(bases) {
      var collection = $.isArray(bases) ? bases : [bases];

      for (var i = 0, iL = collection.length; i < iL; i++) {
        ControllerData.Bases[collection[i]] = 1;
      }
    },
    mAddCommands: function mAddCommands(commands) {
      for (var name in commands) {
        var tmp = $.extend({
          route: [],
          authorized: function authorized() {}
        }, commands[name]);
        var key = tmp.route.join("_");

        if (key != "") {
          ControllerData.Commands[key] = {
            authorized: tmp.authorized,
            isAuthorizedMethod: tmp.isAuthorizedMethod ? tmp.isAuthorizedMethod : function () {
              return true;
            },
            unauthorized: tmp.unauthorized ? tmp.unauthorized : function () {
              return true;
            },
            always: tmp.always ? tmp.always : function () {
              return true;
            }
          };
        }
      }
    },
    mData: function mData() {
      return ControllerData;
    },
    mExecute: function mExecute(data) {
      var key = data.route.join("_"),
          command = ControllerData.Commands[key];

      try {
        command.isAuthorizedMethod() ? command.authorized(data) : command.unauthorized(data);
        command.always(data);
      } catch (e) {
        console.log('Unexpected failure: ', e.message, e.stack);
      }
    },
    mRoute: function mRoute(url) {
      var ret = {
        route: [],
        url: url,
        base: "",
        resources: {},
        action: "",
        parameters: {}
      }; // remove hash

      if (ret.url.charAt(0) == "#") {
        ret.url = ret.url.substring(1);
      } // remove bang


      if (ret.url.charAt(0) == "!") {
        ret.url = ret.url.substring(1);
      }

      var urlArray = ret.url.split("?");
      urlArray[0] = decodeURI(urlArray[0]);
      /* 1. Find the base and remove if its there */

      var tmpURL = urlArray[0];

      for (var base in ControllerData.Bases) {
        if ((urlArray[0] = urlArray[0].replace(base, "")) != tmpURL) {
          ret.base = base;
          ret.route.push(base);
          break;
        }
      }
      /* 2. Get CRUD Operation */


      urlArray[0] = urlArray[0].split("/");
      ret.action = urlArray[0][urlArray[0].length - 1];
      ret.action = ControllerData.CRUD[ret.action] ? ret.action : "view";
      /* 3. Get the Resources */

      var isResource = true;
      var res = "";

      for (var x = 0, xL = urlArray[0].length - 1; x < xL; x++) {
        if (urlArray[0][x] != "") {
          if (isResource) {
            res = urlArray[0][x];
            ret.route.push(res);
            ret.resources[res] = "";
          } else {
            ret.resources[res] = urlArray[0][x];
          }

          isResource = !isResource;
        }
      }
      /* 4. Get Parameters */


      if (urlArray[1]) {
        var kvArr = urlArray[1].split("&");

        for (var i = 0, iL = kvArr.length; i < iL; i++) {
          var keyValue = kvArr[i].split("=");
          ret.parameters[keyValue[0]] = $.trim(htmlEntities(decodeURIComponent(keyValue[1])));
        }
      }

      ret.route.push(ret.action);
      return ret;
    },
    mRouteAndExecute: function mRouteAndExecute(hashURLPart) {
      simplr.controller.mExecute(simplr.controller.mRoute(hashURLPart));
    }
  };
  $(function () {
    $(window).on("hashchange", function () {
      if (window.location.hash != "") {
        simplr.controller.mRouteAndExecute("#" + (window.location.href.split("#")[1] || ""));
      }
    });
  });
  simplr.cookie = {
    mGet: function mGet(options) {
      var opts = $.extend({
        name: ""
      }, options);

      if (document.cookie.length > 0 && !simplr.core.util.mEmpty(opts.name)) {
        var r = document.cookie.match('(^|;) ?' + opts.name + '=([^;]*)(;|$)');

        if (r) {
          return decodeURIComponent(r[2]);
        }
      }

      return null;
    },
    mSet: function mSet(options) {
      var opts = $.extend({
        name: "",
        value: "",
        expireDays: null,
        path: "/",
        domain: null,
        secure: false
      }, options);

      if (!simplr.core.util.mEmpty(opts.name)) {
        var cookieString = opts.name + "=" + encodeURIComponent(opts.value);

        if (!simplr.core.util.mEmpty(opts.expireDays)) {
          var expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + opts.expireDays * 86400000);
          cookieString += "; expires=" + expirationDate.toUTCString();
        }

        cookieString += !simplr.core.util.mEmpty(opts.path) ? "; path=" + opts.path : "";
        cookieString += !simplr.core.util.mEmpty(opts.domain) ? "; domain=" + opts.domain : "";
        cookieString += opts.secure ? "; secure" : "";
        document.cookie = cookieString;
        return true;
      }

      return false;
    },
    mExpire: function mExpire(options) {
      options = options || {};
      var ret = false;

      if (simplr.core.util.mEmpty(options.domain)) {
        var dom = window.location.hostname;
        var vals = dom.split('.');

        for (var i = 0, iL = vals.length; i < iL; i++) {
          var opts = $.extend({}, options);
          opts.domain = vals[i];

          for (var j = i + 1; j < vals.length; j++) {
            opts.domain = opts.domain + '.' + vals[j];
          }

          ret = simplr.cookie.mSet($.extend({
            name: "",
            domain: opts.domain,
            expireDays: -1
          }, opts)) || ret;
        }
      }

      ret = simplr.cookie.mSet($.extend({
        name: "",
        expireDays: -1
      }, options)) || ret;
      return ret;
    }
  };

  function renderMessages(data) {
    if ($.isArray(data.message)) {
      console && console.group(data.group);

      for (var i = 0, iL = data.message.length; i < iL; i++) {
        var newMessageData = $.extend(simplr.core.Console.mGetMessageTemplate(), data.message[i]);
        renderMessages(newMessageData);
      }

      console && console.groupEnd();
    } else {
      console && console.group(data.message);
      console && console.log(data.data);
      console && console.groupEnd();
    }
  }

  simplr.core.Console = {
    mGetMessageTemplate: function mGetMessageTemplate() {
      return {
        group: "",
        message: "",
        data: ""
      };
    },
    mMessage: function mMessage(options) {
      if (simplr.config.Data.ConsoleActive) {
        var messageData = $.extend(simplr.core.Console.mGetMessageTemplate(), options);
        renderMessages(messageData);
      }
    }
  };
  var widgetIDs = {};
  simplr.core.ui = {
    mElementInfo: function mElementInfo(options) {
      var opts = $.extend({
        selector: "body"
      }, options);
      var jqThisElement = $(opts.selector).eq(0);
      var dimensions = [jqThisElement.width(), jqThisElement.height()];
      var offsets = jqThisElement.offset();
      offsets = [offsets.left, offsets.top];
      return {
        offsets: offsets,
        dimensions: dimensions
      };
    },
    mWindowInfo: function mWindowInfo() {
      var screenInfo = {
        offsets: [0, 0],
        dimensions: [0, 0]
      }; // Offsets

      if (typeof window.pageYOffset == 'number') {
        // Netscape compliant
        screenInfo.offsets = [window.pageXOffset, window.pageYOffset];
      } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        // DOM compliant
        screenInfo.offsets = [document.body.scrollLeft, document.body.scrollTop];
      } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        // IE6 standards compliant mode
        screenInfo.offsets = [document.documentElement.scrollLeft, document.documentElement.scrollTop];
      } // Width and Height


      if (typeof window.innerWidth == 'number') {
        // NON IE
        screenInfo.dimensions = [window.innerWidth, window.innerHeight];
      } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        // IE 6 plus in standards compliant mode
        screenInfo.dimensions = [document.documentElement.clientWidth, document.documentElement.clientHeight];
      }

      return screenInfo;
    },
    Widget: {
      mGenerateWidgetID: function mGenerateWidgetID() {
        var num = Math.floor(Math.random() * 10000000);

        if (simplr.core.util.mEmpty(widgetIDs[num])) {
          widgetIDs[num] = true;
          return num;
        } else {
          return simplr.core.ui.Widget.mGenerateWidgetID();
        }
      }
    }
  };

  var hasLocalStorage = function () {
    try {
      localStorage.setItem("__x", "x");
      localStorage.removeItem("__x");
      return true;
    } catch (e) {
      return false;
    }
  }();

  function htmlEntities(string) {
    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function equal(thing1, thing2) {
    if (_typeof(thing1) == _typeof(thing2)) {
      if (_typeof(thing1) == "object") {
        if ($.isArray(thing1)) {
          if (thing1.length == thing2.length) {
            for (var i = 0, iL = thing1.length; i < iL; i++) {
              if (!equal(thing1[i], thing2[i])) {
                return false;
              }
            }

            return true;
          }

          return false;
        } else {
          var ret = true;
          var key;

          for (key in thing1) {
            if (!equal(thing1[key], thing2[key])) {
              ret = false;
              return false;
            }
          }

          if (ret) {
            var l1 = 0;
            var l2 = 0;

            for (key in thing1) {
              l1++;
            }

            for (key in thing2) {
              l2++;
            }

            return l1 == l2;
          }

          return false;
        }
      }

      return thing1 == thing2;
    }

    return false;
  }

  simplr.core.util = {
    mEmpty: function mEmpty(thing) {
      var typeOfThing = _typeof(thing);

      if (typeOfThing != "undefined" && thing != null) {
        if (typeOfThing == "object") {
          if ($.isArray(thing)) {
            return thing.length == 0;
          }

          return $.isEmptyObject(thing);
        }

        return $.trim(thing) == "";
      }

      return true;
    },
    mEqual: function mEqual(things) {
      if (!simplr.core.util.mEmpty(things)) {
        if ($.isArray(things)) {
          var valid = true;

          for (var i = 0, iL = things.length; i < iL; i++) {
            if (!equal(things[0], things[i])) {
              valid = false;
              i = iL;
            }
          }

          return valid;
        }

        return true;
      }

      return true;
    },
    mGetUrlParameter: function mGetUrlParameter(name) {
      var string = window.location.search;

      if (!simplr.core.util.mEmpty(string)) {
        var parameters = {};
        string = string.substring(1).split("&");

        for (var i = 0, iL = string.length; i < iL; i++) {
          var keyValue = string[i].split("=");
          parameters[keyValue[0]] = $.trim(htmlEntities(decodeURIComponent(keyValue[1])));
        }

        if (simplr.core.util.mEmpty(name)) {
          return parameters;
        } else {
          var value = parameters[name];
          return typeof value == "undefined" ? null : value;
        }
      } else {
        return null;
      }
    },
    mHasLocalStorage: function mHasLocalStorage() {
      return hasLocalStorage;
    }
  };

  function mergeValidationResults(key, rule, newData, existingData) {
    existingData.codes[key].success = existingData.codes[key].success.concat(newData.successCodes);
    existingData.codes[key].error = existingData.codes[key].error.concat(newData.errorCodes);

    if (!newData.valid) {
      existingData.valid = false;
    }
  }

  function replaceTokens(keys, message) {
    var results = message;

    for (var token in keys) {
      results = results.replace(new RegExp("\\$\\[" + token + "\\]", "g"), escape(keys[token]));
    }

    return unescape(results);
  }

  var data = {
    codes: {
      eEmpty: "$[label] is empty.",
      eMissingValidator: "Missing Validator"
    },
    codeResultsTemplate: {
      success: [],
      error: []
    },
    defaultCodeMessage: "$[label] is UNDEFINED",
    ruleResultsTemplate: {
      valid: true,
      successCodes: [],
      errorCodes: []
    },
    validators: {
      missingvalidator: function missingvalidator(value) {
        return $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
          valid: false,
          errorCodes: ["eMissingValidator"]
        });
      },
      notempty: function notempty(value) {
        var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate());

        if (typeof value != "undefined" && value != null) {
          if (typeof value == "string") {
            results.valid = !($.trim(value) == "");
          } else if ($.isArray(value)) {
            results.valid = !(value.length == 0);
          } else if (_typeof(value) == "object") {
            results.valid = !$.isEmptyObject(value);
          }
        }

        if (!results.valid) {
          results.errorCodes.push("eEmpty");
        }

        return results;
      }
    },
    validationResultsTemplate: {
      data: "",
      valid: true,
      codes: {}
    }
  };
  simplr.core.Validation = {
    mAddCodes: function mAddCodes(obj) {
      $.extend(data.codes, obj);
    },
    mAddValidators: function mAddValidators(obj) {
      $.extend(data.validators, obj);
    },
    mData: function mData() {
      return data;
    },
    mGetCodeMessage: function mGetCodeMessage(code, label) {
      if (data.codes[code] != undefined) {
        return replaceTokens({
          label: label
        }, data.codes[code]);
      }

      return replaceTokens({
        label: code
      }, data.defaultCodeMessage);
    },
    mGetRuleResultsTemplate: function mGetRuleResultsTemplate() {
      return $.extend(true, {}, data.ruleResultsTemplate);
    },
    mValidate: function mValidate(dataObject) {
      var results = $.extend(true, {}, data.validationResultsTemplate, {
        data: $.extend(true, {}, dataObject)
      });

      for (var key in results.data) {
        // Check the Rules for this data
        var entry = results.data[key];
        results.codes[key] = $.extend(true, {}, data.codeResultsTemplate);

        for (var i = 0, iL = entry.rules.length; i < iL; i++) {
          var rule = entry.rules[i];
          var tmpValidationData = $.extend(true, {}, data.ruleResultsTemplate);

          if (data.validators[rule]) {
            tmpValidationData = data.validators[rule](entry.value);
          } else {
            tmpValidationData = data.validators["missingvalidator"](entry.value);
          }

          mergeValidationResults(key, rule, tmpValidationData, results);
        } // Cleanup Data


        if (results.codes[key].error.length == 0 && results.codes[key].success.length == 0) {
          delete results.codes[key];
        }
      }

      return results;
    }
  };
  /* Add Codes */

  simplr.core.Validation.mAddCodes({
    eMissingValidator: "Missing Validator",
    eAlphaNumeric: "$[label] is not alphanumeric.",
    eAmericanExpress: "$[label] is not a valid AMERICAN EXPRESS number.",
    eDinersClub: "$[label] is not a valid DINERS CLUB number.",
    eDiscover: "$[label] is not a valid DISCOVER number.",
    eEmail: "$[label] is not an email address.",
    eEqual: "$[label] does not match.",
    eMastercard: "$[label] is not a valid MASTERCARD number.",
    eEmpty: "$[label] is empty.",
    eNumber: "$[label] is not a number.",
    ePhoneNumber: "$[label] is not a valid Phone Number.",
    ePostalCode: "$[label] is not a Postal Code.",
    eVisa: "$[label] is not a valid VISA number."
  });

  function isValidLuhn(number) {
    var sum = 0;
    var isEvenDigit = false;

    for (var i = number.length - 1; i >= 0; i--) {
      var digit = parseInt(number.charAt(i), 10);
      digit = isEvenDigit ? digit * 2 : digit;
      sum += digit > 9 ? digit - 9 : digit; // short cut to adding the two digits together

      isEvenDigit = !isEvenDigit;
    }

    return sum % 10 == 0;
  }
  /* Add Validators */


  simplr.core.Validation.mAddValidators({
    /* Missing Validator */
    missingvalidator: function missingvalidator(value) {
      return $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: false,
        errorCodes: ["eMissingValidator"]
      });
    },
    alphanumeric: function alphanumeric(value) {
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: /^\w*$/.test(value)
      });

      if (!results.valid) {
        results.errorCodes.push("eAlphaNumeric");
      }

      return results;
    },
    americanexpress: function americanexpress(value) {
      var isValid = isValidLuhn(value) && /^3[4,7]\d{13}$/.test(value);
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: isValid
      });

      if (!results.valid) {
        results.errorCodes.push("eAmericanExpress");
      }

      return results;
    },
    dinersclub: function dinersclub(value) {
      var isValid = isValidLuhn(value) && /^3(?:0[0-5]\d{11}|[6,8]\d{12}|)$/.test(value);
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: isValid
      });

      if (!results.valid) {
        results.errorCodes.push("eDinersClub");
      }

      return results;
    },
    discover: function discover(value) {
      var isValid = isValidLuhn(value) && /^6(?:011\d{12}|4[4-9]\d{13}|5\d{14}|2212[6-9]\d{10}|221[3-9]\d{11}|22[2-8]\d{12}|2291\d{11}|2292[0-5]\d{10}|)$/.test(value);
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: isValid
      });

      if (!results.valid) {
        results.errorCodes.push("eDiscover");
      }

      return results;
    },
    email: function email(value) {
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)
      });

      if (!results.valid) {
        results.errorCodes.push("eEmail");
      }

      return results;
    },
    equal: function equal(value) {
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate());

      if ($.isArray(value)) {
        for (var i = 0, iL = value.length; i < iL; i++) {
          if (!simplr.core.util.mEqual([value[0], value[i]])) {
            results.valid = false;
            i = iL;
          }
        }
      }

      if (!results.valid) {
        results.errorCodes.push("eEqual");
      }

      return results;
    },
    jcb: function jcb(value) {
      var isValid = isValidLuhn(value) && /^(?:352[8-9]\d{12}|35[3-8]\d{13}|2131\d{12}|1800\d{12}|)$/.test(value);
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: isValid
      });

      if (!results.valid) {
        results.errorCodes.push("eJCB");
      }

      return results;
    },
    mastercard: function mastercard(value) {
      var isValid = isValidLuhn(value) && /^5[1-5]\d{14}$/.test(value);
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: isValid
      });

      if (!results.valid) {
        results.errorCodes.push("eMastercard");
      }

      return results;
    },
    notempty: function notempty(value) {
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate());

      if (typeof value != "undefined" && value != null) {
        if (typeof value == "string") {
          results.valid = !($.trim(value) == "");
        } else if ($.isArray(value)) {
          results.valid = !(value.length == 0);
        } else if (_typeof(value) == "object") {
          results.valid = !$.isEmptyObject(value);
        }
      }

      if (!results.valid) {
        results.errorCodes.push("eEmpty");
      }

      return results;
    },
    number: function number(value) {
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: !isNaN(parseFloat(value)) && isFinite(value)
      });

      if (!results.valid) {
        results.errorCodes.push("eNumber");
      }

      return results;
    },
    optima: function optima(value) {
      var isValid = isValidLuhn(value) && /^3[4,7]\d{13}$/.test(value);
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: isValid
      });

      if (!results.valid) {
        results.errorCodes.push("eOptima");
      }

      return results;
    },
    phonenumber: function phonenumber(value) {
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: /^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/.test(value)
      });

      if (!results.valid) {
        results.errorCodes.push("ePhoneNumber");
      }

      return results;
    },
    postalcode: function postalcode(value) {
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: /^\d{5}([\-]?\d{4})?$/.test(value)
      });

      if (!results.valid) {
        results.errorCodes.push("ePostalCode");
      }

      return results;
    },
    visa: function visa(value) {
      var isValid = isValidLuhn(value) && /^4(?:\d{12}|\d{15}|)$/.test(value);
      var results = $.extend(true, {}, simplr.core.Validation.mGetRuleResultsTemplate(), {
        valid: isValid
      });

      if (!results.valid) {
        results.errorCodes.push("eVisa");
      }

      return results;
    }
  });

  function render(selector, obj) {
    var specClass = "_simplr";
    var classes = formData.Classes; // Reset the form

    $("." + classes.FormError + "," + "." + classes.FieldError, selector).filter("." + specClass).removeClass(classes.FormError).removeClass(classes.FieldError);
    $("." + classes.TextInformation + "," + "." + classes.TextError, selector).filter("." + specClass).remove(); // Create the Messages

    for (var key in obj.codes) {
      var msgObject = obj.codes[key];
      var msgArray = [msgObject.error, msgObject.success];
      var html = "";

      for (var i = 0; i < 2; i++) {
        // Only showing 1 message at a time.
        if (msgArray[i].length > 0) {
          html += '<p class="' + (i == 0 ? classes.TextError : classes.TextInformation) + ' ' + specClass + '">' + simplr.core.Validation.mGetCodeMessage(msgArray[i][0], obj.data[key].label) + '</p>';
        }
      } // Now find the Form Entry to put the message html


      $("[name='" + key + "']:first", selector).addClass(classes.FieldError + " " + specClass).closest("." + classes.FormEntry).addClass(classes.FormError + " " + specClass).append(html);
    }
  }

  function transformValues(values) {
    var validationAndRenderValues = {};

    for (var key in values) {
      var label = formData.Labels[key] ? formData.Labels[key] : formData.DefaultLabel;
      var validationObject = {
        value: values[key],
        label: label,
        rules: []
      }; // Add Validators as needed

      for (var i = 0, iL = formData.DefaultRules.length; i < iL; i++) {
        validationObject.rules.push(formData.DefaultRules[i]);
      }

      try {
        formData.Rules[key](validationObject.rules);
      } catch (e) {} // Return the Transformed Data


      validationAndRenderValues[key] = validationObject;
    }

    return validationAndRenderValues;
  }

  var formData = {
    Classes: {
      FormEntry: "form__control-group",
      FormError: "formError",
      FieldError: "errorField",
      TextError: "errorText",
      TextInformation: "informationText"
    },
    DefaultRules: ["notempty"],
    DefaultLabel: "_LABEL_",
    Rules: {},
    Labels: {}
  };
  simplr.form = {
    mAddValidators: function mAddValidators(obj) {
      simplr.core.Validation.mAddValidators(obj);
    },
    mGetValidators: function mGetValidators() {
      return simplr.core.Validation.mData().validators;
    },
    mAddCodes: function mAddCodes(obj) {
      simplr.core.Validation.mAddCodes(obj);
    },
    mGetCodes: function mGetCodes() {
      return simplr.core.Validation.mData().codes;
    },
    mAddLabelAssociation: function mAddLabelAssociation(obj) {
      $.extend(formData.Labels, obj);
    },
    mAddValidationAssociation: function mAddValidationAssociation(obj) {
      $.extend(formData.Rules, obj);
    },
    mGetValues: function mGetValues(selector) {
      var values = {};
      $("input[type='checkbox']", selector).each(function () {
        values[$(this).attr("name")] = $(this).is(":checked") ? $(this).val() != "on" ? $(this).val() : true : false;
      });
      $("input[type='text'], input[type='password'], input[type='hidden'], input[type='number'], input[type='tel'], input[type='email'], input[type=date], input[type='radio']:checked, select, textarea", selector).each(function () {
        values[$(this).attr("name")] = $(this).val();
      });
      return values;
    },
    mValidateValuesAndRender: function mValidateValuesAndRender(selector, values) {
      var validationData = transformValues(values);
      var validatedData = simplr.core.Validation.mValidate(validationData);
      render(selector, validatedData);
      return validatedData.valid;
    }
  };
  var TriggerData = {
    Env: "_simplr",
    Services: {}
  };

  function getServiceIDs() {
    var serviceIDs = [];

    for (var id in TriggerData.Services) {
      serviceIDs.push(id);
    }

    return serviceIDs;
  }

  function cleanObj(obj) {
    var i,
        ret = {},
        bad = ['username', 'password'],
        badlen = bad.length,
        b,
        querySplit;

    for (i in obj) {
      if ($.inArray(i, bad) === -1) {
        if (typeof obj[i] === "string") {
          // loop through bad values
          querySplit = obj[i].split("?");

          if (querySplit.length > 1) {
            for (b = 0; b < badlen; b++) {
              if (querySplit[1].match(bad[b]) !== null) {
                querySplit[1] = "";
                break;
              }
            }

            obj[i] = querySplit.join("?");
          }

          ret[i] = obj[i];
        } else if (Object.prototype.toString.call(obj[i]) === "[object Object]") {
          ret[i] = cleanObj(obj[i]);
        } else {
          ret[i] = obj[i];
        }
      }
    }

    return ret;
  }

  function trigger(triggerObj) {
    var triggerOptions = {
      services: [],
      data: {
        envID: TriggerData.Env
      }
    };
    triggerObj.options = cleanObj(triggerObj.options);
    $.extend(true, triggerOptions, triggerObj.options);

    if (simplr.core.util.mEmpty(triggerOptions.services)) {
      triggerOptions.services = getServiceIDs();
    }

    var messages = $.extend(simplr.core.Console.mGetMessageTemplate(), {
      group: "simplr.trigger: " + TriggerData.Env + " environment",
      message: []
    });

    for (var i = 0, iL = triggerOptions.services.length; i < iL; i++) {
      var id = triggerOptions.services[i];

      if ($.isFunction(TriggerData.Services[id][triggerObj.type]) && TriggerData.Services[id].data.environmentIDs[TriggerData.Env]) {
        messages.message.push({
          message: "[" + id + "] " + triggerObj.type + " triggered.",
          data: TriggerData.Services[id][triggerObj.type](triggerOptions.data)
        });
      }
    }

    if (messages.message.length > 0) {
      simplr.core.Console.mMessage(messages);
    }
  }

  simplr.trigger = {
    mAddServices: function mAddServices(services) {
      for (var serviceName in services) {
        TriggerData.Services[serviceName] = $.extend({
          data: {
            environmentIDs: {}
          },
          onLoad: function onLoad() {},
          onPage: function onPage() {},
          onEvent: function onEvent() {},
          onTransaction: function onTransaction() {}
        }, services[serviceName]);
        trigger({
          type: "onLoad",
          options: {
            services: [serviceName]
          }
        });
      }
    },
    mData: function mData() {
      return TriggerData;
    },
    mSetEnvironment: function mSetEnvironment(env) {
      TriggerData.Env = env;
    },
    mOnPage: function mOnPage(options) {
      trigger({
        type: "onPage",
        options: $.extend({}, options)
      });
    },
    mOnEvent: function mOnEvent(options) {
      trigger({
        type: "onEvent",
        options: $.extend({}, options)
      });
    },
    mOnTransaction: function mOnTransaction(options) {
      trigger({
        type: "onTransaction",
        options: $.extend({}, options)
      });
    }
  };
  var cClass = "_simplr_centerLayer";
  var kcClass = "_simplr_keepCenterLayer";

  function addLayer(opts) {
    var layer = $("#" + opts.id);

    if (layer.length == 0) {
      // layer doesn't exist
      $("body").append('<div id="' + opts.id + '" style="position: absolute;"></div>');
    } else {
      // layer exists
      layer.removeClass(cClass).removeClass(kcClass);
      $(opts.closeSelector).off("click.simplr.layer.destroy." + opts.id);
    }

    var jqThisLayer = $("#" + opts.id);
    var centered = !(opts.xPos != null && opts.yPos != null);

    if (!centered) {
      jqThisLayer.css("left", opts.xPos + "px").css("top", opts.yPos + "px");
    } else {
      if (opts.keepCentered) {
        jqThisLayer.addClass(kcClass);
      }

      simplr.ui.layer.mCenter(opts.id);
    }

    jqThisLayer.html(opts.defaultContent);

    if (centered) {
      simplr.ui.layer.mCenter(opts.id);
    }

    $(opts.closeSelector).on("click.simplr.layer.destroy." + opts.id, function (evt) {
      evt.preventDefault();
      simplr.ui.layer.mDestroy({
        id: opts.id,
        closeSelector: opts.closeSelector
      });
    });
  }

  simplr.ui.layer = {
    mCenter: function mCenter(id) {
      if (!simplr.core.util.mEmpty(id)) {
        var jqThisLayer = $("#" + id);
        var lWidth = jqThisLayer.width();
        var lHeight = jqThisLayer.height();
        var screenInfo = simplr.core.ui.mWindowInfo();
        /* Get Left Offset */

        var left = 0;
        left = (screenInfo.dimensions[0] - lWidth) / 2;
        left = left < 0 ? 20 : left;
        left += screenInfo.offsets[0];
        /* Get Top Offset */

        var top = 0;
        top = (screenInfo.dimensions[1] - lHeight) / 2;
        top = top < 0 ? 20 : top;
        top += screenInfo.offsets[1];
        /* if layer Can't be centered on Screen */

        if (lWidth > screenInfo.dimensions[0] || lHeight > screenInfo.dimensions[1]) {
          /* Should this layer stay centered? */
          if (jqThisLayer.hasClass(kcClass)) {
            jqThisLayer.removeClass(kcClass).addClass(cClass);
          }
        }

        jqThisLayer.css("top", top + "px").css("left", left + "px");
      }
    },
    mCreate: function mCreate(options) {
      var opts = $.extend({
        ajax: null,
        callback: null,
        closeSelector: "#_simplr_layerClose",
        defaultContent: "",
        id: "_simplr_layer",
        isOverlay: false,
        keepCentered: false,
        xPos: null,
        yPos: null
      }, options);

      if (opts.isOverlay) {
        opts.id = opts.id == "_simplr_layer" ? "_simplr_overlay" : opts.id;
        opts.closeSelector = opts.closeSelector == "#_simplr_layerClose" ? "#_simplr_overlayClose" : opts.closeSelector;
        opts.xPos = 0;
        opts.yPos = 0;
      }

      function continueCreate() {
        addLayer(opts);

        if (opts.ajax != null) {
          var previousCallback = opts.ajax.success;

          opts.ajax.success = function (data, textStatus) {
            opts.defaultContent = data;
            addLayer(opts);

            if ($.isFunction(previousCallback)) {
              previousCallback(data, textStatus);
            }
          };

          $.ajax(opts.ajax);
        } else {
          if ($.isFunction(opts.callback)) {
            opts.callback();
          }
        }

        if (opts.isOverlay) {
          $("#" + opts.id).css({
            position: "fixed",
            width: "100%",
            height: "100%"
          });
        }
      }

      if (simplr.util.mIsPromise(opts.defaultContent)) {
        opts.defaultContent.then(function (content) {
          opts.defaultContent = content;
          continueCreate(opts);
        });
      } else {
        continueCreate(opts);
      }
    },
    mDestroy: function mDestroy(options) {
      var opts = $.extend({
        id: "_simplr_layer",
        closeSelector: "#_simplr_layerClose"
      }, options);

      if (!simplr.core.util.mEmpty(opts.id)) {
        $("#" + opts.id).remove();
        $(opts.closeSelector).off("click.simplr.ui.layer.destroy." + opts.id);
      }
    }
  };
  /* this managers the layers during window scroll or resize. */

  $(function () {
    $(window).on("resize.simplr.ui.layer", function () {
      $("." + kcClass + "," + "." + cClass).each(function (i, layer) {
        $(layer).addClass(kcClass).removeClass(cClass);
        simplr.ui.layer.mCenter($(layer).attr("id"));
      });
    }).on("scroll.simplr.ui.layer", function () {
      $("." + kcClass).each(function (i, layer) {
        simplr.ui.layer.mCenter($(layer).attr("id"));
      });
    });
  });

  simplr.ui.mNewBrowserWindow = function (options) {
    var opts = $.extend({
      url: "",
      width: 500,
      height: 500,
      name: "_simplr_newBrowserWindow"
    }, options);

    if (!simplr.core.util.mEmpty(opts.url)) {
      var features = "width=" + opts.width + ",height=" + opts.height;
      var url = opts.url;
      var name = opts.name;
      delete opts.url;
      delete opts.width;
      delete opts.height;
      delete opts.name;

      for (var key in opts) {
        features += "," + key + "=" + opts[key];
      }

      var newWindow = window.open(url, name, features);

      if (newWindow != null) {
        newWindow.focus();
      }
    }
  };

  simplr.ui.widget.oTrackableScrollingElement = function (options) {
    return new trackableScrollingElement(options);
  };

  function trackableScrollingElement(options) {
    // create this widget
    var thisWidget = this; // user

    this.data = $.extend({
      animateSpeed: 200,
      containerSelector: "#_simplr_widget_trackableScrollingElement_container",
      elementSelector: "#_simplr_widget_trackableScrollingElement_element",
      offset: 10,
      refreshSpeed: 500,
      tolerance: 10
    }, options); // private

    this.data._PRIVATE = {
      evtString: "scroll.simplr.widget.trackableScrollingElement." + simplr.core.ui.Widget.mGenerateWidgetID(),
      timeout: null,
      previousOffset: 0,
      track: function track() {
        clearTimeout(thisWidget.data._PRIVATE.timeout);
        thisWidget.data._PRIVATE.timeout = setTimeout(function () {
          var parentEl = $(thisWidget.data.containerSelector).eq(0);
          var childEl = parentEl.children(thisWidget.data.elementSelector).eq(0);

          if (parentEl.is(":visible") && childEl.is(":visible")) {
            /* Object Infos */
            var containerInfo = simplr.core.ui.mElementInfo({
              selector: parentEl
            });
            var mElementInfo = simplr.core.ui.mElementInfo({
              selector: childEl
            });
            var windowInfo = simplr.core.ui.mWindowInfo();
            /* Figure Out How this thing is moving */

            var movingUP = windowInfo.offsets[1] - thisWidget.data._PRIVATE.previousOffset < 0;
            thisWidget.data._PRIVATE.previousOffset = windowInfo.offsets[1];
            var newMargin = null;
            var topToleranceRange = [mElementInfo.offsets[1] - thisWidget.data.tolerance, mElementInfo.offsets[1] + thisWidget.data.tolerance];
            var bottomToleranceRange = [mElementInfo.offsets[1] + mElementInfo.dimensions[1] - thisWidget.data.tolerance, mElementInfo.offsets[1] + mElementInfo.dimensions[1] + thisWidget.data.tolerance];
            /* Find new Margin */

            if (windowInfo.dimensions[1] > mElementInfo.dimensions[1] && (windowInfo.offsets[1] < topToleranceRange[0] || windowInfo.offsets[1] > topToleranceRange[1])) {
              newMargin = windowInfo.offsets[1] - containerInfo.offsets[1] + thisWidget.data.offset;
            } else {
              if (movingUP && windowInfo.offsets[1] < topToleranceRange[0]) {
                newMargin = windowInfo.offsets[1] - containerInfo.offsets[1] + thisWidget.data.offset;
              } else if (windowInfo.offsets[1] + mElementInfo.dimensions[1] > bottomToleranceRange[1]) {
                newMargin = windowInfo.offsets[1] - containerInfo.offsets[1] - (mElementInfo.dimensions[1] - windowInfo.dimensions[1]) - thisWidget.data.offset;
              }
            }
            /* Set this Margin */


            if (newMargin !== null) {
              if (newMargin < 0) {
                newMargin = 0;
              } else if (newMargin > containerInfo.dimensions[1] - mElementInfo.dimensions[1]) {
                newMargin = containerInfo.dimensions[1] - mElementInfo.dimensions[1];
              }

              childEl.stop().animate({
                marginTop: newMargin
              }, {
                duration: thisWidget.data.animateSpeed,
                done: function done() {
                  $(window).trigger("scroll.simplr.widget.trackableScrollingElement.done");
                }
              });
            }
          } else {
            childEl.css("margin-top", 0);
          }
        }, thisWidget.data.refreshSpeed);
      }
    }; // destroy

    this.destroy();
    $(window).on(this.data._PRIVATE.evtString, this.data._PRIVATE.track);
  }

  trackableScrollingElement.prototype.reset = function () {
    $(this.data.elementSelector).eq(0).css("margin-top", 0);
  };

  trackableScrollingElement.prototype.pause = function () {
    $(window).off(this.data._PRIVATE.evtString);
  };

  trackableScrollingElement.prototype.resume = function () {
    $(window).on(this.data._PRIVATE.evtString, this.data._PRIVATE.track);
    $(window).trigger(this.data._PRIVATE.evtString);
  };

  trackableScrollingElement.prototype.destroy = function () {
    this.reset();
    $(window).off(this.data._PRIVATE.evtString);
  };

  simplr.ui.mWindowInfo = function () {
    var screenInfo = {
      offsets: [0, 0],
      dimensions: [0, 0]
    }; // Offsets

    if (typeof window.pageYOffset == 'number') {
      // Netscape compliant
      screenInfo.offsets = [window.pageXOffset, window.pageYOffset];
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
      // DOM compliant
      screenInfo.offsets = [document.body.scrollLeft, document.body.scrollTop];
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
      // IE6 standards compliant mode
      screenInfo.offsets = [document.documentElement.scrollLeft, document.documentElement.scrollTop];
    } // Width and Height


    if (typeof window.innerWidth == 'number') {
      // NON IE
      screenInfo.dimensions = [window.innerWidth, window.innerHeight];
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      // IE 6 plus in standards compliant mode
      screenInfo.dimensions = [document.documentElement.clientWidth, document.documentElement.clientHeight];
    }

    return screenInfo;
  };

  simplr.util = {
    mEmpty: function mEmpty(thing) {
      return simplr.core.util.mEmpty(thing);
    },
    mEqual: function mEqual(things) {
      return simplr.core.util.mEqual(things);
    },
    mGetUrlParameter: function mGetUrlParameter(name) {
      return simplr.core.util.mGetUrlParameter(name);
    },
    mHasLocalStorage: function mHasLocalStorage() {
      return simplr.core.util.mHasLocalStorage();
    },
    mTruncateString: function mTruncateString(options) {
      var opts = $.extend({
        string: "",
        size: 5,
        postfix: "",
        smart: true
      }, options);

      if (opts.string.length > opts.size) {
        var truncateIndex = opts.size - opts.postfix.length - 1;
        var defaultIndex = truncateIndex + 1;

        if (opts.smart) {
          while (opts.string.charAt(truncateIndex) != " " && truncateIndex > 0) {
            truncateIndex--;
          }
        }

        return opts.string.substring(0, truncateIndex == 0 ? defaultIndex : truncateIndex + 1) + opts.postfix;
      }

      return opts.string;
    },
    mIsPromise: function mIsPromise(htmlOrPromise) {
      return htmlOrPromise && htmlOrPromise.then && typeof htmlOrPromise.then === "function";
    }
  };
  simplr.validation = {
    mAddCodes: function mAddCodes(obj) {
      simplr.core.Validation.mAddCodes(obj);
    },
    mGetCodes: function mGetCodes() {
      return simplr.core.Validation.mData().codes;
    },
    mAddValidators: function mAddValidators(obj) {
      simplr.core.Validation.mAddValidators(obj);
    },
    mGetValidators: function mGetValidators() {
      return simplr.core.Validation.mData().validators;
    },
    mGetRuleResultsTemplate: function mGetRuleResultsTemplate() {
      return simplr.core.Validation.mGetRuleResultsTemplate();
    },
    mGetCodeMessage: function mGetCodeMessage(code, label) {
      return simplr.core.Validation.mGetCodeMessage(code, label);
    },
    mValidate: function mValidate(obj) {
      return simplr.core.Validation.mValidate(obj);
    }
  };
  var ViewData = {
    Views: {}
  };
  var ViewProviders = {
    Components: {}
  };

  var default_html = function default_html(data) {
    return "";
  },
      default_callback = function default_callback(selector, data) {};

  simplr.view = {
    mAddViews: function mAddViews(obj) {
      for (var key in obj) {
        var newView = $.extend(true, {}, {
          html: default_html,
          callback: default_callback
        }, obj[key]);
        ViewData.Views[key] = newView;
        $(document).trigger("mAddView.".concat(key));
      }
    },
    mData: function mData() {
      return ViewData;
    },
    mAddProvider: function mAddProvider(components, promise) {
      $.each($.makeArray(components), function (i, component) {
        ViewProviders.Components[component] = promise;
      });
    },
    mProvider: function mProvider(component) {
      return ViewProviders.Components[component];
    },
    mRender: function mRender(options) {
      function doHtmlAndCallback(config, response) {
        if (typeof response === "string") {
          $(config.selector).html($.trim(response));
        }

        ViewData.Views[config.name].callback(config.selector, config.data);
        $(document).trigger("render.view", config.selector);
      }

      function decideRender(config, response) {
        if (simplr.util.mIsPromise(response)) {
          response.then(function (resp) {
            decideRender(config, resp);
          });
        } else if (typeof response == "string" && $(config.selector).length === 0) {
          DEBUG && console && console.log("DEBUG : RACE CAR : ON YOUR MARKS: " + config.selector + " : ", config);

          if (ViewProviders.Components[config.selector]) {
            DEBUG && console && console.log("DEBUG : RACE CAR : GET SET");
            ViewProviders.Components[config.selector].done(function () {
              DEBUG && console && console.log("DEBUG : RACE CAR : GOGOGOGOOo");
              doHtmlAndCallback(config, response);
            });
          } else {
            DEBUG && console && console.log("DEBUG : RACE CAR : DISQUALIFIED");
          }
        } else {
          doHtmlAndCallback(config, response);
        }
      }

      var tmp = $.extend({
        name: "",
        data: "",
        selector: ""
      }, options);
      var viewName = tmp.name;
      var htmlResponse;

      if (ViewData.Views[viewName]) {
        htmlResponse = ViewData.Views[tmp.name].html(tmp.data);
        decideRender(tmp, htmlResponse);
      } else {
        $(document).one("mAddView.".concat(viewName), function () {
          htmlResponse = ViewData.Views[tmp.name].html(tmp.data);
          decideRender(tmp, htmlResponse);
        });
      }
    }
  };
  return simplr;
});
/*! End simplr v1.9.0 2019-31-10 */
//# sourceMappingURL=simplr.js.map


/**
 * BEGIN CA - DNP-1769
 * 
 * Override the quicklist that creates the upsell lists
 * Change it so that one long list of products can be used, and invalid ones will be stripped out
 */

/**
      * Get a list of cross sell items.
      * @namespace jsDPZ.app
      * @method getCrossSellQuicklist
      * @return {Object} jsDPZ cross sells quick list
      */
jsDPZ.app.catalog.getCACrossSellQuicklist = function () {
  var crossSellItems = jsDPZ.app.catalog.getCatalog().data.CrossSellItems;
  var quicklistData = [];

  for (var i = 0, iL = crossSellItems.length; i < iL; i++) {
    var itemSet = $.makeArray(crossSellItems[i]).map(function (item) {
      return $.extend(true, {}, item);
    }); // NOTE: The Conditional is a function (or property) created on each cross sell item in the
    //  file src/main/js/derived/site/order/index/scripts.js
    // The conditional can determine, once a store is selected, whether the given item is valid for that store

    itemSet.forEach(function (eachItem) {
      var validItem = $.isFunction(eachItem.Conditional) ? eachItem.Conditional() : eachItem.Conditional;

      if (validItem) {
        quicklistData.push(eachItem.length == 1 ? eachItem[0] : eachItem);
      }
    });
  }

  return jsDPZ.obj.quicklist(quicklistData);
},
/**
 * Override base dpz.ajax.emailOptInAndOut to add DPZ-Language header and DefaultLanguageCode to parameters
 */
jsDPZ.ajax.emailOptInAndOut = function (options) {
  options.data = $.extend({
    DefaultLanguageCode: dpz.market.activeLanguageCode,
    PostalCode: ""
  }, options.data);
  options = $.extend({
    type: "POST",
    beforeSend: function beforeSend(a) {
      a.setRequestHeader("DPZ-Language", dpz.market.activeLanguageCode);
    },
    url: jsDPZ.config.power.emailOptInAndOut(),
    dataType: "text",
    contentType: "application/json; charset=utf-8"
  }, options);

  if (!jsDPZ.util.empty(options.data)) {
    options.data = jsDPZ.dataConversion.JSONObjectToString(options.data);
    return jsDPZ.ajax.request(options);
  }
};
/**
* BEGIN CA OVERRIDE customerSave
* 
* 2018-04-30 RELEASE - OAuth implementation for CA - do not do this override!
* 
* DNR-708 / DNR-740 : On customer account creation, if customer opted-in to loyalty, fetchLoyaltySummary call is being made
*  without Basic Authentication being set.  Need to try and intercept and set auth after account creation, but before loyalty
*  call
* 
*
jsDPZ.ajax.customerSave = function(options){
    authorizeAfterCustomerSave = !!(options.data.useOAuthNoBasicAuth && options.data.Password);
    delete options.data.useOAuthNoBasicAuth;
    var pSave = options.data.Password;
    // This turns on phone validation on the backend. The unconventional name is for obscurification, not my choice.
    options.data.phoneAB = "B";
    var isLoyaltyEnrollment = options.data.Loyalty && options.data.Loyalty.Command === "ENROLL",
        // Save off only the customer data, so that we don't run a success function until we are ready
        requestData = { data : $.extend(true, {}, options.data) },
        // Initiate customer object where all customer data will be combined
        customerObj = $.extend(true, {}, jsDPZ.config.dataModel.CUSTOMER);
     if(isLoyaltyEnrollment) { // If this is a loyalty enrollment, we need to fetch the loyalty summary and combine the data
        return jsDPZ.ajax.customerSavePowerCall(requestData) // initiate profile save sequence
        .fail(function(errorData) {
            if(options && options.error) options.error(errorData);
            //REFACTOR NOTE PART 1
            //We use passThrough = true to let the next fail know to return the errorData
            //without running any additional logic. We will want to refactor this in the
            //future. We need to investigate if we can short circuit/break the promise
            //chain in this fail.
            errorData.passThrough = true;
            return errorData;
        })
        .then(function(data) {
            $.extend(true, customerObj, data);
            // Force Basic authentication here
            if (jsDPZ.util.oauth.fallBackToBasicAuth()) {
                jsDPZ.util.basicAuth.authorization(customerObj.Email, pSave);
            }
            return jsDPZ.ajax.fetchLoyaltySummary(customerObj.CustomerID)
            .fail(function(errorData) {
           	 // CA - In case the new profile creation has not had a chance to propagate, causing the first fetch to fail,
           	 //  Try to fetch loyalty one more time before punting
                return jsDPZ.ajax.fetchLoyaltySummary(customerObj.CustomerID)
                .fail(function(errorData) {
                    //REFACTOR NOTE PART 2
                    //See REFACTOR NOTE PART 1; this conditional statement will be replaced
                    //in the future.
                    if(errorData.passThrough) {
                        return errorData;
                    }
                    jsDPZ.app.customer.getCustomer().data.Session.loyaltyIsOk = false;
                    site.sessionTools.save();
                    return customerObj;
                })
             .then(function(loyaltyData) {
                 $.extend(true, customerObj.Loyalty, loyaltyData);
                 delete customerObj.Loyalty.CustomerID;
                 if(options && options.success) options.success(customerObj);
                 return customerObj;
             });
            })
            .then(function(loyaltyData) {
                $.extend(true, customerObj.Loyalty, loyaltyData);
                delete customerObj.Loyalty.CustomerID;
                if(options && options.success) options.success(customerObj);
                return customerObj;
            });
        });
    } else {
        return jsDPZ.ajax.customerSavePowerCall(options);
    }
};
*/

/**
 * Override base dpz.ajax.customerLogin to check for loyalty data every login
2017-02-20 release - remove override - set loyalty: true in killConfig
jsDPZ.ajax.customerLogin = function(options) {
   // If loyalty is active, we need to combine two calls to get the loyalty summary
   if ( options.data ) {
//        if ( options.data && options.data.loyaltyIsActive ) {
       var
           customerObj = $.extend(true, {}, jsDPZ.config.dataModel.CUSTOMER),
           // Save off the original "options" passed from NOLO, since we will use the
           // callbacks after the entire process is complete
           loginOptions = $.extend(true, { error: $.noop, complete: $.noop, success: $.noop }, options),
           // We only want to send the username and password for the initial login,
           // since we don't want to run NOLO success and error callbacks yet
           loginCredentials = { data : $.extend(true, {}, loginOptions.data) }
       ;
        return jsDPZ.ajax.customerLoginPowerCall(loginCredentials) // initiate login sequence
       .then(
           function profileLoginSuccess(data){ // After successful login, fetch loyalty data
               $.extend(true, customerObj, data);
               successfulProfileLogin = true;
               if(jsDPZ.util.oauth.fallBackToBasicAuth() && options && options.data && options.data.u && options.data.p){
                   jsDPZ.util.basicAuth.authorization(options.data.u, options.data.p);
               }
               return jsDPZ.ajax.fetchLoyaltySummary(customerObj.CustomerID);
           },
           function profileLoginFailure(errorData){
               loginOptions.error(errorData);
               loginOptions.complete(errorData);
               //REFACTOR NOTE PART 1
               //We use passThrough = true to let the next fail know to return the errorData
               //without running any additional logic. We will want to refactor this in the
               //future. We need to investigate if we can short circuit/break the promise
               //chain in this fail.
               errorData.passThrough = true;
               return errorData;
           }
       )
       .then(
           function loyaltyLoginSuccess(data){
               $.extend(true, customerObj.Loyalty, data);
               delete customerObj.Loyalty.CustomerID;
               loginOptions.success(customerObj);
               loginOptions.complete(data);
               return customerObj;
           },
           function loyaltyLoginFailure(errorData){
               //REFACTOR NOTE PART 2
               //See REFACTOR NOTE PART 1; this conditional statement will be replaced
               //in the future.
               if(errorData.passThrough){
                   return errorData;
               } else {
                   // If we hit a loyalty login error, go ahead and successfully log user in
                   // without loyalty summary data
                   loginOptions.success(customerObj);
                   var promise;
                   if ( errorData.status === 404 ) {
                       // Remove the loyalty coupons from the order
                       promise = jsDPZ.app.order.getOrder().removeCoupons({
                           successFilter : function( coupon, catalogCoupon ) {
                               return catalogCoupon.isLoyaltyCoupon();
                       }}).then(function(){ return customerObj});
                   } else {
                       // If we have an error 500 we set the loyalty ok flag to false (something broke up)
                       jsDPZ.app.customer.getCustomer().data.Session.loyaltyIsOk = false;
                       promise = $.Deferred();
                       promise.resolve(customerObj);
                   }
                   return promise;
               }
           }
       )
       .then(function(data) {
           site.sessionTools.save();
           loginOptions.complete(data);
           return data;
       });
   } else {
       return jsDPZ.ajax.customerLoginPowerCall(options);
   }
};
*/

/**
 * Override base jsDPZ.app.store.setStoreFromPower carry over address-based IsDeliveryStore value
 */

jsDPZ.app.store.setStoreFromPower = function (options) {
  var powerStoreData = jsDPZ.app.store.getStore().setDataFromPower(options);
  powerStoreData.data.IsDeliveryStore = options.AllowDeliveryOrders;
  return powerStoreData;
}; // BEGIN CA CHANGES DNR-173
// Commented out per Mickey M. 2017-07-19 by Karl B.

/**
 * Override base src/main/webapp/assets/build/js/core/libraries.js multiplying sidea when adding Additional Side Variants to order
 */
//    $("#_dpz").on('click', '#genericOverlay form button.btn', function(e) {
//        require(["simplr"], function(simplr) {
//    	    var sides = [],
//    	        selections = simplr.form.mGetValues('#genericOverlay'),
//    	        catalog = jsDPZ.app.catalog.getCatalog(),
//    	        order = jsDPZ.app.order.getOrder();
//
//            // Create list of sides based on user selections to capture quantity
//    	    $.each(selections, function(key,val){
//                if (key.indexOf("|Side|") > -1)  {
//                    var name,
//                        productSides = catalog.getAvailableProductSidesData(key.split('|')[0]);
//                    $.each(productSides, function(){
//                        if (this.Code === key.split('|')[2]) {
//                            name = this.Name;
//                        }
//                    });
//                    sides.push({Product: key, Qty: val, Name: name});
//                }
//            });
//
//            if (!jsDPZ.util.empty(sides)) {
//                // Loop through user selected sides
//                $.each(sides, function(i){
//                    // Loop through order sides and assign user selected qty
//                    $.each(order.data.Details.Variants, function(){
//                        if (sides[i].Name.toLowerCase() === this.Code.toLowerCase()) {
//                            var sideQuantity = parseInt(sides[i].Qty),
//                                selector = 'select[name="' + this.ID + '|Quantity"]';
//
//                            if (this.Qty !== sideQuantity) {
//                                // Update dpz order variant quantity
//                                this.Qty = sideQuantity;
//
//                                // Wait for UI to get updated
//                                var viewUpdateInterval = setInterval(function(){
//                                    if($(selector).length) {
//                                        // Update UI with quantity
//                                        $(selector).removeAttr("selected");
//                                        $(selector).val(sideQuantity).change();
//                                        $(selector).find('option[value="' + sideQuantity + '"]').attr("selected",true);
//
//                                        clearInterval(viewUpdateInterval);
//                                    }
//                                },50);
//                            }
//                        }
//                    });
//                });
//            }
//        });
//    });
// END CA CHANGES DNR-173
// BEGIN CA CHANGES DNR-409

/**
 * Override base src/main/webapp/assets/base/js/views/homepage/index/order-history.js easy order and re-order payment type label
 */
// wait for UI to set its elements


var pendingViewInterval = setInterval(function () {
  // check if page is the home page and user is logged in
  if ($(".js-homeWrapper.is-profiled").length) {
    // loop through all payment sections
    $('.grid--duo-list__icon--settingsServiceMethod').each(function () {
      // check if payment section is Carryout if so reset the label in the view
      if ($(this).hasClass('Carryout')) {
        // the value of the payment type is set as a class on the "--settingPayment" element, set all classes of this element
        // onto a string to find a match to the term "Credit" - this will determined what label to use.
        // when the payment type is Credit use "Credit" everything else use "Pay at Store"
        var elementClasses = $(this).parent('li').next().find('.grid--duo-list__icon--settingsPayment').attr('class'); // set the label

        var newLabel = elementClasses.indexOf('DoorCredit') !== -1 ? 'Pay at Store' : 'Credit'; // find the element to update and update it

        $(this).parent('li').next().find('.grid--duo-list__item__description').html(newLabel);
      }
    }); // stop interval checking for UI to get set with elements

    clearInterval(pendingViewInterval);
  }
}, 50); // END CA CHANGES DNR-409
//# sourceMappingURL=jsdpz.override.js.map

jsDPZ.config.power.setUrlPrefixes(urlConfig);

//# sourceMappingURL=boot.js.map
