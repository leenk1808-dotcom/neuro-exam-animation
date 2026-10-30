/* =========================================================
   world3d.js : Three.js 3D 해부 월드 (뇌, 심부구조, 신경섬유, 뉴런)
   좌표계: +x = 오른쪽, +y = 위, -z = 앞(anterior), +z = 뒤(posterior)
   ========================================================= */
(function(){
const T = THREE;

/* ---------- 3D simplex noise ---------- */
const SN = (function(){
  const g3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
  const p=[]; let seed=1337; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
  for(let i=0;i<256;i++) p[i]=i;
  for(let i=255;i>0;i--){ const j=Math.floor(rnd()*(i+1)); const t=p[i]; p[i]=p[j]; p[j]=t; }
  const perm=new Array(512), pm=new Array(512);
  for(let i=0;i<512;i++){ perm[i]=p[i&255]; pm[i]=perm[i]%12; }
  const F3=1/3, G3=1/6;
  const dot=(g,x,y,z)=>g[0]*x+g[1]*y+g[2]*z;
  return function(xin,yin,zin){
    const s=(xin+yin+zin)*F3, i=Math.floor(xin+s), j=Math.floor(yin+s), k=Math.floor(zin+s);
    const t=(i+j+k)*G3, x0=xin-(i-t), y0=yin-(j-t), z0=zin-(k-t);
    let i1,j1,k1,i2,j2,k2;
    if(x0>=y0){ if(y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0;} else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1;} else {i1=0;j1=0;k1=1;i2=1;j2=0;k2=1;} }
    else { if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1;} else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1;} else {i1=0;j1=1;k1=0;i2=1;j2=1;k2=0;} }
    const x1=x0-i1+G3,y1=y0-j1+G3,z1=z0-k1+G3, x2=x0-i2+2*G3,y2=y0-j2+2*G3,z2=z0-k2+2*G3, x3=x0-1+3*G3,y3=y0-1+3*G3,z3=z0-1+3*G3;
    const ii=i&255, jj=j&255, kk=k&255;
    let n=0, tt;
    tt=0.6-x0*x0-y0*y0-z0*z0; if(tt>0){ tt*=tt; n+=tt*tt*dot(g3[pm[ii+perm[jj+perm[kk]]]],x0,y0,z0); }
    tt=0.6-x1*x1-y1*y1-z1*z1; if(tt>0){ tt*=tt; n+=tt*tt*dot(g3[pm[ii+i1+perm[jj+j1+perm[kk+k1]]]],x1,y1,z1); }
    tt=0.6-x2*x2-y2*y2-z2*z2; if(tt>0){ tt*=tt; n+=tt*tt*dot(g3[pm[ii+i2+perm[jj+j2+perm[kk+k2]]]],x2,y2,z2); }
    tt=0.6-x3*x3-y3*y3-z3*z3; if(tt>0){ tt*=tt; n+=tt*tt*dot(g3[pm[ii+1+perm[jj+1+perm[kk+1]]]],x3,y3,z3); }
    return 32*n;
  };
})();
const ss=(a,b,x)=>{ const t=Math.min(1,Math.max(0,(x-a)/(b-a))); return t*t*(3-2*t); };
const gauss=(x,s)=>Math.exp(-(x*x)/(2*s*s));
const V=(x,y,z)=>new T.Vector3(x,y,z);
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;

