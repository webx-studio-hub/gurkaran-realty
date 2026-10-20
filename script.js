// Gurkaran Realty — small progressive enhancements (site works without JS)

// ---------- mobile nav ----------
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.nav__links a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// active nav pill follows the section in view
const pills = [...document.querySelectorAll('.nav__links .pill')];
const sections = pills.map((p) => document.querySelector(p.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      pills.forEach((p) => p.classList.toggle('pill--active', p.getAttribute('href') === '#' + e.target.id));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => spy.observe(s));

// ---------- search selects: darken text once a value is chosen ----------
document.querySelectorAll('.field__control select').forEach((sel) =>
  sel.addEventListener('change', () => sel.classList.toggle('has-value', sel.value !== ''))
);

// ---------- category tabs ----------
const categories = {
  house: {
    name: 'House',
    desc: 'A home is more than just a place to live—it’s a space to grow, share, and create memories. We offer a selection of homes designed with detail and comfort in mind, ideal for families seeking a warm, safe place to build their future. Our convenient locations, friendly neighborhoods, and modern design make each of our homes a valuable emotional and financial investment.',
  },
  apartment: {
    name: 'Apartment',
    desc: 'Smart, low-maintenance living in the heart of the city. Our apartments combine efficient layouts, shared amenities and easy access to transport, work and leisure—perfect for young professionals and couples who want comfort without compromise.',
  },
  villa: {
    name: 'Villa',
    desc: 'Private retreats with generous space, lush gardens and pools. Our villas are designed for those who want luxury and privacy, with premium finishes, open-plan living and outdoor areas made for relaxing and entertaining.',
  },
  residential: {
    name: 'Residential',
    desc: 'Well-planned residential communities with security, green spaces and family facilities. Ideal for long-term living and investment, each development is chosen for its location, quality of build and growing value.',
  },
};
const tabs = document.querySelectorAll('.tab');
const catInfo = document.querySelector('.category__info > div');
const catName = document.getElementById('catName');
const catDesc = document.getElementById('catDesc');
tabs.forEach((tab) =>
  tab.addEventListener('click', () => {
    if (tab.classList.contains('is-active')) return;
    tabs.forEach((t) => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', t === tab);
    });
    const data = categories[tab.dataset.tab];
    catInfo.classList.add('is-fading');
    setTimeout(() => {
      catName.textContent = data.name;
      catDesc.textContent = data.desc;
      catInfo.classList.remove('is-fading');
    }, 200);
  })
);

// ---------- testimonials progress bar ----------
const track = document.getElementById('tTrack');
const thumb = document.getElementById('tThumb');
function updateProgress() {
  const bar = thumb.parentElement.clientWidth;
  const max = track.scrollWidth - track.clientWidth;
  if (max <= 1) {
    // everything fits (desktop design): static 200px indicator
    thumb.style.width = Math.min(200, bar) + 'px';
    thumb.style.transform = 'none';
    return;
  }
  const w = Math.max(60, (track.clientWidth / track.scrollWidth) * bar);
  thumb.style.width = w + 'px';
  thumb.style.transform = `translateX(${(track.scrollLeft / max) * (bar - w)}px)`;
}
track.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// ---------- FAQ accordion ----------
const items = document.querySelectorAll('.faq__item');
items.forEach((item) => {
  const btn = item.querySelector('.faq__q');
  btn.addEventListener('click', () => {
    const willOpen = !item.classList.contains('is-open');
    items.forEach((other) => {
      const open = other === item && willOpen;
      other.classList.toggle('is-open', open);
      other.querySelector('.faq__q').setAttribute('aria-expanded', open);
      other.querySelector('.faq__icon').src = open ? 'assets/icons/faq-open.svg' : 'assets/icons/faq-closed.svg';
    });
  });
});
