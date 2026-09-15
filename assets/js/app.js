'use strict';

// A deliberately small enhancement layer. Work and video remain usable without JS.
const dialog = document.getElementById('media-dialog');
const mediaImage = document.getElementById('media-image');
const mediaTitle = document.getElementById('media-title');
const mediaCaption = document.getElementById('media-caption');
let mediaOpener;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    mediaOpener = button;
    mediaImage.src = button.dataset.image;
    mediaImage.alt = button.dataset.title;
    mediaTitle.textContent = button.dataset.title;
    mediaCaption.textContent = button.dataset.caption || '';
    dialog.showModal();
    document.getElementById('close-media').focus();
  });
});
document.getElementById('close-media').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if(event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  mediaImage.removeAttribute('src');
  mediaOpener?.focus();
});
const videos = [...document.querySelectorAll('video')];
videos.forEach(video => {
  video.addEventListener('play', () => videos.forEach(other => { if(other !== video) other.pause(); }));
});
document.addEventListener('visibilitychange', () => {
  if(document.hidden) videos.forEach(video => video.pause());
});
document.querySelector('[data-copy]')?.addEventListener('click', async event => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(event.currentTarget.dataset.copy);
    status.textContent = 'Email copied.';
  } catch {
    status.textContent = 'olamidebalogun3131@gmail.com';
  }
});