/* ---------- 대뇌 반구 (엽 경계 + 고랑) ---------- */
const Fcs = U => 0.22 - 0.343*U;                       // 중심고랑
const Ulf = F => F>0.62 ? -0.16 : (F>=-0.38 ? -0.16+(0.62-F)*0.3 : 0.14-(-0.38-F)*0.12); // 외측고랑
function lobeOf(F,U,dx){
  if(F < -0.76 + 0.06*U) return 3;                      // 후두엽
  if(U < Ulf(F) && F < 0.66 && !(dx < -0.25 && F > 0.2)) return 2; // 측두엽
  if(F > Fcs(U)) return 0;                              // 전두엽
  return 1;                                             // 두정엽
}
function terrOf(F,U,dx){ // 0 ACA, 1 MCA, 2 PCA
  if(F < -0.74+0.06*U || (U < -0.22 && F < 0.25 && dx < 0.55)) return 2;
  if((dx < -0.15 && F > -0.74) || (dx < 0.3 && U > 0.5 && F > -0.6)) return 0;
  return 1;
}
function hemiGeo(side){
  const g=new T.SphereGeometry(1, 380, 250); g.rotateZ(Math.PI/2);
  const P=g.attributes.position, n=P.count;
  const BX=new Float32Array(n), BY=new Float32Array(n), BF=new Float32Array(n), DS=new Float32Array(n);
  const u={n, terr:new Uint8Array(n), lobe:new Uint8Array(n), groove:new Float32Array(n), cs:new Float32Array(n), lf:new Float32Array(n), F:new Float32Array(n), U:new Float32Array(n), L:new Float32Array(n)};
  for(let i=0;i<n;i++){
    const dx=P.getX(i), dy=P.getY(i), dz=P.getZ(i);
    let px=dx*(dx>=0?0.80:0.17), py=dy*(dy>=0?0.70:0.40), pf=dz*1.03;
    px*=1-0.10*dz;
    const tb=gauss(dz-0.10,0.36)*gauss(dy+0.55,0.32)*Math.max(0,dx);
    py-=0.16*tb; px+=0.06*tb;
    if(dz<-0.6) py-=0.05*(-0.6-dz);
    if(dy<0 && dz>0.45) py*=0.85;
    const F=pf, U=py;
    const lb=lobeOf(F,U,dx);
    const w=0.45*SN(px*1.6+7.1, py*1.6-3.3, pf*1.6+1.7);
    const nn=SN(px*3.6+w, py*3.6+w*0.7, pf*3.6-w*0.5);
    const sul=Math.pow(1-ss(0.0,0.22,Math.abs(nn)),1.4);
    let csm=0, lfm=0;
    if(dx>-0.3 && U>Ulf(F)+0.02 && dy>-0.2) csm=(dx<-0.1? (dx+0.3)/0.2 : 1)*(1-ss(0.0,0.035,Math.abs(F-Fcs(U))));
    if(dx>-0.05 && F>-0.42 && F<0.66) lfm=1-ss(0.0,0.045,Math.abs(U-Ulf(F)));
    const disp=-0.03*sul-0.045*csm-0.07*lfm;
    BX[i]=px; BY[i]=py; BF[i]=pf; DS[i]=disp;
    u.terr[i]=terrOf(F,U,dx); u.lobe[i]=lb; u.groove[i]=Math.max(sul*0.7,csm,lfm); u.cs[i]=csm; u.lf[i]=lfm; u.F[i]=F; u.U[i]=U; u.L[i]=dx;
  }
  // 변위 스무딩 (계단 무늬 제거)
  { const idx=g.index.array, sum=new Float32Array(n), cnt=new Float32Array(n);
    for(let it=0; it<3; it++){
      sum.fill(0); cnt.fill(0);
      for(let t=0;t<idx.length;t+=3){ const a=idx[t], b=idx[t+1], c=idx[t+2]; sum[a]+=DS[b]+DS[c]; sum[b]+=DS[a]+DS[c]; sum[c]+=DS[a]+DS[b]; cnt[a]+=2; cnt[b]+=2; cnt[c]+=2; }
      for(let i=0;i<n;i++) if(cnt[i]) DS[i]=DS[i]*0.4+0.6*sum[i]/cnt[i];
    }
    for(let i=0;i<n;i++){ const len=Math.sqrt(BX[i]*BX[i]+BY[i]*BY[i]+BF[i]*BF[i]), k=1+DS[i]/len; P.setXYZ(i, side*(BX[i]*k+0.185), BY[i]*k, -BF[i]*k); }
  }
  if(side>0){ const idx=g.index.array; for(let i=0;i<idx.length;i+=3){ const t=idx[i+1]; idx[i+1]=idx[i+2]; idx[i+2]=t; } }
  g.computeVertexNormals();
  g.setAttribute('color', new T.BufferAttribute(new Float32Array(n*3),3));
  g.userData=u;
  return g;
}
const REAL=new T.Color('#E7B2A5'), DEEP=new T.Color('#86474F');
const LOBEC=[new T.Color('#4F8EF7'), new T.Color('#F5B841'), new T.Color('#2FC48A'), new T.Color('#EE6A93'), new T.Color('#FFAE5C')];
const HI=new T.Color('#FFE45C'), DIMC=new T.Color('#5A4A57');
const LESC=new T.Color('#FF3B3B'), MEDC=new T.Color('#9C7F7C');
const TERRC=[new T.Color('#4F8EF7'), new T.Color('#FF5A5A'), new T.Color('#B57BFF')];
function paintHemi(g, st){
  const u=g.userData, c=g.attributes.color.array, tmp=new T.Color();
  for(let i=0;i<u.n;i++){
    const lb=u.lobe[i];
    tmp.copy(REAL);
    const a=st.lobe[lb]||0; if(a>0.001 && LOBEC[lb]) tmp.lerp(LOBEC[lb], a);
    if(lb===5) tmp.lerp(MEDC, 0.55);
    if(st.terr>0.001 && u.terr[i]<3){ const tt=u.terr[i]; tmp.lerp(TERRC[tt], st.terr*st.tsel[tt]*0.7); if(st.tdim[tt]>0.001) tmp.lerp(DIMC, 0.6*st.tdim[tt]); }
    if(st.les>0.001 && u.lesW && u.lesW[i]>0.001) tmp.lerp(LESC, Math.min(1, st.les*u.lesW[i])*0.9);
    tmp.lerp(DEEP, u.groove[i]*(u.real?0.62:0.5));
    if((st.dim[lb]||0)>0.001) tmp.lerp(DIMC, 0.55*st.dim[lb]);
    if(st.cs>0.001 && u.cs[i]>0.05) tmp.lerp(HI, Math.min(1,st.cs*u.cs[i]*1.3));
    if(st.lf>0.001 && u.lf[i]>0.05) tmp.lerp(HI, Math.min(1,st.lf*u.lf[i]*1.3));
    c[i*3]=tmp.r; c[i*3+1]=tmp.g; c[i*3+2]=tmp.b;
  }
  g.attributes.color.needsUpdate=true;
}
/* ---------- 실제 피질 표면 (fsaverage5 + Destrieux) ---------- */
const LOBE_OF = (nm)=>{
  if(!nm || nm==='Medial_wall') return 5;
  if(/insul|Ins_lg/.test(nm)) return 4;
  if(/^(G_occipital|S_oc_|Pole_occipital|S_calcarine|G_cuneus|G_oc-temp_med-Lingual|S_oc-temp_med_and_Lingual|G_and_S_occipital_inf|S_occipital_ant|S_collat_transv_post|S_parieto_occipital)/.test(nm)) return 3;
  if(/^(G_temp|S_temporal|G_temporal|Pole_temporal|G_oc-temp_lat|G_oc-temp_med-Parahip|S_collat_transv_ant|S_oc-temp_lat|Lat_Fis-post)/.test(nm)) return 2;
  if(/^(G_postcentral|S_postcentral|G_parietal|G_pariet|S_intrapariet|G_precuneus|S_subparietal|S_cingul-Marginalis|G_and_S_cingul-Mid-Post|G_cingul-Post|S_interm_prim)/.test(nm)) return 1;
  return 0;
};
function b64(s, T){ const bin=atob(s); const u8=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) u8[i]=bin.charCodeAt(i); return new T(u8.buffer); }
function realHemiGeo(side){
  const D=window.BRAIN_DATA[side<0?'L':'R'], NAMES=window.BRAIN_DATA.labels;
  const q=b64(D.pos,Int16Array), f0=b64(D.idx,Uint16Array), s0=b64(D.sulc,Int8Array), l0=b64(D.lab,Uint8Array);
  const n0=D.n; let P=new Float32Array(n0*3); for(let i=0;i<n0*3;i++) P[i]=q[i]/32767*1.3;
  let SUL=new Float32Array(n0); for(let i=0;i<n0;i++) SUL[i]=s0[i]/70; let LAB=new Uint8Array(l0);
  let F=new Uint32Array(f0); let n=n0;
  if(n0<20000){ const ek=(a,b)=>a<b?a*200000+b:b*200000+a; const E=new Map(); const opp=new Map(); const nb=Array.from({length:n},()=>new Set());
    for(let t=0;t<F.length;t+=3){ const a=F[t],b=F[t+1],c=F[t+2]; [[a,b,c],[b,c,a],[c,a,b]].forEach(([x,y,z])=>{ const k=ek(x,y); if(!opp.has(k)) opp.set(k,[]); opp.get(k).push(z); nb[x].add(y); nb[y].add(x); }); }
    const NP=[]; let ni=n; const NS=[], NL=[];
    const nf=new Uint32Array(F.length*4);
    const ev=(x,y)=>{ const k=ek(x,y); if(E.has(k)) return E.get(k); const o=opp.get(k)||[]; const p=[0,0,0];
      for(let d=0;d<3;d++){ p[d]= o.length===2 ? 0.375*(P[x*3+d]+P[y*3+d])+0.125*(P[o[0]*3+d]+P[o[1]*3+d]) : 0.5*(P[x*3+d]+P[y*3+d]); }
      NP.push(p); NS.push((SUL[x]+SUL[y])/2); NL.push(LAB[x]===LAB[y]?LAB[x]:((x+y)%2?LAB[x]:LAB[y])); E.set(k,ni); return ni++; };
    let w=0; for(let t=0;t<F.length;t+=3){ const a=F[t],b=F[t+1],c=F[t+2]; const ab=ev(a,b), bc=ev(b,c), ca=ev(c,a);
      nf.set([a,ab,ca, ab,b,bc, ca,bc,c, ab,bc,ca], w); w+=12; }
    const P2=new Float32Array(ni*3), S2=new Float32Array(ni), L2=new Uint8Array(ni);
    for(let v=0;v<n;v++){ const k=nb[v].size, beta=k>3?3/(8*k):3/16; const s=[0,0,0]; nb[v].forEach(uu=>{ for(let d=0;d<3;d++) s[d]+=P[uu*3+d]; });
      for(let d=0;d<3;d++) P2[v*3+d]=(1-k*beta)*P[v*3+d]+beta*s[d]; S2[v]=SUL[v]; L2[v]=LAB[v]; }
    NP.forEach((p,i)=>{ P2[(n+i)*3]=p[0]; P2[(n+i)*3+1]=p[1]; P2[(n+i)*3+2]=p[2]; S2[n+i]=NS[i]; L2[n+i]=NL[i]; });
    P=P2; SUL=S2; LAB=L2; F=nf; n=ni; }
  const g=new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(P,3)); g.setIndex(new T.BufferAttribute(F,1)); g.computeVertexNormals();
  const deg=new Uint32Array(n); for(let t=0;t<F.length;t+=3){ deg[F[t]]+=2; deg[F[t+1]]+=2; deg[F[t+2]]+=2; }
  const off=new Uint32Array(n+1); for(let i=0;i<n;i++) off[i+1]=off[i]+deg[i]; const adj=new Uint32Array(off[n]); const fill=new Uint32Array(n);
  for(let t=0;t<F.length;t+=3){ const a=F[t],b=F[t+1],c=F[t+2]; adj[off[a]+fill[a]++]=b; adj[off[a]+fill[a]++]=c; adj[off[b]+fill[b]++]=a; adj[off[b]+fill[b]++]=c; adj[off[c]+fill[c]++]=a; adj[off[c]+fill[c]++]=b; }
  const smooth=(arr,it)=>{ let a=arr; for(let k=0;k<it;k++){ const b=new Float32Array(n); for(let i=0;i<n;i++){ let s=0; for(let j=off[i];j<off[i+1];j++) s+=a[adj[j]]; b[i]=a[i]*0.4+0.6*s/(off[i+1]-off[i]); } a=b; } return a; };
  let SP=new Float32Array(P); for(let k=0;k<12;k++){ const B=new Float32Array(SP.length); for(let i=0;i<n;i++){ let sx=0,sy=0,sz=0,c=off[i+1]-off[i]; for(let j=off[i];j<off[i+1];j++){ const uu=adj[j]; sx+=SP[uu*3]; sy+=SP[uu*3+1]; sz+=SP[uu*3+2]; } B[i*3]=SP[i*3]*0.3+0.7*sx/c; B[i*3+1]=SP[i*3+1]*0.3+0.7*sy/c; B[i*3+2]=SP[i*3+2]*0.3+0.7*sz/c; } SP=B; }
  const sg=new T.BufferGeometry(); sg.setAttribute('position', new T.BufferAttribute(SP,3)); sg.setIndex(new T.BufferAttribute(F,1)); sg.computeVertexNormals(); const SN2=sg.attributes.normal.array;
  const u={n, real:true, off, adj, lab:LAB, names:NAMES, lobe:new Uint8Array(n), terr:new Uint8Array(n), groove:new Float32Array(n), cs:null, lf:null, F:new Float32Array(n), U:new Float32Array(n), L:new Float32Array(n)};
  const csB=new Float32Array(n), lfB=new Float32Array(n);
  let xm=1e9; for(let i=0;i<n;i++) xm=Math.min(xm, Math.abs(P[i*3])); u.xm=xm;
  for(let i=0;i<n;i++){ const nm=NAMES[LAB[i]]||''; const lb=LOBE_OF(nm); u.lobe[i]=lb; u.F[i]=-P[i*3+2]; u.U[i]=P[i*3+1]; u.L[i]= side<0 ? -SN2[i*3] : SN2[i*3];
    u.groove[i]=Math.min(1,Math.max(0,(SUL[i]+0.25)/1.25));
    if(nm==='S_central') csB[i]=1; if(/^Lat_Fis/.test(nm)) lfB[i]=1;
    const dmid=Math.abs(P[i*3])-xm, yy=P[i*3+1], zz=P[i*3+2];
    let tr=1; if(lb===3 || /^(G_oc-temp|S_collat|S_oc-temp|G_cingul-Post-ventral)/.test(nm) || (nm==='G_temporal_inf' && zz>-0.05) || (lb===2 && yy<-0.42 && zz>0.15)) tr=2;
    else if(lb<=1 && (dmid<0.07 || /^(G_and_S_paracentral|G_precuneus|G_and_S_cingul|G_rectus|G_subcallosal|S_cingul|G_cingul|S_pericallosal|G_front_sup|S_front_sup)/.test(nm) || (dmid<0.19 && yy>0.25))) tr=0;
    if(lb===5) tr=9; u.terr[i]=tr; }
  u.cs=smooth(csB,2); u.lf=smooth(lfB,2);
  g.setAttribute('color', new T.BufferAttribute(new Float32Array(n*3),3));
  g.userData=u; return g;
}
function labelPoint(mesh, names, o={}){
  const u=mesh.geometry.userData, P=mesh.geometry.attributes.position, N=mesh.geometry.attributes.normal; names=[].concat(names);
  const ids=new Set(names.map(nm=>u.names.indexOf(nm))); let cx=0,cy=0,cz=0,c=0; const sel=[];
  for(let i=0;i<u.n;i++){ if(!ids.has(u.lab[i])) continue; if(o.umin!==undefined && u.U[i]<o.umin) continue; if(o.umax!==undefined && u.U[i]>o.umax) continue; if(o.fmin!==undefined && u.F[i]<o.fmin) continue; if(o.fmax!==undefined && u.F[i]>o.fmax) continue; if(o.minL!==undefined && u.L[i]<o.minL) continue;
    sel.push(i); cx+=P.getX(i); cy+=P.getY(i); cz+=P.getZ(i); c++; }
  if(!c) return null; cx/=c; cy/=c; cz/=c; let best=sel[0], bd=1e9;
  const crown=sel.filter(i=>u.groove[i]<0.42 && u.L[i]>-0.1); const pool=crown.length>3?crown:sel;
  pool.forEach(i=>{ const d=(P.getX(i)-cx)**2+(P.getY(i)-cy)**2+(P.getZ(i)-cz)**2 - (o.outward? u.L[i]*0.02:0); if(d<bd){bd=d;best=i;} });
  return {p:V(P.getX(best),P.getY(best),P.getZ(best)), n:V(N.getX(best),N.getY(best),N.getZ(best)), F:u.F[best], U:u.U[best]};
}
function surfPoint(mesh, Fm, Um, minL=0.5){
  const u=mesh.geometry.userData, P=mesh.geometry.attributes.position, N=mesh.geometry.attributes.normal;
  let best=-1, bd=1e9;
  for(let i=0;i<u.n;i++){ if(u.L[i]<minL) continue; const d=(u.F[i]-Fm)**2+(u.U[i]-Um)**2; if(d<bd){bd=d;best=i;} }
  return {p:V(P.getX(best),P.getY(best),P.getZ(best)), n:V(N.getX(best),N.getY(best),N.getZ(best))};
}

/* ---------- W: world API ---------- */
const W = window.W = {};
let renderer, scene, camera, world, clock;
const parts = {};      // name -> {objs:[], mats:[], cur:{op,em}, tgt:{op,em}}
const groups = {};     // name -> Group
const LBL = {};        // id -> label
let labelsEl;
const BS={cur:{lobe:[0,0,0,0],dim:[0,0,0,0],cs:0,lf:0,op:1,glow:0,terr:0,tsel:[1,1,1],tdim:[0,0,0],les:0}, tgt:{lobe:[0,0,0,0],dim:[0,0,0,0],cs:0,lf:0,op:1,glow:0,terr:0,tsel:[1,1,1],tdim:[0,0,0],les:0}};
const SHIFT={cur:0,tgt:0};
const CAM={from:null,to:null,t0:0,ms:0, pos:V(-3.6,1.6,-3.6), tgt:V(0,-0.15,0), fov:32};
let ROT={y:0, from:0, to:0, t0:0, ms:0, spin:0}, drag=null;
const pulses=[];       // {mesh, curve, speed, off, grp}
const fx={signal:false, synapse:false, sigT:0};
const isInstant=()=> (window.ENGINE && ENGINE.instant && ENGINE.instant());
const isPaused=()=> (window.ENGINE && ENGINE.paused && ENGINE.paused());

