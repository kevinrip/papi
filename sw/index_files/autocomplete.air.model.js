var SWA=typeof(SWA)==="undefined"?{}:SWA;
SWA.autocomplete=SWA.autocomplete||{};
SWA.autocomplete.air=SWA.autocomplete.air||{};
SWA.autocomplete.air.model=(function(){var a={};
a.createStation=function(d,e,c,b){var f={id:d,name:e,routes:c||{},isRegion:false,isStation:true,regionId:undefined,countryCode:b,isInternational:function(){return b!=="US"
},isInRegion:function(){return f.regionId==undefined?false:true
},hasRouteTo:function(g){return typeof f.routes[g]!="undefined"
}};
return f
};
a.createRegion=function(c,d,e,b){var f={id:c,name:d,children:e||[],isRegion:true,isStation:false,countryCode:b,isInternational:function(){return b!=="US"
}};
return f
};
a.stationsRepository=(function(){var k={};
var f=[];
var e={};
var g=false;
var b=false;
var i={};
var d={};
k.switchToSwaRoutesOnly=function(l){if(!b){i=routes;
d=stations_info;
b=true
}if(l){stations_info=swa_stations_info;
routes=swa_routes
}else{stations_info=d;
routes=i
}f=[];
e={};
g=false;
j()
};
function j(){if(g){return
}else{g=true
}var p={};
var o={};
n();
q();
m();
function n(){for(var t in routes){var s=r(t);
if(!s){continue
}if(s.isRegion){f.push(s);
p[t]=s
}else{o[t]=s
}e[t]=s
}}function q(){for(var s in p){var x=p[s];
var w=x.children;
x.children=[];
for(var u=0;
u<w.length;
u++){var y=w[u];
var t=o[y];
if(t){var v=o[y];
v.regionId=x.id;
x.children.push(v);
delete (o[y])
}}}}function m(){for(var s in o){f.push(o[s])
}}function l(s){return routes[s].children&&routes[s].children.length
}function r(s){var t=stations_info[s];
if(t){if(l(s)){return a.createRegion(s,t.display_name,routes[s].children,t.countryCode)
}return a.createStation(s,t.display_name,routes[s].routesServed,t.countryCode)
}return null
}}function c(l,p){var o=a.createRegion(p.id,p.name,[],p.countryCode);
for(var n=0;
n<p.children.length;
n++){var m=p.children[n];
if(m.hasRouteTo(l.id)){o.children.push(m)
}}return o
}function h(l,p){var o=a.createRegion(p.id,p.name,[],p.countryCode);
for(var n=0;
n<p.children.length;
n++){var m=p.children[n];
if(l.hasRouteTo(m.id)){o.children.push(m)
}}return o
}k.getStationsWithRoutesTo=function(n){j();
var m=k.getStation(n);
var r=k.getStations();
var l=[];
for(var p=0;
p<r.length;
p++){var q=r[p];
if(q.isStation){if(q.hasRouteTo(m.id)){l.push(q)
}}else{var o=c(m,q);
if(o.children.length>0){l.push(o)
}}}return l
};
k.getStationsWithRoutesFrom=function(m){j();
var n=k.getStation(m);
var r=k.getStations();
var l=[];
if(n){for(var q=0;
q<r.length;
q++){var o=r[q];
if(o.isStation){if(n.hasRouteTo(o.id)){l.push(o)
}}else{var p=h(n,o);
if(p.children.length>0){l.push(p)
}}}}return l
};
k.getStations=function(){j();
return f
};
k.getStation=function(l){j();
return e[l]
};
return k
})();
return a
})();