let dispose: (() => void) | undefined;

function initMotion() {
  dispose?.();
  const controller = new AbortController();
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  let observer: IntersectionObserver | undefined;
  const start = () => {
    observer?.disconnect();
    animations.forEach((animation) => animation.cancel());
    animations.clear();
    if (preference.matches) return;
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        observer?.unobserve(entry.target);
        const animation = entry.target.animate(
          [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 650, delay: Math.min(index * 55, 165), easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' },
        );
        animations.add(animation);
        animation.finished.catch(() => {}).finally(() => animations.delete(animation));
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('main [data-reveal], main section:not(#hero-slider) h2, main section:not(#hero-slider) figure').forEach((element) => {
      if (!element.parentElement?.closest('[data-reveal]')) observer?.observe(element);
    });
  };
  preference.addEventListener('change', start, { signal: controller.signal });
  start();
  dispose = () => { controller.abort(); observer?.disconnect(); animations.forEach((animation) => animation.cancel()); };
}

initMotion();
document.addEventListener('astro:page-load', initMotion);
document.addEventListener('astro:before-swap', () => dispose?.());
window.addEventListener('pagehide', () => dispose?.());
window.addEventListener('pageshow', (event) => { if (event.persisted) initMotion(); });
