(function () {
  var player = jwplayer("video_player");

  var UA = UAParser(navigator.userAgent);

  var isSmartTV = function () {
    return UA.device.type === "smarttv";
  };

  var isDesktop = function () {
    return UA.device.type !== "mobile" && UA.device.type !== "tablet";
  };

  var isPromotionTime = function () {
    var now = Date.now();

    // NOTE: production이 아닌 경우 테스트 편의를 위해 시작 날짜만 0으로 세팅함.
    var start = isProduction() ? new Date("13 Mar 2021 08:00:00 GMT") : 0;
    var end = new Date("16 Mar 2021 06:59:59 GMT");

    return start <= now && now <= end;
  };

  var isHideEnd = function () {
    var hideEndTime = localStorage.getItem("hope_concert_hide");
    return !hideEndTime || hideEndTime < Date.now();
  };

  var showPromotion = function () {
    if (isPromotionTime()) {
      hideAppsFlyer();

      if (isHideEnd() && !isSmartTV()) {
        onResize();
        window.addEventListener("resize", onResize);
        initPlayer();
        openPopup();
      }
    }
  };

  var hideAppsFlyer = function () {
    var styleEl = document.createElement("style");
    styleEl.type = "text/css";

    var css = "#af-smart-banner.afb-container { display: none; }";

    styleEl.appendChild(document.createTextNode(css));
    document.head.appendChild(styleEl);
  };

  var onResize = function () {
    if (innerWidth < 768 || window.outerWidth < 768) {
      $("#hope_concert").addClass("popup-small");
      if (!isDesktop()) {
        $("#hope_concert .popup-container").css("transform", "scale(" + 981 / window.outerWidth + ")");
      }
    } else {
      $("#hope_concert").removeClass("popup-small");
      $("#hope_concert .popup-container").css("transform", "scale(1)");
    }
  };

  var checkAutoplaySupport = function () {
    return new Promise(function (resolve) {
      var video = canAutoplay.video;
      video({ muted: false, inline: true }).then(function (data) {
        var canUnmuteAutoplay = data.result;
        if (canUnmuteAutoplay) {
          resolve({ autoplay: true, muted: false });
          return;
        } else {
          video({ muted: true, inline: true, timeout: 1000 }).then(function (data) {
            var canMuteAutoplay = data.result;
            if (canMuteAutoplay) {
              resolve({ autoplay: true, muted: true });
            } else {
              resolve({ autoplay: false, muted: false });
            }
          });
        }
      });
    });
  };

  var initPlayer = function () {
    odkPlayer.init([
      {
        tracks: playlist[0].tracks,
        sources: playlist[0].sources,
        image:
          "https://d2y2efdi5wgkcl.cloudfront.net/fit-in/1366x1366/media-io/2021/2/26/odk-concert-thumbnai.3ca46c73.png",
      },
    ]);

    checkAutoplaySupport().then(function (result) {
      var autoplay = result.autoplay;
      var muted = result.muted;
      player.setMute(muted);
      autoplay && player.play();

      if (muted) {
        var $tapToUnmuteContainer = $(".tap-to-unmute-container");
        $tapToUnmuteContainer.removeClass("hidden");
        $tapToUnmuteContainer.one("click", function () {
          $tapToUnmuteContainer.addClass("hidden");
          player.setMute(false);
        });
      }
    });
  };

  var closePopup = function () {
    $("body").removeClass("hope_concert_popup");
    player.remove();
  };

  var openPopup = function () {
    $("body").addClass("hope_concert_popup");
    sendGTMEvent(GTM_EVENTS.IMPRESSION);
  };

  var onPopupCloseWithButton = function () {
    closePopup();
    sendGTMEvent(GTM_EVENTS.CLOSE_BUTTON);
  };

  var onPopupCloseWithEmptyArea = function () {
    closePopup();
    sendGTMEvent(GTM_EVENTS.EMPTY_AREA);
  };

  var isProduction = function () {
    return location.host === "www.ondemandkorea.com";
  };

  var onHideFor1Day = function () {
    closePopup();
    sendGTMEvent(GTM_EVENTS.ONE_DAY_CLOSE_BUTTON);
    // NOTE: production이 아닌 경우 테스트 편의를 위해 30초만 숨긴다.
    var hideTime = isProduction() ? 60 * 60 * 24 * 1000 : 30 * 1000;
    localStorage.setItem("hope_concert_hide", Date.now() + hideTime);
  };

  var onWatchNow = function () {
    closePopup();
    sendGTMEvent(GTM_EVENTS.ODK_BUTTON);
  };

  dfp_dict["category"] = "variety";
  dfp_dict["program"] = "odk-concert";
  dfp_dict["partner"] = "odk-nasa";
  dfp_dict["episode"] = "odk-concert-hope";

  dataLayer.push({
    videoCategory: "variety",
    episodeSlug: "odk-concert-hope",
  });

  var GTM_EVENTS = {
    IMPRESSION: "Hope Concert impression",
    CLOSE_BUTTON: "Hope Concert close button",
    ONE_DAY_CLOSE_BUTTON: "Hope Concert 1day close button",
    ODK_BUTTON: "Hope Concert ODK button",
    EMPTY_AREA: "Hope Concert empty area",
  };

  var sendGTMEvent = function (eventName) {
    dataLayer.push({ event: eventName });
  };

  $("#hope_concert .close").on("click", onPopupCloseWithButton);
  $("#hope_concert > .dim").on("click", onPopupCloseWithEmptyArea);
  $("#hide_for_1_day").on("click", onHideFor1Day);
  $("#watch_now").on("click", onWatchNow);

  showPromotion();
})();
