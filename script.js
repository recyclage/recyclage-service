const counters = document.querySelectorAll('.metric-number');

const animateCounter = (element) => {
  const target = Number(element.dataset.target || 0);
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => observer.observe(counter));

const quoteForm = document.querySelector('#quote-form');

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const recipient = quoteForm.dataset.recipient || '';
    const subject = 'Nouvelle demande de devis - RecyclagePro';
    const body = [
      `Structure: ${formData.get('structure') || ''}`,
      `Ville: ${formData.get('ville') || ''}`,
      `Email: ${formData.get('email') || ''}`,
      `Activité: ${formData.get('activite') || ''}`,
      '',
      'Message:',
      `${formData.get('message') || ''}`,
    ].join('\n');

    window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
