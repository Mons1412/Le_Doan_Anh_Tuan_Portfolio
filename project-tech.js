/* PORTFOLIO PROJECTS V1 - Accessible per-project technology explanations */
(() => {
  'use strict';
  document.querySelectorAll('[data-project-tech]').forEach((group) => {
    const buttons = Array.from(group.querySelectorAll('.project-tech-button'));
    const panels = Array.from(group.querySelectorAll('.project-tech-explanation'));
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const wasOpen = button.getAttribute('aria-expanded') === 'true';
        buttons.forEach((other) => other.setAttribute('aria-expanded', 'false'));
        panels.forEach((panel) => { panel.hidden = true; });
        if (!wasOpen) {
          const target = document.getElementById(button.getAttribute('aria-controls'));
          if (target && group.contains(target)) {
            target.hidden = false;
            button.setAttribute('aria-expanded', 'true');
          }
        }
      });
    });
  });
})();