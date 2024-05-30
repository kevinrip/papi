var SWA=SWA||{};
SWA.autocomplete=SWA.autocomplete||{};
SWA.autocomplete.air=SWA.autocomplete.air||{};
SWA.autocomplete.air.callbacks=(function(){var d={ACTIVE:"ac_over"};
var b={};
var c;
var a;
b.init=function(e,f){c=e||SWA.autocomplete.air.model;
a=f||SWA.autocomplete.air.inputs;
return b
};
b.highlightStation=function(m,l,k){if(h()){f(1);
return 1
}else{if(e()){for(var g=1;
g<m.length;
g++){var j=m.slice(g,g+1);
if(j.text().toLowerCase().indexOf(k)!=-1){j.addClass(d.ACTIVE);
return 1
}}}}f(0);
function h(){return l[0].children
}function e(){return k.toLowerCase()==="dfw"
}function f(i){m.slice(i,i+1).addClass(d.ACTIVE)
}return 0
};
b.customMatching=function(f,g){function i(j,k){return j.substr(0,k.length).toLowerCase()===k.toLowerCase()||j.replace(/[\.,\(\)\-]/,"").substr(0,k.length).toLowerCase()===k.toLowerCase()
}function h(j,k){return j.split(" - ")[1].toLowerCase()===k.toLowerCase()
}function e(k,l){var j=k.split("/");
if(j.length>1){return i(j[1],l)
}else{return false
}}return i(f,g)||h(f,g)||e(f,g)
};
b.formatResult=function(f,e){if(e){return f.substring(0,f.indexOf(","))
}return f
};
b.getNotFoundMessage=function(h){function g(i){if(a.isPointsSelected()){return SWA.AutocompleteUtils.isMarketedBySouthwest(stations_info,SWA.AutocompleteUtils.extractStationCode(i))
}return true
}function e(){var l=c.stationsRepository.getStations();
for(var j=0;
j<l.length;
j++){var k=l[j];
if(g(k.name)&&f(k,h)){return true
}}return false
}function f(l,m){if(l.isRegion){var k=l.children;
for(var j=0;
j<k.length;
j++){if(b.customMatching(k[j].name,m)){return true
}}return false
}return b.customMatching(l.name,m)
}if(e()){if(a.destinationTextField()&&a.destinationTextField().attr("disabled")){return"Invalid route with arrival airport"
}else{return"Invalid route with departure airport"
}}return"No airport found"
};
b.sortRows=function(i,h){var h=h.toLowerCase();
function e(j){return j.substr(0,h.length).toLowerCase()===h||j.replace(/[\.,\(\)\-]/,"").substr(0,h.length).toLowerCase()===h
}function g(k){for(var j=0;
j<k.children.length;
j++){if(h===k.children[j].id.toLowerCase()){return true
}}return false
}function f(n,m){var l=n.id.toLowerCase();
var k=m.id.toLowerCase();
if(n.parent&&m.parent){if(l==="dal"&&k==="dfw"){return 0
}else{if(l==="dfw"&&k==="dal"){return 0
}}}else{if(h!="dfw"){if(l=="dal"&&k=="dfw"){return -1
}else{if(l=="dfw"&&k=="dal"){return 1
}}}}if(l===h){return -1
}if(k===h){return 1
}if(n.parent&&m.parent){if(e(n.value)&&!e(m.value)){return -1
}else{if(e(m.value)&&!e(n.value)){return 1
}}}if(n.children&&g(n)){return -1
}if(m.children&&g(m)){return 1
}var j=n.value.toLowerCase()<m.value.toLowerCase();
if(j){return -1
}else{if(n.value.toLowerCase()===m.value.toLowerCase()){return 0
}}return 1
}return i.sort(f)
};
return b
})();