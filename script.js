// GlasRand — kleine UI-Helfer, keine Frameworks, kein Tracking.

document.addEventListener('DOMContentLoaded', () => {

  // Mobiles Menü
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Dateiname im Upload-Feld anzeigen
  const fileInput = document.getElementById('file-input');
  const fileName = document.getElementById('file-name');
  if (fileInput && fileName) {
    fileInput.addEventListener('change', () => {
      fileName.textContent = fileInput.files.length ? fileInput.files[0].name : '';
    });
  }

  // Jahr im Footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
