import e from"lodash";import{onMounted as t,watch as a,inject as r,toRefs as n,computed as l,getCurrentInstance as o,ref as i,provide as s,onBeforeMount as u,onBeforeUnmount as c,onBeforeUpdate as v,onUpdated as p,onUnmounted as f,reactive as d}from"composition-api";import"moment";function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function y(e,t,a,r,n,l,o){try{var i=e[l](o),s=i.value}catch(e){return void a(e)}i.done?t(s):Promise.resolve(s).then(r,n)}function g(e){return function(){var t=this,a=arguments;return new Promise((function(r,n){var l=e.apply(t,a);function o(e){y(l,r,n,o,i,"next",e)}function i(e){y(l,r,n,o,i,"throw",e)}o(void 0)}))}}function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var C,w;C=function(e){var t=function(e){var t,a=Object.prototype,r=a.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},l=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function s(e,t,a){return Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,a){return e[t]=a}}function u(e,t,a,r){var n=t&&t.prototype instanceof m?t:m,l=Object.create(n.prototype),o=new A(r||[]);return l._invoke=function(e,t,a){var r=v;return function(n,l){if(r===f)throw new Error("Generator is already running");if(r===d){if("throw"===n)throw l;return S()}for(a.method=n,a.arg=l;;){var o=a.delegate;if(o){var i=x(o,a);if(i){if(i===h)continue;return i}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(r===v)throw r=d,a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);r=f;var s=c(e,t,a);if("normal"===s.type){if(r=a.done?d:p,s.arg===h)continue;return{value:s.arg,done:a.done}}"throw"===s.type&&(r=d,a.method="throw",a.arg=s.arg)}}}(e,a,o),l}function c(e,t,a){try{return{type:"normal",arg:e.call(t,a)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var v="suspendedStart",p="suspendedYield",f="executing",d="completed",h={};function m(){}function y(){}function g(){}var b={};s(b,l,(function(){return this}));var C=Object.getPrototypeOf,w=C&&C(C(E([])));w&&w!==a&&r.call(w,l)&&(b=w);var O=g.prototype=m.prototype=Object.create(b);function j(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function $(e,t){function a(n,l,o,i){var s=c(e[n],e,l);if("throw"!==s.type){var u=s.arg,v=u.value;return v&&"object"==typeof v&&r.call(v,"__await")?t.resolve(v.__await).then((function(e){a("next",e,o,i)}),(function(e){a("throw",e,o,i)})):t.resolve(v).then((function(e){u.value=e,o(u)}),(function(e){return a("throw",e,o,i)}))}i(s.arg)}var n;this._invoke=function(e,r){function l(){return new t((function(t,n){a(e,r,t,n)}))}return n=n?n.then(l,l):l()}}function x(e,a){var r=e.iterator[a.method];if(r===t){if(a.delegate=null,"throw"===a.method){if(e.iterator.return&&(a.method="return",a.arg=t,x(e,a),"throw"===a.method))return h;a.method="throw",a.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=c(r,e.iterator,a.arg);if("throw"===n.type)return a.method="throw",a.arg=n.arg,a.delegate=null,h;var l=n.arg;return l?l.done?(a[e.resultName]=l.value,a.next=e.nextLoc,"return"!==a.method&&(a.method="next",a.arg=t),a.delegate=null,h):l:(a.method="throw",a.arg=new TypeError("iterator result is not an object"),a.delegate=null,h)}function q(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function P(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function A(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(q,this),this.reset(!0)}function E(e){if(e){var a=e[l];if(a)return a.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function a(){for(;++n<e.length;)if(r.call(e,n))return a.value=e[n],a.done=!1,a;return a.value=t,a.done=!0,a};return o.next=o}}return{next:S}}function S(){return{value:t,done:!0}}return y.prototype=g,s(O,"constructor",g),s(g,"constructor",y),y.displayName=s(g,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,s(e,i,"GeneratorFunction")),e.prototype=Object.create(O),e},e.awrap=function(e){return{__await:e}},j($.prototype),s($.prototype,o,(function(){return this})),e.AsyncIterator=$,e.async=function(t,a,r,n,l){void 0===l&&(l=Promise);var o=new $(u(t,a,r,n),l);return e.isGeneratorFunction(a)?o:o.next().then((function(e){return e.done?e.value:o.next()}))},j(O),s(O,i,"Generator"),s(O,l,(function(){return this})),s(O,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var a in e)t.push(a);return t.reverse(),function a(){for(;t.length;){var r=t.pop();if(r in e)return a.value=r,a.done=!1,a}return a.done=!0,a}},e.values=E,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(P),!e)for(var a in this)"t"===a.charAt(0)&&r.call(this,a)&&!isNaN(+a.slice(1))&&(this[a]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var a=this;function n(r,n){return i.type="throw",i.arg=e,a.next=r,n&&(a.method="next",a.arg=t),!!n}for(var l=this.tryEntries.length-1;l>=0;--l){var o=this.tryEntries[l],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var s=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(s&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(s){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var n=this.tryEntries[a];if(n.tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var l=n;break}}l&&("break"===e||"continue"===e)&&l.tryLoc<=t&&t<=l.finallyLoc&&(l=null);var o=l?l.completion:{};return o.type=e,o.arg=t,l?(this.method="next",this.next=l.finallyLoc,h):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.finallyLoc===e)return this.complete(a.completion,a.afterLoc),P(a),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var a=this.tryEntries[t];if(a.tryLoc===e){var r=a.completion;if("throw"===r.type){var n=r.arg;P(a)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(e,a,r){return this.delegate={iterator:E(e),resultName:a,nextLoc:r},"next"===this.method&&(this.arg=t),h}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},C(w={exports:{}},w.exports);var O=function t(a){return a instanceof File?{lastModified:(r=a).lastModified,name:r.name,size:r.size,type:r.type}:a instanceof Date?a.toString():Array.isArray(a)?a.map(t):"object"==typeof a&&null!==a?e.mapValues(a,t):a;var r};var j=function(r,n,l){var o=l.form$,i=l.el$,s=l.fire,u=l.dirt,c=l.validate,v=l.value;t((()=>{a(v,((t,a)=>{var r,n;(r=t,n=a,e.isEqual(O(r),O(n)))||(s("change",t,a,i.value),u&&u(),c&&o.value.shouldValidateOnChange&&c())}),{immediate:!1,deep:!0})}))},$=function(e,t,a){return{form$:r("form$")}},x=function(e,t,a){return{theme:r("theme")}},q=function(e,t,a){var{layout:r,inline:o}=n(e);return{elementLayout:l((()=>o.value||!r.value?"ElementLayoutInline":r.value))}},P=function(e,t,a){var{name:r}=n(e),i=o(),s=l((()=>{var e=(e,a)=>e&&(void 0!==t.expose&&e.$options.name&&e.$options.name.match(/^[a-zA-Z\-]*Element$/)||void 0===t.expose&&e.hasOwnProperty("el$")&&"function"!=typeof e.el$)?e.el$:e.$parent?a(e.$parent,a):null;return e(i.parent.proxy,e)})),u=l((()=>s.value&&s.value.path?s.value.path+"."+r.value:r.value)),c=l((()=>s.value&&s.value.dataPath?s.value.dataPath+"."+r.value:r.value)),v=l((()=>!1));return{parent:s,path:u,dataPath:c,flat:v}},A=function(t,a,r){var{parent:o,conditions:s}=n(t),u=r.form$,c=r.path||i(null),v=r.el$||i(void 0),p=i(s.value);return{available:l((()=>!u.value.conditions||!(o&&o.value&&void 0!==o.value.available&&!o.value.available)&&(!p.value||!p.value.length||!e.some(p.value,(e=>!u.value.$vueform.services.condition.check(e,c.value,u.value,v.value)))))),updateConditions:()=>{p.value=s.value}}},E=function(t,r,o){var s,u,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{name:v,type:p}=n(t),f=o.parent,d=o.defaultValue,h=o.dataPath,m=o.form$,y=i(void 0);m.value.isSync?y.value=e.get(m.value.model,h.value):f.value&&-1!==["object","list","multifile"].indexOf(f.value.type)&&(y.value=f.value.value[v.value]);var g=i(d.value instanceof File?d.value:e.cloneDeep(d.value)),b=l({get:(null===(s=c.value)||void 0===s?void 0:s.get)||function(){var t;return void 0!==(t=m.value.isSync?e.get(m.value.model,h.value):f.value&&-1!==["object","list","multifile"].indexOf(f.value.type)?f.value.value[v.value]:g.value)?t:d.value instanceof File?d.value:e.cloneDeep(d.value)},set:(null===(u=c.value)||void 0===u?void 0:u.set)||function(e){if(m.value.isSync)m.value.updateModel(h.value,e);else if(f.value&&-1!==["list","multifile"].indexOf(f.value.type)){var t=f.value.value.map(((t,a)=>a==v.value?e:t));f.value.update(t)}else f.value&&-1!==["object"].indexOf(f.value.type)?f.value.value=Object.assign({},f.value.value,{[v.value]:e}):g.value=e}}),C=l({get:()=>b.value,set(e){b.value=e}});return void 0!==c.init&&!1===c.init||void 0===y.value&&(b.value=d.value instanceof File?d.value:e.cloneDeep(d.value)),a(p,(()=>{b.value=d.value instanceof File?d.value:e.cloneDeep(d.value)})),{initialValue:y,internalValue:g,value:b,model:C}},S=function(t,a,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{submit:i,formatData:s,formatLoad:u,name:c}=n(t),v=r.form$,p=r.available,f=r.value,d=r.resetValidators,h=r.defaultValue,m=r.nullValue,y=e=>{if(o.setValue)return o.setValue(e);f.value=e},b=l((()=>({[c.value]:f.value}))),C=l((()=>p.value&&i.value?s.value?s.value(c.value,f.value,v.value):{[c.value]:f.value}:{})),w=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];y(t&&u.value?u.value(e,v.value):e)},O=e=>{y(e)},j=()=>{y(e.cloneDeep(m.value))},$=()=>{y(e.cloneDeep(h.value)),d()},x=function(){var e=g((function*(){}));return function(){return e.apply(this,arguments)}}();return{data:b,requestData:C,load:w,update:O,clear:j,reset:$,prepare:x}},L=function(t,a,r){var{default:o,name:i}=n(t),s=r.nullValue,u=r.form$,c=r.parent;return{defaultValue:l((()=>{var t;return c&&c.value&&!c.value.mounted?t=c.value.defaultValue[i.value]:!u.value.mounted&&u.value.options.default[i.value]&&(t=u.value.options.default[i.value]),void 0!==t?t instanceof File?new File([t],t.name,t):e.cloneDeep(t):void 0!==o.value?o.value instanceof File?new File([o.value],o.value.name,o.value):e.cloneDeep(o.value):e.cloneDeep(s.value)}))}},F=function(e,t,a){var{label:r}=n(e),o=a.form$,i=a.el$;return{hasLabel:l((()=>{var e,a;return!!(o.value.options.forceLabels||r.value||i.value.slots.label||null!==(e=i.value.$slots)&&void 0!==e&&e.label||void 0===t.expose&&null!==(a=i.value.$scopedSlots)&&void 0!==a&&a.label)}))}},V=function(e,t,a){var{columns:r,presets:o}=n(e),i=a.form$,s=a.theme,u=a.hasLabel;return{columnsClasses:l((()=>{var e=i.value.$vueform.config;return new i.value.$vueform.services.columns({configPresetColumns:e.usePresets,configColumns:e.columns,formPresetColumns:i.value.options.presets,formColumns:i.value.options.columns,elementPresetColumns:o.value,elementColumns:r.value},u.value,s.value.columns,e.presets).classes}))}},D=function(e){return void 0===e||"string"!=typeof e?e:e.match(/^-*\d+$/)?parseInt(e,10):e.match(/^\d+\.\d+$/)?parseFloat(e):e},k=function(a,r,d){var h={onBeforeMount:u,onMounted:t,onBeforeUpdate:v,onUpdated:p,onBeforeUnmount:c,onUnmounted:f},m=o(),y=d.form$,g=d.fire,{assignToParent:b,removeFromParent:C}=function(e,t,a){var{name:r}=n(e),l=o(),i=a.form$;return{assignToParent:(e,t)=>{e.children$Array?e.children$Array.push(l.proxy):e.elements$?i.value.$set(e.elements$,r.value,l.proxy):t(e.$parent,t)},removeFromParent:(e,t)=>{e.children$Array?e.children$Array.splice(e.children$Array.map((e=>D(e.name))).indexOf(D(r.value)),1):e.elements$?i.value.$delete(e.elements$,r.value):t(e.$parent,t)}}}(a,0,{form$:y}),w=i(!1),O=i(!0),j=l((()=>!1)),$=l((()=>!1)),x=l((()=>!1)),q=l((()=>!1)),P=l((()=>O.value)),A=l((()=>m.proxy));return s("el$",A),u((()=>{b(m.proxy.$parent,b)})),t((()=>{w.value=!0})),c((()=>{C(m.proxy.$parent,C)})),Object.values(["onBeforeCreate","onCreated"]).forEach((t=>{g(e.lowerFirst(t.replace("on","")),A.value)})),Object.keys(h).forEach((t=>{h[t]((()=>{g(e.lowerFirst(t.replace("on","")),A.value)}))})),{el$:A,isStatic:j,isFileType:$,isArrayType:q,isImageType:x,isActive:P,active:O,mounted:w,activate:()=>{O.value=!0},deactivate:()=>{O.value=!1}}},_=function(t,a,r){var{name:o,floating:i,placeholder:s,label:u,fieldName:c}=n(t),v=r.form$;return{genericName:l((()=>c&&c.value?c.value:u&&u.value?u.value:i&&i.value?i.value:s&&s.value&&v.value.options.floatPlaceholders?s.value:e.upperFirst(o.value).replace(/_|-/g," ")))}},T=function(t,a,r){var{size:o,view:u,views:c,presets:v}=n(t),p=a.name,f=r.available,d=r.active,h=r.form$,m=r.parent,y=i(!1),g=l((()=>f.value&&!y.value&&d.value)),b=l((()=>{var t;return o.value?t=o.value:e.each(v.value,(e=>{var a=h.value.$vueform.config.presets[e];a&&a.size&&(t=a.size)})),t||(t=m.value?m.value.Size:h.value.Size),t})),C=l((()=>u.value?u.value:w.value[p.value])),w=l((()=>{var t=h.value.Views;return e.each(v.value,(e=>{var a=h.value.$vueform.config.presets[e];a&&a.views&&(t=Object.assign({},t,a.views))})),t=Object.assign({},t,c.value)}));return s("Size",b),s("View",C),s("Views",w),{hidden:y,visible:g,Size:b,View:C,Views:w,hide:()=>{y.value=!0},show:()=>{y.value=!1}}},N=function(t,a,r){var{templates:o,presets:i}=n(t),s=a.name,u=r.theme,c=r.View,v=r.form$,p=l((()=>{var t={};return e.each(i?i.value:[],(e=>{var a=v.value.$vueform.config.presets[e];a&&a.templates&&(t=Object.assign({},t,a.templates))})),m(m(m({},u.value.templates),t),o?o.value:{})})),f=l((()=>c&&c.value&&p.value["".concat(s.value,"_").concat(c.value)]?p.value["".concat(s.value,"_").concat(c.value)]:p.value[s.value]));return{Templates:p,template:f}},B=function(t,a,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};n(t);var i=r.el$,s=["label","info","description","before","between","after"],u=["checkbox","radio","option","single-label","multiple-label","tag","no-results","no-options","after-list","before-list","placeholder","group-label","caret","clear","spinner","option","default"],c=l((()=>{var t={};return s.filter((e=>-1!==o.slots.indexOf(e))).forEach((a=>{var r=i.value.slots[a]||i.value.slots[e.camelCase(a)];"object"==typeof r&&(r.props&&-1===r.props.indexOf("el$")?r.props.push("el$"):r.props||(r.props=["el$"])),t[a]=r})),t})),v=l((()=>{var t={};return u.filter((e=>-1!==o.slots.indexOf(e))).forEach((a=>{var r=i.value.slots[a]||i.value.slots[e.camelCase(a)];"object"==typeof r&&(r.props&&(Array.isArray(r.props)&&-1===r.props.indexOf("el$")||!Array.isArray(r.props)&&-1===Object.keys(r.props).indexOf("el$"))?r.props.push("el$"):r.props||(r.props=["el$"])),t[a]=r})),t}));return{elementSlots:c,fieldSlots:v}},M=function(e,t,a){var{disabled:r}=n(e),o=i(null),s=l((()=>r.value&&!1!==o.value||!0===o.value));return{localDisabled:o,isDisabled:s,disable:()=>{o.value=!0},enable:()=>{o.value=!1}}},z=function(t,a,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!n.events)throw new Error("`events` option is required for useEvents");var l=i(n.events),o=i({}),s=(e,t)=>{o.value[e]||(o.value[e]=[]),o.value[e].push(t)},u=e=>{delete o.value[e]},c=function(){var t=arguments[0],r=[].slice.call(arguments).splice(1);e.each(o.value[t],(e=>{e(...r)})),o.value[t]&&o.value[t].length||a.emit(...[t].concat(r))};return e.each(l.value,(a=>{var r=t["on"+e.upperFirst(e.camelCase(a))];r&&s(a,r)})),{events:l,listeners:o,on:s,off:u,fire:c}},I=function(e,t,a){var r=a.model;return{handleInput:e=>{r.value=e.target.value}}},U=function(t,a,r){var n=r.value,o=r.nullValue;return{empty:l((()=>e.isEqual(n.value,o.value)||-1!==[void 0,null,""].indexOf(n.value)))}},G=function(e,t,a){var{floating:r,placeholder:o}=n(e),i=a.form$;return{hasFloating:l((()=>!!(r.value||o.value&&i.value.options.floatPlaceholders)&&!1!==r.value))}},R=["presets","usePresets","addClasses","prependClasses","removeClasses","replaceClasses","overrideClasses"],H=["addClass","removeClass","replaceClass","overrideClass"];class Y{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.options=t,this.shouldMergeTemplateClasses?(this.componentClasses=this.templateClasses,this.merge({overrideClasses:{[this.component]:this.themeClasses}})):this.componentClasses=this.templateClasses,this.merge(this.config),e.each(t.merge,(e=>{this.merge(e)})),this.merge(this.locals||this.component$.value,!0),this.config.classHelpers&&"production"!==this.config.env&&this.merge({prependClasses:{[this.component]:this.getClassHelpers(this.componentClasses,[this.component])}})}get classes(){return new Proxy(this.componentClasses,{get:(e,t)=>"string"!=typeof t?e[t]:this.getDynamicClasses(e,t)})}get config(){return this.options.config||{}}get component(){return this.options.component}get component$(){return this.options.component$}get locals(){return this.options.locals}get view(){return this.options.view}get theme(){return this.options.theme}get presets(){return this.config.presets}get templates(){return this.options.templates||{}}get template(){return this.view&&this.templates["".concat(this.component,"_").concat(this.view)]?this.templates["".concat(this.component,"_").concat(this.view)]:this.templates[this.component]||{}}get themeClasses(){return e.cloneDeep(this.toArray(this.view&&this.theme.classes["".concat(this.component,"_").concat(this.view)]?this.theme.classes["".concat(this.component,"_").concat(this.view)]:this.theme.classes[this.component]))}get templateClasses(){return e.cloneDeep(this.toArray(this.defaultClasses))}get shouldMergeTemplateClasses(){var e="function"==typeof this.template.data&&void 0!==this.template.data().merge?this.template.data().merge:this.component$.value.merge;return void 0!==e&&e}get defaultClasses(){return"function"==typeof this.template.data&&this.template.data().defaultClasses?this.template.data().defaultClasses:this.component$.value.defaultClasses}get mainClass(){var e="function"==typeof this.template.data&&this.template.data().defaultClasses?this.template.data().defaultClasses:this.component$.value.defaultClasses;return Object.keys(e)[0]}merge(t){var a=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.each(this.pick(t,a?H:R),((t,a)=>{switch(a){case"addClasses":case"prependClasses":case"overrideClasses":if(!t||void 0===t[this.component])return;this.mergeComponentClasses(this.toArray(t[this.component]),a);break;case"removeClasses":case"replaceClasses":if(!t||void 0===t[this.component])return;this.mergeComponentClasses(t[this.component],a);break;case"addClass":case"removeClass":case"replaceClass":case"overrideClass":if(!t)return;"string"==typeof t||Array.isArray(t)?(Array.isArray(t)||(t=t.length>0?t.split(" "):[]),this.mergeComponentClasses({[this.mainClass]:t},"".concat(a,"es"))):"replaceClass"===a?this.mergeComponentClasses(t,"".concat(a,"es")):e.isPlainObject(t)&&this.mergeComponentClasses(this.toArray(t),"".concat(a,"es"));break;case"presets":case"usePresets":if(!Array.isArray(t))return;e.each(t,(e=>{this.merge(this.presets[e])}))}}))}mergeComponentClasses(t,a){e.each(t,((e,t)=>{this[a](e,[t])}))}addClasses(t,a){var r=e.get(this.componentClasses,a.join("."));(1!=t.length||t[0])&&(e.isPlainObject(r)?e.each(t,((e,t)=>{this.addClasses(e,a.concat(t))})):e.set(this.componentClasses,a.join("."),e.union(r,t)))}prependClasses(t,a){var r=e.get(this.componentClasses,a.join("."));(1!=t.length||t[0])&&(e.isPlainObject(r)?e.each(t,((e,t)=>{this.prependClasses(e,a.concat(t))})):e.set(this.componentClasses,a.join("."),e.union(t,r)))}removeClasses(t,a){var r=e.get(this.componentClasses,a.join("."));e.isPlainObject(r)?e.each(t,((e,t)=>{this.removeClasses(e,a.concat(t))})):Array.isArray(r)&&e.set(this.componentClasses,a.join("."),r.filter((e=>"string"!=typeof e||-1===t.indexOf(e))))}replaceClasses(t,a){var r=e.get(this.componentClasses,a.join("."));if(Array.isArray(t)){var n={};t.forEach((e=>{n=m(m({},n),e)})),t=n}e.isPlainObject(r)?e.each(t,((e,t)=>{this.replaceClasses(e,a.concat(t))})):Array.isArray(r)&&e.set(this.componentClasses,a.join("."),r.map((e=>"string"!=typeof e||-1===Object.keys(t).indexOf(e)?e:t[e])))}overrideClasses(t,a){var r=e.get(this.componentClasses,a.join("."));e.isPlainObject(r)?e.each(t,((e,t)=>{this.overrideClasses(e,a.concat(t))})):e.set(this.componentClasses,a.join("."),t)}toArray(t){var a={};return e.each(t,((e,t)=>{a[t]=this.classesToArray(e,[t])})),a}classesToArray(t,a){var r,n=t,l=a?e.get(this.componentClasses,a.join(".")):void 0;if("string"==typeof t)n=t.length>0?t.split(" "):[];else if(e.isPlainObject(t))l&&Array.isArray(l)?n=[t]:l&&!e.isPlainObject(l)||(n={},e.each(t,((e,t)=>{n[t]=this.classesToArray(e,a.concat([t]))})));else if("boolean"==typeof t||"object"==typeof t&&-1!==["ComputedRefImpl","RefImpl"].indexOf(null==t||null===(r=t.constructor)||void 0===r?void 0:r.name))throw Error("Cannot add conditional class to ".concat(this.component,": '").concat(a.join("."),"'"));return n}getDynamicClasses(t,a,r){r||(r=t);var n=Array.isArray(t[a])?e.flattenDeep(t[a]):t[a];return t["$".concat(a)]?e.flattenDeep(t["$".concat(a)](r,this.component$.value)):(e.isPlainObject(n)&&(n=e.cloneDeep(n),e.each(n,((e,a)=>{n[a]=this.getDynamicClasses(n,a,t)}))),n)}getClassHelpers(t,a){var r={};return e.each(t,((n,l)=>{l.match(/[$]/)||(e.isPlainObject(n)?r[l]=this.getClassHelpers(t[l],a.concat([l])):r[l]=["".concat(a.join("."),".").concat(l,"--\x3e")])})),r}pick(t,a){var r={};return t?(e.each(a,(e=>{e in t&&(r[e]=t[e])})),r):r}}var Z=function(e,t,a){var r=t.name,n=a.form$,o=a.el$,i=a.theme,s=a.Templates,u=a.View,c=l((()=>new Y({component:r.value,component$:o,theme:i.value,config:n.value.$vueform.config,templates:s.value,view:u.value,merge:[n.value.options,o.value]})));return{classes:l((()=>m({},c.value.classes))),classesInstance:c}},J=function(e,t,a){var{id:r}=n(e),o=a.path;return{fieldId:l((()=>r.value||o.value))}},K=function(e,t,a){return{input:i(null)}};function Q(){return(Q=g((function*(t,a){for(var r=0;r<(e.isPlainObject(t)?e.values(t):t).length;r++){var n=e.isPlainObject(t)?e.keys(t)[r]:r;yield a(t[n],n,t)}}))).apply(this,arguments)}var W=function(t,a,r){var{rules:o}=n(t),s=r.form$,u=r.path,c=i({dirty:!1,validated:!0}),v=i([]),p=i({}),f=d({}),h=l((()=>o.value)),m=l((()=>c.value.dirty)),y=l((()=>c.value.validated)),b=l((()=>e.some(v.value,{invalid:!0}))),C=l((()=>e.some(v.value,{pending:!0}))),w=l((()=>C.value)),O=l((()=>{var t=[];return e.each(v.value,(e=>{e.failing&&t.push(e.message)})),t})),j=l((()=>p.value.errors)),$=l((()=>p.value.error||null)),x=l((()=>null!==$.value)),q=l((()=>h.value&&h.value.length>0&&c.value.validated&&!b.value||(!h.value||!h.value.length)&&m.value)),P=function(){var e=g((function*(){h.value&&!1!==s.value.validation&&(yield function(e,t){return Q.apply(this,arguments)}(v.value,function(){var e=g((function*(e){yield e.validate()}));return function(t){return e.apply(this,arguments)}}()),c.value.validated=!0)}));return function(){return e.apply(this,arguments)}}();return{state:c,Validators:v,messageBag:p,dirty:m,validated:y,invalid:b,pending:C,busy:w,errors:j,error:$,validationRules:h,isDanger:x,isSuccess:q,validate:P,dirt:()=>{c.value.dirty=!0},clean:()=>{c.value.dirty=!1},resetValidators:()=>{e.each(v.value,(e=>{e.reset()})),c.value.validated=!h.value},initMessageBag:()=>{p.value=new s.value.$vueform.services.messageBag(O)},initValidation:()=>{h.value&&(c.value.validated=!1,f.value=new s.value.$vueform.services.validation.factory(u.value,s.value),v.value=[],e.each(f.value.makeAll(h.value),(e=>{v.value.push(e)})))}}},X=function(e,a,r){var n=r.input,l=i(!1);return t((()=>{n&&n.value&&n.value.addEventListener&&(n.value.addEventListener("focus",(()=>{l.value=!0})),n.value.addEventListener("blur",(()=>{l.value=!1})))})),{focused:l}},ee={props:{name:{required:!0,type:[String,Number]},conditions:{required:!1,type:[Array],default:()=>[]},onBeforeCreate:{required:!1,type:[Function],default:null,private:!0},onCreated:{required:!1,type:[Function],default:null,private:!0},onBeforeMount:{required:!1,type:[Function],default:null,private:!0},onMounted:{required:!1,type:[Function],default:null,private:!0},onBeforeUpdate:{required:!1,type:[Function],default:null,private:!0},onUpdated:{required:!1,type:[Function],default:null,private:!0},onBeforeUnmount:{required:!1,type:[Function],default:null,private:!0},onUnmounted:{required:!1,type:[Function],default:null,private:!0}}},te={props:{inline:{required:!1,type:[Boolean],default:!1},layout:{required:!1,type:[String,Object,Boolean],default:"ElementLayout",private:!0},addClass:{required:!1,type:[Array,Object,String],default:null},removeClass:{required:!1,type:[Array,Object],default:null},replaceClass:{required:!1,type:[Object],default:null},overrideClass:{required:!1,type:[Array,Object,String],default:null},addClasses:{required:!1,type:[Object],default:()=>({})},replaceClasses:{required:!1,type:[Object],default:()=>({})},removeClasses:{required:!1,type:[Object],default:()=>({})},overrideClasses:{required:!1,type:[Object],default:()=>({})},presets:{required:!1,type:[Array],default:()=>[]},view:{required:!1,type:[String],default:void 0},views:{required:!1,type:[Object],default:()=>({})},size:{required:!1,type:[String],default:void 0},columns:{required:!1,type:[Object,String,Number],default:null},templates:{required:!1,type:[Object],default:()=>({})},description:{required:!1,type:[String],default:null},info:{required:!1,type:[String],default:null},infoPosition:{required:!1,type:[String],default:"right"},label:{required:!1,type:[String,Object,Function],default:null},before:{required:!1,type:[Object,String,Number],default:null},between:{required:!1,type:[Object,String,Number],default:null},after:{required:!1,type:[Object,String,Number],default:null},slots:{required:!1,type:[Object],default:()=>({})}}},ae={props:{onChange:{required:!1,type:[Function],default:null,private:!0}}},re={props:{formatData:{required:!1,type:[Function],default:null},formatLoad:{required:!1,type:[Function],default:null},submit:{required:!1,type:[Boolean],default:!0}}},ne={props:{rules:{required:!1,type:[Array,String,Object],default:null},messages:{required:!1,type:[Object],default:()=>({})},fieldName:{required:!1,type:[String],"@default":"name|label"}}},le=function(){return[ee,te,ae,re,ne]},oe=function(a,r,n){var l=i(void 0!==n.nullValue?n.nullValue:null);r.features=[$,x,q,K,P,M,J,G,z,k,L,A,W,E,S,U,F,_,V,T,N,Z,B,I,X],r.slots=["label","info","description","before","between","after"];var o=function(a,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},l=n.deps||{},o=m(m({},n),{},{events:r.emits,slots:r.slots});return r.features.forEach((t=>{e.each(t(a,r,l,o),((e,t)=>{l[t]=e}))})),!1!==r.watchValue&&j(0,0,l),!1!==r.initValidation&&t((()=>{l.initMessageBag(),l.initValidation()})),m({},l)}(a,r,{deps:{nullValue:l}});return m({},o)};function ie(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t.name)throw Error("The `name` attribute must be defined to create a new element");var r=t.name,n="".concat(e.upperFirst(e.camelCase(r))),l=["change","beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeUnmount","unmounted"].concat(a.emits||[]);return m({name:n,mixins:[].concat(le()).concat(a.mixins||[]),components:a.components||{},emits:l,setup(e,r){var o=m({},r);o.emits=l,o.name=i(n);var s=oe(e,o,t);o.element=s;var u=a.setup?a.setup(e,o):{};return m(m({},s),u)},props:m({type:{required:!1,type:[String],default:r},default:{required:!1,type:[String,Number],default:void 0},disabled:{required:!1,type:[Boolean],default:!1},floating:{required:!1,type:[String],default:null},id:{required:!1,type:[String],default:null},placeholder:{required:!1,type:[String],default:null}},t.props||{})},e.omit(a,["setup","mixins","emits","props"]))}export{ie as default};
