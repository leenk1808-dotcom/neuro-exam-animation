/* =================================================================
   1-3. 신경해부생리 ③ 뇌혈관 · 뇌졸중 · 뇌막 · 뇌실
   자료: 신경언어장애 정리(메인) 1-3)~5) · 중간고사 정리(대뇌혈관, 뇌막, 뇌실) · 특강 Part 1 (p27-32, 36, 40) · 교재(MCA p.243, CSF)
   ================================================================= */

/* ---- 혈관 단면 애니메이션 (혈전 · 색전 · 출혈) ---- */
function vesselScene(S){
  const NS='http://www.w3.org/2000/svg';
  add(`<div class="glass vsl fade" id="vsl"><span class="st3" id="vslT">정상 혈류</span><svg viewBox="0 0 1200 440" id="vsvg">
    <defs><radialGradient id="bleed"><stop offset="0" stop-color="#C8102E" stop-opacity=".85"/><stop offset="1" stop-color="#C8102E" stop-opacity="0"/></radialGradient></defs>
    <rect id="tisU" x="1010" y="50" width="170" height="120" rx="22" fill="#E7B2A5"/><text id="tisUt" x="1095" y="118" text-anchor="middle" font-size="22" font-weight="800" fill="#5A2A2A">뇌 조직</text>
    <rect id="tisL" x="1010" y="270" width="170" height="120" rx="22" fill="#E7B2A5"/><text id="tisLt" x="1095" y="338" text-anchor="middle" font-size="22" font-weight="800" fill="#5A2A2A">뇌 조직</text>
    <circle id="bleedC" cx="820" cy="330" r="10" fill="url(#bleed)" opacity="0"/>
    <path id="pm" d="M20 220 C 300 220, 450 220, 600 220" stroke="#7A2433" stroke-width="66" fill="none" stroke-linecap="round"/>
    <path id="pu" d="M600 220 C 760 220, 820 112, 1010 110" stroke="#7A2433" stroke-width="44" fill="none"/>
    <path id="pl" d="M600 220 C 760 220, 820 328, 1010 330" stroke="#7A2433" stroke-width="44" fill="none"/>
    <path d="M20 220 C 300 220, 450 220, 600 220" stroke="#2A0A12" stroke-width="52" fill="none"/>
    <path d="M600 220 C 760 220, 820 112, 1010 110" stroke="#2A0A12" stroke-width="32" fill="none"/>
    <path d="M600 220 C 760 220, 820 328, 1010 330" stroke="#2A0A12" stroke-width="32" fill="none"/>
    <circle id="aneu" cx="0" cy="0" r="0" fill="#7A2433" stroke="#B83A4C" stroke-width="4"/>
    <g id="cells"></g>
    <g id="plq"></g>
    <circle id="emb" cx="-50" cy="-50" r="15" fill="#3A0610" stroke="#8C1D2E" stroke-width="3"/>
    <text id="ltag" x="0" y="0" font-size="22" font-weight="900" fill="#FFE45C" text-anchor="middle"></text>
  </svg></div>`);
  const svg=$('#vsvg'), pm=svg.querySelector('#pm'), pu=svg.querySelector('#pu'), pl=svg.querySelector('#pl');
  const Lm=pm.getTotalLength(), Lu=pu.getTotalLength(), Ll=pl.getTotalLength();
  const cells=[]; const cg=svg.querySelector('#cells');
  for(let i=0;i<46;i++){ const c=document.createElementNS(NS,'circle'); c.setAttribute('r',7); c.setAttribute('fill','#FF4D5E'); cg.appendChild(c); cells.push({el:c, s:i/46, br:i%2, jit:(Math.random()-0.5)*14}); }
  const V={mode:'flow', blockU:false, blockF:0.62, plaque:0, emb:-1, aneu:0, burst:0};
  S.vs=V;
  const at=(path,L,f)=>path.getPointAtLength(Math.max(0,Math.min(1,f))*L);
  const pu55=at(pu,Lu,V.blockF);
  // 혈전(플라크) 두 덩어리
  const plq=svg.querySelector('#plq');
  plq.innerHTML=`<ellipse id="pq1" cx="${pu55.x}" cy="${pu55.y-14}" rx="34" ry="14" fill="#E8C66A" stroke="#B9953A" stroke-width="3" transform="scale(1)" style="transform-box:fill-box;transform-origin:center;transform:scale(0);transition:transform 1.6s ease"/>
                  <ellipse id="pq2" cx="${pu55.x}" cy="${pu55.y+14}" rx="34" ry="14" fill="#E8C66A" stroke="#B9953A" stroke-width="3" style="transform-box:fill-box;transform-origin:center;transform:scale(0);transition:transform 1.6s ease"/>`;
  S.vsSet=(o)=>{ Object.assign(V,o);
    svg.querySelector('#pq1').style.transform=svg.querySelector('#pq2').style.transform=`scale(${V.plaque})`;
    const tu=svg.querySelector('#tisU'), tl=svg.querySelector('#tisL');
    tu.setAttribute('fill', V.blockU?'#6B6470':'#E7B2A5'); svg.querySelector('#tisUt').textContent = V.blockU?'허혈 · 괴사':'뇌 조직'; svg.querySelector('#tisUt').setAttribute('fill', V.blockU?'#fff':'#5A2A2A');
    tl.setAttribute('fill', V.burst?'#B4566A':'#E7B2A5'); svg.querySelector('#tisLt').textContent = V.burst?'출혈 · 압박':'뇌 조직'; svg.querySelector('#tisLt').setAttribute('fill', V.burst?'#fff':'#5A2A2A');
    const ap=at(pl,Ll,0.55); const an=svg.querySelector('#aneu'); an.setAttribute('cx',ap.x+10); an.setAttribute('cy',ap.y+26); an.setAttribute('r', V.aneu*26);
    const bc=svg.querySelector('#bleedC'); bc.setAttribute('cx',ap.x+10); bc.setAttribute('cy',ap.y+30); bc.setAttribute('r', 10+V.burst*150); bc.setAttribute('opacity', V.burst?1:0);
    if(V.burst) an.setAttribute('r',0);
    svg.querySelector('#tisLt').style.transition='none';
  };
  S.vsTitle=(t)=>{ $('#vslT').innerHTML=t; };
  S.vsTag=(t,x,y)=>{ const e=svg.querySelector('#ltag'); e.textContent=t||''; e.setAttribute('x',x||0); e.setAttribute('y',y||0); };
  let last=performance.now();
  function tick(now){ if(!svg.isConnected) return; requestAnimationFrame(tick); const dt=Math.min(0.05,(now-last)/1000); last=now; if(ENGINE.paused()) return;
    cells.forEach((c,i)=>{
      let s=c.s+dt*0.22; if(s>=1) s-=1;
      let p, path=c.br?pl:pu, L=c.br?Ll:Lu;
      if(!c.br && V.blockU && s>0.5){ const f=(s-0.5)/0.5; const lim=V.blockF-0.03-((i%6)*0.012); if(f>lim){ s=0.5+lim*0.5; } }
      if(c.br && V.burst && s>0.5+0.55*0.5){ c.el.setAttribute('opacity',0); } else c.el.setAttribute('opacity',1);
      c.s=s;
      if(s<0.5) p=at(pm,Lm,s/0.5); else p=at(path,L,(s-0.5)/0.5);
      c.el.setAttribute('cx',p.x); c.el.setAttribute('cy',p.y+c.jit*(s<0.5?1.4:0.7));
    });
    const e=svg.querySelector('#emb');
    if(V.emb>=0){ if(V.emb<1){ V.emb=Math.min(1,V.emb+dt*0.22); } const s=V.emb; let p; if(s<0.5) p=at(pm,Lm,s/0.5); else p=at(pu,Lu,Math.min(V.blockF,(s-0.5)/0.5)); e.setAttribute('cx',p.x); e.setAttribute('cy',p.y); if(s>=0.5+V.blockF*0.5-0.001 && !V.blockU){ V.blockU=true; S.vsSet({}); sfx('bad'); } }
    else { e.setAttribute('cx',-50); }
  }
  requestAnimationFrame(tick);
}

