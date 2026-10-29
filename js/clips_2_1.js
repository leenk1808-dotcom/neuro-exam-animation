/* =================================================================
   2-1. 실어증 ① 유형과 증상
   자료: 신경언어장애 정리(메인) 2. 실어증 · 특강 Part 1 (p26-46: 정의, 원인, 감별 트리, 유형별 병소, 착어, 빈출 증상, 피질하 실어증)
   ================================================================= */
const AT = {
  broca:{name:'브로카 실어증', sub:'비유창성 · 좌측 하전두이랑', ox:[0,1,0], les:{blobs:[[0.46,0.0,0.12],[0.28,0.2,0.08]]}, at:[0.46,0.0],
    li:['짧은 발화 · <b>전보식 구어</b> · <b>실문법증</b>','청각적 이해는 비교적 양호 · 이름대기 저하','마비말장애 · 말실행증 · 삼킴장애 · <b>우측 편마비</b> 종종 동반','자신의 문제를 알아 심리적 어려움 동반'],
    lz:'브로카 영역(44·45) · 일차운동영역 · 중대뇌동맥 위쪽 가지'},
  wern:{name:'베르니케 실어증', sub:'유창성 · 좌측 후측두엽', ox:[1,0,0], les:{blobs:[[-0.36,0.0,0.13]]}, at:[-0.36,0.0],
    li:['장황하고 유창하지만 내용 없는 <b>빈 구어</b> · 과유창성','<b>의미착어</b> > 음소착어 · 신조착어 · 자곤 · 탈문법증','청각·시각 자극의 <b>이해 저하</b> · 언어상동증','자신의 문제를 모르는 <b>질병불각증</b>'],
    lz:'베르니케 영역(22) · 중대뇌동맥 아래쪽 가지'},
  cond:{name:'전도실어증', sub:'유창성 · 궁상속 손상', ox:[1,1,0], les:{blobs:[[-0.15,0.15,0.11]]}, at:[-0.15,0.15],
    li:['이해 중추와 표현 중추를 잇는 <b>궁상속</b>(활모양섬유다발) 손상','구·문장 <b>따라말하기가 특히 저하</b> (반복장애)','음소착어 · 이해가 양호해 <b>자가수정</b>을 시도'],
    lz:'궁상속 · 두정엽 아래쪽 (연상회 부근)'},
  glob:{name:'전반실어증', sub:'비유창성 · 가장 심한 유형', ox:[0,0,0], les:{blobs:[[0.45,0.0,0.17],[0.15,0.05,0.18],[-0.15,0.05,0.18],[-0.42,0.02,0.17],[0.12,0.32,0.15],[-0.2,-0.22,0.15]]}, at:[0.0,0.05],
    li:['모든 언어 영역에 <b>심한 장애</b> · 보속증','피질 + 피질하 <b>백질까지</b> 광범위한 손상','<b>우측 편마비</b> · 감각 소실 동반','치료: <b>시각동작치료(VAT)</b> · PACE'],
    lz:'실비안열 주변 전체 · 중대뇌동맥 큰 경색'},
  tcma:{name:'연결피질운동실어증', sub:'비유창성 · 따라말하기 보존', ox:[0,1,1], les:{blobs:[[0.6,0.32,0.13]]}, at:[0.6,0.32],
    li:['브로카 실어증과 비슷하지만 <b>따라말하기 양호</b>','말을 <b>시작하는 데 느리고 머뭇거림</b>','반향어 · 보속 (초기 회복기) · 심한 쓰기장애'],
    lz:'브로카 영역 앞·위쪽 (보조운동영역) · 전대뇌동맥'},
  tcsa:{name:'연결피질감각실어증', sub:'유창성 · 따라말하기 보존', ox:[1,0,1], les:{blobs:[[-0.66,-0.04,0.13]]}, at:[-0.66,-0.04],
    li:['베르니케 실어증과 비슷하지만 <b>따라말하기 양호</b>','따라 말해도 <b>그 뜻은 이해하지 못함</b>','<b>반향어</b> (상대의 말을 그대로 따라 함)'],
    lz:'측두-후두 경계 (베르니케 영역 뒤쪽)'},
  mtca:{name:'혼합연결피질실어증', sub:'비유창성 · 고립증후군', ox:[0,0,1], les:{ring:[0.0,0.05,0.4,0.72]}, at:[0.55,0.45],
    li:['<b>따라말하기만</b> 어느 정도 남음','실비안열 주변 언어 영역이 주변과 단절된 <b>고립증후군</b>','반향어 · 언어보속증 · 자발화 제한'],
    lz:'실비안열 주변은 보존 · 그 바깥 경계 영역이 넓게 손상'},
  anom:{name:'명칭실어증', sub:'유창성 · 가장 경미한 유형', ox:[1,1,1], les:{blobs:[[-0.58,0.2,0.11]]}, at:[-0.58,0.2],
    li:['사물 · 사람 · 동작의 <b>이름대기 어려움</b>','<b>에둘러 말하기</b> · 착어 · 대명사 대치','다른 실어증이 회복된 뒤 <b>마지막에 남는</b> 경우가 많음'],
    lz:'병소가 다양함 · 측두-두정-후두 경계(각회) 등'},
};
/* 실제 피질(Destrieux 아틀라스) 기준 병소 라벨 */
const BRO=['G_front_inf-Opercular','G_front_inf-Triangul','S_precentral-inf-part',{name:'G_precentral',umax:0.2}];
const WER=[{name:'G_temp_sup-Lateral',fmax:-0.25},'G_temp_sup-Plan_tempo'];
const ATL={
  broca:{L:BRO, ap:[['G_front_inf-Opercular','G_front_inf-Triangul'],{}]},
  wern:{L:WER, ap:[['G_temp_sup-Lateral'],{fmax:-0.3,minL:0.2}]},
  cond:{L:['G_pariet_inf-Supramar'], ap:[['G_pariet_inf-Supramar'],{minL:0.2}]},
  glob:{L:BRO.concat(WER,['G_pariet_inf-Supramar','G_temp_sup-Lateral','G_and_S_subcentral',{name:'G_postcentral',umax:0.3},{name:'G_precentral',umax:0.3},'G_insular_short','G_Ins_lg_and_S_cent_ins','Lat_Fis-post','G_temp_sup-G_T_transv','S_circular_insula_sup','S_temporal_sup']), ap:[['G_and_S_subcentral'],{}]},
  tcma:{L:[{name:'G_front_middle',fmin:0.35},{name:'S_front_inf',fmin:0.35}], ap:[['G_front_middle'],{fmin:0.4,minL:0.2}]},
  tcsa:{L:['S_occipital_ant',{name:'G_temporal_middle',fmax:-0.45},{name:'G_occipital_middle',fmin:-0.8}], ap:[['S_occipital_ant','G_temporal_middle'],{fmax:-0.5,minL:0.2}]},
  mtca:{L:['G_front_middle','G_front_sup','S_front_sup','S_front_middle','G_parietal_sup','S_intrapariet_and_P_trans','G_pariet_inf-Angular','S_occipital_ant',{name:'G_temporal_middle',fmax:-0.4},'G_occipital_middle'], ap:[['G_front_middle'],{minL:0.2}]},
  anom:{L:['G_pariet_inf-Angular',{name:'G_temporal_middle',fmax:-0.35,fmin:-0.65}], ap:[['G_pariet_inf-Angular'],{minL:0.2}]},
};
const PERI=['G_front_inf-Opercular','G_front_inf-Triangul','G_temp_sup-Lateral','G_pariet_inf-Supramar','G_temp_sup-Plan_tempo'];
function lesionOf(k){ return W.realBrain&&ATL[k] ? {labels:ATL[k].L} : AT[k].les; }
function atypeHTML(k){ const a=AT[k]; const lab=['유창성','이해','따라말하기'];
  return `<div class="glass atype fade" id="at_${k}"><h3>${a.name}</h3><div class="sub">${a.sub}</div>
    <div class="ox">${a.ox.map((v,i)=>`<span class="${v?'o':'x'}"><b>${v?'O':'X'}</b>${lab[i]}</span>`).join('')}</div>
    <ul>${a.li.map(x=>`<li>${x}</li>`).join('')}</ul><div class="les">📍 ${a.lz}</div></div>`; }
