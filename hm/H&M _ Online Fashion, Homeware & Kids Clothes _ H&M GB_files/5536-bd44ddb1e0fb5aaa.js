(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5536],{49034:function(e,n,t){"use strict";t.d(n,{Z:function(){return v}});var i=t(97582),o=t(67294),a=t(29815),l=t(94184),s=t.n(l),r=t(26273),c=t(68451),d=t.n(c),u=function(e){var n=e.children,t=e.className,a=e.isDelayed,l=e.isVisible,c=(0,i.__rest)(e,["children","className","isDelayed","isVisible"]),u=a?300:0;return o.createElement(r.ZP,{timeout:{enter:u,exit:300},in:!!l,unmountOnExit:!0},(function(e){return o.createElement("div",Object.assign({className:s()(d().container,d()[e],t)},c),n)}))},g=t(45057),h=t(60711),p=t.n(h),f=function(e){var n=e.handleCollapseToggle,t=e.toggleContent,l=e.toggleClassNames,r=void 0===l?[]:l,c=e.collapseClassNames,d=void 0===c?[]:c,h=e.shouldHideHeaderWhenExpanded,f=e.shouldShowToggleContentAfterChildren,m=e.shouldAnimate,C=void 0===m||m,E=e.isExpanded,v=e.isDisabled,y=e.children,b=e.onAnimationEnd,x=(e.testID,e.buttonTestID),I=e.id,T=(0,i.__rest)(e,["handleCollapseToggle","toggleContent","toggleClassNames","collapseClassNames","shouldHideHeaderWhenExpanded","shouldShowToggleContentAfterChildren","shouldAnimate","isExpanded","isDisabled","children","onAnimationEnd","testID","buttonTestID","id"]),N=(0,o.useRef)(null),O=(0,o.useRef)(null),Z=function(){b&&b()};(0,o.useEffect)((function(){N.current&&(E?(N.current.style.display="block",N.current.style.height="auto",N.current.style.opacity="1"):(N.current.style.display="none",N.current.style.height="0px",N.current.style.opacity="0"))}),[]);var S,_,j=(0,o.useCallback)((function(){var e;null===(e=N.current)||void 0===e||e.offsetHeight}),[N,O]);(0,o.useEffect)((function(){if(!O.current||!N.current)return function(){};var e,n=N.current.style.height;if(E&&"auto"===n||!E&&"0px"===n)return function(){};var t=parseInt((0,g.RQ)()["$transition-duration"],10);return E&&(N.current.style.display="block",N.current.style.opacity="1",j(),N.current.style.height=window.getComputedStyle(O.current).height,C?e=window.setTimeout((function(){N.current&&(Z(),N.current.style.height="auto")}),t):(Z(),N.current.style.height="auto")),E||(N.current.style.opacity="0",N.current.style.height=window.getComputedStyle(O.current).height,j(),N.current.style.height="0px",C?e=window.setTimeout((function(){N.current&&(Z(),N.current.style.display="none")}),t):Z()),function(){window.clearTimeout(e)}}),[E]),I&&(S="section-".concat(I),_="toggle-".concat(I));var A=function(e){return e?"function"===typeof e?e(E):e:null},H=function(e){n(e)},k=function(){return o.createElement("button",Object.assign({type:"button",disabled:v,onClick:H,className:s()(p().toggle,r.join(" ")),"aria-expanded":E,"aria-disabled":!!v,"data-testid":x,id:_,"aria-controls":S},T),A(t))},w=function(){return h?o.createElement(u,{isVisible:!E},k()):k()};return o.createElement(o.Fragment,null,!f&&w(),o.createElement("div",{ref:N,id:S,"aria-labelledby":_,"aria-hidden":!E,hidden:!E,className:s()(p().collapse,C?p().collapseAnim:p().collapseStill),role:"region"},o.createElement("div",{ref:O,className:s().apply(void 0,(0,a.Z)(d))},A(y))),f&&w())},m=function(e){var n=e.onClick,t=(0,i.__rest)(e,["onClick"]),a=(0,o.useState)(!1),l=a[0],s=a[1];(0,o.useEffect)((function(){"function"===typeof n&&n(l)}),[l]);return o.createElement(f,Object.assign({handleCollapseToggle:function(e){e.preventDefault(),s(!l)},isExpanded:l},t))},C=function(e){var n=e.onClick,t=e.isExpanded,a=(0,i.__rest)(e,["onClick","isExpanded"]);return o.createElement(f,Object.assign({handleCollapseToggle:function(e){e.preventDefault(),"function"===typeof n&&n(t,e)},isExpanded:t},a))},E=function(e){var n=e.controlled,t=e.isExpanded,a=e.shouldAnimate,l=(0,i.__rest)(e,["controlled","isExpanded","shouldAnimate"]);return n?o.createElement(C,Object.assign({isExpanded:t,shouldAnimate:a},l)):o.createElement(m,Object.assign({},l))};E.defaultProps={toggleClassNames:[],toggleContent:o.createElement(o.Fragment,null,"Toggle Content"),children:function(){return"Panel Content"}};var v=E},72610:function(e,n,t){"use strict";var i=t(67294),o=t(94184),a=t.n(o),l=t(17402),s=t.n(l);n.Z=function(e){var n=e.initiallyExpandedId,t=void 0===n?null:n,o=e.children,l=e.className,r=e.toggleIconType,c=void 0===r?"chevron":r,d=e.shouldHighlightOpenToggleIcon,u=e.accordionType,g=void 0===u?"slim":u,h=e.shouldAnimate,p=void 0===h||h,f=e.shouldCollapseSibling,m=void 0===f||f,C=e.shouldCollapseSelectedItem,E=void 0===C||C,v=e.onChange,y=e.buttonTestID,b=e.iconSize,x=e.setIsAccordionExpanded,I=(0,i.useState)(t),T=I[0],N=I[1];return i.createElement("div",{className:a()(s().container,l),"data-testid":y},i.Children.map(o,(function(e){return i.isValidElement(e)?i.cloneElement(e,{isExpanded:e.props.id===T,onClick:function(){if(m){if(E&&T===e.props.id)return N(null),void(null===x||void 0===x||x(!1));T!==e.props.id&&v&&(v(e.props.id),null===x||void 0===x||x(!0)),N(e.props.id)}},toggleIconType:c,shouldHighlightOpenToggleIcon:d,accordionType:g,shouldAnimate:p,shouldCollapseSibling:m,iconSize:b}):e})))}},25241:function(e,n,t){"use strict";t.d(n,{Z:function(){return v}});var i=t(29815),o=t(67294),a=t(94184),l=t.n(a),s=t(49034),r=t(53287),c=t(14235),d=t(15481),u=t(8718),g={plusAndMinus:{open:r.Z,closed:c.Z},chevron:{open:d.Z,closed:u.Z},none:{open:function(){return null},closed:function(){return null}}},h=t(85035),p=t.n(h),f=t(15342),m=t(22671),C=t.n(m),E=function(e){var n=e.isExpanded,t=e.headerCenterContent,i=e.headerLeftContent,a=e.headerRightContent,s=e.headerLeftIcon,r=e.headerOpenIcon,c=e.headerClosedIcon,d=e.accordionType,u=Object.assign(Object.assign({},"definition"===d&&{bold:!0}),"slimbold"===d&&{bold:!0});return o.createElement("div",{className:C().headerContainer},s&&o.createElement(f.Z,Object.assign({Tag:"span"},u,{className:C().headerLeftIcon}),s),i&&o.createElement(f.Z,Object.assign({Tag:"span"},u,{className:l()(C().headerLeft,"definition"===d&&C().uppercase)}),i),t&&o.createElement(f.Z,Object.assign({Tag:"span"},u,{className:l()(C().headerCenter,"definition"===d&&C().uppercase)}),t),a&&o.createElement(f.Z,Object.assign({Tag:"span"},u,{className:C().headerRight})," ",a),n?r:c)},v=function(e){var n=e.isExpanded,t=e.headerCenterContent,a=e.headerLeftContent,r=e.headerRightContent,c=e.headerLeftIcon,d=e.children,u=e.onClick,h=e.id,f=e.onOpening,m=e.onClosing,C=e.toggleIconType,v=void 0===C?"chevron":C,y=e.shouldHighlightOpenToggleIcon,b=e.accordionType,x=void 0===b?"slim":b,I=e.shouldAnimate,T=void 0===I||I,N=e.shouldCollapseSibling,O=void 0===N||N,Z=e.className,S=e.toggleClassNames,_=e.collapseClassNames,j=e.hasStartSpacing,A=void 0===j||j,H=e.iconSize,k=void 0===H?"normal":H,w=(0,o.useState)(n),L=w[0],D=w[1],R=function(e){switch(e){case"definition":return p().definitionItem;case"filled":return p().filledItem;default:return p().slimItem}}(x),z=g[v].open,P=g[v].closed;return(0,o.useEffect)((function(){O&&D(n)}),[n]),o.createElement("div",{className:l()(R,Z)},o.createElement(s.Z,{shouldAnimate:T,controlled:!0,isExpanded:L,toggleContent:o.createElement(E,{accordionType:x,isExpanded:L,headerLeftContent:a,headerCenterContent:t,headerRightContent:r,headerLeftIcon:c,headerOpenIcon:o.createElement(z,Object.assign({className:l()(y&&p().highlightOpenToggleIcon),"data-testid":"".concat(v,"Open")},k&&{size:k})),headerClosedIcon:o.createElement(P,Object.assign({"data-testid":"".concat(v,"Closed")},k&&{size:k}))}),toggleClassNames:[p().toggle].concat((0,i.Z)(L?[p().expandedToggle]:[]),[S||""]),collapseClassNames:[p().collapse,A?"":p().hasNoStartSpacing,_||""],onClick:function(){O?u&&u():(f&&!L&&f(),m&&L&&m(),D(!L))},id:h},d))}},8718:function(e,n,t){"use strict";var i=t(67294),o=t(61001);n.Z=function(e){return i.createElement(o.Z,Object.assign({},e),i.createElement("path",{d:"M12 14.9l4.95-4.95.707.707-4.95 4.95-.707.707-5.657-5.657.707-.707L12 14.9z"}))}},15481:function(e,n,t){"use strict";var i=t(67294),o=t(61001);n.Z=function(e){return i.createElement(o.Z,Object.assign({},e),i.createElement("path",{d:"M12 9.757l4.95 4.95.707-.707-4.95-4.95L12 8.343 6.343 14l.707.707L12 9.757z"}))}},53287:function(e,n,t){"use strict";var i=t(67294),o=t(61001);n.Z=function(e){return i.createElement(o.Z,Object.assign({},e),i.createElement("path",{d:"M2 12h20v1H2z"}))}},14235:function(e,n,t){"use strict";var i=t(67294),o=t(61001);n.Z=function(e){return i.createElement(o.Z,Object.assign({},e),i.createElement("path",{d:"M13 2v10h10v1H13v10h-1V13H2v-1h10V2h1z"}))}},60711:function(e){e.exports={toggle:"L4c0",collapse:"yEXP",collapseAnim:"EfHH",collapseStill:"__5Yg3"}},68451:function(e){e.exports={container:"Ev64",entering:"yVoL",entered:"__6HUH",exiting:"K_ux"}},17402:function(e){e.exports={container:"KHva"}},85035:function(e){e.exports={toggle:"AEUK",slimItem:"APhv",collapse:"__8Sm0",filledItem:"Qo7H",expandedToggle:"jrDn",definitionItem:"CiRS",hasNoStartSpacing:"BZcP",highlightOpenToggleIcon:"I5Zq"}},22671:function(e){e.exports={headerContainer:"_XMY",headerCenter:"BRre",headerLeft:"F88Q",headerRight:"JyW1",headerLeftIcon:"CPyT"}}}]);