(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[645],{20645:function(e,n,t){"use strict";t.d(n,{Z:function(){return h}});var r=t(97582),s=t(67294),a=t(60917),o=t(55596),c=t(828),i=t(61403),u=t(94184),l=t.n(u),d=t(59526),v=t.n(d),f=function(e){var n=(0,c.Z)((0,i.Z)(e,v()),1)[0];return s.createElement("span",{className:l()(v().container,n,e.className)})},g=t(28933),h=function(e){var n=e.copyKey,t=void 0===n?"":n,c=e.replacements,i=e.shouldSanitize,u=void 0===i||i,l=e.className,d=e.customReplacementFunction,v=(0,r.__rest)(e,["copyKey","replacements","shouldSanitize","className","customReplacementFunction"]),h=(0,a.Z)(),b=h.showLabelKeys,m=h.isFetchingLabels;if(b)return s.createElement(s.Fragment,null,t);if(m)return s.createElement(f,{marginless:!0,small:!0});var L=(0,o.Z)(t,{replacements:c});return d?s.createElement(s.Fragment,null,d(L)):s.createElement(g.Z,Object.assign({className:l,input:L,sanitized:u},v))}},60917:function(e,n,t){"use strict";t.d(n,{Z:function(){return F}});var r,s=t(828),a=t(67294),o=t(61890),c=t(11628),i=t(83598),u=t(7841),l=function(e,n){var t=(0,u.Z)(),r=(0,a.useState)((function(){try{return i.Z&&window.sessionStorage.getItem(e)||n}catch(t){return c.ZP.error("failed to read from sessionStorage ".concat(t)),n}})),s=r[0],o=r[1];return[s,(0,a.useCallback)((function(n){try{t()&&o(n),window.sessionStorage.setItem(e,n)}catch(r){c.ZP.error("failed to write to sessionStorage ".concat(r))}}),[])]},d=t(69835),v=t(39475),f=t(29815),g=t(97582),h=t(4725),b=t(95108),m=t(36926),L=t(59410),_=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e?e.reduce((function(e,t){return t in n&&(e[t]=n[t]),e}),{}):n},w=t(89657),Z=function(e,n,t,r,s){return(0,g.__awaiter)(void 0,void 0,void 0,(function(){var a,o,i,u;return(0,g.__generator)(this,(function(l){switch(l.label){case 0:return l.trys.push([0,2,,3]),[4,m.ZP.get("i18n.json",{use:{apiVersion:!1,locale:b.W.use.locale||!!n},customLocale:n,headers:Object.assign(Object.assign(Object.assign({},(0,L.XF)()),(0,L.rJ)()),t&&(0,L.yP)())})];case 1:return a=l.sent(),o=a.data,i=s?_(s,o):o,e&&(0,w.Hz)(i,n),null===r||void 0===r||r.info(a,"fetchAemLabels success"),[2,i];case 2:return u=l.sent(),c.ZP.error(u),null===r||void 0===r||r.error(u,"fetchAemLabels error"),[2,{}];case 3:return[2]}}))}))},p=t(83067),y=function(e,n,t,r,s,a){return(0,g.__awaiter)(void 0,void 0,void 0,(function(){var o,i,u,l;return(0,g.__generator)(this,(function(d){switch(d.label){case 0:return d.trys.push([0,2,,3]),[4,m.ZP.get("labels",{use:{locale:b.W.use.locale||!!n},customLocale:n,headers:Object.assign(Object.assign(Object.assign(Object.assign({},(0,L.XF)()),(0,L.rJ)()),(0,L.h5)(t)),r&&(0,L.yP)())})];case 1:return o=d.sent(),i=o.data,u=a?_(a,i):i,e&&(0,w.Xn)(u,n),(0,p.k)(),null===s||void 0===s||s.info(o,"fetchHybrisLabels success"),[2,u];case 2:return l=d.sent(),c.ZP.error(l),null===s||void 0===s||s.error(l,"fetchHybrisLabels error"),[2,{}];case 3:return[2]}}))}))},S=t(14924),I=t(34155),k=function(e,n,t,r){return"".concat(I.env.LSL_DOMAIN,"/lsl-service/api/translation/key/").concat(e,"-").concat(n.toUpperCase(),"?compressed=true&userid=").concat(t).concat(I.env.LSL_BRAND_ID?"&brandId=".concat(I.env.LSL_BRAND_ID):"","&mastercopyFallback=true").concat(r?"&file=".concat(r):"")},E={no_no:"nb_no",hw_il:"he_IL"},P=function(e,n){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments.length>3?arguments[3]:void 0,a=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0;return(0,g.__awaiter)(void 0,void 0,void 0,(function(){var u,l,d,v,h,b,m,_,Z;return(0,g.__generator)(this,(function(g){switch(g.label){case 0:if(l={},!n)return[2,l];if(d=e||(0,o.Z)(),v=(0,s.Z)(null===(u=E[d]||d)||void 0===u?void 0:u.split("_"),2),h=v[0],b=v[1],!h||!b)return[2,l];g.label=1;case 1:return g.trys.push([1,3,,4]),[4,L.ZP.get(k(h,b,n,r),{headers:Object.assign({"lsl-api-key":I.env.LSL_API_KEY,"lsl-akamai-key":I.env.LSL_AKAMAI_KEY},a&&(0,L.yP)()),shouldRemoveData:!0})];case 2:return _=g.sent(),l=(m=Object).assign.apply(m,[{}].concat((0,f.Z)(null===_||void 0===_?void 0:_.data.data.map((function(e){return(0,S.Z)({},e.key,e.translation)}))))),t&&(0,w.U)(l,n,d,r),(0,p.k)(),null===i||void 0===i||i.info(_,"fetchLslLabels success"),[3,4];case 3:return Z=g.sent(),c.ZP.error(Z,Z),null===i||void 0===i||i.error(Z,"fetchLslLabels error"),[3,4];case 4:return[2,l]}}))}))};!function(e){e.Aem="aemLabels",e.Hybris="hybrisLabels",e.Lsl="lslLabels"}(r||(r={}));var j=function(e,n,t){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"",o=arguments.length>6?arguments[6]:void 0,c=arguments.length>7?arguments[7]:void 0,i=arguments.length>8?arguments[8]:void 0;return(0,g.__awaiter)(void 0,void 0,void 0,(function(){var u,l,v,b,m;return(0,g.__generator)(this,(function(g){switch(g.label){case 0:return u=(0,h.v3)(n),l=(0,h.gz)(n),v=!!t&&(0,h.wj)(t,n,s),b=!u,e&&e(d.v.Loading),[4,Promise.all((0,f.Z)(b?[Z(r,n,o,c,i)]:[{}]).concat((0,f.Z)(l?[{}]:[y(r,n,a,o,c,i)]),(0,f.Z)(v?[{}]:[P(n,t,r,s,o,c)])))];case 1:return m=g.sent(),e&&e(d.v.LoadedSuccess),[2,{hybrisLabels:r&&l?l:m[1],lslLabels:(r&&v?v:m[2])||void 0,aemLabels:r&&!b?u:m[0]}]}}))}))},A="FETCHING_LABELS",N=t(38897),O=!1,F=function(){var e=(0,N.Z)(),n=(0,s.Z)(l(A,!1),2),t=n[0],r=n[1],c=(0,o.Z)(),i="labels_aem_".concat(c),u="labels.hybris.".concat(c),f=(0,v.s)()?"visibilitychange":"beforeunload";return(0,a.useEffect)((function(){var n=!window.sessionStorage.getItem(A),t=!!window.sessionStorage.getItem(i),s=!!window.sessionStorage.getItem(u),a=!t;e?r(d.v.LoadedSuccess):(n||a&&!s)&&j(r)}),[]),(0,a.useEffect)((function(){if(!(sessionStorage.getItem(A)!==d.v.LoadedSuccess))return function(){};var e=window.setInterval((function(){sessionStorage.getItem(A)===d.v.LoadedSuccess&&(r(d.v.LoadedSuccess),window.clearInterval(e))}),250);return function(){return window.clearInterval(e)}}),[]),(0,a.useEffect)((function(){O||(O=!0,window.addEventListener(f,(function(){window.sessionStorage.removeItem(A)})))}),[]),{allLabels:(0,p.Z)(),isFetchingLabels:t!==d.v.LoadedSuccess,showLabelKeys:e}}},7841:function(e,n,t){"use strict";var r=t(67294);n.Z=function(){var e=(0,r.useRef)(!1);return(0,r.useEffect)((function(){return e.current=!0,function(){e.current=!1}}),[]),(0,r.useCallback)((function(){return e.current}),[])}},59526:function(e){e.exports={container:"kM7Y",shimmer:"k78s",small:"l1md",marginless:"wCDw"}}}]);