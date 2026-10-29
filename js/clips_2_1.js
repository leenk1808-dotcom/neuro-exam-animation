/* =================================================================
   2-1. 실어증 ① 유형과 증상
   자료: 신경언어장애 정리(메인) 2. 실어증 · 특강 Part 1 (p26-46: 정의, 원인, 감별 트리, 유형별 병소, 착어, 빈출 증상, 피질하 실어증)
   ================================================================= */
const AT = {
  broca:{name:'브로카 실어증', sub:'비유창성 · 좌측 하전두이랑', ox:[0,1,0], les:{blobs:[[0.46,0.0,0.12],[0.28,0.2,0.08]]}, at:[0.46,0.0],
    li:['짧은 발화 · <b>전보식 구어</b> · <b>실문법증</b> (문법 형태소 생략)','청각적 이해 O · <b>따라말하기 · 이름대기 X</b> · <b>음소착어</b>','마비말장애 · 말실행증 · 삼킴장애 · <b>우측 편마비</b> · 쓰기 문제 동반','자신의 문제를 알아 <b>심리적 어려움</b> 동반'],
    lz:'좌측 하전두이랑 브로카 영역(44·45) · 일차운동영역 · 중대뇌동맥'},
  wern:{name:'베르니케 실어증', sub:'유창성 · 좌측 후측두엽', ox:[1,0,0], les:{blobs:[[-0.36,0.0,0.13]]}, at:[-0.36,0.0],
    li:['장황하고 유창하지만 내용 없는 <b>빈 구어</b> · 과유창성 · 병적 다변증','<b>의미착어</b> > 음소착어 · <b>형식착어 · 신조착어 · 자곤 · 탈문법증</b>','청각·시각 자극의 <b>이해 저하</b> · 따라말하기 · 이름대기 X · 언어상동증','자신의 오류를 잘 모르는 <b>질병불각증</b>'],
    lz:'좌측 (후)측두엽 베르니케 영역(22) · 중대뇌동맥'},
  cond:{name:'전도실어증', sub:'유창성 · 궁상속 손상', ox:[1,1,0], les:{blobs:[[-0.15,0.15,0.11]]}, at:[-0.15,0.15],
    li:['브로카 ↔ 베르니케를 잇는 <b>궁상속</b>(활모양섬유다발) 손상','구·문장 <b>따라말하기가 특히 저하</b> (반복장애) · 책상 → 책장','<b>음소착어</b> 빈번 · 이해가 양호해 <b>자가수정</b>을 시도하지만 자주 실패','읽기는 비교적 유지 · 쓰기에서 오류'],
    lz:'궁상속 · 두정엽 아래쪽 (연상회 부근)'},
  glob:{name:'전반실어증', sub:'비유창성 · 가장 심한 유형', ox:[0,0,0], les:{blobs:[[0.45,0.0,0.17],[0.15,0.05,0.18],[-0.15,0.05,0.18],[-0.42,0.02,0.17],[0.12,0.32,0.15],[-0.2,-0.22,0.15]]}, at:[0.0,0.05],
    li:['말하기 · 이해 · 읽기 · 쓰기 모두 <b>심한 장애</b> · 의미 있는 표현 거의 불가','<b>보속증</b> · 짧은 발화를 반복','브로카 + 베르니케 + 궁상속 · 피질하 <b>백질까지</b> 광범위한 손상','<b>우측 편마비</b> · 감각 소실 · 치료 <b>VAT</b> · PACE'],
    lz:'좌반구 실비안열 주변 전체 · 중대뇌동맥 큰 경색'},
  tcma:{name:'연결피질운동실어증', sub:'비유창성 · 따라말하기 보존', ox:[0,1,1], les:{blobs:[[0.6,0.32,0.13]]}, at:[0.6,0.32],
    li:['브로카 실어증과 비슷하지만 <b>따라말하기 양호</b>','자발화 시 말을 <b>시작하는 데 느리고 극단적으로 머뭇거림</b>','<b>반향어 · 보속증</b>은 초기 회복기에 흔함 · 심한 쓰기장애'],
    lz:'좌측 전두엽 · 브로카 영역 앞쪽 위 연결피질 · 전대뇌동맥'},
  tcsa:{name:'연결피질감각실어증', sub:'유창성 · 따라말하기 보존', ox:[1,0,1], les:{blobs:[[-0.66,-0.04,0.13]]}, at:[-0.66,-0.04],
    li:['베르니케 실어증과 비슷하지만 <b>따라말하기 양호</b>','따라 말해도 <b>그 뜻은 이해하지 못함</b>','<b>반향어</b> · 문법적으로 부정확한 형태로도 따라 함'],
    lz:'좌측 측두-후두 경계 · 베르니케 영역 뒤쪽 연결피질'},
  mtca:{name:'혼합연결피질실어증', sub:'비유창성 · 고립증후군', ox:[0,0,1], les:{ring:[0.0,0.05,0.4,0.72]}, at:[0.55,0.45],
    li:['<b>따라말하기만</b> 어느 정도 남음 · 이해 · 이름대기 X','실비안열 주변 언어 영역이 주변과 단절된 <b>고립증후군</b>','<b>반향어 · 언어보속증</b> · 신조어 · 자발화 제한'],
    lz:'좌반구 광범위 손상 · 실비안열 주변은 보존'},
  anom:{name:'명칭실어증', sub:'유창성 · 가장 경미한 유형', ox:[1,1,1], les:{blobs:[[-0.58,0.2,0.11]]}, at:[-0.58,0.2],
    li:['유창 · 이해 O · 따라말하기 O · <b>이름대기만 X</b>','<b>에둘러 말하기</b> · 착어(단어 대치) · <b>대명사 대치</b>','다른 실어증이 회복된 뒤 <b>마지막에 남는</b> 경우가 많음'],
    lz:'측두-두정-후두 경계 · 중측두이랑 · 각회 (병소 다양)'},
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
   say:'감자를 과자라고 말하는 것처럼, 음소가 바뀌어 뜻이 있는 다른 단어가 되는 착어는?', ex:'정답은 3번, 형식착어입니다. 장화를 잘화처럼 비단어가 되면 음소착어, 숟가락을 젓가락처럼 뜻이 연관된 단어로 바뀌면 의미착어입니다.'},
  {sec:7, q:'자극이 바뀌었는데도 이전 반응을 계속 반복하는 증상은?', opts:['에두르기','실문법증','반복장애','보속증','착어증'], ans:3,
   say:'마지막 문제입니다. 자극이 바뀌었는데도 이전 반응을 계속 반복하는 증상은 무엇일까요?', ex:'정답은 4번, 보속증입니다. 고양이를 강아지라고 한 뒤, 자동차를 보고도 강아지라고 하는 식입니다.'},
  {sec:8, q:'유창하고 청각적 이해와 따라말하기는 양호하지만, 단어가 떠오르지 않아 에둘러 말하기와 대명사 대치를 보이는 실어증은?', opts:['전도실어증','베르니케 실어증','명칭실어증','연결피질감각실어증','브로카 실어증'], ans:2,
   say:'유창하고 이해와 따라말하기는 양호하지만, 단어가 떠오르지 않아 에둘러 말하고 대명사로 대신하는 실어증은 무엇일까요?', ex:'정답은 3번, 명칭실어증입니다. 에두르기는 명칭실어증의 대표 증상이고, 같은 조건에서 따라말하기만 떨어지면 전도실어증입니다.'},
];
/* 착어 4종: 메인 정리 '착어의 종류' + 특강 p38·45 정의 그대로 */
const PZ=[
  {n:'의미착어', en:'semantic', c:'#7FB2FF', tp:'🥄', tw:'숟가락', mode:'swap', out:'젓가락', op:'🥢', real:1, link:'뜻', def:'목표와 <b>의미적으로 연관된</b><br>다른 단어로 표현', ex2:'포크 → 숟가락 · 개 → 고양이', ty:'주로 베르니케 실어증'},
  {n:'음소착어', en:'phonemic', c:'#FFAE5C', tp:'👢', tw:'장화', mode:'morph', syl:[['장','잘'],'화'], op:'❓', real:0, link:'소리', def:'목표 단어 안의 <b>음소가 대치</b><br>→ 존재하지 않는 말', ex2:'전화기 → 전하기 · 의사 → 이사', ty:'브로카 · 전도 실어증'},
  {n:'형식착어', en:'formal', c:'#5EE0A8', tp:'🥔', tw:'감자', mode:'morph', syl:[['감','과'],'자'], op:'🍪', real:1, link:'소리', def:'음소가 대치되면서 <b>의미가 있는</b><br><b>다른 단어</b>로 표현', ex2:'소리 → 오리 · 1~2음절 단어에 많음', ty:'베르니케 실어증'},
  {n:'신조착어', en:'neologistic', c:'#FF8CC6', tp:'🌸', tw:'꽃', mode:'neo', out:'브링', op:'❓', real:0, link:'없음', def:'목표와 <b>전혀 상관없는</b><br>비단어 · 새로운 말', ex2:'의미 없는 새로운 발음', ty:'중증 베르니케 실어증'},
];
function pzHTML(){
  const outH=p=> p.mode==='morph' ? p.syl.map(s=>Array.isArray(s)?`<span class="sy ch"><i class="o">${s[0]}</i><i class="n">${s[1]}</i></span>`:`<span class="sy">${s}</span>`).join('')
    : `<span class="sy ch${p.mode==='neo'?' neo':''}" style="min-width:${Math.max(p.tw.length,p.out.length)*1.02}em"><i class="o">${p.tw}</i><i class="n">${p.out}</i></span>`;
  return `<div class="glass pz fade" id="pz">${PZ.map((p,i)=>`<div class="pzc" id="pz${i}" style="--c:${p.c}">
    <h4>${p.n}<small>${p.en}</small></h4><div class="df">${p.def}</div>
    <div class="ptg"><span class="em">${p.tp}</span><span class="lb">목표</span><b>${p.tw}</b></div>
    <div class="ar">▼</div>
    <div class="ot"><span class="wd">${outH(p)}</span><span class="oe">${p.op}</span></div>
    <div class="cps"><span class="cp ${p.real?'rw':'nw'}">${p.real?'✅ 실제 단어':'❌ 비단어'}</span><span class="cp lk">연결 고리 · ${p.link}</span></div>
    <div class="e2">${p.ex2}</div><div class="ty">📍 ${p.ty}</div></div>`).join('')}</div>`;
}
function pgHTML(){
  const cell=(id,c,n,ex,ty)=>`<div class="cell" id="${id}" style="--c:${c}"><h4>${n}</h4><div class="x">${ex}</div><small>${ty}</small></div>`;
  return `<div class="glass pg fade" id="pg"><div class="ax">목표 단어와의<br>연결 고리 →</div><div class="hd">🔗 <b>뜻</b>이 연관</div><div class="hd">🔊 <b>소리</b>가 비슷</div><div class="hd">✖ <b>연관 없음</b></div>
    <div class="rh" id="pg_r0">결과가<br><b class="hl-g">실제 단어</b></div>${cell('pg_sem','#7FB2FF','의미착어','숟가락 → 젓가락','베르니케')}${cell('pg_frm','#5EE0A8','형식착어','감자 → 과자','베르니케 · 1~2음절')}<div class="cell nil">—</div>
    <div class="rh" id="pg_r1">결과가<br><b class="hl-r">비단어</b></div><div class="cell nil">—</div>${cell('pg_pho','#FFAE5C','음소착어','장화 → 잘화','브로카 · 전도')}${cell('pg_neo','#FF8CC6','신조착어','꽃 → 브링','중증 베르니케')}</div>`;
}
/* 증상 × 유형 표 (메인 정리 2-1) + 특강 p36-42·46) */
const MXC=[['broca','브로카','nf'],['glob','전반','nf'],['tcma','연결피질<br>운동','nf'],['mtca','혼합<br>연결피질','nf'],['wern','베르니케','fl'],['cond','전도','fl'],['tcsa','연결피질<br>감각','fl'],['anom','명칭','fl']];
const MXR=[
  ['보속증', {glob:['●','짧은 발화 반복'], tcma:['○','초기 회복기'], mtca:['●','언어보속증']}],
  ['반향어', {tcma:['○','초기 회복기'], mtca:['●'], tcsa:['●']}],
  ['실문법증 · 전보식 구어', {broca:['●']}],
  ['음소착어', {broca:['●'], wern:['○'], cond:['●','자가수정 시도']}],
  ['의미착어', {wern:['●'], anom:['○','단어 대치']}],
  ['형식착어', {wern:['○']}],
  ['신조착어 · 자곤', {mtca:['○','신조어'], wern:['●','중증']}],
  ['탈문법증', {wern:['●']}],
  ['에두르기 · 대명사 대치', {anom:['●']}],
  ['따라말하기 저하', {broca:['○'], glob:['○'], wern:['○'], cond:['★','반복장애']}],
  ['빈 구어 · 질병불각증', {wern:['●']}],
];
function mxHTML(){
  let h=`<div class="glass mx fade" id="mx"><div class="mr fam"><div class="c0"></div><div class="fm nf">비유창성</div><div class="fm fl">유창성</div></div>
    <div class="mr mh"><div class="c0">증상 ＼ 유형</div>${MXC.map(c=>`<div class="ch ${c[2]}" data-k="${c[0]}">${c[1]}</div>`).join('')}</div>`;
  MXR.forEach((r,i)=>{ h+=`<div class="mr bd" id="mr${i}"><div class="c0">${r[0]}</div>${MXC.map(c=>{ const v=r[1][c[0]]; const k=v?(v[0]==='●'?'f':v[0]==='★'?'s':'h'):''; return `<div class="cl ${c[2]}" data-k="${c[0]}">${v?`<span class="dt ${k}">${v[0]}</span>${v[1]?`<small>${v[1]}</small>`:''}`:''}</div>`; }).join('')}</div>`; });
  return h+`<div class="lg"><span><b class="f">●</b> 대표 단서</span><span><b class="h">○</b> 나타날 수 있음</span><span><b class="s">★</b> 핵심 감별 단서</span></div></div>`;
}

