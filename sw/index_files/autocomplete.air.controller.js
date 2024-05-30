var SWA=SWA||{};
SWA.autocomplete=SWA.autocomplete||{};
SWA.autocomplete.air=SWA.autocomplete.air||{};
SWA.autocomplete.air.ORIGIN_AIRPORT_WATERMARK="Departure City or Airport Code";
SWA.autocomplete.air.DESTINATION_AIRPORT_WATERMARK="Arrival City or Airport Code";
SWA.autocomplete.air.RETURN_AIRPORT_WATERMARK="Return City or Airport Code";
SWA.autocomplete.air.createController=function(j,g,p){var n={};
var f=g||SWA.autocomplete.air.model;
var m=j||SWA.autocomplete.air.createView();
var y=p||SWA.autocomplete.air.callbacks.init(f,m);
u();
function u(){var D=o(m.originSelectField().val());
var A=o(m.destinationSelectField().val());
var C=k(m.originTextField(),m.originSelectField(),f.stationsRepository.getStations(),"",SWA.autocomplete.air.ORIGIN_AIRPORT_WATERMARK);
var z=k(m.destinationTextField(),m.destinationSelectField(),x(D),"",SWA.autocomplete.air.DESTINATION_AIRPORT_WATERMARK);
v(C,z);
if(m.returnTextField().length){var B=k(m.returnTextField(),m.returnSelectField(),x(A),"RoundTrip",SWA.autocomplete.air.RETURN_AIRPORT_WATERMARK);
v(z,B);
v(B);
B.getNextField=function(){return m.departureDateTextField()
}
}else{v(z)
}C.getNextField=function(){return z.textField
};
z.getNextField=function(){if(B&&s(B.textField)){return B.textField
}else{if(s(m.departureDateTextField())){return m.departureDateTextField()
}else{return m.departureTravelDateField()
}}};
w();
i(C,z,B);
return n
}function s(z){return z.is(":visible")&&!z.attr("disabled")
}n.initSingleField=function(z,D,C,B){var A=k(z,D,f.stationsRepository.getStations(),"",C);
A.getNextField=function(){return B
};
v(A)
};
function q(A,z){return function(F,E,D,B){if(typeof B=="undefined"){B=true
}var C=D?D.id:"";
A.selectField.val(C?C:A.defaultSelectValue);
if(z){z.stationsList=x(C);
z.textField.setOptions({data:z.stationsList})
}if(C!=""&&B){A.getNextField().focus()
}r(C,z);
w();
b()
}
}function k(A,C,D,B,z){return{textField:A,selectField:C,stationsList:D,defaultSelectValue:B,defaultWatermark:z}
}function v(A,B){function z(){setTimeout(function(){A.textField.select()
},50)
}function C(D){D.click(function(){D.select()
})
}A.textField.bind("focus",z);
C(A.textField);
A.textField.autocomplete(A.stationsList,d());
A.textField.result(q(A,B));
l(A.textField,A.selectField);
A.textField.watermark(A.defaultWatermark);
A.textField.bind("stationChange",function(F,D){var E=A.textField.val();
var G=o(E);
A.textField.trigger("result",[E,{id:G},D]);
A.textField.blur()
})
}function d(){return{matchContains:true,minChars:3,allowSelectingParents:false,customMatching:y.customMatching,formatResult:y.formatResult,sortRows:y.sortRows,fixedWidth:true,highlight:y.highlightStation,notFoundMessage:y.getNotFoundMessage,allowNonMatchingText:false}
}function l(A,D){var z=D.find("option:selected").text();
var B=$.trim(z);
function C(){return B.length>0&&$(D).val()!=""&&$(D).val()!="RoundTrip"&&z!="None"
}if(C()){A.val(B)
}}function i(F,z,D){var A={TAB:9,RETURN:13};
function C(G){return G.keyCode===A.RETURN
}function B(G){return G.keyCode===A.TAB&&!G.shiftKey
}function E(G,H){H.preventDefault();
G.focus()
}F.textField.keydown(function(G){if(C(G)||B(G)){if(F.textField.val().length<3){F.textField.val("")
}E(F.getNextField(),G)
}});
z.textField.keydown(function(G){if(C(G)||B(G)){E(z.getNextField(),G)
}});
if(D){D.textField.keydown(function(G){if(C(G)||B(G)){E(D.getNextField(),G)
}})
}}function b(){h(c())
}function e(B){for(var z=0;
z<B.length;
z++){var A=f.stationsRepository.getStation(B[z]);
if(A&&A.isInternational()){return true
}}return false
}function h(z){if(t(m.promoCodeTextField())||t(m.seniorCountSelectField())){return
}if(m.isPointsSelected()||m.isTransitionalAwardSelected()||m.isCertificateProductSelected()||m.isPromoCertSelected()){SWA.promoCodeAndSeniorFields.disablePromoField(m.promoCodeTextField());
SWA.promoCodeAndSeniorFields.disableSeniorSelect(m.seniorCountSelectField())
}else{SWA.promoCodeAndSeniorFields.enablePromoField(m.promoCodeTextField());
SWA.promoCodeAndSeniorFields.enableSeniorSelect(m.seniorCountSelectField())
}}function t(z){return z.length===0
}function o(A){if(!A){return""
}var z=A;
if(A instanceof Array){z=z[0]
}return z===""?"":z.slice(z.length-3)
}function r(z,B){if(!$.trim(z)||!B||!B.textField.length){return
}var D=B.textField.val();
var A=o(D);
var C=f.stationsRepository.getStation(z);
if(a(D)&&!C.hasRouteTo(A)){B.textField.val("");
B.selectField.val(B.defaultSelectValue);
B.textField.blur()
}}function a(z){return z.search("-")>0
}function x(z){return z?f.stationsRepository.getStationsWithRoutesFrom(z):f.stationsRepository.getStations()
}function w(){SWA.AutocompleteUtils.enablePoints()
}function c(){return[m.originSelectField().val(),m.destinationSelectField().val(),m.returnSelectField()?m.returnSelectField().val():""]
}return n
};
SWA.autocomplete.air.init=function(b){var a=b||SWA.autocomplete.air.createView();
SWA.autocomplete.air.createController(a)
};