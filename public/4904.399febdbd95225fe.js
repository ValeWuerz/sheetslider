"use strict";(self.webpackChunksheet_slider=self.webpackChunksheet_slider||[]).push([[4904],{4904:(G,P,_)=>{_.r(P),_.d(P,{startInputShims:()=>Y});var D=_(9671),L=_(1473),v=_(1643);const b=new WeakMap,y=(e,n,t,o=0)=>{b.has(e)!==t&&(t?M(e,n,o):p(e,n))},T=e=>e===e.getRootNode().activeElement,M=(e,n,t)=>{const o=n.parentNode,r=n.cloneNode(!1);r.classList.add("cloned-input"),r.tabIndex=-1,o.appendChild(r),b.set(e,r);const s="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",n.style.transform=`translate3d(${s}px,${t}px,0) scale(0)`},p=(e,n)=>{const t=b.get(e);t&&(b.delete(e),t.remove()),e.style.pointerEvents="",n.style.transform=""},A="input, textarea, [no-blur], [contenteditable]",U=function(){var e=(0,D.Z)(function*(n,t,o,r,a){if(!o&&!r)return;const s=((e,n,t)=>((e,n,t,o)=>{const r=e.top,a=e.bottom,s=n.top,i=s+15,f=.75*Math.min(n.bottom,o-t)-a,h=i-r,u=Math.round(f<0?-f:h>0?-h:0),c=Math.min(u,r-s),m=Math.abs(c)/.3;return{scrollAmount:c,scrollDuration:Math.min(400,Math.max(150,m)),scrollPadding:t,inputSafeY:4-(r-i)}})((e.closest("ion-item,[ion-item]")||e).getBoundingClientRect(),n.getBoundingClientRect(),t,e.ownerDocument.defaultView.innerHeight))(n,o||r,a);if(o&&Math.abs(s.scrollAmount)<4)t.focus();else if(y(n,t,!0,s.inputSafeY),t.focus(),(0,v.r)(()=>n.click()),typeof window<"u"){let d;const i=function(){var f=(0,D.Z)(function*(){void 0!==d&&clearTimeout(d),window.removeEventListener("ionKeyboardDidShow",l),window.removeEventListener("ionKeyboardDidShow",i),o&&(yield(0,L.b)(o,0,s.scrollAmount,s.scrollDuration)),y(n,t,!1,s.inputSafeY),t.focus()});return function(){return f.apply(this,arguments)}}(),l=()=>{window.removeEventListener("ionKeyboardDidShow",l),window.addEventListener("ionKeyboardDidShow",i)};if(o){const f=yield(0,L.g)(o);if(s.scrollAmount>f.scrollHeight-f.clientHeight-f.scrollTop)return"password"===t.type?(s.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",l)):window.addEventListener("ionKeyboardDidShow",i),void(d=setTimeout(i,1e3))}i()}});return function(t,o,r,a,s){return e.apply(this,arguments)}}(),I="$ionPaddingTimer",C=(e,n)=>{var t,o;if("INPUT"!==e.tagName||e.parentElement&&"ION-INPUT"===e.parentElement.tagName||"ION-SEARCHBAR"===(null===(o=null===(t=e.parentElement)||void 0===t?void 0:t.parentElement)||void 0===o?void 0:o.tagName))return;const r=(0,L.f)(e);if(null===r)return;const a=r[I];a&&clearTimeout(a),n>0?r.style.setProperty("--keyboard-offset",`${n}px`):r[I]=setTimeout(()=>{r.style.setProperty("--keyboard-offset","0px")},120)},Y=e=>{const n=document,t=e.getNumber("keyboardHeight",290),o=e.getBoolean("scrollAssist",!0),r=e.getBoolean("hideCaretOnScroll",!0),a=e.getBoolean("inputBlurring",!0),s=e.getBoolean("scrollPadding",!0),d=Array.from(n.querySelectorAll("ion-input, ion-textarea")),i=new WeakMap,l=new WeakMap,f=function(){var u=(0,D.Z)(function*(c){yield new Promise(g=>(0,v.c)(c,g));const w=c.shadowRoot||c,m=w.querySelector("input")||w.querySelector("textarea"),S=(0,L.f)(c),B=S?null:c.closest("ion-footer");if(m){if(S&&r&&!i.has(c)){const g=((e,n,t)=>{if(!t||!n)return()=>{};const o=d=>{T(n)&&y(e,n,d)},r=()=>y(e,n,!1),a=()=>o(!0),s=()=>o(!1);return(0,v.a)(t,"ionScrollStart",a),(0,v.a)(t,"ionScrollEnd",s),n.addEventListener("blur",r),()=>{(0,v.b)(t,"ionScrollStart",a),(0,v.b)(t,"ionScrollEnd",s),n.addEventListener("ionBlur",r)}})(c,m,S);i.set(c,g)}if((S||B)&&o&&!l.has(c)){const g=((e,n,t,o,r)=>{let a;const s=i=>{a=(0,v.p)(i)},d=i=>{if(!a)return;const l=(0,v.p)(i);!((e,n,t)=>{if(n&&t){const o=n.x-t.x,r=n.y-t.y;return o*o+r*r>e*e}return!1})(6,a,l)&&!T(n)&&(i.stopPropagation(),U(e,n,t,o,r))};return e.addEventListener("touchstart",s,!0),e.addEventListener("touchend",d,!0),()=>{e.removeEventListener("touchstart",s,!0),e.removeEventListener("touchend",d,!0)}})(c,m,S,B,t);l.set(c,g)}}});return function(w){return u.apply(this,arguments)}}();a&&(()=>{let e=!0,n=!1;const t=document;(0,v.a)(t,"ionScrollStart",()=>{n=!0}),t.addEventListener("focusin",()=>{e=!0},!0),t.addEventListener("touchend",s=>{if(n)return void(n=!1);const d=t.activeElement;if(!d||d.matches(A))return;const i=s.target;i!==d&&(i.matches(A)||i.closest(A)||(e=!1,setTimeout(()=>{e||d.blur()},50)))},!1)})(),s&&(e=>{const n=document;n.addEventListener("focusin",r=>{C(r.target,e)}),n.addEventListener("focusout",r=>{C(r.target,0)})})(t);for(const u of d)f(u);n.addEventListener("ionInputDidLoad",u=>{f(u.detail)}),n.addEventListener("ionInputDidUnload",u=>{(u=>{if(r){const c=i.get(u);c&&c(),i.delete(u)}if(o){const c=l.get(u);c&&c(),l.delete(u)}})(u.detail)})}}}]);