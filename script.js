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

  // Cookie-Zustimmung (Google Consent Mode v2)
  const CONSENT_KEY = 'glasrand_consent';
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  // Microsoft Clarity — wird NUR nach Zustimmung geladen
  let clarityLoaded = false;
  function loadClarity() {
    if (clarityLoaded) return;
    clarityLoaded = true;
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yjtwnchug7");
  }

  function updateConsent(granted) {
    if (granted) loadClarity();
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
        analytics_storage: granted ? 'granted' : 'denied'
      });
    }
  }

  if (banner) {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === 'accepted') {
      updateConsent(true);
    } else if (saved === 'declined') {
      updateConsent(false);
    } else {
      banner.classList.remove('hidden');
    }

    if (acceptBtn) acceptBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      updateConsent(true);
      banner.classList.add('hidden');
    });
    if (declineBtn) declineBtn.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'declined');
      updateConsent(false);
      banner.classList.add('hidden');
    });
  }

});
