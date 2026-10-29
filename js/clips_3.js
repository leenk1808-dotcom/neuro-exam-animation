/* =================================================================
   3. 실독증 · 실서증
   자료: 신경언어장애 정리(메인) 3. 실독증과 실서증 · 특강 Part 2 (p63-78: 읽기 정의, 이중경로 모형, 실독증 유형·병소, 실서증 개요·중추형·말초형, 실독증 vs 실서증)
   ================================================================= */
const DR_N = {
  in:['글자 · 단어 자극',500,34,'#9FB2DA'], va:['시각적 분석<small>자모음 · 초성-중성-종성 위치 파악</small>',500,118,'#9FB2DA'],
  oil:['철자 입력 어휘집<small>(시각적 입력 어휘집)</small>',300,222,'#C9A6FF'], sem:['의미 체계',150,330,'#C9A6FF'], pol:['음운 출력 어휘집',300,440,'#C9A6FF'],
  gpc:['자소-음소 변환',800,330,'#8CC8FF'], phs:['음운 체계',500,532,'#FFE45C'], sp:['말산출 · 소리 내어 읽기',500,602,'#FFE45C'],
};
const DR_P = {
  p_in:'M500 56 L500 92', p_lex:'M462 140 C 420 170, 350 178, 318 194', p_gpc1:'M540 140 C 660 170, 790 220, 800 306',
  p_A1:'M262 246 C 210 270, 160 286, 150 308', p_A2:'M150 352 C 150 392, 230 412, 266 424', p_B:'M338 246 C 440 300, 440 380, 344 424',
  p_lo:'M320 462 C 360 505, 420 525, 440 530', p_g2:'M800 354 C 800 450, 650 520, 562 530', p_out:'M500 556 L500 578',
};
const DR_X = { lex:'p_lex', gpc:'p_gpc1', B:'p_B', A:'p_A1' };
function drHTML(){
  return `<div class="dr" id="dr">
    <div class="rg lx" id="rg_lx"><b>어휘 경로<small>아는 · 친숙한 단어</small></b></div>
    <div class="rg ph" id="rg_ph"><b>비어휘 · 음운 경로<small>비단어 · 생소한 단어</small></b></div>
    <svg viewBox="0 0 1000 630"><defs><marker id="e3ah" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" fill="#8FA0C8"/></marker></defs>
      ${Object.entries(DR_P).map(([k,d])=>`<path id="${k}" d="${d}" marker-end="url(#e3ah)"/>`).join('')}</svg>
    ${Object.entries(DR_N).map(([k,n])=>`<div class="nd3" id="n3_${k}" style="left:${n[1]}px;top:${n[2]}px;--c:${n[3]}">${n[0]}</div>`).join('')}
    <div class="rl" id="rl_A" style="left:22px;top:244px"><i>A</i>어휘-의미 경로<small>동음이의어 · 예) 말</small></div>
    <div class="rl" id="rl_B" style="left:400px;top:300px"><i>B</i>어휘-비의미 경로<small>단일 의미 · 예) 곰</small></div>
    <div class="rl ph" id="rl_G" style="left:812px;top:392px">규칙대로 변환<small>규칙 단어 · 비단어</small></div>
    ${Object.keys(DR_X).map(k=>`<div class="xm" id="x3_${k}">✕</div>`).join('')}
  </div>`;
}
/* 이중경로 위로 단어 칩이 흘러가는 애니메이션 */
function e3flow(ids, label, o={}){
  const box=$('#dr'); if(!box || INSTANT) return; const tk=RUN;
  const el=document.createElement('div'); el.className='tok'; el.textContent=label; box.appendChild(el);
  const ps=ids.map(id=>box.querySelector('#'+id)), ls=ps.map(p=>p.getTotalLength()), tot=ls.reduce((a,b)=>a+b,0);
  const dur=(o.dur||3000)/SPEED, t0=performance.now();
  const st=(now)=>{ if(RUN!==tk){ el.remove(); return; }
    const f=Math.min(1,(now-t0)/dur); if(o.to && f>=(o.at||0.55) && !el.classList.contains('err')){ el.textContent=o.to; el.classList.add('err'); }
    let d=f*tot, i=0; while(i<ps.length-1 && d>ls[i]){ d-=ls[i]; i++; } const pt=ps[i].getPointAtLength(Math.min(d,ls[i]));
    el.style.left=pt.x+'px'; el.style.top=pt.y+'px';
    if(f<1) requestAnimationFrame(st); else setTimeout(()=>{ if(RUN===tk) el.classList.add('gone'); setTimeout(()=>el.remove(),700); }, (o.hold||2200)/SPEED); };
  requestAnimationFrame(st);
}
const ROUTE = { A:['p_in','p_lex','p_A1','p_A2','p_lo','p_out'], B:['p_in','p_lex','p_B','p_lo','p_out'], G:['p_in','p_gpc1','p_g2','p_out'] };

