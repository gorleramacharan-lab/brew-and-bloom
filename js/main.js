/* ═══════════════════════════════════════════════════════════════
   Brew & Bloom Café — main.js
   Navbar · mobile menu · scroll reveal · menu filters · cart ·
   checkout modal · reviews carousel · contact form · misc UI
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── Data ─────────────────────────────────────────────────────── */
const MENU_ITEMS = [
  { id: 'cappuccino',        name: 'Cappuccino',        price: 149, cat: 'coffee',   catLabel: 'Coffee',      img: 'images/menu-cappuccino.jpg',        desc: 'Rich espresso under a deep layer of velvety steamed-milk foam.' },
  { id: 'cafe-latte',        name: 'Café Latte',        price: 159, cat: 'coffee',   catLabel: 'Coffee',      img: 'images/menu-cafe-latte.jpg',        desc: 'Smooth espresso blended with silky steamed milk — light and comforting.' },
  { id: 'classic-espresso',  name: 'Classic Espresso',  price: 119, cat: 'coffee',   catLabel: 'Coffee',      img: 'images/menu-espresso.jpg',          desc: 'A bold single shot of our signature house-roasted blend.' },
  { id: 'mocha',             name: 'Mocha',             price: 179, cat: 'coffee',   catLabel: 'Coffee',      img: 'images/menu-mocha.jpg',             desc: 'Espresso meets rich chocolate, crowned with whipped cream.' },
  { id: 'caramel-macchiato', name: 'Caramel Macchiato', price: 189, cat: 'coffee',   catLabel: 'Coffee',      img: 'images/menu-caramel-macchiato.jpg', desc: 'Vanilla-kissed milk marked with espresso and a caramel drizzle.' },
  { id: 'iced-coffee',       name: 'Iced Coffee',       price: 169, cat: 'cold',     catLabel: 'Cold Drinks', img: 'images/menu-iced-coffee.jpg',       desc: 'Chilled double-shot espresso over ice with a splash of cold milk.' },
  { id: 'cold-brew',         name: 'Cold Brew',         price: 179, cat: 'cold',     catLabel: 'Cold Drinks', img: 'images/menu-cold-brew.jpg',         desc: 'Slow-steeped for 18 hours — smooth, bold and naturally sweet.' },
  { id: 'chocolate-frappe',  name: 'Chocolate Frappe',  price: 199, cat: 'cold',     catLabel: 'Cold Drinks', img: 'images/menu-chocolate-frappe.jpg',  desc: 'Blended coffee, dark chocolate and cream, topped with a drizzle.' },
  { id: 'strawberry-smoothie', name: 'Strawberry Smoothie', price: 179, cat: 'cold', catLabel: 'Cold Drinks', img: 'images/menu-strawberry-smoothie.jpg', desc: 'Fresh strawberries whipped into a cool, creamy delight.' },
  { id: 'chocolate-brownie', name: 'Chocolate Brownie', price: 129, cat: 'desserts', catLabel: 'Desserts',    img: 'images/menu-chocolate-brownie.jpg', desc: 'Warm, fudgy brownie baked fresh every single morning.' },
  { id: 'cheesecake',        name: 'Cheesecake',        price: 179, cat: 'desserts', catLabel: 'Desserts',    img: 'images/menu-cheesecake.jpg',        desc: 'Creamy baked cheesecake on a buttery biscuit base.' },
  { id: 'blueberry-muffin',  name: 'Blueberry Muffin',  price: 99,  cat: 'desserts', catLabel: 'Desserts',    img: 'images/menu-blueberry-muffin.jpg',  desc: 'Bursting with blueberries under a golden, sugar-dusted top.' },
  { id: 'chocolate-croissant', name: 'Chocolate Croissant', price: 149, cat: 'desserts', catLabel: 'Desserts', img: 'images/menu-chocolate-croissant.jpg', desc: 'Flaky, buttery layers wrapped around rich dark chocolate.' },
  { id: 'veg-sandwich',      name: 'Veg Sandwich',      price: 129, cat: 'snacks',   catLabel: 'Snacks',      img: 'images/menu-veg-sandwich.jpg',      desc: 'Grilled veggies, mint chutney and cheese between toasted bread.' },
  { id: 'cheese-garlic-bread', name: 'Cheese Garlic Bread', price: 149, cat: 'snacks', catLabel: 'Snacks',    img: 'images/menu-garlic-bread.jpg',     desc: 'Toasted bread loaded with garlic butter and melted cheese.' },
  { id: 'french-fries',      name: 'French Fries',      price: 119, cat: 'snacks',   catLabel: 'Snacks',      img: 'images/menu-french-fries.jpg',      desc: 'Crispy golden fries seasoned with herbs and sea salt.' },
];

