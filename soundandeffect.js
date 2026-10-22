(function(){
'use strict';
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var hasGSAP=!!window.gsap&&!!window.ScrollTrigger;
if(hasGSAP)gsap.registerPlugin(ScrollTrigger);
var mobile=matchMedia('(max-width:760px)').matches;
var GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/';
function scramble(el,txt,dur){
 if(window.__trs)txt=window.__trs(txt);
 if(reduce){el.textContent=txt;return}
 var id=(el._sc=(el._sc||0)+1),t0=performance.now();
 (function f(t){if(el._sc!==id)return;
  var p=Math.min((t-t0)/(dur*1000),1),out='';
  for(var i=0;i<txt.length;i++){var ch=txt.charAt(i);out+=(ch===' '||i<txt.length*p)?ch:GL.charAt(Math.floor(Math.random()*GL.length))}
  el.textContent=out;if(p<1)requestAnimationFrame(f)})(t0)}
var burger=$('.burger'),links=$('.links');
if(burger)burger.addEventListener('click',function(){var o=links.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
var lenis=null;
if(!reduce&&window.Lenis){lenis=new Lenis({lerp:.08,prevent:function(){return false}});
 if(hasGSAP){lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0)}
 else{(function r(t){lenis.raf(t);requestAnimationFrame(r)})(0)}}
$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length<2)return;var t=$(id);if(!t)return;e.preventDefault();if(links)links.classList.remove('open');
 if(lenis)lenis.scrollTo(t,{offset:-60,duration:1.4});else t.scrollIntoView({behavior:reduce?'auto':'smooth'})})});

/*  mp3 as the background music + synthesised sound effects.
   ONE switch (the mute button) controls BOTH: muted = total silence, unmuted = music and every effect.
   The mp3 must sit in the same folder as this HTML file. */