const AL3 = {
  deep:{name:'심층 실독증', tag:'중추형', sub:'음운경로 + 어휘경로 <b>모두 손상</b> → 손상된 어휘(의미) 경로로 읽음',
    li:['<b>의미 오류</b> · 고양이 → 강아지','<b>비단어</b> 읽기 어려움 · 어휘화 (인경 → 안경)','시각적 오류 (나비 → 마비) · 기능어 대치 (그리고 → 그래서)','<b>추상어</b>가 구체어보다 어려움 · 오류율 동사·형용사 > 명사','실어증 동반 시 <b>전반 · 브로카</b> 실어증 가능성 높음'],
    ex:['돌','백일','의미 오류'], les:'좌반구 실비안주위 영역 (전두-두정-측두의 광범위한 병변)'},
  phon:{name:'음운 실독증', tag:'중추형', sub:'<b>음운경로 손상</b> → 어휘경로에 주로 의존',
    li:['<b>비단어</b> · 처음 보는 단어 읽기 어려움','<b>어휘화</b> · 비슷하게 생긴 실제 단어로 바꿔 읽음','머릿속 사전의 단어는 규칙·불규칙 상관없이 잘 읽음 (<b>85~95%</b> 정반응)','<b>의미 오류는 없음</b> · 심층 실독증 회복 중에 나타나기도 함'],
    ex:['인경','안경','어휘화'], les:'좌반구 실비안주위 · 상부 측두엽 · 모서리위이랑(SMG) · 각이랑(AG)'},
  surf:{name:'어휘 실독증 (표층 실독증)', tag:'중추형', sub:'<b>어휘경로 손상</b> → 음운경로에 의존',
    li:['자소-음소 <b>불일치(불규칙) 단어</b> 읽기 어려움','<b>규칙화</b> · 음운 변동 없이 글자 그대로 읽음 (봄비 → [봄비])','규칙 단어 · 비단어는 잘 읽음','친숙한 단어도 즉시 알아보지 못함'],
    ex:['값어치','갑서치','규칙화'], les:'좌반구 후방 읽기 영역 (후하부 측두-후두)'},
  pure:{name:'실서증 없는 실독증', tag:'말초형', sub:'= <b>순수 실독증</b> · 말초형 중 <b>가장 흔함</b>',
    li:['시력은 정상인데 글자 입력이 원활하지 않음','전혀 못 읽거나 <b>한 글자씩</b> 더듬더듬 읽음 (letter-by-letter)','<b>쓰기는 가능</b> · 하지만 <b>자신이 쓴 글</b>은 읽지 못함'],
    ex:null, les:'좌측 후두엽 + 뇌량팽대(splenium) · 후대뇌동맥(PCA)'},
  neg:{name:'무시 실독증', tag:'말초형', sub:'<b>편측 공간무시</b>의 영향',
    li:['단어 · 문장의 <b>왼쪽</b>을 무시하고 오른쪽만 읽음','일부만 읽고 유추해서 다른 단어로 대치하기도 함','좌편무시 → <b>우뇌 손상</b>'],
    ex:['키다리 아저씨','아저씨','왼쪽 무시'], les:'우반구 · 특히 우측 두정엽'},
  att:{name:'주의력 실독증', tag:'말초형', sub:'<b>주의 · 집중</b>의 문제',
    li:['낱단어 · 짧은 자극은 비교적 잘 읽음','단어가 길어지거나 <b>문장 수준</b>, 여러 단어가 함께 제시되면 오류 증가','<b>이동 오류</b> · 글자가 다른 자리로 옮겨감'],
    ex:['감사','삼가','이동 오류'], les:'좌반구 전두-두정 네트워크 (주의 · 작업기억 관련)'},
};
function al3HTML(k){ const a=AL3[k];
  const ex = a.ex ? `<div class="ex"><span class="a">${a.ex[0]}</span><span class="to">→</span><span class="b">${a.ex[1]}</span><small>${a.ex[2]}</small></div>`
    : `<div class="ex lbl3"><span class="a" id="lb3_0">사</span><span class="a" id="lb3_1">과</span><span class="to">·</span><span class="a" id="lb3_2">나</span><span class="a" id="lb3_3">무</span><small>한 글자씩</small></div>`;
  return `<div class="glass e3c fade" id="c3_${k}"><div class="tg ${a.tag==='중추형'?'c':'p'}">${a.tag} 실독증</div><h3>${a.name}</h3><div class="sub">${a.sub}</div>${ex}
    <ul>${a.li.map(x=>`<li>${x}</li>`).join('')}</ul><div class="les">📍 ${a.les}</div></div>`; }

const CG6 = [
  ['① 심층 실서증','음운경로 손상 두드러짐 + 어휘-의미 처리 장애','시간','시계','의미 오류 · 비단어 쓰기 어려움'],
  ['② 음운 실서증','음운경로 손상 → 어휘경로로 철자 처리','라멍','라면','비단어 쓰기 어려움 · 어휘화 (친숙한 단어는 보존)'],
  ['③ 어휘(표층) 실서증','어휘경로 손상 → 음운경로로 철자 처리','할아버지','하라버지','불규칙 단어 어려움 · 소리 나는 대로 쓰는 음운적으로 그럴듯한 오류'],
  ['④ 의미 실서증','의미 체계 손상','see','sea','의미 관련 단어로 씀 · 동음이의어 받아쓰기 오류'],
  ['⑤ 자소-완충기 장애','철자 작업기억 손상 · 저장된 자소 표상이 사라짐','해바라기','해라바기','<b>단어가 길수록</b> 오류 증가',true],
  ['⑥ 보속 실서증','앞서 쓴 글자 · 음절이 다음 반응에 반복','사과, 포도','사과, 사도','같은 자극을 되풀이해 씀',true],
];
const PG5 = [
  ['① 이서 장애','글자꼴 선택 장애','<span class="hw">rain</span><span class="to">→</span><span class="hw er">r<b>AI</b>n</span>','대·소문자 · 인쇄체·필기체 혼동'],
  ['② 실행 실서증','손글씨 <b>운동계획</b> 장애','<span class="hw">가나다</span><span class="to">→</span><span class="hw er"><i style="display:inline-block;transform:scaleX(-1)">가</i><i style="display:inline-block;transform:rotate(-30deg)">나</i>다</span>','글자 형태 · 획순 오류 (근력 저하만으로 설명 X)'],
  ['③ 집행장애 (운동장애형)','<b>힘 · 속도 · 강도</b> · 협응 조절 어려움','<span class="hw wob">안녕하세요</span>','느리고 왜곡된 글씨'],
  ['④ 무시 실서증','편측 공간무시','<span class="hw"><span style="opacity:.08">키다리</span> 아저씨</span>','종이 · 단어의 <b>왼쪽</b> 생략'],
  ['⑤ 구심 실서증','<b>감각 피드백</b> 활용 저하','<span class="hw">사과</span><span class="to">→</span><span class="hw er">사사과</span>','획 · 글자 반복 · 생략 · 왜곡'],
];
const AGR3 = ['G_pariet_inf-Angular','G_parietal_sup','S_intrapariet_and_P_trans'];
const PURE3 = ['Pole_occipital','S_calcarine','G_cuneus','G_oc-temp_med-Lingual','S_oc-temp_med_and_Lingual','G_occipital_sup','G_occipital_middle','S_oc_middle_and_Lunatus','S_oc_sup_and_transversal','G_and_S_occipital_inf'];
const READ3 = ['Pole_occipital','G_occipital_middle','G_occipital_sup','S_oc_middle_and_Lunatus','G_and_S_occipital_inf','G_pariet_inf-Angular'];