function stdMat(color, opt={}){ return new T.MeshStandardMaterial(Object.assign({color, roughness:0.55, metalness:0.0, emissive:new T.Color(color), emissiveIntensity:0, transparent:true, opacity:1}, opt)); }
function regPart(name, objs, mats, op=1){ parts[name]={objs:[].concat(objs), mats:[].concat(mats), cur:{op, em:0}, tgt:{op, em:0}, def:op}; }
function blob(color, pos, scale, seg=48, noiseAmp=0){
  const g=new T.SphereGeometry(1,seg,Math.round(seg*0.7));
  if(noiseAmp){ const P=g.attributes.position; for(let i=0;i<P.count;i++){ const x=P.getX(i),y=P.getY(i),z=P.getZ(i); const k=1+noiseAmp*SN(x*2.2+pos.x*3,y*2.2,z*2.2); P.setXYZ(i,x*k,y*k,z*k);} g.computeVertexNormals(); }
  const m=stdMat(color); const me=new T.Mesh(g,m); me.position.copy(pos); me.scale.copy(scale); return me;
}
function tube(points, r, color, opt={}){
  const curve=new T.CatmullRomCurve3(points);
  const g=new T.TubeGeometry(curve, opt.seg||64, r, opt.rs||10, false);
  const m=opt.basic? new T.MeshBasicMaterial({color, transparent:true, opacity:opt.op??1, blending:opt.add?T.AdditiveBlending:T.NormalBlending, depthWrite:!opt.add}) : stdMat(color, opt.mat||{});
  const me=new T.Mesh(g,m); me.userData.curve=curve; return me;
}

W.init = function(canvas, labelsLayer){
  labelsEl=labelsLayer;
  renderer=new T.WebGLRenderer({canvas, antialias:true, alpha:true, preserveDrawingBuffer:true});
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio||1));
  renderer.setSize(1600,900,false);
  scene=new T.Scene();
  camera=new T.PerspectiveCamera(32, 1600/900, 0.05, 100);
  camera.position.copy(CAM.pos); camera.lookAt(CAM.tgt);
  scene.add(camera);
  scene.add(new T.HemisphereLight(0xe4ecff, 0x3a2a2a, 0.62));
  const key=new T.DirectionalLight(0xffffff, 0.66); key.position.set(-1.2,1.6,1.0); camera.add(key); key.target.position.set(0,0,-5); camera.add(key.target);
  const rim=new T.DirectionalLight(0x8fb4ff, 0.55); rim.position.set(3,2.5,4); scene.add(rim);
  const rim2=new T.DirectionalLight(0xffc2a8, 0.25); rim2.position.set(2,-3,-3); scene.add(rim2);
  world=new T.Group(); scene.add(world);
  clock=new T.Clock();
  buildBrain(); buildDeep(); buildFibers(); buildAssoc(); buildCNS(); buildNeuron(); buildCN(); buildMotor(); buildVessels(); buildVent();
  W.reset();
  canvas.addEventListener('pointerdown', e=>{ drag={x:e.clientX, r:ROT.y}; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e=>{ if(!drag) return; ROT.y=drag.r+(e.clientX-drag.x)*0.008; ROT.ms=0; });
  canvas.addEventListener('pointerup', ()=>{ drag=null; });
  requestAnimationFrame(loop);
};