const SPECIALS = {
  'signature-latte':   { id: 'signature-latte',   name: 'Bloom Signature Latte',      price: 229, img: 'images/special-signature-latte.jpg' },
  'midnight-brownie':  { id: 'midnight-brownie',  name: 'Midnight Chocolate Brownie', price: 199, img: 'images/special-midnight-brownie.jpg' },
  'caramel-frappe':    { id: 'caramel-frappe',    name: 'Golden Caramel Frappe',      price: 249, img: 'images/special-caramel-frappe.jpg' },
};

const ALL_ITEMS = {};
[...MENU_ITEMS, ...Object.values(SPECIALS)].forEach(item => { ALL_ITEMS[item.id] = item; });

const fmt = n => '₹' + n.toLocaleString('en-IN');

/* ── Element shortcuts ────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ══════════════════════════════════════════════════════════════
   1. PRELOADER
   ══════════════════════════════════════════════════════════════ */
(function preloader() {
  const loader = $('#preloader');
  const minWait = new Promise(resolve => setTimeout(resolve, 1000));
  const loaded = new Promise(resolve => {
    if (document.readyState === 'complete') return resolve();
    window.addEventListener('load', resolve, { once: true });
    setTimeout(resolve, 3500); // safety net
  });
  Promise.all([minWait, loaded]).then(() => {
    loader.classList.add('is-done');
    document.documentElement.style.scrollBehavior = 'smooth';
  });
})();

/* ══════════════════════════════════════════════════════════════
   2. NAVBAR — scroll style, mobile menu, active link
   ══════════════════════════════════════════════════════════════ */
