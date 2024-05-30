$(document).ready(function(){var b=new URLSearchParams(window.location.search);
var a=b.has("prepopulate")?b.get("prepopulate"):"";
var c=window["prepopulate"+a];
if(c){c(b)
}});
function prepopulateCarForm(e){var o={};
var l={pickUpDate:{domElementSelector:"#pickUpDate",domElementDefaultValue:"Pick-Up"},returnDate:{domElementSelector:"#dropOffDate",domElementDefaultValue:"Return"}};
var i="11:00AM";
var c={carType:{domElementSelector:"#category",domElementDefaultValue:"ECONOMY"},pickUpLocation:{domElementSelector:"#pickUpLocation",domElementDefaultValue:""},pickUpTime:{domElementSelector:"#pickUpTime",domElementDefaultValue:i},returnLocation:{domElementSelector:"#dropOffLocation",domElementDefaultValue:""},returnTime:{domElementSelector:"#dropOffTime",domElementDefaultValue:i}};
var k=extractDataFromUrlParameters(l,e);
var j;
var h=extractDataFromUrlParameters(c,e);
var m=$(c.carType.domElementSelector);
var f=$(l.pickUpDate.domElementSelector);
var b=$(c.pickUpLocation.domElementSelector);
var d=$(c.pickUpTime.domElementSelector);
var g=h[c.pickUpTime.domElementSelector];
var a=$(l.returnDate.domElementSelector);
var n=$(c.returnLocation.domElementSelector);
var q=$(c.returnTime.domElementSelector);
var p=h[c.returnTime.domElementSelector];
h[c.pickUpTime.domElementSelector]=convert24To12HoursFormat(g);
h[c.returnTime.domElementSelector]=convert24To12HoursFormat(p);
populateForm(h);
if(b.val()!==c.pickUpLocation.domElementDefaultValue&&b.val()!==null){o["#pickUpLocation_displayed"]=$("#pickUpLocation option:selected").text();
$("#pickUpLocation_displayed").removeClass("form_optional")
}if(n.val()!==c.returnLocation.domElementDefaultValue&&n.val()!==null){o["#dropOffLocation_displayed"]=$("#dropOffLocation option:selected").text();
$("#dropOffLocation_displayed").removeClass("form_optional")
}populateForm(o);
if(d.val()===null){d.val(c.pickUpTime.domElementDefaultValue)
}if(q.val()===null){q.val(c.returnTime.domElementDefaultValue)
}if(m.val()===null){m.val(c.carType.domElementDefaultValue)
}j=transformFormDataFromISO8601ToMonthDayYearSystemFormat(k);
populateFormDateInputs(j);
if(f.val()!==l.pickUpDate.domElementDefaultValue){f.removeClass("form_optional")
}if(a.val()!==l.returnDate.domElementDefaultValue){a.removeClass("form_optional")
}}function extractDataFromUrlParameters(d,a){var c;
var b={};
Object.keys(d).forEach(function(e){c=d[e];
b[c.domElementSelector]=a.has(e)?decodeURIComponent(a.get(e)):c.domElementDefaultValue
});
return b
}function populateFormDateInputs(b){var a;
Object.keys(b).forEach(function(c){a=b[c];
if(a!==null&&a!==undefined){$(c).datepicker("setDate",a)
}})
}function populateForm(b){var a;
Object.keys(b).forEach(function(c){a=b[c];
if(a!==null&&a!==undefined){$(c).val(a)
}})
}function convert24To12HoursFormat(e){var d=null;
var b;
var c=validate24HoursFormat(e);
var a;
if(c){b=c[1];
a=b>=12?"PM":"AM";
b=(b%12)||12;
d=(b<10?"0"+b:b);
d+=c[2]+c[3]+a
}return d
}function transformFormDataFromISO8601ToMonthDayYearSystemFormat(c){var a;
var b;
Object.keys(c).forEach(function(d){b=c[d];
a=new Date(b+"T00:00:00");
c[d]=(a=="Invalid Date")?null:a
});
return c
}function validate24HoursFormat(f){const b="(2[0-3]|[0-1]?[0-9])";
const d="(:)";
const c="([0-5]?[0-9])";
var e=new RegExp("^"+b+d+c+"$",["i"]);
var a=e.exec(f);
return a
};