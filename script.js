(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || { social: {}, projects: {} };
  const storageKey = 'le-doan-anh-tuan-portfolio-lang';
  let lang = 'en';
  try { lang = localStorage.getItem(storageKey) === 'vi' ? 'vi' : 'en'; } catch (_) {}
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  let toastTimer;

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 3500);
  }

  function setLanguage(next) {
    lang = next === 'vi' ? 'vi' : 'en';
    document.documentElement.lang = lang;
    $$('[data-en][data-vi]').forEach((element) => {
      const val = element.getAttribute(`data-${lang}`);
      // A very small number of trusted static labels contain an HTML ampersand entity.
      element.textContent = val.replace(/&amp;/g, '&');
    });
    $('#language-toggle').innerHTML = lang === 'en'
      ? '<span class="lang-active">EN</span><span class="lang-divider">/</span><span class="lang-inactive">VI</span>'
      : '<span class="lang-inactive">EN</span><span class="lang-divider">/</span><span class="lang-active">VI</span>';
    $('#language-toggle').setAttribute('aria-label', lang === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh');
    const resume = lang === 'vi' ? 'resume/Le_Doan_Anh_Tuan_Resume_VI.pdf' : 'resume/Le_Doan_Anh_Tuan_Resume_EN.pdf';
    $('#resume-link-desktop').href = resume;
    $('#resume-link-mobile').href = resume;
    document.title = lang === 'en' ? 'Le Doan Anh Tuan | Software Engineer' : 'Lê Đoàn Anh Tuấn | Kỹ sư phần mềm';
    try { localStorage.setItem(storageKey, lang); } catch (_) {}
  }
  $('#language-toggle').addEventListener('click', () => setLanguage(lang === 'en' ? 'vi' : 'en'));
  $('#mobile-language').addEventListener('click', () => setLanguage(lang === 'en' ? 'vi' : 'en'));

  const toggle = $('#mobile-toggle'), menu = $('#mobile-nav'), backdrop = $('#mobile-backdrop');
  let focusBeforeMenu = null;
  function setMobileMenu(open) {
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.classList.toggle('open', open);
    backdrop.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (open) {
      focusBeforeMenu = document.activeElement;
      menu.inert = false;
      menu.querySelector('a').focus();
    } else {
      menu.inert = true;
      if (menu.contains(document.activeElement)) (focusBeforeMenu || toggle).focus();
    }
  }
  toggle.addEventListener('click', () => setMobileMenu(!menu.classList.contains('open')));
  backdrop.addEventListener('click', () => setMobileMenu(false));
  $$('#mobile-nav a').forEach(a => a.addEventListener('click', () => setMobileMenu(false)));
  document.addEventListener('keydown', e => {
    if (!menu.classList.contains('open')) return;
    if (e.key === 'Escape') { setMobileMenu(false); toggle.focus(); }
    if (e.key !== 'Tab') return;
    const elements = [...menu.querySelectorAll('a,button')].filter(el => !el.disabled);
    const first = elements[0], last = elements.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  window.addEventListener('resize', () => { if (innerWidth > 800 && menu.classList.contains('open')) setMobileMenu(false); });

  const tabs = $$('.experience-tab');
  function activateTab(idx, focus = false) {
    tabs.forEach((tab, i) => {
      const active = idx === i;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      $(`#panel-${i}`).hidden = !active;
    });
    if (focus) tabs[idx].focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i));
    tab.addEventListener('keydown', (event) => {
      let next = i;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (i + 1) % tabs.length;
      else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (i - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(next, true);
    });
  });

  $$('[data-social]').forEach(link => {
    const name = link.dataset.social;
    const href = config.social?.[name];
    if (href && /^https:\/\//.test(href)) {
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.addEventListener('click', e => { e.preventDefault(); showToast(lang === 'vi' ? `Chưa cấu hình liên kết ${name}. Hãy sửa file config.js.` : `${name} profile not configured yet. Add its URL to config.js.`); });
    }
  });
  $$('[data-no-link]').forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.noLink;
    const href = config.projects?.[name];
    if (href && /^https:\/\//.test(href)) window.open(href, '_blank', 'noopener,noreferrer');
    else showToast(lang === 'vi' ? 'Chưa có liên kết công khai cho dự án này. Cập nhật tại config.js.' : 'Public project link not set yet. Add it to config.js.');
  }));
  $('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('tamcaungu404@gmail.com');
      showToast(lang === 'vi' ? 'Đã sao chép địa chỉ email!' : 'Email address copied!');
    } catch (_) {
      showToast('tamcaungu404@gmail.com');
    }
  });

  const header = $('.site-header');
  function syncHeader() { header.classList.toggle('scrolled', window.scrollY > 28); }
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const hash = '#' + entry.target.id;
        $$('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === (hash === '#inspiration' ? '#work' : hash)));
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    $$('#about, #experience, #work, #inspiration, #contact').forEach(section => observer.observe(section));
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
      });
    }, { threshold: .08 });
    $$('.content-section, .contact-section, .featured-project, .project-card').forEach(el => { el.classList.add('reveal'); reveal.observe(el); });
  }
  setLanguage(lang);
})();
