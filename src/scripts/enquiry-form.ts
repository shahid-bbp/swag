let dispose: (() => void) | undefined;
function initEnquiry() {
  dispose?.();
  const form = document.querySelector<HTMLFormElement>('#appointment-form');
  const submit = document.querySelector<HTMLButtonElement>('#submit-btn');
  const label = document.getElementById('btn-text');
  const success = document.getElementById('form-success-message');
  const error = document.getElementById('form-error-message');
  const whatsapp = document.querySelector<HTMLAnchorElement>('#enquiry-whatsapp-link');
  if (!form || !submit || !label || !success || !error || !whatsapp) return;
  const controller = new AbortController();
  const { signal } = controller;
  const endpoint = form.dataset.endpoint;
  const idleLabel = endpoint ? 'Send appointment enquiry' : 'Prepare WhatsApp enquiry';
  label.textContent = idleLabel;
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement;
  for (const name of ['name', 'phone', 'email', 'service', 'consent']) field(name).setAttribute('aria-describedby', `error-${name}`);
  const invalidate = (name: string) => {
    field(name).setAttribute('aria-invalid', 'true');
    document.getElementById(`error-${name}`)?.classList.remove('hidden');
  };
  const clearPrepared = () => { success.classList.add('hidden'); whatsapp.href = `https://wa.me/${form.dataset.whatsapp}`; };
  form.addEventListener('input', clearPrepared, { signal });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.classList.add('hidden');
    clearPrepared();
    form.querySelectorAll('[aria-invalid]').forEach((input) => input.removeAttribute('aria-invalid'));
    form.querySelectorAll('.client-error').forEach((message) => message.classList.add('hidden'));
    if (field('_gotcha').value) return;
    if (!field('name').value.trim()) invalidate('name');
    const phone = field('phone').value.trim();
    if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 8 || phone.replace(/\D/g, '').length > 15) invalidate('phone');
    if (field('email').value && !field('email').validity.valid) invalidate('email');
    if (!field('service').value) invalidate('service');
    if (!field('consent').checked) invalidate('consent');
    const invalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
    if (invalid) { invalid.focus(); return; }
    submit.disabled = true;
    label.textContent = endpoint ? 'Sending enquiry…' : 'Preparing message…';
    try {
      if (!endpoint) {
        const message = [
          'Hello S For Swag, I would like to enquire about an appointment.',
          `Name: ${field('name').value.trim()}`, `Phone: ${phone}`, `Service: ${field('service').value}`,
          field('email').value && `Email: ${field('email').value.trim()}`,
          field('date').value && `Preferred date: ${field('date').value}`,
          `Preferred time: ${field('time').value}`,
          field('notes').value.trim() && `Notes: ${field('notes').value.trim()}`,
        ].filter(Boolean).join('\n');
        whatsapp.href = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message)}`;
      } else {
        const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal });
        if (!response.ok) throw new Error('Your enquiry could not be sent. Please try again or contact reception directly.');
        form.reset();
      }
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      whatsapp.focus({ preventScroll: true });
    } catch (cause) {
      if (signal.aborted) return;
      error.classList.remove('hidden');
      const text = document.getElementById('form-error-text');
      if (text) text.textContent = cause instanceof Error ? cause.message : 'Please contact reception to complete your enquiry.';
    } finally { submit.disabled = false; label.textContent = idleLabel; }
  }, { signal });
  dispose = () => controller.abort();
}
initEnquiry();
document.addEventListener('astro:page-load', initEnquiry);
document.addEventListener('astro:before-swap', () => dispose?.());
window.addEventListener('pagehide', () => dispose?.());
window.addEventListener('pageshow', (event) => { if (event.persisted) initEnquiry(); });
