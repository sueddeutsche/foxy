!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("foxy",[],t):"object"==typeof exports?exports.foxy=t():e.foxy=t()}("undefined"!=typeof self?self:this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t),n.d(t,"Foxy",(function(){return i})),n.d(t,"utils",(function(){return r})),n.d(t,"handler",(function(){return u}));var r={loadImageInfo:function(e){const t={image:new Image,type:"",width:0,height:0};return fetch(e).then(e=>e.blob()).then(e=>(t.type=e.type.replace(/^[^/]+\//,""),URL.createObjectURL(e))).then(e=>new Promise((n,r)=>{t.image.addEventListener("load",()=>n()),t.image.addEventListener("error",r),t.image.src=e})).then(()=>(t.width=t.image.naturalWidth,t.height=t.image.naturalHeight,t))}};const o=/^https:\/\/images\.unsplash\.com\/photo-\d{13}-[0-9a-f]{12}/;class i{constructor(e={}){this.handlers=e.handlers||[]}addHandler(e,t=0){null==this.handlers[t]&&this.handlers.push(e),this.handlers.splice(t,0,e)}removeHandler(e){this.handlers=this.handlers.filter(t=>t!==e)}getImageURL(e){return this.get("getImageURL",e)}getImageInfo(e){return this.get("getImageInfo",e)}getVideoURL(e){return this.get("getVideoURL",e)}getVideoInfo(e){return this.get("getVideoInfo",e)}getURL(e){return this.get("getURL",e)}get(e,t){const n=this.findHandler(e,t);if(null==n)throw new Error(`There is no handler for method '${e}(${JSON.stringify(t)})'`);return n[e](t)}findHandler(e,t){for(const n of this.handlers)if("function"==typeof n[e]&&!0===n.use(t))return n}}const u={unsplash:{use:e=>o.test(e.url),getImageUrl:e=>Promise.resolve(e.url),getImageInfo:e=>r.loadImageInfo(e.url)}}}])}));