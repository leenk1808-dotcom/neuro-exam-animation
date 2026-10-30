/* =================================================================
   나레이션 연동 강조: 지금 읽는 문장과 겹치는 화면의 글자 줄을 노랗게 강조
   - 음성 재생 위치(없으면 글자 수로 추정)로 현재 문장을 찾고
   - 화면에 보이는 글 줄(카드 행, 목록, 표 행) 중 핵심어가 많이 겹치는 줄을 강조
   ================================================================= */
(()=>{
const sceneEl=document.getElementById('scene');
const st=document.createElement('style'); st.textContent=`
#scene .hlx{box-shadow:0 0 0 2px #FFD25E,0 0 22px rgba(255,210,94,.42)!important;background-color:rgba(255,210,94,.16)!important;border-radius:9px;transition:box-shadow .35s,background-color .35s}
#scene tr.hlx{box-shadow:none!important;background:none!important}
#scene tr.hlx>td{background-color:rgba(255,210,94,.18)!important;box-shadow:inset 0 2px 0 #FFD25E,inset 0 -2px 0 #FFD25E}
`; document.head.appendChild(st);

const PART=/(으로부터|에서는|에서도|으로는|에게서|이라고|라고|입니다|합니다|됩니다|습니다|있습니다|됩니다|하고|에서|으로|로는|에는|에게|까지|부터|처럼|보다|이며|이고|이나|와|과|의|을|를|은|는|이|가|에|도|만|로|나)$/;
const STOP=new Set(['있습니다','있고','있는','수','등','및','경우','나타날','나타납니다','나타나고','나타나기도','때문','이것','그리고','하지만','함께','같은','대개','가장','많습니다','많고','많지만','또는','특히','먼저','다음','이번','여기서','정리하면','합니다','봅니다','됩니다','입니다','것','더','덜','그래서','주로','모두','다른','한','두','세','네','첫','번째','이다','하는','되는','되어','통해','위해','대한','관련','관련됩니다','보입니다','확인합니다','살펴보겠습니다','보겠습니다','유형','특징','문제','가능','정도','이상','부분','모든','각각','다시','처럼','때는','통해서']);
function toks(s){ const out=new Set(); (s.replace(/<[^>]+>/g,' ').match(/[가-힣A-Za-z0-9]+/g)||[]).forEach(w=>{ let t=w; for(let i=0;i<2;i++) t=t.replace(PART,''); if(t.length>=2 && !STOP.has(t) && !STOP.has(w)) out.add(t); }); return [...out]; }
function sentences(t){ return (t||'').split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean); }
function visible(el){ let e=el; while(e && e!==sceneEl){ const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)<0.3) return false; e=e.parentElement; } return true; }
const SKIP='header,h1,h2,h3,h4,.hdr,.kicker,.ttl,.quiz,.e4eyebrow,svg,#xnote';
function blocks(){
  const out=new Set(); const W=document.createTreeWalker(sceneEl, NodeFilter.SHOW_TEXT);
  let n; while((n=W.nextNode())){ if(n.textContent.trim().length<2) continue; let el=n.parentElement; if(!el || el.closest(SKIP)) continue;
    // 가장 가까운 '줄' 블록: 글 길이 ≤170, 블록/플렉스/그리드/표 행/목록
    let cand=el, best=null;
    while(cand && cand!==sceneEl){ const cs=getComputedStyle(cand);
      if(cand.tagName==='TD'||cand.tagName==='TH'){ best=cand.parentElement; break; }
      if(cand.tagName==='LI' || /^(block|flex|grid|list-item|table-row)$/.test(cs.display)){ best=cand; break; }
      cand=cand.parentElement; }
    if(best && best.parentElement && best.parentElement!==sceneEl){ const pd=getComputedStyle(best.parentElement).display; if(/flex/.test(pd) && best.parentElement.textContent.trim().length<=170 && best.parentElement.children.length<=4) best=best.parentElement; }
    if(best && best.textContent.trim().length>220) best=null;
    if(best && visible(best)) out.add(best); }
  // 바깥 블록이 안쪽 블록을 포함하면 안쪽만 남김
  const arr=[...out]; return arr.filter(a=>!arr.some(b=>b!==a && a.contains(b)));
}
const H={step:null, sents:[], lens:[], k:-1, t0:0};
function clear(){ sceneEl.querySelectorAll('.hlx').forEach(e=>e.classList.remove('hlx')); }
function apply(k){
  clear(); const s=H.sents[k]; if(!s) return; const tk=toks(s); if(!tk.length) return;
  const sc=blocks().map(el=>{ const pv=el.previousElementSibling, pg=el.parentElement && getComputedStyle(el.parentElement).display==='grid' && pv && pv.tagName==='B'; const tx=((pg?pv.textContent:'')+el.textContent).replace(/\s+/g,''); let v=0; tk.forEach(t=>{ if(tx.includes(t)) v+= t.length>=3?1.5:1; }); return {el,v}; }).filter(o=>o.v>=1).sort((a,b)=>b.v-a.v);
  if(!sc.length) return; const top=sc[0].v;
  sc.filter(o=>o.v>=top*0.75).slice(0,3).forEach(o=>{ o.el.classList.add('hlx');
    const p=o.el.parentElement; if(p && getComputedStyle(p).display==='grid' && o.el.previousElementSibling && o.el.previousElementSibling.tagName==='B') o.el.previousElementSibling.classList.add('hlx'); });
}
function progress(){
  try{ if(typeof CURA!=='undefined' && CURA && CURA.a && CURA.a.duration>0 && isFinite(CURA.a.duration)) return CURA.a.currentTime/CURA.a.duration; }catch(e){}
  const el=(performance.now()-H.t0)/1000*((typeof SPEED!=='undefined'&&SPEED)||1); const tot=Math.max(2,H.lens.reduce((a,b)=>a+b,0)*0.135); return Math.min(1,el/tot);
}
function tick(){
  if(!H.step) return; if(sceneEl.querySelector('.quiz.on')){ clear(); return; }
  const p=progress(); const tot=H.lens.reduce((a,b)=>a+b,0)||1; let acc=0,k=0; for(;k<H.lens.length;k++){ acc+=H.lens[k]; if(p*tot<acc) break; } k=Math.min(k,H.lens.length-1);
  if(k!==H.k){ H.k=k; apply(k); }
}
const _apply=window.applyStart;
window.applyStart=function(step){ const r=_apply.apply(this, arguments);
  if(step && step.id && step.t && !/-q$|-a$/.test(step.id)){ H.step=step; H.sents=sentences(step.t); H.lens=H.sents.map(s=>s.length); H.k=-1; H.t0=performance.now()+200; clearTimeout(H.tm); H.tm=setTimeout(()=>{ H.k=-1; tick(); }, (typeof INSTANT!=='undefined'&&INSTANT)?60:700); }
  return r; };
const _build=window.build; window.build=function(){ H.step=null; clear(); return _build.apply(this, arguments); };
setInterval(()=>{ if(typeof paused!=='undefined' && paused) return; tick(); }, 250);
window.HLX={apply, toks, blocks, state:H};
})();
