'use strict';

// Theme management (top-priority, self-contained)
const updateTheme = (theme, persist = false) => {
  const active = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', active);
  if (persist) {
    try { localStorage.setItem('theme', active); } catch {}
  }
  const isDark = active === 'dark';
  const btnLight = document.getElementById('theme-btn-light');
  const btnDark = document.getElementById('theme-btn-dark');
  if (btnLight) btnLight.setAttribute('aria-pressed', isDark ? 'false' : 'true');
  if (btnDark) btnDark.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#171923' : '#f4f2ed');
  }
};

// Document-level delegated click listener for resilient theme toggling
document.addEventListener('click', (e) => {
  const btnLight = e.target.closest('#theme-btn-light');
  if (btnLight) {
    e.preventDefault();
    updateTheme('light', true);
    return;
  }
  const btnDark = e.target.closest('#theme-btn-dark');
  if (btnDark) {
    e.preventDefault();
    updateTheme('dark', true);
    return;
  }
  const toggle = e.target.closest('#theme-toggle');
  if (toggle) {
    e.preventDefault();
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    updateTheme(current === 'dark' ? 'light' : 'dark', true);
  }
});

// Sync initial UI state from document element or localStorage
(() => {
  let initial = document.documentElement.getAttribute('data-theme');
  if (!initial) {
    try { initial = localStorage.getItem('theme'); } catch {}
  }
  if (!initial) {
    initial = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
  }
  updateTheme(initial, false);
})();

// Listen for OS system theme changes
if (window.matchMedia) {
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      try {
        if (!localStorage.getItem('theme')) {
          updateTheme(event.matches ? 'dark' : 'light', false);
        }
      } catch {}
    });
  } catch {}
}

// Sync across open browser tabs
window.addEventListener('storage', event => {
  if (event.key === 'theme' && event.newValue) {
    updateTheme(event.newValue, false);
  }
});

// Dialog and media enhancement layer
const dialog = document.getElementById('media-dialog');
const mediaImage = document.getElementById('media-image');
const mediaTitle = document.getElementById('media-title');
const mediaCaption = document.getElementById('media-caption');
let mediaOpener;

document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    if (!dialog || !mediaImage || !mediaTitle || !mediaCaption) return;
    mediaOpener = button;
    mediaImage.src = button.dataset.image;
    mediaImage.alt = button.dataset.title;
    mediaTitle.textContent = button.dataset.title;
    mediaCaption.textContent = button.dataset.caption || '';
    dialog.showModal();
    document.getElementById('close-media')?.focus();
  });
});

document.getElementById('close-media')?.addEventListener('click', () => dialog?.close());

dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    dialog.close();
  }
});

dialog?.addEventListener('close', () => {
  mediaImage?.removeAttribute('src');
  mediaOpener?.focus();
});

// Video coordination
const videos = [...document.querySelectorAll('video')];
videos.forEach(video => {
  video.addEventListener('play', () => videos.forEach(other => { if (other !== video) other.pause(); }));
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) videos.forEach(video => video.pause());
});

// Copy email helper
document.querySelector('[data-copy]')?.addEventListener('click', async event => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(event.currentTarget.dataset.copy);
    if (status) status.textContent = 'Email copied.';
  } catch {
    if (status) status.textContent = 'olamidebalogun3131@gmail.com';
  }
});