var Snd=(function(){
 var ctx=null,master=null,sfxG=null,verb=null,noiseBuf=null,on=false,lastTick=0,lastSwell=0,fadeT=null;
 var MUSIC_SRC='edtech.mp3',MUSIC_VOL=.5;
 var music=new Audio(MUSIC_SRC);music.loop=true;music.preload='auto';music.volume=0;
 var F=function(m){return 440*Math.pow(2,(m-69)/12)};
 /* smooth volume fade for the mp3 */
 function fadeTo(v,ms,done){clearInterval(fadeT);var from=music.volume,t0=performance.now();
  fadeT=setInterval(function(){var p=Math.min((performance.now()-t0)/ms,1);music.volume=Math.max(0,Math.min(1,from+(v-from)*p));
   if(p>=1){clearInterval(fadeT);if(done)done()}},40)}
 music.addEventListener('error',function(){console.warn('Music file could not load. Check that "'+MUSIC_SRC+'" is in the same folder as this HTML file.')});
 var armed=false;
 /* Browsers refuse to play SOUND before the visitor does something on the page.
    So we start the track silently the moment the site opens, and switch the sound on at the very first click / tap / key press. */
 function armRetry(){if(armed)return;armed=true;
  var evs=['pointerdown','pointerup','mousedown','mouseup','click','touchstart','touchend','keydown'];
  function retry(){if(!on)return;
   music.muted=false;music.volume=0;
   var p=music.play();
   if(p&&p.then){p.then(function(){evs.forEach(function(e){removeEventListener(e,retry,true)});armed=false;fadeTo(MUSIC_VOL,1200)}).catch(function(){music.muted=true})}}
  evs.forEach(function(e){addEventListener(e,retry,true)})}
 function startMusic(){music.muted=false;var p=music.play();
  if(p&&p.then){p.then(function(){fadeTo(MUSIC_VOL,1500)}).catch(function(){
   /* sound is blocked: run it muted right now, unmute on the first interaction */
   music.muted=true;music.volume=MUSIC_VOL;var q=music.play();if(q&&q.catch)q.catch(function(){});armRetry()})}
  else fadeTo(MUSIC_VOL,1500)}
 function init(){if(ctx)return;var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ctx=new AC();
  var comp=ctx.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=4;master=ctx.createGain();master.gain.value=0;master.connect(comp);comp.connect(ctx.destination);
  sfxG=ctx.createGain();sfxG.gain.value=1;sfxG.connect(master);
  var len=Math.floor(ctx.sampleRate*2.4),ir=ctx.createBuffer(2,len,ctx.sampleRate),c,i,d;
  for(c=0;c<2;c++){d=ir.getChannelData(c);for(i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
  verb=ctx.createConvolver();verb.buffer=ir;var vg=ctx.createGain();vg.gain.value=.55;verb.connect(vg);vg.connect(master);
  noiseBuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);d=noiseBuf.getChannelData(0);for(i=0;i<d.length;i++)d[i]=Math.random()*2-1}
 function route(node,dest,send){node.connect(dest);if(send){var s=ctx.createGain();s.gain.value=send;node.connect(s);s.connect(verb)}}
 function pluck(freq,t,dur,gain,type,send,dest,lp){var o=ctx.createOscillator(),g=ctx.createGain(),out=g;o.type=type||'sine';o.frequency.value=freq;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);if(lp){var f=ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;g.connect(f);out=f}
  route(out,dest||sfxG,send);o.start(t);o.stop(t+dur+.05)}
 function ui(){var lab=on?'Turn music off':'Turn music on';if(window.__trs)lab=window.__trs(lab);$$('.mute').forEach(function(b){b.setAttribute('aria-pressed',on?'true':'false');b.setAttribute('aria-label',lab)})}
 /* ONE switch: mp3 music + every sound effect */
 function set(v,save){on=v;if(save){try{localStorage.setItem('nx-sound2',v?'1':'0')}catch(e){}}
  if(v){init();if(ctx){ctx.resume();var t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(.85,t+.5)}startMusic()}
  else{if(ctx){var t2=ctx.currentTime;master.gain.cancelScheduledValues(t2);master.gain.setValueAtTime(master.gain.value,t2);master.gain.linearRampToValueAtTime(0,t2+.2)}
   fadeTo(0,300,function(){if(!on)music.pause()})}
  ui()}
 /* browsers block autoplay: this runs on the first click/tap/key and starts the music then */
 function resume(){if(!on)return;if(ctx)ctx.resume();if(music.paused)startMusic()}
 function live(){return on&&ctx&&ctx.state==='running'}
 function tick(){if(!live())return;var t=ctx.currentTime;if(t-lastTick<.14)return;lastTick=t;pluck(F([84,88,91,93,96][Math.floor(Math.random()*5)]),t,.7,.028,'sine',.6,sfxG)}
 function whoosh(){if(!live())return;var t=ctx.currentTime;if(t-lastSwell<1)return;lastSwell=t;
  var s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=noiseBuf;s.loop=true;f.type='bandpass';f.Q.value=.8;
  f.frequency.setValueAtTime(350,t);f.frequency.exponentialRampToValueAtTime(1400,t+1);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.05,t+.4);g.gain.linearRampToValueAtTime(.0001,t+1.2);
  s.connect(f);f.connect(g);route(g,sfxG,.35);s.start(t);s.stop(t+1.3);
  pluck(F(76),t+.25,1.8,.035,'sine',.7,sfxG);pluck(F(83),t+.42,2,.025,'sine',.7,sfxG)}
 function chime(i){if(!live())return;var t=ctx.currentTime,m=[72,76,79,83,88][i%5];pluck(F(m),t,2,.04,'sine',.7,sfxG);pluck(F(m)*2,t,1.2,.012,'sine',.7,sfxG)}
 return{set:set,isOn:function(){return on},resume:resume,tick:tick,whoosh:whoosh,chime:chime}
})();
window.__snd=Snd;
var savedOff=false;try{savedOff=localStorage.getItem('nx-sound2')==='0'}catch(e){}
$$('.mute').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();Snd.set(!Snd.isOn(),true)})});
if(!savedOff){Snd.set(true,false);['pointerdown','keydown','touchend'].forEach(function(ev){addEventListener(ev,function f(){Snd.resume();removeEventListener(ev,f)},{once:true})})}else Snd.set(false,false);
var wasOn=false;document.addEventListener('visibilitychange',function(){if(document.hidden){wasOn=Snd.isOn();if(wasOn)Snd.set(false,false)}else if(wasOn){Snd.set(true,false);wasOn=false}});
$$('.card3d,.tilt,.btn').forEach(function(c){c.addEventListener('mouseenter',Snd.tick)});

