!function(t){var e={};function r(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(n,s,function(e){return t[e]}.bind(null,s));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){r(2),t.exports=r(1)},function(t,e,r){t.exports=r.p+"css/bold.css"},function(t,e,r){"use strict";r.r(e);class n extends HTMLElement{constructor(t){super(),this.init(this.parsedAttributes),this.innerHTML=this.render()}attributeChangedCallback(t,e,r){this.state[t]=r,this.updated(t,e,r)}init(){}updated(){}get parsedAttributes(){return Object.keys(this.attributes).reduce((t,e)=>{const{name:r,value:n}=this.attributes.item(e);return t[r]=n,t},{})}}customElements.define("product-tile",class extends n{static get observedAttributes(){return["name","price"]}init(t){this.state=this.parseState(t)}render(){return`\n        <h1 class="name">${this.state.name}</h1>\n        <p>${this.state.price}</p>\n      `}updated(t,e,r){switch(this.state=this.parseState(this.state),t){case"name":this.querySelector("h1").textContent=this.state.name;break;case"price":this.querySelector("p").textContent=this.state.price}}parseState(t){return{name:t.name.toLowerCase(),price:`$${t.price}`}}})}]);