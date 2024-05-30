$.widget("swa.rapidRewardsPartnerSubCategoriesNav",{_create:function(){var a=this;
this.ul=this.element;
SWA.sitemap.model.get("ChildrenForURL",function(b){SWA.sitemap.model.get("ChildrenForURL",function(c){a._setModel(c);
a._createDOM()
},a._getActivePageCategoryURL(b))
},"/html/rapidrewards/partners/index.html")
},_setModel:function(a){this.model=a
},_createDOM:function(){var a=this;
if(this.model.length){$.each(this.model,function(b,c){a._createChild(c,b)
});
this.ul.show()
}else{this.ul.hide()
}},_createChild:function(f,b){var g,a,e,d,c;
d=$("<li/>").addClass("swa_feature_rapidRewards_partners_subcategories_item");
a=$("<h3/>").addClass("item-heading").appendTo(d);
e=$("<a/>").attr("href",f.url).attr("data-link-name",f.text).addClass("item-link").appendTo(a);
c=this._createSpan(f,e);
if(f.active){d.addClass("swa_feature_rapidRewards_partners_subcategories_item_active")
}if(b===0){d.addClass("swa_feature_rapidRewards_partners_subcategories_item_first")
}if(f.active&&b===0){d.addClass("swa_feature_rapidRewards_partners_subcategories_item_first_active")
}d.appendTo(this.ul)
},_createSpan:function(c,b){var a=$("<span/>").text(c.text+" ").addClass("menu-text");
if(c.active){$("<span/>").addClass("screenreader-only").text("Selected").appendTo(a)
}return a.appendTo(b)
},_getActivePageCategoryURL:function(a){var b;
$.each(a,function(c,d){if(d.active){b=d.url;
return true
}});
return b
}});
$(function(){$(".swa_feature_rapidRewards_partners_subcategories").rapidRewardsPartnerSubCategoriesNav()
});