/* ---------- builders ---------- */
function buildBrain(){
  const g=new T.Group(); groups.brain=g; world.add(g);
  const REALB=!!window.BRAIN_DATA;
  const mat=REALB ? new T.MeshPhysicalMaterial({vertexColors:true, roughness:0.5, metalness:0, clearcoat:0.35, clearcoatRoughness:0.45, sheen:0.4, sheenRoughness:0.6, sheenColor:new T.Color('#ffd6d0'), transparent:true, opacity:1})
                  : new T.MeshStandardMaterial({vertexColors:true, roughness:0.6, metalness:0, transparent:true, opacity:1});
  W.brainMat=mat; W.realBrain=REALB;
  const hl=new T.Mesh(REALB?realHemiGeo(-1):hemiGeo(-1), mat), hr=new T.Mesh(REALB?realHemiGeo(1):hemiGeo(1), mat);
  g.add(hl,hr); W.hemiL=hl; W.hemiR=hr;
  // 소뇌 (엽 · 충부 · 소엽 주름)
  const cg=new T.SphereGeometry(1,320,240), P=cg.attributes.position, cc=new Float32Array(P.count*3);
  const CB0=new T.Color('#D9A3A2'), CB1=new T.Color('#7E4652'), tmpC=new T.Color();
  for(let i=0;i<P.count;i++){
    const x=P.getX(i), y=P.getY(i), z=P.getZ(i);
    let sx=x*0.64, sy=y*(y>0?0.30:0.36), sz=z*0.42;
    const lob=1+0.10*(gauss(x-0.55,0.32)+gauss(x+0.55,0.32));
    const verm=0.07*gauss(x,0.10)*(z>0?1:0.3)*(y<0.5?1:0.5);
    const d=Math.atan2(y+0.05, z+1.12)*1.6+0.03*SN(x*1.5,y*1.5,z*1.5)-0.10*x*x*(y>0?1:-1);
    const fol=Math.abs(Math.sin(d*30)), big=Math.abs(Math.sin(d*30/6));
    const groove=Math.pow(1-fol,3)*0.8+Math.pow(1-big,6)*0.6;
    const k=lob*(1-0.022*groove)-verm;
    P.setXYZ(i, sx*k, sy*k, sz*k);
    tmpC.copy(CB0).lerp(CB1, Math.min(1,groove*0.85)); cc[i*3]=tmpC.r; cc[i*3+1]=tmpC.g; cc[i*3+2]=tmpC.b;
  }
  cg.computeVertexNormals(); cg.setAttribute('color', new T.BufferAttribute(cc,3));
  const cm=stdMat('#ffffff',{roughness:0.55, vertexColors:true}); cm.emissive.set('#B8606E'); const cb=new T.Mesh(cg,cm); cb.position.set(0,-0.52,0.70); cb.rotation.x=-0.18; if(REALB){ cb.position.set(0,-0.6,0.6); cb.scale.set(0.98,1.12,0.95); }
  g.add(cb); regPart('cerebellum', cb, cm);
  // 뇌간 (중뇌 · 뇌교 · 연수 · 척수, 매끈하게 이어지는 회전체)
  const lathe=(prof, col, zf)=>{ const pts=prof.map(([r,y])=>new T.Vector2(r,y)); const lg=new T.LatheGeometry(pts, 64); const Pp=lg.attributes.position;
    for(let i=0;i<Pp.count;i++){ const z=Pp.getZ(i), y=Pp.getY(i); if(z<0) Pp.setZ(i, z*(zf?zf(y):1)); }
    lg.computeVertexNormals(); const m=stdMat(col,{roughness:0.6}); const me=new T.Mesh(lg,m); me.position.set(0,0,0.18); return [me,m]; };
  const [mb,mbm]=lathe([[0.0,-0.13],[0.10,-0.15],[0.14,-0.19],[0.155,-0.26],[0.16,-0.34],[0.165,-0.42]], '#D2B08E', y=>1.05);
  const [pn,pnm]=lathe([[0.165,-0.42],[0.18,-0.44],[0.205,-0.475],[0.222,-0.52],[0.228,-0.57],[0.218,-0.62],[0.195,-0.665],[0.16,-0.70],[0.135,-0.72]], '#DCBC98', y=>1.35);
  const [md,mdm]=lathe([[0.135,-0.72],[0.13,-0.78],[0.12,-0.86],[0.105,-0.95],[0.092,-1.04]], '#D3B392', y=>1.1);
  const [cd,cdm]=lathe([[0.092,-1.04],[0.088,-1.2],[0.086,-1.36],[0.084,-1.44]], '#D6BC9E');
  g.add(mb,pn,md,cd);
  regPart('midbrain',mb,mbm); regPart('pons',pn,pnm); regPart('medulla',md,mdm); regPart('cordTop',cd,cdm);
}
function buildDeep(){
  const g=new T.Group(); groups.deep=g; world.add(g);
  const add=(name, meshes)=>{ meshes.forEach(m=>g.add(m)); regPart(name, meshes, meshes.map(m=>m.material)); };
  const th=[-1,1].map(s=>blob('#7FB2FF', V(s*0.11,-0.05,0.12), V(0.09,0.085,0.17), 40, 0.05));
  add('thalamus', th);
  add('hypothalamus', [blob('#FF9F6B', V(0,-0.2,-0.05), V(0.065,0.05,0.075), 32)]);
  add('pineal', [blob('#FFD36B', V(0,0.0,0.33), V(0.035,0.035,0.045), 24)]);
  const cau=[-1,1].map(s=>{ const t=tube([V(s*0.17,0.06,-0.42),V(s*0.2,0.16,-0.2),V(s*0.21,0.2,0.08),V(s*0.24,0.12,0.32),V(s*0.3,-0.06,0.38),V(s*0.36,-0.2,0.2)], 0.034, '#5ED6A8'); return t; });
  const cauH=[-1,1].map(s=>blob('#5ED6A8', V(s*0.17,0.04,-0.42), V(0.075,0.09,0.11), 32));
  add('caudate', cau.concat(cauH));
  add('putamen', [-1,1].map(s=>blob('#C58BFF', V(s*0.33,-0.05,-0.1), V(0.06,0.13,0.2), 40, 0.04)));
  add('pallidus', [-1,1].map(s=>blob('#FF7DB8', V(s*0.255,-0.07,-0.06), V(0.04,0.09,0.12), 32)));
  add('nigra', [-1,1].map(s=>blob('#3B2B3F', V(s*0.07,-0.3,0.12), V(0.05,0.022,0.045), 24)));
  const cc=tube([V(0,0.0,-0.55),V(0,0.19,-0.47),V(0,0.29,-0.12),V(0,0.29,0.24),V(0,0.19,0.48),V(0,0.05,0.47)], 0.038, '#F3F0E6');
  cc.scale.x=4.2; add('callosum',[cc]);
}
function mkPulse(grp, curve, color, speed, off, r=0.022, part){
  const m=new T.Mesh(new T.SphereGeometry(r,12,10), new T.MeshBasicMaterial({color, transparent:true, opacity:1, blending:T.AdditiveBlending, depthWrite:false}));
  grp.add(m); pulses.push({mesh:m, curve, speed, off, grp, part});
}
function buildFibers(){
  const mk=(name,color)=>{ const g=new T.Group(); g.visible=false; groups[name]=g; world.add(g); g.userData.mats=[]; g.userData.color=color; return g; };
  const proj=mk('proj','#FFD25E'), comm=mk('comm','#66E3FF'), assoc=mk('assoc','#FF7BC0');
  const addT=(grp, pts, r, color)=>{ const t=tube(pts, r, color, {basic:true, add:true, op:0.75, seg:48, rs:6}); grp.add(t); grp.userData.mats.push(t.material); return t; };
  // 투사섬유: 피질 -> 내포 -> 뇌간
  [-1,1].forEach(s=>{
    for(let k=0;k<11;k++){
      const a=-1.15+k*0.23; // 앞(-)~뒤(+)
      const st=V(s*(0.42+0.18*Math.cos(a)), 0.3+0.32*Math.cos(a*0.8), a*0.62);
      const t=addT(proj, [st, V(s*0.33,0.18,a*0.38), V(s*0.22,-0.06,0.02+a*0.08), V(s*0.1,-0.34,0.15), V(s*0.05,-0.62,0.18)], 0.009, '#FFD25E');
      mkPulse(proj, t.userData.curve, '#FFF2B0', 0.35, k/11);
    }
  });
  // 교련섬유: 반구 사이 (뇌량 통과)
  for(let k=0;k<11;k++){
    const z=-0.48+k*0.096, h=0.28+0.05*Math.cos(z*3);
    const t=addT(comm, [V(-0.6,0.3,z*1.05),V(-0.3,h+0.08,z),V(0,h,z),V(0.3,h+0.08,z),V(0.6,0.3,z*1.05)], 0.009, '#66E3FF');
    mkPulse(comm, t.userData.curve, '#D8F8FF', 0.32, k/11);
  }
}
function buildAssoc(){
  const grp=groups.assoc;
  const b=W.lp(['G_front_inf-Opercular','G_front_inf-Triangul'],{},[0.45,0.0]).p, wpt=W.lp(['G_temp_sup-Lateral'],{fmax:-0.15},[-0.36,-0.02]).p;
  const inw=(p,d)=>V(p.x*(1-d), p.y, p.z);
  const arc=[inw(b,0.22), V(-0.55,0.17,-0.12), V(-0.56,0.2,0.12), V(-0.57,0.12,0.32), V(-0.58,-0.02,0.36), inw(wpt,0.2)];
  const t=tube(arc, 0.022, '#FF7BC0', {basic:true, add:true, op:0.95, seg:80, rs:10}); grp.add(t); grp.userData.mats.push(t.material);
  W.arcuate=t;
  mkPulse(grp, t.userData.curve, '#FFE0F0', 0.28, 0, 0.035); mkPulse(grp, t.userData.curve, '#FFE0F0', 0.28, 0.5, 0.035); pulses[pulses.length-1].cut=true; pulses[pulses.length-2].cut=true;
  // 짧은 U섬유 몇 개
  [[0.2,0.35,0.05,0.4],[-0.2,0.45,-0.45,0.4],[0.5,0.3,0.35,0.42],[-0.7,0.2,-0.55,0.05]].forEach(([f1,u1,f2,u2])=>{
    const p1=surfPoint(W.hemiL,f1,u1).p, p2=surfPoint(W.hemiL,f2,u2).p, m=p1.clone().add(p2).multiplyScalar(0.5); m.x*=0.86;
    const u=tube([inw(p1,0.06), m, inw(p2,0.06)], 0.01, '#FF9DD0', {basic:true, add:true, op:0.6, seg:24, rs:6}); grp.add(u); grp.userData.mats.push(u.material);
  });
}
function buildCNS(){
  const g=new T.Group(); g.visible=false; groups.cns=g; world.add(g);
  // 척수: 경팽대 · 요팽대 · 척수원뿔 · 전정중열 · 표면 혈관 · 신경근
  const Y0=-1.40, Y1=-3.95, cg=new T.CylinderGeometry(1,1,Y0-Y1,72,260,false), CP=cg.attributes.position, ccol=new Float32Array(CP.count*3);
  const rad=y=>{ const t=(Y0-y)/(Y0-Y1); let r=0.082-0.016*t+0.020*gauss(t-0.16,0.08)+0.016*gauss(t-0.74,0.06); if(t>0.82) r*=Math.max(0.14,1-(t-0.82)/0.14); return r; };
  const cA=new T.Color('#E2CDB4'), cB=new T.Color('#BF9A84'), tc=new T.Color();
  for(let i=0;i<CP.count;i++){ const x=CP.getX(i), y=CP.getY(i)+(Y0+Y1)/2, z=CP.getZ(i); const a=Math.atan2(z,x);
    let r=rad(y); const fis=gauss(a+Math.PI/2,0.07)*0.16 + gauss(a-Math.PI/2,0.05)*0.07; const n=0.03*SN(x*8,y*14,z*8);
    const rr=r*(1-fis+n); CP.setXYZ(i, Math.cos(a)*rr*1.18, y, Math.sin(a)*rr*0.92);
    tc.copy(cA).lerp(cB, Math.min(1,fis*5+0.25*Math.max(0,SN(x*20,y*30,z*20)))); ccol[i*3]=tc.r; ccol[i*3+1]=tc.g; ccol[i*3+2]=tc.b; }
  cg.computeVertexNormals(); cg.setAttribute('color', new T.BufferAttribute(ccol,3));
  const cm=stdMat('#ffffff',{roughness:0.5, vertexColors:true}); cm.emissive.set('#8FA8FF'); const cord=new T.Mesh(cg, cm); cord.position.set(0,0,0.22); g.add(cord);
  const cordMs=[cord], cordMats=[cm];
  // 앞척수동맥(빨강) · 뒤척수정맥(파랑)
  const vpts=(ang,k)=>{ const p=[]; for(let s=0;s<=60;s++){ const y=Y0-(Y0-Y1)*0.86*s/60; const r=rad(y)*k; p.push(V(Math.cos(ang)*r*1.18+0.004*Math.sin(s*1.3), y, 0.22+Math.sin(ang)*r*0.92)); } return p; };
  const asa=tube(vpts(-Math.PI/2,1.02),0.0065,'#C2343B',{seg:200,rs:6}); const psv1=tube(vpts(Math.PI/2+0.35,1.0),0.005,'#4E5FA8',{seg:200,rs:6}), psv2=tube(vpts(Math.PI/2-0.35,1.0),0.005,'#4E5FA8',{seg:200,rs:6});
  [asa,psv1,psv2].forEach(m=>{ g.add(m); cordMs.push(m); cordMats.push(m.material); });
  // 척수신경근 (전근 · 후근 + 후근신경절), 아래로 갈수록 비스듬히 → 말총
  const rootM=stdMat('#E4CDB0',{roughness:0.55}); rootM.emissive.set('#8FA8FF'); cordMats.push(rootM);
  for(let k=0;k<22;k++){ const t=k/21, y=Y0-0.08-t*(Y0-Y1)*0.8, r=rad(y), drop=0.04+t*t*1.1, len=0.22+t*0.22;
    [-1,1].forEach(s=>{ [[-0.35,0.0055],[0.35,0.0065]].forEach(([za,rr],j)=>{
      const p0=V(s*r*1.05, y, 0.22+za*r*0.9), p1=V(s*(r+len*0.45), y-drop*0.45, 0.22+za*r*0.6), p2=V(s*(r+len), y-drop, 0.22+za*0.03);
      const tb=tube([p0,p1,p2], rr, '#E4CDB0', {seg:16, rs:6}); tb.material=rootM; g.add(tb); cordMs.push(tb);
      if(j===1 && t<0.85){ const gn=new T.Mesh(new T.SphereGeometry(1,16,12), rootM); gn.scale.set(0.026,0.014,0.014); gn.position.copy(p1.clone().lerp(p2,0.55)); g.add(gn); cordMs.push(gn); }
    }); });
  }
  regPart('cordLong', cordMs, cordMats);
  const pg=new T.Group(); g.add(pg); groups.pns=pg; pg.userData.mats=[];
  const addN=(pts)=>{ const t=tube(pts, 0.012, '#FFC94A', {basic:true, add:true, op:0.85, seg:40, rs:6}); pg.add(t); pg.userData.mats.push(t.material); mkPulse(pg, t.userData.curve, '#FFF1C2', 0.3, Math.random(), 0.026); };
  for(let k=0;k<12;k++){ const y=-1.7-k*0.2; [-1,1].forEach(s=>{ addN([V(s*0.07,y,0.22),V(s*0.4,y-0.12,0.22),V(s*0.9,y-0.35,0.15+0.1*Math.sin(k)),V(s*1.5,y-0.7,0.1)]); }); }
  // 뇌신경 (뇌간에서 앞/옆으로)
  [[-0.32,-0.4],[-0.5,-0.5],[-0.62,-0.3],[-0.78,-0.6],[-0.9,-0.4]].forEach(([y,zz],i)=>[-1,1].forEach(s=>{ addN([V(s*0.12,y,0.15),V(s*0.4,y-0.05,zz),V(s*0.75,y-0.25-0.05*i,zz-0.4)]); }));
}
function buildNeuron(){
  const g=new T.Group(); g.visible=false; groups.neuron=g; world.add(g);
  const reg=(name, meshes)=>{ meshes.forEach(m=>g.add(m)); regPart(name, meshes, meshes.map(m=>m.material)); };
  const soma=blob('#B78CFF', V(-2.3,0,0), V(0.42,0.38,0.36), 64, 0.12); soma.material.opacity=1;
  const nuc=blob('#5B3FA8', V(-2.36,0.03,0.12), V(0.15,0.14,0.14), 32, 0.05);
  reg('soma',[soma]); reg('nucleus',[nuc]);
  // 수상돌기
  let rs=7; const rr=()=>{ rs=(rs*16807)%2147483647; return rs/2147483647; };
  const dends=[];
  for(let k=0;k<8;k++){
    const a=Math.PI*0.45+k*(Math.PI*1.1/7) + (rr()-0.5)*0.2, b=(rr()-0.5)*1.2;
    const dir=V(Math.cos(a), Math.sin(a), b*0.5).normalize();
    const p0=V(-2.3,0,0).add(dir.clone().multiplyScalar(0.33));
    const pts=[p0]; let p=p0.clone(); let d=dir.clone();
    for(let s=0;s<4;s++){ d.add(V((rr()-0.5)*0.5,(rr()-0.5)*0.5,(rr()-0.5)*0.4)).normalize(); p=p.clone().add(d.clone().multiplyScalar(0.32)); pts.push(p); }
    dends.push(tube(pts, 0.045, '#A781F5', {seg:32, rs:8}));
    for(let br=0;br<2;br++){ const q0=pts[2+br]; let q=q0.clone(), dd=d.clone().add(V((rr()-0.5)*1.4,(rr()-0.5)*1.4,(rr()-0.5)*0.8)).normalize(); const qp=[q0];
      for(let s=0;s<3;s++){ dd.add(V((rr()-0.5)*0.6,(rr()-0.5)*0.6,(rr()-0.5)*0.4)).normalize(); q=q.clone().add(dd.clone().multiplyScalar(0.22)); qp.push(q);} dends.push(tube(qp,0.025,'#A781F5',{seg:24,rs:6})); }
  }
  reg('dend', dends);
  // 축삭
  const ax=tube([V(-1.95,0,0),V(-1.4,0.02,0),V(0,-0.03,0),V(1.4,0.03,0),V(2.45,0,0)], 0.05, '#9D7BEA', {seg:120, rs:12});
  const hill=new T.Mesh(new T.ConeGeometry(0.13,0.3,24), ax.material); hill.rotation.z=Math.PI/2; hill.position.set(-1.93,0,0);
  reg('axon',[ax,hill]);
  // 미엘린 수초 + 랑비에 결절
  const my=[], nodes=[]; W.nodeX=[];
  const capG=new T.CapsuleGeometry(0.115,0.32,8,20);
  const myM=stdMat('#F4E7C9',{roughness:0.4});
  let x=-1.62; W.nodeX.push(-1.7);
  while(x<2.05){ const c=new T.Mesh(capG, myM); c.rotation.z=Math.PI/2; c.position.set(x+0.27,0,0); my.push(c); x+=0.62; W.nodeX.push(x-0.04); }
  const ndM=stdMat('#FF6FA5'); const ndG=new T.TorusGeometry(0.06,0.018,10,24);
  W.nodeX.slice(1,-1).forEach(nx=>{ const n=new T.Mesh(ndG, ndM); n.rotation.y=Math.PI/2; n.position.set(nx,0,0); nodes.push(n); });
  regPart('myelin', my, myM); my.forEach(m=>g.add(m));
  regPart('node', nodes, ndM); nodes.forEach(m=>g.add(m));
  // 축삭 종말 + 시냅스 + 다음 뉴런
  const term=[], bout=[]; W.bouton=[];
  [[0.42,0.25],[0.12,0.42],[-0.18,0.3],[-0.4,-0.05]].forEach(([dy,dz])=>{
    const e=V(2.95,dy,dz); term.push(tube([V(2.45,0,0),V(2.7,dy*0.5,dz*0.4),e], 0.03, '#9D7BEA',{seg:24,rs:8}));
    const b=blob('#C9A6FF', e.clone().add(V(0.05,0,0)), V(0.085,0.085,0.085), 24); bout.push(b); W.bouton.push(b.position.clone());
  });
  reg('term', term.concat(bout));
  const post=[tube([V(3.8,0.9,0.1),V(3.45,0.45,0.15),V(3.3,0.12,0.22),V(3.38,-0.3,0.1),V(3.9,-0.8,0)], 0.07, '#5FC7F0',{seg:60,rs:12})];
  reg('post', post);
  // 신호
  const sig=new T.Mesh(new T.SphereGeometry(0.09,16,12), new T.MeshBasicMaterial({color:'#FFF27A', transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false}));
  g.add(sig); W.sig=sig;
  const halo=new T.Mesh(new T.SphereGeometry(0.2,16,12), new T.MeshBasicMaterial({color:'#FFE14D', transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false}));
  sig.add(halo); W.sigHalo=halo;
  // 신경전달물질 입자
  W.nt=[]; for(let i=0;i<26;i++){ const m=new T.Mesh(new T.SphereGeometry(0.03,10,8), new T.MeshBasicMaterial({color:'#7DFFB2', transparent:true, opacity:0, blending:T.AdditiveBlending, depthWrite:false})); g.add(m); W.nt.push({m, off:i/26, dy:(Math.random()-0.5)*0.12, dz:(Math.random()-0.5)*0.12}); }
}

