/* =================================================================
   최신 기출 확인문제 주입 (2024 제13회 · 2025 제14회)
   - js/kq_data.js 의 window.KQ_DATA = { "<편 코드>": [{y,n,q,opts,ans,ex}] }
   - 각 편의 기존 확인문제 뒤(마무리 대사 앞)에 '최신 기출' 문제를 이어 붙임
   - ID가 qx..-q / qx..-a 형식이라 음성 없이 자막·카드만 (SILENT)
   - 문제 원문·보기는 싣지 않고, 출제 포인트를 새 문항으로 재구성
   ================================================================= */
(()=>{
const D=window.KQ_DATA||{};
const st=document.createElement('style'); st.textContent='.quiz .qh .kqsrc{margin-left:12px;font-size:17px;font-weight:800;color:#ffd36d;letter-spacing:.02em}.quiz.on{background:linear-gradient(145deg,rgba(12,19,40,.985),rgba(22,30,58,.985))!important;box-shadow:0 0 0 2400px rgba(5,9,22,.82),0 24px 60px rgba(0,0,0,.6)!important}'; document.head.appendChild(st);
const hideQuiz=()=>document.querySelectorAll('.quiz').forEach(e=>e.classList.remove('on'));
for(const c of CLIPS){
  const items=D[c.code]; if(!items||!items.length||c.code==='K') continue;
  const tag=c.code.replace(/[^0-9a-zA-Z]/g,'');
  const qs=items.map((it,i)=>({id:'qx'+tag+'_'+i, o:{kind:'기출', q:it.q, opts:it.opts, ans:it.ans, ex:it.ex, sec:10, src:it.y+'년 '+(it.y===2024?'제13회':'제14회')+' '+it.n+'번'}}));
  // 1) 화면: build 때 문제 카드 추가 (출처 표시 포함)
  const b0=c.build;
  c.build=function(S){ const r=b0?b0.apply(this,arguments):undefined;
    qs.forEach(({id,o})=>{ add(quizHTML(id,o)); const el=document.getElementById(id); const qh=el&&el.querySelector('.qh');
      if(qh){ const t=qh.querySelector('.tag'); if(t) t.textContent='최신 기출'; const s=document.createElement('span'); s.className='kqsrc'; s.textContent=o.src; qh.appendChild(s); } });
    return r; };
  // 2) 스텝: 마지막 확인문제 정답 스텝 뒤에 삽입 (없으면 마지막 대사 앞)
  let at=-1; c.steps.forEach((s,k)=>{ if(s.id&&/-a$/.test(s.id)) at=k; });
  if(at<0){ for(let k=c.steps.length-1;k>=0;k--){ if(c.steps[k].id){ at=k-1; break; } } }
  const add_=qs.flatMap(({id,o})=>quizSteps(id,o,()=>hideQuiz()));
  c.steps.splice(at+1,0,...add_);
  // 3) 마무리 대사에서는 남은 문제 카드를 숨김
  for(let k=at+1+add_.length;k<c.steps.length;k++){ const s=c.steps[k]; if(s.id&&typeof s.do==='function'){ const d=s.do; s.do=function(){ hideQuiz(); return d.apply(this,arguments); }; break; } if(s.id&&!s.do){ s.do=function(){ hideQuiz(); }; break; } }
}
})();
