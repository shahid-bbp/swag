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
        const direction = entry.target.getAttribute('data-reveal');
        const slidesIn = direction === 'left' || direction === 'right';
        const distance = matchMedia('(min-width: 1024px)').matches ? 64 : 28;
        const from = slidesIn
          ? `translateX(${direction === 'left' ? -distance : distance}px)`
          : 'translateY(16px)';
        const animation = entry.target.animate(
          [{ opacity: 0, transform: from }, { opacity: 1, transform: 'translate(0, 0)' }],
          {
            duration: slidesIn ? 900 : 650,
            delay: slidesIn ? (direction === 'right' ? 120 : 0) : Math.min(index * 55, 165),
            easing: 'cubic-bezier(.2,.65,.3,1)',
            fill: 'backwards',
          },
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
