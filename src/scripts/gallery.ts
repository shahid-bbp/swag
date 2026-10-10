class SalonGallery extends HTMLElement {
  private cleanup?: () => void;
  connectedCallback() {
    this.cleanup?.();
    const controller = new AbortController();
    const { signal } = controller;
    const items = Array.from(this.querySelectorAll<HTMLAnchorElement>('[data-gallery-item]'));
    const filters = this.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const dialog = this.querySelector<HTMLDialogElement>('dialog');
    const image = this.querySelector<HTMLImageElement>('[data-gallery-full]');
    const close = this.querySelector<HTMLButtonElement>('[data-gallery-close]');
    const previous = this.querySelector<HTMLButtonElement>('[data-gallery-prev]');
    const next = this.querySelector<HTMLButtonElement>('[data-gallery-next]');
    if (!dialog || !image || !close || !previous || !next) return;
    let visible = items;
    let index = 0;
    let opener: HTMLElement | undefined;
    const render = () => {
      const item = visible[index];
      image.src = item.href;
      image.alt = item.dataset.description || '';
      this.querySelector('#gallery-view-title')!.textContent = item.dataset.title || '';
      this.querySelector('[data-gallery-caption]')!.textContent = item.dataset.description || '';
      this.querySelector('[data-gallery-position]')!.textContent = `${index + 1} / ${visible.length}`;
      previous.disabled = next.disabled = visible.length < 2;
    };
    const move = (direction: number) => { index = (index + direction + visible.length) % visible.length; render(); };
    filters.forEach((button) => button.addEventListener('click', () => {
      filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
      items.forEach((item) => { item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter; });
      visible = items.filter((item) => !item.hidden);
      this.querySelector('[data-gallery-count]')!.textContent = `${visible.length} ${visible.length === 1 ? 'image' : 'images'}`;
    }, { signal }));
    items.forEach((item) => item.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = item;
      index = visible.indexOf(item);
      render();
      dialog.showModal();
      document.body.classList.add('overflow-hidden');
      close.focus();
    }, { signal }));
    close.addEventListener('click', () => dialog.close(), { signal });
    previous.addEventListener('click', () => move(-1), { signal });
    next.addEventListener('click', () => move(1), { signal });
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }, { signal });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    }, { signal });
    dialog.addEventListener('close', () => {
      image.removeAttribute('src');
      document.body.classList.remove('overflow-hidden');
      opener?.focus();
    }, { signal });
    this.dataset.ready = 'true';
    this.cleanup = () => { controller.abort(); dialog.close(); document.body.classList.remove('overflow-hidden'); delete this.dataset.ready; };
  }
  disconnectedCallback() { this.cleanup?.(); }
}
if (!customElements.get('salon-gallery')) customElements.define('salon-gallery', SalonGallery);
