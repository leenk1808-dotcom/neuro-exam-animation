/* =================================================================
   2-2. 실어증 ② 평가 · 예후 · 치료
   자료: 신경언어장애 정리(메인) 2-2)·3) · 특강 Part 1 (p51-85: 평가 영역, 검사도구, K-WAB 지수, 예후, 유형 변화, 손잡이, 치료법)
   ================================================================= */
const Q22=[
  {sec:8, q:'K-WAB의 실어증지수(AQ)를 구할 때 포함되지 않는 영역은?', opts:['스스로 말하기','알아듣기','따라말하기','이름대기','읽기'], ans:4,
   say:'문제입니다. 케이 웹의 실어증지수, 에이큐를 구할 때 포함되지 않는 영역은?', ex:'정답은 5번, 읽기입니다. 에이큐는 스스로 말하기, 알아듣기, 따라말하기, 이름대기로 구하고, 읽기와 쓰기는 언어지수, 엘큐에 들어갑니다.'},
  {sec:7, q:'청각적 이해력을 평가하는 심화검사는?', opts:['K-BNT','토큰 검사','K-FAST','CADL','STAND'], ans:1,
   say:'청각적 이해력을 평가하는 심화검사는 무엇일까요?', ex:'정답은 2번, 토큰 검사입니다. 한국판 보스턴 이름대기 검사, 케이 비엔티는 이름대기, 즉 표현을 평가합니다.'},
  {sec:8, q:'베르니케 실어증 환자가 회복 과정에서 이해력은 좋아졌지만 따라말하기는 여전히 어렵다. 어떤 유형으로 변화한 것인가?', opts:['브로카 실어증','전도실어증','연결피질감각실어증','전반실어증','연결피질운동실어증'], ans:1,
   say:'베르니케 실어증 환자가 회복하면서 이해력은 좋아졌지만, 따라말하기는 여전히 어렵습니다. 어떤 유형으로 변한 걸까요?', ex:'정답은 2번, 전도실어증입니다. 베르니케에서 따라말하기가 좋아지면 연결피질감각실어증으로 바뀝니다. 유창성에서 비유창성으로는 바뀌지 않습니다.'},
  {sec:7, q:'멜로디억양치료(MIT)의 대상으로 가장 적절한 것은?', opts:['베르니케 실어증','중증 브로카 실어증','명칭실어증','연결피질감각실어증','전도실어증'], ans:1,
   say:'멜로디억양치료, 엠아이티의 대상으로 가장 적절한 것은?', ex:'정답은 2번, 중증 브로카 실어증입니다. 말실행증에도 사용하며, 손상되지 않은 우반구의 멜로디와 리듬 기능을 활용합니다.'},
  {sec:8, q:'구어 대신 동작과 제스처를 사용하게 하며, 각 단계에서 100% 성공해야 다음 단계로 넘어가는 전반실어증 치료법은?', opts:['LOT','PACE','VAT','CIT','SFA'], ans:2,
   say:'마지막 문제입니다. 구어 대신 동작과 제스처를 쓰게 하고, 각 단계를 백 퍼센트 성공해야 다음 단계로 넘어가는 전반실어증 치료법은?', ex:'정답은 3번, 시각동작치료, 브이에이티입니다. 페이스는 모든 수단을 허용하는 기능적 의사소통 치료이고, 에스에프에이는 명칭실어증의 의미자질분석치료입니다.'},
];

