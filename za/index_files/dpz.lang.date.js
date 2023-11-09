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
  "date.months_april": function(d) { return "April"; },
  "date.months_august": function(d) { return "August"; },
  "date.months_december": function(d) { return "December"; },
  "date.months_february": function(d) { return "February"; },
  "date.months_january": function(d) { return "January"; },
  "date.months_july": function(d) { return "July"; },
  "date.months_june": function(d) { return "June"; },
  "date.months_march": function(d) { return "March"; },
  "date.months_may": function(d) { return "May"; },
  "date.months_november": function(d) { return "November"; },
  "date.months_october": function(d) { return "October"; },
  "date.months_september": function(d) { return "September"; },
  "date.short_months_april": function(d) { return "Apr."; },
  "date.short_months_august": function(d) { return "Aug."; },
  "date.short_months_december": function(d) { return "Dec."; },
  "date.short_months_february": function(d) { return "Feb."; },
  "date.short_months_january": function(d) { return "Jan."; },
  "date.short_months_july": function(d) { return "July"; },
  "date.short_months_june": function(d) { return "June"; },
  "date.short_months_march": function(d) { return "Mar."; },
  "date.short_months_may": function(d) { return "May"; },
  "date.short_months_november": function(d) { return "Nov."; },
  "date.short_months_october": function(d) { return "Oct."; },
  "date.short_months_september": function(d) { return "Sept."; },
  "date.short_weekdays": function(d) { return ""; },
  "date.short_weekdays_friday": function(d) { return "Fri"; },
  "date.short_weekdays_monday": function(d) { return "Mon"; },
  "date.short_weekdays_saturday": function(d) { return "Sat"; },
  "date.short_weekdays_sunday": function(d) { return "Sun"; },
  "date.short_weekdays_thursday": function(d) { return "Thu"; },
  "date.short_weekdays_tuesday": function(d) { return "Tue"; },
  "date.short_weekdays_wednesday": function(d) { return "Wed"; },
  "date.weekdays_friday": function(d) { return "Friday"; },
  "date.weekdays_monday": function(d) { return "Monday"; },
  "date.weekdays_saturday": function(d) { return "Saturday"; },
  "date.weekdays_sunday": function(d) { return "Sunday"; },
  "date.weekdays_thursday": function(d) { return "Thursday"; },
  "date.weekdays_tuesday": function(d) { return "Tuesday"; },
  "date.weekdays_wednesday": function(d) { return "Wednesday"; }
}
}
);
