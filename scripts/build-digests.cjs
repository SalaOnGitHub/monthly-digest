'use strict';
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const topics=['world','finance','supply-chain'];
const catalog={};
const version='20261029-four-topics';
for(const topic of topics){
 const en=JSON.parse(fs.readFileSync(path.join(root,'data',topic+'-2026-10.en.json'),'utf8'));
 const de=JSON.parse(fs.readFileSync(path.join(root,'data',topic+'-2026-10.json'),'utf8'));
 if(en.items.length!==10||de.items.length!==10)throw Error(topic+': expected ten stories per language');
 catalog[topic]={en,de};
 const cutoff=en.asOf;
 const cutoffText=new Intl.DateTimeFormat('en-GB',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(cutoff+'T12:00:00Z'));
 const editionNote=en.editionNote||'Selected stories through '+cutoffText+' · The month is still in progress.';
 const articles=en.items.map((item,i)=>{
  if(!item.image?.src||!item.sources?.length)throw Error(topic+': missing image or sources at '+i);
  const sources=item.sources.map(source=>`<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.label)} ↗</a>`).join('');
  const kind=item.kind==='background'?(topic==='finance'?'Investor lens':'Standards explainer'):item.kind==='analysis'?'Industry analysis':'';
  const date=item.date?`<time class="story-date" datetime="${esc(item.date)}">${esc(item.date)}</time>`:'<span class="story-date">Background</span>';
  const dateNote=(item.kind==='background'?'Background explainer':item.kind==='analysis'?'Source publication date':'Story or source date')+' · Researched through '+cutoffText;
  return `<article class="digest-card" id="story-${i+1}" aria-labelledby="title-${i+1}"><div class="story-copy"><p class="story-meta"><span class="story-tag">${esc(item.tag)}</span>${date}${kind?`<span class="story-kind">${esc(kind)}</span>`:''}</p><h2 id="title-${i+1}">${esc(item.title)}</h2><p class="story-summary">${esc(item.summary)}</p><aside class="context"><p class="eyebrow" data-i18n="context">WHY IT MATTERS</p><p>${esc(item.whyItMatters)}</p></aside><div class="sources"><h3 data-i18n="sources">Sources &amp; further reading</h3>${sources}</div><p class="date-note">${esc(dateNote)}</p></div><figure class="story-figure"><img class="story-image" src="../../../${esc(item.image.src)}" alt="${esc(item.image.alt.en)}" width="960" height="720" loading="lazy" decoding="async"><figcaption><span class="photo-caption">${esc(item.image.caption.en)}</span><span class="photo-credit"><a href="${esc(item.image.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.image.credit)}</a> · <a href="${esc(item.image.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.image.license)}</a></span></figcaption></figure></article>`;
 }).join('\n');
 const list=en.items.map((item,i)=>`<li><a href="#${i+1}"><span>${String(i+1).padStart(2,'0')}</span>${esc(item.title)}</a></li>`).join('');
 const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${esc(en.intro)}"><meta name="theme-color" content="#f4f1ea"><title>${esc(en.title)} · October 2026 | Monthly Digest</title><link rel="stylesheet" href="../../../reader.css?v=${version}"><link rel="stylesheet" href="../../../language.css"><link rel="stylesheet" href="../../../typography.css?v=20261029-readable"><script src="../../../language.js?v=${version}" defer></script><script src="../../../news-data.js?v=${version}" defer></script><script src="../../../world-language.js?v=${version}" defer></script><script src="../../../reader.js" defer></script></head><body data-topic="${topic}"><a class="skip" href="#main" data-i18n="skip">Skip to content</a><div class="reader"><header class="reader-header"><a class="back-link" href="../../../index.html#${topic}">← ${esc(en.title)} archive</a><h1>${esc(en.title)} / October 2026</h1><div class="header-tools"><button type="button" id="open-overview" aria-haspopup="dialog" data-i18n="overview" data-i18n-label="overview">All 10 stories ☷</button><div data-language-switch></div></div></header><p class="edition-note">${esc(editionNote)}</p><main id="main" tabindex="-1">${articles}</main><footer class="reader-footer"><div class="progress-wrap"><span id="reader-count">01 / 10</span><progress id="reader-progress" value="1" max="10" data-i18n-label="progress" aria-label="Reading progress"></progress></div><div class="reader-controls"><button type="button" id="prev-story" data-i18n="previous" data-i18n-label="previous">← Previous</button><button type="button" id="next-story" data-i18n="next" data-i18n-label="next">Next →</button></div></footer><p class="keyboard-hint" data-i18n="keyboard">← → to browse · Home / End: first / last story · Share a story using its address</p><p id="reader-live" class="sr-only" aria-live="polite" aria-atomic="true"></p></div><dialog id="overview" aria-labelledby="overview-title"><header><div><p class="eyebrow" id="overview-label">${esc(en.title.toUpperCase())} / OCTOBER 2026</p><h2 id="overview-title" data-i18n="overviewTitle">The issue at a glance.</h2></div><button type="button" id="close-overview" data-i18n-label="close" aria-label="Close overview">×</button></header><ol>${list}</ol></dialog><noscript><p>JavaScript is disabled. All ten stories appear below one another.</p></noscript></body></html>`;
 const dir=path.join(root,'topics',topic,'2026-10');
 fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);
}
fs.writeFileSync(path.join(root,'news-data.js'),'window.digestCatalog = '+JSON.stringify(catalog,null,2)+';\n');
console.log('Built '+topics.length+' bilingual issues and catalog.');
