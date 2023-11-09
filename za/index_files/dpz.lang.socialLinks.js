define([], function anonymous(
) {
var pluralFuncs = {
  en: function(n, ord) {
    var s = String(n).split('.'), v0 = !s[1], t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
    if (ord) return (n10 == 1 && n100 != 11) ? 'one'
        : (n10 == 2 && n100 != 12) ? 'two'
        : (n10 == 3 && n100 != 13) ? 'few'
        : 'other';
    return (n == 1 && v0) ? 'one' : 'other';
  }
};
var fmt = {};
var number = function(value, offset) {
  if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
  return value - (offset || 0);
};
var plural = function(value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key]();
  return data.other();
};
var select = function(value, data) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  return data.other()
};

return {
  "socialLinks.facebook": function(d) { return "Domino's Facebook Link"; },
  "socialLinks.instagram": function(d) { return "Domino's Instagram Link"; },
  "socialLinks.linkedin": function(d) { return "Domino's Linkedin Link"; },
  "socialLinks.pinterest": function(d) { return "Domino's Pinterest Link"; },
  "socialLinks.tiktok": function(d) { return "Domino's TikTok Link"; },
  "socialLinks.tumblr": function(d) { return "Domino's Tumblr Link"; },
  "socialLinks.twitter": function(d) { return "Domino's Twitter Link"; },
  "socialLinks.whatsapp": function(d) { return "Domino's Whatsapp Link"; },
  "socialLinks.youtube": function(d) { return "Domino's Youtube Link"; }
}
}
);
