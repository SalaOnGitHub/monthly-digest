const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const catalog={};
for(const key of ['webtoons','manga','world']){
 const data=JSON.parse(fs.readFileSync(path.join(root,'data',key+'-2026-10.json'),'utf8'));
 if(data.items.length!==10)throw Error(key+' needs 10 stories');
 for(const item of data.items){if(!/^2026-10-(0[1-9]|1[0-9]|2[0-8])$/.test(item.date)||!item.sources?.length)throw Error('Invalid date/source: '+item.title);}
 catalog[key]=data;
 const back=key==='world'?'weltgeschehen':key;
 const title=escape(data.title);
 const list=data.items.map((item,i)=>'<li><a href="#'+(i+1)+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+escape(item.title)+'</a></li>').join('\n');
 const articles=data.items.map((item,i)=>{
  const date=item.date.split('-').reverse().join('.');
  const sources=item.sources.map(source=>'<a href="'+escape(source.url)+'" target="_blank" rel="noopener noreferrer">'+escape(source.label)+' <span aria-hidden="true">↗</span></a>').join('');
  return `<article class="digest-card" id="story-${i+1}" aria-labelledby="title-${i+1}">
<div class="story-copy"><p class="story-meta"><span>${escape(item.tag)}</span> <time datetime="${item.date}">${date}</time></p>
<h2 id="title-${i+1}">${escape(item.title)}</h2><p class="story-summary">${escape(item.summary)}</p>
<aside class="context"><p class="eyebrow">EINORDNUNG</p><p>${escape(item.whyItMatters)}</p></aside>
<div class="sources"><h3>Quellen &amp; Weiterlesen</h3>${sources}</div><p class="date-note">${escape(item.dateType||'Datum der Meldung oder des Ereignisses')} · Recherchiert bis 28.10.2026</p></div>
<div class="story-art" aria-hidden="true"><span class="art-topic">${title.toUpperCase()}</span><span class="art-circle"></span><span class="big-number">${String(i+1).padStart(2,'0')}</span><span class="art-issue">OKTOBER 2026<span>MONTHLY DIGEST</span></span></div>
</article>`;
 }).join('\n');
 const html=`<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escape(data.intro)}"><meta name="theme-color" content="#f4f1ea"><title>${title} · Oktober 2026 | Monthly Digest</title><link rel="stylesheet" href="../../../reader.css"><script src="../../../reader.js" defer></script></head>
<body data-topic="${back}"><a class="skip" href="#main">Zur aktuellen Meldung</a><div class="reader">
<header class="reader-header"><a class="back-link" href="../../../index.html#${back}">← ${title}-Archiv</a><h1>${title} <span>/ Oktober 2026</span></h1><button type="button" id="open-overview" aria-haspopup="dialog">Alle 10 Meldungen <span aria-hidden="true">☷</span></button></header>
<p class="edition-note">Ausgewählte Meldungen bis 28. Oktober 2026 · Der Monat ist noch nicht abgeschlossen.</p>
<main id="main" tabindex="-1">${articles}</main>
<footer class="reader-footer"><div class="progress-wrap"><span id="reader-count">01 / 10</span><progress id="reader-progress" value="1" max="10" aria-label="Fortschritt"></progress></div><div class="reader-controls"><button type="button" id="prev-story" aria-label="Vorherige Meldung">← <span>Zurück</span></button><button type="button" id="next-story" aria-label="Nächste Meldung"><span>Weiter</span> →</button></div></footer>
<p class="keyboard-hint">Mit ← → blättern · Home / End: erste / letzte Meldung · Einzelne Meldung über die Adresse teilen</p><p id="reader-live" class="sr-only" aria-live="polite" aria-atomic="true"></p>
</div>
<dialog id="overview" aria-labelledby="overview-title"><header><div><p class="eyebrow">${title.toUpperCase()} / OKTOBER 2026</p><h2 id="overview-title">Die Ausgabe auf einen Blick.</h2></div><button type="button" id="close-overview" aria-label="Übersicht schließen">×</button></header><ol>${list}</ol></dialog>
<noscript><p>JavaScript ist deaktiviert. Alle zehn Meldungen werden untereinander angezeigt.</p></noscript></body></html>`;
 const dir=path.join(root,'topics',key,'2026-10');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
fs.writeFileSync(path.join(root,'news-data.js'),'window.digestCatalog = '+JSON.stringify(catalog,null,2)+';\n');
console.log('Built 3 sourced digests with 30 stories and homepage catalog.');

