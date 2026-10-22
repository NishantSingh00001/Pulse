/* ============================================================
   Pulse — shared engine, chrome, motion, icons (multi-page)
   No emojis anywhere.
   ============================================================ */
'use strict';
const $=id=>document.getElementById(id);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch=matchMedia('(hover:none)').matches;

/* ---------- icon system ---------- */
const ICON={
  today:'M3 11l9-8 9 8M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10',
  habits:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  insights:'M4 20V10M10 20V4M16 20v-7M2 20h20',
  trophy:'M7 4h10v4a5 5 0 01-10 0zM7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3M9 15h6l1 5H8z',
  settings:'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
  menu:'M3 6h18M3 12h18M3 18h18',
  sun:'M12 7a5 5 0 100 10 5 5 0 000-10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4',
  moon:'M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z',
  plus:'M12 5v14M5 12h14',
  close:'M6 6l12 12M18 6L6 18',
  check:'M5 13l4 4L19 7',
  chevron:'M9 6l6 6-6 6',
  more:'M5 12h.01M12 12h.01M19 12h.01',
  trash:'M4 7h16M10 7V4h4v3M6 7l1 13h10l1-13',
  copy:'M9 9h10a1 1 0 011 1v10a1 1 0 01-1 1H9a1 1 0 01-1-1V10a1 1 0 011-1zM5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1',
  download:'M12 4v12M7 11l5 5 5-5M4 20h16',
  upload:'M12 16V4M7 9l5-5 5 5M4 20h16',
  search:'M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3',
  refresh:'M4 12a8 8 0 0114-5.3L20 8M20 4v4h-4M20 12a8 8 0 01-14 5.3L4 16M4 20v-4h4',
  key:'M15 7a4 4 0 100 8 4 4 0 000-8zM11.5 11H3v3M7 11v3',
  bolt:'M13 2L4 14h7l-1 8 9-12h-7z',
  fire:'M12 3c2 3 1 5 3 7 1.5 1.5 2 3 2 5a5 5 0 01-10 0c0-2 1-3 2-4 .5 2 2 2 2 2 .5-2-1-5-1-10z',
  bell:'M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8M10 21h4',
  tag:'M4 4h7l9 9-7 7-9-9zM7.5 7.5h.01',
  edit:'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  dup:'M9 9h10a1 1 0 011 1v10a1 1 0 01-1 1H9a1 1 0 01-1-1V10a1 1 0 011-1zM5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1',
  archive:'M3 7h18v3H3zM5 10v10h14V10M9 14h6',
  star:'M12 3l2.6 5.6L21 9.3l-4.5 4.2L17.6 20 12 16.8 6.4 20l1.1-6.5L3 9.3l6.4-.7z',
  bulb:'M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.7.6 1 1.2 1 2v.5h6V15c0-.8.3-1.4 1-2A6 6 0 0012 3z'
};
/* emoji-free habit glyphs the user picks from */
const HABITICONS={
  drop:'M12 3C9 7 6 10 6 14a6 6 0 0012 0c0-4-3-7-6-11z',
  book:'M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM19 3v18',
  run:'M13 4a2 2 0 110 0M7 21l3-5 3 2 1 3M10 16l-1-5 4-2 2 3 3 1M13 9l3-1',
  lotus:'M12 4c2 3 2 5 0 8-2-3-2-5 0-8zM5 10c3 1 5 3 5 6-3 0-5-2-6-5zM19 10c-1 3-3 5-6 5 0-3 2-5 6-6zM3 15c3 2 6 3 9 3s6-1 9-3c-2 3-5 5-9 5s-7-2-9-5z',
  food:'M6 3v7a2 2 0 004 0V3M8 3v18M16 3c-2 0-3 2-3 5s1 4 3 4v9',
  sleep:'M3 12a9 9 0 0018 0 7 7 0 01-9-9 9 9 0 00-9 9zM15 4h4l-4 4h4',
  pen:'M4 20h4L19 9l-4-4L4 16z',
  music:'M9 18V5l11-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM20 16a3 3 0 11-6 0 3 3 0 016 0z',
  brain:'M9 4a3 3 0 00-3 3 3 3 0 00-1 5 3 3 0 002 5 3 3 0 006 0V4a3 3 0 00-3 0M15 7a3 3 0 011 5 3 3 0 01-2 5',
  lift:'M4 8v8M7 6v12M17 6v12M20 8v8M7 12h10',
  nosmoke:'M3 15h14v3H3zM20 12v6M17 15h3M4 4l16 16',
  leaf:'M4 20C4 10 12 4 20 4c0 8-6 16-16 16zM4 20c4-6 8-8 12-9',
  sunrise:'M12 3v5M5.6 10.6l-1.4-1.4M18.4 10.6l1.4-1.4M3 16h4a5 5 0 0110 0h4M2 20h20M8 16a4 4 0 018 0',
  target:'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8a4 4 0 100 8 4 4 0 000-8zM12 11a1 1 0 100 2 1 1 0 000-2',
  walk:'M13 4a1.5 1.5 0 110 0M11 8l2 2 3 1M11 8l-2 5 2 2 1 5M9 13l-2 3',
  heart:'M12 20s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z',
  water:'M12 3C9 7 6 10 6 14a6 6 0 0012 0c0-4-3-7-6-11z',
  cup:'M4 8h13v4a5 5 0 01-5 5H9a5 5 0 01-5-5zM17 9h2a2 2 0 010 4h-2M5 21h12'
};
const HABITICON_KEYS=Object.keys(HABITICONS);
function icon(n,sz){sz=sz||18;const p=ICON[n]||HABITICONS[n]||'';const round=(n==='more')?' stroke-width="2.6" stroke-linecap="round"':' stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';return '<svg class="ic ic-'+n+'" width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor"'+round+' aria-hidden="true"><path d="'+p+'"/></svg>';}
function logoMark(){return '<span class="mk">'+'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2-6 4 14 3-9 2 3h5"/></svg>'+'</span>';}

