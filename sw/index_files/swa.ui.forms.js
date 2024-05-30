$.Widget.prototype.initAs=function(a){$.extend(this,a.prototype);
a.prototype._create.apply(this,arguments)
};
$.widget("swa.form",{options:{fieldContainer:".swa_forms_fieldContainer"},_getFields:function(){return this.element.find(this.options.fieldContainer).field()
},_getForm:function(){return this.element.find("form")
},_getActionURL:function(){return this._getForm().attr("action")
},getSubmits:function(){return this.element.find("input[type=submit],input[type=image],button[type=submit]")
}});
$.widget("swa.searchForm",$.swa.form,{options:{departureDateFieldContainer:".wcm_booking_widget_field_container_date_start",returnDateFieldContainer:".wcm_booking_widget_field_container_date_end",promoCodeFieldContainer:".wcm_booking_widget_field_container_promo_code, input[name=promoCode]",additionalFieldContainer:".wcm_booking_widget_field_container_text_field",fieldContainer:".wcm_booking_widget_field_container"},_create:function(){var a=this;
if(this._checkForm()){return
}this.element.data("form",this);
this.promoCodeField=this.element.find(this.options.promoCodeFieldContainer).promoCodeField().data("promoCodeField");
var b=$(this.options.additionalFieldContainer);
if(b.size()){this.additionalFields=[];
b.each(function(){a.additionalFields.push($(this).textField().data("textField"))
})
}},_checkForm:function(){if(this.element.find("form").size()===0){return true
}return false
},_syncDepartureDateFields:function(f,d){var e=this.departureDateField,c=this.returnDateField,b,a;
if(!e._isEmptyOrEqualToPlaceHolderText()){b=e.datepicker.input.datepicker("getDate").getTime()
}if(!c._isEmptyOrEqualToPlaceHolderText()){a=c.datepicker.input.datepicker("getDate").getTime()
}if(b&&(c._isEmptyOrEqualToPlaceHolderText()||(!c._isEmptyOrEqualToPlaceHolderText()&&a<b))){c.datepicker.input.datepicker("setDate",new Date(b+this._getDelta()));
c.removePlaceholderClass()
}},_syncReturnDateFields:function(f,d){var e=this.departureDateField,c=this.returnDateField,b,a;
if(!e._isEmptyOrEqualToPlaceHolderText()){b=e.datepicker.input.datepicker("getDate").getTime()
}if(!c._isEmptyOrEqualToPlaceHolderText()){a=c.datepicker.input.datepicker("getDate").getTime()
}if(a&&(e._isEmptyOrEqualToPlaceHolderText()||(!e._isEmptyOrEqualToPlaceHolderText()&&a<b))){e.datepicker.input.datepicker("setDate",new Date(a-this._getDelta()));
e.removePlaceholderClass()
}},_getDelta:function(){return this.options.dateSync*1000*60*60*24
},getFirstbookableDate:function(){return"today"
},getLastBookableDate:function(){var a="330";
if(isNaN(a)||!a){return"+330d"
}return'+330d'
}});
$.widget("swa.airSearchForm",$.swa.searchForm,{options:{seniorsFieldContainer:".wcm_booking_widget_field_container_seniors",tripTypeFieldContainer:".wcm_booking_widget_field_container_air_trip_type",originAirportsFieldContainer:".wcm_booking_widget_field_container_station_air_origin",destinationAirportsFieldContainer:".wcm_booking_widget_field_container_air_station_destination",dateSync:"1"},_create:function(){$.swa.searchForm.prototype._create.apply(this,arguments);
var a=this;
if(this._checkForm()){return
}a.tripTypeField=a.element.find(this.options.tripTypeFieldContainer).tripTypeField().data("tripTypeField");
a.departureDateField=a.element.find(this.options.departureDateFieldContainer).airDepartureDateField().data("airDepartureDateField");
a.returnDateField=a.element.find(this.options.returnDateFieldContainer).airReturnDateField().data("airReturnDateField");
a.departureDateField.datepicker.settings.onClose=function(c,b){a._syncDepartureDateFields(c,b)
};
a.returnDateField.datepicker.settings.onClose=function(c,b){a._syncReturnDateFields(c,b)
};
a.originAirportsField=a.element.find(this.options.originAirportsFieldContainer).airOriginAirportsField().data("airOriginAirportsField");
a.destinationAirportsField=a.element.find(this.options.destinationAirportsFieldContainer).airDestinationAirportsField().data("airDestinationAirportsField");
a.seniorsField=a.element.find(this.options.seniorsFieldContainer).selectField().data("selectField");
a.returnFields=[a.returnDateField];
a._toggleReturnFields();
a.tripTypeField._getField().click(function(){a._toggleReturnFields()
});
this._populateFieldsFromURL()
},_populateFieldsFromURL:function(){var f,d=$.url.param("originAirport"),e,a=$.url.param("destinationAirport"),c=$.url.param("promoCode");
if(SWA.autocomplete){var b=SWA.autocomplete
}if(SWA.autocompleteCommon){var b=SWA.autocompleteCommon
}if(d){f=b.air.model.stationsRepository.getStation(d);
if(f){f.isValid=this.originAirportsField.isValidStation(d)
}}if(a){e=b.air.model.stationsRepository.getStation(a);
if(e){e.isValid=this.destinationAirportsField.isValidStation(a)
}}if(f&&!e){if(f.isValid){this.originAirportsField.setValue(d)
}}else{if(!f&&e){if(e.isValid){this.destinationAirportsField.setValue(a)
}}else{if(f&&e){if(f.isValid&&e.isValid){if(f.hasRouteTo(a)){this.originAirportsField.setValue(d);
this.destinationAirportsField.setValue(a)
}else{this.originAirportsField.setValue(d)
}}if(f.isValid&&!e.isValid){this.originAirportsField.setValue(d)
}if(!f.isValid&&e.isValid){this.destinationAirportsField.setValue(a)
}}}}if(c){this.promoCodeField.setValue(c.substring(0,10))
}},_syncAirportsFields:function(){},_toggleReturnFields:function(){if(this.tripTypeField.isRoundTrip()){$(this.returnFields).each(function(){this.enable()
})
}else{$(this.returnFields).each(function(){this.disable()
})
}},getLastBookableDate:function(){return this.element.find('input[name="lastBookableDate"]').val()
}});
$.widget("swa.carSearchForm",$.swa.searchForm,{options:{carVendorsFieldContainer:".wcm_booking_widget_field_container_car_vendors",carStationOriginContainer:".wcm_booking_widget_field_container_station_car_origin",carStationDestinationContainer:".wcm_booking_widget_field_container_car_station_destination",departureDateFieldContainer:".wcm_booking_widget_field_container_car_date_start",returnDateFieldContainer:".wcm_booking_widget_field_container_car_date_end",dateSync:"3"},_create:function(){$.swa.searchForm.prototype._create.apply(this,arguments);
var a=this;
if(this._checkForm()){return
}a.carVendorsField=a.element.find(this.options.carVendorsFieldContainer).carVendorsField().data("carVendorsField");
a.originAirportsField=a.element.find(this.options.carStationOriginContainer).carOriginAirportsField().data("carOriginAirportsField");
a.destinationAirportsField=a.element.find(this.options.carStationDestinationContainer).carDestinationAirportsField().data("carDestinationAirportsField");
a.departureDateField=a.element.find(this.options.departureDateFieldContainer).carDepartureDateField().data("carDepartureDateField");
a.returnDateField=a.element.find(this.options.returnDateFieldContainer).carReturnDateField().data("carReturnDateField");
a.departureDateField.datepicker.settings.onClose=function(c,b){a._syncDepartureDateFields(c,b)
};
a.returnDateField.datepicker.settings.onClose=function(c,b){a._syncReturnDateFields(c,b)
};
this.getSubmits().click(function(){a._checkPromoCodes()
})
},_checkPromoCodes:function(){var a=this;
var d=a.element.find('input[name$="].rate"]').size();
var b=0;
for(var c=0;
c<d;
c++){var e=a.element.find('input[name="promoCodes['+c+'].rate"]');
if(e.attr("placeholder")==e.val()){a.element.find('input[name="promoCodes['+c+'].rate"]').attr("name","");
a.element.find('input[name="promoCodes['+c+'].vendor"]').attr("name","");
a.element.find('input[name="promoCodes['+c+'].type"]').attr("name","")
}else{if(navigator.appName=="Microsoft Internet Explorer"&&e.val().length==0){a.element.find('input[name="promoCodes['+c+'].rate"]').attr("name","");
a.element.find('input[name="promoCodes['+c+'].vendor"]').attr("name","");
a.element.find('input[name="promoCodes['+c+'].type"]').attr("name","")
}else{a.element.find('input[name="promoCodes['+c+'].rate"]').attr("name","promoCodes["+b+"].rate");
a.element.find('input[name="promoCodes['+c+'].vendor"]').attr("name","promoCodes["+b+"].vendor");
a.element.find('input[name="promoCodes['+c+'].type"]').attr("name","promoCodes["+b+"].type");
b++
}}}}});
$.widget("swa.hotelSearchForm",$.swa.searchForm,{options:{hotelChainsFieldContainer:".wcm_booking_widget_field_container_hotelChains_hotel",hotelPropertyFieldContainer:".wcm_booking_widget_field_container_hotelProperty_hotel",hotelDestinationFieldContainer:".wcm_booking_widget_field_container_destination_hotel",dateSync:"2"},_create:function(){$.swa.searchForm.prototype._create.apply(this,arguments);
var a=this;
if(this._checkForm()){return
}a.departureDateField=a.element.find(this.options.departureDateFieldContainer).hotelDepartureDateField().data("hotelDepartureDateField");
a.returnDateField=a.element.find(this.options.returnDateFieldContainer).hotelReturnDateField().data("hotelReturnDateField");
a.hotelChainsField=a.element.find(this.options.hotelChainsFieldContainer).hotelChainsField().data("hotelChainsField");
a.hotelPropertyField=a.element.find(this.options.hotelPropertyFieldContainer).hotelPropertyField().data("hotelPropertyField");
a.hotelDestinationField=a.element.find(this.options.hotelDestinationFieldContainer).hotelDestinationAirportsField().data("hotelDestinationAirportsField");
a.destinationAirportsField=null;
a.departureDateField.datepicker.settings.onClose=function(c,b){a._syncDepartureDateFields(c,b)
};
a.returnDateField.datepicker.settings.onClose=function(c,b){a._syncReturnDateFields(c,b)
}
}});
$.widget("swa.field",{_getName:function(){return this._getField().attr("name")
},_getValue:function(){return this._getField().attr("value")
},setValue:function(a){this._getField().val(a)
},_getField:function(){return this.element.find("input")
},getForm:function(){return this.element.parents(".wcm_booking_widget").data("form")
},_getDefaultValue:function(){var a="default_"+this._getField().attr("name");
defaultValueInput=this.element.find('input[name="'+a+'"]');
if(defaultValueInput.size()){return defaultValueInput.val()
}else{return false
}}});
$.widget("swa.visibleField",$.swa.field,{_create:function(){var a=this.options.placeholder,b=this._getField().attr("placeholder");
this._getField().removeAttr("placeholder");
this._placeholderText="";
if(a){this._placeholderText=a;
this.element.find(".swa_forms_wrappingLabel_text").hide()
}else{if(b){this._placeholderText=b
}}if(this._placeholderText){SWA.DefaultText.handle(this._getField(),this._placeholderText,this.getForm().getSubmits())
}if(this.element.find(".wcm_booking_widget_field_help_container").size()){this.element.helpFlyout()
}this.name=this._getField().attr("name")
},_isEmptyOrEqualToPlaceHolderText:function(){var a=this._getValue();
if(a===""||a===this._placeholderText){return true
}return false
},disable:function(){this._getField().attr("disabled","disabled")
},enable:function(){this._getField().removeAttr("disabled")
},removePlaceholderClass:function(){this._getField().removeClass(SWA.DefaultText.class_name)
},_getHiddenField:function(){return this.element.find("input[type=hidden][name="+this.name+"]")
},setValue:function(a){$.swa.field.prototype.setValue.apply(this,arguments);
this._getHiddenField().val(a);
this._getField().removeClass("watermark")
}});
$.widget("swa.hiddenField",$.swa.field,{_getField:function(){return this.element
}});
$.widget("swa.selectField",$.swa.visibleField,{options:{multiple:false,placeholder:null},_create:function(){$.swa.visibleField.prototype._create.apply(this,arguments);
this.selectFieldOptions=this._getSelectFieldOptions();
this._setDefaultValue();
if(this._getField().attr("multiple")){this.options.multiple=true
}},_getSelectFieldOptions:function(){var a=this.element.find("option");
return $.map(a,function(b){return $(b).selectFieldOption().data("selectFieldOption")
})
},_setDefaultValue:function(){var a=this._getDefaultValue();
if(a){this.setValue(a)
}},_getField:function(){return this.element.find("select")
}});
$.widget("swa.selectFlyoutField",$.swa.selectField,{options:{triggerTitle:"Show All Items"},_create:function(){if(this.options.multiple){$.swa.selectField.prototype._create.apply(this,arguments);
this._createMultiple()
}else{$.swa.selectField.prototype._create.apply(this,arguments);
this._hideSelect();
this.inputPlaceholder=this.options.placeholder;
this.options.placeholder=null;
this._createInput();
this._createAutocomplete();
this._selectDefaultValue()
}},_createMultiple:function(){this.element.inputMultiSelectField()
},destroy:function(){this.input.remove();
this.select.show();
$.Widget.prototype.destroy.call(this)
},_hideSelect:function(){this.select=this._getField().hide();
this.element.find("label").hide()
},_getDefaultOption:function(){var a=this._getDefaultValue();
if(a){var b=this._getOptionsByValue(a)
}else{var b=this._getSelectedOptions()
}return b[0]
},_getOptionsByValue:function(b){var a=$.grep(this.selectFieldOptions,function(d,c){return(d.value==b)
});
return a
},_getSelectedOptions:function(){var a=$.grep(this.selectFieldOptions,function(c,b){return(c.selected==true)
});
return a
},_selectDefaultValue:function(){var a=this.defaultOption=this._getDefaultOption();
if(a){this.autocomplete._selectOption(a)
}},_createInput:function(){var a=this;
this.input=$("<input>").attr("name",this.select.attr("name")+"_displayed").attr("type","text").appendTo(this.element);
this.input.watermark(this.inputPlaceholder,{className:SWA.DefaultText.class_name});
this.input.bind("keydown",function(c){var b=[$.ui.keyCode.TAB,$.ui.keyCode.ENTER];
if($.inArray(c.keyCode,b)!=-1&&a.autocomplete.flyout.dialog.isOpen()){c.preventDefault();
a._selectFirstItem();
a._goToNextInput()
}});
this.input.bind("blur",function(b){if($(this).val()==""){a.autocomplete.selectedOption=null
}})
},_goToNextInput:function(){var b=$(":input:visible:not(button)"),a=b.index(this.input),c=a+1,d=b.eq(c);
d.focus()
},_selectFirstItem:function(){this.autocomplete._selectItem($(this.autocomplete._getFirstItem()))
},_createAutocomplete:function(){this.autocomplete=this.input.selectFlyoutFieldAutocomplete({parentSelectFlyoutField:this}).data("selectFlyoutFieldAutocomplete")
},setValue:function(a){this.autocomplete._selectOption(this._getOptionsByValue(a)[0])
}});
$.widget("swa.selectFlyoutFieldAutocomplete",$.ui.autocomplete,{options:{triggerTitle:"Select All",delay:0,minLength:0},_create:function(){$.ui.autocomplete.prototype._create.apply(this,arguments);
var a=this;
this.flyout=this._getFlyout();
this.flyoutSelectField=this.options.parentSelectFlyoutField;
this.useTabs=true;
this.selectedOption=null;
this.source=this._autoCompleteSource;
this._createTrigger()
},_suggest:function(b){var a=this;
this._showFlyout(b);
var c=$(this.flyout.getItems()).first();
if(this.showAll&&this.selectedOption){this._highlightItemByOption(this.selectedOption)
}else{this._highlightItem(this._getFirstItem())
}$(this.flyout.items).hover(function(){a._highlightItem(this)
});
$(this.flyout.getItems()).click(function(){a._selectItem(this)
});
$(document).one("click",function(d){if(!a.useTabs){a._selectFirstItem()
}else{a._hideFlyout()
}});
this.flyout.dialog.widget().click(function(d){d.stopPropagation()
});
this._positionFlyout()
},_selectFirstItem:function(){this._selectItem(this._getFirstItem())
},_highlightItemByOption:function(c){var b=this.flyout.getItems(),d=c.value,a=$.map(b,function(f,e){if($(f).data("originalOption").value==d){return f
}});
this._highlightItem(a[0])
},_highlightItem:function(a){$(this.flyout.items).removeClass("highlighted");
$(a).addClass("highlighted")
},_getFirstItem:function(){return this.flyout.items[0]
},_autoCompleteSource:function(d,c){this.noMatch=false;
if(d.term==""){this.showAll=true;
this.useTabs=true
}else{this.showAll=false;
this.useTabs=false
}var b=this;
var a=[];
a=$.map(this.flyoutSelectField.selectFieldOptions,function(e){if(b._matches(d,e)){return e
}});
if(!a.length){this.useTabs=false;
this.noMatch=true;
d.term="";
a=$.map(this.flyoutSelectField.selectFieldOptions,function(e){if(b._matches(d,e)){return e
}})
}c(a)
},_matches:function(b,a){var d=a.getLabel();
var c=new RegExp($.ui.autocomplete.escapeRegex(b.term),"i");
if(c.test(d)){return true
}else{return false
}},_selectItem:function(b){var a=$(b).data("originalOption");
this._selectOption(a);
this.element.trigger("selectedItem");
this._hideFlyout()
},_selectOption:function(a){if(!a){return
}this.selectedOption=a;
this._setValue(a.label);
this.flyoutSelectField.select.val(a.value);
this.element.removeClass("form_optional")
},_cleanSelection:function(){this.selectedOption=null;
this._setValue("");
this.flyoutSelectField.select.val("")
},_positionFlyout:function(){this.flyout.dialog.widget().position({of:this.element,my:"left top",at:"left bottom",collision:"none"})
},_hideFlyout:function(){this.flyout.dialog.close();
$(document).unbind("click")
},_showFlyout:function(a){this.flyout.show(a,this.useTabs,this.flyoutSelectField.options.multiple,this.noMatch)
},_setValue:function(a){this.element.val(a)
},_getFocus:function(){this.element.focus()
},_getFlyout:function(){if(!SWA.SelectFlyoutFieldFlyout){return SWA.SelectFlyoutFieldFlyout=$('<div class="swa_forms_selectFlyoutFieldFlyout"/>').appendTo("body").selectFlyoutFieldFlyout().data("selectFlyoutFieldFlyout")
}else{return SWA.SelectFlyoutFieldFlyout
}},_createTrigger:function(){var a=this;
this.trigger=$("<button>",{tabIndex:-1,title:this.options.triggerTitle}).insertAfter(this.element).button({text:false,parent:this}).click(function(b){a._handleTriggerClick(b)
}).data("button")
},_handleTriggerClick:function(a){a.preventDefault();
a.stopPropagation();
if(this.flyout.dialog.isOpen()){this.flyout.dialog.close();
return
}this.search("")
},_highlightFirstItem:function(a){a.addClass("highlighted")
}});
$.widget("swa.airportFieldAutocomplete",$.swa.selectFlyoutFieldAutocomplete,{_matches:function(e,d){var c=this,f=$.trim(d.getLabel()).toUpperCase(),b=d.getAirportCode(),a=e.term.toUpperCase();
if(b.indexOf(a)==0){d.isAirportCodeMatch=true;
return true
}else{if(f.indexOf(a)==0){d.isAirportCodeMatch=false;
return true
}else{return false
}}},_getFlyout:function(){if(!SWA.AirportFieldFlyout){return SWA.AirportFieldFlyout=$("<div/>").appendTo("body").airportFieldFlyout().data("airportFieldFlyout")
}else{return SWA.AirportFieldFlyout
}},_isValidRoute:function(a,b){if(typeof routes=="undefined"||$.isEmptyObject(routes)||$.inArray(b,routes[a].routesServed)!=-1){return true
}else{return false
}},getSelectedOptionCountryCode:function(){if(this.selectedOption==null){return""
}else{return this.selectedOption.countryCode
}},_highlightItemByOption:function(d){if(d.value){var b=this.flyout.getItems(),f=d.value,a=$.map(b,function(h,g){if($(h).data("originalOption").value==f){return h
}}),e="",c=[],e=$(a[0]).data("originalOption").countryCode,c=$.map(SWA.countries,function(h,g){if(e==h.countryCode){return g
}});
this.flyout.tabs.tabs.select(c[0]);
this._highlightItem(a[0])
}}});
$.widget("swa.originAirportFieldAutocomplete",$.swa.airportFieldAutocomplete,{_selectItem:function(a){$.swa.airportFieldAutocomplete.prototype._selectItem.apply(this,arguments);
var b=this._getDestinationAirportCode();
if(b){if(!this._isValidRoute(this.selectedOption.airportCode,b)){this.flyoutSelectField.getForm().destinationAirportsField.autocomplete._cleanSelection()
}}},_getDestinationAirportCode:function(){var b=this.flyoutSelectField.getForm().destinationAirportsField;
if(b){var a=b.autocomplete.selectedOption;
if(a==null){return false
}else{return a.airportCode
}}}});
$.widget("swa.destinationAirportFieldAutocomplete",$.swa.airportFieldAutocomplete,{_matches:function(g,f){var d=this,h=$.trim(f.getLabel()).toUpperCase(),b=f.getAirportCode(),c=this._getOriginAirportCode(),a=g.term.toUpperCase();
if(h.indexOf(a)==0||b.indexOf(a)==0){if(c){if(f.isCityArea){var e=false;
$(f.childOptions).each(function(){if(d._isValidRoute(c,this.airportCode)){e=true
}});
return e
}return d._isValidRoute(c,b)
}else{return true
}}else{return false
}},_getOriginAirportCode:function(){var a={};
if(this.flyoutSelectField.getForm().originAirportsField.element.is("input")){a.airportCode=this.flyoutSelectField.getForm().originAirportsField.element.val()
}else{a=this.flyoutSelectField.getForm().originAirportsField.autocomplete.selectedOption
}if(a==null){return false
}else{return a.airportCode
}}});
$.widget("swa.carDestinationAirportFieldAutocomplete",$.swa.destinationAirportFieldAutocomplete,{_isValidRoute:function(a,b){return true
}});
$.widget("swa.selectFlyoutFieldFlyout",{_create:function(){var a=this;
this.dialog=this.element.airportsFlyoutDialog({autoOpen:false,resizable:false,draggable:false,closeText:"Close",width:"auto",dialogClass:"swa_forms_airportFieldFlyout"}).data("airportsFlyoutDialog")
},show:function(c,d,a,b){this.element.empty();
this._createPane(a);
this.pane.show(c);
this.items=this.pane.getItems();
this.dialog.open();
if(!$.support.boxModel){this.dialog.uiDialog.css("width",this.pane.getColumnWidth()+20)
}else{this.dialog.uiDialog.css("width",this.pane.getColumnWidth())
}},_createPane:function(a){this.pane=$('<div class="swa_forms_selectFlyoutFieldFlyout_tabs_pane"/>').appendTo(this.element).selectFlyoutFieldFlyoutPane({multiple:a}).data("selectFlyoutFieldFlyoutPane")
},_createFooter:function(){if($(".swa_forms_airportFieldFlyout_footerContent").size()==0){this.footer=$("<div/>").addClass("swa_forms_airportFieldFlyout_footerContent").prependTo(this.element.siblings(".ui-dialog-footerbar")).append("<p>"+SWA.countries[0].footerMessage+"</p>")
}},getDialog:function(){return this.dialog
},getItems:function(){return this.items
},setFooter:function(a){this.footer.find("p").html(a)
}});
$.widget("swa.airportFieldFlyout",$.swa.selectFlyoutFieldFlyout,{show:function(d,e,a,b){this.element.empty();
d=this._sortItems(d);
if(b){this.element.prepend("<div class='swa_forms_airportFieldFlyout_airportNotFound'>Airport not found.</div>")
}var c=this;
if(e){this._createTabs();
this.tabs.show(d);
this.items=this.tabs.getItems()
}else{this._createPane();
this.pane.show(d);
this.items=this.pane.getItems()
}this.dialog.open();
this._createFooter()
},_createTabs:function(){this.tabs=$('<div class="swa_forms_airportFieldFlyoutTabs_tabs"><ul><li></li></ul></div>').appendTo(this.element).airportFieldFlyoutTabs({parentFlyout:this}).data("airportFieldFlyoutTabs");
this.tabs.tabs.element.find(".ui-tabs-nav li:first").remove()
},_sortItems:function(b){var d=[];
var c=[];
var a=[];
$(b).each(function(){if(this.isCityArea){a.push(this)
}else{if(!this.parentOption){if(this.isAirportCodeMatch){d.push(this)
}else{c.push(this)
}}}});
return $.merge($.merge(d,c),a)
}});
$.widget("swa.airportFieldFlyoutTabs",{_create:function(){var a=this;
this.tabs=this.element.tabs({select:function(b,c){a.options.parentFlyout.setFooter($(c.panel).data("countryCode").footerMessage)
}}).data("tabs");
this.panes=[]
},show:function(b){var a=this;
$(SWA.countries).each(function(){var c=this.countryCode;
var d=this;
a._createTab(c,d,$(b).map(function(){if(this.getCountryCode()==c){return this
}}))
})
},_createTab:function(a,d,b){var c="#tabs-"+a;
this.tabs.add(c,d.countryLabel);
var e=$(c).selectFlyoutFieldFlyoutPane().data("selectFlyoutFieldFlyoutPane");
e.element.data("countryCode",d);
this.panes.push(e);
e.show(b,a)
},getPanes:function(){return this.panes
},getItems:function(){var a=[];
$(this.panes).each(function(){$.merge(a,this.getItems())
});
return a
}});
$.widget("swa.selectFlyoutFieldFlyoutPane",{options:{multiple:false},_create:function(){this.footer="";
this.items=[];
this.columnCount=0
},show:function(e,c){var d=this;
var b=e.length;
var h=25;
if(c=="MX"){h=12
}this.columnCount=Math.max(1,Math.ceil(b/h));
for(var g=0;
g<this.columnCount;
g++){var a=$('<div class="column"/>').appendTo(d.element);
var f=e.slice(g*h,g*h+h);
if(g==0){a.addClass("column_first")
}$(f).each(function(){if(d.options.multiple){d.items.push($('<div><input type="checkbox" value="'+this._getValue()+'"/>'+this.getLabel()+"</div>").appendTo(columnElementt).get(0))
}else{if(this.isCityArea){$("<span>"+this.getLabel()+"</span>").appendTo(a);
$(this.childOptions).each(function(){d.items.push($("<a>"+this.getLabel()+"</a>").appendTo(a).data("originalOption",this).get(0))
})
}else{if(this.value!=""){d.items.push($("<a>"+this.getLabel()+"</a>").appendTo(a).data("originalOption",this).get(0))
}}}})
}a.addClass("column_last")
},getItems:function(){return this.items
},getColumnCount:function(){return this.columnCount
},getColumnWidth:function(){var a=0;
$(".column").each(function(){a=a+$(this).outerWidth(true)
});
return a
}});
$.widget("swa.airportsSelectField",$.swa.selectFlyoutField,{options:{placeholder:"Select Airport"},_getSelectFieldOptions:function(){var a=this.element.find("option");
var b=$.map(a,function(c){return selectFieldOption=$(c).airportsFieldOption().data("airportsFieldOption")
});
return b
},_createAutocomplete:function(){this.autocomplete=this.input.airportFieldAutocomplete({parentSelectFlyoutField:this}).data("airportFieldAutocomplete")
},getForm:function(){return this.element.parents(".wcm_booking_widget_air").data("airSearchForm")
}});
$.widget("swa.originAirportsSelectField",$.swa.airportsSelectField,{options:{placeholder:"Select Origin Airport"},_createAutocomplete:function(){this.autocomplete=this.input.originAirportFieldAutocomplete({parentSelectFlyoutField:this}).data("originAirportFieldAutocomplete")
}});
$.widget("swa.destinationAirportsSelectField",$.swa.airportsSelectField,{options:{placeholder:"Select Destination Airport"},_createAutocomplete:function(){this.autocomplete=this.input.destinationAirportFieldAutocomplete({parentSelectFlyoutField:this}).data("destinationAirportFieldAutocomplete")
}});
$.widget("swa.airportsField",{isValidStation:function(a){if(SWA.autocomplete){return typeof SWA.autocomplete.air.model.stationsRepository.getStation(a)!=="undefined"
}if(SWA.autocompleteCommon){return typeof SWA.autocompleteCommon.air.model.stationsRepository.getStation(a)!=="undefined"
}}});
$.widget("swa.airOriginAirportsField",$.swa.airportsField,{_create:function(){if(this.element.find("select").size()){if(this.element.find("#originAirport_displayed").size()){this.initAs($.swa.airOriginAirportsAutocompleteField)
}else{this.initAs($.swa.selectField)
}}else{if(this.element.is("input[type=hidden]")){this.initAs($.swa.airOriginAirportsHiddenField)
}}}});
$.widget("swa.airDestinationAirportsField",$.swa.airportsField,{_create:function(){if(this.element.find("select").size()){if(this.element.find("#destinationAirport_displayed").size()){this.initAs($.swa.airDestinationAirportsAutocompleteField)
}else{this.initAs($.swa.selectField)
}}else{if(this.element.is("input[type=hidden]")){this.initAs($.swa.airDestinationAirportsHiddenField)
}}}});
$.widget("swa.airOriginAirportsSelectField",$.swa.originAirportsSelectField,{options:{placeholder:"From"}});
$.widget("swa.airDestinationAirportsSelectField",$.swa.destinationAirportsSelectField,{options:{placeholder:"To"}});
$.widget("swa.airportsHiddenField",$.swa.hiddenField,{});
$.widget("swa.originAirportsHiddenField",$.swa.airportsHiddenField,{});
$.widget("swa.destinationAirportsHiddenField",$.swa.airportsHiddenField,{});
$.widget("swa.airOriginAirportsHiddenField",$.swa.originAirportsHiddenField,{});
$.widget("swa.airDestinationAirportsHiddenField",$.swa.destinationAirportsHiddenField,{});
$.widget("swa.carOriginAirportsHiddenField",$.swa.originAirportsHiddenField,{});
$.widget("swa.carDestinationAirportsHiddenField",$.swa.destinationAirportsHiddenField,{});
$.widget("swa.selectAutocompleteField",$.swa.field,{options:{origin_id:"#originAirport",origin_displayed_id:"#originAirport_displayed",destination_id:"#destinationAirport",destination_displayed_id:"#destinationAirport_displayed"},_create:function(){var a=this;
this._setDefaultValue();
this.initAutocomplete();
this.autocomplete={getSelectedOptionCountryCode:function(){return a._getSelectField().find("option[selected]").attr("class").split(" ")[0]
},element:a._getTextField()};
this._getTextField().blur(function(){$(this).trigger("selectedItem")
})
},initAutocomplete:function(){if(SWA.autocomplete){var a=SWA.autocomplete.air.createView();
a.departureDateTextField(this.getForm().departureDateField._getField());
SWA.autocomplete.air.createController(a)
}if(SWA.autocompleteCommon){var a=SWA.autocompleteCommon.air.createView();
a.departureDateTextField(this.getForm().departureDateField._getField());
SWA.autocompleteCommon.air.createController(a)
}},_setDefaultValue:function(){this._getSelectField().val(this._getDefaultValue())
},_getField:function(){return this._getSelectField()
},setValue:function(a){if(this._getSelectField().children("option[value="+a+"]").size()){this._getSelectField().val(a);
if(SWA.autocomplete){this._getTextField().val(SWA.autocomplete.air.model.stationsRepository.getStation(a).name)
}if(SWA.autocompleteCommon){this._getTextField().val(SWA.autocompleteCommon.air.model.stationsRepository.getStation(a).value)
}}this._getTextField().removeClass("watermark")
}});
$.widget("swa.airOriginAirportsAutocompleteField",$.swa.selectAutocompleteField,{_getSelectField:function(){return this.element.find(this.options.origin_id)
},_getTextField:function(){return this.element.find(this.options.origin_displayed_id)
},initAutocomplete:function(){}});
$.widget("swa.airDestinationAirportsAutocompleteField",$.swa.selectAutocompleteField,{_getSelectField:function(){return this.element.find(this.options.destination_id)
},_getTextField:function(){return this.element.find(this.options.destination_displayed_id)
}});
$.widget("swa.carOriginAirportsField",{_create:function(){if(this.element.find("#pickUpLocation_displayed").size()){this.initAs($.swa.carOriginSelectAutocompleteField)
}else{if(this.element.find("select").size()){this.initAs($.swa.selectField)
}else{if(this.element.find("input[type=text]").size()){this.initAs($.swa.carOriginAirportsTextField)
}else{if(this.element.is("input[type=hidden]")){this.initAs($.swa.carOriginAirportsHiddenField)
}}}}}});
$.widget("swa.carDestinationAirportsField",{_create:function(){if(this.element.find("#dropOffLocation_displayed").size()){this.initAs($.swa.carDestinationSelectAutocompleteField)
}else{if(this.element.find("select").size()){this.initAs($.swa.selectField)
}else{if(this.element.find("input[type=text]").size()){this.initAs($.swa.carDestinationAirportsTextField)
}else{if(this.element.is("input[type=hidden]")){this.initAs($.swa.carDestinationAirportsHiddenField)
}}}}}});
$.widget("swa.carOriginAirportsSelectField",$.swa.selectFlyoutField,{options:{placeholder:"Pick-Up Location"},getForm:function(){return this.element.parents(".wcm_booking_widget_car").data("carSearchForm")
}});
$.widget("swa.carDestinationAirportsSelectField",$.swa.selectFlyoutField,{options:{placeholder:"Same as Pick-Up location"},getForm:function(){return this.element.parents(".wcm_booking_widget_car").data("carSearchForm")
}});
var utilNameSpc;
if(SWA.autocomplete){utilNameSpc=SWA.AutocompleteUtils
}else{if(SWA.autocompleteCommon){utilNameSpc=SWA.autocompleteCommon.utils
}}$.widget("swa.selectCarAutocompleteField",$.swa.field,{options:{origin_displayed_id:"#pickUpLocation_displayed",origin_id:"#pickUpLocation",destination_displayed_id:"#dropOffLocation_displayed",destination_id:"#dropOffLocation",submit_button_id:".wcm_booking_widget_field_container_submit_button input",pickup_date_id:"[name=pickUpDate]",search_button_id:".wcm_booking_widget_field_container_submit_button input",stations_info:(typeof stationList!=="undefined")?stationList:{},utils:utilNameSpc,autocomplete_options:{matchContains:true,minChars:3,width:209,shouldPromote:(typeof SWA.autocompleterAdditions!=="undefined")?SWA.autocompleterAdditions.matchesAirportCode:null,notFoundMessage:function(){return"No location found"
}}},_create:function(){this._initAutocomplete();
this._hideSelectField();
this._populateSelectField();
this._setDefaultText()
},_initAutocomplete:function(){this._getTextField().autocomplete(this.options.stations_info,this.options.autocomplete_options).result($.proxy(this,"_handleResult")).focus($.proxy(this,"_handleFocus"))
},_handleResult:function(b,a){var c=this._getTextField().val();
c=c.toUpperCase();
this._getSelectField().val(this._extractStationCode(c))
},_handleFocus:function(){this._getTextField().select();
var a=this._getTextField().val();
if(!this.options.utils.containsCity(this.options.stations_info,a)){this._getTextField().val("")
}if(typeof this._onFocus==="function"){this._onFocus()
}},_hideSelectField:function(){this._getSelectField().hide()
},_setDefaultText:function(){this._getTextField().val("");
SWA.DefaultText.handle(this._getTextField(),this.options.placeholder,this.getForm().element.find(this.options.submit_button_id))
},_populateSelectField:function(){var b=null,a=this;
if(SWA.autocomplete){$.each(stations_info,function(c,d){b=$("<option>").attr("value",c).attr("class",d.countryCode).text(d.display_name);
a._getSelectField().append(b)
})
}if(SWA.autocompleteCommon){$.each(stations_info,function(c,d){b=$("<option>").attr("value",c).attr("class",d.country_code).text(d.display_name);
a._getSelectField().append(b)
})
}},_extractStationCode:function(a){return a===""?"":a.slice(a.length-3)
}});
$.widget("swa.carOriginSelectAutocompleteField",$.swa.selectCarAutocompleteField,{options:{placeholder:"Pick-Up Location",autocomplete_options:{shouldPromote:(typeof SWA.autocompleterAdditions!=="undefined")?SWA.autocompleterAdditions.matchesAirportCode:null}},_getSelectField:function(){return this.element.find(this.options.origin_id)
},_getTextField:function(){return this.element.find(this.options.origin_displayed_id)
},_getNextField:function(){return $(this.options.destination_displayed_id)
}});
$.widget("swa.carDestinationSelectAutocompleteField",$.swa.selectCarAutocompleteField,{options:{placeholder:"Same as Pick-Up Location",autocomplete_options:{promoteAirports:true}},_getSelectField:function(){return this.element.find(this.options.destination_id)
},_getTextField:function(){return this.element.find(this.options.destination_displayed_id)
},_getNextField:function(){return $(this.options.pickup_date_id)
},_onFocus:function(){var a=this._getTextField();
if(a.val()===""){a.attr("aria-describedby","dropOffLocationBlank")
}else{a.removeAttr("aria-describedby")
}}});
$.widget("swa.hotelDestinationAirportsField",{_create:function(){if(this.element.find("select").size()){this.initAs($.swa.selectField)
}else{if(this.element.find("input[type=text]").size()){this.initAs($.swa.hotelDestinationAirportsTextField)
}else{if(this.element.find("input[type=hidden]").size()){this.initAs($.swa.hotelDestinationAirportsHiddenField)
}}}}});
$.widget("swa.hotelDestinationAirportsSelectField",$.swa.selectFlyoutField,{options:{placeholder:"Destination"},getForm:function(){return this.element.parents(".wcm_booking_widget_hotel").data("hotelSearchForm")
}});
$.widget("swa.carVendorsField",{_create:function(){if(this.element.find("select")){this.initAs($.swa.carVendorsSelectField)
}else{if(this.element.find("input[type=hidden]")){this.initAs($.swa.carVendorsHiddenField)
}}}});
$.widget("swa.carVendorsSelectField",$.swa.selectFlyoutField,{options:{placeholder:"Select Car Vendors",multiple:true},_createMultiple:function(){this.element.carVendorMultiSelectField()
}});
$.widget("swa.hotelChainsField",{_create:function(){if(this.element.find("select")){this.initAs($.swa.hotelChainsSelectField)
}else{if(this.element.find("input[type=hidden]")){this.initAs($.swa.hotelChainsHiddenField)
}}}});
$.widget("swa.hotelChainsSelectField",$.swa.selectFlyoutField,{options:{placeholder:"Select Hotel chain",multiple:true},_createMultiple:function(){this.element.hotelChainMultiSelectField()
},setValue:function(a){}});
$.widget("swa.hotelPropertyField",{_create:function(){if(this.element.find("select")){this.initAs($.swa.hotelPropertySelectField)
}else{if(this.element.find("input[type=hidden]")){this.initAs($.swa.hotelPropertyHiddenField)
}}}});
$.widget("swa.hotelPropertySelectField",$.swa.selectField,{});
$.widget("swa.hotelPropertyHiddenField",$.swa.hiddenField,{});
$.widget("swa.selectFieldOption",{options:{parentClass:"swa_forms_selectFieldOption_parent",childClass:"swa_forms_selectFieldOption_child"},_create:function(){this.value=this.element.attr("value");
this.label=this.element.text();
this.selected=(this.element.attr("selected"));
this.childOptions=null;
this.parentOption=this._getParent()
},_getParent:function(){if(this.element.hasClass(this.options.childClass)){return this.element.prevAll("."+this.options.parentClass+":first").data("selectFieldOption")
}else{return false
}},_getValue:function(){return this.element.attr("value")
},_getText:function(){return this.element.text()
},getLabel:function(){return this._getText()
}});
$.widget("swa.airportsFieldOption",$.swa.selectFieldOption,{options:{parentClass:"cityArea",childClass:"inCityArea"},_create:function(){$.swa.selectFieldOption.prototype._create.apply(this,arguments);
this.countryCode=this.element.attr("class").split(" ")[0];
this.airportCode=this.value;
this.isCityArea=this.element.hasClass("cityArea")
},_getParent:function(){if(this.element.hasClass(this.options.childClass)){var a=this.element.prevAll("."+this.options.parentClass+":first").data("airportsFieldOption");
if(!a.childOptions){a.childOptions=[]
}a.childOptions.push(this);
return a
}else{return false
}},_getChilds:function(){return this.childOptions
},getCountryCode:function(){return this.countryCode
},getAirportCode:function(){return this.airportCode
}});
$.widget("swa.textField",$.swa.visibleField,{_getField:function(){return this.element.find('input[type="text"]').eq(0)
}});
$.widget("swa.airportsTextField",$.swa.textField,{});
$.widget("swa.hotelDestinationAirportsTextField",$.swa.textField,{options:{placeholder:"Destination"}});
$.widget("swa.originAirportsTextField",$.swa.airportsTextField,{});
$.widget("swa.destinationAirportsTextField",$.swa.airportsTextField,{});
$.widget("swa.carOriginAirportsTextField",$.swa.originAirportsTextField,{options:{placeholder:"Pick-Up Location"}});
$.widget("swa.carDestinationAirportsTextField",$.swa.destinationAirportsTextField,{options:{placeholder:"Same as Pick-Up location"}});
$.widget("swa.promoCodeField",{_create:function(){if(this.element.is("input[type=hidden]")){this.initAs($.swa.promoCodeHiddenField)
}else{this.initAs($.swa.promoCodeTextField)
}}});
$.widget("swa.promoCodeTextField",$.swa.textField,{options:{placeholder:"Promo Code"}});
$.widget("swa.promoCodeHiddenField",$.swa.hiddenField,{});
$.widget("swa.dateField",$.swa.textField,{options:{dateFormat:"mm/dd/yy",minDate:"today",maxDate:"+1w",changeMonth:false,changeYear:false,showButtonPanel:true,closeText:"",prevText:"<img src='/assets/images/1.3_left_arrow.gif' alt='Previous' title='Previous Month' />",nextText:"<img src='/assets/images/1.3_right_arrow.gif' alt='Next' title='Next Month' />",showOn:"both",duration:1,numberOfMonths:2,buttonImage:"/assets/images/dropdown-calendar.gif",buttonImageOnly:true,buttonText:"",highlightedStartDateInputSelector:".swa_forms_dateField_highlightStartDate",highlightedEndDateInputSelector:".swa_forms_dateField_highlightEndDate",highlightedDatesClass:"wcm_booking_widget_highlightedDate",hasPromotions:false},_create:function(){this._initDateHighlighting();
this._initMaxDate();
this.datepicker=this._getField().datepicker(this.options).data("datepicker");
$.swa.textField.prototype._create.apply(this,arguments)
},_initDateHighlighting:function(){var a=this;
var c=this.element.find(this.options.highlightedStartDateInputSelector);
var b=this.element.find(this.options.highlightedEndDateInputSelector);
if(c.size()&&b.size()){var e=new Date(c.val());
var d=new Date(b.val());
this.options.hasPromotions=true;
if(e.getTime()&&d.getTime()){this.options.beforeShowDay=function(h){var g=true;
var f="";
var i="";
if((h.getTime()>=e.getTime())&&(h.getTime()<=d.getTime())){f=a.options.highlightedDatesClass
}return[g,f,i]
}
}}},_initMaxDate:function(){this.options.maxDate=this.getForm().getLastBookableDate()
},disable:function(){$.swa.textField.prototype.disable.apply(this,arguments);
this._getField().siblings("img").hide()
},enable:function(){$.swa.textField.prototype.enable.apply(this,arguments);
this._getField().siblings("img").show()
}});
$.widget("swa.departureDateField",$.swa.dateField,{});
$.widget("swa.airDepartureDateField",$.swa.departureDateField,{options:{placeholder:"Depart"}});
$.widget("swa.returnDateField",$.swa.dateField,{});
$.widget("swa.airReturnDateField",$.swa.returnDateField,{options:{placeholder:"Return"}});
$.widget("swa.hotelDepartureDateField",$.swa.departureDateField,{options:{placeholder:"Check-in"}});
$.widget("swa.hotelReturnDateField",$.swa.returnDateField,{options:{placeholder:"Check-Out"}});
$.widget("swa.carDepartureDateField",$.swa.departureDateField,{options:{placeholder:"Pick-Up"}});
$.widget("swa.carReturnDateField",$.swa.returnDateField,{options:{placeholder:"Return"}});
$.widget("swa.radioField",$.swa.visibleField,{getValue:function(){return this.element.find(":checked").val()
}});
$.widget("swa.tripTypeField",$.swa.radioField,{isRoundTrip:function(){return(this.getValue()=="RoundTrip")
}});
$.widget("swa.inputMultiSelectField",$.swa.selectField,{});
$.widget("swa.carVendorMultiSelectField",$.swa.inputMultiSelectField,{_create:function(){var f;
var e;
var c;
var d=this._focusOnClearButton;
var b=this._focusOnMultiselectField;
var a=this._focusOnMultiselectNextField;
var g;
g=this._getField();
g.find("option[value=SHOP_ALL]").removeAttr("selected");
f=g.find("option").eq(0);
e=$.trim(f.text());
c=f.val();
if(c=="SHOP_ALL"){inputDefaultText=e;
clearAllSelectNoneAvailable=true;
clearAllSelectNoneText=e
}else{inputDefaultText="Car vendors";
clearAllSelectNoneAvailable=false;
clearAllSelectNoneText=e
}g.rgbmultiselect({ariaLabel:inputDefaultText,clearAllSelectNoneAvailable:clearAllSelectNoneAvailable,clearAllSelectNoneText:clearAllSelectNoneText,clearAllSelectNoneTextShowOnBlur:true,displayA11yMessages:true,fieldTextFormatOnBlur:"%c options selected, click to change",helpText:"Select car companies or type to search",inputDefaultText:inputDefaultText+"                                    ",isCustomSwaWidget:true,keepSelectedItemsInPlace:true,optionPropertiesField:"rel",selectingHeaderSelectsChildren:true,tabKeySelectsSingleFilteredUnselectedItem:true}).rgbms_enter(function(){var i;
$("#_rgbmultiselect_container_item_SHOP_ALL").hide();
if(!g.find("option[value=SHOP_PARTNERS]").attr("selected")&&g.find("option.car-search-vendor-rr").size()==g.find("option.car-search-vendor-rr:selected").size()){g.rgbms_toggle("SHOP_PARTNERS",false)
}if(!g.hasClass("rgbmultiselect_swa_custom_functionality")){g.addClass("rgbmultiselect_swa_custom_functionality");
$("#_rgbmultiselect_container").addClass("wcm_rgbmultiselect_container");
$("#_rgbmultiselect_container").append('<div class="wcm_booking_widget_instructions wcm_booking_widget_hidden"><div class="wcm_booking_widget_instructions_keyboard">Keyboard Instrucions</div><div class=" wcm_booking_widget_instructions_enter"><span class="wcm_booking_widget_instructions_enter_title">Enter</span> to select checkbox</div><div class="wcm_booking_widget_instructions_up"><span class="wcm_booking_widget_instructions_up_title">Up/down</span> to navigate through the checkbox listbox results</div></div><div class="jquery_rgbmultiselect_buttons wcm_booking_widget_rgbmultiselect_buttons" role="application"><div class="jquery_rgbmultiselect_buttons_clear"><button aria-label="Clear selected options" type="button" class="js-btn-clear-rgbmultiselect wcm_booking_widget-link">Clear</button></div><div class="jquery_rgbmultiselect_buttons_ok sw2"><button aria-label="Ok. Confirm selected options" name="btn-ok" class="js-btn-ok-rgbmultiselect swa-button swa-button_primary" type="button">OK</button></div></div>');
$("#_rgbmultiselect_container > .jquery_rgbmultiselect_options_cleartext .jquery_rgbmultiselect_options_cleartext_item, #_rgbmultiselect_container #_rgbmultiselect_container_item_SHOP_PARTNERS ").click(function(){setTimeout(function(){g.rgbms_close()
},10)
});
var h=$("#_rgbmultiselect_container > .jquery_rgbmultiselect_buttons");
h.find(".jquery_rgbmultiselect_buttons_ok").click(function(){g.rgbms_close();
a();
return false
});
$("#_rgbmultiselect_container > .jquery_rgbmultiselect_buttons .jquery_rgbmultiselect_buttons_clear").click(function(){var l=false;
var k=$("#_rgbmultiselect_container > .jquery_rgbmultiselect_options_cleartext .jquery_rgbmultiselect_options_cleartext_item");
if(k.size()){k.click()
}else{var j=$("#_rgbmultiselect_container").find(".jquery_rgbmultiselect_options_item");
j.each(function(){if($(this).find("input[type=checkbox]:checked").size()){l=true;
$(this).click()
}});
if(!l){$("#_rgbmultiselect").focus()
}}return false
});
i=g.attr("data-nextField");
$("#_rgbmultiselect").attr("data-nextField",i);
$("#_rgbmultiselect").attr("aria-describedby","wcm_keyboard_instructions");
$(".js-btn-clear-rgbmultiselect").bind($.browser.opera?"keypress":"keydown",function(j){b(j,g)
});
$(".js-btn-ok-rgbmultiselect").bind($.browser.opera?"keypress":"keydown",function(m){var k=m.keyCode===$.ui.keyCode.ENTER;
var l=m.keyCode===$.ui.keyCode.ESCAPE;
var j=m.keyCode===$.ui.keyCode.TAB&&!m.shiftKey;
if(j||k){g.rgbms_close();
a();
m.preventDefault();
m.stopPropagation()
}else{if(l){g.rgbms_hide()
}}})
}});
$("#_rgbmultiselect").siblings(".jquery_rgbmultiselect_input_button").click(function(h){$("#_rgbmultiselect").focus();
h.preventDefault()
})
},_focusOnMultiselectField:function(c,d){var b=c.keyCode===$.ui.keyCode.ESCAPE;
var a=c.keyCode===$.ui.keyCode.TAB&&c.shiftKey;
if(a||b){c.preventDefault();
c.stopPropagation();
if(b){d.rgbms_hide()
}else{$("#_rgbmultiselect").focus()
}}},_focusOnMultiselectNextField:function(){var a;
var c;
var b;
if($("#_rgbmultiselect").attr("data-nextField")){c=$("#_rgbmultiselect").attr("data-nextField");
b="[name="+c+"]";
a=$(".wcm_booking_widget_car").find(b)[0];
a.focus()
}}});
$.widget("swa.hotelChainMultiSelectField",$.swa.inputMultiSelectField,{_create:function(){var d=this._getField(),c=d.find("option").eq(0),b=$.trim(c.text()),a=c.val(),e=d.attr("placeholder");
defaultValue=this._getDefaultValue();
if(defaultValue){d.val(defaultValue)
}if(a=="SHOP_ALL"){inputDefaultText=b;
clearAllSelectNoneAvailable=true;
clearAllSelectNoneText=b
}else{if(e){inputDefaultText=e
}else{inputDefaultText="Hotel chains"
}if($("[name="+this._getName()+"_clearAllSelectNoneAvailable]").val()==="true"){clearAllSelectNoneAvailable=true;
clearAllSelectNoneText="Shop All"
}else{clearAllSelectNoneAvailable=false;
clearAllSelectNoneText=b
}}d.rgbmultiselect({inputDefaultText:inputDefaultText+"                                    ",clearAllSelectNoneAvailable:clearAllSelectNoneAvailable,clearAllSelectNoneText:clearAllSelectNoneText,clearAllSelectNoneTextShowOnBlur:true,helpText:"Select hotel chains or type to search",fieldTextFormatOnBlur:"%c options selected, click to change",optionPropertiesField:"rel",tabKeySelectsSingleFilteredUnselectedItem:true,keepSelectedItemsInPlace:true,selectingHeaderSelectsChildren:true}).bind("rgbms_enter",function(){$("#_rgbmultiselect").addClass("rgbmultiselect_swa_is_opening");
setTimeout(function(){$("#_rgbmultiselect").removeClass("rgbmultiselect_swa_is_opening")
},2000);
if(!d.hasClass("rgbmultiselect_swa_custom_functionality")){d.addClass("rgbmultiselect_swa_custom_functionality");
$("#_rgbmultiselect_container").append('<div class="jquery_rgbmultiselect_buttons"><div class="jquery_rgbmultiselect_buttons_clear"><a href="#">Clear</a></div><div class="jquery_rgbmultiselect_buttons_ok"><span class ="btn-ok-icon"></span></div></div>');
$("#_rgbmultiselect_container > .jquery_rgbmultiselect_options_cleartext .jquery_rgbmultiselect_options_cleartext_item, #_rgbmultiselect_container > .jquery_rgbmultiselect_options_sticky .jquery_rgbmultiselect_options_sticky_item").click(function(){setTimeout(function(){d.rgbms_close();
d.blur()
},10)
});
$("#_rgbmultiselect_container > .jquery_rgbmultiselect_buttons .jquery_rgbmultiselect_buttons_ok").click(function(){$("#_rgbmultiselect").blur();
return false
});
$("#_rgbmultiselect_container > .jquery_rgbmultiselect_buttons .jquery_rgbmultiselect_buttons_clear").click(function(){var g=$("#_rgbmultiselect_container > .jquery_rgbmultiselect_options_cleartext .jquery_rgbmultiselect_options_cleartext_item");
if(g.size()){g.click()
}else{var f=$("#_rgbmultiselect_container").find(".jquery_rgbmultiselect_options_item");
f.each(function(){if($(this).find("input[type=checkbox]:checked").size()){$(this).click()
}});
d.rgbms_close()
}return false
})
}});
$("#_rgbmultiselect").siblings(".jquery_rgbmultiselect_input_button").click(function(){$("#_rgbmultiselect").focus()
})
}});
$.widget("swa.helpFlyout",{options:{title:""},_create:function(){var a=this;
a.options.title=this.element.find(".wcm_booking_widget_field_help_title").text();
a.dialog=a.element.find(".wcm_booking_widget_field_help_body").dialog({title:a.options.title,autoOpen:false,resizable:false,draggable:false,closeText:"Close",width:250,minHeight:0,dialogClass:"wcm_booking_widget_field_help_flyOut"}).data("dialog");
this.element.find("a").click(function(b){b.stopPropagation();
a.dialog.open();
a._positionHelpFlyout();
a._positionPointerFlyout();
$(document).one("click",function(){a.dialog.close()
});
$(".ui-datepicker-trigger").one("click",function(){a.dialog.close()
});
b.preventDefault()
});
a.dialog.widget().click(function(b){b.stopPropagation()
})
},_positionHelpFlyout:function(){var a=this;
a.dialog.uiDialog.position({of:a.element,my:"center top",at:"right bottom",offset:"0 12px",collision:"none"})
},_positionPointerFlyout:function(){var a=this;
if(!$(".wcm_booking_widget_field_help_pointer").size()){a.pointerFlyout=$("<div/>").appendTo(a.dialog.uiDialog).addClass("wcm_booking_widget_field_help_pointer")
}$(a.pointerFlyout).position({of:a.element.find("a"),my:"center top",at:"center bottom",collision:"none"})
}});
$.widget("swa.airportsFlyoutDialog",$.ui.dialog,{options:{uiDialogClasses:"ui-dialog ui-widget ui-widget-content ui-corner-all "},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var h=this,i=h.options,f=i.title||"&#160;",a=$.ui.dialog.getTitleId(h.element),g=(h.uiDialog=$("<div></div>")).appendTo(document.body).hide().addClass(i.uiDialogClasses+i.dialogClass).css({zIndex:i.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(j){if(i.closeOnEscape&&j.keyCode&&j.keyCode===$.ui.keyCode.ESCAPE){h.close(j);
j.preventDefault()
}}).attr({role:"dialog","aria-labelledby":a}).mousedown(function(j){h.moveToTop(false,j)
}),b=h.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),d=(h.uiDialogFooterBar=$("<div></div>")).addClass("ui-dialog-footerbar ui-widget-footer ui-corner-all ui-helper-clearfix").appendTo(g),e=$('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){e.addClass("ui-state-hover")
},function(){e.removeClass("ui-state-hover")
}).focus(function(){e.addClass("ui-state-focus")
}).blur(function(){e.removeClass("ui-state-focus")
}).click(function(j){h.close(j);
return false
}).appendTo(d),c=(h.uiDialogTitlebarCloseText=$("<span></span>")).addClass("ui-icon ui-icon-closethick").text(i.closeText).appendTo(e);
if($.isFunction(i.beforeclose)&&!$.isFunction(i.beforeClose)){i.beforeClose=i.beforeclose
}if(i.draggable&&$.fn.draggable){h._makeDraggable()
}if(i.resizable&&$.fn.resizable){h._makeResizable()
}h._createButtons(i.buttons);
h._isOpen=false;
if($.fn.bgiframe){g.bgiframe()
}},open:function(){if(this._isOpen){return
}var b=this,c=b.options,a=b.uiDialog;
b.overlay=c.modal?new $.ui.dialog.overlay(b):null;
b._size();
b._position(c.position);
a.show(c.show);
b.moveToTop(true);
if(c.modal){a.bind("keypress.ui-dialog",function(f){if(f.keyCode!==$.ui.keyCode.TAB){return
}var e=$(":tabbable",this),g=e.filter(":first"),d=e.filter(":last");
if(f.target===d[0]&&!f.shiftKey){g.focus(1);
return false
}else{if(f.target===g[0]&&f.shiftKey){d.focus(1);
return false
}}})
}$(b.element.find(":tabbable").get().concat(a.find(".ui-dialog-buttonpane :tabbable").get().concat(a.get()))).eq(0);
b._isOpen=true;
b._trigger("open");
return b
}});
$(function(){SWA.countries=[{countryCode:"US",footerMessage:"",countryLabel:"USA"}];
$(".wcm_booking_widget_air").airSearchForm();
$(".wcm_booking_widget_car").carSearchForm();
$(".wcm_booking_widget_hotel").hotelSearchForm()
});
var SWA=SWA||{};
var datePickersBuilt;
function initiateDatePickers(){if(typeof datePickersBuilt!="undefined"&&datePickersBuilt){return
}datePickersBuilt=true;
swa.datepicker.initializeDefaults();
var a=getDateContainersSelector();
a.each(function(){$(this).find(".datepickerPreloadTrigger").remove();
var c=$(this).find("input.outboundDate, input.js-chekInDate, input.js-pickUpDate");
var b=$(this).find("input.returnDate, input.js-checkOutDate, input.js-dropOffDate");
if(c.size()==1||b.size()==1){swa.datepicker.initiateDatePickers(c,b)
}})
}function getDateContainersSelector(){var a;
a=$(".js-booking_widget_hotel_form, #booking_widget_air_form, #booking_widget_car_form, #booking_widget_hotel_form, .wcm_booking_widget");
if(a.size()>0){return a
}a=$("#tripSearchModalContainer");
if(a.size()==1){return a
}a=$("#dateSelects");
if(a.size()==1){return a
}a=$("#flightSchedulesForm .dateContainer");
if(a.size()===1){return a
}a=$("#flightStatusNotification_create_form .dateContainer, #flightStatusNotification_view_form .dateContainer");
if(a.size()===1){return a
}return $("fieldset.dateContainer")
}function dpParseDate(a){try{if("mm/dd/yyyy"==a){return new Date()
}return $.datepicker.parseDate("mm/dd/yy",a+"")
}catch(b){return null
}}function isDateEmpty(a){return(a.val()==""||a.val()=="mm/dd/yyyy"||a.val()=="Return"||a.val()=="Depart"||a.val()=="Pick-Up"||a.val()=="Drop-Off")
}function isToday(b){var a=new Date();
return(a.getMonth()==b.getMonth()&&a.getDate()==b.getDate()&&a.getFullYear()==b.getFullYear())
}function setMaxDateReturn(a){var b;
switch($(a).attr("id")){case"checkoutDate":b=new Date($("#lastHotelBookableDate").val());
break;
case"returnDate":if($(a).attr("name")=="dropOffDate"){b=new Date($("#lastCarBookableDate").val())
}else{if($(a).attr("name")=="checkOutDate"){b=new Date($("#lastHotelBookableDate").val())
}else{b=new Date($("#lastBookableDate").val())
}}break;
case"dropoffDate":b=new Date($("#lastCarBookableDate").val());
break;
case"maxSearchDate":b=new Date(convertDate($("#maxSearchDate").val()));
break;
default:break
}return b
}function convertDate(b){var c=b.split("-");
var a=new Date(c[0],c[1]-1,c[2]);
return a
}function setMinDateDepartReturn(b){var a;
switch($(b).attr("id")){case"outboundDate":if(($(b).attr("name")=="checkInDate"&&$("#lastHotelBookableDate").size()>0)||($(b).attr("name")=="pickUpDate"&&$("#lastCarBookableDate").size()>0)||($("#lastBookableDate").size()>0)){a=new Date()
}break;
case"lookupDate":if(($(b).attr("name")=="checkInDate")||($(b).attr("name")=="pickUpDate")){a=new Date();
a.setMonth(a.getMonth()-18)
}break;
default:break
}return a
}function setMaxDateDepart(b){var a;
switch($(b).attr("id")){case"checkinDate":a=new Date($("#lastHotelBookableDate").val());
break;
case"lookupDate":a=new Date(convertDate($("#maxSearchDate").val()));
break;
case"outboundDate2":if($(b).hasClass("outboundDate_flightStatusNotification")){a="+9d"
}break;
case"outboundDate":if($(b).attr("name")=="pickUpDate"){a=new Date($("#lastCarBookableDate").val())
}else{if($(b).attr("name")=="checkInDate"){a=new Date($("#lastHotelBookableDate").val())
}else{a=new Date($("#lastBookableDate").val())
}}if($(b).hasClass("outboundDate_flightStatusNotification")){a="+9d"
}break;
case"minSearchDate":a=new Date($("#minSearchDate").val());
break;
case"pickupDate":a=new Date($("#lastCarBookableDate").val());
break;
default:break
}return a
}var dateObjectFunctions={getDate:function(){return dpParseDate($(this).val())
},setDate:function(a){$(this).val($.datepicker.formatDate("mm/dd/yy",a))
},syncDates:function(c){var f=dpParseDate(c);
if(!f){return
}var e=$(this).parents(".dateContainer");
var a=e.find(".returnDate");
var j=e.find(".outboundDate");
var i;
if($(this).hasClass("outboundDate")&&a.size()==1){var h=a[0].getDate();
if(isDateEmpty(a)||(h&&f>h)){i=0;
if(a.hasClass("dateResyncPlus1")){i=1000*60*60*24
}else{if(a.hasClass("dateResyncPlus2")){i=1000*60*60*24*2
}else{if(a.hasClass("dateResyncPlus3")){i=1000*60*60*24*3
}else{if($(this).hasClass("checkInDateAsDate")){f.setDate(f.getDate()+1)
}}}}j.removeClass("watermark");
a[0].setDate(new Date(f.getTime()+i));
a.removeClass("form_optional");
a.blur()
}}else{if($(this).hasClass("returnDate")&&j.size()==1){var d=j[0].getDate();
var g=new Date();
if(isDateEmpty(j)||(d&&f<d)){i=0;
if($(this).hasClass("dateResyncPlus1")){i=1000*60*60*24*(-1)
}else{if($(this).hasClass("dateResyncPlus2")){i=1000*60*60*24*(-2)
}else{if($(this).hasClass("dateResyncPlus3")){i=1000*60*60*24*(-3)
}else{if($(this).hasClass("checkOutDateAsDate")){f.setDate(f.getDate()-1)
}}}}a.removeClass("watermark");
var b=f.getTime()+i;
if(b<g.getTime()){b=g.getTime()
}j[0].setDate(new Date(b));
if(isToday(a[0].getDate())){j[0].setDate(new Date(f.getTime()))
}j.blur();
j.removeClass("form_optional")
}}}}};
function setNumberOfMonths(f){var a=2,d=null,e=false;
switch($(f).attr("id")){case"outboundDate":case"outboundDate2":if($(f).hasClass("outboundDate_flightStatusNotification")){var b=new Date(),c=new Date(parseInt(b.getTime()+9*24*60*60*1000));
if(b.getMonth()===c.getMonth()){a=1
}d="You may set a Flight Status Notification for the next 10 days. If your date is further out, please come back at a later time.";
e=true
}break
}return{numberOfMonths:a,message:d,arrowsMonths:e}
}swa.datepicker={resetMinDate:function(a){$.datepicker.setDefaults({minDate:a})
},resetMaxDate:function(a){$.datepicker.setDefaults({maxDate:a})
},initiateDatePickers:function(f,b){f=$(f);
b=$(b);
var a=setMinDateDepartReturn(f);
var e=setMinDateDepartReturn(f);
var g=setMaxDateDepart(f);
var c=setNumberOfMonths(f);
var d;
if(f.size()>0){$.extend(f[0],dateObjectFunctions);
f.change(function(){$(this)[0].syncDates($(this).val())
});
d={buttonText:""};
if(f.hasClass("outboundDate")){d={buttonText:"Select departure date from calendar"}
}if(typeof outboundButtonTextOverride==="string"){d.buttonText=outboundButtonTextOverride
}if(typeof a!=="undefined"){d.minDate=a
}if(typeof g!=="undefined"){d.maxDate=g
}if(typeof c!=="undefined"){d.numberOfMonths=c.numberOfMonths;
d.messageDatepicker=c.message;
d.hideIfNoPrevNext=c.arrowsMonths
}f.datepicker(d);
if(f.is(":disabled")){f.siblings(".ui-datepicker-trigger").css("visibility","hidden")
}SWA.a11yDatepicker.extendDatePickerTextField(f)
}var h=setMaxDateReturn(b);
var c=setNumberOfMonths(f);
if(b.size()>0){$.extend(b[0],dateObjectFunctions);
b.change(function(){$(this)[0].syncDates($(this).val())
});
d={buttonText:""};
if(f.hasClass("returnDate")){d={buttonText:"Select return date from calendar"}
}if(typeof returnButtonTextOverride==="string"){d.buttonText=returnButtonTextOverride
}if(typeof e!=="undefined"){d.minDate=e
}if(typeof h!=="undefined"){d.maxDate=h
}if(typeof c!=="undefined"){d.numberOfMonths=c.numberOfMonths;
d.messageDatepicker=c.message;
d.hideIfNoPrevNext=c.arrowsMonths
}b.datepicker(d);
if(b.is(":disabled")){b.siblings(".ui-datepicker-trigger").css("visibility","hidden")
}SWA.a11yDatepicker.extendDatePickerTextField(b)
}},initializeDefaults:function(){var d=null;
var e=null;
var a=null;
var f=null;
var b=$("#lastBookableDate");
var c=$("#lastBookableDateWeek");
if(b.size()>0){d=new Date();
e=new Date(b.val())
}if(c.size()>0){d=new Date();
d.setDate(d.getDate()+7)
}$.datepicker.setDefaults({dateFormat:"mm/dd/yy",minDate:d,maxDate:e,changeMonth:false,changeYear:false,showButtonPanel:true,closeText:"",prevText:"<img src='/assets/images/1.3_left_arrow.gif' alt='Previous' title='Previous Month' />",nextText:"<img src='/assets/images/1.3_right_arrow.gif' alt='Next' title='Next Month' />",showOn:"both",duration:1,numberOfMonths:a,hideIfNoPrevNext:f,messageDatepicker:null,buttonImage:"/assets/images/dropdown-calendar.gif",buttonImageOnly:true,buttonText:"",onClose:function(h,g){g.input[0].syncDates(h);
closeDatePickerHookTrigger(this)
},beforeShow:function(){$("#destination_flyout").hide()
}})
}};
var closeDatePickerHookTrigger=function(a){if(typeof closeDatePickerHook=="function"){closeDatePickerHook(a)
}};
SWA.a11yDatepicker=(function(g){var t="aria-labelledby";
var d="aria-describedby";
var i="descriptor";
var k="Calendar available.";
var h="Calendar closed.";
var n='<span id="datepicker_descriptor_${datepickerId}" class="screenreader-only" aria-hidden="true">Enter your ${datepickerLabel} date in the format m m / d d / y y y y. <span class="js-entered-date"></span></span>';
var e="check in";
var A="check out";
var u="drop off";
var s="${datepickerId}";
var C="${datepickerLabel}";
var E="departure";
var z="pick up";
var y="return";
var o="d, DD";
var p="Entered date. ";
var a="Highlighted date. ";
var r="MM, d DD, yy";
var c="MM, d DD";
var q="Promotion dates valid from";
var D="to";
var b="mm/dd/yy";
var j;
if(!g.datepicker.a11yEnabled){g.extend(g.datepicker,{a11yEnabled:true,oldAdjustDate:g.datepicker._adjustDate,oldKeyDown:g.datepicker._doKeyDown,oldUpdateDatepicker:g.datepicker._updateDatepicker,_adjustDate:function(F,K,L){var J=this._getInst(g(F)[0]);
var G;
var M;
var P;
var H;
var I=J.selectedDay;
var O=J.selectedMonth;
var N=J.selectedYear;
this.oldAdjustDate(F,K,L);
M=J.selectedDay;
P=J.selectedMonth;
H=J.selectedYear;
G=new Date(H,P,M);
if(N!==H){g.arialive(g.datepicker.formatDate(r,G))
}else{if(O!==P){g.arialive(g.datepicker.formatDate(c,G))
}else{g.arialive(g.datepicker.formatDate(o,G))
}}},_extend:function B(J,H,I){var F;
var G;
if(typeof H==="object"){for(var K in H){B(J,K,H[K])
}return
}G=J.settings[H];
F=g.datepicker._defaults[H];
if(G&&G instanceof Function&&I instanceof Function){J.settings[H]=function(){G.apply(J,Array.prototype.slice.call(arguments));
I.apply(J,Array.prototype.slice.call(arguments))
}
}else{if(F&&F instanceof Function&&I instanceof Function){J.settings[H]=function(){F.apply(J,Array.prototype.slice.call(arguments));
I.apply(J,Array.prototype.slice.call(arguments))
}
}else{g.datepicker._set(J,H,I)
}}},_doKeyDown:function(I){var F;
var G=I.keyCode===13;
var H;
var K=g.datepicker._getInst(I.target);
var J;
F=g(K.input[0]);
H=F.val();
K._keyEvent=true;
if(g.datepicker._datepickerShowing&&G){I.preventDefault();
I.stopPropagation();
J=g("td."+g.datepicker._dayOverClass,K.dpDiv);
if(J[0]){g.datepicker._selectDay(I.target,K.selectedMonth,K.selectedYear,J[0])
}else{g.datepicker._hideDatepicker(null,g.datepicker._get(K,"duration"))
}return false
}else{return g.datepicker.oldKeyDown.call(this,I)
}},_set:function(H,F,G){H.settings[F]=G
},_updateDatepicker:function(F){this.oldUpdateDatepicker(F);
F.dpDiv.find(".ui-datepicker-prev").attr("title","Previous Month").find("span").empty().addClass("swa-icon swa-icon_arrow-left");
F.dpDiv.find(".ui-datepicker-next").attr("title","Next Month").find("span").empty().addClass("swa-icon swa-icon_arrow-right");
if(F.settings.hasPromotions){F.dpDiv.append('<div class="wcm_message_promotions">Highlight indicate valid dates of promotion</div>')
}}})
}var v=function(L){var Q="MM, d, yy";
var I=g(".swa_forms_dateField_highlightEndDate");
var K;
var H=g(".swa_forms_dateField_highlightStartDate");
var J;
var N;
var O;
var P;
var M;
var F="";
var G;
L=typeof(L==="string")?g(L):L;
K=g.datepicker._getInst(L[0]);
J=K.settings.messageDatepicker;
if(g(H)[0]!==undefined){M=new Date(g(H)[0].value)
}if(g(I)[0]!==undefined){O=new Date(g(I)[0].value)
}m(L);
g.datepicker._extend(K,{beforeShow:function(S,R){R.dpDiv.addClass("sw2");
F="";
if(J){F=J+" "
}setTimeout(function(){F+=k;
P=g.datepicker.formatDate(Q,M);
N=g.datepicker.formatDate(Q,O);
G=x(R,a);
if(G){F+=" "+G
}if(R.settings.hasPromotions){F+=". "+q+" "+P+" "+D+" "+N
}g.arialive(F)
},800);
R.lastVal=R.input.val();
R.settings._updateDatepickerView(R)
},onClose:function(T,R){var S=f(T);
var U=S?x(R,p)+". ":"";
if(S&&!l(T,R)){U=w(R,p)+". "
}R.input.data(i).find(".js-entered-date").html(U);
g.arialive(U+h)
},_updateDatepickerView:function(R){R.input.keyup(function(T){if(!T.ctrlKey&&R.input.val()!=R.lastVal){if(g(".js-is-air-datepicker").length===0){g(R.dpDiv).find(".ui-datepicker-days-cell-over").removeClass("ui-datepicker-days-cell-over")
}else{try{var S=g.datepicker.parseDate(g.datepicker._get(R,"dateFormat"),(R.input?R.input.val():null),g.datepicker._getFormatConfig(R));
if(S){g.datepicker._setDateFromField(R);
g.datepicker._updateAlternate(R);
g.datepicker._updateDatepicker(R);
R.lastVal=R.input.val()
}}catch(T){g.datepicker.log(T)
}}}})
}})
};
var f=function(H){var G=H.length;
try{g.datepicker.parseDate(b,H)
}catch(F){G=false
}return G
};
var l=function(G,F){return G===g.datepicker.formatDate(b,new Date(F.selectedYear,F.selectedMonth,F.selectedDay))
};
var x=function(G,J){var F=G.selectedDay;
var K=G.selectedMonth;
var I;
var H=G.selectedYear;
if(F&&(K+1)&&H){I=J+g.datepicker.formatDate(r,new Date(H,K,F))
}return I
};
var w=function(G,J){var I="";
var F=G.currentDay;
var K=G.currentMonth;
var H=G.currentYear;
if(F&&(K+1)&&H){I=J+g.datepicker.formatDate(r,new Date(H,K,F))
}return I
};
var m=function(H){var J;
var I="";
var G=n.replace(s,H.attr("id"));
var K;
var F=H.val();
switch(H.attr("id")){case"checkInDate":K=G.replace(C,e);
I=t;
break;
case"checkOutDate":K=G.replace(C,A);
I=t;
break;
case"pickUpDate":K=G.replace(C,z);
I=t;
break;
case"dropOffDate":K=G.replace(C,u);
I=t;
break;
case"outboundDate":K=G.replace(C,E);
I=d;
break;
case"returnDate":K=G.replace(C,y);
I=d;
break;
default:K=G.replace(C,"");
I=d;
break
}J=g(K);
H.after(J);
H.attr(I,J.attr("id"));
H.data(i,J);
if(F&&f(F)){F=g.datepicker.parseDate(b,H.val());
F=p+g.datepicker.formatDate(r,F);
J.find(".js-entered-date").html(F)
}};
return{extendDatePickerTextField:v}
})(jQuery);
$(document).ready(function(){if(typeof buildDatePickersOnPageLoad=="undefined"||buildDatePickersOnPageLoad){initiateDatePickers()
}});
datepickerJavascriptLoaded=true;