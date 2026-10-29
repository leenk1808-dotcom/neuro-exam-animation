/* =================================================================
   7. 치매 · 인지-의사소통장애
   자료: 신경언어장애 정리(메인) · 특강 Part 2 p118-165
   ================================================================= */
(()=>{
const Q7=[
 {sec:8,q:'최근 일화기억 저하와 내측 측두엽 위축이 먼저 나타나고, 서서히 진행하는 대표 치매는?',opts:['혈관성 치매','알츠하이머병','루이소체 치매','가성치매','전두측두치매'],ans:1,say:'최근 일화기억 저하와 내측 측두엽 위축이 먼저 나타나고 서서히 진행하는 대표 치매는 무엇일까요?',ex:'정답은 2번, 알츠하이머병입니다. 초기에는 최근 기억과 이름대기가 흔히 저하되고, 점차 의미와 의사소통 기능까지 영향을 받습니다.'},
 {sec:8,q:'인지 저하는 객관적으로 관찰되지만 일상생활의 독립성은 대체로 유지되는 임상 상태는?',opts:['주관적 기억저하','경도인지장애','중증 치매','섬망','가성치매'],ans:1,say:'객관적인 인지 저하는 있지만 일상생활의 독립성은 대체로 유지되는 임상 상태는?',ex:'정답은 2번, 경도인지장애, MCI입니다. MCI는 질환명이 아니라 임상 상태이며 모든 사람이 치매로 진행하는 것은 아닙니다.'},
 {sec:9,q:'혈관성 치매에서 알츠하이머병보다 두드러질 수 있는 핵심 기능 저하는?',opts:['처리속도·주의·집행기능','초기부터 모든 언어기능 소실','시각 환각만','운동 계획만','청력'],ans:0,say:'혈관성 치매에서 알츠하이머병보다 두드러질 수 있는 핵심 기능 저하는 무엇일까요?',ex:'정답은 1번, 정보처리속도와 주의, 집행기능 저하입니다. 발병과 경과는 병소에 따라 갑작스럽거나 계단식일 수 있습니다.'},
 {sec:9,q:'우울 증상이 인지 저하보다 먼저 나타나고, 본인이 기억력 저하를 괴로워하며 “모르겠다”고 답하기 쉬운 감별 대상은?',opts:['알츠하이머병','혈관성 치매','가성치매','원발성 진행성 실어증','루이소체 치매'],ans:2,say:'우울 증상이 인지 저하보다 먼저 나타나고, 기억 저하를 괴로워하며 모르겠다고 답하기 쉬운 감별 대상은?',ex:'정답은 3번, 가성치매입니다. 우울증과 연관된 인지 저하일 수 있어 전문적인 감별과 평가가 필요합니다.'},
 {sec:8,q:'보호자가 짧고 직접적인 문장을 쓰고, 시선과 핵심어를 활용하며 선택지를 구조화하는 접근은?',opts:['직접 자극만 반복','FOCUSED 등 보호자 의사소통 교육','수술적 치료','무조건 답을 교정','대화를 중단'],ans:1,say:'보호자가 짧고 직접적인 문장을 쓰고 시선과 핵심어를 활용하며 선택지를 구조화하는 접근은?',ex:'정답은 2번, FOCUSED 등 보호자 의사소통 교육입니다. 간접치료는 환경과 대화 상대의 전략을 바꾸며 직접치료와 함께 활용할 수 있습니다.'}
];
function dementiaCard(id,title,body,style=''){ add('<div class="glass fade e7card" id="'+id+'" style="'+style+'"><h3>'+title+'</h3>'+body+'</div>'); }
function e7pill(t,c=''){return '<span class="e7pill '+c+'">'+t+'</span>';}
const groups={};
function show3D(les,view='lateralL',cam=[5.3,0.28,0.05],tgt=[0,-0.12,0.05]){ W.lblAllOff(); W.show({brain:true,deep:false}); W.brain({op:1}); W.hideRight(view==='medial'); W.hideLeft(false); W.view(view,0); W.cam(cam,tgt,1300); W.lesion(les); }
CLIPS.push({code:'7',short:'7 치매',title:'치매와 인지-의사소통장애',desc:'원인과 유형 · AD·혈관성·FTD·PPA·루이소체 · 평가 · ICF 기반 치료 · 가성치매 감별 · 퀴즈 5문제',build(S){
 W.show({brain:true}); W.brain({op:1}); W.view('lateralL',0); W.spin(0);
 add(hdr('EP 7 · 치매','인지 변화와 의사소통을 이해하기'));
 dementiaCard('e7intro','치매란?', '<div class="e7lead">후천적인 뇌 기능 저하로 기억·인지·언어·일상생활이 영향을 받는 상태</div><div class="e7row">기억만의 문제가 아니라 <b>주의 · 시공간 · 집행기능 · 행동 · 의사소통</b> 변화를 함께 봅니다.</div><div class="e7note">급성 혼돈이 특징인 섬망과 구별하고, 원인 질환과 기능 변화의 경과를 종합합니다.</div>','right:64px;top:142px;width:680px');
 dementiaCard('e7types','원인과 경과에 따른 큰 갈래','<div class="e7cols"><section><b class="mint">가역 가능성이 있는 원인</b><p>대사·내분비 이상, 결핍, 약물, 정상압 수두증 등<br><small>원인을 찾아 치료해도 완전 회복을 보장하지 않으므로 신속한 진료가 중요합니다.</small></p></section><section><b class="pink">퇴행성·혈관성 원인</b><p>알츠하이머병, 전두측두엽 치매, 루이소체병, 뇌혈관질환 등<br><small>서서히 진행, 변동, 또는 계단식 악화처럼 경과가 다를 수 있습니다.</small></p></section></div><div class="e7note">원인 분류는 진단을 대신하지 않습니다. 갑작스럽거나 빠른 변화는 의료 평가가 필요합니다.</div>','right:64px;top:142px;width:760px');
 dementiaCard('e7cortex','피질형 · 피질하형 · 혼합형','<div class="e7cols"><section><b>피질 네트워크</b><p>기억·언어·시공간 처리 등 고차 인지 기능</p></section><section><b>피질하 네트워크</b><p>처리속도·주의·운동 및 실행 회로</p></section></div><div class="e7row">실제 환자에서는 겹치는 소견이 흔하므로 단순한 한 가지 표지로 구분하지 않습니다.</div><div class="e7note">혈관성 치매는 알츠하이머병 다음으로 흔한 유형으로 다루며 독립된 유형으로 정리합니다.</div>','right:64px;top:145px;width:740px');
 dementiaCard('e7ad','알츠하이머병 · 점진적 기억 저하','<div class="e7row">초기: 최근 사건·일화기억, 이름대기와 단어 찾기가 어려워질 수 있습니다.</div><div class="e7row">진행: 의미 이해와 긴 문장 처리, 담화의 주제 유지·정보 전달이 점차 어려워질 수 있습니다.</div><div class="e7row">후기: 의사소통 지원 필요가 커지고, 말수가 크게 줄거나 구어 표현이 어려워질 수 있습니다.</div><div class="e7key">초기 기억 문제 → 단어 인출·담화 → 의미와 일상 의사소통</div>','right:55px;top:140px;width:770px');
 dementiaCard('e7mci','경도인지장애 (MCI)','<div class="e7scale"><b>정상 노화</b><i>→</i><b class="gold">MCI</b><i>→</i><b>치매</b></div><div class="e7row">연령·교육수준을 고려해 객관적 인지 저하가 확인되지만, 일상생활의 독립성은 대체로 유지됩니다.</div><div class="e7row">치매로 진행할 위험은 높아질 수 있으나 <b>모든 MCI가 치매로 진행하는 것은 아닙니다.</b></div><div class="e7note">MCI는 임상 상태이며 단일 질환명이 아닙니다. 원인과 변화 양상을 지속 평가합니다.</div>','right:68px;top:155px;width:720px');
 dementiaCard('e7ftd','전두측두엽 치매 (FTD)','<div class="e7row">행동·성격 변화와 사회적 판단의 변화가 초기부터 두드러질 수 있습니다.</div><div class="e7row">충동성, 무감동, 공감 저하, 반복 행동이나 과잉구강행동 등이 나타날 수 있습니다.</div><div class="e7note">언어 중심의 진행성 양상은 원발성 진행성 실어증(PPA)으로 구체화해 살펴봅니다.</div>','right:65px;top:150px;width:720px');
 dementiaCard('e7ppa','원발성 진행성 실어증 (PPA)','<div class="e7ppa"><div><b>비유창형</b><small>말 산출 노력·문법<br>좌측 하전두·섬엽</small></div><div><b>의미형</b><small>단어·개념 이해 저하<br>전측두엽</small></div><div><b>로그페닉형</b><small>단어 찾기·따라말하기<br>측두-두정 연결</small></div></div><div class="e7note">초기에는 언어 저하가 두드러지고 다른 인지 영역이 상대적으로 유지될 수 있습니다. 경과에 따라 변화합니다.</div>','right:45px;top:140px;width:830px');
 dementiaCard('e7vasc','혈관성 치매','<div class="e7row">뇌혈관 병변의 위치와 범위에 따라 인지·언어 양상이 달라집니다.</div><div class="e7row"><b>처리속도 · 주의 · 집행기능</b> 저하가 두드러질 수 있고, 발병은 갑작스럽거나 경과가 계단식일 수 있습니다.</div><div class="e7row"><b>기억 유형</b>: 일화기억은 개인의 사건·경험, 의미기억은 단어·개념 지식, 절차기억은 익숙한 기술·습관을 말합니다. 유형별 보존 양상은 질환과 단계에 따라 달라집니다.</div><div class="e7row">뇌졸중 병소에 따라 실어증, 마비말장애, 보행·삼킴 문제 등이 동반될 수 있습니다.</div><div class="e7key">병력 + 신경학적 소견 + 뇌영상 + 인지평가를 종합</div>','right:62px;top:140px;width:740px');
 dementiaCard('e7lewy','루이소체·파킨슨 관련 인지장애','<div class="e7cols"><section><b>루이소체 치매</b><p>인지 변동, 생생한 시각 환각, 파킨슨증, 렘수면행동장애가 단서가 될 수 있습니다.</p></section><section><b>파킨슨병 치매</b><p>주의·집행기능 저하와 느린 처리속도, 운동 증상이 검사 수행에 영향을 줄 수 있습니다.</p></section></div><div class="e7note">파킨슨병 자체의 운동말장애와 인지-언어 저하를 구분해 평가합니다.</div>','right:64px;top:142px;width:760px');
 dementiaCard('e7psp','피질하 퇴행성 질환의 시험 포인트','<div class="e7row"><b>진행성 핵상마비</b>: 파킨슨병과 비슷한 양상이나, 자료 정리에서는 떨림 없이 경직이 관찰된다고 제시합니다.</div><div class="e7row">파킨슨병 치매는 피질하 회로의 주의·집행기능·처리속도 저하가 두드러질 수 있습니다. 음성 약화, 말속도 변화와 단어 유창성 저하가 나타날 수 있으며, 말·언어 양상은 개인차가 있습니다.</div><div class="e7note">개별 진단은 전문 의료진의 평가에 따릅니다.</div>','right:64px;top:155px;width:740px');
 dementiaCard('e7eval','치매 평가: 한 점수보다 종합 소견','<div class="e7cols"><section><b>K-MMSE</b><p>지남력 · 등록/회상 · 주의·계산 · 언어 · 시공간 구성 등 간이 선별</p></section><section><b>CDR</b><p>기억·지남력·판단/문제해결, 사회활동, 집안생활·취미, 위생·몸치장의 중증도 평가<br><small>0 · 0.5 · 1 · 2 · 3</small></p></section></div><div class="e7row"><b>GDS</b>: 전반적 퇴화 단계를 살펴보는 7단계 척도</div><div class="e7note">병력·환자와 가족 면담·감각·인지·언어·말·삼킴·일상 기능을 반복 평가하고 변화를 추적합니다.</div>','right:50px;top:135px;width:820px');
 dementiaCard('e7icf','ICF 기반 치료 목표','<div class="e7icf"><div><b>신체 기능·구조</b><small>기억 · 언어 · 주의<br>감각 · 말 · 삼킴</small></div><i>↔</i><div><b>활동·참여</b><small>요구 표현<br>대화 · 일상 활동</small></div><i>↔</i><div><b>환경 요인</b><small>가족 · 보호자<br>대화 환경 · 보조 단서</small></div></div><div class="e7note">개인의 강점과 목표를 중심으로 직접치료, 보조전략, 보호자 교육을 조합합니다.</div>','right:45px;top:145px;width:850px');
 dementiaCard('e7direct','직접치료 · 기능적 기억과 의사소통','<div class="e7cols"><section><b>기억 수첩·시각 단서</b><p>익숙한 사진·글자카드·이름·일과표를 사용해 실제 요구 표현을 돕습니다.</p></section><section><b>간격회상 훈련 (SRT)</b><p>간병인 이름, 약속, 일상 행동 등 기능 정보를 점차 긴 간격으로 회상합니다.</p></section></div><div class="e7cols"><section><b>현실지남력 (ROT)</b><p>상황 단서를 반복해 시간·장소·사람 이해를 지원합니다.</p></section><section><b>몬테소리 기반 활동</b><p>개인의 능력에 맞춘 구조화된 실제 활동과 참여를 촉진합니다.</p></section></div><div class="e7note">인정요법(VT)은 감정을 확인하고 공감적으로 반응하며, 환자를 논박하거나 강제로 교정하지 않는 접근입니다.</div>','right:40px;top:125px;width:860px');
 dementiaCard('e7indirect','간접치료 · 보호자와 환경 지원','<div class="e7cols"><section><b>FOCUSED 대화 전략</b><p>Face-to-face 시선·집중<br>Orientation 핵심어 반복<br>Continuity 주제 유지<br>Unsticking 단어 찾기 지원</p></section><section><b>계속해서</b><p>Structure 선택 가능한 질문<br>Exchanges 쉬운 질문과 단서<br>Direct 짧고 구체적인 문장<br>그림·몸짓·환경 단서를 함께 사용</p></section></div><div class="e7row">SimPres: 친숙한 가족 목소리와 긍정적 기억 단서를 활용할 수 있습니다.</div><div class="e7note">간접치료만으로 모든 요구를 충족하기 어려워 직접치료 및 팀 접근과 병행합니다.</div>','right:40px;top:135px;width:860px');
 dementiaCard('e7pseudo','가성치매 · 우울증과의 감별','<div class="e7cols"><section><b class="gold">우울증 관련 인지 저하의 단서</b><p>우울·불면·식욕·의욕 변화가 선행할 수 있고, 비교적 갑작스러운 호소가 나타날 수 있습니다.<br>기억 저하를 크게 걱정하며 “모르겠다”고 답할 수 있습니다.</p></section><section><b>퇴행성 치매와 비교할 점</b><p>경과, 기능 변화, 본인의 반응, 가족 관찰, 기분 증상을 함께 봅니다.<br>우울증 치료 뒤 인지 기능이 호전될 수도 있습니다.</p></section></div><div class="e7note">‘가성치매’는 감별을 위한 표현입니다. 우울증과 치매는 함께 있을 수 있어 전문적인 평가가 필요합니다.</div>','right:45px;top:145px;width:840px');
 dementiaCard('e7sum','국시 핵심 정리','<div class="e7sum"><div><b>AD</b><span>서서히 · 최근 기억/이름대기</span></div><div><b>혈관성</b><span>병소별 · 처리속도/집행 · 계단식 가능</span></div><div><b>FTD / PPA</b><span>행동·성격 / 언어 중심의 진행성 저하</span></div><div><b>MCI</b><span>객관적 저하 · 일상 독립 유지</span></div><div><b>치료</b><span>ICF · 기능적 직접치료 + 보호자·환경 지원</span></div><div><b>감별</b><span>가성치매는 우울증 관련 인지저하 평가</span></div></div>','right:48px;top:130px;width:830px');
 Q7.forEach((q,i)=>add(quizHTML('q7_'+i,q)));
 },steps:[
 {id:'71-01',s:'N',t:'이번 편에서는 치매의 인지·언어 변화를 유형별로 보고, 평가와 언어치료 접근까지 연결하겠습니다.',do(){on('#e7intro');sfx('whoosh');}},
 {id:'71-02',s:'N',t:'치매는 기억뿐 아니라 주의, 시공간, 집행기능, 언어와 일상생활에 영향을 줄 수 있는 후천적 인지 저하입니다. 급성 혼돈이 두드러지는 섬망과 구별해야 합니다.',do(){on('#e7types');sfx('pop');}},
 {id:'71-03',s:'N',t:'원인에는 치료 가능한 대사·내분비 이상, 비타민 결핍, 약물, 정상압 수두증 등이 있습니다. 원인을 치료해도 완전히 회복된다는 뜻은 아니므로 조기 평가가 중요합니다.',do(){sfx('tick');}},
 {id:'71-04',s:'N',t:'퇴행성 질환은 대체로 서서히 진행하고, 혈관성은 갑작스럽거나 단계적으로 악화할 수 있습니다. 실제 임상에서는 원인이 겹칠 수 있어 한 증상만으로 유형을 단정하지 않습니다.',do(){on('#e7cortex');sfx('whoosh');}},
 {id:'71-05',s:'N',t:'피질 네트워크는 기억과 언어 같은 고차 기능, 피질하 회로는 처리속도와 주의, 운동·실행 기능과 관련됩니다. 이 구분은 개념을 정리하는 틀이며 실제 증상은 서로 겹칠 수 있습니다.',do(){sfx('tick');}},
 {id:'71-06',s:'N',t:'알츠하이머병에서는 최근 사건을 기억하기 어렵고 단어가 잘 떠오르지 않는 변화가 초기부터 관찰될 수 있습니다. 초기에는 문법과 유창성이 상대적으로 유지되기도 합니다.',do(){on('#e7ad');show3D({labels:['G_oc-temp_med-Parahip','G_temp_sup-Lateral'],color:'#FFC957',side:'L'},'medial',[-5.0,0.15,0.05],[0,-0.12,0.05]);sfx('glow');}},
 {id:'71-07',s:'N',t:'내측 측두엽과 해마 주변 네트워크가 기억 저하와 관련됩니다. 왼쪽 반구만으로 한정되지 않는 신경퇴행성 변화이므로, 애니메이션에서는 좌우 반구의 내측 측두엽을 강조합니다.',do(){W.hideRight(true);W.lesion({labels:['G_oc-temp_med-Parahip'],color:'#FFC957',side:'both'});sfx('glow');}},
 {id:'71-08',s:'N',t:'질환이 진행하면 이름대기, 의미 이해, 긴 문장 처리와 담화의 주제 유지가 어려워질 수 있습니다. 기억 저하로 같은 질문을 되풀이하거나 이야기를 보충하는 일도 생깁니다.',do(){W.hideRight(false);W.view('lateralL',0);W.lesion({labels:['G_temp_sup-Lateral','G_pariet_inf-Angular'],color:'#FF8A5C',side:'both'});}},
 {id:'71-09',s:'N',t:'말기에는 의미기억과 일상적 의사소통의 어려움이 커지고, 말수가 크게 감소하거나 구어 표현이 어려워질 수 있습니다. 개인마다 진행 속도와 양상은 다릅니다.',do(){sfx('tick');}},
 {id:'71-10',s:'N',t:'MCI는 객관적인 인지 저하가 확인되지만 일상생활 독립성이 대체로 보존되는 임상 상태입니다. 치매 진행 위험이 높아질 수는 있지만 모든 분이 치매로 진행하는 것은 아닙니다.',do(){on('#e7mci');W.lesion(null);W.show({brain:false});sfx('pop');}},
 {id:'71-11',s:'N',t:'전두측두엽 치매에서는 성격과 행동, 사회적 판단 변화가 비교적 이르게 두드러질 수 있습니다. 언어 중심으로 진행하는 양상은 PPA의 세 변이형으로 정리합니다.',do(){on('#e7ftd');show3D({labels:['G_front_inf-Opercular','G_front_inf-Triangul','G_temp_sup-Lateral'],color:'#FF6961',side:'both'},'lateralL');sfx('glow');}},
 {id:'71-12',s:'N',t:'비유창형 PPA는 말 산출 노력과 문법이, 의미형은 단어와 개념 이해가, 로그페닉형은 단어 찾기와 따라말하기가 두드러질 수 있습니다. 전형적 병소도 함께 기억해 두세요.',do(){on('#e7ppa');show3D({labels:[{name:'G_front_inf-Opercular'},{name:'G_insular_short'}],color:'#FF8C55',side:'L'},'lateralL');}},
 {id:'71-13',s:'N',t:'비유창형은 좌측 하전두와 섬엽, 의미형은 전측두엽, 로그페닉형은 좌측 측두-두정 연결 영역과 관련됩니다. 이 병소는 대표적 연관성을 보여 주며 개인의 진단을 대신하지 않습니다.',do(){W.lblAllOff();W.lesion({labels:['G_temp_sup-Lateral','G_pariet_inf-Angular'],color:'#B982FF',side:'L'});sfx('glow');}},
 {id:'71-14',s:'N',t:'혈관성 치매는 뇌혈관 병소의 위치와 범위에 따라 다르게 나타납니다. 기억 저하 외에도 처리속도, 주의, 계획과 조직화의 어려움이 눈에 띌 수 있습니다.',do(){on('#e7vasc');show3D({labels:['G_front_middle','G_pariet_inf-Angular','G_temp_sup-Lateral'],color:'#FF5A68',side:'both'},'lateralL');}},
 {id:'71-15',s:'N',t:'혈관성 인지 저하는 병소에 따라 갑작스럽게 시작되거나 계단식으로 악화할 수 있습니다. 실어증이나 마비말장애, 보행과 삼킴 문제가 함께 있을 수 있어 신경학적 병력과 영상 소견을 함께 봅니다.',do(){W.lesion({blobs:[[-0.2,0.15,0.16,false],[0.15,-0.05,0.14,false],[0.38,0.2,0.12,false]],color:'#FF5964',side:'both'});sfx('zap');}},
 {id:'71-16',s:'N',t:'루이소체 치매에서는 인지 기능의 변동, 생생한 시각 환각, 파킨슨증, 렘수면행동장애가 단서가 될 수 있습니다. 파킨슨병 치매에서는 주의와 집행기능 저하, 느린 처리속도가 검사 수행에 영향을 줍니다.',do(){on('#e7lewy');W.lesion(null);W.show({brain:false});}},
 {id:'71-17',s:'N',t:'파킨슨병 관련 치매는 피질하 양상이 흔해 주의·집행기능과 처리속도가 영향을 받을 수 있습니다. 저운동형 마비말장애의 작은 음량·말속도 변화와 인지 저하에 따른 단어 유창성·담화 어려움을 구별해 평가합니다. 운동 느림이나 손동작 제한도 검사 결과에 영향을 줄 수 있습니다.',do(){on('#e7psp');sfx('tick');}},
 {id:'71-18',s:'N',t:'강의 정리의 시험 포인트입니다. 진행성 핵상마비는 파킨슨병과 비슷하지만 떨림 없이 경직이 관찰된다고 제시되어 있습니다. 의사소통 능력은 비교적 유지될 수 있다고 정리합니다.',do(){sfx('pop');}},
 {id:'71-19',s:'N',t:'치매 평가는 한 가지 점수로 끝나지 않습니다. K-MMSE는 지남력과 기억, 주의·계산, 언어와 구성 능력을 간단히 살펴보는 선별 도구입니다. 기억은 등록과 지연회상, 단어 유창성 과제 등을 포함해 추가로 살핍니다.',do(){on('#e7eval');zoom(800,380,1.08,800);sfx('whoosh');}},
 {id:'71-20',s:'N',t:'CDR은 기억과 지남력, 판단, 사회·가정생활, 자기관리 등을 종합해 0부터 3까지 단계화하며 0.5는 의심 단계입니다. CDR 3은 중증 단계로, 일상 전반에서 지속적인 도움과 안전·의사소통 지원이 필요할 수 있습니다. GDS는 전반적 퇴화를 7단계로 정리합니다.',do(){zoomOut(650);sfx('tick');}},
 {id:'71-21',s:'N',t:'환자와 가족 면담, 감각과 인지, 언어·말·삼킴, 일상 기능을 함께 평가하고 시간에 따른 변화를 추적합니다. 치매 유형에 따라 성격과 감정의 변화도 확인합니다.',do(){sfx('tick');}},
 {id:'71-22',s:'N',t:'ICF 관점에서는 신체 기능만이 아니라 활동과 참여, 환경 요인을 함께 봅니다. 목표는 점수만 높이는 것이 아니라 환자가 실제 생활에서 원하는 의사소통을 이어 가도록 돕는 것입니다.',do(){on('#e7icf');sfx('whoosh');}},
 {id:'71-23',s:'N',t:'기억 수첩, 사진과 글자 단서는 익숙한 사람의 이름이나 일과를 기억하고 요구를 표현하도록 도울 수 있습니다. 단서의 내용은 개인에게 익숙하고 실제로 쓰이는 정보여야 합니다.',do(){on('#e7direct');sfx('pop');}},
 {id:'71-24',s:'N',t:'간격회상 훈련은 간병인 이름이나 약속 같은 기능 정보를 점차 긴 간격으로 회상합니다. 현실지남력은 상황 단서를 반복하고, 몬테소리 기반 중재는 구조화된 활동과 참여를 촉진합니다.',do(){sfx('tick');}},
 {id:'71-25',s:'N',t:'인정요법은 환자의 감정을 공감적으로 듣고 확인하며, 기억이 틀렸다고 논박하거나 억지로 고치게 하지 않는 접근입니다. 환자의 안전과 정서적 안정을 우선합니다.',do(){sfx('tick');}},
 {id:'71-26',s:'N',t:'FOCUSED는 보호자 대화 전략입니다. 시선을 맞추고, 핵심어를 반복하고, 주제를 유지하며, 단어 찾기를 돕고, 선택지를 구조화하고, 짧고 직접적으로 말합니다.',do(){on('#e7indirect');sfx('pop');}},
 {id:'71-27',s:'N',t:'SimPres는 가족의 친숙한 목소리와 긍정적 과거 기억을 녹음해 정서적 반응을 돕는 접근입니다. 보호자 교육과 환경 조정은 직접치료와 함께 적용합니다.',do(){sfx('tick');}},
 {id:'71-28',s:'N',t:'마지막으로 가성치매를 봅니다. 우울증과 연관된 인지 저하는 치매처럼 보일 수 있고, 우울·불면·식욕·의욕 변화가 인지 호소보다 먼저 나타나기도 합니다.',do(){on('#e7pseudo');sfx('whoosh');}},
 {id:'71-29',s:'N',t:'가성치매에서는 기억 저하를 크게 걱정하며 모르겠다고 답할 수 있고, 우울증 치료 후 인지 기능이 호전되기도 합니다. 그러나 치매와 우울증은 함께 올 수 있으므로 반드시 전문적으로 감별합니다.',do(){sfx('tick');}},
 {id:'71-30',s:'N',t:'핵심을 정리합니다. 알츠하이머병은 서서히 진행하는 최근 기억 저하, 혈관성은 병소별 변화와 처리속도·집행기능 저하, FTD와 PPA는 행동 또는 언어 중심 변화가 단서입니다.',do(){on('#e7sum');W.lesion(null);W.hideRight(false);W.show({brain:false});sfx('ding');},gap:2000},
 ...quizSteps('q7_0',Q7[0],()=>on('#e7sum',false)),
 ...quizSteps('q7_1',Q7[1],()=>on('#q7_0',false)),
 ...quizSteps('q7_2',Q7[2],()=>on('#q7_1',false)),
 ...quizSteps('q7_3',Q7[3],()=>on('#q7_2',false)),
 ...quizSteps('q7_4',Q7[4],()=>on('#q7_3',false)),
 {id:'71-31',s:'N',t:'수고하셨습니다. 다음 편에서는 우뇌손상과 외상성 뇌손상의 인지·의사소통 특성을 살펴보겠습니다.',do(){on('#q7_4',false);W.show({brain:true});W.view('front3q',0);W.spin(0.18);W.lesion(null);}}
]});
const _e7clip=CLIPS[CLIPS.length-1];
_e7clip.steps.forEach(st=>{const orig=st.do; st.do=function(S){ const before=[...document.querySelectorAll('.e7card.on')]; if(orig) orig(S); const after=[...document.querySelectorAll('.e7card.on')]; if(after.some(el=>!before.includes(el))) before.forEach(el=>el.classList.remove('on')); };});
})();