/* ---------- state ---------- */
const LS='pulse_mp';
const PALETTE=['#ff5d73','#a06bff','#54e6b0','#ffce5c','#5aa9ef','#ff9e6d','#49c0c0','#c86bff'];
const ACCS=[['#ff5d73','#a06bff'],['#54e6b0','#5aa9ef'],['#ffce5c','#ff5d73'],['#a06bff','#5aa9ef'],['#ff9e6d','#ff5d73']];
const DEF={habits:[],xp:0,settings:{theme:'dark',accent:'#ff5d73',accent2:'#a06bff'}};
function loadS(){try{const s=JSON.parse(localStorage.getItem(LS)||'null');return s&&s.settings?s:JSON.parse(JSON.stringify(DEF));}catch(e){return JSON.parse(JSON.stringify(DEF));}}
let S=loadS();
function save(){localStorage.setItem(LS,JSON.stringify(S));}
function uid(){return Date.now()+''+Math.floor(Math.random()*999);}
function esc(s){return(s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}

/* ---------- dates ---------- */
function keyOf(d){return d.toISOString().slice(0,10);}
function dk(off){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-off);return keyOf(d);}
function dow(dateStr){return new Date(dateStr+'T12:00').getDay();}

/* ---------- completion logic ---------- */
function val(h,k){const e=h.log[k];return e==null?0:(typeof e==='object'?(e.v||0):e);}
function entry(h,k){const e=h.log[k];return(e&&typeof e==='object')?e:(e?{v:e}:null);}
function isDone(h,k){if(h.type==='quit')return !(entry(h,k)&&entry(h,k).slip);const v=val(h,k);return h.target>0? v>=h.target : v>0;}
function isSkip(h,k){const e=entry(h,k);return e&&e.skip;}
function required(h,k){if(h.freq.mode==='days')return h.freq.days.includes(dow(k));return true;}
function streak(h){let s=0;for(let i=0;i<500;i++){const k=dk(i);if(h.type==='quit'){const e=entry(h,k);if(e&&e.slip)break;if(k<h.created.slice(0,10))break;s++;continue;}if(isSkip(h,k))continue;if(!required(h,k))continue;if(isDone(h,k))s++;else{if(i===0)continue;break;}}return s;}
function bestStreak(h){const keys=Object.keys(h.log).filter(k=>isDone(h,k)).sort();let b=0,cur=0,prev=null;keys.forEach(k=>{if(prev){const diff=Math.round((new Date(k)-new Date(prev))/864e5);cur=diff===1?cur+1:1;}else cur=1;b=Math.max(b,cur);prev=k;});return Math.max(b,streak(h));}
function rate(h,days){let req=0,done=0;for(let i=0;i<days;i++){const k=dk(i);if(h.type==='quit'){req++;if(isDone(h,k))done++;continue;}if(isSkip(h,k))continue;if(!required(h,k))continue;req++;if(isDone(h,k))done++;}return req?Math.round(done/req*100):0;}
function weekCount(h){let c=0;for(let i=0;i<7;i++)if(isDone(h,dk(i)))c++;return c;}
function bestWeekday(h){const cnt=[0,0,0,0,0,0,0],tot=[0,0,0,0,0,0,0];Object.keys(h.log).forEach(k=>{const d=dow(k);tot[d]++;if(isDone(h,k))cnt[d]++;});let bi=0,bv=-1;for(let i=0;i<7;i++){const r=tot[i]?cnt[i]/tot[i]:0;if(cnt[i]>0&&r>bv){bv=r;bi=i;}}return['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][bi];}
function atRisk(h){if(h.type==='quit')return false;if(h.freq.mode==='days'&&!required(h,dk(0)))return false;return streak(h)>0&&!isDone(h,dk(0))&&!isSkip(h,dk(0));}
function activeHabits(){return S.habits.filter(h=>!h.archived);}

/* ---------- xp / level ---------- */
function addXP(n){S.xp=Math.max(0,(S.xp||0)+n);}
function level(){return Math.floor(Math.sqrt((S.xp||0)/60))+1;}
function levelProg(){const l=level();const base=(l-1)*(l-1)*60,next=l*l*60;return Math.round(((S.xp-base)/(next-base))*100);}

/* ---------- actions ---------- */
function toggleDay(id,k,anim){const h=S.habits.find(x=>x.id===id);if(!h)return;const was=isDone(h,k);
  if(h.type==='quit'){const e=entry(h,k)||{};if(e.slip)delete h.log[k];else h.log[k]={slip:1};}
  else if(h.target>0){if(was)delete h.log[k];else h.log[k]={v:h.target};}
  else{if(was)delete h.log[k];else h.log[k]=1;}
  const now=isDone(h,k);if(now&&!was)addXP(10);else if(!now&&was)addXP(-10);save();if(window.onData)window.onData(anim&&now?id:null);}
function toggleToday(id){toggleDay(id,dk(0),true);}
function stepQuantity(id,k,delta){const h=S.habits.find(x=>x.id===id);if(!h)return;const was=isDone(h,k);let v=val(h,k)+delta;if(v<=0)delete h.log[k];else h.log[k]={v};const now=isDone(h,k);if(now&&!was)addXP(10);else if(!now&&was)addXP(-10);save();if(window.onData)window.onData();}
function setSkip(id,k){const h=S.habits.find(x=>x.id===id);if(!h)return;const e=entry(h,k);if(e&&e.skip)delete h.log[k];else h.log[k]={skip:1};save();if(window.onData)window.onData();toast('Rest day toggled');}

/* ---------- achievements ---------- */
const ACH=[
 {id:'first',ic:'star',t:'First step',d:'Log any habit once',test:()=>S.habits.some(h=>Object.keys(h.log).length>0)},
 {id:'three',ic:'target',t:'Juggler',d:'Run 3 habits at once',test:()=>activeHabits().length>=3},
 {id:'w7',ic:'fire',t:'Week streak',d:'7-day streak',test:()=>S.habits.some(h=>bestStreak(h)>=7)},
 {id:'w30',ic:'trophy',t:'Month streak',d:'30-day streak',test:()=>S.habits.some(h=>bestStreak(h)>=30)},
 {id:'c100',ic:'check',t:'Centurion',d:'100 check-ins',test:()=>S.habits.reduce((a,h)=>a+Object.keys(h.log).length,0)>=100},
 {id:'perfect',ic:'bolt',t:'Perfect day',d:'All habits done in a day',test:()=>{const t=activeHabits().filter(h=>required(h,dk(0)));return t.length>=2&&t.every(h=>isDone(h,dk(0)));}},
 {id:'lv5',ic:'bulb',t:'Level 5',d:'Reach level 5',test:()=>level()>=5},
 {id:'quit',ic:'leaf',t:'Breaking free',d:'3-day quit streak',test:()=>S.habits.some(h=>h.type==='quit'&&streak(h)>=3)}
];

/* ---------- coach ---------- */
function offlineCoach(){const hs=activeHabits();if(!hs.length)return 'Add your first habit and start tiny — momentum beats intensity.';const today=hs.filter(h=>required(h,dk(0)));const done=today.filter(h=>isDone(h,dk(0))).length;const risk=hs.filter(atRisk);const top=hs.reduce((a,h)=>streak(h)>streak(a)?h:a,hs[0]);
  if(risk.length)return '"'+risk[0].name+'" has a '+streak(risk[0])+'-day streak still open today. Two minutes now keeps the chain alive — do the smallest version.';
  if(done===0)return 'Fresh day. Start with the easiest one — momentum is a tiny tick, not a big push.';
  if(done===today.length)return 'Every scheduled habit done today. You are Level '+level()+' and '+streak(top)+' days deep on "'+top.name+'". Rest well.';
  return done+' of '+today.length+' done. The rule that beats everything: never miss twice in a row.';}
const KEY='pulse_key',MODELS=['gemini-2.0-flash-lite','gemini-flash-latest','gemini-2.0-flash'];
function hasKey(){return !!localStorage.getItem(KEY);}
async function aiCoach(el){const key=localStorage.getItem(KEY);if(!key){openKey();return;}el.textContent='Thinking…';const hs=activeHabits();
  const summary=hs.map(h=>h.name+'('+h.type+'): streak '+streak(h)+', best '+bestStreak(h)+', today '+(isDone(h,dk(0))?'done':'open')+', 30d '+rate(h,30)+'%').join('; ');
  const prompt='You are a warm, specific habit coach. From this data write 2 encouraging sentences (max 45 words, no lists). Data: '+summary;
  try{for(const m of MODELS){const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+m+':generateContent?key='+key,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:.9}})});if(!r.ok)continue;const j=await r.json();el.textContent=j.candidates[0].content.parts[0].text.trim();return;}el.textContent=offlineCoach();}catch(e){el.textContent=offlineCoach();}}
