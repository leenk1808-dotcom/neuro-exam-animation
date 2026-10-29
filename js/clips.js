/* =========================================================
   clips.js : 편별 장면과 내레이션 대본
   자료: 신경언어장애 정리(메인) + 2026 국시 특강 Part 1·2(이창윤) + 언어기관의 해부와 생리 4판(고도흥) + 말운동장애 중간고사 정리
   ========================================================= */

function L3(id, text, anchor, local, opt={}){ return W.label(id, text, anchor, local, opt); }
const Vx=(x,y,z)=>new THREE.Vector3(x,y,z);

/* =================================================================
   0. 오프닝
   ================================================================= */
const ST_X = i => 183 + i*358;
const Q_OPEN = {kind:'기출', sec:9, compact:true,
  q:'다음은 언어 및 말 산출 단계에 대한 모식도이다. ( ) 안에 각각 들어갈 단어로 알맞은 것은?',
  box:'언어적 부호화·언어화 단계 ········· ( 가 )<br>말운동 계획 및 프로그래밍 단계 ····· ( 나 )<br>말운동 수행 단계 ································ ( 다 )',
  opts:['가 - 실어증, &nbsp;나 - 말실행증, &nbsp;다 - 마비말장애','가 - 실어증, &nbsp;나 - 지적장애, &nbsp;다 - 마비말장애','가 - 지적장애, &nbsp;나 - 말실행증, &nbsp;다 - 마비말장애','가 - 지적장애, &nbsp;나 - 뇌성마비, &nbsp;다 - 마비말장애','가 - 난독증, &nbsp;나 - 뇌성마비, &nbsp;다 - 실어증'],
  ans:0,
  say:'실제 국가고시에 나온 문제입니다. 각 단계가 손상되었을 때 나타나는 장애를 골라 보세요.',
  ex:'정답은 1번입니다. 부호화 단계는 실어증, 운동 계획과 프로그래밍 단계는 말실행증, 운동 수행 단계는 마비말장애입니다.'};

CLIPS.push({ code:'0', short:'오프닝', title:'오프닝 · 말산출 4단계', desc:'말산출 4단계와 장애 지도 · 기출 1문제',
  build(S){
    W.show({brain:true}); W.view('front3q',0); W.spin(0.22); W.shift(330);
    W.brain({lobe:[0,0,0,0], glow:0});
    add(`<div class="otitle fade" id="ot"><div class="k">언어재활사 2급 국가시험 대비</div><h1><span>신경언어장애</span><br>3D 애니메이션 강의</h1><div class="s">신경계 손상으로 생기는 말 · 언어 · 의사소통 장애</div></div>`);
    add(`<div class="cats">
      <div class="glass cat fade" id="ca1" style="--c:#7FB2FF;position:relative"><h4>말 · 언어 장애</h4><div>실어증<br>말실행증<br>마비말장애</div></div>
      <div class="glass cat fade" id="ca2" style="--c:#C58BFF;position:relative"><h4>인지-의사소통장애</h4><div>우반구 손상<br>외상성 뇌손상(TBI)<br>치매</div></div>
      <div class="glass cat fade" id="ca3" style="--c:#5EE0A8;position:relative"><h4>관련 장애</h4><div>삼킴장애<br>뇌성마비</div></div></div>`);
    const stg=[
      ['1','💭','개념 형성','무엇을 말할지 의도와 생각을 떠올림'],
      ['2','🔤','부호화 · 언어화','생각을 모국어 규칙에 맞는 단어·문장으로'],
      ['3','🧭','말운동 계획 ·<br>프로그래밍','근육을 어떤 순서·타이밍으로 움직일지 설계'],
      ['4','🗣️','말운동 수행','호흡 · 발성 · 공명 · 조음 기관이 실제로 움직임']];
    const dz=[['치매','인지장애'],['실어증','언어장애'],['말실행증','말장애'],['마비말장애','말장애']];
    add(`<div class="belt3d fade" id="belt"><div class="belt"><div class="rail"></div>
      ${stg.map((s,i)=>`<div class="st" id="st${i}" style="left:${18+i*358}px"><span class="no">${s[0]}</span><span class="ic">${s[1]}</span><div class="nm">${s[2]}</div><div class="ds">${s[3]}</div></div>`).join('')}
      ${dz.map((d,i)=>`<div class="dz fade" id="dz${i}" style="left:${18+i*358}px"><div class="a">▼</div><div class="b">${d[0]}</div><div class="c">${d[1]}</div></div>`).join('')}
      <div class="grpbr fade" id="grp" style="left:${18+2*358}px;width:688px"><span>말장애 = 말실행증 + 마비말장애</span></div>
      <div class="tok" id="tok" style="left:${ST_X(0)}px;opacity:0">💭 사과가 먹고 싶다</div>
    </div></div>`);
    add(`<div class="glass fade" id="opt" style="left:50%;top:140px;transform:translateX(-50%);width:1180px;padding:22px 30px"><span class="pt" style="position:static;display:inline-block;margin-bottom:10px">국시 포인트</span>
      <div class="row" style="font-size:25px">말실행증 = <b class="hl-y">계획·프로그래밍</b>의 문제 → 신경·근육 자체는 <b>정상</b><br>마비말장애 = <b class="hl-r">운동 수행</b>의 문제 → 신경·근육 자체가 <b>손상</b><br>실어증 = <b class="hl-b">언어적 부호화</b>의 문제</div></div>`);
    add(quizHTML('qo', Q_OPEN));
    add(`<div class="road fade" id="road">${ROADMAP.map(([c,t,d])=>`<div class="rc ${c==='1-1'?'now':''}"><div class="k">${c==='0'?'OPENING':'EP '+c}</div><div class="t">${t}</div><div class="d">${d}</div></div>`).join('')}</div>`);
    S.tok=(i,txt)=>{ const t=$('#tok'); t.style.opacity=1; t.style.left=ST_X(i)+'px'; t.innerHTML=txt; $$('.st').forEach((e,k)=>e.classList.toggle('act',k===i)); };
  },
  steps:[
    {wait:900, do(){ on('#ot'); sfx('glow'); }},
    {id:'O-01', s:'N', t:'언어재활사 2급 국가시험 대비, 신경언어장애 3D 애니메이션 강의를 시작합니다.'},
    {id:'O-02', s:'N', t:'신경언어장애는 신경계가 손상되어 생기는 말, 언어, 의사소통 장애입니다. 실어증과 말실행증, 마비말장애, 그리고 우반구 손상과 치매 같은 인지-의사소통장애, 삼킴장애와 뇌성마비까지 함께 다룹니다.',
      do(){ seq([()=>{on('#ca1');sfx('pop')},()=>{on('#ca2');sfx('pop')},()=>{on('#ca3');sfx('pop')}], 900); }},
    {id:'O-03', s:'N', t:'이 장애들을 구분하는 가장 좋은 지도는, 말이 만들어지는 네 단계입니다.',
      do(){ on('#ot',false); on('.cat',false); W.brain({op:0}); W.shift(0); later(()=>{ W.show({brain:false}); on('#belt'); sfx('whoosh'); },700); }},
    {id:'O-04', s:'N', t:'첫째, 개념 형성 단계. 무엇을 말할지, 의도와 생각을 떠올립니다.', do(S){ S.tok(0,'💭 사과가 먹고 싶다'); sfx('pop'); }},
    {id:'O-05', s:'N', t:'둘째, 부호화·언어화 단계. 그 생각을 모국어의 규칙에 맞는 단어와 문장으로 바꿉니다.', do(S){ S.tok(1,'🔤 [사과] + [주세요]'); sfx('pop'); }},
    {id:'O-06', s:'N', t:'셋째, 말운동 계획과 프로그래밍 단계. 어떤 근육을 어떤 순서와 타이밍으로 움직일지 운동 프로그램을 짭니다.', do(S){ S.tok(2,'🧭 입술 → 혀 → 턱 … 타이밍'); sfx('pop'); }},
    {id:'O-07', s:'N', t:'넷째, 말운동 수행 단계. 호흡, 발성, 공명, 조음 기관이 실제로 움직여 소리가 나옵니다.', do(S){ S.tok(3,'🔊 "사과 주세요!"'); sfx('ding'); }},
    {id:'O-08', s:'N', t:'그렇다면 각 단계가 고장 나면 어떤 장애가 될까요?', do(){ $$('.st').forEach(e=>e.classList.remove('act')); $('#tok').style.opacity=0; }},
    {id:'O-09', s:'N', t:'개념 형성 단계의 문제는 치매 같은 인지장애입니다.', do(){ $('#st0').classList.add('bad'); on('#dz0'); sfx('bad'); }},
    {id:'O-10', s:'N', t:'부호화 단계의 문제는 언어장애인 실어증입니다.', do(){ $('#st1').classList.add('bad'); on('#dz1'); sfx('bad'); }},
    {id:'O-11', s:'N', t:'운동 계획과 프로그래밍 단계의 문제는 말실행증입니다.', do(){ $('#st2').classList.add('bad'); on('#dz2'); sfx('bad'); }},
    {id:'O-12', s:'N', t:'운동 수행 단계의 문제는 마비말장애입니다. 말실행증과 마비말장애는 함께 말장애로 묶습니다.', do(){ $('#st3').classList.add('bad'); on('#dz3'); sfx('bad'); later(()=>{ on('#grp'); sfx('pop'); },1600); }},
    {id:'O-13', s:'N', t:'국시 포인트입니다. 말실행증은 계획의 문제라 신경과 근육 자체는 정상이고, 마비말장애는 수행의 문제라 신경과 근육 자체가 손상되어 있습니다.',
      do(){ on('#belt',false); later(()=>{ on('#opt'); sfx('ding'); },400); }},
    ...quizSteps('qo', Q_OPEN, ()=>on('#opt',false)),
    {id:'O-14', s:'N', t:'이 강의는 이 순서로 진행합니다. 먼저 1편 신경해부생리, 뇌의 구조부터 시작합니다.', do(){ on('#qo',false); later(()=>{ on('#road'); sfx('whoosh'); },400); }},
    {wait:2200},
  ]});

/* =================================================================
   1-1. 신경해부생리 ① 뇌의 구조
   ================================================================= */
const Q11 = [
  {sec:8, q:'언어 이해를 담당하는 베르니케 영역의 브로드만 번호는?', opts:['4번','17번','22번','39번','44번'], ans:2,
   say:'문제입니다. 언어 이해를 담당하는 베르니케 영역의 브로드만 번호는 무엇일까요?',
   ex:'정답은 3번, 22번입니다. 4번은 일차운동영역, 17번은 일차시각영역, 39번은 각회, 44번은 브로카 영역입니다.'},
  {sec:9, q:'일차운동영역(브로드만 4번)에 대한 설명으로 옳은 것은?', opts:['중심고랑 바로 뒤의 중심뒤이랑에 있다','같은 쪽(동측) 몸의 움직임을 담당한다','손과 입술·혀를 담당하는 영역이 넓게 배치되어 있다','얼굴·혀 영역은 대뇌세로열 안쪽 면에 있다','움직임의 순서를 계획하는 보조운동영역이다'], ans:2,
   say:'일차운동영역에 대한 설명으로 옳은 것을 골라 보세요.',
   ex:'정답은 3번입니다. 일차운동영역은 중심고랑 바로 앞의 중심앞이랑에 있고 반대쪽 몸을 담당합니다. 얼굴과 혀 영역은 아래쪽 외측에 있고, 순서 계획은 6번 보조운동영역의 역할입니다.'},
  {sec:9, q:'궁상속이 속한 신경섬유의 종류와, 궁상속이 손상되었을 때 나타나는 실어증으로 옳은 것은?', opts:['투사섬유 - 베르니케 실어증','연합섬유 - 전도실어증','교련섬유 - 전도실어증','연합섬유 - 브로카 실어증','투사섬유 - 명칭실어증'], ans:1,
   say:'궁상속이 속한 신경섬유의 종류와, 손상되었을 때 나타나는 실어증을 골라 보세요.',
   ex:'정답은 2번입니다. 궁상속은 같은 반구 안을 잇는 연합섬유이고, 손상되면 따라 말하기가 어려운 전도실어증이 나타납니다.'},
  {sec:7, q:'후각을 제외한 모든 감각 정보를 대뇌피질로 중계하는 구조는?', opts:['시상하부','시상','소뇌','연수','미상핵'], ans:1,
   say:'후각을 제외한 모든 감각 정보를 대뇌피질로 중계하는 구조는 무엇일까요?',
   ex:'정답은 2번, 시상입니다. 시상하부는 자율신경과 항상성, 소뇌는 협응과 균형, 연수는 생명 중추입니다.'},
  {sec:7, q:'도파민이 부족해 나타나는 질환과, 이와 관련된 구조로 옳은 것은?', opts:['헌팅턴병 - 소뇌','파킨슨병 - 기저핵','파킨슨병 - 연수','헌팅턴병 - 시상','무도병 - 뇌교'], ans:1,
   say:'마지막 문제입니다. 도파민이 부족해 나타나는 질환과 관련 구조로 옳은 것은?',
   ex:'정답은 2번입니다. 도파민이 부족하면 기저핵의 운동 조절이 무너져 파킨슨병이 생깁니다. 헌팅턴병과 무도병은 도파민 과다 쪽입니다.'},
];

