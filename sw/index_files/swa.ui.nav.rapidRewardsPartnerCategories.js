$.widget("swa.rapidRewardsPartnerCategoriesNav",{_create:function(){var a=this;
this.ul=this.element;
this.lis=this.ul.children("li");
SWA.sitemap.model.get("ChildrenForURL",function(b){a._setModel(b);
a._setActiveLi()
},"/html/rapidrewards/partners/index.html")
},_setModel:function(a){this.model=a
},_setActiveLi:function(){var a=this.lis.eq(this._getActivePageIndex()).find(".js-selected-partner");
this.lis.eq(this._getActivePageIndex()).addClass("swa_feature_rapidRewards_partners_categories_item_active");
a.addClass("selected-partner");
a.toggleClass("active-partner");
this.lis.eq(this._getActivePageIndex()).find(".js-inactive-partner").toggle()
},_getActivePageIndex:function(){var a;
$.each(this.model,function(b,c){if(c.active){a=b;
return true
}});
return a
}});
$(function(){$(".swa_feature_rapidRewards_partners_categories").rapidRewardsPartnerCategoriesNav()
});