/* ---------- 뇌신경 12쌍 ---------- */
function buildCN(){
  const g=new T.Group(); g.visible=false; groups.cn=g; world.add(g);
  const TY={S:'#5EE0A8', M:'#FF7BA8', B:'#FFD25E'};
  const defs=[
    [1,'S',[V(-0.07,-0.37,-0.98),V(-0.08,-0.37,-0.75),V(-0.11,-0.36,-0.5),V(-0.14,-0.33,-0.32)]],
    [2,'S',[V(-0.42,-0.3,-1.2),V(-0.25,-0.33,-0.75),V(-0.04,-0.35,-0.36),V(-0.12,-0.32,-0.18),V(-0.16,-0.26,0.0)]],
    [3,'M',[V(-0.05,-0.38,0.04),V(-0.15,-0.4,-0.2),V(-0.32,-0.36,-0.65)]],
    [4,'M',[V(-0.09,-0.24,0.31),V(-0.2,-0.3,0.15),V(-0.24,-0.37,-0.15),V(-0.36,-0.34,-0.66)]],
    [5,'B',[V(-0.2,-0.53,0.1),V(-0.42,-0.52,-0.12),V(-0.58,-0.48,-0.42)]],
    [6,'M',[V(-0.05,-0.72,0.05),V(-0.14,-0.62,-0.25),V(-0.3,-0.48,-0.7)]],
    [7,'B',[V(-0.16,-0.71,0.12),V(-0.42,-0.74,0.0),V(-0.68,-0.86,-0.18)]],
    [8,'S',[V(-0.17,-0.73,0.17),V(-0.45,-0.73,0.2),V(-0.7,-0.72,0.28)]],
    [9,'B',[V(-0.12,-0.82,0.2),V(-0.36,-0.92,0.1),V(-0.55,-1.08,0.02)]],
    [10,'B',[V(-0.12,-0.88,0.22),V(-0.32,-1.05,0.18),V(-0.4,-1.4,0.12),V(-0.42,-1.75,0.1)]],
    [11,'M',[V(-0.09,-1.3,0.22),V(-0.2,-1.08,0.22),V(-0.36,-1.02,0.24),V(-0.6,-1.25,0.32)]],
    [12,'M',[V(-0.06,-0.9,0.1),V(-0.2,-1.0,-0.12),V(-0.36,-1.04,-0.45)]],
  ];
  W.cnInfo={};
  defs.forEach(([n,ty,pts])=>{
    const col=TY[ty], ms=[];
    [-1,1].forEach(s=>{ const p=pts.map(q=>V(s<0?q.x:-q.x, q.y, q.z)); const t=tube(p, (n===2||n===5||n===10)?0.022:0.016, col, {seg:48, rs:8, mat:{roughness:0.35}}); ms.push(t); g.add(t); });
    if(n===1){ [-1,1].forEach(s=>{ const b=blob(col, V(s*0.07,-0.37,-0.98), V(0.045,0.032,0.075), 16); g.add(b); ms.push(b); }); }
    regPart('cn'+n, ms, ms.map(m=>m.material));
    W.cnInfo[n]={end:pts[pts.length-1].clone(), mid:pts[Math.floor((pts.length-1)/2)].clone(), type:ty};
  });
}
/* ---------- 운동 경로 (추체로 · 추체외로 · UMN/LMN) ---------- */
function buildMotor(){
  const g=new T.Group(); g.visible=false; groups.motor=g; world.add(g);
  const a=W.lp('G_precentral',{umin:0.45},[0.15,0.42]).p, st=V(a.x*0.86, a.y-0.03, a.z);
  const b=W.lp('G_precentral',{umax:0.2},[0.24,0.12]).p, sf=V(b.x*0.86, b.y, b.z);
  W.motorStart=st.clone();
  const umn=tube([st, V(-0.4,0.15,-0.02), V(-0.22,-0.06,0.02), V(-0.08,-0.3,0.12), V(-0.07,-0.55,0.06), V(-0.07,-0.84,0.12), V(0,-0.98,0.17), V(0.06,-1.12,0.2), V(0.05,-1.45,0.22), V(0.045,-1.75,0.22)], 0.024, '#FFC94A', {seg:200, rs:10});
  const NU=[[-0.1,-0.55,0.12],[0.1,-0.55,0.12],[-0.08,-0.84,0.16],[0.08,-0.84,0.16]];
  const cb=[]; [-1,1].forEach(m=>NU.forEach(([x,y,z])=>cb.push(tube([V(m<0?sf.x:-sf.x, sf.y, sf.z), V(0.42*m,0.02,-0.05), V(0.22*m,-0.08,0.03), V(0.09*m,-0.3,0.1), V(x*0.5,(y-0.3)/2-0.1,0.1), V(x,y,z)], 0.015, '#FFB347', {seg:90, rs:8}))));
  const nuc=NU.map(([x,y,z])=>blob('#FFF0B8', V(x,y,z), V(0.035,0.035,0.035), 16));
  const lmn=tube([V(0.045,-1.75,0.22), V(0.3,-1.82,0.2), V(0.7,-1.98,0.12), V(1.02,-2.1,0.05)], 0.024, '#5FD3F0', {seg:60, rs:10});
  const lmnC=[[-1,-0.55],[1,-0.55],[-1,-0.84],[1,-0.84]].map(([s,y])=>tube([V(s*0.09,y,0.12), V(s*0.3,y-0.04,-0.05), V(s*0.55,y-0.1,-0.35)], 0.015, '#5FD3F0', {seg:40, rs:8}));
  const mus=blob('#E86A6A', V(1.2,-2.2,0.02), V(0.22,0.09,0.1), 32, 0.06); mus.rotation.z=-0.45;
  [umn,...cb,...nuc,lmn,...lmnC,mus].forEach(m=>g.add(m));
  regPart('umn',[umn],[umn.material]); regPart('cbulbar',cb.concat(nuc),cb.concat(nuc).map(m=>m.material));
  regPart('lmn',[lmn].concat(lmnC),[lmn].concat(lmnC).map(m=>m.material)); regPart('muscle',[mus],[mus.material]);
  mkPulse(g, umn.userData.curve, '#FFF3C4', 0.2, 0, 0.042, 'umn'); mkPulse(g, umn.userData.curve, '#FFF3C4', 0.2, 0.5, 0.042, 'umn');
  cb.forEach((c,i)=>mkPulse(g, c.userData.curve, '#FFE2B0', 0.3, i*0.25, 0.03, 'cbulbar'));
  mkPulse(g, lmn.userData.curve, '#D9F7FF', 0.55, 0, 0.042, 'lmn'); lmnC.forEach((c,i)=>mkPulse(g, c.userData.curve, '#D9F7FF', 0.5, i*0.2, 0.03, 'lmn'));
  const ep=tube([st, V(-0.36,0.12,-0.1), V(-0.33,-0.05,-0.12), V(-0.25,-0.07,-0.04), V(-0.12,-0.04,0.12), V(-0.3,0.22,0.16), st], 0.017, '#C58BFF', {basic:true, op:0.95, seg:110, rs:8});
  const cl=tube([st, V(-0.22,-0.18,0.04), V(-0.12,-0.52,0.08), V(-0.36,-0.5,0.58), V(-0.18,-0.3,0.36), V(-0.12,-0.03,0.14), V(-0.34,0.26,0.1), st], 0.017, '#FF9F6B', {basic:true, op:0.95, seg:130, rs:8});
  g.add(ep, cl); regPart('epLoop',[ep],[ep.material]); regPart('cbLoop',[cl],[cl.material]);
  mkPulse(g, ep.userData.curve, '#F0DCFF', 0.22, 0, 0.032, 'epLoop'); mkPulse(g, ep.userData.curve, '#F0DCFF', 0.22, 0.5, 0.032, 'epLoop');
  mkPulse(g, cl.userData.curve, '#FFE3D0', 0.18, 0.25, 0.032, 'cbLoop'); mkPulse(g, cl.userData.curve, '#FFE3D0', 0.18, 0.75, 0.032, 'cbLoop');
  const lu=blob('#FF3B3B', V(-0.22,-0.06,0.02), V(0.065,0.065,0.065), 20), ll=blob('#FF3B3B', V(0.5,-1.9,0.16), V(0.065,0.065,0.065), 20);
  lu.material.emissiveIntensity=0.8; ll.material.emissiveIntensity=0.8; g.add(lu, ll);
  regPart('lesU',[lu],[lu.material],0); regPart('lesL',[ll],[ll.material],0);
}
/* ---------- 뇌혈관 ---------- */
/* 실제 피질 위 중대뇌동맥: 실비안열에서 나와 고랑을 따라 뻗는 가지 */
function hullLift(P, u, p, rad=0.06, off=0.012){ const C=V(-0.36,0.0,0.0); let best=-1, bd=-1e9;
  for(let i=0;i<u.n;i++){ const dx=P[i*3]-p.x, dy=P[i*3+1]-p.y, dz=P[i*3+2]-p.z; if(dx*dx+dy*dy+dz*dz>rad*rad) continue; const r=(P[i*3]-C.x)**2+(P[i*3+1]-C.y)**2+(P[i*3+2]-C.z)**2; if(r>bd){bd=r;best=i;} }
  if(best<0) return p.clone(); const q=V(P[best*3],P[best*3+1],P[best*3+2]); return q.add(q.clone().sub(C).normalize().multiplyScalar(off)); }
function sulcTrace(names, axis, o={}){ const m=W.hemiL, u=m.geometry.userData, P=m.geometry.attributes.position.array, ids=new Set([].concat(names).map(nm=>u.names.indexOf(nm)));
  const sel=[]; for(let i=0;i<u.n;i++){ if(!ids.has(u.lab[i])) continue; const p=V(P[i*3],P[i*3+1],P[i*3+2]); if(o.filter && !o.filter(p)) continue; sel.push(p); }
  if(sel.length<6) return null; const ax=axis.clone().normalize(); sel.sort((a,b)=>a.dot(ax)-b.dot(ax));
  const nb=o.bins||7, pts=[]; for(let k=0;k<nb;k++){ const a=Math.floor(sel.length*k/nb), b=Math.max(a+1,Math.floor(sel.length*(k+1)/nb)); const c=V(0,0,0); for(let j=a;j<b;j++) c.add(sel[j]); c.multiplyScalar(1/(b-a)); pts.push(c); }
  return pts.map(p=>hullLift(P,u,p,o.rad||0.06,o.off||0.016)); }
