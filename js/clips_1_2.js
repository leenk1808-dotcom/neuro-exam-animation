/* =================================================================
   1-2. 신경해부생리 ② 뇌신경 · 운동 경로
   자료: 신경언어장애 정리(메인) 뇌신경 표 · 특강 Part 1 (p11-12, 21, 90-108, 117-133, 179-190) · 교재 4장(p187-199) · 중간고사 정리(뇌신경, 근긴장)
   ================================================================= */
const CN=[
  ['I','후신경','S','후각'],['II','시신경','S','시각'],['III','동안신경','M','안구운동 · 동공 축소 · 눈꺼풀 올림'],['IV','활차신경','M','안구운동 (상사근)'],
  ['V','삼차신경','B','얼굴·치아·혀 앞 2/3 감각 / 저작 · 조음'],['VI','외전신경','M','안구운동 (외직근)'],['VII','안면신경','B','혀 앞 2/3 미각 / 얼굴 표정 · 조음 · 침 분비'],
  ['VIII','전정와우신경','S','청각 · 평형감각'],['IX','설인신경','B','혀 뒤 1/3 미각·감각 · 인두 감각 / 인두 운동'],['X','미주신경','B','인두·후두 감각 / 발성 · 연구개 · 인두·후두 운동'],
  ['XI','부신경','M','흉쇄유돌근 · 승모근'],['XII','설하신경','M','혀 운동 · 조음']];
