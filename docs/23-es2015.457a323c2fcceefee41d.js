(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{X3zk:function(t,e,n){"use strict";n.r(e),n.d(e,"LoginModule",(function(){return l}));var o=n("ofXK"),i=n("tyNb"),r=n("fXoL"),c=n("FQVY");const s=[{path:"",component:(()=>{class t{constructor(t,e,n){this.activatedRoute=t,this.router=e,this.generalService=n}ngOnInit(){this.activatedRoute.queryParams.subscribe(t=>{const e=t["openid.claimed_id"].split("/")[5],n=Number(e.substr(-16,16))-6561197960265728;localStorage.setItem("loginedAccountId",n+""),this.generalService.getAccountId(),this.router.navigate([`players/${n}/overview`])},t=>{console.log(t)})}}return t.\u0275fac=function(e){return new(e||t)(r.Ob(i.a),r.Ob(i.c),r.Ob(c.a))},t.\u0275cmp=r.Ib({type:t,selectors:[["app-login"]],decls:2,vars:0,template:function(t,e){1&t&&(r.Ub(0,"div"),r.Kc(1,"logining..."),r.Tb())},styles:["div[_ngcontent-%COMP%]{position:absolute;top:0;left:0;right:0;border:0;text-align:center;height:100%;line-height:100%;display:flex;color:#fff;z-index:100;background:rgba(0,0,0,.5);align-items:center;justify-content:center}"]}),t})()}];let a=(()=>{class t{}return t.\u0275mod=r.Mb({type:t}),t.\u0275inj=r.Lb({factory:function(e){return new(e||t)},imports:[[i.g.forChild(s)],i.g]}),t})(),l=(()=>{class t{}return t.\u0275mod=r.Mb({type:t}),t.\u0275inj=r.Lb({factory:function(e){return new(e||t)},imports:[[o.c,a]]}),t})()}}]);