!(function (n, e, r, o, t, s, a, c) {
  (n.RaygunObject = t),
    (n[t] =
      n[t] ||
      function () {
        (n[t].o = n[t].o || []).push(arguments);
      }),
    (s = e.createElement(r)),
    (a = e.getElementsByTagName(r)[0]),
    (s.async = 1),
    (s.src = o),
    a.parentNode.insertBefore(s, a),
    (c = n.onerror),
    (n.onerror = function (e, r, o, s, a) {
      c && c(e, r, o, s, a),
        a || (a = Error(e)),
        (n[t].q = n[t].q || []),
        n[t].q.push({ e: a });
    });
})(
  window,
  document,
  "script",
  "//cdn.raygun.io/raygun4js/raygun.min.js",
  "rg4js"
);
