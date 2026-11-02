// Keep project clips under visitor control and avoid competing audio tracks.
document.addEventListener('play', function (event) {
  if (!(event.target instanceof HTMLVideoElement)) return;
  document.querySelectorAll('video').forEach(function (video) {
    if (video !== event.target) video.pause();
  });
}, true);
