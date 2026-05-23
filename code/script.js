// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
toggle?.addEventListener('click', () => nav.classList.toggle('open'));

// Close nav when a link is clicked (mobile)
document.querySelectorAll('.nav__links a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.section__head, .course, .pillar, .why, .t-card, .hero__copy, .hero__visual, .cta__inner > *, .contact-form, .contact__grid > div'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// Safety net: if anything is still hidden after 2s, reveal it
setTimeout(() => {
  revealEls.forEach(el => el.classList.add('visible'));
}, 2000);

// Contact form (demo — no backend)
const form = document.querySelector('.contact-form');
const msg = form?.querySelector('.form-msg');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();

  if (!name || !/^\d{10}$/.test(phone)) {
    msg.hidden = false;
    msg.textContent = 'Please enter your name and a 10-digit mobile number.';
    msg.style.background = '#fde8e8';
    msg.style.color = '#9b1c1c';
    return;
  }

  msg.hidden = false;
  msg.style.background = '#e7f8ef';
  msg.style.color = '#0f7a4c';
  msg.textContent = `Thanks ${name.split(' ')[0]}! We'll call you on ${phone} shortly.`;
  form.reset();
});

// Smooth-offset for sticky nav (anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
