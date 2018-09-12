var app=function(){"use strict";function t(){}function e(t,e){for(var n in e)t[n]=e[n];return t}function n(t,e){for(var n in e)t[n]=1;return t}function i(t){t()}function r(t,e){t.appendChild(e)}function a(t,e,n){t.insertBefore(e,n)}function s(t){t.parentNode.removeChild(t)}function o(t){return document.createElement(t)}function c(t){return document.createTextNode(t)}function l(t,e,n){t.addEventListener(e,n,!1)}function d(t,e,n){t.removeEventListener(e,n,!1)}function h(t,e){t.data=""+e}function u(){return Object.create(null)}function m(t){t._lock=!0,p(t._beforecreate),p(t._oncreate),p(t._aftercreate),t._lock=!1}function f(t,e){t._handlers=u(),t._slots=u(),t._bind=e._bind,t._staged={},t.options=e,t.root=e.root||t,t.store=e.store||t.root.store,e.root||(t._beforecreate=[],t._oncreate=[],t._aftercreate=[])}function p(t){for(;t&&t.length;)t.shift()()}var _={destroy:function(e){this.destroy=t,this.fire("destroy"),this.set=t,this._fragment.d(!1!==e),this._fragment=null,this._state={}},get:function(){return this._state},fire:function(t,e){var n=t in this._handlers&&this._handlers[t].slice();if(n)for(var i=0;i<n.length;i+=1){var r=n[i];if(!r.__calling)try{r.__calling=!0,r.call(this,e)}finally{r.__calling=!1}}},on:function(t,e){var n=this._handlers[t]||(this._handlers[t]=[]);return n.push(e),{cancel:function(){var t=n.indexOf(e);~t&&n.splice(t,1)}}},set:function(t){this._set(e({},t)),this.root._lock||m(this.root)},_recompute:t,_set:function(t){var n=this._state,i={},r=!1;for(var a in t=e(this._staged,t),this._staged={},t)this._differs(t[a],n[a])&&(i[a]=r=!0);r&&(this._state=e(e({},n),t),this._recompute(i,this._state),this._bind&&this._bind(i,this._state),this._fragment&&(this.fire("state",{changed:i,current:this._state,previous:n}),this._fragment.p(i,this._state),this.fire("update",{changed:i,current:this._state,previous:n})))},_stage:function(t){e(this._staged,t)},_mount:function(t,e){this._fragment[this._fragment.i?"i":"m"](t,e||null)},_differs:function(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}};window.serverBase;var v={createMap(t){let e=(t.app||{}).gmxMap||{},n=t.state||{},i=e.mapID||"946GH",r=(e.apiKey,n.map?n.map.position:{});var a=L.tileLayer("//tilessputnik.ru/{z}/{x}/{y}.png",{maxZoom:18});let s=new L.Map("map",{layers:[a],center:new L.LatLng(r.y||0,r.x||60),zoom:r.z||3});s.gmxControlsManager.init(),L.gmx.loadMap(i,{leafletMap:s}),this.set({map:s})}};function g({changed:t,current:e,previous:n}){t.permalink&&e.permalink&&this.createMap(e.permalink)}function k(r){var c,l;f(this,r),this._state=e({permalink:null,map:null},r.data),this._intro=!!r.intro,this._handlers.state=[g],g.call(this,{changed:n({},this._state),current:this._state}),this._fragment=(this._state,{c(){(c=o("div")).id="map"},m(t,e){a(t,c,e),l=!0},p:t,i(t,e){l||this.m(t,e)},o:i,d(t){t&&s(c)}}),this.root._oncreate.push(()=>{this.fire("update",{changed:n({},this._state),current:this._state})}),r.target&&(this._fragment.c(),this._mount(r.target,r.anchor),m(this)),this._intro=!0}e(k.prototype,_),e(k.prototype,v);const y=window.serverBase||"//maps.kosmosnimki.ru/";var w={checkMe(t){},editTrigger(t,e){let n=t.parentNode,i=n.parentNode.lastChild;e?(i.previousElementSibling.classList.remove("hidden"),i.classList.add("hidden")):(i.previousElementSibling.classList.add("hidden"),i.classList.remove("hidden")),n.firstChild.classList.remove("checked"),n.lastChild.classList.remove("checked"),t.classList.add("checked")},getPermalink(t){return fetch(y+"TinyReference/Get.ashx?WrapStyle=None&id="+t,{mode:"cors",credentials:"include"}).then(t=>t.json()).then(t=>{if("ok"===t.Status){let e=t.Result?JSON.parse(t.Result):{};this.set({permalink:e,confStr:JSON.stringify(e,null,2)})}})}};function M({changed:t,current:e,previous:n}){t.urlParams&&this.getPermalink(e.urlParams.config)}function b({changed:t,current:e,previous:n}){if(t.confStr){let t=document.getElementsByClassName("view")[0];t.innerHTML=e.confStr,hljs.highlightBlock(t)}}function N(t,e){var n,i,u,m,f,p,_,v=e.it.title;return{c(){n=o("div"),i=o("i"),m=c("\r\n\t\t\t\t\t"),f=o("span"),p=c(v),i.className=u="icon-"+e.it.name+" svelte-foruym",n._svelte={component:t,ctx:e},l(n,"click",S),n.className=_="dropdownMenuWidget-item"+(e.it.checked?" checked":"")+" svelte-foruym"},m(t,e){a(t,n,e),r(n,i),r(n,m),r(n,f),r(f,p)},p(t,e){t.dropdownMenu&&u!==(u="icon-"+e.it.name+" svelte-foruym")&&(i.className=u),t.dropdownMenu&&v!==(v=e.it.title)&&h(p,v),n._svelte.ctx=e,t.dropdownMenu&&_!==(_="dropdownMenuWidget-item"+(e.it.checked?" checked":"")+" svelte-foruym")&&(n.className=_)},d(t){t&&s(n),d(n,"click",S)}}}function x(t,e,n){const i=Object.create(t);return i.it=e[n],i.each_value=e,i.it_index=n,i}function S(t){const{component:e,ctx:n}=this._svelte;e.checkMe(n.it)}function C(t){f(this,t),this._state=e({urlParams:{},dropdownMenu:[{name:"refresh",title:"Refresh"},{name:"link",title:"Share"},{name:"magic",title:"Wizard"}],map:null,permalink:null,confStr:""},t.data),this._intro=!!t.intro,this._handlers.state=[M],this._handlers.update=[b],M.call(this,{changed:n({},this._state),current:this._state}),this._fragment=function(t,e){for(var n,i,u,m,f,p,_,v,g,y,w,M,b,L,S,C,E,P,T,W={},j=e.dropdownMenu,B=[],O=0;O<j.length;O+=1)B[O]=N(t,x(e,j,O));function z(e){t.editTrigger(this,!0)}function H(e){t.editTrigger(this)}var R={permalink:e.permalink};void 0!==e.map&&(R.map=e.map,W.map=!0);var G=new k({root:t.root,store:t.store,data:R,_bind(e,n){var i={};!W.map&&e.map&&(i.map=n.map),t._set(i),W={}}});return t.root._beforecreate.push(()=>{G._bind({map:1},G.get())}),{c(){n=o("div"),i=o("div"),u=o("div"),m=o("div");for(var t=0;t<B.length;t+=1)B[t].c();f=c("\r\n\t\t"),p=o("div"),_=o("div"),v=o("ul"),(g=o("li")).innerHTML='<i class="icon-bell"></i>\r\n\t\t\t\t\t\t<span>Edit</span>',y=c("\r\n\t\t\t\t\t"),(w=o("li")).innerHTML='<i class="icon-eye"></i>\r\n\t\t\t\t\t\t<span>View</span>',M=c("\r\n\t\t\t\t"),b=o("textarea"),L=c("\r\n\t\t\t\t"),S=o("div"),C=c(e.confStr),E=c("\r\n"),P=o("div"),G._fragment.c(),m.className="dropdownMenuWidget svelte-foruym",u.className="sidebarPanel-toolbarContainer svelte-foruym",l(g,"click",z),g.className="dropdownMenuWidget-item svelte-foruym",l(w,"click",H),w.className="dropdownMenuWidget-item checked svelte-foruym",v.className="dropdownMenuWidget right svelte-foruym",b.className="text-input hidden svelte-foruym",b.value=e.confStr,S.className="view svelte-foruym",_.className="editor svelte-foruym",p.className="sidebarPanel-codeEditorContainer svelte-foruym",i.className="sidebarPanel svelte-foruym",n.className="editor-sidebarContainer editor_sidebarExpanded svelte-foruym",P.className="editor-viewerContainer editor_sidebarExpanded"},m(t,e){a(t,n,e),r(n,i),r(i,u),r(u,m);for(var s=0;s<B.length;s+=1)B[s].m(m,null);r(i,f),r(i,p),r(p,_),r(_,v),r(v,g),r(v,y),r(v,w),r(_,M),r(_,b),r(_,L),r(_,S),r(S,C),a(t,E,e),a(t,P,e),G._mount(P,null),T=!0},p(n,i){if(e=i,n.dropdownMenu){j=e.dropdownMenu;for(var r=0;r<j.length;r+=1){const i=x(e,j,r);B[r]?B[r].p(n,i):(B[r]=N(t,i),B[r].c(),B[r].m(m,null))}for(;r<B.length;r+=1)B[r].d(1);B.length=j.length}T&&!n.confStr||(b.value=e.confStr,h(C,e.confStr));var a={};n.permalink&&(a.permalink=e.permalink),!W.map&&n.map&&(a.map=e.map,W.map=void 0!==e.map),G._set(a),W={}},i(t,e){T||this.m(t,e)},o(t){T&&(G&&G._fragment.o(t),T=!1)},d(t){t&&s(n),function(t,e){for(var n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(B,t),d(g,"click",z),d(w,"click",H),t&&(s(E),s(P)),G.destroy()}}}(this,this._state),this.root._oncreate.push(()=>{(function(){}).call(this),this.fire("update",{changed:n({},this._state),current:this._state})}),t.target&&(this._fragment.c(),this._mount(t.target,t.anchor),m(this)),this._intro=!0}e(C.prototype,_),e(C.prototype,w);let E=(()=>{let t={};return location.search.substr(1).split("&").forEach(e=>{let n=e.split("=");t[n[0]]=n[1]}),t})();return new C({target:document.body,data:{urlParams:E,name:"world"}})}();
//# sourceMappingURL=bundle.js.map