function grayWhiteSVG(){
  // 대뇌 관상 단면: 실제 사람 뇌 절편 사진 (Rajalakshmi L Nair et al., CC BY 2.0, Wikimedia Commons)
  const brain=`<div class="gwph"><img src="img/coronal_brain.webp" alt="대뇌 관상 단면"></div><div class="gwcr">사진 · Nair et al. (CC BY 2.0, Wikimedia Commons)</div>`;
  // 척수 가로 단면: 백질(바깥) · 나비 모양 회백질(안쪽) · 전정중열 · 후정중구 · 중심관 · 후근(신경절) · 전근 · 척수신경
  const cord=`<svg viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="cwm" cx="50%" cy="48%" r="62%"><stop offset="0" stop-color="#F6EEE4"/><stop offset=".8" stop-color="#EEE2D3"/><stop offset="1" stop-color="#DCC8B6"/></radialGradient>
<radialGradient id="cgm" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#BFA3A4"/><stop offset="1" stop-color="#A3878B"/></radialGradient>
<filter id="ctex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" values="0 0 0 0 .35  0 0 0 0 .22  0 0 0 0 .25  0 0 0 .22 0" result="n2"/><feComposite in="n2" in2="SourceGraphic" operator="in" result="t"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="t"/></feMerge></filter>
<filter id="csh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity=".45"/></filter>
</defs>
<g><path d="M407.9 124.0C399.1 115.6 449.8 137.7 468.8 150.5C487.7 163.3 531.7 205.4 521.6 201.0" fill="none" stroke="#D9C2A4" stroke-width="8" stroke-linecap="round"/><path d="M407.9 124.0C399.1 115.6 449.8 137.7 468.8 150.5C487.7 163.3 531.7 205.4 521.6 201.0" fill="none" stroke="#F6EADA" stroke-width="2.5" stroke-linecap="round" opacity=".75"/><path d="M437.5 283.1C422.9 293.2 448.9 288.8 463.5 281.1C478.2 273.5 510.9 247.0 525.6 237.0C540.3 227.0 566.3 213.3 551.6 221.0" fill="none" stroke="#D9C2A4" stroke-width="7" stroke-linecap="round"/><path d="M437.5 283.1C422.9 293.2 448.9 288.8 463.5 281.1C478.2 273.5 510.9 247.0 525.6 237.0C540.3 227.0 566.3 213.3 551.6 221.0" fill="none" stroke="#F6EADA" stroke-width="2.5" stroke-linecap="round" opacity=".75"/><path d="M521.6 201.0C513.5 197.7 536.9 211.0 549.6 217.0C562.3 223.0 602.7 239.7 598.0 237.0" fill="none" stroke="#D9C2A4" stroke-width="14" stroke-linecap="round"/><path d="M521.6 201.0C513.5 197.7 536.9 211.0 549.6 217.0C562.3 223.0 602.7 239.7 598.0 237.0" fill="none" stroke="#F6EADA" stroke-width="5" stroke-linecap="round" opacity=".75"/><ellipse cx="521.6" cy="201" rx="20" ry="13" fill="#DFC3A2" stroke="#C4A27E" stroke-width="2"/></g><g transform="translate(600 0) scale(-1 1)"><path d="M407.9 124.0C399.1 115.6 449.8 137.7 468.8 150.5C487.7 163.3 531.7 205.4 521.6 201.0" fill="none" stroke="#D9C2A4" stroke-width="8" stroke-linecap="round"/><path d="M407.9 124.0C399.1 115.6 449.8 137.7 468.8 150.5C487.7 163.3 531.7 205.4 521.6 201.0" fill="none" stroke="#F6EADA" stroke-width="2.5" stroke-linecap="round" opacity=".75"/><path d="M437.5 283.1C422.9 293.2 448.9 288.8 463.5 281.1C478.2 273.5 510.9 247.0 525.6 237.0C540.3 227.0 566.3 213.3 551.6 221.0" fill="none" stroke="#D9C2A4" stroke-width="7" stroke-linecap="round"/><path d="M437.5 283.1C422.9 293.2 448.9 288.8 463.5 281.1C478.2 273.5 510.9 247.0 525.6 237.0C540.3 227.0 566.3 213.3 551.6 221.0" fill="none" stroke="#F6EADA" stroke-width="2.5" stroke-linecap="round" opacity=".75"/><path d="M521.6 201.0C513.5 197.7 536.9 211.0 549.6 217.0C562.3 223.0 602.7 239.7 598.0 237.0" fill="none" stroke="#D9C2A4" stroke-width="14" stroke-linecap="round"/><path d="M521.6 201.0C513.5 197.7 536.9 211.0 549.6 217.0C562.3 223.0 602.7 239.7 598.0 237.0" fill="none" stroke="#F6EADA" stroke-width="5" stroke-linecap="round" opacity=".75"/><ellipse cx="521.6" cy="201" rx="20" ry="13" fill="#DFC3A2" stroke="#C4A27E" stroke-width="2"/></g>
<g filter="url(#csh)"><path d="M293.2 335.6C289.0 336.3 284.4 335.0 280.1 334.5C275.7 334.0 271.4 333.3 267.2 332.6C262.9 331.8 258.7 331.0 254.5 330.0C250.4 329.1 246.3 328.1 242.2 327.0C238.1 326.0 234.0 324.9 230.0 323.7C225.9 322.5 221.9 321.3 218.0 319.9C214.1 318.5 210.1 317.1 206.4 315.5C202.6 313.9 198.9 312.2 195.4 310.3C191.9 308.4 188.5 306.4 185.3 304.3C182.1 302.2 179.0 299.9 176.2 297.5C173.3 295.2 170.6 292.7 168.0 290.2C165.5 287.7 163.1 285.1 160.7 282.5C158.4 279.9 156.1 277.2 153.9 274.6C151.8 271.9 149.6 269.2 147.6 266.4C145.6 263.7 143.7 260.9 141.9 258.1C140.1 255.3 138.4 252.4 137.0 249.4C135.6 246.5 134.3 243.5 133.3 240.5C132.3 237.4 131.5 234.3 131.0 231.3C130.5 228.2 130.2 225.0 130.2 221.9C130.1 218.8 130.3 215.7 130.6 212.6C130.9 209.5 131.4 206.4 132.0 203.4C132.5 200.3 133.2 197.3 134.0 194.2C134.8 191.2 135.6 188.2 136.5 185.1C137.5 182.1 138.5 179.1 139.7 176.1C140.9 173.2 142.3 170.2 143.8 167.3C145.4 164.4 147.1 161.5 149.1 158.7C151.1 155.9 153.3 153.2 155.7 150.6C158.2 148.0 160.8 145.5 163.6 143.1C166.4 140.7 169.4 138.4 172.4 136.2C175.4 133.9 178.6 131.8 181.8 129.7C185.0 127.6 188.3 125.6 191.7 123.6C195.0 121.6 198.4 119.7 201.9 117.8C205.3 115.9 208.9 114.1 212.5 112.4C216.1 110.6 219.8 108.9 223.7 107.4C227.5 105.9 231.5 104.5 235.5 103.3C239.6 102.1 243.7 101.0 247.9 100.1C252.2 99.2 256.5 98.5 260.8 97.9C265.1 97.3 269.5 96.9 273.8 96.6C278.2 96.2 282.6 96.1 286.9 95.9C291.3 95.8 295.6 95.7 300.0 95.7C304.4 95.7 308.7 95.8 313.1 95.9C317.4 96.1 321.8 96.2 326.2 96.6C330.5 96.9 334.9 97.3 339.2 97.9C343.5 98.5 347.8 99.2 352.1 100.1C356.3 101.0 360.4 102.1 364.5 103.3C368.5 104.5 372.5 105.9 376.3 107.4C380.2 108.9 383.9 110.6 387.5 112.4C391.1 114.1 394.7 115.9 398.1 117.8C401.6 119.7 405.0 121.6 408.3 123.6C411.7 125.6 415.0 127.6 418.2 129.7C421.4 131.8 424.6 133.9 427.6 136.2C430.6 138.4 433.6 140.7 436.4 143.1C439.2 145.5 441.8 148.0 444.3 150.6C446.7 153.2 448.9 155.9 450.9 158.7C452.9 161.5 454.6 164.4 456.2 167.3C457.7 170.2 459.1 173.2 460.3 176.1C461.5 179.1 462.5 182.1 463.5 185.1C464.4 188.2 465.2 191.2 466.0 194.2C466.8 197.3 467.5 200.3 468.0 203.4C468.6 206.4 469.1 209.5 469.4 212.6C469.7 215.7 469.9 218.8 469.8 221.9C469.8 225.0 469.5 228.2 469.0 231.3C468.5 234.3 467.7 237.4 466.7 240.5C465.7 243.5 464.4 246.5 463.0 249.4C461.6 252.4 459.9 255.3 458.1 258.1C456.3 260.9 454.4 263.7 452.4 266.4C450.4 269.2 448.2 271.9 446.1 274.6C443.9 277.2 441.6 279.9 439.3 282.5C436.9 285.1 434.5 287.7 432.0 290.2C429.4 292.7 426.7 295.2 423.8 297.5C421.0 299.9 417.9 302.2 414.7 304.3C411.5 306.4 408.1 308.4 404.6 310.3C401.1 312.2 397.4 313.9 393.6 315.5C389.9 317.1 385.9 318.5 382.0 319.9C378.1 321.3 374.1 322.5 370.0 323.7C366.0 324.9 361.9 326.0 357.8 327.0C353.7 328.1 349.6 329.1 345.5 330.0C341.3 331.0 337.1 331.8 332.8 332.6C328.6 333.3 324.3 334.0 319.9 334.5C315.6 335.0 311.0 336.3 306.8 335.6C302.7 334.8 296.6 340.4 295.0 330.0C293.4 319.6 296.2 284.8 297.0 273.0C297.8 261.2 299.0 259.0 300.0 259.0C301.0 259.0 302.2 261.2 303.0 273.0C303.8 284.8 306.6 319.6 305.0 330.0C303.4 340.4 297.3 334.8 293.2 335.6Z" fill="url(#cwm)" stroke="#C99A98" stroke-width="2.5" filter="url(#ctex)"/></g>
<path d="M467.1 215.0L431.3 216.4M466.2 227.0L430.7 222.4M464.1 237.2L438.6 233.2M459.8 249.5L416.3 240.6M456.0 257.2L439.9 251.5M448.6 269.0L428.2 258.9M440.2 279.3L421.8 268.3M433.4 286.1L395.9 267.0M424.8 293.6L398.9 277.0M414.1 301.3L404.2 293.8M401.3 309.0L377.1 285.2M390.7 314.3L370.0 292.9M378.2 319.4L356.6 295.2M360.5 325.2L350.2 312.6M347.7 328.3L337.9 301.0M334.8 330.6L331.8 318.5M320.0 332.3L315.3 319.7M291.2 333.0L290.4 315.0M272.1 331.5L276.8 312.4M259.3 329.6L264.6 314.0M245.1 326.6L255.3 304.4M228.7 321.9L242.1 303.8M218.2 318.1L237.9 294.5M205.2 312.3L231.6 286.1M192.9 305.7L216.6 287.0M181.2 298.1L194.3 286.6M170.5 289.7L182.8 281.7M164.5 284.2L187.8 273.3M156.1 275.0L187.2 261.3M146.7 262.0L173.3 255.7M142.4 254.2L179.4 244.7M137.4 242.1L157.7 241.1M135.4 235.1L159.9 234.4M133.3 222.4L157.3 221.6M133.1 210.8L173.0 210.1M133.6 204.3L151.3 204.5M136.2 191.6L175.9 196.1M140.4 180.0L166.6 187.8M144.1 172.5L181.3 184.9M151.2 161.3L182.7 172.9M157.9 152.9L166.4 159.5M165.4 145.0L191.8 157.6M175.1 136.5L209.0 157.3M186.7 128.2L202.4 138.2M198.0 121.4L228.1 145.8M210.8 115.1L233.9 137.1M222.2 110.4L245.4 139.0M239.2 104.9L255.9 129.8M248.7 102.5L262.3 127.4M264.5 99.5L269.2 119.0M282.9 97.4L289.9 121.7M308.5 97.0L305.0 121.5M323.1 97.9L319.4 106.3M339.7 100.2L325.7 131.6M352.5 102.8L340.5 122.6M370.0 107.7L351.0 131.7M383.0 112.4L369.2 129.1M396.5 118.5L384.2 133.8M405.5 123.4L384.7 144.6M416.8 130.5L388.3 149.5M426.0 137.4L397.9 153.1M435.4 145.8L414.4 156.9M444.3 155.4L424.0 162.9M452.0 166.0L440.0 167.3M458.2 176.9L437.0 183.5M461.3 184.3L442.4 185.8M464.9 196.0L435.4 201.6M466.8 208.0L445.8 208.6" stroke="#D3BBAC" stroke-width="1" opacity=".6" fill="none"/>
<path d="M300 97.0 L300 207" stroke="#C9A39E" stroke-width="2"/>
<path d="M300.0 211.6C306.4 211.6 314.7 211.8 319.3 208.8C323.9 205.8 325.5 200.1 327.5 193.7C329.6 187.3 330.0 178.2 331.6 170.3C333.3 162.4 334.6 153.7 337.2 146.2C339.7 138.7 343.3 131.4 346.8 125.6C350.2 119.7 354.6 113.7 357.8 111.1C361.0 108.5 365.1 107.7 366.0 109.7C367.0 111.8 365.4 117.1 363.3 123.5C361.2 129.9 356.0 140.5 353.7 148.3C351.4 156.1 350.0 163.6 349.5 170.3C349.1 176.9 348.6 183.4 350.9 188.2C353.2 193.0 359.2 196.0 363.3 199.2C367.4 202.4 374.2 204.0 375.7 207.4C377.2 210.9 370.6 215.0 372.2 219.8C373.8 224.6 381.5 230.5 385.3 236.3C389.1 242.2 393.8 248.9 394.9 254.9C396.1 260.9 394.6 267.5 392.2 272.1C389.8 276.7 385.2 280.1 380.5 282.4C375.8 284.7 369.5 286.4 364.0 285.9C358.5 285.3 352.2 282.4 347.5 279.0C342.8 275.5 339.1 270.5 335.8 265.2C332.5 259.9 330.6 252.2 327.5 247.3C324.4 242.5 321.8 238.5 317.2 236.3C312.6 234.1 305.7 234.3 300.0 234.3C294.3 234.3 287.4 234.1 282.8 236.3C278.2 238.5 275.6 242.5 272.5 247.3C269.4 252.2 267.5 259.9 264.2 265.2C260.9 270.5 257.2 275.5 252.5 279.0C247.8 282.4 241.5 285.3 236.0 285.9C230.5 286.4 224.2 284.7 219.5 282.4C214.8 280.1 210.2 276.7 207.8 272.1C205.4 267.5 203.9 260.9 205.1 254.9C206.2 248.9 210.9 242.2 214.7 236.3C218.5 230.5 226.2 224.6 227.8 219.8C229.4 215.0 222.8 210.9 224.3 207.4C225.8 204.0 232.6 202.4 236.7 199.2C240.8 196.0 246.8 193.0 249.1 188.2C251.4 183.4 250.9 176.9 250.5 170.3C250.0 163.6 248.6 156.1 246.3 148.3C244.0 140.5 238.8 129.9 236.7 123.5C234.6 117.1 233.0 111.8 234.0 109.7C234.9 107.7 239.0 108.5 242.2 111.1C245.4 113.7 249.8 119.7 253.2 125.6C256.7 131.4 260.3 138.7 262.8 146.2C265.4 153.7 266.7 162.4 268.4 170.3C270.0 178.2 270.4 187.3 272.5 193.7C274.5 200.1 276.1 205.8 280.7 208.8C285.3 211.8 293.6 211.6 300.0 211.6Z" fill="url(#cgm)" stroke="#9A7D82" stroke-width="1.2" filter="url(#ctex)"/>
<ellipse cx="300" cy="218" rx="4" ry="3" fill="#5B4250"/>
<circle cx="300" cy="339.0" r="6" fill="#C23A40" stroke="#8E242A" stroke-width="1.5"/>
<circle cx="270.0" cy="98.0" r="3.5" fill="#4E5FA8"/><circle cx="330.0" cy="98.0" r="3.5" fill="#4E5FA8"/>
</svg>`;
  return {brain, cord};
}

