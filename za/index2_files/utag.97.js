//tealium universal tag - utag.97 ut4.0.202309282015, Copyright 2023 Tealium.com Inc. All Rights Reserved.
try{(function(id,loader){var u={id:id};utag.o[loader].sender[id]=u;u.ev={view:1};u.initialized=false;u.scriptrequested=false;u._event_data=[];if(utag.ut.typeOf===undefined){u.typeOf=function(e){return{}.toString
.call(e)
.match(/\s([a-zA-Z]+)/)[1]
.toLowerCase();};}else{u.typeOf=utag.ut.typeOf;}
u.map_func=function(arr,obj,item){var i=arr.shift();obj[i]=obj[i]||{};if(arr.length>0){u.map_func(arr,obj[i],item);}else{obj[i]=item;}};u.hasOwn=function(o,a){return o!=null&&Object.prototype.hasOwnProperty.call(o,a);};u.isEmptyObject=function(object){return Object.keys(object).every(function(key){if(u.hasOwn(object,key)){return false;}
return true;});};u.remove_empty=function(object){var type;Object.keys(utag.loader.GV(object)).forEach(function(key){type=u.typeOf(object[key]);if(type==='object'){u.remove_empty(object[key]);if(u.isEmptyObject(object[key])){try{delete object[key];}catch(e){object[key]=undefined;}}}else if(!((object[key]===0||object[key]===false)?!0:(type==='array'&&object[key].length===0)?!1:!!object[key])){try{delete object[key];}catch(e){object[key]=undefined;}}});return object;};u.setRevenue=function(){var price=u.data.commerce.$price;var revenue=0
if(Array.isArray(price)){price.forEach(function(item,index){var quantity=u.data.commerce.$quantity[index];revenue=revenue+Number(item)*quantity;})}else{revenue=Number(price);}
if(revenue){u.data.metadata.revenue=revenue;}};u.createContentItemsArray=function(){var contentItems=[{}];var commerce=u.remove_empty(u.data.commerce);if(!commerce.$canonical_identifier||commerce.$canonical_identifier.length===1){return[commerce];}
Object.keys(commerce).forEach(function(key){if(Array.isArray(commerce[key])&&(key!=='$keywords'&&key!=='$image_captions')){commerce[key].forEach(function(item,index){if(index>contentItems.length-1){contentItems.push({[key]:item})}
contentItems[index][key]=item;})}else{contentItems[0][key]=commerce[key];}})
if(Object.keys(contentItems[0]).length==0){return[];}
return contentItems;};u.events=['add_to_cart','add_to_wishlist','view_cart','initiate_purchase','add_payment_info','click_ad','purchase','reserve','spend_credits','view_ad','search','view_item','view_items','rate','share','initiate_stream','complete_stream','complete_registration','complete_tutorial','achieve_level','unlock_achievement','invite','login','start_trial','subscribe',]
u.map={};u.extend=[];u.send=function(utag_event,data_layer){if(u.ev[utag_event]||u.ev.all!==undefined){utag.DB('send:97');utag.DB(data_layer);var a,b,c,e,f;a=utag_event;b=data_layer;var _event_data={};var _event_list=[];u.data={branch_key:'key_live_efYbC7Ef0ITjK6X8A5vXoccoxxiN9rgf',base_url:'https://cdn.branch.io/branch-latest.min.js',init_options:{branch_view_id:'',branch_match_id:'',no_journeys:'',disable_entry_animation:'',disable_exit_animation:'',retries:'',retry_delay:'',timeout:'',metadata:'',nonce:'',tracking_disabled:''},event:{customer_event_alias:''},commerce:{$content_schema:'',$og_title:'',$og_description:'',$og_image_url:'',$canonical_identifier:'',$publicly_indexable:'',$price:'',$locally_indexable:'',$quantity:'',$sku:'',$product_name:'',$product_brand:'',$product_category:'',$product_variant:'',$rating_average:'',$rating_count:'',$rating_max:'',$creation_timestamp:'',$exp_date:'',$keywords:'',$address_street:'',$address_city:'',$address_region:'',$address_country:'',$address_postal_code:'',$latitude:'',$longitude:'',$image_captions:'',$condition:'',$custom_fields:''},metadata:{transaction_id:'',currency:'',revenue:'',shipping:'',tax:'',coupon:'',affiliation:'',description:'',purchase_loc:'',store_pickup:'',registration_id:''}};Object.keys(utag.loader.GV(u.map)).forEach(function(mapping_key){if(data_layer[mapping_key]!==undefined&&data_layer[mapping_key]!==''){var destinations=u.map[mapping_key].split(',');destinations.forEach(function(param){var splittedParam=param.split('.');var groupKey;var propertyKey;if(splittedParam.length>2){groupKey=splittedParam[1];propertyKey=splittedParam[2];if(u.data[groupKey][propertyKey]===''){_event_data[param]=data_layer[mapping_key];}}else if(splittedParam.length===2){groupKey=splittedParam[0];propertyKey=splittedParam[1];if(u.data[splittedParam[0]]){u.data[groupKey][propertyKey]=data_layer[mapping_key];}else{_event_data[param]=data_layer[mapping_key];}}
else{propertyKey=splittedParam[0];u.data[propertyKey]=data_layer[mapping_key];}})}else{var event_destinations=mapping_key.split(':');if(event_destinations.length===2&&String(data_layer[event_destinations[0]])===event_destinations[1]){if(u.map[mapping_key]){_event_list=_event_list.concat(u.map[mapping_key].split(','));}}}})
var eCommerceMapping=[{eCommerceData:data_layer._csku,dataKey:'commerce.$sku',isArray:true},{eCommerceData:data_layer._cprodname,dataKey:'commerce.$product_name',isArray:true},{eCommerceData:data_layer._cbrand,dataKey:'commerce.$product_brand',isArray:true},{eCommerceData:data_layer._ccat,dataKey:'commerce.$product_category',isArray:true},{eCommerceData:data_layer._ccity,dataKey:'commerce.$address_city',isArray:false},{eCommerceData:data_layer._cstate,dataKey:'commerce.$address_region',isArray:false},{eCommerceData:data_layer._ccountry,dataKey:'commerce.$address_country',isArray:false},{eCommerceData:data_layer._czip,dataKey:'commerce.$address_postal_code',isArray:false},{eCommerceData:data_layer._cprice,dataKey:'commerce.$price',isArray:true},{eCommerceData:data_layer._cquan,dataKey:'commerce.$quantity',isArray:true},{eCommerceData:data_layer._ccurrency,dataKey:'metadata.currency',isArray:false},{eCommerceData:data_layer._cpromo,dataKey:'metadata.coupon',isArray:false},{eCommerceData:data_layer._ctotal,dataKey:'metadata.revenue',isArray:false},{eCommerceData:data_layer._cship,dataKey:'metadata.shipping',isArray:false},{eCommerceData:data_layer._ctax,dataKey:'metadata.tax',isArray:false},{eCommerceData:data_layer._cprod,dataKey:'commerce.$canonical_identifier',isArray:false}];eCommerceMapping.forEach(function(dataObject){var splittedKey=dataObject.dataKey.split('.');var groupKey=splittedKey[0];var propertyKey=splittedKey[1];if(!dataObject.isArray){u.data[groupKey][propertyKey]=u.data[groupKey][propertyKey]||dataObject.eCommerceData||'';}else{if(dataObject.eCommerceData===undefined||!dataObject.isArray){return;}
if(dataObject.eCommerceData.length>0&&u.data[groupKey][propertyKey].length===0){u.data[groupKey][propertyKey]=dataObject.eCommerceData.slice(0);}}});if(!u.data.branch_key){utag.DB(u.id+': Tag not fired: Required branch_key not populated');return;}
u.setRevenue();u.loader_cb=function(){if(!u.scriptrequested){u.scriptrequested=true;branch.init(u.data.branch_key,u.remove_empty(u.data.init_options),function(err,data){if(err){utag.DB(u.id+': '+err);}});}
u.initialized=true;_event_list.forEach(function(event){Object.keys(_event_data).forEach(function(key){var splittedKey=key.split('.');var eventKey=splittedKey[0];var groupKey;var propertyKey;if(eventKey===event){if(splittedKey.length>2){groupKey=splittedKey[1]
propertyKey=splittedKey[2]
u.data[groupKey][propertyKey]=_event_data[key];}else{propertyKey=splittedKey[1]
u.data[propertyKey]=_event_data[key];}}})
if(u.events.indexOf(event)!==-1){branch.logEvent(event.toUpperCase(),u.remove_empty(u.data.metadata),u.createContentItemsArray(),u.data.event.customer_event_alias,function(err){if(err){utag.DB(u.id+': '+err);}});}else{const custom_data=u.remove_empty(u.data);delete custom_data.base_url
branch.logEvent(event,u.remove_empty(custom_data),function(err){if(err){utag.DB(u.id+': '+err);}});}})};if(!u.initialized){utag.ut.loader({type:'script',cb:u.loader_cb,loc:'script',src:u.data.base_url,id:'97'});}else{u.loader_cb();}}};utag.o[loader].loader.LOAD(id);})('97','dominos.canada');}catch(error){utag.DB(error);}
