'use strict';
const monthNames=['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober'];
const topics={
 ai:{name:'KI',label:'AI MONTHLY DIGEST',first:'KI verstehen.',second:'Monat für Monat.',description:'Modelle, Werkzeuge und die Menschen dahinter. Zehn KI-Highlights pro Ausgabe – kompakt auf Folien, mit Links zum Weiterlesen.',cover:['Künstliche Intelligenz.','Neue Perspektiven.'],symbol:'✳',path:'months/2026-10/index.html',count:10,note:'Oktober 2026 · 10 Folien · Original auf Englisch'},
 webtoons:{name:'Webtoons',label:'WEBTOON MONTHLY DIGEST',first:'Neue Kapitel.',second:'Neue Lieblingswelten.',description:'Was sich in der Webtoon-Welt bewegt: Serien, Adaptionen und Entwicklungen auf den Plattformen. Dein Monatsüberblick mit Quellen zum Weiterentdecken.',cover:['Geschichten, die','weitergehen.'],symbol:'✦',path:'topics/webtoons/2026-10/index.html',count:1,dataKey:'webtoons',note:'Oktober 2026 · 10 Meldungen · Deutsch · Stand 28.10.'},
 manga:{name:'Manga',label:'MANGA MONTHLY DIGEST',first:'Seite für Seite.',second:'Auf dem Laufenden.',description:'Neue Bände, Lizenzen und Geschichten aus der Manga-Welt. Zehn ausgewählte Meldungen – mit dem jeweiligen Markt und den Originalquellen im Blick.',cover:['Neue Bände.','Neue Entdeckungen.'],symbol:'※',path:'topics/manga/2026-10/index.html',count:1,dataKey:'manga',note:'Oktober 2026 · 10 Meldungen · Deutsch · Stand 28.10.'},
 weltgeschehen:{name:'Weltgeschehen',label:'WORLD MONTHLY DIGEST',first:'Was die Welt',second:'gerade bewegt.',description:'Politik, Gesellschaft, Wirtschaft und Wissenschaft. Eine Auswahl internationaler Entwicklungen – verständlich zusammengefasst und mit Quellen zum Nachlesen.',cover:['Die Welt im Blick.','Ein Monat in Perspektive.'],symbol:'◎',path:'topics/world/2026-10/index.html',count:1,dataKey:'world',note:'Oktober 2026 · 10 Meldungen · Deutsch · Stand 28.10.'}
};
const tabButtons=[...document.querySelectorAll('[role="tab"]')];
function setText(id,value){const element=document.getElementById(id);if(element)element.textContent=value;}
function makeMonthCard(month,href,latest){
 const link=document.createElement('a');link.className='month-card'+(latest?' latest':'');link.href=href;
 const top=document.createElement('span');top.className='month-top';top.textContent='2026';
 if(latest){const badge=document.createElement('span');badge.className='latest-label';badge.textContent='AKTUELL';top.append(badge);}
 const title=document.createElement('h3');title.textContent=month;
 const bottom=document.createElement('span');bottom.className='month-bottom';bottom.textContent='10 Meldungen';
 const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');bottom.append(arrow);
 link.append(top,title,bottom);return link;
}
function renderTopic(key,announce=true){
 if(!topics[key])key='ai';const topic=topics[key];
 document.body.dataset.topic=key;document.title=topic.name+' · Monthly Digest';
 tabButtons.forEach(button=>{const active=button.dataset.topic===key;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
 document.getElementById('topic-panel')?.setAttribute('aria-labelledby','tab-'+key);
 setText('topic-label',topic.label);setText('headline-first',topic.first);setText('headline-second',topic.second);setText('topic-description',topic.description);setText('latest-note',topic.note);setText('cover-topic',topic.label);setText('cover-symbol',topic.symbol);
 const coverTitle=document.getElementById('cover-title');if(coverTitle)coverTitle.replaceChildren(document.createTextNode(topic.cover[0]),document.createElement('br'),document.createTextNode(topic.cover[1]));
 for(const id of ['latest-link','cover-link']){const link=document.getElementById(id);if(link)link.href=topic.path;}
 document.getElementById('cover-link')?.setAttribute('aria-label',topic.name+'-Digest für Oktober 2026 öffnen');
 setText('issue-count',String(topic.count).padStart(2,'0'));setText('issue-count-label',topic.count===1?'Ausgabe im Archiv':'Ausgaben im Archiv');
 setText('language-short',key==='ai'?'EN':'DE');setText('language-label',key==='ai'?'Originalausgaben':'Mit Quellenlinks');
 setText('archive-label','DEIN '+topic.name.toUpperCase()+'-ARCHIV');
 setText('archive-description',key==='ai'?'Zehn Originalausgaben von Jänner bis Oktober 2026. Jeweils zehn Folien mit Quellen und Bildnachweisen.':'Dein Archiv startet mit Oktober 2026. Neue Ausgaben finden hier ihren Platz.');
 setText('archive-note',key==='ai'?'Aus dem Originalprojekt von Niksa Visic · Englisch':'Recherche-Stand: 28. Oktober 2026 · Auswahl, kein vollständiger Monatsrückblick');
 const monthGrid=document.getElementById('month-grid');
 if(monthGrid){const cards=key==='ai'?Array.from({length:10},(_,i)=>{const n=10-i;return makeMonthCard(monthNames[n-1],'months/2026-'+String(n).padStart(2,'0')+'/index.html',i===0);}):[makeMonthCard('Oktober',topic.path,true)];monthGrid.replaceChildren(...cards);}
 const data=window.digestCatalog?.[topic.dataKey];const preview=document.getElementById('issue-preview');if(preview)preview.hidden=!data;
 const previews=document.getElementById('story-preview');
 if(previews)previews.replaceChildren(...(data?.items||[]).slice(0,3).map((item,index)=>{
   const link=document.createElement('a');link.className='story-teaser';link.href=topic.path+'#'+(index+1);
   const label=document.createElement('span');label.className='teaser-label';label.textContent='0'+(index+1)+' / '+item.tag;
   const title=document.createElement('h3');title.textContent=item.title;
   const footer=document.createElement('span');footer.className='teaser-footer';footer.textContent='Meldung lesen ↗';link.append(label,title,footer);return link;
 }));
 if(announce)setText('topic-announcement',topic.name+': '+topic.count+' '+(topic.count===1?'Ausgabe':'Ausgaben')+' verfügbar.');
}
function chooseTopic(key){if(location.hash==='#'+key)renderTopic(key);else location.hash=key;}
tabButtons.forEach((button,index)=>{
 button.addEventListener('click',()=>chooseTopic(button.dataset.topic));
 button.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowRight')next=(index+1)%tabButtons.length;
  if(event.key==='ArrowLeft')next=(index-1+tabButtons.length)%tabButtons.length;
  if(event.key==='Home')next=0;if(event.key==='End')next=tabButtons.length-1;
  if(next===undefined)return;event.preventDefault();tabButtons[next].focus();chooseTopic(tabButtons[next].dataset.topic);
 });
});
window.addEventListener('hashchange',()=>{const key=location.hash.slice(1);if(topics[key])renderTopic(key);});
renderTopic(topics[location.hash.slice(1)]?location.hash.slice(1):'ai',false);

