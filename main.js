/* NeXT Innovation: particle layer v3 (rounder head, smooth text crossfade, faster start) */
(function(){
'use strict';
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var mobile=matchMedia('(max-width:760px)').matches,dn=mobile?.55:1,rnd=Math.random;
var Q=function(s,r){return(r||document).querySelector(s)},QA=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var loading=function(){return document.body.classList.contains('loading')};
var old=Q('#heroCanvas');if(old)old.remove();
var css=document.createElement('style');
css.textContent='.pline{display:block}#pgl,#ptx{position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none}#pgl{z-index:1}#ptx{z-index:60}'+
 '[data-pt].pt-ready,[data-pt].pt-ready *{color:transparent!important;-webkit-text-fill-color:transparent!important;background:none!important;animation:none!important;filter:none!important;-webkit-text-stroke:0!important}'+
 '[data-pt].pt-show{animation:ptin .6s linear both}@keyframes ptin{from{opacity:0}to{opacity:1}}';
document.head.appendChild(css);

/* ================= 1. 3D PARTICLE HEAD (right side) ================= */
var THREE=window.THREE;
if(THREE){try{(function(){
 var cv=document.createElement('canvas');cv.id='pgl';cv.setAttribute('aria-hidden','true');document.body.insertBefore(cv,document.body.firstChild);
 var gl=new THREE.WebGLRenderer({canvas:cv,antialias:false,alpha:true}),PR=Math.min(devicePixelRatio||1,mobile?1.5:2);gl.setPixelRatio(PR);
 var scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(36,1,.1,100),fig=new THREE.Group();scene.add(fig);
 var U={uP:{value:0},uD:{value:0},uT:{value:0},uPR:{value:PR},uA:{value:.9}};
 var mat=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,depthTest:false,blending:THREE.AdditiveBlending,
  vertexShader:'uniform float uP,uD,uT,uPR;attribute vec3 aS,aC;attribute float aDl;varying vec3 vC;varying float vE;'+
   'void main(){float e=clamp((uP-aDl*.6)/.4,0.,1.);e=1.-pow(1.-e,3.);vec3 p=mix(aS,position,e);p=mix(p,aS,uD*uD);'+
   'p+=.01*e*vec3(sin(uT*1.3+position.y*9.),cos(uT*1.1+position.x*9.),sin(uT+position.z*9.));'+
   'vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=2.3*uPR*(9./-mv.z);vC=aC;vE=(.2+.8*e)*(1.-uD);}',
  fragmentShader:'uniform float uA;varying vec3 vC;varying float vE;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(vC*vE*uA*(1.-d*1.4),1.);}'});
 var SKY=[.56,.7,1],MINT=[.33,.88,.77],LIL=[.71,.61,1],PI=Math.PI;
 function A(){return{p:[],c:[]}}
 function pu(a,x,y,z,c,k){a.p.push(x,y,z);a.c.push(c[0]*k,c[1]*k,c[2]*k)}
 function layer(a){var n=a.p.length/3,S=new Float32Array(n*3),D=new Float32Array(n),i,u,t,r,L;
  for(i=0;i<n;i++){u=rnd()*2-1;t=rnd()*6.2832;r=Math.sqrt(1-u*u);L=9+rnd()*16;S[i*3]=r*Math.cos(t)*L;S[i*3+1]=u*L;S[i*3+2]=r*Math.sin(t)*L;D[i]=rnd()}
  var g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(a.p,3));g.setAttribute('aC',new THREE.Float32BufferAttribute(a.c,3));
  g.setAttribute('aS',new THREE.BufferAttribute(S,3));g.setAttribute('aDl',new THREE.BufferAttribute(D,1));
  var o=new THREE.Points(g,mat);o.frustumCulled=false;return o}
 var gs=function(x,w){return Math.exp(-(x*x)/(w*w))},clamp=function(x,a,b){return Math.min(Math.max(x,a),b)};
 /* head built from a real side profile (face points to -x) */
 function interp(arr){return function(y){if(y<=arr[0][0])return arr[0][1];for(var i=1;i<arr.length;i++)if(y<=arr[i][0]){var t=(y-arr[i-1][0])/(arr[i][0]-arr[i-1][0]);t=t*.5+t*t*(3-2*t)*.5;return arr[i-1][1]+(arr[i][1]-arr[i-1][1])*t}return arr[arr.length-1][1]}}
 var xf0=interp([[-1,-.1],[-.9,-.5],[-.8,-.84],[-.72,-.92],[-.6,-.87],[-.5,-.83],[-.4,-.9],[-.3,-.86],[-.2,-.93],[-.08,-.86],[0,-1.1],[.1,-1.04],[.2,-.93],[.34,-.85],[.46,-.82],[.58,-.9],[.7,-.88],[.9,-.76],[1.08,-.5],[1.2,-.18],[1.28,.2]]);
 var xb0=interp([[-1,.52],[-.7,.62],[-.4,.8],[-.1,.93],[.2,.99],[.5,1.02],[.8,1],[1.05,.88],[1.2,.6],[1.28,.2]]);
 /* ROUND SKULL: the side profile is what you actually see, so the dome is now a true ellipse (blended into the face/neck profile) */
 function sm(t){t=clamp(t,0,1);return t*t*(3-2*t)}
 function ell(y,r){var d=(y-.5)/.78;return r*Math.sqrt(Math.max(0,1-d*d))}
 function xf(y){var t=sm((y-.6)/.3);return xf0(y)*(1-t)+(.2-ell(y,1.05))*t}
 function xb(y){var t=sm((y+.1)/.4);return xb0(y)*(1-t)+(.2+ell(y,.85))*t}
 /* ROUNDER HEAD: wider ear-to-ear (.9), softer jaw taper (.15) */
 function wid(y){var u=(y-.2)/1.12,w=.9*Math.sqrt(Math.max(0,1-u*u))+.05;if(y<-.3)w*=1-.15*(-.3-y)/.7;return w}
 /* true elliptical cross-section (w*s), softer face pinch (.3) */
 function sp(y,phi){var f=xf(y),b=xb(y),a=Math.max(.03,(b-f)/2),c=(b+f)/2,s=Math.sin(phi),co=Math.cos(phi),fw=Math.max(0,-co);fw=fw*fw*fw;
  var w=wid(y)*(1-.3*fw*gs(y-.02,.2));return[c+a*co,y,w*s]}
 function phiMin(y){return 1.3-.55*clamp((y-.5)/.6,0,1)}
 var H=A(),K=Math.round(64*dn+12),NSm=Math.round(180*dn+30),k,s,y,phi,pm,pt,i;
 for(k=0;k<K;k++){y=-.98+2.25*k/(K-1);pm=phiMin(y);var cb=k%9===4?MINT:SKY;
  for(s=0;s<=NSm;s++){phi=PI-(PI-pm)*s/NSm;if(Math.sin(phi*17+k*2.3)>.55+.25*Math.sin(k*1.3))continue;pt=sp(y,phi);pu(H,pt[0],pt[1],pt[2],cb,.75*(.95-.5*s/NSm))}}
 for(y=-.98;y<=1.28;y+=.0035/dn){pt=sp(y,PI);pu(H,pt[0],pt[1],0,SKY,1.1)}           /* front profile line */
 for(y=.55;y<=1.28;y+=.006/dn){pt=sp(y,0);pu(H,pt[0],pt[1],0,SKY,.7)}                 /* back-of-skull outline */
 for(y=-.98;y<=1.2;y+=.008/dn){pt=sp(y,phiMin(y)+.06*Math.sin(y*38));pu(H,pt[0],pt[1],pt[2],MINT,1)} /* ragged cut-away edge */
 [.12,.3,.5,.7,.9,1.1,1.3,1.5].forEach(function(dl,mi){var ph=PI-dl;for(var yy=-.98;yy<=1.27;yy+=.012/dn){if(ph<phiMin(yy))continue;var q=sp(yy,ph);pu(H,q[0],q[1],q[2],mi===0?MINT:SKY,.5)}});
 for(k=0;k<1500*dn;k++){y=-.95+2.2*rnd();pm=phiMin(y);phi=PI-(PI-pm)*Math.pow(rnd(),1.4);pt=sp(y,phi);pu(H,pt[0],pt[1],pt[2],SKY,.28)}
 for(i=0;i<44;i++){var t2=i/44*6.2832;pt=sp(.45+.045*Math.sin(t2),PI-.5+.14*Math.cos(t2));pu(H,pt[0],pt[1],pt[2],MINT,1)}  /* eye */
 for(i=0;i<16;i++){pt=sp(.45+(rnd()-.5)*.05,PI-.5+(rnd()-.5)*.06);pu(H,pt[0],pt[1],pt[2],MINT,1.8)}
 for(i=0;i<60;i++){var dl2=.1+.85*i/59;pt=sp(.6+.05*dl2,PI-dl2);pu(H,pt[0],pt[1],pt[2],SKY,1)}                          /* brow */
 for(i=0;i<50;i++){pt=sp(-.3,PI-.05-.55*i/49);pu(H,pt[0],pt[1],pt[2],LIL,1)}                                          /* lips */
 for(i=0;i<8;i++){pt=sp(-.02,PI-.33+(rnd()-.5)*.06);pu(H,pt[0],pt[1]+(rnd()-.5)*.03,pt[2],MINT,1.2)}                  /* nostril */
 var bn=0;while(bn<1000*dn){var u=rnd()*2-1,pp=rnd()*6.2832,rr=Math.sqrt(1-u*u),bx=.55+.42*rr*Math.cos(pp);if(bx<.2){continue}pu(H,bx,.7+.42*u,.5*rr*Math.sin(pp),rnd()<.5?MINT:LIL,.8);bn++}
 fig.add(layer(H));
 /* neck: half rings, tendons, spine */
 var N=A(),r2,an,cnt=Math.round(48*dn+10),rx,rz,yy,it,m;
 for(r2=0;r2<17;r2++){yy=-1-r2*.17;rx=.34+.03*r2;rz=.3+.07*r2;it=Math.max(.1,1-r2/19);for(s=0;s<=cnt;s++){an=s/cnt*PI;pu(N,Math.cos(an)*rx+.1,yy,Math.sin(an)*rz,SKY,it*.7)}}
 for(m=0;m<7;m++){an=(m+.5)/7*PI;for(yy=-1;yy>-3.3;yy-=.02/dn){r2=(-1-yy)/.17;pu(N,Math.cos(an)*(.34+.03*r2)+.1,yy,Math.sin(an)*(.3+.07*r2),SKY,Math.max(.1,1-r2/19)*.6)}}
 for(var v=0;v<12;v++)for(k=0;k<14;k++)pu(N,.42+(rnd()-.5)*.2,-.95-v*.2+(rnd()-.5)*.11,-.02+(rnd()-.5)*.22,MINT,.8);
 fig.add(layer(N));
 /* cables with flowing pulses */
 function cv3(a){return new THREE.CatmullRomCurve3(a.map(function(p){return new THREE.Vector3(p[0],p[1],p[2])}))}
 var curves=[cv3([[.95,.7,0],[1.5,.2,.1],[1.45,-.6,.05],[.9,-1.4,0],[.5,-2.3,0],[.4,-3.4,0]]),cv3([[.7,-.1,.05],[1.2,-.9,.1],[.9,-1.7,.1],[.45,-2.6,.05],[.35,-3.5,0]]),
  cv3([[.55,1.2,0],[1.2,1,-.1],[1.75,.1,-.1],[1.3,-1.1,-.05],[.7,-2,-.05],[.5,-3.2,-.05]]),cv3([[-.2,-.9,.2],[-.1,-1.6,.25],[-.15,-2.4,.3],[-.1,-3.4,.3]]),cv3([[.2,-.9,.15],[.55,-1.3,.2],[.3,-2.1,.25],[.1,-3.2,.2]])];
 var Cb=A();curves.forEach(function(cu,i){var n=Math.round(150*dn),j,a,pnt;for(j=0;j<=n;j++){pnt=cu.getPoint(j/n);for(a=0;a<4;a++){var t=rnd()*6.2832,rd=i<3?.055:.04;pu(Cb,pnt.x+Math.cos(t)*rd,pnt.y+Math.sin(t)*rd,pnt.z+(rnd()-.5)*rd,i%2?MINT:SKY,.7)}}});
 fig.add(layer(Cb));
 var PC=curves.length*4,pA=new Float32Array(PC*3),pT=[],i2;for(i2=0;i2<PC;i2++)pT.push(rnd());
 var pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pA,3));
 var pulses=new THREE.Points(pg,new THREE.PointsMaterial({color:0xc8fff0,size:.09,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));pulses.frustumCulled=false;fig.add(pulses);
 /* gears */
 var gears=[];
 function gearLayer(R,teeth,spokes,col){var g=A(),ti=R*.86,w=6.2832/teeth,i,j,t,r,a,z,n=Math.round(18*dn+4);
  for(i=0;i<teeth;i++)for(j=0;j<n;j++){t=j/n;r=t<.1?ti+(R-ti)*t/.1:t<.45?R:t<.55?R-(R-ti)*(t-.45)/.1:ti;a=(i+t)*w;z=rnd()<.5?-.07:.07;pu(g,Math.cos(a)*r,Math.sin(a)*r,z,col,.9)}
  [.3,.72,.1].forEach(function(f){var m=Math.round(f*140*R*dn+16);for(j=0;j<m;j++){a=j/m*6.2832;pu(g,Math.cos(a)*R*f,Math.sin(a)*R*f,(rnd()-.5)*.14,col,.7)}});
  for(i=0;i<spokes;i++)for(var e=0;e<2;e++){a=i/spokes*6.2832+(e?-.13:.13)+.065;for(j=0;j<14;j++){var rr=R*(.3+.42*j/13);pu(g,Math.cos(a)*rr,Math.sin(a)*rr,(rnd()-.5)*.14,col,.7)}}
  for(j=0;j<160*R*dn;j++){a=rnd()*6.2832;r=R*(.72+.14*rnd());pu(g,Math.cos(a)*r,Math.sin(a)*r,(rnd()-.5)*.14,col,.35)}return g}
 [[1,30,6,.95,.3,.12,1,SKY],[.46,16,5,.12,-.8,.14,-30/16,MINT],[.34,12,4,1.95,.55,.06,-30/12,LIL],[.5,18,5,1.55,1.5,0,-30/18,MINT],[.22,10,3,.55,-1.55,.2,1.4,SKY],[.38,14,4,.45,1,.1,-2.1,LIL],[.3,12,4,.62,-.55,.12,2.5,SKY]].forEach(function(o){
  var l=layer(gearLayer(o[0],o[1],o[2],o[7]));l.position.set(o[3],o[4],o[5]);fig.add(l);gears.push({g:l,s:.14*o[6]})});
 /* technical annotations */
 var Nn=A();[1.1,.2,-.6,-1.4,-2.6].forEach(function(yy){for(var x=-2.7;x<-1.45;x+=.05){if(((x+3)*5|0)%4===3)continue;pu(Nn,x,yy,0,SKY,.3)}});
 [2.1,2.35].forEach(function(R){for(var a=1.95;a<4.35;a+=.012){if((a*40|0)%3===0)continue;pu(Nn,.1+Math.cos(a)*R,.2+Math.sin(a)*R,0,SKY,.22)}});
 fig.add(layer(Nn));
 var hud=A();for(k=0;k<260*dn;k++){var a3=k/(260*dn)*6.2832,hr=k%7===0?1.3:1.22;pu(hud,Math.cos(a3)*hr,Math.sin(a3)*hr,0,LIL,.45)}
 var hudL=layer(hud);hudL.position.set(.95,.3,-.12);fig.add(hudL);
 var Du=A();for(k=0;k<350*dn;k++)pu(Du,-2.5+rnd()*6,-3.8+rnd()*5.6,-1.6+rnd()*3.2,SKY,.25);fig.add(layer(Du));

 /* layout: structure lives on the right, text stays clear on the left */
 var mx=0,my=0,t0=null,last=performance.now(),sc=1,tX=3,wide=true;
 function lay(){var hw=Math.tan(.314159)*11.5*cam.aspect;wide=innerWidth>900;sc=Math.min(1.05,Math.max(.5,(wide?.8:.7)*hw/5.2));tX=wide?.58*hw-.5*sc:.28*hw;U.uA.value=wide?.9:.35}
 function rs(){gl.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();lay()}rs();addEventListener('resize',rs);
 fig.position.x=tX+6;
 addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
 var ez=function(x){return x*x*(3-2*x)};
 function loop(t){requestAnimationFrame(loop);
  var p=Math.min(scrollY/innerHeight,1);if(document.hidden||scrollY>innerHeight*1.2)return;
  if(loading()){t0=null;return}if(t0==null)t0=t;var sec=(t-t0)/1000,dt=Math.min((t-last)/1000,.05);last=t;
  U.uP.value=Math.min(sec/2.2,1);U.uT.value=sec;U.uD.value=ez(clamp((p-.1)/.7,0,1));
  pulses.material.opacity=(1-U.uD.value)*clamp(sec/2-.5,0,1);
  gears.forEach(function(o){o.g.rotation.z+=dt*o.s});hudL.rotation.z-=dt*.05;
  fig.rotation.y+=((.16+Math.sin(sec*.4)*.1+mx*.35)-fig.rotation.y)*.05;fig.rotation.x+=((my*.08)-fig.rotation.x)*.05;
  fig.position.x+=(tX-fig.position.x)*.06;fig.position.y=-.1*sc;fig.scale.setScalar(sc);
  cam.position.set(0,-.9,11.5);cam.lookAt(0,-.9,0);
  for(var j=0;j<PC;j++){var ci=j%curves.length,pn=curves[ci].getPoint(Math.min(.999,((pT[j]+sec*.1*(1+ci*.18))%1+1)%1));pA[j*3]=pn.x;pA[j*3+1]=pn.y;pA[j*3+2]=pn.z}
  pg.attributes.position.needsUpdate=true;gl.render(scene,cam)}
 requestAnimationFrame(loop);
})()}catch(e){console.warn('Particle head disabled:',e);var c0=Q('#pgl');if(c0)c0.remove()}}