/* ---- 뇌막 단면 (3겹 뇌막 · 혈종) ---- */
function meningesScene(S){
  let gy='M0 300'; for(let x=0;x<=1200;x+=10){ const y=300+18*Math.sin(x/38)+(Math.abs(Math.sin(x/120))<0.12?60:0); gy+=` L${x} ${y.toFixed(1)}`; }
  const cortex=gy+' L1200 560 L0 560 Z';
  add(`<div class="mngw fade" id="mngw"><div class="mng"><svg viewBox="0 0 1200 560">
    <g class="ly" id="ly1"><rect x="0" y="0" width="1200" height="52" fill="#E8B49A"/><text x="1180" y="34" text-anchor="end" class="mtag" fill="#5A2A2A">피부</text></g>
    <g class="ly" id="ly2"><rect x="0" y="52" width="1200" height="82" fill="#EFE6D2"/>${Array.from({length:40},(_,i)=>`<circle cx="${(i*31)%1200+10}" cy="${70+((i*17)%50)}" r="${4+(i%3)}" fill="#D9CCB0"/>`).join('')}<text x="1180" y="104" text-anchor="end" class="mtag" fill="#6A5A3A">두개골</text></g>
    <g class="ly" id="ly3"><rect x="0" y="134" width="1200" height="26" fill="#C9B6A3"/><text x="1180" y="154" text-anchor="end" class="mtag" fill="#3A2A1A">경막</text></g>
    <g class="ly" id="ly4"><rect x="0" y="160" width="1200" height="24" fill="#AFC3E6"/><text x="1180" y="178" text-anchor="end" font-size="18" font-weight="900" fill="#1A2A4A">지주막 (거미막)</text></g>
    <g class="ly" id="ly5"><rect x="0" y="184" width="1200" height="116" fill="#17435E"/>${Array.from({length:26},(_,i)=>`<line x1="${i*48+10}" y1="184" x2="${i*48+22}" y2="295" stroke="#6F9CC0" stroke-width="2" opacity=".6"/>`).join('')}<g id="csf"></g><text x="1180" y="240" text-anchor="end" class="mtag" fill="#BFE8FF">지주막하강 · 뇌척수액</text></g>
    <g class="ly" id="ly6"><path d="${gy}" stroke="#F28C8C" stroke-width="7" fill="none"/><path d="${cortex}" fill="#E7B2A5"/><text x="1180" y="420" text-anchor="end" class="mtag" fill="#5A2A2A">대뇌피질 (연막이 뇌 표면에 밀착)</text></g>
    <g class="hm" id="edh"><path d="M140 134 Q300 214 460 134 Z" fill="#8E1022" stroke="#C8102E" stroke-width="3"/><text x="300" y="232" text-anchor="middle" class="mtag" fill="#FFE45C">경막외 혈종 (두개골 ↔ 경막)</text></g>
    <g class="hm" id="sdh"><path d="M380 160 Q720 200 1060 160 Q720 174 380 160 Z" fill="#A3162B" stroke="#E0384E" stroke-width="3"/><text x="720" y="225" text-anchor="middle" class="mtag" fill="#FFE45C">경막하 혈종 (경막 ↔ 지주막)</text></g>
    <g class="hm" id="sah"><rect x="320" y="185" width="560" height="113" fill="#B0152C" opacity=".72"/><text x="600" y="245" text-anchor="middle" class="mtag" fill="#FFE45C">지주막하 출혈 (지주막 아래)</text></g>
  </svg></div></div>`);
  const g=$('#csf'); const dots=[];
  for(let i=0;i<34;i++){ const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('r',4); c.setAttribute('fill','#BFF3FF'); g.appendChild(c); dots.push({el:c,x:Math.random()*1200,y:195+Math.random()*90,v:40+Math.random()*50}); }
  let last=performance.now();
  (function tick(now){ if(!g.isConnected) return; requestAnimationFrame(tick); const dt=Math.min(0.05,(now-last)/1000); last=now; if(ENGINE.paused()) return; dots.forEach(d=>{ d.x=(d.x+d.v*dt)%1200; d.el.setAttribute('cx',d.x); d.el.setAttribute('cy',d.y+4*Math.sin(d.x/30)); }); })(last);
  S.ly=(n)=>{ for(let i=1;i<=6;i++) $('#ly'+i).classList.toggle('on', i<=n); };
  S.hm=(id)=>{ ['edh','sdh','sah'].forEach(k=>$('#'+k).classList.toggle('on', k===id)); };
}

