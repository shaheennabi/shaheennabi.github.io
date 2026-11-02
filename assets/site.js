(()=>{const c=document.getElementById('mesh');
if(c){const x=c.getContext('2d'),R=matchMedia('(prefers-reduced-motion:reduce)').matches,N=[[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[2,1],[1,1],[1,2],[0,2],[0,1]],P=[0,4,8];
let W,H,s,ox,oy,t=0,m={x:-999,y:-999};
const fit=()=>{const d=devicePixelRatio||1;W=c.clientWidth;H=c.clientHeight;c.width=W*d;c.height=H*d;x.setTransform(d,0,0,d,0,0);s=Math.min(W/5,H/4);ox=(W-s*4.6)/2;oy=(H-s*3.4)/2};
const pt=n=>[ox+N[n][0]*s*1.2+s*.5,oy+N[n][1]*s*1.2+s*.5];
const at=u=>{const i=Math.floor(u)%12,f=u%1,a=pt(i),b=pt((i+1)%12);return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]};
const rr=(X,Y,w,r)=>{x.beginPath();x.roundRect?x.roundRect(X,Y,w,w,r):x.rect(X,Y,w,w)};
function draw(){x.clearRect(0,0,W,H);
x.lineWidth=2;x.strokeStyle='rgba(108,75,255,.28)';x.beginPath();N.forEach((_,i)=>{const p=pt(i);i?x.lineTo(...p):x.moveTo(...p)});x.closePath();x.stroke();
const pk=P.map(o=>at((t*1.1+o)%12));
N.forEach((n,i)=>{const X=ox+n[0]*s*1.2,Y=oy+n[1]*s*1.2,cx=X+s/2,cy=Y+s/2;
let h=.3+.18*Math.sin(t*.8+i*.9);pk.forEach(p=>h+=.65*Math.exp(-Math.hypot(p[0]-cx,p[1]-cy)/(s*.45)));h+=.5*Math.exp(-Math.hypot(m.x-cx,m.y-cy)/(s*.9));h=Math.min(h,1);
const hue=h<.5?190+h*2*65:255+(h-.5)*2*85;
x.fillStyle=`hsl(${hue} 90% ${92-h*28}%)`;x.strokeStyle='rgba(21,24,59,.55)';x.lineWidth=1.5;rr(X,Y,s,s*.22);x.fill();x.stroke();
x.fillStyle='rgba(21,24,59,.7)';x.font=`600 ${s*.2}px "Bricolage Grotesque",sans-serif`;x.textAlign='center';x.fillText('d'+i,cx,cy+s*.07)});
pk.forEach(p=>{x.fillStyle='#ff5c93';x.shadowColor='#ff5c93';x.shadowBlur=14;x.beginPath();x.arc(p[0],p[1],5,0,7);x.fill();x.shadowBlur=0})}
const loop=()=>{t+=.016;draw();if(!R)requestAnimationFrame(loop)};
c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();m={x:e.clientX-r.left,y:e.clientY-r.top};if(R)draw()});
c.addEventListener('pointerleave',()=>m={x:-999,y:-999});
addEventListener('resize',()=>{fit();draw()});fit();t=2;loop()}
document.querySelectorAll('.flow').forEach(f=>{const b=[...f.querySelectorAll('button')];
b.forEach(k=>k.addEventListener('click',()=>b.forEach(j=>{const on=j===k;j.setAttribute('aria-selected',on);document.getElementById(j.dataset.p).hidden=!on})))})})();
