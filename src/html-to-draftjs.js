!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("immutable"),require("draft-js")):"function"==typeof define&&define.amd?define(["immutable","draft-js"],t):"object"==typeof exports?exports.htmlToDraftjs=t(require("immutable"),require("draft-js")):e.htmlToDraftjs=t(e.immutable,e["draft-js"])}(window,function(n,r){return a={},i.m=o=[function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";n.r(t);var v=n(1),u=n(0),s=function(e){var t,n=null;return document.implementation&&document.implementation.createHTMLDocument&&((t=document.implementation.createHTMLDocument("foo")).documentElement.innerHTML=e,n=t.getElementsByTagName("body")[0]),n},x=function(e,t,n){var r,i=e.textContent;return""===i.trim()?{chunk:(r=n,{text:" ",inlines:[new u.OrderedSet],entities:[r],blocks:[]})}:{chunk:{text:i,inlines:Array(i.length).fill(t),entities:Array(i.length).fill(n),blocks:[]}}},M=function(){return{text:"\n",inlines:[new u.OrderedSet],entities:new Array(1),blocks:[]}},k=function(){return{text:"",inlines:[],entities:[],blocks:[]}},E=function(e,t){return{text:"",inlines:[],entities:[],blocks:[{type:e,depth:0,data:t||new u.Map({})}]}},w=function(e,t,n){return{text:"\r",inlines:[],entities:[],blocks:[{type:e,depth:Math.max(0,Math.min(4,t)),data:n||new u.Map({})}]}},T=function(e){return{text:"\r ",inlines:[new u.OrderedSet],entities:[e],blocks:[{type:"atomic",depth:0,data:new u.Map({})}]}},L=function(e,t){return{text:e.text+t.text,inlines:e.inlines.concat(t.inlines),entities:e.entities.concat(t.entities),blocks:e.blocks.concat(t.blocks)}},A=new u.Map({"header-one":{element:"h1"},"header-two":{element:"h2"},"header-three":{element:"h3"},"header-four":{element:"h4"},"header-five":{element:"h5"},"header-six":{element:"h6"},"unordered-list-item":{element:"li",wrapper:"ul"},"ordered-list-item":{element:"li",wrapper:"ol"},blockquote:{element:"blockquote"},code:{element:"pre"},atomic:{element:"figure"},unstyled:{element:"p",aliasedElements:["div"]}});var O={code:"CODE",del:"STRIKETHROUGH",em:"ITALIC",strong:"BOLD",ins:"UNDERLINE",sub:"SUBSCRIPT",sup:"SUPERSCRIPT"};function S(e){return e.style.textAlign?new u.Map({"text-align":e.style.textAlign}):e.style.marginLeft?new u.Map({"margin-left":e.style.marginLeft}):void 0}var _=function(e){var t=void 0;if(e instanceof HTMLAnchorElement){var n={};t=e.dataset&&void 0!==e.dataset.mention?(n.url=e.href,n.text=e.innerHTML,n.value=e.dataset.value,v.Entity.__create("MENTION","IMMUTABLE",n)):(n.url=e.getAttribute&&e.getAttribute("href")||e.href,n.title=e.innerHTML,n.targetOption=e.target,v.Entity.__create("LINK","MUTABLE",n))}return t};n.d(t,"default",function(){return r});var d=" ",f=new RegExp("&nbsp;","g"),j=!0;function I(e,t,n,r,i,o){var a=e.nodeName.toLowerCase();if(o){var l=o(a,e);if(l){var c=v.Entity.__create(l.type,l.mutability,l.data||{});return{chunk:T(c)}}}if("#text"===a&&"\n"!==e.textContent)return x(e,t,i);if("br"===a)return{chunk:M()};if("img"===a&&e instanceof HTMLImageElement){var u={};u.src=e.getAttribute&&e.getAttribute("src")||e.src,u.alt=e.alt,u.height=e.style.height,u.width=e.style.width,e.style.float&&(u.alignment=e.style.float);var s=v.Entity.__create("IMAGE","MUTABLE",u);return{chunk:T(s)}}if("video"===a&&e instanceof HTMLVideoElement){var d={};d.src=e.getAttribute&&e.getAttribute("src")||e.src,d.alt=e.alt,d.height=e.style.height,d.width=e.style.width,e.style.float&&(d.alignment=e.style.float);var f=v.Entity.__create("VIDEO","MUTABLE",d);return{chunk:T(f)}}if("iframe"===a&&e instanceof HTMLIFrameElement){var m={};m.src=e.getAttribute&&e.getAttribute("src")||e.src,m.height=e.height,m.width=e.width;var p=v.Entity.__create("EMBEDDED_LINK","MUTABLE",m);return{chunk:T(p)}}var h,y=function(t,n){var e=A.filter(function(e){return e.element===t&&(!e.wrapper||e.wrapper===n)||e.wrapper===t||e.aliasedElements&&-1<e.aliasedElements.indexOf(t)}).keySeq().toSet().toArray();if(1===e.length)return e[0]}(a,r);y&&("ul"===a||"ol"===a?(r=a,n+=1):("unordered-list-item"!==y&&"ordered-list-item"!==y&&(r="",n=-1),j?(h=E(y,S(e)),j=!1):h=w(y,n,S(e)))),h=h||k(),t=function(e,t,n){var r,i=O[e];if(i)r=n.add(i).toOrderedSet();else if(t instanceof HTMLElement){var c=t;r=(r=n).withMutations(function(e){var t=c.style.color,n=c.style.backgroundColor,r=c.style.fontSize,i=c.style.fontFamily.replace(/^"|"$/g,""),o=c.style.fontWeight,a=c.style.textDecoration,l=c.style.fontStyle;t&&(console.log("李------",t),e.add("color-".concat(t.replace(/ /g,"")))),n&&(console.log("李------",n),e.add("bgcolor-".concat(n.replace(/ /g,"")))),r&&e.add("fontsize-".concat(r.replace(/px$/g,""))),i&&e.add("fontfamily-".concat(i)),"bold"===o&&e.add(O.strong),"underline"===a&&e.add(O.ins),"italic"===l&&e.add(O.em)}).toOrderedSet()}return r}(a,e,t);for(var b=e.firstChild;b;){var g=I(b,t,n,r,_(b)||i,o).chunk;h=L(h,g),b=b.nextSibling}return{chunk:h}}function r(e,t){var n,r,i,o=(n=t,r=e.trim().replace(f,d),(i=s(r))?(j=!0,{chunk:I(i,new u.OrderedSet,-1,"",void 0,n).chunk}):null);if(o){var a=o.chunk,l=new u.OrderedMap({});a.entities&&a.entities.forEach(function(e){e&&(l=l.set(e,v.Entity.__get(e)))});var c=0;return{contentBlocks:a.text.split("\r").map(function(e,t){var n=c+e.length,r=a&&a.inlines.slice(c,n),i=a&&a.entities.slice(c,n),o=new u.List(r.map(function(e,t){var n={style:e,entity:null};return i[t]&&(n.entity=i[t]),v.CharacterMetadata.create(n)}));return c=n,new v.ContentBlock({key:Object(v.genKey)(),type:a&&a.blocks[t]&&a.blocks[t].type||"unstyled",depth:a&&a.blocks[t]&&a.blocks[t].depth,data:a&&a.blocks[t]&&a.blocks[t].data||new u.Map({}),text:e,characterList:o})}),entityMap:l}}return null}}],i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=2);function i(e){if(a[e])return a[e].exports;var t=a[e]={i:e,l:!1,exports:{}};return o[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}var o,a});