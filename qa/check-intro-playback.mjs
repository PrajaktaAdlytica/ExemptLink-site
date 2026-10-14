import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
const code=fs.readFileSync(new URL('../dist/assets/intro-film.js',import.meta.url),'utf8');
function setup({reduce=false,saveData=false,reject=false}={}) {
 const handlers=new Map(), classes=new Set();let observe, mutation, preference;
 const element=()=>({hidden:false,textContent:'',addEventListener(n,f){handlers.set(this.key+':'+n,f)},setAttribute(){}});
 const video={...element(),key:'video',paused:true,ended:false,currentTime:0,duration:12,dataset:{mobile:'720.mp4',desktop:'1080.mp4'},load(){},play(){if(reject)return Promise.reject();this.paused=false;return Promise.resolve()},pause(){this.paused=true}};
 const els={video};for(const k of ['[data-film-toggle]','[data-film-replay]','[data-film-skip]','progress','.film-controls','.film-status'])els[k]={...element(),key:k};
 const section={querySelector:k=>els[k],classList:{toggle(){}}};
 const document={hidden:false,querySelector:()=>section,body:{classList:{contains:k=>classes.has(k)}},addEventListener(n,f){handlers.set(n,f)}};
 const media={matches:reduce,addEventListener(n,f){preference=f}};
 vm.runInNewContext(code,{document,navigator:{connection:{saveData}},matchMedia:q=>q.includes('reduced')?media:{matches:false},IntersectionObserver:class{constructor(f){observe=f}observe(){}},MutationObserver:class{constructor(f){mutation=f}observe(){}}});
 return {video,els,show(v=true){observe([{isIntersecting:v}])},click(k){handlers.get('[data-film-'+k+']:click')()},pauseSite(v){v?classes.add('motion-paused'):classes.delete('motion-paused');mutation()},hide(v){document.hidden=v;handlers.get('visibilitychange')()},preference(v){media.matches=v;preference()}};
}
const normal=setup();assert.equal(normal.video.src,undefined);normal.show();assert.equal(normal.video.paused,false);assert.equal(normal.video.src,'1080.mp4');normal.click('toggle');assert.equal(normal.video.paused,true);normal.show(false);normal.show();assert.equal(normal.video.paused,true,'scroll must not override deliberate pause');normal.click('toggle');assert.equal(normal.video.paused,false);normal.hide(true);assert.equal(normal.video.paused,true);normal.hide(false);assert.equal(normal.video.paused,false);normal.pauseSite(true);assert.equal(normal.video.paused,true);normal.pauseSite(false);assert.equal(normal.video.paused,false);normal.video.ended=true;normal.video.pause();normal.show();assert.equal(normal.video.paused,true,'finite film must not automatically loop');normal.click('replay');assert.equal(normal.video.currentTime,0);assert.equal(normal.video.paused,false);normal.click('skip');assert.equal(normal.video.paused,true);
for(const prefs of [{reduce:true},{saveData:true}]){const s=setup(prefs);s.show();assert.equal(s.video.src,undefined,'do not fetch/autoplay when motion or data preference says no');assert.equal(s.video.poster,'/assets/film/still.jpg');s.click('toggle');assert.equal(s.video.paused,false,'explicit play remains available')}
const denied=setup({reject:true});denied.show();await Promise.resolve();await Promise.resolve();assert.equal(denied.video.paused,true);assert.equal(denied.els['[data-film-toggle]'].textContent,'Play film');
console.log('PASS: finite playback, manual pause, offscreen/hidden pause, global motion, reduced motion, data saver, replay, skip, autoplay rejection.');
