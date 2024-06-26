(function(){var ak=this,ae=ak._,ag={},au=Array.prototype,ad=Object.prototype,ap=Function.prototype,ay=au.push,aj=au.slice,aw=au.concat,am=ad.toString,at=ad.hasOwnProperty,af=au.forEach,ai=au.map,aq=au.reduce,ac=au.reduceRight,ar=au.filter,av=au.every,al=au.some,Z=au.indexOf,ax=au.lastIndexOf,aa=Array.isArray,ab=Object.keys,az=ap.bind,ao=function(a){return a instanceof ao?a:this instanceof ao?void (this._wrapped=a):new ao(a)
};
"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=ao),exports._=ao):ak._=ao,ao.VERSION="1.6.0";
var X=ao.each=ao.forEach=function(h,f,g){if(null==h){return h
}if(af&&h.forEach===af){h.forEach(f,g)
}else{if(h.length===+h.length){for(var c=0,d=h.length;
d>c;
c++){if(f.call(g,h[c],c,h)===ag){return
}}}else{for(var b=ao.keys(h),c=0,d=b.length;
d>c;
c++){if(f.call(g,h[b[c]],b[c],h)===ag){return
}}}}return h
};
ao.map=ao.collect=function(d,a,b){var c=[];
return null==d?c:ai&&d.map===ai?d.map(a,b):(X(d,function(g,e,f){c.push(a.call(b,g,e,f))
}),c)
};
var J="Reduce of empty array with no initial value";
ao.reduce=ao.foldl=ao.inject=function(f,b,c,d){var a=arguments.length>2;
if(null==f&&(f=[]),aq&&f.reduce===aq){return d&&(b=ao.bind(b,d)),a?f.reduce(b,c):f.reduce(b)
}if(X(f,function(h,g,e){a?c=b.call(d,c,h,g,e):(c=h,a=!0)
}),!a){throw new TypeError(J)
}return c
},ao.reduceRight=ao.foldr=function(j,f,g,h){var c=arguments.length>2;
if(null==j&&(j=[]),ac&&j.reduceRight===ac){return h&&(f=ao.bind(f,h)),c?j.reduceRight(f,g):j.reduceRight(f)
}var d=j.length;
if(d!==+d){var b=ao.keys(j);
d=b.length
}if(X(j,function(e,i,a){i=b?b[--d]:--d,c?g=f.call(h,g,j[i],i,a):(g=j[i],c=!0)
}),!c){throw new TypeError(J)
}return g
},ao.find=ao.detect=function(d,a,b){var c;
return an(d,function(g,e,f){return a.call(b,g,e,f)?(c=g,!0):void 0
}),c
},ao.filter=ao.select=function(d,a,b){var c=[];
return null==d?c:ar&&d.filter===ar?d.filter(a,b):(X(d,function(g,e,f){a.call(b,g,e,f)&&c.push(g)
}),c)
},ao.reject=function(c,a,b){return ao.filter(c,function(g,f,d){return !a.call(b,g,f,d)
},b)
},ao.every=ao.all=function(d,b,c){b||(b=ao.identity);
var a=!0;
return null==d?a:av&&d.every===av?d.every(b,c):(X(d,function(g,f,e){return(a=a&&b.call(c,g,f,e))?void 0:ag
}),!!a)
};
var an=ao.some=ao.any=function(d,b,c){b||(b=ao.identity);
var a=!1;
return null==d?a:al&&d.some===al?d.some(b,c):(X(d,function(g,f,e){return a||(a=b.call(c,g,f,e))?ag:void 0
}),!!a)
};
ao.contains=ao.include=function(b,a){return null==b?!1:Z&&b.indexOf===Z?b.indexOf(a)!=-1:an(b,function(c){return c===a
})
},ao.invoke=function(d,a){var b=aj.call(arguments,2),c=ao.isFunction(a);
return ao.map(d,function(e){return(c?a:e[a]).apply(e,b)
})
},ao.pluck=function(b,a){return ao.map(b,ao.property(a))
},ao.where=function(b,a){return ao.filter(b,ao.matches(a))
},ao.findWhere=function(b,a){return ao.find(b,ao.matches(a))
},ao.max=function(f,b,c){if(!b&&ao.isArray(f)&&f[0]===+f[0]&&f.length<65535){return Math.max.apply(Math,f)
}var d=-1/0,a=-1/0;
return X(f,function(j,g,e){var h=b?b.call(c,j,g,e):j;
h>a&&(d=j,a=h)
}),d
},ao.min=function(f,b,c){if(!b&&ao.isArray(f)&&f[0]===+f[0]&&f.length<65535){return Math.min.apply(Math,f)
}var d=1/0,a=1/0;
return X(f,function(j,g,e){var h=b?b.call(c,j,g,e):j;
a>h&&(d=j,a=h)
}),d
},ao.shuffle=function(d){var a,b=0,c=[];
return X(d,function(e){a=ao.random(b++),c[b-1]=c[a],c[a]=e
}),c
},ao.sample=function(c,a,b){return null==a||b?(c.length!==+c.length&&(c=ao.values(c)),c[ao.random(c.length-1)]):ao.shuffle(c).slice(0,Math.max(0,a))
};
var U=function(a){return null==a?ao.identity:ao.isFunction(a)?a:ao.property(a)
};
ao.sortBy=function(c,a,b){return a=U(a),ao.pluck(ao.map(c,function(g,f,d){return{value:g,index:f,criteria:a.call(b,g,f,d)}
}).sort(function(h,d){var f=h.criteria,g=d.criteria;
if(f!==g){if(f>g||f===void 0){return 1
}if(g>f||g===void 0){return -1
}}return h.index-d.index
}),"value")
};
var Q=function(a){return function(c,d,f){var b={};
return d=U(d),X(c,function(g,e){var h=d.call(f,g,e,c);
a(b,h,g)
}),b
}
};
ao.groupBy=Q(function(c,a,b){ao.has(c,a)?c[a].push(b):c[a]=[b]
}),ao.indexBy=Q(function(c,a,b){c[a]=b
}),ao.countBy=Q(function(b,a){ao.has(b,a)?b[a]++:b[a]=1
}),ao.sortedIndex=function(k,f,g,h){g=U(g);
for(var c=g.call(h,f),d=0,b=k.length;
b>d;
){var j=d+b>>>1;
g.call(h,k[j])<c?d=j+1:b=j
}return d
},ao.toArray=function(a){return a?ao.isArray(a)?aj.call(a):a.length===+a.length?ao.map(a,ao.identity):ao.values(a):[]
},ao.size=function(a){return null==a?0:a.length===+a.length?a.length:ao.keys(a).length
},ao.first=ao.head=ao.take=function(c,a,b){return null==c?void 0:null==a||b?c[0]:0>a?[]:aj.call(c,0,a)
},ao.initial=function(c,a,b){return aj.call(c,0,c.length-(null==a||b?1:a))
},ao.last=function(c,a,b){return null==c?void 0:null==a||b?c[c.length-1]:aj.call(c,Math.max(c.length-a,0))
},ao.rest=ao.tail=ao.drop=function(c,a,b){return aj.call(c,null==a||b?1:a)
},ao.compact=function(a){return ao.filter(a,ao.identity)
};
var L=function(c,a,b){return a&&ao.every(c,ao.isArray)?aw.apply(b,c):(X(c,function(d){ao.isArray(d)||ao.isArguments(d)?a?ay.apply(b,d):L(d,a,b):b.push(d)
}),b)
};
ao.flatten=function(b,a){return L(b,a,[])
},ao.without=function(a){return ao.difference(a,aj.call(arguments,1))
},ao.partition=function(d,a){var b=[],c=[];
return X(d,function(e){(a(e)?b:c).push(e)
}),[b,c]
},ao.uniq=ao.unique=function(j,f,g,h){ao.isFunction(f)&&(h=g,g=f,f=!1);
var c=g?ao.map(j,g,h):j,d=[],b=[];
return X(c,function(a,i){(f?i&&b[b.length-1]===a:ao.contains(b,a))||(b.push(a),d.push(j[i]))
}),d
},ao.union=function(){return ao.uniq(ao.flatten(arguments,!0))
},ao.intersection=function(b){var a=aj.call(arguments,1);
return ao.filter(ao.uniq(b),function(c){return ao.every(a,function(d){return ao.contains(d,c)
})
})
},ao.difference=function(b){var a=aw.apply(au,aj.call(arguments,1));
return ao.filter(b,function(c){return !ao.contains(a,c)
})
},ao.zip=function(){for(var c=ao.max(ao.pluck(arguments,"length").concat(0)),a=new Array(c),b=0;
c>b;
b++){a[b]=ao.pluck(arguments,""+b)
}return a
},ao.object=function(f,b){if(null==f){return{}
}for(var c={},d=0,a=f.length;
a>d;
d++){b?c[f[d]]=b[d]:c[f[d][0]]=f[d][1]
}return c
},ao.indexOf=function(f,b,c){if(null==f){return -1
}var d=0,a=f.length;
if(c){if("number"!=typeof c){return d=ao.sortedIndex(f,b),f[d]===b?d:-1
}d=0>c?Math.max(0,a+c):c
}if(Z&&f.indexOf===Z){return f.indexOf(b,c)
}for(;
a>d;
d++){if(f[d]===b){return d
}}return -1
},ao.lastIndexOf=function(f,b,c){if(null==f){return -1
}var d=null!=c;
if(ax&&f.lastIndexOf===ax){return d?f.lastIndexOf(b,c):f.lastIndexOf(b)
}for(var a=d?c:f.length;
a--;
){if(f[a]===b){return a
}}return -1
},ao.range=function(g,c,d){arguments.length<=1&&(c=g||0,g=0),d=arguments[2]||1;
for(var f=Math.max(Math.ceil((c-g)/d),0),a=0,b=new Array(f);
f>a;
){b[a++]=g,g+=d
}return b
};
var H=function(){};
ao.bind=function(d,a){var b,c;
if(az&&d.bind===az){return az.apply(d,aj.call(arguments,1))
}if(!ao.isFunction(d)){throw new TypeError
}return b=aj.call(arguments,2),c=function(){if(!(this instanceof c)){return d.apply(a,b.concat(aj.call(arguments)))
}H.prototype=d.prototype;
var e=new H;
H.prototype=null;
var f=d.apply(e,b.concat(aj.call(arguments)));
return Object(f)===f?f:e
}
},ao.partial=function(b){var a=aj.call(arguments,1);
return function(){for(var f=0,g=a.slice(),c=0,d=g.length;
d>c;
c++){g[c]===ao&&(g[c]=arguments[f++])
}for(;
f<arguments.length;
){g.push(arguments[f++])
}return b.apply(this,g)
}
},ao.bindAll=function(b){var a=aj.call(arguments,1);
if(0===a.length){throw new Error("bindAll must be passed function names")
}return X(a,function(c){b[c]=ao.bind(b[c],b)
}),b
},ao.memoize=function(c,a){var b={};
return a||(a=ao.identity),function(){var d=a.apply(this,arguments);
return ao.has(b,d)?b[d]:b[d]=c.apply(this,arguments)
}
},ao.delay=function(c,a){var b=aj.call(arguments,2);
return setTimeout(function(){return c.apply(null,b)
},a)
},ao.defer=function(a){return ao.delay.apply(ao,[a,1].concat(aj.call(arguments,1)))
},ao.throttle=function(f,m,b){var h,l,g,k=null,d=0;
b||(b={});
var j=function(){d=b.leading===!1?0:ao.now(),k=null,g=f.apply(h,l),h=l=null
};
return function(){var a=ao.now();
d||b.leading!==!1||(d=a);
var c=m-(a-d);
return h=this,l=arguments,0>=c?(clearTimeout(k),k=null,d=a,g=f.apply(h,l),h=l=null):k||b.trailing===!1||(k=setTimeout(j,c)),g
}
},ao.debounce=function(f,m,b){var h,l,g,k,d,j=function(){var a=ao.now()-k;
m>a?h=setTimeout(j,m-a):(h=null,b||(d=f.apply(g,l),g=l=null))
};
return function(){g=this,l=arguments,k=ao.now();
var a=b&&!h;
return h||(h=setTimeout(j,m)),a&&(d=f.apply(g,l),g=l=null),d
}
},ao.once=function(c){var a,b=!1;
return function(){return b?a:(b=!0,a=c.apply(this,arguments),c=null,a)
}
},ao.wrap=function(b,a){return ao.partial(a,b)
},ao.compose=function(){var a=arguments;
return function(){for(var b=arguments,c=a.length-1;
c>=0;
c--){b=[a[c].apply(this,b)]
}return b[0]
}
},ao.after=function(b,a){return function(){return --b<1?a.apply(this,arguments):void 0
}
},ao.keys=function(c){if(!ao.isObject(c)){return[]
}if(ab){return ab(c)
}var a=[];
for(var b in c){ao.has(c,b)&&a.push(b)
}return a
},ao.values=function(f){for(var b=ao.keys(f),c=b.length,d=new Array(c),a=0;
c>a;
a++){d[a]=f[b[a]]
}return d
},ao.pairs=function(f){for(var b=ao.keys(f),c=b.length,d=new Array(c),a=0;
c>a;
a++){d[a]=[b[a],f[b[a]]]
}return d
},ao.invert=function(f){for(var b={},c=ao.keys(f),d=0,a=c.length;
a>d;
d++){b[f[c[d]]]=c[d]
}return b
},ao.functions=ao.methods=function(c){var a=[];
for(var b in c){ao.isFunction(c[b])&&a.push(b)
}return a.sort()
},ao.extend=function(a){return X(aj.call(arguments,1),function(b){if(b){for(var c in b){a[c]=b[c]
}}}),a
},ao.pick=function(c){var a={},b=aw.apply(au,aj.call(arguments,1));
return X(b,function(d){d in c&&(a[d]=c[d])
}),a
},ao.omit=function(d){var b={},c=aw.apply(au,aj.call(arguments,1));
for(var a in d){ao.contains(c,a)||(b[a]=d[a])
}return b
},ao.defaults=function(a){return X(aj.call(arguments,1),function(b){if(b){for(var c in b){a[c]===void 0&&(a[c]=b[c])
}}}),a
},ao.clone=function(a){return ao.isObject(a)?ao.isArray(a)?a.slice():ao.extend({},a):a
},ao.tap=function(b,a){return a(b),b
};
var G=function(g,q,b,k){if(g===q){return 0!==g||1/g==1/q
}if(null==g||null==q){return g===q
}g instanceof ao&&(g=g._wrapped),q instanceof ao&&(q=q._wrapped);
var p=am.call(g);
if(p!=am.call(q)){return !1
}switch(p){case"[object String]":return g==String(q);
case"[object Number]":return g!=+g?q!=+q:0==g?1/g==1/q:g==+q;
case"[object Date]":case"[object Boolean]":return +g==+q;
case"[object RegExp]":return g.source==q.source&&g.global==q.global&&g.multiline==q.multiline&&g.ignoreCase==q.ignoreCase
}if("object"!=typeof g||"object"!=typeof q){return !1
}for(var h=b.length;
h--;
){if(b[h]==g){return k[h]==q
}}var m=g.constructor,d=q.constructor;
if(m!==d&&!(ao.isFunction(m)&&m instanceof m&&ao.isFunction(d)&&d instanceof d)&&"constructor" in g&&"constructor" in q){return !1
}b.push(g),k.push(q);
var l=0,j=!0;
if("[object Array]"==p){if(l=g.length,j=l==q.length){for(;
l--&&(j=G(g[l],q[l],b,k));
){}}}else{for(var v in g){if(ao.has(g,v)&&(l++,!(j=ao.has(q,v)&&G(g[v],q[v],b,k)))){break
}}if(j){for(v in q){if(ao.has(q,v)&&!l--){break
}}j=!l
}}return b.pop(),k.pop(),j
};
ao.isEqual=function(b,a){return G(b,a,[],[])
},ao.isEmpty=function(b){if(null==b){return !0
}if(ao.isArray(b)||ao.isString(b)){return 0===b.length
}for(var a in b){if(ao.has(b,a)){return !1
}}return !0
},ao.isElement=function(a){return !(!a||1!==a.nodeType)
},ao.isArray=aa||function(a){return"[object Array]"==am.call(a)
},ao.isObject=function(a){return a===Object(a)
},X(["Arguments","Function","String","Number","Date","RegExp"],function(a){ao["is"+a]=function(b){return am.call(b)=="[object "+a+"]"
}
}),ao.isArguments(arguments)||(ao.isArguments=function(a){return !(!a||!ao.has(a,"callee"))
}),"function"!=typeof/./&&(ao.isFunction=function(a){return"function"==typeof a
}),ao.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))
},ao.isNaN=function(a){return ao.isNumber(a)&&a!=+a
},ao.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==am.call(a)
},ao.isNull=function(a){return null===a
},ao.isUndefined=function(a){return a===void 0
},ao.has=function(b,a){return at.call(b,a)
},ao.noConflict=function(){return ak._=ae,this
},ao.identity=function(a){return a
},ao.constant=function(a){return function(){return a
}
},ao.property=function(a){return function(b){return b[a]
}
},ao.matches=function(a){return function(b){if(b===a){return !0
}for(var c in a){if(a[c]!==b[c]){return !1
}}return !0
}
},ao.times=function(f,b,c){for(var d=Array(Math.max(0,f)),a=0;
f>a;
a++){d[a]=b.call(c,a)
}return d
},ao.random=function(b,a){return null==a&&(a=b,b=0),b+Math.floor(Math.random()*(a-b+1))
},ao.now=Date.now||function(){return(new Date).getTime()
};
var C={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};
C.unescape=ao.invert(C.escape);
var P={escape:new RegExp("["+ao.keys(C.escape).join("")+"]","g"),unescape:new RegExp("("+ao.keys(C.unescape).join("|")+")","g")};
ao.each(["escape","unescape"],function(a){ao[a]=function(b){return null==b?"":(""+b).replace(P[a],function(c){return C[a][c]
})
}
}),ao.result=function(c,a){if(null==c){return void 0
}var b=c[a];
return ao.isFunction(b)?b.call(c):b
},ao.mixin=function(a){X(ao.functions(a),function(b){var c=ao[b]=a[b];
ao.prototype[b]=function(){var d=[this._wrapped];
return ay.apply(d,arguments),Y.call(this,c.apply(ao,d))
}
})
};
var K=0;
ao.uniqueId=function(b){var a=++K+"";
return b?b+a:a
},ao.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
var ah=/(.)^/,W={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},V=/\\|'|\r|\n|\t|\u2028|\u2029/g;
ao.template=function(f,m,b){var h;
b=ao.defaults({},b,ao.templateSettings);
var l=new RegExp([(b.escape||ah).source,(b.interpolate||ah).source,(b.evaluate||ah).source].join("|")+"|$","g"),g=0,k="__p+='";
f.replace(l,function(c,i,n,a,p){return k+=f.slice(g,p).replace(V,function(e){return"\\"+W[e]
}),i&&(k+="'+\n((__t=("+i+"))==null?'':_.escape(__t))+\n'"),n&&(k+="'+\n((__t=("+n+"))==null?'':__t)+\n'"),a&&(k+="';\n"+a+"\n__p+='"),g=p+c.length,c
}),k+="';\n",b.variable||(k="with(obj||{}){\n"+k+"}\n"),k="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+k+"return __p;\n";
try{h=new Function(b.variable||"obj","_",k)
}catch(d){throw d.source=k,d
}if(m){return h(m,ao)
}var j=function(a){return h.call(this,a,ao)
};
return j.source="function("+(b.variable||"obj")+"){\n"+k+"}",j
},ao.chain=function(a){return ao(a).chain()
};
var Y=function(a){return this._chain?ao(a).chain():a
};
ao.mixin(ao),X(["pop","push","reverse","shift","sort","splice","unshift"],function(b){var a=au[b];
ao.prototype[b]=function(){var c=this._wrapped;
return a.apply(c,arguments),"shift"!=b&&"splice"!=b||0!==c.length||delete c[0],Y.call(this,c)
}
}),X(["concat","join","slice"],function(b){var a=au[b];
ao.prototype[b]=function(){return Y.call(this,a.apply(this._wrapped,arguments))
}
}),ao.extend(ao.prototype,{chain:function(){return this._chain=!0,this
},value:function(){return this._wrapped
}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return ao
})
}).call(this);