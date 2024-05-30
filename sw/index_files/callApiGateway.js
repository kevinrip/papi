$(document).ready(function(){$("#emailUs_redirect_button").click(function(){var b=getVisionCustomerSession();
var a=$.cookie("token");
var d=SWA.apiGateway;
var c="https://"+window.location.host+"/api/security/v3/security/salesforce";
if(b){callGateway(c,d,true,b)
}else{if(a&&a!=="null"){callGateway(c,d,false)
}else{openSalesForcePage(d.url)
}}})
});
$(document).on("click",".logoutLink",callGWLogoutIfWSCookieExists);
$(document).on("click","button.login-submit-button",callGWLogoutIfWSCookieExists);
function callGWLogoutIfWSCookieExists(){var a=$.cookie("id_token");
if(a&&a!=="null"){callGatewayLogout()
}}function callGatewayLogout(){var b=SWA.apiGateway;
var a="https://"+window.location.host+"/api/security/v3/security/logout";
$.ajax({type:"POST",url:a,contentType:"application/json",dataType:"json",cache:"no-cache",async:false,beforeSend:function(c){c.setRequestHeader("x-api-key",b.apikey)
},success:function(d,e,c){},error:function(d,c){}})
}function getVisionCustomerSession(){var a=/^CustomerStore-/;
if(sessionStorage){_.forEach(sessionStorage,function(b){if(sessionStorage.hasOwnProperty(b)&&b.match(a)){return $.parseJSON(sessionStorage.getItem(b))
}})
}}function callGateway(c,d,b,a){$.ajax({type:"POST",url:c,contentType:"application/json",dataType:"json",credentials:"include",xhrFields:{withCredentials:true},cache:"no-cache",beforeSend:function(e){e.setRequestHeader("x-api-key",d.apikey);
if(b){e.setRequestHeader("x-api-idtoken",a.idToken);
e.setRequestHeader("authorization","Bearer "+a.accessToken)
}},success:function(f,g,e){processResponse(f,g,e,d)
},error:function(f,e){processFailResponse(f,e,d)
}})
}function processFailResponse(c,a,b){openSalesForcePage(b.url)
}function openSalesForcePage(a){window.open(a,"_parent")
}function processResponse(c,e,a,d){var b=d.url;
if(c&&e=="success"){b+="?guid="+encodeURIComponent(c.guidNumber)
}openSalesForcePage(b)
};