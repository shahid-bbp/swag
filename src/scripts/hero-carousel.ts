/** A dependency-free carousel; each connection owns its listeners and timer. */
class HeroCarousel extends HTMLElement {
  private cleanup?: () => void;

  connectedCallback() {
    this.cleanup?.();
    const slides = Array.from(this.querySelectorAll<HTMLElement>('[data-slide]'));
    const indicators = Array.from(this.querySelectorAll<HTMLButtonElement>('[data-slide-target]'));
    const rotation = this.querySelector<HTMLButtonElement>('[data-rotation]');
    const status = this.querySelector<HTMLElement>('[data-slide-status]');
    if (slides.length < 2 || indicators.length !== slides.length || !rotation) return;

    const controller = new AbortController();
    const { signal } = controller;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const interval = Number(this.dataset.interval) || 6000;
    let current = Math.max(0, slides.findIndex((slide) => slide.dataset.active === 'true'));
    let timer: number | undefined;
    let paused = motion.matches;
    let hovering = this.matches(':hover');
    let inView = true;
    let request = 0;
    let rotationAction: boolean | undefined;

    const stop = () => {
      window.clearTimeout(timer);
      timer = undefined;
    };
    const schedule = () => {
      stop();
      if (paused || hovering || !inView || document.hidden || motion.matches || signal.aborted) return;
      timer = window.setTimeout(() => { void show(current + 1, false); }, interval);
    };
    const updateRotation = () => {
      this.dataset.paused = String(paused || motion.matches);
      rotation.setAttribute('aria-label', motion.matches ? 'Automatic slideshow disabled for reduced motion' : paused ? 'Start slideshow' : 'Pause slideshow');
      rotation.disabled = motion.matches;
      schedule();
    };
    const show = async (target: number, manual: boolean) => {
      stop();
      const next = (target + slides.length) % slides.length;
      const token = ++request;
      const img = slides[next].querySelector('img');
      if (img) {
        // Decode before switching so slow connections never reveal an empty portrait.
        img.loading = 'eager';
        try { await img.decode(); } catch { schedule(); return; }
      }
      if (signal.aborted || token !== request) return;
      if (!manual && (paused || hovering || !inView || document.hidden || motion.matches)) {
        schedule();
        return;
      }
      slides.forEach((slide, index) => {
        const active = index === next;
        slide.dataset.active = String(active);
        slide.setAttribute('aria-hidden', String(!active));
        slide.inert = !active;
        indicators[index].setAttribute('aria-pressed', String(active));
      });
      current = next;
      if (manual && status) status.textContent = slides[next].getAttribute('aria-label');
      schedule();
    };
    const pause = () => { paused = true; updateRotation(); };

    indicators.forEach((button, index) => {
      button.addEventListener('click', () => { pause(); void show(index, true); }, { signal });
      button.addEventListener('keydown', (event) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % slides.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + slides.length) % slides.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = slides.length - 1;
        else return;
        event.preventDefault();
        pause();
        indicators[next].focus();
        void show(next, true);
      }, { signal });
    });
    // Focus pauses until explicitly restarted, leaving time to read and use the CTA.
    this.addEventListener('focusin', pause, { signal });
    this.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      hovering = true;
      stop();
    }, { signal });
    this.addEventListener('pointerleave', () => { hovering = false; schedule(); }, { signal });
    this.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') pause();
    }, { signal });
    // Capture pointer intent before focusin pauses rotation (keyboard focus still pauses).
    rotation.addEventListener('pointerdown', () => { rotationAction = !paused; }, { signal });
    rotation.addEventListener('pointercancel', () => { rotationAction = undefined; }, { signal });
    rotation.addEventListener('click', () => {
      paused = rotationAction ?? !paused;
      rotationAction = undefined;
      updateRotation();
    }, { signal });
    motion.addEventListener('change', () => { paused = motion.matches; updateRotation(); }, { signal });
    document.addEventListener('visibilitychange', schedule, { signal });
    window.addEventListener('pagehide', stop, { signal });
    window.addEventListener('pageshow', schedule, { signal });

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    });
    observer.observe(this);
    this.dataset.ready = 'true';
    updateRotation();
    this.cleanup = () => {
      stop();
      controller.abort();
      observer.disconnect();
      delete this.dataset.ready;
    };
  }
  disconnectedCallback() {
    this.cleanup?.();
    this.cleanup = undefined;
  }
}

if (!customElements.get('hero-carousel')) customElements.define('hero-carousel', HeroCarousel);
