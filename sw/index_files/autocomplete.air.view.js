var SWA=SWA||{};
SWA.autocomplete=SWA.autocomplete||{};
SWA.autocomplete.air=SWA.autocomplete.air||{};
SWA.autocomplete.air.createView=function(){var p={};
var j="#originAirport_displayed";
var g="#destinationAirport_displayed";
var b="#returnAirport_displayed";
var o="#originAirport";
var e="#destinationAirport";
var f="#returnAirport";
var d="#outboundDate";
var l="#travelDate";
var m="#points";
var n="#imgpoints";
var i="#promoCode";
var c="#seniorPassengerCount";
var a="#transitionalAwardSelected";
var h="#certificateProductId";
var k="#promoCertSelected";
p.originTextField=function(q){if(q){j=q
}return $(j)
};
p.destinationTextField=function(q){if(q){g=q
}return $(g)
};
p.returnTextField=function(q){if(q){b=q
}return $(b)
};
p.originSelectField=function(q){if(q){o=q
}return $(o)
};
p.destinationSelectField=function(q){if(q){e=q
}return $(e)
};
p.returnSelectField=function(q){if(q){f=q
}return $(f)
};
p.departureDateTextField=function(q){if(q){d=q
}return $(d)
};
p.departureTravelDateField=function(q){if(q){l=q
}return $(l)
};
p.promoCodeTextField=function(){return $(i)
};
p.seniorCountSelectField=function(){return $(c)
};
p.isPointsSelected=function(){if($(m).length){return $(m).hasClass("radioChecked")||$(m).attr("checked")
}if($(n).length){return $(n).hasClass("radioChecked")
}return false
};
p.isTransitionalAwardSelected=function(){return $(a).length&&$(a).val()==="true"
};
p.isPromoCertSelected=function(){return $(k).length&&$(k).val()==="true"
};
p.isCertificateProductSelected=function(){return $(h).length&&$(h).val()!=""
};
return p
};