/* A finite, silent introduction. Native video decoding keeps 3D work off the page. */
(() => {
  const section = document.querySelector('.intro-film');
  if (!section) return;
  const video = section.querySelector('video');
  const toggle = section.querySelector('[data-film-toggle]');
  const replay = section.querySelector('[data-film-replay]');
  const progress = section.querySelector('progress');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = reduced.matches || !!navigator.connection?.saveData;
  let visible = false;
  let loaded = false;
  const blocked = () => document.hidden || document.body.classList.contains('motion-paused');
  const load = () => {
    if (loaded) return;
    loaded = true;
    video.src = matchMedia('(max-width: 700px)').matches ? video.dataset.mobile : video.dataset.desktop;
    video.load();
  };
  const paint = () => {
    toggle.textContent = video.ended ? 'Play again' : video.paused ? 'Play film' : 'Pause film';
    toggle.setAttribute('aria-label', video.ended ? 'Play introduction again' : video.paused ? 'Play introduction' : 'Pause introduction');
    section.classList.toggle('film-light', video.currentTime > 5);
    section.classList.toggle('film-revealed', video.currentTime > 3);
    if (Number.isFinite(video.duration)) progress.value = video.currentTime / video.duration;
  };
  const play = () => { load(); video.play().catch(() => { userPaused = true; paint(); }); };
  const sync = () => {
    if (blocked() || !visible || userPaused || video.ended) video.pause();
    else play();
    paint();
  };
  if (reduced.matches || navigator.connection?.saveData) video.poster = '/assets/film/still.jpg';
  video.controls = false;
  section.querySelector('.film-controls').hidden = false;
  toggle.addEventListener('click', () => {
    if (!video.paused) { userPaused = true; video.pause(); }
    else { userPaused = false; if (video.ended) video.currentTime = 0; if (!blocked()) play(); }
    paint();
  });
  replay.addEventListener('click', () => {
    userPaused = false; load(); video.currentTime = 0; if (!blocked()) play(); paint();
  });
  section.querySelector('[data-film-skip]').addEventListener('click', () => { userPaused = true; video.pause(); paint(); });
  for (const event of ['timeupdate','play','pause','ended','loadedmetadata']) video.addEventListener(event, paint);
  video.addEventListener('error', () => {
    userPaused = true; toggle.hidden = true; replay.hidden = true;
    section.querySelector('.film-status').textContent = 'Film unavailable. Continue to explore ExemptLink.';
  });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, {threshold: .15}).observe(section);
  new MutationObserver(sync).observe(document.body, {attributes: true, attributeFilter: ['class']});
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', () => { userPaused = reduced.matches; sync(); });
  paint();
})();