const Q3=[
  {sec:9, q:'비단어 "인경"을 "안경"으로 읽는 어휘화 오류를 보이고, 친숙한 단어는 규칙·불규칙과 관계없이 잘 읽으며 의미 오류는 나타나지 않는 실독증은?', opts:['심층 실독증','음운 실독증','어휘(표층) 실독증','실서증 없는 실독증','주의력 실독증'], ans:1,
   say:'문제입니다. 인경을 안경으로 읽는 어휘화 오류를 보이고, 친숙한 단어는 잘 읽으며 의미 오류는 없는 실독증은 무엇일까요?', ex:'정답은 2번, 음운 실독증입니다. 음운 경로가 손상되어 비단어를 어려워하고, 어휘 경로로 읽기 때문에 아는 단어로 바꿔 읽습니다.'},
  {sec:8, q:'"값어치"를 "갑서치"로 읽는 것처럼 음운 변동 없이 글자 그대로 소리 내는 규칙화 오류가 특징인 실독증은?', opts:['음운 실독증','심층 실독증','무시 실독증','어휘(표층) 실독증','주의력 실독증'], ans:3,
   say:'값어치를 갑서치로 읽는 규칙화 오류가 특징인 실독증은?', ex:'정답은 4번, 어휘 실독증, 표층 실독증입니다. 어휘 경로가 손상되어 음운 경로로만 읽기 때문에 불규칙 단어를 규칙대로 읽습니다.'},
  {sec:8, q:'"돌"을 "백일"로 읽는 의미 오류를 보이고, 비단어 읽기가 어려우며, 추상어를 구체어보다 더 어려워하는 실독증은?', opts:['음운 실독증','어휘 실독증','심층 실독증','실서증 없는 실독증','무시 실독증'], ans:2,
   say:'돌을 백일로 읽는 의미 오류를 보이고, 비단어와 추상어를 어려워하는 실독증은?', ex:'정답은 3번, 심층 실독증입니다. 음운 경로와 어휘 경로가 모두 손상되어 의미에 기대어 읽기 때문에 의미 오류가 나타납니다.'},
  {sec:9, q:'시력은 정상이고 스스로 글을 쓸 수 있지만 자신이 쓴 글을 읽지 못하며, 한 글자씩 읽는 양상을 보인다. 이 실독증과 관련된 병소는?', opts:['좌측 하전두이랑','좌측 후두엽과 뇌량팽대','우측 두정엽','좌측 상측두이랑','소뇌'], ans:1,
   say:'시력은 정상이고 글을 쓸 수는 있지만 자기가 쓴 글을 읽지 못하고, 한 글자씩 읽습니다. 이 실독증과 관련된 병소는 어디일까요?', ex:'정답은 2번, 좌측 후두엽과 뇌량팽대입니다. 실서증 없는 실독증, 즉 순수 실독증이고, 후대뇌동맥 영역의 손상과 관련됩니다.'},
  {sec:8, q:'말초형 실서증 중 글자꼴 선택의 장애로, "rain"을 "rAIn"처럼 대·소문자를 섞어 쓰는 유형은?', opts:['실행 실서증','구심 실서증','이서 장애','자소-완충기 장애','음운 실서증'], ans:2,
   say:'마지막 문제입니다. 글자꼴 선택의 장애로, 영어 단어를 대문자와 소문자를 섞어 쓰는 말초형 실서증은?', ex:'정답은 3번, 이서 장애입니다. 실행 실서증은 운동계획, 구심 실서증은 감각 피드백의 문제이고, 자소-완충기 장애는 중추형입니다.'},
];