const Q13=[
  {sec:8, q:'실비안열을 중심으로 대뇌반구 외측면 대부분과 브로카·베르니케 영역에 혈액을 공급하는 동맥은?', opts:['전대뇌동맥 (ACA)','중대뇌동맥 (MCA)','후대뇌동맥 (PCA)','뇌저동맥','상소뇌동맥'], ans:1,
   say:'국시에 자주 나오는 문제입니다. 실비안열을 중심으로 대뇌 외측면 대부분과, 브로카와 베르니케 영역에 혈액을 공급하는 동맥은?', ex:'정답은 2번, 중대뇌동맥입니다. 뇌졸중에서 가장 흔히 막히는 동맥이기도 합니다.'},
  {sec:7, q:'전대뇌동맥(ACA) 손상 시 나타날 수 있는 실어증 유형은?', opts:['브로카 실어증','베르니케 실어증','연결피질운동실어증','전도실어증','명칭실어증'], ans:2,
   say:'전대뇌동맥이 손상되었을 때 나타날 수 있는 실어증 유형은 무엇일까요?', ex:'정답은 3번, 연결피질운동실어증입니다. 전대뇌동맥은 보조운동영역이 있는 뇌의 안쪽 면을 담당합니다.'},
  {sec:7, q:'후대뇌동맥(PCA) 손상 시 주로 나타나는 증상은?', opts:['실독증 · 시각장애','브로카 실어증','실조형 마비말장애','전반실어증','삼킴장애'], ans:0,
   say:'후대뇌동맥이 손상되면 주로 어떤 증상이 나타날까요?', ex:'정답은 1번입니다. 후대뇌동맥은 후두엽을 담당해서 실독증과 시각장애가 나타납니다.'},
  {sec:7, q:'심장 등에서 떨어져 나온 덩어리가 혈관을 타고 흐르다가 좁은 혈관을 막아 생기는 뇌졸중은?', opts:['혈전증','색전증','뇌내출혈','지주막하 출혈','경막외 혈종'], ans:1,
   say:'심장 등에서 떨어져 나온 덩어리가 혈관을 타고 흐르다가, 좁은 혈관을 막아 생기는 뇌졸중은?', ex:'정답은 2번, 색전증입니다. 혈관 벽에 혈전이 쌓여 그 자리를 막는 것은 혈전증입니다.'},
  {sec:7, q:'뇌막을 바깥쪽부터 순서대로 바르게 나열한 것은?', opts:['경막 - 지주막 - 연막','연막 - 지주막 - 경막','지주막 - 경막 - 연막','경막 - 연막 - 지주막','연막 - 경막 - 지주막'], ans:0,
   say:'마지막 문제입니다. 뇌막을 바깥쪽부터 순서대로 바르게 나열한 것은?', ex:'정답은 1번, 경막, 지주막, 연막입니다. 뇌척수액은 지주막과 연막 사이의 지주막하강을 흐릅니다.'},
];