function openKey(){$('keyIn').value=localStorage.getItem(KEY)||'';$('keyScrim').classList.add('on');}
function saveKey(){const k=$('keyIn').value.trim();if(k)localStorage.setItem(KEY,k);closeAll();toast('Coach key saved');}

/* ---------- data io ---------- */
function dl(name,mime,data){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:mime}));a.download=name;a.click();}
function exportJSON(){dl('pulse-backup.json','application/json',JSON.stringify(S,null,2));toast('Backup downloaded');}
function exportCSV(){let rows=[['habit','date','value','done']];S.habits.forEach(h=>Object.keys(h.log).forEach(k=>rows.push([JSON.stringify(h.name),k,val(h,k),isDone(h,k)])));dl('pulse-history.csv','text/csv',rows.map(r=>r.join(',')).join('\n'));toast('CSV downloaded');}
function importJSON(f){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(d.habits){S=d;}else if(Array.isArray(d)){S.habits=d;}save();applyTheme();if(window.onData)window.onData();toast('Backup restored');}catch(e){toast('Could not read that file');}};r.readAsText(f);}
function shareCard(){const hs=activeHabits();const done=hs.filter(h=>isDone(h,dk(0))).length;const top=hs.reduce((a,h)=>streak(h)>streak(a)?h:a,hs[0]||{});const txt='My Pulse today: '+done+'/'+hs.length+' habits done · '+(top.name?streak(top)+'-day streak on '+top.name:'')+' · Level '+level()+'.';if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>toast('Progress card copied'),()=>toast('Copy failed'));}
function resetAll(){if(confirm('Erase all habits and data? This cannot be undone.')){S={habits:[],xp:0,settings:S.settings};save();if(window.onData)window.onData();toast('Everything reset');}}