/* ================= 2. TEXT PARTICLES: fly in, form the words, then CROSSFADE into crisp text (plays once) ================= */
var SEL='h1,h2,.sub,.step h3,.step p,.pfx dt,.pfx dd,.course h3,.ask h3,.box h3,.box p,.facts';
var targets=QA(SEL).filter(function(e){return!e.closest('details,.card3d,.rcard,.gq,footer,.nav,.beat')});
targets.forEach(function(h){h.setAttribute('data-pt','');h.classList.remove('rv','lines');QA('.line',h).forEach(function(l){l.classList.remove('line');l.classList.add('pline')})});
var tc=document.createElement('canvas');tc.id='ptx';tc.setAttribute('aria-hidden','true');document.body.appendChild(tc);
var tx=tc.getContext('2d'),DPR=Math.min(devicePixelRatio||1,2);
function trs(){tc.width=innerWidth*DPR;tc.height=innerHeight*DPR;tx.setTransform(DPR,0,0,DPR,0,0)}trs();
var PAL=['rgb(238,240,255)','rgb(84,224,196)','rgb(182,156,255)','rgb(129,161,248)','rgb(190,195,230)'];
var mpx=-999,mpy=-999;addEventListener('pointermove',function(e){mpx=e.clientX;mpy=e.clientY});
var FORM=1.4,FADE=.6; /* seconds to form the words / seconds to crossfade */
var items=targets.map(function(el){return{el:el,on:false,built:false,init:false,done:false,played:false,fail:0,t0:0,doneAt:0,n:0,fs:20,stack:el.closest('.stack')}});
/* Bangla mode turns the particle text off so translated text shows instantly */
window.__ptKill=function(){items.forEach(function(o){o.played=true;o.on=false;o.el.classList.remove('pt-ready','pt-show')});tx.clearRect(0,0,innerWidth,innerHeight)};
function build(o){
 var el=o.el,er=el.getBoundingClientRect(),w=Math.ceil(er.width),h=Math.ceil(er.height);if(w<4||h<4)return false;
 var oc=document.createElement('canvas');oc.width=w;oc.height=h;var c=oc.getContext('2d',{willReadFrequently:true});
 var tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),n,fs=20;
 while((n=tw.nextNode())){var par=n.parentElement,cs=getComputedStyle(par);fs=parseFloat(cs.fontSize)||fs;
  c.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;if('letterSpacing' in c)c.letterSpacing=cs.letterSpacing;
  var rgb=(cs.color.match(/\d+/g)||[238]),muted=+rgb[0]<190,re=/\S+/g,mt,tt=n.nodeValue;
  while((mt=re.exec(tt))){var rg=document.createRange();rg.setStart(n,mt.index);rg.setEnd(n,mt.index+mt[0].length);var rc=rg.getClientRects()[0];if(!rc)continue;
   var asc=c.measureText(mt[0]).fontBoundingBoxAscent||rc.height*.8,x=rc.left-er.left,y=rc.top-er.top+asc,f;
   if(par.closest('.grad')){f=c.createLinearGradient(x,0,x+rc.width,0);f.addColorStop(0,'rgb(170,0,0)');f.addColorStop(.5,'rgb(120,0,0)');f.addColorStop(1,'rgb(70,0,0)')}
   else f=par.closest('.mint')?'rgb(70,0,0)':par.closest('.lilac')?'rgb(120,0,0)':muted?'rgb(220,0,0)':'rgb(20,0,0)';
   c.fillStyle=f;c.fillText(mt[0],x,y)}}
 var img=c.getImageData(0,0,w,h).data,step=Math.max(2,Math.round(fs/24)),cap=fs>40?3600:2000,list;
 do{list=[];for(var yy=0;yy<h;yy+=step)for(var xx=0;xx<w;xx+=step){var i=(yy*w+xx)*4;if(img[i+3]>130){var R=img[i];list.push(xx+(Math.random()-.5)*step*.4,yy+(Math.random()-.5)*step*.4,R<45?0:R<95?1:R<145?2:R<195?3:4)}}step++}while(list.length/3>cap&&step<16);
 var cnt=list.length/3;o.n=cnt;o.fs=fs;o.d=new Float32Array(cnt*7);o.ci=new Uint8Array(cnt);
 for(var j=0;j<cnt;j++){o.d[j*7]=list[j*3];o.d[j*7+1]=list[j*3+1];o.ci[j]=list[j*3+2];o.d[j*7+6]=Math.random()*.4}
 o.built=true;return true}
