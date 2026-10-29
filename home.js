'use strict';
const topicCopy={
 en:{
 ai:{name:'AI',label:'AI MONTHLY DIGEST',first:'Understand AI.',second:'Month by month.',description:'Models, tools and the people behind them. Ten AI highlights in each issue, with sources to explore further.',cover:['Artificial intelligence.','Fresh perspectives.'],symbol:'✳',path:'months/2026-10/index.html',count:10,note:'October 2026 · 10 slides',archive:'Ten issues from January to October 2026. Ten slides each, with sources and image credits.',archiveNote:'Based on the original project by Niksa Visic · English originals with German translations'},
 world:{name:'World news',label:'WORLD MONTHLY DIGEST',first:'What is shaping',second:'the world around us.',description:'Politics, society, economics and science. A selection of international developments, clearly summarised with sources for further reading.',cover:['The world in focus.','A month in perspective.'],symbol:'◎',path:'topics/world/2026-10/index.html',count:1,dataKey:'world',note:'October 2026 · 10 stories · As of October 28',archive:'Your archive begins with October 2026. Future issues will appear here.',archiveNote:'Research cutoff: October 28, 2026 · Selected highlights; the month is still in progress'}
 },
 de:{
 ai:{name:'KI',label:'KI MONTHLY DIGEST',first:'KI verstehen.',second:'Monat für Monat.',description:'Modelle, Werkzeuge und die Menschen dahinter. Zehn KI-Highlights pro Ausgabe – kompakt auf Folien, mit Quellen zum Weiterlesen.',cover:['Künstliche Intelligenz.','Neue Perspektiven.'],symbol:'✳',path:'months/2026-10/index.html',count:10,note:'Oktober 2026 · 10 Folien',archive:'Zehn Ausgaben von Jänner bis Oktober 2026. Jeweils zehn Folien mit Quellen und Bildnachweisen.',archiveNote:'Nach dem Originalprojekt von Niksa Visic · Englische Originale mit deutscher Übersetzung'},
 world:{name:'Weltgeschehen',label:'WELT MONTHLY DIGEST',first:'Was die Welt',second:'gerade bewegt.',description:'Politik, Gesellschaft, Wirtschaft und Wissenschaft. Eine Auswahl internationaler Entwicklungen – verständlich zusammengefasst und mit Quellen zum Nachlesen.',cover:['Die Welt im Blick.','Ein Monat in Perspektive.'],symbol:'◎',path:'topics/world/2026-10/index.html',count:1,dataKey:'world',note:'Oktober 2026 · 10 Meldungen · Stand 28.10.',archive:'Dein Archiv startet mit Oktober 2026. Neue Ausgaben finden hier ihren Platz.',archiveNote:'Recherche-Stand: 28. Oktober 2026 · Auswahl, kein vollständiger Monatsrückblick'}
 }};