CLIPS.push({ code:'1-3', short:'1-3 뇌혈관', title:'신경해부생리 ③ 뇌혈관 · 뇌졸중', desc:'경동맥계 · 추골-뇌저동맥계 · 윌리스환 · ACA/MCA/PCA · 뇌졸중 · 뇌막과 혈종 · 뇌실 · 퀴즈 5문제',
  build(S){
    const G=W.groups;
    W.show({brain:true}); W.view('front3q',0); W.spin(0.18);
    add(hdr('EP 1-3 · 신경해부생리 ③','뇌혈관과 뇌졸중'));
    add(`<div class="glass fade" id="sys" style="right:56px;top:140px;width:560px"><h3>뇌로 가는 혈관 두 계통</h3>
      <div class="row" id="sy1" style="padding:8px 12px;border-radius:12px;transition:.4s"><b style="color:#FF9F6B">경동맥계</b> · 앞쪽 순환<br><span style="font-size:19px">대동맥 → 총경동맥 → <b>내경동맥</b> → ACA · MCA<br>(외경동맥은 얼굴·두피) · 뇌 혈액의 약 80%</span></div>
      <div class="row" id="sy2" style="padding:8px 12px;border-radius:12px;margin-top:8px;transition:.4s"><b class="hl-g">추골-뇌저동맥계</b> · 뒤쪽 순환<br><span style="font-size:19px">쇄골하동맥 → 추골동맥 2개 → <b>뇌저동맥</b><br>→ 뇌간 · 소뇌 · PCA</span></div>
      <div class="row fade" id="sy3" style="margin-top:10px;padding:8px 12px;border-radius:12px;background:rgba(255,228,92,.12)"><b class="hl-y">윌리스환</b> · 두 계통을 잇는 고리<br><span style="font-size:19px">전교통동맥 = 좌우 ACA 연결<br>후교통동맥 = 같은 쪽 내경동맥 ↔ PCA</span></div></div>`);
    add(`<div class="glass cmp2 terrT fade" id="terrT"><h3>혈관별 담당 영역과 손상</h3><table>
      <tr><td style="color:#4F8EF7">ACA<br>전대뇌동맥</td><td>뇌 안쪽 면 (전두·두정 내측) · 보조운동영역<br>→ <b>연결피질운동실어증</b> · 말실행증</td></tr>
      <tr><td style="color:#FF5A5A">MCA<br>중대뇌동맥</td><td>실비안열 중심 외측면 대부분<br>→ <b>브로카 · 베르니케 · 전반실어증</b></td></tr>
      <tr><td style="color:#B57BFF">PCA<br>후대뇌동맥</td><td>후두엽 · 측두엽 아래 · 시상<br>→ <b>실독증</b> · 시각장애</td></tr>
      <tr><td style="color:#7FE0B0">소뇌동맥</td><td>상소뇌동맥 → 실조형 마비말장애<br>후하소뇌동맥 → 삼킴 · 마비말 · 음성장애</td></tr></table></div>`);
    add(`<div class="glass fade" id="mseg" style="right:56px;top:150px;width:540px"><h3>중대뇌동맥 (MCA)</h3>
      <div class="row">M1 · 기저핵 &nbsp;|&nbsp; M2 · 뇌섬 &nbsp;|&nbsp; M3 · 피질</div>
      <div class="row" style="margin-top:8px">M3 위쪽 → 일차운동 · <b class="hl-b">브로카</b> · 일차감각</div>
      <div class="row">M3 아래쪽 → <b class="hl-g">베르니케</b> · 두정엽 뒤</div>
      <div class="row fade" id="mseg2" style="margin-top:12px;padding:10px 12px;border-radius:12px;background:rgba(255,90,90,.14)">위쪽 막힘 → 브로카 실어증<br>아래쪽 막힘 → 베르니케 실어증<br>M1·M2 막힘 (실비안열 주변 전체) → 전반실어증</div></div>`);
    add(`<div class="glass fade" id="stk" style="left:50%;translate:-50% 0;top:560px;width:1240px;display:flex;gap:14px;padding:16px">
      <div id="sk1" style="flex:1;padding:12px;border-radius:14px;background:rgba(79,142,247,.12);transition:.4s"><h3 class="hl-b" style="margin:0 0 6px">허혈성 (뇌경색)</h3><div class="row" style="font-size:19px">혈관이 좁아지거나(협착) 막혀서(폐색) 혈액 공급 중단<br>혈전증 · 색전증 · 일과성 허혈 발작(TIA)</div></div>
      <div id="sk2" style="flex:1;padding:12px;border-radius:14px;background:rgba(255,90,90,.12);transition:.4s"><h3 class="hl-r" style="margin:0 0 6px">출혈성 (뇌출혈)</h3><div class="row" style="font-size:19px">혈관의 약한 지점이 터져 혈액이 밖으로<br>뇌내출혈(주로 고혈압) · 뇌외출혈(지주막하·경막하·경막외)</div></div></div>`);
    add(`<div class="glass fade" id="tia" style="right:56px;top:120px;width:470px"><h3>일과성 허혈 발작 (TIA)</h3><div class="row" style="font-size:20px">증상이 잠깐 나타났다 사라짐<br>예) 어지러움 5분 · 팔 마비 10분 · 발음 15분 만에 사라짐<br>영구 손상은 없지만 <b class="hl-r">뇌졸중의 경고 신호</b></div></div>`);
    add(`<div class="glass fade" id="kp" style="left:50%;translate:-50% 0;top:200px;width:1000px;text-align:center;padding:26px"><span class="pt" style="position:static;display:inline-block;margin-bottom:12px">국시 핵심</span>
      <div class="row" style="font-size:28px">실어증의 가장 흔한 원인 = <b class="hl-y">대뇌혈관사고 (뇌졸중, CVA)</b></div>
      <div class="row" style="font-size:24px;margin-top:8px"><b class="hl-b">뇌경색</b>(혈전증 · 색전증)과 <b class="hl-r">뇌출혈</b>을 구분하기</div></div>`);
    add(`<div class="glass fade" id="csfc" style="right:56px;top:140px;width:520px"><h3>뇌실과 뇌척수액</h3>
      <div class="row" style="font-size:20px">측뇌실 (좌우) → 제3뇌실 → 중뇌수도 → 제4뇌실 → 지주막하강</div>
      <div class="row" style="font-size:19px;margin-top:8px">뇌를 감싸는 쿠션 · 고여 있지 않고 <b>순환</b></div>
      <div class="row fade" id="csf2" style="margin-top:12px;padding:10px 12px;border-radius:12px;background:rgba(255,90,90,.14)">흐름이 막히거나 생산·흡수 균형이 깨지면<br>→ <b class="hl-r">뇌수종</b> · 뇌압 상승 · 인지장애</div></div>`);
    add(`<div class="glass sumg fade" id="sum3">
      <div class="sc" style="--c:#FF9F6B"><h4>경동맥계</h4><div>총경동맥 → 내경동맥 → ACA · MCA<br>앞쪽 순환 · 뇌 혈액 약 80%</div></div>
      <div class="sc" style="--c:#2FC48A"><h4>추골-뇌저동맥계</h4><div>추골동맥 2개 → 뇌저동맥<br>뇌간 · 소뇌 · PCA (뒤쪽 순환)</div></div>
      <div class="sc" style="--c:#FFE45C"><h4>윌리스환</h4><div>전교통 = 좌우 ACA<br>후교통 = 내경동맥 ↔ PCA · 혈류 보충</div></div>
      <div class="sc" style="--c:#4F8EF7"><h4>ACA</h4><div>뇌 안쪽 면 · 보조운동영역<br>→ 연결피질운동실어증 · 말실행증</div></div>
      <div class="sc" style="--c:#FF5A5A"><h4>MCA (자주 출제)</h4><div>외측면 대부분 · 가장 흔한 폐색<br>위 → 브로카 · 아래 → 베르니케 · 전체 → 전반</div></div>
      <div class="sc" style="--c:#B57BFF"><h4>PCA · 소뇌동맥</h4><div>PCA → 실독증 · 시각장애<br>소뇌동맥 → 실조형 마비말장애</div></div>
      <div class="sc" style="--c:#7FB2FF"><h4>뇌경색 (허혈성)</h4><div>혈전증 = 그 자리에서 막힘<br>색전증 = 흘러와서 막힘 · TIA = 경고 신호</div></div>
      <div class="sc" style="--c:#FF6B6B"><h4>뇌출혈 (출혈성)</h4><div>뇌내출혈 = 주로 고혈압<br>뇌외출혈 = 지주막하 · 경막하 · 경막외</div></div>
      <div class="sc" style="--c:#5FD3F0"><h4>뇌막 · 뇌실</h4><div>경막 → 지주막 → 연막 · 지주막하강에 CSF<br>측뇌실 → 3 → 중뇌수도 → 4 · 막히면 뇌수종</div></div></div>`);
    Q13.forEach((q,i)=>add(quizHTML('q13_'+i, q)));

    /* 3D 라벨 */
    const VL=[['vICA','내경동맥',Vx(-0.24,-0.85,-0.3),'#FF9F6B',-150,70],['vVert','추골동맥',Vx(-0.13,-1.1,0.09),'#2FC48A',-120,30],['vBas','뇌저동맥',Vx(0,-0.62,-0.05),'#2FC48A',110,20],
      ['vAcom','전교통동맥',Vx(0,-0.46,-0.45),'#FFE45C',90,-60],['vPcom','후교통동맥',Vx(-0.17,-0.46,-0.1),'#FFE45C',-160,10],['vACA','ACA 전대뇌동맥',Vx(-0.03,-0.33,-0.72),'#4F8EF7',-90,-70],
      ['vMCA','MCA 중대뇌동맥',Vx(-0.55,-0.24,-0.12),'#FF5A5A',-60,-80],['vPCA','PCA 후대뇌동맥',Vx(-0.28,-0.42,0.3),'#B57BFF',-110,60],['vSCA','상소뇌동맥',Vx(-0.3,-0.3,0.52),'#7FE0B0',80,-60],['vPICA','후하소뇌동맥',Vx(-0.3,-0.78,0.66),'#7FE0B0',90,40]];
    VL.forEach(([id,t,p,c,dx,dy])=>L3(id,t,G.vessels,p,{color:c,dx,dy}));
    L3('vM1','M1',G.vessels,Vx(-0.34,-0.42,-0.2),{color:'#FF5A5A',dx:-60,dy:60});
    L3('vSup','M3 위쪽 가지',G.vessels,W.vesselInfo.supEnd,{color:'#FF5A5A',dx:-30,dy:-80});
    L3('vInf','M3 아래쪽 가지',G.vessels,W.vesselInfo.infEnd,{color:'#FF8080',dx:40,dy:90});
    L3('tACA','ACA 영역',W.hemiL,Vx(-0.02,0.45,-0.35),{color:'#4F8EF7',dx:-60,dy:-80,cls:'big'});
    const mt=W.lp(['G_precentral','G_postcentral'],{umin:0.1,umax:0.3,minL:0.3},[0.1,0.3]), pt=W.lp(['Pole_occipital','G_occipital_middle'],{},[-0.95,0.0,-0.3]);
    L3('tMCA','MCA 영역',W.hemiL,mt.p,{normal:mt.n,color:'#FF5A5A',dx:-60,dy:-90,cls:'big'});
    L3('tPCA','PCA 영역',W.hemiL,pt.p,{normal:pt.n,color:'#B57BFF',dx:90,dy:60,cls:'big'});
    L3('vLat','측뇌실',G.vent,Vx(-0.13,0.18,-0.12),{color:'#5FD3F0',dx:-110,dy:-70,cls:'big'});
    L3('v3l','제3뇌실',G.vent,Vx(0,-0.1,0.0),{color:'#5FD3F0',dx:-120,dy:40});
    L3('aql','중뇌수도',G.vent,Vx(0,-0.36,0.28),{color:'#5FD3F0',dx:110,dy:-30});
    L3('v4l','제4뇌실',G.vent,Vx(0,-0.63,0.36),{color:'#5FD3F0',dx:130,dy:-20});
    const ALLV=['ica','vert','basilar','aca','acom','pcom','pca','sca','aica','pica','mca1','mcaS','mcaI'];
    S.vHi=(list,dim=true)=>{ ALLV.forEach(n=>W.part(n,{op:(!dim||list.includes(n))?1:0.15, em:list.includes(n)?0.45:0})); };
  },
  steps:[
    {wait:800},
    {id:'3-01', s:'N', t:'1편 신경해부생리, 세 번째 시간입니다. 오늘은 뇌의 혈관과 뇌졸중, 그리고 뇌를 감싸는 뇌막과 뇌실을 살펴봅니다.'},
    /* A. 두 계통 */
    {id:'3-02', s:'N', t:'뇌는 혈액으로 포도당과 산소를 공급받습니다. 뇌로 가는 혈관은 크게 두 계통입니다.',
      do(S){ on('#hd',false); W.spin(0); W.brain({op:0.22}); W.show({vessels:true}); S.vHi([],false); W.part('cerebellum',{op:0.4}); W.view('vessels',2000); W.shift(-300); later(()=>{ on('#sys'); sfx('whoosh'); },800); }},
    {id:'3-03', s:'N', t:'심장에서 나온 대동맥은 총경동맥으로 갈라지고, 총경동맥은 얼굴과 두피로 가는 외경동맥과, 뇌로 들어가는 내경동맥으로 나뉩니다. 내경동맥은 전대뇌동맥과 중대뇌동맥으로 이어지는 앞쪽 순환으로, 뇌로 가는 혈액의 약 80퍼센트를 보냅니다.',
      say:'심장에서 나온 대동맥은 총경동맥으로 갈라지고, 총경동맥은 얼굴과 두피로 가는 외경동맥과, 뇌로 들어가는 내경동맥으로 나뉩니다. 내경동맥은 전대뇌동맥과 중대뇌동맥으로 이어지는 앞쪽 순환으로, 뇌로 가는 혈액의 약 팔십 퍼센트를 보냅니다.',
      do(S){ S.vHi(['ica','aca','mca1','mcaS','mcaI']); $('#sy1').style.background='rgba(255,159,107,.16)'; W.lbl(['vICA','vACA','vMCA']); sfx('glow'); }},
    {id:'3-04', s:'N', t:'목 뒤쪽으로 올라가는 좌우 추골동맥은 쇄골하동맥에서 시작해, 뇌간 앞에서 하나로 합쳐져 뇌저동맥이 됩니다. 뇌저동맥은 뇌간과 소뇌에 혈액을 보내고, 양쪽 후대뇌동맥으로 갈라집니다. 이것이 뒤쪽 순환입니다.',
      do(S){ W.lblAllOff(); S.vHi(['vert','basilar','pca','sca','aica','pica']); $('#sy1').style.background=''; $('#sy2').style.background='rgba(47,196,138,.16)'; W.lbl(['vVert','vBas','vPCA']); sfx('glow'); }},
    {id:'3-05', s:'N', t:'두 계통은 뇌 아래에서 고리처럼 이어지는데, 이것이 윌리스환입니다. 전교통동맥은 좌우 전대뇌동맥을, 후교통동맥은 같은 쪽의 내경동맥과 후대뇌동맥을 연결합니다.',
      do(S){ W.lblAllOff(); $('#sy2').style.background=''; S.vHi(['acom','pcom','ica','aca','pca','basilar','mca1']); W.part(['acom','pcom'],{em:0.9}); W.brain({op:0.1}); W.part('cerebellum',{op:0.15}); W.part(['midbrain','pons','medulla','cordTop'],{op:0.22}); W.view('base',2200); later(()=>{ on('#sy3'); W.lbl(['vAcom','vPcom','vICA','vBas','vACA','vPCA','vMCA']); sfx('levelup'); },1500); }},
    {id:'3-06', s:'N', t:'그래서 고리의 어느 한 곳이 막혀도, 교통동맥을 통해 혈액을 보충해 신경 손상을 미리 막아 줍니다.', do(){ sfx('pop'); }},
    /* B. 담당 영역 */
    {id:'3-07', s:'N', t:'이제 세 대뇌동맥이 각각 어디에 혈액을 보내는지 보겠습니다. 파란색은 전대뇌동맥, 빨간색은 중대뇌동맥, 보라색은 후대뇌동맥의 영역입니다.',
      do(S){ on('#sys',false); W.lblAllOff(); W.shift(0); W.brain({op:1}); W.part(['cerebellum','midbrain','pons','medulla','cordTop'],{op:1}); W.show({vessels:false}); W.terr([0,1,2]); W.view('front3q',2000); W.spin(0.15); sfx('whoosh'); }},
    {id:'3-08', s:'N', t:'전대뇌동맥은 뇌의 안쪽 면, 전두엽과 두정엽의 안쪽에 혈액을 보냅니다. 보조운동영역이 여기 있어서, 손상되면 연결피질운동실어증과 말실행증이 나타날 수 있습니다.',
      do(S){ W.spin(0); W.hideRight(true); W.terr([0],true); W.view('medial',2200); W.show({vessels:true}); S.vHi(['aca'],true); W.part(ALLV13.filter(n=>n!=='aca'),{op:0}); later(()=>{ W.lbl('tACA'); sfx('glow'); },1500); }},
    {id:'3-09', s:'N', t:'중대뇌동맥은 내경동맥의 가장 큰 가지로, 실비안열을 따라 대뇌 외측면 대부분에 혈액을 보냅니다. 국시 해부 문제에 자주 나오고, 뇌졸중에서 가장 흔히 막히는 동맥입니다.',
      do(S){ W.lblAllOff(); W.hideRight(false); W.terr([1],true); W.part(ALLV13,{op:0}); W.part(['mca1','mcaS','mcaI'],{op:1,em:0.3}); W.view('lateralL',2200); later(()=>{ W.lbl('tMCA'); sfx('glow'); },1500); }},
    {id:'3-10', s:'N', t:'중대뇌동맥은 기저핵으로 가는 M1, 뇌섬으로 가는 M2, 피질로 가는 M3로 나뉩니다. M3의 위쪽 가지는 일차운동영역과 브로카 영역, 아래쪽 가지는 베르니케 영역에 혈액을 보냅니다.',
      do(){ W.lbl('tMCA',false); W.shift(-300); on('#mseg'); W.terr([1]); W.part('mcaS',{em:0.9}); later(()=>{ W.lbl('vSup'); W.part('mcaS',{em:0.3}); W.part('mcaI',{em:0.9}); W.lbl('vInf'); sfx('pop'); },5200); sfx('pop'); }},
    {id:'3-11', s:'N', t:'그래서 위쪽 가지가 막히면 브로카 실어증, 아래쪽 가지가 막히면 베르니케 실어증, M1이나 M2가 막혀 실비안열 주변 전체가 손상되면 전반실어증이 됩니다.',
      do(){ W.part('mcaI',{em:0.3}); on('#mseg2'); W.terr(null); W.lobes([0,1]); W.part('mcaS',{em:0.9}); later(()=>{ W.lobes([2]); W.part('mcaS',{em:0.3}); W.part('mcaI',{em:0.9}); sfx('bad'); },3000); later(()=>{ W.lobes([0,1,2]); W.part(['mcaS','mcaI'],{em:0.9}); sfx('bad'); },6000); sfx('bad'); }},
    {id:'3-12', s:'N', t:'후대뇌동맥은 후두엽과 측두엽 아래쪽, 그리고 시상에 혈액을 보냅니다. 손상되면 실독증과 시각장애가 나타납니다.',
      do(S){ on('#mseg',false); W.lblAllOff(); W.shift(0); W.lobes([]); W.brain({lobe:[0,0,0,0],dim:[0,0,0,0]}); W.terr([2],true); W.part(ALLV13,{op:0}); W.part(['pca','basilar'],{op:1,em:0.4}); W.view('postInf',2200); later(()=>{ W.lbl(['tPCA','vPCA']); sfx('glow'); },1500); }},
    {id:'3-13', s:'N', t:'뇌저동맥에서 나온 소뇌동맥은 소뇌와 뇌간을 담당합니다. 상소뇌동맥이 막히면 실조형 마비말장애가, 후하소뇌동맥이 막히면 연구개와 인두, 후두 문제로 삼킴장애, 마비말장애, 음성장애가 생길 수 있습니다.',
      do(){ W.lblAllOff(); W.terr(null); W.brain({op:0.3}); W.part(['sca','aica','pica','basilar','vert'],{op:1,em:0.4}); W.part('pca',{op:0.2,em:0}); W.part('cerebellum',{em:0.25}); later(()=>{ W.lbl(['vSCA','vPICA','vBas']); sfx('glow'); },600); }},
    {id:'3-14', s:'N', t:'혈관별 담당 영역과 손상 증상을 표로 정리합니다.',
      do(){ W.lblAllOff(); W.part('cerebellum',{em:0}); W.brain({op:1}); W.show({vessels:false}); W.terr([0,1,2]); W.view('front3q',1800); W.spin(0.12); W.shift(-320); later(()=>{ on('#terrT'); sfx('ding'); },500); }, gap:2400},
    /* C. 뇌졸중 */
    {id:'3-15', s:'N', t:'이렇게 뇌혈관에 문제가 생겨 갑자기 뇌 기능이 떨어지는 것이 뇌졸중, 즉 대뇌혈관사고입니다. 크게 허혈성과 출혈성으로 나뉩니다.',
      do(S){ on('#terrT',false); W.shift(0); W.spin(0); W.brain({op:0}); later(()=>{ W.show({brain:false}); vesselScene(S); on('#vsl'); on('#stk'); sfx('whoosh'); },500); }},
    {id:'3-16', s:'N', t:'허혈성 뇌졸중, 즉 뇌경색은 혈관이 좁아지거나 막혀 혈액 공급이 끊기는 것입니다. 혈전증은 혈관 벽에 혈전이 쌓여, 바로 그 자리를 막는 것입니다.',
      do(S){ on('#stk',false); S.vsTitle('<span class="hl-b">혈전증</span> · 그 자리에서 쌓여 막힘'); S.vsSet({plaque:1}); later(()=>{ S.vsSet({blockU:true}); sfx('bad'); },2200); }},
    {id:'3-17', s:'N', t:'색전증은 심장 등에서 떨어져 나온 덩어리, 색전이 혈관을 타고 흐르다가 좁은 혈관을 막는 것입니다.',
      do(S){ S.vsSet({plaque:0, blockU:false}); S.vsTitle('<span class="hl-b">색전증</span> · 흘러와서 좁은 곳을 막음'); later(()=>{ S.vs.emb=0; },700); }},
    {id:'3-18', s:'N', t:'일과성 허혈 발작, TIA는 증상이 잠깐 나타났다가 사라지는 것입니다. 예를 들어 어지러움은 5분, 팔 마비는 10분, 발음 문제는 15분 만에 사라지는 식이고, 영구 손상은 남지 않지만 뇌졸중의 경고 신호입니다.',
      say:'일과성 허혈 발작, 티아이에이는 증상이 잠깐 나타났다가 사라지는 것입니다. 예를 들어 어지러움은 오 분, 팔 마비는 십 분, 발음 문제는 십오 분 만에 사라지는 식이고, 영구 손상은 남지 않지만 뇌졸중의 경고 신호입니다.',
      do(S){ S.vs.emb=-1; S.vsSet({blockU:true}); S.vsTitle('<span class="hl-b">TIA</span> · 잠깐 막혔다가 다시 흐름'); on('#tia'); later(()=>{ S.vsSet({blockU:false}); sfx('ok'); },3500); }},
    {id:'3-19', s:'N', t:'출혈성 뇌졸중, 즉 뇌출혈은 혈관의 약한 지점이 터져 혈액이 혈관 밖으로 새어 나오는 것입니다. 동맥의 일부가 풍선처럼 부푼 동맥류가 터지면 뇌출혈로 이어질 수 있습니다.',
      do(S){ on('#tia',false); S.vsSet({blockU:false}); S.vsTitle('<span class="hl-r">뇌출혈</span> · 약한 곳이 부풀어 터짐'); S.vsSet({aneu:0.5}); later(()=>S.vsSet({aneu:1}),1600); later(()=>{ S.vsSet({burst:1}); sfx('bad'); },3600); }},
    {id:'3-20', s:'N', t:'뇌 안에서 터지는 뇌내출혈은 주로 고혈압으로 동맥벽에 압력이 가해져 생기고, 뇌 바깥의 뇌막 사이에서 생기는 뇌외출혈에는 지주막하 출혈, 경막하 출혈, 경막외 출혈이 있습니다.', do(){ on('#stk'); $('#sk2').style.outline='3px solid #FF6B6B'; sfx('pop'); }},
    {id:'3-21', s:'N', t:'국시 핵심입니다. 실어증의 가장 흔한 원인은 대뇌혈관사고, 뇌졸중이고, 뇌경색과 뇌출혈을 구분하는 것이 중요합니다.', do(){ on('#vsl',false); on('#stk',false); later(()=>{ on('#kp'); sfx('ding'); },400); }},
    /* D. 뇌막 · 혈종 */
    {id:'3-22', s:'N', t:'이번에는 뇌를 보호하는 구조입니다. 뇌는 바깥에서부터 피부와 두개골, 그리고 세 겹의 뇌막에 싸여 있습니다. 뇌막은 바깥부터 경막, 지주막, 연막입니다. 지주막은 거미막이라고도 합니다.',
      do(S){ on('#kp',false); $('#vsl')&&$('#vsl').remove(); later(()=>{ meningesScene(S); on('#mngw'); S.ly(0); seq([()=>S.ly(1),()=>S.ly(2),()=>{S.ly(3);sfx('pop')},()=>{S.ly(4);sfx('pop')},()=>{S.ly(6);sfx('pop')}],1500); },400); }},
    {id:'3-23', s:'N', t:'지주막과 연막 사이의 공간, 지주막하강에는 뇌척수액이 흐르며 뇌를 보호하는 쿠션 역할을 합니다. 연막은 뇌 표면에 딱 붙어 있습니다.', do(S){ S.ly(6); sfx('glow'); }},
    {id:'3-24', s:'N', t:'두개골과 경막 사이에 피가 고이면 경막외 혈종,', do(S){ S.hm('edh'); sfx('bad'); }},
    {id:'3-25', s:'N', t:'경막과 지주막 사이에 고이면 경막하 혈종,', do(S){ S.hm('sdh'); sfx('bad'); }},
    {id:'3-26', s:'N', t:'지주막 아래의 지주막하강으로 피가 퍼지면 지주막하 출혈입니다. 이런 혈종은 외상성 뇌손상에서 다시 만나게 됩니다.', do(S){ S.hm('sah'); sfx('bad'); }},
    /* E. 뇌실 · 뇌척수액 */
    {id:'3-27', s:'N', t:'뇌척수액은 뇌 속의 빈 공간인 뇌실에 있습니다. 좌우 측뇌실, 제3뇌실, 그리고 제4뇌실이 있습니다.',
      do(S){ on('#mngw',false); W.show({brain:true, vent:true}); W.brain({op:0.15, lobe:[0,0,0,0]}); W.terr(null); W.part('cerebellum',{op:0.35}); W.view('vent',0); W.shift(-300);
        later(()=>{ on('#csfc'); seq([()=>{W.lbl('vLat');sfx('pop')},()=>{W.lbl('v3l');sfx('pop')},()=>{W.lbl('aql');sfx('pop')},()=>{W.lbl('v4l');sfx('pop')}],1100); },500); }},
    {id:'3-28', s:'N', t:'뇌척수액은 측뇌실에서 제3뇌실로, 중뇌수도를 지나 제4뇌실로 흐른 뒤, 뇌와 척수를 둘러싼 지주막하강으로 나가 순환합니다. 고여 있지 않고 계속 순환합니다.', do(){ W.spin(0.1); sfx('glow'); }},
    {id:'3-29', s:'N', t:'이 흐름이 막히거나 생산과 흡수의 균형이 깨지면, 뇌척수액이 과도하게 쌓여 뇌압이 오르는 뇌수종이 생기고, 인지장애가 나타날 수 있습니다.',
      do(){ W.spin(0); on('#csf2'); W.swell(1); W.part(['latV','v3','aq','v4'],{em:0.6}); sfx('bad'); }},
    /* F. 정리 + 퀴즈 */
    {id:'3-30', s:'N', t:'오늘 배운 내용을 한 장으로 정리합니다.', do(){ on('#csfc',false); W.lblAllOff(); W.swell(0); W.shift(0); W.brain({op:0}); later(()=>{ W.show({brain:false, vent:false}); on('#sum3'); sfx('ding'); },500); }, gap:2600},
    ...quizSteps('q13_0', Q13[0], ()=>on('#sum3',false)),
    ...quizSteps('q13_1', Q13[1], ()=>on('#q13_0',false)),
    ...quizSteps('q13_2', Q13[2], ()=>on('#q13_1',false)),
    ...quizSteps('q13_3', Q13[3], ()=>on('#q13_2',false)),
    ...quizSteps('q13_4', Q13[4], ()=>on('#q13_3',false)),
    {id:'3-31', s:'N', t:'수고하셨습니다. 이것으로 신경해부생리 편을 마칩니다. 다음 시간에는 2편, 실어증을 살펴봅니다.', do(){ on('#q13_4',false); W.show({brain:true}); W.brain({op:1}); W.view('front3q',0); W.spin(0.2); }},
    {wait:2000},
  ]});
const ALLV13=['ica','vert','basilar','aca','acom','pcom','pca','sca','aica','pica','mca1','mcaS','mcaI'];
