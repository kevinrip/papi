var SWA=typeof(SWA)==="undefined"?{}:SWA;
var KEY={UP:38,DOWN:40,DEL:46,TAB:9,RETURN:13,ESC:27,COMMA:188,PAGEUP:33,PAGEDOWN:34,BACKSPACE:8};
SWA.autocompleterAdditions={matchesAirportCode:function(a,b){return" - "+b.toLowerCase()===a.substr(a.length-6).toLowerCase()
}};
(function(a){var b={ACTIVE:"ac_over"};
a.fn.extend({autocomplete:function(c,d){var e=typeof c=="string";
d=a.extend({},a.AutoCompleter.defaults,{url:e?c:null,data:e?null:c,delay:e?a.AutoCompleter.defaults.delay:10,max:d&&!d.scroll?10:150},d);
d.bold=d.bold||function(f){return f
};
d.formatMatch=d.formatMatch||d.formatItem;
return this.each(function(){new a.AutoCompleter(this,d)
})
},result:function(c){return this.bind("result",c)
},search:function(c){return this.trigger("search",[c])
},flushCache:function(){return this.trigger("flushCache")
},setOptions:function(c){return this.trigger("setOptions",[c])
},unautocomplete:function(){return this.trigger("unautocomplete")
},showFlyout:function(){return this.trigger("showFlyout")
}});
a.AutoCompleter=function(n,i){var c=a(n).attr("autocomplete","off").addClass(i.inputClass);
var l;
var t="";
var p=a.AutoCompleter.Cache(i);
var f=0;
var w;
var B={isMouseOnFlyout:false};
var u=a.AutoCompleter.Select(i,n,d,B);
var A;
a.browser.opera&&a(n.form).bind("submit.autocomplete",function(){if(A){A=false;
return false
}});
c.bind((a.browser.opera?"keypress":"keydown")+".autocomplete",function(C){f=1;
w=C.keyCode;
switch(C.keyCode){case KEY.UP:C.preventDefault();
if(u.visible()){u.prev()
}else{v(0,true)
}break;
case KEY.DOWN:C.preventDefault();
if(u.visible()){u.next()
}else{v(0,true)
}break;
case KEY.PAGEUP:C.preventDefault();
if(u.visible()){u.pageUp()
}else{v(0,true)
}break;
case KEY.PAGEDOWN:C.preventDefault();
if(u.visible()){u.pageDown()
}else{v(0,true)
}break;
case i.multiple&&a.trim(i.multipleSeparator)==","&&KEY.COMMA:case KEY.TAB:case KEY.RETURN:j(C);
break;
case KEY.ESC:c.val("");
if(u.visible()){C.preventDefault();
C.stopPropagation()
}u.hide();
break;
default:clearTimeout(l);
l=setTimeout(v,i.delay);
break
}}).focus(function(){f++
}).blur(function(C){if(B.isMouseOnFlyout){C.cancelBubble=true;
C.stopPropagation();
return false
}f=0;
if(u.visible()){j(C)
}else{if(z()){c.val("");
j(C)
}}}).click(function(C){C.cancelBubble=true;
C.stopPropagation();
if(f++>1&&!u.visible()){v(0,true)
}}).bind("search",function(){var C=(arguments.length>1)?arguments[1]:null;
function D(H,G){var E;
if(G&&G.length){for(var F=0;
F<G.length;
F++){if(G[F].result.toLowerCase()==H.toLowerCase()){E=G[F];
break
}}}if(typeof C=="function"){C(E)
}else{c.trigger("result",E&&[E.data,E.value,E])
}}a.each(h(c.val()),function(E,F){g(F,D,D)
})
}).bind("flushCache",function(){p.flush()
}).bind("setOptions",function(){a.extend(i,arguments[1]);
if("data" in arguments[1]){p.repopulate()
}}).bind("unautocomplete",function(){u.unbind();
c.unbind();
a(n.form).unbind(".autocomplete")
}).bind("showFlyout",function(){if(!u.visible()){y();
u.show();
this.focus()
}});
function z(){return c.val().length<i.minChars&&!i.allowNonMatchingText
}function j(C){var D=u.visible();
d(C);
if(D&&C.keyCode===KEY.RETURN){C.preventDefault();
A=true
}}function o(C){return !C&&c.val()!=""&&!u.visible()
}function d(E){var D=u.getSelectedItem();
if(o(D)){return
}x();
if(D){var C=D.result;
t=C;
a.arialive(C+" was selected");
c.val(C)
}else{if(!i.allowNonMatchingText){c.val("")
}}c.trigger("result",D&&[D.value,D])
}function v(C,E){if(w==KEY.DEL){u.hide();
return
}var D=c.val();
if(!E&&D==t){return
}t=D;
D=k(D);
if(D.length>=i.minChars){c.addClass(i.loadingClass);
if(!i.matchCase){D=D.toLowerCase()
}g(D,m,m)
}else{q();
u.hide()
}}function y(){var C=k(c.val());
c.addClass(i.loadingClass);
if(!i.matchCase){C=C.toLowerCase()
}g(C,e,e)
}function h(C){if(!C){return[""]
}if(!i.multiple){return[a.trim(C)]
}return a.map(C.split(i.multipleSeparator),function(D){return a.trim(C).length?a.trim(D):null
})
}function k(C){if(!i.multiple){return C
}var E=h(C);
if(E.length==1){return E[0]
}var D=a(n).selection().start;
if(D==C.length){E=h(C)
}else{E=h(C.replace(C.substring(D),""))
}return E[E.length-1]
}function s(C,D){if(i.autoFill&&(k(c.val()).toLowerCase()==C.toLowerCase())&&w!=KEY.BACKSPACE){c.val(c.val()+D.substring(k(t).length));
a(n).selection(t.length,t.length+D.length)
}}function x(){u.hide();
clearTimeout(l);
q();
if(i.mustMatch){c.search(function(C){if(!C){if(i.multiple){var D=h(c.val()).slice(0,-1);
c.val(D.join(i.multipleSeparator)+(D.length?i.multipleSeparator:""))
}else{c.val("");
c.trigger("result",null,null)
}}})
}}function m(D,C){if(C&&C.length&&f){q();
u.display(C,D);
s(D,C[0].value);
u.show()
}else{q();
u.display(C,D);
if(!u.isNotFoundMessageEmpty()){u.show()
}}}function e(C,D){if(D&&D.length){u.display(D,C);
s(C,D[0].value)
}}function g(D,F,C){if(!i.matchCase){D=D.toLowerCase()
}var E=p.load(D);
if(E&&E.length){F(D,E)
}else{if((typeof i.url=="string")&&(i.url.length>0)){var G={timestamp:+new Date()};
a.each(i.extraParams,function(H,I){G[H]=typeof I=="function"?I():I
});
a.ajax({mode:"abort",port:"autocomplete"+n.name,dataType:i.dataType,url:i.url,data:a.extend({q:k(D),limit:i.max},G),success:function(I){var H=i.parse&&i.parse(I)||r(I);
p.add(D,H);
F(D,H)
}})
}else{u.emptyList();
C(D)
}}}function r(F){var C=[];
var E=F.split("\n");
for(var D=0;
D<E.length;
D++){var G=a.trim(E[D]);
if(G){G=G.split("|");
C[C.length]={data:G,value:G[0],result:i.formatResult&&i.formatResult(G,G[0])||G[0]}
}}return C
}function q(){c.removeClass(i.loadingClass)
}};
a.AutoCompleter.defaults={inputClass:"ac_input",resultsClass:"ac_results",loadingClass:"ac_loading",minChars:1,filterIsWNMarketed:false,delay:400,matchCase:false,matchSubset:true,matchContains:false,cacheLength:10,max:100,mustMatch:false,extraParams:{},selectFirst:true,formatItem:function(c){return c?c[0]:false
},formatMatch:null,autoFill:false,width:0,multiple:false,multipleSeparator:", ",fixedWidth:false,promoteParents:false,customMatching:undefined,bold:function(c,d){var e=d.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1");
return c.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+e+")(?![^<>]*>)(?![^&;]+;)","gi"),"<strong>$1</strong>")
},sortRows:undefined,highlight:function(c){c.slice(0,1).addClass(b.ACTIVE);
return 0
},addExtraStyling:function(d,e,c){var d=d;
d=c%2==0?"ac_even":"ac_odd";
d+=e.parent?" ac_child":"";
return d
},allowSelectingParents:true,scroll:false,scrollHeight:180,shouldPromote:function(d,c){return false
},shouldAddItem:function(){return true
},notFoundMessage:function(){return"No items found"
},allowNonMatchingText:true};
a.AutoCompleter.Cache=function(r){var i={};
var c=0;
var h=1;
var m=0;
var d=[];
var e=[];
function l(v,u){if(r.customMatching){return r.customMatching(v,u)
}if(!r.matchCase){v=v.toLowerCase();
u=u.toLowerCase()
}var t=v.indexOf(u);
if(r.matchContains=="word"){t=v.toLowerCase().search("\\b"+u.toLowerCase())
}if(t==-1){return false
}return t==0||r.matchContains
}function q(t,s){if(c>r.cacheLength){n()
}if(!i[t]){c++
}i[t]=s
}function j(){if(!r.data){return false
}if(!r.url){r.cacheLength=1
}var s={};
s[""]=[];
h=1;
if(typeof r.data[0]=="string"){p(s)
}else{g(s)
}a.each(s,function(t,u){r.cacheLength++;
q(t,u)
});
return true
}function f(s){var u=0;
for(var t=0;
t<s.length;
t++){u+=1;
if(s[t].children){u+=s[t].children.length
}}return u
}function k(t,v,s,u){var y=[t];
var x=r.formatMatch(y,h,m);
if(!x){return false
}var w=x.charAt(0).toLowerCase();
if(!v[w]){v[w]=[]
}var z={value:x,data:y,result:r.formatResult&&r.formatResult(x,u)||x};
v[w].push(z);
if(s++<r.max){v[""].push(z)
}h++;
return z
}function p(t){m=r.data.length;
var s=0;
for(var u=0;
u<r.data.length;
u++){var v=k(r.data[u],t,s,false);
e.push(v)
}}function g(u){m=f(r.data);
var s=0;
function w(C){var D=k(C.name,u,s,true);
if(!D){return
}D.id=C.id;
D.children=[];
for(var B=0;
B<C.children.length;
B++){var A=t(C.children[B]);
if(A){A.parent=D;
D.children.push(A)
}}return D
}function t(B){var A=k(B.name,u,s,false);
if(!A){return
}if(A){A.id=B.id
}return A
}for(var v=0;
v<r.data.length;
v++){var z=r.data[v];
if(z.children){var y=w(z);
y&&d.push(y)
}else{var x=t(z);
x&&e.push(x)
}}}j();
function o(){i={};
c=0;
h=1;
m=0;
d=[];
e=[];
j()
}function n(){i={};
c=0
}return{data:i,flush:n,add:q,populate:j,repopulate:o,getDataLength:function(){return m
},load:function(t){if(!r.cacheLength||!c){return null
}if(!r.url&&r.matchContains){var u=[];
var z=[];
function v(I){u.push(I);
if(I.children){a.each(I.children,function(K,J){u.push(J)
})
}}function y(I){return I.value.substr(0,t.length).toLowerCase()===t.toLowerCase()
}function B(){a.each(d,function(I,J){if(y(J)){v(J)
}})
}function C(){if(r.matchContains){a.each(d,function(I,J){if(a.inArray(J,u)===-1){if(l(J.value,t)){v(J)
}else{if(J.children){z.push(J)
}}}})
}}function w(){a.each(z,function(I,J){var K=false;
a.each(J.children,function(M,L){if(y(L)){if(!K){u.push(J);
K=true
}u.push(L)
}})
})
}function s(){if(r.matchContains){a.each(z,function(I,J){if(a.inArray(J,u)===-1){var K=false;
a.each(J.children,function(M,L){if(l(L.value,t)){if(!K){u.push(J);
K=true
}u.push(L)
}})
}})
}}function F(I){if(r.sortRows){I.children=r.sortRows(I.children,t)
}}function A(L){var I=[];
for(var J=0;
J<L.length;
J++){var K=L[J];
if(l(K.value,t)){F(K);
I.push(K)
}else{for(var N=0;
N<K.children.length;
N++){var M=K.children[N];
if(l(M.value,t)){F(K);
I.push(K);
break
}}}}return I
}function E(L){var I=[];
for(var K=0;
K<L.length;
K++){var J=L[K];
if(l(J.value,t)){I.push(J)
}}return I
}function H(J){var I=[];
a.each(J,function(K,L){I.push(L);
if(L.children){a.each(L.children,function(N,M){I.push(M)
})
}});
return I
}if(r.promoteParents){B();
C();
w();
s()
}else{u=u.concat(A(d));
u=u.concat(E(e));
if(r.sortRows){u=r.sortRows(u,t)
}u=H(u)
}return u
}else{if(i[t]){return i[t]
}else{if(r.matchSubset){for(var x=t.length-1;
x>=3;
x--){var D=i[t.substr(0,x)];
if(D){var G=[];
a.each(D,function(J,I){if(l(I.value,t)){G[G.length]=I
}});
return G
}}}}}return null
}}
};
a.AutoCompleter.Select=function(g,k,n,r,l){var m,h=-1,t,o="",u=true,d,q,f=a(k).attr("id");
a("#"+f).attr({role:"combobox","aria-autocomplete":"inline","aria-owns":f+"_list","aria-controls":f+"_list","aria-expanded":false});
function p(){if(!u){return
}d=a("<div/>").hide().addClass(g.resultsClass).css("position","absolute").appendTo(l||document.body).hover(function(v){if(a(this).is(":visible")){k.focus()
}r.isMouseOnFlyout=true
},function(){r.isMouseOnFlyout=false
});
q=a('<ul id="'+f+'_list" role="listbox"><ul/>').appendTo(d);
if(g.width>0){d.css("width",g.width);
q.css("width",g.width)
}u=false
}function s(w){var v=w.target;
while(v&&v.tagName!="LI"){v=v.parentNode
}if(!v){return[]
}return v
}function j(v){m.slice(h,h+1).removeClass(b.ACTIVE);
i(v);
var x=m.slice(h,h+1).addClass(b.ACTIVE);
var y=a(x).attr("id");
a(k).attr("aria-activedescendant",y);
if(g.scroll){var w=0;
m.slice(0,h).each(function(){w+=this.offsetHeight
});
if((w+x[0].offsetHeight-q.scrollTop())>q[0].clientHeight){q.scrollTop(w+x[0].offsetHeight-q.innerHeight())
}else{if(w<q.scrollTop()){q.scrollTop(w)
}}}}function i(w){var v=false;
while(!v){h+=w;
if(h<0){h=m.size()-1
}else{if(h>=m.size()){h=0
}}v=!a(m.slice(h,h+1)).hasClass("unselectable")
}}function c(v){return g.max&&g.max<v?g.max:v
}function e(){var y;
var x;
var I;
var z;
var G;
var E;
var H;
a(k).attr("aria-activedescendant","");
q.empty();
if(!t){var A=g.notFoundMessage(o);
if(A){a.data(a("<li/>").mousedown(function(){return false
}).html(A).appendTo(q)[0],"airport_not_found");
q.find("li").attr({role:"option",id:f+"_option0",selected:"selected"});
a(k).attr("aria-activedescendant",f+"_option0");
m=q.find("li");
a.arialive(A)
}return
}var D=c(t.length);
var C=0;
var F;
for(var w=0;
w<t.length;
w++){var J=t[w];
if(F&&!J.parent&&!g.allowSelectingParents){B();
F=undefined
}v(J,C++);
if(J.children){F=J
}}m=q.find("li");
a.each(m,function(K,L){I=a(this).prevAll(".ac_parent").eq(0);
G=I.clone();
G.find(".screenreader-only").remove();
G=G.text();
E='<span class="screenreader-only">'+G+" options</span>";
H='<span class="screenreader-only">Out of '+G+" options</span>";
if(a(this).hasClass("normal")){a(this).attr({role:"option",id:f+"_option"+K})
}if(a(this).hasClass("ac_child")&&!a(this).prev().is(".ac_child")){if(a(this).find(".screenreader-only").length===1){a(E).insertAfter(a(this).find(".screenreader-only"))
}else{a(this).prepend(E)
}}if(a(this).hasClass("ac_child")&&!a(this).next().is(".ac_child")){a(this).append(H)
}});
y=m.clone();
y=y.not(".unselectable").remove();
y.filter("li").removeClass();
x=y.length;
a.arialive(x+" results displayed for your search. Use the arrow keys to browse them.");
z=a(y.slice(0)).attr("id");
setTimeout(function(){a(k).attr("aria-activedescendant",z)
},1000);
if(g.selectFirst&&t.length>0){h=g.highlight(m,t,o)
}if(a.fn.bgiframe){q.bgiframe()
}function v(S,O){var N=g.formatItem([S.result],O+1,D,S.value,o);
var K="";
if(N===false){return
}var R,Q,M,P;
var L="normal ";
if(S.children){K="ac_parent"
}if(S.children&&!g.allowSelectingParents){L="unselectable";
P="regionDots";
M="<div class='"+P+"'></div><div class='region'>"+N+"</div>"
}else{M=g.bold(N,o);
L+=g.addExtraStyling(L,S,O)
}Q=a("<li/>").html(M).addClass(L+" "+K);
if(S.children&&!g.allowSelectingParents){R=Q.mousedown(function(){return false
}).appendTo(q)[0]
}else{R=Q.mouseover(function(T){if(s(T).nodeName&&s(T).nodeName.toUpperCase()=="LI"){h=a("li",q).removeClass(b.ACTIVE).index(s(T));
a(s(T)).addClass(b.ACTIVE)
}}).mousedown(function(T){a(s(T)).addClass(b.ACTIVE);
n(T);
return false
});
if(g.shouldPromote(S.value,o)){R=Q.prependTo(q)[0]
}else{R=Q.appendTo(q)[0]
}}a.data(R,"ac_data",S)
}function B(){var M="unselectable bottom";
var O="endRegionDots";
var L="<div class='"+O+"'></div>";
var N=a("<li/>").html(L).addClass(M);
var K=N.mousedown(function(){return false
}).appendTo(q)[0];
a.data(K,"ac_data",J)
}}return{display:function(w,v){p();
t=w;
o=v;
e()
},next:function(){j(1)
},prev:function(){j(-1)
},pageUp:function(){if(h!=0&&h-8<0){j(-h)
}else{j(-8)
}},pageDown:function(){if(h!=m.size()-1&&h+8>m.size()){j(m.size()-1-h)
}else{j(8)
}},hide:function(){d&&d.hide();
m&&m.removeClass(b.ACTIVE);
h=-1;
a(k).attr("aria-expanded",false)
},visible:function(){return d&&d.is(":visible")
},current:function(){return this.visible()&&(m.filter("."+b.ACTIVE)[0]||g.selectFirst&&m[0])
},show:function(){var z=a(k).offset();
d.css({width:typeof g.width=="string"||g.width>0?g.width:"",top:z.top+k.offsetHeight,left:z.left}).show();
if(g.fixedWidth){var v=a("#"+a(k).attr("id")).css("width");
var w=0;
if(a.browser.mozilla){w=1
}v=parseInt(v.substring(0,v.length-2))+w;
v+="px";
a(".ac_results").css("width",v);
a(".ac_results ul").css("width",v)
}if(g.scroll){q.scrollTop(0);
if((typeof document.body.style.maxHeight==="undefined")||(document.body.style.maxHeight=="")){var x=0;
if(m){m.each(function(){x+=this.offsetHeight
})
}else{x+=this.offsetHeight
}if(isNaN(x)){x=0
}if(x==0){d.css({border:"0"})
}else{d.css({border:"1px solid black"})
}var y=x>g.scrollHeight;
q.css("height",y?g.scrollHeight:x);
if(!y&&m&&a.browser.msie){m.width(q.width())
}}}a(k).attr("aria-expanded",true)
},getSelectedItem:function(){var v=m&&m.filter("."+b.ACTIVE).removeClass(b.ACTIVE);
return v&&v.length&&a.data(v[0],"ac_data")
},emptyList:function(){q&&q.empty()
},unbind:function(){d&&d.remove()
},isNotFoundMessageEmpty:function(){return q.find("li").text()==""
}}
};
a.fn.selection=function(j,c){if(j!==undefined){return this.each(function(){if(this.createTextRange){var k=this.createTextRange();
if(c===undefined||j==c){k.move("character",j);
k.select()
}else{k.collapse(true);
k.moveStart("character",j);
k.moveEnd("character",c);
k.select()
}}else{if(this.setSelectionRange){this.setSelectionRange(j,c)
}else{if(this.selectionStart){this.selectionStart=j;
this.selectionEnd=c
}}}})
}var h=this[0];
if(h.createTextRange){var d=document.selection.createRange(),i=h.value,g="<->",e=d.text.length;
d.text=g;
var f=h.value.indexOf(g);
h.value=i;
this.selection(f,f+e);
return{start:f,end:f+e}
}else{if(h.selectionStart!==undefined){return{start:h.selectionStart,end:h.selectionEnd}
}}}
})(jQuery);