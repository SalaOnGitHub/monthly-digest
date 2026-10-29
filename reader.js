'use strict';
const stories=[...document.querySelectorAll('.digest-card')];
const previous=document.getElementById('prev-story');
const next=document.getElementById('next-story');
const overview=document.getElementById('overview');
const overviewButton=document.getElementById('open-overview');
let current=0;
let touchStart=null;
function hashIndex(){const value=location.hash.slice(1);if(!/^\d+$/.test(value))return 0;return Math.max(0,Math.min(stories.length-1,Number(value)-1));}
function show(index,updateUrl=true,scroll=true){
 if(!stories.length)return;
 current=Math.max(0,Math.min(stories.length-1,index));
 stories.forEach((story,i)=>{story.hidden=i!==current;story.inert=i!==current;});
 if(previous)previous.disabled=current===0;if(next)next.disabled=current===stories.length-1;
 const count=document.getElementById('reader-count');if(count)count.textContent=String(current+1).padStart(2,'0')+' / '+stories.length;
 const progress=document.getElementById('reader-progress');if(progress)progress.value=current+1;
 const live=document.getElementById('reader-live');if(live){const de=window.DigestLanguage?.get()==='de';live.textContent=(de?'Meldung ':'Story ')+(current+1)+(de?' von ':' of ')+stories.length+': '+stories[current].querySelector('h2')?.textContent;}
 if(updateUrl)history.replaceState(null,'','#'+(current+1));
 if(scroll)window.scrollTo({top:0,behavior:'instant'});
}
previous?.addEventListener('click',()=>show(current-1));next?.addEventListener('click',()=>show(current+1));
document.addEventListener('keydown',event=>{
 if(overview?.open||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
 if(event.target instanceof Element&&event.target.closest('input,textarea,select,[contenteditable=true]'))return;
 const keys={ArrowLeft:current-1,PageUp:current-1,ArrowRight:current+1,PageDown:current+1,Home:0,End:stories.length-1};
 if(Object.hasOwn(keys,event.key)){event.preventDefault();show(keys[event.key]);}
});
window.addEventListener('hashchange',()=>show(hashIndex(),false));
overviewButton?.addEventListener('click',()=>overview?.showModal());
document.getElementById('close-overview')?.addEventListener('click',()=>overview?.close());
overview?.addEventListener('close',()=>overviewButton?.focus());
overview?.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
 event.preventDefault();const index=Number(link.hash.slice(1))-1;overview.close();show(index);document.getElementById('main')?.focus({preventScroll:true});
}));
const main=document.getElementById('main');
main?.addEventListener('touchstart',event=>{const t=event.changedTouches[0];touchStart=t?{x:t.clientX,y:t.clientY}:null;},{passive:true});
main?.addEventListener('touchend',event=>{const t=event.changedTouches[0];if(!touchStart||!t)return;const x=touchStart.x-t.clientX,y=touchStart.y-t.clientY;touchStart=null;if(Math.abs(x)>65&&Math.abs(x)>Math.abs(y)*1.5)show(current+(x>0?1:-1));},{passive:true});
show(hashIndex(),true,false);
window.addEventListener('digestlanguagechange',()=>show(current,false,false));
