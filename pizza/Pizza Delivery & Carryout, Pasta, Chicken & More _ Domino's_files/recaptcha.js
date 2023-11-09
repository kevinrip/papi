"undefined" != typeof window &&
  (void 0 === window.grecaptcha && (window.grecaptcha = {}),
  (window.grecaptcha.ready = (e) => {
    if (void 0 === window.grecaptcha) {
      let a = "___grecaptcha_cfg";
      (window[a] = window[a] || {}),
        (window[a].fns = window[a].fns || []).push(e);
    } else e();
  }));
