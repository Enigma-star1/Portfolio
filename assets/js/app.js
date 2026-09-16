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

// Theme management
const themeSwitch = document.getElementById('theme-toggle');
const btnLight = document.getElementById('theme-btn-light');
const btnDark = document.getElementById('theme-btn-dark');

const updateTheme = (theme, persist = false) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    try { localStorage.setItem('theme', theme); } catch {}
  }
  const isDark = theme === 'dark';
  if (btnLight) btnLight.setAttribute('aria-pressed', isDark ? 'false' : 'true');
  if (btnDark) btnDark.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  if (themeSwitch && themeSwitch.tagName === 'BUTTON') {
    themeSwitch.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#171923' : '#f4f2ed');
  }
};

if (btnLight) {
  btnLight.addEventListener('click', (e) => {
    e.stopPropagation();
    updateTheme('light', true);
  });
}
if (btnDark) {
  btnDark.addEventListener('click', (e) => {
    e.stopPropagation();
    updateTheme('dark', true);
  });
}

if (themeSwitch) {
  themeSwitch.addEventListener('click', (e) => {
    if (e.target.closest('#theme-btn-light') || e.target.closest('#theme-btn-dark')) return;
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    updateTheme(current === 'dark' ? 'light' : 'dark', true);
  });
  updateTheme(document.documentElement.getAttribute('data-theme') || 'dark', false);
}

if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    try {
      if (!localStorage.getItem('theme')) {
        updateTheme(event.matches ? 'dark' : 'light', false);
      }
    } catch {}
  });
}

window.addEventListener('storage', event => {
  if (event.key === 'theme' && event.newValue) {
    updateTheme(event.newValue, false);
  }
});