const TYC={S:'#5EE0A8',M:'#FF7BA8',B:'#FFD25E'}, TYN={S:'감각',M:'운동',B:'혼합'};
function faceSVG(kind){
  // kind: n(정상) c(중추성: 환자 오른쪽 아래 얼굴만) p(말초성: 환자 오른쪽 얼굴 전체) · 화면 왼쪽 = 환자 오른쪽
  const droop = kind!=='n';
  const mouth = droop ? 'M108 292 Q140 292 196 262' : 'M104 262 Q150 286 196 262';
  const eyeL = kind==='p' ? '<ellipse cx="105" cy="168" rx="20" ry="14" fill="#fff"/><circle cx="105" cy="168" r="8" fill="#2B2B2B"/>' : '<ellipse cx="105" cy="168" rx="19" ry="10" fill="#fff"/><circle cx="105" cy="168" r="7" fill="#2B2B2B"/>';
  const browL = kind==='p' ? 'M80 142 Q105 138 130 144' : 'M80 136 Q105 126 130 136';
  const wr=(x1,x2,cls)=>[96,108,120].map(y=>`<path class="wr ${cls}" d="M${x1} ${y} Q${(x1+x2)/2} ${y-6} ${x2} ${y}" stroke="#B9826A" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('');
  return `<svg viewBox="0 0 300 372">
    <path d="M40 160 Q40 30 150 28 Q260 30 260 160 L258 210 Q250 320 150 332 Q50 320 42 210Z" fill="#F2C8A8"/>
    <path d="M40 150 Q36 22 150 18 Q264 22 260 150 Q250 70 150 66 Q50 70 40 150Z" fill="#4A3428"/>
    ${wr(84,140,kind==='p'?'gone':'')}${wr(160,216,'')}
    <path d="${browL}" stroke="#4A3428" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M170 136 Q195 126 220 136" stroke="#4A3428" stroke-width="7" fill="none" stroke-linecap="round"/>
    ${eyeL}<ellipse cx="195" cy="168" rx="19" ry="10" fill="#fff"/><circle cx="195" cy="168" r="7" fill="#2B2B2B"/>
    <path d="M150 180 L140 228 Q150 236 162 228" stroke="#C9967A" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="${mouth}" stroke="#B5524E" stroke-width="7" fill="none" stroke-linecap="round"/>
    <line x1="150" y1="40" x2="150" y2="325" stroke="rgba(0,0,0,.10)" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="62" y="362" font-size="16" font-weight="800" fill="#A9B8D8">환자 오른쪽</text><text x="168" y="362" font-size="16" font-weight="800" fill="#A9B8D8">환자 왼쪽</text></svg>`;
}
const Q12=[
  {sec:8, q:'감각신경으로만 이루어진 뇌신경끼리 묶인 것은?', opts:['I, II, VIII','III, IV, VI','V, VII, IX','IX, X, XII','I, V, VIII'], ans:0,
   say:'문제입니다. 감각신경으로만 이루어진 뇌신경끼리 묶인 것은 무엇일까요?', ex:'정답은 1번, 1번 후신경, 2번 시신경, 8번 전정와우신경입니다. 3번, 4번, 6번은 운동신경, 5번, 7번, 9번은 혼합신경입니다.'},
  {sec:7, q:'혀 앞 2/3의 미각(맛)을 담당하는 뇌신경은?', opts:['삼차신경 (V)','안면신경 (VII)','설인신경 (IX)','미주신경 (X)','설하신경 (XII)'], ans:1,
   say:'혀 앞 3분의 2의 맛을 담당하는 뇌신경은 무엇일까요?', ex:'정답은 2번, 안면신경입니다. 혀 앞쪽의 일반 감각은 삼차신경, 혀 뒤쪽의 맛과 감각은 설인신경, 혀의 운동은 설하신경입니다.'},
  {sec:8, q:'양측 상부운동신경원(UMN) 손상 시 나타나는 마비말장애와 특징으로 옳은 것은?', opts:['이완형 - 근위축, 섬유속연축','경직형 - 과다반사, 병적반사','실조형 - 과균등 강세','과소운동형 - 안정 시 떨림','이완형 - 최종공통경로 손상'], ans:1,
   say:'양측 상부운동신경원이 손상되었을 때 나타나는 마비말장애와 특징으로 옳은 것은?', ex:'정답은 2번입니다. 양측 UMN 손상은 경직형으로, 억제가 사라져 과다반사와 병적반사가 나타납니다. 근위축과 섬유속연축, 최종공통경로는 LMN, 즉 이완형 쪽입니다.'},
  {sec:9, q:'이마 주름은 양쪽 모두 지을 수 있고, 오른쪽 입꼬리만 처진 환자가 있다. 병변 위치로 가장 적절한 것은?', opts:['오른쪽 안면신경','왼쪽 안면신경','왼쪽 대뇌 (UMN)','오른쪽 대뇌 (UMN)','양쪽 안면신경'], ans:2,
   say:'마지막 문제입니다. 이마 주름은 양쪽 다 지을 수 있고, 오른쪽 입꼬리만 처진 환자입니다. 병변은 어디일까요?', ex:'정답은 3번입니다. 이마가 보존되었으니 중추성, 즉 UMN 손상이고, 아래 얼굴은 반대쪽 대뇌가 지배하므로 오른쪽 입꼬리가 처졌다면 왼쪽 대뇌 손상입니다.'},
];

CLIPS.push({ code:'1-2', short:'1-2 뇌신경·운동경로', title:'신경해부생리 ② 뇌신경 · 운동 경로', desc:'운동계 흐름 · 뇌신경 12쌍 · 혀 · 추체로/추체외로 · UMN/LMN · 안면마비 감별 · 퀴즈 4문제',
  build(S){
    const G=W.groups;
    W.show({brain:true}); W.view('front3q',0); W.spin(0.18);
    add(hdr('EP 1-2 · 신경해부생리 ②','뇌신경과 운동 경로'));
    const FL=[['1','움직임의 욕구','하고자 하는 의도'],['2','연합피질','운동 계획'],['3','기저핵 · 소뇌','운동 개시와 조절 · 협응'],['4','시상','운동 정보 중계'],['5','일차운동피질','운동 명령 생성'],
      ['6','추체로 · 추체외로','명령을 아래로 전달'],['7','뇌신경 · 척수신경','말초로 전달'],['8','신경근 접합부','아세틸콜린 분비'],['9','근육 수축','실제 움직임']];
    add(`<div class="glass flow fade" id="flow"><h3>운동계의 흐름</h3>${FL.map((f,i)=>`<div class="fi" id="fi${i+1}"><b>${f[0]}</b><div>${f[1]}<small>${f[2]}</small></div></div>`).join('')}</div>`);
    add(`<div class="glass cnt fade" id="cnt"><h3>뇌신경 12쌍 <span class="lg" style="background:${TYC.S}">감각</span><span class="lg" style="background:${TYC.M}">운동</span><span class="lg" style="background:${TYC.B}">혼합</span></h3><table>
      ${CN.map((c,i)=>`<tr id="cr${i+1}"><td class="r">${c[0]}</td><td class="nm">${c[1]}</td><td class="ty"><span style="background:${TYC[c[2]]}">${TYN[c[2]]}</span></td><td>${c[3]}</td></tr>`).join('')}</table></div>`);
    add(`<div class="glass mn fade" id="mn">${CN.map(c=>`<div style="background:${TYC[c[2]]}">${TYN[c[2]][0]}<small>${c[0]}</small></div>`).join('')}</div>`);
    add(`<div class="glass tg fade" id="tg"><h3>혀를 담당하는 뇌신경</h3>
      <div class="g4"><div class="h"></div><div class="h">앞 2/3</div><div class="h">뒤 1/3</div>
      <div class="h">일반 감각</div><div>V 삼차</div><div>IX 설인</div>
      <div class="h">미각</div><div class="hl-y">VII 안면</div><div>IX 설인</div>
      <div class="h">운동</div><div style="grid-column:span 2" class="hl-p">XII 설하 (혀 전체)</div></div>
      <div class="row fade" id="tg2" style="margin-top:12px;font-size:20px">XII 한쪽 마비 → 혀를 내밀면 <b class="hl-r">마비된 쪽</b>으로 기울어짐</div></div>`);
    add(`<div class="glass fade" id="sp" style="right:60px;top:150px;width:560px"><h3>말과 관련된 뇌신경</h3>
      <div class="row">발성 · <b class="hl-y">X</b> 미주</div>
      <div class="row">조음 · <b class="hl-y">V · VII · X · XII</b></div>
      <div class="row">공명 · <b class="hl-y">X</b> 중심, IX 보조</div>
      <div class="row">말 호흡 · 횡격신경(C3~C5) 등 <b>척수신경</b></div>
      <div class="row fade" id="sp2" style="margin-top:12px;padding:10px 14px;border-radius:12px;background:rgba(255,228,92,.12)">말 산출 뇌신경 6쌍 = <b class="hl-y">V · VII · IX · X · XI · XII</b></div></div>`);
    add(`<div class="glass fade" id="typ" style="right:60px;top:150px;width:560px"><h3>추체로 vs 추체외로</h3>
      <div class="row"><b class="hl-y">추체로</b> · 직접 활성화 경로<br><span style="font-size:19px">수의적 · 섬세한 움직임 · 시냅스 없이 직행</span></div>
      <div class="row" style="margin-top:10px"><b style="color:#C58BFF">추체외로</b> · 간접 활성화 경로<br><span style="font-size:19px">자세 · 근긴장 · 속도·범위 조절 · 동작을 시작하지는 않음</span></div>
      <div class="row fade" id="typ2" style="margin-top:14px;font-size:20px">⌨️ 타자 칠 때 손가락의 섬세한 움직임 = 추체로<br>그동안 팔·어깨 자세 유지 = 추체외로</div></div>`);
    add(`<div id="r12face" class="r12face fade">
      <div class="r12f-title"><b>뇌신경 얼굴 지도</b><small>감각 입력 · 표정 · 씹기 · 발성 · 삼킴</small></div>
      <div class="r12f-photo-frame"><img class="r12f-photo" src="img/rev12_face.webp" alt="정면 얼굴 뇌신경 지도">
        <div class="r12f-mark eyeL"><b>II</b><small>시각</small></div><div class="r12f-mark eyeR"><b>III · IV · VI</b><small>눈 움직임</small></div>
        <div class="r12f-mark nose"><b>I</b><small>후각</small></div>
        <div class="r12f-mark sensory"><b>V</b><small>얼굴 감각</small></div>
        <div class="r12f-mark jaw"><b>V</b><small>저작근</small></div>
        <div class="r12f-mark lips"><b>VII</b><small>표정 · 입술</small></div>
        <div class="r12f-mark ear"><b>VIII</b><small>청각 · 평형</small></div>
        <div class="r12f-mark throat"><b>IX · X</b><small>인두 · 후두</small></div>
        <div class="r12f-mark tongue"><b>XII</b><small>혀 운동</small></div>
        <div class="r12f-mark neck"><b>XI</b><small>목 · 어깨</small></div>
        <div class="r12f-branch"></div><div class="r12f-mouth-inset"><b>구강 기능 연결</b><span>V 앞혀 일반감각 · VII 앞혀 미각</span><span>IX 뒤혀 감각·미각 / 인두</span><span>X 발성·삼킴 · XII 혀 운동</span></div>
      </div>
      <svg class="r12f-svg" viewBox="0 0 1600 900" aria-hidden="true">
        <ellipse class="r12f-zone v" cx="385" cy="385" rx="115" ry="168"/><ellipse class="r12f-zone v" cx="650" cy="385" rx="115" ry="168"/>
        <path class="r12f-line v" d="M510 423 Q450 460 380 520 M510 423 Q575 460 650 520 M510 423 Q510 500 510 550"/>
        <ellipse class="r12f-zone vii" cx="385" cy="255" rx="100" ry="54"/><ellipse class="r12f-zone vii" cx="650" cy="255" rx="100" ry="54"/>
        <path class="r12f-line vii" d="M510 385 Q450 310 380 255 M510 385 Q575 310 650 255 M510 385 Q510 480 510 520"/>
        <ellipse class="r12f-zone eye" cx="385" cy="315" rx="90" ry="38"/><ellipse class="r12f-zone eye" cx="650" cy="315" rx="90" ry="38"/><circle class="r12f-zone nose" cx="510" cy="390" r="42"/>
        <path class="r12f-line xi" d="M510 620 Q485 730 410 810 M510 620 Q545 730 650 810"/><path class="r12f-line xii" d="M510 530 Q510 585 510 640"/>
        <path class="r12f-line ix" d="M510 535 Q690 585 850 610"/><path class="r12f-line x" d="M510 535 Q680 650 850 690"/>
      </svg>
      <div class="r12f-tag" style="left:160px;top:290px;--c:#5EE0A8">I · 후각</div><div class="r12f-tag" style="left:710px;top:270px;--c:#5EE0A8">II · 시각</div>
      <div class="r12f-tag" style="left:90px;top:420px;--c:#8EC5FF">V · 얼굴 감각</div><div class="r12f-tag" style="left:720px;top:420px;--c:#8EC5FF">V · 씹기</div>
      <div class="r12f-tag" style="left:180px;top:185px;--c:#FF7BA8">III · IV · VI · 눈운동</div><div class="r12f-tag" style="left:710px;top:335px;--c:#FFD25E">VII · 표정 · 입술</div>
      <div class="r12f-card glass" id="r12f-card"><h3>말·삼킴에서 꼭 볼 신경</h3><div><b style="color:#8EC5FF">V 삼차</b> 얼굴·구강 감각, 턱 저작</div><div><b style="color:#FFD25E">VII 안면</b> 입술 조음·표정, 앞 2/3 미각</div><div><b style="color:#FF9AC2">IX 설인</b> 뒤 1/3 감각·미각, 인두 감각·운동</div><div><b style="color:#FF795F">X 미주</b> 연구개·인두·후두 운동, 발성·공명·삼킴</div><div><b style="color:#C58BFF">XI 부신경</b> 목 돌림·어깨 들기</div><div><b style="color:#5FD3F0">XII 설하</b> 혀 운동·조음</div></div>
      <div class="r12f-inset"><b>구강·인두 기능 지도</b><span style="--c:#FFD25E">VII 앞혀 미각</span><span style="--c:#8EC5FF">V 앞혀 일반감각</span><span style="--c:#FF9AC2">IX 뒤혀·인두 감각 / 인두 운동</span><span style="--c:#FF795F">X 연구개·인두·후두 운동</span><span style="--c:#5FD3F0">XII 혀 운동</span></div>
    </div>`);    add(`<div class="glass cmp2 fade" id="ul"><table>
      <tr><th></th><th class="u cu">UMN 상부운동신경원</th><th class="l cl">LMN 하부운동신경원</th></tr>
      <tr><td>위치</td><td class="u">중추신경계<br>피질 → 뇌간·척수</td><td class="l">말초신경계<br>뇌신경 · 척수신경</td></tr>
      <tr><td>근긴장</td><td class="u">증가 (경직)</td><td class="l">저하 (이완)</td></tr>
      <tr><td>반사</td><td class="u">과다반사 · 병적반사</td><td class="l">감소 · 소실</td></tr>
      <tr><td>근위축</td><td class="u">거의 없음</td><td class="l">위축 · 섬유속연축</td></tr>
      <tr><td>마비말장애</td><td class="u"><b>경직형</b> (양측)<br>일측 UMN형 (한쪽)</td><td class="l"><b>이완형</b><br>최종공통경로</td></tr></table></div>`);
    add(`<div class="glass fade" id="tone" style="left:50%;translate:-50% 0;top:150px;width:1200px;display:flex;gap:14px;padding:20px">
      <div style="flex:1;padding:14px;border-radius:14px;background:rgba(255,201,74,.12)"><h3 class="hl-y">경직 (spasticity)</h3><div class="row" style="font-size:20px">UMN 손상<br>갑자기 힘을 주면 저항이 커짐</div></div>
      <div style="flex:1;padding:14px;border-radius:14px;background:rgba(197,139,255,.14)"><h3 style="color:#C58BFF">강직 (rigidity)</h3><div class="row" style="font-size:20px">추체외로 손상<br>움직이는 내내 같은 저항<br>톱니바퀴 · 납파이프 강직</div></div>
      <div style="flex:1;padding:14px;border-radius:14px;background:rgba(95,211,240,.12)"><h3 style="color:#5FD3F0">이완 (flaccidity)</h3><div class="row" style="font-size:20px">LMN 손상<br>근긴장 저하 · 늘어짐</div></div></div>`);
    add(`<div class="glass cmp2 fade" id="p90" style="width:640px"><h3>운동 경로와 마비말장애</h3><table>
      <tr><td style="color:#FFC94A">추체로 · UMN</td><td>경직형 (양측) · 일측 UMN형</td></tr>
      <tr><td style="color:#C58BFF">추체외로</td><td>과소운동형 · 과다운동형</td></tr>
      <tr><td style="color:#FF9F6B">소뇌계</td><td>실조형</td></tr>
      <tr><td style="color:#5FD3F0">LMN</td><td>이완형</td></tr></table></div>`);
    add(`<div class="glass cmp2 fade" id="bulb" style="width:660px"><h3>연수마비 vs 가성연수마비</h3><table>
      <tr><th></th><th class="cl">연수마비</th><th class="cu">가성연수마비</th></tr>
      <tr><td>손상</td><td>LMN (연수의 뇌신경 핵·신경)</td><td>양측 UMN (피질연수로)</td></tr>
      <tr><td>유형</td><td><b>이완형</b></td><td><b>경직형</b></td></tr>
      <tr><td>음질 · 반사</td><td>기식성 음성 · 구역반사 감소</td><td>쥐어짜는 음질 · 반사 항진</td></tr>
      <tr><td>그 밖</td><td>근위축 · 섬유속연축</td><td>가성구 감정 (병적 웃음·울음) · 침흘림</td></tr></table></div>`);
    add(`<div class="faces fade" id="faces">
      <div class="glass fc" style="position:relative"><h4>정상<small>&nbsp;</small></h4>${faceSVG('n')}<div class="nt">양쪽 이마 주름 · 대칭</div></div>
      <div class="glass fc" style="position:relative"><h4 class="hl-y">중추성 안면마비<small>UMN · 왼쪽 대뇌 손상</small></h4>${faceSVG('c')}<div class="nt">이마 주름 <b class="hl-g">보존</b><br>오른쪽 <b>아래 얼굴만</b> 처짐 (반대쪽)</div></div>
      <div class="glass fc" style="position:relative"><h4 style="color:#5FD3F0">말초성 안면마비<small>LMN · 오른쪽 안면신경 손상</small></h4>${faceSVG('p')}<div class="nt">이마 주름 <b class="hl-r">소실</b> · 눈 감기 어려움<br>오른쪽 <b>얼굴 전체</b> 마비 (같은 쪽)</div></div></div>`);
    add(`<div class="glass fade" id="fpt" style="left:50%;translate:-50% 0;top:655px;width:900px;text-align:center;padding:12px"><div class="row" style="font-size:25px">이마가 <b class="hl-g">보존</b>되면 <b class="hl-y">중추성</b> · 이마까지 <b class="hl-r">마비</b>되면 <b style="color:#5FD3F0">말초성</b></div></div>`);
    add(`<div class="glass sumg fade" id="sum2">
      <div class="sc" style="--c:#FFE45C"><h4>운동계 흐름</h4><div>연합피질 계획 → 기저핵·소뇌 조절 → 시상<br>→ 일차운동피질 → 추체로/추체외로 → 근육</div></div>
      <div class="sc" style="--c:#5EE0A8"><h4>뇌신경 분류</h4><div>감각 I · II · VIII / 운동 III · IV · VI · XI · XII<br>혼합 V · VII · IX · X (감감운운 혼운혼감 혼혼운운)</div></div>
      <div class="sc" style="--c:#FF8CC6"><h4>혀</h4><div>운동 XII · 감각 앞 V / 뒤 IX<br>미각 앞 VII / 뒤 IX · XII 마비 → 마비 쪽으로</div></div>
      <div class="sc" style="--c:#FFC94A"><h4>추체로</h4><div>직접 경로 · 수의운동<br>피질척수로 + 피질연수로 · 연수 추체 교차 80~90%</div></div>
      <div class="sc" style="--c:#C58BFF"><h4>추체외로</h4><div>간접 경로 · 기저핵·소뇌 고리<br>자세·근긴장 조절 · 시작은 안 함</div></div>
      <div class="sc" style="--c:#5FD3F0"><h4>UMN vs LMN</h4><div>UMN 양측 → 경직형 (과다반사·병적반사)<br>LMN = 최종공통경로 → 이완형 (위축·연축)</div></div>
      <div class="sc" style="--c:#FFAE5C"><h4>양측 vs 일측</h4><div>대부분 양측 지배 → 일측 손상은 경미 (UUMN)<br>아래 얼굴 · 혀만 반대쪽 지배</div></div>
      <div class="sc" style="--c:#FF6B6B"><h4>가성연수마비</h4><div>양측 피질연수로 → 경직형 + 가성구 감정<br>연수마비 = LMN → 이완형</div></div>
      <div class="sc" style="--c:#9FB2DA"><h4>안면마비</h4><div>이마 보존 = 중추성 (반대쪽 아래 얼굴)<br>이마까지 = 말초성 (같은 쪽 전체)</div></div></div>`);
    Q12.forEach((q,i)=>add(quizHTML('q12_'+i, q)));

    /* 3D 라벨 */
    const ROM=['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
    const off={1:[-40,-60],2:[-90,-30],3:[-80,10],4:[-40,-70],5:[-90,-40],6:[-30,60],7:[-90,30],8:[-70,-50],9:[-90,40],10:[-80,40],11:[-60,60],12:[-20,80]};
    for(let n=1;n<=12;n++){ const inf=W.cnInfo[n]; L3('cn'+n, `${ROM[n]} <small>${CN[n-1][1]}</small>`, G.cn, (n===10||n===11)?inf.mid:inf.end, {color:TYC[inf.type], dx:off[n][0], dy:off[n][1]}); }
    L3('mUMN','UMN · 추체로 <small>피질척수로</small>', G.motor, Vx(-0.4,0.15,-0.02), {color:'#FFC94A', dx:-140, dy:-60, cls:'big'});
    L3('mCB','피질연수로 <small>→ 뇌신경 핵 (양측)</small>', G.motor, Vx(-0.1,-0.55,0.12), {color:'#FFB347', dx:-170, dy:-20});
    L3('mDec','연수 추체 교차 <small>80~90%</small>', G.motor, Vx(0,-0.98,0.18), {color:'#FFE45C', dx:-170, dy:30, cls:'big'});
    L3('mLMN','LMN · 척수신경 <small>최종공통경로</small>', G.motor, Vx(0.7,-1.98,0.12), {color:'#5FD3F0', dx:-60, dy:-90, cls:'big'});
    L3('mLMNc','LMN · 뇌신경', G.motor, Vx(-0.3,-0.59,-0.05), {color:'#5FD3F0', dx:-120, dy:60});
    L3('mMus','근육', G.motor, Vx(1.2,-2.2,0.02), {color:'#E86A6A', dx:80, dy:60});
    L3('mEP','추체외로 고리 <small>기저핵 · 시상</small>', G.motor, Vx(-0.33,-0.05,-0.12), {color:'#C58BFF', dx:-150, dy:60, cls:'big'});
    L3('mCL','소뇌 고리', G.motor, Vx(-0.36,-0.5,0.58), {color:'#FF9F6B', dx:90, dy:70, cls:'big'});
    L3('mLU','UMN 손상', G.motor, Vx(-0.22,-0.06,0.02), {color:'#FF3B3B', dx:-110, dy:-70});
    L3('mLL','LMN 손상', G.motor, Vx(0.5,-1.9,0.16), {color:'#FF3B3B', dx:90, dy:-70});
    S.cnHi=(list, dimOthers=true)=>{ for(let n=1;n<=12;n++){ const on_=list.includes(n); W.part('cn'+n,{op:on_||!dimOthers?1:0.2, em:on_&&dimOthers?0.55:0}); W.lbl('cn'+n, on_ && dimOthers); }
      $$('#cnt tr').forEach((r,i)=>r.classList.toggle('on', dimOthers && list.includes(i+1))); $('#cnt').classList.toggle('dimrows', dimOthers && list.length>0); };
    S.flow=(upto, cur)=>{ for(let i=1;i<=9;i++){ const e=$('#fi'+i); e.classList.toggle('on', cur.includes(i)); e.style.opacity = i<=upto?1:0.3; } };
    S.motorOnly=(list)=>{ W.part(['midbrain','pons','medulla','cordTop','cordLong'],{op:0.3}); ['umn','cbulbar','lmn','muscle','epLoop','cbLoop'].forEach(n=>W.part(n,{op:list.includes(n)?1:0.12, em:list.includes(n)?0.35:0})); };
  },
  steps:[
    {wait:800},
    {id:'2-01', s:'N', t:'1편 신경해부생리, 두 번째 시간입니다. 오늘은 뇌신경 12쌍과, 운동 명령이 근육까지 가는 길을 살펴봅니다.'},
    /* A. 운동계 흐름 */
    {id:'2-02', s:'N', t:'움직임은 이렇게 만들어집니다. 먼저 연합피질에서 운동을 계획하고, 기저핵과 소뇌가 이를 조절해, 시상을 거쳐 일차운동피질에서 운동 명령이 만들어집니다.',
      do(S){ on('#hd',false); W.spin(0); W.shift(-300); W.brain({op:0.16}); W.show({deep:true}); ['thalamus','caudate','putamen','pallidus'].forEach(n=>W.part(n,{op:1,em:0.3})); ['hypothalamus','pineal','nigra','callosum'].forEach(n=>W.part(n,{op:0}));
        W.view('xray'); on('#flow'); S.flow(0,[]); seq([()=>S.flow(2,[1,2]),()=>{S.flow(3,[3]); W.part('cerebellum',{em:0.5});},()=>{S.flow(4,[4]); W.part('thalamus',{em:0.8});},()=>S.flow(5,[5])], 2600); }},
    {id:'2-03', s:'N', t:'이 명령은 추체로와 추체외로를 따라 내려가 뇌신경과 척수신경으로 전달되고, 신경근 접합부에서 아세틸콜린이 분비되면서 근육이 수축합니다.',
      do(S){ W.part('cerebellum',{em:0}); W.show({deep:false, cns:true, motor:true}); W.fib('pns',0); S.motorOnly(['umn','lmn','muscle','cbulbar']); W.part(['epLoop','cbLoop'],{op:0}); W.view('motor',2200);
        seq([()=>S.flow(6,[6]),()=>S.flow(7,[7]),()=>S.flow(8,[8]),()=>{ S.flow(9,[9]); W.part('muscle',{em:0.7}); sfx('ding'); }], 2300); }},
    /* B. 뇌신경 */
    {id:'2-04', s:'N', t:'먼저 말초로 나가는 출구, 뇌신경입니다. 뇌신경은 모두 12쌍이고, 뇌의 아래쪽에서 나옵니다.',
      do(S){ on('#flow',false); W.part(['midbrain','pons','medulla','cordTop'],{op:1}); W.show({motor:false, cns:false, cn:true}); W.brain({op:0.14}); W.part('cerebellum',{op:0.35}); W.shift(-330); W.view('cnView',2200); later(()=>{ on('#cnt'); S.cnHi([1,2,3,4,5,6,7,8,9,10,11,12],false); sfx('whoosh'); },900); }},
    {id:'2-05', s:'N', t:'1번 후신경과 2번 시신경을 뺀 10쌍은 모두 뇌간에서 나옵니다.', do(S){ S.cnHi([3,4,5,6,7,8,9,10,11,12]); W.part(['midbrain','pons','medulla'],{em:0.4}); sfx('glow'); }},
    {id:'2-06', s:'N', t:'색으로 구분해 볼까요? 초록색은 감각신경, 분홍색은 운동신경, 노란색은 감각과 운동을 함께 하는 혼합신경입니다.', do(S){ W.part(['midbrain','pons','medulla'],{em:0}); S.cnHi([1,2,3,4,5,6,7,8,9,10,11,12],false); W.lblAllOff(); sfx('pop'); }},
    {id:'2-07', s:'N', t:'감각신경은 1번 후신경, 2번 시신경, 8번 전정와우신경, 세 쌍입니다.', do(S){ S.cnHi([1,2,8]); sfx('pop'); }},
    {id:'2-08', s:'N', t:'운동신경은 눈을 움직이는 3번, 4번, 6번과, 11번 부신경, 12번 설하신경, 다섯 쌍입니다.', do(S){ S.cnHi([3,4,6,11,12]); sfx('pop'); }},
    {id:'2-09', s:'N', t:'나머지 5번, 7번, 9번, 10번, 네 쌍이 혼합신경입니다. 말과 삼킴에 중요한 신경이 대부분 여기에 있습니다.', do(S){ S.cnHi([5,7,9,10]); sfx('pop'); }},
    {id:'2-10', s:'N', t:'순서대로 외워 볼까요? 감, 감, 운, 운, 혼, 운, 혼, 감, 혼, 혼, 운, 운.', do(S){ S.cnHi([1,2,3,4,5,6,7,8,9,10,11,12],false); W.lblAllOff(); on('#cnt',false); W.shift(0); W.view('cnFront',1800); later(()=>{ on('#mn'); sfx('levelup'); },500); }, gap:1200},
    {id:'2-11', s:'N', t:'하나씩 보겠습니다. 1번 후신경은 냄새, 즉 후각을, 2번 시신경은 시각을 담당합니다.', do(S){ on('#mn',false); W.shift(-330); W.view('cnView'); on('#cnt'); S.cnHi([1,2]); sfx('pop'); }},
    {id:'2-12', s:'N', t:'3번 동안신경, 4번 활차신경, 6번 외전신경은 눈을 움직입니다. 동안신경은 동공을 수축시키고 눈꺼풀도 올려 줍니다.', do(S){ S.cnHi([3,4,6]); sfx('pop'); }},
    {id:'2-13', s:'N', t:'5번 삼차신경은 얼굴과 치아, 혀 앞 3분의 2의 일반 감각을 받고, 턱을 움직여 씹기와 조음을 돕습니다.', say:'오번 삼차신경은 얼굴과 치아, 혀 앞 삼분의 이의 일반 감각을 받고, 턱을 움직여 씹기와 조음을 돕습니다.', do(S){ S.cnHi([5]); sfx('pop'); }},
    {id:'2-14', s:'N', t:'7번 안면신경은 얼굴 표정 근육을 움직여 입술 조음에 관여하고, 혀 앞 3분의 2의 맛과 침 분비를 담당합니다.', say:'칠번 안면신경은 얼굴 표정 근육을 움직여 입술 조음에 관여하고, 혀 앞 삼분의 이의 맛과 침 분비를 담당합니다.', do(S){ S.cnHi([7]); sfx('pop'); }},
    {id:'2-15', s:'N', t:'8번 전정와우신경은 청각과 평형감각을 담당합니다.', do(S){ S.cnHi([8]); sfx('pop'); }},
    {id:'2-16', s:'N', t:'9번 설인신경은 혀 뒤 3분의 1의 맛과 감각, 인두의 감각을 받고, 인두 근육을 움직입니다.', say:'구번 설인신경은 혀 뒤 삼분의 일의 맛과 감각, 인두의 감각을 받고, 인두 근육을 움직입니다.', do(S){ S.cnHi([9]); sfx('pop'); }},
    {id:'2-17', s:'N', t:'10번 미주신경은 가장 길게 뻗어 나가는 신경입니다. 연구개와 인두, 후두 근육을 움직여 발성과 공명, 삼킴에 모두 중요합니다.', do(S){ S.cnHi([10]); sfx('pop'); }},
    {id:'2-18', s:'N', t:'11번 부신경은 목의 흉쇄유돌근과 어깨의 승모근을, 12번 설하신경은 혀의 움직임을 담당합니다.', do(S){ S.cnHi([11,12]); sfx('pop'); }},
    {id:'2-19', s:'N', t:'혀는 국시 단골입니다. 혀의 운동은 12번, 일반 감각은 앞쪽이 5번, 뒤쪽이 9번, 맛은 앞쪽이 7번, 뒤쪽이 9번입니다.',
      do(S){ on('#cnt',false); S.cnHi([5,7,9,12]); W.shift(-280); later(()=>{ on('#tg'); sfx('pop'); },400); }},
    {id:'2-20', s:'N', t:'한쪽 설하신경이 마비되면, 혀를 내밀 때 마비된 쪽으로 기울어집니다.', do(S){ S.cnHi([12]); on('#tg2'); sfx('pop'); }},
    {id:'2-21', s:'N', t:'말과 관련된 뇌신경을 정리하면, 발성은 10번, 조음은 5번, 7번, 10번, 12번, 공명은 10번이 중심이고 9번이 돕습니다. 말 호흡은 횡격신경 같은 척수신경이 주로 담당합니다.',
      do(S){ on('#tg',false); S.cnHi([5,7,9,10,12]); later(()=>{ on('#sp'); sfx('pop'); },400); }},
    {id:'2-22', s:'N', t:'그래서 말 산출에 관여하는 뇌신경 6쌍은 5번, 7번, 9번, 10번, 11번, 12번입니다.', do(S){ S.cnHi([5,7,9,10,11,12]); on('#sp2'); sfx('ding'); }},
    /* B-1. 얼굴·머리 뇌신경 지도 */
    {id:'2-22a',s:'N',t:'이제 얼굴 그림에서 뇌신경이 맡는 부위를 연결해 보겠습니다. 화면의 좌우 영역은 기능을 이해하기 위한 지도이며, 실제 신경 가지가 피부 위에 이렇게 그려져 있다는 뜻은 아닙니다.',say:'이제 얼굴 그림에서 뇌신경이 맡는 부위를 연결해 보겠습니다. 화면의 좌우 영역은 기능을 이해하기 위한 지도이며, 실제 신경 가지가 피부 위에 이렇게 그려져 있다는 뜻은 아닙니다.',do(){on('#sp',false);on('#r12face');zoom(470,410,1.12,900);sfx('whoosh');}},
    {id:'2-22b',s:'N',t:'삼차신경 5번은 얼굴과 치아, 혀 앞쪽의 일반 감각을 전달합니다. 턱 근육도 움직여 저작을 돕습니다. 안면신경 7번은 표정근육을 움직여 눈을 감고 입술을 오므리게 하므로 입술 조음에도 중요합니다.',say:'삼차신경 오번은 얼굴과 치아, 혀 앞쪽의 일반 감각을 전달합니다. 턱 근육도 움직여 저작을 돕습니다. 안면신경 칠번은 표정근육을 움직여 눈을 감고 입술을 오므리게 하므로 입술 조음에도 중요합니다.',do(){zoom(500,400,1.24,1000);sfx('glow');}},
    {id:'2-22c',s:'N',t:'눈의 움직임은 3번, 4번, 6번이 함께 맡고, 코의 후각은 1번, 시각은 2번입니다. 얼굴 표면의 눈과 코 표지는 각 기능을 연결해 보여 줍니다.',say:'눈의 움직임은 삼번, 사번, 육번이 함께 맡고, 코의 후각은 일번, 시각은 이번입니다. 얼굴 표면의 눈과 코 표지는 각 기능을 연결해 보여 줍니다.',do(){zoom(495,300,1.28,1000);sfx('pop');}},
    {id:'2-22d',s:'N',t:'말과 삼킴에서는 다섯 신경을 특히 구분하세요. 5번은 씹기와 구강 감각, 7번은 입술 조음과 혀 앞쪽 맛, 9번은 혀 뒤쪽과 인두 감각 및 인두 운동을 맡습니다.',say:'말과 삼킴에서는 다섯 신경을 특히 구분하세요. 오번은 씹기와 구강 감각, 칠번은 입술 조음과 혀 앞쪽 맛, 구번은 혀 뒤쪽과 인두 감각 및 인두 운동을 맡습니다.',do(){zoomOut(500);$('#r12f-card').classList.add('on');zoom(900,560,1.12,900);sfx('glow');}},
    {id:'2-22e',s:'N',t:'10번 미주신경은 연구개와 인두, 후두 운동의 중심으로 발성, 공명, 삼킴을 돕습니다. 12번 설하신경은 혀를 움직여 조음하고, 11번 부신경은 목 돌림과 어깨 들기를 담당합니다. 기능 지도로 위치와 역할을 함께 확인하세요.',say:'십번 미주신경은 연구개와 인두, 후두 운동의 중심으로 발성, 공명, 삼킴을 돕습니다. 십이번 설하신경은 혀를 움직여 조음하고, 십일번 부신경은 목 돌림과 어깨 들기를 담당합니다. 기능 지도로 위치와 역할을 함께 확인하세요.',do(){zoomOut(500);$('#r12face').classList.add('swallow');zoom(900,700,1.08,900);sfx('ding');}},
    {id:'2-22f',s:'N',t:'정리하면 얼굴 감각과 저작은 5번, 표정과 입술은 7번, 인두 감각과 운동은 9번, 발성과 삼킴은 10번, 목과 어깨는 11번, 혀 운동은 12번입니다.',say:'정리하면 얼굴 감각과 저작은 오번, 표정과 입술은 칠번, 인두 감각과 운동은 구번, 발성과 삼킴은 십번, 목과 어깨는 십일번, 혀 운동은 십이번입니다.',do(){zoomOut(500);$('#r12face').classList.remove('swallow');on('#r12face',false);}},
    /* C. 하행 운동로 */
    {id:'2-23', s:'N', t:'이제 운동 명령이 내려가는 길, 하행 운동로입니다. 추체로와 추체외로가 있습니다.',
      do(S){ on('#sp',false); S.cnHi([]); W.lblAllOff(); W.show({cn:false, cns:true, motor:true}); W.fib('pns',0); W.part('cerebellum',{op:0.35}); W.brain({op:0.14}); W.shift(0); S.motorOnly(['umn','cbulbar','lmn','muscle']); W.part(['epLoop','cbLoop'],{op:0}); W.view('motor',2200); sfx('whoosh'); }},
    {id:'2-24', s:'N', t:'추체로는 대뇌피질의 운동영역에서 시작해, 시냅스 없이 곧장 뇌간과 척수까지 내려가는 직접 활성화 경로입니다. 수의적이고 섬세한 움직임을 담당합니다.', do(S){ S.motorOnly(['umn']); W.lbl('mUMN'); sfx('zap'); }},
    {id:'2-25', s:'N', t:'추체로는 척수로 가는 피질척수로와, 뇌간의 뇌신경 핵으로 가는 피질연수로로 나뉩니다. 말과 특히 관련 깊은 것이 피질연수로입니다.', do(S){ S.motorOnly(['umn','cbulbar']); W.part('cbulbar',{em:0.7}); W.lbl('mCB'); sfx('zap'); }},
    {id:'2-26', s:'N', t:'피질척수로의 80에서 90퍼센트는 연수의 추체에서 반대쪽으로 교차합니다. 그래서 왼쪽 뇌는 오른쪽 몸을 움직입니다.', say:'피질척수로의 팔십에서 구십 퍼센트는 연수의 추체에서 반대쪽으로 교차합니다. 그래서 왼쪽 뇌는 오른쪽 몸을 움직입니다.',
      do(S){ W.lbl(['mUMN','mCB'],false); S.motorOnly(['umn']); W.view('decus',2000); later(()=>{ W.lbl('mDec'); sfx('glow'); },1200); }},
    {id:'2-27', s:'N', t:'추체외로는 기저핵, 소뇌, 시상, 뇌간이 고리처럼 이어진 간접 활성화 경로입니다. 움직임을 시작하지는 않지만, 자세와 근긴장, 운동의 속도와 범위를 무의식적으로 조절합니다.',
      do(S){ W.lbl('mDec',false); S.motorOnly(['epLoop','cbLoop']); W.show({deep:true}); ['thalamus','putamen','caudate','pallidus'].forEach(n=>W.part(n,{op:0.9,em:0.2})); ['hypothalamus','pineal','nigra','callosum'].forEach(n=>W.part(n,{op:0})); W.part('cerebellum',{op:0.6}); W.view('loop',2200);
        later(()=>{ W.lbl(['mEP','mCL']); sfx('zap'); },1300); }},
    {id:'2-28', s:'N', t:'예를 들어 타자를 칠 때, 손가락 하나하나의 섬세한 움직임은 추체로가, 그동안 팔과 어깨의 자세를 잡아 주는 것은 추체외로가 담당합니다.', do(){ W.lblAllOff(); W.shift(-300); on('#typ'); later(()=>on('#typ2'),2500); sfx('pop'); }},
    /* D. UMN / LMN */
    {id:'2-29', s:'N', t:'운동신경은 상부운동신경원, UMN과 하부운동신경원, LMN으로도 나눕니다.',
      do(S){ on('#typ',false); W.lblAllOff(); W.show({deep:false}); W.part('cerebellum',{op:0.35}); S.motorOnly(['umn','cbulbar','lmn','muscle']); W.shift(-300); W.view('motor',2000); later(()=>{ on('#ul'); sfx('pop'); },600); }},
    {id:'2-30', s:'N', t:'UMN은 대뇌피질에서 뇌간이나 척수까지 이어지는 중추신경계의 운동신경원입니다. 추체로와 추체외로를 이루는 신경원이 모두 UMN입니다.', do(S){ S.motorOnly(['umn','cbulbar']); $('#ul').className='glass cmp2 fade on u'; W.lbl('mUMN'); sfx('glow'); }},
    {id:'2-31', s:'N', t:'LMN은 뇌신경과 척수신경처럼 근육을 직접 지배하는 말초신경계의 운동신경원입니다. 모든 운동 명령이 마지막으로 지나는 길이라 최종공통경로라고 부릅니다.', do(S){ S.motorOnly(['lmn','muscle']); $('#ul').className='glass cmp2 fade on l'; W.lbl('mUMN',false); W.lbl(['mLMN','mMus']); sfx('glow'); }},
    {id:'2-32', s:'N', t:'UMN이 양쪽 모두 손상되면 근육에 대한 억제가 사라져, 근긴장이 높아지고 반사가 지나치게 강해집니다. 바빈스키 같은 병적반사도 나타나는데, 이것이 경직형 마비말장애입니다.',
      do(S){ W.lbl(['mLMN','mMus'],false); S.motorOnly(['umn','cbulbar','lmn','muscle']); W.part('lesU',{op:1,em:0.9}); W.lbl('mLU'); $('#ul').className='glass cmp2 fade on u'; sfx('bad'); }},
    {id:'2-33', s:'N', t:'근육의 영양은 LMN이 담당하기 때문에, UMN 손상에서는 근위축이 거의 없습니다.', do(){ W.part('muscle',{em:0.4}); }},
    {id:'2-34', s:'N', t:'반대로 LMN이 손상되면 근육이 약해지고 늘어지며 반사가 줄어듭니다. 근위축과 섬유속연축도 나타나는데, 이것이 이완형 마비말장애입니다.',
      do(S){ W.part('lesU',{op:0}); W.lbl('mLU',false); W.part('lesL',{op:1,em:0.9}); W.lbl('mLL'); W.part('muscle',{em:0}); $('#ul').className='glass cmp2 fade on l'; sfx('bad'); }},
    {id:'2-35', s:'N', t:'근긴장 검사도 함께 기억하세요. 경직은 UMN 손상으로, 갑자기 힘을 주면 저항이 커집니다. 강직은 추체외로 손상으로, 움직이는 내내 저항이 계속되며 톱니바퀴 강직과 납파이프 강직이 있습니다. 이완은 LMN 손상입니다.',
      do(){ on('#ul',false); W.part('lesL',{op:0}); W.lblAllOff(); W.shift(0); W.brain({op:0}); later(()=>{ W.show({motor:false, cns:false, brain:false}); on('#tone'); sfx('pop'); },500); }},
    {id:'2-36', s:'N', t:'정리하면 추체로와 UMN은 경직형과 일측 UMN형, 추체외로는 과소운동형과 과다운동형, 소뇌계는 실조형, LMN은 이완형 마비말장애와 연결됩니다.',
      do(){ on('#tone',false); W.show({brain:true, cns:true, motor:true}); W.fib('pns',0); W.brain({op:0.14}); W.part(['umn','cbulbar','lmn','muscle','epLoop','cbLoop'],{op:1, em:0.2}); W.shift(-310); W.view('motor',1500); later(()=>{ on('#p90'); sfx('ding'); },500); }},
    /* E. 양측 vs 일측 */
    {id:'2-37', s:'N', t:'그런데 왜 경직형은 양측 손상이어야 할까요? 말 근육을 움직이는 뇌신경 핵 대부분은, 양쪽 대뇌에서 동시에 명령을 받기 때문입니다.',
      do(S){ on('#p90',false); W.shift(0); S.motorOnly(['cbulbar','lmn']); W.part('cbulbar',{em:0.8}); W.cam([0,-0.5,-2.9],[0,-0.55,0.05],2000); later(()=>{ W.lbl(['mCB','mLMNc']); sfx('glow'); },1500); }},
    {id:'2-38', s:'N', t:'그래서 한쪽만 손상되면 반대쪽이 보완해 증상이 가볍습니다. 이것이 일측 상부운동신경형 마비말장애입니다. 다만 아래 얼굴과 혀는 반대쪽 대뇌의 지배를 주로 받아서, 손상 반대쪽의 아래 얼굴과 혀가 약해집니다. 몇 주 안에 회복되는 경우가 많습니다.', do(){ sfx('pop'); }},
    {id:'2-39', s:'N', t:'양측 피질연수로가 손상되면 가성연수마비가 생깁니다. 경직형 마비말장애와 삼킴장애, 그리고 상황과 맞지 않게 웃음이나 울음이 터지는 가성구 감정이 나타날 수 있습니다.',
      do(){ W.lblAllOff(); W.shift(-310); on('#bulb'); sfx('pop'); }},
    {id:'2-40', s:'N', t:'반면 연수의 뇌신경 핵이나 신경 자체, 즉 LMN이 손상된 진짜 연수마비는 이완형 마비말장애입니다.', do(){ sfx('pop'); }},
    /* F. 안면마비 */
    {id:'2-41', s:'N', t:'이 원리로 안면마비도 구분할 수 있습니다. 핵심은 이마 주름입니다.',
      do(){ on('#bulb',false); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false, cns:false, motor:false}); on('#faces'); sfx('whoosh'); },500); }},
    {id:'2-42', s:'N', t:'이마 근육은 양쪽 대뇌의 지배를 받지만, 아래 얼굴은 반대쪽 대뇌의 지배만 받습니다. 이마에 주름을 지어 볼까요?', do(){ later(()=>{ $('#faces').classList.add('wrinkle'); sfx('pop'); },3800); }},
    {id:'2-43', s:'N', t:'중추성 안면마비, 즉 UMN 손상에서는 이마 주름은 지을 수 있고, 손상된 뇌의 반대쪽 아래 얼굴만 처집니다.', do(){ $('#faces').classList.add('wrinkle'); $$('#faces .fc').forEach((e,i)=>e.style.opacity=i===1?1:0.35); sfx('glow'); }},
    {id:'2-44', s:'N', t:'말초성 안면마비, 즉 안면신경 자체의 LMN 손상에서는 같은 쪽 얼굴 전체가 마비되어, 이마 주름도 사라지고 눈도 꼭 감기지 않습니다.', do(){ $$('#faces .fc').forEach((e,i)=>e.style.opacity=i===2?1:0.35); sfx('glow'); }},
    {id:'2-45', s:'N', t:'이마가 보존되면 중추성, 이마까지 마비되면 말초성. 꼭 기억하세요.', do(){ $$('#faces .fc').forEach(e=>e.style.opacity=1); on('#fpt'); sfx('ding'); }},
    /* G. 정리 + 퀴즈 */
    {id:'2-46', s:'N', t:'오늘 배운 내용을 한 장으로 정리합니다.', do(){ on('#faces',false); on('#fpt',false); later(()=>{ on('#sum2'); sfx('ding'); },400); }, gap:2600},
    ...quizSteps('q12_0', Q12[0], ()=>on('#sum2',false)),
    ...quizSteps('q12_1', Q12[1], ()=>on('#q12_0',false)),
    ...quizSteps('q12_2', Q12[2], ()=>on('#q12_1',false)),
    ...quizSteps('q12_3', Q12[3], ()=>on('#q12_2',false)),
    {id:'2-47', s:'N', t:'수고하셨습니다. 다음 시간에는 뇌혈관과 뇌졸중을 살펴봅니다.', do(){ on('#q12_3',false); W.show({brain:true}); W.brain({op:1}); W.view('front3q',0); W.spin(0.2); }},
    {wait:2000},
  ]});
