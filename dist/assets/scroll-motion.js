/* ExemptLink: alternating, repeatable section entrances with native scrolling. */
(()=>{
 'use strict';
 if(!('IntersectionObserver' in window)||!Element.prototype.animate)return;
 const preference=matchMedia('(prefers-reduced-motion:reduce)');
 const states=new Map();let lastY=scrollY,direction=1;
 addEventListener('scroll',()=>{if(Math.abs(scrollY-lastY)>2){direction=scrollY>lastY?1:-1;lastY=scrollY}},{passive:true});
 const protectedScene='.sequence-shell,.visual-frame,.preview-workbench,.source-document,.hero-invoice,.atlas-geography,.control-boundary,.demo-app,.intake-form,.auth-form,.workflow-evidence';
 const groups='.content-cards,.offer-grid,.steps,.evidence-questions,.feature-grid,.evaluation-columns,.scope-stats,.go-stop,.pricing-layout,.decision-flow,.process-list,.content-grid,.source-list,.legal-copy,.checklist-article';
 const pairs='.section-heading,.split-section,.editorial-panel,.persona-panel,.pilot-price,.intake-layout,.article-layout,.scope-ribbon,.research-status,.cta-panel';
 function blocked(){return preference.matches||document.body.classList.contains('reduced-motion')}
 function paused(){return document.hidden||document.body.classList.contains('motion-paused')}
 function register(el,index,total){
  if(states.has(el)||el.matches(protectedScene)||el.closest('.demo-app,form')||el.matches('form')||el.hasAttribute('hidden'))return;
  el.dataset.scrollEntrance=index%2?'right':'left';
  states.set(el,{index,total,armed:true,animation:null,runs:0});observer.observe(el);
 }
 function enter(el,state){
  if(blocked()||paused()||el.contains(document.activeElement))return;
  state.animation?.cancel();
  const distance=innerWidth<700?22:44;
  const x=el.dataset.scrollEntrance==='left'?-distance:distance;
  const order=direction>0?state.index:state.total-1-state.index;
  state.animation=el.animate([{translate:x+'px 10px',opacity:.55},{translate:'0px 0px',opacity:1}],{duration:700,delay:Math.min(order%6,4)*85,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
  state.runs++;el.dataset.scrollRuns=String(state.runs);el.dataset.scrollDirection=direction>0?'down':'up';
  state.animation.addEventListener('finish',()=>{state.animation=null},{once:true});
 }
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   const state=states.get(entry.target);
   if(!entry.isIntersecting){state.armed=true;state.animation?.cancel();state.animation=null;return}
   if(state.armed){state.armed=false;enter(entry.target,state)}
  });
 },{threshold:0,rootMargin:'0px 0px -5% 0px'});
 function visit(parent){
  const children=[...parent.children].filter(el=>!el.matches('script,style'));
  children.forEach((el,i)=>{
   if(el.matches(groups)||el.matches(pairs)){
    const parts=[...el.children];parts.forEach((part,j)=>{
     if(part.matches(groups)||part.matches(pairs))visit(el);
     else register(part,j,parts.length);
    });
   }else register(el,i,children.length);
  });
 }
 document.querySelectorAll('main > section:not(.page-hero):not(.home-hero) > .container').forEach(container=>{
  container.parentElement.classList.add('scroll-choreography');visit(container);
 });
 function sync(){
  states.forEach((state,el)=>{
   if(blocked()){state.animation?.cancel();state.animation=null;return}
   if(paused()){state.animation?.pause();return}
   if(state.animation?.playState==='paused')state.animation.play();
  });
 }
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
 document.addEventListener('focusin',event=>{states.forEach((state,el)=>{if(el.contains(event.target)){state.animation?.cancel();state.animation=null}})});
 sync();
})();
