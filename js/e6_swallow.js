/* =================================================================
   EP 6 · 삼킴 움직임 애니메이션 (시상면 도식, 움짤처럼 반복 재생)
   혀 압착 → 연구개 거상 → 설골·후두 상승 → 후두개 반전·성대 폐쇄
   → UES 개방·인두 수축 → 식도 연동 → LES 개방, 음식덩이가 움직임에 맞춰 이동
   ================================================================= */
(()=>{
const NS='http://www.w3.org/2000/svg';
const sm=x=>x<=0?0:x>=1?1:x*x*(3-2*x);
const cl=(x,a,b)=>Math.max(a,Math.min(b,x));
function K(t,kf){ if(t<=kf[0][0]) return kf[0][1]; for(let i=1;i<kf.length;i++){ if(t<=kf[i][0]){ const [t0,a]=kf[i-1],[t1,b]=kf[i]; const u=sm((t-t0)/Math.max(1e-6,t1-t0)); return Array.isArray(a)?a.map((v,j)=>v+(b[j]-v)*u):a+(b-a)*u; } } return kf[kf.length-1][1]; }
const lerp=(a,b,u)=>a+(b-a)*u, P=(x,y)=>x.toFixed(1)+' '+y.toFixed(1);
function spline(pts,closed){ const n=pts.length; let d='M'+P(...pts[0]); const g=i=>closed?pts[(i+n)%n]:pts[cl(i,0,n-1)]; const m=closed?n:n-1; for(let i=0;i<m;i++){ const p0=g(i-1),p1=g(i),p2=g(i+1),p3=g(i+2); d+=' C'+P(p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6)+' '+P(p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6)+' '+P(p2[0],p2[1]); } return d+(closed?' Z':''); }

/* ---------- 시간표 (초) ---------- */
const SEG={pen:[2.0,3.9],asp:[2.0,4.1],res:[2.2,5.2],full:[0,6.9],prep:[0,1.35],oral:[1.0,2.75],phar:[2.35,4.25],ues:[2.6,4.4],eso:[3.95,6.9]};
const CAPS=[
 [0,   '구강준비','씹으면서 침과 섞어 음식덩이를 만들어요',['tongue']],
 [1.25,'구강',   '혀끝부터 입천장을 차례로 눌러 음식덩이를 뒤로 밀어요',['tongue']],
 [2.25,'구강 → 인두','연구개가 올라가 코로 가는 길을 막아요',['velum']],
 [2.72,'인두','설골·후두가 위·앞으로 올라가고 혀뿌리가 뒤로 밀어요',['hyoid','tongue']],
 [3.02,'인두','후두개가 접혀 기도 입구를 덮고 성대가 닫혀요',['epi','air']],
 [3.32,'인두','UES가 열리고 인두벽이 위에서 아래로 짜내요',['ues','wall']],
 [4.08,'식도','UES가 다시 닫히고 연동운동으로 내려가요',['eso','ues']],
 [5.55,'식도','하부식도괄약근(LES)이 열려 위로 들어가요',['les','stom']],
 [6.55,'','다시 처음부터',[]]];
function cap(t){ const M=window.E6SW&&E6SW.mode; if(M==='pen'&&t>2.85) return [0,'침습','음식물이 후두 안에 들어왔지만 성대 위에서 멈춰요',['air','epi']]; if(M==='asp'&&t>2.85) return [0,'흡인','음식물이 성대를 지나 기도 아래로 들어가요',['air']]; if(M==='res'&&t>4.2) return [0,'잔여물','삼킨 뒤 후두개곡·조롱박굴·구강에 음식물이 남아요',['epi','ues','tongue']]; let c=CAPS[0]; for(const x of CAPS) if(t>=x[0]) c=x; return c; }

function state(t){
  const s={};
  s.jaw = t<1.2 ? (0.5-0.5*Math.cos(2*Math.PI*t/0.42))*sm((1.2-t)/0.15) : 0;
  s.cup = K(t,[[0,1],[1.15,1],[1.45,0]]);
  s.w   = K(t,[[1.2,0],[2.45,1],[3.7,1],[4.35,0]]);
  s.rb  = K(t,[[2.65,0],[3.05,1],[3.75,1],[4.35,0]]);
  s.v   = K(t,[[2.15,0],[2.55,1],[4.05,1],[4.45,0]]);
  s.L   = K(t,[[2.7,0],[3.05,1],[3.9,1],[4.4,0]]);
  s.e   = K(t,[[2.95,0],[3.25,1],[3.85,1],[4.3,0]]);
  s.vf  = K(t,[[2.85,0],[3.1,1],[3.9,1],[4.3,0]]);
  s.u   = K(t,[[3.25,0],[3.42,1],[3.95,1],[4.15,0]]);
  s.pA  = K(t,[[3.15,0],[3.3,1],[3.85,1],[4.05,0]]);
  s.pY  = K(t,[[3.15,250],[4.0,525]]);
  s.l   = K(t,[[5.55,0],[5.8,1],[6.3,1],[6.5,0]]);
  s.b   = K(t,[[0,[205,283]],[1.2,[205,283]],[1.6,[238,268]],[2.15,[292,262]],[2.55,[350,292]],[2.95,[388,330]],[3.3,[394,405]],[3.6,[397,470]],[3.9,[398,535]],[4.35,[398,572]],[5.6,[398,668]],[6.15,[410,712]],[6.6,[448,738]]]);
  s.br  = K(t,[[0,[23,15]],[2.3,[21,14]],[2.95,[13,22]],[3.9,[11,25]],[4.35,[12,21]],[5.6,[12,21]],[6.15,[17,13]],[6.6,[20,11]]]);
  s.bo  = K(t,[[0,1],[6.55,1],[6.85,0]]);
  s.eA  = (t>4.1&&t<5.95)?1:0;
  const M=window.E6SW&&E6SW.mode; s.res=0;
  if(M==='pen'||M==='asp'){ s.L*=0.45; s.e=Math.min(s.e,0.3); s.u=0; s.pA*=0.4; s.vf = M==='pen'?s.vf:0;
    s.b = K(t,[[2.15,[292,262]],[2.55,[350,292]],[2.85,[372,345]],[3.15,[358,410]],[3.45,[357,M==='pen'?452:520]],[3.9,[357,M==='pen'?458:600]]]);
    s.br = K(t,[[2.3,[21,14]],[3.0,[14,18]],[3.6,[11,16]]]); }
  if(M==='res'){ s.res=K(t,[[3.9,0],[4.3,1]]); s.br=K(t,[[2.3,[21,14]],[2.95,[13,22]],[3.9,[9,17]],[4.35,[8,13]]]); }
  return s;
}

/* ---------- 그리기 ---------- */
function build(el){
  el.innerHTML='';
  const svg=document.createElementNS(NS,'svg'); svg.setAttribute('viewBox','70 60 530 700'); svg.setAttribute('class','sw-svg');
  svg.innerHTML=`
  <defs>
   <linearGradient id="swSkin" x1="0" x2="1"><stop offset="0" stop-color="#f3c9ad"/><stop offset="1" stop-color="#d79a86"/></linearGradient>
   <linearGradient id="swMus" x1="0" x2="1"><stop offset="0" stop-color="#e57a86"/><stop offset="1" stop-color="#b2475f"/></linearGradient>
   <linearGradient id="swTongue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f08a95"/><stop offset="1" stop-color="#b8475d"/></linearGradient>
   <radialGradient id="swFood" cx=".4" cy=".35"><stop offset="0" stop-color="#fff6c4"/><stop offset=".6" stop-color="#ffcb4f"/><stop offset="1" stop-color="#e8862a"/></radialGradient>
   <filter id="swGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <path class="sw-skin" d="M235 18 C330 6 445 40 480 120 C500 170 492 230 474 300 C460 360 456 420 458 470 L462 760 L150 760 L150 520 C150 470 140 440 120 420 C100 400 95 380 98 350 C100 335 88 330 80 320 C72 310 78 300 82 294 C70 290 66 280 72 270 C66 262 66 255 74 248 C68 236 52 222 40 205 C34 196 46 188 58 182 C70 150 80 110 105 80 C140 40 180 24 235 18 Z"/>
  <path class="sw-nasal" d="M70 192 C120 176 240 168 330 172 C385 175 412 192 420 214 L420 236 C392 234 330 231 300 235 L110 241 C92 238 80 226 70 206 Z"/>
  <path class="sw-cav" d="M96 249 L300 240 C330 242 352 256 360 282 L366 330 L358 420 C350 440 345 452 340 470 L418 470 L420 236 L352 240 Z"/>
  <path class="sw-cav" d="M96 249 L302 240 L300 340 L112 322 C102 300 98 272 96 249 Z"/>
  <path id="swWall" class="sw-wall"/>
  <path id="swEsoL" class="sw-esowall"/><path id="swEsoR" class="sw-esowall"/>
  <path id="swEsoLum" class="sw-esolum"/>
  <g id="swUES"><rect class="sw-sph" id="swUESl" width="12" height="16" rx="5"/><rect class="sw-sph" id="swUESr" width="12" height="16" rx="5"/></g>
  <line x1="300" y1="702" x2="600" y2="702" class="sw-dia"/><text x="592" y="696" class="sw-small" text-anchor="end">횡격막</text>
  <path class="sw-stom" d="M392 704 C376 724 384 760 430 760 L600 760 L600 712 C540 700 470 714 418 704 Z"/>
  <g id="swLES"><rect class="sw-sph" id="swLESl" width="12" height="16" rx="5"/><rect class="sw-sph" id="swLESr" width="12" height="16" rx="5"/></g>
  <g id="swLar">
    <path id="swAir" class="sw-air"/>
    <g id="swRings"></g>
    <path id="swVF1" class="sw-vf"/><path id="swVF2" class="sw-vf"/>
    <ellipse id="swHy" class="sw-bone" rx="15" ry="7"/>
    <path id="swThy" class="sw-cart"/>
  </g>
  <path class="sw-bone" d="M100 236 L300 230 L303 243 L104 251 Z"/>
  <path class="sw-velum" id="swVel"/>
  <g id="swJaw">
    <path class="sw-bone" d="M108 314 L250 352 C272 358 286 372 292 396 L300 424 L282 428 L268 398 C258 380 242 372 222 369 L104 338 Z"/>
    <path class="sw-tooth" d="M104 300 L128 300 L128 314 L106 314 Z"/>
    <path class="sw-lip" d="M78 286 C92 284 104 286 110 292 C104 302 90 304 80 300 Z"/>
  </g>
  <path class="sw-tooth" d="M100 251 L124 250 L124 264 L102 264 Z"/>
  <path class="sw-lip" d="M74 252 C88 250 102 254 108 262 C98 270 84 270 76 266 Z"/>
  <path id="swTon" class="sw-tongue"/>
  <g id="swRes" class="sw-res"><ellipse cx="344" cy="436" rx="11" ry="7"/><ellipse cx="394" cy="506" rx="9" ry="8"/><ellipse cx="168" cy="296" rx="13" ry="6"/><ellipse cx="422" cy="400" rx="5" ry="10"/></g>
  <ellipse id="swBol" class="sw-bolus"/>
  <path id="swEpi" class="sw-epi" d="M-5 0 C-11 -30 -7 -58 4 -74 C11 -58 9 -30 5 0 Z"/>
  <g id="swLab"></g>`;
  el.appendChild(svg);
  const capEl=document.createElement('div'); capEl.className='sw-cap'; capEl.innerHTML='<b></b><span></span>'; el.appendChild(capEl);
  const q=id=>svg.querySelector('#'+id);
  // labels: [key, text, sub, anchorFn, labelX, labelY]
  const LBL=[
   ['velum','연구개','',st=>velTip(st).mid,200,110],
   ['tongue','혀','',st=>[230,300+st.jaw*6],190,410],
   ['epi','후두개','',st=>epiMid(st),205,470],
   ['hyoid','설골·후두','',st=>[318-8*st.L,428-30*st.L],215,535],
   ['air','기도','성대',st=>[352,600],230,615],
   ['wall','인두벽','',st=>[430,330],535,300],
   ['ues','UES','상부식도괄약근',st=>[412,527],530,470],
   ['eso','식도','연동운동',st=>[410,610],535,585],
   ['les','LES','하부식도괄약근',st=>[412,690],530,660],
   ['stom','위','',st=>[470,735],560,738]];
  const lab=q('swLab'); const labEls={};
  for(const [k,txt,sub,,lx,ly] of LBL){ const g=document.createElementNS(NS,'g'); g.setAttribute('class','sw-lbl'); g.innerHTML=`<line class="sw-lead"/><rect rx="9"/><text class="sw-lt" x="${lx}" y="${ly+8}" text-anchor="middle">${txt}</text>`+(sub?`<text class="sw-ls" x="${lx}" y="${ly+32}" text-anchor="middle">${sub}</text>`:''); lab.appendChild(g); labEls[k]=g; const r=g.querySelector('rect'); const w=Math.max(txt.length*27+24, sub?sub.length*17+18:0); r.setAttribute('x',lx-w/2); r.setAttribute('y',ly-22); r.setAttribute('width',w); r.setAttribute('height',sub?62:42); }
  // trachea rings
  let rings=''; for(let y=505;y<700;y+=22) rings+=`<path class="sw-ring" d="M336 ${y} Q356 ${y+6} 376 ${y}"/>`; q('swRings').innerHTML=rings;
  return {svg,capEl,q,LBL,labEls};
}
function velTip(s){ const tip=[lerp(352,414,s.v),lerp(304,244,s.v)], mid=[lerp(338,372,s.v),lerp(256,234,s.v)]; return {tip,mid}; }
function epiBase(s){ return [338-8*s.L, 448-30*s.L]; }
function epiAng(s){ return lerp(12,104,s.e); }
function epiMid(s){ const b=epiBase(s), a=epiAng(s)*Math.PI/180; return [b[0]+38*Math.sin(a), b[1]-38*Math.cos(a)]; }

function render(V,t){
  const s=state(t), q=V.q;
  // tongue
  const D=[[120,292,112,262],[160,281,158,252],[205,274,205,249],[250,271,250,247],[295,279,295,249],[336,300,340,264]];
  const top=D.map((d,i)=>{ const p=i/(D.length-1); const pr=sm(cl((s.w*1.25-p)/0.25,0,1)); let y=lerp(d[1],d[3],pr); if(i===2||i===3) y+=8*s.cup; return [lerp(d[0],d[2],pr), y+s.jaw*6]; });
  const base=[[352+40*s.rb,336],[352+38*s.rb,378],[342+20*s.rb,414]];
  const floor=[[318,424],[250,366],[150,330],[118,306]].map(p=>[p[0],p[1]+s.jaw*6]);
  q('swTon').setAttribute('d',spline([...top,...base,...floor],true));
  q('swJaw').setAttribute('transform',`translate(0 ${(s.jaw*7).toFixed(1)})`);
  // velum
  const vt=velTip(s); q('swVel').setAttribute('d',`M298 238 Q${P(...vt.mid)} ${P(...vt.tip)}`);
  // posterior pharyngeal wall with stripping wave
  const wall=[]; for(let y=200;y<=525;y+=12){ const bul=s.pA*24*Math.exp(-(((y-s.pY)/30)**2)); wall.push([420-bul,y]); }
  const back=[[444,525],[444,200]];
  q('swWall').setAttribute('d',spline(wall,false)+' L'+P(...back[0])+' L'+P(...back[1])+' Z');
  // esophagus: half-width r(y)
  const by=s.b[1], inEso=by>500;
  const r=y=>{ let base=4; if(y>=514&&y<=538) base=3+13*s.u; else if(y>=680&&y<=700) base=3+13*s.l; const dist=inEso?14*Math.exp(-(((y-by)/24)**2)):0; const sq=s.eA*-2*Math.exp(-(((y-(by-40))/12)**2)); return Math.max(2,base+dist+sq); };
  const L=[],R=[]; for(let y=505;y<=704;y+=7){ L.push([398-r(y),y]); R.push([398+r(y),y]); }
  q('swEsoLum').setAttribute('d',spline(L,false)+' L'+R.slice().reverse().map(p=>P(...p)).join(' L')+' Z');
  q('swEsoL').setAttribute('d','M'+L.map(p=>P(p[0]-9,p[1])).join(' L')+' L'+L.slice().reverse().map(p=>P(...p)).join(' L')+' Z');
  q('swEsoR').setAttribute('d','M'+R.map(p=>P(p[0]+9,p[1])).join(' L')+' L'+R.slice().reverse().map(p=>P(...p)).join(' L')+' Z');
  const sph=(id,y,open)=>{ const g=3+13*open; q(id+'l').setAttribute('x',398-g-12); q(id+'l').setAttribute('y',y); q(id+'r').setAttribute('x',398+g); q(id+'r').setAttribute('y',y); };
  sph('swUES',518,s.u); sph('swLES',682,s.l);
  // larynx group: airway top rises with elevation, bottom fixed
  const dx=-8*s.L, dy=-30*s.L;
  q('swAir').setAttribute('d',`M${P(334+dx,456+dy)} C${P(334+dx,500)} 334 560 334 760 L378 760 C378 560 ${P(378+dx,520)} ${P(380+dx,458+dy)} Z`);
  q('swHy').setAttribute('cx',(318+dx).toFixed(1)); q('swHy').setAttribute('cy',(428+dy).toFixed(1));
  q('swThy').setAttribute('d',`M${P(326+dx,446+dy)} C${P(318+dx,470+dy)} ${P(318+dx,500+dy)} ${P(330+dx,524+dy)}`);
  const vfy=492+dy*0.85, gap=16*(1-s.vf);
  q('swVF1').setAttribute('d',`M${P(336+dx*0.9,vfy)} L${P(356-gap/2+dx*0.9,vfy+4)}`);
  q('swVF2').setAttribute('d',`M${P(377+dx*0.9,vfy)} L${P(356+gap/2+dx*0.9,vfy+4)}`);
  q('swRings').setAttribute('transform',`translate(0 ${(dy*0.25).toFixed(1)})`);
  // epiglottis
  const eb=epiBase(s); q('swEpi').setAttribute('transform',`translate(${P(...eb)}) rotate(${epiAng(s).toFixed(1)})`);
  // bolus
  const bb=q('swBol'); bb.setAttribute('cx',s.b[0].toFixed(1)); bb.setAttribute('cy',(s.b[1]+(t<1.2?s.jaw*4:0)).toFixed(1)); bb.setAttribute('rx',s.br[0].toFixed(1)); bb.setAttribute('ry',s.br[1].toFixed(1)); bb.style.opacity=s.bo;
  q('swRes').style.opacity=s.res;
  // labels + caption
  const c=cap(t);
  for(const [k,,,fn,lx,ly] of V.LBL){ const g=V.labEls[k], a=fn(s), ln=g.querySelector('line'); ln.setAttribute('x1',lx); ln.setAttribute('y1',ly); ln.setAttribute('x2',a[0].toFixed(1)); ln.setAttribute('y2',a[1].toFixed(1)); g.classList.toggle('hot',c[3].includes(k)); }
  const capKey=c[1]+c[2]; if(V.capKey!==capKey){ V.capKey=capKey; V.capEl.querySelector('b').textContent=c[1]; V.capEl.querySelector('span').textContent=c[2]; V.capEl.classList.remove('pop'); void V.capEl.offsetWidth; V.capEl.classList.add('pop'); }
}

/* ---------- 재생 ---------- */
const SA={V:null,raf:0,seg:SEG.full,t:0,hold:0,last:0,
  mount(el){ if(!el) return; this.V=build(el); this.t=0; render(this.V,0); },
  mode:null,
  play(name){ if(!this.V) return; this.mode=(name==='pen'||name==='asp'||name==='res')?name:null; this.V.capKey=null; this.seg=SEG[name]||SEG.full; this.t=this.seg[0]; this.hold=0; this.last=performance.now(); render(this.V,this.t); cancelAnimationFrame(this.raf); this.raf=requestAnimationFrame(this.tick); },
  stop(){ cancelAnimationFrame(this.raf); },
  tick(now){ const A=SA; if(!A.V||!A.V.svg.isConnected){ return; }
    let dt=Math.min(.1,(now-A.last)/1000); A.last=now;
    const paused=window.ENGINE&&ENGINE.paused&&ENGINE.paused();
    if(!paused && A.V.svg.getClientRects().length){
      dt*=(typeof SPEED!=='undefined'?SPEED:1)*0.85;
      if(A.hold>0){ A.hold-=dt; if(A.hold<=0) A.t=A.seg[0]; }
      else { A.t+=dt; if(A.t>=A.seg[1]){ A.t=A.seg[1]; A.hold=0.9; } }
      render(A.V,A.t);
    }
    A.raf=requestAnimationFrame(A.tick); }
};
window.E6SW=SA;
})();
