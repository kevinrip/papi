var searchWidget=function(b,a){this.BUTTON_DISABLE_TEXT="disabled";
this.BUTTON_ENABLE_TEXT="enable";
this.BUTTON_STATE_TEXT="Search button is ";
this.REQUIREMENTS_TEXT="At least one character needs to be entered to perform the search. ";
this.searchButton=$(a);
this.searchInput=$(b);
this._setInitialState();
this._listenInputKeyUp()
};
searchWidget.prototype._setInitialState=function(){this._verifyEmptyField()
};
searchWidget.prototype._listenInputKeyUp=function(){this.searchInput.bind("input change",$.proxy(function(){this._verifyEmptyField()
},this))
};
searchWidget.prototype._verifyEmptyField=function(){var a=this.searchInput.val().trim().length;
if(this._getButtonState()===this.BUTTON_DISABLE_TEXT){if(a>0){this._enableSearchButton()
}else{this._announceRequirements()
}this._announceState()
}else{if(a===0){this._disableSearchButton();
this._announceRequirements();
this._announceState()
}}};
searchWidget.prototype._disableSearchButton=function(){this.searchButton.attr("disabled","disabled").addClass("swa-g-disabled")
};
searchWidget.prototype._enableSearchButton=function(){this.searchButton.removeAttr("disabled").removeClass("swa-g-disabled")
};
searchWidget.prototype._getButtonState=function(){if(this.searchButton.hasClass("swa-g-disabled")){return this.BUTTON_DISABLE_TEXT
}else{return this.BUTTON_ENABLE_TEXT
}};
searchWidget.prototype._announceRequirements=function(){setTimeout($.proxy(function(){$.arialive(this.REQUIREMENTS_TEXT,"polite")
},this),500)
};
searchWidget.prototype._announceState=function(){setTimeout($.proxy(function(){$.arialive(this.BUTTON_STATE_TEXT+this._getButtonState(),"polite")
},this),700)
};
$(document).ready(function(){var a=$("#searchCustomerServiceKeywordsFAQ");
$(".gsa-search-header").click(function(){setTimeout(function(){$("#swa-header--searchInput").focus();
new searchWidget("#swa-header--searchInput",".swa-header--search-button")
},500)
});
if(a.length>0){a.focus(function(){$(this).removeAttr("placeholder");
new searchWidget("#searchCustomerServiceKeywordsFAQ",".search-button")
}).blur(function(){$(this).attr("placeholder","Enter Keyword(s)")
});
$(".search-button").attr("disabled","disabled").addClass("swa-g-disabled")
}});