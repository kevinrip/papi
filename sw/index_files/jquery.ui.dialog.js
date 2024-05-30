(function(d,e){var b="ui-dialog ui-widget ui-widget-content ui-corner-all ",a={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},c={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true};
d.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(g){var f=d(this).css(g).offset().top;
if(f<0){d(this).css("top",g.top-f)
}}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var n=this,o=n.options,l=o.title||"&#160;",g=d.ui.dialog.getTitleId(n.element),m=(n.uiDialog=d("<div></div>")).appendTo(document.body).hide().addClass(b+o.dialogClass).css({zIndex:o.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(p){if(o.closeOnEscape&&p.keyCode&&p.keyCode===d.ui.keyCode.ESCAPE){n.close(p);
p.preventDefault()
}}).attr({role:"dialog","aria-labelledby":g}).mousedown(function(p){n.moveToTop(false,p)
}),i=n.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(m),h=(n.uiDialogTitlebar=d("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(m),k=d('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){k.addClass("ui-state-hover")
},function(){k.removeClass("ui-state-hover")
}).focus(function(){k.addClass("ui-state-focus")
}).blur(function(){k.removeClass("ui-state-focus")
}).click(function(p){n.close(p);
return false
}).appendTo(h),j=(n.uiDialogTitlebarCloseText=d("<span></span>")).addClass("ui-icon ui-icon-closethick").text(o.closeText).appendTo(k),f=d("<span></span>").addClass("ui-dialog-title").attr("id",g).html(l).prependTo(h);
if(d.isFunction(o.beforeclose)&&!d.isFunction(o.beforeClose)){o.beforeClose=o.beforeclose
}h.find("*").add(h).disableSelection();
if(o.draggable&&d.fn.draggable){n._makeDraggable()
}if(o.resizable&&d.fn.resizable){n._makeResizable()
}n._createButtons(o.buttons);
n._isOpen=false;
if(d.fn.bgiframe){m.bgiframe()
}},_init:function(){if(this.options.autoOpen){this.open()
}},destroy:function(){var f=this;
if(f.overlay){f.overlay.destroy()
}f.uiDialog.hide();
f.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
f.uiDialog.remove();
if(f.originalTitle){f.element.attr("title",f.originalTitle)
}return f
},widget:function(){return this.uiDialog
},close:function(i){var f=this,h,g;
if(false===f._trigger("beforeClose",i)){return
}if(f.overlay){f.overlay.destroy()
}f.uiDialog.unbind("keypress.ui-dialog");
f._isOpen=false;
if(f.options.hide){f.uiDialog.hide(f.options.hide,function(){f._trigger("close",i)
})
}else{f.uiDialog.hide();
f._trigger("close",i)
}d.ui.dialog.overlay.resize();
if(f.options.modal){h=0;
d(".ui-dialog").each(function(){if(this!==f.uiDialog[0]){g=d(this).css("z-index");
if(!isNaN(g)){h=Math.max(h,g)
}}});
d.ui.dialog.maxZ=h
}return f
},isOpen:function(){return this._isOpen
},moveToTop:function(j,i){var f=this,h=f.options,g;
if((h.modal&&!j)||(!h.stack&&!h.modal)){return f._trigger("focus",i)
}if(h.zIndex>d.ui.dialog.maxZ){d.ui.dialog.maxZ=h.zIndex
}if(f.overlay){d.ui.dialog.maxZ+=1;
f.overlay.$el.css("z-index",d.ui.dialog.overlay.maxZ=d.ui.dialog.maxZ)
}g={scrollTop:f.element.attr("scrollTop"),scrollLeft:f.element.attr("scrollLeft")};
d.ui.dialog.maxZ+=1;
f.uiDialog.css("z-index",d.ui.dialog.maxZ);
f.element.attr(g);
f._trigger("focus",i);
return f
},open:function(){if(this._isOpen){return
}var g=this,h=g.options,f=g.uiDialog;
g.overlay=h.modal?new d.ui.dialog.overlay(g):null;
g._size();
g._position(h.position);
f.show(h.show);
g.moveToTop(true);
if(h.modal){f.bind("keypress.ui-dialog",function(k){if(k.keyCode!==d.ui.keyCode.TAB){return
}var j=d(":tabbable",this),l=j.filter(":first"),i=j.filter(":last");
if(k.target===i[0]&&!k.shiftKey){l.focus(1);
return false
}else{if(k.target===l[0]&&k.shiftKey){i.focus(1);
return false
}}})
}d(g.element.find(":tabbable").get().concat(f.find(".ui-dialog-buttonpane :tabbable").get().concat(f.get()))).eq(0).focus();
g._isOpen=true;
g._trigger("open");
return g
},_createButtons:function(i){var h=this,f=false,g=d("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),j=d("<div></div>").addClass("ui-dialog-buttonset").appendTo(g);
h.uiDialog.find(".ui-dialog-buttonpane").remove();
if(typeof i==="object"&&i!==null){d.each(i,function(){return !(f=true)
})
}if(f){d.each(i,function(k,m){m=d.isFunction(m)?{click:m,text:k}:m;
var l=d('<button type="button"></button>').attr(m,true).unbind("click").click(function(){m.click.apply(h.element[0],arguments)
}).appendTo(j);
if(d.fn.button){l.button()
}});
g.appendTo(h.uiDialog)
}},_makeDraggable:function(){var f=this,i=f.options,j=d(document),h;
function g(k){return{position:k.position,offset:k.offset}
}f.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(k,l){h=i.height==="auto"?"auto":d(this).height();
d(this).height(d(this).height()).addClass("ui-dialog-dragging");
f._trigger("dragStart",k,g(l))
},drag:function(k,l){f._trigger("drag",k,g(l))
},stop:function(k,l){i.position=[l.position.left-j.scrollLeft(),l.position.top-j.scrollTop()];
d(this).removeClass("ui-dialog-dragging").height(h);
f._trigger("dragStop",k,g(l));
d.ui.dialog.overlay.resize()
}})
},_makeResizable:function(k){k=(k===e?this.options.resizable:k);
var g=this,j=g.options,f=g.uiDialog.css("position"),i=(typeof k==="string"?k:"n,e,s,w,se,sw,ne,nw");
function h(l){return{originalPosition:l.originalPosition,originalSize:l.originalSize,position:l.position,size:l.size}
}g.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:g.element,maxWidth:j.maxWidth,maxHeight:j.maxHeight,minWidth:j.minWidth,minHeight:g._minHeight(),handles:i,start:function(l,m){d(this).addClass("ui-dialog-resizing");
g._trigger("resizeStart",l,h(m))
},resize:function(l,m){g._trigger("resize",l,h(m))
},stop:function(l,m){d(this).removeClass("ui-dialog-resizing");
j.height=d(this).height();
j.width=d(this).width();
g._trigger("resizeStop",l,h(m));
d.ui.dialog.overlay.resize()
}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var f=this.options;
if(f.height==="auto"){return f.minHeight
}else{return Math.min(f.minHeight,f.height)
}},_position:function(g){var h=[],i=[0,0],f;
if(g){if(typeof g==="string"||(typeof g==="object"&&"0" in g)){h=g.split?g.split(" "):[g[0],g[1]];
if(h.length===1){h[1]=h[0]
}d.each(["left","top"],function(k,j){if(+h[k]===h[k]){i[k]=h[k];
h[k]=j
}});
g={my:h.join(" "),at:h.join(" "),offset:i.join(" ")}
}g=d.extend({},d.ui.dialog.prototype.options.position,g)
}else{g=d.ui.dialog.prototype.options.position
}f=this.uiDialog.is(":visible");
if(!f){this.uiDialog.show()
}this.uiDialog.css({top:0,left:0}).position(d.extend({of:window},g));
if(!f){this.uiDialog.hide()
}},_setOptions:function(i){var g=this,f={},h=false;
d.each(i,function(j,k){g._setOption(j,k);
if(j in a){h=true
}if(j in c){f[j]=k
}});
if(h){this._size()
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option",f)
}},_setOption:function(i,j){var g=this,f=g.uiDialog;
switch(i){case"beforeclose":i="beforeClose";
break;
case"buttons":g._createButtons(j);
break;
case"closeText":g.uiDialogTitlebarCloseText.text(""+j);
break;
case"dialogClass":f.removeClass(g.options.dialogClass).addClass(b+j);
break;
case"disabled":if(j){f.addClass("ui-dialog-disabled")
}else{f.removeClass("ui-dialog-disabled")
}break;
case"draggable":var h=f.is(":data(draggable)");
if(h&&!j){f.draggable("destroy")
}if(!h&&j){g._makeDraggable()
}break;
case"position":g._position(j);
break;
case"resizable":var k=f.is(":data(resizable)");
if(k&&!j){f.resizable("destroy")
}if(k&&typeof j==="string"){f.resizable("option","handles",j)
}if(!k&&j!==false){g._makeResizable(j)
}break;
case"title":d(".ui-dialog-title",g.uiDialogTitlebar).html(""+(j||"&#160;"));
break
}d.Widget.prototype._setOption.apply(g,arguments)
},_size:function(){var j=this.options,g,i,f=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0});
if(j.minWidth>j.width){j.width=j.minWidth
}g=this.uiDialog.css({height:"auto",width:j.width}).height();
i=Math.max(0,j.minHeight-g);
if(j.height==="auto"){if(d.support.minHeight){this.element.css({minHeight:i,height:"auto"})
}else{this.uiDialog.show();
var h=this.element.css("height","auto").height();
if(!f){this.uiDialog.hide()
}this.element.height(Math.max(h,i))
}}else{this.element.height(Math.max(j.height-g,0))
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())
}}});
d.extend(d.ui.dialog,{version:"1.8.7",uuid:0,maxZ:0,getTitleId:function(f){var g=f.attr("id");
if(!g){this.uuid+=1;
g=this.uuid
}return"ui-dialog-title-"+g
},overlay:function(f){this.$el=d.ui.dialog.overlay.create(f)
}});
d.extend(d.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:d.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(f){return f+".dialog-overlay"
}).join(" "),create:function(g){if(this.instances.length===0){setTimeout(function(){if(d.ui.dialog.overlay.instances.length){d(document).bind(d.ui.dialog.overlay.events,function(h){if(d(h.target).zIndex()<d.ui.dialog.overlay.maxZ){return false
}})
}},1);
d(document).bind("keydown.dialog-overlay",function(h){if(g.options.closeOnEscape&&h.keyCode&&h.keyCode===d.ui.keyCode.ESCAPE){g.close(h);
h.preventDefault()
}});
d(window).bind("resize.dialog-overlay",d.ui.dialog.overlay.resize)
}var f=(this.oldInstances.pop()||d("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
if(d.fn.bgiframe){f.bgiframe()
}this.instances.push(f);
return f
},destroy:function(f){var g=d.inArray(f,this.instances);
if(g!=-1){this.oldInstances.push(this.instances.splice(g,1)[0])
}if(this.instances.length===0){d([document,window]).unbind(".dialog-overlay")
}f.remove();
var h=0;
d.each(this.instances,function(){h=Math.max(h,this.css("z-index"))
});
this.maxZ=h
},height:function(){var g,f;
if(d.browser.msie&&d.browser.version<7){g=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
f=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(g<f){return d(window).height()+"px"
}else{return g+"px"
}}else{return d(document).height()+"px"
}},width:function(){var f,g;
if(d.browser.msie&&d.browser.version<7){f=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
g=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(f<g){return d(window).width()+"px"
}else{return f+"px"
}}else{return d(document).width()+"px"
}},resize:function(){var f=d([]);
d.each(d.ui.dialog.overlay.instances,function(){f=f.add(this)
});
f.css({width:0,height:0}).css({width:d.ui.dialog.overlay.width(),height:d.ui.dialog.overlay.height()})
}});
d.extend(d.ui.dialog.overlay.prototype,{destroy:function(){d.ui.dialog.overlay.destroy(this.$el)
}})
}(jQuery));