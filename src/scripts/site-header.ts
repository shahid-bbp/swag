let cleanup: (() => void) | undefined;

function initHeader() {
  cleanup?.();
  const header = document.getElementById('site-header');
  const button = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!header || !button || !menu) return;
  const controller = new AbortController();
  const { signal } = controller;
  const desktop = matchMedia('(min-width: 1024px)');
  let frame = 0;
  let open = false;
  const setMenu = (next: boolean, restoreFocus = false) => {
    open = next;
    button.setAttribute('aria-expanded', String(next));
    menu.classList.toggle('hidden', !next);
    header.classList.toggle('header--menu-open', next);
    document.getElementById('hamburger-icon')?.classList.toggle('hidden', next);
    document.getElementById('close-icon')?.classList.toggle('hidden', !next);
    document.body.classList.toggle('overflow-hidden', next);
    if (restoreFocus) button.focus();
  };
  const measure = () => document.documentElement.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`);
  const observer = new ResizeObserver(measure);
  observer.observe(header);
  const updateScroll = () => {
    const isScrolled = (window.scrollY || window.pageYOffset || 0) > 50;
    header.classList.toggle('header--scrolled', isScrolled);
    frame = 0;
  };
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateScroll); }, { passive: true, signal });
  updateScroll();
  button.addEventListener('click', () => setMenu(!open), { signal });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false), { signal }));
  desktop.addEventListener('change', () => { if (desktop.matches) setMenu(false); }, { signal });
  document.addEventListener('keydown', (event) => {
    if (!open) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
    if (event.key === 'Tab') {
      const focusable = Array.from(header.querySelectorAll<HTMLElement>('a, button')).filter((node) => node.getClientRects().length);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }, { signal });
  cleanup = () => { setMenu(false); controller.abort(); observer.disconnect(); cancelAnimationFrame(frame); };
}

initHeader();
document.addEventListener('astro:page-load', initHeader);
document.addEventListener('astro:before-swap', () => cleanup?.());
window.addEventListener('pagehide', () => cleanup?.());
window.addEventListener('pageshow', (event) => { if (event.persisted) initHeader(); });