/* loader (faster: scripts are already loaded when this runs, so no need to wait for the window load event) */
var loader=$('#loader'),started=false;
function go(){if(started)return;started=true;if(loader){loader.classList.add('done');setTimeout(function(){loader.remove()},500)}document.body.classList.remove('loading');heroExtras();Snd.whoosh();if(window.__showPop)setTimeout(window.__showPop,900)}
if(loader){var word=$('.ld-word'),txt='NeXT Innovation';
 txt.split('').forEach(function(ch,i){var s=document.createElement('span');s.textContent=ch===' '?'':ch;if(ch===' ')s.className='sp';if(ch==='T'&&i===3)s.className='x';s.style.animationDelay=(i*.025)+'s';word.appendChild(s)});
 var bar=$('.ld-bar i'),pct=$('.ld-pct'),t0=performance.now();
 addEventListener('pointermove',function(e){loader.style.setProperty('--lx',(e.clientX/innerWidth*100)+'%');loader.style.setProperty('--ly',(e.clientY/innerHeight*100)+'%')});
 (function tick(t){var p=Math.min((t-t0)/800,1),v=Math.round(p*100);bar.style.width=v+'%';pct.textContent=v+'%';
  if(p>=1){setTimeout(go,60)}else if(t-t0>2500){go()}else requestAnimationFrame(tick)})(t0);
}else go();

