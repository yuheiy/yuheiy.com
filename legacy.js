!function(){"use strict";var e=Math.floor,t=Math.random;var n="object"==typeof global&&global&&global.Object===Object&&global,r="object"==typeof self&&self&&self.Object===Object&&self,o=(n||r||Function("return this")()).Symbol,i=Object.prototype,s=i.hasOwnProperty,a=i.toString,u=o?o.toStringTag:void 0;var c=Object.prototype.toString;var l="[object Null]",d="[object Undefined]",p=o?o.toStringTag:void 0;function f(e){return null==e?void 0===e?d:l:p&&p in Object(e)?function(e){var t=s.call(e,u),n=e[u];try{e[u]=void 0;var r=!0}catch(e){}var o=a.call(e);return r&&(t?e[u]=n:delete e[u]),o}(e):function(e){return c.call(e)}(e)}function h(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}var v="[object AsyncFunction]",b="[object Function]",y="[object GeneratorFunction]",m="[object Proxy]";var g=9007199254740991;function w(e){return null!=e&&function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=g}(e.length)&&!function(e){if(!h(e))return!1;var t=f(e);return t==b||t==y||t==v||t==m}(e)}var _=9007199254740991,E=/^(?:0|[1-9]\d*)$/;function L(e,t,n){if(!h(n))return!1;var r=typeof t;return!!("number"==r?w(n)&&function(e,t){var n=typeof e;return!!(t=null==t?_:t)&&("number"==n||"symbol"!=n&&E.test(e))&&e>-1&&e%1==0&&e<t}(t,n.length):"string"==r&&t in n)&&function(e,t){return e===t||e!=e&&t!=t}(n[t],e)}var O="[object Symbol]";var P=NaN,k=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,x=/^0b[01]+$/i,A=/^0o[0-7]+$/i,S=parseInt;function M(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return null!=e&&"object"==typeof e}(e)&&f(e)==O}(e))return P;if(h(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=h(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(k,"");var n=x.test(e);return n||A.test(e)?S(e.slice(2),n?2:8):j.test(e)?P:+e}var C=1/0,T=1.7976931348623157e308;function z(e){return e?(e=M(e))===C||e===-C?(e<0?-1:1)*T:e==e?e:0:0===e?e:0}var N=parseFloat,$=Math.min,F=Math.random;function R(n,r,o){if(o&&"boolean"!=typeof o&&L(n,r,o)&&(r=o=void 0),void 0===o&&("boolean"==typeof r?(o=r,r=void 0):"boolean"==typeof n&&(o=n,n=void 0)),void 0===n&&void 0===r?(n=0,r=1):(n=z(n),void 0===r?(r=n,n=0):r=z(r)),n>r){var i=n;n=r,r=i}if(o||n%1||r%1){var s=F();return $(n+s*(r-n+N("1e-"+((s+"").length-1))),r)}return function(n,r){return n+e(t()*(r-n+1))}(n,r)}var U=Math.ceil,q=Math.max;var H,I=function(e,t,n){return n&&"number"!=typeof n&&L(e,t,n)&&(t=n=void 0),e=z(e),void 0===t?(t=e,e=0):t=z(t),function(e,t,n,r){for(var o=-1,i=q(U((t-e)/(n||1)),0),s=Array(i);i--;)s[r?i:++o]=e,e+=n;return s}(e,t,n=void 0===n?e<t?1:-1:z(n),H)};function B(e){return"string"==typeof e?e.split(/([_A-Z])/).reduce((e,t,n)=>{return`${e}${e&&n%2!=0?"-":""}${(t="_"===t?"":t).toLowerCase()}`}):e}const D=e=>null==e;function Y(e){e=e||{};const t=Object.getOwnPropertyNames(e);return Object.getOwnPropertySymbols?t.concat(Object.getOwnPropertySymbols(e)):t}let K=0;const V=(e=HTMLElement)=>(class extends e{connectedCallback(){if(super.connectedCallback&&super.connectedCallback(),this.childrenUpdated){const e=this.childrenUpdated.bind(this);e(),new MutationObserver(e).observe(this,{childList:!0}),this.props&&this.props.hasOwnProperty("children")&&(this.props={children:this.children})}}}),X=(e=HTMLElement)=>(class extends e{get context(){if(this._context)return this._context;let e=this;for(;e=e.parentNode||e.host;)if("context"in e)return e.context;return{}}set context(e){this._context=e}}),G=(e=HTMLElement)=>(class extends e{connectedCallback(){this.connecting&&this.connecting(),super.connectedCallback&&super.connectedCallback(),this.connected&&this.connected()}disconnectedCallback(){this.disconnecting&&this.disconnecting(),super.disconnectedCallback&&super.disconnectedCallback(),this.disconnected&&this.disconnected()}});var J=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function W(e,t){const{coerce:n,default:r,deserialize:o,serialize:i}=t;return{attribute:function(e,t){const{attribute:n}=t,r="object"==typeof n?J({},n):{source:n,target:n};return!0===r.source&&(r.source=B(e)),!0===r.target&&(r.target=B(e)),r}(e,t),coerce:n||(e=>e),default:r,deserialize:o||(e=>e),serialize:i||(e=>e)}}function Z(e){const t=e||{},n=function({constructor:e},n){const r=W(n,t),o=(i=n,i=String(i||++K),"function"==typeof Symbol?Symbol(i):`__skate_${i}`);var i;e.hasOwnProperty("_propsNormalised")||(e._propsNormalised={}),e._propsNormalised[n]=r,r.attribute.source&&e._observedAttributes.push(r.attribute.source),Object.defineProperty(e.prototype,n,{configurable:!0,get(){const e=this[o];return null==e?r.default:e},set(e){this[o]=r.coerce(e),function(e,t,n,r){if(t&&e._syncingAttributeToProperty!==t){const o=n(r);e._syncingPropertyToAttribute=!0,null==o?e.removeAttribute(t):e.setAttribute(t,o),e._syncingPropertyToAttribute=!1}}(this,r.attribute.target,r.serialize,e),this.triggerUpdate()}})};return Object.keys(t).forEach(e=>n[e]=t[e]),n}const Q=(e=HTMLElement)=>{var t,n;return n=t=class extends e{constructor(...e){var t;return t=super(...e),this._prevProps={},this._prevState={},this._state={},t}static get observedAttributes(){return function(e){if(e.hasOwnProperty("_propsNormalised"))return;const{props:t}=e;Y(t).forEach(n=>{let r=t[n];"function"!=typeof r&&(r=Z(r)),r({constructor:e},n)})}(this),this._observedAttributes}static get props(){return this._props}static set props(e){this._props=e}get props(){return Y(this.constructor.props).reduce((e,t)=>(e[t]=this[t],e),{})}set props(e){const t=this.constructor.props;Y(e).forEach(n=>n in t&&(this[n]=e[n]))}get state(){return this._state}set state(e){this._state=e,this.triggerUpdate()}attributeChangedCallback(e,t,n){super.attributeChangedCallback&&super.attributeChangedCallback(e,t,n),function(e,t,n){if(e._syncingPropertyToAttribute)return;const r=e.constructor._propsNormalised;for(let o in r){const{attribute:{source:i},deserialize:s}=r[o];i===t&&(e._syncingAttributeToProperty=o,e[o]=null==n?n:s(n),e._syncingAttributeToProperty=null)}}(this,e,n)}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this.triggerUpdate()}shouldUpdate(){return!0}triggerUpdate(){var e;this._updating||(this._updating=!0,e=(()=>{const{_prevProps:e,_prevState:t}=this;this.updating&&this.updating(e,t),this.updated&&this.shouldUpdate(e,t)&&this.updated(e,t),this._prevProps=this.props,this._prevState=this.state,this._updating=!1}),window.Promise?Promise.resolve().then(e):setTimeout(e))}},t._observedAttributes=[],n},{parse:ee,stringify:te}=JSON,ne=Object.freeze({source:!0}),re=e=>D(e)?0:Number(e),oe=(Z({attribute:ne}),Z({attribute:ne,coerce:e=>Array.isArray(e)?e:D(e)?null:[e],default:Object.freeze([]),deserialize:ee,serialize:te}),Z({attribute:ne,coerce:Boolean,default:!1,deserialize:e=>!D(e),serialize:e=>e?"":null}),Z({attribute:ne,default:0,coerce:re,deserialize:re,serialize:e=>D(e)?null:String(Number(e))}),Z({attribute:ne,default:Object.freeze({}),deserialize:ee,serialize:te}),Z({attribute:ne,default:"",coerce:String,serialize:e=>D(e)?null:String(e)}),(e=HTMLElement)=>(class extends e{get renderRoot(){return super.renderRoot||((e=this)._shadowRoot||(e._shadowRoot=e.shadowRoot||e.attachShadow({mode:"open"})));var e}renderer(e,t){super.renderer?super.renderer(e,t):e.innerHTML=t()}updated(...e){super.updated&&super.updated(...e),this.rendering&&this.rendering(),this.renderer(this.renderRoot,()=>this.render&&this.render(this)),this.rendered&&this.rendered()}})),ie=(e=HTMLElement)=>G(V(X(Q(oe(e||HTMLElement))))),se=Boolean(window.customElements),ae=Boolean(document.documentElement.attachShadow),ue=se&&ae,ce=window.matchMedia("(prefers-reduced-motion)").matches,le=1e3/15,de=1024,pe=1024,fe=de/100,he=de/10,ve=pe/10*-1,be=pe/10,ye=()=>{const e=pe/2,t=[[0,e]];let n=0,r=e;for(;n<de;)n+=R(fe,he),r+=R(ve,be),t.push([n,r]);return{points:t,toPointsAttrVal:()=>t.map(e=>e.join(",")).join(" ")}},me=()=>I(3).map(ye);class ge extends(ie()){constructor(){super(),this._isPlaying=!1,this._timerId=null,this.updateLines=this.updateLines.bind(this),this.updateLines()}updateLines(){this.state={lines:me()}}play(){this._isPlaying||(this.updateLines(),this._timerId=setInterval(this.updateLines,le),this._isPlaying=!0)}stop(){this._isPlaying&&(clearTimeout(this._timerId),this._isPlaying=!1)}render({state:{lines:e}}){return`\n      <style>\n        :host {\n          all: initial;\n          contain: content;\n          display: inline-block;\n        }\n\n        #stage {\n          width: 100%;\n          height: 100%;\n          vertical-align: bottom;\n        }\n\n        #background {\n          fill: var(--yuhei-avator__color-bg, var(--color-bg, white));\n        }\n\n        .line {\n          fill: none;\n          stroke: var(--yuhei-avator__color-fg, var(--color-fg, black));\n          stroke-width: ${de/64};\n          stroke-linecap: square;\n        }\n      </style>\n\n      <svg id="stage" viewBox="0 0 ${de} ${pe}" preserveAspectRatio="xMidYMid slice" role="img">\n        <rect id="background" width="${de}" height="${pe}"></rect>\n        ${e.map(e=>`<polyline class="line" points="${e.toPointsAttrVal()}"></polyline>`).join("")}\n      </svg>\n    `}}ue&&customElements.define("yuhei-avator",ge);"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function we(e,t){return e(t={exports:{}},t.exports),t.exports}var _e,Ee=we(function(e,t){
/**
   * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
   * @version v5.0.5
   * @link https://github.com/ten1seven/what-input
   * @license MIT
   */
var n;n=function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}return n.m=e,n.c=t,n.p="",n(0)}([function(e,t){e.exports=function(){if("undefined"==typeof document||"undefined"==typeof window)return{ask:function(){return"initial"},element:function(){return null},ignoreKeys:function(){},registerOnChange:function(){},unRegisterOnChange:function(){}};var e=document.documentElement,t=null,n="initial",r=n,o=null,i=["input","select","textarea"],s=[],a=[16,17,18,91,93],u={keydown:"keyboard",keyup:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"},c=!1,l=!1,d={x:null,y:null},p={2:"touch",3:"touch",4:"mouse"},f=!1;try{var h=Object.defineProperty({},"passive",{get:function(){f=!0}});window.addEventListener("test",null,h)}catch(e){}var v=function(){var e=!!f&&{passive:!0};window.PointerEvent?(window.addEventListener("pointerdown",b),window.addEventListener("pointermove",m)):window.MSPointerEvent?(window.addEventListener("MSPointerDown",b),window.addEventListener("MSPointerMove",m)):(window.addEventListener("mousedown",b),window.addEventListener("mousemove",m),"ontouchstart"in window&&(window.addEventListener("touchstart",_,e),window.addEventListener("touchend",b))),window.addEventListener(L(),m,e),window.addEventListener("keydown",_),window.addEventListener("keyup",_),window.addEventListener("focusin",g),window.addEventListener("focusout",w)},b=function(e){if(!c){var t=e.which,o=u[e.type];"pointer"===o&&(o=E(e));var s="keyboard"===o&&t&&-1===a.indexOf(t)||"mouse"===o||"touch"===o;if(n!==o&&s&&(n=o,y("input")),r!==o&&s){var l=document.activeElement;l&&l.nodeName&&-1===i.indexOf(l.nodeName.toLowerCase())&&(r=o,y("intent"))}}},y=function(t){e.setAttribute("data-what"+t,"input"===t?n:r),O(t)},m=function(e){if(P(e),!c&&!l){var t=u[e.type];"pointer"===t&&(t=E(e)),r!==t&&(r=t,y("intent"))}},g=function(n){n.target.nodeName?(t=n.target.nodeName.toLowerCase(),e.setAttribute("data-whatelement",t),n.target.classList&&n.target.classList.length&&e.setAttribute("data-whatclasses",n.target.classList.toString().replace(" ",","))):w()},w=function(){t=null,e.removeAttribute("data-whatelement"),e.removeAttribute("data-whatclasses")},_=function(e){b(e),window.clearTimeout(o),c=!0,o=window.setTimeout(function(){c=!1},100)},E=function(e){return"number"==typeof e.pointerType?p[e.pointerType]:"pen"===e.pointerType?"touch":e.pointerType},L=function(){return"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"},O=function(e){for(var t=0,o=s.length;t<o;t++)s[t].type===e&&s[t].fn.call(void 0,"input"===e?n:r)},P=function(e){d.x!==e.screenX||d.y!==e.screenY?(l=!1,d.x=e.screenX,d.y=e.screenY):l=!0};return"addEventListener"in window&&Array.prototype.indexOf&&(u[L()]="mouse",v(),y("input"),y("intent")),{ask:function(e){return"intent"===e?r:n},element:function(){return t},ignoreKeys:function(e){a=e},registerOnChange:function(e,t){s.push({fn:e,type:t||"input"})},unRegisterOnChange:function(e){var t=function(e){for(var t=0,n=s.length;t<n;t++)if(s[t].fn===e)return t}(e);t&&s.splice(t,1)}}}()}])},e.exports=n()}),Le=we(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=void 0,n=function(){if(null===t||void 0===t){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];t=requestAnimationFrame(function(n,r){return function(){t=null,e.apply(n,r)}}(this,r))}};return n.cancel=function(){return cancelAnimationFrame(t)},n}}),Oe=(_e=Le)&&_e.__esModule&&Object.prototype.hasOwnProperty.call(_e,"default")?_e.default:_e;if(ue&&!ce){const e=document.querySelector('body > footer a[title="yuheiy.com"]'),t=e.querySelector("yuhei-avator");let n=!1;const r=async()=>{n&&(await new Promise(e=>{requestAnimationFrame(()=>{requestAnimationFrame(e)})}),n=!1);const r=Ee.ask(),o=Ee.ask("intent");if("initial"===o)return void(n=!0);const i="mouse"===o&&e.matches(":hover"),s="keyboard"===r&&document.activeElement===e;i||s?t.play():t.stop()};document.addEventListener("blur",r),document.addEventListener("mousemove",Oe(r)),e.addEventListener("mouseenter",r),e.addEventListener("mouseleave",r),e.addEventListener("focus",r),e.addEventListener("blur",r)}if(!ue){const e=document.querySelector("#tmpl-yuhei-avator-fallback");document.querySelectorAll("yuhei-avator").forEach(t=>{const n=document.importNode(e.content.firstElementChild,!0);[...t.attributes].forEach(({name:e,value:t})=>{n.setAttribute(e,t)}),t.replaceWith(n)})}console.log("Source: https://github.com/yuheiy/yuheiy.com")}();
