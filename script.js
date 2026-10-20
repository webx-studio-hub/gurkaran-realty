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
    name: 'Kothi / House',
    desc: 'A kothi is more than a house—it’s where generations grow together. We help you find independent houses and kothis in Amritsar’s most loved avenues and colonies, with clear titles, approved maps and the space your family needs. Every home we recommend is checked for location, documentation and long-term value.',
  },
  apartment: {
    name: 'Flats & Apartments',
    desc: 'Modern flats in gated societies with lifts, power backup, parking and 24×7 security. Ideal for young families, working professionals and NRIs who want a low-maintenance home in Amritsar, Mohali or Ludhiana—ready-to-move or under construction.',
  },
  villa: {
    name: 'Plots & Farmhouses',
    desc: 'Residential plots in approved colonies and farmhouse land on the outskirts of the city. We check fard, CLU and approvals so you can build your dream home or hold land as a long-term investment with complete peace of mind.',
  },
  residential: {
    name: 'Commercial',
    desc: 'Commercial floors, showrooms, SCOs and office spaces on Amritsar’s busiest roads—Ranjit Avenue, Lawrence Road, GT Road and more. Perfect for restaurants, cafés, corporate offices and retail brands, available to buy or lease.',
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
