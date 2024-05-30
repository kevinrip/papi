$(document).ready(function(){var a={LINK_FOCUSED_CLASS:"current-rapid-rewards-item",MENU_EXTENDED_CLASS:"rr_menu_extended",$elementToToggle:$("#rr_subnav_dropDown"),$rapidRewardsMenu:$("#rapidrewardsmenu"),keys:{down:40,enter:13,esc:27,left:37,right:39,space:32,tab:9,up:38},visible:false,initialize:function(){this.$elementToToggle.hide();
this.markCurrentPage();
this.bindUIActions()
},bindUIActions:function(){var b=this;
$(document).keydown(function(c){if(b.$rapidRewardsMenu.attr("id")===$(document.activeElement).attr("id")){return c.keyCode!=38&&c.keyCode!=40
}});
this.$rapidRewardsMenu.keydown(function(e){var d=b.$rapidRewardsMenu.attr("aria-activedescendant");
var c=b.$elementToToggle.find("li");
var f;
if(e.keyCode===b.keys.enter){if(!b.visible){$(this).trigger("click")
}else{if(d){$("#"+d).find("a")[0].click()
}}}if(e.keyCode===b.keys.esc||e.keyCode===b.keys.tab){if(b.visible===true){b.closeMenu()
}}if(e.keyCode===b.keys.down||e.keyCode===b.keys.up){f=(e.keyCode===b.keys.down)?"down":"up";
if(d){b.cycleTroughOptions(f)
}else{b.$rapidRewardsMenu.attr("aria-activedescendant",(f==="down")?c.first().addClass(b.LINK_FOCUSED_CLASS).attr("id"):c.last().addClass(b.LINK_FOCUSED_CLASS).attr("id"))
}e.preventDefault()
}});
this.$rapidRewardsMenu.click(function(){b.toggleMenu()
});
this.$rapidRewardsMenu.find(".js-rapid-rewards-dropdown").click(function(c){c.preventDefault()
});
$("body").mouseup(function(c){if(c.button===0){b.closeMenu()
}})
},cycleTroughOptions:function(e){var g=this.$elementToToggle.find("li");
var f=$("#"+this.$rapidRewardsMenu.attr("aria-activedescendant"));
var d=(e==="down")?g.first().attr("id"):g.last().attr("id");
var b=(e==="down")?f.next().attr("id"):f.prev().attr("id");
var c=(e==="down")?f.next().length:f.prev().length;
$("."+this.LINK_FOCUSED_CLASS).removeClass(this.LINK_FOCUSED_CLASS);
if(c>0){$("#"+b).addClass(this.LINK_FOCUSED_CLASS);
this.$rapidRewardsMenu.attr("aria-activedescendant",b)
}else{$("#"+d).addClass(this.LINK_FOCUSED_CLASS);
this.$rapidRewardsMenu.attr("aria-activedescendant",d)
}},toggleMenu:function(){if(!this.visible){this.openMenu()
}else{this.closeMenu()
}},openMenu:function(){this.$elementToToggle.attr("aria-hidden",false).show();
this.$rapidRewardsMenu.addClass(this.MENU_EXTENDED_CLASS).find("a").addClass("rapid-rewards-link-dropdown_active");
this.visible=true
},closeMenu:function(){$("."+this.LINK_FOCUSED_CLASS).removeClass(this.LINK_FOCUSED_CLASS);
this.$elementToToggle.attr("aria-hidden",true).hide();
this.$rapidRewardsMenu.removeClass(this.MENU_EXTENDED_CLASS).removeAttr("aria-activedescendant").find("a").removeClass("rapid-rewards-link-dropdown_active");
this.visible=false;
return false
},markCurrentPage:function(){var b=$("#nolink").html();
var c;
$("#dropdown_menu").children().each(function(){var d=$(this);
if(d.children().length>0){c=d.children()[0].innerHTML;
if((c+":").indexOf(b)===0){d.removeClass("globalnav_header_subnav_link").addClass("secondaryNavProduct").attr("aria-checked",true).html(c)
}}})
}};
a.initialize()
});