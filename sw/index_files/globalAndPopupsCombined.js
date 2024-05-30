
/*! global.js */
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
/*! a11y_popup.js */
var popUpAccessible=function(c,b,a,f,e,d){this._addTabbableSupport();
this._addFocusSelectorSupport();
this.popUp=c;
this.popUpTrigger=$(b);
this.popUpCloseFunction=(typeof a==="function")?a:function(){};
if(typeof d==="boolean"&&d===true){this._makeContainerTabbableFirstElement();
this._moveFocusToFirstElement()
}else{this._makeContainerTabbable();
this._moveFocusToContainer()
}if(f){if(typeof f==="string"){this.closeElements=this.popUp.find(f)
}else{if($.isArray(f)){this.closeElements=this.popUp.find(f.join())
}}this._handleCloseElements()
}this.allowEscapeClose=(typeof e!=="boolean")?true:e;
this._setFirstAndLastTabbableElements();
if(this.allowEscapeClose){this._listenEscKey()
}this._listenTabKey()
};
popUpAccessible.prototype._makeContainerTabbable=function(){var a='<div class="js-role-document" role="dialog"></div>';
this.popUp.attr({role:"document",tabindex:"-1"});
if(this.popUp.closest(".js-role-document").length===0){this.popUp.wrapAll(a)
}};
popUpAccessible.prototype._makeContainerTabbableFirstElement=function(){var a='<div class="js-role-document" role="dialog"></div>';
if(this.popUp.closest(".js-role-document").length===0){this.popUp.wrapAll(a)
}};
popUpAccessible.prototype._moveFocusToContainer=function(){setTimeout($.proxy(function(){this.popUp.focus()
},this),100)
};
popUpAccessible.prototype._moveFocusToFirstElement=function(){setTimeout($.proxy(function(){this.popUpFirstTabbableEl.focus()
},this),100)
};
popUpAccessible.prototype._returnFocusToTrigger=function(){setTimeout($.proxy(function(){this.popUp.removeAttr("tabindex");
this.popUp.removeAttr("role");
this.popUpTrigger.focus()
},this),100)
};
popUpAccessible.prototype._listenTabKey=function(){this.popUp.keydown($.proxy(function(a){this._tabCycle(a)
},this))
};
popUpAccessible.prototype._handleCloseElements=function(){this.closeElements.each($.proxy(function(a,b){$(b).attr("tabindex","0");
$(b).click($.proxy(this._closePopUp,this));
$(b).keydown($.proxy(function(c){if(c.which&&(c.which===this.KEY_ENTER)){c.preventDefault();
this._closePopUp()
}},this))
},this))
};
popUpAccessible.prototype._closePopUp=function(){this._returnFocusToTrigger();
this.popUpCloseFunction();
this._unbindKeyDown()
};
popUpAccessible.prototype._listenEscKey=function(){this.popUp.keydown($.proxy(function(a){if(a.which&&(a.which===this.KEY_ESCAPE)){this._closePopUp()
}},this))
};
popUpAccessible.prototype._unbindKeyDown=function(){this.popUp.unbind("keydown")
};
popUpAccessible.prototype._setFirstAndLastTabbableElements=function(){this.popUpTabbableEl=this.popUp.find(":tabbable, [tabindex]");
this.popUpFirstTabbableEl=this.popUpTabbableEl.first()[0];
this.popUpLastTabbableEl=this.popUpTabbableEl.last()[0]
};
popUpAccessible.prototype._tabCycle=function(b){var a;
if(b.which===this.KEY_TAB){a=$("*:focus")[0];
if(b.shiftKey&&a===this.popUpFirstTabbableEl||b.shiftKey&&this.popUp.is(":focus")){b.preventDefault();
this.popUpLastTabbableEl.focus()
}else{if(!b.shiftKey&&a===this.popUpLastTabbableEl){b.preventDefault();
this.popUpFirstTabbableEl.focus()
}}}};
popUpAccessible.prototype.reusePopUp=function(a){this.popUpTrigger=$(a);
this.popUpCloseFunction=closeProductHover;
this._makeContainerTabbable();
this._moveFocusToContainer();
this._setFirstAndLastTabbableElements();
this._listenEscKey();
this._listenTabKey()
};
popUpAccessible.prototype._addTabbableSupport=function(){this.KEY_ENTER=13;
this.KEY_ESCAPE=27;
this.KEY_TAB=9;
if(!$.expr[":"].tabbable){$.extend($.expr[":"],{data:function(c,b,a){return !!$.data(c,a[3])
},focusable:function(b){var c=b.nodeName.toLowerCase(),a=$.attr(b,"tabindex");
return(/input|select|textarea|button|object/.test(c)?!b.disabled:"a"==c||"area"==c?b.href||!isNaN(a):!isNaN(a))&&!$(b)["area"==c?"parents":"closest"](":hidden").length
},tabbable:function(b){var a=$.attr(b,"tabindex");
return(isNaN(a)||a>=0)&&$(b).is(":focusable")
}})
}};
popUpAccessible.prototype._addFocusSelectorSupport=function(){var a=$.expr[":"];
if(!a.focus){a.focus=function(b){return b===document.activeElement&&(b.type||b.href)
}
}};
/*! popups.js */
var globalPopupCallbacksInitialized=false;
var SWA=SWA||{};
SWA.PopUp={pointerDirections:{popup_open_direction_East:"popup_pointer_right",popup_open_direction_West:"popup_pointer_left",popup_open_direction_South:"popup_pointer_up",popup_open_direction_North:"popup_pointer_down",popup_open_direction_NorthWest:"popup_pointer_down",popup_open_direction_NorthEast:"popup_pointer_down",popup_open_direction_SouthWest:"popup_pointer_up",popup_open_direction_SouthEast:"popup_pointer_up",popup_open_direction_EastNorth:"popup_pointer_east_north"},pointerImages:{popup_pointer_down:["/assets/images/fare_product_pointer_noShadow.gif",31,17],popup_pointer_up:["/assets/images/fare_product_pointer_noShadow_bottom.gif",31,17],popup_pointer_left:["/assets/images/priceItin_pointer_noShadow_right.gif",16,27],popup_pointer_right:["/assets/images/priceItin_pointer_noShadow.gif",16,27],price_itinerary_pointer:["/assets/images/priceItin_pointer_noShadow.gif",16,27],popup_pointer_east_north:["/assets/images/fare_details_triangle_left.png",18,32],earlyBirdAlistPointer:["/assets/images/airItin_pointer_noShadow.gif",16,27],earlyBirdCheckinExclusionsPointer:["/assets/images/airItin_pointer_noShadow.gif",16,27],air_itinerary_pointer_white:["/assets/images/airItin_pointer_noShadow.gif",18,32],air_itinerary_pointer_gray:["/assets/images/airItin_pointer_noShadow_gray.gif",18,32]},popup_container_class:"popup_outer_container",popup_container_class_itinerary:"priceItineraryPopupTable",close_container_class:"popup_close_container",popup_is_opening:false,getAllPointerIds:function(){var b="";
for(var a in SWA.PopUp.pointerImages){if(typeof a==="string"){b+="#"+a+", "
}}return b.substr(0,b.length-2)
},register:function(b,a){if(!globalPopupCallbacksInitialized){SWA.PopUp.initialize(b,SWA.PopUp.getAllPointerIds())
}$(a).click(function(c){SWA.PopUp.popup_is_opening=true;
SWA.PopUp.hideHoverObjects();
SWA.PopUp.showHoverObjects(this,b);
c.stopPropagation();
c.preventDefault();
$(document).click();
SWA.PopUp.popup_is_opening=false;
return false
});
$(b+" ."+SWA.PopUp.close_container_class).click(function(){SWA.PopUp.hideHoverObjects()
})
},initialize:function(a,b){$(document).click(function(){if(!SWA.PopUp.popup_is_opening){SWA.PopUp.hideHoverObjects()
}});
$("#page_bottom_popup_outer_container ."+SWA.PopUp.popup_container_class_itinerary+" ,#page_bottom_popup_outer_container ."+SWA.PopUp.popup_container_class+", #page_bottom_popup_outer_container_async ."+SWA.PopUp.popup_container_class).click(function(){return false
}).find("A,INPUT").click(function(c){c.stopPropagation();
return true
});
$(b).click(function(){return false
});
globalPopupCallbacksInitialized=true
},initializePopupPointer:function(c){var b=SWA.PopUp.pointerDirections[c];
var a=SWA.PopUp.pointerImages[b];
if($("#"+b).size()==0){$(document.body).append('<img src="'+a[0]+'" width="'+a[1]+'" height="'+a[2]+'" id="'+b+'" class="popup_pointer_image" alt=""/>')
}return b
},showHoverObjects:function(b,c){var p="popup_open_direction_East";
var h=$(b).attr("class").split(/\s+/);
var l=h.length;
for(var d=0;
d<l;
d++){if(h[d].indexOf("popup_open_direction")===0){p=h[d]
}}var n=SWA.PopUp.initializePopupPointer(p);
var j=$(c);
if(j.size()>0){var e=$(b).offset();
var o=$(b).height();
var g=$(b).width()+4;
var a=$("#"+n);
a.css({display:"block"});
j.css({display:"block"});
var k=a.outerWidth();
var f=a.outerHeight();
if(p=="popup_open_direction_East"){a.css({top:e.top+o/2-f/2,left:e.left+g});
j.css({top:e.top-50,left:e.left+g+k-3})
}else{if(p.indexOf("popup_open_direction_EastNorth")===0){a.css({top:e.top+o/2-f/2,left:e.left+g});
j.css({top:e.top-70,left:e.left+g+k-8})
}else{if(p.indexOf("popup_open_direction_North")===0){a.css({top:e.top-f,left:e.left+(g/2)-(k/2)});
j.css({top:e.top-f-j.height()-2});
if(p=="popup_open_direction_North"){var m=4;
var q=e.left+(g/2)-(j.width()/2);
j.css({left:(q>m)?q:m})
}else{if(p=="popup_open_direction_NorthEast"){j.css({left:e.left})
}else{if(p=="popup_open_direction_NorthWest"){j.css({left:e.left+g-j.width()})
}}}}else{if(p.indexOf("popup_open_direction_South")===0){a.css({top:e.top+o,left:e.left+(g/2)-(k/2)});
j.css({top:e.top+o+f-3});
if(p=="popup_open_direction_South"){j.css({left:e.left+(g/2)-(j.width()/2)})
}else{if(p=="popup_open_direction_SouthEast"){j.css({left:e.left})
}else{if(p=="popup_open_direction_SouthWest"){j.css({left:e.left+g-j.width()})
}}}}else{if(p=="popup_open_direction_West"){a.css({top:e.top+o/2-f/2,left:e.left-k});
j.css({top:e.top-50,left:e.left-j.width()-k-3})
}}}}}toggleSelectBoxVisibilityUnderPopups("hidden",j);
j.find("."+SWA.PopUp.close_container_class).show();
SWA.popUpAccessible=new popUpAccessible(j,b,SWA.PopUp.hideHoverObjects,".popup_close_container")
}},hideHoverObjects:function(){var b=SWA.PopUp.getAllPointerIds();
var a=$("#page_bottom_popup_outer_container ."+SWA.PopUp.popup_container_class+", #page_bottom_popup_outer_container_async ."+SWA.PopUp.popup_container_class+", #fullFareDivReturning , .js-pointsCalcDiv , #earlyBirdCheckinExclusions , #earlyBirdAlistPopup , #fullFareDivDeparting , #routingHoverTable , #fareProductHover , #fare_product_pointer , .fullFareDiv ."+SWA.PopUp.popup_container_class+", .farePopupTable");
a.each(function(){toggleSelectBoxVisibilityUnderPopups("visible",this)
});
a.css({display:"none"});
$(b).css({display:"none"})
}};
function toggleSelectBoxVisibilityUnderPopups(e,b){if(!$.browser.msie){return
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
}function hideHoverObjects(){if(!SWA.PopUp.popup_is_opening){SWA.PopUp.hideHoverObjects();
var a=".priceItineraryPopupTable, #earlyBirdCheckinHelp, #priceItineraryKeyBusinessSelectPopup, #giftCardMessagePopup, #giftCardFAQ, .js-pointsCalcDiv, .js-taxesAndFeesDiv, js-umChargeDiv, .fullFareDiv";
if(typeof additionalPopupDivs==="function"){a+=additionalPopupDivs()
}var b=$(a);
$(b).each(function(){if($(this).css("display")!="none"){toggleSelectBoxVisibilityUnderPopups("visible",this)
}});
b.css({display:"none"});
$("#price_itinerary_pointer, #pointer_point_to_left, #pointer_point_to_right, #earlyBirdCheckinHelpPointer, #earlyBirdCheckinExclusionsPointer, #priceItineraryKeyBusinessSelectPointer, #earlyBirdAlistPointer, #giftCardMessagePopupPointer, #giftcardfaqoverlaydivpointer, #popup_pointer_down").css({display:"none"})
}}function displayHelpPopup(c,f,d,g,i,h){var e=$("#popup_help_box");
var b=$("#popup_help_box_pointer");
e.removeClass();
e.addClass(i+" popup_help_box");
e.find(".popup_help_box_header_left").html(f);
e.find(".popup_help_box_content_container").html(d);
e.find(".popup_help_box_header_right DIV").click(function(){closeHelpPopup();
return false
});
b.removeClass();
b.addClass("popup_help_box_pointer_"+g+" popup_help_box_pointer");
var a=$(c).offset();
if(g=="down"){e.css({top:a.top-e.outerHeight()-b.outerHeight()+3,left:a.left-e.outerWidth()*h,display:"block"});
b.css({top:a.top-b.outerHeight(),left:a.left+$(c).outerWidth()/2-b.outerWidth()/2,display:"block"})
}else{if(g=="up"){e.css({top:a.top+$(c).outerHeight()+b.outerHeight()-3,left:a.left-e.outerWidth()*h,display:"block"});
b.css({top:a.top+$(c).outerHeight(),left:a.left+$(c).outerWidth()/2-b.outerWidth()/2,display:"block"})
}}SWA.popUpAccessible=new popUpAccessible(e,c,closeHelpPopup,".popup_help_box_header_right DIV")
}function showHelpPopup(d,f,a,c,e,b){displayHelpPopup(d,f,a,c,e,b)
}function rrPopUpHelp(b,a){showHelpUserdPopup(b);
eventStopPropagation(a);
return false
}function eventStopPropagation(a){if(typeof a=="undefined"){var a=window.event
}a.cancelBubble=true;
if(typeof a.stopPropagation=="function"){a.stopPropagation()
}}function showHelpUserdPopup(a){showHelpPopup(a,"Need help logging in?",'<strong>Forgot your Rapid Rewards Number?</strong><br />If you already have a Rapid Rewards or Account number, you may use the following link to look it up.<br/><br/><a href="/rapidrewards/rr-lookup.html">Lookup Rapid Rewards Account #</a>',"down","popup_help_box_forgot_rr",0.5)
}function checkinRRPopUpHelp(b,a){showCheckinRRHelpUserPopup(b);
a.cancelBubble=true;
return false
}function showCheckinRRHelpUserPopup(a){showHelpPopup(a,"Rapid Rewards Number",'Enter your Rapid Rewards number to ensure you get points for this flight.<br /><br/>Forgot your Rapid Rewards Number?<br/><a href="/rapidrewards/rr-lookup.html" target="_blank">Lookup Rapid Rewards Account #</a><br/>',"down","popup_checkin_forgot_rr",0.5)
}function showPromoCodeHelpPopup(a){showHelpPopup(a,"<h1 class='promoCode-text--heading'>What is a promo code?</h1>","A promotion code is a series of letters and/or numbers that allow Customers to receive a discount off of Southwest Airlines' published airfares.","up","popup_help_box_promo_code popup--borderFocus",0.5)
}function showPromoCodeHelpWidgetPopup(d){var b=$(".js-wcm_booking_widget_field_help_body").html();
var a;
var c=$(".js-wcm_booking_widget_field_help_title").html();
a='<h1 class="promoCode-text--heading">'+c+"</h1>";
showHelpPopup(d,a,b,"up","popup_help_widget_box_promo_code popup--borderFocus",0.5)
}function closeHelpPopup(){var b=$("#popup_help_box");
var a=$("#popup_help_box_pointer");
b.css({display:"none"});
a.css({display:"none"});
a.removeClass();
a.addClass("popup_help_box_pointer")
}function pointerWithinObject(a,b){var d=$("#"+b);
var c=a.pageX;
var e=a.pageY;
var f=parseInt(d.css("left"));
var g=parseInt(d.css("top"));
var i=d.outerHeight();
var h=d.outerWidth();
return(between(c,f,f+h)&&between(e,g,g+i))
}function between(c,a,b){return(c>=a&&c<=b)
}$(document).ready(function(){var a=27;
$("#right_column_account_login_form_field_rr_help_link").click(function(b){return rrPopUpHelp($(this),b)
});
$(".promo-code-icon, .js-info-icon--button").click(function(c){showPromoCodeHelpPopup($(this));
SWA.PopUp.hideHoverObjects();
var b=$(".swa-component-overlay:visible, .overlay-pointer").hide();
c.stopPropagation();
return false
});
$(".js-promo-code-icon--button").click(function(b){showPromoCodeHelpWidgetPopup($(this));
SWA.PopUp.hideHoverObjects();
$(".swa-component-overlay:visible, .overlay-pointer").hide();
b.stopPropagation();
return false
});
$(document).click(function(b){if(!pointerWithinObject(b,"popup_help_box")){closeHelpPopup()
}});
$(".swa-header--link").click(function(b){if(!pointerWithinObject(b,"popup_help_box")){closeHelpPopup()
}});
$(document).keydown(function(b){if(b.keyCode==a){closeHelpPopup()
}})
});