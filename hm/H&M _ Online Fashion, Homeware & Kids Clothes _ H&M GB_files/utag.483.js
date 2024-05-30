//tealium universal tag - utag.483 ut4.0.202403260710, Copyright 2024 Tealium.com Inc. All Rights Reserved.
var tiktoktracker=function(w,d,t,sdkid){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++){ttq.setAndDefer(ttq,ttq.methods[i]);}
ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++){ttq.setAndDefer(e,ttq.methods[n]);}
return e};ttq.load=function(e,n){var i='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};};ttq.load(sdkid);ttq.page();};try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.initialized=false;u.map={"tiktok_sdkid":"sdkid"};u.extend=[function(a,b){try{if(1){var event_id=b.tealium_event_id;b.tiktok_sdkid="C4QSSN7M5GFN4SM6UID0";tiktoktracker(window,document,'ttq',b.tiktok_sdkid);if(a==="view"){ttq.page();if(b.page_id==="Startpage"){ttq.track('ViewContent',{'content_category':b.page_id,'content_type':'product'},{'event_id':event_id});}else if(b.page_is_productList===1){ttq.track('ViewContent',{'content_category':b.category_id,'content_type':'product'},{'event_id':event_id});}}
if(b.product_view_type=="PDP"){try{b._ccurrency=JSON.parse(document.querySelector('#product-schema').innerText).offers[0].priceCurrency;}catch(e){b._ccurrency=b.static_null;}
var content=u.data.popProduct();ttq.track('ViewContent',content,{'event_id':event_id});}
if(b.order_id!==null){event_id=b.tealium_session_id+"_"+"purchase"+"_"+tiq.tools.expire.now;var content=u.data.popProduct();ttq.identify({sha256_email:b.customer_email,});ttq.track('CompletePayment',content,{'event_id':event_id});}
if(b.event_type==="ADD_TO_BAG"){var content=u.data.popProduct();ttq.track('AddToCart',content,{'event_id':event_id});}
if(b.event_type==="ADD_TO_FAVOURITES"){var content=u.data.popProduct();ttq.track('AddToWishlist',content,{'event_id':event_id});}
if(b.page_id=="CUSTOMER_SERVICE_THANK_YOU"||b.page_id=="CS Newsletter Thank You"||b.newsletter_signup=="1"){ttq.track('Subscribe',{'event_id':event_id});}
if(b.event_type=="CLUB_JOIN_SUCCESS"){ttq.track('CompleteRegistration',{'event_id':event_id});}}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={base_url:'https://analytics.tiktok.com/i18n/pixel/events.js',sdkid:'',popProduct(){if(b._cprod.length>1){let c={};var f=[];for(var i=0;i<b._cprod.length;i++){var e={};e.content_type="product";e.content_id=(b._cprod[i]!=="")?b._cprod[i]:undefined;e.content_name=(b._cprodname[i]!=="")?b._cprodname[i]:undefined;e.content_category=(b._ccat[i]!=="")?b._ccat[i]:undefined;e.quantity=(Number(b._cquan[i])>0)?Number(b._cquan[i]):1;e.price=(Number(b._cprice[i])>0)?Number(b._cprice[i]):undefined;f.push(e);}
if(b._csubtotal!==""){if(Number(b._csubtotal)>0){c.value=Number(b._csubtotal);}}else{c.value=0;for(var j=0;j<f.length;j++){c.value+=e.price;}}
c.currency=b._ccurrency;c.contents=f;return c;}else{let c={};c.content_type="product";c.content_id=(b._cprod[0]!=="")?b._cprod[0]:undefined;c.content_name=(b._cprodname[0]!=="")?b._cprodname[0]:undefined;c.content_category=(b._ccat[0]!=="")?b._ccat[0]:undefined;c.currency=b._ccurrency;c.quantity=(Number(b._cquan[0])>0)?Number(b._cquan[0]):1;c.price=(Number(b._cprice[0])>0)?Number(b._cprice[0]):undefined;c.value=c.quantity*c.price;return c;}}}
for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){u.data[e[f]]=b[d];}}}
u.loader_cb=function(){u.initialized=true;};if(!u.initialized){u.loader({"type":"script","src":u.data.base_url+"?sdkid="+u.data.sdkid+"&lib=ttq","cb":u.loader_cb,"loc":"script","id":'utag_483'});}
}};utag.o[loader].loader.LOAD(id);})("483","hm.goe");}catch(error){utag.DB(error);}