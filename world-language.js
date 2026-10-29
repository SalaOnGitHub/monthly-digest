'use strict';
(() => {
 const L=window.DigestLanguage;
 function render(){
  const lang=L.get(),de=lang==='de',data=window.digestCatalog.world[lang];
  document.title=data.title+' · '+(de?'Oktober':'October')+' 2026 | Monthly Digest';
  const back=document.querySelector('.back-link');if(back)back.href=L.url('../../../index.html#world');
  document.querySelectorAll('.digest-card').forEach((card,index)=>{
   const item=data.items[index];if(!item)return;
   card.querySelector('.story-meta>span').textContent=item.tag;
   card.querySelector('time').textContent=new Intl.DateTimeFormat(lang==='de'?'de-AT':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(item.date+'T12:00:00Z'));
   card.querySelector('h2').textContent=item.title;
   card.querySelector('.story-summary').textContent=item.summary;
   card.querySelector('.context p:last-child').textContent=item.whyItMatters;
   card.querySelector('.story-image').alt=item.image.alt[lang];
   card.querySelector('.photo-caption').textContent=item.image.caption[lang];
   card.querySelectorAll('.sources a').forEach((link,i)=>{link.textContent=item.sources[i].label+' ↗';});
  });
  document.querySelectorAll('#overview li a').forEach((link,index)=>{const number=link.querySelector('span');link.replaceChildren(number,document.createTextNode(data.items[index].title));});
 }
 window.addEventListener('digestlanguagechange',render);render();
})();
