var odkPlayer = (function () {
  var CAPTION_CODE_MAP = {
    off: "off",
    english: "en",
    español: "es",
    português: "pt",
    "中文(简体)": "cn",
    "中文(繁体)": "tw",
    한글: "kr",
  };

  var player = jwplayer("video_player");
  var continueWatchingUrl = null;
  var nextEpisodeUrl = null;
  var episodeId = null;
  var firstPlay = true;
  var logUrls = [];
  var playlist = null;
  var lastPlayPos = 0;
  var hasPassFlag = false;
  var messages = {};
  var cdnProvider = null;
  var googleAdTag = "";

  function getSeekPositionFromCookie() {
    var searchParams = new URLSearchParams(location.search);
    var cwPos = searchParams.get("pos") - 0;
    var cookieStr = Cookies.get("last_position");
    var lastEpisodeId = "";
    var lastPosition = "";
    var pos = 0;

    // 쿠키에 저장된 마지막 위치가 현재 에피소드에 해당하는 위치일 경우에만 사용한다.
    if (cookieStr) {
      lastEpisodeId = cookieStr.split("|")[0];
      lastPosition = cookieStr.split("|")[1];

      if (episodeId === lastEpisodeId) {
        pos = parseInt(lastPosition, 10);
      }
    }

    // CW 위치(쿼리스트링 값)를 확인하고 이 값이 쿠키에 저장된 값보다 더 클때만 CW 위치를 사용한다.
    if (pos < cwPos) {
      pos = cwPos;
    }

    // to ensure replaying on last episode
    var videoDuration = parseInt(player.getDuration(), 10);
    var lastPositionInCookie = parseInt(lastPosition, 10);
    if (lastPositionInCookie === videoDuration || cwPos === videoDuration) {
      pos = 0;
    }

    return {
      type: "last_position",
      value: pos,
    };
  }

  // GA 로그 관련
  var firstFlag = true;
  var playingSeconds = {};
  var bufferSecond = 0;
  var beforeBufferSecond = 0;
  var tickTimer = null;
  var latestPlayEventTime = null;
  var latestBufferingStartTime = null;
  var isAdBreakStarted = false;

  function recordPlayingTime() {
    // JWPlayer로 실행되는 경우
    if (player && player.getState() === "playing") {
      var quality = player.getVisualQuality();

      if (!quality) {
        return;
      }

      var qualityLevel = quality.level.height.toString();
      if (!playingSeconds[qualityLevel]) {
        playingSeconds[qualityLevel] = 0;
      }
      playingSeconds[qualityLevel] += 1;
      bufferSecond = player.qoe().item.sums.stalled || 0;
      return;
    }

    // JWPlayer를 실행할수없는 경우, 버퍼링 시간은 알수없고 재생시간만 기록한다.
    var builtInPlayer = document.getElementById("contentElement");
    if (builtInPlayer && !builtInPlayer.paused) {
      if (!playingSeconds["720"]) {
        playingSeconds["720"] = 0;
      }
      playingSeconds["720"] += 1;
    }
  }

  function sendGAEveryFiveMin() {
    var bufferedFiveMin = (bufferSecond - beforeBufferSecond) / 1000;

    _.each(playingSeconds, function (value, key) {
      if (value > 0) {
        var params = {
          event: "everyFiveMinView",
          remainedViewSeconds: value,
          videoProfile: key,
        };

        if (isAdBreakStarted) {
          params.event = "adViewhourLog";
        }

        dataLayer.push(params);
      }
    });

    if (bufferedFiveMin > 0) {
      beforeBufferSecond = bufferSecond;
      dataLayer.push({
        event: "bufferedTime",
        bufferedSecond: bufferedFiveMin,
      });
    }

    // GA 보내고 객체를 초기화
    playingSeconds = _.mapObject(playingSeconds, function (v, k) {
      return 0;
    });
  }

  function sendGAFirstFiveSecView() {
    dataLayer.push({ event: "firstFiveSecView" });
    firstFlag = false;
  }

  function onTickTimer() {
    recordPlayingTime();

    // 누적된 재생시간 기록
    var playingTime = _.reduce(
      playingSeconds,
      function (memo, num) {
        return memo + num;
      },
      0
    );

    if (isAdBreakStarted) {
      return;
    }

    // 5초간 재생했다면 GA로 기록하자.
    if (firstFlag && playingTime === 5) {
      sendGAFirstFiveSecView();
      return;
    }

    // 재생시간을 5분간 누적해서 GA로 기록하자.
    if (playingTime === 300) {
      sendGAEveryFiveMin();
    }
  }

  // Note: KW-4733 default volume 관련
  var VOLUME_KEY = "odk_player_volume";
  var DEFAULT_VOLUME = 50;

  function loadVolume() {
    try {
      var volume = Cookies.get(VOLUME_KEY);
      if (volume) {
        return parseInt(volume, 10);
      }
    } catch (e) {}
    return DEFAULT_VOLUME;
  }

  function saveVolume(volume) {
    Cookies.set(VOLUME_KEY, volume);
  }

  $(window).bind("beforeunload", function () {
    sendGAEveryFiveMin();
  });

  return {
    setConfig: function (
      _episodeId,
      _continueWatchingUrl,
      _nextUrl,
      _logUrls,
      _loginBtnCode,
      _isMember,
      _hasPassFlag,
      _messages,
      _cdnProvider,
      _googleAdTag
    ) {
      episodeId = _episodeId;
      continueWatchingUrl = _continueWatchingUrl || null;
      nextEpisodeUrl = _nextUrl || null;
      logUrls = _logUrls.length ? _logUrls : [];
      loginBtnCode = _loginBtnCode || "";
      hasPassFlag = !!_hasPassFlag;
      messages = _messages;
      cdnProvider = _cdnProvider;
      googleAdTag = _googleAdTag;

      dataLayer.push({ cdnProvider: cdnProvider });
    },

    init: function (_playlist) {
      playlist = _playlist;

      this.initPlayer();
    },

    initPlayer: function () {
      player.setup({
        width: "100%",
        height: "100%",
        primary: "html5",
        preload: "auto",
        playlist: playlist,
        advertising: {
          client: "googima",
          tag: googleAdTag,
        },
        captions: {
          color: "#FFFFFF",
          fontSize: 14,
          backgroundOpacity: 70,
          backgroundColor: "#000",
        },
        abouttext: "OnDemandKorea Player",
        aboutlink: "https://www.ondemandkorea.com",
        controls: true,
        skin: {
          timeslider: {
            progress: "#3EBF11",
          },
          controlbar: {
            icons: "#F2F2F2",
            iconsActive: "#3EBF11",
          },
        },
        volume: loadVolume(),
        playbackRateControls: true,
      });

      player.on("firstFrame", odkPlayer.onFirstFrame);
      player.on("time", odkPlayer.onTime);
      player.on("seek", odkPlayer.onSeek);
      player.on("play", odkPlayer.onPlay);
      player.on("pause", odkPlayer.onPause);
      player.on("playlist", odkPlayer.onPlaylist);
      player.on("complete", odkPlayer.onComplete);
      player.on("setupError", odkPlayer.onSetupError);
      player.on("captionsChanged", odkPlayer.onCaptionsChanged);
      player.on("adImpression", odkPlayer.onAdImpression);
      player.on("buffer", odkPlayer.onBuffer);
      player.on("visualQuality", odkPlayer.onVisualQuality);
      player.on("volume", odkPlayer.onVolumeChange);
      player.on("adBreakStart", odkPlayer.onAdBreakStart);
      player.on("adBreakEnd", odkPlayer.onAdBreakEnd);

      // 재생 기록 계산을 위한 타이머
      tickTimer = setInterval(onTickTimer, 1000);
    },

    onFirstFrame: function (e) {
      dataLayer.push({
        event: "videoFirstFrame",
        waitingTimeMs: Math.floor(e.loadTime),
        videoProfile: odkPlayer.getVisualQualityString(),
        cdnProvider: cdnProvider,
      });

      latestPlayEventTime = new Date().getTime();

      // 이전 재생 위치로 이동
      var seekPosition = getSeekPositionFromCookie();
      if (seekPosition.value > 0) {
        return player.seek(seekPosition.value);
      }

      odkPlayer.sendUserContinueWatching(0);
    },

    onTime: function (e) {
      var curPos = parseInt(e.position, 10);

      //  1초보다 작은 단위로 호출되므로 초단위 계산이 중복되지 않는지 확인이 필요한다.
      if (lastPlayPos === curPos) {
        return;
      }

      // 30초에 한번씩 CW 서버에 저장
      if (Math.floor(e.position % 30) === 0) {
        odkPlayer.sendUserContinueWatching(curPos);
      }

      // 10일간 동영상ID와 플레이한 위치를 쿠키에 저장한다.
      Cookies.set("last_position", episodeId + "|" + curPos, { expires: 10 });
      lastPlayPos = curPos;
    },

    onSeek: function (e) {
      var curPos = parseInt(e.offset, 10);
      Cookies.set("last_position", episodeId + "|" + curPos, { expires: 10 });
      odkPlayer.sendUserContinueWatching(curPos);
    },

    onPlay: function (e) {
      /**
       * 동영상이 처음 플레이될때만 GA 수집
       * play 이벤트는 버퍼링될때, 멈춘후 다시 재개할때도 발생됨.
       */

      if (firstPlay) {
        firstPlay = false;
        var curCaptionIndex = player.getCurrentCaptions();
        var curCaptions = player.getCaptionsList();
        var curCaption = curCaptions[curCaptionIndex];
        var curCaptionLabel = curCaption.label.toLowerCase();
        var captionCode = CAPTION_CODE_MAP[curCaptionLabel];

        dataLayer.push({ captionLanguage: captionCode });
        dataLayer.push({ event: "firstVideoPlay" });
        odkPlayer.sendPlayLogForPopularity();
      }

      // buffer 이벤트가 발생했고 reason이 stalled인 경우, 즉 재생 중에 버퍼링이 발생한 경우
      // onBuffer 이벤트 코드에 의해 latestBufferingStartTime 값이 기록된다.
      // buffering이 끝난 후에 다시 재생 상태에 돌입해도 요 이벤트가 발생하므로
      // 이곳에서 buffering 완료 관련 GTM 이벤트를 처리한다.
      if (latestBufferingStartTime !== null && e.oldstate === "buffering") {
        dataLayer.push({
          event: "videoBufferingRepaired",
          repairTimeMs: new Date().getTime() - latestBufferingStartTime,
          videoProfile: odkPlayer.getVisualQualityString(),
          cdnProvider: cdnProvider,
        });
        latestBufferingStartTime = null;
      }

      latestPlayEventTime = new Date().getTime();
    },

    onPause: function (e) {
      /**
       * related to WWW-3708
       * 사용자가 일시정지 버튼을 눌러 발생한 정상적인 pause 이벤트는 pauseReason 이라는 프로퍼티가 'interaction' 값을 갖지만
       * 그 이외의 이유로 일시정지된 경우는 이 프로퍼티 자체가 들어있지 않다. 따라서 스마트티비에서 사용자가 일시정지 버튼을 누르지 않았는데
       * JW Player가 일시정지된 경우는 동영상 광고로 인해 브라우저가 정지시킨 것으로 보고 안내 문구를 띄운다.
       */
      if (hasPassFlag && !(e.pauseReason && e.pauseReason === "interaction")) {
        alert(messages.smart_tv_error_message);
      }

      // 사용자가 일시정지 버튼을 누른 경우 버퍼링 발생시간 기록에 필요한 값들을 날려버린다.
      latestPlayEventTime = null;
      latestBufferingStartTime = null;
    },

    onPlaylist: function (e) {
      dataLayer.push({ event: "playlistLoaded" });
    },

    onComplete: function (e) {
      if (nextEpisodeUrl) {
        document.location = nextEpisodeUrl;
      }
    },

    onSetupError: function (e) {
      /**
       * JWPlayer 에서 플랫폼 에이젼트를 확인후에 에러를 내는것으로 추정됨.
       * 크롬 브라우저에서 개발자모드를 켜고, 모바일 디바이스 형태로 디버깅하면 이 에러가 발생함
       * 사파리 브라우저에서는 이 문제가 발생하지 않음.
       */
      var errorMessage =
        "The video cannot be played because your device or browser is out-of-date. <br>" +
        "Please update your device or browser and try again. <br><br>" +
        "You can enjoy OnDemandKorea on our mobile app, Roku and Apple TV.";
      $("#video_player").html('<div id="errorMessage">' + gettext(errorMessage) + "</div>");
    },

    onCaptionsChanged: function (e) {
      var curCaptionLabel = e.tracks[e.track].label.toLowerCase();
      var captionCode = CAPTION_CODE_MAP[curCaptionLabel];
      dataLayer.push({ captionLanguage: captionCode });
      dataLayer.push({ event: "videoCaptionChanged" });
    },

    onAdBreakStart: function (e) {
      sendGAEveryFiveMin();
      isAdBreakStarted = true;
    },

    onAdBreakEnd: function (e) {
      sendGAEveryFiveMin();
      isAdBreakStarted = false;
    },

    onAdImpression: function (e) {
      var imaAd = e.ima && e.ima.ad.g;
      var adId = imaAd.adWrapperIds[0] || imaAd.adId;
      dataLayer.push({
        event: "videoAdImpression",
        adNetwork: e.adsystem,
        adTitle: e.adtitle,
        adWrapperId: adId,
      });
    },

    onBuffer: function (e) {
      // reason이 stalled인 경우가 플레이 중 버퍼링이 발생한 경우이다.
      if (e.reason === "stalled" && e.oldstate === "playing") {
        latestBufferingStartTime = new Date().getTime();

        // 버퍼링이 재생 이후 언제 발생했는지 기록한다.
        if (latestPlayEventTime !== null) {
          dataLayer.push({
            event: "videoBufferingStalled",
            nonstopPlayTimeMs: new Date().getTime() - latestPlayEventTime,
            videoProfile: odkPlayer.getVisualQualityString(),
            cdnProvider: cdnProvider,
          });
        }
      }
    },

    onVisualQuality: function (e) {
      if (e.reason === "auto") {
        dataLayer.push({
          event: "videoQualityChanged",
          nonstopPlayTimeMs: new Date().getTime() - latestPlayEventTime,
          videoProfile: e.level.height + "",
          cdnProvider: cdnProvider,
        });
      }
    },

    onVolumeChange: function (event) {
      saveVolume(event.volume);
    },

    getVisualQualityString: function () {
      return player.getVisualQuality().level.height + "";
    },

    sendUserContinueWatching: function (lastPost) {
      if (continueWatchingUrl) {
        var url = continueWatchingUrl.replace("LAST_POS", lastPost).replace("DURATION", player.getDuration());
        $.getJSON(url);
      }
    },

    sendPlayLogForPopularity: function () {
      /**
       * 기존 코드는 1px 짜리 이미지(log_pixel, log_pixel2, play_pixel)를 이용해 서버에 요청했지만
       * KCP 이후로는 ajax 호출로 변경함.
       */
      logUrls.forEach(function (url) {
        $.getJSON(url);
      });
    },
  };
})();
