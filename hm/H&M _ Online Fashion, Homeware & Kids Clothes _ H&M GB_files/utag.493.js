//tealium universal tag - utag.493 ut4.0.202403260710, Copyright 2024 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={};utag.o[loader].sender[id]=u;if(utag===undefined){utag={};}if(utag.ut===undefined){utag.ut={};}if(utag.ut.loader===undefined){u.loader=function(o){var a,b,c,l;a=document;if(o.type==="iframe"){b=a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");b.setAttribute("src",o.src);}else if(o.type==="img"){utag.DB("Attach img: "+o.src);b=new Image();b.src=o.src;return;}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";b.src=o.src;}if(o.id){b.id=o.id;}if(typeof o.cb==="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb();},false);}else{b.onreadystatechange=function(){if(this.readyState==="complete"||this.readyState==="loaded"){this.onreadystatechange=null;o.cb();}};}}l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l==="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b);}}};}else{u.loader=utag.ut.loader;}
u.ev={'view':1,'link':1};u.initialized=false;u.map={"optimizely_event":"event_name","optimizely_revenue":"revenue","optimizely_fs_event":"event_id","optimizely_fs_visitor_id":"uid","optimizely_market_currency":"map.currency_value","optimizely_fs_attributes":"map.attributes","selected_market":"market","touchpoint":"touchpoint","customer_bpid_output":"bpid","optimizely_fs_deliveryMap":"map.delivery","optimizely_fs_paymentMap":"map.payment"};u.extend=[function(a,b){try{if(1){b.optimizely_fs_attributes={browserName:20235035475,browserType:20229982251,browserVersion:20214715214,customerType:20220016241,customerTypeEntry:20223555282,isIPad:20234966734,isTouchDevice:20234987087,locale:20231186150,os:20229982252,screenSize:20204674375,touchpoint:20225595890,userRecurrence:20233306607,};if(a==='view'){if(b.page_is_productList){b.optimizely_fs_event.push('pageview_plp##20786681221');}
if(b.page_id==='CART'){b.optimizely_fs_event.push('pageview_sb##20797172365');}
if(b.page_is_checkout){b.optimizely_fs_event.push('pageview_co##20781842269');}
if(b.page_id==='MY FAVOURITES'){b.optimizely_fs_event.push('pageview_favourites##21066761069');}
if(b.page_is_orderConfirmation){b.optimizely_event.push("PURCHASE");b.optimizely_fs_event.push("PURCHASE");b.optimizely_market_currency={AU:6.53,RS:0.0861,MX:0.43,JP:0.0801,KR:0.0081,BE:10.3403,BG:5.2856,HR:10.3403,LT:10.3403,SI:10.3403,LV:10.3403,EE:10.3403,CY:10.3403,LU:10.3403,CZ:0.3983,FR:10.3403,HU:0.0319,IE:10.3403,IT:10.3403,PL:2.4101,NL:10.3403,PT:10.3403,RO:2.2176,RU:0.1364,SK:10.3403,ES:10.3403,CH:9.1115,GB:11.6214,CA:6.8282,DK:1.3856,FI:10.3403,SE:1,NO:1.0615,IN:0.1301,AT:10.3403,US:9.0929,TW:0.3,SG:6.6357,MY:2.1701,PH:0.18,HK:1.1626,TR:1.759,DE:10.3403,GR:10.3403,};b.optimizely_fs_paymentMap={paypal:{eventKey:"data_oc_payment_pp",eventId:"20933722117"},credit_card:{eventKey:"data_oc_payment_cc",eventId:"20933322847"},omni_credit_pay_later:{eventKey:"data_oc_payment_omni_credit_later",eventId:"20934944496"},omni_credit_slice_it:{eventKey:"data_oc_payment_omni_credit_slice",eventId:"20905942863"},omni_pay_now:{eventKey:"data_oc_payment_omni_pay_now",eventId:"20890813873"},vipps:{eventKey:"data_oc_payment_vipps",eventId:"20890543327"},ideal:{eventKey:"data_oc_payment_ideal",eventId:"20907603657"},invoice:{eventKey:"data_oc_payment_invoice",eventId:"20898263780"},monthly_bill:{eventKey:"data_oc_payment_monthly_bill",eventId:"20907603657"},cash_on_delivery:{eventKey:"data_oc_payment_cod",eventId:"20923744345"},omni_credit_pay_later_by_card:{eventKey:"data_oc_payment_omni_credit_later_by_card",eventId:"21237181978"},bank_transfer:{eventKey:"data_oc_payment_bank_transfer",eventId:"21337070786"},applepay:{eventKey:"data_oc_payment_applepay",eventId:"22389341275"},}
if(b.order_delivery_method==="Пункт вывоза товара"){b.order_delivery_method="ru_pup";}else if(b.order_delivery_method==="Доставка на следующий день"){b.order_delivery_method="ru_ndd";}
b.optimizely_fs_deliveryMap={russian_post:{eventKey:"data_oc_delivery_russian_post",eventId:"20913593521"},express_courier:{eventKey:"data_oc_delivery_express_courier",eventId:"20903993662",},next_day_delivery:{eventKey:"data_oc_delivery_ndd",eventId:"20762691551",},pick_up_point:{eventKey:"data_oc_delivery_pup_std",eventId:"20906236093"},standard_delivery:{eventKey:"data_oc_delivery_standard",eventId:"20924943475",},pick_up_point_next_day_delivery:{eventKey:"data_oc_delivery_express_pup",eventId:"20951141045",},instabox_standard_delivery:{eventKey:"data_oc_delivery_instabox",eventId:"20910344638",},home_standard:{eventKey:"data_oc_delivery_home_standard",eventId:"20924362618"},home_delivery_standard:{eventKey:"data_oc_delivery_home_delivery_standard",eventId:"20921295342",},pick_up_in_store:{eventKey:"data_oc_delivery_clickcollect",eventId:"20898323063",},home_delivery_express:{eventKey:"data_oc_delivery_home_delivery_express",eventId:"20937043517",},home_delivery:{eventKey:"data_oc_delivery_home_delivery",eventId:"20910414310",},ru_pup:{eventKey:"data_oc_delivery_ru_pup",eventId:"20926610803"},ru_ndd:{eventKey:"data_oc_delivery_ru_ndd",eventId:"20918243949"},collection_point_standard_delivery:{eventKey:"data_oc_delivery_collection_point_standard_delivery",eventId:"21195140281"},budbee_home_delivery:{eventKey:"data_oc_delivery_budbee_home_delivery",eventId:"21181920029"},budbee_box_delivery:{eventKey:"data_oc_delivery_budbee_box_delivery",eventId:"21187340540"},budbee_express_delivery:{eventKey:"data_oc_delivery_budbee_express_delivery",eventId:"21168800220"},home_delivery_standard_delivery:{eventKey:"data_oc_delivery_home_delivery_standard_delivery",eventId:"21162400260"},pickup_in_place_locker:{eventKey:"data_oc_delivery_pickup_in_place_locker",eventId:"21168690451"},pickup_in_place:{eventKey:"data_oc_delivery_pickup_in_place",eventId:"21160660332"},express_pick_up_point:{eventKey:"data_oc_delivery_express_pick_up_point",eventId:"21162600320"},home_delivery_free_shipping:{eventKey:"data_oc_delivery_home_delivery_free_shipping",eventId:"21199070257"},home_delivery_home_delivery:{eventKey:"data_oc_delivery_home_delivery_home_delivery",eventId:"21174150326"},home_delivery_standard_green:{eventKey:"data_oc_delivery_home_delivery_standard_green",eventId:"21191010482"},home_delivery_standard_green_home_delivery_standard_green:{eventKey:"data_oc_delivery_home_del_std_green_home_delivery_standard_green",eventId:"21171740445"},pickup_in_place_free_shipping:{eventKey:"data_oc_delivery_pickup_in_place_free_shipping",eventId:"21171730144"},pickup_in_place_pickup_in_place:{eventKey:"data_oc_delivery_pickup_in_place_pickup_in_place",eventId:"21170890405"},ick_up_point_pick_up_point:{eventKey:"data_oc_delivery_pick_up_point_pick_up_point",eventId:"21249881663"},next_day_delivery_next_day_delivery:{eventKey:"data_oc_delivery_next_day_delivery_next_day_delivery",eventId:"21225592208"},standardlieferung_nach_hause_external_seller:{eventKey:"data_oc_delivery_standardlieferung_nach_hause_external_seller",eventId:"21239592065"},home_expedited:{eventKey:"data_oc_delivery_home_expedited",eventId:"21223982677"},express_delivery:{eventKey:"data_oc_delivery_express_delivery",eventId:"21233291972"},ship_to_store:{eventKey:"data_oc_delivery_ship_to_store",eventId:"21229291739"},climate_friendly_standard_home_delivery:{eventKey:"data_oc_delivery_climate_friendly_standard_home_delivery",eventId:"21202811953"},climate_friendly_parcel_locker_standard:{eventKey:"data_oc_delivery_climate_friendly_parcel_locker_standard",eventId:"21226541842"},home_delivery_next_day_green:{eventKey:"data_oc_delivery_home_delivery_next_day_green",eventId:"21249900811"},pick_up_in_store_pick_up_in_store:{eventKey:"data_oc_delivery_pick_up_in_store_pick_up_in_store",eventId:"21253271584"},ultra_next_day_delivery:{eventKey:"data_oc_delivery_ultra_next_day_delivery",eventId:"21239472243"},same_day_delivery:{eventKey:"data_oc_delivery_same_day_delivery",eventId:"21235751328"},next_day_shipping:{eventKey:"data_oc_delivery_next_day_shipping",eventId:"21233373095"},express_shipping:{eventKey:"data_oc_delivery_express_shipping",eventId:"21243241650"},standard_delivery_standard_delivery_standardlieferung_nach_hause_external_seller:{eventKey:"data_oc_delivery_std_del_std_del_std_nach_hause_ext_seller",eventId:"21233442302"},delivery_type_standard_delivery_standardlieferung_nach_hause_external_seller:{eventKey:"data_oc_delivery_std_del_stdlieferung_nach_hause_ext_seller",eventId:"21230191826"},climate_friendly_next_day_parcel_locker_delivery:{eventKey:"data_oc_delivery_climate_friendly_next_day_parcel_locker_del",eventId:"21209942103"},standard_delivery_standard_delivery:{eventKey:"data_oc_delivery_standard_delivery_standard_delivery",eventId:"21228521632"},climate_conscious_home_delivery:{eventKey:"data_oc_delivery_climate_conscious_home_delivery",eventId:"21322210357"},climate_conscious_home_delivery_climate_conscious_home_delivery:{eventKey:"data_oc_delivery_climate_consc_home_del_climate_consc_home_del",eventId:"21349360321"},climate_conscious_next_day_home_delivery:{eventKey:"data_oc_delivery_climate_conscious_next_day_home_delivery",eventId:"21342930751"},climate_conscious_parcel_locker_delivery:{eventKey:"data_oc_delivery_climate_conscious_parcel_locker_delivery",eventId:"21325720752"},climate_conscious_next_day_parcel_locker_delivery:{eventKey:"data_oc_delivery_climate_conscious_next_day_parcel_locker_deli",eventId:"21334460011"},climate_conscious_in_store_delivery:{eventKey:"data_oc_delivery_climate_conscious_in_store_delivery",eventId:"21341790232"},climate_conscious_in_store_delivery_climate_conscious_in_store_delivery:{eventKey:"data_oc_delivery_clim_consc_in_store_del_clim_consc_in_store_del",eventId:"21347180365"},}}}
if(b.page_is_productDetail===1||b.page_is_productDetail==="1"){b.optimizely_fs_event.push('pageview_pdp##20754641760');if(b.product_brand_origin[0]==="resell"){b.optimizely_fs_event.push('pageview_pdp_resell##21159970273');}else if(b.product_brand_origin[0]==="internal"){b.optimizely_fs_event.push('pageview_pdp_internal##21179140556');}else{b.optimizely_fs_event.push('pageview_pdp_external##21159970274');}}}}catch(e){utag.DB(e)}}];u.send=function(a,b){if(u.ev[a]||u.ev.all!==undefined){var c,d,e,f,i;u.data={transport_uri:"https://logx.optimizely.com/v1/events",uid:"",bpid:"",currency_value:{},market:"",touchpoint:"",event_name:[],event_id:[],revenue:[]};for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(b[d]!==undefined&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){if(e[f].indexOf('map.')>=0){var g=u.map[d].split(".");u.data[g[0]]=u.data[g[0]]||{};u.data[g[0]][g[1]]=b[d];}else{u.data[e[f]]=b[d];}}}}
function uuidv4(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16);});};function convertCurrency(d){var rate=u.data.map.currency_value[u.data.market];if(rate)return d*rate;return d;};function productLoop(){var c=[];u.data.articleTally={itemsBought:0,sale:0,reco:0,recoRev:0,norecoRev:0,internal:0,internalRev:0,external:0,externalRev:0,resell:0,resellRev:0,customTracking:[],customTrackingRev:[],};var recos=window.abTest?.store.get("abRecoArticles")||[];var storedArticles=JSON.parse(sessionStorage.getItem('abStoredArticles'))||[];storedArticles.forEach(function(d){u.data.articleTally.customTracking[d.event]=0;u.data.articleTally.customTrackingRev[d.event]=0;});var boughtDptItems={men:{items:0,rev:0},ladies:{items:0,rev:0},kids:{items:0,rev:0},home:{items:0,rev:0},beauty:{items:0,rev:0},baby:{items:0,rev:0},};b.product_quantity.forEach(function(el,i){var price,articleId,isSale=0,size,quantity,department,category,bo;quantity=parseInt(el);u.data.articleTally.itemsBought+=quantity;if(b.product_price_type[i].toLowerCase().indexOf("sale")!==-1){u.data.articleTally.sale+=quantity;u.data.articleTally.isSale=b.product_price_type[i].toLowerCase();}
price=Math.round(convertCurrency(b.product_list_price[i]));size=b.product_size_code[i];var hasInfo=b.product_category[i].indexOf('_')!==-1;department=hasInfo?b.product_category[i].split("_")[0].toLowerCase():'';category=hasInfo?b.product_category[i].split("_")[1].toLowerCase():'';articleId=b.product_article_id[i];if(recos.indexOf(articleId)!==-1){u.data.articleTally.reco+=quantity;u.data.articleTally.recoRev+=price;}else{u.data.articleTally.norecoRev+=price;}
if(boughtDptItems.hasOwnProperty(department)){boughtDptItems[department].items+=quantity;boughtDptItems[department].rev+=price;}
if(articleId==='1093297001001'||articleId==='1093297001'){u.data.articleTally.resell+=quantity;u.data.articleTally.resellRev+=price;}else{bo=b.product_brand_origin[i];u.data.articleTally[bo]+=quantity;u.data.articleTally[bo+'Rev']+=price;}
storedArticles.forEach(function(i){if(i.article===articleId){u.data.articleTally.customTracking[i.event]+=quantity;u.data.articleTally.customTrackingRev[i.event]+=price;}});c.push({id:articleId,price:price,quantity:quantity,department:department,category:category,size:size,sale:isSale.toString(),});});u.data.articles=c;u.data.articleTally.department=boughtDptItems;return;};function getAttr(b){var c=[];var d=JSON.parse(localStorage.getItem("optimizelyUserAttributes"));if(d){for(var e in d){if(b[e]){c.push({entity_id:String(u.data.map.attributes[e]),key:e,type:"custom",value:String(d[e]),});}}}
return c;};function transactionEvents(et){var c=[];var d=[];var ecom={};ecom.order_id=b.order_id;ecom.revenue=b.order_subtotal;ecom.shipping=b.order_shipping;ecom.payment=b.order_payment_type.trim().toLowerCase().replace(/\s/g,"_");ecom.delivery=b.order_delivery_method.trim().toLowerCase().replace(/[^a-z0-9]+/g,"_");d.push(Math.round(convertCurrency(ecom.revenue*100)));d.push(Math.round(convertCurrency(ecom.shipping*100)));d.push(Math.round((d[0]+d[1])/100));productLoop();if(et==="web"){c.push({eventName:"didConvert",tags:{revenue:d[0],bpid:u.data.bpid,transactionid:ecom.order_id}});c.push({eventName:"shippingCost",tags:{revenue:d[1],bpid:u.data.bpid,}});c.push({eventName:"revenue_and_shipping",tags:{bpid:u.data.bpid,value:Number(d[2])}});var articles=u.data.articles;articles.forEach(function(j){c.push({eventName:"article",tags:j});});c.push({eventName:"payment_type_"+ecom.payment});c.push({eventName:"delivery_type_"+ecom.delivery});c.push({eventName:"items_bought",tags:{value:u.data.articleTally.itemsBought}});var noSale=u.data.articleTally.itemsBought-u.data.articleTally.sale;c.push({eventName:"nosale_items_bought",tags:{value:noSale}});if(u.data.articleTally.sale>0){c.push({eventName:"sale_items_bought",tags:{value:u.data.articleTally.sale}});c.push({eventName:"transaction_sale"});}
if(u.data.articleTally.reco>0){c.push({eventName:"reco_items_bought",tags:{value:u.data.articleTally.reco}});c.push({eventName:"reco_revenue",tags:{value:u.data.articleTally.recoRev}});}
var noReco=u.data.articleTally.itemsBought-u.data.articleTally.reco;c.push({eventName:"no_reco_items_bought",tags:{value:noReco}});c.push({eventName:"no_reco_revenue",tags:{value:u.data.articleTally.norecoRev}});var boughtDptItems=u.data.articleTally.department;Object.keys(boughtDptItems).forEach(function(dpt){if(boughtDptItems[dpt].items>0){c.push({eventName:"transaction_"+dpt});c.push({eventName:dpt+"_items",tags:{value:boughtDptItems[dpt].items}});c.push({eventName:dpt+"_revenue",tags:{value:boughtDptItems[dpt].rev}});}});['internal','external','resell'].forEach(function(i){if(u.data.articleTally[i]>0){c.push({eventName:"data_oc_"+i+"_items",tags:{value:u.data.articleTally[i]}});c.push({eventName:"data_oc_"+i+"_revenue",tags:{value:u.data.articleTally[i+'Rev']}});}});Object.keys(u.data.articleTally.customTracking).forEach(function(a){if(u.data.articleTally.customTracking[a]>0){if(!a.includes('##')){var e=a+'Rev';c.push({eventName:a,tags:{value:u.data.articleTally.customTracking[a]}});c.push({eventName:e,tags:{value:u.data.articleTally.customTrackingRev[a]}});}}});}else{c.push({key:"data_oc_transaction",entity_id:"20602112472",revenue:d[0],tags:{bpid:u.data.bpid,transactionid:ecom.order_id}});c.push({key:"data_oc_delivery_cost",entity_id:"20607282902",revenue:d[1],});c.push({key:"revenue_and_shipping",entity_id:"20702172305",value:d[2]});var paymentFallback={eventKey:"data_oc_payment_unknown",eventId:"20910143112",};var mappedPaymentObj=u.data.map.payment[ecom.payment]||paymentFallback;var payment_event_key=mappedPaymentObj.eventKey;var payment_event_id=mappedPaymentObj.eventId;c.push({key:payment_event_key,entity_id:payment_event_id,});var deliveryFallback={eventKey:"data_oc_delivery_unknown",eventId:"20886253264",};var mappedDeliveryObj=u.data.map.delivery[ecom.delivery]||deliveryFallback;var delivery_event_key=mappedDeliveryObj.eventKey;var delivery_event_id=mappedDeliveryObj.eventId;c.push({key:delivery_event_key,entity_id:delivery_event_id,});c.push({key:"items_bought",entity_id:"20703890737",value:u.data.articleTally.itemsBought});if(u.data.articleTally.internal>0){c.push({key:"data_oc_internal_items",entity_id:"21118091631",value:u.data.articleTally.internal});c.push({key:"data_oc_internal_revenue",entity_id:"21140200284",value:u.data.articleTally.internalRev});}
if(u.data.articleTally.external>0){c.push({key:"data_oc_external_items",entity_id:"21129711625",value:u.data.articleTally.external});c.push({key:"data_oc_external_revenue",entity_id:"21120350897",value:u.data.articleTally.externalRev});}
if(u.data.articleTally.resell>0){c.push({key:"data_oc_resell_items",entity_id:"21155090262",value:u.data.articleTally.resell});c.push({key:"data_oc_resell_revenue",entity_id:"21135231137",value:u.data.articleTally.resellRev});}
if(u.data.articleTally.sale>0){c.push({key:"data_oc_sale_items",entity_id:"22100921947",value:u.data.articleTally.sale});}
Object.keys(u.data.articleTally.customTracking).forEach(function(a){if(u.data.articleTally.customTracking[a]>0){if(a.includes('##')){var o=a.split('##');c.push({key:o[0],entity_id:o[1],value:u.data.articleTally.customTracking[a]});}}});}
return c;}
u.tw=function(ep){window.optimizely=window.optimizely||[];ep.type="event";window.optimizely.push(ep);};u.tfs=function(ep){a.script_version="1.1";var b=JSON.stringify(ep);var c=new XMLHttpRequest;c.open("POST",u.data.transport_uri);c.setRequestHeader("Content-Type","application/json");c.send(b);};try{if(u.data.event_id.length<=0&&u.data.event_name.length<=0){return;}
if(u.data.event_name.length>0){var en=u.data.event_name;for(var i=0;i<en.length;i++){var payload={};if(en[i]==="PURCHASE"){var eta=transactionEvents('web');eta.forEach(function(ep){u.tw(ep);});}else{var ep={};if(en[i].indexOf('##')>0){var o=i.split('##');ep.eventName=o[0];ep.tags={value:Number(o[1])};u.tw(ep);}else{ep.eventName=en[i];u.tw(ep);}}}}
if(u.data.event_id.length>0&&tiq.tools.variable_is(u.data.uid)===true){var en=u.data.event_id;var ea=[];var timestamp=Date.now();for(var i=0;i<en.length;i++){var attr=getAttr(u.data.map.attributes);var payload={account_id:"2125530039",anonymize_ip:true,client_name:"HM/optly_web_client",client_version:"1.0.0",enrich_decisions:true,visitors:[{visitor_id:u.data.uid,attributes:attr,snapshots:[{decisions:[],events:[],},],},],};if(en[i]==="PURCHASE"){var eta=transactionEvents('fs');eta.forEach(function(ep){ep.timestamp=timestamp;ep.uuid=uuidv4();ea.push(ep);});}else{var o=en[i].split('##');var ep={key:o[0],entity_id:o[1],timestamp:timestamp,uuid:uuidv4()};if(o.length>2){ep.value=o[2];}
ea.push(ep);}}
payload.visitors[0].snapshots[0].events=ea;u.tfs(payload);}}catch(e){}
}};utag.o[loader].loader.LOAD(id);})("493","hm.goe");}catch(error){utag.DB(error);}