/* cursor + magnetic + tilt */
if(!reduce&&matchMedia('(hover:hover)').matches){var curEl=document.createElement('div');curEl.className='cursor';document.body.appendChild(curEl);
 addEventListener('pointermove',function(e){curEl.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'});
 $$('a,button,summary').forEach(function(el){el.addEventListener('mouseenter',function(){curEl.classList.add('big')});el.addEventListener('mouseleave',function(){curEl.classList.remove('big')})});
 $$('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.2)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})})}
$$('.tilt').forEach(function(c){c.addEventListener('pointermove',function(e){if(reduce)return;var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(700px) rotateY('+x*14+'deg) rotateX('+(-y*14)+'deg)'});c.addEventListener('pointerleave',function(){c.style.transform=''})});
$$('.course,.box,.gcard').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});

/* scroll progress */
var pbar=$('.prog i');
function pgUpdate(){if(!pbar)return;var h=document.documentElement.scrollHeight-innerHeight;pbar.style.transform='scaleX('+(h>0?Math.min(scrollY/h,1):0)+')'}
addEventListener('scroll',pgUpdate,{passive:true});pgUpdate();

/* hero extras (the 3D head + headings are drawn by the particle script above) */
var heroDone=false;
function heroExtras(){
 if(heroDone)return;heroDone=true;
 var lab=$('.hero .lab'),rollw=$('.rollw');
 if(lab){var lt=lab.textContent;setTimeout(function(){scramble(lab,lt,.9)},250)}
 if(hasGSAP&&!reduce){
  gsap.from('.roll',{opacity:0,y:24,duration:.9,delay:1.6,ease:'power3.out'});
  gsap.from('.kw-l li',{opacity:0,x:-24,stagger:.12,delay:1.7,duration:.8,ease:'power3.out'});
  gsap.from('.kw-r li',{opacity:0,x:24,stagger:.12,delay:1.7,duration:.8,ease:'power3.out'});
  gsap.from('.scrollcue',{opacity:0,y:20,delay:2,duration:.8,ease:'power3.out'});
 }
 if(rollw&&!reduce){
  var WE=['AI & Prompt Engineering','Web Development','Digital Marketing'],WB=['এআই ও প্রম্পট ইঞ্জিনিয়ারিং','ওয়েব ডেভেলপমেন্ট','ডিজিটাল মার্কেটিং'],wi=0;
  window.__rollRefresh=function(){rollw.textContent=(window.__bn?WB:WE)[wi]};
  if(window.__bn)window.__rollRefresh();
  setTimeout(function(){setInterval(function(){if(document.hidden)return;wi=(wi+1)%WE.length;scramble(rollw,(window.__bn?WB:WE)[wi],.8)},2800)},2600);
 }
}

/* courses carousel */
var helix=$('.helix');
if(helix){var cards=$$('.card3d',helix),n=cards.length,cur=0,cpos=0,auto=true,wrapEl=$('.spiral-wrap'),sx=0,drag=false;
 function go2(i){cur=((i%n)+n)%n}
 function place(){var W=Math.min(360,innerWidth*.66);cards.forEach(function(c,i){var d=i-cpos;while(d>n/2)d-=n;while(d<-n/2)d+=n;var a=Math.abs(d);
  c.style.transform='translate(-50%,-50%) translateX('+(d*W)+'px) translateZ('+(-a*160)+'px) rotateY('+(-d*26)+'deg) scale('+(1-a*.1)+')';
  c.style.opacity=(1-a*.4).toFixed(2);c.style.zIndex=String(10-Math.round(a*3));c.style.filter=a>.5?'blur('+Math.min(a*1.2,2).toFixed(1)+'px)':'none'});
  $$('.cdot').forEach(function(b,i){b.setAttribute('aria-current',i===cur?'true':'false')})}
 (function raf(){var d=cur-cpos;while(d>n/2)d-=n;while(d<-n/2)d+=n;cpos+=d*.1;place();requestAnimationFrame(raf)})();
 $$('.cprev').forEach(function(b){b.addEventListener('click',function(){auto=false;go2(cur-1)})});$$('.cnext').forEach(function(b){b.addEventListener('click',function(){auto=false;go2(cur+1)})});
 $$('.cdot').forEach(function(b,i){b.addEventListener('click',function(){auto=false;go2(i)})});
 setInterval(function(){if(auto&&!document.hidden)go2(cur+1)},4500);
 wrapEl.addEventListener('pointerdown',function(e){drag=true;sx=e.clientX});
 addEventListener('pointerup',function(e){if(!drag)return;drag=false;var dx=e.clientX-sx;if(Math.abs(dx)>50){auto=false;go2(cur+(dx<0?1:-1))}});
 wrapEl.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){auto=false;go2(cur-1)}if(e.key==='ArrowRight'){auto=false;go2(cur+1)}});
 cards.forEach(function(c,i){c.addEventListener('click',function(e){if(i!==cur&&!e.target.closest('a')){auto=false;go2(i)}})})}

/* particle wave */
var wv=$('#waveCanvas');
if(wv&&!reduce){var wc=wv.getContext('2d'),W,H,wm=.5,rings=mobile?30:70,per=mobile?90:200,vis=true;
 function wr(){var d=Math.min(devicePixelRatio,2);W=wv.width=wv.clientWidth*d;H=wv.height=wv.clientHeight*d}wr();addEventListener('resize',wr);
 addEventListener('pointermove',function(e){wm=e.clientX/innerWidth});
 new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(wv);
 (function f(t){requestAnimationFrame(f);if(!vis)return;wc.clearRect(0,0,W,H);var cy=H*.92,R0=Math.min(W*.55,H*.8),sp=scrollY*.002;
  for(var r=0;r<rings;r++){var rr=R0*(.55+r/rings*.5);for(var p=0;p<per;p++){var a=Math.PI+p/per*Math.PI;
   var wave=Math.sin(a*8+t*.0015+r*.3+sp*6)*14+Math.sin(a*3-t*.001+(wm*6))*10,rad=rr+wave;
   wc.fillStyle=(r%3===0)?'rgba(84,224,196,.7)':(r%2?'rgba(116,108,253,.75)':'rgba(182,156,255,.6)');wc.fillRect(W/2+Math.cos(a)*rad*1.25,cy+Math.sin(a)*rad*.8,2.2,2.2)}}})(0)}

/* galaxy reviews */
var gal=$('#reviews');
if(gal){
 var orbit=$('.orbit',gal),gc=$$('.rcard',gal),gn=gc.length,gcnt=$('.gcnt',gal),gst=$('.gstage',gal),sc=$('.stars',gal);
 var gpos=0,gtgt=0,gdo=0,gdrag=false,gsx=0,tx=0,ty=0,ttx=0,tty=0;
 if(!hasGSAP||reduce){gal.classList.add('static')}
 else{
  ScrollTrigger.create({trigger:gal,start:'top top',end:'+='+(gn*60)+'%',pin:true,onUpdate:function(s){gtgt=s.progress*(gn-1)}});
  gst.addEventListener('pointerdown',function(e){gdrag=true;gsx=e.clientX});
  addEventListener('pointerup',function(){gdrag=false});
  gst.addEventListener('pointermove',function(e){ttx=e.clientX/innerWidth-.5;tty=e.clientY/innerHeight-.5;
   if(gdrag)gdo=Math.max(-1.5,Math.min(1.5,(gsx-e.clientX)/innerWidth*gn*.6))});
  gst.addEventListener('pointerleave',function(){ttx=0;tty=0});
  var sx2=sc.getContext('2d'),SW=0,SH=0,S=[],sn=mobile?110:260,gvis=true;
  function sr(){var d=Math.min(devicePixelRatio,2);SW=sc.width=sc.clientWidth*d;SH=sc.height=sc.clientHeight*d}sr();addEventListener('resize',sr);
  var cols=['129,161,248','84,224,196','182,156,255'];
  for(var s=0;s<sn;s++){var rr=Math.pow(Math.random(),.75);S.push({r:rr,a:(s%3)*2.094+rr*3.4+(Math.random()-.5)*.55,z:.8+Math.random()*1.6,c:cols[s%3],tw:Math.random()*6.28})}
  new IntersectionObserver(function(e){gvis=e[0].isIntersecting}).observe(gal);
  var gt0=performance.now();
  (function gloop(t){requestAnimationFrame(gloop);if(!gvis||document.hidden)return;
   gpos+=(gtgt+gdo-gpos)*.07;if(!gdrag)gdo*=.92;
   tx+=(ttx-tx)*.06;ty+=(tty-ty)*.06;
   orbit.style.transform='rotateX('+(-9-ty*8)+'deg) rotateY('+(tx*16)+'deg)';
   var R=Math.min(innerWidth*.4,500),step=Math.PI*2/gn,front=0,best=9;
   gc.forEach(function(c,i){var d=i-gpos;while(d>gn/2)d-=gn;while(d<-gn/2)d+=gn;
    var a=d*step,ad=Math.abs(d),f=Math.max(0,1-ad),co=Math.cos(a);
    if(ad<best){best=ad;front=i}
    var x=Math.sin(a)*R,z=(co-1)*R*.85,y=ad*14-f*6;
    c.style.setProperty('--f',f.toFixed(3));
    c.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,'+z.toFixed(1)+'px) translate(-50%,-50%) rotateY('+(a*.8).toFixed(3)+'rad) scale('+(.78+.4*f).toFixed(3)+')';
    c.style.opacity=(.14+.86*Math.max(0,co)*(.55+.45*f)).toFixed(3);
    c.style.filter=f>.6?'none':'blur('+((1-f)*1.6).toFixed(1)+'px)';
    c.style.zIndex=String(Math.round(co*50)+50)});
   if(gcnt)gcnt.textContent=('0'+(front+1)).slice(-2)+' / '+('0'+gn).slice(-2);
   sx2.clearRect(0,0,SW,SH);var rot=gpos*.55+(t-gt0)*.00005,cx=SW/2,cy=SH*.61,RM=Math.max(SW*.55,SH*.7);
   for(var k=0;k<S.length;k++){var st=S[k],an=st.a+rot*(1.35-st.r*.8),px=cx+Math.cos(an)*st.r*RM,py=cy+Math.sin(an)*st.r*RM*.34;
    var al=.35+.45*Math.sin(t*.001+st.tw);sx2.fillStyle='rgba('+st.c+','+Math.max(.08,al).toFixed(2)+')';sx2.fillRect(px,py,st.z*1.4,st.z*1.4)}
  })(0);
 }
}

/* kinetic marquee */
var mqRows=$$('.mq-row'),mqx=[],mqw=[],vel=0,lastY=scrollY,mqVis=true;
function mqSetup(){
 mqRows.forEach(function(r,i){
  var sets=$$('.mq-set',r);sets.slice(1).forEach(function(s){s.remove()});
  var s0=sets[0],w=s0.getBoundingClientRect().width||1,k=Math.ceil(innerWidth/w)+1;
  for(var j=0;j<k;j++){var c=s0.cloneNode(true);c.setAttribute('aria-hidden','true');r.appendChild(c)}
  mqw[i]=w;if(mqx[i]==null)mqx[i]=0})}
if(!reduce){
 if(mqRows.length){mqSetup();addEventListener('load',mqSetup);addEventListener('resize',mqSetup);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(mqSetup);
  var mqEl=$('.mq');if(mqEl&&'IntersectionObserver' in window)new IntersectionObserver(function(e){mqVis=e[0].isIntersecting}).observe(mqEl)}
 (function motion(){requestAnimationFrame(motion);if(document.hidden)return;
  var y=scrollY,dy=y-lastY;lastY=y;vel+=(dy-vel)*.1;
  var v=Math.max(-40,Math.min(40,vel));
  if(mqVis)mqRows.forEach(function(r,i){var w=mqw[i];if(!w)return;var dir=i%2?1:-1,x=(mqx[i]||0)+dir*(1.1+v*.5);
   if(x<-w)x+=w;if(x>0)x-=w;mqx[i]=x;r.style.transform='translate3d('+x+'px,0,0)'})
 })();
}

/* scroll presentation (headings are particles; this handles everything else) */
function splitWords(el){el.setAttribute('aria-label',el.textContent.replace(/\s+/g,' ').trim());var t=el.textContent.trim().split(/\s+/);el.textContent='';
 return t.map(function(w,i){var s=document.createElement('span');s.className='rwd';s.setAttribute('aria-hidden','true');s.textContent=w;el.appendChild(s);if(i<t.length-1)el.appendChild(document.createTextNode(' '));return s})}
function initText(){
 if(hasGSAP&&!reduce){
  $$('.lab').forEach(function(el){if(el.closest('.galaxy,.story'))return;var lt=el.textContent;gsap.from(el,{opacity:0,x:-20,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%'}});
   if(!el.closest('.hero'))ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:function(){scramble(el,lt,.9)}})});
  $$('.step,.course,.pfx>div,.team .box,.num').forEach(function(s){gsap.from(s,{y:60,opacity:0,duration:1.1,ease:'power3.out',clearProps:'transform',scrollTrigger:{trigger:s,start:'top 92%'}})});
  $$('.ch').forEach(function(c,i){if(i>0)ScrollTrigger.create({trigger:c,start:'top 55%',onEnter:Snd.whoosh})});
  gsap.to('.hero .stack',{scale:.95,opacity:0,y:-60,ease:'none',scrollTrigger:{trigger:'#hook',start:'top top',end:'bottom 25%',scrub:true}});
  $$('.bgnum').forEach(function(b){gsap.fromTo(b,{y:'-14vh'},{y:'14vh',ease:'none',scrollTrigger:{trigger:b.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
  $$('.num').forEach(function(nm){var c=$('.cn',nm),to=+c.getAttribute('data-to'),o={v:0};c.textContent='0';gsap.set(nm,{'--p':0});
   ScrollTrigger.create({trigger:nm,start:'top 88%',once:true,onEnter:function(){
    gsap.to(nm,{'--p':1,duration:1.6,ease:'power3.out'});
    gsap.to(o,{v:to,duration:2,ease:'power3.out',onUpdate:function(){c.textContent=Math.round(o.v)}})}})});
  addEventListener('load',function(){ScrollTrigger.refresh()});setTimeout(function(){ScrollTrigger.refresh()},600);
 }
 var si=$$('.sidx a'),cnt=$('.sidx .cnt');
 if(si.length&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){si.forEach(function(a,i){var on=a.getAttribute('href')==='#'+e.target.id;a.toggleAttribute('data-on',on);if(on&&cnt)cnt.textContent=('0'+(i+1)).slice(-2)+' / '+('0'+si.length).slice(-2)})}})},{rootMargin:'-45% 0px -45% 0px'});
  si.forEach(function(a){var t=$(a.getAttribute('href'));if(t)io.observe(t)})}
}
initText();
})();