function taperTube(pts, r0, r1, color, wig=0.006){ const sm=[]; for(let i=0;i<pts.length;i++){ sm.push(pts[i]); }
  const curve=new T.CatmullRomCurve3(sm, false, 'centripetal'); const segs=Math.max(40, pts.length*14), rs=10;
  const g=new T.TubeGeometry(curve, segs, 1, rs, false); const Pp=g.attributes.position; let idx=0;
  for(let j=0;j<=segs;j++){ const c=curve.getPointAt(j/segs), rr=r0+(r1-r0)*Math.pow(j/segs,0.8); for(let k=0;k<=rs;k++){ const x=Pp.getX(idx)-c.x, y=Pp.getY(idx)-c.y, z=Pp.getZ(idx)-c.z; Pp.setXYZ(idx, c.x+x*rr, c.y+y*rr, c.z+z*rr); idx++; } }
  g.computeVertexNormals(); const me=new T.Mesh(g, stdMat(color,{roughness:0.32})); me.userData.curve=curve; return me; }
function realMCA(mk, both, T0){
  const g=groups.vessels, mir=(pts)=>pts.map(p=>V(-p.x,p.y,p.z)), m=W.hemiL, u=m.geometry.userData, P=m.geometry.attributes.position.array;
  const insS=labelPoint(m,['S_circular_insula_sup','G_insular_short'],{}), insI=labelPoint(m,['S_circular_insula_inf','G_Ins_lg_and_S_cent_ins'],{});
  const lfAll=[]; for(let i=0;i<u.n;i++) if(/^Lat_Fis/.test(u.names[u.lab[i]]||'')) lfAll.push(V(P[i*3],P[i*3+1],P[i*3+2]));
  const fissNear=(p)=>{ let b=lfAll[0], bd=1e9; lfAll.forEach(q=>{ const d=q.distanceToSquared(p); if(d<bd){bd=d;b=q;} }); return hullLift(P,u,b,0.05,0.014); };
  const insC=insS? insS.p.clone().lerp(insI?insI.p:insS.p,0.5):V(-0.45,-0.1,-0.1); insC.x-=0.02;
  const m1=[T0, V(-0.3,-0.4,-0.22), V(insC.x+0.06,insC.y-0.18,insC.z-0.08), insC];
  const exitP=fissNear(V(insC.x-0.25, insC.y, insC.z-0.02));
  const brS=[], brI=[];
  const add=(arr, names, axis, o={})=>{ const tr=sulcTrace(names, axis, o); if(!tr) return; const st=fissNear(tr[0]); const pts=[insC.clone().lerp(st,0.45).setX(Math.min(insC.x, st.x)+0.02), st].concat(tr.filter(q=>q.distanceTo(st)>0.04)); arr.push(pts); };
  const up=V(0,1,0), fwd=V(0,0,-1), back=V(0,0.25,1);
  add(brS,['S_front_inf'], V(0,0.2,-1), {bins:6});
  add(brS,['S_precentral-inf-part'], up, {bins:6});
  add(brS,['S_central'], up, {bins:7, filter:p=>p.y<0.62});
  add(brS,['S_postcentral'], up, {bins:7, filter:p=>p.y<0.58});
  add(brS,['S_intrapariet_and_P_trans'], V(0,0.3,1), {bins:7});
  add(brS,['G_front_inf-Orbital','S_orbital_lateral'], fwd, {bins:5});
  add(brI,['S_temporal_sup'], V(0,0.15,1), {bins:8});
  add(brI,['S_temporal_inf'], V(0,0.1,1), {bins:6});
  add(brI,['Pole_temporal','G_temp_sup-Lateral'], fwd, {bins:4, filter:p=>p.z<-0.25});
  add(brI,['G_pariet_inf-Angular'], V(0,0.4,1), {bins:5});
  const mkT=(name, list, r0, r1, color)=>{ const ms=[]; list.forEach(pts=>{ [pts, mir(pts)].forEach(pp=>{ const t=taperTube(pp, r0, r1, color); g.add(t); ms.push(t); mkPulse(g, t.userData.curve, '#FFE2E2', 0.32, Math.random(), r0*0.8, name); }); }); regPart(name, ms, ms.map(x=>x.material)); return ms; };
  mkT('mca1', [m1.concat([exitP])], 0.027, 0.02, '#E8454B');
  mkT('mcaS', brS, 0.019, 0.008, '#D9363E');
  mkT('mcaI', brI, 0.019, 0.008, '#D94850');
  const last=a=>a[a.length-1].clone();
  W.vesselInfo={fiss:exitP.clone(), supEnd:last(brS[2]||brS[0]), infEnd:last(brI[0])};
}
function buildVessels(){
  const g=new T.Group(); g.visible=false; groups.vessels=g; world.add(g);
  const mir=(pts)=>pts.map(p=>V(-p.x,p.y,p.z));
  const mk=(name, list, r, color)=>{ const ms=[]; list.forEach(pts=>{ const t=tube(pts, r, color, {seg:Math.max(30,pts.length*16), rs:10, mat:{roughness:0.35}}); g.add(t); ms.push(t); mkPulse(g, t.userData.curve, '#FFE2E2', 0.32, Math.random(), r*0.9, name); }); regPart(name, ms, ms.map(m=>m.material)); return ms; };
  const both=(pts)=>[pts, mir(pts)];
  const T0=V(-0.17,-0.45,-0.28);
  mk('ica', both([V(-0.26,-1.15,-0.27),V(-0.24,-0.95,-0.3),V(-0.2,-0.62,-0.32),T0]), 0.032, '#FF9F6B');
  mk('vert', both([V(-0.17,-1.4,0.18),V(-0.15,-1.2,0.12),V(-0.1,-0.95,0.04),V(-0.02,-0.8,-0.02)]), 0.026, '#2FC48A');
  mk('basilar', [[V(0,-0.79,-0.03),V(0,-0.62,-0.05),V(0,-0.45,-0.03)]], 0.03, '#2FC48A');
  mk('aca', both([T0,V(-0.06,-0.45,-0.42),V(-0.006,-0.3,-0.78),V(-0.006,0.02,-0.92),V(-0.006,0.38,-0.72),V(-0.006,0.58,-0.3),V(-0.006,0.62,0.15),V(-0.006,0.5,0.5)]), 0.02, '#4F8EF7');
  mk('acom', [[V(-0.06,-0.45,-0.42),V(0,-0.46,-0.45),V(0.06,-0.45,-0.42)]], 0.015, '#FFE45C');
  mk('pcom', both([T0,V(-0.17,-0.46,-0.13),V(-0.15,-0.46,0.0)]), 0.015, '#FFE45C');
  mk('pca', both([V(0,-0.45,-0.03),V(-0.15,-0.46,0.0),V(-0.27,-0.43,0.22),V(-0.3,-0.39,0.5),V(-0.22,-0.3,0.8),V(-0.1,-0.14,0.99)]), 0.022, '#B57BFF');
  mk('sca', both([V(0,-0.47,-0.03),V(-0.18,-0.48,0.05),V(-0.28,-0.43,0.3),V(-0.3,-0.3,0.52)]), 0.014, '#7FE0B0');
  mk('aica', both([V(0,-0.62,-0.05),V(-0.2,-0.66,0.04),V(-0.42,-0.62,0.35)]), 0.014, '#7FE0B0');
  mk('pica', both([V(-0.08,-0.92,0.05),V(-0.2,-0.96,0.25),V(-0.16,-0.84,0.45),V(-0.3,-0.78,0.66)]), 0.014, '#7FE0B0');
  // MCA: M1 (기저핵 쪽) -> 실비안열 -> 피질 가지(M3 위/아래)
  const fiss=W.lp(['Lat_Fis-post','Lat_Fis-ant-Horizont'],{fmin:0.0},[0.12,-0.01,0.3]); const fp=fiss.p.clone().add(fiss.n.clone().multiplyScalar(0.02));
  const m1=[T0,V(-0.34,-0.42,-0.2),V(-0.55,-0.24,-0.12),fp];
  const path=(F1,U1,F2,U2)=>{ const pts=[fp]; for(let i=1;i<=5;i++){ const t=i/5, s=surfPoint(W.hemiL,F1+(F2-F1)*t,U1+(U2-U1)*t,0.3); pts.push(s.p.clone().add(s.n.clone().multiplyScalar(0.018))); } return pts; };
  const sup=[path(0.12,-0.01,0.48,0.25),path(0.12,-0.01,0.22,0.45),path(0.12,-0.01,-0.08,0.48),path(0.12,-0.01,-0.45,0.32)];
  const inf=[path(0.12,-0.01,-0.2,-0.14),path(0.12,-0.01,0.18,-0.26),path(0.12,-0.01,-0.55,-0.02)];
  if(W.realBrain){ realMCA(mk, both, T0); return; }
  mk('mca1', both(m1), 0.028, '#FF5A5A');
  mk('mcaS', sup.flatMap(p=>both(p)), 0.016, '#FF5A5A');
  mk('mcaI', inf.flatMap(p=>both(p)), 0.016, '#FF8080');
  W.vesselInfo={fiss:fp.clone(), supEnd:sup[1][5].clone(), infEnd:inf[0][5].clone()};
}
/* ---------- 뇌실 ---------- */
function buildVent(){
  const g=new T.Group(); g.visible=false; groups.vent=g; world.add(g); g.position.set(0,0,0);
  const mat=()=>new T.MeshStandardMaterial({color:'#5FD3F0', emissive:new T.Color('#5FD3F0'), emissiveIntensity:0.15, roughness:0.3, transparent:true, opacity:0.85});
  const lat=[], m1=mat();
  [-1,1].forEach(s=>{
    const a=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([V(s*0.11,0.08,-0.48),V(s*0.13,0.18,-0.12),V(s*0.15,0.16,0.25),V(s*0.22,0.06,0.45),V(s*0.18,0.05,0.72)]),60,0.05,12,false), m1);
    const b=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([V(s*0.22,0.06,0.45),V(s*0.32,-0.1,0.38),V(s*0.38,-0.25,0.08),V(s*0.37,-0.28,-0.18)]),40,0.04,12,false), m1);
    const fm=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([V(s*0.12,0.1,-0.18),V(s*0.05,0.03,-0.12),V(0,-0.02,-0.06)]),16,0.02,8,false), m1);
    lat.push(a,b,fm); g.add(a,b,fm);
  });
  regPart('latV', lat, [m1]);
  const m3=mat(); const v3=new T.Mesh(new T.BoxGeometry(0.035,0.2,0.32), m3); v3.position.set(0,-0.1,0.08); g.add(v3); regPart('v3',[v3],[m3]);
  const ma=mat(); const aq=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3([V(0,-0.2,0.22),V(0,-0.36,0.28),V(0,-0.5,0.33)]),24,0.016,8,false), ma); g.add(aq); regPart('aq',[aq],[ma]);
  const m4=mat(); const v4=new T.Mesh(new T.OctahedronGeometry(1,0), m4); v4.position.set(0,-0.63,0.36); v4.scale.set(0.13,0.14,0.05); g.add(v4); regPart('v4',[v4],[m4]);
  // 흐름 경로 (입자)
  const flow=new T.CatmullRomCurve3([V(-0.13,0.18,-0.12),V(-0.12,0.1,-0.18),V(-0.05,0.03,-0.12),V(0,-0.05,0.02),V(0,-0.15,0.18),V(0,-0.36,0.28),V(0,-0.55,0.35),V(0,-0.68,0.37),V(0.18,-0.76,0.32),V(0.32,-0.7,0.15),V(0.38,-0.5,-0.05)]);
  for(let i=0;i<6;i++) mkPulse(g, flow, '#E6FBFF', 0.12, i/6, 0.028, 'v4');
}
/* ---------- labels (HTML, 3D 위치 추적) ---------- */
W.label=function(id, text, anchor, local, opt={}){
  let L=LBL[id];
  if(!L){
    const el=document.createElement('div'); el.className='lb3'+(opt.cls?' '+opt.cls:'');
    el.innerHTML=`<i class="ln"></i><b class="dt"></b><span class="tx"></span>`;
    labelsEl.appendChild(el);
    L=LBL[id]={el, ln:el.querySelector('.ln'), dt:el.querySelector('.dt'), tx:el.querySelector('.tx')};
  }
  L.tx.innerHTML=text; L.anchor=anchor; L.local=local.clone(); L.normal=opt.normal?opt.normal.clone():null;
  L.dx=opt.dx??0; L.dy=opt.dy??-60; L.on=false; L.el.style.setProperty('--c', opt.color||'#FFE45C');
  return L;
};
W.lbl=function(ids, v=true){ [].concat(ids).forEach(id=>{ const L=LBL[id]; if(L){ L.on=v; L.el.classList.toggle('on',v); } }); };
W.lblAllOff=function(){ Object.values(LBL).forEach(L=>{ L.on=false; L.el.classList.remove('on'); }); };
const _v=new T.Vector3(), _n=new T.Vector3(), _c=new T.Vector3();
function updLabels(){
  for(const id in LBL){
    const L=LBL[id]; if(!L.on || !L.anchor) continue;
    _v.copy(L.local); L.anchor.localToWorld(_v);
    let vis=L.anchor.visible!==false;
    if(L.normal){ _n.copy(L.normal).transformDirection(L.anchor.matrixWorld); _c.copy(camera.position).sub(_v).normalize(); if(_n.dot(_c)<-0.05) vis=false; }
    _v.project(camera);
    const x=(_v.x+1)/2*1600, y=(1-_v.y)/2*900;
    L.el.style.transform=`translate(${x}px,${y}px)`;
    L.el.classList.toggle('hid', !vis || _v.z>1);
    const len=Math.hypot(L.dx,L.dy), ang=Math.atan2(L.dy,L.dx);
    L.ln.style.width=len+'px'; L.ln.style.transform=`rotate(${ang}rad)`;
    L.tx.style.transform=`translate(calc(${L.dx}px - 50%), calc(${L.dy}px - 50%))`;
  }
}