/* ---------- 1-1 보강: 브로드만 표지(바깥을 향한 지점) · 중심앞/뒤이랑 띠 · 호문쿨루스 ---------- */
/* 영역 안에서 바깥(옆)을 향한 이랑 꼭대기 지점을 고름 → 번호가 뇌 뒤에 숨지 않음 */
function pickLat(names, o={}){
  const m=W.hemiL, u=m.geometry.userData, P=m.geometry.attributes.position, N=m.geometry.attributes.normal;
  if(!u||!u.real) return null;
  const ids=new Set([].concat(names).map(n=>u.names.indexOf(n))); const sel=[]; let cx=0,cy=0,cz=0;
  for(let i=0;i<u.n;i++){ if(!ids.has(u.lab[i])) continue; if(o.umin!=null&&u.U[i]<o.umin) continue; if(o.umax!=null&&u.U[i]>o.umax) continue; if(o.fmin!=null&&u.F[i]<o.fmin) continue; if(o.fmax!=null&&u.F[i]>o.fmax) continue; if(o.minL!=null&&u.L[i]<o.minL) continue; sel.push(i); cx+=P.getX(i); cy+=P.getY(i); cz+=P.getZ(i); }
  if(!sel.length) return null; cx/=sel.length; cy/=sel.length; cz/=sel.length;
  const d=o.dir||[-1,0,0], dl=Math.hypot(d[0],d[1],d[2]); let best=-1, bd=1e9;
  for(const pass of [0,1]){ sel.forEach(i=>{ const nd=(N.getX(i)*d[0]+N.getY(i)*d[1]+N.getZ(i)*d[2])/dl; if(pass===0&&(nd<(o.minDot??0.6)||u.groove[i]>0.45)) return; const q=(P.getX(i)-cx)**2+(P.getY(i)-cy)**2+(P.getZ(i)-cz)**2; if(q<bd){bd=q;best=i;} }); if(best>=0) break; }
  return {p:Vx(P.getX(best),P.getY(best),P.getZ(best)), n:Vx(N.getX(best),N.getY(best),N.getZ(best))};
}
const MK11={};
function mk11(id, spec, color){
  if(MK11[id]) return MK11[id];
  const s=pickLat(spec[0], Object.assign({}, spec[1]||{}, spec[2]||{})) || W.surf(spec[3]?.[0]??0, spec[3]?.[1]??0, 0.3);
  const m=new THREE.Mesh(new THREE.SphereGeometry(0.036,16,12), new THREE.MeshBasicMaterial({color, transparent:true, opacity:0}));
  m.position.copy(s.p).add(s.n.clone().multiplyScalar(0.014)); W.hemiL.add(m); W.regPart('mk11_'+id, m, m.material, 0);
  return (MK11[id]={p:m.position.clone(), n:s.n.clone()});
}
/* 이랑 꼭대기를 따라가는 띠 (아래 외측고랑 쪽 U≈0 → 위 U≈0.76) */
const STRIP11={};
function strip11(name, label, color){
  if(STRIP11[name]) return STRIP11[name];
  const m=W.hemiL, u=m.geometry.userData, P=m.geometry.attributes.position, N=m.geometry.attributes.normal, id=u.names.indexOf(label); const pts=[], nrm=[], us=[];
  for(let U=0.0; U<=0.765; U+=0.05){ let s=[0,0,0], n=[0,0,0], c=0;
    for(let i=0;i<u.n;i++){ if(u.lab[i]!==id || Math.abs(u.U[i]-U)>0.03 || u.groove[i]>0.3) continue; s[0]+=P.getX(i); s[1]+=P.getY(i); s[2]+=P.getZ(i); n[0]+=N.getX(i); n[1]+=N.getY(i); n[2]+=N.getZ(i); c++; }
    if(c<2) continue; const nv=Vx(n[0],n[1],n[2]).normalize(); pts.push(Vx(s[0]/c,s[1]/c,s[2]/c).add(nv.clone().multiplyScalar(0.03))); nrm.push(nv); us.push(U); }
  const mesh=W.tube(pts, 0.03, color, {basic:true, op:0, seg:140, rs:12}); mesh.renderOrder=3; m.add(mesh); W.regPart(name, mesh, mesh.material, 0);
  return (STRIP11[name]={pts, nrm, us, at(U){ let k=0; us.forEach((x,i)=>{ if(Math.abs(x-U)<Math.abs(us[k]-U)) k=i; }); return {p:pts[k].clone(), n:nrm[k].clone()}; }});
}
/* 호문쿨루스: 대뇌 관상 단면(왼쪽 = 감각 · 중심뒤이랑, 오른쪽 = 운동 · 중심앞이랑) */
function homunSVG(){
  const MID=380, CX=34, CY=330, RX=180, RY=240, T0=96, T1=-16;
  const MOT=[['발·발가락',0.08,'#5EE0A8','🦶'],['다리',0.07,'#7BE3B6',''],['몸통',0.06,'#9FE0CF',''],['어깨·팔',0.08,'#8FC1FF','💪'],['손목·손',0.10,'#5C9BFF',''],['손가락·엄지',0.13,'#4F8EF7','✋'],['목·이마·눈',0.07,'#FFD36B','👁️'],['얼굴',0.09,'#FFB86B','🙂'],['입술',0.12,'#FF7D9B','👄'],['턱',0.05,'#FF9C8C',''],['혀',0.10,'#FF5C7A','👅'],['삼킴(인두·후두)',0.05,'#C58BFF','']];
  const SEN=[['발·발가락',0.07,'#5EE0A8','🦶'],['다리',0.06,'#7BE3B6',''],['몸통·머리',0.07,'#9FE0CF',''],['팔',0.07,'#8FC1FF','💪'],['손·손가락',0.21,'#4F8EF7','✋'],['눈·코',0.06,'#FFD36B','👁️'],['얼굴',0.09,'#FFB86B','🙂'],['입술',0.13,'#FF7D9B','👄'],['이·잇몸·턱',0.07,'#FF9C8C',''],['혀',0.09,'#FF5C7A','👅'],['인두·내장',0.08,'#C58BFF','']];
  const P=(th,r=0)=>{ const a=th*Math.PI/180; return [CX+(RX+r)*Math.cos(a), CY-(RY+r)*Math.sin(a)]; };
  const side=(list, sgn, cls)=>{ let acc=0, out='';
    list.forEach(([t,f,c,ic],k)=>{ const a0=T0+(T1-T0)*acc, a1=T0+(T1-T0)*(acc+f), am=(a0+a1)/2; acc+=f;
      const seg=[]; for(let j=0;j<=10;j++){ const [x,y]=P(a0+(a1-a0)*j/10); seg.push((MID+sgn*x).toFixed(1)+' '+y.toFixed(1)); }
      const [lx,ly]=P(am,(f>0.095?64:44)), [ix,iy]=P(am,8); const fs=Math.round(15+f*70), anc=sgn>0?'start':'end';
      const tx=MID+sgn*lx, ty=ly+5;
      out+=`<g class="hseg ${cls}" style="--d:${k*0.12}s"><path d="M${seg.join(' L')}" stroke="${c}" stroke-width="30" fill="none" stroke-linecap="butt"/>`+
        `<line x1="${(MID+sgn*ix).toFixed(1)}" y1="${iy.toFixed(1)}" x2="${(tx-sgn*4).toFixed(1)}" y2="${(ty-5).toFixed(1)}" stroke="${c}" stroke-width="1.6" opacity=".7"/>`+
        `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${anc}" font-size="${fs}" fill="${c}" font-weight="800">${ic?`<tspan font-size="${fs+4}">${ic}</tspan> `:''}${t}</text></g>`; });
    return out; };
  const hemi=(sgn)=>{ const pts=[]; for(let a=T0;a>=T1;a-=4){ const [x,y]=P(a,-16); pts.push((MID+sgn*x).toFixed(1)+' '+y.toFixed(1)); } const [ex,ey]=P(T1,-16);
    return `<path d="M${MID+sgn*14} ${CY-RY+18} L${pts.join(' L')} Q${(MID+sgn*(ex-40)).toFixed(1)} ${(ey+60).toFixed(1)} ${MID+sgn*120} ${CY+150} L${MID+sgn*14} ${CY+150} Z" fill="url(#hwm)" stroke="#B99AA0" stroke-width="2"/>`+
      `<path d="M${MID+sgn*14} ${CY-RY+18} L${pts.join(' L')}" fill="none" stroke="#A88C93" stroke-width="22" opacity=".9"/>`; };
  return `<svg viewBox="0 0 760 530" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="hwm" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#F4ECE4"/><stop offset="1" stop-color="#DCCBBE"/></radialGradient></defs>
    ${hemi(-1)}${hemi(1)}
    <line x1="${MID}" y1="${CY-RY-6}" x2="${MID}" y2="${CY+150}" stroke="#0B1020" stroke-width="6"/>
    <g class="hS">${side(SEN,-1,'s')}</g><g class="hM">${side(MOT,1,'m')}</g>
    <text x="${MID}" y="${CY+184}" text-anchor="middle" font-size="17" fill="#A9B8D8" font-weight="700">▲ 대뇌세로열(안쪽) &nbsp;·&nbsp; 아래 양 끝 = 외측고랑 쪽</text></svg>`;
}
const CSS11=`<style>
#homu{left:820px;top:96px;width:740px;padding:14px 10px 6px}
#homu h3{margin:0 0 4px 14px} #homu .hh{display:flex;justify-content:space-between;padding:0 18px;font-size:19px;font-weight:800}
#homu svg{width:100%;display:block}
#homu .hseg{opacity:0;transition:opacity .5s var(--d,0s)} #homu.m .hseg.m, #homu.s .hseg.s{opacity:1}
#homu .hS,#homu .hM{transition:opacity .6s} #homu.fm .hS{opacity:.28} #homu.fs .hM{opacity:.28}
#contra{left:860px;top:110px;width:660px;padding:18px 22px}
#contra svg{width:100%;display:block}
#prim{left:860px;top:120px;width:660px;padding:18px 24px}
#prim .cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:8px}
#prim .cols>div{border:2px solid var(--c);border-radius:14px;padding:12px 14px;font-size:19px;line-height:1.55}
#prim h4{margin:0 0 6px;color:var(--c);font-size:22px}
#sma{left:860px;top:150px;width:640px;padding:18px 24px}
.lb3.bp .tx{font-size:19px}
</style>`;
function contraSVG(){
  return `<svg viewBox="0 0 620 430" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="ca1" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9z" fill="#7FB2FF"/></marker><marker id="ca2" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9z" fill="#FFC94A"/></marker></defs>
  <text x="310" y="20" text-anchor="middle" font-size="16" fill="#A9B8D8" font-weight="700">위에서 본 뇌 · 뒤에서 본 몸</text>
  <ellipse cx="250" cy="92" rx="56" ry="62" fill="#4F8EF7" opacity=".85" stroke="#fff" stroke-width="2"/><ellipse cx="370" cy="92" rx="56" ry="62" fill="#3A4766" stroke="#8EA0C8" stroke-width="2"/>
  <text x="250" y="98" text-anchor="middle" font-size="20" fill="#fff" font-weight="900">좌반구</text><text x="370" y="98" text-anchor="middle" font-size="20" fill="#C9D4F0" font-weight="900">우반구</text>
  <circle cx="310" cy="222" r="24" fill="#3A4766" stroke="#8EA0C8" stroke-width="2"/>
  <path d="M268 252 Q310 244 352 252 L360 340 L260 340 Z" fill="#3A4766" stroke="#8EA0C8" stroke-width="2"/>
  <path d="M352 256 L410 330 L398 338 L345 278" fill="#FF8C8C" stroke="#FF8C8C" stroke-width="6" stroke-linejoin="round" class="rarm"/>
  <path d="M268 256 L210 330 L222 338 L275 278" fill="#3A4766" stroke="#8EA0C8" stroke-width="6" stroke-linejoin="round"/>
  <path d="M335 340 L345 420" stroke="#FF8C8C" stroke-width="16" stroke-linecap="round"/><path d="M285 340 L275 420" stroke="#8EA0C8" stroke-width="16" stroke-linecap="round"/>
  <text x="190" y="400" text-anchor="end" font-size="18" fill="#C9D4F0" font-weight="800">왼쪽 몸</text><text x="430" y="400" font-size="18" fill="#FF8C8C" font-weight="800">오른쪽 몸</text>
  <path class="cpath" d="M232 150 C 236 190, 300 170, 318 196 S 380 250, 396 300" fill="none" stroke="#7FB2FF" stroke-width="5" marker-end="url(#ca1)"/>
  <path class="cpath c2" d="M420 336 C 440 280, 360 236, 314 204 S 262 176, 262 158" fill="none" stroke="#FFC94A" stroke-width="4" stroke-dasharray="9 7" marker-end="url(#ca2)"/>
  <text x="30" y="190" font-size="18" fill="#7FB2FF" font-weight="800">운동 명령 ↓</text><text x="470" y="262" font-size="18" fill="#FFC94A" font-weight="800">감각 ↑</text>
  <text x="310" y="176" text-anchor="middle" font-size="15" fill="#fff" font-weight="700">교차</text></svg>`;
}

