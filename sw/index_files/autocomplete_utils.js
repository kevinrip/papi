var SWA=SWA||{};
SWA.AutocompleteUtils=function(){function l(p,q){if(typeof routes=="undefined"||$.isEmptyObject(routes)||typeof routes[p].routesServed[q]!="undefined"){return true
}else{return false
}}function e(r,q,p){$(r).blur(function(){var t=$(r).val();
var u=false;
if(r.indexOf("destination")>0){var v=$("#originAirport_displayed").val();
if(v){var w=v.substr(v.length-3);
if(q[w]){var x=t.substr(t.length-3);
if(!l(w,x)){u=true
}}}}if(u||!q[t.substr(t.length-3)]){var s=r.split("_displayed")[0];
$(s).val(p)
}});
$(r).focus(function(){var s=$(r).val();
if(!q[s.substr(s.length-3)]){$(r).val("")
}})
}function f(r,q){for(var p=0;
p<r.length;
p++){if(r[p]===q){return true
}}return false
}function b(t,r){var s=r.toString().substr(-3,3);
for(var q=0;
q<t.length;
q++){var p=t[q].substr(-3,3);
if(p==s){return true
}}return false
}function h(r,p){for(var q=0;
q<r.length;
q++){if(p(r[q])){return true
}}return false
}function m(p,q){return a("WN",p,q)
}function a(r,p,t){var s=p[t];
var q=s.marketing_carrier_codes;
return q.toString().search(r)>=0
}function k(q,p,t){var s=p[t];
if(typeof s!="object"){return false
}var r=s.operating_carrier_codes;
return r.toString()==q
}function d(p){var q=p;
$.each(q,function(r,s){if(s.countryCode!=="US"){delete q[r]
}});
return q
}function n(p){return typeof p=="undefined"
}function c(p){if(typeof p=="undefined"||p==null||p==""){return""
}return p.substr(p.length-3)
}function g(){o().attr("disabled","")
}function o(){return $("#imgpoints").length>0?$("#imgpoints"):$("#points")
}function j(r,p){if(!r||r===""){return""
}var q=p[r];
if(!q){return""
}return q.display_name
}function i(p,t,r){var s=new Date(p);
var q=new Date(t);
if(!r){r=new Date();
r.setHours(0);
r.setMinutes(0);
r.setSeconds(0);
r.setMilliseconds(0)
}return s>=r&&q>=r&&s<=q
}return{bindAirportClearOnSelectAndDeselect:e,contains:f,containsCity:b,any:h,isMarketedBySouthwest:m,filterInternationalStationsInfo:d,extractStationCode:c,enablePoints:g,stationDisplayedNameFromStationCode:j,validateDepartAndReturnDate:i}
}();