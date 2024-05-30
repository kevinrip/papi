var gsaAutocomplete=(function(b){b.Configuration=function a(k){var f={data:"list-required",url:"list-required",dataType:"json",listLocation:function(l){return l
},xmlElementName:"",getValue:function(l){return l
},autocompleteOff:true,placeholder:false,ajaxCallback:function(){},matchResponseProperty:false,list:{sort:{enabled:false,method:function(m,l){m=f.getValue(m);
l=f.getValue(l);
if(m<l){return -1
}if(m>l){return 1
}return 0
}},maxNumberOfElements:6,hideOnEmptyPhrase:true,match:{enabled:false,caseSensitive:false,method:function(m,l){if(m.search(l)>-1){return true
}else{return false
}}},showAnimation:{type:"normal",time:400,callback:function(){}},hideAnimation:{type:"normal",time:400,callback:function(){}},onClickEvent:function(){},onSelectItemEvent:function(){},onLoadEvent:function(){},onChooseEvent:function(){},onKeyEnterEvent:function(){},onMouseOverEvent:function(){},onMouseOutEvent:function(){},onShowListEvent:function(){},onHideListEvent:function(){}},highlightPhrase:true,theme:"",cssClasses:"",minCharNumber:0,requestDelay:0,adjustWidth:true,ajaxSettings:{},preparePostData:function(m,l){return m
},loggerEnabled:true,template:"",categoriesAssigned:false,categories:[{maxNumberOfElements:4}]};
var i=["ajaxSettings","template"];
this.get=function(l){return f[l]
};
this.equals=function(l,m){if(g(l)){if(f[l]===m){return true
}}return false
};
this.checkDataUrlProperties=function(){if(f.url==="list-required"&&f.data==="list-required"){return false
}return true
};
this.checkRequiredProperties=function(){for(var l in f){if(f[l]==="required"){logger.error("Option "+l+" must be defined");
return false
}}return true
};
this.printPropertiesThatDoesntExist=function(l,m){j(l,m)
};
e();
d();
if(f.loggerEnabled===true){j(console,k)
}h();
c();
function e(){if(k.dataType==="xml"){if(!k.getValue){k.getValue=function(q){return $(q).text()
}
}if(!k.list){k.list={}
}if(!k.list.sort){k.list.sort={}
}k.list.sort.method=function(r,q){r=k.getValue(r);
q=k.getValue(q);
if(r<q){return -1
}if(r>q){return 1
}return 0
};
if(!k.list.match){k.list.match={}
}k.list.match.method=function(r,q){if(r.search(q)>-1){return true
}else{return false
}}
}if(k.categories!==undefined&&k.categories instanceof Array){var l=[];
for(var m=0,o=k.categories.length;
m<o;
m+=1){var n=k.categories[m];
for(var p in f.categories[0]){if(n[p]===undefined){n[p]=f.categories[0][p]
}}l.push(n)
}k.categories=l
}}function d(){f=l(f,k);
function l(n,o){var p=n||{};
for(var m in n){if(o[m]!==undefined&&o[m]!==null){if(typeof o[m]!=="object"||o[m] instanceof Array){p[m]=o[m]
}else{l(n[m],o[m])
}}}if(o.data!==undefined&&o.data!==null&&typeof o.data==="object"){p.data=o.data
}return p
}}function c(){if(f.url!=="list-required"&&typeof f.url!=="function"){var l=f.url;
f.url=function(){return l
}
}if(f.ajaxSettings.url!==undefined&&typeof f.ajaxSettings.url!=="function"){var l=f.ajaxSettings.url;
f.ajaxSettings.url=function(){return l
}
}if(typeof f.listLocation==="string"){var m=f.listLocation;
if(f.dataType.toUpperCase()==="XML"){f.listLocation=function(o){return $(o).find(m)
}
}else{f.listLocation=function(o){return o[m]
}
}}if(typeof f.getValue==="string"){var n=f.getValue;
f.getValue=function(o){return o[n]
}
}if(k.categories!==undefined){f.categoriesAssigned=true
}}function h(){if(k.ajaxSettings!==undefined&&typeof k.ajaxSettings==="object"){f.ajaxSettings=k.ajaxSettings
}else{f.ajaxSettings={}
}}function g(l){if(f[l]!==undefined&&f[l]!==null){return true
}else{return false
}}function j(l,m){n(f,m);
function n(p,q){for(var o in q){if(p[o]===undefined){l.log("Property '"+o+"' does not exist in gsaAutocomplete options API.")
}if(typeof p[o]==="object"&&$.inArray(o,i)===-1){n(p[o],q[o])
}}}}};
return b
})(gsaAutocomplete||{});
var gsaAutocomplete=(function(b){b.Logger=function a(){this.error=function(c){console.log("ERROR: "+c)
};
this.warning=function(c){console.log("WARNING: "+c)
}
};
return b
})(gsaAutocomplete||{});
var gsaAutocomplete=(function(a){a.Constans=function b(){var c={CONTAINER_CLASS:"easy-autocomplete-container",CONTAINER_ID:"eac-container-",WRAPPER_CSS_CLASS:"easy-autocomplete",LIST_CSS_CLASS:"easy-autocomplete-list"};
this.getValue=function(d){return c[d]
}
};
return a
})(gsaAutocomplete||{});
var gsaAutocomplete=(function(b){b.ListBuilderService=function a(f,d){this.init=function(i){var h=[],g={};
g.data=f.get("listLocation")(i);
g.getValue=f.get("getValue");
g.maxListSize=f.get("list").maxNumberOfElements;
h.push(g);
return h
};
this.updateCategories=function(h,k){if(f.get("categoriesAssigned")){h=[];
for(var j=0;
j<f.get("categories").length;
j+=1){var g=c(f.get("categories")[j],k);
h.push(g)
}}return h
};
this.convertXml=function(g){if(f.get("dataType").toUpperCase()==="XML"){for(var h=0;
h<g.length;
h+=1){g[h].data=e(g[h])
}}return g
};
this.processData=function(g,k){for(var h=0,j=g.length;
h<j;
h+=1){g[h].data=d(f,g[h],k)
}return g
};
this.checkIfDataExists=function(g){for(var h=0,j=g.length;
h<j;
h+=1){if(g[h].data!==undefined&&g[h].data instanceof Array){if(g[h].data.length>0){return true
}}}return false
};
function c(i,j){var h={};
if(f.get("dataType").toUpperCase()==="XML"){h=k()
}else{h=g()
}if(i.header!==undefined){h.header=i.header
}if(i.maxNumberOfElements!==undefined){h.maxNumberOfElements=i.maxNumberOfElements
}if(f.get("list").maxNumberOfElements!==undefined){h.maxListSize=f.get("list").maxNumberOfElements
}if(i.getValue!==undefined){if(typeof i.getValue==="string"){var l=i.getValue;
h.getValue=function(m){return m[l]
}
}else{if(typeof i.getValue==="function"){h.getValue=i.getValue
}}}else{h.getValue=f.get("getValue")
}return h;
function k(){var m={},n;
if(i.xmlElementName!==undefined){m.xmlElementName=i.xmlElementName
}if(i.listLocation!==undefined){n=i.listLocation
}else{if(f.get("listLocation")!==undefined){n=f.get("listLocation")
}}if(n!==undefined){if(typeof n==="string"){m.data=$(j).find(n)
}else{if(typeof n==="function"){m.data=n(j)
}}}else{m.data=j
}return m
}function g(){var m={};
if(i.listLocation!==undefined){if(typeof i.listLocation==="string"){m.data=j[i.listLocation]
}else{if(typeof i.listLocation==="function"){m.data=i.listLocation(j)
}}}else{m.data=j
}return m
}}function e(g){var h=[];
if(g.xmlElementName===undefined){g.xmlElementName=f.get("xmlElementName")
}$(g.data).find(g.xmlElementName).each(function(){h.push(this)
});
return h
}};
return b
})(gsaAutocomplete||{});
var gsaAutocomplete=(function(a){a.proccess=function b(c,i,d){a.proccess.match=g;
var h=i.data,f=d;
h=k(h,f);
h=j(h);
h=e(h);
return h;
function k(p,l){var q=[],o="";
if(c.get("list").match.enabled){for(var m=0,n=p.length;
m<n;
m+=1){o=c.get("getValue")(p[m]);
if(g(o,l)){q.push(p[m])
}}}else{q=p
}return q
}function g(m,l){if(!c.get("list").match.caseSensitive){if(typeof m==="string"){m=m.toLowerCase()
}l=l.toLowerCase()
}if(c.get("list").match.method(m,l)){return true
}else{return false
}}function j(l){if(i.maxNumberOfElements!==undefined&&l.length>i.maxNumberOfElements){l=l.slice(0,i.maxNumberOfElements)
}return l
}function e(l){if(c.get("list").sort.enabled){l.sort(c.get("list").sort.method)
}return l
}};
return a
})(gsaAutocomplete||{});
var gsaAutocomplete=(function(a){a.Template=function b(c){var e={basic:{type:"basic",method:function(h){return h
},cssClass:""},description:{type:"description",fields:{description:"description"},method:function(h){return h+" - description"
},cssClass:"eac-description"},iconLeft:{type:"iconLeft",fields:{icon:""},method:function(h){return h
},cssClass:"eac-icon-left"},iconRight:{type:"iconRight",fields:{iconSrc:""},method:function(h){return h
},cssClass:"eac-icon-right"},links:{type:"links",fields:{link:""},method:function(h){return h
},cssClass:""},custom:{type:"custom",method:function(){},cssClass:""}},d=function(j){var h=j.fields,i;
if(j.type==="description"){i=e.description.method;
if(typeof h.description==="string"){i=function(l,k){return l+" - <span>"+k[h.description]+"</span>"
}
}else{if(typeof h.description==="function"){i=function(l,k){return l+" - <span>"+h.description(k)+"</span>"
}
}}return i
}if(j.type==="iconRight"){if(typeof h.iconSrc==="string"){i=function(l,k){return l+"<img class='eac-icon' src='"+k[h.iconSrc]+"' />"
}
}else{if(typeof h.iconSrc==="function"){i=function(l,k){return l+"<img class='eac-icon' src='"+h.iconSrc(k)+"' />"
}
}}return i
}if(j.type==="iconLeft"){if(typeof h.iconSrc==="string"){i=function(l,k){return"<img class='eac-icon' src='"+k[h.iconSrc]+"' />"+l
}
}else{if(typeof h.iconSrc==="function"){i=function(l,k){return"<img class='eac-icon' src='"+h.iconSrc(k)+"' />"+l
}
}}return i
}if(j.type==="links"){if(typeof h.link==="string"){i=function(l,k){return"<a href='"+k[h.link]+"' >"+l+"</a>"
}
}else{if(typeof h.link==="function"){i=function(l,k){return"<a href='"+h.link(k)+"' >"+l+"</a>"
}
}}return i
}if(j.type==="custom"){return j.method
}return e.basic.method
},g=function(h){if(!h||!h.type){return e.basic.method
}if(h.type&&e[h.type]){return d(h)
}else{return e.basic.method
}},f=function(h){var i=function(){return""
};
if(!h||!h.type){return i
}if(h.type&&e[h.type]){return(function(){var j=e[h.type].cssClass;
return function(){return j
}
})()
}else{return i
}};
this.getTemplateClass=f(c);
this.build=g(c)
};
return a
})(gsaAutocomplete||{});
var gsaAutocomplete=(function(a){a.main=function b(d,f){var e={name:"gsaAutocomplete",shortcut:"eac"};
var m=new a.Constans(),u=new a.Configuration(f),x=new a.Logger(),v=new a.Template(f.template),k=new a.ListBuilderService(u,a.proccess),t=u.equals,o=d,q="",y=[],r=-1,i;
a.consts=m;
this.getConstants=function(){return m
};
this.getConfiguration=function(){return u
};
this.getContainer=function(){return q
};
this.getSelectedItemIndex=function(){return r
};
this.getItems=function(){return y
};
this.getItemData=function(z){if(y.length<z||y[z]===undefined){return -1
}else{return y[z]
}};
this.getSelectedItemData=function(){return this.getItemData(r)
};
this.build=function(){w()
};
this.init=function(){s()
};
function s(){if(o.length===0){x.error("Input field doesn't exist.");
return
}if(!u.checkDataUrlProperties()){x.error("One of options variables 'data' or 'url' must be defined.");
return
}if(!u.checkRequiredProperties()){x.error("Will not work without mentioned properties.");
return
}w();
c()
}function w(){if(o.parent().hasClass(m.getValue("WRAPPER_CSS_CLASS"))){G();
F()
}z();
E();
q=$("#"+h());
if(u.get("placeholder")){o.attr("placeholder",u.get("placeholder"))
}function z(){var I=$("<div>"),H=m.getValue("WRAPPER_CSS_CLASS");
if(u.get("theme")&&u.get("theme")!==""){H+=" eac-"+u.get("theme")
}if(u.get("cssClasses")&&u.get("cssClasses")!==""){H+=" "+u.get("cssClasses")
}if(v.getTemplateClass()!==""){H+=" "+v.getTemplateClass()
}I.addClass(H);
o.wrap(I);
if(u.get("adjustWidth")===true){C()
}}function C(){o.parent().css("width","auto")
}function F(){o.unwrap()
}function E(){var H=$("<div>").addClass(m.getValue("CONTAINER_CLASS"));
H.attr("id",h()).prepend($("<ul>").attr({id:h()+"--list","aria-expanded":"true",role:"listbox"}).addClass(m.getValue("LIST_CSS_CLASS")));
(function(){H.bind("show.eac",function(){switch(u.get("list").showAnimation.type){case"slide":var I=u.get("list").showAnimation.time,J=u.get("list").showAnimation.callback;
H.find("ul").slideDown(I,J);
break;
case"fade":var I=u.get("list").showAnimation.time,J=u.get("list").showAnimation.callback;
H.find("ul").fadeIn(I),J;
break;
default:H.find("ul").show();
break
}u.get("list").onShowListEvent()
}).bind("hide.eac",function(){switch(u.get("list").hideAnimation.type){case"slide":var I=u.get("list").hideAnimation.time,J=u.get("list").hideAnimation.callback;
H.find("ul").slideUp(I,J);
break;
case"fade":var I=u.get("list").hideAnimation.time,J=u.get("list").hideAnimation.callback;
H.find("ul").fadeOut(I,J);
break;
default:H.find("ul").hide();
break
}u.get("list").onHideListEvent()
}).bind("selectElement.eac",function(){H.find("ul li").removeClass("selected");
H.find("ul li").eq(r).addClass("selected");
u.get("list").onSelectItemEvent()
}).bind("loadElements.eac",function(K,L,M){var R="",O=H.find("ul");
O.empty().detach();
y=[];
var J=0;
for(var I=0,S=L.length;
I<S;
I+=1){var P=L[I].data;
if(P.length===0){o.attr("aria-activedescendant","");
$.arialive("Your query does not give any results");
continue
}if(L[I].header!==undefined&&L[I].header.length>0){O.append("<div class='eac-category' >"+L[I].header+"</div>")
}for(var N=0,Q=P.length;
N<Q&&J<L[I].maxListSize;
N+=1){R=$("<li id='eac-"+o.attr("id")+"--item-"+N+"' aria-label='"+L[I].getValue(P[N])+"' class='easy-autocomplete-item' role='option'><div class='eac-item'></div></li>");
(function(){var U=N,T=J,V=L[I].getValue(P[U]);
R.find(" > div").bind("click",function(){o.val(V).trigger("change");
r=T;
l(T);
u.get("list").onClickEvent();
u.get("list").onChooseEvent()
}).mouseover(function(){r=T;
l(T);
u.get("list").onMouseOverEvent()
}).mouseout(function(){u.get("list").onMouseOutEvent()
}).html(v.build(B(V,M),P[U]))
})();
O.append(R);
y.push(P[N]);
J+=1
}$.arialive(J+" result"+((J>1)?"s":"")+" displayed for your search. Use the arrow keys to browse them")
}H.append(O);
u.get("list").onLoadEvent()
})
})();
o.after(H)
}function G(){o.next("."+m.getValue("CONTAINER_CLASS")).remove()
}function B(I,H){if(u.get("highlightPhrase")&&H!==""){return D(I,H)
}else{return I
}}function A(H){return H.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")
}function D(J,H){var I=A(H);
return(J+"").replace(new RegExp("("+I+")","gi"),"<span class='easy-autocomplete-already-typed'>$1</span>")
}}function h(){var z=o.attr("id");
z=m.getValue("CONTAINER_ID")+z;
return z
}function c(){B();
function B(){if(t("autocompleteOff",true)){E()
}A();
z();
D();
F();
C();
G()
}function A(){o.focusout(function(){var K=o.val(),H;
if(!u.get("list").match.caseSensitive){K=K.toLowerCase()
}for(var I=0,J=y.length;
I<J;
I+=1){H=u.get("getValue")(y[I]);
if(!u.get("list").match.caseSensitive){H=H.toLowerCase()
}if(H===K){r=I;
l(r);
return
}}})
}function z(){var I=o.attr("id");
var H="eac-container-"+I+"--list";
var J=$("#"+H);
o.attr({role:"combobox","aria-autocomplete":"inline","aria-owns":H,"aria-controls":H,"aria-activedescendant":""}).unbind("keyup").keyup(function(M){switch(M.keyCode){case 27:p();
o.attr("aria-activedescendant","");
break;
case 38:M.preventDefault();
if(y.length>0&&r>0){r-=1;
o.val(u.get("getValue")(y[r]));
l(r)
}o.attr("aria-activedescendant","eac-"+I+"--item-"+r);
break;
case 40:M.preventDefault();
if(y.length>0&&r<y.length-1){r+=1;
o.val(u.get("getValue")(y[r]));
l(r)
}o.attr("aria-activedescendant","eac-"+I+"--item-"+r);
break;
default:if(M.keyCode>40||M.keyCode===8){var L=o.val();
if(!(u.get("list").hideOnEmptyPhrase===true&&M.keyCode===8&&L==="")){if(u.get("requestDelay")>0){if(i!==undefined){clearTimeout(i)
}i=setTimeout(function(){K(L)
},u.get("requestDelay"))
}else{K(L)
}}else{p()
}o.attr("aria-activedescendant","")
}break
}function K(Q){if(Q.length<u.get("minCharNumber")){J.hide();
return
}if(u.get("data")!=="list-required"){var R=u.get("data");
var N=k.init(R);
N=k.updateCategories(N,R);
N=k.processData(N,Q);
n(N,Q);
if(o.parent().find("li").length>0){j()
}else{p()
}}var P=S();
if(P.url===undefined||P.url===""){P.url=u.get("url")
}if(P.dataType===undefined||P.dataType===""){P.dataType=u.get("dataType")
}if(P.url!==undefined&&P.url!=="list-required"){P.url=P.url(Q);
P.url+=Q;
P.data=u.get("preparePostData")(P.data,Q);
P.success=function(U){var T=k.init(U);
T=k.updateCategories(T,U);
T=k.convertXml(T);
if(O(Q,U)){T=k.processData(T,Q);
n(T,Q)
}if(k.checkIfDataExists(T)&&o.parent().find("li").length>0){j()
}else{p()
}u.get("ajaxCallback")()
};
P.error=function(){x.warning("Fail to load response data")
};
$.ajax(P)
}function S(){var T={},U=u.get("ajaxSettings")||{};
for(var V in U){T[V]=U[V]
}return T
}function O(T,U){if(u.get("matchResponseProperty")!==false){if(typeof u.get("matchResponseProperty")==="string"){return(U[u.get("matchResponseProperty")]===T)
}if(typeof u.get("matchResponseProperty")==="function"){return(u.get("matchResponseProperty")(U)===T)
}return true
}else{return true
}}}})
}function D(){o.bind("keydown",function(H){H=H||window.event;
var I=H.keyCode;
if(I===38){suppressKeypress=true;
return false
}}).keydown(function(H){if(H.keyCode===13&&r>-1){o.val(u.get("getValue")(y[r]));
u.get("list").onKeyEnterEvent();
u.get("list").onChooseEvent();
r=-1;
p();
H.preventDefault()
}})
}function F(){o.unbind("keypress")
}function C(){o.focus(function(){if(o.val()!==""&&y.length>0){r=-1;
j()
}})
}function G(){o.blur(function(){setTimeout(function(){r=-1;
p()
},250)
})
}function E(){o.attr("autocomplete","off")
}}function j(){q.trigger("show.eac")
}function p(){q.trigger("hide.eac")
}function l(z){q.trigger("selectElement.eac",z)
}function n(A,z){q.trigger("loadElements.eac",[A,z])
}function g(){o.trigger("blur")
}};
a.eacHandles=[];
a.getHandle=function(c){return a.eacHandles[c]
};
a.inputHasId=function(c){if($(c).attr("id")!==undefined&&$(c).attr("id").length>0){return true
}else{return false
}};
a.assignRandomId=function(d){var c="";
do{c="eac-"+Math.floor(Math.random()*10000)
}while($("#"+c).length!==0);
elementId=a.consts.getValue("CONTAINER_ID")+c;
$(d).attr("id",c)
};
a.setHandle=function(c,d){a.eacHandles[d]=c
};
return a
})(gsaAutocomplete||{});
(function(a){a.fn.gsaAutocomplete=function(b){return this.each(function(){var d=a(this),c=new gsaAutocomplete.main(d,b);
if(!gsaAutocomplete.inputHasId(d)){gsaAutocomplete.assignRandomId(d)
}c.init();
gsaAutocomplete.setHandle(c,d.attr("id"))
})
};
a.fn.getSelectedItemIndex=function(){var b=a(this).attr("id");
if(b!==undefined){return gsaAutocomplete.getHandle(b).getSelectedItemIndex()
}return -1
};
a.fn.getItems=function(){var b=a(this).attr("id");
if(b!==undefined){return gsaAutocomplete.getHandle(b).getItems()
}return -1
};
a.fn.getItemData=function(c){var b=a(this).attr("id");
if(b!==undefined&&c>-1){return gsaAutocomplete.getHandle(b).getItemData(c)
}return -1
};
a.fn.getSelectedItemData=function(){var b=a(this).attr("id");
if(b!==undefined){return gsaAutocomplete.getHandle(b).getSelectedItemData()
}return -1
}
})(jQuery);