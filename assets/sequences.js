(()=>{
 const media=matchMedia('(prefers-reduced-motion:reduce)');
 const header=document.querySelector('.site-header');let scheduled=false;
 function updateHeader(){header.classList.toggle('is-scrolled',scrollY>16);scheduled=false}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateHeader)}},{passive:true});updateHeader();
 const recipes=[
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
 const states=[];
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const root=entry.target;root.classList.toggle('sequence-offscreen',!entry.isIntersecting);
  if(entry.isIntersecting&&!root.dataset.sequenceStarted){root.dataset.sequenceStarted='true';root.classList.add('sequence-running')}
 }),{threshold:.16});
 function replay(root){if(media.matches)return;root.classList.remove('sequence-running');void root.offsetWidth;root.classList.add('sequence-running');root.dataset.sequenceStarted='true'}
 recipes.forEach(([selector,type,caption,name])=>document.querySelectorAll(selector).forEach((root)=>{
  root.classList.add('sequence-ready');root.dataset.sequence=type;
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
