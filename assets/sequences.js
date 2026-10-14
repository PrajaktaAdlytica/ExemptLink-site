(()=>{
 const media=matchMedia('(prefers-reduced-motion:reduce)');
 const header=document.querySelector('.site-header');let scheduled=false;
 function updateHeader(){header.classList.toggle('is-scrolled',scrollY>16);scheduled=false}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateHeader)}},{passive:true});updateHeader();
 const recipes=[
  ['[data-reviewed-loop]','reviewed-loop','Scope → link → human review → proposed action → preserve','reviewed evidence loop'],
  ['.atlas-geography','atlas','Locate → trace','jurisdiction map'],
  ['.hero-invoice','invoice','Candidate → hold','invoice evidence'],
  ['.source-document','source','Entity → state → source','certificate source'],
  ['.mini-link','linkage','Sale → candidate','transaction linkage'],
  ['.mini-request','request','Draft → approval gate','request draft'],
  ['.mini-checks','checks','Inspect each field','jurisdiction checklist'],
  ['.mini-stack','packet','Index → versions → decisions','audit packet'],
  ['.mini-bars','bars','GL → engine → evidence','reconciliation'],
  ['.preview-workbench','workbench','Queue → source → correction','evidence workbench'],
  ['.control-boundary','boundary','Read → suggest → blocked action','permission boundary']
 ];
 const workflows=[
 ['transaction-linkage','Sale → source → mismatch review','transaction linkage'],
 ['certificate-remediation','Exception → request draft → owner gate','certificate remediation'],
 ['jurisdiction-checklists','State context → source → field review','jurisdiction checklist'],
 ['audit-packets','Sources → versions → indexed review trail','audit packet'],
 ['monthly-reconciliation','GL → engine → evidence → difference','monthly reconciliation']
 ];
 workflows.forEach(([slug,caption,name])=>{
  recipes.unshift(['[data-workflow-hero="'+slug+'"]','workflow-hero',caption,name+' hero']);
  recipes.unshift(['[data-workflow-evidence="'+slug+'"]','workflow-evidence',caption,name+' evidence']);
 });
 const states=[];
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const root=entry.target;root.classList.toggle('sequence-offscreen',!entry.isIntersecting);
  if(entry.isIntersecting&&!root.dataset.sequenceStarted){root.dataset.sequenceStarted='true';root.classList.add('sequence-running')}
 }),{threshold:.16});
 function replay(root){if(media.matches)return;root.classList.remove('sequence-running');void root.offsetWidth;root.classList.add('sequence-running');root.dataset.sequenceStarted='true'}
 recipes.forEach(([selector,type,caption,name])=>document.querySelectorAll(selector).forEach((root)=>{
  if(root.closest('[data-workflow-hero],[data-workflow-evidence],[data-reviewed-loop]') && !root.matches('[data-workflow-hero],[data-workflow-evidence],[data-reviewed-loop]'))return;
  root.classList.add('sequence-ready');root.dataset.sequence=type;
  if(type==='reviewed-loop'){
   const delays=[0,700,1400,2800,3500];
   root.querySelectorAll('.mobile-flow > div').forEach((row,i)=>{row.classList.add('loop-mobile-step');row.style.setProperty('--loop-delay',delays[i]+'ms')});
   root.querySelector('.scene-mobile > .badge')?.classList.add('loop-mobile-gate');
  }
  if(type==='workflow-hero'){
   const parts=root.querySelectorAll('.scene-svg > .settle,.scene-svg > .trace,.scene-svg > .bar');
   parts.forEach((part,i)=>{
    part.setAttribute('data-motion-stage',part.classList.contains('trace')?'trace':part.classList.contains('bar')?'bar':'panel');
    part.style.setProperty('--stage-delay',i*650+'ms');
    if(part.tagName.toLowerCase()==='g')part.querySelectorAll('text').forEach((text,j)=>{text.setAttribute('data-motion-stage','ink');text.style.setProperty('--stage-delay',(i*650+j*110+180)+'ms')});
   });
   root.querySelectorAll('.scene-mobile > *').forEach((part,i)=>{part.setAttribute('data-motion-stage','panel');part.style.setProperty('--stage-delay',i*450+'ms')});
  }
  if(type==='workflow-evidence'){
   const mini=root.firstElementChild;
   mini.setAttribute('data-motion-stage','panel');mini.style.setProperty('--stage-delay','0ms');
   mini.querySelectorAll(':scope > div,:scope > b,:scope > span,:scope > i').forEach((part,i)=>{
    part.setAttribute('data-motion-stage',part.matches('.mini-connector,.mock-line')?'line':'panel');part.style.setProperty('--stage-delay',400+i*400+'ms');
   });
   mini.querySelectorAll('.mini-bars i').forEach((bar,i)=>{bar.setAttribute('data-motion-stage','bar');bar.style.setProperty('--stage-delay',400+i*650+'ms')});
   const meta=root.querySelector('.detail-meta');meta.setAttribute('data-motion-stage','panel');meta.style.setProperty('--stage-delay','2000ms');
   [...meta.children].forEach((part,i)=>{part.setAttribute('data-motion-stage','ink');part.style.setProperty('--stage-delay',2200+Math.floor(i/2)*650+'ms')});
  }
  if(type==='workflow-hero'){
   root.querySelectorAll('.scene-mobile .mini-link > div,.scene-mobile .mini-link > i,.scene-mobile .mini-request > *,.scene-mobile .mini-checks > div,.scene-mobile .mini-stack > div,.scene-mobile .mini-bars > div').forEach((part,i)=>{
    part.setAttribute('data-motion-stage',part.matches('.mini-connector,.mock-line')?'line':'panel');part.style.setProperty('--stage-delay',600+i*400+'ms');
   });
   root.querySelectorAll('.scene-mobile .mini-bars i').forEach((part,i)=>{part.setAttribute('data-motion-stage','bar');part.style.setProperty('--stage-delay',600+i*650+'ms')});
  }
  if(type==='workflow-hero'||type==='workflow-evidence')root.querySelectorAll('.stack-sheet.front > span:not(.tiny)').forEach((part,i)=>{part.setAttribute('data-motion-stage','ink');part.style.setProperty('--stage-delay',1100+i*500+'ms')});
  const shell=document.createElement('div');shell.className='sequence-shell';root.before(shell);shell.append(root);
  const controls=document.createElement('div');controls.className='sequence-controls';
  const text=document.createElement('span');text.className='sequence-caption';text.textContent=caption+' · illustrative';
  const button=document.createElement('button');button.type='button';button.className='sequence-replay';button.setAttribute('aria-label','Replay '+name+' sequence');
  button.innerHTML='<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.6 6.4M3 4v7h7"/></svg><span>Replay</span>';
  button.addEventListener('click',()=>replay(root));controls.append(text,button);shell.append(controls);
  if(type==='atlas')root.querySelectorAll('.atlas-map path').forEach((path,i)=>path.style.setProperty('--state-delay',(i%10)*65+'ms'));
  states.push({root,button,name});observer.observe(root);
 }));
 function applyPreference(){states.forEach(({root,button,name})=>{button.disabled=media.matches;button.querySelector('span').textContent=media.matches?'Still state':'Replay';button.setAttribute('aria-label',(media.matches?'Reduced-motion still state for ':'Replay ')+name+(media.matches?'':' sequence'))})}
 media.addEventListener('change',applyPreference);applyPreference();
})();
