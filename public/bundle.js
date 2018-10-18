var app=function(){"use strict";function e(){}function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e,t){for(var n in t)e[n]=1;return e}function i(e,t){return 0===t&&e(),function(){--t||e()}}function r(e){e()}function o(e,t){e.appendChild(t)}function s(e,t,n){e.insertBefore(t,n)}function a(e){e.parentNode.removeChild(e)}function c(e,t){for(var n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function l(e){return document.createElement(e)}function u(e){return document.createTextNode(e)}function d(){return document.createComment("")}function f(e,t,n){e.addEventListener(t,n,!1)}function m(e,t,n){e.removeEventListener(t,n,!1)}function p(e,t,n){e.setAttribute(t,n)}function h(e,t){e.data=""+t}function g(e,t,n){e.style.setProperty(t,n)}function v(){return Object.create(null)}function y(e){e._lock=!0,b(e._beforecreate),b(e._oncreate),b(e._aftercreate),e._lock=!1}function _(e,t){e._handlers=v(),e._slots=v(),e._bind=t._bind,e._staged={},e.options=t,e.root=t.root||e,e.store=t.store||e.root.store,t.root||(e._beforecreate=[],e._oncreate=[],e._aftercreate=[])}function b(e){for(;e&&e.length;)e.shift()()}var w={destroy:function(t){this.destroy=e,this.fire("destroy"),this.set=e,this._fragment.d(!1!==t),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(e,t){var n=e in this._handlers&&this._handlers[e].slice();if(n)for(var i=0;i<n.length;i+=1){var r=n[i];if(!r.__calling)try{r.__calling=!0,r.call(this,t)}finally{r.__calling=!1}}},on:function(e,t){var n=this._handlers[e]||(this._handlers[e]=[]);return n.push(t),{cancel:function(){var e=n.indexOf(t);~e&&n.splice(e,1)}}},set:function(e){this._set(t({},e)),this.root._lock||y(this.root)},_recompute:e,_set:function(e){var n=this._state,i={},r=!1;for(var o in e=t(this._staged,e),this._staged={},e)this._differs(e[o],n[o])&&(i[o]=r=!0);r&&(this._state=t(t({},n),e),this._recompute(i,this._state),this._bind&&this._bind(i,this._state),this._fragment&&(this.fire("state",{changed:i,current:this._state,previous:n}),this._fragment.p(i,this._state),this.fire("update",{changed:i,current:this._state,previous:n})))},_stage:function(e){t(this._staged,e)},_mount:function(e,t){this._fragment[this._fragment.i?"i":"m"](e,t||null)},_differs:function(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}};function T(e){e.changed,e.current,e.previous}function k(e,t){var n,i;return{c:function(){(n=l("img")).src=i=t.item.RenderStyle.iconUrl,p(n,"crossorigin",""),n.alt="Style Icon",n.className="svelte-c1342g"},m:function(e,t){s(e,n,t)},p:function(e,t){e.item&&i!==(i=t.item.RenderStyle.iconUrl)&&(n.src=i)},d:function(e){e&&a(n)}}}function x(e,t){var n,i;return{c:function(){(n=l("span")).className=i=t.type+" legendIconStyle  svelte-c1342g",g(n,"background-color",t.backgroundColor),g(n,"border-color",t.borderColor)},m:function(e,t){s(e,n,t)},p:function(e,t){e.type&&i!==(i=t.type+" legendIconStyle  svelte-c1342g")&&(n.className=i),e.backgroundColor&&g(n,"background-color",t.backgroundColor),e.borderColor&&g(n,"border-color",t.borderColor)},d:function(e){e&&a(n)}}}function N(e){var i=this;_(this,e),this._state=t({},e.data),this._recompute({item:1},this._state),this._intro=!!e.intro,this._handlers.state=[T],T.call(this,{changed:n({},this._state),current:this._state}),this._fragment=function(e,t){var n,i;function o(e){return e.item.RenderStyle.iconUrl?k:x}var c=o(t),u=c(e,t);return{c:function(){n=l("span"),u.c(),n.className="legendIconCell style svelte-c1342g"},m:function(e,t){s(e,n,t),u.m(n,null),i=!0},p:function(t,i){c===(c=o(i))&&u?u.p(t,i):(u.d(1),(u=c(e,i)).c(),u.m(n,null))},i:function(e,t){i||this.m(e,t)},o:r,d:function(e){e&&a(n),u.d()}}}(this,this._state),this.root._oncreate.push(function(){i.fire("update",{changed:n({},i._state),current:i._state})}),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor),y(this)),this._intro=!0}t(N.prototype,w),N.prototype._recompute=function(e,t){var n;e.item&&(this._differs(t.backgroundColor,t.backgroundColor=(n=t.item,L.gmxUtil.dec2rgba(n.RenderStyle.fillColor,n.RenderStyle.fillOpacity||1)))&&(e.backgroundColor=!0),this._differs(t.borderColor,t.borderColor=function(e){var t=e.item;return L.gmxUtil.dec2rgba(t.RenderStyle.color,t.RenderStyle.opacity||1)}(t))&&(e.borderColor=!0))};function I(e,t){var n,i,r,o;return{c:function(){n=l("input"),r=u("\r\n\t"),(o=l("span")).innerHTML='<svg role="img" class="svgIcon svelte-parwh"><use xlink:href="#arrow-small-down" href="#arrow-small-down"></use></svg>',n.className="expander expanderInput hidden svelte-parwh",p(n,"type","checkbox"),n.checked=i=!!t.properties.expanded,o.className="expander pointer cmd:toggleFolder expanderCont svelte-parwh"},m:function(e,t){s(e,n,t),s(e,r,t),s(e,o,t)},p:function(e,t){e.properties&&i!==(i=!!t.properties.expanded)&&(n.checked=i)},d:function(e){e&&(a(n),a(r),a(o))}}}function M(e,t){var n;return{c:function(){(n=l("span")).innerHTML='<svg role="img" class="svgIcon svelte-parwh"><use xlink:href="#overlays" href="#overlays"></use></svg>',n.className="cont-overlays svelte-parwh"},m:function(e,t){s(e,n,t)},d:function(e){e&&a(n)}}}function S(e,t){var n;function i(t){e.showInfo(this,t)}return{c:function(){(n=l("span")).innerHTML='<svg role="img" class="svgIcon svelte-parwh"><use xlink:href="#info-circle-i" href="#info-circle-i"></use></svg>',f(n,"click",i),n.className="pointer cmd:showInfo cont-info svelte-parwh",n.title="View description"},m:function(e,t){s(e,n,t)},d:function(e){e&&a(n),m(n,"click",i)}}}function C(e,t){var n;function i(t){e.toggleTimeline(this)}return{c:function(){(n=l("span")).innerHTML='<svg role="img" class="svgIcon svelte-parwh"><use xlink:href="#timeline-icon" href="#timeline-icon"></use></svg>',f(n,"click",i),n.className="pointer cmd:toggleTimeline timeline disabled svelte-parwh"},m:function(e,t){s(e,n,t)},d:function(e){e&&a(n),m(n,"click",i)}}}function D(e,t){var n,i,r,c,d,f=t.properties.styles.length>1&&M(),m=t.properties.description&&S(e),p=t.properties.Temporal&&C(e);return{c:function(){f&&f.c(),n=u("\r\n\t"),i=l("span"),(r=l("span")).innerHTML='<svg role="img" class="svgIcon svelte-parwh"><use xlink:href="#center-on-click" href="#center-on-click"></use></svg>',c=u("\r\n\t\t\t"),m&&m.c(),d=u("\r\n\t\t"),p&&p.c(),r.className="pointer cmd:fitBounds cont-center svelte-parwh",r.title="Move map to this layer",i.className="icons  svelte-parwh"},m:function(e,t){f&&f.m(e,t),s(e,n,t),s(e,i,t),o(i,r),o(i,c),m&&m.m(i,null),o(i,d),p&&p.m(i,null)},p:function(t,r){r.properties.styles.length>1?f||((f=M()).c(),f.m(n.parentNode,n)):f&&(f.d(1),f=null),r.properties.description?m||((m=S(e)).c(),m.m(i,d)):m&&(m.d(1),m=null),r.properties.Temporal?p||((p=C(e)).c(),p.m(i,null)):p&&(p.d(1),p=null)},d:function(e){f&&f.d(e),e&&(a(n),a(i)),m&&m.d(),p&&p.d()}}}function E(e,t){var n,i,r,o,c="group"===t.line.type&&I(0,t),f="layer"===t.line.type&&D(e,t);return{c:function(){n=l("div"),i=u("\r\n\t"),c&&c.c(),r=u("\r\n\t\t"),f&&f.c(),o=d(),n.className="borders "},m:function(e,t){s(e,n,t),s(e,i,t),c&&c.m(e,t),s(e,r,t),f&&f.m(e,t),s(e,o,t)},p:function(t,n){"group"===n.line.type?c?c.p(t,n):((c=I(0,n)).c(),c.m(r.parentNode,r)):c&&(c.d(1),c=null),"layer"===n.line.type?f?f.p(t,n):((f=D(e,n)).c(),f.m(o.parentNode,o)):f&&(f.d(1),f=null)},d:function(e){e&&(a(n),a(i)),c&&c.d(e),e&&a(r),f&&f.d(e),e&&a(o)}}}function B(e,t){var n,i={item:t.styles[0],type:t.properties.GeometryType},r=new N({root:e.root,store:e.store,data:i});return{c:function(){r._fragment.c()},m:function(e,t){r._mount(e,t),n=!0},p:function(e,t){var n={};e.styles&&(n.item=t.styles[0]),e.properties&&(n.type=t.properties.GeometryType),r._set(n)},i:function(e,t){n||this.m(e,t)},o:function(e){n&&(r&&r._fragment.o(e),n=!1)},d:function(e){r.destroy(e)}}}function R(e,t){var n,i,r,o,c,f=t.styles.length&&t.styles.length<2&&t.styles[0].RenderStyle&&B(e,t);return{c:function(){n=l("input"),r=u("\r\n\t\t"),f&&f.c(),o=d(),n.className="check visibility pointer cmd:toggleVisibility svelte-parwh",p(n,"type","checkbox"),n.checked=i=!(!t.layersTree||!t.layersTree.visible[t.nodeID])},m:function(e,t){s(e,n,t),s(e,r,t),f&&f.m(e,t),s(e,o,t),c=!0},p:function(t,r){c&&!t.layersTree&&!t.nodeID||i===(i=!(!r.layersTree||!r.layersTree.visible[r.nodeID]))||(n.checked=i),r.styles.length&&r.styles.length<2&&r.styles[0].RenderStyle?(f?f.p(t,r):(f=B(e,r))&&f.c(),f.i(o.parentNode,o)):f&&f.o(function(){f.d(1),f=null})},i:function(e,t){c||this.m(e,t)},o:function(e){c&&(f?f.o(e):e(),c=!1)},d:function(e){e&&(a(n),a(r)),f&&f.d(e),e&&a(o)}}}function V(e,t){var n,i,r,c,d,f,m,p=t.it.Name,g={item:t.it,type:t.properties.GeometryType},v=new N({root:e.root,store:e.store,data:g});return{c:function(){n=l("div"),(i=l("span")).innerHTML='<svg role="img" class="svgIcon on svelte-parwh"><use xlink:href="#eye-on" href="#eye-on"></use></svg>\r\n\t\t\t\t\t\t<svg role="img" class="svgIcon off svelte-parwh"><use xlink:href="#eye-off" href="#eye-off"></use></svg>',r=u("\r\n\t\t\t\t\t"),v._fragment.c(),c=u("\r\n\t\t\t\t\t"),d=l("span"),f=u(p),i.className="legendIconEye enabled pointer cmd:toggleStyle svelte-parwh",d.className="styleName svelte-parwh",n.className="gmx-style-legend svelte-parwh"},m:function(e,t){s(e,n,t),o(n,i),o(n,r),v._mount(n,null),o(n,c),o(n,d),o(d,f),m=!0},p:function(e,t){var n={};e.styles&&(n.item=t.it),e.properties&&(n.type=t.properties.GeometryType),v._set(n),m&&!e.styles||p===(p=t.it.Name)||h(f,p)},i:function(e,t){m||this.m(e,t)},o:function(e){m&&(v&&v._fragment.o(e),m=!1)},d:function(e){e&&a(n),v.destroy()}}}function P(e,t){for(var n,r,o=t.styles,l=[],u=0;u<o.length;u+=1)l[u]=V(e,G(t,o,u));function f(e,t,n){l[e]&&l[e].o(function(){t&&(l[e].d(t),l[e]=null),n&&n()})}return{c:function(){for(var e=0;e<l.length;e+=1)l[e].c();n=d()},m:function(e,t){for(var i=0;i<l.length;i+=1)l[i].i(e,t);s(e,n,t),r=!0},p:function(t,i){if(t.styles||t.properties){o=i.styles;for(var r=0;r<o.length;r+=1){var s=G(i,o,r);l[r]?l[r].p(t,s):(l[r]=V(e,s),l[r].c()),l[r].i(n.parentNode,n)}for(;r<l.length;r+=1)f(r,1)}},i:function(e,t){r||this.m(e,t)},o:function(e){if(r){for(var t=i(e,(l=l.filter(Boolean)).length),n=0;n<l.length;n+=1)f(n,0,t);r=!1}},d:function(e){c(l,e),e&&a(n)}}}function H(e,t){var n,i,r=t.styles.length&&t.styles.length>1&&t.styles[0].RenderStyle&&P(e,t);return{c:function(){n=l("div"),r&&r.c(),n.className="legend svelte-parwh"},m:function(e,t){s(e,n,t),r&&r.m(n,null),i=!0},p:function(t,i){i.styles.length&&i.styles.length>1&&i.styles[0].RenderStyle?(r?r.p(t,i):(r=P(e,i))&&r.c(),r.i(n,null)):r&&r.o(function(){r.d(1),r=null})},i:function(e,t){i||this.m(e,t)},o:function(e){i&&(r?r.o(e):e(),i=!1)},d:function(e){e&&a(n),r&&r.d()}}}function U(e,t){var n,r,c,d,p,g,v,y,_=t.properties.title,b="layer"===t.line.type&&R(e,t);function w(t){e.toggleVisibility(this)}var T="layer"===t.line.type&&H(e,t);return{c:function(){n=l("span"),b&&b.c(),r=u("\r\n\t\t"),c=l("label"),d=u(_),p=u("\r\n\t\t"),g=l("div"),v=u("\r\n\t\t"),T&&T.c(),f(c,"click",w),c.className="pointer title cmd:toggleVisibility svelte-parwh",g.className="description collapse svelte-parwh",n.className="cont"},m:function(e,t){s(e,n,t),b&&b.m(n,null),o(n,r),o(n,c),o(c,d),o(n,p),o(n,g),o(n,v),T&&T.m(n,null),y=!0},p:function(t,i){"layer"===i.line.type?(b?b.p(t,i):(b=R(e,i))&&b.c(),b.i(n,r)):b&&b.o(function(){b.d(1),b=null}),y&&!t.properties||_===(_=i.properties.title)||h(d,_),"layer"===i.line.type?(T?T.p(t,i):(T=H(e,i))&&T.c(),T.i(n,null)):T&&T.o(function(){T.d(1),T=null})},i:function(e,t){y||this.m(e,t)},o:function(e){y&&(e=i(e,2),b?b.o(e):e(),T?T.o(e):e(),y=!1)},d:function(e){e&&a(n),b&&b.d(),m(c,"click",w),T&&T.d()}}}function O(e,t){var n,i,r,o="map"!==t.line.type&&E(e,t),c="map"!==t.line.type&&U(e,t);return{c:function(){o&&o.c(),n=u("\r\n\t\t"),c&&c.c(),i=d()},m:function(e,t){o&&o.m(e,t),s(e,n,t),c&&c.m(e,t),s(e,i,t),r=!0},p:function(t,r){"map"!==r.line.type?o?o.p(t,r):((o=E(e,r)).c(),o.m(n.parentNode,n)):o&&(o.d(1),o=null),"map"!==r.line.type?(c?c.p(t,r):(c=U(e,r))&&c.c(),c.i(i.parentNode,i)):c&&c.o(function(){c.d(1),c=null})},i:function(e,t){r||this.m(e,t)},o:function(e){r&&(c?c.o(e):e(),r=!1)},d:function(e){o&&o.d(e),e&&a(n),c&&c.d(e),e&&a(i)}}}function W(e,t){var n,i={},r={line:t.child};void 0!==t.layersTree&&(r.layersTree=t.layersTree,i.layersTree=!0);var o=new F({root:e.root,store:e.store,data:r,_bind:function(t,n){var r={};!i.layersTree&&t.layersTree&&(r.layersTree=n.layersTree),e._set(r),i={}}});return e.root._beforecreate.push(function(){o._bind({layersTree:1},o.get())}),{c:function(){o._fragment.c()},m:function(e,t){o._mount(e,t),n=!0},p:function(e,n){t=n;var r={};e.line&&(r.line=t.child),!i.layersTree&&e.layersTree&&(r.layersTree=t.layersTree,i.layersTree=void 0!==t.layersTree),o._set(r),i={}},i:function(e,t){n||this.m(e,t)},o:function(e){n&&(o&&o._fragment.o(e),n=!1)},d:function(e){o.destroy(e)}}}function j(e,t){for(var n,r,o,u=t.line.content.children||[],d=[],f=0;f<u.length;f+=1)d[f]=W(e,z(t,u,f));function m(e,t,n){d[e]&&d[e].o(function(){t&&(d[e].d(t),d[e]=null),n&&n()})}return{c:function(){n=l("ul");for(var e=0;e<d.length;e+=1)d[e].c();n.className=r="group css-treeview id_"+(t.properties?t.properties.name:"root")+" svelte-parwh"},m:function(e,t){s(e,n,t);for(var i=0;i<d.length;i+=1)d[i].i(n,null);o=!0},p:function(t,i){if(t.line||t.layersTree){u=i.line.content.children||[];for(var s=0;s<u.length;s+=1){var a=z(i,u,s);d[s]?d[s].p(t,a):(d[s]=W(e,a),d[s].c()),d[s].i(n,null)}for(;s<d.length;s+=1)m(s,1)}o&&!t.properties||r===(r="group css-treeview id_"+(i.properties?i.properties.name:"root")+" svelte-parwh")||(n.className=r)},i:function(e,t){o||this.m(e,t)},o:function(e){if(o){for(var t=i(e,(d=d.filter(Boolean)).length),n=0;n<d.length;n+=1)m(n,0,t);o=!1}},d:function(e){e&&a(n),c(d,e)}}}function G(e,t,n){var i=Object.create(e);return i.it=t[n],i.each_value=t,i.it_index=n,i}function z(e,t,n){var i=Object.create(e);return i.child=t[n],i.each_value_1=t,i.child_index=n,i}function F(e){var n,r,c,d,f,m,p,h;_(this,e),this._state=t({line:null},e.data),this._recompute({line:1,properties:1},this._state),this._intro=!!e.intro,this._fragment=(n=this,r=this._state,p=r.properties&&O(n,r),h=r.line.content.children&&j(n,r),{c:function(){c=l("li"),p&&p.c(),d=u("\r\n"),h&&h.c(),c.className=f="line cmd:toggleIcons id:"+r.nodeID+" svelte-parwh"},m:function(e,t){s(e,c,t),p&&p.m(c,null),o(c,d),h&&h.m(c,null),m=!0},p:function(e,t){t.properties?(p?p.p(e,t):(p=O(n,t))&&p.c(),p.i(c,d)):p&&p.o(function(){p.d(1),p=null}),t.line.content.children?(h?h.p(e,t):(h=j(n,t))&&h.c(),h.i(c,null)):h&&h.o(function(){h.d(1),h=null}),m&&!e.nodeID||f===(f="line cmd:toggleIcons id:"+t.nodeID+" svelte-parwh")||(c.className=f)},i:function(e,t){m||this.m(e,t)},o:function(e){m&&(e=i(e,2),p?p.o(e):e(),h?h.o(e):e(),m=!1)},d:function(e){e&&a(c),p&&p.d(),h&&h.d()}}),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor),y(this)),this._intro=!0}t(F.prototype,w),t(F.prototype,{toggleVisibility:function(e){var t="group"===this.get().line.type?e.parentNode.parentNode.getElementsByClassName("expanderInput")[0]:e.parentNode.getElementsByClassName("cmd:toggleVisibility")[0];t&&(t.checked?t.checked=!1:t.checked=!0)},toggleTimeline:function(e){e&&(e.classList.contains("disabled")?(e.classList.remove("disabled"),e.classList.add("enabled")):(e.classList.add("disabled"),e.classList.remove("enabled")))},showInfo:function(e){var t=e.parentNode.nextElementSibling.getElementsByClassName("description")[0];if(t)if(t.classList.contains("collapse")){var n=this.get().line;t.innerHTML=n.content.properties.description||"",t.classList.remove("collapse")}else t.classList.add("collapse")}}),F.prototype._recompute=function(e,t){e.line&&this._differs(t.properties,t.properties=t.line.content.properties)&&(e.properties=!0),e.properties&&(this._differs(t.nodeID,t.nodeID=function(e){var t=e.properties;return t?t.name||t.GroupID:"root"}(t))&&(e.nodeID=!0),this._differs(t.styles,t.styles=function(e){var t=e.properties;return t.gmxStyles?t.gmxStyles.styles:[]}(t))&&(e.styles=!0))};var J={cmd:/cmd:(\w+)/,id:/id:(\w+)/};var Z={chkEvent:function(e){var t=e.target,n=t.className,i=J.cmd.exec(n);if(i&&2===i.length){for(var r={cmd:i[1],type:e.type,originalEvent:e},o=0;o<5;o++){if(t.classList.contains("line")){(i=J.id.exec(t.className))&&2===i.length&&(r.id=i[1]);break}t=t.parentNode}r.id&&(this.treeCommands(r),this.fire("command",r))}},treeCommands:function(e){var t=this.get(),n=t.layersTree,i=t.rawTree;if(console.log("treeCommands",e,n,i),"toggleFolder"===e.cmd){var r=n.expanded||{},o=e.originalEvent.target.previousElementSibling,s=e.id;return r[s]?(delete r[s],o.checked=!1):(r[s]=!0,o.checked=!0),this.set({layersTree:n}),!0}if("showInfo"===e.cmd)e.originalEvent.target,e.id;return!1}};function A(e){_(this,e),this._state=t({config:{},layersTree:{},group:null,rawTree:null},e.data),this._intro=!!e.intro,this._fragment=function(e,t){var n,i,r={},o={line:t.rawTree};void 0!==t.layersTree&&(o.layersTree=t.layersTree,r.layersTree=!0);var c=new F({root:e.root,store:e.store,data:o,_bind:function(t,n){var i={};!r.layersTree&&t.layersTree&&(i.layersTree=n.layersTree),e._set(i),r={}}});function u(t){e.chkEvent(t)}return e.root._beforecreate.push(function(){c._bind({layersTree:1},c.get())}),{c:function(){n=l("div"),c._fragment.c(),f(n,"click",u),n.className="TreeView"},m:function(e,t){s(e,n,t),c._mount(n,null),i=!0},p:function(e,n){t=n;var i={};e.rawTree&&(i.line=t.rawTree),!r.layersTree&&e.layersTree&&(i.layersTree=t.layersTree,r.layersTree=void 0!==t.layersTree),c._set(i),r={}},i:function(e,t){i||this.m(e,t)},o:function(e){i&&(c&&c._fragment.o(e),i=!1)},d:function(e){e&&a(n),c.destroy(),m(n,"click",u)}}}(this,this._state),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor),y(this)),this._intro=!0}t(A.prototype,w),t(A.prototype,Z);window.serverBase;var K={createMap:function(e){var t=(e.app||{}).gmxMap||{},n=e.state||{},i=n.layersTree,r=(n.calendar,t.mapID||"946GH"),o=(t.apiKey,n.map?n.map.position:{}),s=L.tileLayer("//tilessputnik.ru/{z}/{x}/{y}.png",{maxZoom:18}),a=new L.Map("map",{srs:3857,layers:[s],center:new L.LatLng(o.y||0,o.x||60),zoom:o.z||3}),c=L.control.iconSidebar({width111:360});a.addControl(c);var l=L.DomUtil.create("div","treeViewCont"),u=L.DomUtil.create("div","tabIcon",l);L.DomUtil.create("div","tabCont",l);u.innerHTML='<svg role="img" class="svgIcon"><use xlink:href="#overlays" href="#overlays"></use></svg>';var d=c.setPane("treeView",{createTab:function(e){return"active"===e?L.DomUtil.addClass(l,"icon_active"):L.DomUtil.removeClass(l,"icon_active"),l}});a.gmxControlsManager.init(),a.gmxControlsManager.setSvgSprites("//www.kosmosnimki.ru/lib/geomixer_1.3/img/svg-symbols.svg"),this.mapID=r;var f={leafletMap:a,visibleItemOnly:!0,setZIndex:!0,visibility:i.visible};L.gmx.loadMap(r,f).then(function(e){this.set({gmxMap:e}),c.on("opened",function(t){"treeView"===t.id&&this._initTree({container:d,layersTree:i,rawTree:e.rawTree})},this),c.open("treeView",!0);var t=L.control.gmxTimeline({moveable:!0}).on("dateInterval",function(t){e.layersByID[t.layerID].setDateInterval(t.beginDate,t.endDate)}).on("statechanged",function(e){console.log("statechanged",e)}).on("click",function(t){e.layersByID[t.layerID].repaint()});a.addControl(t),this.gmxTimeline=t}.bind(this)),this.set({map:a,config:e})},_createLayer:function(e){var t=L.gmx._maps,n="maps.kosmosnimki.ru",i=t[n]&&t[n][this.mapID]&&t[n][this.mapID]._nodes[e]?t[n][this.mapID]._nodes[e]:L.gmx.gmxMapManager.findLayerInfo("maps.kosmosnimki.ru",this.mapID,e);return i?L.gmx.createLayer(i.content,{layerID:e}):null},_getNodeIndex:function(e){var t,n,i=e.parentNode.children;for(t=0,n=i.length;t<n&&i[t]!==e;t++);return t===n?null:t},_initTree:function(e){var t=this,n={type:"map",content:e.rawTree},i=new A({target:e.container,data:{container:e.container,layersTree:e.layersTree,rawTree:n}});this._treeView=i,i.on("command",function(e){var r=t.get(),o=r.map,s=r.gmxMap,a=e.cmd,c=e.originalEvent.target,l=s.layersByID[e.id];if(console.log("Map command",e,l,s),l){if("fitBounds"===a)o.fitBounds(l.getBounds());else if("toggleVisibility"===a)l._map?o.removeLayer(l):o.addLayer(l);else if("toggleTimeline"===a)c.classList.contains("enabled")?t.gmxTimeline.addLayer(l):t.gmxTimeline.removeLayer(l);else if("toggleStyle"===a){var u=t._getNodeIndex(c.parentNode),d=l.getStyles();c.classList.contains("enabled")?(c.classList.remove("enabled"),d[u].disabled=!0):(c.classList.add("enabled"),delete d[u].disabled),l.setStyles(d)}}else"toggleVisibility"===a&&L.gmx.gmxMapManager.getMapFolder({mapId:t.mapID,folderId:e.id}).then(function(e){i.set({rawTree:n}),console.log("________",e)})})}};function q(e){var t=e.changed,n=e.current;e.previous;t.permalink&&n.permalink&&this.createMap(n.permalink)}function Q(i){var o,c,u=this;_(this,i),this._state=t({permalink:null,map:null},i.data),this._intro=!!i.intro,this._handlers.state=[q],q.call(this,{changed:n({},this._state),current:this._state}),this._fragment=(this._state,{c:function(){(o=l("div")).id="map"},m:function(e,t){s(e,o,t),c=!0},p:e,i:function(e,t){c||this.m(e,t)},o:r,d:function(e){e&&a(o)}}),this.root._oncreate.push(function(){u.fire("update",{changed:n({},u._state),current:u._state})}),i.target&&(this._fragment.c(),this._mount(i.target,i.anchor),y(this)),this._intro=!0}t(Q.prototype,w),t(Q.prototype,K);var X=window.serverBase||"//maps.kosmosnimki.ru/";var Y={checkMe:function(e){},editTrigger:function(e,t){var n=e.parentNode,i=n.parentNode.lastChild;t?(i.previousElementSibling.classList.remove("hidden"),i.classList.add("hidden")):(i.previousElementSibling.classList.add("hidden"),i.classList.remove("hidden")),n.firstChild.classList.remove("checked"),n.lastChild.classList.remove("checked"),e.classList.add("checked")},getPermalink:function(e){var t=this;return fetch(X+"TinyReference/Get.ashx?WrapStyle=None&id="+e,{mode:"cors",credentials:"include"}).then(function(e){return e.json()}).then(function(e){if("ok"===e.Status){var n=e.Result?JSON.parse(e.Result):{};t.set({permalink:n,confStr:JSON.stringify(n,null,2)})}})}};function $(e){var t=e.changed,n=e.current;e.previous;t.urlParams&&this.getPermalink(n.urlParams.config)}function ee(e){var t=e.changed,n=e.current;e.previous;if(n.urlParams.edit&&t.confStr){var i=document.getElementsByClassName("view")[0];i.innerHTML=n.confStr,hljs.highlightBlock(i)}}function te(e,t){var n,i,r,c,d,p,g,v=t.it.title;return{c:function(){n=l("div"),i=l("i"),c=u("\r\n\t\t\t\t\t"),d=l("span"),p=u(v),i.className=r="icon-"+t.it.name+" svelte-1bxmf4s",n._svelte={component:e,ctx:t},f(n,"click",re),n.className=g="dropdownMenuWidget-item"+(t.it.checked?" checked":"")+" svelte-1bxmf4s"},m:function(e,t){s(e,n,t),o(n,i),o(n,c),o(n,d),o(d,p)},p:function(e,t){e.dropdownMenu&&r!==(r="icon-"+t.it.name+" svelte-1bxmf4s")&&(i.className=r),e.dropdownMenu&&v!==(v=t.it.title)&&h(p,v),n._svelte.ctx=t,e.dropdownMenu&&g!==(g="dropdownMenuWidget-item"+(t.it.checked?" checked":"")+" svelte-1bxmf4s")&&(n.className=g)},d:function(e){e&&a(n),m(n,"click",re)}}}function ne(e,t){for(var n,i,r,d,p,g,v,y,_,b,w,T,k,x,N,L,I=t.dropdownMenu,M=[],S=0;S<I.length;S+=1)M[S]=te(e,ie(t,I,S));function C(t){e.editTrigger(this,!0)}function D(t){e.editTrigger(this)}return{c:function(){n=l("div"),i=l("div"),r=l("div"),d=l("div");for(var e=0;e<M.length;e+=1)M[e].c();p=u("\r\n\t\t"),g=l("div"),v=l("div"),y=l("ul"),(_=l("li")).innerHTML='<i class="icon-bell svelte-1bxmf4s"></i>\r\n\t\t\t\t\t\t<span>Edit</span>',b=u("\r\n\t\t\t\t\t"),(w=l("li")).innerHTML='<i class="icon-eye svelte-1bxmf4s"></i>\r\n\t\t\t\t\t\t<span>View</span>',T=u("\r\n\t\t\t\t"),k=l("textarea"),x=u("\r\n\t\t\t\t"),N=l("div"),L=u(t.confStr),d.className="dropdownMenuWidget svelte-1bxmf4s",r.className="sidebarPanel-toolbarContainer svelte-1bxmf4s",f(_,"click",C),_.className="dropdownMenuWidget-item svelte-1bxmf4s",f(w,"click",D),w.className="dropdownMenuWidget-item checked svelte-1bxmf4s",y.className="dropdownMenuWidget right svelte-1bxmf4s",k.className="text-input hidden svelte-1bxmf4s",k.value=t.confStr,N.className="view svelte-1bxmf4s",v.className="editor svelte-1bxmf4s",g.className="sidebarPanel-codeEditorContainer svelte-1bxmf4s",i.className="sidebarPanel svelte-1bxmf4s",n.className="editor-sidebarContainer editor_sidebarExpanded svelte-1bxmf4s"},m:function(e,t){s(e,n,t),o(n,i),o(i,r),o(r,d);for(var a=0;a<M.length;a+=1)M[a].m(d,null);o(i,p),o(i,g),o(g,v),o(v,y),o(y,_),o(y,b),o(y,w),o(v,T),o(v,k),o(v,x),o(v,N),o(N,L)},p:function(t,n){if(t.dropdownMenu){I=n.dropdownMenu;for(var i=0;i<I.length;i+=1){var r=ie(n,I,i);M[i]?M[i].p(t,r):(M[i]=te(e,r),M[i].c(),M[i].m(d,null))}for(;i<M.length;i+=1)M[i].d(1);M.length=I.length}t.confStr&&(k.value=n.confStr,h(L,n.confStr))},d:function(e){e&&a(n),c(M,e),m(_,"click",C),m(w,"click",D)}}}function ie(e,t,n){var i=Object.create(e);return i.it=t[n],i.each_value=t,i.it_index=n,i}function re(e){var t=this._svelte,n=t.component,i=t.ctx;n.checkMe(i.it)}function oe(e){var i=this;_(this,e),this._state=t({urlParams:{},dropdownMenu:[{name:"refresh",title:"Refresh"},{name:"link",title:"Share"},{name:"magic",title:"Wizard"}],map:null,permalink:null,confStr:""},e.data),this._intro=!!e.intro,this._handlers.state=[$],this._handlers.update=[ee],$.call(this,{changed:n({},this._state),current:this._state}),this._fragment=function(e,t){var n,i,r,o={},c=t.urlParams.edit&&ne(e,t),d={permalink:t.permalink};void 0!==t.map&&(d.map=t.map,o.map=!0);var f=new Q({root:e.root,store:e.store,data:d,_bind:function(t,n){var i={};!o.map&&t.map&&(i.map=n.map),e._set(i),o={}}});return e.root._beforecreate.push(function(){f._bind({map:1},f.get())}),{c:function(){c&&c.c(),n=u("\r\n"),i=l("div"),f._fragment.c(),i.className="editor-viewerContainer editor_sidebarExpanded svelte-1bxmf4s"},m:function(e,t){c&&c.m(e,t),s(e,n,t),s(e,i,t),f._mount(i,null),r=!0},p:function(i,r){(t=r).urlParams.edit?c?c.p(i,t):((c=ne(e,t)).c(),c.m(n.parentNode,n)):c&&(c.d(1),c=null);var s={};i.permalink&&(s.permalink=t.permalink),!o.map&&i.map&&(s.map=t.map,o.map=void 0!==t.map),f._set(s),o={}},i:function(e,t){r||this.m(e,t)},o:function(e){r&&(f&&f._fragment.o(e),r=!1)},d:function(e){c&&c.d(e),e&&(a(n),a(i)),f.destroy()}}}(this,this._state),this.root._oncreate.push(function(){(function(){}).call(i),i.fire("update",{changed:n({},i._state),current:i._state})}),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor),y(this)),this._intro=!0}t(oe.prototype,w),t(oe.prototype,Y);var se,ae=(se={},location.search.substr(1).split("&").forEach(function(e){var t=e.split("=");se[t[0]]=t[1]}),se);return new oe({target:document.body,data:{urlParams:ae,name:"world"}})}();
//# sourceMappingURL=bundle.js.map
