/* =================================================================
   시험 보충 카드 (무음) — 나레이션에 없는 국시 핵심을 관련 장면 바로 뒤에 한 장씩
   - ID가 qs..-a 형식이라 음성 없이 자막·카드만 (SILENT)
   - 출처: 특강 Part1·2, 정리본(main_summary), 치매·TBI 강의 텍스트
   + 공통 정리: 편이 바뀔 때 다른 편의 뇌 패널 테두리 클래스가 남지 않도록 build 때 제거
   ================================================================= */
(()=>{
const SUPP=[
 ['1-1','1-62','소뇌 손상 징후와 검사',['징후 · 근긴장 저하 · 의도 진전 · 실조 보행 · 교대운동장애','검사 · 손가락-코 · 발꿈치-정강이 · 일자 보행 · 교호운동','진전 구분 · 안정 시 진전 = 파킨슨(기저핵) / 의도 진전 = 소뇌']],
 ['1-2','2-17','미주신경(X) 가지별 손상',['인두가지 · 연인두 폐쇄 저하 → 과대비성·비누출','상후두신경 · 음도 조절 저하','되돌이후두신경 · 성대 내전 저하 → 기식성 음성']],
 ['1-2','2-35','근력 검사 등급',['0 = 완전 마비 · V = 정상','III = 중력은 이기지만 저항은 이기지 못함','안정 시 진전 = 기저핵 · 의도 진전 = 소뇌']],
 ['1-3','3-02','뇌 혈류 분담',['경동맥계 · 분당 약 600~700ml (약 80%)','추골동맥계 · 분당 약 100~200ml']],
 ['2-2','22-09','K-WAB 언어지수(LQ) 구성',['스스로 말하기 20 · 알아듣기 20','따라말하기 10 · 이름대기 10','읽기 20 · 쓰기 20 (합 100)']],
 ['4-1','41-15a','이완형 · 시험 단골 포인트',['Darley(1969) · 30명 중 25명 과대비성','특징 순위 · ① 과대비성 ② 부정확한 자음 ③ 기식성 음성','인두가지 손상 → 과대비성 · 되돌이후두신경 → 기식성 음성 · 상후두신경 → 음도 저하']],
 ['4-1','41-18','실조형 · 특징 순위',['① 부정확한 자음 ② 과균등 강세 ③ 불규칙한 조음 붕괴','음소·음절 간격 연장 · 음도·음량 변이']],
 ['4-1','41-20','과소운동형 · 수치로 기억',['발성 이상이 약 89%로 가장 흔함','과대비성은 약 10%뿐 · 공명 문제는 대체로 경미','부정확한 자음 = 조음 목표에 못 미침(undershoot)']],
 ['6','61-06','인두 단계 · 시간 기준',['인두통과시간(PTT) · 1초 미만이면 정상','인두지연시간(PDT) · 0.5초를 넘으면 삼킴 유발 지연']],
 ['6','61-14','선별검사 · 수치',['100ml 물 삼키기 · 마시는 속도 측정(10ml/s 기준)','구연산 분무 기침 검사 · 1분에 5회 이상 기침하면 정상']],
 ['6','61-24','근력 강화·의료적 중재',['CTAR(저항성 턱 당기기) · 설골상근 강화 → UES 개방 도움','의료적 중재 · 풍선확장술 · 보툴리눔 톡신 · 윤상인두근 절개술']],
 ['6','61-27e','최대성문위삼킴',['힘주며 숨 참기 → 진성대 + 가성대까지 폐쇄','피열연골이 앞으로 기울어 후두 입구를 닫음','대상 · 후두 입구 폐쇄가 약한 환자']],
 ['7','71-06','치매 유병 순위',['1위 알츠하이머병 · 약 68~70%','2위 혈관성 치매 · 약 23.7%']],
 ['7','71-10','경도인지장애(MCI) 수치',['해마다 약 10~15%가 알츠하이머병으로 전환 (일반 노인 1~2%)','기준 · CDR 0.5 · GDS 3단계']],
 ['7','71-11','전두측두엽 치매(FTD)',['픽병 관련 · 대개 65세 이전 발병','생존 기간 약 6~8년 · 과잉구강증']],
 ['7','71-12','원발성 진행성 실어증 · 원인 연결',['비유창형 · 픽병, 피질기저핵 퇴행','의미형 · 전두측두엽 퇴행','발화부족형(로그페닉) · 알츠하이머병']],
 ['7','71-17','피질하 치매 예',['파킨슨병 · 진행성 핵상마비 · 헌팅턴병 · AIDS 치매']],
 ['7','71-19','K-MMSE 기준점 · 지남력',['30점 만점 · 24점 이상 정상','20~23점 치매 의심 · 19점 이하 확정적 치매','지남력 중 시간 지남력이 가장 먼저 손상됨']],
 ['8-2','82-06','GCS · 정리본 기준',['13점(기면) 무렵부터 언어 평가·치료 가능','14~15점은 정상 각성 범위로 정리 (정리본)']],
 ['9','91-04','뇌성마비 유형 비율',['경직형 약 50% · 가장 흔함 · 가위 자세','불수의 운동형 약 25~30% · 관절 탈구 위험','실조형 약 5~10% · 근긴장 저하']],
 ['9','91-14','신경말더듬 vs 발달성 말더듬',['신경말더듬 · 부수행동 없음','적응효과 없음 · 지연청각피드백(DAF) 효과 없음']],
 ['9','91-16','동어반복증(팔릴랄리아)',['목표어 뒷부분을 강박적으로 반복','반복할수록 점점 작고 빨라짐','명제구어에서 두드러짐 · 부수행동 없음']],
 ['9','91-18','무동성 함구증 · 회복',['회복 시 속삭임 · 단조로운 운율','치료 · 도파민 계열 약물']],
 ['9','91-19','심인성 말장애 구분',['전환 말장애 · 신경학적 검사 정상 · 정신적 외상 뒤 발생','우울증성 말장애 · 음도·음량 단조 · 조음과 음질은 정상']]];

const st=document.createElement('style'); st.textContent=
 '.suppc{position:absolute;left:50%;top:150px;translate:-50% 0;width:1240px;padding:30px 40px 30px;border-radius:24px;z-index:60;display:none;'+
 'background:linear-gradient(145deg,#0c1328,#18213e);opacity:1;isolation:isolate;border:1px solid #7f9fd0;box-shadow:0 0 0 2400px rgba(5,9,22,.8),0 24px 60px rgba(0,0,0,.6);color:#eef3ff}'+
 '.suppc.on{display:block;animation:suppIn .45s ease both}@keyframes suppIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}'+
 '.suppc .sh{display:flex;align-items:center;gap:14px;margin-bottom:18px}.suppc .sh i{font-style:normal;padding:5px 14px;border-radius:9px;background:#ffd36d;color:#1b1503;font-weight:900;font-size:19px}'+
 '.suppc .sh b{font-size:36px;font-weight:900}.suppc .sr{display:flex;gap:14px;align-items:flex-start;padding:14px 18px;margin-top:10px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(160,190,255,.18);font-size:27px;line-height:1.45;font-weight:700}'+
 '.suppc .sr em{font-style:normal;color:#ffd36d;font-weight:900;min-width:30px}';
document.head.appendChild(st);

const hide=()=>document.querySelectorAll('.suppc').forEach(e=>e.classList.remove('on'));
const byClip={}; SUPP.forEach((s,k)=>{ (byClip[s[0]]=byClip[s[0]]||[]).push([k,...s.slice(1)]); });
for(const c of CLIPS){
  // 공통: 편 시작 시 다른 편의 뇌 패널 클래스 제거
  const b0=c.build;
  c.build=function(){ const sc=document.querySelector('#scene'); if(sc) sc.classList.remove('e7-brain-on','e8-brain-on','e9-brain-on','e4-3d-r');
    const r=b0?b0.apply(this,arguments):undefined;
    (byClip[c.code]||[]).forEach(([k,,title,rows])=>{ add('<div class="suppc" id="supp'+k+'"><div class="sh"><i>시험 보충</i><b>'+title+'</b></div>'+rows.map((x,i)=>'<div class="sr hlx"><em>'+(i+1)+'</em><span>'+x+'</span></div>').join('')+'</div>'); });
    return r; };
  for(const [k,after,title,rows] of (byClip[c.code]||[])){
    const at=c.steps.findIndex(s=>s.id===after); if(at<0) continue;
    const step={id:'qs'+k+'-a', s:'N', t:'시험 보충: '+title+'. 화면의 핵심을 확인하세요.', say:title+' '+rows.join(' '),
      do(){ document.querySelectorAll('.quiz').forEach(e=>e.classList.remove('on')); hide(); const el=document.getElementById('supp'+k); if(el) el.classList.add('on'); if(typeof sfx==='function') sfx('ding'); }};
    c.steps.splice(at+1,0,step);
    const nx=c.steps.slice(at+2).find(s=>s.id||s.do);
    if(nx){ const d=nx.do; nx.do=function(){ hide(); return d?d.apply(this,arguments):undefined; }; }
  }
}
})();
