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
// visible, slow eased glide, stops once the visitor swipes a strip sideways.
// Scrolling the page past a strip does not count as touching it.
(function () {
  var strips = Array.prototype.slice.call(document.querySelectorAll('.ba__strip'));
  if (!strips.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var visible = new Set(), stopped = new Set(), hovered = null, busy = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.isIntersecting ? visible.add(e.target) : visible.delete(e.target); });
  }, { threshold: 0.5 });
  function glide(s, to, done) {
    var from = s.scrollLeft, start = performance.now(), ms = 1800;
    s.style.scrollSnapType = 'none';
    (function step(now) {
      var t = Math.min((now - start) / ms, 1);
      s.scrollLeft = from + (to - from) * (t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      if (t < 1) return requestAnimationFrame(step);
      s.style.scrollSnapType = '';
      done();
    })(start);
  }
  strips.forEach(function (s) {
    var x0, y0;
    io.observe(s);
    s.addEventListener('keydown', function () { stopped.add(s); });
    s.addEventListener('wheel', function (e) { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stopped.add(s); }, { passive: true });
    s.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') stopped.add(s); });
    s.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    s.addEventListener('touchmove', function (e) {
      if (Math.abs(e.touches[0].clientX - x0) > Math.abs(e.touches[0].clientY - y0)) stopped.add(s);
    }, { passive: true });
    s.parentNode.addEventListener('click', function (e) { if (e.target.closest('.ba__nav')) stopped.add(s); });
    s.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hovered = s; });
    s.addEventListener('pointerleave', function () { hovered = null; });
  });
  setInterval(function () {
    var s = strips.find(function (x) { return visible.has(x) && !stopped.has(x); });
    if (!s || s === hovered || busy) return;
    var next = Array.prototype.find.call(s.children, function (img) { return img.offsetLeft - s.offsetLeft > s.scrollLeft + 5; });
    if (!next) return stopped.add(s);
    busy = true;
    glide(s, next.offsetLeft - s.offsetLeft, function () {
      busy = false;
      if (s.scrollLeft + s.clientWidth >= s.scrollWidth - 5) stopped.add(s);
    });
  }, 4500);
})();
