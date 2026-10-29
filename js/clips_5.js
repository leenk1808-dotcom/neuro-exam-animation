(()=>{
/* 5. 말실행증: 말운동 계획·프로그래밍 단계의 장애 */
const Q5=[
 {sec:8,q:'말실행증(AOS)의 핵심 손상 단계는?',opts:['개념 형성','언어적 부호화','말운동 계획·프로그래밍','말의 근육 실행','청각적 이해'],ans:2,say:'첫 문제입니다. 말실행증의 핵심 손상 단계는 무엇일까요?',ex:'정답은 3번, 말운동 계획과 프로그래밍 단계입니다. 근육을 실제로 움직이는 실행 단계의 장애는 마비말장애입니다.'},
 {sec:8,q:'같은 목표어를 여러 번 말할 때 오류가 매번 달라지고, 긴 단어에서 오류가 늘며 모색이 관찰됩니다. 가장 의심되는 장애는?',opts:['마비말장애','말실행증','말더듬','실어증만 단독','음성장애'],ans:1,say:'같은 단어를 반복해도 오류가 달라지고, 긴 단어에서 오류가 늘며 모색이 보입니다. 가장 의심되는 장애는?',ex:'정답은 2번, 말실행증입니다. 비일관적인 오류, 길이·복잡성 효과, 모색행동이 대표적입니다.'},
 {sec:8,q:'말실행증 평가에서 AMR과 SMR의 전형적인 양상은?',opts:['AMR와 SMR 모두 정상','AMR보다 SMR에서 더 어려움','SMR보다 AMR에서 더 어려움','두 과제 모두 근력 저하 때문에 불가능','평가에 사용하지 않음'],ans:1,say:'말실행증 평가에서 퍼퍼퍼와 퍼터커 중 어느 과제가 더 어려운 경향일까요?',ex:'정답은 2번, SMR인 퍼터커입니다. 연속적인 조음 전환과 순서화가 필요해 더 어려워질 수 있습니다. 개인차와 동반장애도 함께 고려합니다.'},
 {sec:8,q:'Rosenbek 8단계 연속법의 진행 방향으로 알맞은 것은?',opts:['역할극에서 시작해 치료사 모방으로 끝남','치료사와 함께 말하기에서 시작해 역할극의 독립 발화로 진행','글자 읽기만 반복','근력 훈련 후 끝남','모든 단계에서 단서 수준이 동일'],ans:1,say:'Rosenbek 8단계 연속법은 어떤 방향으로 진행될까요?',ex:'정답은 2번입니다. 함께 말하기와 시각·청각 단서에서 시작해, 단서를 줄이고 질문 답하기와 역할극의 기능적 발화로 진행합니다.'},
 {sec:8,q:'아동기 말실행증(CAS)의 대표적 핵심 특성에 해당하지 않는 것은?',opts:['반복 산출의 비일관적 오류','음소·음절 전이의 어려움','부적절한 운율','근육 마비와 위축이 핵심','길이가 길어지면 오류 증가'],ans:3,say:'마지막 문제입니다. 아동기 말실행증의 핵심 특성이 아닌 것은 무엇일까요?',ex:'정답은 4번입니다. CAS는 말운동 계획·프로그래밍의 어려움으로, 근육의 마비나 위축이 핵심인 장애는 아닙니다.'}
];
const e5Stages=[['1','치료사와 함께 말하기','치료사 모델을 듣고 보며 함께 산출'],['2','입모양 단서로 말하기','치료사 모델 뒤 입모양만 보고 산출'],['3','모델 뒤 따라 말하기','청각 모델 후 한 번 독립 산출'],['4','여러 번 반복','단서 없이 목표어를 반복 연습'],['5','글자를 보고 말하기','목표어 카드를 읽어 산출'],['6','카드를 본 뒤 말하기','카드를 치운 뒤 기억해 반복'],['7','질문에 답하기','상황 질문에 목표어로 답변'],['8','역할극에서 사용','연습어를 자연스러운 대화에 적용']];
CLIPS.push({code:'5',short:'5 말실행증',title:'말실행증',desc:'정의·좌반구 네트워크 · 비일관적 오류와 모색 · 평가와 감별 · Rosenbek 8단계 · 치료 접근 · 아동기 말실행증 · 퀴즈 5문제',
 build(S){
  add(hdr('EP 5 · 말운동장애','말실행증 · 계획에서 말소리까지'));
  add(
   '<div class="glass e5box" id="e5stage"><div class="e5eyebrow">말산출의 4단계</div><div class="e5stages">'+[['1','개념 형성','의도·메시지'],['2','언어적 부호화','단어·문장'],['3','말운동 계획','소리 순서·조음 동작'],['4','운동 실행','신경·근육 움직임']].map((x,i)=>'<div class="e5stage" id="e5stage'+i+'"><b>'+x[0]+'</b><strong>'+x[1]+'</strong><small>'+x[2]+'</small></div>').join('')+'</div><div class="e5foot" id="e5stagetag">손상 단계에 따라 장애 양상이 달라집니다</div></div>');
  add('<div class="glass e5box" id="e5speech"><div class="e5eyebrow">같은 목표어, 다른 산출</div><div class="e5word">호루라기</div><div class="e5tries"><div>1회 <b>호라루기</b></div><div>2회 <b>호리루기</b></div><div>3회 <b>호라라기</b></div></div><div class="e5pill">비일관적 · 변이적 오류</div><div class="e5muted">스스로 고치려 하지만, 수정 끝에 정반응이 아닐 수도 있어요</div></div>');
  add('<div class="glass e5box" id="e5braincard"><div class="e5eyebrow">말운동 프로그래밍 네트워크</div><div class="e5bullets"><div><b>좌측 하전두이랑</b><small>브로카 영역 주변 · 조음 계획</small></div><div><b>앞쪽 뇌섬</b><small>조음 동작의 순서화</small></div><div><b>전운동·보조운동영역</b><small>말동작 준비와 시작</small></div><div><b>측두-두정 및 피질하</b><small>분산 네트워크도 관여</small></div></div><div class="e5note">뇌졸중이 흔한 원인 · 외상·종양·퇴행성 질환도 가능</div></div>');
  add('<div class="glass e5box" id="e5symptoms"><div class="e5eyebrow">말 특색 한눈에</div><div class="e5symgrid"><div class="e5sym"><b>조음</b><span>대치가 흔함<br>음소·음절 오류</span></div><div class="e5sym"><b>변이</b><span>같은 단어도<br>반복마다 달라짐</span></div><div class="e5sym"><b>모색</b><span>입술·혀가<br>목표 위치를 탐색</span></div><div class="e5sym"><b>길이 효과</b><span>길고 복잡할수록<br>오류 증가</span></div><div class="e5sym"><b>운율</b><span>느리고 끊기며<br>음절 간격 불규칙</span></div><div class="e5sym"><b>발화 과제</b><span>명제말이 자동말보다<br>더 어려울 수 있음</span></div></div></div>');
  add('<div class="glass e5box" id="e5length"><div class="e5eyebrow">길이·복잡성 효과</div><div class="e5ladder"><div class="e5wordchip">밥</div><i>→</i><div class="e5wordchip">밥 한 끼</div><i>→</i><div class="e5wordchip">점심에 밥 한 끼 먹어요</div></div><div class="e5meter"><span id="e5meterfill"></span></div><div class="e5caption">음절 수와 조음 전환이 늘수록 운동 계획 부담이 커집니다</div><div class="e5example"><span>자동말</span> 하나, 둘, 셋… <b>비교적 수월</b><span>명제말</span> 오늘 어떻게 오셨어요? <b>더 어려울 수 있음</b></div></div>');
  add('<div class="glass e5box" id="e5eval"><div class="e5eyebrow">평가: 대비 과제로 특징을 확인</div><div class="e5evalgrid"><div><b>AMR</b><span>퍼-퍼-퍼</span><small>같은 음절 반복</small></div><div class="e5versus">대비</div><div><b>SMR</b><span>퍼-터-커</span><small>순차 조음 전환<br>더 어려울 수 있음</small></div></div><div class="e5evalrow"><b>자동말 ↔ 명제말</b><span>숫자 세기 ↔ 경험 설명</span></div><div class="e5evalrow"><b>길이 증가 따라말하기</b><span>이층 → 이층집 → 이층집 창문</span></div><div class="e5evalrow"><b>함께 확인</b><span>모색·운율·구강실행증·실어증·마비말장애·쓰기</span></div></div>');
  add('<div class="glass e5box" id="e5diff"><div class="e5eyebrow">감별: 말실행증 vs 마비말장애</div><table class="e5table"><tr><th>특징</th><th class="e5aos">말실행증</th><th class="e5dys">마비말장애</th></tr><tr><td>핵심</td><td>계획·프로그래밍</td><td>운동 실행·신경근육</td></tr><tr><td>근육 기능</td><td>약화·마비가 핵심 아님</td><td>근력·긴장·협응 등 저하</td></tr><tr><td>오류</td><td>비일관적, 길이 효과</td><td>비교적 일관적</td></tr><tr><td>영향 하위체계</td><td>주로 조음·운율</td><td>호흡·발성·공명·조음·운율</td></tr><tr><td>단서</td><td>모색, 자동말이 상대적 용이</td><td>근육 특성 및 말 하위체계 평가</td></tr></table><div class="e5note">두 장애는 함께 나타날 수 있어, 말·언어·구강운동을 모두 평가합니다</div></div>');
  add('<div class="glass e5box" id="e5aph"><div class="e5eyebrow">말실행증 vs 실어증</div><div class="e5aphgrid"><div><h3>말실행증</h3><p>말소리의 운동 계획이 어려움</p><p>이해·읽기·쓰기는 보존될 수 있음</p><p>운율 저하 · 시작 곤란 · 모색</p></div><div><h3>실어증</h3><p>언어 지식·이해·표현의 장애</p><p>듣기·말하기·읽기·쓰기 양상 확인</p><p>음소착어와 운율 특성 비교</p></div></div><div class="e5note">브로카 실어증과 동반되기도 하므로, 말 오류만으로 단정하지 않습니다</div></div>');
  add('<div class="glass e5box" id="e5eight"><div class="e5eyebrow">Rosenbek의 8단계 연속법 · 통합자극</div><div class="e5eightgrid">'+e5Stages.map((x,i)=>'<div class="e5step" id="e5step'+i+'"><b>'+x[0]+'</b><div><strong>'+x[1]+'</strong><small>'+x[2]+'</small></div></div>').join('')+'</div><div class="e5note">듣고 · 보고 · 따라 하기에서 출발해, 단서를 줄이고 기능적 대화로 일반화합니다</div></div>');
  add('<div class="glass e5box" id="e5treat"><div class="e5eyebrow">치료 접근 4가지</div><div class="e5treatgrid"><div><b>조음-운동학적</b><span>조음지시 · 반복 연습 · 목표음 정확도</span></div><div><b>속도-리듬</b><span>박자 두드리기 · 대조적 강세 · MIT</span></div><div><b>체계 간 재조직</b><span>PROMPT · 촉각-운동감각 단서</span></div><div><b>보완대체 AAC</b><span>그림·글자판·기기 · 의사소통 참여</span></div></div><div class="e5note">중증도에 맞춰 음성·모음·짧은 단어부터 문장·대화까지 단계화</div></div>');
  add('<div class="glass e5box" id="e5child"><div class="e5eyebrow">아동기 CAS · 성인기 AOS와 구분</div><div class="e5cas"><div><b>공통</b><span>운동 계획·프로그래밍 어려움<br>비일관적 오류 · 길이 효과 · 운율 문제</span></div><div><b>CAS</b><span>발달기 말운동장애<br>자음·모음, 음절 전이, 운율 평가<br>근육 약화가 핵심은 아님</span></div><div><b>성인 AOS</b><span>후천적 신경계 손상<br>뇌졸중이 흔한 원인<br>실어증·구강실행증 동반 가능</span></div></div><div class="e5note">CAS 진단은 포괄적 평가가 필요하며, 단일 징후만으로 결론내리지 않습니다</div></div>');
  add('<div class="glass e5box e5summary" id="e5sum"><h2>국시 정리 · 말실행증</h2><div class="e5sumgrid"><div><b>손상 단계</b><span>말운동 계획·프로그래밍</span></div><div><b>대표 단서</b><span>비일관 오류 · 모색 · 느리고 끊기는 운율</span></div><div><b>길이 효과</b><span>길고 복잡할수록 오류 증가</span></div><div><b>평가</b><span>AMR/SMR · 자동/명제 · 길이 단계화</span></div><div><b>감별</b><span>AOS는 계획 / dysarthria는 실행</span></div><div><b>치료</b><span>8단계 연속법 · MIT · PROMPT · AAC</span></div></div></div>');
  Q5.forEach((q,i)=>add(quizHTML('q5_'+i,q)));
  S.card=(id)=>{['e5stage','e5speech','e5braincard','e5symptoms','e5length','e5eval','e5diff','e5aph','e5eight','e5treat','e5child','e5sum'].forEach(k=>$('#'+k).classList.remove('on'));on('#'+id);};
  const labels=[['G_front_inf-Opercular','G_front_inf-Triangul'],['G_insular_short','S_circular_insula_sup'],['G_precentral','G_front_middle']];
  const anchor=(names,fb)=>W.lp(names,{},fb);
  L3('e5lblbroca','하전두이랑 <small>말운동 계획</small>',W.hemiL,anchor(labels[0],[0.3,0.35,0.55]).p,{color:'#FF8C8C',dx:-145,dy:-55,cls:'big'});
  L3('e5lblinsula','앞쪽 뇌섬 <small>조음 순서화</small>',W.hemiL,anchor(labels[1],[0.15,0.03,0.58]).p,{color:'#FFE45C',dx:120,dy:75});
  L3('e5lblpremotor','전운동영역 <small>준비·시작</small>',W.hemiL,anchor(labels[2],[0.25,0.5,0.25]).p,{color:'#8FCBFF',dx:-150,dy:45});
  S.brainOn=()=>{ W.show({brain:true,deep:false}); W.brain({op:1}); W.view('lateralL',0); W.hideRight(true); W.lesion({labels:[...labels[0].map(name=>({name})),...labels[1].map(name=>({name})),...labels[2].map(name=>({name})),{name:'G_front_sup',fmax:-0.1}],color:'#FF5868',side:'L'}); };
 },
 steps:[
  {wait:500},
  {id:'51-01',s:'N',t:'5편, 말실행증입니다. 말은 생각을 떠올리고, 언어로 부호화하고, 말소리의 움직임을 계획한 뒤 실제로 실행합니다. 오늘은 이 가운데 말운동 계획과 프로그래밍이 어려워지는 경우를 살펴보겠습니다.',do(){S.card('e5stage');on('#e5stage0');}},
  {id:'51-02',s:'N',t:'말실행증은 근육이 약해서라기보다, 의도한 소리를 어떤 순서와 움직임으로 만들지 계획하는 과정의 장애입니다. 실제 근육의 힘과 움직임이 손상되는 마비말장애와 구분합니다.',do(){on('#e5stage1');}},
  {id:'51-03',s:'N',t:'손상은 주로 좌반구의 말운동 네트워크와 관련됩니다. 브로카 영역 주변 하전두이랑, 앞쪽 뇌섬, 전운동영역과 보조운동영역 등이 관여하고, 측두두정 피질이나 피질하 구조도 관련될 수 있습니다.',do(S){on('#e5stage2');S.card('e5braincard');S.brainOn();W.lbl(['e5lblbroca','e5lblinsula','e5lblpremotor']);}},
  {id:'51-04',s:'N',t:'뇌졸중이 흔한 원인이지만 외상성 뇌손상, 종양, 퇴행성 질환에서도 생길 수 있습니다. 한 부위만으로 설명하기보다 네트워크와 함께 나타나는 실어증, 마비말장애를 같이 살펴야 합니다.',do(){S.card('e5stage');on('#e5stage3');W.lblAllOff();W.lesion(null);W.hideRight(false);W.show({brain:false});}},
  {id:'51-05',s:'N',t:'가장 두드러지는 문제는 조음 오류입니다. 대치가 흔하고, 음소뿐 아니라 음절 단위 오류도 나타납니다. 자음의 조음 위치 오류가 두드러질 수 있지만, 오류 형태는 사람과 과제에 따라 다양합니다.',do(){W.lblAllOff();W.lesion(null);W.hideRight(false);W.brain({op:0});W.show({brain:false});S.card('e5symptoms');}},
  {id:'51-06',s:'N',t:'같은 목표어를 반복해도 산출이 매번 달라지는 비일관적, 변이적 오류가 특징입니다. 예시처럼 호루라기가 호라루기, 호리루기, 호라라기로 바뀔 수 있습니다. 이때 여러 차례 반복하며 스스로 고치려 하지만 마지막 산출이 반드시 정답인 것은 아닙니다.',do(){S.card('e5speech');}},
  {id:'51-07',s:'N',t:'말을 시작할 때 입술이나 혀가 목표 위치를 찾아 움직이는 모색 행동도 관찰될 수 있습니다. 특히 첫 음절에서 눈에 띄며, 시작이 늦어지거나 음절 사이가 끊기는 양상과 함께 나타날 수 있습니다.',do(){S.card('e5speech');$('#e5speech').classList.add('e5groping');}},
  {id:'51-08',s:'N',t:'자극어가 길고 복잡해질수록 필요한 말운동 계획이 늘어 오류가 증가하는 경향이 있습니다. 짧은 단어에서 시작해 구와 문장으로 확장하며 살펴봅니다.',do(){S.card('e5length');$('#e5meterfill').style.width='90%';}},
  {id:'51-09',s:'N',t:'자동으로 익힌 숫자 세기나 인사말은 비교적 수월할 수 있지만, 생각을 구성해야 하는 명제말은 더 어려울 수 있습니다. 다만 심한 말실행증이나 동반 실어증이 있으면 자동말도 어려울 수 있어, 절대적인 규칙으로 보지 않습니다.',do(){S.card('e5length');}},
  {id:'51-10',s:'N',t:'운율에서는 말속도가 느려지거나 음소가 길어지고, 음절 사이의 간격이 불규칙해질 수 있습니다. 이런 단서는 조음 오류와 함께 관찰해야 합니다.',do(){S.card('e5symptoms');}},
  {id:'51-11',s:'N',t:'평가에서는 퍼퍼퍼처럼 같은 음절을 반복하는 AMR과, 퍼터커처럼 음절을 순서대로 바꾸는 SMR을 비교합니다. 말실행증에서는 SMR이 더 어려운 경향이 있지만, 이를 단독 진단 기준으로 사용하지 않습니다.',do(){S.card('e5eval');}},
  {id:'51-12',s:'N',t:'자동말과 즉석에서 문장을 만들어야 하는 명제말을 대비하고, 이층, 이층집, 이층집 창문처럼 길이를 늘려 따라 말하게 합니다. 모색과 운율, 오류의 일관성을 기록하고, 구강실행증과 말·언어장애도 함께 평가합니다.',do(){S.card('e5eval');}},
  {id:'51-13',s:'N',t:'마비말장애와의 감별입니다. 말실행증은 계획 단계의 문제로, 근력이나 근긴장 저하가 핵심은 아닙니다. 마비말장애는 실행 단계의 신경근육 문제라 호흡, 발성, 공명까지 여러 말 하위체계에 영향을 줄 수 있습니다.',do(){S.card('e5diff');}},
  {id:'51-14',s:'N',t:'말실행증의 오류는 변이적이며 길이와 복잡성에 따라 달라질 수 있고, 마비말장애의 오류는 신경근육 특성에 따라 비교적 일관되게 나타날 수 있습니다. 실제로 두 장애가 함께 나타날 수 있으므로 한 가지 단서만으로 감별하지 않습니다.',do(){S.card('e5diff');}},
  {id:'51-15',s:'N',t:'실어증과도 구별해야 합니다. 순수 말실행증에서는 언어 이해, 읽기, 쓰기가 상대적으로 보존될 수 있습니다. 반면 실어증은 말 이외의 언어 양식에도 영향을 줄 수 있습니다. 다만 브로카 실어증과 말실행증은 자주 동반됩니다.',do(){S.card('e5aph');}},
  {id:'51-16',s:'N',t:'치료의 목표는 말명료도와 자연스러움을 높여 기능적 의사소통과 사회 참여를 돕는 것입니다. 이해장애나 표현 실어증, 마비말장애가 함께 있으면 치료 참여와 일상 의사소통을 가장 크게 제한하는 문제부터 계획합니다.',do(){S.card('e5treat');}},
  {id:'51-17',s:'N',t:'치료는 반복 연습과 운동학습 원리를 활용합니다. 초기에는 같은 목표를 일정한 조건에서 충분히 연습하고, 정확도가 올라가면 다양한 단어와 상황으로 바꾸며 단서를 줄여 일반화합니다. 환자의 자기점검과 피드백도 중요합니다.',do(){S.card('e5treat');}},
  {id:'51-18',s:'N',t:'조음-운동학적 치료의 대표적인 구조가 Rosenbek의 8단계 연속법입니다. 치료사와 함께 말하기에서 시작해 독립적인 기능 대화까지, 시각과 청각 단서를 점차 줄이며 진행합니다.',do(){S.card('e5eight');$('#e5step0').classList.add('on');}},
  {id:'51-19',s:'N',t:'1단계에서는 치료사의 모델을 듣고 보며 함께 말합니다. 2단계에서는 치료사의 입모양을 보고 말하고, 3단계에서는 치료사의 모델 뒤에 따라 말합니다.',do(){[0,1,2].forEach(i=>$('#e5step'+i).classList.add('on'));}},
  {id:'51-20',s:'N',t:'4단계에서는 단서 없이 여러 번 반복합니다. 5단계는 목표어가 적힌 카드를 보고 말하고, 6단계는 카드를 잠깐 본 뒤 치우고 기억해 말합니다.',do(){[3,4,5].forEach(i=>$('#e5step'+i).classList.add('on'));}},
  {id:'51-21',s:'N',t:'7단계에서는 치료사의 질문에 목표어로 답하고, 8단계에서는 역할극 안에서 연습한 표현을 사용합니다. 수행이 안정되면 단계를 조정할 수 있고, 모든 환자가 똑같은 속도로 진행하는 것은 아닙니다.',do(){[6,7].forEach(i=>$('#e5step'+i).classList.add('on'));}},
  {id:'51-22',s:'N',t:'통합자극법은 치료사의 말을 듣고, 입모양을 보고, 그대로 따라 하도록 하는 방법입니다. 거울이나 영상으로 자신의 조음 움직임을 보게 해 자기수정을 지원할 수도 있습니다.',do(){S.card('e5eight');}},
  {id:'51-23',s:'N',t:'속도와 리듬 접근에는 손가락 두드리기, 메트로놈, 대조적 강세 훈련, 멜로디 억양 치료인 MIT가 있습니다. MIT는 리듬과 억양 단서를 활용하며, 본래 비유창성 실어증 치료법으로 개발됐지만 말실행증에도 적용될 수 있습니다.',do(){S.card('e5treat');}},
  {id:'51-24',s:'N',t:'PROMPT는 얼굴과 턱, 목 주변에 촉각·운동감각 단서를 제공해 조음 위치와 움직임의 순서를 돕습니다. 특히 아동기 말실행증을 포함한 말운동장애 아동의 치료에서 활용됩니다. AAC는 말 산출이 매우 제한될 때도 의사소통 참여를 보장하기 위해 병행할 수 있습니다.',do(){S.card('e5treat');}},
  {id:'51-25',s:'N',t:'중증도에 따라 시작점을 조정합니다. 심하면 발성, 모음, 짧고 기능적인 단어부터 시작하고 AAC를 병행합니다. 중등도에서는 단어와 구를 문장으로 확장하며, 경도에서는 속도와 운율, 자기점검, 실제 대화로의 일반화를 목표로 합니다.',do(){S.card('e5treat');}},
  {id:'51-26',s:'N',t:'아동기 말실행증, CAS는 발달기 아동에서 나타나는 말운동 계획의 어려움입니다. 자음과 모음 오류, 음절 전이의 어려움, 비일관적 산출과 부적절한 운율을 살펴봅니다. 단일 특징만으로 진단하지 않고 포괄적 평가를 합니다.',do(){S.card('e5child');}},
  {id:'51-27',s:'N',t:'성인기 말실행증은 뇌졸중 등 후천적 신경 손상과 관련되는 경우가 많고, 실어증이나 구강실행증과 동반될 수 있습니다. 두 연령군 모두 계획 단계의 어려움이 핵심이며, 근육 약화가 핵심인 마비말장애와는 다릅니다.',do(){S.card('e5child');}},
  {id:'51-28',s:'N',t:'시험 핵심을 정리하겠습니다. 말운동 계획·프로그래밍 단계, 비일관적 오류와 모색, 길이 효과와 비정상 운율, AMR과 SMR의 대비, 그리고 Rosenbek 8단계 연속법을 기억해 주세요.',do(){S.card('e5sum');},gap:2200},
  ...quizSteps('q5_0',Q5[0],()=>on('#e5sum',false)),
  ...quizSteps('q5_1',Q5[1],()=>on('#q5_0',false)),
  ...quizSteps('q5_2',Q5[2],()=>on('#q5_1',false)),
  ...quizSteps('q5_3',Q5[3],()=>on('#q5_2',false)),
  ...quizSteps('q5_4',Q5[4],()=>on('#q5_3',false)),
  {id:'51-29',s:'N',t:'수고하셨습니다. 말실행증은 단순히 발음이 틀리는 문제가 아니라, 말소리 움직임을 계획하고 순서화하는 어려움입니다. 다음 편에서는 삼킴의 단계와 평가, 치료를 살펴보겠습니다.',do(){on('#q5_4',false);W.lblAllOff();W.lesion(null);W.hideRight(false);W.brain({op:0});W.show({brain:false});}}
 ]});
})();