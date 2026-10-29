'use strict';
(() => {
  const supported=['en','de'];
  let saved;
  try { saved=localStorage.getItem('digest-language'); } catch {}
  const requested=new URLSearchParams(location.search).get('lang');
  let language=supported.includes(requested)?requested:supported.includes(saved)?saved:'en';
  if(supported.includes(requested)){try {localStorage.setItem('digest-language',language);}catch{}}
  const strings={
    en:{skip:'Skip to content',tagline:'One month. Your perspectives.',archive:'Monthly archive ↘',topics:'TWO TOPICS. ONE OVERVIEW.',latest:'Open October issue ↗',highlights:'highlights per issue',format:'Read. Understand. Explore.',previewLabel:'INSIDE THIS ISSUE',previewTitle:'This month at a glance.',previewNote:'Selected stories through October 28, 2026. The month is still in progress.',archiveTitle:'Browse the monthly archive.',footer:'AI. World news.',source:'Source on GitHub ↗',about:'About this digest',license:'MIT license',original:'AI archive based on the project by Niksa Visic ↗',back:'← World news archive',issueTitle:'World news / October 2026',overview:'All 10 stories ☷',editionNote:'Selected stories through October 28, 2026 · The month is still in progress.',context:'WHY IT MATTERS',sources:'Sources & further reading',dateNote:'Story or event date · Researched through October 28, 2026',previous:'← Previous',next:'Next →',keyboard:'← → to browse · Home / End: first / last story · Share a story using its address',overviewTitle:'The issue at a glance.',overviewLabel:'WORLD NEWS / OCTOBER 2026',close:'Close overview',progress:'Reading progress'},
    de:{skip:'Zum Inhalt',tagline:'Ein Monat. Deine Perspektiven.',archive:'Zum Monatsarchiv ↘',topics:'ZWEI THEMEN. EIN ÜBERBLICK.',latest:'Oktober-Ausgabe öffnen ↗',highlights:'Meldungen je Ausgabe',format:'Lesen. Einordnen. Weiterdenken.',previewLabel:'EIN BLICK IN DIE AUSGABE',previewTitle:'Das ist diesen Monat dabei.',previewNote:'Ausgewählte Meldungen bis 28. Oktober 2026. Der Monat ist noch nicht abgeschlossen.',archiveTitle:'Die Monate im Überblick.',footer:'KI. Weltgeschehen.',source:'Quellcode auf GitHub ↗',about:'Über diesen Digest',license:'MIT-Lizenz',original:'KI-Archiv nach dem Projekt von Niksa Visic ↗',back:'← Weltgeschehen-Archiv',issueTitle:'Weltgeschehen / Oktober 2026',overview:'Alle 10 Meldungen ☷',editionNote:'Ausgewählte Meldungen bis 28. Oktober 2026 · Der Monat ist noch nicht abgeschlossen.',context:'EINORDNUNG',sources:'Quellen & Weiterlesen',dateNote:'Datum der Meldung oder des Ereignisses · Recherchiert bis 28.10.2026',previous:'← Zurück',next:'Weiter →',keyboard:'Mit ← → blättern · Home / End: erste / letzte Meldung · Einzelne Meldung über die Adresse teilen',overviewTitle:'Die Ausgabe auf einen Blick.',overviewLabel:'WELTGESCHEHEN / OKTOBER 2026',close:'Übersicht schließen',progress:'Lesefortschritt'}
  };
  function text(key){return strings[language][key]||key;}
  function url(path){const value=new URL(path,location.href);value.searchParams.set('lang',language);return value.href;}
  function apply(){
    document.documentElement.lang=language;
    document.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=text(element.dataset.i18n);});
    document.querySelectorAll('[data-i18n-label]').forEach(element=>{element.setAttribute('aria-label',text(element.dataset.i18nLabel));});
    document.querySelectorAll('[data-language-switch]').forEach(group=>{
      group.setAttribute('aria-label',language==='en'?'Language':'Sprache');
      group.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    });
  }
  function change(value){
    if(!supported.includes(value)||value===language)return;
    language=value;
    try {localStorage.setItem('digest-language',language);}catch{}
    const next=new URL(location.href);next.searchParams.set('lang',language);history.replaceState(null,'',next);
    apply();window.dispatchEvent(new Event('digestlanguagechange'));
  }
  window.DigestLanguage={get:()=>language,text,url};
  document.querySelectorAll('[data-language-switch]').forEach(group=>{
    group.classList.add('language-switch');group.setAttribute('role','group');
    for(const value of supported){const button=document.createElement('button');button.type='button';button.lang=value;button.dataset.language=value;button.textContent=value.toUpperCase();button.setAttribute('aria-label',value==='en'?'Read in English':'Auf Deutsch lesen');button.addEventListener('click',()=>change(value));group.append(button);}
  });
  apply();
})();