/* ---------- 상태 제어 ---------- */
W.reset=function(){
  Object.keys(groups).forEach(k=>groups[k].visible=false);
  groups.pns && (groups.pns.visible=true);
  for(const k in parts){ const p=parts[k]; p.tgt.op=p.def; p.tgt.em=0; }
  SHIFT.tgt=0; fx.cut=false; if(W.arcuate) W.arcuate.material.color.set('#FF7BC0');
  BS.tgt={lobe:[0,0,0,0],dim:[0,0,0,0],cs:0,lf:0,op:1,glow:0,terr:0,tsel:[1,1,1],tdim:[0,0,0],les:0}; if(W.hemiR) W.hemiR.visible=true; if(W.hemiL) W.hemiL.visible=true; fx.swell=0; if(groups.vent){ groups.vent.scale.setScalar(1); groups.vent.position.set(0,0,0); }
  fx.signal=false; fx.synapse=false; ROT.spin=0;
  W.lblAllOff();
  ['proj','comm','assoc','pns'].forEach(n=>{ const g=groups[n]; if(!g) return; const v=(n==='pns')?1:0; g.userData.op=v; g.userData.tgtOp=v; applyFib(g); });
};
W.show=function(o){ for(const k in o){ if(groups[k]) groups[k].visible=!!o[k]; } };
/* 편별 파일에서 직접 만든 3D 그룹/부품 등록 (W.reset 때 자동으로 숨김, W.show/W.part로 제어) */
W.addGroup=function(name, g){ if(groups[name]) return groups[name]; g.visible=false; groups[name]=g; world.add(g); return g; };
W.regPart=function(name, objs, mats, op=1){ regPart(name, objs, mats, op); };
W.stdMat=(c,o)=>stdMat(c,o||{}); W.tube=(pts,r,c,o)=>tube(pts,r,c,o||{});
W.fib=function(name, op){ const g=groups[name]; if(!g) return; if(op>0) g.visible=true; g.userData.tgtOp=op; if(isInstant()){ g.userData.op=op; if(op<=0) g.visible=false; } };
W.part=function(names, o){ [].concat(names).forEach(n=>{ const p=parts[n]; if(!p) return; if(o.op!==undefined) p.tgt.op=o.op; if(o.em!==undefined) p.tgt.em=o.em; }); if(isInstant()) W.snap(); };
W.parts=parts; W.groups=groups;
W.brain=function(o){ const t=BS.tgt; if(o.lobe) t.lobe=o.lobe.slice(); if(o.dim) t.dim=o.dim.slice(); if(o.cs!==undefined) t.cs=o.cs; if(o.lf!==undefined) t.lf=o.lf; if(o.op!==undefined) t.op=o.op; if(o.glow!==undefined) t.glow=o.glow; if(isInstant()) W.snap(); };
W.terr=function(list, dimOthers=false){ if(!list){ W.brain({}); BS.tgt.terr=0; } else { BS.tgt.terr=1; for(let i=0;i<3;i++){ BS.tgt.tsel[i]=list.includes(i)?1:0; BS.tgt.tdim[i]=(dimOthers&&!list.includes(i))?1:0; } } if(isInstant()) W.snap(); };
function lesLabels(u, labels){ const L=u.lesW; const ids=labels.map(x=>typeof x==='string'?{name:x}:x).map(o=>Object.assign({},o,{id:u.names.indexOf(o.name)}));
  let A=new Float32Array(u.n); for(let i=0;i<u.n;i++){ for(const o of ids){ if(u.lab[i]!==o.id) continue; if(o.fmin!==undefined&&u.F[i]<o.fmin) continue; if(o.fmax!==undefined&&u.F[i]>o.fmax) continue; if(o.umin!==undefined&&u.U[i]<o.umin) continue; if(o.umax!==undefined&&u.U[i]>o.umax) continue; A[i]=1; break; } }
  for(let k=0;k<3;k++){ const B=new Float32Array(u.n); for(let i=0;i<u.n;i++){ let s=0; for(let j=u.off[i];j<u.off[i+1];j++) s+=A[u.adj[j]]; B[i]=A[i]*0.4+0.6*s/(u.off[i+1]-u.off[i]); } A=B; }
  for(let i=0;i<u.n;i++) L[i]=Math.min(1,A[i]*1.3); }
/* spec: {labels:[...], color, side:'L'|'R'|'both'} 또는 (구형) {blobs, ring} */
W.lesion=function(spec){ LESC.set((spec&&spec.color)||'#FF3B3B');
  [W.hemiL,W.hemiR].forEach(m=>{ const uu=m.geometry.userData; if(!uu.lesW) uu.lesW=new Float32Array(uu.n); uu.lesW.fill(0); });
  const u=W.hemiL.geometry.userData, L=u.lesW, side=(spec&&spec.side)||'L';
  if(spec && spec.labels && u.real){ (side==='both'?[W.hemiL,W.hemiR]:side==='R'?[W.hemiR]:[W.hemiL]).forEach(m=>lesLabels(m.geometry.userData, spec.labels)); BS.tgt.les=1; painted=false; if(isInstant()) W.snap(); return; }
  if(spec){ for(let i=0;i<u.n;i++){ const F=u.F[i], U=u.U[i], dx=u.L[i]; let w=0; const lat=dx>-0.25;
    (spec.blobs||[]).forEach(([fc,uc,r,med])=>{ if(!lat && !med) return; const d2=(F-fc)**2+(U-uc)**2; w=Math.max(w, ss(0.25,0.75,Math.exp(-d2/(2*r*r)))); });
    if(spec.ring && lat){ const [fc,uc,r1,r2]=spec.ring; const d=Math.sqrt((F-fc)**2+((U-uc)*1.3)**2); w=Math.max(w, ss(r1-0.05,r1+0.05,d)*(1-ss(r2-0.05,r2+0.05,d))*(U>-0.45?1:0)); }
    L[i]=w; } }
  BS.tgt.les=spec?1:0; painted=false; if(isInstant()) W.snap(); };
