var buildDestFlyoutsOnPageLoad=true;
var buildDatePickersOnPageLoad=true;
if($.browser.msie&&parseInt($.browser.version,10)==6){try{document.execCommand("BackgroundImageCache",false,true)
}catch(err){}}$(document).ready(function(){var f=/({{\*{1,}}}|{{\‡{1,}}}|###\*{1,}###|{{\†{1,}}})/gi;
var a="</span>";
var k="]]";
var r="}}";
var j=")))";
var v='<span class="js-full-disclaimer">';
var t='<span class="screenreader-only js-disclaimer-message">';
var o='<span class="js-short-disclaimer">';
var b='<span class="screenreader-only">';
var n="[[";
var p='<span class="js-type-disclaimer" aria-hidden="true">';
var m="{{";
var B="(((";
var c="###";
var e="@@@";
var C=$(".js-rr-footnotes p:contains("+n+")");
var l;
var s;
var D;
var h=[];
var g;
var A;
var z;
var w=C.length;
var y;
var d;
var u;
if(($.browser.msie)&&(($.browser.version<8)||(document.compatMode!="CSS1Compat"))){$("SELECT.fieldError").each(function(){if($(this).css("display")!="none"){$(this).css({margin:0}).wrap("<span class='errorSelectWrapper' style='border: 1px solid red;display:inline-block'></span>")
}})
}function x(){var G=$(".js-rr-footnotes");
var F;
var E;
var I;
var i;
var K;
var L;
function J(M,N,O){N=m+N.replace(/\*/g,"\\*")+r;
E=new RegExp(N,"g");
return M.replace(E,O)
}function H(M){$.map(h,function(N){M=J(M,N.key,N.hiddenKey+N.value)
});
return M
}G.html(H(G.html()));
F=$(".js-disclaimer-message").parent().addClass("js-selector-target");
F.each(function(){L=$(this).html().split(p)[0];
L=L||"";
if(L!==""){i=$(this);
I=i.find(".js-disclaimer-message");
I.remove();
i.html("\u0020"+i.html()+"\u0020"+b+I.html()+a)
}})
}if(w>0){function q(i){return i.html().match(f)!==null
}C.each(function(){var i=$(this);
if(q(i)){i.addClass("js-selector-disclaimer").attr("aria-hidden",true)
}});
$(".js-rr-footnotes *:contains("+e+")").each(function(){if(q($(this))){$(this).attr("aria-hidden",false)
}});
$(".js-rr-footnotes *:contains("+c+")").each(function(){if(q($(this))){$(this).addClass("js-selector-disclaimer").attr("aria-hidden",false)
}});
$(".js-selector-disclaimer").each(function(){z=$(this).html();
z=z.replace(c,p);
z=z.replace(c,a);
z=z.replace(n,v);
z=z.replace(k,a);
z=z.replace(e,b);
z=z.replace(e,a);
z=z.replace(m,p);
z=z.replace(r,a);
z=z.replace(B,o);
z=z.replace(j,a);
$(this).html(z)
});
$(".js-selector-disclaimer").each(function(){s=$(this);
D=s.find(".js-short-disclaimer");
D.addClass("screenreader-only");
if(D.length>0){A=$(D[0]).html()
}else{A=s.find(".js-full-disclaimer").html()
}h.push({key:s.find(".js-type-disclaimer").text(),hiddenKey:p+s.find(".js-type-disclaimer").text()+a,value:t+A+"&nbsp;"+a});
D.remove()
});
x()
}});
function positionIframeUnder(f,d){if($.browser.msie&&$.browser.version<=6){var c=$(f);
d=$(d);
var g=d.offset();
var b=d.outerHeight();
var a=d.outerWidth();
var e=parseInt(d.css("z-index"));
c.css({top:g.top,left:g.left,height:b,width:a,display:"block",position:"absolute"}).css("z-index",e-1)
}}function toggleSelectBoxVisibilityUnderPopups(e,b){if(!$.browser.msie){return
}if(e!="visible"&&e!="hidden"){e="visible"
}var f=$(b).offset();
var a=$(b).height();
var d=$(b).width();
var c=$(b).attr("id");
$("SELECT").each(function(){if(!c||$(this).parents("#"+c).size()==0){var h=$(this).offset();
var i=$(this).height();
var m=$(this).width();
var g=between(h.left,f.left,f.left+d);
var k=between(h.left+m,f.left,f.left+d);
var l=between(h.top,f.top,f.top+a);
var j=between(h.top+i,f.top,f.top+a);
if((g||k)&&(l||j)){$(this).css("visibility",e)
}}})
}function between(c,a,b){return(c>=a&&c<=b)
}function pointerWithinObject(a,b){var d=$("#"+b);
var c=a.pageX;
var e=a.pageY;
var f=parseInt(d.css("left"));
var g=parseInt(d.css("top"));
var i=d.outerHeight();
var h=d.outerWidth();
return(between(c,f,f+h)&&between(e,g,g+i))
}function textBoxMaxLength(d,a){var c;
var b;
var e;
$(d).each(function(){c=$("#"+$(this).attr("id"));
c.keyup(function(){b=$(this).val().length;
e=$(this).val();
if(b>a){$(this).val(e.substr(0,a))
}})
})
}function growTextBoxInitialize(b){var a=$(b);
$("body").append("<div id='dummyContent'></div>");
$("#dummyContent").css({fontSize:a.css("font-size"),fontFamily:a.css("font-family"),width:a.width()-(a.outerWidth()-a.innerWidth()),lineHeight:a.css("line-height")+"px",margin:"3px",padding:"px",position:"absolute",top:0,left:-9999,visibility:"hidden"});
$(b).each(function(){var c=$("#"+$(this).attr("id"));
c.keypress(function(d){growBox($(this),d)
});
growBox(c,"")
})
}function growBox(e,b){var a=$("#"+$(e).attr("id"));
$("#dummyContent").html(a.val()+String.fromCharCode(b.which));
var d=a.innerHeight();
var c=$("#dummyContent").outerHeight();
if(c>d){a.css("height",c+10)
}}$(document).ready(function(){var b=$("#profile div.account_bar_content_box");
b.each(function(){addExpanderControls(this,"h6","box_closed")
});
var c=$("#outboundFilter, #inboundFilter");
c.each(function(){addExpanderControls(this,"h6","filter_closed")
});
b.find(".expanderImage").each(function(){toggleExpandCollapse(this,"box_closed",hasImageCousins)
});
c.find(".expanderImage").each(function(){toggleExpandCollapse(this,"filter_closed",hasImageCousins)
});
if($("#travel-tools-air").size()==1){var a=$("div.travelToolsSection");
a.each(function(){addExpanderControlsAppend(this,"h4","section_closed")
});
a.find(".expanderImage").each(function(){toggleExpandCollapse(this,"section_closed",hasImageCousins)
})
}});
function hasImageCousins(a){return($(a).parent().siblings().children().size()>0)
}function initializeToClosedState(a){$(a).addClass("closed")
}function addExpanderControls(c,a,b){if($(c).hasClass("noToggle")){return
}if($(c).hasClass("closed")){$(c).removeClass("closed").addClass(b);
$(c).children(a).prepend("<span class='expanderImage plusImage' title='expand'></span>&nbsp;")
}else{$(c).children(a).prepend("<span class='expanderImage minusImage' title='collapse'></span>&nbsp;")
}}function addExpanderControlsAppend(c,a,b){if($(c).hasClass("noToggle")){return
}if($(c).hasClass("closed")&&window.location.hash!="#"+$(c).attr("id")){$(c).removeClass("closed").addClass(b);
$(c).children(a).append("<span class='expanderImage plusImage' title='expand'></span>&nbsp;")
}else{$(c).removeClass("closed");
$(c).children(a).append("<span class='expanderImage minusImage' title='collapse'></span>&nbsp;")
}}function toggleExpandCollapse(b,a,c){$(b).parent().click(function(){if($(b).hasClass("plusImage")){if(c(b)){$(b).removeClass("plusImage").addClass("minusImage").attr("title","collapse");
$(b).parent().parent().removeClass(a);
$(b).parent().parent().find("#companionContent").removeClass("collapseContent")
}}else{if($(b).hasClass("minusImage")){$(b).removeClass("minusImage").addClass("plusImage").attr("title","expand");
$(b).parent().parent().addClass(a);
$(b).parent().parent().find("#companionContent").addClass("collapseContent")
}}})
}var sUserAgent=navigator.userAgent.toLowerCase();
var isOpera=(sUserAgent.indexOf("opera")!=-1)?true:false;
var tmStart=null;
var pTime=0;
newWindow=null;
winProps=null;
function openWindow(d,c,b,f){var e=new Date();
var a=c?c:"_blank";
if(!b){b="width=400,height=350,scrollbars,resizable,toolbar,status,menubar,location"
}var g=window.open(d,a,b);
if(g&&!isOpera){g.focus()
}if(f>0){Start(f)
}return(g)?false:true
}function Start(a){tmStart=new Date();
Timer=setTimeout(function(){UpdateTimer(a)
},1000)
}function UpdateTimer(c){if(Timer){clearTimeout(Timer);
Timer=0
}if(!tmStart){tmStart=new Date()
}var a=new Date();
var b=a.getTime()-tmStart.getTime();
a.setTime(b);
cntDown=a.getSeconds();
if(cntDown!=c){Timer=setTimeout(function(){UpdateTimer(c)
},1000)
}else{Stop()
}}function Stop(){if(Timer){clearTimeout(Timer);
Timer=0
}tmStart=null;
closeWin()
}function closeWin(){if(newWindow&&newWindow.open&&!newWindow.closed){newWindow.close()
}}function ResetTimer(){tmStart=null
}function dateWithProper4DigitYear(c){var b=new Date(c);
var a=b.getFullYear();
if(a<2000){b.setFullYear(a+100)
}return b
}var dateFromInput=function(a){if(a.length==0){return null
}return(a.val()!="")?dateWithProper4DigitYear(a.val()):""
};
(function(a){a.fn.confirmOnLeave=function(d){var b=d||swa.account.leaveEditPageConfirmation;
var e=a(this);
var c=e.serializeArray();
window.onbeforeunload=function(){if(document.activeElement&&document.activeElement.id!="cancel"&&document.activeElement.id!="submit"){var f=e.serializeArray();
for(var g in c){if(f[g].value!=c[g].value){return b
}}}};
e.submit(function(){window.onbeforeunload=null
})
}
}(jQuery));
(function(a){a.fn.queryParams=function(){var d=a(this);
var b=d.attr("href");
var e=b.substring(b.indexOf("?")+1,b.length);
var j=e.split("&");
var g={};
for(var h=0;
h<j.length;
h++){var f=j[h].split("=");
var c=decodeURIComponent(f[0]);
var k=(f.length==2)?decodeURIComponent(f[1]):c;
g[c]=k
}return g
}
}(jQuery));
Date.prototype.toMMDDYYYY=function(){function a(e){e+="";
if(e.length==1){e="0"+e
}return e
}var b=a(this.getMonth()+1);
var c=a(this.getDate());
var d=this.getFullYear();
return b+"/"+c+"/"+d
};
$(document).ready(function(){$("input:checked + label").addClass("radioCheckedHilite");
$("input:radio").change(function(){$("label.radioCheckedHilite").removeClass("radioCheckedHilite");
var a=$(this).attr("id");
$("label[for="+a+"]").addClass("radioCheckedHilite")
})
});
var SWA=typeof(SWA)==="undefined"?{}:SWA;
SWA.ExpandCollapse={toggleExpandCollapseElement:function(c,b){var e=$(c);
var a=e.attr("aria-expanded")||false;
var d=e.attr("title").length>0;
if($(c).hasClass("plusImage")){SWA.ExpandCollapse.setMinusImage(c);
SWA.ExpandCollapse.showElement(b);
if(d){e.attr("title","collapse")
}if(a){e.attr("aria-expanded","true")
}return true
}else{if($(c).hasClass("minusImage")){SWA.ExpandCollapse.setPlusImage(c);
SWA.ExpandCollapse.hideElement(b);
if(d){e.attr("title","expand")
}if(a){e.attr("aria-expanded","false")
}return false
}}},hideElement:function(a){$(a).hide()
},showElement:function(a){$(a).show()
},setPlusImage:function(a){$(a).removeClass("minusImage").addClass("plusImage")
},setMinusImage:function(a){$(a).removeClass("plusImage").addClass("minusImage")
}};
SWA.DefaultText={class_name:"form_optional",handle:function(d,b,a){var c=SWA.DefaultText.class_name;
d.blur(function(){var e=$(this);
setTimeout(function(){var h;
var f=(e[0]!==document.activeElement);
var g=e.val();
h=(g===""||g===b);
if(h&&f){e.val(b).addClass(c)
}},500)
});
d.focus(function(h,f){var g=$(this);
if(g.hasClass(c)&&g.val()==b){g.removeClass(c).val("")
}else{g.removeClass(c);
if(f&&f==="fromdatepicker"){return
}g.select()
}});
if(d.val()==""||d.val()==b){d.val(b).addClass(c)
}a.click(function(){if(d.hasClass(c)&&d.val()==b){d.val("")
}})
}};
String.prototype.trim=function(){return this.replace(/^[\s\xA0]+/,"")
};
if(!String.prototype.startsWith){String.prototype.startsWith=function(a){return !this.indexOf(a)
}
}function getParameter(b){var d=window.location.search.substring(1);
var e=d.split("&");
var c="";
for(var a=0;
a<e.length;
a++){var f=e[a].split("=");
if(f[0]==b){c=f[1]
}}return c
}function submitThisFormById(a){$("#"+a).submit()
}SWA.FeatureToggles={isFeatureOn:function(a){return SWA.FeatureToggles.getFeatureState(a+"On")
},isFeatureOff:function(a){return SWA.FeatureToggles.getFeatureState(a+"Off")
},getFeatureState:function(a){return SWA.FeatureToggles.getBody().hasClass(a)
},getBody:function(){return SWA.FeatureToggles.body=(SWA.FeatureToggles.body)||$("body")
}};
$(document).ready(function(){removeLowFareCalendarLinkFromGlobalNav()
});
function removeLowFareCalendarLinkFromGlobalNav(){if(SWA.FeatureToggles.isFeatureOff("displayLowFareCalendar")){$("a:contains('Low Fare Calendar')").remove()
}}if(typeof URLSearchParams==="undefined"){function URLSearchParams(a){this.query=a
}URLSearchParams.prototype.get=function(a){return getParameter(a)
};
URLSearchParams.prototype.has=function(a){var b=getParameter(a);
return b!==""
}
};