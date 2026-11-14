// Keep project clips under visitor control and avoid competing audio tracks.
document.addEventListener('play', function (event) {
  if (!(event.target instanceof HTMLVideoElement)) return;
  document.querySelectorAll('video').forEach(function (video) {
    if (video !== event.target) video.pause();
  });
}, true);

// The CRM clip starts muted when it scrolls into view, unless the visitor has paused it.
(function () {
  var video = document.querySelector('[data-project="team-gold-crm-showcase"] video');
  if (!video || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var pausedByVisitor = false;
  video.muted = true;
  video.loop = true;
  video.preload = 'auto';
  video.addEventListener('pause', function () { pausedByVisitor = !video.ended && !hidden; });
  var hidden = false;
  new IntersectionObserver(function (entries) {
    hidden = !entries[0].isIntersecting;
    if (hidden) video.pause();
    else if (!pausedByVisitor) video.play().catch(function () {});
  }, { threshold: 0.5 }).observe(video);
})();

document.querySelectorAll('.ba__row').forEach(function (row) {
  var strip = row.querySelector('.ba__strip');
  row.querySelectorAll('.ba__nav').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dir = btn.classList.contains('ba__nav--next') ? 1 : -1;
      strip.scrollBy({ left: dir * strip.clientWidth * 0.72, behavior: 'smooth' });
    });
  });
});