/* 오른쪽 반구에서 라벨 위치 찾기 */
W.lpR=function(names,o,fb){ if(W.realBrain){ const r=labelPoint(W.hemiR,names,o||{}); if(r) return r; } const p=W.lp(names,o,fb); return {p:new T.Vector3(-p.p.x,p.p.y,p.p.z), n:new T.Vector3(-p.n.x,p.n.y,p.n.z)}; };
W.hideLeft=function(v){ W.hemiL.visible=!v; };
W.hideRight=function(v){ W.hemiR.visible=!v; };
W.swell=function(v){ fx.swell=v; if(isInstant()&&groups.vent) { const ns=1+0.32*v; groups.vent.scale.setScalar(ns); groups.vent.position.set(0,-0.15*(1-ns),0.15*(1-ns)); } };
W.shift=function(px){ SHIFT.tgt=px; if(isInstant()) SHIFT.cur=px; };
W.arcCut=function(v){ fx.cut=v; if(W.arcuate) W.arcuate.material.color.set(v?'#FF3B3B':'#FF7BC0'); };
const MK={};
W.marker=function(id,F,U,color,minL=0.5,lps){ if(MK[id]) return MK[id]; const s=(lps&&W.realBrain&&labelPoint(W.hemiL,lps[0],lps[1]||{}))||surfPoint(W.hemiL,F,U,minL); const m=new T.Mesh(new T.SphereGeometry(0.035,16,12), new T.MeshBasicMaterial({color, transparent:true, opacity:0})); m.position.copy(s.p).add(s.n.clone().multiplyScalar(0.012)); W.hemiL.add(m); regPart('mk_'+id, m, m.material, 0); return (MK[id]={p:m.position.clone(), n:s.n}); };
W.lobes=function(list, dimOthers=false){ const L=[0,0,0,0], D=[0,0,0,0]; for(let i=0;i<4;i++){ if(list.includes(i)) L[i]=1; else if(dimOthers) D[i]=1; } W.brain({lobe:L, dim:D}); };
W.fx=function(o){ Object.assign(fx,o); };
W.spin=function(s){ ROT.spin=s; };
W.cam=function(pos, tgt, ms=1600, rotY=0){
  const P=V(...pos), Tg=V(...tgt);
  if(isInstant() || ms<=0){ CAM.pos.copy(P); CAM.tgt.copy(Tg); CAM.to=null; ROT.y=rotY; ROT.ms=0; return; }
  CAM.from={pos:CAM.pos.clone(), tgt:CAM.tgt.clone()}; CAM.to={pos:P, tgt:Tg}; CAM.t0=performance.now(); CAM.ms=ms;
  let r=ROT.y; const twoPi=Math.PI*2; const d=((rotY-r)%twoPi+twoPi*1.5)%twoPi-Math.PI;
  ROT.from=r; ROT.to=r+d; ROT.t0=performance.now(); ROT.ms=ms;
};
const VIEWS={
  front3q:[[-3.7,1.5,-3.7],[0,-0.18,0]],
  lateralL:[[-5.6,0.35,0.05],[0,-0.12,0.05]],
  lateralR:[[5.6,0.35,0.05],[0,-0.12,0.05]],
  top:[[0,5.7,0.95],[0,-0.05,0]],
  xray:[[-3.0,1.35,-3.3],[0,-0.12,0.02]],
  deep:[[-2.2,1.0,-2.4],[0,-0.05,0.05]],
  stem:[[-3.0,-0.4,-2.4],[0,-0.6,0.2]],
  cereb:[[-3.0,-0.35,3.2],[0,-0.45,0.5]],
  cns:[[-6.4,-0.6,-5.8],[0,-1.25,0.1]],
  neuron:[[0.25,0.9,6.4],[0.25,0,0]],
  soma:[[-1.5,0.8,3.7],[-2.3,0.05,0]],
  axon:[[0.0,0.6,3.4],[0.1,0,0]],
  synapse:[[2.35,0.55,2.3],[3.0,0.08,0.1]],
  cnView:[[-2.5,-2.05,-3.0],[0,-0.72,-0.15]],
  cnFront:[[0,-1.6,-3.6],[0,-0.7,-0.15]],
  motor:[[-1.4,-0.45,-6.5],[0.3,-1.15,0.1]],
  decus:[[-0.35,-0.85,-2.0],[0,-0.98,0.15]],
  loop:[[-2.7,0.7,-2.0],[-0.12,-0.15,0.22]],
  base:[[0,-3.3,-1.15],[0,-0.45,-0.12]],
  medial:[[3.9,0.35,0.15],[-0.1,0.0,0.05]],
  postInf:[[-2.7,-1.5,3.3],[0,-0.35,0.45]],
  vessels:[[-3.3,0.4,-3.6],[0,-0.45,0]],
  vent:[[-3.3,1.0,-2.9],[0,-0.18,0.15]],
};
/* 화면에서 3D 물체가 차지하는 영역(무대 1600×900 좌표) — 보충 노트 배치용 */
W.screenBox=function(){
  if(!world||!camera) return null; world.updateMatrixWorld(true); camera.updateMatrixWorld(true);
  const box=new T.Box3(), v=new T.Vector3(); let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9, any=false;
  world.traverseVisible(o=>{
    if(!(o.isMesh||o.isLine||o.isPoints) || !o.geometry) return;
    const m=o.material; const op=Array.isArray(m)?Math.max(...m.map(q=>q.visible===false?0:(q.opacity??1))):(m&&m.visible===false?0:(m?.opacity??1));
    if(op<0.08) return;
    if(!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    box.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
    for(let i=0;i<8;i++){ v.set(i&1?box.max.x:box.min.x, i&2?box.max.y:box.min.y, i&4?box.max.z:box.min.z).project(camera);
      if(v.z>1) continue; const sx=(v.x+1)/2*1600, sy=(1-v.y)/2*900; x0=Math.min(x0,sx); y0=Math.min(y0,sy); x1=Math.max(x1,sx); y1=Math.max(y1,sy); any=true; }
  });
  if(!any) return null;
  return {x:Math.max(0,x0), y:Math.max(0,y0), w:Math.min(1600,x1)-Math.max(0,x0), h:Math.min(900,y1)-Math.max(0,y0)};
};
W.view=function(name, ms=1600, rotY=0){ const v=VIEWS[name]; W.cam(v[0], v[1], ms, rotY); };
W.snap=function(){
  for(const k in parts){ const p=parts[k]; p.cur.op=p.tgt.op; p.cur.em=p.tgt.em; applyPart(p); }
  BS.cur=JSON.parse(JSON.stringify(BS.tgt)); paintAll();
  if(CAM.to){ CAM.pos.copy(CAM.to.pos); CAM.tgt.copy(CAM.to.tgt); CAM.to=null; }
  SHIFT.cur=SHIFT.tgt;
  if(ROT.ms){ ROT.y=ROT.to; ROT.ms=0; }
  ['proj','comm','assoc','pns'].forEach(n=>{ const g=groups[n]; if(g && g.userData.tgtOp!==undefined){ g.userData.op=g.userData.tgtOp; applyFib(g); } });
};
function applyPart(p){
  p.mats.forEach(m=>{ m.opacity=p.cur.op; m.depthWrite=p.cur.op>0.9; if(m.emissiveIntensity!==undefined) m.emissiveIntensity=p.cur.em*(m.vertexColors?0.35:0.45); });
  p.objs.forEach(o=>o.visible=p.cur.op>0.01);
}
function applyFib(g){ const op=g.userData.op??0; g.userData.mats.forEach(m=>m.opacity=0.8*op); g.visible=op>0.01; g.children.forEach(c=>{ if(c.material && c.material.blending===T.AdditiveBlending && c.geometry.type==='SphereGeometry') c.material.opacity=op; }); }
function paintAll(){
  paintHemi(W.hemiL.geometry, BS.cur); paintHemi(W.hemiR.geometry, BS.cur);
  W.brainMat.opacity=BS.cur.op; W.brainMat.emissive.set('#5D86FF'); W.brainMat.emissiveIntensity=BS.cur.glow*0.16; W.brainMat.depthWrite=BS.cur.op>0.9;
  W.hemiL.renderOrder=W.hemiR.renderOrder= BS.cur.op<0.9 ? 5 : 0;
}
let painted=false;

/* ---------- main loop ---------- */
function loop(now){
  requestAnimationFrame(loop);
  const dt=Math.min(0.05, clock.getDelta());
  const k=1-Math.exp(-dt*5.5);
  const paused=isPaused();
  // camera
  if(CAM.to){ const p=Math.min(1,(now-CAM.t0)/CAM.ms), e=ease(p); CAM.pos.lerpVectors(CAM.from.pos, CAM.to.pos, e); CAM.tgt.lerpVectors(CAM.from.tgt, CAM.to.tgt, e); if(p>=1) CAM.to=null; }
  camera.position.copy(CAM.pos); camera.lookAt(CAM.tgt);
  if(ROT.ms){ const p=Math.min(1,(now-ROT.t0)/ROT.ms); ROT.y=ROT.from+(ROT.to-ROT.from)*ease(p); if(p>=1) ROT.ms=0; }
  else if(!drag && !paused) ROT.y+=ROT.spin*dt;
  world.rotation.y=ROT.y;
  // parts
  for(const n in parts){ const p=parts[n]; const dO=p.tgt.op-p.cur.op, dE=p.tgt.em-p.cur.em; if(Math.abs(dO)>0.002||Math.abs(dE)>0.002){ p.cur.op+=dO*k; p.cur.em+=dE*k; applyPart(p); } }
  // brain colors
  let ch=!painted; const c=BS.cur, t=BS.tgt;
  for(let i=0;i<4;i++){ if(Math.abs(t.lobe[i]-c.lobe[i])>0.004){ c.lobe[i]+= (t.lobe[i]-c.lobe[i])*k; ch=true; } else c.lobe[i]=t.lobe[i]; if(Math.abs(t.dim[i]-c.dim[i])>0.004){ c.dim[i]+=(t.dim[i]-c.dim[i])*k; ch=true; } else c.dim[i]=t.dim[i]; }
  ['tsel','tdim'].forEach(a=>{ for(let i=0;i<3;i++){ if(Math.abs(t[a][i]-c[a][i])>0.004){ c[a][i]+=(t[a][i]-c[a][i])*k; ch=true; } else if(c[a][i]!==t[a][i]){ c[a][i]=t[a][i]; ch=true; } } });
  ['cs','lf','op','glow','terr','les'].forEach(q=>{ if(Math.abs(t[q]-c[q])>0.004){ c[q]+=(t[q]-c[q])*k; ch=true; } else if(c[q]!==t[q]){ c[q]=t[q]; ch=true; } });
  if(ch){ paintAll(); painted=true; }
  if(Math.abs(SHIFT.tgt-SHIFT.cur)>0.3) SHIFT.cur+=(SHIFT.tgt-SHIFT.cur)*k; else SHIFT.cur=SHIFT.tgt;
  if(Math.abs(SHIFT.cur)>0.3) camera.setViewOffset(1600,900,-SHIFT.cur,0,1600,900); else camera.clearViewOffset();
  // fibers fade
  ['proj','comm','assoc','pns'].forEach(n=>{ const g=groups[n]; if(!g || g.userData.tgtOp===undefined) return; const cur=g.userData.op??0, tg=g.userData.tgtOp; if(Math.abs(tg-cur)>0.003){ g.userData.op=cur+(tg-cur)*k; applyFib(g); } else if(cur!==tg){ g.userData.op=tg; applyFib(g); } });
  // pulses
  const time=now/1000;
  pulses.forEach(pu=>{ if(!pu.grp.visible) return; if(pu.part){ const pp=parts[pu.part]; pu.mesh.visible = !!pp && pp.cur.op>0.35; if(!pu.mesh.visible) return; } if(pu.cut){ pu.mesh.visible=!fx.cut; if(fx.cut) return; } const tt=((time*pu.speed+pu.off)%1+1)%1; pu.curve.getPointAt(tt, pu.mesh.position); const s=Math.sin(tt*Math.PI); pu.mesh.scale.setScalar(0.4+0.9*s); });
  // neuron signal (도약전도)
  if(groups.neuron.visible){
    if(fx.signal){
      if(!paused) fx.sigT+=dt;
      const N=W.nodeX, cyc=N.length*0.32+0.8, tt=fx.sigT%cyc, idx=Math.min(N.length-1, Math.floor(tt/0.32));
      const f=Math.min(1,((tt%0.32)/0.32)/0.35);
      if(tt< N.length*0.32){ const x0=N[Math.max(0,idx-1)], x1=N[idx]; W.sig.position.set(idx===0?x1:x0+(x1-x0)*ease(f),0,0); W.sig.material.opacity=1; W.sigHalo.material.opacity=0.35+0.25*Math.sin(time*18); }
      else { W.sig.material.opacity=0; W.sigHalo.material.opacity=0; }
    } else { W.sig.material.opacity=0; W.sigHalo.material.opacity=0; }
    W.nt.forEach((q,i)=>{
      if(!fx.synapse){ q.m.material.opacity=0; return; }
      const b=W.bouton[i%W.bouton.length]; const tt=((time*0.45+q.off)%1);
      const tgtX=3.24;
      q.m.position.set(b.x+0.07+(tgtX-b.x-0.07)*tt*1.0, b.y+q.dy*tt + (0.12-b.y)*tt*0.6, b.z+q.dz*tt+(0.2-b.z)*tt*0.6);
      q.m.material.opacity=Math.sin(tt*Math.PI)*0.95;
    });
  }
  updLabels();
  renderer.render(scene,camera);
}

W.surf=function(F,U,minL){ return surfPoint(W.hemiL,F,U,minL); };
W.lp=function(names,o,fb){ if(W.realBrain){ const r=labelPoint(W.hemiL,names,o||{}); if(r) return r; } return fb?surfPoint(W.hemiL,fb[0],fb[1],fb[2]??0.5):surfPoint(W.hemiL,0,0,0.5); };
W.buildLate=function(){ buildAssoc(); };
W.three=()=>({scene,camera,renderer,world});
})();
