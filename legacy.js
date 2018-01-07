!function(){"use strict";"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;t=function(t,e){
/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.0.2
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
n=function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}return n.m=t,n.c=e,n.p="",n(0)}([function(t,e){t.exports=function(){var t=document.documentElement,e=null,n="initial",r=n,o=null,i=["input","select","textarea"],s=[],a=[16,17,18,91,93],c={keydown:"keyboard",keyup:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"},u=!1,d=!1,l={x:null,y:null},p={2:"touch",3:"touch",4:"mouse"},f=!1;try{var h=Object.defineProperty({},"passive",{get:function(){f=!0}});window.addEventListener("test",null,h)}catch(t){}var v=function(){var t=!!f&&{passive:!0};window.PointerEvent?(window.addEventListener("pointerdown",m),window.addEventListener("pointermove",y)):window.MSPointerEvent?(window.addEventListener("MSPointerDown",m),window.addEventListener("MSPointerMove",y)):(window.addEventListener("mousedown",m),window.addEventListener("mousemove",y),"ontouchstart"in window&&(window.addEventListener("touchstart",_,t),window.addEventListener("touchend",m))),window.addEventListener(L(),y,t),window.addEventListener("keydown",_),window.addEventListener("keyup",_),window.addEventListener("focusin",g),window.addEventListener("focusout",w)},m=function(t){if(!u){var e=t.which,o=c[t.type];"pointer"===o&&(o=E(t));var s="keyboard"===o&&e&&-1===a.indexOf(e)||"mouse"===o||"touch"===o;if(n!==o&&s&&(n=o,b("input")),r!==o&&s){var d=document.activeElement;d&&d.nodeName&&-1===i.indexOf(d.nodeName.toLowerCase())&&(r=o,b("intent"))}}},b=function(e){t.setAttribute("data-what"+e,"input"===e?n:r),x(e)},y=function(t){if(P(t),!u&&!d){var e=c[t.type];"pointer"===e&&(e=E(t)),r!==e&&(r=e,b("intent"))}},g=function(n){e=n.target.nodeName.toLowerCase(),t.setAttribute("data-whatelement",e),n.target.classList&&n.target.classList.length&&t.setAttribute("data-whatclasses",n.target.classList.toString().replace(" ",","))},w=function(){e=null,t.removeAttribute("data-whatelement"),t.removeAttribute("data-whatclasses")},_=function(t){m(t),window.clearTimeout(o),u=!0,o=window.setTimeout(function(){u=!1},100)},E=function(t){return"number"==typeof t.pointerType?p[t.pointerType]:"pen"===t.pointerType?"touch":t.pointerType},L=function(){return"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"},x=function(t){for(var e=0,o=s.length;e<o;e++)s[e].type===t&&s[e].fn.call(void 0,"input"===t?n:r)},P=function(t){l.x!==t.screenX||l.y!==t.screenY?(d=!1,l.x=t.screenX,l.y=t.screenY):d=!0};return"addEventListener"in window&&Array.prototype.indexOf&&(c[L()]="mouse",v(),b("input"),b("intent")),{ask:function(t){return"intent"===t?r:n},element:function(){return e},ignoreKeys:function(t){a=t},registerOnChange:function(t,e){s.push({fn:t,type:e||"input"})},unRegisterOnChange:function(t){var e=function(t){for(var e=0,n=s.length;e<n;e++)if(s[e].fn===t)return e}(t);e&&s.splice(e,1)}}}()}])},t.exports=n();var n},e=void 0,t(e={exports:{}},e.exports);var t,e,n=Math.floor,r=Math.random;var o="object"==typeof global&&global&&global.Object===Object&&global,i="object"==typeof self&&self&&self.Object===Object&&self,s=o||i||Function("return this")(),a=s.Symbol,c=Object.prototype,u=c.hasOwnProperty,d=c.toString,l=a?a.toStringTag:void 0;var p=Object.prototype.toString;var f="[object Null]",h="[object Undefined]",v=a?a.toStringTag:void 0;function m(t){return null==t?void 0===t?h:f:v&&v in Object(t)?function(t){var e=u.call(t,l),n=t[l];try{t[l]=void 0;var r=!0}catch(t){}var o=d.call(t);return r&&(e?t[l]=n:delete t[l]),o}(t):(e=t,p.call(e));var e}function b(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var y="[object AsyncFunction]",g="[object Function]",w="[object GeneratorFunction]",_="[object Proxy]";var E=9007199254740991;function L(t){return null!=t&&(e=t.length,"number"==typeof e&&e>-1&&e%1==0&&e<=E)&&!function(t){if(!b(t))return!1;var e=m(t);return e==g||e==w||e==y||e==_}(t);var e}var x=9007199254740991,P=/^(?:0|[1-9]\d*)$/;function O(t,e,n){if(!b(n))return!1;var r=typeof e;if("number"==r?L(n)&&(s=e,a=n.length,(a=null==a?x:a)&&("number"==typeof s||P.test(s))&&s>-1&&s%1==0&&s<a):"string"==r&&e in n)return(o=n[e])===(i=t)||o!=o&&i!=i;var o,i,s,a;return!1}var j="[object Symbol]";var S=NaN,k=/^\s+|\s+$/g,T=/^[-+]0x[0-9a-f]+$/i,M=/^0b[01]+$/i,A=/^0o[0-7]+$/i,C=parseInt;function $(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||(e=t,null!=e&&"object"==typeof e&&m(t)==j);var e}(t))return S;if(b(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=b(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(k,"");var n=M.test(t);return n||A.test(t)?C(t.slice(2),n?2:8):T.test(t)?S:+t}var z=1/0,N=1.7976931348623157e308;function U(t){if(!t)return 0===t?t:0;if((t=$(t))===z||t===-z){return(t<0?-1:1)*N}return t==t?t:0}var H=parseFloat,R=Math.min,F=Math.random;function I(t,e,o){if(o&&"boolean"!=typeof o&&O(t,e,o)&&(e=o=void 0),void 0===o&&("boolean"==typeof e?(o=e,e=void 0):"boolean"==typeof t&&(o=t,t=void 0)),void 0===t&&void 0===e?(t=0,e=1):(t=U(t),void 0===e?(e=t,t=0):e=U(e)),t>e){var i=t;t=e,e=i}if(o||t%1||e%1){var s=F();return R(t+s*(e-t+H("1e-"+((s+"").length-1))),e)}return c=e,(a=t)+n(r()*(c-a+1));var a,c}var q=Math.ceil,D=Math.max;var B,W=(B=void 0,function(t,e,n){return n&&"number"!=typeof n&&O(t,e,n)&&(e=n=void 0),t=U(t),void 0===e?(e=t,t=0):e=U(e),function(t,e,n,r){for(var o=-1,i=D(q((e-t)/(n||1)),0),s=Array(i);i--;)s[r?i:++o]=t,t+=n;return s}(t,e,n=void 0===n?t<e?1:-1:U(n),B)});function Y(t){return"string"==typeof t?t.split(/([_A-Z])/).reduce((t,e,n)=>{return`${t}${t&&n%2!=0?"-":""}${(e="_"===e?"":e).toLowerCase()}`}):t}const V=t=>null==t;function X(t){t=t||{};const e=Object.getOwnPropertyNames(t);return Object.getOwnPropertySymbols?e.concat(Object.getOwnPropertySymbols(t)):e}let G=0;const J=(t=HTMLElement)=>(class extends t{connectedCallback(){if(super.connectedCallback&&super.connectedCallback(),this.childrenUpdated){const t=this.childrenUpdated.bind(this);t();new MutationObserver(t).observe(this,{childList:!0}),this.props&&this.props.hasOwnProperty("children")&&(this.props={children:this.children})}}}),K=(t=HTMLElement)=>(class extends t{get context(){if(this._context)return this._context;let t=this;for(;t=t.parentNode||t.host;)if("context"in t)return t.context;return{}}set context(t){this._context=t}}),Z=(t=HTMLElement)=>(class extends t{connectedCallback(){this.connecting&&this.connecting(),super.connectedCallback&&super.connectedCallback(),this.connected&&this.connected()}disconnectedCallback(){this.disconnecting&&this.disconnecting(),super.disconnectedCallback&&super.disconnectedCallback(),this.disconnected&&this.disconnected()}});var Q=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};function tt(t,e){const{coerce:n,default:r,deserialize:o,serialize:i}=e;return{attribute:function(t,e){const{attribute:n}=e,r="object"==typeof n?Q({},n):{source:n,target:n};return!0===r.source&&(r.source=Y(t)),!0===r.target&&(r.target=Y(t)),r}(t,e),coerce:n||(t=>t),default:r,deserialize:o||(t=>t),serialize:i||(t=>t)}}function et(t){const e=t||{},n=function({constructor:t},n){const r=tt(n,e),o=(i=n,i=String(i||++G),"function"==typeof Symbol?Symbol(i):`__skate_${i}`);var i;t.hasOwnProperty("_propsNormalised")||(t._propsNormalised={}),t._propsNormalised[n]=r,r.attribute.source&&t._observedAttributes.push(r.attribute.source),Object.defineProperty(t.prototype,n,{configurable:!0,get(){const t=this[o];return null==t?r.default:t},set(t){this[o]=r.coerce(t),function(t,e,n,r){if(e&&t._syncingAttributeToProperty!==e){const o=n(r);t._syncingPropertyToAttribute=!0,null==o?t.removeAttribute(e):t.setAttribute(e,o),t._syncingPropertyToAttribute=!1}}(this,r.attribute.target,r.serialize,t),this.triggerUpdate()}})};return Object.keys(e).forEach(t=>n[t]=e[t]),n}const nt=(t=HTMLElement)=>{var e,n;return n=e=class extends t{constructor(...t){var e;return e=super(...t),this._prevProps={},this._prevState={},this._state={},e}static get observedAttributes(){return function(t){if(t.hasOwnProperty("_propsNormalised"))return;const{props:e}=t;X(e).forEach(n=>{let r=e[n];"function"!=typeof r&&(r=et(r)),r({constructor:t},n)})}(this),this._observedAttributes}static get props(){return this._props}static set props(t){this._props=t}get props(){return X(this.constructor.props).reduce((t,e)=>(t[e]=this[e],t),{})}set props(t){const e=this.constructor.props;X(t).forEach(n=>n in e&&(this[n]=t[n]))}get state(){return this._state}set state(t){this._state=t,this.triggerUpdate()}attributeChangedCallback(t,e,n){super.attributeChangedCallback&&super.attributeChangedCallback(t,e,n),function(t,e,n){if(t._syncingPropertyToAttribute)return;const r=t.constructor._propsNormalised;for(let o in r){const{attribute:{source:i},deserialize:s}=r[o];i===e&&(t._syncingAttributeToProperty=o,t[o]=null==n?n:s(n),t._syncingAttributeToProperty=null)}}(this,t,n)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.triggerUpdate()}shouldUpdate(){return!0}triggerUpdate(){if(!this._updating){this._updating=!0,t=(()=>{const{_prevProps:t,_prevState:e}=this;this.updating&&this.updating(t,e),this.updated&&this.shouldUpdate(t,e)&&this.updated(t,e),this._prevProps=this.props,this._prevState=this.state,this._updating=!1}),window.Promise?Promise.resolve().then(t):setTimeout(t);var t}}},e._observedAttributes=[],n},{parse:rt,stringify:ot}=JSON,it=Object.freeze({source:!0}),st=t=>V(t)?0:Number(t),at=(et({attribute:it}),et({attribute:it,coerce:t=>Array.isArray(t)?t:V(t)?null:[t],default:Object.freeze([]),deserialize:rt,serialize:ot}),et({attribute:it,coerce:Boolean,default:!1,deserialize:t=>!V(t),serialize:t=>t?"":null}),et({attribute:it,default:0,coerce:st,deserialize:st,serialize:t=>V(t)?null:String(Number(t))}),et({attribute:it,default:Object.freeze({}),deserialize:rt,serialize:ot}),et({attribute:it,default:"",coerce:String,serialize:t=>V(t)?null:String(t)}),(t=HTMLElement)=>(class extends t{get renderRoot(){return super.renderRoot||(t=this,t._shadowRoot||(t._shadowRoot=t.shadowRoot||t.attachShadow({mode:"open"})));var t}renderer(t,e){super.renderer?super.renderer(t,e):t.innerHTML=e()}updated(...t){super.updated&&super.updated(...t),this.rendering&&this.rendering(),this.renderer(this.renderRoot,()=>this.render&&this.render(this)),this.rendered&&this.rendered()}})),ct=(t=HTMLElement)=>Z(J(K(nt(at(t||HTMLElement))))),ut=Boolean(window.customElements),dt=Boolean(document.documentElement.attachShadow),lt=ut&&dt,pt=window.matchMedia("(prefers-reduced-motion)").matches,ft=1024,ht=1024,vt=ft/100,mt=ft/10,bt=ht/10*-1,yt=ht/10,gt=()=>{const t=ht/2,e=[[0,t]];let n=0,r=t;for(;n<ft;)n+=I(vt,mt),r+=I(bt,yt),e.push([n,r]);return{points:e,toPointsAttrVal:()=>e.map(t=>t.join(",")).join(" ")}},wt=()=>W(3).map(gt),_t=1e3/15;class Et extends(ct()){constructor(){super(),this.state={lines:wt()},this._isPlaying=!1,this._timerId=null}play(){this._isPlaying||(this._timerId=setInterval(()=>{this.state={lines:wt()}},_t),this._isPlaying=!0)}stop(){this._isPlaying&&(clearTimeout(this._timerId),this._isPlaying=!1)}render({state:{lines:t}}){return`\n            <style>\n                :host {\n                    contain: content;\n                    display: inline-block;\n                }\n\n                svg {\n                    width: 100%;\n                    height: 100%;\n                    vertical-align: bottom;\n                }\n\n                rect {\n                    fill: var(--yuhei-avator__color-bg, var(--color-bg));\n                }\n\n                polyline {\n                    fill: none;\n                    stroke: var(--yuhei-avator__color-fg, var(--color-fg));\n                    stroke-width: ${ft/64};\n                    stroke-linecap: square;\n                }\n            </style>\n\n            <svg viewBox="0 0 ${ft} ${ht}" preserveAspectRatio="xMidYMid slice" role="img">\n                <rect width="${ft}" height="${ht}"></rect>\n                ${t.map(t=>`<polyline points="${t.toPointsAttrVal()}"></polyline>`).join("")}\n            </svg>\n        `}}lt&&customElements.define("yuhei-avator",Et);const Lt=(t,e)=>new Promise(n=>{const r=()=>{e.test(document.readyState)&&(document.removeEventListener(t,r),n())};document.addEventListener(t,r),r()}),xt=Lt("readystatechange",/^(?:interactive|complete)$/);Lt("DOMContentLoaded",/^(?:interactive|complete)$/),Lt("readystatechange",/^complete$/);var Pt=function(){return s.Date.now()},Ot="Expected a function",jt=Math.max,St=Math.min;function kt(t,e,n){var r,o,i,s,a,c,u=0,d=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(Ot);e=$(e)||0,b(n)&&(d=!!n.leading,i=(l="maxWait"in n)?jt($(n.maxWait)||0,e):i,p="trailing"in n?!!n.trailing:p);function f(e){var n=r,i=o;return r=o=void 0,u=e,s=t.apply(i,n)}function h(t){var n=t-c;return void 0===c||n>=e||n<0||l&&t-u>=i}function v(){var t=Pt();if(h(t))return m(t);a=setTimeout(v,function(t){var n=e-(t-c);return l?St(n,i-(t-u)):n}(t))}function m(t){return a=void 0,p&&r?f(t):(r=o=void 0,s)}function y(){var t=Pt(),n=h(t);if(r=arguments,o=this,c=t,n){if(void 0===a)return u=i=c,a=setTimeout(v,e),d?f(i):s;if(l)return a=setTimeout(v,e),f(c)}var i;return void 0===a&&(a=setTimeout(v,e)),s}return y.cancel=function(){void 0!==a&&clearTimeout(a),u=0,r=c=o=a=void 0},y.flush=function(){return void 0===a?s:m(Pt())},y}var Tt="Expected a function";const Mt=()=>{if(!lt)return;if(pt)return;const t=document.querySelector(".PageFooter-authorImage"),e=document.querySelector(".PageFooter-authorLink"),n=()=>{const n=e.matches(":hover"),r=e.matches('html[data-whatinput="keyboard"] :focus');n||r?t.play():t.stop()};document.addEventListener("blur",n),document.addEventListener("mousemove",function(t,e,n){var r=!0,o=!0;if("function"!=typeof t)throw new TypeError(Tt);return b(n)&&(r="leading"in n?!!n.leading:r,o="trailing"in n?!!n.trailing:o),kt(t,e,{leading:r,maxWait:e,trailing:o})}(n,200)),e.addEventListener("mouseenter",n),e.addEventListener("mouseleave",n),e.addEventListener("focus",n),e.addEventListener("blur",n)};document.documentElement.classList.remove("no-js"),(async()=>{await xt,(()=>{if(lt)return;const t=document.querySelector("#tmpl-yuhei-avator");document.querySelectorAll("yuhei-avator").forEach(e=>{const n=document.importNode(t.content.firstElementChild,!0);[...e.attributes].forEach(({name:t,value:e})=>{n.setAttribute(t,e)}),e.replaceWith(n)})})(),Mt()})(),console.log("Source: https://github.com/yuheiy/yuheiy.com")}();
