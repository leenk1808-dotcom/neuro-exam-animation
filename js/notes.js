/* =================================================================
   특강 보충 노트 (무음): 장면의 빈 공간을 찾아 국시 특강 자료의 추가 내용을 띄움
   데이터: window.NOTE_DATA = { '<clip code>': { '<step id>': {t, b:[...], k} } }
   - 앵커 대사부터 다음 앵커 전까지 같은 노트를 유지
   - 퀴즈·메뉴가 보이면 숨김, 화면 요소/3D와 겹치지 않는 가장 넓은 빈칸에 배치
   ================================================================= */
(()=>{
const SW=1600, SH=900, CELL=20, GC=SW/CELL, GR=SH/CELL, PAD=14;
const stageEl=document.getElementById('stage')||document.querySelector('#scene').parentElement;
const sceneEl=document.getElementById('scene');
const box=document.createElement('div'); box.id='xnote'; stageEl.appendChild(box);
const st=document.createElement('style'); st.textContent=`
#xnote{position:absolute;z-index:6;pointer-events:none;opacity:0;transition:opacity .45s ease;box-sizing:border-box;
 background:linear-gradient(150deg,rgba(14,20,40,.97),rgba(26,33,58,.96));border:1px solid #5b6a92;border-left:4px solid #FFD25E;
 border-radius:14px;padding:13px 17px 12px;color:#e6ecfa;box-shadow:0 14px 36px rgba(0,0,0,.45);overflow:hidden;word-break:keep-all}
#xnote.on{opacity:1}
#xnote .xk{display:flex;align-items:center;gap:8px;font-size:.72em;letter-spacing:.14em;color:#9fb3e3;font-weight:800;margin-bottom:5px}
#xnote .xk i{font-style:normal;letter-spacing:0;background:#FFD25E;color:#1b1b1b;border-radius:6px;padding:1px 7px;font-size:.95em}
#xnote h4{margin:0 0 7px;font-size:1.12em;color:#FFE18A;font-weight:800;line-height:1.3}
#xnote ul{margin:0;padding:0;list-style:none}
#xnote li{position:relative;padding:3px 0 3px 15px;line-height:1.42;border-top:1px dashed #ffffff14}
#xnote li:first-child{border-top:0}
#xnote li::before{content:'';position:absolute;left:2px;top:.72em;width:6px;height:6px;border-radius:50%;background:#8fc4ff}
#xnote li b{color:#fff}
`; document.head.appendChild(st);

const N={ci:-1, key:null, rect:null, timer:null};
const NX_OFF=new Set(['4-1','4-2','5','6','7','8-1','8-2','9','K']);
function noteFor(ci, si){
  const c=CLIPS[ci]; if(!c || NX_OFF.has(c.code)) return null; const D=(window.NOTE_DATA||{})[c.code]; if(!D) return null;
  let found=null; for(let i=0;i<=si && i<c.steps.length;i++){ const id=c.steps[i].id; if(id && D[id]) found=id; }
  return found ? {id:found, n:D[found]} : null;
}
function stageScale(){ const r=stageEl.getBoundingClientRect(); return {s:r.width/SW, x:r.left, y:r.top}; }
function visibleOpacity(el){ const cs=getComputedStyle(el); if(cs.display==='none'||cs.visibility==='hidden') return 0; return parseFloat(cs.opacity); }
function collectRects(){
  const S=stageScale(), out=[];
  const toStage=r=>({x:(r.left-S.x)/S.s, y:(r.top-S.y)/S.s, w:r.width/S.s, h:r.height/S.s});
  const walk=(el, op)=>{
    const o=op*visibleOpacity(el); if(o<0.06) return;
    const r=toStage(el.getBoundingClientRect()); if(r.w<2||r.h<2) return;
    const big=r.w*r.h>SW*SH*0.5;
    if(big && el.children.length){
      [...el.children].forEach(ch=>walk(ch,o));
      if([...el.childNodes].some(n=>n.nodeType===3 && n.textContent.trim())){ const rg=document.createRange(); [...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).forEach(n=>{ rg.selectNodeContents(n); out.push(toStage(rg.getBoundingClientRect())); }); }
      return; }
    out.push(r);
  };
  [...sceneEl.children].forEach(ch=>walk(ch,1));
  const lb=document.getElementById('labels'); if(lb) [...lb.children].forEach(ch=>walk(ch,1));
  const cap=document.getElementById('cap'); if(cap) out.push({x:0,y:735,w:SW,h:SH-735});
  if(window.W && W.screenBox){ try{ const b=W.screenBox(); if(b && b.w>4) out.push({x:b.x-10,y:b.y-10,w:b.w+20,h:b.h+20}); }catch(e){} }
  return out;
}
function freeGrid(rects){
  const g=Array.from({length:GR},()=>new Uint8Array(GC));
  for(const r of rects){ const c0=Math.max(0,Math.floor((r.x-PAD)/CELL)), c1=Math.min(GC-1,Math.floor((r.x+r.w+PAD)/CELL)), r0=Math.max(0,Math.floor((r.y-PAD)/CELL)), r1=Math.min(GR-1,Math.floor((r.y+r.h+PAD)/CELL));
    for(let y=r0;y<=r1;y++) for(let x=c0;x<=c1;x++) g[y][x]=1; }
  // stage margins
  for(let y=0;y<GR;y++){ g[y][0]=1; g[y][GC-1]=1; } for(let x=0;x<GC;x++){ g[0][x]=1; g[1][x]=1; g[2][x]=1; }
  return g;
}
function candidates(g){
  const hgt=new Array(GC).fill(0), out=[];
  for(let y=0;y<GR;y++){
    for(let x=0;x<GC;x++) hgt[x]=g[y][x]?0:hgt[x]+1;
    const stack=[];
    for(let x=0;x<=GC;x++){ const h=x<GC?hgt[x]:0; let start=x;
      while(stack.length && stack[stack.length-1][1]>=h){ const [sx,sh]=stack.pop(); const w=x-sx; if(sh>0) out.push({x:sx*CELL,y:(y-sh+1)*CELL,w:w*CELL,h:sh*CELL}); start=sx; }
      stack.push([start,h]); }
  }
  return out;
}
function render(n){
  const tag=n.k?`<i>${n.k}</i>`:'';
  box.innerHTML=`<div class="xk">특강 노트 ${tag}</div><h4>${n.t||''}</h4><ul>${(n.b||[]).map(x=>`<li>${x}</li>`).join('')}</ul>`;
}
function fits(r){
  box.style.left=r.x+'px'; box.style.top=r.y+'px'; box.style.width=r.w+'px'; box.style.maxHeight='none';
  for(const fs of [17,16,15,14,13]){ box.style.fontSize=fs+'px'; if(box.scrollHeight<=r.h) return true; }
  return false;
}
function place(force){
  const quiz=sceneEl.querySelector('.quiz.on'), menu=document.getElementById('menu'), endv=document.getElementById('endov');
  const hide=()=>{ box.classList.remove('on'); N.rect=null; };
  if(N.ci<0 || quiz || (menu && menu.classList.contains('on')) || (endv && endv.classList.contains('on'))) return hide();
  const cur=noteFor(N.ci, N.si); if(!cur) return hide();
  const key=N.ci+'|'+cur.id; const wasOn=box.classList.contains('on');
  const g=freeGrid(collectRects());
  // 현재 위치가 여전히 비어 있으면 유지
  if(!force && N.key===key && N.rect){ const r=N.rect; let ok=true;
    for(let y=Math.floor(r.y/CELL); y<Math.ceil((r.y+r.h)/CELL)&&ok; y++) for(let x=Math.floor(r.x/CELL); x<Math.ceil((r.x+r.w)/CELL); x++){ if(!g[y]||g[y][x]){ ok=false; break; } }
    if(ok){ if(wasOn) box.classList.add('on'); return; }
    box.classList.remove('on'); N.rect=null; N.key=key+'|blocked'; return; }
  if(!force && N.key===key+'|blocked') return;
  if(wasOn){ box.classList.remove('on'); }
  if(N.key!==key){ render(cur.n); N.key=key; }
  const cs=candidates(g).filter(r=>r.w>=320 && r.h>=150)
    .map(r=>{ const w=Math.min(r.w-8,600), h=Math.min(r.h-8,470); return {x:r.x+4+(r.w-8-w>0 && r.x>SW/2 ? (r.w-8-w) : 0), y:r.y+4, w, h, sc:w*Math.min(h,330)+ (r.x>SW*0.55?8000:0)}; })
    .sort((a,b)=>b.sc-a.sc);
  for(const r of cs.slice(0,40)){
    if(fits(r)){ box.style.maxHeight=r.h+'px'; box.style.height='auto'; N.rect={x:r.x,y:r.y,w:r.w,h:Math.min(r.h,box.scrollHeight)}; box.classList.add('on'); return; }
  }
  // 글머리 일부를 줄여서라도 넣기
  const n=cur.n; if(n.b && n.b.length>3){ const keep={...n, b:n.b.slice(0,3)}; render(keep);
    for(const r of cs.slice(0,40)) if(fits(r)){ N.rect={x:r.x,y:r.y,w:r.w,h:Math.min(r.h,box.scrollHeight)}; box.classList.add('on'); N.key=key+'|short'; return; } }
  hide();
}
function schedule(ms){ clearTimeout(N.t1); N.t1=setTimeout(()=>place(true), ms); }

// 엔진 연결
const _build=window.build, _apply=window.applyStart;
window.build=function(ci){ N.ci=ci; N.si=-1; N.key=null; N.rect=null; box.classList.remove('on'); return _build.apply(this, arguments); };
window.applyStart=function(step){ const r=_apply.apply(this, arguments);
  const c=CLIPS[N.ci]; if(c){ const i=c.steps.indexOf(step); if(i>=0) N.si=i; }
  schedule(INSTANT?120:900); return r; };
setInterval(()=>{ if(N.ci>=0 && N.si>=0) place(false); }, 1300);
window.NX={place:()=>place(true), state:N};
})();
