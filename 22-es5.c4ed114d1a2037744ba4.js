!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,i(r.key),r)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}function i(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{X3zk:function(e,i,r){"use strict";r.r(i),r.d(i,"LoginModule",(function(){return g}));var o,c,a,u=r("ofXK"),f=r("tyNb"),l=r("fXoL"),s=r("FQVY"),p=[{path:"",component:(o=function(){function e(n,i,r){t(this,e),this.activatedRoute=n,this.router=i,this.generalService=r}return n(e,[{key:"ngOnInit",value:function(){var t=this;this.activatedRoute.queryParams.subscribe((function(e){var n=e["openid.claimed_id"].split("/")[5],i=Number(n.substr(-16,16))-6561197960265728;localStorage.setItem("loginedAccountId",i+""),t.generalService.getAccountId(),t.router.navigate(["players/".concat(i,"/overview")])}),(function(t){console.log(t)}))}}]),e}(),o.\u0275fac=function(t){return new(t||o)(l.Nb(f.a),l.Nb(f.c),l.Nb(s.a))},o.\u0275cmp=l.Hb({type:o,selectors:[["app-login"]],decls:2,vars:0,template:function(t,e){1&t&&(l.Tb(0,"div"),l.Jc(1,"logining..."),l.Sb())},styles:["div[_ngcontent-%COMP%]{position:absolute;top:0;left:0;right:0;border:0;text-align:center;height:100%;line-height:100%;display:flex;color:#fff;z-index:100;background:rgba(0,0,0,.5);align-items:center;justify-content:center}"]}),o)}],b=((a=n((function e(){t(this,e)}))).\u0275mod=l.Lb({type:a}),a.\u0275inj=l.Kb({factory:function(t){return new(t||a)},imports:[[f.g.forChild(p)],f.g]}),a),g=((c=n((function e(){t(this,e)}))).\u0275mod=l.Lb({type:c}),c.\u0275inj=l.Kb({factory:function(t){return new(t||c)},imports:[[u.c,b]]}),c)}}])}();