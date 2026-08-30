const glow=document.querySelector('.cursor-glow');
const progress=document.querySelector('.progress');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('pointermove',e=>{if(glow)glow.animate({left:`${e.clientX}px`,top:`${e.clientY}px`},{duration:650,fill:'forwards',easing:'ease-out'});});
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?(scrollY/max)*100:0}%`;});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count),start=performance.now();const tick=now=>{const p=Math.min((now-start)/1400,1),ease=1-Math.pow(1-p,3);el.textContent=Math.round(target*ease);if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.75});
counters.forEach(el=>counterObserver.observe(el));

if(!reduce){document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.16,y=(e.clientY-r.top-r.height/2)*.16;el.style.transform=`translate(${x}px,${y}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});document.querySelectorAll('.magnetic-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-6px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});}

const canvas=document.querySelector('#particles'),ctx=canvas?.getContext('2d');
if(canvas&&ctx&&!reduce){let w,h,dots=[];const resize=()=>{w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';dots=Array.from({length:Math.min(95,Math.floor(innerWidth/14))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.2+.3}))};resize();addEventListener('resize',resize);const draw=()=>{ctx.clearRect(0,0,w,h);dots.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r*devicePixelRatio,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.35)';ctx.fill();for(let j=i+1;j<dots.length;j++){const q=dots[j],dx=p.x-q.x,dy=p.y-q.y,dist=Math.hypot(dx,dy);if(dist<130*devicePixelRatio){ctx.strokeStyle=`rgba(255,255,255,${.045*(1-dist/(130*devicePixelRatio))})`;ctx.lineWidth=devicePixelRatio;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}});requestAnimationFrame(draw)};draw();}

document.querySelectorAll('video').forEach(video=>video.play().catch(()=>{}));

const hero=document.querySelector('.hero-content');
window.addEventListener('scroll',()=>{if(!hero||reduce)return;const y=Math.min(scrollY*.08,80);hero.style.transform=`translateY(${y}px)`;hero.style.opacity=Math.max(0,1-scrollY/850);});
