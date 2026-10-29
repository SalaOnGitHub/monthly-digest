'use strict';
// Shared localization for the world, finance and supply-chain readers.
(() => {
 const L=window.DigestLanguage;
 const topic=document.body.dataset.topic;
 function render(){
  const lang=L.get(),de=lang==='de',data=window.digestCatalog[topic][lang];
  const month=de?'Oktober':'October';
  const formatDate=date=>new Intl.DateTimeFormat(de?'de-AT':'en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
  const cutoff=formatDate(data.asOf);
  document.title=data.title+' · '+month+' 2026 | Monthly Digest';
  const back=document.querySelector('.back-link');
  back.href=L.url('../../../index.html#'+topic);back.textContent='← '+data.title+(de?' – Archiv':' archive');
  document.querySelector('.reader-header h1').textContent=data.title+' / '+month+' 2026';
  document.querySelector('.edition-note').textContent=data.editionNote||(de?'Ausgewählte Meldungen bis '+cutoff+' · Der Monat ist noch nicht abgeschlossen.':'Selected stories through '+cutoff+' · The month is still in progress.');
  document.getElementById('overview-label').textContent=data.title.toUpperCase()+' / '+month.toUpperCase()+' 2026';
  document.querySelector('meta[name="description"]').content=data.intro;
  document.querySelectorAll('.digest-card').forEach((card,index)=>{
   const item=data.items[index];if(!item)return;
   card.querySelector('.story-tag').textContent=item.tag;
   const date=card.querySelector('.story-date');
   date.textContent=item.date?formatDate(item.date):(de?'Hintergrund':'Background');
   const kind=card.querySelector('.story-kind');
   if(kind)kind.textContent=item.kind==='background'?(topic==='finance'?(de?'Anlegerwissen':'Investor lens'):(de?'Standard erklärt':'Standards explainer')):(de?'Branchenanalyse':'Industry analysis');
   card.querySelector('h2').textContent=item.title;
   card.querySelector('.story-summary').textContent=item.summary;
   card.querySelector('.context .eyebrow').textContent=data.contextLabel||L.text('context');
   card.querySelector('.context p:last-child').textContent=item.whyItMatters;
   card.querySelector('.story-image').alt=item.image.alt[lang];
   card.querySelector('.photo-caption').textContent=item.image.caption[lang];
   const sources=card.querySelector('.sources');
   sources.querySelectorAll('a').forEach(link=>link.remove());
   for(const source of item.sources){const link=document.createElement('a');link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=source.label+' ↗';sources.append(link);}
   const basis=item.kind==='background'?(de?'Hintergrundwissen':'Background explainer'):item.kind==='analysis'?(de?'Veröffentlichungsdatum der Quelle':'Source publication date'):(de?'Datum der Meldung oder Quelle':'Story or source date');
   card.querySelector('.date-note').textContent=basis+' · '+(de?'Recherchiert bis ':'Researched through ')+cutoff;
  });
  document.querySelectorAll('#overview li a').forEach((link,index)=>{const number=link.querySelector('span');link.replaceChildren(number,document.createTextNode(data.items[index].title));});
 }
 window.addEventListener('digestlanguagechange',render);render();
})();