CLIPS.push({ code:'2-2', short:'2-2 실어증 평가·치료', title:'실어증 ② 평가 · 예후 · 치료', desc:'평가 6영역 · 검사도구 · K-WAB 지수 · 예후 · 유형 변화 · 치료 모델 · MIT/LOT/VAT/PACE · 퀴즈 5문제',
  build(S){
    W.show({brain:true}); W.view('front3q',0); W.spin(0.18);
    add(hdr('EP 2-2 · 실어증 ②','평가 · 예후 · 치료'));
    const EV=[['👂 알아듣기','#7FB2FF','지적하기 · 지시 따르기 · 예/아니오로 답하기'],['🗣️ 스스로 말하기','#FFAE5C','대화하기 · 그림 설명하기<br>→ 내용 전달 · 유창성'],['🔁 따라말하기','#FF8CC6','단어 · 문장을 듣고 따라 말하기'],
      ['🏷️ 이름대기','#5EE0A8','대면 이름대기 · 생성 이름대기<br>문장완성 · 문장응답'],['📖 읽기','#C58BFF','소리 내어 읽기 · 단어-그림 짝짓기<br>문장 읽고 지시 따르기 · 독해'],['✍️ 쓰기','#FFE45C','스스로 쓰기 · 받아쓰기 · 보고 베끼기']];
    add(`<div class="glass ev6 fade" id="ev6">${EV.map((e,i)=>`<div class="ec" id="ev${i}" style="--c:${e[1]}"><h4>${e[0]}</h4><div>${e[2]}</div></div>`).join('')}
      <div class="ec" id="ev6x" style="--c:#9FB2DA;grid-column:span 3;text-align:center"><div>그 밖에 인지기능 · 말실행증 · 마비말장애 같은 <b>동반장애 감별</b></div></div></div>`);
    add(`<div class="glass tools fade" id="tools">
      <div class="tc" id="tl0" style="--c:#5EE0A8"><h4>선별검사</h4><div class="it"><b>K-FAST</b><br>한국판 프렌차이 실어증 선별검사</div><div class="it"><b>STAND</b> 실어증-신경언어장애 선별<br>OLI 구어언어지수 = 그림설명 · 청각적이해 · 따라말하기 · 이름대기<br>GLI 전반적언어지수 = OLI + 읽기 · 쓰기</div></div>
      <div class="tc" id="tl1" style="--c:#7FB2FF"><h4>종합검사</h4><div class="it"><b>K-WAB(-R)</b> 한국판 웨스턴<br>8가지 유형 분류 · 중증도</div><div class="it"><b>BDAE</b> 보스턴 · <b>PICA</b> 포치 (회복 변화 추적)</div><div class="it"><b>MTDDA</b> 미네소타 · <b>KTDDA</b> 한국 감별진단 · <b>DADE</b> 대구</div></div>
      <div class="tc" id="tl2" style="--c:#FFAE5C"><h4>심화검사</h4><div class="it"><b>K-BNT</b> 한국판 보스턴 이름대기<br>→ <b>표현</b> (이름대기)</div><div class="it"><b>토큰 검사 (RTT 개정판)</b><br>→ <b>이해</b> (구어 지시 이해)</div></div>
      <div class="tc" id="tl3" style="--c:#FF8CC6"><h4>기능적 의사소통</h4><div class="it"><b>CADL</b> 일상생활 의사소통 검사<br>실제 생활에서의 의사소통 능력</div></div></div>`);
    const seg=(t,p,c)=>`<div class="sg" style="flex:${p};background:${c}">${t}<br>${p}</div>`;
    const C={sp:'#FFAE5C',au:'#7FB2FF',rp:'#FF8CC6',nm:'#5EE0A8',rd:'#C58BFF',wr:'#FFE45C',pr:'#9FB2DA',cs:'#7FE0E0'};
    add(`<div class="glass kw fade" id="kw"><h3>K-WAB 지수 (각 100점 만점)</h3>
      <div class="kr" id="kr0"><div class="kn">AQ<small>실어증지수</small></div><div class="bars" style="flex:0 0 560px">${seg('스스로 말하기',20,C.sp)}${seg('알아듣기',10,C.au)}${seg('따라말하기',10,C.rp)}${seg('이름대기',10,C.nm)}</div><div class="x2">× 2</div><div class="eq">= 100</div></div>
      <div class="kr" id="kr1"><div class="kn">LQ<small>언어지수</small></div><div class="bars">${seg('스스로 말하기',20,C.sp)}${seg('알아듣기',20,C.au)}${seg('따라',10,C.rp)}${seg('이름',10,C.nm)}${seg('읽기',20,C.rd)}${seg('쓰기',20,C.wr)}</div><div class="eq">= 100</div></div>
      <div class="kr" id="kr2"><div class="kn">CQ<small>피질지수</small></div><div class="bars">${seg('스스로 말하기',20,C.sp)}${seg('알아듣기',20,C.au)}${seg('따라',10,C.rp)}${seg('이름',10,C.nm)}${seg('읽기',10,C.rd)}${seg('쓰기',10,C.wr)}${seg('실행',10,C.pr)}${seg('구성·시공간·계산',10,C.cs)}</div><div class="eq">= 100</div></div>
      <div class="row fade" id="kw4" style="margin-top:10px;font-size:19px">유형 분류에는 <b>유창성 · 알아듣기 · 따라말하기 · 이름대기</b> 점수(각 10점)를 사용</div></div>`);
    add(`<div class="glass fade" id="prog" style="right:56px;top:130px;width:600px"><h3>예후에 영향을 주는 요인</h3>
      <div class="row">✅ 뇌손상 범위가 <b>작을수록</b> · 실어증이 <b>가벼울수록</b> 좋음</div>
      <div class="row">⚠️ <b>나이가 많을수록</b> 나쁨</div>
      <div class="row">➖ 성별 · 교육 수준은 상관이 낮음</div>
      <div class="row">🤝 보호자 지원 · 경제적 여건이 좋을수록 좋음</div>
      <div class="row fade" id="prog2" style="margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(255,228,92,.1)">✋ <b>왼손잡이가 예후가 더 좋음</b><br><span style="font-size:18px">오른손잡이 99% → 좌반구 언어중추<br>왼손잡이 약 30% 우반구 · 10% 양반구</span></div>
      <div class="row fade" id="prog3" style="margin-top:8px;font-size:18px">🔀 <b>교차실어증</b> · 오른손잡이가 <b>우반구</b> 손상으로 실어증을 보이는 경우</div></div>`);
    add(`<div class="glass rec fade" id="rec"><svg viewBox="0 0 1300 560"><defs><marker id="ah" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#FFE45C"/></marker></defs>
        <path class="ar" id="ra0" d="M220 280 C 300 200, 380 150, 470 140"/><path class="ar" id="ra1" d="M220 300 C 300 380, 380 420, 470 430"/>
        <path class="ar" id="ra2" d="M610 140 L 820 110"/><path class="ar" id="ra3" d="M610 430 L 820 360"/><path class="ar" id="ra4" d="M610 440 L 820 500"/>
        <path class="ar" id="ra5" d="M990 110 C 1080 160, 1100 220, 1120 255"/><path class="ar" id="ra6" d="M985 360 C 1060 330, 1090 310, 1115 290"/><path class="ar" id="ra7" d="M985 500 C 1080 420, 1110 360, 1130 305"/><path class="ar" id="ra8" d="M610 130 C 800 40, 1050 80, 1140 250"/></svg>
      <div class="rn" id="rn0" style="--c:#FF6B6B;left:140px;top:290px">전반</div>
      <div class="rn" id="rn1" style="--c:#4F8EF7;left:540px;top:140px">브로카</div>
      <div class="rn" id="rn2" style="--c:#2FC48A;left:540px;top:435px">베르니케</div>
      <div class="rn" id="rn3" style="--c:#4F8EF7;left:905px;top:110px">연결피질운동</div>
      <div class="rn" id="rn4" style="--c:#2FC48A;left:905px;top:360px">전도</div>
      <div class="rn" id="rn5" style="--c:#2FC48A;left:905px;top:500px">연결피질감각</div>
      <div class="rn" id="rn6" style="--c:#FFE45C;left:1180px;top:280px">명칭</div>
      <div class="al" id="al0" style="left:330px;top:170px">표현 ↑</div><div class="al" id="al1" style="left:330px;top:415px">이해 ↑</div>
      <div class="al" id="al2" style="left:715px;top:95px">따라말하기 ↑</div><div class="al" id="al3" style="left:690px;top:352px">이해 ↑ (따라말하기는 여전히 X)</div><div class="al" id="al4" style="left:715px;top:490px">따라말하기 ↑</div>
      <div class="al" id="al5" style="left:1150px;top:180px">대부분 마지막엔 명칭으로</div>
      <div class="row fade" id="recR" style="position:absolute;left:20px;bottom:6px;font-size:20px">규칙 · <b class="hl-b">비유창성 → 유창성</b>으로만 바뀌고, <b class="hl-r">유창성 → 비유창성은 X</b> · 덜 심한 유형으로 변화</div></div>`);
    const MD=[['행동수정 모델','#9FB2DA','언어 지식이 손실 → 구조화된 학습으로 <b>재학습</b>'],['자극-촉진 모델','#FFAE5C','언어 처리 과정을 <b>자극으로 활성화</b> · 예) LOT'],
      ['언어학적 모델','#5EE0A8','음운 · 어휘-의미(<b>SFA → 명칭실어증</b>) · 통사(<b>HELPSS · SPPA · 매핑치료</b> 능동/피동)'],
      ['열성 반구 중재 모델','#4F8EF7','비유창성 · <b>MIT</b> (우반구 운율) · <b>CIT</b> (구어 집중, 보상전략 제한)'],['인지적 처리 모델','#C58BFF','인지기능을 치료 · <b>VAT</b> (구어 X, 동작)'],
      ['기능적 의사소통 모델','#FF8CC6','언어보다 실제 의사소통 · <b>PACE</b> · 화용 치료'],['생물학적 · 의학적 모델','#FF6B6B','약물치료 · 반복 경두개 자기자극(<b>rTMS</b>)'],
      ['기술응용 모델','#7FE0E0','컴퓨터보조치료(<b>CAT</b>)'],['보완대체의사소통 (AAC)','#FFE45C','중증 환자 · 의사소통 그림판 · 글자판']];
    add(`<div class="glass mdl fade" id="mdl">${MD.map((m,i)=>`<div class="mc" id="md${i}" style="--c:${m[1]}"><h4>${m[0]}</h4><div>${m[2]}</div></div>`).join('')}</div>`);
    add(`<div class="glass th4 fade" id="th4">
      <div class="tc4" id="tx0" style="--c:#5EE0A8"><span class="k">열성 반구 중재</span><h4>MIT<small>멜로디억양치료</small></h4>
        <div class="r">대상 · <b>중증 브로카 실어증 · 말실행증</b></div><div class="r">손상되지 않은 <b>우반구</b>의 멜로디 · 억양 · 리듬 활용</div><div class="r">단어 · 구에서 시작 · 조음 오류는 신경 쓰지 않기 · 평범한 멜로디 · 음절마다 박자</div>
        <div class="mel"><span class="hi" style="animation-delay:0s">물</span><span style="animation-delay:.6s">주</span><span class="hi" style="animation-delay:1.2s">세</span><span style="animation-delay:1.8s">요</span><span class="tap">✋</span></div></div>
      <div class="tc4" id="tx1" style="--c:#FFAE5C"><span class="k">자극-촉진</span><h4>LOT<small>언어중심치료</small></h4>
        <div class="r">대상 · <b>대부분의 실어증</b></div><div class="r">단어를 외우는 게 아니라 <b>언어 처리 과정을 활성화</b></div><div class="r">정답률 <b>20~30%</b> 수준에서 시작<br><b>듣기 → 보기 → 말하기 → 쓰기</b> · 쉬운 단계 → 어려운 단계</div></div>
      <div class="tc4" id="tx2" style="--c:#C58BFF"><span class="k">인지적 처리</span><h4>VAT<small>시각동작치료</small></h4>
        <div class="r">대상 · <b>전반실어증</b></div><div class="r">구어 대신 <b>동작 · 제스처</b> · 치료사도 구어를 쓰지 않음</div><div class="r">체계적 난이도 I · II · III · <b>각 단계 100% 성공</b>해야 다음 단계<br>최종 목표 · 제스처로 의사소통</div></div>
      <div class="tc4" id="tx3" style="--c:#FF8CC6"><span class="k">기능적 의사소통</span><h4>PACE<small>의사소통 효과 증진법</small></h4>
        <div class="r">대상 · <b>전반실어증 포함 중증</b></div><div class="r">치료사와 환자가 <b>동등하게</b> 메시지를 주고받음 · 새로운 정보 전달</div><div class="r"><b>모든 의사소통 수단 허용</b> · 제스처 · 그림 · 지적하기 · AAC</div></div></div>`);
    add(`<div class="glass formula fade" id="form"><div>브로카 · 말실행증 → <span class="hl-g">MIT</span></div><div>전반 · 중증 → <span class="hl-p">VAT · PACE</span></div><div>대부분의 실어증 → <span class="hl-o">LOT</span></div></div>`);
    add(`<div class="glass fade" id="cue" style="right:56px;top:140px;width:560px"><h3>이름대기 단서</h3>
      <div class="row">📝 문장완성 · "밤말은 새가 듣고, 낮말은 ○○가 듣는다"</div>
      <div class="row">🔗 연관단어 · 목표 [신발] → "양말"</div>
      <div class="row">💡 의미 · "발에 신는 거죠?"</div>
      <div class="row">🔤 음소 · 첫 글자 알려 주기</div>
      <div class="row">🗂️ 범주 생성 · "과일 이름 말해 보세요"</div></div>`);
    add(`<div class="glass sumg fade" id="sum22">
      <div class="sc" style="--c:#7FB2FF"><h4>평가 6영역</h4><div>알아듣기 · 스스로 말하기 · 따라말하기<br>이름대기 · 읽기 · 쓰기 (+ 동반장애 감별)</div></div>
      <div class="sc" style="--c:#5EE0A8"><h4>검사도구</h4><div>선별 K-FAST · STAND / 종합 K-WAB · BDAE · PICA<br>K-BNT = 이름대기 · 토큰 = 이해 · CADL = 기능</div></div>
      <div class="sc" style="--c:#FFAE5C"><h4>K-WAB 지수</h4><div>AQ = (스스로 20 + 알아듣기 10 + 따라 10 + 이름 10) × 2<br>LQ = + 읽기 · 쓰기 · CQ = + 실행 · 구성</div></div>
      <div class="sc" style="--c:#FFE45C"><h4>예후</h4><div>범위 작고 가벼울수록 좋음 · 나이 많으면 나쁨<br>왼손잡이 좋음 · 성별·교육은 상관 낮음</div></div>
      <div class="sc" style="--c:#2FC48A"><h4>유형 변화</h4><div>전반 → 브로카/베르니케 · 베르니케 → 전도/TCSA<br>브로카 → TCMA · 비유창 → 유창만 · 마지막엔 명칭</div></div>
      <div class="sc" style="--c:#C58BFF"><h4>치료 모델</h4><div>행동수정 · 자극-촉진 · 언어학적 · 열성 반구<br>인지적 처리 · 기능적 · 의학적 · 기술 · AAC</div></div>
      <div class="sc" style="--c:#5EE0A8"><h4>MIT · LOT</h4><div>MIT = 중증 브로카 · 말실행증 · 우반구 멜로디<br>LOT = 대부분 · 정답률 20~30% · 듣기→보기→말하기→쓰기</div></div>
      <div class="sc" style="--c:#FF8CC6"><h4>VAT · PACE</h4><div>VAT = 전반 · 구어 X · 단계별 100% 성공<br>PACE = 중증 · 동등한 참여 · 모든 수단 허용</div></div>
      <div class="sc" style="--c:#9FB2DA"><h4>언어학적 치료</h4><div>SFA (의미자질분석) → 명칭실어증<br>통사 = HELPSS · SPPA · 매핑치료</div></div></div>`);
    Q22.forEach((q,i)=>add(quizHTML('q22_'+i, q)));
  },
  steps:[
    {wait:800},
    {id:'22-01', s:'N', t:'2편 실어증, 두 번째 시간입니다. 실어증을 어떻게 평가하고, 어떻게 회복되며, 어떻게 치료하는지 살펴봅니다.'},
    /* 평가 */
    {id:'22-02', s:'N', t:'실어증 평가에서는 여섯 가지 언어 영역을 확인합니다. 알아듣기, 스스로 말하기, 따라말하기, 이름대기, 읽기, 쓰기입니다.',
      do(){ on('#hd',false); W.brain({op:0}); later(()=>{ W.show({brain:false}); on('#ev6'); seq([0,1,2,3,4,5].map(i=>()=>{ on('#ev'+i); sfx('pop'); }),700); },400); }},
    {id:'22-03', s:'N', t:'알아듣기는 지적하기와 지시 따르기, 예 아니오로 답하기로, 스스로 말하기는 대화와 그림 설명으로 내용 전달과 유창성을 봅니다. 이름대기는 그림을 보고 이름을 말하는 대면 이름대기와, 동물 이름처럼 생각나는 대로 말하는 생성 이름대기 등으로 평가합니다.', do(){ sfx('pop'); }},
    {id:'22-04', s:'N', t:'그리고 인지기능이나 말실행증, 마비말장애 같은 동반장애도 함께 감별합니다.', do(){ on('#ev6x'); sfx('pop'); }},
    {id:'22-05', s:'N', t:'평가 도구를 정리해 볼까요? 선별검사로는 K-FAST와 STAND가 있습니다. STAND의 구어언어지수는 그림설명, 청각적 이해, 따라말하기, 이름대기로, 전반적언어지수는 여기에 읽기와 쓰기를 더해 구합니다.',
      say:'평가 도구를 정리해 볼까요? 선별검사로는 케이 패스트와 스탠드가 있습니다. 스탠드의 구어언어지수는 그림설명, 청각적 이해, 따라말하기, 이름대기로, 전반적언어지수는 여기에 읽기와 쓰기를 더해 구합니다.',
      do(){ on('#ev6',false); later(()=>{ on('#tools'); on('#tl0'); sfx('whoosh'); },400); }},
    {id:'22-06', s:'N', t:'종합검사로는 실어증 유형과 중증도를 파악하는 K-WAB, 그리고 보스턴 검사, 회복 변화를 추적하는 PICA, 미네소타 검사, 대구 실어증 진단검사 등이 있습니다.',
      say:'종합검사로는 실어증 유형과 중증도를 파악하는 케이 웹, 그리고 보스턴 검사, 회복 변화를 추적하는 피카, 미네소타 검사, 대구 실어증 진단검사 등이 있습니다.', do(){ on('#tl1'); sfx('pop'); }},
    {id:'22-07', s:'N', t:'심화검사로, 한국판 보스턴 이름대기 검사 K-BNT는 표현을, 토큰 검사는 이해를 평가합니다. 일상생활의 기능적 의사소통은 CADL로 봅니다.',
      say:'심화검사로, 한국판 보스턴 이름대기 검사 케이 비엔티는 표현을, 토큰 검사는 이해를 평가합니다. 일상생활의 기능적 의사소통은 캐들로 봅니다.', do(){ on('#tl2'); later(()=>on('#tl3'),3500); sfx('pop'); }},
    {id:'22-08', s:'N', t:'국시에 자주 나오는 K-WAB 지수입니다. 실어증지수 AQ는 스스로 말하기 20점, 알아듣기 10점, 따라말하기 10점, 이름대기 10점을 더해 2를 곱한 100점 만점입니다.',
      say:'국시에 자주 나오는 케이 웹 지수입니다. 실어증지수 에이큐는 스스로 말하기 이십 점, 알아듣기 십 점, 따라말하기 십 점, 이름대기 십 점을 더해 이를 곱한 백 점 만점입니다.',
      do(){ on('#tools',false); later(()=>{ on('#kw'); on('#kr0'); sfx('levelup'); },400); }},
    {id:'22-09', s:'N', t:'언어지수 LQ에는 읽기와 쓰기가, 피질지수 CQ에는 실행과 구성, 시공간, 계산까지 더해집니다. 실어증 유형 분류에는 유창성, 알아듣기, 따라말하기, 이름대기 점수를 사용합니다.',
      say:'언어지수 엘큐에는 읽기와 쓰기가, 피질지수 씨큐에는 실행과 구성, 시공간, 계산까지 더해집니다. 실어증 유형 분류에는 유창성, 알아듣기, 따라말하기, 이름대기 점수를 사용합니다.',
      do(){ on('#kr1'); later(()=>{ on('#kr2'); sfx('pop'); },2600); later(()=>on('#kw4'),5600); sfx('pop'); }},
    /* 예후 */
    {id:'22-10', s:'N', t:'다음은 예후입니다. 뇌손상 범위가 작을수록, 실어증이 가벼울수록 예후가 좋고, 나이가 많을수록 나쁩니다. 성별이나 교육 수준은 예후와 상관이 낮고, 보호자의 지원과 경제적 여건이 좋을수록 좋습니다.',
      do(){ on('#kw',false); W.show({brain:true}); W.brain({op:1}); W.lesion(W.realBrain?{labels:PERI}:{blobs:[[0.3,0.05,0.25],[-0.25,0.05,0.25]]}); W.view('front3q',0); W.spin(0.15); W.shift(-300); later(()=>{ on('#prog'); sfx('pop'); },400); }},
    {id:'22-11', s:'N', t:'손잡이도 중요합니다. 오른손잡이는 99퍼센트가 좌반구에 언어중추가 있지만, 왼손잡이는 약 30퍼센트가 우반구, 10퍼센트가 양반구에 있어서, 왼손잡이의 예후가 더 좋습니다.',
      say:'손잡이도 중요합니다. 오른손잡이는 구십구 퍼센트가 좌반구에 언어중추가 있지만, 왼손잡이는 약 삼십 퍼센트가 우반구, 십 퍼센트가 양반구에 있어서, 왼손잡이의 예후가 더 좋습니다.', do(){ on('#prog2'); sfx('pop'); }},
    {id:'22-12', s:'N', t:'오른손잡이가 우반구 손상으로 실어증을 보이는 교차실어증도 국시에 나온 적이 있으니 알아 두세요.', do(){ on('#prog3'); sfx('ding'); }},
    /* 유형 변화 */
    {id:'22-13', s:'N', t:'실어증은 회복하면서 유형이 바뀌기도 합니다. 대체로 덜 심한 유형으로 바뀌며, 비유창성에서 유창성으로는 바뀌지만, 유창성에서 비유창성으로는 바뀌지 않습니다.',
      do(){ on('#prog',false); W.lesion(null); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false}); on('#rec'); on('#rn0'); on('#recR'); sfx('whoosh'); },400); }},
    {id:'22-14', s:'N', t:'전반실어증은 표현이 좋아지면 브로카, 이해가 좋아지면 베르니케 실어증으로 바뀝니다.', do(){ seq([()=>{on('#ra0');on('#al0');},()=>{on('#rn1');sfx('pop')},()=>{on('#ra1');on('#al1');},()=>{on('#rn2');sfx('pop')}],800); }},
    {id:'22-15', s:'N', t:'브로카 실어증에서 따라말하기가 좋아지면 연결피질운동실어증이 됩니다.', do(){ on('#ra2'); on('#al2'); later(()=>{ on('#rn3'); sfx('pop'); },900); }},
    {id:'22-16', s:'N', t:'베르니케 실어증에서 이해는 좋아졌는데 따라말하기가 여전히 어려우면 전도실어증, 따라말하기가 좋아지면 연결피질감각실어증이 됩니다.', do(){ seq([()=>{on('#ra3');on('#al3');},()=>{on('#rn4');sfx('pop')},()=>{on('#ra4');on('#al4');},()=>{on('#rn5');sfx('pop')}],1100); }},
    {id:'22-17', s:'N', t:'그리고 대부분의 실어증은 회복되더라도 마지막에 명칭실어증으로 남는 경우가 많습니다.', do(){ seq([()=>{['ra5','ra6','ra7','ra8'].forEach(i=>on('#'+i)); on('#al5');},()=>{on('#rn6');sfx('levelup')}],900); }},
    /* 치료 모델 */
    {id:'22-18', s:'N', t:'이제 치료입니다. 실어증 치료 모델은 아홉 가지로 정리할 수 있습니다.', do(){ on('#rec',false); later(()=>{ on('#mdl'); sfx('whoosh'); },400); }},
    {id:'22-19', s:'N', t:'행동수정 모델은 잃어버린 언어 지식을 구조화된 학습으로 다시 배우게 하고, 자극-촉진 모델은 자극을 주어 저하된 언어 처리 과정을 활성화합니다.', do(){ on('#md0'); on('#md1'); sfx('pop'); }},
    {id:'22-20', s:'N', t:'언어학적 모델은 음운, 어휘-의미, 통사 수준별로 치료합니다. 의미자질분석치료, SFA는 명칭실어증에, HELPSS나 SPPA, 매핑치료는 통사 치료에 씁니다.',
      say:'언어학적 모델은 음운, 어휘-의미, 통사 수준별로 치료합니다. 의미자질분석치료, 에스에프에이는 명칭실어증에, 헬프스나 에스피피에이, 매핑치료는 통사 치료에 씁니다.', do(){ on('#md2'); sfx('pop'); }},
    {id:'22-21', s:'N', t:'열성 반구 중재 모델에는 우반구의 운율 기능을 쓰는 MIT와, 비구어 보상전략을 제한하고 구어 표현을 집중 훈련하는 CIT가 있습니다. 인지적 처리 모델의 대표는 VAT입니다.',
      say:'열성 반구 중재 모델에는 우반구의 운율 기능을 쓰는 엠아이티와, 비구어 보상전략을 제한하고 구어 표현을 집중 훈련하는 씨아이티가 있습니다. 인지적 처리 모델의 대표는 브이에이티입니다.', do(){ on('#md3'); on('#md4'); sfx('pop'); }},
    {id:'22-22', s:'N', t:'기능적 의사소통 모델은 언어 자체보다 실제 의사소통을 목표로 하며 PACE가 대표적입니다. 그 밖에 약물과 rTMS 같은 생물학적 모델, 컴퓨터보조치료, 그리고 중증 환자를 위한 보완대체의사소통이 있습니다.',
      say:'기능적 의사소통 모델은 언어 자체보다 실제 의사소통을 목표로 하며 페이스가 대표적입니다. 그 밖에 약물과 반복 경두개 자기자극 같은 생물학적 모델, 컴퓨터보조치료, 그리고 중증 환자를 위한 보완대체의사소통이 있습니다.',
      do(){ ['md5','md6','md7','md8'].forEach(i=>on('#'+i)); sfx('pop'); }},
    /* 대표 치료 4 */
    {id:'22-23', s:'N', t:'국시 단골인 대표 치료법 네 가지를 자세히 보겠습니다.', do(){ on('#mdl',false); later(()=>{ on('#th4'); sfx('whoosh'); },400); }},
    {id:'22-24', s:'N', t:'멜로디억양치료, MIT는 중증 브로카 실어증과 말실행증이 대상입니다. 노래 가사는 더 잘 나온다는 점에 기반해, 손상되지 않은 우반구의 멜로디와 리듬을 활용합니다. 단어나 구에서 시작하고, 조음 오류는 신경 쓰지 않으며, 음절마다 박자를 느끼게 합니다.',
      say:'멜로디억양치료, 엠아이티는 중증 브로카 실어증과 말실행증이 대상입니다. 노래 가사는 더 잘 나온다는 점에 기반해, 손상되지 않은 우반구의 멜로디와 리듬을 활용합니다. 단어나 구에서 시작하고, 조음 오류는 신경 쓰지 않으며, 음절마다 박자를 느끼게 합니다.', do(){ on('#tx0'); sfx('glow'); }},
    {id:'22-25', s:'N', t:'언어중심치료, LOT는 대부분의 실어증에 쓸 수 있습니다. 정답률이 20에서 30퍼센트 정도인 수준에서 시작해, 듣기, 보기, 말하기, 쓰기 순서로, 쉬운 단계에서 어려운 단계로 진행합니다.',
      say:'언어중심치료, 엘오티는 대부분의 실어증에 쓸 수 있습니다. 정답률이 이십에서 삼십 퍼센트 정도인 수준에서 시작해, 듣기, 보기, 말하기, 쓰기 순서로, 쉬운 단계에서 어려운 단계로 진행합니다.', do(){ on('#tx1'); sfx('glow'); }},
    {id:'22-26', s:'N', t:'시각동작치료, VAT는 전반실어증이 대상입니다. 구어 대신 동작과 제스처를 사용하고, 치료사도 구어를 쓰지 않습니다. 체계적인 단계로 구성되며, 각 단계에서 100퍼센트 성공해야 다음 단계로 넘어갑니다.',
      say:'시각동작치료, 브이에이티는 전반실어증이 대상입니다. 구어 대신 동작과 제스처를 사용하고, 치료사도 구어를 쓰지 않습니다. 체계적인 단계로 구성되며, 각 단계에서 백 퍼센트 성공해야 다음 단계로 넘어갑니다.', do(){ on('#tx2'); sfx('glow'); }},
    {id:'22-27', s:'N', t:'의사소통 효과 증진법, PACE는 전반실어증을 포함한 중증 환자가 대상입니다. 치료사와 환자가 대화 상황에서 동등하게 메시지를 주고받고, 제스처나 그림, AAC 같은 모든 의사소통 수단을 허용합니다.',
      say:'의사소통 효과 증진법, 페이스는 전반실어증을 포함한 중증 환자가 대상입니다. 치료사와 환자가 대화 상황에서 동등하게 메시지를 주고받고, 제스처나 그림, 에이에이씨 같은 모든 의사소통 수단을 허용합니다.', do(){ on('#tx3'); sfx('glow'); }},
    {id:'22-28', s:'N', t:'기억 공식입니다. 브로카와 말실행증은 MIT, 전반과 중증은 VAT와 PACE, 대부분의 실어증은 LOT.',
      say:'기억 공식입니다. 브로카와 말실행증은 엠아이티, 전반과 중증은 브이에이티와 페이스, 대부분의 실어증은 엘오티.', do(){ on('#form'); sfx('ding'); }},
    {id:'22-29', s:'N', t:'이름대기 치료에서는 단서를 단계적으로 줍니다. 문장완성 단서, 연관단어 단서, 기능이나 형태를 알려 주는 의미 단서, 첫 글자를 알려 주는 음소 단서, 그리고 범주 안의 단어를 떠올리는 범주 생성이 있습니다.',
      do(){ on('#th4',false); on('#form',false); W.show({brain:true}); W.brain({op:1}); W.view('front3q',0); W.spin(0.15); W.shift(-300); later(()=>{ on('#cue'); sfx('pop'); },400); }},
    /* 정리 + 퀴즈 */
    {id:'22-30', s:'N', t:'오늘 배운 내용을 한 장으로 정리합니다.', do(){ on('#cue',false); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false}); on('#sum22'); sfx('ding'); },400); }, gap:2600},
    ...quizSteps('q22_0', Q22[0], ()=>on('#sum22',false)),
    ...quizSteps('q22_1', Q22[1], ()=>on('#q22_0',false)),
    ...quizSteps('q22_2', Q22[2], ()=>on('#q22_1',false)),
    ...quizSteps('q22_3', Q22[3], ()=>on('#q22_2',false)),
    ...quizSteps('q22_4', Q22[4], ()=>on('#q22_3',false)),
    {id:'22-31', s:'N', t:'수고하셨습니다. 다음 시간에는 3편, 실독증과 실서증을 살펴봅니다.', do(){ on('#q22_4',false); W.show({brain:true}); W.brain({op:1}); W.view('front3q',0); W.spin(0.2); }},
    {wait:2000},
  ]});
