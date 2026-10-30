/* ================================================================
   EP 4 · 마비말장애 (dysarthria)
   참고: 신경언어장애 정리(4. 마비말장애) · 특강 Part 1 (p90–240)
   3D: 자체 운동경로 그룹 'e4mp' (피질척수로 · 피질연수로 · 뇌신경핵 · LMN · 근육)
   ================================================================ */
(()=>{
/* ---------------- 확인 문제 ---------------- */
const Q41=[
 {sec:9,q:'경직형 마비말장애와 가장 핵심적으로 관련되는 병소는?',opts:['일측 LMN 손상','양측 UMN 손상','소뇌 손상','흑질 도파민 저하','말초 감각신경 손상'],ans:1,say:'경직형 마비말장애와 핵심적으로 관련되는 병소는 무엇일까요?',ex:'정답은 2번, 양측 상부운동신경원 손상입니다. 일측 손상은 상대적으로 경미한 일측 상부운동신경형으로 분류합니다.'},
 {sec:8,q:'근육을 직접 지배하는 최종공통경로이며, 손상 시 이완형 마비말장애가 나타나는 신경원은?',opts:['상부운동신경원','하부운동신경원','감각신경원','연합신경원','자율신경원'],ans:1,ex:'정답은 2번, 하부운동신경원입니다. LMN은 뇌신경·척수신경을 통해 근육에 운동 명령을 전달하는 최종공통경로입니다.'},
 {sec:8,q:'부정확한 자음, 쥐어짜는 음성, 느리고 단조로운 말이 두드러지는 유형은?',opts:['이완형','경직형','과소운동형','실조형','과다운동형'],ans:1,ex:'정답은 2번, 경직형입니다. 양측 UMN 손상으로 경직과 움직임 저하가 생겨 말이 느리고 힘겨워집니다.'},
 {sec:8,q:'기저핵의 도파민 저하, 작은 음성, 빠른 말속도 및 말뭉침과 관련되는 유형은?',opts:['과소운동형','과다운동형','실조형','이완형','일측 UMN형'],ans:0,ex:'정답은 1번, 과소운동형입니다. 파킨슨병에서 흔하며 음성 크기 감소와 가속·말뭉침이 대표적입니다.'},
 {sec:8,q:'불규칙한 조음 붕괴와 과균등 강세가 두드러지는 유형은?',opts:['경직형','이완형','실조형','과소운동형','과다운동형'],ans:2,ex:'정답은 3번, 실조형입니다. 소뇌 및 연결회로의 협응 저하로 말의 시간·강도·음도 변이가 커집니다.'},
 {sec:8,q:'하부운동신경원(LMN) 손상의 징후가 아닌 것은?',opts:['근위축','섬유속성 연축','반사 저하','바빈스키 반사','근긴장 저하'],ans:3,say:'하부운동신경원 손상의 징후가 아닌 것은 무엇일까요?',ex:'정답은 4번, 바빈스키 반사입니다. 병적반사는 상부운동신경원 손상의 징후이고, 근위축·섬유속성 연축·반사 저하·근긴장 저하는 하부운동신경원 손상의 징후입니다.'},
];
const Q42=[
 {sec:9,q:'길항반복운동검사에서 AMR은 무엇을 평가하는가?',opts:['서로 다른 음절을 연속 반복하는 능력','한 음절을 빠르고 반복적으로 산출하는 능력','최대발성시간','비강 기류','문장 이해'],ans:1,ex:'정답은 2번입니다. AMR은 퍼, 터, 커처럼 한 음절을 반복하는 교대운동속도이고, 파터커처럼 음절을 바꾸어 연속 산출하는 것은 SMR입니다.'},
 {sec:8,q:'성대 내전이 부족해 기식성 음성이 나타나는 환자에게 사용할 수 있는 발성 접근은?',opts:['부드러운 발성 시작만 시행','노력폐쇄·강한 성문 접촉 등 내전 강화','말속도만 빠르게 하기','혀 뒤쪽 낮추기','구강개방 접근만 시행'],ans:1,ex:'정답은 2번입니다. 과소내전에는 노력폐쇄, 숨 참기, 강한 성문 접촉 등의 접근을 고려하고, 의료적 평가와 협력도 필요합니다.'},
 {sec:8,q:'이완형 마비말장애에서 과대비성과 기식성 음성이 함께 나타날 때 특히 평가할 구조는?',opts:['소뇌','연구개·후두 및 미주신경 기능','시각피질','기저핵','각회'],ans:1,ex:'정답은 2번, 연구개와 후두 및 미주신경 기능입니다. 연인두 폐쇄와 성대 움직임을 살펴봅니다.'},
 {sec:8,q:'경직형+이완형 소견이 함께 보이는 대표적 혼합형 원인 질환은?',opts:['파킨슨병','근위축성 측삭경화증(ALS)','헌팅턴병','길랑-바레 증후군','본태떨림'],ans:1,ex:'정답은 2번, 근위축성 측삭경화증입니다. UMN과 LMN이 함께 침범되어 경직형과 이완형 특징이 혼합될 수 있습니다.'},
 {sec:8,q:'말산출 평가에서 /퍼터커/를 연속 산출하게 하는 검사는?',opts:['AMR','SMR','최대발성시간','비강누출 검사','문맥발화'],ans:1,ex:'정답은 2번, SMR입니다. 서로 다른 음절을 순서대로 이어 반복하는 일련운동속도 검사입니다.'},
 {sec:8,q:'말속도 조절판이 특히 효과적인 마비말장애 유형은?',opts:['이완형','경직형','과소운동형','일측 UMN형','과다운동형'],ans:2,ex:'정답은 3번, 과소운동형입니다. 빠른 말속도 때문에 명료도가 떨어지면 말속도를 늦추는 것이 치료의 초점이 되며, 실조형에도 도움이 될 수 있습니다.'},
];

/* ---------------- 유형 프로필 (메인 정리 4-1 + 특강 p101–188) ---------------- */
const SYS=['호흡','발성','공명','조음','운율'];
const TY={
 uumn:{name:'일측 상부운동신경형',en:'UUMN',les:'한쪽 UMN (피질연수로)',mech:'반대쪽 아래 얼굴·혀·입술의 약화. 나머지 뇌신경 핵은 양측 지배로 보완되어 대개 경도~중등도입니다.',
  s:['거의 손상 없음','거친 음질(약 39%) · 음량 감소','경도 과대비성(약 11%)','부정확한 자음(95%) · 느린 AMR(72%)','대체로 보존 · 느린 말속도 가능'],cause:'일측 뇌졸중 등 · 혀 내밀기 시 약한 쪽으로 기울어짐 · 수 주 내 회복 많음'},
 sp:{name:'경직형',en:'Spastic',les:'양측 UMN (추체로·추체외로)',mech:'억제 조절이 사라져 경직·느린 움직임·운동범위 감소·과다반사·병적반사가 나타납니다.',
  s:['상대적으로 덜 두드러짐','거친·쥐어짜는 음성 · 낮은 음도','과대비성 가능 (비강누출은 드묾)','부정확한 자음 · 모음 왜곡','느린 말속도 · 단조로운 음도·음량 · 짧은 구'],cause:'양측 뇌졸중 · 외상성 뇌손상 · 다발성 경화증 · 뇌종양 · 뇌성마비'},
 fl:{name:'이완형',en:'Flaccid',les:'LMN (뇌신경 핵 · 신경 · 신경근 접합부)',mech:'최종공통경로가 약해져 근긴장 저하·약화·위축·섬유속성 연축·반사 저하가 나타납니다.',
  s:['호흡근 약화 시 짧은 구 · 음량 감소','기식성·쉰 음성 · 가청 흡기','과대비성(가장 두드러짐) · 비강누출','부정확한 자음 (손상 신경에 따라)','단조로운 음도·음량 · 짧은 구'],cause:'연수 뇌졸중 · 중증 근무력증 · 길랑-바레 증후군 · 말초신경 손상 · ALS'},
 ata:{name:'실조형',en:'Ataxic',les:'소뇌 · 소뇌 조절회로',mech:'근육 수축의 힘과 타이밍을 맞추는 협응이 무너져 변이성이 커집니다.',
  s:['주요 문제 아님','거친 음질 · 단조로운 음도·음량','주요 문제 아님','불규칙 조음 붕괴 · 부정확한 자음 · 모음 왜곡','과균등 강세 · 음소·간격 연장 · 느린 말속도'],cause:'소뇌 변성 · 다발성 경화증 · 알코올성 소뇌병증 · 종양 · 외상 / 운동실조 · 의도성 떨림'},
 hypo:{name:'과소운동형',en:'Hypokinetic',les:'기저핵 (흑질 도파민 저하)',mech:'직접경로 활성 감소, 간접경로 과활성 → 움직임의 시작·크기가 줄어듭니다.',
  s:['얕고 빠른 호흡 · 호흡량 감소','작은 음성 · 기식성·거친 음성 · 낮은 음도','대체로 정상 (과대비성 드묾)','부정확한 자음 (목표 미도달) · 음소 반복','단조로운 음도 · 강세 감소 · 빠른 말속도·말뭉침 · 부적절한 쉼 · 동어반복증'],cause:'파킨슨병 (안정 시 떨림 · 강직 · 서동 · 자세 불안정) · 파킨슨증후군'},
 hyper:{name:'과다운동형',en:'Hyperkinetic',les:'기저핵 (선조체)',mech:'불필요한 운동을 억제하지 못해 불수의 운동이 말산출에 끼어듭니다.',
  s:['불수의운동으로 예측하기 어려운 호흡','갑작스러운 음도·강도 변화 · 발성 중단','과대비성 가능','부정확한 자음 · 모음 왜곡 · 불규칙 조음 붕괴','간격 연장 · 가변적 말속도 · 부적절한 쉼'],cause:'헌팅턴병(무도병) · 근긴장이상 · 본태떨림 · 뚜렛 증후군 · 틱장애'},
 mix:{name:'혼합형',en:'Mixed',les:'두 군데 이상 병변',mech:'ALS = 경직 + 이완 (UMN + LMN) · 다발성 경화증 = 경직 + 실조 (UMN + 소뇌)',
  s:['폐활량 감소 · 호흡 속도 증가','거친·낮은·억압된·기식화된 음성 · 소음 섞인 흡기','과대비성 · 비성 방출','부정확한 자음 · 모음 왜곡','느린 말속도 · 단음도·단강도 · 짧은 구 · 과도하거나 동일한 강세'],cause:'근위축성 측삭경화증(ALS) · 다발성 경화증(MS) · 외상성 뇌손상'},
};

/* ---------------- 패널 HTML ---------------- */
function card4(id,title,sub,items,o={}){
 const rows=items.map((x,i)=>'<div class="e4row"><i>'+String(i+1).padStart(2,'0')+'</i><span>'+x+'</span></div>').join('');
 return '<div class="e4panel glass'+(o.sm?' sm':'')+'" id="'+id+'"><div class="e4eyebrow">'+(o.tag||'핵심 정리')+'</div><h2>'+title+'</h2>'+(sub?'<div class="e4sub">'+sub+'</div>':'')+'<div class="e4rows">'+rows+'</div></div>';
}
function bulbarHTML(){ return '<div class="e4panel glass e4big e4bul" id="e4panel"><div id="e4bul"></div><div class="e4eyebrow">감별 포인트 · 경직형 vs 이완형</div><h2>연수마비 vs 가성연수마비</h2>'+
 '<div class="e4bulx"><div class="e4bulL">'+
 '<div class="e4row"><i>음질</i><span>경직형 <b>쥐어짜는·거친 음성</b> / 이완형 <b>기식성 음성</b></span></div>'+
 '<div class="e4row"><i>공명</i><span>경직형 과대비성(비강누출 드묾) / 이완형 과대비성 + <b>비강누출</b></span></div>'+
 '<div class="e4row"><i>구강반사</i><span>경직형 <b>과다</b> / 이완형 <b>감소·소멸</b> (구토반사)</span></div>'+
 '<div class="e4bulbox"><b>연수(延髓) = 숨뇌, medulla</b> · 뇌간 맨 아래, IX·X·XI·XII 뇌신경 운동핵이 있는 곳</div>'+
 '<div class="e4row b1"><i>연수마비</i><span><b>“진짜” = 진성 연수마비</b> · 연수의 <b>뇌신경 운동핵이나 뇌신경 자체(LMN)</b>가 손상 → 근육으로 가는 마지막 길이 끊김 → <b>이완형</b> (위축·섬유속성 연축·반사 소실)</span></div>'+
 '<div class="e4row b2"><i>가성연수마비</i><span>연수는 멀쩡하고, 그 위에서 내려오는 <b>양측 피질연수로(UMN)</b>가 손상 → 증상만 연수마비처럼 보임(가성=거짓) → <b>경직형</b> (과다반사·가성구감정·침흘림)</span></div>'+
 '</div><svg class="e4bulsvg" viewBox="0 0 300 470"><text x="150" y="26" class="t">대뇌 운동피질</text><rect x="60" y="36" width="180" height="40" rx="14" class="cx"/><path d="M110 76 V250 M190 76 V250" class="umn"/><text x="8" y="112" class="t s l">피질연수로</text><text x="8" y="128" class="t s l">(UMN)</text><g class="x2"><path d="M96 140 l28 28 M124 140 l-28 28 M176 140 l28 28 M204 140 l-28 28"/><text x="200" y="160" class="t r l">가성연수마비</text></g><rect x="70" y="250" width="160" height="62" rx="18" class="md"/><text x="150" y="278" class="t">연수 (숨뇌)</text><text x="150" y="298" class="t s">IX·X·XII 운동핵</text><path d="M150 312 V412" class="lmn"/><text x="174" y="372" class="t s l">뇌신경 (LMN)</text><g class="x1"><path d="M136 336 l28 28 M164 336 l-28 28"/><text x="150" y="330" class="t r" text-anchor="middle"></text></g><text x="150" y="440" class="t">혀 · 인두 · 후두 근육</text><text x="40" y="365" class="t r l1">연수마비</text></svg></div></div>'; }
function profHTML(k){ const t=TY[k];
 return '<div class="e4panel glass e4prof" id="e4panel"><div class="e4eyebrow">유형 프로필 · 말산출 하위체계</div><h2>'+t.name+' <small>'+t.en+'</small></h2><div class="e4badge">병소 · '+t.les+'</div><div class="e4sub">'+t.mech+'</div>'+
  '<div class="e4sys">'+SYS.map((s,i)=>'<b>'+s+'</b><span>'+t.s[i]+'</span>').join('')+'</div><div class="e4foot"><b>원인·단서</b>'+t.cause+'</div></div>';
}
const CMP=[['근긴장','증가 · <b>경직</b>','저하 · <b>이완</b>'],['반사','<b>과다반사</b> · 구강 반사 과다','<b>반사 저하·소실</b> · 구토반사 감소'],['병적반사','있음 · 바빈스키 · 턱반사','없음'],['근위축','거의 없음 (불용성 위축 정도)','<b>뚜렷한 위축</b>'],['섬유속성 연축','없음','<b>있음</b>'],['마비말장애','경직형(양측) · 일측 UMN형(한쪽)','이완형']];
function cmpHTML(){ return '<div class="e4panel glass e4cmp" id="e4panel"><div class="e4eyebrow">UMN vs LMN · 손상 징후</div><h2>어디가 손상되었나?</h2><table class="e4t"><tr><th></th><th class="u">UMN 손상</th><th class="l">LMN 손상</th></tr>'+CMP.map(r=>'<tr><td>'+r[0]+'</td><td class="u">'+r[1]+'</td><td class="l">'+r[2]+'</td></tr>').join('')+'</table></div>'; }
const CMP6=[['일측 UMN','한쪽 UMN','부정확한 자음 · 비교적 경미','반대쪽 아래 얼굴·혀'],['경직형','양측 UMN','쥐어짜는 음성 · 느린 말 · 단조로움','가성구감정 · 과다반사'],['이완형','LMN','과대비성 · 비강누출 · 기식성','위축 · 섬유속성 연축'],['실조형','소뇌','불규칙 조음 붕괴 · 과균등 강세','단속성 말 · 의도성 떨림'],['과소운동형','기저핵(흑질)','작은 음성 · 빠른 말속도 · 말뭉침','파킨슨병 · 동어반복증'],['과다운동형','기저핵(선조체)','가변적 말속도 · 간격 연장','불수의 운동 관찰'],['혼합형','두 곳 이상','유형 특징이 섞임','ALS · 다발성 경화증']];
function tbl6HTML(){ return '<div class="e4panel glass e4wide" id="e4panel"><div class="e4eyebrow">한눈에 비교 · 병소 → 말 특징</div><h2>마비말장애 유형 비교</h2><table class="e4t e4t6"><tr><th>유형</th><th>병소</th><th>대표 말 특징</th><th>단서</th></tr>'+CMP6.map(r=>'<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>').join('')+'</table></div>'; }
const DDK=[['경직형','느리고 부정확','느리고 단조로움'],['이완형','느리고 부정확','매우 느리고 부정확'],['과소운동형','빠르며 부정확','빠르지만 작은 움직임 · 부정확'],['과다운동형','불규칙하고 부정확','불규칙 · 속도가 일정하지 않음'],['실조형','불규칙하고 부정확','부정확한 리듬 · 속도 변동'],['혼합형','매우 느리고 복잡한 운동 조정이 어려움','느리고 부정확']];
function ddkHTML(){ return '<div class="e4panel glass e4wide" id="e4panel"><div class="e4eyebrow">유형별 길항반복운동 양상 · 국시 빈출</div><h2>SMR · AMR 패턴</h2><table class="e4t e4t6"><tr><th>유형</th><th>SMR · /퍼터커/</th><th>AMR · /퍼퍼퍼/ /터터터/</th></tr>'+DDK.map(r=>'<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>').join('')+'</table></div>'; }
function mptHTML(){ return '<div class="e4panel glass e4mpt" id="e4panel"><div class="e4eyebrow">호흡 · 발성 평가 · 모음 연장</div><h2>최대발성시간 <small>MPT · 최대한 들이쉰 뒤 /아/를 한 호기에 길게</small></h2>'+
  '<div class="mbar"><div class="fill"></div><i style="left:30%"></i><i style="left:90%"></i><em style="left:30%">4~5초</em><em style="left:90%">15초</em></div>'+
  '<div class="e4rows"><div class="e4row"><i>정상</i><span>정상 성인은 <b>15초 이상</b> /아/ 연장 가능</span></div><div class="e4row"><i>최소</i><span>정상 강도로 <b>4~5초</b> 유지 → 말에 필요한 최소한의 호흡 기능</span></div><div class="e4row"><i>반복</i><span>한 호흡에 CV 음절 <b>5~6회</b> 반복 → 최소 호흡 기능 (정상 15~20개)</span></div><div class="e4row"><i>물불기</i><span>물 10cm · 빨대 5cm 깊이 · <b>5초 이상</b> 불면 대부분의 말에 충분한 압력</span></div><div class="e4row"><i>기침</i><span>세게 기침하지 못하면 성문하압·호흡 능력 저하 시사</span></div></div></div>'; }
function chipsHTML(){ const C=[['/퍼/','입술 폐쇄','VII 안면신경','#FF9DB8'],['/터/','혀 앞부분 거상','XII 설하신경','#FFD25E'],['/커/','혀 뒷부분 거상','XII 설하신경','#7CF0B0'],['/퍼터커/','입술·혀의 협응','SMR','#8FCBFF']];
 return '<div class="e4panel glass sm e4chips" id="e4panel"><div class="e4eyebrow">조음 평가 · 교호운동</div><h2>무엇을 보나?</h2><div class="cg">'+C.map(c=>'<div class="ch" style="--c:'+c[3]+'"><b>'+c[0]+'</b><span>'+c[1]+'</span><small>'+c[2]+'</small></div>').join('')+'</div><div class="e4sub" style="margin-top:12px">속도 · 정확성 · 규칙성을 측정 (초시계 · MSP · Praat)</div></div>'; }

/* ---------------- 3D 운동경로 그룹 ---------------- */
const PALE='#FFF3C4';
let E4=null;
const LP={ // 병소 위치 [x,y,z], 감지 반경
 icL:{p:[-0.205,-0.01,-0.045],r:0.075,s:1.3}, icR:{p:[0.205,-0.01,-0.045],r:0.075,s:1.3},
 nAL:{p:[-0.075,-0.84,0.185],r:0.03}, nAR:{p:[0.075,-0.84,0.185],r:0.03}, nXL:{p:[-0.03,-0.9,0.245],r:0.03}, nXR:{p:[0.03,-0.9,0.245],r:0.03},
 vVIIL:{p:[-0.4,-0.755,-0.02],r:0.04}, vXIIL:{p:[-0.2,-1.0,-0.12],r:0.04}, vXL:{p:[-0.32,-1.0,0.14],r:0.04},
 jLip:{p:[-0.545,-0.905,-0.33],r:0.05}, jLipR:{p:[0.545,-0.905,-0.33],r:0.05}, jTon:{p:[-0.3,-1.03,-0.335],r:0.05}, jTonR:{p:[0.3,-1.03,-0.335],r:0.05}, jLar:{p:[-0.4,-1.15,0.0],r:0.05}, jLarR:{p:[0.4,-1.15,0.0],r:0.05},
 ahcL:{p:[-0.035,-1.78,0.18],r:0.03}, ahcR:{p:[0.035,-1.78,0.18],r:0.03},
 cbl:{p:[0,-0.62,0.62],r:0,s:2.4,nocut:1}, ngL:{p:[-0.07,-0.3,0.12],r:0,nocut:1,s:0.9}, ngR:{p:[0.07,-0.3,0.12],r:0,nocut:1,s:0.9},
 stL:{p:[-0.3,-0.02,-0.18],r:0,nocut:1,s:1.6}, stR:{p:[0.3,-0.02,-0.18],r:0,nocut:1,s:1.6},
};
const MODES={
 normal:{}, umn:{}, lmn:{},
 uumn:{les:['icL']},
 sp:{les:['icL','icR'],tense:1},
 fl_nuc:{les:['nAL','nAR','nXL','nXR'],atrophy:1},
 fl_nerve:{les:['vVIIL','vXIIL','vXL'],atrophy:1},
 fl_nmj:{les:['jLip','jLipR','jTon','jTonR','jLar','jLarR']},
 lmnAll:{les:['nAL','nAR','nXL','nXR','ahcL','ahcR'],atrophy:1},
 ata:{les:['cbl'],irr:1,color:'#FF9F6B'},
 hypo:{les:['ngL','ngR'],small:1,P:1.7,color:'#C39BFF'},
 hyper:{les:['stL','stR'],extra:1,color:'#FF7DB8'},
 als:{les:['icL','icR','nAL','nAR','nXL','nXR','ahcL','ahcR'],tense:1,atrophy:1},
 ms:{les:['icL','icR','cbl'],tense:1,irr:1},
};
function e4Build(){
 if(E4) return E4;
 const T=THREE, V=(x,y,z)=>new T.Vector3(x,y,z), g=new T.Group(); g.name='e4mp'; W.addGroup('e4mp',g);
 const tubes=[], parts={};
 const reg=(name,obj)=>{ (parts[name]=parts[name]||[]).push(obj); };
 const mkT=(o,pts,r,color,part)=>{ const m=W.tube(pts,r,color,{seg:Math.max(70,pts.length*26),rs:8,mat:{roughness:0.4}}); g.add(m); reg(part,m);
  const t=Object.assign({curve:m.userData.curve,mesh:m,part,cut:null,weak:false,tense:false},o); t.samp=[]; for(let i=0;i<=80;i++) t.samp.push(t.curve.getPointAt(i/80)); tubes.push(t); return t; };
 const ball=(pos,sc,color,part)=>{ const m=new T.Mesh(new T.SphereGeometry(1,24,18), W.stdMat(color,{roughness:0.45})); m.position.copy(pos); m.scale.set(...sc); g.add(m); reg(part,m); return m; };
 const fL=W.lp('G_precentral',{umax:0.2},[0.24,0.12]).p, fR=W.lpR('G_precentral',{umax:0.2},[0.24,0.12]).p;
 const hL=W.lp('G_precentral',{umin:0.3,umax:0.55},[0.2,0.3]).p, hR=W.lpR('G_precentral',{umin:0.3,umax:0.55},[0.2,0.3]).p;
 const face={'-1':V(fL.x*0.86,fL.y-0.01,fL.z), '1':V(fR.x*0.86,fR.y-0.01,fR.z)}, hand={'-1':V(hL.x*0.88,hL.y-0.02,hL.z), '1':V(hR.x*0.88,hR.y-0.02,hR.z)};
 /* 뇌신경 운동핵 (s=-1 왼쪽, +1 오른쪽) */
 const NU={V:[0.1,-0.54,0.2,'#FFF0B8'], VIIu:[0.095,-0.652,0.17,'#CFE6FF'], VIIl:[0.095,-0.702,0.165,'#FFE070'], A:[0.075,-0.84,0.185,'#FFF0B8'], XII:[0.03,-0.9,0.245,'#FFE070']};
 const nuc={}; [-1,1].forEach(s=>Object.entries(NU).forEach(([k,[x,y,z,c]])=>{ nuc[k+s]=ball(V(s*x,y,z),[0.022,0.022,0.022],c,(k==='VIIl'||k==='XII')?'e4nucX':'e4nuc'); }));
 const ahc={}; [-1,1].forEach(s=>{ ahc[s]=ball(V(s*0.035,-1.78,0.18),[0.024,0.024,0.024],'#FFF0B8','e4ahc'); });
 /* 피질척수로: s쪽 대뇌 → 추체 교차 → 반대쪽 척수 전각 */
 [-1,1].forEach(s=>{ const yx=s<0?-1.0:-1.045; const up=[hand[s], V(s*0.4,0.24,-0.06), V(s*0.22,0.0,0.0), V(s*0.13,-0.17,0.04), V(s*0.09,-0.31,0.05), V(s*0.075,-0.48,-0.05), V(s*0.065,-0.64,-0.04), V(s*0.045,-0.82,0.07)];
  mkT({kind:'umn',sub:'cst',hemi:s,to:'ahc'+(-s)}, up.concat([V(s*0.03,-0.95,0.09), V(0,yx,0.13), V(-s*0.035,yx-0.065,0.18), V(-s*0.056,-1.2,0.235), V(-s*0.057,-1.5,0.245), V(-s*0.052,-1.7,0.235), V(-s*0.035,-1.78,0.18)]), 0.015, '#FFC94A', 'e4cst');
  mkT({kind:'umn',sub:'cstU',hemi:s,to:'ahc'+s}, up.concat([V(s*0.035,-0.95,0.08), V(s*0.024,-1.15,0.13), V(s*0.022,-1.5,0.15), V(s*0.03,-1.74,0.17), V(s*0.035,-1.78,0.18)]), 0.006, '#FFC94A', 'e4cst');
 });
 /* 피질연수로: s쪽 대뇌 → 양쪽(또는 반대쪽만) 뇌신경 운동핵 */
 const INN={V:'both',VIIu:'both',VIIl:'contra',A:'both',XII:'contra'};
 [-1,1].forEach(s=>{ const trunk=[face[s], V(s*0.45,0.05,-0.15), V(s*0.19,-0.01,-0.09), V(s*0.12,-0.18,-0.02), V(s*0.06,-0.32,0.03), V(s*0.05,-0.44,-0.02)];
  Object.keys(NU).forEach((k,ki)=>{ [s,-s].forEach(n=>{ if(INN[k]==='contra' && n===s) return; const [x,y,z]=NU[k]; const P=V(n*x,y,z); let pts=trunk.slice(); if(!(k==='V'||k==='VIIu'||k==='VIIl')) pts=pts.concat([V(s*0.048,-0.6,-0.02), V(s*0.04,-0.74,0.07)]);
    const last=pts[pts.length-1], zm=(last.z+z)/2;
    if(n===s) pts=pts.concat([V(s*0.075,y+0.03,zm), P]); else pts=pts.concat([V(s*0.012,y+0.03+ki*0.002,zm), V(n*0.05,y+0.008,z-0.03), P]);
    const contraOnly=INN[k]==='contra';
    mkT({kind:'umn',sub:'cbt',hemi:s,to:k+n,nk:k}, pts, contraOnly?0.0105:0.009, s<0?'#FF9F43':'#B69CFF', contraOnly?'e4cbtX':(s<0?'e4cbtL':'e4cbtR'));
  }); }); });
 /* 근육 */
 const mus={}; const MU={jaw:[0.6,-0.5,-0.44,0.075,0.05,0.05],fore:[0.62,-0.52,-0.4,0.07,0.035,0.045],lip:[0.55,-0.95,-0.4,0.075,0.035,0.05],lar:[0.42,-1.22,-0.06,0.06,0.06,0.05],ton:[0.32,-1.06,-0.42,0.08,0.035,0.06],arm:[1.08,-2.13,0.05,0.17,0.065,0.07]};
 [-1,1].forEach(s=>Object.entries(MU).forEach(([k,[x,y,z,a,b,c]])=>{ const m=ball(V(s*x,y,z),[a,b,c],'#E86A6A','e4mus'); m.userData={base:V(a,b,c),pos:m.position.clone(),bump:0,state:'ok',col:new T.Color('#E86A6A')}; if(k==='arm') m.rotation.z=s*0.35; mus[k+s]=m; }));
 /* LMN: 뇌신경 · 척수신경 */
 const LM={V:['jaw',(n)=>[V(n*0.17,-0.535,0.13),V(n*0.22,-0.53,0.08),V(n*0.42,-0.52,-0.12),V(n*0.555,-0.505,-0.36)]],
  VIIu:['fore',(n)=>[V(n*0.14,-0.69,0.15),V(n*0.18,-0.715,0.1),V(n*0.4,-0.745,-0.02),V(n*0.55,-0.64,-0.22),V(n*0.6,-0.55,-0.34)]],
  VIIl:['lip',(n)=>[V(n*0.14,-0.71,0.15),V(n*0.18,-0.725,0.1),V(n*0.4,-0.765,-0.02),V(n*0.52,-0.86,-0.22),V(n*0.545,-0.915,-0.33)]],
  A:['lar',(n)=>[V(n*0.11,-0.87,0.22),V(n*0.16,-0.9,0.2),V(n*0.32,-1.0,0.14),V(n*0.4,-1.15,0.0)]],
  XII:['ton',(n)=>[V(n*0.05,-0.92,0.16),V(n*0.07,-0.945,0.06),V(n*0.2,-1.0,-0.12),V(n*0.3,-1.03,-0.335)]]};
 [-1,1].forEach(n=>Object.entries(LM).forEach(([k,[mk,f]])=>{ const [x,y,z]=NU[k]; mkT({kind:'lmn',from:k+n,mus:mus[mk+n],side:n}, [V(n*x,y,z)].concat(f(n)), 0.011, '#5FD3F0', 'e4lmnC'); }));
 [-1,1].forEach(n=>{ mkT({kind:'lmn',from:'ahc'+n,mus:mus['arm'+n],side:n,spinal:1}, [V(n*0.035,-1.78,0.18),V(n*0.09,-1.81,0.165),V(n*0.3,-1.88,0.14),V(n*0.65,-1.98,0.1),V(n*0.96,-2.09,0.06)], 0.014, '#5FD3F0', 'e4lmnS'); });
 /* 신경근 접합부 표시 (작은 원판) */
 tubes.filter(t=>t.kind==='lmn').forEach(t=>{ const e=t.samp[80], d=t.samp[80].clone().sub(t.samp[76]).normalize(); const r=new T.Mesh(new T.TorusGeometry(t.spinal?0.03:0.022,0.006,8,24), W.stdMat('#E9FBFF',{roughness:0.3})); r.position.copy(e); r.lookAt(e.clone().add(d)); g.add(r); reg('e4nmj',r); });
 /* 등록 */
 Object.entries(parts).forEach(([k,objs])=>W.regPart(k,objs,objs.map(o=>o.material),1));
 /* 신호 펄스 */
 const sph=new T.SphereGeometry(1,12,10), pul=[];
 tubes.forEach((t,ti)=>{ const pc=t.kind==='lmn'?'#D9F7FF':(t.sub==='cbt'?(t.hemi<0?'#FFE2B0':'#EDE4FF'):PALE); const n=(t.sub==='cstU')?1:2;
  for(let i=0;i<n;i++){ const m=new T.Mesh(sph,new T.MeshBasicMaterial({color:pc,transparent:true,opacity:1,blending:T.AdditiveBlending,depthWrite:false})); m.scale.setScalar(0.02); g.add(m); pul.push({t,m,off:i/n,k:ti*1.37+i,base:new T.Color(pc),r:t.kind==='lmn'?(t.spinal?0.03:0.022):(t.sub==='cstU'?0.014:(t.sub==='cst'?0.028:0.02))}); }
  if(t.kind==='lmn'){ const m=new T.Mesh(sph,new T.MeshBasicMaterial({color:'#FFB3E0',transparent:true,opacity:1,blending:T.AdditiveBlending,depthWrite:false})); m.scale.setScalar(0.02); g.add(m); pul.push({t,m,off:Math.random(),k:ti*2.1,extra:1,base:new T.Color('#FFB3E0'),r:0.024,sp:0.5+Math.random()*0.7}); } });
 /* 병소 표시 */
 const marks=[]; for(let i=0;i<8;i++){ const m=new T.Mesh(sph,new T.MeshBasicMaterial({color:'#FF3B3B',transparent:true,opacity:0.95,depthWrite:false}));
  const h=new T.Mesh(sph,new T.MeshBasicMaterial({color:'#FF3B3B',transparent:true,opacity:0.28,blending:T.AdditiveBlending,depthWrite:false})); h.scale.setScalar(2.1); m.add(h); m.visible=false; m.renderOrder=20; g.add(m); marks.push(m); }
 E4={g,tubes,nuc,ahc,mus,pul,marks,time:0,last:performance.now(),P:2.6,md:{},face,hand};
 /* 3D 라벨 */
 const Lb=(id,tx,p,o)=>L3(id,tx,g,p,o);
 Lb('e4l_ba4','일차운동피질 <small>BA 4</small>',hand[-1],{color:'#FFC94A',dx:120,dy:-50,cls:'big'});
 Lb('e4l_face','얼굴 영역 <small>BA 4 아래쪽</small>',face[-1],{color:'#FF9F43',dx:110,dy:-40});
 Lb('e4l_faceR','얼굴 영역 <small>오른쪽 대뇌</small>',face[1],{color:'#B69CFF',dx:-110,dy:-40});
 Lb('e4l_ic','내포',V(-0.21,0.0,-0.04),{color:'#FFC94A',dx:150,dy:-20,cls:'big'});
 Lb('e4l_ped','대뇌각 <small>중뇌</small>',V(-0.09,-0.31,0.05),{color:'#FFC94A',dx:170,dy:0});
 Lb('e4l_pons','뇌교 앞부분',V(-0.07,-0.56,-0.05),{color:'#FFC94A',dx:180,dy:10});
 Lb('e4l_pyr','연수 추체',V(-0.045,-0.82,0.07),{color:'#FFC94A',dx:180,dy:10,cls:'big'});
 Lb('e4l_dec','추체 교차 <small>80~90% 반대쪽으로</small>',V(0,-1.02,0.13),{color:'#FFE45C',dx:-200,dy:20,cls:'big'});
 Lb('e4l_lcst','외측 피질척수로',V(0.057,-1.42,0.245),{color:'#FFC94A',dx:-170,dy:0});
 Lb('e4l_ahc','척수 전각세포 <small>LMN 시작</small>',V(0.035,-1.78,0.18),{color:'#5FD3F0',dx:-190,dy:30,cls:'big'});
 Lb('e4l_spn','척수신경',V(0.65,-1.98,0.1),{color:'#5FD3F0',dx:20,dy:-60});
 Lb('e4l_arm','근육 <small>팔 · 몸통</small>',V(1.08,-2.13,0.05),{color:'#E86A6A',dx:-40,dy:70});
 Lb('e4l_cbtL','피질연수로 <small>왼쪽 대뇌</small>',V(-0.45,0.05,-0.15),{color:'#FF9F43',dx:110,dy:30,cls:'big'});
 Lb('e4l_cbtR','피질연수로 <small>오른쪽 대뇌</small>',V(0.45,0.05,-0.15),{color:'#B69CFF',dx:-110,dy:30,cls:'big'});
 Lb('e4l_nV','V 삼차 운동핵 <small>양측</small>',V(-0.1,-0.54,0.2),{color:'#FFF0B8',dx:150,dy:-30});
 Lb('e4l_nVIIu','VII 위 얼굴 <small>양측</small>',V(-0.095,-0.652,0.17),{color:'#CFE6FF',dx:160,dy:-10});
 Lb('e4l_nVIIl','VII 아래 얼굴 <small>반대쪽만</small>',V(0.095,-0.702,0.165),{color:'#FFE070',dx:-170,dy:10,cls:'big'});
 Lb('e4l_nA','의문핵 <small>IX · X 양측</small>',V(-0.075,-0.84,0.185),{color:'#FFF0B8',dx:160,dy:20});
 Lb('e4l_nXII','XII 설하신경핵 <small>주로 반대쪽</small>',V(0.03,-0.9,0.245),{color:'#FFE070',dx:-160,dy:40,cls:'big'});
 Lb('e4l_mJaw','턱 <small>V</small>',V(-0.6,-0.5,-0.44),{color:'#E86A6A',dx:70,dy:-30});
 Lb('e4l_mFore','이마 <small>VII</small>',V(-0.62,-0.52,-0.4),{color:'#E86A6A',dx:60,dy:-70});
 Lb('e4l_mLip','입술 <small>VII</small>',V(-0.55,-0.95,-0.4),{color:'#E86A6A',dx:80,dy:10});
 Lb('e4l_mLar','연구개·후두 <small>X</small>',V(-0.42,-1.22,-0.06),{color:'#E86A6A',dx:90,dy:40});
 Lb('e4l_mTon','혀 <small>XII</small>',V(-0.32,-1.06,-0.42),{color:'#E86A6A',dx:60,dy:70});
 Lb('e4l_mLipR','오른쪽 입술',V(0.55,-0.95,-0.4),{color:'#E86A6A',dx:-90,dy:20});
 Lb('e4l_mTonR','오른쪽 혀',V(0.32,-1.06,-0.42),{color:'#E86A6A',dx:-60,dy:70});
 Lb('e4l_nmj','신경근 접합부 <small>아세틸콜린</small>',tubes.find(t=>t.kind==='lmn'&&t.from==='VIIl-1').samp[80],{color:'#E9FBFF',dx:120,dy:50,cls:'big'});
 Lb('e4l_lmnC','LMN · 뇌신경',V(-0.4,-0.745,-0.02),{color:'#5FD3F0',dx:110,dy:-60,cls:'big'});
 Lb('e4l_ep','추체외로 고리 <small>기저핵 · 흑질 · 시상</small>',V(-0.33,-0.05,-0.12),{color:'#C58BFF',dx:150,dy:60,cls:'big'});
 Lb('e4l_cl','소뇌 조절회로',V(-0.36,-0.5,0.58),{color:'#FF9F6B',dx:120,dy:70,cls:'big'});
 ['les0','les1','les2'].forEach(id=>Lb('e4l_'+id,'',V(0,0,0),{color:'#FF5A5A',dx:0,dy:-60,cls:'big'}));
 requestAnimationFrame(e4Tick);
 return E4;
}
function e4Mode(name){ const E=e4Build(), md=MODES[name]||{}; E.md=md; E.P=md.P||2.6; const T=THREE;
 E.marks.forEach((m,i)=>{ const k=md.les&&md.les[i]; m.visible=!!k; if(k){ const L=LP[k]; m.position.set(...L.p); m.userData.s=0.034*(L.s||1); m.material.color.set(md.color||'#FF3B3B'); m.children[0].material.color.set(md.color||'#FF3B3B'); } });
 E.tubes.forEach(t=>{ t.cut=null; t.weak=false; t.tense=false; });
 (md.les||[]).forEach(k=>{ const L=LP[k]; if(L.nocut||!L.r) return; const p=new T.Vector3(...L.p); E.tubes.forEach(t=>{ let b=1e9,bt=0; t.samp.forEach((q,i)=>{ const d=q.distanceTo(p); if(d<b){b=d;bt=i/80;} }); if(b<L.r) t.cut=Math.min(t.cut??1, Math.max(0,bt-0.015)); }); });
 E.tubes.filter(t=>t.kind==='lmn').forEach(t=>{ const ins=E.tubes.filter(u=>u.kind==='umn'&&u.to===t.from); if(ins.length && ins.every(u=>u.cut!=null)){ if(md.tense) t.tense=true; else t.weak=true; } });
 Object.values(E.mus).forEach(m=>{ const lm=E.tubes.filter(t=>t.kind==='lmn'&&t.mus===m); const cut=lm.some(t=>t.cut!=null);
  m.userData.state = cut?(md.atrophy?'atrophy':'weak') : lm.some(t=>t.tense)?'tense' : lm.some(t=>t.weak)?'weak' : 'ok'; });
 if(window.ENGINE&&ENGINE.instant&&ENGINE.instant()) Object.values(E.mus).forEach(m=>e4Mus(m,1,0));
}
const MCOL={ok:'#E86A6A',weak:'#C9A3A3',tense:'#FF6B3D',atrophy:'#8E7C7A'};
function e4Mus(m,k,tm){ const u=m.userData, st=u.state, T=THREE; u.col.set(MCOL[st]||MCOL.ok); m.material.color.lerp(u.col,k); m.material.emissive.lerp(u.col,k);
 const sc=st==='atrophy'?0.55:1, bx=st==='tense'?0.88:1, by=st==='tense'?1.12:1, b=u.bump*(st==='weak'?0.3:1);
 m.scale.set(u.base.x*sc*bx*(1+0.28*b), u.base.y*sc*by*(1-0.12*b), u.base.z*sc*(1+0.1*b));
 m.position.copy(u.pos); if(st==='atrophy'||u.tw>0){ const j=(u.tw>0?0.012:0.004); if(Math.sin(tm*37+u.pos.x*91)>0.6||u.tw>0) m.position.add(new T.Vector3((Math.random()-0.5)*j,(Math.random()-0.5)*j,0)); }
}
function e4Tick(now){ requestAnimationFrame(e4Tick); const E=E4; const dt=Math.min(0.05,(now-E.last)/1000); E.last=now; if(!E.g.visible) return; if(window.ENGINE&&ENGINE.paused&&ENGINE.paused()) return;
 E.time+=dt; const tm=E.time, md=E.md, P=E.P, W_=W.parts;
 E.pul.forEach(p=>{ const t=p.t, m=p.m, pp=W_[t.part], op=pp?pp.cur.op:1; if(op<0.35){ m.visible=false; return; }
  let s, ph=((tm/P)+p.off)%1;
  if(md.irr) ph=((ph+0.09*Math.sin(tm*1.9+p.k*1.7)+0.06*Math.sin(tm*3.7+p.k*0.9))%1+1)%1;
  if(p.extra){ if(!md.extra||t.cut!=null){ m.visible=false; return; } const q=(tm*p.sp+p.off)%1; const gate=Math.sin(tm*1.3+p.k)+Math.sin(tm*2.9+p.k*0.7); if(gate<0.6){ m.visible=false; return; } s=q; }
  else if(t.kind==='lmn'){ if(t.tense){ s=(tm*0.75+p.off)%1; } else { if(ph<0.55){ m.visible=false; return; } s=(ph-0.55)/0.45; } }
  else { if(ph>=0.55){ m.visible=false; return; } s=ph/0.55; }
  let sc=(0.45+0.8*Math.sin(Math.PI*s))*p.r, col=p.base, opv=1;
  if(t.cut!=null){ if(s>t.cut){ m.visible=false; return; } if(t.cut-s<0.07){ col=RED4; sc*=1.5; } }
  if(t.weak){ opv=0.3; sc*=0.6; }
  if(md.small && !p.extra){ sc*=0.55; }
  if(t.tense && t.kind==='lmn'){ col=TENSE4; }
  m.visible=true; m.scale.setScalar(sc); m.material.color.copy(col); m.material.opacity=opv*Math.min(1,op); t.curve.getPointAt(Math.min(1,Math.max(0,s)),m.position);
  if(t.kind==='lmn' && s>0.92 && t.cut==null && t.mus){ const u=t.mus.userData; u.bump=Math.max(u.bump,(t.weak?0.35:1)*(md.small?0.35:1)*(p.extra?1.4:1)); if(p.extra) u.tw=0.25; }
 });
 const k=1-Math.exp(-dt*4);
 Object.values(E.mus).forEach(m=>{ const u=m.userData; u.bump*=Math.exp(-dt*5); if(u.tw>0) u.tw-=dt; const pp=W_['e4mus']; if(pp&&pp.cur.op<0.05) return; e4Mus(m,k,tm); });
 E.marks.forEach((m,i)=>{ if(!m.visible) return; const s=(m.userData.s||0.034)*(1+0.18*Math.sin(tm*4.2+i)); m.scale.setScalar(s); m.children[0].material.opacity=0.22+0.12*Math.sin(tm*4.2+i); });
}
const RED4=new THREE.Color('#FF3B3B'), TENSE4=new THREE.Color('#FF8A5A');

/* ---------------- 장면 도우미 ---------------- */
const CAM4={
 over:[[-1.15,-0.2,-6.7],[0,-0.78,0.1]],
 cortex:[[-1.55,0.45,-3.4],[-0.3,0.12,-0.05]],
 mid:[[-1.0,-0.25,-3.3],[-0.05,-0.42,0.05]],
 stem:[[-0.62,-0.62,-2.15],[0,-0.74,0.13]],
 decus:[[-0.5,-1.02,-1.55],[0,-1.06,0.15]],
 cord:[[-0.4,-1.55,-3.0],[0.3,-1.85,0.1]],
 face:[[-1.2,-0.62,-2.9],[-0.2,-0.78,-0.05]],
 lip:[[-1.15,-0.85,-1.65],[-0.45,-0.88,-0.25]],
 loop:[[-2.7,0.7,-2.0],[-0.12,-0.15,0.22]],
};
function cam4(n,ms=1800){ const c=CAM4[n]; W.cam(c[0],c[1],ms,0); }
const ALLP=['e4cst','e4cbtL','e4cbtR','e4cbtX','e4nuc','e4nucX','e4ahc','e4lmnC','e4lmnS','e4mus','e4nmj'];
function e4Focus(on, dim=0.12){ ALLP.forEach(n=>W.part(n,{op:on.includes(n)?1:dim, em:on.includes(n)?0.45:0})); }
function e4Scene(o={}){ e4Build(); W.show({brain:true,deep:false,cn:false,motor:false,cns:true,e4mp:true}); W.fib('pns',0);
 W.brain({op:o.brain??0.1, lobe:[0,0,0,0], dim:[0,0,0,0]}); W.lesion(null); W.part(['midbrain','pons','medulla','cordTop'],{op:o.stem??0.32,em:0}); W.part('cordLong',{op:0.28,em:0}); W.part('cerebellum',{op:o.cb??0.14,em:0}); W.spin(0); W.shift(o.shift??-200); }
function clear4(){ Array.from(document.querySelectorAll('.e4panel')).forEach(el=>el.remove()); }
function lb4(list){ W.lblAllOff(); if(list&&list.length) W.lbl(list); }
function lesLb(i,txt,key,dx,dy){ if(document.querySelector('#scene.e4-3d-r')){ dx=-40; dy=-Math.abs(dy)-70; } const L=LP[key]; L3('e4l_les'+i,txt,E4.g,new THREE.Vector3(...L.p),{color:'#FF5A5A',dx,dy,cls:'big'}); W.lbl('e4l_les'+i); }
function prepQuiz(){ $('#e4face')?.remove(); clear4(); W.lblAllOff(); W.shift(0); W.show({brain:false,deep:false,cns:false,motor:false,cn:false,e4mp:false}); W.brain({op:0}); W.part('cerebellum',{op:0}); }
function bgDeep(list, em=0.8){ W.show({deep:true}); ['thalamus','caudate','putamen','pallidus','nigra'].forEach(n=>W.part(n,{op:list.includes(n)?1:0.25,em:list.includes(n)?em:0})); ['hypothalamus','pineal','callosum'].forEach(n=>W.part(n,{op:0})); }
function camR(ms=1800){ const c=CAM4.over, t=c[1]; W.cam(c[0].map((v,i)=>t[i]+(v-t[i])*1.38),t,ms,0); }
function e4Hide3D(){ $('#e4face')?.remove(); W.lblAllOff(); zoomOut(); W.shift(0); W.show({brain:false,deep:false,cns:false,motor:false,cn:false,e4mp:false}); W.part('cerebellum',{op:0}); document.querySelector('#scene')?.classList.remove('e4-3d-r'); }
function typeScene(k, mode){ $('#e4face')?.remove(); e4Scene({shift:520}); W.show({deep:false}); e4Mode(mode); e4Focus(ALLP,0.12); clear4(); add(profHTML(k)); document.getElementById('e4panel')?.classList.add('e4big'); document.querySelector('#scene')?.classList.add('e4-3d-r'); camR(0); }
/* 글 중심 장면: 3D 없이 유형 카드만 크게 */
function typeText(k){ e4Hide3D(); clear4(); add(profHTML(k)); document.getElementById('e4panel')?.classList.add('e4big','e4wide2'); }
/* 일측 UMN · 얼굴 사진 (아래 얼굴 처짐 · 혀 편위) */
function uumnFace(stage){ let f=document.getElementById('e4face'); if(!f){ add('<div id="e4face" class="e4face fade on"><div class="e4fimg"><img class="n" src="img/rev12_face.webp" alt=""><img class="d" src="img/e4_uumn_droop.webp" alt=""><img class="t" src="img/e4_uumn_tongue.webp" alt=""><i class="fm up">이마 · 눈 <b>정상</b><small>양측 지배</small></i><i class="fm low">아래 얼굴 <b>처짐</b><small>환자 오른쪽</small></i><i class="fm tg">혀 내밀기 → <b>약한 쪽으로</b><small>XII 반대측 지배</small></i></div><div class="e4fcap">왼쪽 UMN 손상 → <b>반대쪽(오른쪽)</b> 아래 얼굴·혀 약화</div></div>'); f=document.getElementById('e4face'); }
 f.dataset.s=stage; }

/* =================================================================
   EP 4-1
   ================================================================= */
CLIPS.push({code:'4-1',short:'4-1 마비말장애 · 유형',title:'마비말장애: 신경기전과 여섯 유형',desc:'3D 추체로·UMN·LMN · 양측 지배 · 병소별 신호 차단 · 유형별 호흡·발성·공명·조음·운율 · 확인 문제',build(S){
 e4Build(); e4Scene({brain:0.55,shift:-200}); e4Mode('normal'); e4Focus(ALLP,0.12); W.part(['umn','cbulbar','lmn','muscle','lesU','lesL'],{op:0}); cam4('over',0);
 add(hdr('EP 4-1 · 마비말장애','말운동 조절의 신경기전과 유형'));
 add('<div class="e4panel glass" id="e4panel"><div class="e4eyebrow">신경언어장애 · 말운동장애</div><h2>마비말장애 <small>Dysarthria</small></h2><div class="e4sub">말 산출에 관여하는 근육의 약화·마비·협응 저하로 생기는 신경학적 운동말장애</div></div>'); Q41.forEach((q,i)=>add(quizHTML('q41_'+i,q)));
 S.card=(title,sub,items,o)=>{clear4(); if(items===undefined||Array.isArray(sub)){o=items;items=sub;sub='';} add(card4('e4panel',title,sub,items,o||{})); if(!(W.groups.brain&&W.groups.brain.visible)&&!(W.groups.e4mp&&W.groups.e4mp.visible)) document.getElementById('e4panel')?.classList.add('e4big');};
 },steps:[
 {id:'41-01',s:'N',t:'이번 편에서는 마비말장애를 살펴보겠습니다. 먼저 말운동의 신경 경로를 정리하고, 병소에 따라 달라지는 여섯 가지 유형의 특징을 연결해 보겠습니다.',do(){ W.brain({op:0.45}); }},
 {id:'41-02',s:'N',t:'마비말장애, 디사스리아는 중추 또는 말초 신경계 손상으로 말산출 근육의 힘, 속도, 범위, 긴장도, 협응이 달라져 생기는 운동말장애입니다. 언어 지식 자체의 문제와 구별해야 합니다.'},
 {id:'41-03',s:'N',t:'말의 호흡, 발성, 공명, 조음, 운율 중 한 체계 또는 여러 체계가 영향을 받습니다. 환자마다 병소와 중증도가 달라서, 한 가지 특징만으로 유형을 단정하지 않습니다.',do(){S.card('말 산출의 다섯 하위체계','평가와 치료는 말의 여러 체계를 함께 봅니다.',['호흡 · 말에 필요한 기류와 호기 조절','발성 · 성대 진동과 음질·음도·강도','공명 · 구강·비강의 음향 균형','조음 · 입술·턱·혀·연구개의 움직임','운율 · 속도·강세·억양·구절화']);}},
 /* A. 3D 운동 경로 */
 {id:'41-03a',s:'N',t:'말운동 명령이 근육까지 가는 길을 3D로 따라가 보겠습니다. 대뇌의 운동 명령은 상부운동신경원을 따라 뇌간과 척수로 내려가고, 하부운동신경원이 이 명령을 근육에 전달합니다.',say:'말운동 명령이 근육까지 가는 길을 입체로 따라가 보겠습니다. 대뇌의 운동 명령은 상부운동신경원을 따라 뇌간과 척수로 내려가고, 하부운동신경원이 이 명령을 근육에 전달합니다.',
  do(){ clear4(); on('#hd',false); e4Scene(); e4Mode('normal'); e4Focus(ALLP,0.12); cam4('over',2200); later(()=>{ lb4(['e4l_cbtL','e4l_cbtR','e4l_ahc','e4l_arm','e4l_lmnC']); sfx('whoosh'); },900); }},
 {id:'41-04',s:'N',t:'상부운동신경원, 유엠엔은 대뇌에서 뇌간 또는 척수까지 운동 명령을 전달하며, 뇌신경이나 척수신경의 하부운동신경원을 조절합니다.',do(){ e4Focus(['e4cst','e4cbtL','e4cbtR','e4cbtX','e4nuc','e4nucX','e4ahc']); lb4(['e4l_ba4','e4l_cbtL','e4l_cbtR']); S.card('UMN · 상부운동신경원','중추신경계의 운동신경원',['대뇌 운동피질에서 시작','뇌간 또는 척수의 LMN에 연결 · 조절','추체로와 추체외로를 이루는 신경원','양측 손상 → 경직형'],{sm:1,tag:'UMN'}); sfx('glow'); }},
 {id:'41-04a',s:'N',t:'UMN의 세포체는 일차운동피질, 즉 브로드만 4번 영역에 있습니다. 섬유는 방사관을 지나 내포로 모인 뒤, 중뇌의 대뇌각과 뇌교 앞부분을 거쳐 연수 앞쪽의 추체로 내려갑니다.',say:'유엠엔의 세포체는 일차운동피질, 즉 브로드만 사 번 영역에 있습니다. 섬유는 방사관을 지나 내포로 모인 뒤, 중뇌의 대뇌각과 뇌교 앞부분을 거쳐 연수 앞쪽의 추체로 내려갑니다.',
  do(){ clear4(); e4Focus(['e4cst','e4ahc']); W.part('e4cst',{em:0.9}); cam4('cortex',1800); lb4(['e4l_ba4']); sfx('zap');
   seq([()=>{ W.lbl('e4l_ic'); sfx('tick'); },()=>{ cam4('mid',2200); W.lbl('e4l_ped'); sfx('tick'); },()=>{ W.lbl('e4l_pons'); sfx('tick'); },()=>{ W.lbl('e4l_pyr'); sfx('glow'); }],2300); }},
 {id:'41-04b',s:'N',t:'피질척수로의 약 80에서 90퍼센트는 연수 아래쪽 추체에서 반대쪽으로 교차합니다. 교차한 섬유는 척수의 외측 피질척수로를 따라 내려가 척수 전각세포에 연결됩니다. 그래서 왼쪽 대뇌는 오른쪽 몸의 움직임을 담당합니다.',say:'피질척수로의 약 팔십에서 구십 퍼센트는 연수 아래쪽 추체에서 반대쪽으로 교차합니다. 교차한 섬유는 척수의 외측 피질척수로를 따라 내려가 척수 전각세포에 연결됩니다. 그래서 왼쪽 대뇌는 오른쪽 몸의 움직임을 담당합니다.',
  do(){ lb4(['e4l_pyr']); e4Focus(['e4cst','e4ahc','e4lmnS','e4mus']); W.part('e4cst',{em:0.9}); cam4('decus',2000); later(()=>{ W.lbl('e4l_dec'); sfx('glow'); },1500);
   later(()=>{ W.lbl('e4l_pyr',false); cam4('cord',2400); later(()=>{ W.lbl(['e4l_lcst','e4l_ahc']); sfx('tick'); },1600); },6500); }},
 {id:'41-04c',s:'N',t:'말산출에 더 직접 관여하는 것은 피질연수로입니다. 운동피질의 얼굴 영역에서 내려와 뇌간의 뇌신경 운동핵에서 끝나는데, 대부분의 핵은 양쪽 대뇌의 지배를 함께 받습니다. 이것을 양측 지배라고 합니다.',
  do(){ lb4([]); e4Focus(['e4cbtL','e4cbtR','e4cbtX','e4nuc','e4nucX']); W.part(['e4cbtL','e4cbtR'],{em:0.8}); cam4('over',1600); later(()=>{ lb4(['e4l_face','e4l_faceR','e4l_cbtL','e4l_cbtR']); sfx('zap'); },700);
   later(()=>{ lb4(['e4l_nV','e4l_nA']); cam4('stem',2400); sfx('glow'); },6200); }},
 {id:'41-04d',s:'N',t:'예외가 두 가지 있습니다. 아래 얼굴을 담당하는 안면신경 핵은 반대쪽 대뇌의 지배만 받고, 혀를 움직이는 설하신경 핵도 주로 반대쪽 대뇌의 지배를 받습니다. 그래서 한쪽 UMN이 손상되면 반대쪽 아래 얼굴과 혀에 약화가 나타납니다.',say:'예외가 두 가지 있습니다. 아래 얼굴을 담당하는 안면신경 핵은 반대쪽 대뇌의 지배만 받고, 혀를 움직이는 설하신경 핵도 주로 반대쪽 대뇌의 지배를 받습니다. 그래서 한쪽 유엠엔이 손상되면 반대쪽 아래 얼굴과 혀에 약화가 나타납니다.',
  do(){ e4Focus(['e4cbtX','e4nucX','e4nuc']); W.part('e4nuc',{op:0.5,em:0}); W.part(['e4cbtX','e4nucX'],{em:1}); lb4(['e4l_nVIIu','e4l_nVIIl','e4l_nXII']); sfx('glow'); later(()=>zoom(560,430,1.22,1500),900); }},
 {id:'41-05',s:'N',t:'하부운동신경원, 엘엠엔은 뇌신경과 척수신경을 통해 근육에 직접 운동 신호를 보냅니다. 근육에 도달하는 마지막 경로이므로 최종공통경로라고 부릅니다.',do(){ zoomOut(); e4Focus(['e4nuc','e4nucX','e4ahc','e4lmnC','e4lmnS','e4mus','e4nmj']); W.part(['e4lmnC','e4lmnS'],{em:0.8}); cam4('over',2000); lb4(['e4l_lmnC','e4l_ahc','e4l_spn','e4l_mJaw','e4l_mLip','e4l_mTon','e4l_arm']); S.card('LMN · 하부운동신경원','근육을 직접 지배하는 최종공통경로',['뇌간 운동핵 → 뇌신경 → 말산출 근육','척수 전각세포 → 척수신경 → 호흡·자세 근육','손상 시 약화·긴장 저하·근위축·섬유속성 연축','손상 시 이완형 마비말장애'],{sm:1,tag:'LMN'}); sfx('glow'); }},
 {id:'41-05a',s:'N',t:'엘엠엔은 뇌간의 뇌신경 운동핵이나 척수 전각세포에서 시작합니다. 신경을 따라 나가 신경근 접합부에서 아세틸콜린을 분비하고, 이 신호를 받아 근육이 수축합니다.',
  do(){ clear4(); cam4('lip',2200); lb4(['e4l_mLip','e4l_mFore','e4l_mJaw']); later(()=>{ W.lbl('e4l_nmj'); W.part('e4nmj',{em:1}); sfx('pop'); },1600); }},
 {id:'41-06',s:'N',t:'추체로는 대뇌피질에서 시작해 뇌간이나 척수를 거쳐 하부운동신경원까지 이어지는 상위운동신경 경로입니다. 피질연수로와 피질척수로가 포함됩니다. 엘엠엔 자체를 추체로라고 부르는 것은 아닙니다.',do(){ e4Focus(ALLP,0.12); W.part(['e4lmnC','e4lmnS','e4mus','e4nmj','e4ahc'],{op:0.35,em:0}); W.part(['e4cst','e4cbtL','e4cbtR','e4cbtX'],{em:0.6}); cam4('over',2000); lb4(['e4l_cbtL','e4l_cbtR','e4l_dec']); S.card('경로 구분','추체로는 UMN 경로이고, LMN은 최종공통경로입니다.',['대뇌피질 → 뇌간·척수 → LMN','피질연수로 · 뇌신경 운동핵 방향','피질척수로 · 척수 운동신경 방향','시냅스 없이 곧장 내려가는 직접 활성화 경로'],{sm:1,tag:'추체로'});}},
 {id:'41-06a',s:'N',t:'추체외로는 기저핵, 흑질, 시상 등이 이루는 고리 회로로, 근긴장과 움직임의 속도와 범위를 무의식적으로 조절합니다. 소뇌 조절회로는 전운동피질에서 소뇌와 시상을 거쳐 일차운동피질로 돌아오며, 움직임의 힘과 타이밍을 맞춥니다.',
  do(){ clear4(); lb4([]); e4Focus([],0.06); W.show({motor:true}); W.part(['umn','cbulbar','lmn','muscle','lesU','lesL'],{op:0}); W.part(['epLoop','cbLoop'],{op:1,em:0.5}); bgDeep(['thalamus','caudate','putamen','pallidus','nigra'],0.35); W.part('cerebellum',{op:0.55,em:0.3}); W.brain({op:0.12}); cam4('loop',2200);
   later(()=>{ W.lbl('e4l_ep'); sfx('glow'); },1200); later(()=>{ W.lbl('e4l_cl'); sfx('glow'); },6500); }},
 {id:'41-06b',s:'N',t:'두 신경원의 손상 징후를 비교해 보겠습니다. UMN이 손상되면 하부운동신경원에 대한 억제가 사라져, 근긴장이 높아지는 경직과 과다반사, 바빈스키 반사나 턱반사 같은 병적반사가 나타납니다. 근육의 영양은 LMN이 담당하므로 근위축은 거의 없습니다.',say:'두 신경원의 손상 징후를 비교해 보겠습니다. 유엠엔이 손상되면 하부운동신경원에 대한 억제가 사라져, 근긴장이 높아지는 경직과 과다반사, 바빈스키 반사나 턱반사 같은 병적반사가 나타납니다. 근육의 영양은 엘엠엔이 담당하므로 근위축은 거의 없습니다.',
  do(){ lb4([]); W.show({motor:false,deep:false}); e4Scene({shift:-330}); e4Focus(ALLP,0.12); W.part(['e4lmnC','e4lmnS','e4mus'],{em:0.5}); e4Mode('sp'); cam4('over',2000); clear4(); add(cmpHTML()); $('#e4panel').classList.add('hu'); later(()=>{ lesLb(0,'UMN 손상 <small>양측 내포</small>','icL',150,-70); sfx('bad'); },900); }},
 {id:'41-06c',s:'N',t:'반대로 LMN이 손상되면 근육으로 가는 신호 자체가 끊깁니다. 근긴장이 떨어지는 이완과 반사 저하, 근위축, 그리고 근육이 가늘게 꿈틀거리는 섬유속성 연축이 나타납니다.',say:'반대로 엘엠엔이 손상되면 근육으로 가는 신호 자체가 끊깁니다. 근긴장이 떨어지는 이완과 반사 저하, 근위축, 그리고 근육이 가늘게 꿈틀거리는 섬유속성 연축이 나타납니다.',
  do(){ lb4([]); e4Mode('lmnAll'); $('#e4panel').classList.remove('hu'); $('#e4panel').classList.add('hl'); later(()=>{ lesLb(0,'LMN 손상 <small>뇌신경 핵 · 전각세포</small>','nAL',160,40); sfx('bad'); },700); later(()=>zoom(1240,420,1.16,1500),2500); }},
 {id:'41-07',s:'N',t:'말산출에 중요한 뇌신경은 삼차, 안면, 설인, 미주, 부신경, 설하신경입니다. 특히 턱의 씹기 운동은 삼차신경, 입술 움직임은 안면신경, 연구개와 후두는 미주신경, 혀 움직임은 설하신경이 중요합니다.',do(){ zoomOut(); lb4([]); e4Mode('normal'); e4Focus(['e4nuc','e4nucX','e4lmnC','e4mus','e4nmj']); W.part('e4lmnC',{em:0.7}); cam4('face',2000); later(()=>lb4(['e4l_mJaw','e4l_mFore','e4l_mLip','e4l_mLar','e4l_mTon']),1200); S.card('말산출에 관여하는 뇌신경',['V 삼차신경 · 턱·저작','VII 안면신경 · 입술·표정','IX 설인신경 · 인두','X 미주신경 · 연구개·후두','XI 부신경 · 일부 두경부 운동','XII 설하신경 · 혀'],{sm:1,tag:'말산출 뇌신경 6쌍'});}},
 {id:'41-08',s:'N',t:'저작은 다섯째 뇌신경인 삼차신경의 운동 기능입니다. 일곱째 안면신경은 입술 폐쇄와 양순음 산출에 중요합니다. 이 구분은 병소와 말소견을 연결할 때 자주 확인합니다.'},
 /* B. 유형 */
 {id:'41-09',s:'N',t:'첫 번째는 일측 상부운동신경형입니다. 한쪽 유엠엔 손상으로 반대쪽 얼굴 하부나 혀에 경한 약화가 나타날 수 있고, 반대쪽 경로가 일부 보완하여 비교적 가벼운 경우가 많습니다.',do(){ lb4([]); typeScene('uumn','uumn'); camR(2000); later(()=>{ lesLb(0,'병소 <small>왼쪽 내포 · 한쪽 UMN</small>','icL',150,-70); sfx('bad'); },900); }},
 {id:'41-10',s:'N',t:'양측 손상이 아니라 한쪽 손상이라는 점이 핵심입니다. 말이 약간 부정확하거나 느릴 수 있지만, 경직형과 같은 심한 양측성 소견과 구분합니다.',do(){ typeText('uumn'); uumnFace('n'); later(()=>{ uumnFace('d'); sfx('glow'); },1600); }},
 {id:'41-10a',s:'N',t:'한쪽 손상이 심하면 혀를 내밀 때 약한 쪽으로 기울고, 아래 얼굴이 처질 수 있습니다. 부정확한 자음이 가장 흔하고 교대운동속도가 느린 경우가 많지만, 호흡과 운율은 거의 손상되지 않습니다. 대개 경도에서 중등도이고, 몇 주 안에 회복되는 경우도 많습니다.',
  do(){ typeText('uumn'); uumnFace('d'); later(()=>{ uumnFace('t'); sfx('pop'); },900); }},
 {id:'41-11',s:'N',t:'두 번째는 경직형입니다. 양측 상부운동신경원 손상이 핵심이며, 양측 피질연수로 손상으로 말근육에 대한 억제 조절이 줄어들 수 있습니다.',do(){ zoomOut(); lb4([]); typeScene('sp','sp'); camR(1800); later(()=>{ lesLb(0,'양측 UMN 손상','icL',150,-70); sfx('bad'); },900); }},
 {id:'41-12',s:'N',t:'긴장도와 반사가 증가하고 움직임은 느리고 제한됩니다. 그래서 자음이 부정확하고, 음성은 거칠거나 쥐어짜며, 낮은 음도와 단조로운 운율이 나타날 수 있습니다. 경직형의 핵심은 양측 유엠엔입니다.',do(){ typeText('sp'); }},
 {id:'41-12a',s:'N',t:'체계별로 보면, 조음은 부정확한 자음과 모음 왜곡, 발성은 거칠고 쥐어짜는 음성과 낮은 음도입니다. 공명은 과대비성이 있을 수 있지만 비강누출은 드물고, 운율은 느린 말속도와 단조로운 음도와 음량, 짧은 구가 특징입니다. 호흡 문제는 상대적으로 덜 두드러집니다.',
  do(){ typeText('sp'); }},
 {id:'41-13',s:'N',t:'양측 피질연수로 손상에서는 가성구마비가 동반될 수 있습니다. 상황과 맞지 않는 웃음이나 울음이 불수의적으로 터지는 가성구감정이 나타날 수도 있으며, 이는 지속적인 우울감과는 구별합니다.',do(){ e4Hide3D(); S.card('경직형 · 국시 단서',['양측 UMN 손상 · 추체로와 추체외로가 함께 침범되기 쉬움','과다반사 · 병적반사 · 경직 · 근위축은 거의 없음','느리고 힘겨운 말 · 부정확한 자음','거친·쥐어짜는 음성 · 낮은 음도 · 단조로운 운율','양측 피질연수로 손상 → 가성구마비 · 가성구감정 · 침흘림']);}},
 {id:'41-13a',s:'N',t:'경직형과 이완형은 비슷하게 들릴 수 있습니다. 경직형은 쥐어짜는 음성과 과도한 구강 반사, 이완형은 기식성 음성과 비강누출, 구토반사 같은 구강 반사의 감소로 구별합니다. 진짜 연수마비는 엘엠엔 손상이고, 가성연수마비는 양측 유엠엔 손상입니다.',
  do(){ e4Hide3D(); clear4(); add(bulbarHTML()); sfx('pop'); later(()=>$('#e4bul')?.classList.add('s2'),5200); }},
 {id:'41-14',s:'N',t:'세 번째는 이완형입니다. 뇌신경 운동핵이나 말초 운동신경처럼 하부운동신경원이 손상되어 근육에 전달되는 신호가 약해지거나 끊깁니다.',do(){ lb4([]); typeScene('fl','fl_nuc'); camR(1800); later(()=>{ lesLb(0,'LMN 손상 <small>연수의 뇌신경 핵</small>','nAL',160,40); sfx('bad'); },900); }},
 {id:'41-14a',s:'N',t:'이완형의 병소는 엘엠엔 경로 어디든 될 수 있습니다. 뇌간의 뇌신경 핵, 뇌신경 자체, 그리고 신경과 근육이 만나는 신경근 접합부입니다. 중증 근무력증은 신경근 접합부, 길랑-바레 증후군은 말초신경의 문제입니다.',
  do(){ clear4(); W.shift(-120); lb4([]); cam4('face',2000); later(()=>{ lesLb(0,'① 뇌신경 핵','nAL',150,-60); sfx('bad'); },800);
   later(()=>{ lb4([]); e4Mode('fl_nerve'); lesLb(1,'② 뇌신경','vVIIL',120,-60); sfx('bad'); },5000);
   later(()=>{ lb4([]); e4Mode('fl_nmj'); lesLb(2,'③ 신경근 접합부','jLip',110,40); sfx('bad'); },9500); }},
 {id:'41-15',s:'N',t:'이완형에서는 근긴장 저하, 약화, 위축 또는 섬유속성 연축이 나타날 수 있습니다. 말에서는 느린 조음, 과대비성, 비누출, 기식성 또는 쉰 음성이 대표적입니다.',do(){ typeText('fl'); }},
 {id:'41-15a',s:'N',t:'체계별로는 과대비성이 가장 두드러지고 비강누출이 동반됩니다. 성대 내전이 약하면 기식성 음성, 호흡근이 약하면 짧은 구와 작은 음량이 나타납니다. 손상된 신경에 따라 양상이 다른데, 미주신경은 과대비성과 기식성 음성, 설하신경은 혀 자음의 왜곡, 삼차신경은 턱 운동 약화와 관련됩니다.',
  do(){ typeText('fl'); }},
 {id:'41-16',s:'N',t:'원인에는 연수 뇌졸중, 뇌신경 또는 말초신경 손상, 중증 근무력증, 길랑-바레 증후군 등이 있습니다. 근위축성 측삭경화증도 유엠엔과 엘엠엔을 함께 침범할 수 있습니다.',do(){ e4Hide3D(); S.card('이완형 · LMN 단서',['최종공통경로 손상 → 근육 약화·긴장 저하·위축','과대비성(가장 두드러짐)·비누출 · 기식성 음성','뇌간의 운동핵 손상은 말·삼킴에 큰 영향','연수 뇌졸중 · 중증 근무력증 · 길랑-바레 · 말초신경 손상','AMR · 매우 느리고 부정확']);}},
 {id:'41-17',s:'N',t:'네 번째는 실조형입니다. 소뇌와 그 연결회로의 협응 기능이 떨어지면 움직임의 타이밍과 크기를 안정적으로 맞추기 어렵습니다.',do(){ lb4([]); typeScene('ata','ata'); W.part('cerebellum',{op:0.75,em:0.9}); camR(1800); later(()=>{ lesLb(0,'소뇌 · 소뇌 연결회로','cbl',-170,-40); sfx('bad'); },900); }},
 {id:'41-18',s:'N',t:'조음 붕괴가 불규칙하게 나타나고, 음절마다 강세가 비슷해지는 과균등 강세, 음절 간격의 연장, 음도와 음량의 변이가 나타날 수 있습니다. 소뇌 손상의 변이성이 단서입니다.',do(){ typeText('ata'); }},
 {id:'41-18a',s:'N',t:'소뇌 조절회로는 전운동피질에서 소뇌와 시상을 거쳐 일차운동피질로 이어집니다. 실조형의 말은 술 취한 듯하고 음절을 하나씩 끊어 말하는 단속성 말로 묘사되며, 조음과 운율의 문제가 가장 두드러집니다. 과균등 강세는 실조형을 구별하는 특징이고, 운동실조와 의도성 떨림이 동반될 수 있습니다.',
  do(){ typeText('ata'); }},
 {id:'41-19',s:'N',t:'다섯 번째 과소운동형은 기저핵 회로, 특히 흑질 도파민계와 연관됩니다. 파킨슨병에서 흔히 보이며 움직임의 크기와 시작이 감소합니다.',do(){ zoomOut(); lb4([]); typeScene('hypo','hypo'); W.part('cerebellum',{op:0.14,em:0}); bgDeep(['nigra','putamen','caudate'],0.9); W.part('nigra',{op:1,em:1.2}); camR(1800); later(()=>{ lesLb(0,'흑질 <small>도파민 저하</small>','ngL',170,-50); sfx('bad'); },900); }},
 {id:'41-20',s:'N',t:'목소리가 작고 단조로우며, 말속도가 빨라지거나 말뭉침이 생길 수 있습니다. 파킨슨병에서는 안정 시 떨림, 경직, 서동, 자세 불안정 같은 운동 증상도 함께 확인합니다.',do(){ typeText('hypo'); }},
 {id:'41-20a',s:'N',t:'과소운동형은 빠른 말속도를 보일 수 있는 유일한 마비말장애 유형입니다. 단조로운 음도와 강세 감소, 작은 음성, 부적절한 쉼이 대표적이고, 같은 말을 점점 빠르게 반복하는 동어반복증이 나타나기도 합니다. 조음기가 목표에 다 닿지 못해 자음이 부정확해지며, 말속도 조절판이 도움이 됩니다.',
  do(){ typeText('hypo'); }},
 {id:'41-21',s:'N',t:'여섯 번째 과다운동형은 선조체를 포함한 기저핵 회로의 불수의적 움직임과 연관됩니다. 무도병, 헌팅턴병, 근긴장이상, 틱장애 등이 원인이 될 수 있습니다.',do(){ zoomOut(); lb4([]); typeScene('hyper','hyper'); bgDeep(['caudate','putamen'],1.0); camR(1800); later(()=>{ lesLb(0,'선조체 <small>미상핵 · 조가비핵</small>','stL',170,-60); sfx('bad'); },900); }},
 {id:'41-22',s:'N',t:'불수의적 움직임이 발화에 끼어들어 속도와 강도, 음도가 가변적이고, 음절 사이 간격이 길어지거나 갑작스러운 끊김이 나타날 수 있습니다.',do(){ typeText('hyper'); }},
 {id:'41-22a',s:'N',t:'과다운동형은 불수의 운동을 관찰하는 것만으로도 진단의 단서를 얻을 수 있는 유일한 유형입니다. 헌팅턴병에서는 불필요한 운동을 억제하는 간접경로의 선조체가 먼저 손상되어 원치 않는 움직임이 생깁니다. 무도병의 말에서는 간격 연장과 가변적인 말속도가 두드러집니다.',
  do(){ typeText('hyper'); }},
 {id:'41-23',s:'N',t:'마지막은 혼합형입니다. 두 가지 이상의 신경계 병변이 함께 있어 여러 유형의 특징이 섞여 나타납니다. 근위축성 측삭경화증은 경직형과 이완형의 특징을 함께 보일 수 있습니다.',do(){ zoomOut(); lb4([]); typeScene('mix','als'); camR(1800); later(()=>{ lesLb(0,'UMN','icL',150,-70); lesLb(1,'LMN · 뇌신경 핵','nAL',160,30); lesLb(2,'LMN · 전각세포','ahcL',-170,30); sfx('bad'); },900); }},
 {id:'41-23a',s:'N',t:'가장 흔한 혼합형은 경직-이완형과 경직-실조형입니다. 근위축성 측삭경화증은 유엠엔과 뇌간·척수의 엘엠엔이 함께 변성되어 경직과 이완이 섞이고, 다발성 경화증은 유엠엔과 소뇌 경로가 함께 침범되어 경직과 실조가 섞입니다.',
  do(){ later(()=>{ lb4([]); e4Mode('ms'); W.part('cerebellum',{op:0.6,em:0.8}); lesLb(0,'UMN','icL',150,-70); lesLb(1,'소뇌','cbl',-150,-40); sfx('bad'); },6500); }},
 {id:'41-24',s:'N',t:'정리하면 경직형은 양측 유엠엔, 이완형은 엘엠엔, 실조형은 소뇌, 과소·과다운동형은 기저핵 회로, 일측 상부운동신경형은 한쪽 유엠엔입니다.',do(){ lb4([]); document.querySelector('#scene')?.classList.remove('e4-3d-r'); $('#e4face')?.remove(); e4Scene({brain:0.1,shift:-200}); e4Mode('normal'); W.part('cerebellum',{op:0.14,em:0}); W.show({deep:false}); clear4(); W.shift(-200); cam4('over',1800); lb4(['e4l_cbtL','e4l_cbtR','e4l_dec','e4l_ahc']); }},
 {id:'41-25',s:'N',t:'이제 유형별 핵심 단서를 비교하겠습니다.',do(){ lb4([]); W.show({e4mp:false,cns:false}); W.brain({op:0.18}); W.shift(0); clear4(); add(tbl6HTML()); sfx('pop'); }},
 {id:'41-26',s:'N',t:'특징을 병소에서 기전으로, 그리고 말의 결과로 이어 보세요. 양측 유엠엔 손상은 경직과 느린 움직임을 만들고, 이완형은 근육으로 가는 운동 신호의 약화에서 출발합니다.',do(){ later(()=>zoom(800,420,1.12,1400),600); }},
 {id:'41-27',s:'N',t:'국시 핵심을 정리합니다. 경직형은 양측 유엠엔, 이완형은 엘엠엔 최종공통경로, 실조형은 소뇌 협응, 과소운동형은 파킨슨·도파민계, 과다운동형은 기저핵의 불수의 운동입니다.',do(){ zoomOut(); W.show({brain:true}); W.brain({op:0.5}); W.view('lateralL',1600); W.shift(-200); S.card('국시 핵심 정리',['경직형 = 양측 UMN 손상 · 쥐어짜는 음성','이완형 = LMN 손상 · 최종공통경로 · 과대비성','실조형 = 소뇌 · 불규칙 조음 붕괴 · 과균등 강세','과소운동형 = 파킨슨병 · 작은 음성 · 빠른 말속도','과다운동형 = 기저핵 · 불수의 운동 · 가변적 말속도','혼합형 = ALS(경직+이완) · MS(경직+실조)']);}},
 ...quizSteps('q41_0',Q41[0],()=>prepQuiz()),...quizSteps('q41_1',Q41[1],()=>on('#q41_0',false)),...quizSteps('q41_2',Q41[2],()=>on('#q41_1',false)),...quizSteps('q41_3',Q41[3],()=>on('#q41_2',false)),...quizSteps('q41_4',Q41[4],()=>on('#q41_3',false)),...quizSteps('q41_5',Q41[5],()=>on('#q41_4',false)),
 {id:'41-28',s:'N',t:'여기까지 마비말장애의 신경기전과 여섯 유형을 살펴봤습니다. 다음 편에서는 평가 절차와 체계별 치료 원칙을 정리하겠습니다.',do(){ on('#q41_5',false); e4Scene({brain:0.3,shift:0}); e4Mode('normal'); e4Focus(ALLP,0.12); W.part(['e4cst','e4cbtL','e4cbtR','e4cbtX','e4lmnC','e4lmnS'],{em:0.5}); cam4('over',1600); W.spin(0.08);}}, {wait:1700}
 ]});

/* =================================================================
   EP 4-2
   ================================================================= */
CLIPS.push({code:'4-2',short:'4-2 마비말장애 · 평가와 치료',title:'마비말장애: 평가와 치료',desc:'구어·비구어 과제 · MPT 기준 · AMR/SMR 유형별 양상 · 호흡·발성·공명·조음·운율 치료 기법 · 확인 문제',build(S){
 W.show({brain:false}); W.view('lateralL',0); W.spin(0); W.lesion(null);
 add(hdr('EP 4-2 · 마비말장애','평가에서 치료 계획까지'));
 add('<div class="e4panel glass" id="e4panel"><div class="e4eyebrow">평가 · 치료 · 기능적 의사소통</div><h2>무엇을 보고, 어떻게 돕나</h2><div class="e4sub">말의 하위체계를 체계적으로 평가하고 개인의 병소와 기능에 맞게 중재합니다.</div></div>'); Q42.forEach((q,i)=>add(quizHTML('q42_'+i,q)));
 S.card=(title,sub,items,o)=>{clear4(); if(items===undefined||Array.isArray(sub)){o=items;items=sub;sub='';} add(card4('e4panel',title,sub,items,o||{})); if(!(W.groups.brain&&W.groups.brain.visible)&&!(W.groups.e4mp&&W.groups.e4mp.visible)) document.getElementById('e4panel')?.classList.add('e4big');};
 S.brainBack=()=>{ e4Hide3D(); };
 },steps:[
 {id:'42-01',s:'N',t:'두 번째 편에서는 마비말장애의 평가와 치료를 살펴보겠습니다. 먼저 말 이외의 구강·호흡 기능을 관찰한 다음, 실제 말 과제에서 명료도와 자연스러움을 평가합니다.'},
 {id:'42-02',s:'N',t:'비구어 평가에서는 자세와 호흡 패턴, 호흡 유지 능력을 봅니다. 입술, 턱, 혀, 연구개가 대칭적인지, 움직임의 범위와 속도, 근긴장도, 반사에 이상이 있는지 관찰합니다.',do(){S.card('비구어 구강운동 평가','말 과제 전에 구조와 움직임을 확인합니다.',['자세 · 호흡 패턴 · 호흡 유지','입술·얼굴의 대칭과 폐쇄','턱의 범위와 저작 관련 움직임','혀의 돌출·상하·좌우 움직임 및 위축','연구개의 대칭·거상·연인두 폐쇄','구강 반사와 섬유속성 연축 등']);}},
 {id:'42-02a',s:'N',t:'평가 과제는 구어 과제와 비구어 과제로 나눕니다. 구어 과제에는 수세기, 읽기, 대화 같은 유의미 발화와 모음 연장, 교호운동 같은 말 유사 과제가 있고, 비구어 과제는 소리를 내지 않는 구조와 기능 검사, 기침이나 웃음 같은 생리적 발성 과제입니다. 분석은 청지각적 측정과 도구적 측정으로 나뉩니다.',
  do(){ S.card('평가 과제와 분석 방법','호흡 · 발성 · 공명 · 조음 · 운율 · 명료도를 모두 평가합니다.',['구어 과제 · 유의미 발화 · 수세기 · 읽기 · 대화','구어 과제 · 말 유사 과제 · 모음 연장 · 교호운동 · 단속적 모음 발성','비구어 과제 · 구조·기능 검사 · 기침·울기·웃기 같은 생리적 발성','지각적 측정 · 치료사의 귀(청지각)와 눈(시각적 관찰)','도구적 측정 · 음향·공기역학·운동·근전도·영상 정보'],{tag:'평가 설계'}); sfx('pop'); }},
 {id:'42-03',s:'N',t:'호흡 평가에서는 자세, 폐활량과 호흡 패턴, 발화에 필요한 호기 유지 등을 확인합니다. 말호흡은 주로 횡격신경 C3에서 C5, 늑간신경 등 척수신경계가 관여합니다. 발성은 성문하압과 성대 움직임, 음질과 최대발성시간을 봅니다.',say:'호흡 평가에서는 자세, 폐활량과 호흡 패턴, 발화에 필요한 호기 유지 등을 확인합니다. 말호흡은 주로 횡격신경 경수 삼 번에서 오 번, 늑간신경 등 척수신경계가 관여합니다. 발성은 성문하압과 성대 움직임, 음질과 최대발성시간을 봅니다.'},
 {id:'42-03a',s:'N',t:'최대발성시간은 최대한 숨을 들이쉰 뒤 /아/를 한 호기에 최대한 길게 내게 해서 잽니다. 정상 성인은 보통 15초 이상 가능하고, 정상 강도로 4에서 5초를 유지하면 말에 필요한 최소한의 호흡 기능은 있다고 봅니다.',say:'최대발성시간은 최대한 숨을 들이쉰 뒤 아 모음을 한 호기에 최대한 길게 내게 해서 잽니다. 정상 성인은 보통 십오 초 이상 가능하고, 정상 강도로 사에서 오 초를 유지하면 말에 필요한 최소한의 호흡 기능은 있다고 봅니다.',
  do(){ clear4(); add(mptHTML()); W.brain({op:0.4}); later(()=>{ const e=$('#e4panel'); if(e) e.classList.add('go'); sfx('glow'); },500); }},
 {id:'42-03b',s:'N',t:'수세기나 /퍼/ 반복에서는 한 호흡에 산출한 음절 수를 봅니다. 정상 성인은 15에서 20개 정도이고, 5에서 6회를 반복할 수 있으면 최소한의 호흡 기능이 있다고 봅니다. 물이 담긴 컵에 빨대로 5초 이상 불 수 있으면 대부분의 말에 충분한 압력을 유지한다고 봅니다.',say:'수세기나 퍼 음절 반복에서는 한 호흡에 산출한 음절 수를 봅니다. 정상 성인은 십오에서 이십 개 정도이고, 다섯에서 여섯 번을 반복할 수 있으면 최소한의 호흡 기능이 있다고 봅니다. 물이 담긴 컵에 빨대로 오 초 이상 불 수 있으면 대부분의 말에 충분한 압력을 유지한다고 봅니다.',
  do(){ later(()=>zoom(560,520,1.15,1400),800); }},
 {id:'42-04',s:'N',t:'공명 평가에서는 연구개의 대칭과 움직임, 과대비성이나 과소비성, 비강누출을 살핍니다. 조음 평가에서는 얼굴과 턱, 혀의 움직임 및 정확도를 확인합니다.',do(){ zoomOut(); W.brain({op:0.75}); S.card('체계별 비구어·기초 평가',['호흡 · 폐활량, 자세, 호기 조절 · 횡격신경 C3–C5 및 늑간신경','발성 · 성문하압 · 성대 움직임 · 음질 · Praat·CSL로 음향 분석','공명 · 연구개의 대칭과 움직임 · 비강누출','조음 · 얼굴·턱·혀의 구조와 운동','청지각 판단에 필요한 말 표본 확보']);}},
 {id:'42-04a',s:'N',t:'공명은 /아/를 연장할 때 콧잔등의 진동이나 콧구멍을 막았다 열 때의 음질 변화를 보고, 나조미터로 비성도를 잽니다. /퍼/ 반복을 쓰는 이유는 비성도가 가장 낮은 /ㅍ/과 /ㅓ/로 이루어져 있기 때문입니다. /퍼/, /서/, /처/ 같은 압력 자음이 콧구멍을 막을 때 더 명료하게 들리면 연인두 폐쇄가 부적절하다는 뜻입니다.',say:'공명은 아 모음을 연장할 때 콧잔등의 진동이나 콧구멍을 막았다 열 때의 음질 변화를 보고, 나조미터로 비성도를 잽니다. 퍼 반복을 쓰는 이유는 비성도가 가장 낮은 피읖과 어 모음으로 이루어져 있기 때문입니다. 퍼, 서, 처 같은 압력 자음이 콧구멍을 막을 때 더 명료하게 들리면 연인두 폐쇄가 부적절하다는 뜻입니다.',
  do(){ S.card('공명 평가 · 연인두 기능','과대비성 · 비강누출 여부를 봅니다.',['/아/ 연장 · 콧잔등 진동 · 비공 개폐 시 음질 변화','Nasometer · 비성도 = 비강 에너지 ÷ (구강+비강)','/아/ 반복 · 설압자로 혀를 누르고 연구개 거상 관찰','/퍼/ 반복 · 비성도 낮은 /ㅍ/ + /ㅓ/ 로 비성도 측정','압력 자음 /퍼·서·처/ · 비공을 막을 때 더 명료 → 연인두 폐쇄 부적절'],{tag:'공명'}); sfx('pop'); }},
 {id:'42-05',s:'N',t:'말 평가에서는 모음 연장으로 최대발성시간과 음질을 살피고, 길항반복운동으로 조음기의 속도와 순서를 평가합니다. 한 음절 반복은 에이엠알, 서로 다른 음절의 연속 반복은 에스엠알입니다.',do(){S.card('길항반복운동 · DDK',['AMR · 교대운동속도 · 퍼-퍼-퍼, 한 음절을 반복','SMR · 일련운동속도 · 퍼-터-커, 음절을 바꾸어 연속 산출','최대 흡기 후 빠르고 정확하고 규칙적으로','속도·정확성·규칙성을 관찰']);}},
 {id:'42-05a',s:'N',t:'/퍼/ 반복은 입술 폐쇄, /터/는 혀 앞부분의 거상, /커/는 혀 뒷부분의 거상, /퍼터커/는 입술과 혀의 협응을 봅니다. 입술은 안면신경, 혀는 설하신경이 지배합니다.',say:'퍼 반복은 입술 폐쇄, 터는 혀 앞부분의 거상, 커는 혀 뒷부분의 거상, 퍼터커는 입술과 혀의 협응을 봅니다. 입술은 안면신경, 혀는 설하신경이 지배합니다.',
  do(){ clear4(); e4Scene({brain:0.08,shift:-260,stem:0.25}); e4Mode('normal'); e4Focus(['e4lmnC','e4mus','e4nuc','e4nucX'],0.08); W.part('e4lmnC',{em:0.8}); cam4('face',0); add(chipsHTML()); later(()=>{ W.lbl(['e4l_mLip','e4l_mTon']); sfx('pop'); },900); }},
 {id:'42-05b',s:'N',t:'유형별 교대운동과 일련운동 양상도 자주 출제됩니다. 경직형은 느리고 단조로우며, 이완형은 매우 느리고 부정확합니다. 실조형은 리듬과 속도가 불규칙하고, 과소운동형은 빠르지만 움직임이 작으며, 과다운동형은 불규칙하고 속도가 일정하지 않습니다.',
  do(){ e4Hide3D(); clear4();  clear4(); S.brainBack(); W.brain({op:0.18}); add(ddkHTML()); sfx('pop'); later(()=>zoom(800,400,1.1,1400),2500); }},
 {id:'42-06',s:'N',t:'단음절과 단어에서는 자음·모음의 정확도와 명료도를 평가합니다. 문맥발화에서는 말속도, 자연스러움, 구절화, 운율, 대화 상황에서의 기능까지 살핍니다.',do(){ zoomOut(); clear4(); W.brain({op:0.75}); }},
 {id:'42-07',s:'N',t:'평가 과제는 짧은 자극에서 문장과 자발화로 넓혀 갑니다. 같은 환자도 과제의 길이와 복잡도에 따라 말의 명료도와 피로도가 달라질 수 있습니다.',do(){S.card('말 표본의 단계',['모음 연장 · 호흡·발성 기초','AMR·SMR · 속도와 규칙성','단음절·단어 · 조음 정확도·명료도','문장·문맥발화 · 말속도·자연스러움·운율','대화 · 기능적 의사소통과 참여']);}},
 {id:'42-07a',s:'N',t:'조음기관 구조 검사에서는 얼굴, 턱, 입술, 경구개, 연구개, 혀, 치아의 크기와 대칭을 봅니다. 기능 검사는 움직이는 턱, 입술, 혀를 중심으로 힘, 긴장성, 속도, 범위, 정확성을 보고, 검사자가 움직임을 방해해도 자세를 유지하는 저항 과제를 함께 씁니다.',
  do(){ S.card('조음기관 구조 · 기능 검사',['구조 · 안면·턱·입술·연구개 → 크기와 대칭','구조 · 경구개 → 깊이와 대칭 · 치아 → 크기와 교합','기능 · 턱·입술·혀의 세기·긴장성·속도·범위·정확성','저항 과제 · 검사자가 방해해도 원래 위치 유지','자음정확도 검사 · 표준화된 조음검사 도구'],{tag:'조음 평가'}); }},
 {id:'42-07b',s:'N',t:'운율은 읽기와 대화에서 평가합니다. 전체 발화 시간으로 말속도와 간격 연장을, 한 호기의 음절 수로 짧은 구를, 쉼의 빈도와 길이로 부적절한 쉼을, 강세 패턴으로 단조롭거나 과도한 강세를 판단합니다.',
  do(){ S.card('운율 평가 · 읽기와 대화',['발화 시간 · 느린(때로 빠른) 말속도 · 간격 연장','한 호기의 음절 수 · 짧은 구','쉼의 빈도와 길이 · 부적절한 쉼','강세 패턴 · 단조롭거나 과도한 강세','청지각적 판단 + 음향 분석 도구'],{tag:'운율 평가'}); }},
 {id:'42-08',s:'N',t:'평가 결과는 호흡, 발성, 공명, 조음, 운율의 강점과 제한을 프로파일로 정리합니다. 말 명료도뿐 아니라 환자가 일상에서 전달하고 싶은 내용을 얼마나 잘 전달하는지가 중요합니다.'},
 {id:'42-09',s:'N',t:'치료 계획은 병소, 중증도, 피로, 의학적 상태와 환자의 목표를 고려해 세웁니다. 한 가지 기법을 모든 유형에 똑같이 적용하지 않고, 기능적 의사소통을 중심에 둡니다.',do(){S.card('치료 계획의 원칙',['손상된 하위체계와 보존된 기능 확인','의학적 안정성·피로·호흡·삼킴 위험 고려','명료도와 의사소통 참여를 목표로 설정','필요하면 보완대체의사소통(AAC) 포함','가족·의료진과 일반화 계획 공유']);}},
 {id:'42-09a',s:'N',t:'치료는 간접 치료와 직접 치료로 나눌 수 있습니다. 간접 치료는 감각자극, 근력 강화, 근긴장 조절, 자세 조절, 호흡 훈련처럼 말의 기초를 다지고, 직접 치료는 호흡, 발성, 공명, 조음, 운율에 기법을 직접 적용합니다.',
  do(){ S.card('간접 치료 vs 직접 치료','목표 · 말산출 하위체계를 개선해 의사소통 효율을 극대화',['간접 · 근육 세기와 민첩성 · 호흡 · 감각 피드백 향상','간접 · 감각자극 · 근력 강화 · 근긴장 조절 · 자세 조절 · 호흡훈련','직접 · 호흡 · 발성 · 공명 · 조음 · 운율에 기법 적용','두 접근을 환자 상태에 맞게 조합'],{tag:'치료 구분'}); }},
 {id:'42-10',s:'N',t:'호흡 치료에서는 바른 자세를 잡고 완전한 흡기를 위한 단서를 줍니다. 천천히 통제된 호기를 연습하고, 숨을 내쉬기 시작할 때 발화를 시작하도록 하며, 한 호흡에 지나치게 긴 말을 몰아넣지 않도록 합니다.'},
 {id:'42-11',s:'N',t:'발화 단위를 호흡 그룹에 맞게 묶고 적절한 쉼을 배치합니다. 목표는 숨을 끝까지 짜내는 것이 아니라, 말에 필요한 기류를 효율적으로 나누어 사용하는 것입니다.',do(){S.card('호흡 치료',['자세와 호흡 정렬','완전한 흡기를 위한 시각·촉각 단서','느리고 통제된 호기','호기 시작과 함께 발화','구문을 호흡 그룹으로 나누기 · 쉼 배치']);}},
 {id:'42-11a',s:'N',t:'자세는 머리, 목, 몸통이 일직선을 이루는 정중선을 유지하게 하고, 어려우면 벨트나 쿠션으로 보조합니다. 모음 연장과 수세기로 한 호흡의 발화를 늘리고, 읽기 자료에 표시한 곳에서 짧고 깊게 들이쉰 뒤 길게 내쉬는 말호흡 패턴을 확립합니다.',
  do(){ S.card('호흡 치료 · 단계',['자세 잡기 · 머리·목·몸통 정중선 · 벨트·쿠션·베개로 보조','모음 연장 · 천천히 많이 흡기 → 호기에 즉시 발성 → MPT 늘리기','수세기·교호운동 · 한 호흡의 최대 발화 시간·음절 수 늘리기','말호흡 패턴 · 짧고 깊은 흡기 후 긴 호기','읽기 자료에 흡기 위치 표시 → 발화 단위 점차 확대'],{tag:'호흡'}); later(()=>zoom(560,420,1.14,1400),1500); }},
 {id:'42-12',s:'N',t:'성대 내전이 부족한 과소내전 환자는 의료적 평가와 함께 노력폐쇄, 숨 참기, 강한 성문 접촉, 고개 돌리기나 후두 측면 압박 등을 고려할 수 있습니다. 환자별 안전성과 적절성을 확인해야 합니다.',do(){ zoomOut(); }},
 {id:'42-13',s:'N',t:'파킨슨병의 작은 음성과 저강도 발성에는 리실버만 음성치료, 엘에스브이티 같은 강도 중심 접근이 사용될 수 있습니다. 반대로 과도한 내전과 긴장이 두드러지면 긴장 완화, 부드러운 발성 시작, 하품-한숨 접근을 고려합니다.',do(){S.card('발성 치료 · 소견에 맞춘 선택',['과소내전 · 노력폐쇄 · 숨 참기 · 강한 성문 접촉 · 고개 돌리기·후두 측면 압박','작은 음성 · 음성 강도와 자기 모니터링 훈련','LSVT · 파킨슨병 저강도 음성에서 고려','과도내전·긴장 · 이완, 부드러운 발성 시작','하품-한숨 발성 등으로 긴장 완화']);}},
 {id:'42-13a',s:'N',t:'발성을 시작하기 어려운 중증 환자에게는 웃음이나 재채기 같은 생리적 발성을 먼저 유도하고, 음성이 약하면 무거운 물건을 밀면서 소리를 내는 밀기 접근법을 씁니다. 단조로운 음도나 약한 강도에는 음향 분석 도구로 시각적 피드백을 줍니다.',
  do(){ S.card('발성 치료 · 추가 기법',['모음 연장 · 다양한 음계로 → 최대발성시간 늘리기 · 단음도 개선','생리적 발성 · 간질이기·압박·재채기로 웃음·신음·재채기 유도','밀기 접근법 · 무거운 물건을 밀거나 당기며 강한 발성','부드러운 발성 · 노래조 말하기 · 저작하기 · 구강개방 · 하품-한숨','시각적 피드백 · CSL·Visi-Pitch로 음도·강도 목표 제시'],{tag:'발성'}); }},
 {id:'42-14',s:'N',t:'발성 치료를 할 때는 성대의 구조적 문제나 의학적 금기 여부를 확인합니다. 필요하면 이비인후과와 협력해 성대 내전성형, 1유형 갑상연골성형술, 테플론이나 콜라겐 주입 같은 의료적 처치를 논의합니다.',say:'발성 치료를 할 때는 성대의 구조적 문제나 의학적 금기 여부를 확인합니다. 필요하면 이비인후과와 협력해 성대 내전성형, 일 유형 갑상연골성형술, 테플론이나 콜라겐 주입 같은 의료적 처치를 논의합니다.'},
 {id:'42-15',s:'N',t:'과대비성이나 비누출에는 연구개와 연인두 기능을 평가하고, 필요에 따라 의료적 처치나 구개거상기 등을 고려합니다. 청각·시각·촉각 피드백을 사용하고, 구강 압력 자음과 공명 조절을 훈련할 수 있습니다.',do(){S.card('공명 치료',['과대비성·비누출 · 연인두 폐쇄와 구조 평가','피드백 · 거울(콧김) · 비내시경 · Nasometer 비성도','의료적 협력 · 인두피판술 · 테플론 주입 · 구개거상기','지속적 기도 양압기(CPAP) · 불기·빨기로 연구개 근력','과소비성 · 비음-유음 자극']);}},
 {id:'42-15a',s:'N',t:'수술로는 인두 조직을 연구개에 연결하는 인두피판술과 테플론 주입술이 있습니다. 구개거상기는 과대비성이 가장 두드러지고, 의학적으로 안정되어 있으며, 치아가 충분하고 구토반사가 과도하지 않을 때 적합합니다. 혀 뒷부분 낮추기, 음성 강도 높이기, 입을 크게 벌리는 구강개방 접근법도 함께 씁니다.',
  do(){ S.card('공명 치료 · 국시 포인트',['인두피판술 · 인두 피부판을 연구개와 연결해 대부분 폐쇄','테플론 주입술 · 연구개가 닿는 인두벽에 주입 → 거상 거리 감소','구개거상기 조건 · 과대비성이 주문제 · 의학적 안정 · 치아 충분','구개거상기 조건 · 과도한 구토반사·구강 경직 없음 · 스스로 착용','혀 뒷부분 낮추기 · 음성강도 높이기 · 구강개방 접근법 · 압력자음'],{tag:'공명'}); later(()=>zoom(560,420,1.14,1400),1500); }},
 {id:'42-16',s:'N',t:'과소비성이 있으면 비음이나 유음처럼 구강과 비강 공명을 활용하는 소리에서 시작해 목표 음소와 말로 확장할 수 있습니다. 공명 문제는 원인과 구조를 먼저 파악해야 합니다.',do(){ zoomOut(); }},
 {id:'42-17',s:'N',t:'조음 치료에는 조음점 지시, 통합적 자극, 과장된 조음, 최소쌍 대조, 반복 연습 등이 있습니다. 정확도를 높이는 동시에 실제 문장과 대화로 일반화하는 것이 중요합니다.',do(){S.card('조음 치료',['조음점 지시법 · 조음 위치·방법에 대한 명시적 피드백','통합적 자극법과 단계적 모방','과장된 조음으로 표적 특징 강조','최소쌍 대조로 음소 구별 훈련','조음명료도 인식 · 단어 → 문장 → 자발화로 일반화']);}},
 {id:'42-17a',s:'N',t:'조음기관 훈련도 함께 합니다. 안면과 구강 마사지로 근긴장을 조절하고, 턱은 열고 닫기와 저항 훈련으로 근력을, 입술은 오므리기와 벌리기, 단추 운동으로 세기를, 혀는 앞뒤, 위아래, 좌우 운동과 저항 운동으로 세기와 범위를 높입니다.',
  do(){ S.card('조음기관 기능 향상',['안면·구강 마사지 · 근육 방향대로 · 냉온 자극 · 윗잇몸부터','하악 · 열고 닫기 반복 → 저항 훈련 · 근력 강화','입술 · 오므리기·벌리기 · 볼 부풀리기·미소 · 단추 운동','혀 · 전후·상하·좌우 운동 + 저항 운동 · 세기와 범위','조음명료도 인식 · 스스로 원인을 찾아 다시 읽기'],{tag:'조음'}); }},
 {id:'42-18',s:'N',t:'말 명료도가 낮으면 문장을 짧게 나누고, 핵심 단어를 강조하며, 대화 상대가 확인할 시간을 확보합니다. 말소리 정확도만이 아니라 메시지가 전달되는지를 확인합니다.'},
 {id:'42-19',s:'N',t:'운율 치료에서는 말속도를 조절하고, 음도 범위와 대조 강세를 연습합니다. 지연 청각 피드백, 외부 박자, 손가락 두드리기, 구문 단위로 말 묶기 등을 환자에게 맞게 활용합니다.',do(){S.card('운율·속도 치료',['속도 조절 · 지연 청각 피드백·외부 박자·메트로놈','손가락 두드리기 등 리듬 단서','음도 범위와 강도 변화 훈련','대조 강세 · 핵심어 강조','구문 단위로 발화 묶고 자연스러운 쉼 위치에서 흡기']);}},
 {id:'42-19a',s:'N',t:'음도 범위는 /아/를 가장 낮은 음에서 가장 높은 음까지, 또는 한 옥타브의 8음계로 내며 넓힙니다. 억양 프로파일에서는 문장에 그린 선을 따라 억양을 바꾸어 말하고, 강세대조 훈련에서는 아이가 무엇을 먹나요라는 질문에 사과에 강세를 주어 답하게 합니다.',say:'음도 범위는 아 모음을 가장 낮은 음에서 가장 높은 음까지, 또는 한 옥타브의 여덟 음계로 내며 넓힙니다. 억양 프로파일에서는 문장에 그린 선을 따라 억양을 바꾸어 말하고, 강세대조 훈련에서는 아이가 무엇을 먹나요라는 질문에 사과에 강세를 주어 답하게 합니다.',
  do(){ S.card('운율 치료 · 기법',['음도범위 확대 · /아/ 최저→최고 음도 · 한 옥타브 8음계','억양 프로파일 · 단어 위 선 = 상승 · 아래 선 = 하강','강세대조 훈련 · "사과를 먹습니다" 핵심어 강세','한 호흡의 발화 수 파악 → 구문적 쉼 위치에서 흡기','말속도 · 손가락 두드리기·메트로놈 · 언어 단위를 점차 늘리기'],{tag:'운율'}); }},
 {id:'42-20',s:'N',t:'과소운동형은 외부 박자와 강도 단서가 도움이 될 수 있고, 과다운동형은 불수의적 움직임과 변동성을 고려해 안정적인 말 구간과 보완 전략을 찾습니다. 기법은 유형과 개인의 반응에 맞춰 선택합니다.'},
 {id:'42-20a',s:'N',t:'말속도 조절판은 빠른 말속도 때문에 명료도가 떨어지는 과소운동형에 특히 효과적입니다. 이때는 말속도를 늦추는 것이 치료의 초점이 되며, 운율 문제를 보이는 실조형에도 도움이 될 수 있습니다.',
  do(){ S.card('말속도 조절판 · 대상','Q. 말속도 조절판이 효과적인 마비말장애 유형은?',['과소운동형 · 빠른 말속도 + 낮은 자음정확도 → 속도 늦추기','실조형 · 운율 문제에 도움 가능','대부분의 마비말장애 · 말속도가 느려 빠르게 하는 훈련이 필요','속도 조절 · 손가락 두드리기 · 메트로놈 · 지연 청각 피드백'],{tag:'국시 빈출'}); sfx('ding'); later(()=>zoom(560,380,1.15,1400),1500); }},
 {id:'42-21',s:'N',t:'근전도, 이엠지는 근육의 전기적 활동을 기록하는 검사입니다. 신경근육 기능을 평가하는 데 쓰이며, 소리를 녹음하는 검사가 아닙니다. 임상에서는 말 표본과 신체·의학적 검사 결과를 함께 해석합니다.',do(){ zoomOut(); S.card('평가 도구 구분',['EMG · 근육의 전기적 활동 기록','음성·말 녹음 · 말소리와 음향 특성 분석','Nasometer · 비성도 · VFSS·FEES 등 삼킴 평가는 별도 목적','도구 결과는 임상 관찰·기능 보고와 통합']);}},
 {id:'42-22',s:'N',t:'중증도가 심하거나 피로로 말이 잘 전달되지 않으면 글자판, 의사소통 앱, 음성 증폭, 예·아니요 신호 등 보완대체의사소통을 함께 계획합니다. 이는 말 치료의 실패가 아니라 참여를 보장하는 전략입니다.'},
 {id:'42-23',s:'N',t:'치료 목표는 환자와 가족이 실제로 필요한 상황에서 메시지를 전달하는 것입니다. 평가에서 확인한 단서를 집과 지역사회에서도 사용하도록 연습하고, 변화하는 질환에서는 정기적으로 재평가합니다.',do(){S.card('임상 적용 체크',['개인 목표와 생활 맥락을 반영','한 체계만이 아니라 하위체계 간 상호작용 고려','피로·호흡·삼킴·안전 문제를 함께 살핌','AAC·환경 조절·대화 상대 전략 포함','일상 의사소통으로 일반화하고 재평가']);}},
 {id:'42-24',s:'N',t:'국시 핵심을 한 번 더 정리하겠습니다. 모음 연장은 최대발성시간과 음질, 에이엠알은 한 음절 반복, 에스엠알은 서로 다른 음절의 연속 산출을 평가합니다.'},
 {id:'42-25',s:'N',t:'호흡은 자세와 통제된 호기, 발성은 성대 내전 상태에 맞춘 접근, 공명은 연구개와 연인두 기능, 조음은 정확도와 명료도, 운율은 속도와 강세를 중심으로 치료합니다.',do(){S.card('국시 핵심 정리',['MPT · 정상 15초 이상 · 4~5초면 최소 호흡 기능','AMR 한 음절 반복 / SMR 음절 연속 · /퍼/ 입술 · /터/·/커/ 혀','과소내전 · 노력폐쇄·강한 성문 접촉 · 과도내전 · 하품-한숨','과대비성 · 인두피판술 · 구개거상기 · 구강개방 / 과소비성 · 비음-유음 자극','조음 · 조음점 지시 · 통합적 자극 · 과장된 조음 · 최소쌍','운율 · 말속도 조절판(과소운동형) · 강세대조 · 억양 프로파일']);}},
 ...quizSteps('q42_0',Q42[0],()=>prepQuiz()),...quizSteps('q42_1',Q42[1],()=>on('#q42_0',false)),...quizSteps('q42_2',Q42[2],()=>on('#q42_1',false)),...quizSteps('q42_3',Q42[3],()=>on('#q42_2',false)),...quizSteps('q42_4',Q42[4],()=>on('#q42_3',false)),...quizSteps('q42_5',Q42[5],()=>on('#q42_4',false)),
 {id:'42-26',s:'N',t:'이상으로 마비말장애의 유형, 평가와 치료를 마치겠습니다. 핵심은 병소와 말의 특성을 연결하고, 평가 프로파일에 맞춰 기능적 의사소통을 지원하는 것입니다.',do(){ on('#q42_5',false); W.show({brain:true});W.brain({op:1});W.lesion(null);W.view('front3q',1000);W.spin(0.08);}}, {wait:1700}
 ]});
})();