/* ---------- theme ---------- */
function applyTheme(){document.documentElement.setAttribute('data-theme',S.settings.theme);document.documentElement.style.setProperty('--acc',S.settings.accent);document.documentElement.style.setProperty('--acc2',S.settings.accent2);const b=$('themeBtn');if(b)b.innerHTML=icon(S.settings.theme==='dark'?'sun':'moon');}
function toggleTheme(){S.settings.theme=S.settings.theme==='dark'?'light':'dark';save();applyTheme();}
function setAccent(a,b){S.settings.accent=a;S.settings.accent2=b;save();applyTheme();document.querySelectorAll('.ad').forEach(x=>x.classList.toggle('on',x.dataset.a===a));}

/* ---------- chrome ---------- */
const NAVLINKS=[['index.html','today','Home'],['today.html','today','Today'],['habits.html','habits','Habits'],['insights.html','insights','Insights'],['achievements.html','trophy','Achievements'],['settings.html','settings','Settings']];
function buildChrome(){
  const here=(location.pathname.split('/').pop()||'index.html')||'index.html';
  const bar=$('topbar');
  if(bar){bar.className='bar';bar.innerHTML='<div class="in">'+
    '<a class="logo" href="index.html" data-mag>'+logoMark()+'Pulse</a>'+
    '<button class="iconbtn navtoggle" id="navToggle" data-press aria-label="Menu">'+icon('menu')+'</button>'+
    '<nav class="nav" id="nav">'+NAVLINKS.map(([h,ic,label])=>'<a href="'+h+'" class="'+(h===here?'on':'')+'">'+label+'</a>').join('')+'</nav>'+
    '<div class="spacer"></div>'+
    '<div class="accents" id="accents">'+ACCS.map(([a,b])=>'<button class="ad'+(a===S.settings.accent?' on':'')+'" data-a="'+a+'" data-press style="background:linear-gradient(135deg,'+a+','+b+')" aria-label="Accent"></button>').join('')+'</div>'+
    '<button class="iconbtn" id="themeBtn" data-press title="Theme (T)" aria-label="Theme"></button>'+
    '<a class="pill primary" href="habits.html" data-press>'+icon('plus',15)+' New habit</a>'+
    '</div>';
    $('themeBtn').onclick=toggleTheme;
    document.querySelectorAll('#accents .ad').forEach(b=>b.onclick=()=>setAccent(b.dataset.a,ACCS.find(x=>x[0]===b.dataset.a)[1]));
    $('navToggle').onclick=()=>$('nav').classList.toggle('open');
  }
  if(!$('toast'))document.body.insertAdjacentHTML('beforeend','<div class="toast" id="toast"></div>');
  if(!$('keyScrim'))document.body.insertAdjacentHTML('beforeend','<div class="scrim" id="keyScrim"><div class="modal" style="max-width:460px"><h3>AI coach key<button class="close" data-press onclick="closeAll()">'+icon('close')+'</button></h3><p>Pulse has a smart offline coach built in. Add a free Gemini key (from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">Google AI Studio</a>) for personalised tips. Stored only in this browser.</p><div class="fld" style="margin-top:0"><input type="password" id="keyIn" placeholder="AIza…"></div><button class="save" data-press onclick="saveKey()">Save key</button></div></div>');
  if(!document.getElementById('gooFilter'))document.body.insertAdjacentHTML('afterbegin','<svg id="gooFilter" width="0" height="0" style="position:absolute"><defs><filter id="gooflt"><feGaussianBlur in="SourceGraphic" stdDeviation="19" result="b"/><feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -13" result="g"/><feBlend in="SourceGraphic" in2="g"/></filter></defs></svg>');
  if(!document.getElementById('pulse-goo')){const c=document.createElement('canvas');c.id='pulse-goo';document.body.prepend(c);}
  if(!document.querySelector('.vig')){document.body.insertAdjacentHTML('afterbegin','<div class="vig"></div><div class="grain"></div>');}
  if(!document.querySelector('.cur-ring'))document.body.insertAdjacentHTML('beforeend','<div class="cur-ring"></div><div class="cur-dot"></div>');
  applyTheme();initCursor();initGoo();
  addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;if(e.key==='t'||e.key==='T')toggleTheme();});
}
let tt;function toast(m){const t=$('toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),1900);}
function closeAll(){document.querySelectorAll('.scrim').forEach(s=>s.classList.remove('on'));document.querySelectorAll('.menupop').forEach(m=>m.remove());}
addEventListener('pointerdown',e=>{const t=e.target.closest('[data-press]');if(t)t.classList.add('press');});
['pointerup','pointercancel','pointerleave'].forEach(ev=>addEventListener(ev,()=>document.querySelectorAll('.press').forEach(e=>e.classList.remove('press'))));

/* cursor */
function initCursor(){if(reduce||touch)return;document.body.classList.add('cur');const ring=document.querySelector('.cur-ring'),dot=document.querySelector('.cur-dot');if(!ring)return;let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';const tText=e.target.closest('input[type=text],input:not([type]),textarea,input[type=password]');const tHov=e.target.closest('button,a,.check,.cell,.ad,.cc,.ip,.mood,.toggle,label,[data-press]');ring.classList.toggle('txt',!!tText);ring.classList.toggle('hov',!!tHov&&!tText);},{passive:true});
  addEventListener('pointerdown',()=>ring.classList.add('down'));addEventListener('pointerup',()=>ring.classList.remove('down'));
  (function loop(){rx+=(mx-rx)*.2;ry+=(my-ry)*.2;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  addEventListener('pointermove',e=>{document.querySelectorAll('[data-mag],.pill.primary,.save,.coachbtn').forEach(el=>{const r=el.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2,dx=e.clientX-cx,dy=e.clientY-cy,d=Math.hypot(dx,dy);if(d<70)el.style.transform='translate('+dx*.16+'px,'+dy*.24+'px)';else el.style.transform='';});},{passive:true});
}
/* immersive gooey metaball field — cursor-reactive, themed to accents */
function initGoo(){const cv=document.getElementById('pulse-goo');if(!cv)return;if(reduce){cv.style.display='none';return;}
  const ctx=cv.getContext('2d');let W,H;let mx=innerWidth*.35,my=innerHeight*.5;
  function hx(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  function sz(){W=cv.width=innerWidth;H=cv.height=innerHeight;}sz();addEventListener('resize',sz);
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;},{passive:true});
  const blobs=[];for(let i=0;i<7;i++)blobs.push({x:Math.random(),y:Math.random(),r:110+Math.random()*170,a:Math.random()*6.28,sp:.2+Math.random()*.5,ci:i%3});
  let t=0;function frame(){t+=.01;ctx.clearRect(0,0,W,H);
    const cols=[hx(getComputedStyle(document.documentElement).getPropertyValue('--acc').trim()||'#ff4d6d'),hx(getComputedStyle(document.documentElement).getPropertyValue('--acc2').trim()||'#9d7bff'),hx(getComputedStyle(document.documentElement).getPropertyValue('--amb').trim()||'#ffb067')];
    blobs.forEach((b,i)=>{b.a+=b.sp*.01;let px=(b.x+Math.cos(b.a)*.13)*W,py=(b.y+Math.sin(b.a*1.1)*.13)*H;if(i<3){px+=(mx-px)*.05;py+=(my-py)*.05;}
      const c=cols[b.ci];const g=ctx.createRadialGradient(px,py,0,px,py,b.r);g.addColorStop(0,'rgba('+c[0]+','+c[1]+','+c[2]+',1)');g.addColorStop(1,'rgba('+c[0]+','+c[1]+','+c[2]+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,b.r,0,6.29);ctx.fill();});
    requestAnimationFrame(frame);}
  frame();
}
function initReveals(){const els=document.querySelectorAll('.reveal');if(!els.length)return;if(!('IntersectionObserver'in window)||reduce){els.forEach(e=>e.classList.add('in'));return;}const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}}),{threshold:.12});els.forEach(e=>io.observe(e));}