function treeHTML(){
  const N=[['r0','비유창성',375,60,'nf'],['r1','유창성',1065,60,'fl'],
    ['a0','이해 양호',225,195],['a1','이해 손상',525,195],['a2','이해 양호',915,195],['a3','이해 손상',1215,195],
    ['b0','따라말하기<br>손상',150,330,'bx'],['b1','따라말하기<br>보존',300,330,'bo'],['b2','따라말하기<br>손상',450,330,'bx'],['b3','따라말하기<br>보존',600,330,'bo'],['b4','따라말하기<br>손상',840,330,'bx'],['b5','따라말하기<br>보존',990,330,'bo'],['b6','따라말하기<br>손상',1140,330,'bx'],['b7','따라말하기<br>보존',1290,330,'bo']];
  const LF=[['broca','브로카','',150],['tcma','연결피질<br>운동','',300],['glob','전반','',450],['mtca','혼합<br>연결피질','',600],['cond','전도','',840],['anom','명칭','',990],['wern','베르니케','',1140],['tcsa','연결피질<br>감각','',1290]];
  const par={a0:'r0',a1:'r0',a2:'r1',a3:'r1',b0:'a0',b1:'a0',b2:'a1',b3:'a1',b4:'a2',b5:'a2',b6:'a3',b7:'a3'};
  const pos={}; N.forEach(n=>pos[n[0]]=[n[2],n[3]]); LF.forEach((l,i)=>pos['L'+l[0]]=[l[3],500]);
  const lp={broca:'b0',tcma:'b1',glob:'b2',mtca:'b3',cond:'b4',anom:'b5',wern:'b6',tcsa:'b7'};
  const edge=(a,b,id)=>{ const [x1,y1]=pos[a],[x2,y2]=pos[b]; const ya=y1+24, yb=y2-28; return `<path id="${id}" d="M${x1} ${ya} C ${x1} ${(ya+yb)/2}, ${x2} ${(ya+yb)/2}, ${x2} ${yb}"/>`; };
  let svg=`<svg viewBox="0 0 1460 640" preserveAspectRatio="none">`;
  Object.entries(par).forEach(([c,p])=>svg+=edge(p,c,'e_'+c));
  Object.entries(lp).forEach(([k,b])=>svg+=edge(b,'L'+k,'e_L'+k));
  svg+='</svg>';
  const lv=[['1단계<br>유창성',60],['2단계<br>이해',195],['3단계<br>따라말하기',330],['유형',500]].map((l,i)=>`<div class="lv" id="lv${i}" style="top:${l[1]-20}px">${l[0]}</div>`).join('');
  return `<div class="glass tree2 fade" id="tree">${svg}${lv}
    ${N.map(n=>`<div class="nd ${n[4]||''}" id="n_${n[0]}" style="left:${n[2]}px;top:${n[3]}px">${n[1]}</div>`).join('')}
    ${LF.map(l=>`<div class="nd lf ${['broca','tcma','glob','mtca'].includes(l[0])?'nf':'fl'}" id="n_L${l[0]}" style="left:${l[3]}px;top:500px">${l[1]}</div>`).join('')}</div>`;
}
const Q21=[
  {sec:8, q:'말이 비유창하지만 청각적 이해력은 양호하고, 따라말하기도 양호한 실어증 유형은?', opts:['브로카 실어증','연결피질운동실어증','전반실어증','혼합연결피질실어증','전도실어증'], ans:1,
   say:'문제입니다. 말이 비유창하지만, 이해력과 따라말하기는 양호한 실어증 유형은 무엇일까요?', ex:'정답은 2번, 연결피질운동실어증입니다. 비유창, 이해 양호에서 따라말하기가 손상되면 브로카, 보존되면 연결피질운동실어증입니다.'},
  {sec:8, q:'유창하지만 내용이 없는 빈 구어와 신조착어를 보이고, 청각적 이해력과 따라말하기가 모두 저하된 실어증은?', opts:['명칭실어증','전도실어증','베르니케 실어증','연결피질감각실어증','브로카 실어증'], ans:2,
   say:'유창하지만 빈 구어와 신조착어를 보이고, 이해와 따라말하기가 모두 떨어지는 실어증은?', ex:'정답은 3번, 베르니케 실어증입니다. 따라말하기가 보존된다면 연결피질감각실어증입니다.'},
  {sec:7, q:'"감자"를 "과자"라고 말하는 오류처럼, 음소가 바뀌어 의미가 있는 다른 단어가 되는 착어는?', opts:['의미착어','음소착어','형식착어','신조착어','보속증'], ans:2,
   say:'감자를 과자라고 말하는 것처럼, 음소가 바뀌어 뜻이 있는 다른 단어가 되는 착어는?', ex:'정답은 3번, 형식착어입니다. 숟가락을 젓가락이라고 하면 의미착어, 장화를 잘화라고 하면 음소착어입니다.'},
  {sec:7, q:'자극이 바뀌었는데도 이전 반응을 계속 반복하는 증상은?', opts:['에두르기','실문법증','반복장애','보속증','착어증'], ans:3,
   say:'마지막 문제입니다. 자극이 바뀌었는데도 이전 반응을 계속 반복하는 증상은 무엇일까요?', ex:'정답은 4번, 보속증입니다. 고양이를 강아지라고 한 뒤, 자동차를 보고도 강아지라고 하는 식입니다.'},
];

