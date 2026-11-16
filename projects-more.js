(() => {
  'use strict';
  const root = document.getElementById('inspiration');
  if (!root || !root.matches('[data-extra-projects="carousel-v1"]')) return;
  const track = document.getElementById('additional-projects-track');
  if (!track) return;
  const arrows = root.querySelector('.additional-projects-arrows');
  const prev = root.querySelector('[data-extra-scroll="prev"]');
  const next = root.querySelector('[data-extra-scroll="next"]');
  if (!arrows || !prev || !next) return;
  const update = () => {
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    arrows.hidden = max <= 3;
    prev.disabled = track.scrollLeft <= 3;
    next.disabled = track.scrollLeft >= max - 3;
  };
  const move = (direction) => {
    const card = track.querySelector('.additional-project-card');
    if (!card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const width = card.getBoundingClientRect().width + gap;
    track.scrollBy({left: direction * width, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  };
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  window.addEventListener('load', update, {once:true});
  update();
})();