const monthNames={en:['January','February','March','April','May','June','July','August','September','October'],de:['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober']};
const tabButtons=[...document.querySelectorAll('[role="tab"]')];let activeKey='ai';
const L=window.DigestLanguage;
function setText(id,value){const e=document.getElementById(id);if(e)e.textContent=value;}
function makeMonthCard(month,href,latest){
 const de=L.get()==='de',link=document.createElement('a');link.className='month-card'+(latest?' latest':'');link.href=L.url(href);
 const top=document.createElement('span');top.className='month-top';top.textContent='2026';
 if(latest){const badge=document.createElement('span');badge.className='latest-label';badge.textContent=de?'AKTUELL':'LATEST';top.append(badge);}
 const title=document.createElement('h3');title.textContent=month;
 const bottom=document.createElement('span');bottom.className='month-bottom';bottom.textContent=de?'10 Meldungen':'10 highlights';
 const arrow=document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');bottom.append(arrow);link.append(top,title,bottom);return link;
}
function renderTopic(key,announce=true){
 if(key==='weltgeschehen')key='world';if(!topicCopy.en[key])key='ai';activeKey=key;
 const lang=L.get(),de=lang==='de',topic=topicCopy[lang][key];
 document.body.dataset.topic=key;document.title=topic.name+' · Monthly Digest';
 tabButtons.forEach(button=>{const active=button.dataset.topic===key;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
 document.querySelector('.topic-navigation')?.setAttribute('aria-label',de?'Digest-Themen':'Digest topics');
 document.querySelector('[role="tablist"]')?.setAttribute('aria-label',de?'Thema auswählen':'Choose a topic');
 document.querySelector('.brand')?.setAttribute('aria-label',de?'Monthly Digest Startseite':'Monthly Digest home');
 document.getElementById('topic-panel')?.setAttribute('aria-labelledby','tab-'+key);
 setText('ai-tab-name',topicCopy[lang].ai.name);setText('world-tab-name',topicCopy[lang].world.name);
 setText('topic-label',topic.label);setText('headline-first',topic.first);setText('headline-second',topic.second);setText('topic-description',topic.description);setText('latest-note',topic.note);setText('cover-topic',topic.label);setText('cover-symbol',topic.symbol);setText('cover-date',de?'OKT / 2026':'OCT / 2026');setText('cover-label',de?'DIE OKTOBER-AUSGABE':'THE OCTOBER ISSUE');
 const coverTitle=document.getElementById('cover-title');if(coverTitle)coverTitle.replaceChildren(document.createTextNode(topic.cover[0]),document.createElement('br'),document.createTextNode(topic.cover[1]));
 for(const id of ['latest-link','cover-link']){const link=document.getElementById(id);if(link)link.href=L.url(topic.path);}
 document.getElementById('cover-link')?.setAttribute('aria-label',de?topic.name+'-Digest für Oktober 2026 öffnen':'Open the October 2026 '+topic.name+' digest');
 setText('issue-count',String(topic.count).padStart(2,'0'));setText('issue-count-label',de?(topic.count===1?'Ausgabe im Archiv':'Ausgaben im Archiv'):(topic.count===1?'issue in the archive':'issues in the archive'));
 setText('language-label',de?'Sprache frei wählen':'Choose your language');
 setText('archive-label',de?'DEIN '+topic.name.toUpperCase()+'-ARCHIV':'YOUR '+topic.name.toUpperCase()+' ARCHIVE');
 setText('archive-description',topic.archive);setText('archive-note',topic.archiveNote);
 const grid=document.getElementById('month-grid');if(grid)grid.replaceChildren(...(key==='ai'?Array.from({length:10},(_,i)=>{const n=10-i;return makeMonthCard(monthNames[lang][n-1],'months/2026-'+String(n).padStart(2,'0')+'/index.html',i===0);}):[makeMonthCard(monthNames[lang][9],topic.path,true)]));
 const data=window.digestCatalog?.[topic.dataKey]?.[lang];
 const preview=document.getElementById('issue-preview');if(preview)preview.hidden=!data;
 const previews=document.getElementById('story-preview');
 if(previews)previews.replaceChildren(...(data?.items||[]).slice(0,3).map((item,index)=>{
  const link=document.createElement('a');link.className='story-teaser';link.href=L.url(topic.path+'#'+(index+1));
  const label=document.createElement('span');label.className='teaser-label';label.textContent='0'+(index+1)+' / '+item.tag;
  const title=document.createElement('h3');title.textContent=item.title;
  const footer=document.createElement('span');footer.className='teaser-footer';footer.textContent=de?'Meldung lesen ↗':'Read story ↗';link.append(label,title,footer);return link;
 }));
 if(announce)setText('topic-announcement',de?topic.name+': '+topic.count+' '+(topic.count===1?'Ausgabe':'Ausgaben')+' verfügbar.':topic.name+': '+topic.count+' '+(topic.count===1?'issue':'issues')+' available.');
}
function chooseTopic(key){if(location.hash==='#'+key)renderTopic(key);else location.hash=key;}
tabButtons.forEach((button,index)=>{
 button.addEventListener('click',()=>chooseTopic(button.dataset.topic));
 button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabButtons.length;if(event.key==='ArrowLeft')next=(index-1+tabButtons.length)%tabButtons.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabButtons.length-1;if(next===undefined)return;event.preventDefault();tabButtons[next].focus();chooseTopic(tabButtons[next].dataset.topic);});
});
window.addEventListener('hashchange',()=>{const key=location.hash.slice(1);if(topicCopy.en[key]||key==='weltgeschehen')renderTopic(key);});
window.addEventListener('digestlanguagechange',()=>renderTopic(activeKey));
renderTopic(location.hash.slice(1),false);

