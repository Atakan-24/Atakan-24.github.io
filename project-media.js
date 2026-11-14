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

// Gentle autoplay for the before/after strips: one strip at a time, only while
// visible, never again after the visitor touches it, off for reduced motion.
(function () {
  var strips = Array.prototype.slice.call(document.querySelectorAll('.ba__strip'));
  if (!strips.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var visible = new Set(), stopped = new Set(), hovered = null;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
  }, { threshold: 0.6 });
  strips.forEach(function (s) {
    io.observe(s);
    ['pointerdown', 'wheel', 'keydown'].forEach(function (t) { s.addEventListener(t, function () { stopped.add(s); }, { passive: true }); });
    s.parentNode.addEventListener('click', function (e) { if (e.target.closest('.ba__nav')) stopped.add(s); });
    s.addEventListener('pointerenter', function () { hovered = s; });
    s.addEventListener('pointerleave', function () { hovered = null; });
  });
  setInterval(function () {
    var s = strips.find(function (x) { return visible.has(x) && !stopped.has(x); });
    if (!s || s === hovered) return;
    var next = Array.prototype.find.call(s.children, function (img) { return img.offsetLeft - s.offsetLeft > s.scrollLeft + 5; });
    if (next) s.scrollTo({ left: next.offsetLeft - s.offsetLeft, behavior: 'smooth' });
    if (!next || s.scrollLeft + s.clientWidth >= s.scrollWidth - 5) stopped.add(s);
  }, 3000);
})();