(function navbar() {
  const navbar = $('#navbar');
  const toggle = $('#navToggle');
  const links = $('#navLinks');
  const navLinks = $$('.navbar__link', links);

  const onScroll = () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 40);
    $('#toTop').classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // close mobile menu when a link is clicked
  navLinks.forEach(link => link.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // close on outside click
  document.addEventListener('click', e => {
    if (!links.classList.contains('is-open')) return;
    if (links.contains(e.target) || toggle.contains(e.target)) return;
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });

  // active link highlighting
  const sections = navLinks
    .map(link => $(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = id => {
    navLinks.forEach(link =>
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
    );
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
})();

/* ══════════════════════════════════════════════════════════════
   3. SCROLL REVEAL
   ══════════════════════════════════════════════════════════════ */
(function reveal() {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  // stagger cards that share a parent
  const groups = new Map();
  items.forEach(el => {
    const key = el.parentElement;
    groups.set(key, (groups.get(key) || 0) + 1);
    if (groups.get(key) > 1) {
      const idx = [...key.querySelectorAll('.reveal')].indexOf(el);
      el.style.setProperty('--reveal-delay', `${idx * 0.09}s`);
    }
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════════════
   4. MENU — render + category filters
   ══════════════════════════════════════════════════════════════ */
(function menu() {
  const grid = $('#menuGrid');
  const filters = $$('.menu__filter');

  const render = category => {
    const items = category === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(item => item.cat === category);

    grid.innerHTML = items.map((item, i) => `
      <article class="menu-card" style="--card-delay:${i * 0.045}s">
        <div class="menu-card__media">
          <img src="${item.img}" alt="${item.name} at Brew and Bloom Café" loading="lazy" decoding="async" />
          <span class="menu-card__cat">${item.catLabel}</span>
          <span class="menu-card__price">${fmt(item.price)}</span>
        </div>
        <div class="menu-card__body">
          <h3 class="menu-card__name">${item.name}</h3>
          <p class="menu-card__desc">${item.desc}</p>
          <button class="menu-card__add" data-add="${item.id}" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Add to Cart
          </button>
        </div>
      </article>
    `).join('');
  };

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      render(btn.dataset.category);
    });
  });

  render('all');
})();

/* ══════════════════════════════════════════════════════════════
   5. CART — state, drawer, totals, checkout
   ══════════════════════════════════════════════════════════════ */
const cart = []; // { id, name, price, img, qty }

const cartDrawer   = $('#cartDrawer');
const cartOverlay  = $('#cartOverlay');
const cartItemsEl  = $('#cartItems');
const cartEmptyEl  = $('#cartEmpty');
const cartFooterEl = $('#cartFooter');
const cartCountEls = [$('#cartCount'), $('#cartCountDrawer')];

function cartCount() { return cart.reduce((sum, i) => sum + i.qty, 0); }
function cartTotal() { return cart.reduce((sum, i) => sum + i.qty * i.price, 0); }

function updateCartUI() {
  const count = cartCount();
  cartCountEls.forEach(el => { el.textContent = count; });

  const isEmpty = cart.length === 0;
  cartEmptyEl.style.display = isEmpty ? 'flex' : 'none';
  cartItemsEl.style.display = isEmpty ? 'none' : 'flex';
  cartFooterEl.hidden = isEmpty;

  $('#cartSubtotal').textContent = fmt(cartTotal());
  $('#cartTotal').textContent = fmt(cartTotal());
}

function renderCartItems() {
  cartItemsEl.innerHTML = cart.map(item => `
    <li class="cart-item" data-id="${item.id}">
      <div class="cart-item__media">
        <img src="${item.img}" alt="${item.name}" loading="lazy" decoding="async" />
      </div>
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        <p class="cart-item__price">${fmt(item.price)} each</p>
      </div>
      <div class="cart-item__side">
        <div class="stepper">
          <button type="button" data-dec aria-label="Decrease quantity of ${item.name}">−</button>
          <span>${item.qty}</span>
          <button type="button" data-inc aria-label="Increase quantity of ${item.name}">+</button>
        </div>
        <span class="cart-item__line">${fmt(item.price * item.qty)}</span>
        <button class="cart-item__remove" type="button" data-remove aria-label="Remove ${item.name} from cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          remove
        </button>
      </div>
    </li>
  `).join('');
  updateCartUI();
}

function bumpCartBadge() {
  const badge = $('#cartCount');
  badge.classList.remove('bump');
  void badge.offsetWidth; // restart animation
  badge.classList.add('bump');
}

function addToCart(id) {
  const item = ALL_ITEMS[id];
  if (!item) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: item.id, name: item.name, price: item.price, img: item.img, qty: 1 });
  renderCartItems();
  bumpCartBadge();
  showToast(`${item.name} added to cart`);
}

function openCart() {
  cartDrawer.classList.add('is-open');
  cartOverlay.classList.add('is-visible');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('is-open');
  cartOverlay.classList.remove('is-visible');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = '';
}

$('#cartOpen').addEventListener('click', openCart);
$('#cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
$('#cartEmptyBtn').addEventListener('click', () => { closeCart(); document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' }); });

// add-to-cart buttons (menu grid, delegated)
$('#menuGrid').addEventListener('click', e => {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;
  addToCart(btn.dataset.add);
  btn.classList.add('added');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    Added
  `;
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      Add to Cart
    `;
  }, 1100);
});

// specials "Try This" buttons
$$('.special-card__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    addToCart(btn.dataset.special);
    openCart();
  });
});

// quantity / remove (delegated inside drawer)
cartItemsEl.addEventListener('click', e => {
  const row = e.target.closest('.cart-item');
  if (!row) return;
  const id = row.dataset.id;
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (e.target.closest('[data-inc]')) item.qty += 1;
  else if (e.target.closest('[data-dec]')) {
    item.qty -= 1;
    if (item.qty <= 0) cart.splice(cart.indexOf(item), 1);
  } else if (e.target.closest('[data-remove]')) {
    cart.splice(cart.indexOf(item), 1);
    showToast(`${item.name} removed from cart`);
  } else return;

  renderCartItems();
});

/* ── Checkout modal ───────────────────────────────────────────── */
const checkoutModal = $('#checkoutModal');