CLIPS.push({ code:'2-1', short:'2-1 실어증 유형', title:'실어증 ① 유형과 증상', desc:'감별 트리 · 8유형 병소 3D · 피질하 실어증 · 착어 4종 · 빈출 증상 · 퀴즈 4문제',
  build(S){
    const hl=W.hemiL;
    W.show({brain:true}); W.view('lateralL',0); W.spin(0);
    add(hdr('EP 2-1 · 실어증 ①','실어증의 유형과 증상'));
    add(`<div class="glass fade" id="def" style="right:56px;top:150px;width:560px"><h3>실어증이란?</h3>
      <div class="row">언어 습득 <b>이후</b> · <b>중추신경계</b> 손상으로 생긴 <b>후천적</b> 언어장애</div>
      <div class="row" style="margin-top:10px">모든 언어 양식에 문제 (다중양식)</div>
      <div style="display:flex;gap:8px;margin-top:8px">${['🗣️ 말하기','👂 듣기','📖 읽기','✍️ 쓰기'].map(x=>`<span class="pill">${x}</span>`).join('')}</div>
      <div class="row" style="margin-top:12px">가장 흔한 원인 · <b class="hl-y">뇌졸중 (대뇌혈관사고)</b></div></div>`);
    add(treeHTML());
    add(`<div class="glass tip3 fade" id="tip3"><div>따라말하기 보존<br>→ <span class="hl-y">연결피질 실어증</span> 의심</div><div>유창 + 이해 저하 + 따라말하기 저하<br>→ <span class="hl-g">베르니케</span></div><div>비유창 + 이해 양호 + 따라말하기 저하<br>→ <span class="hl-b">브로카</span></div></div>`);
    Object.keys(AT).forEach(k=>add(atypeHTML(k)));
    add(`<div class="glass atype fade" id="at_sub"><h3>피질하 실어증</h3><div class="sub">유창성 · 피질 아래 구조 손상</div>
      <div class="ox"><span class="o"><b>O</b>유창성</span><span class="o"><b>O</b>이해</span><span class="o"><b>O</b>따라말하기</span></div>
      <ul><li><b>이름대기</b> 저하</li><li><b>조음장애 · 운율장애</b> 동반 · 말속도 느려질 수 있음</li></ul><div class="les">📍 좌측 기저핵 · 시상 · 백질</div></div>`);
    const P=[['의미착어','#7FB2FF','숟가락','젓가락','의미가 비슷한 단어로 바뀜','베르니케 실어증'],['음소착어','#FFAE5C','장화','잘화','단어 안의 소리(음소)가 바뀜','브로카 · 전도 실어증'],
      ['형식착어','#5EE0A8','감자','과자','소리가 바뀌어 뜻 있는 다른 단어가 됨','한국어 1~2음절 단어에서 많음'],['신조착어','#FF8CC6','꽃','브링','존재하지 않는 새로운 말','중증 베르니케 실어증']];
    add(`<div class="glass para fade" id="para">${P.map((p,i)=>`<div class="pc" id="pc${i}" style="--c:${p[1]}"><h4>${p[0]}</h4><div class="w">${p[2]}<span class="to">→</span><span class="er">${p[3]}</span></div><div class="d">${p[4]}</div><div class="ap">${p[5]}</div></div>`).join('')}</div>`);
    const SY=[['🔁','보속증','#7FB2FF','자극이 바뀌어도 앞의 반응을 계속 반복','고양이 → 강아지<br>자동차 → 강아지','자극은 바뀌었는데 대답이 반복'],
      ['💬','착어증','#FFAE5C','목표 단어 대신 잘못된 단어를 산출','포크 → 숟가락<br>전화기 → 전하기','음소 · 의미 · 신조 · 형식'],
      ['🧭','에두르기','#5EE0A8','단어가 떠오르지 않아 설명으로 돌려 말함','연필 → "글씨 쓸 때 쓰는 거"','이름대기 장애를 보상'],
      ['🔄','반복장애','#FF8CC6','들은 말을 그대로 따라 말하지 못함','책상 → 책장','전도실어증의 핵심 단서'],
      ['📄','실문법증','#C58BFF','조사 · 어미 같은 문법 형태소가 빠짐','"나 … 병원 … 가다"','브로카 실어증과 관련']];
    add(`<div class="glass sym fade" id="sym">${SY.map((s,i)=>`<div class="sc2" id="sy${i}" style="--c:${s[2]}"><div class="ic">${s[0]}</div><h4>${s[1]}</h4><div class="d">${s[3]}</div><div class="e">${s[4]}</div><div class="k">국시 단서 · ${s[5]}</div></div>`).join('')}</div>`);
    add(`<div class="glass sumg fade" id="sum21">
      <div class="sc" style="--c:#FFE45C"><h4>감별 3단계</h4><div>유창성 → 이해 → 따라말하기<br>따라말하기 보존 = 연결피질 실어증</div></div>
      <div class="sc" style="--c:#4F8EF7"><h4>비유창성</h4><div>브로카 (이해 O, 따라 X) · 연결피질운동 (O, O)<br>전반 (X, X) · 혼합연결피질 (X, O)</div></div>
      <div class="sc" style="--c:#2FC48A"><h4>유창성</h4><div>전도 (이해 O, 따라 X) · 명칭 (O, O)<br>베르니케 (X, X) · 연결피질감각 (X, O)</div></div>
      <div class="sc" style="--c:#7FB2FF"><h4>브로카 · 베르니케</h4><div>브로카 = 전보식 구어 · 실문법증 · 우측 편마비<br>베르니케 = 빈 구어 · 신조착어 · 질병불각증</div></div>
      <div class="sc" style="--c:#FF8CC6"><h4>전도 · 전반 · 명칭</h4><div>전도 = 궁상속 · 반복장애<br>전반 = 가장 심함 (VAT) · 명칭 = 가장 경미</div></div>
      <div class="sc" style="--c:#C58BFF"><h4>연결피질 3종</h4><div>운동 = 시작 머뭇거림 (ACA) · 감각 = 반향어<br>혼합 = 고립증후군 (따라말하기만 남음)</div></div>
      <div class="sc" style="--c:#FFAE5C"><h4>착어 4종</h4><div>의미 (숟가락→젓가락) · 음소 (장화→잘화)<br>형식 (감자→과자) · 신조 (비단어)</div></div>
      <div class="sc" style="--c:#5EE0A8"><h4>빈출 증상</h4><div>보속증 · 착어증 · 에두르기<br>반복장애 (전도) · 실문법증 (브로카)</div></div>
      <div class="sc" style="--c:#9FB2DA"><h4>피질하 실어증</h4><div>기저핵 · 시상 · 백질<br>유창 · 이름대기 저하 · 조음·운율 장애</div></div></div>`);
    Q21.forEach((q,i)=>add(quizHTML('q21_'+i, q)));
    /* 병소 라벨 */
    Object.entries(AT).forEach(([k,a])=>{ const s=W.lp(ATL[k].ap[0],ATL[k].ap[1],a.at); L3('lz_'+k,'병소',hl,s.p,{normal:s.n,color:'#FF6B6B',dx:-40,dy:-80,cls:'big'}); });
    S.tree=(lv)=>{ for(let i=0;i<4;i++) on('#lv'+i, i<lv); const show=(ids,v)=>ids.forEach(id=>{ const e=$('#'+id); e&&e.classList.toggle('on',v); });
      show(['n_r0','n_r1'], lv>=1); show(['e_a0','e_a1','e_a2','e_a3','n_a0','n_a1','n_a2','n_a3'], lv>=2);
      show(['e_b0','e_b1','e_b2','e_b3','e_b4','e_b5','e_b6','e_b7','n_b0','n_b1','n_b2','n_b3','n_b4','n_b5','n_b6','n_b7'], lv>=3); };
    S.leaves=(list)=>list.forEach(k=>{ on('#e_L'+k); on('#n_L'+k); });
    S.type=(k)=>{ $$('.atype').forEach(e=>e.classList.remove('on')); if(!k){ W.lesion(null); W.lblAllOff(); return; } on('#at_'+k); W.lblAllOff(); if(AT[k]){ W.lesion(lesionOf(k)); later(()=>W.lbl('lz_'+k),700); } };
  },
  steps:[
    {wait:800},
    {id:'21-01', s:'N', t:'2편 실어증, 첫 번째 시간입니다. 실어증의 유형과 증상을 살펴봅니다.'},
    {id:'21-02', s:'N', t:'실어증은 언어를 습득한 뒤 뇌, 즉 중추신경계가 손상되어 생기는 후천적 언어장애입니다. 말하기, 듣기, 읽기, 쓰기 모든 언어 양식에 문제가 나타나고, 가장 흔한 원인은 뇌졸중입니다.',
      do(){ on('#hd',false); W.shift(-300); W.lesion(W.realBrain?{labels:PERI}:{blobs:[[0.45,0.0,0.15],[0.1,0.05,0.18],[-0.3,0.02,0.16]]}); on('#def'); sfx('glow'); }},
    /* 감별 트리 */
    {id:'21-03', s:'N', t:'국시에서는 보스턴 학파의 분류에 따라, 세 가지 질문으로 실어증 유형을 감별합니다. 유창한가, 이해하는가, 따라 말할 수 있는가.',
      do(S){ on('#def',false); W.lesion(null); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false}); on('#tree'); S.tree(0); sfx('whoosh'); },500); }},
    {id:'21-04', s:'N', t:'첫째, 유창성입니다. 말이 유창한지 비유창한지로 나눕니다.', do(S){ S.tree(1); sfx('pop'); }},
    {id:'21-05', s:'N', t:'둘째, 청각적 이해력이 양호한지 손상되었는지를 봅니다.', do(S){ S.tree(2); sfx('pop'); }},
    {id:'21-06', s:'N', t:'셋째, 따라말하기가 손상되었는지 보존되었는지를 봅니다.', do(S){ S.tree(3); sfx('pop'); }},
    {id:'21-07', s:'N', t:'그러면 여덟 가지 유형이 나옵니다. 비유창성 쪽은 브로카, 연결피질운동, 전반, 혼합연결피질 실어증이고,', do(S){ S.tree(4); S.leaves(['broca','tcma','glob','mtca']); sfx('levelup'); }},
    {id:'21-08', s:'N', t:'유창성 쪽은 전도, 명칭, 베르니케, 연결피질감각 실어증입니다.', do(S){ S.leaves(['cond','anom','wern','tcsa']); sfx('levelup'); }},
    {id:'21-09', s:'N', t:'국시 팁입니다. 따라말하기가 보존되면 연결피질 실어증을 의심하세요. 유창하지만 이해와 따라말하기가 모두 떨어지면 베르니케, 비유창하고 이해는 양호한데 따라말하기가 떨어지면 브로카 실어증입니다.',
      do(){ on('#tip3'); sfx('ding'); }},
    /* 8유형 */
    {id:'21-10', s:'N', t:'브로카 실어증은 좌측 전두엽의 브로카 영역과 일차운동영역 등이 손상된 비유창성 실어증입니다. 발화가 짧고 문법 형태소가 빠지는 전보식 구어와 실문법증이 특징이고, 이해는 비교적 양호합니다.',
      do(S){ on('#tree',false); on('#tip3',false); W.show({brain:true}); W.brain({op:1}); W.view('lateralL',0); W.shift(-300); S.type('broca'); sfx('bad'); }},
    {id:'21-11', s:'N', t:'마비말장애와 말실행증, 삼킴장애, 그리고 오른쪽 편마비가 자주 함께 나타납니다.', do(){ sfx('pop'); }},
    {id:'21-12', s:'N', t:'베르니케 실어증은 좌측 후측두엽의 베르니케 영역이 손상된 유창성 실어증입니다. 말은 장황하고 유창하지만 내용이 없는 빈 구어를 보이고, 의미착어와 신조착어, 자곤이 나타납니다.', do(S){ S.type('wern'); sfx('bad'); }},
    {id:'21-13', s:'N', t:'듣고 보는 언어의 이해가 떨어지고, 자신의 문제를 잘 알지 못하는 질병불각증을 보이기도 합니다.', do(){ sfx('pop'); }},
    {id:'21-14', s:'N', t:'전도실어증은 이해 중추와 표현 중추를 잇는 궁상속이 손상된 것입니다. 이해와 말하기는 비교적 되지만, 구나 문장을 따라 말하기가 특히 어렵습니다. 이해가 양호해서 스스로 고치려는 자가수정을 자주 보입니다.',
      do(S){ S.type('cond'); W.brain({op:0.35}); W.show({assoc:true}); W.fib('assoc',1); later(()=>{ W.arcCut(true); sfx('cut'); },2500); }},
    {id:'21-15', s:'N', t:'전반실어증은 가장 심한 유형입니다. 피질뿐 아니라 피질 아래 백질까지 넓게 손상되어 모든 언어 영역에 심한 장애가 나타납니다. 오른쪽 편마비를 동반하고, 시각동작치료나 PACE를 사용합니다.',
      say:'전반실어증은 가장 심한 유형입니다. 피질뿐 아니라 피질 아래 백질까지 넓게 손상되어 모든 언어 영역에 심한 장애가 나타납니다. 오른쪽 편마비를 동반하고, 시각동작치료나 페이스를 사용합니다.',
      do(S){ W.arcCut(false); W.fib('assoc',0); W.brain({op:1}); S.type('glob'); sfx('bad'); }},
    {id:'21-16', s:'N', t:'연결피질운동실어증은 브로카 실어증과 비슷하지만 따라말하기가 양호합니다. 말을 시작하는 데 느리고 머뭇거리며, 브로카 영역의 앞쪽 위, 전대뇌동맥 영역의 손상과 관련됩니다.', do(S){ S.type('tcma'); sfx('bad'); }},
    {id:'21-17', s:'N', t:'연결피질감각실어증은 베르니케 실어증과 비슷하지만 따라말하기가 양호합니다. 다만 따라 말한 내용을 이해하지 못하고, 상대방의 말을 그대로 따라 하는 반향어를 보입니다.', do(S){ S.type('tcsa'); sfx('bad'); }},
    {id:'21-18', s:'N', t:'혼합연결피질실어증은 실비안열 주변 언어 영역은 남아 있지만 그 바깥이 넓게 손상되어, 언어 영역이 고립된 상태입니다. 그래서 고립증후군이라고도 하며, 따라말하기만 어느 정도 남아 있고 반향어와 보속증을 보입니다.', do(S){ S.type('mtca'); sfx('bad'); }},
    {id:'21-19', s:'N', t:'명칭실어증은 가장 경미한 유형으로, 이름대기가 두드러지게 어렵습니다. 에둘러 말하기와 대명사 대치를 보이고, 병소는 다양하며, 다른 실어증이 회복된 뒤 마지막에 남는 경우가 많습니다.', do(S){ S.type('anom'); sfx('bad'); }},
    {id:'21-20', s:'N', t:'그 밖에 기저핵이나 시상 같은 피질 아래 구조가 손상된 피질하 실어증도 있습니다. 유창하고 이해와 따라말하기는 되지만, 이름대기가 어렵고 조음과 운율 장애가 함께 나타납니다.',
      do(S){ S.type(null); on('#at_sub'); W.brain({op:0.15}); W.show({deep:true}); ['caudate','putamen','pallidus','thalamus'].forEach(n=>W.part(n,{op:1,em:0.6})); ['hypothalamus','pineal','nigra','callosum'].forEach(n=>W.part(n,{op:0})); W.view('deep',1800); sfx('glow'); }},
    /* 착어 */
    {id:'21-21', s:'N', t:'이제 실어증 환자에게 나타나는 말의 오류, 착어를 보겠습니다. 목표 단어 대신 다른 말이 나오는 것으로, 네 가지가 있습니다.',
      do(){ $$('.atype').forEach(e=>e.classList.remove('on')); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false, deep:false}); on('#para'); sfx('whoosh'); },500); }},
    {id:'21-22', s:'N', t:'의미착어는 의미가 비슷한 단어로 바뀌는 것입니다. 숟가락을 젓가락이라고 하는 식이고, 베르니케 실어증에서 주로 나타납니다.', do(){ on('#pc0'); sfx('pop'); }},
    {id:'21-23', s:'N', t:'음소착어는 단어 안의 소리가 바뀌는 것입니다. 장화를 잘화라고 하는 식이고, 브로카 실어증과 전도실어증에서 볼 수 있습니다.', do(){ on('#pc1'); sfx('pop'); }},
    {id:'21-24', s:'N', t:'형식착어는 소리가 바뀌었는데 우연히 뜻이 있는 다른 단어가 되는 것입니다. 감자를 과자라고 하는 식이고, 한국어에서는 한두 음절 단어에서 많이 나타납니다.', do(){ on('#pc2'); sfx('pop'); }},
    {id:'21-25', s:'N', t:'신조착어는 목표 단어와 전혀 상관없는, 존재하지 않는 말을 만드는 것으로, 중증 베르니케 실어증에서 나타납니다.', do(){ on('#pc3'); sfx('pop'); }},
    /* 빈출 증상 */
    {id:'21-26', s:'N', t:'국시에 자주 나오는 실어증 증상 다섯 가지를 정리합니다.', do(){ on('#para',false); later(()=>{ on('#sym'); sfx('whoosh'); },400); }},
    {id:'21-27', s:'N', t:'보속증은 자극이 바뀌어도 앞의 반응을 계속 반복하는 것입니다. 고양이를 강아지라고 한 뒤, 자동차를 보고도 강아지라고 합니다.', do(){ on('#sy0'); sfx('pop'); }},
    {id:'21-28', s:'N', t:'착어증은 목표 단어 대신 잘못된 단어를 말하는 것이고,', do(){ on('#sy1'); sfx('pop'); }},
    {id:'21-29', s:'N', t:'에두르기는 단어가 떠오르지 않아 설명으로 돌려 말하는 것입니다. 연필을, 글씨 쓸 때 쓰는 거라고 말하는 식입니다.', do(){ on('#sy2'); sfx('pop'); }},
    {id:'21-30', s:'N', t:'반복장애는 들은 말을 그대로 따라 말하지 못하는 것으로, 전도실어증의 핵심 단서입니다.', do(){ on('#sy3'); sfx('pop'); }},
    {id:'21-31', s:'N', t:'실문법증은 조사와 어미 같은 문법 형태소가 빠져, 나, 병원, 가다처럼 말하는 것으로, 브로카 실어증과 관련됩니다.', do(){ on('#sy4'); sfx('pop'); }},
    /* 정리 + 퀴즈 */
    {id:'21-32', s:'N', t:'오늘 배운 내용을 한 장으로 정리합니다.', do(){ on('#sym',false); later(()=>{ on('#sum21'); sfx('ding'); },400); }, gap:2600},
    ...quizSteps('q21_0', Q21[0], ()=>on('#sum21',false)),
    ...quizSteps('q21_1', Q21[1], ()=>on('#q21_0',false)),
    ...quizSteps('q21_2', Q21[2], ()=>on('#q21_1',false)),
    ...quizSteps('q21_3', Q21[3], ()=>on('#q21_2',false)),
    {id:'21-33', s:'N', t:'수고하셨습니다. 다음 시간에는 실어증의 평가와 예후, 그리고 치료를 살펴봅니다.', do(){ on('#q21_3',false); W.show({brain:true}); W.brain({op:1}); W.lesion(null); W.view('front3q',0); W.spin(0.2); }},
    {wait:2000},
  ]});