CLIPS.push({ code:'3', short:'3 실독증 · 실서증', title:'실독증과 실서증', desc:'이중경로 읽기 모형 · 자극어 6요소 · 실독증 6유형 · 실서증 병소 · 쓰기 경로 · 중추형/말초형 실서증 · 퀴즈 5문제',
  build(S){
    const hl=W.hemiL;
    { const u=hl.geometry.userData; S.exF=0.25; if(u.real){ let a=0,c=0; const id=u.names.indexOf('G_precentral'); for(let i=0;i<u.n;i++) if(u.lab[i]===id && u.U[i]>0.1){ a+=u.F[i]; c++; } if(c) S.exF=a/c+0.14; } }
    W.show({brain:true}); W.view('lateralL',0); W.spin(0);
    add(hdr('EP 3 · 실독증 · 실서증','글을 읽고 쓰는 뇌'));
    add(`<div class="glass fade" id="def3" style="right:56px;top:140px;width:600px"><h3>실독증 (alexia)</h3>
      <div class="row">뇌손상 후 생긴 <b class="hl-y">후천성 읽기장애</b></div>
      <div class="row">글자 · 단어 · 문장을 정확히 읽거나 그 의미를 이해하기 어려움</div>
      <div class="fade" id="def3b" style="margin-top:12px">${['읽기 속도 · 정확성 저하','글자 · 단어 재인 어려움 (한 글자씩)','읽기 이해 저하 (유형에 따라)'].map(x=>`<span class="pill">${x}</span>`).join('')}
        <div class="row" style="margin-top:10px;font-size:19px">읽기 = 시각적 해독(decoding) + 언어학적 이해<br><span style="color:#A9B8D8">해독 · 자소(글자)와 음소(소리)의 대응 규칙으로 문자를 소리로 바꾸는 작업</span></div></div></div>`);
    add(drHTML());
    add(`<div class="glass fade" id="key3" style="left:50%;translate:-50% 0;top:10px;padding:12px 26px"><div class="row" style="font-size:22px">⭐ 국시 핵심 · <b class="hl-p">아는 단어 → 어휘 경로</b> &nbsp;|&nbsp; <b class="hl-b">비단어 · 생소한 단어 → 비어휘 · 음운 경로</b></div></div>`);
    const SR=[['어휘성','단어인지 비단어인지','컵','콥'],['규칙성','자소와 음소가 일치하는지','연필','값어치'],['애매성','뜻이 하나 이상인지','눈','숟가락'],['구체성','구체적 사물 · 추상적 개념','구름','슬픔'],['친숙성','얼마나 자주 접했는지','강아지','웜뱃'],['길이','자극의 음절 수','해바라기 (길다)','소 (짧다)']];
    add(`<div class="glass stm fade" id="stm3"><h3>문자언어 자극어의 6요소</h3><table><tr><th>요소</th><th>정의</th><th>요소 있음</th><th>요소 없음</th></tr>
      ${SR.map((r,i)=>`<tr class="r" id="sr${i}"><td class="k">${r[0]}</td><td>${r[1]}</td><td class="w"><span>${r[2]}</span></td><td class="w"><span class="n">${r[3]}</span></td></tr>`).join('')}</table></div>`);
    add(`<div class="glass cls3 fade" id="cls3">
      <div class="col" id="cl3a" style="--c:#C9A6FF"><h3>중추형 실독증</h3><div class="row">언어적 처리 과정의 결함<br>시각적 단어 형태와 <b>의미의 연결</b> 문제</div><div class="tg">${['심층 실독증','음운 실독증','어휘(표층) 실독증'].map(x=>`<span class="pill">${x}</span>`).join('')}</div></div>
      <div class="col" id="cl3b" style="--c:#7FD6FF"><h3>말초형 실독증</h3><div class="row">시각 처리 등 <b>언어 외적</b> 처리 과정의 결함<br>시각 · 주의 측면의 문제</div><div class="tg">${['실서증 없는 실독증','무시 실독증','주의력 실독증'].map(x=>`<span class="pill">${x}</span>`).join('')}</div></div></div>`);
    Object.keys(AL3).forEach(k=>add(al3HTML(k)));
    add(`<div class="glass tri3 fade" id="tri3"><h3>중추형 3유형 한눈에</h3>
      <div class="tr"><b style="--c:#FF8C8C">심층</b><span>두 경로 모두 손상</span><em>의미 오류 · 비단어 X · 추상어 X</em></div>
      <div class="tr"><b style="--c:#FFAE5C">음운</b><span>음운경로 손상</span><em>비단어 X · 어휘화 · 의미 오류 없음</em></div>
      <div class="tr"><b style="--c:#7FB2FF">어휘(표층)</b><span>어휘경로 손상</span><em>불규칙 단어 X · 규칙화</em></div></div>`);
    add(`<div class="glass demo3 fade" id="dm_neg"><div class="cap3">무시 실독증 · 왼쪽을 보지 못함</div><div class="wd"><span class="lf">키다리</span> <span>아저씨</span></div><div class="rd">읽은 말 · <b>"아저씨"</b></div><div class="eye">👁️ 오른쪽만 주목</div></div>`);
    add(`<div class="glass demo3 fade" id="dm_att"><div class="cap3">주의력 실독증 · 이동 오류</div><div class="wd sw3"><span class="w1">감사</span><span class="w2">삼가</span></div>
      <div class="sw3b"><b>ㄱ</b> ⇄ <b>ㅅ</b> &nbsp;첫소리가 서로 자리를 옮김</div>
      <div class="rd">감사 → <b>"삼가"</b></div></div>`);
    add(`<div class="glass fade" id="agr" style="right:46px;top:120px;width:640px"><h3>실서증 (agraphia)</h3>
      <div class="row">뇌손상 후 이전에 익힌 철자 · 단어 · 문장 <b class="hl-y">쓰기 능력이 후천적으로 손상</b></div>
      <div class="row fade" id="agr1" style="margin-top:10px">📍 좌반구 <b>전두-두정 쓰기 네트워크</b><br>&nbsp;&nbsp;&nbsp;&nbsp;좌측 두정엽 · <b>각회</b> · <b>Exner 영역</b> (중전두회 뒤쪽)</div>
      <div class="fade" id="agr2" style="margin-top:12px">${['철자 오류 (생략·대치·첨가·순서)','문장 오류 (문법·단어 선택)','글자 형태 오류 (왜곡·획순·공간배치)'].map(x=>`<span class="pill">${x}</span>`).join('')}
        <div class="row" style="margin-top:8px;font-size:19px">실어증 · 실독증과 흔히 동반 · <b>순수 실서증</b>으로 단독 발생도 가능</div></div></div>`);
    add(`<div class="glass wm3 fade" id="wm3"><h3>쓰기의 경로 · 받아쓰기</h3>
      <div class="flow"><div class="bx in">👂 들은 말<br>💭 떠올린 단어</div><div class="ar">➜</div>
        <div class="zone c fade" id="wm_c"><div class="zt">중추형 · 철자 만들기</div>
          <div class="lanes"><div class="bx lx">어휘 경로<small>철자 출력 어휘집 · 아는 단어</small></div><div class="bx ph">음운 경로<small>음소-자소 변환 · 비단어</small></div></div>
          <div class="ar">➜</div><div class="bx gb">자소 완충기<small>철자 작업기억</small></div></div><div class="ar">➜</div>
        <div class="zone p fade" id="wm_p"><div class="zt">말초형 · 손으로 쓰기</div>
          <div class="bx">이서<small>글자꼴 선택</small></div><div class="ar">➜</div><div class="bx">운동 프로그램<small>손글씨 계획</small></div><div class="ar">➜</div><div class="bx">실행<small>힘 · 감각 피드백</small></div></div>
        <div class="ar">➜</div><div class="bx out">✍️ 글씨</div></div>
      <div class="row fade" id="wm_k" style="margin-top:16px;font-size:20px">중추형 = <b class="hl-p">철자 선택 · 자소 배열 · 어휘/음운 처리</b>의 손상 &nbsp;|&nbsp; 말초형 = 철자 지식은 보존, <b class="hl-g">글자 형태 · 손글씨 운동</b> 산출의 손상</div></div>`);
    add(`<div class="glass cg6 fade" id="cg6">${CG6.map((c,i)=>`<div class="cc" id="cc${i}"><h4>${c[0]}</h4><div class="d">${c[1]}</div><div class="vis"><span class="hw">${c[2]}</span><span class="to">→</span><span class="hw er">${c[3]}</span>${c[5]?'<em>예시</em>':''}</div><div class="k">${c[4]}</div></div>`).join('')}</div>`);
    add(`<div class="glass pg5 fade" id="pg5"><svg width="0" height="0" style="position:absolute"><filter id="wob3"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="7"/></filter></svg>
      ${PG5.map((c,i)=>`<div class="cc" id="pc${i}"><h4>${c[0]}</h4><div class="d">${c[1]}</div><div class="vis">${c[2]}</div><div class="k">${c[3]}</div></div>`).join('')}</div>`);
    add(`<div class="glass cmp3 fade" id="cmp3">
      <div class="cl" style="--c:#7FB2FF"><h3>실독증 (alexia)</h3><div class="row">📖 <b>읽기</b> = 입력(input) 처리의 손상</div><div class="row">글자 · 단어 재인 · 음독 · 읽기 이해</div><div class="row">예) '사과'를 보고도 못 읽거나 잘못 읽음</div></div>
      <div class="mid">⇄</div>
      <div class="cl" style="--c:#5EE0A8"><h3>실서증 (agraphia)</h3><div class="row">✍️ <b>쓰기</b> = 출력(output) 산출의 손상</div><div class="row">철자 선택 · 글자 구성 · 문장 쓰기</div><div class="row">예) '사과'를 '사가', '사고'처럼 씀</div></div>
      <div class="pts fade" id="cmp3b"><div>① 실독증은 읽기, 실서증은 쓰기의 문제</div><div>② 두 장애는 <b>함께</b> 나타날 수도, <b>따로</b> 나타날 수도 있음</div><div>③ <b>실서증 없는 실독증</b> / <b>실독증 없는 실서증</b> 모두 가능</div></div></div>`);
    add(`<div class="glass sumg fade" id="sum3">
      <div class="sc" style="--c:#FFE45C"><h4>읽기 이중경로</h4><div>아는 단어 → 어휘 경로 (A 의미 · B 비의미)<br>비단어 · 생소한 단어 → 음운 경로 (자소-음소 변환)</div></div>
      <div class="sc" style="--c:#9FB2DA"><h4>자극어 6요소</h4><div>어휘성 컵/콥 · 규칙성 연필/값어치 · 애매성 눈/숟가락<br>구체성 구름/슬픔 · 친숙성 강아지/웜뱃 · 길이</div></div>
      <div class="sc" style="--c:#FF8C8C"><h4>심층 실독증</h4><div>두 경로 모두 손상 · <b>의미 오류</b> (돌 → 백일)<br>비단어 X · 추상어 X · 전반 · 브로카 실어증 동반</div></div>
      <div class="sc" style="--c:#FFAE5C"><h4>음운 실독증</h4><div>음운경로 손상 · 비단어 X · <b>어휘화</b> (인경 → 안경)<br>의미 오류 없음 · 85~95% 정반응</div></div>
      <div class="sc" style="--c:#7FB2FF"><h4>어휘(표층) 실독증</h4><div>어휘경로 손상 · 불규칙 단어 X<br><b>규칙화</b> (값어치 → 갑서치)</div></div>
      <div class="sc" style="--c:#7FD6FF"><h4>말초형 실독증</h4><div>순수 = 좌측 후두엽 + 뇌량팽대 · 한 글자씩 · 쓰기 O<br>무시 = 왼쪽 무시 (우뇌) · 주의력 = 이동 오류</div></div>
      <div class="sc" style="--c:#5EE0A8"><h4>실서증 병소</h4><div>좌반구 전두-두정 쓰기 네트워크<br>좌측 두정엽 · 각회 · Exner 영역 (중전두회 뒤쪽)</div></div>
      <div class="sc" style="--c:#C9A6FF"><h4>중추형 실서증</h4><div>심층 시간→시계 · 음운 라멍→라면 · 어휘 할아버지→하라버지<br>의미 see→sea · 자소완충기 = 길이 효과 · 보속</div></div>
      <div class="sc" style="--c:#FF8CC6"><h4>말초형 실서증</h4><div>이서 = 글자꼴 (rAIn) · 실행 = 운동계획<br>집행 = 힘·속도 · 무시 = 왼쪽 생략 · 구심 = 감각 피드백</div></div></div>`);
    Q3.forEach((q,i)=>add(quizHTML('q3_'+i, q)));
    /* 이중경로: ✕ 표시 위치를 경로 중간에 */
    Object.entries(DR_X).forEach(([k,pid])=>{ const p=$('#dr #'+pid), x=$('#x3_'+k); if(p&&x){ const L=p.getTotalLength(), pt=p.getPointAtLength(L*0.5); x.style.left=pt.x+'px'; x.style.top=pt.y+'px'; } });
    /* 3D 라벨 */
    const pOcc=W.lp(['Pole_occipital','G_occipital_middle'],{},[-0.95,0.0,-0.3]), pAng=W.lp(['G_pariet_inf-Angular'],{minL:0.1},[-0.55,0.22]);
    L3('r3occ','시각 영역 <small>후두엽</small>',hl,pOcc.p,{color:'#7FB2FF',dx:60,dy:70});
    L3('r3ang','각회 (39) <small>글자 ↔ 소리 · 의미</small>',hl,pAng.p,{color:'#7FB2FF',dx:30,dy:-110});
    const pCal=W.lp(['S_calcarine','G_cuneus'],{},[-0.9,0.0,-0.3]);
    L3('r3pure','좌측 후두엽 <small>시각피질</small>',hl,pCal.p,{color:'#FF6B6B',dx:-60,dy:-120});
    L3('r3spl','뇌량팽대 <small>splenium</small>',hl,new THREE.Vector3(0,0.13,0.5),{color:'#FF6B6B',dx:-40,dy:110});
    const pSp=W.lp(['G_parietal_sup'],{minL:0.1},[-0.3,0.55]), pEx=W.lp(['G_front_middle'],{fmax:S.exF+0.08,fmin:S.exF-0.12,minL:0.1},[0.3,0.45]);
    L3('a3ang','각회',hl,pAng.p,{color:'#FF6B6B',dx:60,dy:-60});
    L3('a3sp','상두정소엽',hl,pSp.p,{color:'#FF6B6B',dx:40,dy:-80});
    L3('a3ex','Exner 영역 <small>쓰기 운동중추</small>',hl,pEx.p,{color:'#FF6B6B',dx:-30,dy:-100});
    S.dr=(o={})=>{ const cut=o.cut||[], weak=o.weak||[];
      $$('#dr path').forEach(p=>p.classList.remove('cut','weak','off','hi')); $$('#dr .xm').forEach(x=>x.classList.remove('on')); $$('#dr .nd3').forEach(n=>n.classList.remove('dim'));
      const pc=(ids,c)=>ids.forEach(id=>{ const e=$('#dr #'+id); e&&e.classList.add(c); });
      if(cut.includes('lex')){ pc(['p_lex'],'cut'); pc(['p_A1','p_A2','p_B','p_lo'],'off'); ['oil','sem','pol'].forEach(n=>$('#n3_'+n).classList.add('dim')); }
      if(cut.includes('gpc')){ pc(['p_gpc1','p_g2'],'cut'); $('#n3_gpc').classList.add('dim'); }
      if(cut.includes('B')) pc(['p_B'],'cut');
      if(weak.includes('A')) pc(['p_A1','p_A2'],'weak');
      cut.forEach(k=>on('#x3_'+k)); if(o.hi) pc(o.hi,'hi'); };
    S.reveal=(ids)=>ids.forEach(id=>on(id.startsWith('p_')?'#dr #'+id:'#'+id));
    S.card=(k)=>{ $$('.e3c').forEach(e=>e.classList.remove('on')); if(k) on('#c3_'+k); };
  },
  steps:[
    {wait:800},
    {id:'31-01', s:'N', t:'3편, 실독증과 실서증입니다. 뇌손상으로 글을 읽고 쓰는 능력이 무너지는 경우를 살펴봅니다.', do(){ W.spin(0.12); }},
    {id:'31-02', s:'N', t:'실독증은 뇌손상 뒤에 생긴 후천성 읽기장애입니다. 글자와 단어, 문장을 정확하게 읽거나, 그 뜻을 이해하는 데 어려움을 보입니다.',
      do(){ on('#hd',false); W.spin(0); W.view('lateralL',1400); W.shift(-300); on('#def3'); sfx('whoosh'); }},
    {id:'31-03', s:'N', t:'읽는 속도와 정확성이 떨어지고, 친숙한 단어도 바로 알아보지 못해 한 글자씩 읽기도 하며, 유형에 따라 읽은 내용의 이해도 떨어집니다.', do(){ on('#def3b'); sfx('pop'); }},
    {id:'31-04', s:'N', t:'읽기에는 눈으로 들어온 글자를 분석하는 후두엽의 시각 영역과, 글자를 소리와 의미로 이어 주는 각회, 39번 영역이 중요합니다.',
      do(){ W.lesion(W.realBrain?{labels:READ3, color:'#4F8EF7'}:null); later(()=>{ W.lbl(['r3occ','r3ang']); sfx('glow'); },700); }},
    /* 이중경로 모형 */
    {id:'31-05', s:'N', t:'읽기를 이해하는 핵심 틀은 이중경로 모형입니다. 글자를 보면 먼저 시각적 분석을 거칩니다. 한글이라면 자음과 모음, 초성 중성 종성의 위치를 파악하는 단계입니다.',
      do(S){ W.lblAllOff(); W.lesion(null); on('#def3',false); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false}); on('#dr'); S.reveal(['n3_in','p_in','n3_va']); sfx('whoosh'); },500); }},
    {id:'31-06', s:'N', t:'여기서 길이 두 갈래로 나뉩니다. 이미 알고 있는 친숙한 단어는 어휘 경로로, 처음 보는 단어나 비단어는 비어휘, 음운 경로로 갑니다.',
      do(S){ S.reveal(['rg_lx','rg_ph','p_lex','p_gpc1']); sfx('pop'); }},
    {id:'31-07', s:'N', t:'어휘 경로에서는 먼저 철자 입력 어휘집, 즉 머릿속 단어 사전에서 단어를 찾습니다. 친숙한 단어라면 자소와 음소가 일치하든 아니든 바로 찾아집니다.',
      do(S){ S.reveal(['n3_oil']); sfx('pop'); }},
    {id:'31-08', s:'N', say:'에이, 어휘-의미 경로는 의미 체계를 거쳐 뜻을 확인한 뒤 읽는 길입니다. 말처럼 뜻이 여러 개인 동음이의어는 의미를 확인해야 바르게 읽을 수 있습니다.', t:'A, 어휘-의미 경로는 의미 체계를 거쳐 뜻을 확인한 뒤 읽는 길입니다. 말처럼 뜻이 여러 개인 동음이의어는 의미를 확인해야 바르게 읽을 수 있습니다.',
      do(S){ S.reveal(['n3_sem','p_A1','p_A2','n3_pol','p_lo','n3_phs','p_out','n3_sp','rl_A']); S.dr({hi:ROUTE.A}); later(()=>e3flow(ROUTE.A,'말'),900); sfx('glow'); }},
    {id:'31-09', s:'N', say:'비, 어휘-비의미 경로는 의미를 거치지 않고, 익숙한 단어를 곧바로 읽는 길입니다. 곰처럼 뜻이 하나인 단어가 그렇습니다.', t:'B, 어휘-비의미 경로는 의미를 거치지 않고, 익숙한 단어를 곧바로 읽는 길입니다. 곰처럼 뜻이 하나인 단어가 그렇습니다.',
      do(S){ S.reveal(['p_B','rl_B']); S.dr({hi:ROUTE.B}); later(()=>e3flow(ROUTE.B,'곰'),600); sfx('glow'); }},
    {id:'31-10', s:'N', t:'비어휘, 음운 경로는 자소-음소 변환 규칙에 따라 글자를 소리로 바꿔 읽습니다. 처음 보는 단어나 비단어를 읽게 해 주지만, 규칙대로 소리 나는 단어만 바르게 읽습니다.',
      do(S){ S.reveal(['n3_gpc','p_g2','rl_G']); S.dr({hi:ROUTE.G}); later(()=>e3flow(ROUTE.G,'콥'),600); sfx('glow'); }},
    {id:'31-11', s:'N', t:'국시 핵심입니다. 아는 단어는 어휘 경로, 비단어와 생소한 단어는 비어휘 음운 경로. 둘 중 어느 길이 고장 났는지가 실독증 유형을 가릅니다.',
      do(S){ S.dr({}); on('#key3'); sfx('ding'); }},
    /* 자극어 요소 */
    {id:'31-12', s:'N', t:'유형으로 가기 전에, 읽기 검사에 쓰는 자극어의 여섯 가지 요소를 알아 두세요.', do(){ on('#dr',false); on('#key3',false); later(()=>{ on('#stm3'); sfx('whoosh'); },400); }},
    {id:'31-13', s:'N', t:'어휘성은 단어인지 비단어인지로, 컵과 콥입니다. 규칙성은 자소와 음소가 일치하는지로, 연필은 일치하고 값어치는 일치하지 않습니다.', do(){ seq([()=>on('#sr0'),()=>on('#sr1')],1600); sfx('pop'); }},
    {id:'31-14', s:'N', t:'애매성은 뜻이 하나 이상인지로 눈과 숟가락, 구체성은 구체적인 사물인지 추상적인 개념인지로 구름과 슬픔입니다.', do(){ seq([()=>on('#sr2'),()=>on('#sr3')],1800); sfx('pop'); }},
    {id:'31-15', s:'N', t:'친숙성은 얼마나 자주 접했는지로 강아지와 웜뱃, 길이는 음절 수로 해바라기와 소입니다.', do(){ seq([()=>on('#sr4'),()=>on('#sr5')],1600); sfx('pop'); }},
    /* 분류 */
    {id:'31-16', s:'N', t:'실독증은 크게 중추형과 말초형으로 나뉩니다. 중추형은 읽기 경로 자체, 즉 언어 처리 과정의 결함으로, 심층, 음운, 어휘 실독증이 있습니다.',
      do(){ on('#stm3',false); later(()=>{ on('#cls3'); on('#cl3a'); sfx('whoosh'); },400); }},
    {id:'31-17', s:'N', t:'말초형은 시각 처리나 주의처럼 언어 외적인 처리 과정의 결함으로, 실서증 없는 실독증, 무시 실독증, 주의력 실독증이 있습니다.', do(){ on('#cl3b'); sfx('pop'); }},
    /* 중추형 */
    {id:'31-18', s:'N', t:'심층 실독증은 음운 경로와 어휘 경로가 모두 손상된 유형입니다. 손상된 어휘 경로, 즉 의미에 기대어 읽기 때문에, 돌을 백일로, 고양이를 강아지로 읽는 의미 오류가 나타납니다.',
      do(S){ on('#cls3',false); later(()=>{ on('#dr'); $('#dr').classList.add('sm'); S.dr({cut:['gpc','B'], weak:['A']}); S.card('deep'); sfx('bad'); later(()=>e3flow(ROUTE.A,'돌',{to:'백일'}),900); },400); }},
    {id:'31-19', s:'N', t:'비단어를 읽기 어렵고, 비슷한 실제 단어로 바꿔 읽는 어휘화, 나비를 마비로 읽는 시각적 오류, 그리고를 그래서로 바꾸는 기능어 대치도 보입니다.', do(){ sfx('pop'); }},
    {id:'31-20', s:'N', t:'추상어가 구체어보다 어렵고, 명사보다 동사와 형용사에서 오류가 많습니다. 실어증이 함께 있다면 전반실어증이나 브로카 실어증일 가능성이 높습니다.', do(){ sfx('pop'); }},
    {id:'31-21', s:'N', t:'음운 실독증은 음운 경로가 손상되어 어휘 경로에 주로 의존합니다. 그래서 비단어나 처음 보는 단어를 읽기 어렵고, 인경을 안경으로 읽는 어휘화 오류가 나타납니다.',
      do(S){ S.dr({cut:['gpc']}); S.card('phon'); sfx('bad'); later(()=>e3flow(['p_in','p_lex','p_B','p_lo','p_out'],'인경',{to:'안경',at:0.35}),900); }},
    {id:'31-22', s:'N', t:'머릿속 사전에 있는 단어는 규칙이든 불규칙이든 잘 읽어, 85에서 95퍼센트 정도 바르게 읽는 비교적 경미한 실독증입니다. 의미 오류는 없고, 심층 실독증이 회복되는 과정에서 나타나기도 합니다.', do(){ sfx('pop'); }},
    {id:'31-23', s:'N', t:'어휘 실독증은 표층 실독증이라고도 합니다. 어휘 경로가 손상되어 음운 경로에 의존하기 때문에, 규칙 단어와 비단어는 잘 읽지만 자소와 음소가 일치하지 않는 불규칙 단어를 어려워합니다.',
      do(S){ S.dr({cut:['lex']}); S.card('surf'); sfx('bad'); later(()=>e3flow(ROUTE.G,'값어치',{to:'갑서치',at:0.5}),900); }},
    {id:'31-24', s:'N', t:'값어치를 갑서치로, 봄비를 봄삐가 아닌 봄비로 읽는 것처럼, 음운 변동 없이 글자 그대로 읽는 규칙화 오류가 특징입니다.', do(){ sfx('pop'); }},
    {id:'31-25', s:'N', t:'세 유형을 정리하면, 의미 오류는 심층, 비단어 어려움과 어휘화는 음운, 불규칙 단어와 규칙화는 어휘 실독증입니다.', do(S){ S.card(null); S.dr({}); later(()=>{ on('#tri3'); sfx('ding'); },300); }},
    /* 말초형 */
    {id:'31-26', s:'N', t:'이제 말초형입니다. 실서증 없는 실독증은 순수 실독증이라고도 하며, 말초형 중 가장 흔합니다. 좌측 후두엽과 뇌량의 뒷부분인 뇌량팽대가 손상되어, 눈으로 본 글자 정보가 언어 영역에 닿지 못합니다. 후대뇌동맥 영역입니다.',
      do(S){ on('#tri3',false); on('#dr',false); $('#dr').classList.remove('sm'); W.show({brain:true, deep:true}); W.brain({op:1}); W.hideRight(true);
        ['caudate','putamen','pallidus','thalamus','hypothalamus','pineal','nigra'].forEach(n=>W.part(n,{op:0})); W.part('callosum',{op:1,em:0.15});
        W.cam([5.4,0.3,0.2],[-0.1,-0.12,0.1],1800); W.shift(-360); W.lesion(W.realBrain?{labels:PURE3.concat([{name:'G_oc-temp_lat-fusifor',fmax:-0.45}])}:null); S.card('pure'); later(()=>{ W.lbl(['r3pure','r3spl']); sfx('bad'); },1600); }},
    {id:'31-27', s:'N', t:'시력은 정상인데도 글을 전혀 못 읽거나, 한 글자씩 천천히 더듬어 읽습니다. 쓰기는 가능하지만, 자신이 방금 쓴 글은 읽지 못하는 것이 특징입니다.',
      do(){ seq([0,1,2,3].map(i=>()=>{ on('#lb3_'+i); sfx('tick'); }),700); }},
    {id:'31-28', s:'N', t:'무시 실독증은 편측 공간무시 때문에 단어나 문장의 한쪽, 주로 왼쪽을 무시하고 오른쪽만 읽습니다. 키다리 아저씨를 아저씨로 읽는 식이고, 우반구, 특히 우측 두정엽 손상과 관련됩니다.',
      do(S){ W.lblAllOff(); W.lesion(null); W.hideRight(false); W.brain({op:0}); W.shift(0); later(()=>{ W.show({brain:false, deep:false}); on('#dm_neg'); S.card('neg'); sfx('bad'); later(()=>$('#dm_neg').classList.add('go'),900); },500); }},
    {id:'31-29', s:'N', t:'주의력 실독증은 낱단어는 비교적 잘 읽지만, 단어가 길어지거나 문장처럼 여러 글자가 함께 제시되면 오류가 늘어납니다. 감사를 삼가로 읽듯, 글자가 다른 자리로 옮겨 가는 이동 오류가 대표적입니다.',
      do(S){ on('#dm_neg',false); on('#dm_att'); S.card('att'); sfx('bad'); later(()=>$('#dm_att').classList.add('go'),1400); }},
    /* 실서증 */
    {id:'31-30', s:'N', t:'이제 실서증입니다. 실서증은 뇌손상 뒤에, 이전에 익힌 철자와 단어, 문장을 쓰는 능력이 후천적으로 손상된 것입니다.',
      do(S){ on('#dm_att',false); S.card(null); W.show({brain:true}); W.brain({op:1}); W.view('lateralL',0); W.shift(-300); later(()=>{ on('#agr'); sfx('whoosh'); },300); }},
    {id:'31-31', s:'N', t:'주로 좌반구의 전두-두정 쓰기 네트워크 손상과 관련되며, 특히 좌측 두정엽과 각회, 그리고 쓰기의 운동 중추로 불리는 엑스너 영역이 관여합니다. 엑스너 영역은 좌측 중전두회 뒤쪽에 있습니다.',
      do(S){ on('#agr1'); W.lesion(W.realBrain?{labels:AGR3.concat([{name:'G_front_middle',fmax:S.exF+0.1,fmin:S.exF-0.14}])}:null); later(()=>{ W.lbl(['a3ang','a3sp','a3ex']); sfx('glow'); },800); }},
    {id:'31-32', s:'N', t:'철자 오류, 문법과 단어 선택의 문장 오류, 글자 왜곡이나 획순 같은 글자 형태 오류가 나타납니다. 실어증이나 실독증과 함께 오는 경우가 많지만, 실서증만 단독으로 생길 수도 있습니다.', do(){ on('#agr2'); sfx('pop'); }},
    {id:'31-33', s:'N', t:'쓰기도 경로로 이해합니다. 아는 단어는 어휘 경로로, 비단어는 음소를 자소로 바꾸는 음운 경로로 철자를 만들고, 이 철자는 자소 완충기에 잠시 저장됩니다.',
      do(){ W.lblAllOff(); W.lesion(null); on('#agr',false); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false}); on('#wm3'); later(()=>on('#wm_c'),500); sfx('whoosh'); },500); }},
    {id:'31-34', s:'N', t:'그다음 글자꼴을 고르고, 손글씨 운동을 계획해 실제로 씁니다. 철자를 만드는 단계까지의 손상이 중추형, 글자를 손으로 만들어 내는 단계의 손상이 말초형 실서증입니다.',
      do(){ on('#wm_p'); later(()=>on('#wm_k'),2400); sfx('pop'); }},
    {id:'31-35', s:'N', t:'중추형 실서증부터 봅니다. 심층 실서증은 음운 경로 손상이 두드러지고 어휘-의미 처리에도 장애가 있어, 시간을 시계로 쓰는 의미 오류를 보이고 비단어 쓰기도 어렵습니다.',
      do(){ on('#wm3',false); later(()=>{ on('#cg6'); on('#cc0'); sfx('pop'); },400); }},
    {id:'31-36', s:'N', t:'음운 실서증은 음운 경로 손상으로 어휘 경로에 의존해 철자를 처리합니다. 친숙한 단어는 쓰지만 비단어를 어려워하고, 라멍을 라면으로 쓰는 어휘화 오류를 보입니다.', do(){ on('#cc1'); sfx('pop'); }},
    {id:'31-37', s:'N', t:'어휘 실서증, 곧 표층 실서증은 어휘 경로 손상으로 음운 경로에 의존합니다. 그래서 할아버지를 하라버지로 쓰는 것처럼, 소리 나는 대로 쓰는 음운적으로 그럴듯한 오류가 납니다.', do(){ on('#cc2'); sfx('pop'); }},
    {id:'31-38', s:'N', t:'의미 실서증은 의미 체계의 손상으로, 동음이의어를 받아쓸 때 see를 sea로 쓰는 식의 오류를 보입니다.',
      say:'의미 실서증은 의미 체계의 손상으로, 동음이의어를 받아쓸 때, 보다라는 뜻의 씨를 바다라는 뜻의 씨로 쓰는 식의 오류를 보입니다.', do(){ on('#cc3'); sfx('pop'); }},
    {id:'31-39', s:'N', t:'자소-완충기 장애는 잠시 저장해 둔 철자 표상이 사라지는 것으로, 단어가 길수록 오류가 늘어납니다. 보속 실서증은 앞서 쓴 글자나 음절이 다음 반응에 되풀이되는 것입니다.', do(){ seq([()=>on('#cc4'),()=>on('#cc5')],2600); sfx('pop'); }},
    {id:'31-40', s:'N', t:'말초형 실서증은 철자 지식은 비교적 남아 있지만, 글자 모양과 손 움직임으로 만들어 내는 과정이 손상된 것입니다. 이서 장애는 글자꼴 선택의 장애로, rain을 rAIn처럼 대문자와 소문자를 섞어 씁니다.',
      say:'말초형 실서증은 철자 지식은 비교적 남아 있지만, 글자 모양과 손 움직임으로 만들어 내는 과정이 손상된 것입니다. 이서 장애는 글자꼴 선택의 장애로, 영어 단어를 대문자와 소문자를 섞어 쓰거나, 인쇄체와 필기체를 혼동합니다.',
      do(){ on('#cg6',false); later(()=>{ on('#pg5'); on('#pc0'); sfx('pop'); },400); }},
    {id:'31-41', s:'N', t:'실행 실서증은 손글씨 운동 계획의 장애로 글자 형태와 획순이 틀리며, 근력 저하만으로는 설명되지 않습니다. 반면 집행장애, 즉 운동장애형은 힘과 속도, 강도 조절이 어려워 글씨가 느리고 일그러집니다.', do(){ seq([()=>on('#pc1'),()=>on('#pc2')],3600); sfx('pop'); }},
    {id:'31-42', s:'N', t:'무시 실서증은 공간무시 때문에 종이나 단어의 왼쪽을 빠뜨리고, 구심 실서증은 감각 피드백을 활용하지 못해 획이나 글자를 반복하거나 빠뜨립니다.', do(){ seq([()=>on('#pc3'),()=>on('#pc4')],2800); sfx('pop'); }},
    {id:'31-43', s:'N', t:'마지막으로 비교해 봅니다. 실독증은 읽기, 즉 입력의 문제이고, 실서증은 쓰기, 즉 출력의 문제입니다. 두 장애는 함께 나타날 수도, 따로 나타날 수도 있어서, 실서증 없는 실독증도, 실독증 없는 실서증도 가능합니다.',
      do(){ on('#pg5',false); later(()=>{ on('#cmp3'); later(()=>on('#cmp3b'),2600); sfx('whoosh'); },400); }},
    {id:'31-44', s:'N', t:'오늘 배운 내용을 한 장으로 정리합니다.', do(){ on('#cmp3',false); later(()=>{ on('#sum3'); sfx('ding'); },400); }, gap:2600},
    ...quizSteps('q3_0', Q3[0], ()=>on('#sum3',false)),
    ...quizSteps('q3_1', Q3[1], ()=>on('#q3_0',false)),
    ...quizSteps('q3_2', Q3[2], ()=>on('#q3_1',false)),
    ...quizSteps('q3_3', Q3[3], ()=>on('#q3_2',false)),
    ...quizSteps('q3_4', Q3[4], ()=>on('#q3_3',false)),
    {id:'31-45', s:'N', t:'수고하셨습니다. 다음 시간에는 마비말장애의 여섯 가지 유형을 살펴봅니다.', do(){ on('#q3_4',false); W.show({brain:true}); W.brain({op:1}); W.lesion(null); W.view('front3q',0); W.spin(0.2); }},
    {wait:2000},
  ]});