CLIPS.push({ code:'1-1', short:'1-1 뇌의 구조', title:'신경해부생리 ① 뇌의 구조', desc:'뉴런 · 회백질/백질 · 대뇌 4엽 · 브로드만 · 섬유 · 기저핵 · 간뇌 · 뇌간 · 소뇌 · 퀴즈 4문제',
  build(S){
    const G=W.groups, hl=W.hemiL;
    W.show({brain:true}); W.view('front3q',0); W.spin(0.2);
    add(hdr('EP 1-1 · 신경해부생리 ①','뇌의 구조'));
    /* --- 신경계 지도 --- */
    add(`<div class="glass tree fade" id="tree"><h3>신경계</h3>
      <div class="tr" id="tr1" style="--c:#7FB2FF"><span class="h">중추신경계 (CNS)</span> · 뇌 + 척수</div>
      <div class="tr" id="tr2" style="--c:#FFC94A"><span class="h">말초신경계 (PNS)</span> · 뇌·척수 밖으로 뻗은 신경</div>
      <div class="tr sub" id="tr3" style="--c:#FFC94A"><span class="h">체성신경계</span> · 뇌신경 <b>12쌍</b> · 척수신경 <b>31쌍</b></div>
      <div class="tr sub" id="tr4" style="--c:#5EE0A8"><span class="h">자율신경계</span> · 교감 ↔ 부교감
        <div class="yy"><div>교감신경<br><b class="hl-o">기능 촉진</b><div class="fade" id="yy1" style="font-size:16px;color:#C9D4F0">투쟁-도피 · 동공 확대 · 심박 증가</div></div><div>부교감신경<br><b class="hl-b">기능 감소</b><div class="fade" id="yy2" style="font-size:16px;color:#C9D4F0">휴식-소화 · 동공 축소 · 심박 감소</div></div></div>
        <div style="font-size:19px;margin-top:6px;text-align:center">서로 반대로 작용 = <b class="hl-g">길항작용</b> → 항상성 유지</div></div></div>`);
    /* --- 뉴런 --- */
    add(`<div class="glass ntype fade" id="ntype">
      <div class="nt" style="--c:#5EE0A8"><h4>감각뉴런</h4><div>감각 수용기 → 중추<br><b>구심성</b> (중심으로 들어감)<br><span style="font-size:17px;color:#A9B8D8">구심성 = 감각 = 상행</span></div></div>
      <div class="nt" style="--c:#7FB2FF"><h4>중간(연결)뉴런</h4><div>감각과 운동을 연결 ·<br>정보를 분석하고 통합</div></div>
      <div class="nt" style="--c:#FF8CC6"><h4>운동뉴런</h4><div>중추 → 근육(반응기)<br><b>원심성</b> (중심에서 나감)<br><span style="font-size:17px;color:#A9B8D8">원심성 = 운동 = 하행</span></div></div></div>`);
    add(`<div class="glass glia fade" id="glia"><h3>교세포 (신경아교세포)</h3>
      <div class="row">신경세포를 <b class="hl-y">물리적으로 지지</b>하는 세포</div>
      <div class="row" style="margin-top:8px">손상 시 → <b>진행성 핵상마비</b> (마비말장애), <b>치매</b> 등</div>
      <div class="row" style="margin-top:14px;font-size:19px;color:#A9B8D8">참고 · 수초를 만드는 교세포</div>
      <div class="row" style="font-size:20px">중추신경계 = <b class="hl-b">희돌기교세포</b> · 말초신경계 = <b class="hl-y">슈반세포</b></div></div>`);
    const gw=grayWhiteSVG();
    add(`<div class="glass gw fade" id="gw">
      <div class="pane"><h4>뇌 (대뇌 단면)</h4>${gw.brain}
        <span class="lg fade" id="g1" style="--c:#C9B3B8;left:0px;top:56px">회백질 · 대뇌피질 (바깥)<svg class="ld" style="position:absolute;left:0;top:0;overflow:visible;width:1px;height:1px"><line x1="70" y1="34" x2="98" y2="112" stroke="var(--c)" stroke-width="2"/><circle cx="98" cy="112" r="6" fill="var(--c)" stroke="#0b1020" stroke-width="2"/></svg></span>
        <span class="lg fade" id="g2" style="--c:#F3ECE2;left:300px;top:96px">백질 (안쪽)<svg class="ld" style="position:absolute;left:0;top:0;overflow:visible;width:1px;height:1px"><line x1="20" y1="34" x2="-66" y2="98" stroke="var(--c)" stroke-width="2"/><circle cx="-66" cy="98" r="6" fill="var(--c)" stroke="#0b1020" stroke-width="2"/></svg></span>
        <span class="lg fade" id="g3" style="--c:#C9B3B8;left:330px;top:392px">피질하 회백질 (기저핵 · 시상)<svg class="ld" style="position:absolute;left:0;top:0;overflow:visible;width:1px;height:1px"><line x1="30" y1="0" x2="-62" y2="-66" stroke="var(--c)" stroke-width="2"/><circle cx="-62" cy="-66" r="6" fill="var(--c)" stroke="#0b1020" stroke-width="2"/></svg></span></div>
      <div class="pane"><h4>척수 (가로 단면)</h4>${gw.cord}
        <span class="lg fade" id="g4" style="--c:#F3ECE2;left:10px;top:64px">백질 (바깥)<svg class="ld" style="position:absolute;left:0;top:0;overflow:visible;width:1px;height:1px"><line x1="60" y1="34" x2="150" y2="180" stroke="var(--c)" stroke-width="2"/><circle cx="150" cy="180" r="6" fill="var(--c)" stroke="#0b1020" stroke-width="2"/></svg></span>
        <span class="lg fade" id="g5" style="--c:#C9B3B8;left:300px;top:404px">회백질 (안쪽 · 나비 모양)<svg class="ld" style="position:absolute;left:0;top:0;overflow:visible;width:1px;height:1px"><line x1="70" y1="0" x2="62" y2="-112" stroke="var(--c)" stroke-width="2"/><circle cx="62" cy="-112" r="6" fill="var(--c)" stroke="#0b1020" stroke-width="2"/></svg></span></div>
      <div style="position:absolute;left:30px;right:30px;bottom:18px;font-size:21px;font-weight:700;color:#DCE5FA" class="fade" id="g6">회백질 = 세포체 · 수상돌기 · 신경연접 &nbsp;|&nbsp; 백질 = 축삭 · 교세포 (수초 때문에 하얗게 보임)</div></div>`);
    /* --- 브로드만 표 --- */
    add(`<div class="glass btable fade" id="btab"><h3>브로드만 영역 한눈에</h3><table>
      <tr><td class="l">전두엽</td><td class="n">4</td><td>일차운동영역 (중심앞이랑)</td></tr>
      <tr><td class="l"></td><td class="n">6 · 8</td><td>전운동영역 (6번 안쪽 윗면 = 보조운동영역)</td></tr>
      <tr><td class="l"></td><td class="n">9 · 10</td><td>전전두 연합영역 (기억 · 사고 · 판단)</td></tr>
      <tr><td class="l"></td><td class="n">44 · 45</td><td><b class="hl-b">브로카 영역</b> (말 산출)</td></tr>
      <tr><td class="l">두정엽</td><td class="n">3 · 1 · 2</td><td>일차체감각영역 (중심뒤이랑)</td></tr>
      <tr><td class="l"></td><td class="n">5 · 7</td><td>체감각연합영역</td></tr>
      <tr><td class="l"></td><td class="n">39</td><td>각회 (읽기)</td></tr>
      <tr><td class="l">측두엽</td><td class="n">41</td><td>일차청각영역</td></tr>
      <tr><td class="l"></td><td class="n">42</td><td>청각연합영역</td></tr>
      <tr><td class="l"></td><td class="n">22</td><td><b class="hl-g">베르니케 영역</b> (언어 이해)</td></tr>
      <tr><td class="l">후두엽</td><td class="n">17</td><td>일차시각영역</td></tr>
      <tr><td class="l"></td><td class="n">18 · 19</td><td>시각연합영역</td></tr></table></div>`);
    add(`<div class="glass fsum fade" id="fsum"><div><span class="hl-y">투사섬유</span><br>피질 ↕ 피질 아래</div><div><span style="color:#66E3FF">교련섬유</span><br>좌반구 ↔ 우반구 (뇌량)</div><div><span class="hl-p">연합섬유</span><br>같은 반구 안 (궁상속)</div></div>`);
    add(`<div class="glass seesaw fade" id="see"><h3>기저핵과 도파민</h3>
      <div class="bar"><div class="beam" id="beam"></div><div class="tri"></div></div>
      <div class="lb"><span class="hl-o">도파민 ↓ 부족</span><span class="hl-p">도파민 ↑ 과다</span></div>
      <div class="res"><div id="r1" style="--c:#FFAE5C"><b>파킨슨병</b><br>강직 · 서동 · 안정 떨림<br><span style="font-size:17px;color:#A9B8D8">→ 과소운동형 마비말장애</span></div>
      <div id="r2" style="--c:#FF8CC6"><b>헌팅턴병 · 무도병</b><br>원치 않는 움직임<br><span style="font-size:17px;color:#A9B8D8">→ 과다운동형 마비말장애</span></div></div></div>`);
    add(`<div class="glass cncard fade" id="cn"><h3>뇌간과 뇌신경</h3>
      <div class="lv" id="lv1" style="--c:#FFB86B"><div class="nm">중뇌</div><div class="cn">III · IV</div><div class="fn">시각 · 청각 반사 중추<br>흑질 · 적핵 · 각성과 수면</div></div>
      <div class="lv" id="lv2" style="--c:#FFE45C"><div class="nm">뇌교</div><div class="cn">V ~ VIII</div><div class="fn">대뇌와 소뇌를 잇는 다리<br>얼굴 감각 · 저작 · 표정</div></div>
      <div class="lv" id="lv3" style="--c:#FF8C8C"><div class="nm">연수</div><div class="cn">IX ~ XII</div><div class="fn">호흡 · 삼킴 · 발성 · 심장박동<br>운동신경 교차</div></div>
      <div class="row fade" id="cnx" style="margin-top:12px;font-size:20px">12쌍 중 <b>I 후신경</b>, <b>II 시신경</b>을 뺀 <b class="hl-y">10쌍</b>이 뇌간에서 나옴</div></div>`);
    add(`<div class="glass fade" id="cbc" style="right:60px;top:170px;width:540px"><h3>소뇌</h3>
      <div class="row">몸의 <b class="hl-y">운동과 균형</b> 중추 · 협응 조절</div>
      <div class="row" style="margin-top:8px">대뇌와 달리 <b>같은 쪽(동측)</b> 몸을 담당</div>
      <div class="row" style="margin-top:12px">손상 → <b class="hl-r">실조형 마비말장애</b><br><span style="font-size:20px">불규칙한 조음 붕괴 · 과균등 강세 · 음소 간 간격 연장</span></div></div>`);
    add(`<div class="glass sumg fade" id="sum">
      <div class="sc" style="--c:#7FB2FF"><h4>신경계</h4><div>CNS = 뇌 + 척수<br>PNS = 체성(뇌신경 12 · 척수신경 31) + 자율(교감 ↔ 부교감)</div></div>
      <div class="sc" style="--c:#C58BFF"><h4>뉴런</h4><div>세포체 = 통합 · 수상돌기 = 수신 · 축삭 = 전달<br>미엘린 = 절연 · 랑비에 결절 = 속도 ↑</div></div>
      <div class="sc" style="--c:#EFE8DC"><h4>회백질 vs 백질</h4><div>뇌: 회백질 바깥 · 척수: 회백질 안쪽<br>회백질 = 세포체 · 백질 = 축삭</div></div>
      <div class="sc" style="--c:#FFE45C"><h4>대뇌 4엽 · 브로드만</h4><div>4 운동 · 6·8 전운동 · 44·45 브로카 · 3·1·2 체감각<br>39 각회 · 41 청각 · 42 청각연합 · 22 베르니케 · 17 시각<br>운동·감각 = <b>반대쪽</b> 몸 · 호문쿨루스: 손·입술·혀 넓음</div></div>
      <div class="sc" style="--c:#FF8CC6"><h4>섬유 3종</h4><div>투사 = 위아래 · 교련 = 좌우(뇌량)<br>연합 = 같은 반구(궁상속 → 전도실어증)</div></div>
      <div class="sc" style="--c:#5EE0A8"><h4>기저핵 · 간뇌</h4><div>미상핵 · 조가비핵 · 담창구 / 도파민<br>시상 = 후각 뺀 감각 중계 · 시상하부 = 항상성</div></div>
      <div class="sc" style="--c:#FFB86B"><h4>뇌간</h4><div>중뇌 III·IV · 뇌교 V~VIII · 연수 IX~XII<br>연수 = 호흡·삼킴·발성 · 운동신경 교차</div></div>
      <div class="sc" style="--c:#D99A9C"><h4>소뇌</h4><div>운동 · 균형 협응 · 동측 지배<br>손상 → 실조형 마비말장애</div></div>
      <div class="sc" style="--c:#9FB2DA"><h4>다음 시간</h4><div>1-2 뇌신경 12쌍 · 추체로/추체외로<br>UMN · LMN</div></div></div>`);
    ['q11_0','q11_4','q11_1','q11_2','q11_3'].forEach((id,i)=>add(quizHTML(id, Q11[i])));
    /* --- 일차운동 · 일차체감각 보강 --- */
    add(CSS11);
    add(`<div class="glass fade" id="homu"><h3>체부위 배열 · 호문쿨루스</h3><div class="hh"><span style="color:#FFC94A">감각 · 중심뒤이랑 (3·1·2)</span><span style="color:#7FB2FF">운동 · 중심앞이랑 (4)</span></div>${homunSVG()}</div>`);
    add(`<div class="glass fade" id="contra"><h3>대측 지배 · 반대쪽 몸을 담당</h3>${contraSVG()}
      <div class="row" style="font-size:21px;margin-top:6px">좌반구 손상 → <b class="hl-r">오른쪽</b> 편마비 · 감각 저하 &nbsp;<span style="font-size:17px;color:#A9B8D8">(소뇌만 같은 쪽)</span></div></div>`);
    add(`<div class="glass fade" id="prim"><h3>일차피질 vs 연합피질</h3><div class="cols">
      <div style="--c:#7FB2FF"><h4>일차피질</h4>정보의 <b class="hl-y">초기 처리</b><br>4 운동 · 3·1·2 체감각<br>41 청각 · 17 시각</div>
      <div style="--c:#C58BFF"><h4>연합피질</h4><b class="hl-y">통합 · 해석 · 계획</b><br>6·8 전운동 · 5·7 체감각연합<br>42 청각연합 · 18·19 시각연합</div></div>
      <div class="row" style="font-size:21px;margin-top:12px;text-align:center">운동 계획: <b class="hl-p">연합피질</b> → <b class="hl-b">일차운동피질</b> → 추체로</div></div>`);
    add(`<div class="glass fade" id="sma"><h3>6번 영역 · 운동의 준비</h3>
      <div class="row"><b class="hl-b">전운동영역</b> (바깥쪽) · 감각 정보에 맞춘 운동 준비 · 자세 조절</div>
      <div class="row" style="margin-top:8px"><b class="hl-p">보조운동영역</b> (안쪽 윗면) · 스스로 시작하는 움직임 · 순서 계획</div>
      <div class="row fade" id="smaX" style="margin-top:12px;font-size:21px">보조운동영역 = <b>전대뇌동맥(ACA)</b> 영역<br>손상 → 말 시작이 어려움 · <b class="hl-r">연결피질운동실어증</b></div></div>`);

    /* --- 3D 라벨 --- */
    L3('cnsBrain','뇌', G.brain, Vx(-0.75,0.55,-0.2), {color:'#7FB2FF', dx:-110, dy:-60, cls:'big'});
    L3('cnsCord','척수', G.cns, Vx(-0.08,-2.3,0.22), {color:'#7FB2FF', dx:-120, dy:0, cls:'big'});
    L3('pns','말초신경', G.cns, Vx(-1.05,-2.15,0.15), {color:'#FFC94A', dx:-130, dy:-20, cls:'big'});
    L3('soma','세포체 <small>정보 통합</small>', G.neuron, Vx(-2.3,0.4,0.1), {color:'#C58BFF', dx:40, dy:-110});
    L3('nuc','핵', G.neuron, Vx(-2.36,0.03,0.27), {color:'#9C7BFF', dx:-90, dy:70});
    L3('dend','수상돌기 <small>정보 수신</small>', G.neuron, Vx(-2.75,0.75,0.1), {color:'#C58BFF', dx:-60, dy:-90});
    L3('axon','축삭 <small>정보 전달</small>', G.neuron, Vx(-1.85,0.06,0), {color:'#C58BFF', dx:20, dy:110});
    L3('myel','미엘린 수초 <small>전기 절연</small>', G.neuron, Vx(0.3,0.12,0), {color:'#F4E7C9', dx:-40, dy:-110});
    L3('node','랑비에 결절 <small>속도 ↑</small>', G.neuron, Vx(W.nodeX[4],-0.07,0), {color:'#FF6FA5', dx:30, dy:110});
    L3('term','축삭 종말', G.neuron, Vx(2.95,0.42,0.25), {color:'#C9A6FF', dx:-90, dy:-80});
    L3('syn','시냅스 <small>신경전달물질</small>', G.neuron, Vx(3.14,0.1,0.2), {color:'#7DFFB2', dx:110, dy:-90});
    L3('post','다음 뉴런', G.neuron, Vx(3.4,-0.3,0.1), {color:'#5FC7F0', dx:90, dy:90});
    L3('cerebrum','대뇌', G.brain, Vx(-0.6,0.6,-0.3), {color:'#FFE45C', dx:-120, dy:-50, cls:'big'});
    L3('dien','간뇌 <small>시상 · 시상하부</small>', G.deep, Vx(-0.11,-0.05,0.12), {color:'#7FB2FF', dx:-170, dy:-40, cls:'big'});
    L3('bstem','뇌간', G.brain, Vx(-0.16,-0.6,0.15), {color:'#FFB86B', dx:-140, dy:60, cls:'big'});
    L3('cereb','소뇌', G.brain, Vx(-0.45,-0.55,0.85), {color:'#D99A9C', dx:90, dy:70, cls:'big'});
    L3('lfiss','대뇌세로열 <small>좌우 반구</small>', G.brain, Vx(0,0.66,0.05), {color:'#FFE45C', dx:0, dy:-120});
    const cs=W.lp('S_central',{umin:0.4,minL:0.2},[Fcs(0.5),0.5]), lf=W.lp('Lat_Fis-post',{fmin:-0.2,fmax:0.2},[0.2,-0.04,0.3]);
    L3('cs','중심고랑 <small>롤란도열</small>', hl, cs.p, {normal:cs.n, color:'#FFE45C', dx:40, dy:-100});
    L3('lf','외측고랑 <small>실비우스열</small>', hl, lf.p, {normal:lf.n, color:'#FFE45C', dx:-60, dy:110});
    const lp=[[0.62,0.3,'전두엽','#4F8EF7',-60,-70,'판단 · 계획 · 운동'],[-0.38,0.45,'두정엽','#F5B841',40,-90,'감각'],[0.12,-0.3,'측두엽','#2FC48A',-30,100,'청각 · 언어'],[-0.93,0.05,'후두엽','#EE6A93',80,40,'시각']];
    const LBL4=[['G_front_middle'],['G_parietal_sup'],['G_temporal_middle'],['G_occipital_middle','Pole_occipital']];
    lp.forEach(([F,U,t,c,dx,dy,d],i)=>{ const s=W.lp(LBL4[i],{minL:0.2},[F,U,i===3?-0.2:0.4]); L3('lobe'+i, `${t} <small>${d}</small>`, hl, s.p, {normal:s.n, color:c, dx, dy, cls:'big'}); });
    const ins=W.lp(['G_insular_short','G_Ins_lg_and_S_cent_ins'],{},[0.12,0.0,0.3]); L3('ins','섬엽(도엽) <small>외측고랑 깊숙이</small>', hl, ins.p, {normal:ins.n, color:'#FFAE5C', dx:-40, dy:120});
    /* 브로드만 표지 */
    /* 영역마다 표지 1개 + 번호 1개. 점은 옆(카메라)을 향한 이랑 꼭대기에서 고름 → 외측면 보기에서 가려지지 않음
       [id, 라벨, 색, [부위 이름들, 범위, 추가옵션, 대체F/U], 라벨 dx, dy, 번호 dx, dy] */
    const BA=[
      ['4','4 <small>일차운동</small>','#7FB2FF',[['G_precentral'],{umin:0.3,umax:0.5}],-20,-150,-11,-114],
      ['6','6 <small>전운동·보조운동</small>','#7FB2FF',[['G_front_middle','G_front_sup','S_precentral-sup-part'],{fmin:0.25,fmax:0.4,umin:0.35,umax:0.6}],-150,-110,-45,-75],
      ['8','8 <small>전운동</small>','#7FB2FF',[['G_front_middle','G_front_sup'],{fmin:0.5,fmax:0.62,umin:0.3,umax:0.55}],-110,-80,-44,-59],
      ['9','9 <small>전전두 연합</small>','#9FB2DA',[['G_front_middle','G_front_sup'],{fmin:0.72,fmax:0.86,umin:0.15,umax:0.45}],-150,-40,-76,-16],
      ['10','10 <small>전전두 연합</small>','#9FB2DA',[['G_and_S_transv_frontopol','G_and_S_frontomargin','G_front_sup','G_front_middle'],{fmin:0.9,umin:-0.25,umax:0.05},{dir:[-0.6,0,-0.8]}],-140,40,-64,20],
      ['44','44 <small>브로카 · 덮개부</small>','#4F8EF7',[['G_front_inf-Opercular'],{fmin:0.25,fmax:0.45}],40,120,-13,97],
      ['45','45 <small>브로카 · 삼각부</small>','#4F8EF7',[['G_front_inf-Triangul'],{}],-120,100,-26,72],
      ['312','3 · 1 · 2 <small>일차체감각</small>','#F5B841',[['G_postcentral'],{umin:0.3,umax:0.5}],40,-160,18,-132],
      ['5','5 <small>체감각연합</small>','#F5B841',[['G_parietal_sup','G_postcentral','G_and_S_paracentral'],{fmin:-0.35,fmax:-0.15,umin:0.55}],60,-110,50,-69],
      ['7','7 <small>체감각연합</small>','#F5B841',[['G_parietal_sup'],{fmin:-0.65,fmax:-0.4}],110,-80,38,-79],
      ['39','39 <small>각회 · 읽기</small>','#F5B841',[['G_pariet_inf-Angular'],{}],130,-70,71,-60],
      ['41','41 <small>일차청각</small>','#2FC48A',[['G_temp_sup-Lateral'],{fmin:0.0,fmax:0.2}],-80,120,-6,87],
      ['42','42 <small>청각연합</small>','#2FC48A',[['G_temp_sup-Lateral'],{fmin:-0.25,fmax:-0.05}],60,140,20,90],
      ['22','22 <small>베르니케</small>','#2FC48A',[['G_temp_sup-Lateral','G_temp_sup-Plan_tempo'],{fmax:-0.3}],120,110,50,60],
      ['17','17 <small>일차시각</small>','#EE6A93',[['Pole_occipital'],{}],110,90,28,43],
      ['18','18 <small>시각연합</small>','#EE6A93',[['G_occipital_middle','S_oc_middle_and_Lunatus','G_occipital_sup'],{fmax:-0.85}],150,10,84,42],
      ['19','19 <small>시각연합</small>','#EE6A93',[['G_occipital_middle','G_occipital_sup'],{fmin:-0.8,fmax:-0.62}],130,-70,82,-36]];
    S.BA_IDS=BA.map(b=>b[0]);
    BA.forEach(([id,t,c,spec,dx,dy,nx,ny])=>{ const m=mk11(id,spec,c); L3('ba'+id, t, hl, m.p, {normal:m.n, color:c, dx, dy});
      L3('bn'+id, t.split('<small>')[0].trim(), hl, m.p, {normal:m.n, color:c, dx:nx, dy:ny, cls:'num'}); });
    S.ba=(ids,v=true)=>{ if(v) BA.forEach(b=>W.lbl('ba'+b[0],false)); ids.forEach(id=>{ W.part('mk11_'+id,{op:v?1:0}); W.lbl('ba'+id,v); }); };
    /* 중심앞이랑(4) · 중심뒤이랑(3·1·2) 띠와 체부위 라벨 */
    const sM=strip11('strip4','G_precentral','#6FA8FF'), sS=strip11('strip312','G_postcentral','#FFC94A');
    const sm=(U)=>sM.at(U), ss=(U)=>sS.at(U);
    L3('st4','중심앞이랑 <small>4 일차운동</small>', hl, sm(0.5).p, {normal:sm(0.5).n, color:'#7FB2FF', dx:-170, dy:-90, cls:'big'});
    L3('st312','중심뒤이랑 <small>3·1·2 일차체감각</small>', hl, ss(0.45).p, {normal:ss(0.45).n, color:'#FFC94A', dx:170, dy:-100, cls:'big'});
    const cs2=W.lp('S_central',{umin:0.25,umax:0.4},[Fcs(0.3),0.3]);
    L3('cs2','중심고랑', hl, cs2.p, {color:'#FFE45C', dx:120, dy:60});
    L3('hb0','다리·발 <small>→ 안쪽 면</small>', hl, sm(0.75).p, {color:'#5EE0A8', dx:-150, dy:-70, cls:'bp'});
    L3('hb1','몸통·팔', hl, sm(0.6).p, {normal:sm(0.6).n, color:'#9FE0CF', dx:-160, dy:-20, cls:'bp'});
    L3('hb2','손 <small>넓음</small>', hl, sm(0.4).p, {normal:sm(0.4).n, color:'#4F8EF7', dx:-170, dy:20, cls:'bp'});
    L3('hb3','얼굴', hl, sm(0.2).p, {normal:sm(0.2).n, color:'#FFB86B', dx:-170, dy:30, cls:'bp'});
    L3('hb4','입술 · 혀 · 턱 · 후두 <small>말운동</small>', hl, sm(0.05).p, {normal:sm(0.05).n, color:'#FF6F91', dx:-120, dy:110, cls:'bp'});
    S.HB=['hb0','hb1','hb2','hb3','hb4'];
    const pm=pickLat(['G_front_middle','S_precentral-inf-part','S_precentral-sup-part'],{fmin:0.22,fmax:0.4,umin:0.2,umax:0.45})||sm(0.4);
    L3('pm','전운동영역 <small>6 · 바깥쪽</small>', hl, pm.p, {normal:pm.n, color:'#7FB2FF', dx:-170, dy:60});
    const smaP=pickLat(['G_front_sup'],{fmin:0.15,fmax:0.35,umin:0.6},{})||sm(0.75); const smaQ=pickLat(['G_front_sup'],{fmin:0.15,fmax:0.35,umin:0.62,minL:-0.6},{dir:[0,1,0],minDot:0.5})||smaP;
    L3('sma','보조운동영역 <small>6 · 안쪽 윗면</small>', hl, smaQ.p, {color:'#C58BFF', dx:-60, dy:-110});
    /* 섬유 · 심부 구조 */
    L3('fproj','투사섬유 <small>방사관</small>', G.proj, Vx(-0.36,0.22,-0.3), {color:'#FFD25E', dx:-120, dy:-80, cls:'big'});
    L3('fcomm','교련섬유 <small>뇌량</small>', G.comm, Vx(0,0.33,-0.1), {color:'#66E3FF', dx:-60, dy:-120, cls:'big'});
    L3('fassoc','궁상속 <small>연합섬유</small>', G.assoc, Vx(-0.57,0.2,0.12), {color:'#FF7BC0', dx:20, dy:-120, cls:'big'});
    const bro=W.lp(['G_front_inf-Opercular','G_front_inf-Triangul'],{},[0.46,-0.02]), wer=W.lp(['G_temp_sup-Lateral'],{fmax:-0.3,minL:0.2},[-0.34,0.03]);
    L3('aB','브로카 (44·45)', hl, bro.p, {normal:bro.n, color:'#4F8EF7', dx:-90, dy:80});
    L3('aW','베르니케 (22)', hl, wer.p, {normal:wer.n, color:'#2FC48A', dx:90, dy:80});
    L3('cau','미상핵', G.deep, Vx(-0.18,0.13,-0.44), {color:'#5ED6A8', dx:-120, dy:-60});
    L3('put','조가비핵', G.deep, Vx(-0.39,-0.05,-0.1), {color:'#C58BFF', dx:-140, dy:30});
    L3('pal','담창구 <small>창백핵</small>', G.deep, Vx(-0.27,-0.13,-0.04), {color:'#FF7DB8', dx:-100, dy:100});
    L3('nig','흑질 <small>도파민</small>', G.deep, Vx(-0.08,-0.31,0.12), {color:'#B48CC8', dx:60, dy:110});
    L3('striat','선조체 = 미상핵 + 조가비핵', G.deep, Vx(-0.3,0.2,-0.3), {color:'#5ED6A8', dx:-60, dy:-150});
    L3('thal','시상 <small>감각 중계소</small>', G.deep, Vx(-0.12,0.05,0.14), {color:'#7FB2FF', dx:-120, dy:-90});
    L3('hypo','시상하부 <small>항상성</small>', G.deep, Vx(0,-0.22,-0.06), {color:'#FF9F6B', dx:-150, dy:60});
    L3('pin','송과선 <small>시상상부 · 멜라토닌</small>', G.deep, Vx(0,0.03,0.34), {color:'#FFD36B', dx:110, dy:-80});
    L3('mid','중뇌', G.brain, Vx(-0.15,-0.3,0.14), {color:'#FFB86B', dx:-120, dy:-30, cls:'big'});
    L3('pon','뇌교', G.brain, Vx(-0.19,-0.54,0.1), {color:'#FFE45C', dx:-130, dy:10, cls:'big'});
    L3('med','연수', G.brain, Vx(-0.11,-0.86,0.2), {color:'#FF8C8C', dx:-120, dy:40, cls:'big'});

    /* 상태 도우미 */
    S.dimNeuron=(keep)=>{ const all=['soma','nucleus','dend','axon','myelin','node','term','post']; all.forEach(n=>W.part(n,{op:keep.includes(n)?(n==='soma'?0.6:1):0.18, em:keep.includes(n)?0.18:0})); };
    S.allNeuron=()=>{ W.part(['nucleus','dend','axon','myelin','node','term','post'],{op:1,em:0}); W.part('soma',{op:0.75,em:0}); };
    S.deepOnly=(list, rest=0)=>{ const all=['thalamus','hypothalamus','pineal','caudate','putamen','pallidus','nigra','callosum']; all.forEach(n=>W.part(n,{op:list.includes(n)?1:rest, em:list.includes(n)?0.35:0})); };
    S.stem=(hl)=>{ ['midbrain','pons','medulla'].forEach(n=>W.part(n,{em:hl.includes(n)?0.6:0.05, op:1})); };
    S.lbOff=()=>W.lblAllOff();
  },
  steps:[
    /* A. 신경계 */
    {wait:800},
    {id:'1-01', s:'N', t:'1편 신경해부생리, 첫 번째 시간입니다. 오늘은 뇌의 구조를 3D로 살펴봅니다.', do(){ tip(true); }},
    {id:'1-02', s:'N', t:'신경계는 크게 중추신경계와 말초신경계로 나뉩니다. 중추신경계는 뇌와 척수입니다.',
      do(){ tip(false); on('#hd',false); W.spin(0); W.show({cns:true}); W.fib('pns',0); W.view('cns',1800); W.shift(-260);
        later(()=>{ W.brain({glow:1}); W.part(['cerebellum','midbrain','pons','medulla','cordTop','cordLong'],{em:0.55}); W.lbl(['cnsBrain','cnsCord']); on('#tree'); on('#tr1'); sfx('glow'); },900); }},
    {id:'1-03', s:'N', t:'말초신경계는 뇌와 척수에서 뻗어 나와 온몸과 연결되는 신경입니다.',
      do(){ W.brain({glow:0.25}); W.part(['cerebellum','midbrain','pons','medulla','cordTop','cordLong'],{em:0.12}); W.fib('pns',1); W.lbl('pns'); on('#tr1',false); on('#tr2'); sfx('zap'); }},
    {id:'1-04', s:'N', t:'말초신경계는 체성신경계와 자율신경계로 나뉩니다. 체성신경계에는 뇌신경 12쌍과 척수신경 31쌍이 있습니다.', do(){ on('#tr2',false); on('#tr3'); sfx('pop'); }},
    {id:'1-05', s:'N', t:'자율신경계는 교감신경과 부교감신경입니다. 교감신경은 기능을 촉진하고 부교감신경은 기능을 감소시켜, 서로 반대로 작용하는 길항작용으로 항상성을 유지합니다.', do(){ on('#tr3',false); on('#tr4'); sfx('pop'); }},
    {id:'1-05a', s:'N', t:'예를 들어 긴장한 상황에서는 교감신경이 동공을 키우고 심박을 높입니다. 쉬고 소화할 때는 부교감신경이 동공을 줄이고 심박을 낮춥니다.', do(){ on('#yy1'); later(()=>{ on('#yy2'); sfx('pop'); },2600); sfx('pop'); }},
    /* B. 뉴런 */
    {id:'1-06', s:'N', t:'신경계의 기본 단위는 신경세포, 뉴런입니다.',
      do(S){ on('#tree',false); S.lbOff(); W.shift(0); W.brain({glow:0}); W.show({brain:false, cns:false, neuron:true}); S.allNeuron(); W.view('neuron',0); W.cam([0.25,1.4,8.2],[0.25,0,0],0); later(()=>W.view('neuron',2200),50); sfx('whoosh'); }},
    {id:'1-07', s:'N', t:'세포체에는 핵이 있고, 다른 뉴런에서 들어온 정보를 받아 통합합니다.', do(S){ S.dimNeuron(['soma','nucleus']); W.view('soma'); W.lbl(['soma','nuc']); sfx('pop'); }},
    {id:'1-08', s:'N', t:'나뭇가지처럼 뻗은 수상돌기는 다른 세포로부터 정보를 받아들입니다.', do(S){ S.dimNeuron(['dend','soma']); W.lbl('nuc',false); W.lbl('dend'); sfx('pop'); }},
    {id:'1-09', s:'N', t:'길게 뻗은 축삭은 정보를 다음 세포로 전달하는 통로입니다.', do(S){ S.dimNeuron(['axon','myelin','node','term']); W.view('neuron'); W.lbl(['soma','dend'],false); W.lbl('axon'); sfx('pop'); }},
    {id:'1-10', s:'N', t:'축삭을 감싼 미엘린 수초는 전기 신호가 새지 않도록 절연합니다.', do(S){ S.dimNeuron(['myelin','axon']); W.view('axon'); W.lbl('axon',false); W.lbl('myel'); sfx('pop'); }},
    {id:'1-11', s:'N', t:'수초와 수초 사이의 틈이 랑비에 결절입니다. 신호가 결절에서 결절로 건너뛰듯 전달되어, 전달 속도가 빨라집니다.',
      do(S){ S.dimNeuron(['node','myelin','axon']); W.lbl('node'); W.fx({signal:true, sigT:0}); sfx('zap'); }},
    {id:'1-12', s:'N', t:'이렇게 뉴런 안에서는 전기 신호로 전달됩니다.', do(S){ S.allNeuron(); W.lbl(['myel','node'],false); W.view('neuron'); }},
    {id:'1-13', s:'N', t:'뉴런과 뉴런이 만나는 신경연접, 즉 시냅스에서는 신경전달물질이라는 화학 신호로 바뀌어 건너갑니다.',
      do(S){ W.view('synapse',2000); W.fx({synapse:true}); S.dimNeuron(['term','post']); W.lbl(['term','syn','post']); sfx('glow'); }},
    {id:'1-14', s:'N', t:'뉴런은 기능에 따라 세 가지입니다. 감각뉴런은 정보를 중추로 보내는 구심성, 운동뉴런은 중추의 명령을 근육으로 보내는 원심성, 중간뉴런은 그 둘을 연결합니다.',
      do(S){ W.lbl(['term','syn','post'],false); S.allNeuron(); W.fx({synapse:false}); W.cam([0.25,2.4,7.6],[0.25,-0.9,0],1800); later(()=>{ on('#ntype'); sfx('pop'); },700); }},
    {id:'1-15', s:'N', t:'신경세포를 물리적으로 지지하는 세포는 교세포입니다. 교세포가 손상되면 진행성 핵상마비로 인한 마비말장애나, 치매 등이 나타날 수 있습니다.',
      do(S){ on('#ntype',false); W.shift(-280); S.dimNeuron([]); later(()=>{ on('#glia'); sfx('pop'); },500); }},
    {id:'1-16', s:'N', t:'참고로 축삭의 수초를 만드는 교세포는, 중추신경계에서는 희돌기교세포, 말초신경계에서는 슈반세포입니다.', do(S){ W.part('myelin',{op:1,em:0.4}); }},
    /* C. 회백질 · 백질 */
    {id:'1-17', s:'N', t:'중추신경계는 회백질과 백질로 이루어집니다. 회백질에는 세포체와 수상돌기, 신경연접이, 백질에는 축삭과 교세포가 모여 있습니다. 수초 때문에 하얗게 보여 백질이라 부릅니다.',
      do(){ on('#glia',false); W.fx({signal:false}); W.show({neuron:false}); W.shift(0); later(()=>{ on('#gw'); seq([()=>on('#g1'),()=>on('#g2'),()=>on('#g6')],900); sfx('whoosh'); },400); }},
    {id:'1-18', s:'N', t:'뇌에서는 회백질이 바깥쪽 대뇌피질을 이루고, 깊은 곳에도 기저핵 같은 피질하 회백질이 있습니다. 척수는 반대로, 회백질이 안쪽에 나비 모양으로 자리합니다.',
      do(){ on('#g3'); later(()=>{ on('#g4'); on('#g5'); sfx('pop'); },2600); }},
    /* D. 뇌의 큰 구분 */
    {id:'1-19', s:'N', t:'이제 뇌 전체를 보겠습니다. 뇌는 대뇌, 간뇌, 뇌간, 소뇌로 나뉩니다.',
      do(){ on('#gw',false); W.show({brain:true}); W.brain({op:1}); W.view('front3q',0); W.cam([-5,2.2,-5],[0,-0.2,0],0); later(()=>W.view('front3q',2000),30); W.spin(0.16); sfx('whoosh'); }},
    {id:'1-20', s:'N', t:'가장 크고 바깥을 덮고 있는 것이 대뇌입니다.', do(){ W.brain({glow:0.8}); W.lbl('cerebrum'); sfx('glow'); }},
    {id:'1-21', s:'N', t:'대뇌 안쪽 깊숙이, 뇌의 한가운데에는 간뇌가 있습니다.',
      do(S){ W.brain({glow:0, op:0.16}); W.show({deep:true}); S.deepOnly(['thalamus','hypothalamus']); W.lbl('cerebrum',false); W.lbl('dien'); W.spin(0); W.view('xray'); sfx('glow'); }},
    {id:'1-22', s:'N', t:'그 아래, 척수와 이어지는 줄기가 뇌간입니다.', do(S){ S.deepOnly([],0.15); W.lbl('dien',false); W.part(['midbrain','pons','medulla'],{em:0.6}); W.lbl('bstem'); W.view('stem'); sfx('glow'); }},
    {id:'1-23', s:'N', t:'뇌간 뒤쪽 아래에 자리한 것이 소뇌입니다.', do(){ W.part(['midbrain','pons','medulla'],{em:0}); W.lbl('bstem',false); W.brain({op:1}); W.show({deep:false}); W.part('cerebellum',{em:0.55}); W.lbl('cereb'); W.view('cereb'); sfx('glow'); }},
    /* E. 대뇌 4엽 */
    {id:'1-24', s:'N', t:'대뇌는 가운데의 대뇌세로열을 기준으로 좌우 두 반구로 나뉩니다.', do(){ W.part('cerebellum',{em:0}); W.lbl('cereb',false); W.view('top',2000); W.lbl('lfiss'); sfx('whoosh'); }},
    {id:'1-25', s:'N', t:'옆에서 보면 앞쪽과 뒤쪽을 나누는 중심고랑, 즉 롤란도열이 있습니다.', do(){ W.lbl('lfiss',false); W.view('lateralL',2000); later(()=>{ W.brain({cs:1}); W.lbl('cs'); sfx('glow'); },1200); }},
    {id:'1-26', s:'N', t:'아래쪽 측두엽을 나누는 외측고랑, 실비우스열이 있습니다.', do(){ W.brain({lf:1}); W.lbl('lf'); sfx('glow'); }},
    {id:'1-27', s:'N', t:'이 고랑들을 경계로, 대뇌는 네 개의 엽으로 나뉩니다.', do(){ W.brain({cs:0.35, lf:0.35}); W.lbl(['cs','lf'],false); W.lobes([0,1,2,3]); sfx('levelup'); }},
    {id:'1-28', s:'N', t:'앞쪽의 전두엽은 판단과 계획, 그리고 운동을 담당합니다.', do(){ W.lobes([0],true); W.lbl('lobe0'); sfx('pop'); }},
    {id:'1-29', s:'N', t:'중심고랑 뒤의 두정엽은 몸의 감각 정보를 처리합니다.', do(){ W.lobes([1],true); W.lbl('lobe0',false); W.lbl('lobe1'); sfx('pop'); }},
    {id:'1-30', s:'N', t:'외측고랑 아래의 측두엽은 청각과 언어 이해에 중요합니다.', do(){ W.lobes([2],true); W.lbl('lobe1',false); W.lbl('lobe2'); sfx('pop'); }},
    {id:'1-31', s:'N', t:'가장 뒤쪽의 후두엽은 시각을 담당합니다.', do(){ W.lobes([3],true); W.lbl('lobe2',false); W.lbl('lobe3'); sfx('pop'); }},
    {id:'1-32', s:'N', t:'그리고 외측고랑 깊숙한 곳에는, 다섯 번째 엽이라 불리는 섬엽, 도엽이 숨어 있습니다.', do(){ W.lobes([0,1,2,3]); W.lbl('lobe3',false); W.brain({lf:0.9}); W.lbl('ins'); sfx('pop'); }},
    /* F. 브로드만 */
    {id:'1-33', s:'N', t:'이제 국시 단골, 브로드만 영역 번호입니다. 위치와 번호를 함께 기억해 주세요.', do(){ W.lbl('ins',false); W.brain({lobe:[0.3,0.3,0.3,0.3], dim:[0,0,0,0], cs:0.6, lf:0.6}); sfx('whoosh'); }},
    {id:'1-34', s:'N', t:'중심고랑 바로 앞, 4번은 일차운동영역입니다. 그 앞의 6번은 운동을 준비하는 전운동영역과 보조운동영역입니다.', do(S){ W.view('lateralL',1200); S.ba(['4','6']); sfx('pop'); }},
    {id:'1-34a', s:'N', t:'6번 앞의 8번도 전운동영역에 함께 묶입니다. 이마 쪽 맨 앞의 9번과 10번은 기억과 사고, 판단을 맡는 전전두 연합영역입니다.',
      say:'육 번 앞의 팔 번도 전운동영역에 함께 묶입니다. 이마 쪽 맨 앞의 구 번과 십 번은 기억과 사고, 판단을 맡는 전전두 연합영역입니다.', do(S){ S.ba(['8','9','10']); sfx('pop'); }},
    {id:'1-35', s:'N', t:'전두엽 아래쪽의 44번과 45번은, 말을 산출하는 브로카 영역입니다.', do(S){ S.ba(['44','45']); W.brain({lobe:[0.75,0.3,0.3,0.3]}); W.cam([-4.1,0.05,-1.3],[0,-0.08,-0.42],1800); sfx('pop'); }},
    {id:'1-35a', s:'N', t:'브로카 영역은 전두엽의 하전두이랑에 있고, 중대뇌동맥에서 혈액을 받습니다. 44번은 뒷쪽의 덮개부, 45번은 앞쪽의 삼각부입니다.',
      say:'브로카 영역은 전두엽의 하전두이랑에 있고, 중대뇌동맥에서 혈액을 받습니다. 사십사 번은 뒷쪽의 덮개부, 사십오 번은 앞쪽의 삼각부입니다.', do(){ sfx('glow'); }},
    {id:'1-36', s:'N', t:'중심고랑 바로 뒤, 3, 1, 2번은 일차체감각영역입니다.', say:'중심고랑 바로 뒤, 삼, 일, 이 번은 일차체감각영역입니다.', do(S){ W.view('lateralL',1500); S.ba(['312']); W.brain({lobe:[0.3,0.75,0.3,0.3]}); sfx('pop'); }},
    {id:'1-36a', s:'N', t:'그 뒤쪽 위의 5번과 7번은, 들어온 감각을 종합해 해석하는 체감각연합영역입니다.', say:'그 뒤쪽 위의 오 번과 칠 번은, 들어온 감각을 종합해 해석하는 체감각연합영역입니다.', do(S){ S.ba(['5','7']); sfx('pop'); }},
    {id:'1-37', s:'N', t:'두정엽 아래 뒤쪽의 39번 각회는 읽기와 관련됩니다.', do(S){ S.ba(['39']); sfx('pop'); }},
    {id:'1-38', s:'N', t:'측두엽 위쪽의 41번은 일차청각영역, 42번은 청각연합영역입니다.', do(S){ S.ba(['41','42']); W.brain({lobe:[0.3,0.3,0.75,0.3]}); sfx('pop'); }},
    {id:'1-39', s:'N', t:'그 뒤쪽의 22번이, 언어 이해를 담당하는 베르니케 영역입니다.', do(S){ S.ba(['22']); sfx('ding'); }},
    {id:'1-40', s:'N', t:'후두엽의 17번은 일차시각영역, 18번과 19번은 시각연합영역입니다.', do(S){ S.ba(['17','18','19']); W.brain({lobe:[0.3,0.3,0.3,0.75]}); sfx('pop'); }},
    {id:'1-41', s:'N', t:'한 번에 정리해 볼까요? 운동 4, 브로카 44와 45, 체감각 3, 1, 2, 각회 39, 청각 41과 42, 베르니케 22, 시각 17입니다.',
      say:'한 번에 정리해 볼까요? 운동 사, 브로카 사십사와 사십오, 체감각 삼, 일, 이, 각회 삼십구, 청각 사십일과 사십이, 베르니케 이십이, 시각 십칠입니다.',
      do(S){ W.lblAllOff(); S.ba(S.BA_IDS); W.lblAllOff(); W.brain({lobe:[0.55,0.55,0.55,0.55]}); W.shift(-330); later(()=>{ on('#btab'); sfx('ding'); },500);
        seq([['4'],['44','45'],['312'],['39'],['41','42'],['22'],['17'],['6','8','9','10'],['5','7','18','19']].map(g=>()=>{ W.lbl(g.map(x=>'bn'+x)); sfx('pop'); }), 1150); }},
    /* F2. 일차운동영역 · 일차체감각영역 자세히 */
    {id:'1-41a', s:'N', t:'이제 시험에 자주 나오는 일차운동영역과 일차체감각영역을 조금 더 자세히 보겠습니다.',
      do(S){ on('#btab',false); W.lblAllOff(); S.ba(S.BA_IDS,false); W.shift(0); W.brain({lobe:[0,0,0,0], dim:[0,0,0,0], cs:1, lf:0.4}); W.cam([-3.9,1.55,-0.15],[0,0.18,0.0],2200); sfx('whoosh'); }},
    {id:'1-41b', s:'N', t:'중심고랑을 경계로, 바로 앞의 중심앞이랑이 4번 일차운동영역이고, 바로 뒤의 중심뒤이랑이 3, 1, 2번 일차체감각영역입니다.',
      say:'중심고랑을 경계로, 바로 앞의 중심앞이랑이 사 번 일차운동영역이고, 바로 뒤의 중심뒤이랑이 삼, 일, 이 번 일차체감각영역입니다.',
      do(){ W.lbl('cs2'); seq([()=>{ W.part('strip4',{op:0.9}); W.lbl('st4'); sfx('glow'); },()=>{ W.part('strip312',{op:0.9}); W.lbl('st312'); sfx('glow'); }],1700); }},
    {id:'1-41c', s:'N', t:'일차운동영역에는 상부운동신경원의 세포체가 모여 있습니다. 수의운동 명령이 여기서 만들어져, 추체로를 따라 뇌간과 척수로 내려갑니다.',
      do(){ W.lbl(['cs2','st312'],false); W.part('strip312',{op:0.3}); W.part('strip4',{op:1, em:1}); sfx('zap'); }},
    {id:'1-41d', s:'N', t:'일차체감각영역은 피부와 근육, 관절에서 올라온 촉각과 통증, 온도, 위치 감각을 시상을 거쳐 처음으로 받아들입니다.',
      do(){ W.lbl('st4',false); W.part('strip4',{op:0.3}); W.part('strip312',{op:1}); W.lbl('st312'); sfx('glow'); }},
    {id:'1-41e', s:'N', t:'두 영역은 모두 몸의 반대쪽을 담당합니다. 그래서 왼쪽 반구가 손상되면 오른쪽 몸에 마비와 감각 저하가 나타나는데, 이것을 대측 지배라고 합니다.',
      do(){ W.lblAllOff(); W.part(['strip4','strip312'],{op:0.9}); W.shift(-330); later(()=>{ on('#contra'); sfx('whoosh'); },500); }},
    {id:'1-41f', s:'N', t:'또 이 띠 위에는 몸의 각 부위가 순서대로 배치된 지도가 있습니다. 이것을 체부위 배열, 또는 호문쿨루스라고 합니다.',
      do(){ on('#contra',false); W.part('strip312',{op:0.3}); W.part('strip4',{op:0.95}); later(()=>{ on('#homu'); sfx('whoosh'); },450); }},
    {id:'1-41g', s:'N', t:'위에서부터 보면, 대뇌세로열 안쪽 면에는 발과 다리가 있고, 그 아래로 몸통과 팔, 손이 이어집니다. 가장 아래쪽 외측고랑 가까이에는 얼굴과 입술, 혀, 그리고 삼킴에 관여하는 인두와 후두가 있습니다.',
      do(S){ $('#homu').classList.add('m'); seq(S.HB.map(h=>()=>{ W.lbl(h); sfx('pop'); }), 1500); }},
    {id:'1-41h', s:'N', t:'각 부위가 차지하는 넓이는 몸의 실제 크기가 아니라, 얼마나 정교하게 움직이고 느끼는지에 비례합니다. 그래서 섬세한 손과 입술, 혀의 영역이 유난히 넓습니다.',
      do(){ zoom(1340,330,1.3,1500); sfx('glow'); }},
    {id:'1-41i', s:'N', t:'운동 호문쿨루스와 감각 호문쿨루스는 거의 같은 순서로 나란히 놓입니다. 운동 쪽은 움직임의 정교함, 감각 쪽은 감각의 예민함에 따라 넓이가 정해집니다.',
      do(){ zoomOut(1200); $('#homu').classList.add('s'); W.part('strip312',{op:0.9}); sfx('pop'); }},
    {id:'1-41j', s:'N', t:'말과 관련해 꼭 기억할 곳은 아래쪽입니다. 일차운동영역의 아래쪽 외측 부분이 입술과 혀, 턱, 후두를 움직이므로, 이곳이 손상되면 말운동에 문제가 생깁니다. 바로 앞에는 브로카 영역이 이웃해 있습니다.',
      do(S){ on('#homu',false); W.lblAllOff(); W.shift(0); W.part('strip312',{op:0.25}); W.part('strip4',{op:0.95}); W.cam([-3.6,0.2,-0.7],[0,-0.02,-0.12],2000); S.ba(['44','45']); W.lbl(['ba44','ba45'],false);
        later(()=>{ W.lbl(['hb4','aB']); sfx('glow'); },1300); }},
    {id:'1-41k', s:'N', t:'일차운동영역 앞의 6번은 운동을 준비하는 곳입니다. 바깥쪽의 전운동영역은 감각 정보에 맞춰 운동을 준비하고, 안쪽 윗면의 보조운동영역은 스스로 시작하는 움직임과 그 순서를 계획합니다.',
      say:'일차운동영역 앞의 육 번은 운동을 준비하는 곳입니다. 바깥쪽의 전운동영역은 감각 정보에 맞춰 운동을 준비하고, 안쪽 윗면의 보조운동영역은 스스로 시작하는 움직임과 그 순서를 계획합니다.',
      do(S){ W.lblAllOff(); S.ba(['44','45'],false); W.part('strip4',{op:0.6, em:0}); W.part('strip312',{op:0}); W.brain({lobe:[0.7,0,0,0], dim:[0,0.5,0.5,0.5], cs:0.8}); W.shift(-330); W.cam([-3.3,3.1,-1.3],[0,0.2,-0.1],2000);
        later(()=>{ on('#sma'); W.lbl(['pm','sma']); S.ba(['6']); W.lbl('ba6',false); sfx('pop'); },900); }},
    {id:'1-41l', s:'N', t:'보조운동영역은 전대뇌동맥이 혈액을 대는 안쪽 면에 있습니다. 이곳이 손상되면 말을 시작하기 어려운 연결피질운동실어증이 나타날 수 있습니다.',
      do(){ on('#smaX'); sfx('ding'); }},
    {id:'1-41m', s:'N', t:'이처럼 운동 계획은 연합피질에서 세워져 일차운동피질로 전달됩니다. 일차피질은 정보를 처음 처리하고, 연합피질은 그 정보를 통합하고 해석합니다.',
      do(S){ on('#sma',false); on('#smaX',false); W.lblAllOff(); S.ba(['6'],false); W.part('strip4',{op:0}); W.brain({lobe:[0.45,0.45,0.45,0.45], dim:[0,0,0,0], cs:0.5}); W.view('lateralL',1800); later(()=>{ on('#prim'); sfx('pop'); },500); }},
    {id:'1-41n', s:'N', t:'감각도 마찬가지입니다. 일차체감각영역 뒤의 5번과 7번 체감각연합영역이 감각을 종합해, 눈을 감고도 손에 쥐 물건이 무엇인지 알아차리게 합니다.',
      say:'감각도 마찬가지입니다. 일차체감각영역 뒤의 오 번과 칠 번 체감각연합영역이 감각을 종합해, 눈을 감고도 손에 쥐 물건이 무엇인지 알아차리게 합니다.',
      do(S){ W.part('strip312',{op:0.85}); S.ba(['312','5','7']); W.lbl('ba312',false); W.lbl(['bn312','ba5','ba7']); W.brain({lobe:[0.2,0.8,0.2,0.2]}); sfx('pop'); }},
    /* G. 신경섬유 */
    {id:'1-42', s:'N', t:'뇌의 여러 영역은 축삭 다발, 신경섬유로 서로 연결됩니다. 신경섬유는 세 종류입니다.',
      do(S){ on('#btab',false); on('#prim',false); W.lblAllOff(); S.ba(S.BA_IDS,false); W.part(['strip4','strip312'],{op:0, em:0}); W.shift(0); W.brain({lobe:[0,0,0,0], dim:[0,0,0,0], cs:0, lf:0, op:0.13}); W.view('xray',2000); sfx('whoosh'); }},
    {id:'1-43', s:'N', t:'투사섬유는 대뇌피질과 피질 아래 구조를 위아래로 연결합니다. 부챗살처럼 퍼져 있어 방사관이라고도 합니다.', do(){ W.fib('proj',1); W.lbl('fproj'); sfx('zap'); }},
    {id:'1-44', s:'N', t:'교련섬유는 좌우 반구를 연결합니다. 대표적인 예가 뇌량입니다.', do(S){ W.fib('proj',0.12); W.lbl('fproj',false); W.fib('comm',1); W.show({deep:true}); S.deepOnly(['callosum'],0); W.lbl('fcomm'); W.cam([-2.2,2.6,-2.6],[0,0.05,0],1800); sfx('zap'); }},
    {id:'1-45', s:'N', t:'연합섬유는 같은 반구 안의 영역끼리 연결합니다. 대표적인 것이 브로카 영역과 베르니케 영역을 잇는 궁상속입니다.',
      do(S){ W.fib('comm',0); W.fib('proj',0); S.deepOnly([],0); W.lbl('fcomm',false); W.fib('assoc',1); W.brain({op:0.28, lobe:[0.5,0,0.5,0]}); W.view('lateralL',2000); later(()=>{ W.lbl(['fassoc','aB','aW']); sfx('zap'); },900); }},
    {id:'1-46', s:'N', t:'궁상속이 손상되면 말하기와 이해는 비교적 되지만, 따라 말하기가 어려운 전도실어증이 나타납니다.',
      do(){ W.arcCut(true); sfx('cut'); add(`<div class="cutx fade on" id="cutx" style="left:50%;top:42%">✂️</div>`); zoom(800,380,1.25,1400); }},
    {id:'1-47', s:'N', t:'정리하면, 투사섬유는 위아래, 교련섬유는 좌우, 연합섬유는 같은 반구 안입니다.',
      do(){ zoomOut(1100); $('#cutx')&&$('#cutx').remove(); W.arcCut(false); W.lblAllOff(); W.brain({op:0.13, lobe:[0,0,0,0]}); W.fib('proj',0.7); W.fib('comm',0.7); W.fib('assoc',0.9); W.view('xray',1800); W.spin(0.12); later(()=>{ on('#fsum'); sfx('ding'); },600); }},
    /* H. 기저핵 */
    {id:'1-48', s:'N', t:'이번에는 대뇌 깊숙한 곳, 피질 아래의 회백질 덩어리인 기저핵입니다.',
      do(S){ on('#fsum',false); W.spin(0); ['proj','comm','assoc'].forEach(f=>W.fib(f,0)); W.brain({op:0.1}); W.show({deep:true}); S.deepOnly(['caudate','putamen','pallidus'],0.12); W.view('deep',2000); sfx('whoosh'); }},
    {id:'1-49', s:'N', t:'기저핵은 미상핵, 조가비핵, 담창구로 이루어집니다. 미상핵과 조가비핵을 합쳐 선조체라고 부릅니다.',
      do(){ seq([()=>{W.lbl('cau');sfx('pop')},()=>{W.lbl('put');sfx('pop')},()=>{W.lbl('pal');sfx('pop')},()=>{W.lbl('striat');sfx('ding')}],1100); }},
    {id:'1-50', s:'N', t:'기저핵은 근육 활동을 촉진하거나 억제해, 원치 않는 움직임을 걸러 냅니다. 이 조절의 핵심 신경전달물질이 도파민이고, 도파민은 중뇌의 흑질에서 만들어집니다.',
      do(S){ W.lbl(['striat','pal'],false); S.deepOnly(['caudate','putamen','pallidus','nigra'],0.12); W.part('nigra',{em:0.9}); W.lbl('nig'); sfx('glow'); }},
    {id:'1-51', s:'N', t:'도파민이 부족하면 파킨슨병, 과다하면 헌팅턴병 같은 무도병이 나타납니다. 마비말장애에서 과소운동형과 과다운동형으로 다시 만나게 됩니다.',
      do(){ W.shift(-290); on('#see'); sfx('pop'); later(()=>{ $('#beam').style.transform='rotate(-14deg)'; on('#r1'); sfx('tick'); },1800); later(()=>{ $('#beam').style.transform='rotate(14deg)'; on('#r1',false); on('#r2'); sfx('tick'); },5200); }},
    /* I. 간뇌 */
    {id:'1-52', s:'N', t:'기저핵 안쪽, 뇌의 한가운데에는 간뇌가 있습니다. 간뇌는 시상, 시상하부, 시상상부로 나뉩니다.',
      do(S){ on('#see',false); W.shift(0); W.lblAllOff(); S.deepOnly(['thalamus','hypothalamus','pineal'],0.1); W.cam([-1.7,0.7,-1.9],[0,-0.06,0.08],1800); sfx('whoosh'); }},
    {id:'1-53', s:'N', t:'시상은 냄새, 즉 후각을 제외한 모든 감각 정보를 대뇌피질로 보내는 중계소입니다.', do(){ W.part('thalamus',{em:0.8}); W.lbl('thal'); sfx('glow'); }},
    {id:'1-53a', s:'N', t:'시상은 감각만 중계하지 않습니다. 기저핵과 소뇌에서 온 운동 정보도 시상을 거쳐 대뇌의 운동피질로 전달됩니다.', do(){ W.part('thalamus',{em:1}); sfx('glow'); }},
    {id:'1-54', s:'N', t:'시상하부는 감정과 자율신경, 그리고 체온과 배고픔 같은 몸의 항상성을 조절합니다.', do(){ W.part('thalamus',{em:0.2}); W.part('hypothalamus',{em:0.8}); W.lbl('hypo'); sfx('glow'); }},
    {id:'1-55', s:'N', t:'시상상부에는, 수면 호르몬인 멜라토닌을 만드는 송과선이 있습니다.', do(){ W.part('hypothalamus',{em:0.2}); W.part('pineal',{em:0.9}); W.lbl('pin'); sfx('glow'); }},
    /* J. 뇌간 */
    {id:'1-56', s:'N', t:'간뇌 아래, 척수로 이어지는 줄기가 뇌간입니다. 위에서부터 중뇌, 뇌교, 연수입니다.',
      do(S){ W.lblAllOff(); W.show({deep:false}); W.brain({op:0.18}); W.part('cerebellum',{op:0.3}); W.view('stem',2000); W.shift(-280); S.stem(['midbrain','pons','medulla']);
        later(()=>{ seq([()=>{W.lbl('mid');sfx('pop')},()=>{W.lbl('pon');sfx('pop')},()=>{W.lbl('med');sfx('pop')}],900); on('#cn'); },900); }},
    {id:'1-57', s:'N', t:'중뇌는 시각과 청각 반사의 중추로, 3번과 4번 뇌신경이 시작됩니다.', do(S){ S.stem(['midbrain']); on('#lv1'); sfx('glow'); }},
    {id:'1-58', s:'N', t:'뇌교는 대뇌와 소뇌를 잇는 다리 역할을 하고, 5번부터 8번 뇌신경이 나옵니다.', do(S){ S.stem(['pons']); on('#lv1',false); on('#lv2'); sfx('glow'); }},
    {id:'1-58a', s:'N', t:'뇌교는 얼굴의 감각과 씹기 운동, 얼굴 표정에도 관여해, 말과 삼킴에 중요합니다.', do(){ sfx('glow'); }},
    {id:'1-59', s:'N', t:'연수는 호흡, 삼킴, 발성, 심장 박동을 조절하는 생명 중추입니다. 운동신경이 반대쪽으로 교차하는 곳이며, 9번부터 12번 뇌신경이 나옵니다.', do(S){ S.stem(['medulla']); on('#lv2',false); on('#lv3'); sfx('glow'); }},
    {id:'1-60', s:'N', t:'그래서 12쌍의 뇌신경 가운데 1번 후신경과 2번 시신경을 뺀 10쌍이 뇌간에서 나옵니다. 뇌신경은 다음 편에서 자세히 다룹니다.', do(S){ S.stem(['midbrain','pons','medulla']); on('#lv3',false); on('#cnx'); sfx('ding'); }},
    /* K. 소뇌 */
    {id:'1-61', s:'N', t:'뇌간 뒤쪽에는 소뇌가 있습니다. 소뇌는 몸의 운동과 균형을 조율하는 협응의 중추입니다.',
      do(S){ on('#cn',false); W.lblAllOff(); S.stem([]); W.brain({op:1}); W.part('cerebellum',{op:1, em:0.55}); W.view('cereb',2000); W.lbl('cereb'); later(()=>on('#cbc'),800); sfx('glow'); }},
    {id:'1-62', s:'N', t:'대뇌와 달리 소뇌는 같은 쪽 몸을 담당합니다. 소뇌가 손상되면 불규칙한 조음 붕괴와 과균등 강세가 나타나는 실조형 마비말장애가 생깁니다.', do(){ sfx('pop'); }},
    /* L. 정리 + 퀴즈 */
    {id:'1-63', s:'N', t:'오늘 배운 내용을 한 장으로 정리합니다.',
      do(){ on('#cbc',false); on('#hd',false); W.lblAllOff(); W.part('cerebellum',{em:0}); W.brain({op:0}); W.shift(0); later(()=>{ W.show({brain:false}); on('#sum'); sfx('ding'); },500); }, gap:2600},
    ...quizSteps('q11_0', Q11[0], ()=>{ on('#sum',false); }),
    ...quizSteps('q11_4', Q11[1], ()=>on('#q11_0',false)),
    ...quizSteps('q11_1', Q11[2], ()=>on('#q11_4',false)),
    ...quizSteps('q11_2', Q11[3], ()=>on('#q11_1',false)),
    ...quizSteps('q11_3', Q11[4], ()=>on('#q11_2',false)),
    {id:'1-64', s:'N', t:'수고하셨습니다. 다음 시간에는 뇌신경 12쌍과, 상부·하부 운동신경을 잇는 운동 경로를 살펴봅니다.', do(){ on('#q11_3',false); W.show({brain:true}); W.brain({op:1, lobe:[0,0,0,0]}); W.view('front3q',0); W.spin(0.2); }},
    {wait:2000},
  ]});

/* 엽 경계 함수(라벨 위치용, world3d와 동일) */
function Fcs(U){ return 0.22-0.343*U; }
