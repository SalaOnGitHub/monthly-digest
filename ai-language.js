'use strict';
(() => {
 const slides=[...document.querySelectorAll('.slide')];
 const originals=slides.map(slide=>({title:slide.querySelector('.slide__title')?.textContent,bodyHtml:slide.querySelector('.slide__body')?.innerHTML,alt:slide.querySelector('img')?.alt}));
 const englishMonths=['January','February','March','April','May','June','July','August','September','October','November','December'];
 const germanMonths=['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
 const month=Number(location.pathname.match(/months\/\d{4}-(\d{2})/)?.[1]||1)-1;
 const creditNodes=[];
 document.querySelectorAll('.slide__credit').forEach(credit=>{
  const walker=document.createTreeWalker(credit,NodeFilter.SHOW_TEXT);let node;
  while((node=walker.nextNode()))creditNodes.push([node,node.textContent]);
 });
 function render(){
  const de=window.DigestLanguage.get()==='de';
  const data=de?window.aiGermanSlides:originals;
  const monthName=(de?germanMonths:englishMonths)[month]+' 2026';
  document.title=monthName+' | AI Monthly Digest';
  const heading=document.querySelector('.deck__title');if(heading)heading.textContent=monthName;
  const home=document.querySelector('.deck__home');if(home){home.textContent=de?'Alle KI-Ausgaben':'All AI digests';home.href=window.DigestLanguage.url('../../index.html#ai');}
  const hint=document.querySelector('.deck__hint');if(hint)hint.textContent=de?'Mit Pfeiltasten oder Buttons blättern':'Use arrow keys or buttons to navigate';
  const skip=document.querySelector('.deck__skip');if(skip)skip.textContent=de?'Zu den Folien':'Skip to slides';
  document.querySelector('.slides')?.setAttribute('aria-label',de?'Monatsausgabe':'Monthly slide deck');
  const prev=document.querySelector('[data-action="prev"]');if(prev){prev.textContent=de?'Zurück':'Previous';prev.setAttribute('aria-label',de?'Vorherige Folie':'Go to previous slide');}
  const next=document.querySelector('[data-action="next"]');if(next){next.textContent=de?'Weiter':'Next';next.setAttribute('aria-label',de?'Nächste Folie':'Go to next slide');}
  slides.forEach((slide,index)=>{
    const story=data?.[index]||originals[index];
    const title=slide.querySelector('.slide__title');if(title)title.textContent=story.title;
    const body=slide.querySelector('.slide__body');if(body)body.innerHTML=story.bodyHtml;
    const image=slide.querySelector('img');if(image)image.alt=story.alt;
    const accent=slide.querySelector('.slide__accent');if(accent)accent.textContent=(index+1)+(de?' von ':' of ')+slides.length;
  });
  for(const [node,original] of creditNodes)node.textContent=de?original.replace(/Image:/g,'Bild:').replace(/Source:/g,'Quelle:').replace(/\bSource\b/g,'Quelle').replace(/\bReporting\b/g,'Bericht'):original;
 }
 window.addEventListener('digestlanguagechange',render);render();
})();