/* ---------- shared habit card ---------- */
function habitCard(h,opts){opts=opts||{};const k=dk(0),s=streak(h),bs=bestStreak(h),pct=rate(h,30),done=isDone(h,k),risk=atRisk(h);
  const d=document.createElement('div');d.className='habit';d.style.setProperty('--hc',h.color);
  let ctrl;
  if(h.type==='quit'){ctrl='<button class="check '+(done?'done':'')+(opts.anim===h.id&&done?' pop':'')+'" style="'+(done?'background:'+h.color+';border-color:transparent':'')+'" title="Stayed clean today">'+icon(done?'check':'close',24)+'</button>';}
  else if(h.target>0){const v=val(h,k),p=Math.min(1,v/h.target),C=2*Math.PI*25;
    ctrl='<div class="step"><button class="sbtn up" data-press>'+icon('plus',15)+'</button><button class="sbtn dn" data-press>'+icon('close',13)+'</button></div>'+
    '<div class="ring"><svg width="58" height="58"><circle cx="29" cy="29" r="25" stroke="var(--panel2)" stroke-width="5" fill="none"/><circle cx="29" cy="29" r="25" stroke="'+h.color+'" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(C*(1-p))+'"/></svg><div class="v" style="color:'+(p>=1?h.color:'var(--ink)')+'">'+v+'<span style="font-size:9px;color:var(--mut)">/'+h.target+'</span></div></div>';}
  else{ctrl='<button class="check '+(done?'done':'')+(opts.anim===h.id&&done?' pop':'')+'" style="'+(done?'background:'+h.color+';border-color:transparent':'')+'" title="Mark today">'+(done?icon('check',26):'')+'</button>';}
  const tagHtml=(h.tags||[]).length?'<div class="tags">'+h.tags.map(t=>'<span class="tag">#'+esc(t)+'</span>').join('')+'</div>':'';
  const weekHtml=h.freq.mode==='week'?'<span class="seg">week <b>'+weekCount(h)+'/'+h.freq.times+'</b></span>':'';
  d.innerHTML='<div class="hh"><div class="hemoji" style="background:linear-gradient(140deg,'+h.color+','+h.color+'cc)">'+icon(h.icon||'target',24)+'</div>'+
   '<div class="hmeta"><div class="hname">'+esc(h.name)+(h.target>0?' <span class="qt">'+h.target+' '+esc(h.unit||'')+'</span>':'')+(h.type==='quit'?' <span class="qt">quit</span>':'')+'</div>'+tagHtml+
   '<div class="hstreaks"><span class="seg fire">'+icon('fire',14)+' <b>'+s+'</b></span><span class="seg">best <b>'+bs+'</b></span><span class="seg">30d <b>'+pct+'%</b></span>'+weekHtml+(risk?'<span class="seg atrisk">'+icon('bell',13)+' keep it alive</span>':'')+'</div></div>'+
   '<div class="ctrl">'+ctrl+'<button class="menu" title="More">'+icon('more',18)+'</button></div></div>'+
   (opts.heat?'<div class="pct"><div class="f" style="width:'+pct+'%;background:'+h.color+'"></div></div><div class="heat" style="margin-top:14px"><div class="heatgrid"></div><div class="heatlabel"><span>20 weeks ago</span><span>today</span></div></div>':'');
  const chk=d.querySelector('.check');if(chk)chk.onclick=()=>toggleToday(h.id);
  const up=d.querySelector('.sbtn.up'),dn=d.querySelector('.sbtn.dn');if(up)up.onclick=()=>stepQuantity(h.id,k,1);if(dn)dn.onclick=()=>stepQuantity(h.id,k,-1);
  d.querySelector('.menu').onclick=e=>{if(window.openCardMenu)window.openCardMenu(e,h.id);};
  if(opts.heat)buildHeat(d.querySelector('.heatgrid'),h);
  return d;}
function buildHeat(grid,h){grid.innerHTML='';const weeks=20,total=weeks*7;const days=[];for(let i=total-1;i>=0;i--)days.push(dk(i));
  const firstDow=dow(days[0]);for(let p=0;p<firstDow;p++){const c=document.createElement('div');c.className='cell';c.style.visibility='hidden';grid.appendChild(c);}
  days.forEach(k=>{const c=document.createElement('div');c.className='cell';const done=isDone(h,k),skip=isSkip(h,k);if(done&&h.type!=='quit'){const v=val(h,k),p=h.target>0?Math.min(1,v/h.target):1;c.style.background=h.color;c.style.opacity=.4+p*.6;}else if(h.type==='quit'&&!(entry(h,k)&&entry(h,k).slip)&&k>=h.created.slice(0,10)){c.style.background=h.color;c.style.opacity=.5;}else if(skip)c.classList.add('skip');c.title=k+(done?' done':'');c.dataset.press='';c.onclick=e=>{if(e.shiftKey)setSkip(h.id,k);else toggleDay(h.id,k);};grid.appendChild(c);});}

/* ---------- demo seed (first run only) ---------- */
function ensureSeed(){if(S.habits.length||localStorage.getItem('pulse_seeded'))return;localStorage.setItem('pulse_seeded','1');
  const demo={id:uid(),created:new Date(Date.now()-25*864e5).toISOString(),name:'Drink water',icon:'water',color:'#5aa9ef',type:'build',target:8,unit:'glasses',freq:{mode:'daily',times:3,days:[1,2,3,4,5]},tags:['health'],notes:'Stay sharp.',reminder:'',log:{},archived:false,order:1};
  for(let i=1;i<24;i++){if(Math.random()>.3)demo.log[dk(i)]={v:4+Math.floor(Math.random()*5)};}
  const d2={id:uid(),created:new Date(Date.now()-18*864e5).toISOString(),name:'Read',icon:'book',color:'#a06bff',type:'build',target:0,unit:'',freq:{mode:'daily',times:3,days:[1,2,3,4,5]},tags:['mind'],notes:'',reminder:'',log:{},archived:false,order:2};
  for(let i=1;i<18;i++){if(Math.random()>.4)d2.log[dk(i)]=1;}
  S.habits=[demo,d2];S.xp=180;save();}

/* ---------- boot ---------- */
function boot(){ensureSeed();buildChrome();if(window.initPage)window.initPage();initReveals();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,0));else setTimeout(boot,0);