CLIPS.push({ code:'2-1', short:'2-1 실어증 유형', title:'실어증 ① 유형과 증상', desc:'감별 트리 · 8유형 병소 3D · 피질하 실어증 · 착어 4종 · 빈출 증상 · 퀴즈 4문제',
  build(S){
    const hl=W.hemiL;
    W.show({brain:true}); W.view('lateralL',0); W.spin(0);
    add(hdr('EP 2-1 · 실어증 ①','실어증의 유형과 증상'));
    add(`<div class="glass fade" id="def" style="right:56px;top:150px;width:560px"><h3>실어증이란?</h3>
      <div class="row">언어 습득 <b>이후</b> · <b>중추신경계</b> 손상으로 생긴 <b>후천적</b> 언어장애</div>
      <div class="row" style="margin-top:10px">모든 언어 양식에 문제 (다중양식)</div>
      <div style="display:flex;gap:8px;margin-top:8px">${['🗣️ 말하기','👂 듣기','📖 읽기','✍️ 쓰기'].map(x=>`<span class="pill">${x}</span>`).join('')}</div>
      <div class="row" style="margin-top:12px">가장 흔한 원인 · <b class="hl-y">뇌졸중 (대뇌혈관사고, CVA)</b></div>
      <div class="row fade" id="def2" style="margin-top:8px;font-size:18px;line-height:1.55;padding:10px 12px;border-radius:12px;background:rgba(255,228,92,.08)">🩸 뇌경색 (혈전증 · 색전증) · 뇌출혈 · TIA<br>🤕 외상성 뇌손상 · 🧬 뇌종양 · 🦠 감염 (뇌염 · 수막염)<br>➕ 신진대사장애 · 영양장애 등</div></div>`);
    add(treeHTML());
    add(`<div class="glass fade bmn" id="bmn"><b class="hl-y">보스턴 학파</b> 손상 부위에 따른 <b>신경해부학적</b> 분류<br><span>미네소타 학파 · 언어 수행 능력에 따른 기능적 분류</span></div>`);
    add(`<div class="glass tip3 t5 fade" id="tip3"><div>따라말하기 보존<br>→ <span class="hl-y">연결피질 실어증</span> 의심</div><div>유창 · 이해 X · 따라 X<br>→ <span class="hl-g">베르니케</span></div><div>비유창 · 이해 O · 따라 X<br>→ <span class="hl-b">브로카</span></div><div class="tx" id="tip3a">유창 · 이해 O · 따라 X<br>→ <span class="hl-g">전도</span></div><div class="tx" id="tip3b">유창 · 이해 O · 따라 O<br>→ <span class="hl-g">명칭</span></div></div>`);
    Object.keys(AT).forEach(k=>add(atypeHTML(k)));
    add(`<div class="glass atype fade" id="at_sub"><h3>피질하 실어증</h3><div class="sub">유창성 · 피질 아래 구조 손상</div>
      <div class="ox"><span class="o"><b>O</b>유창성</span><span class="o"><b>O</b>이해</span><span class="o"><b>O</b>따라말하기</span></div>
      <ul><li><b>이름대기</b> 저하</li><li><b>조음장애 · 운율장애</b> 동반 · 말속도 느려질 수 있음</li></ul><div class="les">📍 좌측 기저핵 · 시상 · 백질</div></div>`);
    add(pzHTML()); add(pgHTML());
    const SY=[['🔁','보속증','#7FB2FF','자극이 바뀌어도 앞의 반응을 계속 반복','고양이 → 강아지<br>자동차 → 강아지','<b>전반</b>(짧은 발화 반복) · <b>혼합연결피질</b>(언어보속증) · 연결피질운동(초기 회복기)'],
      ['💬','착어증','#FFAE5C','목표 단어 대신 잘못된 단어를 산출','포크 → 숟가락<br>전화기 → 전하기','주로 <b>유창성</b> 실어증 · 음소 = 브로카·전도 · 의미·신조 = 베르니케'],
      ['🧭','에두르기','#5EE0A8','단어가 떠오르지 않아 설명으로 돌려 말함','연필 → "글씨 쓸 때 쓰는 거"','이름대기 장애를 보상 · <b>명칭실어증</b>'],
      ['🔄','반복장애','#FF8CC6','들은 말을 그대로 따라 말하지 못함','책상 → 책장','<b>전도실어증</b>의 핵심 단서 (유창 · 이해 O인데 따라 X)'],
      ['📄','실문법증','#C58BFF','조사 · 어미 같은 문법 형태소가 빠짐','"나 … 병원 … 가다"','<b>브로카 실어증</b> · 전보식 구어']];
    add(`<div class="glass sym fade" id="sym">${SY.map((s,i)=>`<div class="sc2" id="sy${i}" style="--c:${s[2]}"><div class="ic">${s[0]}</div><h4>${s[1]}</h4><div class="d">${s[3]}</div><div class="e">${s[4]}</div><div class="k">📍 ${s[5]}</div></div>`).join('')}</div>`);
    const SY2=[['🦜','반향어','#FFE45C','상대방 발화를 부분 또는 전체 그대로 따라 말함','"식사하셨어요?" → "식사하셨어요?"','<b>연결피질감각</b> · <b>혼합연결피질</b> · 연결피질운동(초기 회복기)'],
      ['🌀','자곤','#FF8CC6','착어 · 신조어가 뒤섞여 유창하지만 알아들을 수 없는 말','"그 브링이 사가를 해서 …"','<b>베르니케 실어증</b> (중증)'],
      ['🧩','탈문법증','#7FE0E0','문법 형태소가 빠지지 않고 <b>잘못 쓰임</b>','"나를 병원이 갔어요"','<b>베르니케 실어증</b><br>↔ 실문법증(빠짐) = 브로카'],
      ['🙈','질병불각증 · 빈 구어','#C58BFF','자신의 오류를 모름 · 길고 유창하지만 내용이 없음','"그게 그거라서 그렇게 했지요"','<b>베르니케 실어증</b><br>↔ 브로카는 문제를 알아 심리적 어려움']];
    add(`<div class="glass sym sym4 fade" id="sym2">${SY2.map((s,i)=>`<div class="sc2" id="sz${i}" style="--c:${s[2]}"><div class="ic">${s[0]}</div><h4>${s[1]}</h4><div class="d">${s[3]}</div><div class="e">${s[4]}</div><div class="k">📍 ${s[5]}</div></div>`).join('')}</div>`);
    add(mxHTML());
    add(`<div class="glass sumg fade" id="sum21">
      <div class="sc" style="--c:#FFE45C"><h4>감별 3단계</h4><div>유창성 → 이해 → 따라말하기<br>따라말하기 보존 = 연결피질 실어증</div></div>
      <div class="sc" style="--c:#4F8EF7"><h4>비유창성</h4><div>브로카 (이해 O, 따라 X) · 연결피질운동 (O, O)<br>전반 (X, X) · 혼합연결피질 (X, O)</div></div>
      <div class="sc" style="--c:#2FC48A"><h4>유창성</h4><div>전도 (이해 O, 따라 X) · 명칭 (O, O)<br>베르니케 (X, X) · 연결피질감각 (X, O)</div></div>
      <div class="sc" style="--c:#7FB2FF"><h4>브로카 · 베르니케</h4><div>브로카 = 실문법증 · 음소착어 · 우측 편마비<br>베르니케 = 의미·형식·신조착어 · 자곤 · 탈문법 · 질병불각증</div></div>
      <div class="sc" style="--c:#FF8CC6"><h4>전도 · 전반 · 명칭</h4><div>전도 = 궁상속 · 반복장애 · 음소착어 + 자가수정<br>전반 = 보속증 (VAT) · 명칭 = 에두르기 · 대명사 대치</div></div>
      <div class="sc" style="--c:#C58BFF"><h4>연결피질 3종</h4><div>운동 = 브로카 앞쪽 위 (ACA) · 시작 머뭇거림<br>감각 = 측두-후두 경계 · 반향어 · 혼합 = 고립증후군</div></div>
      <div class="sc" style="--c:#FFAE5C"><h4>착어 4종</h4><div>실제 단어 · 뜻 연관 = <b>의미</b> (숟가락→젓가락) · 소리 = <b>형식</b> (감자→과자)<br>비단어 · 소리 = <b>음소</b> (장화→잘화) · 무관 = <b>신조</b> (꽃→브링)</div></div>
      <div class="sc" style="--c:#5EE0A8"><h4>증상 → 유형</h4><div>보속증 = 전반 · 혼합 · 반향어 = 연결피질<br>에두르기 = 명칭 · 반복장애 = 전도 · 실문법 = 브로카</div></div>
      <div class="sc" style="--c:#9FB2DA"><h4>피질하 실어증</h4><div>좌측 기저핵 · 시상 · 백질<br>유창 · 이해 O · 따라 O · 이름대기 X · 조음·운율 장애</div></div></div>`);
    Q21.forEach((q,i)=>add(quizHTML('q21_'+i, q)));
    /* 병소 라벨 */
    Object.entries(AT).forEach(([k,a])=>{ const s=W.lp(ATL[k].ap[0],ATL[k].ap[1],a.at); L3('lz_'+k,'병소',hl,s.p,{normal:s.n,color:'#FF6B6B',dx:-40,dy:-80,cls:'big'}); });
    S.tree=(lv)=>{ for(let i=0;i<4;i++) on('#lv'+i, i<lv); const show=(ids,v)=>ids.forEach(id=>{ const e=$('#'+id); e&&e.classList.toggle('on',v); });
      show(['n_r0','n_r1'], lv>=1); show(['e_a0','e_a1','e_a2','e_a3','n_a0','n_a1','n_a2','n_a3'], lv>=2);
      show(['e_b0','e_b1','e_b2','e_b3','e_b4','e_b5','e_b6','e_b7','n_b0','n_b1','n_b2','n_b3','n_b4','n_b5','n_b6','n_b7'], lv>=3); };
    S.leaves=(list)=>list.forEach(k=>{ on('#e_L'+k); on('#n_L'+k); });
    S.type=(k)=>{ $$('.atype').forEach(e=>e.classList.remove('on')); if(!k){ W.lesion(null); W.lblAllOff(); return; } on('#at_'+k); W.lblAllOff(); if(AT[k]){ W.lesion(lesionOf(k)); later(()=>W.lbl('lz_'+k),700); } };
    S.pz=(i)=>{ on('#pz'+i); sfx('pop'); later(()=>{ $('#pz'+i).classList.add('go'); sfx('whoosh'); },1100); };
    S.pgF=(ids)=>{ $$('#pg .cell:not(.nil), #pg .rh').forEach(e=>{ e.classList.toggle('dim', !!ids && !ids.includes(e.id)); e.classList.toggle('hl', !!ids && ids.includes(e.id) && e.classList.contains('cell')); }); };
    S.mxRows=(n)=>{ for(let i=0;i<MXR.length;i++) later(()=>{ on('#mr'+i); },i*n); };
    S.mxCol=(keys)=>{ $$('#mx [data-k]').forEach(e=>e.classList.toggle('dim', !!keys && !keys.includes(e.dataset.k))); };
    S.mxRow=(idx)=>{ $$('#mx .mr.bd').forEach((e,i)=>{ e.classList.toggle('dimr', !!idx && !idx.includes(i)); e.classList.toggle('hlr', !!idx && idx.includes(i)); }); };
  },
  steps:[
    {wait:800},
    {id:'21-01', s:'N', t:'2편 실어증, 첫 번째 시간입니다. 실어증의 유형과 증상을 살펴봅니다.'},
    {id:'21-02', s:'N', t:'실어증은 언어를 습득한 뒤 뇌, 즉 중추신경계가 손상되어 생기는 후천적 언어장애입니다. 말하기, 듣기, 읽기, 쓰기 모든 언어 양식에 문제가 나타나고, 가장 흔한 원인은 뇌졸중입니다.',
      do(){ on('#hd',false); W.shift(-300); W.lesion(W.realBrain?{labels:PERI}:{blobs:[[0.45,0.0,0.15],[0.1,0.05,0.18],[-0.3,0.02,0.16]]}); on('#def'); sfx('glow'); }},
    {id:'21-02a', s:'N', t:'뇌졸중, 즉 대뇌혈관사고에는 혈전증과 색전증으로 생기는 뇌경색, 그리고 뇌출혈이 있고, 일시적 뇌허혈 증상인 TIA는 뇌졸중의 경고 신호입니다. 그 밖에 외상성 뇌손상, 뇌종양, 감염, 신진대사장애도 원인이 됩니다.',
      say:'뇌졸중, 즉 대뇌혈관사고에는 혈전증과 색전증으로 생기는 뇌경색, 그리고 뇌출혈이 있고, 일시적 뇌허혈 증상인 티아이에이는 뇌졸중의 경고 신호입니다. 그 밖에 외상성 뇌손상, 뇌종양, 감염, 신진대사장애도 원인이 됩니다.',
      do(){ on('#def2'); sfx('pop'); }},
    /* 감별 트리 */
    {id:'21-03', s:'N', t:'국시에서는 보스턴 학파의 분류에 따라, 세 가지 질문으로 실어증 유형을 감별합니다. 유창한가, 이해하는가, 따라 말할 수 있는가.',
      do(S){ on('#def',false); W.lesion(null); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false}); on('#tree'); S.tree(0); sfx('whoosh'); },500); }},
    {id:'21-03a', s:'N', t:'보스턴 학파는 뇌의 손상 부위에 따라 나누는 신경해부학적 분류이고, 미네소타 학파는 언어 수행 능력에 따라 나누는 기능적 분류입니다.',
      do(){ on('#bmn'); sfx('pop'); }},
    {id:'21-04', s:'N', t:'첫째, 유창성입니다. 말이 유창한지 비유창한지로 나눕니다.', do(S){ on('#bmn',false); S.tree(1); sfx('pop'); }},
    {id:'21-05', s:'N', t:'둘째, 청각적 이해력이 양호한지 손상되었는지를 봅니다.', do(S){ S.tree(2); sfx('pop'); }},
    {id:'21-06', s:'N', t:'셋째, 따라말하기가 손상되었는지 보존되었는지를 봅니다.', do(S){ S.tree(3); sfx('pop'); }},
    {id:'21-07', s:'N', t:'그러면 여덟 가지 유형이 나옵니다. 비유창성 쪽은 브로카, 연결피질운동, 전반, 혼합연결피질 실어증입니다.', do(S){ S.tree(4); S.leaves(['broca','tcma','glob','mtca']); sfx('levelup'); }},
    {id:'21-08', s:'N', t:'유창성 쪽은 전도, 명칭, 베르니케, 연결피질감각 실어증입니다.', do(S){ S.leaves(['cond','anom','wern','tcsa']); sfx('levelup'); }},
    {id:'21-09', s:'N', t:'국시 팁입니다. 따라말하기가 보존되면 연결피질 실어증을 의심하세요. 유창하지만 이해와 따라말하기가 모두 떨어지면 베르니케, 비유창하고 이해는 양호한데 따라말하기가 떨어지면 브로카 실어증입니다.',
      do(){ on('#tip3'); sfx('ding'); }},
    {id:'21-09a', s:'N', t:'유창하고 이해도 양호한데 따라말하기만 떨어지면 전도실어증, 따라말하기까지 양호하고 이름대기만 어려우면 명칭실어증입니다.',
      do(){ on('#tip3a'); $('#n_Lcond').classList.add('hl'); later(()=>{ on('#tip3b'); $('#n_Lanom').classList.add('hl'); },2600); sfx('pop'); }},
    /* 8유형 */
    {id:'21-10', s:'N', t:'브로카 실어증은 좌측 전두엽 하전두이랑의 브로카 영역과 일차운동영역 등이 손상된 비유창성 실어증입니다. 발화가 짧고 문법 형태소가 빠지는 전보식 구어와 실문법증이 특징이고, 이해는 비교적 양호하지만 따라말하기와 이름대기가 어렵습니다.',
      do(S){ on('#tree',false); on('#tip3',false); W.show({brain:true}); W.brain({op:1}); W.view('lateralL',0); W.shift(-300); S.type('broca'); sfx('bad'); }},
    {id:'21-11', s:'N', t:'브로카 영역은 중대뇌동맥이 혈액을 공급합니다. 소리가 바뀌는 음소착어도 보이고, 마비말장애와 말실행증, 삼킴장애, 오른쪽 편마비가 자주 함께 나타납니다. 자신의 문제를 알기 때문에 심리적 어려움도 큽니다.', do(){ sfx('pop'); }},
    {id:'21-12', s:'N', t:'베르니케 실어증은 좌측 후측두엽의 베르니케 영역이 손상된 유창성 실어증입니다. 말은 장황하고 유창하지만 내용이 없는 빈 구어를 보이고, 의미착어가 가장 두드러지며, 형식착어와 신조착어, 자곤, 문법 형태소를 잘못 쓰는 탈문법증이 나타납니다.', do(S){ S.type('wern'); sfx('bad'); }},
    {id:'21-13', s:'N', t:'듣고 보는 언어의 이해가 떨어지고, 따라말하기와 이름대기도 어렵습니다. 자신의 오류를 잘 알지 못하는 질병불각증을 보이기도 합니다.', do(){ sfx('pop'); }},
    {id:'21-14', s:'N', t:'전도실어증은 이해 중추와 표현 중추를 잇는 궁상속이 손상된 것입니다. 이해와 말하기는 비교적 되지만, 구나 문장을 따라 말하기가 특히 어렵습니다. 음소착어가 잦고, 이해가 양호해서 스스로 고치려는 자가수정을 시도하지만 자주 실패합니다.',
      do(S){ S.type('cond'); W.brain({op:0.35}); W.show({assoc:true}); W.fib('assoc',1); W.cam([-4.5,0.45,0.05],[0,-0.05,0.05],2200); later(()=>{ W.arcCut(true); sfx('cut'); },2500); }},
    {id:'21-15', s:'N', t:'전반실어증은 가장 심한 유형입니다. 브로카 영역, 베르니케 영역, 궁상속을 포함해 피질 아래 백질까지 넓게 손상되어 모든 언어 영역에 심한 장애가 나타나고, 짧은 발화를 되풀이하는 보속증을 보입니다. 오른쪽 편마비를 동반하고, 시각동작치료나 PACE를 사용합니다.',
      say:'전반실어증은 가장 심한 유형입니다. 브로카 영역, 베르니케 영역, 궁상속을 포함해 피질 아래 백질까지 넓게 손상되어 모든 언어 영역에 심한 장애가 나타나고, 짧은 발화를 되풀이하는 보속증을 보입니다. 오른쪽 편마비를 동반하고, 시각동작치료나 페이스를 사용합니다.',
      do(S){ W.arcCut(false); W.fib('assoc',0); W.brain({op:1}); W.view('lateralL',1400); S.type('glob'); sfx('bad'); }},
    {id:'21-16', s:'N', t:'연결피질운동실어증은 브로카 실어증과 비슷하지만 따라말하기가 양호합니다. 말을 시작하는 데 극단적으로 머뭇거리고, 쓰기장애가 심합니다. 반향어와 보속증은 초기 회복기에 흔합니다. 병소는 좌측 전두엽, 브로카 영역 앞쪽 위의 연결피질로, 전대뇌동맥 손상과 관련됩니다.', do(S){ S.type('tcma'); sfx('bad'); }},
    {id:'21-17', s:'N', t:'연결피질감각실어증은 베르니케 실어증과 비슷하지만 따라말하기가 양호합니다. 다만 따라 말한 내용을 이해하지 못하고, 상대방의 말을 그대로 따라 하는 반향어를 보입니다. 병소는 좌측 측두엽과 후두엽의 경계, 베르니케 영역 뒤쪽의 연결피질입니다.', do(S){ S.type('tcsa'); sfx('bad'); }},
    {id:'21-18', s:'N', t:'혼합연결피질실어증은 실비안열 주변 언어 영역은 남아 있지만 그 바깥이 넓게 손상되어, 언어 영역이 고립된 상태입니다. 그래서 고립증후군이라고도 하며, 따라말하기만 어느 정도 남아 있고 반향어와 언어보속증을 보입니다.', do(S){ S.type('mtca'); sfx('bad'); }},
    {id:'21-19', s:'N', t:'명칭실어증은 가장 경미한 유형으로, 이름대기가 두드러지게 어렵습니다. 단어 대신 설명으로 돌려 말하는 에두르기와 대명사 대치를 보이고, 병소는 측두엽, 두정엽, 후두엽 경계의 각회 등으로 다양하며, 다른 실어증이 회복된 뒤 마지막에 남는 경우가 많습니다.', do(S){ S.type('anom'); sfx('bad'); }},
    {id:'21-20', s:'N', t:'그 밖에 기저핵이나 시상 같은 피질 아래 구조가 손상된 피질하 실어증도 있습니다. 유창하고 이해와 따라말하기는 되지만, 이름대기가 어렵고 조음과 운율 장애가 함께 나타납니다.',
      do(S){ S.type(null); on('#at_sub'); W.brain({op:0.15}); W.show({deep:true}); ['caudate','putamen','pallidus','thalamus'].forEach(n=>W.part(n,{op:1,em:0.6})); ['hypothalamus','pineal','nigra','callosum'].forEach(n=>W.part(n,{op:0})); W.view('deep',1800); sfx('glow'); }},
    /* 착어 4종: 단어 변형 애니메이션 */
    {id:'21-21', s:'N', t:'이제 착어를 보겠습니다. 착어는 말하거나 쓸 때 목표 단어 대신 다른 말이 잘못 선택되는 것으로, 주로 유창성 실어증에서 나타납니다. 결과가 실제 단어인지, 그리고 목표 단어와 무엇으로 이어져 있는지를 보면 네 가지가 구분됩니다.',
      do(){ $$('.atype').forEach(e=>e.classList.remove('on')); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false, deep:false}); on('#pz'); sfx('whoosh'); },500); }},
    {id:'21-22', s:'N', t:'의미착어는 목표 단어와 의미적으로 연관된 다른 단어로 말하는 것입니다. 숟가락을 젓가락, 개를 고양이라고 하는 식으로, 결과는 실제 단어이고 목표와는 뜻으로 이어져 있습니다. 주로 베르니케 실어증에서 나타납니다.', do(S){ S.pz(0); }},
    {id:'21-23', s:'N', t:'음소착어는 목표 단어 안의 음소가 대치되는 것입니다. 장화를 잘화, 전화기를 전하기라고 하는 식으로, 결과는 존재하지 않는 비단어입니다. 환자는 올바른 단어로 말하려고 하며, 주로 브로카 실어증과 전도실어증에서 나타납니다.', do(S){ S.pz(1); }},
    {id:'21-24', s:'N', t:'형식착어도 음소가 대치되지만, 그 결과 의미가 있는 다른 실제 단어가 되는 것입니다. 감자를 과자, 소리를 오리라고 하는 식으로, 소리는 비슷하지만 뜻은 전혀 다릅니다. 한국어에서는 한두 음절 단어에서 많이 나타나며, 베르니케 실어증에서 볼 수 있습니다.', do(S){ S.pz(2); }},
    {id:'21-25', s:'N', t:'신조착어는 목표 단어와 전혀 상관없는, 존재하지 않는 새로운 말을 만드는 것입니다. 꽃을 브링이라고 하는 식이고, 중증 베르니케 실어증에서 주로 나타납니다.', do(S){ S.pz(3); }},
    {id:'21-25a', s:'N', t:'네 가지를 한 표로 비교해 보겠습니다. 결과가 실제 단어이면 의미착어나 형식착어이고, 비단어이면 음소착어나 신조착어입니다.',
      do(){ on('#pz',false); later(()=>{ on('#pg'); sfx('whoosh'); },400); }},
    {id:'21-25b', s:'N', t:'가장 헷갈리는 짝은 음소착어와 형식착어입니다. 둘 다 음소가 바뀐 소리 오류이지만, 결과가 비단어이면 음소착어, 실제 단어이면 형식착어입니다.',
      do(S){ S.pgF(['pg_frm','pg_pho','pg_r0','pg_r1']); zoom(830,430,1.18,1500); sfx('glow'); }},
    {id:'21-25c', s:'N', t:'의미착어와 형식착어는 둘 다 실제 단어입니다. 목표 단어와 뜻이 연관되면 의미착어, 소리만 비슷하고 뜻이 다르면 형식착어입니다.',
      do(S){ S.pgF(['pg_sem','pg_frm','pg_r0']); zoom(700,330,1.18,1500); sfx('glow'); }},
    /* 빈출 증상 + 어느 유형에서? */
    {id:'21-26', s:'N', t:'국시에 자주 나오는 실어증 증상을, 어느 유형에서 나타나는지와 함께 정리합니다.', do(S){ zoomOut(900); S.pgF(null); on('#pg',false); later(()=>{ on('#sym'); sfx('whoosh'); },400); }},
    {id:'21-27', s:'N', t:'보속증은 자극이 바뀌어도 앞의 반응을 계속 반복하는 것입니다. 고양이를 강아지라고 한 뒤, 자동차를 보고도 강아지라고 합니다. 전반실어증에서 짧은 발화를 되풀이하는 형태로 나타나고, 혼합연결피질실어증의 언어보속증, 연결피질운동실어증의 초기 회복기에도 보입니다.', do(){ on('#sy0'); sfx('pop'); }},
    {id:'21-28', s:'N', t:'착어증은 목표 단어 대신 잘못된 단어를 말하는 것으로, 주로 유창성 실어증에서 나타납니다. 음소착어는 브로카와 전도실어증, 의미착어와 신조착어는 베르니케 실어증과 연결됩니다.', do(){ on('#sy1'); sfx('pop'); }},
    {id:'21-29', s:'N', t:'에두르기는 단어가 떠오르지 않아 설명으로 돌려 말하는 것입니다. 연필을, 글씨 쓸 때 쓰는 거라고 말하는 식으로, 이름대기 장애를 보상하는 반응이며 명칭실어증의 대표 증상입니다.', do(){ on('#sy2'); sfx('pop'); }},
    {id:'21-30', s:'N', t:'반복장애는 들은 말을 그대로 따라 말하지 못하는 것입니다. 따라말하기는 브로카, 베르니케, 전반실어증에서도 떨어지지만, 유창하고 이해가 양호한데 따라말하기만 두드러지게 나쁘면 전도실어증입니다.', do(){ on('#sy3'); sfx('pop'); }},
    {id:'21-31', s:'N', t:'실문법증은 조사와 어미 같은 문법 형태소가 빠지는 것으로, 나 병원 가다처럼 전보식으로 말합니다. 브로카 실어증의 대표 증상입니다.', do(){ on('#sy4'); sfx('pop'); }},
    {id:'21-31a', s:'N', t:'유형을 가려 주는 증상이 몇 가지 더 있습니다. 반향어는 상대방의 말을 부분 또는 전체 그대로 따라 말하는 것으로, 따라말하기가 보존되는 연결피질감각실어증과 혼합연결피질실어증에서 두드러지고, 연결피질운동실어증의 초기 회복기에도 나타납니다.',
      do(){ on('#sym',false); later(()=>{ on('#sym2'); on('#sz0'); sfx('whoosh'); },400); }},
    {id:'21-31b', s:'N', t:'자곤은 착어와 신조어가 뒤섞여 유창하지만 알아들을 수 없는 말로, 베르니케 실어증에서 나타납니다.', do(){ on('#sz1'); sfx('pop'); }},
    {id:'21-31c', s:'N', t:'탈문법증은 문법 형태소가 빠지는 실문법증과 달리, 문법 형태소를 잘못 골라 쓰는 것입니다. 실문법증은 브로카, 탈문법증은 베르니케 실어증으로 구분하세요.', do(){ on('#sz2'); sfx('pop'); }},
    {id:'21-31d', s:'N', t:'베르니케 실어증은 길고 유창하지만 내용이 없는 빈 구어와, 자신의 오류를 잘 모르는 질병불각증을 보입니다. 반대로 브로카 실어증은 자신의 문제를 알아 심리적 어려움을 겪습니다.', do(){ on('#sz3'); sfx('pop'); }},
    /* 증상 × 유형 표 */
    {id:'21-31e', s:'N', t:'지금까지의 증상을 유형별로 한 표에 모았습니다. 채워진 점은 대표 단서, 빈 원은 함께 나타날 수 있는 증상, 별은 핵심 감별 단서입니다.',
      do(S){ on('#sym2',false); later(()=>{ on('#mx'); S.mxRows(380); sfx('whoosh'); },400); }},
    {id:'21-31f', s:'N', t:'비유창성 쪽을 보면, 브로카는 실문법증과 음소착어, 전반은 보속증, 연결피질운동은 초기 회복기의 반향어와 보속증, 혼합연결피질은 반향어와 언어보속증이 단서입니다.',
      do(S){ S.mxCol(['broca','glob','tcma','mtca']); zoom(560,400,1.15,1500); sfx('glow'); }},
    {id:'21-31g', s:'N', t:'유창성 쪽에서는 베르니케에 의미착어, 형식착어, 신조착어와 자곤, 탈문법증이 모여 있습니다. 전도는 음소착어와 반복장애, 연결피질감각은 반향어, 명칭은 에두르기가 핵심 단서입니다.',
      do(S){ S.mxCol(['wern','cond','tcsa','anom']); zoom(1180,400,1.15,1500); sfx('glow'); }},
    {id:'21-31h', s:'N', t:'거꾸로 증상에서 유형을 떠올려 보세요. 에두르기는 명칭, 반향어는 연결피질, 실문법증은 브로카, 신조착어와 탈문법증은 베르니케, 반복장애는 전도, 보속증은 전반실어증입니다.',
      do(S){ zoomOut(1000); S.mxCol(null); S.mxRow([0,1,2,6,7,8,9]); sfx('ding'); }},
    /* 정리 + 퀴즈 */
    {id:'21-32', s:'N', t:'오늘 배운 내용을 한 장으로 정리합니다.', do(S){ S.mxRow(null); on('#mx',false); later(()=>{ on('#sum21'); sfx('ding'); },400); }, gap:2600},
    ...quizSteps('q21_0', Q21[0], ()=>on('#sum21',false)),
    ...quizSteps('q21_1', Q21[1], ()=>on('#q21_0',false)),
    ...quizSteps('q21_2', Q21[2], ()=>on('#q21_1',false)),
    ...quizSteps('q21_4', Q21[4], ()=>on('#q21_2',false)),
    ...quizSteps('q21_3', Q21[3], ()=>on('#q21_4',false)),
    {id:'21-33', s:'N', t:'수고하셨습니다. 다음 시간에는 실어증의 평가와 예후, 그리고 치료를 살펴봅니다.', do(){ on('#q21_3',false); W.show({brain:true}); W.brain({op:1}); W.lesion(null); W.view('front3q',0); W.spin(0.2); }},
    {wait:2000},
  ]});