function reset(o){var W=innerWidth,Hh=innerHeight;
 for(var j=0;j<o.n;j++){var s=Math.random()*4|0,b=j*7,x,y;
  if(s===0){x=-60-Math.random()*300;y=Math.random()*Hh}else if(s===1){x=W+60+Math.random()*300;y=Math.random()*Hh}else if(s===2){x=Math.random()*W;y=-60-Math.random()*300}else{x=Math.random()*W;y=Hh+60+Math.random()*300}
  o.d[b+2]=x;o.d[b+3]=y;o.d[b+4]=0;o.d[b+5]=0}
 o.t0=performance.now();o.done=false;o.el.classList.remove('pt-show');o.el.classList.add('pt-ready')}
/* start when a heading enters view; once it has played it stays as normal text (no re-hiding on scroll) */
var io=new IntersectionObserver(function(es){es.forEach(function(e){var o=items[targets.indexOf(e.target)];if(!o)return;
 if(e.isIntersecting&&!o.on&&!o.played){o.on=true;o.init=false}})},{rootMargin:'0px 0px -8% 0px'});
var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){trs();items.forEach(function(o){if(o.played)return;o.built=false;o.init=false})},250)});
function bail(e){console.warn('Particle text disabled:',e);items.forEach(function(o){o.el.classList.remove('pt-ready','pt-show')});tc.remove();bailed=true}
var bailed=false;
function frame(now){if(bailed)return;requestAnimationFrame(frame);try{
 tx.clearRect(0,0,innerWidth,innerHeight);if(document.hidden||loading())return;
 items.forEach(function(o){if(!o.on)return;
  if(!o.built){if(!build(o)){if(++o.fail>90){o.el.classList.remove('pt-ready');o.on=false;o.played=true}return}}
  if(!o.init){reset(o);o.init=true}
  var el_=(now-o.t0)/1000;
  /* words have formed: start the real text fading IN while the particles fade OUT (true crossfade) */
  if(!o.done&&el_>FORM){o.done=true;o.doneAt=now;o.el.classList.remove('pt-ready');o.el.classList.add('pt-show')}
  var fa=o.done?1-Math.min((now-o.doneAt)/(FADE*1000),1):1;
  if(fa<=0){o.on=false;o.played=true;io.unobserve(o.el);return}
  var er=o.el.getBoundingClientRect(),d=o.d,fs=o.fs,sz=fs>90?2.5:fs>45?1.9:fs>26?1.5:1.25,al=fa;
  if(o.stack&&!o.done){var so=parseFloat(getComputedStyle(o.stack).opacity);if(so>=0)al*=so}
  tx.globalAlpha=al;if(al<.02)return;
  for(var j=0,b=0;j<o.n;j++,b+=7){
   if(el_>d[b+6]){var tX=er.left+d[b],tY=er.top+d[b+1],vx=d[b+4],vy=d[b+5],x=d[b+2],y=d[b+3];
    vx=(vx+(tX-x)*.09)*.78;vy=(vy+(tY-y)*.09)*.78;
    var dx=x-mpx,dy=y-mpy,q=dx*dx+dy*dy;if(q<6400&&q>1){var dd=Math.sqrt(q),f=(1-dd/80)*4;vx+=dx/dd*f;vy+=dy/dd*f}
    d[b+2]=x+vx;d[b+3]=y+vy;d[b+4]=vx;d[b+5]=vy}}
  for(var c=0;c<5;c++){tx.fillStyle=PAL[c];tx.beginPath();for(var k=0,bb=0;k<o.n;k++,bb+=7)if(o.ci[k]===c)tx.rect(d[bb+2],d[bb+3],sz,sz);tx.fill()}
 });tx.globalAlpha=1}catch(e){bail(e)}}
var begin=function(){if(window.__bn){tc.remove();bailed=true;return}targets.forEach(function(t){t.classList.add('pt-ready');io.observe(t)});requestAnimationFrame(frame)};
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(begin);
})();