function openModal(modal) {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.documentElement.style.overflow = 'hidden';
}
function closeModal(modal) {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  if (!cartDrawer.classList.contains('is-open')) {
    document.documentElement.style.overflow = '';
  }
}

$('#checkoutBtn').addEventListener('click', () => {
  const count = cartCount();
  const total = cartTotal();
  $('#checkoutMessage').textContent =
    `This is a demo checkout — no real payment is processed. In a live café, your ${count} item${count > 1 ? 's' : ''} would be prepared fresh right away.`;
  $('#checkoutSummary').innerHTML = `
    ${cart.map(i => `
      <div class="modal__summary-row">
        <span>${i.name} × ${i.qty}</span>
        <span>${fmt(i.price * i.qty)}</span>
      </div>`).join('')}
    <div class="modal__summary-row modal__summary-row--total">
      <span>Total</span><span>${fmt(total)}</span>
    </div>
  `;
  closeCart();
  openModal(checkoutModal);
});

$$('[data-close-modal]').forEach(el => el.addEventListener('click', () => closeModal(checkoutModal)));

// clear the demo order after "Done"
checkoutModal.querySelector('.modal__btn').addEventListener('click', () => {
  cart.length = 0;
  renderCartItems();
});

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeCart();
  closeModal(checkoutModal);
});

/* ══════════════════════════════════════════════════════════════
   6. TOAST
   ══════════════════════════════════════════════════════════════ */
let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  $('#toastText').textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

/* ══════════════════════════════════════════════════════════════
   7. REVIEWS CAROUSEL
   ══════════════════════════════════════════════════════════════ */
(function reviews() {
  const viewport = $('#reviewsViewport');
  const track = $('#reviewsTrack');
  const cards = $$('.review-card', track);
  const dotsWrap = $('#reviewDots');
  let index = 0;
  let timer;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'reviews__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = $$('.reviews__dot', dotsWrap);

  function goTo(i, user = false) {
    index = (i + cards.length) % cards.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('is-active', di === index));
    if (user) restart();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  $('#reviewNext').addEventListener('click', () => goTo(index + 1, true));
  $('#reviewPrev').addEventListener('click', () => goTo(index - 1, true));

  viewport.addEventListener('mouseenter', () => clearInterval(timer));
  viewport.addEventListener('mouseleave', restart);

  // touch swipe
  let startX = 0;
  viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
  }, { passive: true });

  restart();
})();

/* ══════════════════════════════════════════════════════════════
   8. BACK TO TOP
   ══════════════════════════════════════════════════════════════ */
$('#toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════════════════════════════════════════════════
   9. CONTACT FORM — validation + success message
   ══════════════════════════════════════════════════════════════ */
(function contactForm() {
  const form = $('#contactForm');
  const success = $('#contactSuccess');

  const rules = {
    cfName:    v => v.trim().length >= 2            || 'Please enter your name.',
    cfEmail:   v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.',
    cfSubject: v => v.trim().length >= 3            || 'Please add a short subject.',
    cfMessage: v => v.trim().length >= 10           || 'Message should be at least 10 characters.',
  };

  function validateField(input) {
    const rule = rules[input.id];
    if (!rule) return true;
    const result = rule(input.value);
    const field = input.closest('.form-field');
    const errorEl = field.querySelector('.form-error');
    if (result === true) {
      field.classList.remove('is-invalid');
      errorEl.textContent = '';
      return true;
    }
    field.classList.add('is-invalid');
    errorEl.textContent = result;
    return false;
  }

  $$('input, textarea', form).forEach(input => {
    input.addEventListener('input', () => {
      if (input.closest('.form-field').classList.contains('is-invalid')) validateField(input);
    });
    input.addEventListener('blur', () => { if (input.value.trim()) validateField(input); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = $$('input, textarea', form);
    const allValid = inputs.map(validateField).every(Boolean);
    if (!allValid) {
      const firstInvalid = $('.form-field.is-invalid input, .form-field.is-invalid textarea', form);
      if (firstInvalid) firstInvalid.focus();
      return;
    }
    form.reset();
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast('Message sent successfully');
  });

  // "Contact Us" button → jump to the form and focus the first field
  $('#contactUsBtn').addEventListener('click', () => {
    $('#contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => $('#cfName').focus({ preventScroll: true }), 700);
  });
})();
